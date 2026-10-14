/* Runden-Kampfsystem nach FFd20/Pathfinder: Initiative, Standard/Move/Swift, Angriff vs AC, Reflex halbiert. */
'use strict';
var FFD20 = FFD20 || {};
FFD20.Combat = (function (Rules, Dice, Data) {
  function monsterToCombatant(m) {
    var hp = Dice.rollExpr(m.hp).total;
    var abil = { STR: m.str, DEX: m.dex, CON: m.con, INT: m.int, WIS: m.wis, CHA: m.cha };
    return { name: m.name, abilities: abil, bab: m.bab, saves: { FORT: 1, REF: 1, WILL: 1 },
      armor: { ac: m.ac - 10 - Rules.abilityMod(m.dex), maxDex: 99 }, acMisc: 0,
      hp: hp, maxHp: hp, mp: 0, maxMp: 0, isPlayer: false, monster: m };
  }
  function newCombat(playerChar, monsterIds) {
    var player = FFD20.Character.toCombatant(playerChar);
    var foes = monsterIds.map(function (id) { return monsterToCombatant(Data.monsters[id]); });
    var order = [{ c: player, init: Rules.initiative(player) }];
    foes.forEach(function (f) { order.push({ c: f, init: Rules.initiative(f) }); });
    order.sort(function (a, b) { return b.init - a.init; });
    return { playerChar: playerChar, player: player, foes: foes, order: order, round: 1, idx: 0,
      over: false, log: [], swiftUsed: false, standardUsed: false,
      limitBreak: null, limitRounds: 0 };
  }
  function log(st, msg) { st.log.push(msg); }
  function aliveFoes(st) { return st.foes.filter(function (f) { return f.hp > 0; }); }

  function playerAttack(st, foeIdx, opts) {
    opts = opts || {};
    var pc = st.playerChar, foe = st.foes[foeIdx];
    if (!foe || foe.hp <= 0) return 'Kein gültiges Ziel.';
    var bonus = (pc.classes.warrior ? pc.classes.warrior.level >= 1 ? chosenWeaponBonus(pc) : 0 : 0);
    if (pc.talents.indexOf('power_attack') >= 0) bonus -= 1;
    var r = Rules.attackRoll(st.player, { target: foe, bonus: bonus });
    var msg = 'Angriff (' + pc.weapon.name + '): d20=' + r.nat + ' +' + r.bonus + ' = ' + r.total + ' vs AC ' + r.ac + ' → ';
    if (!r.hit) { msg += 'FEHLSCHLAG.'; log(st, msg); st.standardUsed = true; return msg; }
    var crit = false;
    // Critical Strikes Limit Break: erster Treffer = bestätigter Crit
    if (st.limitBreak === 'limit_crit' && st.limitRounds > 0 && !st.critConsumed) { crit = true; st.critConsumed = true; }
    else if (r.threat) crit = Rules.confirmCrit(st.player, { target: foe, bonus: bonus });
    var dmgExpr = pc.weapon.damage;
    var dmg = Dice.rollExpr(dmgExpr).total + Rules.abilityMod(pc.abilities.STR) + chosenWeaponBonus(pc) + (pc.talents.indexOf('power_attack') >= 0 ? 2 : 0);
    // Omnistrike: MVP -> Zusatzangriff wird separat über UI-Button ausgeführt
    if (crit) {
      var mult = 2; // Standard x2 (Waffe: adapted, offizielle Crit-Ranges: FEHLT)
      dmg = dmg * mult;
      // Präzisions-/Energiewürfel würden nicht multipliziert (Pathfinder-Regel) – MVP hat keine.
      msg += 'KRITISCH x' + mult + '! ';
    } else msg += 'Treffer! ';
    dmg = Math.max(1, dmg);
    foe.hp -= dmg;
    msg += dmg + ' Schaden an ' + foe.name + ' (' + Math.max(0, foe.hp) + '/' + foe.maxHp + ').';
    if (foe.hp <= 0) msg += ' Besiegt!';
    log(st, msg); st.standardUsed = true;
    return msg;
  }
  function chosenWeaponBonus(pc) {
    var lvl = pc.classes.warrior ? pc.classes.warrior.level : 0;
    return lvl >= 1 ? 1 + Math.floor((lvl - 1) / 4) : 0; // +1, +1 je 4 Stufen. Quelle: Warrior/Chosen Weapon.
  }
  function castSpell(st, spellId, foeIdx) {
    var pc = st.playerChar, sp = Data.spells[spellId];
    var foe = st.foes[foeIdx];
    if (pc.mp < sp.mp) return 'Nicht genug MP (' + pc.mp + '/' + sp.mp + ').';
    pc.mp -= sp.mp; st.player.mp = pc.mp;
    var intMod = Rules.abilityMod(pc.abilities.INT);
    var blvl = pc.classes.black_mage ? pc.classes.black_mage.level : 1;
    var dice = sp.perLevel ? Math.min(5, 1 + Math.floor(blvl / 2)) : 1;
    var dmg = 0, rolls = [];
    for (var i = 0; i < dice; i++) { var r = Dice.rollExpr(sp.damage); dmg += r.total; rolls.push(r.total); }
    if (sp.id !== 'ruin' && pc.talents.indexOf('empower') < 0 && st.empower) { dmg = Math.floor(dmg * 1.5); }
    var msg = sp.name + ' (MP-' + sp.mp + '): ' + rolls.join('+') + ' = ' + dmg + ' [' + sp.element + '] auf ' + (foe ? foe.name : '—') + '. ';
    if (sp.save === 'REF-half' && foe && foe.hp > 0) {
      var dc = Rules.spellDC(sp.level, intMod) + (pc.talents.indexOf('spell_focus') >= 0 ? 1 : 0);
      var sv = Rules.savingThrow('REF', foe);
      sv.total += 2; // Monster-Basis genähert
      msg += 'REF SG ' + dc + ': Wurf ' + sv.nat + '+' + (sv.total - sv.nat) + '=' + sv.total + ' → ';
      if (sv.total >= dc) { dmg = Math.floor(dmg / 2); msg += 'halbiert → ' + dmg + '.'; }
      else msg += 'voller Schaden.';
    }
    if (foe) { foe.hp -= dmg; msg += ' (' + Math.max(0, foe.hp) + '/' + foe.maxHp + ')'; if (foe.hp <= 0) msg += ' Besiegt!'; }
    log(st, msg); st.standardUsed = true;
    return msg;
  }
  function useItem(st, itemId) {
    var pc = st.playerChar;
    var inv = pc.inventory.find(function (i) { return i.id === itemId && i.n > 0; });
    if (!inv) return 'Nicht im Inventar.';
    inv.n--;
    var msg;
    if (itemId === 'potion') { var h = Dice.rollExpr('2d8+2').total; pc.hp = Math.min(pc.maxHp, pc.hp + h); st.player.hp = pc.hp; msg = 'Potion: +' + h + ' TP (' + pc.hp + '/' + pc.maxHp + ').'; }
    else if (itemId === 'ether') { var m = Dice.rollExpr('2d6+2').total; pc.mp = Math.min(pc.maxMp, pc.mp + m); st.player.mp = pc.mp; msg = 'Ether: +' + m + ' MP (' + pc.mp + '/' + pc.maxMp + ').'; }
    log(st, msg); st.standardUsed = true;
    return msg;
  }
  function activateLimit(st, id) {
    var pc = st.playerChar;
    if (st.limitBreak) return 'Limit Break bereits aktiv.';
    st.limitBreak = id; st.limitRounds = 1 + Math.floor(((pc.classes.warrior || pc.classes.black_mage || { level: 1 }).level - 1) / 4) + 1;
    st.critConsumed = false; st.swiftUsed = true;
    var msg = 'LIMIT BREAK: ' + id + ' (' + st.limitRounds + ' Runden).';
    log(st, msg); return msg;
  }
  function enemyTurn(st, foe) {
    if (foe.hp <= 0) return;
    // Mana Wall: Schaden aus MP abfangen (5 pro MP). Quelle: Black Mage.
    var r = Rules.attackRoll(foe, { target: st.player });
    var pc = st.playerChar;
    if (!r.hit) { log(st, foe.name + ' greift an: ' + r.total + ' vs AC ' + r.ac + ' → Fehlschlag.'); return; }
    var dmg = Math.max(1, Dice.rollExpr(foe.monster.attack.damage).total + Rules.abilityMod(foe.abilities.STR));
    if (st.limitBreak === 'limit_manawall' && st.limitRounds > 0 && pc.mp > 0) {
      var need = Math.ceil(dmg / 5), use = Math.min(need, pc.mp);
      pc.mp -= use; st.player.mp = pc.mp; dmg -= use * 5;
      log(st, 'Mana Wall fängt ' + (use * 5) + ' ab (' + use + ' MP).');
    }
    dmg = Math.max(0, dmg);
    pc.hp -= dmg; st.player.hp = pc.hp;
    log(st, foe.name + ' trifft (' + foe.monster.attack.name + '): ' + dmg + ' Schaden (' + Math.max(0, pc.hp) + '/' + pc.maxHp + ').');
  }
  function endPlayerTurn(st) {
    // Gegner handeln
    aliveFoes(st).forEach(function (f) { enemyTurn(st, f); });
    if (st.limitRounds > 0) { st.limitRounds--; if (st.limitRounds === 0) { log(st, 'Limit Break endet.'); st.limitBreak = null; } }
    st.idx = 0; st.round++; st.standardUsed = false; st.swiftUsed = false;
    // Sync
    st.player.hp = st.playerChar.hp; st.player.mp = st.playerChar.mp;
    checkOver(st);
  }
  function checkOver(st) {
    if (st.playerChar.hp <= 0) { st.over = true; st.result = 'dead'; }
    else if (aliveFoes(st).length === 0) { st.over = true; st.result = 'win'; }
    return st.over;
  }
  return { newCombat: newCombat, playerAttack: playerAttack, castSpell: castSpell, useItem: useItem,
    activateLimit: activateLimit, endPlayerTurn: endPlayerTurn, checkOver: checkOver, aliveFoes: aliveFoes, chosenWeaponBonus: chosenWeaponBonus };
})(FFD20.Rules, FFD20.Dice, FFD20.Data);
