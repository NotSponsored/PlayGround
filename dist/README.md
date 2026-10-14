# FFd20 Roguelite — Prototyp v0.1

2D-Singleplayer-Roguelite im Browser, Regelkern nach **Final Fantasy d20** (Pathfinder-1e-Basis).
`index.html` direkt im Browser öffnen — kein Build nötig. Tests: `node tests/run-tests.js`.

## Spielstand (MVP)

| Anforderung | Status |
|---|---|
| Hauptmenü + Charakterauswahl | ✅ |
| Begehbare 2D-Welt (Top-down, Canvas, WASD+Maus) | ✅ |
| Taktischer Rundenkampf (Initiative, Standard/Swift, Angriff vs AC, Crit, REF-halbiert) | ✅ |
| Klassen Warrior + Black Mage (HD, BAB, Saves, MP-Tabelle, Features, Limits) | ✅ |
| Gegner (Goblin, Skeleton, Bomb, Cactuar) + Boss (Behemoth) | ✅ (Werte genähert, s. RULES_SOURCES) |
| EP + Levelaufstieg (Pathfinder Medium Track) | ✅ |
| Boss-Entscheidung: Zweitklasse vs Beute | ✅ |
| Zweiklassen-Kombination (je max 20, total 40) | ✅ |
| Inventar/Ausrüstung (Waffe, Rüstung, Potion, Ether) | ✅ |
| Lokaler Speicher (Run + permanente Freischaltungen) | ✅ (localStorage) |
| Archetypen-System | 🔶 Struktur vorhanden, Inhalte fehlen |

## Steuerung

WASD/Pfeile oder Klick auf Nachbarfeld. Ziel: grünes EXIT-Feld erreichen, Kämpfe gewinnen.
Jede 3. Zone ist eine Boss-Zone (Behemoth → Belohnungswahl). `I` öffnet das Inventar.

## Entwicklungsplan

1. v0.2: Offizielle Statblocks (Bestiarium), exakte Zauberliste, Bonus-MP-Tabelle
2. v0.3: Erste Archetypen (z. B. Warrior: Gladiator) mit Ersetzungslogik
3. v0.4: Feats/Talente als Effektsystem, Status/Elementarresistenzen, Limit-Break-Anzeige
4. v0.5: Alle 12 Core Classes, Elektronik-Sound/Grafik (eigen, keine FF-Assets)

Siehe `docs/ARCHITECTURE.md` und `docs/RULES_SOURCES.md`.
