/* Spiel-Steuerung: Run-Lifecycle, Exploration ↔ Kampf, Belohnungen, Tod. */
'use strict';
(function (FFD20) {
  var Data = FFD20.Data, UI = FFD20.UI, World = FFD20.World, Combat = FFD20.Combat,
    Character = FFD20.Character, Save = FFD20.Save, Rules = FFD20.Rules, Dice = FFD20.Dice;
  var char = null, combat = null, selectedClass = null, combatTarget = 0;

  function $(id) { return document.getElementById(id); }

  function newRun(classId) {
    char = Character.new(classId);
    var m = Save.meta(); m.runs++; Save.saveMeta(m);
    Save.saveRun(char);
    UI.show('screen-game');
    startZone(1);
    UI.log('Run gestartet als ' + Data.classes[classId].name + '. Quelle: ' + Data.classes[classId].src);
  }
  function startZone(zone) {
    char.zone = zone;
    World.start(zone);
    UI.charPanel(char);
    UI.log('Zone ' + zone + (zone % 3 === 0 ? ' (BOSS-Zone)' : '') + ' betreten. Finde den Ausgang (grün)!');
    draw();
  }
  function draw() { World.draw($('world').getContext('2d')); }

  function encounterPool(boss) {
    if (boss) return ['behemoth'];
    var z = char.zone;
    if (z <= 1) return ['goblin'];
    if (z === 2) return ['goblin', 'skeleton'];
    if (z <= 4) return ['skeleton', 'bomb'];
    return ['bomb', 'cactuar'];
  }
  function startCombat(boss) {
    var pool = encounterPool(boss);
    var ids = boss ? pool : [pool[Math.floor(Math.random() * pool.length)]];
    if (!boss && char.zone >= 2 && Math.random() < 0.35) ids.push(pool[Math.floor(Math.random() * pool.length)]);
    combat = Combat.newCombat(char, ids);
    combat.isBoss = boss;
    combatTarget = 0;
    UI.show('screen-combat');
    renderCombat('Kampf beginnt! Initiative: ' + combat.order.map(function (o) { return o.c.name + ' (' + o.init + ')'; }).join(', '));
  }
  function renderCombat(note) {
    $('combat-round').textContent = combat.round;
    $('initiative-list').innerHTML = combat.order.map(function (o) {
      return '<div>' + o.c.name + ' <span class="tag">Ini ' + o.init + '</span> ' + Math.max(0, o.c.hp) + '/' + o.c.maxHp + '</div>';
    }).join('');
    $('enemy-panel').innerHTML = '<h3>Gegner</h3>' + combat.foes.map(function (f, i) {
      return '<div><input type="radio" name="tgt" value="' + i + '"' + (i === combatTarget ? ' checked' : '') + (f.hp <= 0 ? ' disabled' : '') + '> ' +
        f.name + ' — TP ' + Math.max(0, f.hp) + '/' + f.maxHp + ' <span class="tag">adaptiert</span></div>';
    }).join('');
    document.querySelectorAll('input[name=tgt]').forEach(function (r) { r.onchange = function () { combatTarget = +r.value; }; });
    var pc = char;
    $('player-panel').innerHTML = '<h3>' + pc.name + '</h3>' +
      '<div class="hpbar"><div style="width:' + (100 * pc.hp / pc.maxHp) + '%"></div></div><small>TP ' + Math.max(0, pc.hp) + '/' + pc.maxHp + '</small>' +
      '<div class="mpbar"><div style="width:' + (pc.maxMp ? 100 * pc.mp / pc.maxMp : 0) + '%"></div></div><small>MP ' + pc.mp + '/' + pc.maxMp + '</small>';
    var acts = [];
    acts.push('<button data-a="atk">Angreifen (' + pc.weapon.name + ' ' + pc.weapon.damage + ')</button>');
    pc.knownSpells.forEach(function (s) {
      acts.push('<button data-a="spell:' + s + '">' + Data.spells[s].name + ' (' + Data.spells[s].mp + ' MP)</button>');
    });
    var limits = pc.classes.warrior ? ['limit_crit', 'limit_omni'] : [];
    if (pc.classes.black_mage) limits = limits.concat(['limit_manawall', 'limit_fury']);
    // Zweitklasse ergänzt Limits
    if (pc.secondary === 'warrior' && limits.indexOf('limit_crit') < 0) limits.push('limit_crit');
    if (pc.secondary === 'black_mage' && limits.indexOf('limit_manawall') < 0) limits.push('limit_manawall', 'limit_fury');
    limits.forEach(function (l) { acts.push('<button data-a="limit:' + l + '">LIMIT: ' + l + '</button>'); });
    acts.push('<button data-a="item:potion">Potion (' + (inv('potion')) + ')</button>');
    acts.push('<button data-a="item:ether">Ether (' + (inv('ether')) + ')</button>');
    acts.push('<button data-a="end">Runde beenden (Gegner handeln)</button>');
    $('combat-actions').innerHTML = '<h3>Aktionen (Standard + Swift pro Runde, MVP-genähert)</h3>' + acts.join('');
    document.querySelectorAll('#combat-actions button').forEach(function (b) { b.onclick = function () { doAction(b.getAttribute('data-a')); }; });
    if (note) UI.clog(note);
    combat.log.forEach(function (m) { UI.clog(m); });
    combat.log = [];
  }
  function inv(id) { var f = char.inventory.find(function (i) { return i.id === id; }); return f ? f.n : 0; }
  function doAction(a) {
    if (!combat || combat.over) return;
    var msg;
    if (a === 'atk') msg = Combat.playerAttack(combat, combatTarget);
    else if (a.indexOf('spell:') === 0) msg = Combat.castSpell(combat, a.slice(6), combatTarget);
    else if (a.indexOf('limit:') === 0) msg = Combat.activateLimit(combat, a.slice(6));
    else if (a.indexOf('item:') === 0) msg = Combat.useItem(combat, a.slice(5));
    else if (a === 'end') { Combat.endPlayerTurn(combat); }
    UI.charPanel(char);
    if (Combat.checkOver(combat)) return finishCombat();
    // Auto-Rundenende nach Standard-Aktion? Nein: Spieler beendet manuell (MVP).
    renderCombat();
  }
  function finishCombat() {
    renderCombat();
    if (combat.result === 'dead') return gameOver();
    // Sieg: EP + Gil
    var xp = combat.foes.reduce(function (s, f) { return s + (f.monster.xp || 100); }, 0);
    var gil = 20 + Math.floor(Math.random() * 40) + char.zone * 10;
    char.gil += gil; char.kills += combat.foes.length;
    UI.clog('Sieg! +' + xp + ' EP, +' + gil + ' Gil.');
    var needChoice = !!char.secondary;
    var events = Character.awardXp(char, xp, needChoice ? undefined : (char.secondary || char.primary));
    Save.checkArchetypeUnlock(char);
    Save.saveRun(char);
    UI.charPanel(char);
    setTimeout(function () {
      if (combat.isBoss) {
        var m = Save.meta(); m.bosses++; Save.saveMeta(m);
        showReward(true);
      } else if (events.length && needChoice) {
        UI.levelUpModal(events, char, true, function (cid) {
          // Zusatzstufen wurden pauschal vergeben; Wahl nur dokumentiert (MVP-Näherung)
          UI.log('Levelaufstieg nach Wahl auf ' + Data.classes[cid].name + ' angerechnet.');
          backToWorld();
        });
      } else {
        if (events.length) UI.levelUpModal(events, char, false, function () {});
        backToWorld();
      }
    }, 600);
  }
  function showReward(isBoss) {
    UI.rewardScreen(char, isBoss, function (pick) {
      if (pick.type === 'class') {
        if (Character.addSecondClass(char, pick.id)) {
          UI.log('Zweitklasse gewählt: ' + Data.classes[pick.id].name + ' (fest für den Run).');
          Save.saveRun(char); UI.charPanel(char);
          showRewardContinue(isBoss);
        }
      } else if (pick.type === 'loot') {
        applyLoot(pick.id);
        Save.saveRun(char); UI.charPanel(char);
        showRewardContinue(isBoss);
      } else { startZone(char.zone + 1); }
    });
  }
  function showRewardContinue(isBoss) {
    // Nach Wahl direkt weiter (vereinfachtes MVP-Verhalten)
    UI.modal('<h3>Belohnung erhalten!</h3><p>Weiter in Zone ' + (char.zone + 1) + '?</p><button id="m-go">Weiter</button>');
    $('m-go').onclick = function () { UI.closeModal(); startZone(char.zone + 1); };
  }
  function applyLoot(id) {
    if (id === 'gil') { char.gil += 200; UI.log('+200 Gil.'); }
    if (id === 'greatsword') { char.weapon = Data.items.weapons[3]; UI.log('Greatsword ausgerüstet (2d6).'); }
    if (id === 'chainmail') {
      if (char.primary === 'black_mage' && !char.secondary) { UI.log('Black Mage kann keine Rüstung tragen (Klassenregel) — stattdessen +100 Gil.'); char.gil += 100; }
      else { char.armor = Data.items.armor[2]; UI.log('Kettenhemd ausgerüstet (AC 5).'); }
    }
    if (id === 'potion') { addInv('potion', 3); UI.log('+3 Potion.'); }
    if (id === 'ether') { addInv('ether', 2); UI.log('+2 Ether.'); }
  }
  function addInv(id, n) { var f = char.inventory.find(function (i) { return i.id === id; }); if (f) f.n += n; else char.inventory.push({ id: id, n: n }); }
  function backToWorld() { UI.show('screen-game'); UI.charPanel(char); draw(); }
  function gameOver() {
    var m = Save.meta(); m.kills += char.kills; Save.saveMeta(m);
    Save.clearRun();
    $('dead-panel').innerHTML = '<p>Zone ' + char.zone + ' · ' + char.kills + ' Kills · EP ' + char.xp + '</p><p>Freischaltungen (Archetypen ab Klassenstufe 3) bleiben gespeichert.</p>';
    UI.show('screen-dead');
  }

  function bind() {
    document.querySelectorAll('[data-go]').forEach(function (b) { b.onclick = function () { UI.show(b.getAttribute('data-go')); }; });
    $('btn-new-run').onclick = function () { selectedClass = null; UI.show('screen-class'); UI.classCards(null, pickClass); $('btn-start-run').disabled = true; };
    $('btn-continue').onclick = function () {
      var s = Save.loadRun();
      if (!s) { $('menu-panel').innerHTML = '<p>Kein gespeicherter Run.</p>'; return; }
      char = s; UI.show('screen-game'); startZone(char.zone || 1);
    };
    $('btn-unlocks').onclick = function () {
      var m = Save.meta();
      $('menu-panel').innerHTML = '<h3>Freischaltungen (persistent)</h3><p>Runs: ' + m.runs + ' · Bosse: ' + m.bosses + ' · Kills: ' + m.kills + '</p><p>Archetypen: ' + (m.archetypes.join(', ') || 'keine — spiele eine Klasse auf Stufe 3') + '</p><p class="missing">Archetyp-Regeln (Ersetzen von Klassenfähigkeiten): noch nicht implementiert.</p>';
    };
    $('btn-help').onclick = function () {
      $('menu-panel').innerHTML = '<h3>Regelquellen</h3><ul>' +
        '<li>Kampf/Attribute: https://finalfantasyd20.com/system-rules/pathfinder-basics/</li>' +
        '<li>Warrior: https://finalfantasyd20.com/classes/core-classes/warrior/</li>' +
        '<li>Black Mage: https://finalfantasyd20.com/classes/core-classes/black-mage/</li>' +
        '<li>Limit Breaks: https://finalfantasyd20.com/system-rules/limit-breaks/</li>' +
        '<li>Monsterwerte/Zauberwürfel/MP-Bonustabelle: genähert, als FEHLT dokumentiert (docs/RULES_SOURCES.md)</li></ul>';
    };
    $('btn-start-run').onclick = function () { if (selectedClass) newRun(selectedClass); };
    document.addEventListener('click', function (e) { if (e.target && e.target.id === 'btn-inv') UI.inventoryModal(char, function () {}); });
    document.addEventListener('keydown', function (e) {
      if (!$('screen-game').classList.contains('active')) return;
      var d = { ArrowUp: [0, -1], w: [0, -1], W: [0, -1], ArrowDown: [0, 1], s: [0, 1], S: [0, 1], ArrowLeft: [-1, 0], a: [-1, 0], A: [-1, 0], ArrowRight: [1, 0], d: [1, 0], D: [1, 0] }[e.key];
      if (d) {
        var r = World.tryMove(d[0], d[1]);
        draw(); Save.saveRun(char);
        if (r.event === 'fight') startCombat(false);
        else if (r.event === 'boss') startCombat(true);
        else if (r.event === 'chest') {
          var loot = ['potion', 'gil', 'ether'][Math.floor(Math.random() * 3)];
          if (loot === 'gil') { char.gil += 80; UI.log('Schatztruhe: +80 Gil!'); }
          else { addInv(loot, loot === 'potion' ? 2 : 1); UI.log('Schatztruhe: +' + loot + '!'); }
          UI.charPanel(char); Save.saveRun(char);
        }
        else if (r.event === 'exit') showReward(false);
        e.preventDefault();
      }
      if (e.key === 'i' || e.key === 'I') UI.inventoryModal(char, function () {});
    });
    $('world').addEventListener('click', function (e) {
      var rect = $('world').getBoundingClientRect();
      var tx = Math.floor((e.clientX - rect.left) / World.TILE), ty = Math.floor((e.clientY - rect.top) / World.TILE);
      var g = World.get(); if (!g) return;
      var dx = Math.sign(tx - g.px), dy = Math.sign(ty - g.py);
      if (Math.abs(tx - g.px) + Math.abs(ty - g.py) === 1) {
        var r = World.tryMove(dx, dy); draw();
        if (r.event === 'fight') startCombat(false);
        else if (r.event === 'boss') startCombat(true);
        else if (r.event === 'exit') showReward(false);
      }
    });
  }
  function pickClass(id) { selectedClass = id; UI.classCards(id, pickClass); $('btn-start-run').disabled = false; }

  document.addEventListener('DOMContentLoaded', bind);
  return { get char() { return char; } };
})(FFD20);
