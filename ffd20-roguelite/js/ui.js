/* UI-Schicht: Screens, Menüs, Kampfansicht, Reward-Auswahl, Inventar. Trennt Darstellung von Regeln. */
'use strict';
var FFD20 = FFD20 || {};
FFD20.UI = (function (Data, Rules, Character) {
  var logEl = function () { return document.getElementById('log'); };
  function show(id) {
    document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('active'); });
    document.getElementById(id).classList.add('active');
  }
  function log(msg) {
    var d = document.createElement('div'); d.textContent = msg;
    logEl().appendChild(d); logEl().scrollTop = 1e6;
  }
  function clog(msg) {
    var el = document.getElementById('combat-log');
    var d = document.createElement('div'); d.textContent = msg;
    el.appendChild(d); el.scrollTop = 1e6;
  }
  function charPanel(c) {
    var cls = Object.keys(c.classes).map(function (k) { return Data.classes[k].name + ' ' + c.classes[k].level; }).join(' / ');
    document.getElementById('char-panel').innerHTML =
      '<h3>' + c.name + '</h3><div><span class="tag">' + cls + '</span> <span class="tag">EP ' + c.xp + '</span> <span class="tag">' + c.gil + ' Gil</span></div>' +
      '<div class="hpbar"><div style="width:' + (100 * c.hp / c.maxHp) + '%"></div></div><small>TP ' + Math.max(0, c.hp) + '/' + c.maxHp + '</small>' +
      '<div class="mpbar"><div style="width:' + (c.maxMp ? 100 * c.mp / c.maxMp : 0) + '%"></div></div><small>MP ' + c.mp + '/' + c.maxMp + '</small>' +
      '<div class="statgrid">' +
      '<span>BAB</span><span>+' + c.bab + '</span>' +
      '<span>AC</span><span>' + Rules.armorClass({ abilities: c.abilities, armor: c.armor, shield: c.shield }) + '</span>' +
      '<span>Waffe</span><span>' + c.weapon.name + ' (' + c.weapon.damage + ')</span>' +
      '<span>Rüstung</span><span>' + c.armor.name + '</span>' +
      '<span>STR/DEX/CON</span><span>' + c.abilities.STR + '/' + c.abilities.DEX + '/' + c.abilities.CON + '</span>' +
      '<span>INT/WIS/CHA</span><span>' + c.abilities.INT + '/' + c.abilities.WIS + '/' + c.abilities.CHA + '</span>' +
      '</div>' +
      '<div><button id="btn-inv">Inventar (I)</button></div>';
    document.getElementById('run-info').textContent = 'Zone ' + c.zone + ' · ' + cls + ' · Kills ' + c.kills;
  }
  function classCards(selected, onPick) {
    var wrap = document.getElementById('class-cards'); wrap.innerHTML = '';
    Object.keys(Data.classes).forEach(function (id) {
      var cl = Data.classes[id];
      var div = document.createElement('div');
      div.className = 'card' + (selected === id ? ' selected' : '');
      div.innerHTML = '<h3>' + cl.name + '</h3><p>' + cl.description + '</p>' +
        '<div class="statgrid"><span>TW</span><span>d' + cl.hitDie + '</span><span>BAB</span><span>' + cl.bab + '</span>' +
        '<span>Prof.</span><span>' + cl.proficiencies + '</span></div>' +
        '<p class="src">Quelle: ' + cl.src + '</p>';
      div.onclick = function () { onPick(id); };
      wrap.appendChild(div);
    });
  }
  function modal(html) {
    document.getElementById('modal-box').innerHTML = html;
    document.getElementById('modal').classList.remove('hidden');
  }
  function closeModal() { document.getElementById('modal').classList.add('hidden'); }
  function inventoryModal(c, onUse) {
    var items = c.inventory.map(function (i) {
      var def = Data.items.consumables.find(function (d) { return d.id === i.id; });
      return '<div>' + def.name + ' x' + i.n + ' <small>' + def.effect + '</small> ' +
        '<button data-item="' + i.id + '">Benutzen</button> <span class="missing">' + def.src + '</span></div>';
    }).join('') || '<p>Leer.</p>';
    modal('<h3>Inventar & Ausrüstung</h3>' + items +
      '<p>Waffe: ' + c.weapon.name + ' · Rüstung: ' + c.armor.name + '</p>' +
      '<button id="m-close">Schließen</button>');
    document.getElementById('m-close').onclick = closeModal;
    document.querySelectorAll('[data-item]').forEach(function (b) { b.onclick = function () { onUse(b.getAttribute('data-item')); }; });
  }
  function levelUpModal(events, c, needsChoice, onChoice) {
    var html = '<h3>Levelaufstieg!</h3>' + events.map(function (e) {
      return '<p><b>' + Data.classes[e.classId].name + ' ' + e.level + '</b> — TP/MP neu berechnet, voll geheilt (Hausregel).</p>';
    }).join('');
    if (needsChoice) {
      html += '<p>Wähle die aufsteigende Klasse:</p>' +
        '<button id="lv-p">' + Data.classes[c.primary].name + '</button>' +
        (c.secondary ? '<button id="lv-s">' + Data.classes[c.secondary].name + '</button>' : '');
    }
    html += '<button id="m-close">Weiter</button>';
    modal(html);
    document.getElementById('m-close').onclick = closeModal;
    if (needsChoice) {
      var p = document.getElementById('lv-p'), s = document.getElementById('lv-s');
      if (p) p.onclick = function () { closeModal(); onChoice(c.primary); };
      if (s) s.onclick = function () { closeModal(); onChoice(c.secondary); };
    }
  }
  function rewardScreen(c, isBoss, onPick) {
    show('screen-reward');
    document.getElementById('reward-title').textContent = isBoss ? 'Boss besiegt! Wähle deine Belohnung' : 'Zone geschafft!';
    var panel = document.getElementById('reward-panel');
    var mustPickClass = isBoss && !c.secondary && (c.classes[c.primary].level >= 20 || true);
    // Regel: solange nur 1 Klasse -> Wahl Zweitklasse ODER Beute; danach nur Beute. Ab L20 Pflicht Zweitklasse.
    var forceClass = isBoss && !c.secondary && c.classes[c.primary].level >= 20;
    var html = '';
    if (isBoss && !c.secondary && !forceClass) {
      html += '<h3>Zweitklasse (fest legend für den Run) oder Beute?</h3>';
      Data.secondClassOffer.filter(function (id) { return id !== c.primary; }).forEach(function (id) {
        html += '<button data-cls="' + id + '">' + Data.classes[id].name + ' als Zweitklasse</button>';
      });
    } else if (forceClass) {
      html += '<p>Hauptklasse Level 20 — du MUSST eine Zweitklasse wählen:</p>';
      Data.secondClassOffer.filter(function (id) { return id !== c.primary; }).forEach(function (id) {
        html += '<button data-cls="' + id + '">' + Data.classes[id].name + '</button>';
      });
    }
    if (!forceClass) {
      html += '<h3>Beute</h3><button data-loot="gil">200 Gil</button>' +
        '<button data-loot="greatsword">Greatsword (2d6)</button>' +
        '<button data-loot="chainmail">Kettenhemd (AC 5)</button>' +
        '<button data-loot="potion">3x Potion</button>' +
        '<button data-loot="ether">2x Ether</button>';
    }
    html += '<div><button id="rw-next">Weiter (Zone ' + (c.zone + 1) + ')</button></div>';
    panel.innerHTML = html;
    panel.querySelectorAll('[data-cls]').forEach(function (b) {
      b.onclick = function () { onPick({ type: 'class', id: b.getAttribute('data-cls') }); };
    });
    panel.querySelectorAll('[data-loot]').forEach(function (b) {
      b.onclick = function () { onPick({ type: 'loot', id: b.getAttribute('data-loot') }); };
    });
    document.getElementById('rw-next').onclick = function () { onPick({ type: 'next' }); };
  }
  return { show: show, log: log, clog: clog, charPanel: charPanel, classCards: classCards, modal: modal, closeModal: closeModal, inventoryModal: inventoryModal, levelUpModal: levelUpModal, rewardScreen: rewardScreen };
})(FFD20.Data, FFD20.Rules, FFD20.Character);
