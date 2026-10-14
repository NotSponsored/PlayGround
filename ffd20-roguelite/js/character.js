/* Charakter-Modell: zwei Klassen (je max 20), gemeinsamer Charakter aus FFd20-Regeln abgeleitet.
 * Multiclass-Regel: BAB/Saves addieren sich (Pathfinder/FFd20-Multiclass-Prinzip, via Character Advancement).
 * HP: Trefferwürfel je Klassenstufe (max auf Stufe 1, danach gewürfelt). MP: Black-Mage-Tabelle + INT-Bonus.
 */
'use strict';
var FFD20 = FFD20 || {};
FFD20.Character = (function (Rules, Dice, Data) {
  function babFor(classId, level) {
    var t = Data.classes[classId].bab;
    if (t === 'full') return level;
    if (t === 'half') return Math.floor(level * 0.5);
    return Math.floor(level * 0.75);
  }
  function saveFor(classId, level, kind) {
    var t = Data.classes[classId][kind === 'FORT' ? 'fort' : kind === 'REF' ? 'ref' : 'will'];
    if (t === 'good') return 2 + Math.floor(level / 2);
    return Math.floor(level / 3);
  }
  function newCharacter(classId) {
    var cls = Data.classes[classId];
    var abil = classId === 'warrior'
      ? { STR: 16, DEX: 13, CON: 14, INT: 10, WIS: 11, CHA: 10 }
      : { STR: 10, DEX: 14, CON: 12, INT: 16, WIS: 11, CHA: 10 };
    var c = {
      name: 'Mogry', classes: {}, primary: classId, secondary: null,
      abilities: abil, xp: 0, gil: 100,
      weapon: classId === 'warrior' ? Data.items.weapons[0] : Data.items.weapons[2],
      armor: classId === 'warrior' ? Data.items.armor[1] : Data.items.armor[3],
      shield: null, inventory: [{ id: 'potion', n: 2 }],
      talents: [], knownSpells: classId === 'black_mage' ? ['fire', 'blizzard', 'thunder'] : [],
      hp: 0, maxHp: 0, mp: 0, maxMp: 0, limitUsed: false, zone: 1, kills: 0
    };
    c.classes[classId] = { level: 1, hpRolls: [] };
    recalc(c, true);
    c.hp = c.maxHp; c.mp = c.maxMp;
    return c;
  }
  function totalLevel(c) {
    return Object.keys(c.classes).reduce(function (s, k) { return s + c.classes[k].level; }, 0);
  }
  function recalc(c, first) {
    var hp = 0, mp = 0, bab = 0, saves = { FORT: 0, REF: 0, WILL: 0 };
    Object.keys(c.classes).forEach(function (cid) {
      var lvl = c.classes[cid].level, cls = Data.classes[cid];
      var rolls = c.classes[cid].hpRolls;
      while (rolls.length < lvl) {
        var r = rolls.length === 0 && first && cid === c.primary
          ? cls.hitDie : Dice.roll(cls.hitDie);
        rolls.push(r);
      }
      var con = Rules.abilityMod(c.abilities.CON);
      for (var i = 0; i < lvl; i++) hp += Math.max(1, rolls[i] + con);
      if (cid === 'black_mage') mp += (cls.mpTable[lvl] || 0) + Rules.bonusMp(Rules.abilityMod(c.abilities.INT));
      bab += babFor(cid, lvl);
      saves.FORT += saveFor(cid, lvl, 'FORT');
      saves.REF += saveFor(cid, lvl, 'REF');
      saves.WILL += saveFor(cid, lvl, 'WILL');
    });
    if (c.talents.indexOf('toughness') >= 0) hp += 3;
    c.maxHp = hp; c.maxMp = mp; c.bab = bab; c.saves = saves;
    c.hp = Math.min(c.hp || hp, hp); c.mp = Math.min(c.mp == null ? mp : c.mp, mp);
    return c;
  }
  // EP vergeben; gibt Liste von Levelaufstiegen zurück {classId, level}. Klasse wählbar wenn secondary existiert.
  function awardXp(c, amount, chosenClassId) {
    c.xp += amount;
    var target = Rules.levelFromXp(c.xp); // Charakterziel aus Gesamt-EP (Pfadfinder-Näherung)
    var events = [];
    // MVP-Regel: jede Stufe über aktuellem Total erlaubt einen Klassenaufstieg (max 20 je Klasse).
    while (totalLevel(c) < Math.min(target, 40)) {
      var cid = chosenClassId || (c.secondary || c.primary);
      if (c.classes[cid].level >= 20) {
        var other = cid === c.primary ? c.secondary : c.primary;
        if (!other || c.classes[other].level >= 20) break;
        cid = other;
      }
      c.classes[cid].level++;
      recalc(c, false);
      c.hp = c.maxHp; // Levelaufstieg heilt voll (Roguelite-Gnade, als Hausregel markiert)
      events.push({ classId: cid, level: c.classes[cid].level });
      if (!c.secondary && c.classes[c.primary].level < 20) { /* weiter Hauptklasse */ }
      else if (!chosenClassId && c.secondary) break; // bei 2 Klassen: Spieler wählt pro Stufe (UI)
      if (events.length > 20) break;
    }
    return events;
  }
  function addSecondClass(c, classId) {
    if (c.secondary) return false;
    c.secondary = classId;
    c.classes[classId] = { level: 1, hpRolls: [] };
    if (classId === 'black_mage') c.knownSpells = ['fire', 'blizzard', 'thunder'];
    recalc(c, false);
    return true;
  }
  function toCombatant(c) {
    return {
      name: c.name + ' (' + Object.keys(c.classes).map(function (k) { return Data.classes[k].name + ' ' + c.classes[k].level; }).join('/') + ')',
      abilities: c.abilities, bab: c.bab, saves: c.saves,
      armor: c.armor, shield: c.shield, acMisc: c.primary === 'black_mage' || c.secondary === 'black_mage' ? 0 : 0,
      hp: c.hp, maxHp: c.maxHp, mp: c.mp, maxMp: c.maxMp, isPlayer: true, ref: c
    };
  }
  return { new: newCharacter, recalc: recalc, totalLevel: totalLevel, awardXp: awardXp, addSecondClass: addSecondClass, toCombatant: toCombatant, babFor: babFor, saveFor: saveFor };
})(FFD20.Rules, FFD20.Dice, FFD20.Data);
