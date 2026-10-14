# ⛧ CRIMSON HUNT

Ein düsteres **3D-Actionspiel im Stil von Devil May Cry — aber ohne Style-Meter, nur Jagd.**
Dämonenjäger mit Schwert-Kombo, Pistolen, Dash, Launcher und Teufels-Explosion gegen 5 Wellen
von Kathedralen-Dämonen plus Boss. Mit Bloom-Post-Processing, gotischer Mond-Kathedrale,
Partikeleffekten, Hit-Stop, Slow-Mo und prozeduralem Sound — ganz ohne Assets, alles wird
zur Laufzeit erzeugt (Three.js + Vite, Desktop via Electron).

## Starten

```bash
npm install
npm run dev        # Browser: http://localhost:3002
npm run build      # statischer Build nach dist/
npm run electron   # Desktop-App (baut + startet Electron)
```

## Steuerung

| Taste | Aktion |
|---|---|
| WASD / Maus | Bewegen / Kamera (Pointer Lock) |
| Linksklick | Schwert-Kombo (5 Hits, verkettbar) |
| Rechtsklick (halten) | Pistolen |
| Space | Sprung / Doppelsprung (mit Flip) |
| Shift | Dash mit i-Frames & Afterimages |
| F | Launcher (Gegner hochschleudern, +Juggle-Bonus) |
| E (in der Luft) | Helm-Breaker-Slam mit AoE |
| R (ab 50 Energie) | Teufels-Explosion (großer AoE + Slow-Mo) |
| Tab | Lock-On durchschalten |
| M / Esc | Ton an-aus / Pause |

## Features

- **Kampfsystem:** 5-Hit-Schwert-Kombo mit Hit-Stop & Camera-Shake, Hitscan-Pistolen mit
  Leuchtspur, Launcher-Juggling (+50 % Luftschaden), Dash-Cancel, Special mit Bildschirm-Flash
- **Gegner-KI:** 3 Dämonentypen (Puppet, Stalker, Brute) mit Spawn-, Chase-, Windup- und
  Angriffs-States + Boss „Kathedralen-Wächter“ mit Slash/Charge/Slam-Patterns und Enrage-Phase
- **Grafik:** Unreal-Bloom, ACES-Tonemapping, Echtzeit-Schatten, Marmor mit Reflektionen,
  Glasfenster, zwei Monde, Glut, Nebel, God Rays, Blitze, Schwert-Trails, Schockwellen,
  Schadenszahlen, Trefferkette (kein Style-Meter!)
- **Sound:** 100 % prozedurales WebAudio (Schwerter, Schüsse, Explosionen, Drone-Ambient)
- **Screens:** Titel, Pause, Game Over, Sieg — HUD auf Deutsch

<!-- omgithub:readme:start -->
## 🚀 Build, play, and remix with OMGithub

**Created using [OMGithub.com](https://omgithub.com).**

[![OMGithub](https://img.shields.io/badge/OMGithub-Open%20project-orange?style=for-the-badge)](https://omgithub.com/NotSponsored/PlayGround)
[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?logo=github&style=for-the-badge)](https://github.com/NotSponsored/PlayGround)

- 🎮 [Open the project](https://omgithub.com/NotSponsored/PlayGround).
- ✨ [Remix this project](https://omgithub.com/?remix=NotSponsored%2FPlayGround).
- 💻 [Explore the source](https://github.com/NotSponsored/PlayGround).
- 🛠️ [Check build runs](https://github.com/NotSponsored/PlayGround/actions).
- 🐛 [Report an issue](https://github.com/NotSponsored/PlayGround/issues).
- 👤 [Explore the creator's projects](https://omgithub.com/NotSponsored).
- 🌍 [Create with OMGithub](https://omgithub.com).
<!-- omgithub:readme:end -->
