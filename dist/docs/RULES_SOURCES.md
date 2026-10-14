# Regelquellen & Fehlendes

Jede implementierte Regel nennt ihre Quelle. Zugriff auf finalfantasyd20.com am 14.10.2026
erfolgreich (Seiten gerendert, Inhalte per HTML-Extraktion verifiziert).

## Originalgetreu übernommen (mit Quelle)

| Regel | Quelle | Implementierung |
|---|---|---|
| Warrior: d10, Full BAB, Good Fort, 4+INT Skills, Proficiencies | /classes/core-classes/warrior/ | `data.js`, `character.js` |
| Chosen Weapon +1, +1/4 Stufen | /classes/core-classes/warrior/ | `combat.js:chosenWeaponBonus` |
| Warrior-Limits: Critical Strikes, Omnistrike (Dauer 1+1/4 Stufen, Swift) | Warrior-Seite | `combat.js` (Omnistrike MVP: als Einzelangriff, volle Staffelung fehlt) |
| Black Mage: d6, Half BAB, Good Will, Proficiencies, INT-Zauber | /classes/core-classes/black-mage/ | `data.js`, `character.js` |
| BLM MP-Tabelle 3…135, Spell Levels 1…9 | Black-Mage-Tabelle | `data.js:mpTable` |
| Zauber-SG 10+Stufe+INT, Min-Attribut 10+Stufe | Black-Mage-Seite | `rules.js:spellDC` |
| BLM-Limits: Mana Wall (5/MP), Spell Fury | Black-Mage-Seite | `combat.js` (Spell Fury MVP: nicht voll automatisiert) |
| Angriff d20+BAB+STR/DEX vs AC, Nat1/20, Crit-Bestätigung, x2 | /system-rules/pathfinder-basics/ | `rules.js` |
| AC 10+Rüstung+Schild+DEX(max)+Größe | Pathfinder Basics | `rules.js:armorClass` |
| Initiative d20+DEX, BAB-Iterativ +6/+11/+16 | Pathfinder Basics | `rules.js:initiative` |
| Waffenschaden-Regel (Würfel×Multiplikator, Boni danach) | Pathfinder Basics | `dice.js`-Parser + `combat.js` |
| EP Medium Track (2000, 5000, 9500 …) | Pathfinder 1e (via FFd20) | `rules.js:XP_TABLE` |

## Genähert / Hausregeln (in UI als „adapted“ markiert)

- Monsterwerte (Goblin, Skeleton, Bomb, Cactuar, Behemoth): Namen aus FFd20-Setting,
  Statblocks **nicht** aus offiziellem Bestiarium übernommen → offizielle CR/EP/AC fehlen.
- Zauberwürfel (Fire 1d6/+1d6 je 2 Stufen etc.): Element/Schule offiziell, Würfel genähert.
- Bonus-MP-Tabelle („Bonus MP per Day by Spell Level“): nur INT-Mod-Approximation.
- Martial Flexibility, Warrior Techniques (Stamina), Mage Talents im Detail: nicht implementiert.
- Volle Attacke mit allen iterativen Angriffen: MVP nutzt 1 Angriff/Runde (+ Omnistrike-Platzhalter).
- Levelaufstieg heilt voll, Schatz-/Boss-Beuteloot, Encounter-Tabellen: eigene Roguelite-Regeln.

## Explizit fehlend (nichts erfunden)

1. Offizielle Monster-Statblocks aus dem FFd20-Bestiarium (AC, Angriffe, CR, EP, Resistenzen)
2. Vollständige Black-Mage-Zauberliste mit offiziellen Würfeln/Saves/Reichweiten
3. Exakte „Bonus MP per Day“-Tabelle je Zauberstufe
4. Warrior Techniques/Stamina-Pool, Martial-Flexibility-Feat-Auswahl, alle Talente
5. CMB/CMD, Flächeneffekte/Reichweitenraster, Statusveränderungen, Feats im Detail
6. Alle Archetypen (Schema vorbereitet, Inhalte + Ersetzungslogik fehlen)
7. Ausrüstungswerte/-preise aus offiziellen FFd20-Tabellen
