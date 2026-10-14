/* FFd20-Spieldaten als strukturierte JSON-Objekte (erweiterbar für alle Klassen/Archetypen).
 * Quellen je Eintrag im Feld "src". Abgeleitete/vereinfachte Werte sind mit "adapted" markiert
 * und werden in der UI als solche gekennzeichnet (keine erfundenen offiziellen Werte).
 */
'use strict';
var FFD20 = FFD20 || {};
FFD20.Data = {
  classes: {
    warrior: {
      id: 'warrior', name: 'Warrior', src: 'https://finalfantasyd20.com/classes/core-classes/warrior/',
      hitDie: 10, bab: 'full', fort: 'good', ref: 'bad', will: 'bad', skillPoints: 4,
      mainAbilities: ['STR', 'DEX', 'CON'],
      proficiencies: 'Alle einfachen + Kriegswaffen, alle Rüstungen, Schilde (außer Turmschilde)',
      description: 'Frontkämpfer mit Chosen Weapon und Martial Flexibility.',
      features: [
        { level: 1, id: 'chosen_weapon', name: 'Chosen Weapon +1', desc: '+1 Angriff & Schaden mit gewählter Waffengruppe, +1 je 4 Stufen. Implementiert als flacher Bonus.', src: 'warrior' },
        { level: 1, id: 'limit_crit', name: 'Limit Break: Critical Strikes', desc: 'Swift Action. Dauer 1 + 1/4 Stufen Runden: erster Treffer mit Chosen Weapon = bestätigter Crit, danach +4 auf Bestätigung.', src: 'warrior' },
        { level: 1, id: 'limit_omni', name: 'Limit Break: Omnistrike', desc: 'Swift Action. Volle Attacke mit Chosen Weapon: +1 Angriff auf höchsten BAB (MVP: 1 Zusatzangriff).', src: 'warrior' },
        { level: 2, id: 'combat_offense', name: 'Combat Offenses', desc: 'MVP: +1 Angriff (steht für Improved-Manöver-Feat).', src: 'warrior' }
      ],
      talents: [
        { id: 'power_attack', name: 'Power Attack (Talent)', desc: '-1 Angriff, +2 Schaden (MVP-Talent, skaliert vereinfacht).', src: 'adapted' },
        { id: 'toughness', name: 'Toughness (Talent)', desc: '+3 TP pro Talentwahl (Pathfinder-Feat als Talent genähert).', src: 'adapted' }
      ],
      archetypes: [] // Platzhalter: z.B. Defender, Gladiator – Freischaltung persistent, Daten später ergänzen
    },
    black_mage: {
      id: 'black_mage', name: 'Black Mage', src: 'https://finalfantasyd20.com/classes/core-classes/black-mage/',
      hitDie: 6, bab: 'half', fort: 'bad', ref: 'bad', will: 'good', skillPoints: 4,
      mainAbilities: ['DEX', 'INT'],
      proficiencies: 'Dolch, Schleuder, Power Rod/Staff, Quarterstaff, Buckler/leichte Schilde. Keine Rüstung.',
      description: 'Elementar- und Schwarzmagie: hoher Burst-Schaden über MP.',
      mpTable: [0, 3, 4, 5, 6, 8, 11, 15, 20, 26, 32, 39, 47, 56, 65, 75, 86, 98, 110, 122, 135],
      spellLevelTable: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 9, 9],
      features: [
        { level: 1, id: 'black_magery', name: 'Black Magery', desc: 'Alle 4 Stufen wählbar (MVP: auto +1W6 Schaden Stufe 1, +1 SG Stufe 5).', src: 'black_mage' },
        { level: 1, id: 'limit_manawall', name: 'Limit Break: Mana Wall', desc: 'Swift Action. 5 Schaden pro MP aus MP-Pool abfangen, Dauer 1 + 1/4 Stufen.', src: 'black_mage' },
        { level: 1, id: 'limit_fury', name: 'Limit Break: Spell Fury', desc: 'Swift Action. 2 Zauber mit 1 Standard-Aktion (MVP: 2x Fire in einer Runde).', src: 'black_mage' },
        { level: 2, id: 'elem_shield', name: 'Elemental Shield', desc: 'Immediate Action: Elementarresistenz = Klassenstufe bis nächster Zug (3 + INT/Tag). MVP: passiv +1 AC vs Elementar.', src: 'black_mage' }
      ],
      talents: [
        { id: 'spell_focus', name: 'Spell Focus (Talent)', desc: '+1 auf Zauber-SG.', src: 'adapted' },
        { id: 'empower', name: 'Empower (Talent)', desc: '+50% Würfelschaden eines Zaubers, +2 MP (Metamagie genähert).', src: 'adapted' }
      ],
      archetypes: []
    }
  },
  // Spells: Namen/Elemente offiziell, Würfel aus FFd20-Black-Mage-Liste genähert + als adapted markiert.
  // Offizielle FFd20-Zauber: Fire/Blizzard/Thunder-Linien, Ruin, Sleep, etc. Exakte Würfel je Stufe: FEHLT (Bestiary/Spell-Seiten paginiert).
  spells: {
    fire:   { id: 'fire', name: 'Fire', level: 1, element: 'fire', mp: 2, damage: '1d6', perLevel: true, save: 'REF-half', src: 'adapted (Element: offiziell, Würfel: genähert)', desc: 'Feuerschaden, 1d6 + 1d6 je 2 Stufen (max 5d6). REF halbiert.' },
    blizzard: { id: 'blizzard', name: 'Blizzard', level: 1, element: 'ice', mp: 2, damage: '1d6', perLevel: true, save: 'REF-half', src: 'adapted', desc: 'Eisschaden wie Fire.' },
    thunder: { id: 'thunder', name: 'Thunder', level: 1, element: 'lightning', mp: 2, damage: '1d6', perLevel: true, save: 'REF-half', src: 'adapted', desc: 'Blitzschaden wie Fire.' },
    ruin:   { id: 'ruin', name: 'Ruin', level: 1, element: 'non-elemental', mp: 3, damage: '2d4', perLevel: false, save: null, src: 'adapted', desc: 'Nicht-elementarer Direktschaden 2d4, kein Save.' },
    cure_minor: { id: 'cure_minor', name: 'Cure (Minor, Item)', level: 0, element: 'healing', mp: 0, damage: null, src: 'adapted', desc: 'Nur über Potion zugänglich (White-Magic-Platzhalter).' }
  },
  // Monster: Namen aus FFd20-Bestiarium/Setting; Werte für MVP adaptiert (offizielle Statblocks: FEHLT dokumentiert).
  // Quelle Namen: https://finalfantasyd20.com/ (Bestiary: Goblin, Bomb, Cactuar, coeurl u.a.)
  monsters: {
    goblin:  { id: 'goblin', name: 'Goblin', cr: 0.5, hp: '1d8+1', ac: 13, bab: 1, str: 11, dex: 13, con: 12, int: 10, wis: 9, cha: 8, attack: { name: 'Kurzschwert', damage: '1d6' }, xp: 200, src: 'adapted (Name: FFd20-Bestiarium)' },
    skeleton:{ id: 'skeleton', name: 'Skeleton Warrior', cr: 1, hp: '2d8+2', ac: 14, bab: 2, str: 13, dex: 12, con: 10, int: 10, wis: 10, cha: 10, attack: { name: 'Rostklinge', damage: '1d8+1' }, xp: 400, src: 'adapted' },
    bomb:    { id: 'bomb', name: 'Bomb', cr: 2, hp: '3d8+3', ac: 14, bab: 3, str: 12, dex: 14, con: 14, int: 8, wis: 10, cha: 10, attack: { name: 'Flammenstoß', damage: '2d6', element: 'fire' }, xp: 600, src: 'adapted' },
    cactuar: { id: 'cactuar', name: 'Cactuar', cr: 3, hp: '4d8+4', ac: 17, bab: 5, str: 10, dex: 18, con: 12, int: 8, wis: 12, cha: 10, attack: { name: '1000 Nadeln (genähert: 2d8+4)', damage: '2d8+4' }, xp: 800, src: 'adapted' },
    behemoth:{ id: 'behemoth', name: 'Behemoth (Boss)', cr: 5, hp: '8d10+16', ac: 18, bab: 8, str: 20, dex: 12, con: 16, int: 8, wis: 12, cha: 10, attack: { name: 'Prankenhieb', damage: '2d8+5' }, xp: 1600, src: 'adapted', boss: true }
  },
  items: {
    weapons: [
      { id: 'longsword', name: 'Longsword', damage: '1d8', crit: 'x2', group: 'Blades, Heavy', price: 15, src: 'Pathfinder/FFd20-Waffenliste (adapted)' },
      { id: 'dagger', name: 'Dagger', damage: '1d4', crit: 'x2', group: 'Blades, Light', price: 2, src: 'Pathfinder/FFd20' },
      { id: 'power_rod', name: 'Power Rod', damage: '1d6', crit: 'x2', group: 'rod', price: 20, src: 'adapted (FFd20 Power Rod existiert)' },
      { id: 'greatsword', name: 'Greatsword (Boss-Beute)', damage: '2d6', crit: 'x2', group: 'Blades, Heavy', price: 50, src: 'Pathfinder/FFd20' }
    ],
    armor: [
      { id: 'none', name: 'Keine Rüstung', ac: 0, maxDex: 99, price: 0, src: '—' },
      { id: 'leather', name: 'Lederrüstung', ac: 2, maxDex: 6, price: 10, src: 'Pathfinder' },
      { id: 'chainmail', name: 'Kettenhemd', ac: 5, maxDex: 4, price: 150, src: 'Pathfinder' },
      { id: 'mage_robe', name: 'Magierrobe', ac: 1, maxDex: 99, price: 15, src: 'adapted' }
    ],
    consumables: [
      { id: 'potion', name: 'Potion', effect: 'Heilt 2d8+2 TP', price: 50, src: 'adapted (FFd20: Potion existiert)' },
      { id: 'ether', name: 'Ether', effect: 'Stellt 2d6+2 MP wieder her', price: 60, src: 'adapted (FFd20: Ether existiert)' }
    ]
  },
  secondClassOffer: ['warrior', 'black_mage'],
  xpNote: 'EP nach Pathfinder Medium Track. CR-EP der Monster genähert (offizielle FFd20-CR-Tabelle: FEHLT).'
};
