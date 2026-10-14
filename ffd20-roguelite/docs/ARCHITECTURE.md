# Architektur

```
ffd20-roguelite/
  index.html        UI-Screens (Menü, Klasse, Spiel, Kampf, Belohnung, Tod)
  css/style.css     Darstellung (eigen, keine FF-Assets)
  js/
    dice.js         d20-Würfel + Ausdrücke ("2d6+3", "4d4x2")
    rules.js        FFd20/Pathfinder-Formeln: AC, Angriff, Crit, Saves, Ini, SG, EP
    data.js         Klassen/Zauber/Monster/Items als JSON (erweiterbar!)
    character.js    Charakter: 2 Klassen, BAB/Saves-Stacking, HP/MP, EP, Zweitklasse
    combat.js       Kampf-State-Machine (reine Logik, kein DOM außer via UI)
    world.js        Exploration: Tilemap, Zufallsräume, Encounter (Hausregel)
    save.js         localStorage: Run + Meta (Archetyp-Freischaltungen)
    ui.js           Rendering (Panels, Karten, Modals)
    main.js         Glue: Run-Lifecycle, Input, Belohnungen
  tests/run-tests.js  Node-Tests für Regeln/Berechnungen
  docs/             ARCHITECTURE.md, RULES_SOURCES.md
```

## Designprinzipien

- **Regeln vs. Darstellung getrennt**: `rules.js`/`combat.js` enthalten keine DOM-Zugriffe
  (außer `combat.js → character.js`-Sync); `ui.js`/`main.js` enthalten keine Formeln.
- **Daten statt Code**: Neue Klassen = Eintrag in `Data.classes` (+ Talente/Features);
  Archetypen = `{ baseClass, replaces: [featureIds], adds: [...] }` (Schema vorbereitet,
  Ersetzungslogik in v0.3). Keine Neuprogrammierung des Klassensystems nötig.
- **Effektsystem-Ansatz**: Features/Talente als Datenobjekte mit `id`; `combat.js`
  interpretiert sie (`limit_crit`, `power_attack`, …) statt pro Fähigkeit eigene Klassen.
- **Zweiklassen**: `char.classes = { id: { level, hpRolls } }`, BAB/Saves addieren sich
  (Pathfinder-Multiclass), HP/MP je Klasse, Fähigkeiten beider Klassen kombinierbar.
- **Portabilität**: Vanilla JS, keine Dependencies — lässt sich später nach Electron/Tauri
  oder in ein PC-Spiel-Framework übernehmen.
