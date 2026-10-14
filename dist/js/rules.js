/* Zentrale FFd20/Pathfinder-1e-Regeln. Jede Funktion nennt ihre Quelle.
 * Quellen:
 * - Angriff/AC/Rettungswürfe/kritische Treffer: https://finalfantasyd20.com/system-rules/pathfinder-basics/
 * - Limit Breaks: https://finalfantasyd20.com/system-rules/limit-breaks/
 * - Klassen: .../classes/core-classes/warrior/ und .../black-mage/
 * - EP: Pathfinder Medium Progression (FFd20 Character Advancement verweist auf Pathfinder-Tabellen).
 */
'use strict';
var FFD20 = FFD20 || {};
FFD20.Rules = (function (Dice) {
  function abilityMod(score) { return Math.floor((score - 10) / 2); }

  // Pathfinder Medium XP Track (Level -> Mindest-EP). Quelle: Pathfinder 1e Core Rulebook, via FFd20.
  var XP_TABLE = [0, 0, 2000, 5000, 9500, 15000, 23000, 35000, 51000, 75000, 105000,
    155000, 220000, 315000, 445000, 635000, 890000, 1300000, 1800000, 2550000, 3600000];

  function levelFromXp(xp) {
    var lvl = 1;
    for (var i = 1; i <= 20; i++) if (xp >= XP_TABLE[i]) lvl = i;
    return lvl;
  }

  // AC = 10 + Rüstung + Schild + Dex (max. je Rüstung) + Größe + Sonstiges.
  // Quelle: Pathfinder Basics / Combat Statistics.
  function armorClass(target) {
    var dexMod = abilityMod(target.abilities.DEX);
    var maxDex = target.armor ? (target.armor.maxDex != null ? target.armor.maxDex : 99) : 99;
    var dex = Math.min(dexMod, maxDex);
    return 10 + (target.armor ? target.armor.ac : 0) + (target.shield ? target.shield.ac : 0) + dex +
      (target.sizeMod || 0) + (target.acMisc || 0);
  }

  // Angriff: d20 + BAB + Attribut (STR nah / DEX fern) + Größe + Sonstiges. Nat 1 = Fehlschlag, Nat 20 = Treffer+Bedrohung.
  function attackRoll(attacker, opts) {
    opts = opts || {};
    var isRanged = !!opts.ranged;
    var abil = isRanged ? abilityMod(attacker.abilities.DEX) : abilityMod(attacker.abilities.STR);
    var bab = attacker.bab || 0;
    var bonus = bab + abil + (attacker.sizeMod || 0) + (opts.bonus || 0) + (attacker.attackMisc || 0);
    var nat = Dice.d20();
    var total = nat + bonus;
    var ac = armorClass(opts.target);
    var hit = (nat === 20) || (nat !== 1 && total >= ac);
    return { nat: nat, bonus: bonus, total: total, ac: ac, hit: hit, threat: nat === 20 };
  }

  // Krit bestätigen: zweiter Wurf mit gleichen Mods muss treffen.
  function confirmCrit(attacker, opts) {
    var r = attackRoll(attacker, opts);
    return r.hit;
  }

  // Rettungswurf: d20 + Grundbonus + Attributmod.
  function savingThrow(kind, combatant) {
    var abil = kind === 'FORT' ? abilityMod(combatant.abilities.CON)
      : kind === 'REF' ? abilityMod(combatant.abilities.DEX)
      : abilityMod(combatant.abilities.WIS);
    var base = (combatant.saves && combatant.saves[kind]) || 0;
    var nat = Dice.d20();
    return { nat: nat, total: nat + base + abil, dc: null };
  }

  // Initiative: d20 + Dex-Mod. Quelle: Pathfinder Basics.
  function initiative(c) { return Dice.d20() + abilityMod(c.abilities.DEX); }

  // Zauber-SG: 10 + Zauberstufe + INT-Mod (Black Mage). Quelle: Black-Mage-Klassenseite.
  function spellDC(spellLevel, intMod) { return 10 + spellLevel + intMod; }
  function minAbilityForSpell(spellLevel) { return 10 + spellLevel; }

  // MP-Bonus durch hohes Attribut (vereinfachte Pathfinder-Tabelle: +1 MP je Stufe <= Mod).
  // Echte FFd20-Tabelle "Bonus MP per Day" ist granularer -> als FEHLT markiert, Approximation dokumentiert.
  function bonusMp(abilityMod) { return Math.max(0, abilityMod); }

  return {
    abilityMod: abilityMod, XP_TABLE: XP_TABLE, levelFromXp: levelFromXp,
    armorClass: armorClass, attackRoll: attackRoll, confirmCrit: confirmCrit,
    savingThrow: savingThrow, initiative: initiative,
    spellDC: spellDC, minAbilityForSpell: minAbilityForSpell, bonusMp: bonusMp,
    MISSING: ['Exakte FFd20-Bonus-MP-Tabelle je Zauberstufe', 'CMB/CMD-Manöver im Detail', 'Exakte CR/EP-Vergabe je Monster aus FFd20-Bestiarium']
  };
})(FFD20.Dice);
