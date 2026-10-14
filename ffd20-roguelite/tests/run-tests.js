/* Regel-Tests (Node). Start: node tests/run-tests.js */
'use strict';
const fs = require('fs'), path = require('path');
const FFD20 = {};
function load(f) { const code = fs.readFileSync(path.join(__dirname, '..', 'js', f), 'utf8'); new Function('FFD20', code)(FFD20); }
load('dice.js'); load('rules.js'); load('data.js'); load('character.js');

let pass = 0, fail = 0;
function t(name, cond, extra) {
  if (cond) { pass++; console.log('PASS ' + name); }
  else { fail++; console.log('FAIL ' + name + (extra ? ' — ' + extra : '')); }
}
const { Rules, Dice, Data, Character } = FFD20;

// Attributsmodifikatoren (Pathfinder: (Wert-10)/2 abgerundet)
t('STR 16 -> +3', Rules.abilityMod(16) === 3);
t('INT 10 -> +0', Rules.abilityMod(10) === 0);
t('CON 8 -> -1', Rules.abilityMod(8) === -1);

// AC: 10 + Rüstung + Dex
t('AC Leder+DEX13 = 13', Rules.armorClass({ abilities: { DEX: 13 }, armor: { ac: 2, maxDex: 6 } }) === 13);
t('AC Kettenhemd deckelt DEX', Rules.armorClass({ abilities: { DEX: 18 }, armor: { ac: 5, maxDex: 4 } }) === 10 + 5 + 4);

// Angriffs-Bonus: BAB + STR
Dice.setRng(() => 0.5); // d20 -> 11
let atk = Rules.attackRoll({ abilities: { STR: 16, DEX: 10 }, bab: 1 }, { target: { abilities: { DEX: 10 }, armor: { ac: 2, maxDex: 6 } } });
t('Angriff 11+1+3=15 vs AC12 trifft', atk.hit && atk.total === 15, JSON.stringify(atk));
Dice.setRng(Math.random);

// Nat 1 / Nat 20
Dice.setRng(() => 0); // -> 1
let m1 = Rules.attackRoll({ abilities: { STR: 30, DEX: 10 }, bab: 20 }, { target: { abilities: { DEX: 1 }, armor: { ac: 0 } } });
t('Nat 1 immer Fehlschlag', !m1.hit);
Dice.setRng(() => 0.9999); // -> 20
let m20 = Rules.attackRoll({ abilities: { STR: 1, DEX: 10 }, bab: 0 }, { target: { abilities: { DEX: 30 }, armor: { ac: 30 } } });
t('Nat 20 immer Treffer + Bedrohung', m20.hit && m20.threat);
Dice.setRng(Math.random);

// Warrior: BAB full, Fort good, d10
t('Warrior BAB L1 = 1', Character.babFor('warrior', 1) === 1);
t('Warrior BAB L5 = 5', Character.babFor('warrior', 5) === 5);
t('Black Mage BAB L4 = 2 (half)', Character.babFor('black_mage', 4) === 2);
t('Warrior Fort L1 = 2 (good)', Character.saveFor('warrior', 1, 'FORT') === 2);
t('Black Mage Will L1 = 2 (good)', Character.saveFor('black_mage', 1, 'WILL') === 2);

// Black Mage MP-Tabelle (offiziell): L1=3, L5=8, L20=135
t('BLM MP L1 = 3', Data.classes.black_mage.mpTable[1] === 3);
t('BLM MP L5 = 8', Data.classes.black_mage.mpTable[5] === 8);
t('BLM MP L20 = 135', Data.classes.black_mage.mpTable[20] === 135);

// Zauber-SG: 10 + Stufe + INT
t('SG Fire INT16 = 14', Rules.spellDC(1, 3) === 14);

// XP-Tabelle: L2 ab 2000
t('EP 2000 -> Level 2', Rules.levelFromXp(2000) === 2);
t('EP 1999 -> Level 1', Rules.levelFromXp(1999) === 1);

// Charakter: HP/MP-Berechnung
let w = Character.new('warrior');
t('Warrior Start maxHp = 10+CON(2) = 12', w.maxHp === 12, 'got ' + w.maxHp);
let b = Character.new('black_mage');
t('BLM Start MP = 3+INT(3) = 6', b.maxMp === 6, 'got ' + b.maxMp);
t('BLM kennt Fire/Blizzard/Thunder', b.knownSpells.length === 3);

// Zweitklasse
t('Zweitklasse hinzufügen', Character.addSecondClass(w, 'black_mage') && w.secondary === 'black_mage');
t('Zweitklasse nur einmal', Character.addSecondClass(w, 'warrior') === false);

// Multiclass-BAB addiert sich
t('BAB W1/BLM1 = 1+0', Character.babFor('warrior', 1) + Character.babFor('black_mage', 1) === 1);

// Würfelparser
t('parse 2d6+3', JSON.stringify(Dice.parse('2d6+3')) === JSON.stringify({ n: 2, sides: 6, mod: 3, mult: 1 }));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
