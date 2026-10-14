import * as THREE from 'three';

/* ============================================================
   NEON ARENA — 3D Arena Shooter mit RPG-Elementen (Desktop)
   ============================================================ */

const $ = (id) => document.getElementById(id);
const canvas = $('game');
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const rand = (a, b) => a + Math.random() * (b - a);
const randPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ---------------- Audio (prozedural, keine Assets) ---------------- */
const AudioSys = {
  ctx: null, master: null, muted: false,
  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.25;
      this.master.connect(this.ctx.destination);
    } catch (e) { /* kein Audio */ }
  },
  tone(freq, dur, type = 'square', vol = 1, slide = 0) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + dur + 0.02);
  },
  noise(dur, vol = 1, low = 400) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const len = Math.floor(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = this.ctx.createBufferSource(); src.buffer = buf;
    const f = this.ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = low;
    const g = this.ctx.createGain(); g.gain.value = vol;
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start(t);
  },
  shoot() { this.tone(rand(700, 900), 0.08, 'sawtooth', 0.35, -500); },
  shotgun() { this.noise(0.18, 0.8, 900); this.tone(150, 0.15, 'square', 0.4, -80); },
  hit() { this.tone(rand(300, 380), 0.06, 'square', 0.3, -120); },
  boom() { this.noise(0.4, 1, 500); this.tone(90, 0.35, 'sine', 0.8, -50); },
  hurt() { this.tone(180, 0.2, 'sawtooth', 0.6, -100); },
  pickup() { this.tone(rand(900, 1100), 0.09, 'sine', 0.4, 500); },
  levelup() { [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => this.tone(f, 0.25, 'triangle', 0.6), i * 90)); },
  nova() { this.noise(0.5, 0.9, 2000); this.tone(120, 0.4, 'sawtooth', 0.5, 300); },
  dash() { this.noise(0.15, 0.5, 3000); },
  wave() { this.tone(220, 0.3, 'triangle', 0.5, 220); setTimeout(() => this.tone(330, 0.3, 'triangle', 0.5, 220), 150); },
  boss() { this.tone(70, 0.8, 'sawtooth', 0.7, -20); this.noise(0.6, 0.6, 300); },
};

/* ---------------- Konfiguration ---------------- */
const ARENA = 30; // Halbbreite

const CLASSES = {
  pulsar: { name: 'PULSAR', title: 'Chrono-Stürmerin', ref: 'Hommage an Tracer (Overwatch)', hp: 90, speed: 10.5, dmg: 6, fireRate: 12, projectiles: 1, spread: 0.03, crit: 0.15, armor: 0, lifesteal: 0, pierce: 0, abilityMul: 1.0, shotSpeed: 85, color: 0x00f0ff, secCD: 4, tertCD: 12, moveCD: 3 },
  aegis:  { name: 'AEGIS', title: 'Schildwache', ref: 'Hommage an Reinhardt (Overwatch) / Fernando (Paladins)', hp: 220, speed: 6.8, dmg: 22, fireRate: 1.6, projectiles: 1, spread: 0, crit: 0.05, armor: 0.3, lifesteal: 0, pierce: 0, abilityMul: 1.0, shotSpeed: 0, color: 0xff9a3d, secCD: 8, tertCD: 14, moveCD: 6 },
  meteor: { name: 'METEOR', title: 'Schwarzmagier', ref: 'Hommage an Black Mage (Final Fantasy)', hp: 100, speed: 7.2, dmg: 26, fireRate: 1.8, projectiles: 1, spread: 0.01, crit: 0.10, armor: 0, lifesteal: 0, pierce: 2, abilityMul: 1.3, shotSpeed: 45, color: 0xb44dff, secCD: 5, tertCD: 14, moveCD: 4 },
  ronin:  { name: 'RONIN', title: 'Cyber-Samurai', ref: 'Hommage an Genji (Overwatch)', hp: 110, speed: 9.5, dmg: 14, fireRate: 3.2, projectiles: 1, spread: 0, crit: 0.15, armor: 0.05, lifesteal: 0, pierce: 1, abilityMul: 1.1, shotSpeed: 90, color: 0x9adcff, secCD: 5, tertCD: 10, moveCD: 4 },
  doc:    { name: 'DOC', title: 'Frontsanitäter', ref: 'Hommage an Soldier 76 (Overwatch) / Lifeline (Apex)', hp: 130, speed: 8.2, dmg: 10, fireRate: 6, projectiles: 1, spread: 0.025, crit: 0.08, armor: 0.1, lifesteal: 0, pierce: 0, abilityMul: 1.0, shotSpeed: 75, color: 0x53ff8a, secCD: 7, tertCD: 15, moveCD: 5 },
  dragoon:{ name: 'DRAGOON', title: 'Himmelslanze', ref: 'Hommage an Dragoon (Final Fantasy)', hp: 150, speed: 8.6, dmg: 18, fireRate: 2.2, projectiles: 1, spread: 0, crit: 0.10, armor: 0.15, lifesteal: 0, pierce: 1, abilityMul: 1.1, shotSpeed: 55, color: 0x7fb2ff, secCD: 6, tertCD: 8, moveCD: 7 },
};

/* Fähigkeiten pro Klasse: Primär (LMB) / Sekundär (RMB) / Tertiär (Q) / Move (Shift) / Ult (E) */
const ABIL = {
  pulsar: {
    primary:   { icon: '🔫', name: 'Pulsar-Pistolen', key: 'LMB' },
    secondary: { icon: '💠', name: 'Scherbenfächer',  key: 'RMB' },
    tertiary:  { icon: '⏳', name: 'Zeitblase',       key: 'Q' },
    movement:  { icon: '✨', name: 'Blink',          key: 'SHIFT' },
    ult:       { icon: '💣', name: 'Pulsbombe',      key: 'E' },
  },
  aegis: {
    primary:   { icon: '🔨', name: 'Schlaghammer',   key: 'LMB' },
    secondary: { icon: '🔥', name: 'Feuerstoß',      key: 'RMB' },
    tertiary:  { icon: '🛡️', name: 'Barriere',       key: 'Q' },
    movement:  { icon: '🐗', name: 'Sturmangriff',   key: 'SHIFT' },
    ult:       { icon: '🌋', name: 'Erdbeben',       key: 'E' },
  },
  meteor: {
    primary:   { icon: '🔥', name: 'Feuer',          key: 'LMB' },
    secondary: { icon: '⚡', name: 'Donner',         key: 'RMB' },
    tertiary:  { icon: '🔷', name: 'Ley-Linien',     key: 'Q' },
    movement:  { icon: '🌀', name: 'Äther-Schritt',  key: 'SHIFT' },
    ult:       { icon: '☄️', name: 'Meteor',         key: 'E' },
  },
  ronin: {
    primary:   { icon: '🗡️', name: 'Katana',         key: 'LMB' },
    secondary: { icon: '🎯', name: 'Shuriken',       key: 'RMB' },
    tertiary:  { icon: '🌀', name: 'Klingenwirbel',  key: 'Q' },
    movement:  { icon: '⚡', name: 'Blitzschnitt',   key: 'SHIFT' },
    ult:       { icon: '🐉', name: 'Drachenklinge',  key: 'E' },
  },
  doc: {
    primary:   { icon: '🔫', name: 'Pulsgewehr',     key: 'LMB' },
    secondary: { icon: '🚀', name: 'Helix-Raketen',  key: 'RMB' },
    tertiary:  { icon: '💚', name: 'Heilfeld',       key: 'Q' },
    movement:  { icon: '🤸', name: 'Hechtsprung',    key: 'SHIFT' },
    ult:       { icon: '🎯', name: 'Visier',         key: 'E' },
  },
  dragoon: {
    primary:   { icon: '🔱', name: 'Lanzenstoß',     key: 'LMB' },
    secondary: { icon: '🦅', name: 'Speerwurf',      key: 'RMB' },
    tertiary:  { icon: '💨', name: 'Ausweichsprung', key: 'Q' },
    movement:  { icon: '🦘', name: 'Hochsprung',    key: 'SHIFT' },
    ult:       { icon: '🐲', name: 'Drachensturz',   key: 'E' },
  },
};

const ENEMIES = {
  drone:   { hp: 30,  speed: 6.5, radius: 0.9, dmg: 10, xp: 6,  score: 50,  color: 0xff2d55, kind: 'melee' },
  spitter: { hp: 45,  speed: 4.5, radius: 0.9, dmg: 9,  xp: 9,  score: 80,  color: 0xff7a3d, kind: 'ranged' },
  brute:   { hp: 140, speed: 3.2, radius: 1.4, dmg: 22, xp: 20, score: 150, color: 0xb44dff, kind: 'melee' },
  boss:    { hp: 700, speed: 3.8, radius: 2.4, dmg: 30, xp: 120, score: 1000, color: 0xff0033, kind: 'boss' },
};

const UPGRADE_POOL = [
  { id: 'dmg',    icon: '🔥', title: 'Schaden +20%',      desc: 'Alle Waffen und Nova machen +20% Schaden.' },
  { id: 'rate',   icon: '🔫', title: 'Feuerrate +15%',    desc: 'Du schießt 15% schneller.' },
  { id: 'hp',     icon: '❤️', title: 'Max-HP +25',        desc: '+25 max. Leben und sofort 50 HP Heilung.' },
  { id: 'speed',  icon: '👟', title: 'Tempo +10%',        desc: 'Bewege dich 10% schneller.' },
  { id: 'crit',   icon: '🎯', title: 'Crit +10%',        desc: '+10% kritische Trefferchance (2× Schaden).' },
  { id: 'multi',  icon: '🔱', title: '+1 Projektil',      desc: 'Ein zusätzliches Projektil pro Schuss.' },
  { id: 'pierce', icon: '🏹', title: 'Pierce +1',          desc: 'Projektile durchdringen +1 zusätzlichen Gegner.' },
  { id: 'steal',  icon: '🧛', title: 'Lifesteal +2%',     desc: '2% des ausgeteilten Schadens heilt dich.' },
  { id: 'armor',  icon: '🛡️', title: 'Rüstung +8%',       desc: 'Du nimmst 8% weniger Schaden (max 60%).' },
  { id: 'regen',  icon: '💚', title: 'Regeneration',      desc: '+1.2 HP pro Sekunde.' },
  { id: 'magnet', icon: '🧲', title: 'Magnet +60%',       desc: 'XP-Kristalle fliegen aus größerer Distanz zu dir.' },
  { id: 'nova',   icon: '💥', title: 'Ability-Stärke +50%', desc: 'Sekundär-, Tertiär- und Ult-Fähigkeiten machen +50% Schaden, Tertiär-CD -1s.' },
  { id: 'dash',   icon: '💨', title: 'Move-Profi',        desc: 'Move-Cooldown -25%, Move-Reichweite +30%.' },
];

/* ---------------- Spielzustand ---------------- */
const G = {
  state: 'menu',       // menu | playing | paused | levelup | gameover
  classKey: 'pulsar',
  level: 1, xp: 0, xpNeed: 12, pendingLevels: 0,
  score: 0, kills: 0, wave: 0, waveState: 'idle', waveTimer: 0,
  spawnQueue: [], spawnTimer: 0,
  time: 0, novaCD: 0, dashCD: 0, secCD: 0, dashTime: 0, iframes: 0,
  ult: 0, sprint: false, ramTime: 0, ramId: 0, ramDmg: 85,
  visorT: 0, dragonT: 0, airSlam: null, heal: null,
  wpnAnim: null, swingSide: 1,
  shakeT: 0, shakeDur: 0, shakeMag: 0,
  meteors: [], ley: null, barrier: null,
  firing: false, srchold: false, fireTimer: 0,
  best: parseInt(localStorage.getItem('neonArenaBest') || '0', 10),
  stats: null,
  player: { pos: new THREE.Vector3(0, 0, 8), vel: new THREE.Vector3(), yaw: 0, pitch: 0, hp: 100, radius: 0.8, py: 0, vy: 0, grounded: true },
};

function baseStats(key) {
  const c = CLASSES[key];
  return { ...c, maxHp: c.hp, regen: 0, magnet: 10, novaCDMax: c.tertCD, dashCDMax: c.moveCD, secCDMax: c.secCD, dashPower: 26 };
}
function xpNeedFor(level) { return Math.floor(10 + (level - 1) * 8 + Math.pow(level - 1, 2) * 2.5); }

/* ---------------- Three.js Setup ---------------- */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05070d);
scene.fog = new THREE.FogExp2(0x05070d, 0.011);

const camera = new THREE.PerspectiveCamera(78, window.innerWidth / window.innerHeight, 0.1, 400);
camera.rotation.order = 'YXZ';
scene.add(camera);

scene.add(new THREE.HemisphereLight(0x8899ff, 0x111122, 1.0));
scene.add(new THREE.AmbientLight(0x334466, 0.6));
const sun = new THREE.DirectionalLight(0xbfd9ff, 1.1);
sun.position.set(20, 34, 12);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -40; sun.shadow.camera.right = 40;
sun.shadow.camera.top = 40; sun.shadow.camera.bottom = -40;
scene.add(sun);
const fill = new THREE.DirectionalLight(0x6f7fd0, 0.45);
fill.position.set(-24, 18, -14);
scene.add(fill);
const centerLight = new THREE.PointLight(0x00f0ff, 1.2, 60);
centerLight.position.set(0, 9, 0);
scene.add(centerLight);

/* Arena-Boden + Gitter */
{
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(ARENA * 2 + 8, ARENA * 2 + 8),
    new THREE.MeshStandardMaterial({ color: 0x0e1428, roughness: 0.85, metalness: 0.15 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  const grid = new THREE.GridHelper(ARENA * 2, 30, 0x00f0ff, 0x0a2a3a);
  grid.position.y = 0.02;
  scene.add(grid);
  // Sterne
  const starGeo = new THREE.BufferGeometry();
  const starPos = [];
  for (let i = 0; i < 900; i++) {
    const r = rand(120, 300), th = rand(0, Math.PI * 2), ph = rand(0.05, Math.PI / 2.2);
    starPos.push(r * Math.cos(th) * Math.cos(ph), r * Math.sin(ph), r * Math.sin(th) * Math.cos(ph));
  }
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
  scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x88bbff, size: 0.7 })));
}

/* Wände */
const WALL_H = 4;
{
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x232f55, roughness: 0.7, metalness: 0.1, emissive: 0x0a1430, emissiveIntensity: 0.7 });
  const edgeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const stripCyan = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
  const stripPink = new THREE.MeshBasicMaterial({ color: 0xff2d78 });
  const mk = (w, d, x, z) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, WALL_H, d), wallMat);
    m.position.set(x, WALL_H / 2, z);
    m.castShadow = m.receiveShadow = true;
    scene.add(m);
    const e = new THREE.Mesh(new THREE.BoxGeometry(w === 1 ? 1.2 : w, 0.18, d === 1 ? 1.2 : d), edgeMat);
    e.position.set(x, WALL_H + 0.1, z);
    scene.add(e);
    // Leuchtstreifen auf der Innenseite: Orientierung auch bei direktem Davorstehen
    const alongX = w > d;
    const inward = alongX ? (z < 0 ? 1 : -1) : (x < 0 ? 1 : -1); // Richtung Arenamitte
    const stripLen = alongX ? w : d;
    [[1.1, stripCyan], [2.7, stripPink]].forEach(([y, smat]) => {
      const geo = alongX ? new THREE.BoxGeometry(stripLen, 0.09, 0.06) : new THREE.BoxGeometry(0.06, 0.09, stripLen);
      const s = new THREE.Mesh(geo, smat);
      s.position.set(
        alongX ? x : x + inward * 0.56,
        y,
        alongX ? z + inward * 0.56 : z
      );
      scene.add(s);
    });
  };
  mk(ARENA * 2 + 2, 1, 0, -ARENA - 0.5); mk(ARENA * 2 + 2, 1, 0, ARENA + 0.5);
  mk(1, ARENA * 2 + 2, -ARENA - 0.5, 0); mk(1, ARENA * 2 + 2, ARENA + 0.5, 0);
}

/* Säulen (Deckung + Hindernisse) */
const pillars = [];
{
  const spots = [[-12, -10, 2.2], [12, -10, 2.2], [-12, 10, 2.2], [12, 10, 2.2], [0, -18, 1.8], [0, 18, 1.8], [-20, 0, 1.8], [20, 0, 1.8], [0, 0, 2.6]];
  const mat = new THREE.MeshStandardMaterial({ color: 0x2a3760, roughness: 0.55, metalness: 0.2, emissive: 0x10204a, emissiveIntensity: 0.8 });
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xff2d78 });
  for (const [x, z, r] of spots) {
    const h = rand(4, 7);
    const p = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.85, r, h, 10), mat);
    p.position.set(x, h / 2, z);
    p.castShadow = p.receiveShadow = true;
    scene.add(p);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r * 0.9, 0.09, 8, 24), ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(x, h * 0.72, z);
    scene.add(ring);
    pillars.push({ x, z, r: r * 0.95 });
  }
}

/* Mittlerer Kristall (Deko) */
{
  const c = new THREE.Mesh(
    new THREE.OctahedronGeometry(1.4),
    new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 1.2, roughness: 0.2 })
  );
  c.position.set(0, 6.5, -24);
  c.name = 'deko-crystal';
  scene.add(c);
  const l = new THREE.PointLight(0x00f0ff, 1.5, 30);
  l.position.set(0, 6.5, -24);
  scene.add(l);
}

/* Waffen-Viewmodels: jede Klasse hat ihr eigenes Modell + Mündung.
   Nahkampfklassen tragen sichtbare Nahkampfwaffen mit Schwung-Animation. */
const gun = new THREE.Group();
let muzzle, muzzleLight;
const WPN = {};
function regWpn(key, group, tip) {
  group.visible = false;
  gun.add(group);
  WPN[key] = {
    group, tip,
    basePos: group.position.clone(),
    baseRot: group.rotation.clone(),
  };
}
{
  const dark = new THREE.MeshStandardMaterial({ color: 0x232f55, roughness: 0.45, metalness: 0.4 });
  const steel = new THREE.MeshStandardMaterial({ color: 0x8fa3c8, roughness: 0.25, metalness: 0.9 });
  const glowCyan = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const M = (geo, mat, x = 0, y = 0, z = 0) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    return m;
  };

  // PULSAR: Doppel-Pistolen
  {
    const g = new THREE.Group();
    for (const [sx, dy, dz] of [[0.03, 0, 0], [-0.13, -0.05, 0.1]]) {
      g.add(M(new THREE.BoxGeometry(0.09, 0.13, 0.36), dark, sx, dy, dz));
      g.add(M(new THREE.BoxGeometry(0.095, 0.03, 0.2), glowCyan, sx, dy - 0.05, dz - 0.04));
    }
    regWpn('pulsar', g, new THREE.Vector3(0.03, 0.02, -0.42));
  }
  // AEGIS: Kriegshammer (diagonal gehalten)
  {
    const g = new THREE.Group();
    const orange = new THREE.MeshBasicMaterial({ color: 0xff9a3d });
    const handle = M(new THREE.CylinderGeometry(0.035, 0.042, 0.95, 8), dark, 0.05, -0.05, -0.25);
    handle.rotation.x = -0.45;
    g.add(handle);
    const head = M(new THREE.BoxGeometry(0.4, 0.24, 0.24), dark, 0.05, 0.32, -0.5);
    g.add(head);
    g.add(M(new THREE.BoxGeometry(0.42, 0.08, 0.26), orange, 0.05, 0.32, -0.5));
    g.add(M(new THREE.SphereGeometry(0.06, 8, 8), steel, 0.05, -0.5, -0.05));
    g.rotation.x = -0.3;
    regWpn('aegis', g, new THREE.Vector3(0.05, 0.32, -0.62));
  }
  // METEOR: Stab mit Kristall (Projektile starten am Kristall)
  {
    const g = new THREE.Group();
    const purple = new THREE.MeshStandardMaterial({ color: 0xb44dff, emissive: 0xb44dff, emissiveIntensity: 1.6, roughness: 0.2 });
    const rod = M(new THREE.CylinderGeometry(0.028, 0.036, 1.15, 8), dark, 0.05, -0.05, -0.25);
    rod.rotation.x = -0.18;
    g.add(rod);
    const crystal = M(new THREE.OctahedronGeometry(0.11), purple, 0.05, 0.55, -0.36);
    g.add(crystal);
    const band1 = M(new THREE.TorusGeometry(0.07, 0.015, 6, 16), steel, 0.05, 0.38, -0.33);
    band1.rotation.x = -0.18;
    g.add(band1);
    regWpn('meteor', g, new THREE.Vector3(0.05, 0.55, -0.36));
  }
  // RONIN: Katana
  {
    const g = new THREE.Group();
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0xbfe9ff, roughness: 0.2, metalness: 0.95, emissive: 0x224455, emissiveIntensity: 0.5 });
    const blade = M(new THREE.BoxGeometry(0.025, 0.075, 0.8), bladeMat, 0.03, 0.03, -0.48);
    blade.rotation.y = 0.06;
    g.add(blade);
    const guard = M(new THREE.CylinderGeometry(0.06, 0.06, 0.025, 10), steel, 0.03, 0.0, -0.09);
    guard.rotation.x = Math.PI / 2;
    g.add(guard);
    const grip = M(new THREE.CylinderGeometry(0.024, 0.026, 0.24, 8), dark, 0.03, -0.02, 0.03);
    grip.rotation.x = Math.PI / 2 - 0.1;
    g.add(grip);
    g.rotation.x = -0.12;
    g.rotation.y = 0.35; // Klinge schräg ins Bild
    regWpn('ronin', g, new THREE.Vector3(0.03, 0.04, -0.88));
  }
  // DOC: Pulsgewehr (bullig, mit Visier)
  {
    const g = new THREE.Group();
    const green = new THREE.MeshBasicMaterial({ color: 0x53ff8a });
    g.add(M(new THREE.BoxGeometry(0.15, 0.19, 0.8), dark, 0, 0, -0.2));
    const barrel = M(new THREE.CylinderGeometry(0.04, 0.04, 0.42, 10), dark, 0, 0.03, -0.78);
    barrel.rotation.x = Math.PI / 2;
    g.add(barrel);
    g.add(M(new THREE.BoxGeometry(0.16, 0.03, 0.4), green, 0, -0.06, -0.2));
    g.add(M(new THREE.BoxGeometry(0.05, 0.07, 0.12), dark, 0, 0.13, -0.15)); // Visier
    g.add(M(new THREE.BoxGeometry(0.05, 0.14, 0.06), dark, 0, -0.15, 0.05)); // Griff
    regWpn('doc', g, new THREE.Vector3(0, 0.03, -1.0));
  }
  // DRAGOON: Lange Lanze (Stich-Animation)
  {
    const g = new THREE.Group();
    const shaft = M(new THREE.CylinderGeometry(0.024, 0.03, 1.5, 8), dark, 0, 0.01, -0.4);
    shaft.rotation.x = Math.PI / 2;
    g.add(shaft);
    const head = M(new THREE.ConeGeometry(0.07, 0.28, 8), steel, 0, 0.01, -1.28);
    head.rotation.x = -Math.PI / 2;
    g.add(head);
    g.add(M(new THREE.BoxGeometry(0.02, 0.12, 0.1), steel, 0, 0.01, -1.1));
    g.add(M(new THREE.SphereGeometry(0.045, 8, 8), dark, 0, 0.01, 0.32));
    g.rotation.x = -0.06;
    regWpn('dragoon', g, new THREE.Vector3(0, 0.01, -1.42));
  }

  muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffaa, transparent: true, opacity: 0 }));
  muzzleLight = new THREE.PointLight(0x66ddff, 0, 12);
  gun.position.set(0.32, -0.28, -0.55);
  camera.add(gun);
}
let activeWpnKey = null;
function setActiveWeapon(key) {
  for (const [k, w] of Object.entries(WPN)) w.group.visible = (k === key);
  activeWpnKey = key;
  const w = WPN[key];
  if (w) {
    w.group.add(muzzle);
    muzzle.position.copy(w.tip);
    w.group.add(muzzleLight);
    muzzleLight.position.copy(w.tip);
  }
  G.wpnAnim = null;
}
/* Waffen-Animation: Recoil / Cast / Chop / Slash / Thrust / Spin */
function triggerWpn(kind, dur) {
  G.wpnAnim = {
    t: 0,
    dur: dur || (kind === 'recoil' ? 0.14 : kind === 'spin' ? 0.35 : 0.3),
    kind,
  };
}
function updateWeapon(dt) {
  const w = WPN[G.classKey];
  if (!w) return;
  let px = 0, py = 0, pz = 0, rx = 0, ry = 0, rz = 0;
  const a = G.wpnAnim;
  if (a) {
    a.t += dt;
    const k = clamp(a.t / a.dur, 0, 1);
    const back = Math.sin(Math.min(1, k) * Math.PI); // auf und ab
    if (a.kind === 'recoil') { pz += 0.13 * (1 - k); rx += 0.09 * (1 - k); }
    else if (a.kind === 'cast') { py += 0.12 * back; rx -= 0.2 * back; }
    else if (a.kind === 'chop') { rx += -0.9 + 1.6 * k; pz -= 0.12 * k; py -= 0.08 * back; }
    else if (a.kind === 'slash') { const s = G.swingSide || 1; ry += s * (-0.5 + 1.0 * k); rz += s * 0.3 * back; px += s * 0.08 * (1 - 2 * k); }
    else if (a.kind === 'thrust') { pz -= 0.45 * back; rx -= 0.06 * back; }
    else if (a.kind === 'spin') { ry += Math.PI * 2 * k; py += 0.06 * back; }
    if (k >= 1) G.wpnAnim = null;
  }
  // Idle-Schwanken
  ry += Math.sin(G.time * 1.3) * 0.02;
  px += Math.sin(G.time * 0.9) * 0.005;
  w.group.position.set(w.basePos.x + px, w.basePos.y + py, w.basePos.z + pz);
  w.group.rotation.set(w.baseRot.x + rx, w.baseRot.y + ry, w.baseRot.z + rz);
}

/* Partikel-Ringe & Co. siehe Pools weiter unten */

/* ---------------- Pools: Projektile, Partikel, Orbs ---------------- */
function makePool(n, factory) {
  const arr = [];
  for (let i = 0; i < n; i++) { const o = factory(); o.visible = false; scene.add(o.mesh); arr.push(o); }
  return arr;
}
const playerShots = makePool(120, () => ({
  mesh: new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0x66ffff })),
  vel: new THREE.Vector3(), life: 0, dmg: 0, pierceLeft: 0, hits: [], active: false,
}));
const enemyShots = makePool(120, () => ({
  mesh: new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), new THREE.MeshBasicMaterial({ color: 0xff5533 })),
  vel: new THREE.Vector3(), life: 0, dmg: 0, pierceLeft: 0, hits: [], active: false,
}));
const particles = makePool(260, () => ({
  mesh: new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.16), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true })),
  vel: new THREE.Vector3(), life: 0, maxLife: 1, active: false,
}));
const orbs = makePool(160, () => ({
  mesh: new THREE.Mesh(new THREE.IcosahedronGeometry(0.28, 0), new THREE.MeshStandardMaterial({ color: 0x00ffaa, emissive: 0x00ffaa, emissiveIntensity: 1.4 })),
  vel: new THREE.Vector3(), value: 0, active: false,
}));
/* Granaten (klebrig für Pulsbombe) */
const nades = makePool(24, () => ({
  mesh: new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 10), new THREE.MeshStandardMaterial({ color: 0x39ff6a, emissive: 0x39ff6a, emissiveIntensity: 1.2 })),
  vel: new THREE.Vector3(), fuse: 0, blastR: 6, blastDmg: 75, isUlt: false, stick: null, active: false,
}));
/* Blitz-/Railgun-Strahlen */
const beams = makePool(16, () => ({
  mesh: new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false })),
  life: 0, maxLife: 1, active: false,
}));
/* Expansionsringe für Explosionen */
const rings = makePool(8, () => {
  const mesh = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.12, 8, 48),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  mesh.rotation.x = Math.PI / 2;
  return { mesh, t: 0, maxR: 10, active: false };
});
function spawnRing(pos, color, maxR = 11) {
  for (const r of rings) {
    if (r.active) continue;
    r.active = true; r.mesh.visible = true;
    r.mesh.position.set(pos.x, 1.2, pos.z);
    r.mesh.material.color.setHex(color);
    r.mesh.material.opacity = 0.9;
    r.t = 0.001; r.maxR = maxR;
    return;
  }
}
function spawnBeam(a, b, color, width, life) {
  for (const bm of beams) {
    if (bm.active) continue;
    bm.active = true; bm.mesh.visible = true;
    const len = a.distanceTo(b);
    bm.mesh.position.copy(a).add(b).multiplyScalar(0.5);
    bm.mesh.lookAt(b);
    bm.mesh.scale.set(width, width, len);
    bm.mesh.material.color.setHex(color);
    bm.mesh.material.opacity = 0.9;
    bm.life = bm.maxLife = life;
    return;
  }
}
/* Aegis-Barriere: deploybare Energiewand */
const barrierMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 2.8),
  new THREE.MeshBasicMaterial({ color: 0x53c8ff, transparent: true, opacity: 0.28, side: THREE.DoubleSide, depthWrite: false })
);
barrierMesh.visible = false;
scene.add(barrierMesh);
const barrierFrame = new THREE.Mesh(
  new THREE.BoxGeometry(5.2, 0.15, 0.15),
  new THREE.MeshBasicMaterial({ color: 0x9adcff })
);
barrierFrame.visible = false;
scene.add(barrierFrame);
/* Meteor Ley-Linien-Kreis */
const leyGroup = new THREE.Group();
{
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.5, 0.12, 8, 48),
    new THREE.MeshBasicMaterial({ color: 0xffd23f, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.15;
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(3.5, 40),
    new THREE.MeshBasicMaterial({ color: 0xffd23f, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = 0.06;
  leyGroup.add(ring); leyGroup.add(disc);
  leyGroup.visible = false;
  scene.add(leyGroup);
}
/* Doc-Heilfeld-Kreis */
const healRing = new THREE.Group();
{
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.5, 0.12, 8, 48),
    new THREE.MeshBasicMaterial({ color: 0x53ff8a, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.15;
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(3.5, 40),
    new THREE.MeshBasicMaterial({ color: 0x53ff8a, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = 0.06;
  healRing.add(ring); healRing.add(disc);
  healRing.visible = false;
  scene.add(healRing);
}
const warnPool = makePool(6, () => ({
  mesh: new THREE.Mesh(
    new THREE.CircleGeometry(7, 32),
    new THREE.MeshBasicMaterial({ color: 0xff2222, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false })
  ),
  active: false,
}));
for (const w of warnPool) { w.mesh.rotation.x = -Math.PI / 2; w.mesh.position.y = 0.07; }

function spawnParticle(pos, color, speed = 8, life = 0.7, n = 6) {
  let c = 0;
  for (const p of particles) {
    if (p.active) continue;
    p.active = true; p.mesh.visible = true;
    p.mesh.position.copy(pos);
    p.mesh.material.color.setHex(color);
    p.mesh.material.opacity = 1;
    p.vel.set(rand(-1, 1), rand(0, 1.4), rand(-1, 1)).normalize().multiplyScalar(rand(speed * 0.4, speed));
    p.life = p.maxLife = rand(life * 0.6, life);
    if (++c >= n) break;
  }
}
function spawnOrb(pos, value) {
  for (const o of orbs) {
    if (o.active) continue;
    o.active = true; o.mesh.visible = true;
    o.mesh.position.set(pos.x + rand(-1, 1), 0.7, pos.z + rand(-1, 1));
    o.vel.set(rand(-3, 3), rand(2, 5), rand(-3, 3));
    o.value = value;
    return;
  }
}
function fireShot(pool, from, dir, speed, dmg) {
  for (const s of pool) {
    if (s.active) continue;
    s.active = true; s.mesh.visible = true;
    s.mesh.position.copy(from);
    s.vel.copy(dir).multiplyScalar(speed);
    s.life = 1.6; s.dmg = dmg;
    s.pierceLeft = G.stats ? G.stats.pierce : 0;
    s.hits.length = 0;
    return s;
  }
}

/* ---------------- Gegner ---------------- */
const enemies = [];
const enemyGeoCache = {};
function enemyMesh(type) {
  const color = ENEMIES[type].color;
  const grp = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.55, roughness: 0.4 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x232f55, roughness: 0.5, metalness: 0.3 });
  let core, radius = ENEMIES[type].radius;
  if (type === 'drone') {
    core = new THREE.Mesh(new THREE.OctahedronGeometry(0.7), mat);
    core.position.y = 1.2;
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    eye.position.set(0, 1.2, 0.55);
    grp.add(eye);
  } else if (type === 'spitter') {
    core = new THREE.Mesh(new THREE.TetrahedronGeometry(0.9), mat);
    core.position.y = 1.1;
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.9, 6), dark);
    spike.position.y = 2.0;
    grp.add(spike);
  } else if (type === 'brute') {
    core = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.2, 1.8), mat);
    core.position.y = 1.4;
    for (const sx of [-1, 1]) {
      const fist = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), dark);
      fist.position.set(sx * 1.3, 1.0, 0.3);
      grp.add(fist);
    }
  } else { // boss
    core = new THREE.Mesh(new THREE.BoxGeometry(3.2, 4.2, 3.2), mat);
    core.position.y = 2.4;
    const crown = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.25, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffd23f }));
    crown.position.y = 4.9;
    grp.add(crown);
  }
  core.castShadow = true;
  grp.add(core);
  grp.userData.core = core;
  grp.userData.baseEmissive = 0.55;
  // HP-Balken (Billboard)
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(radius * 1.6, 0.18), new THREE.MeshBasicMaterial({ color: 0x330000, depthTest: false }));
  const fg = new THREE.Mesh(new THREE.PlaneGeometry(radius * 1.6, 0.18), new THREE.MeshBasicMaterial({ color: 0x53ff8a, depthTest: false }));
  const hbY = type === 'boss' ? 5.8 : type === 'brute' ? 3.0 : 2.3;
  bg.position.y = hbY; fg.position.y = hbY; fg.position.z = 0.01;
  grp.add(bg); grp.add(fg);
  grp.userData.hpBg = bg; grp.userData.hpFg = fg; grp.userData.hpW = radius * 1.6;
  return grp;
}

function spawnEnemy(type, wave) {
  const cfg = ENEMIES[type];
  const scale = 1 + (wave - 1) * 0.06 + (G.wave > 8 ? (G.wave - 8) * 0.03 : 0);
  const mesh = enemyMesh(type);
  // Spawnposition am Rand, weg vom Spieler
  let x = 0, z = 0;
  for (let i = 0; i < 12; i++) {
    const side = Math.floor(rand(0, 4));
    const t = rand(-ARENA + 3, ARENA - 3);
    if (side === 0) { x = t; z = -ARENA + 3; } else if (side === 1) { x = t; z = ARENA - 3; }
    else if (side === 2) { x = -ARENA + 3; z = t; } else { x = ARENA - 3; z = t; }
    const dx = x - G.player.pos.x, dz = z - G.player.pos.z;
    if (dx * dx + dz * dz > 18 * 18) break;
  }
  mesh.position.set(x, 0, z);
  scene.add(mesh);
  const hp = Math.round(cfg.hp * scale * (type === 'boss' ? (1 + wave * 0.12) : 1));
  const e = {
    type, mesh, hp, maxHp: hp,
    speed: cfg.speed * rand(0.9, 1.1) * (type === 'boss' ? 1 : Math.min(1.35, 1 + wave * 0.015)),
    radius: cfg.radius, dmg: Math.round(cfg.dmg * (1 + wave * 0.04)),
    xp: cfg.xp, score: cfg.score,
    atkCD: 0, shootCD: rand(1, 2.5), summonCD: 5, radialCD: 3, flash: 0,
    slowT: 0, stunT: 0, ramId: 0,
    strafeDir: Math.random() < 0.5 ? -1 : 1, strafeT: rand(1, 3), bob: rand(0, 9),
  };
  enemies.push(e);
  spawnParticle(mesh.position.clone().setY(1.2), cfg.color, 10, 0.6, 10);
  return e;
}

/* Boss-Balken */
const bossBar = document.createElement('div');
bossBar.id = 'bossbar';
bossBar.style.cssText = 'position:absolute;top:56px;left:50%;transform:translateX(-50%);width:480px;max-width:70vw;display:none;text-align:center;';
bossBar.innerHTML = '<div style="font-size:12px;letter-spacing:3px;color:#ff6b81;margin-bottom:4px">☠ BOSS ☠</div><div style="height:14px;background:rgba(0,0,0,.6);border:1px solid #ff2d55;border-radius:7px;overflow:hidden"><div id="bossfill" style="height:100%;width:100%;background:linear-gradient(90deg,#ff0033,#ff7a3d)"></div></div>';
$('hud').appendChild(bossBar);

/* ---------------- Eingabe ---------------- */
const keys = {};
let pointerLocked = false;
document.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  // Space darf im Spiel keine Buttons aktivieren / Seite scrollen
  if (e.code === 'Space' && G.state === 'playing') e.preventDefault();
  if (G.state !== 'playing' || e.repeat) {
    if (e.code === 'KeyM' && !e.repeat) { AudioSys.muted = !AudioSys.muted; toast(AudioSys.muted ? '🔇 Ton aus' : '🔊 Ton an'); }
    if (G.state === 'levelup' && ['Digit1', 'Digit2', 'Digit3'].includes(e.code)) {
      chooseUpgrade(parseInt(e.code.slice(-1), 10) - 1);
    }
    if (G.state === 'gameover' && e.code === 'Enter') restartToMenu(false);
    return;
  }
  if (e.code === 'Space') tryJump();
  if (e.code === 'KeyE') doUlt();
  if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
    G.sprint = !G.sprint;
    toast(G.sprint ? '🏃 Sprint AN' : '🚶 Sprint AUS', 1200);
  }
});
document.addEventListener('keyup', (e) => { keys[e.code] = false; });
document.addEventListener('mousemove', (e) => {
  if (!pointerLocked || G.state !== 'playing') return;
  G.player.yaw -= e.movementX * 0.0022;
  G.player.pitch = clamp(G.player.pitch - e.movementY * 0.0022, -1.45, 1.45);
});
document.addEventListener('mousedown', (e) => {
  if (G.state !== 'playing') return;
  if (!pointerLocked) { lockPointer(); return; }
  if (e.button === 0) G.firing = true;
  if (e.button === 2) G.srchold = true;
});
document.addEventListener('mouseup', (e) => { if (e.button === 0) G.firing = false; if (e.button === 2) G.srchold = false; });
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('pointerlockchange', () => {
  pointerLocked = document.pointerLockElement === canvas;
  if (!pointerLocked && G.state === 'playing') pauseGame();
});
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
function lockPointer() { if (canvas.requestPointerLock) { try { canvas.requestPointerLock(); } catch (e) {} } }

/* ---------------- UI-Helfer ---------------- */
let toastTimer = 0;
function toast(msg, ms = 2200) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), ms);
}
function floater(worldPos, text, cls = '') {
  const v = worldPos.clone();
  v.y += 1.2;
  v.project(camera);
  if (v.z > 1) return;
  const el = document.createElement('div');
  el.className = 'floater ' + cls;
  el.textContent = text;
  el.style.left = ((v.x * 0.5 + 0.5) * window.innerWidth) + 'px';
  el.style.top = ((-v.y * 0.5 + 0.5) * window.innerHeight) + 'px';
  $('floaters').appendChild(el);
  setTimeout(() => el.remove(), 850);
  while ($('floaters').children.length > 40) $('floaters').firstChild.remove();
}
function feed(text) {
  const el = document.createElement('div');
  el.className = 'feed';
  el.textContent = text;
  $('killfeed').prepend(el);
  setTimeout(() => el.remove(), 3200);
  while ($('killfeed').children.length > 5) $('killfeed').lastChild.remove();
}
function showBanner(title, sub = '') {
  $('wave-title').textContent = title;
  $('wave-sub').textContent = sub;
  const b = $('wave-banner');
  b.classList.remove('hidden');
  // Animation neu triggern
  b.style.animation = 'none'; void b.offsetWidth; b.style.animation = '';
  clearTimeout(showBanner.t);
  showBanner.t = setTimeout(() => b.classList.add('hidden'), 2600);
}

/* ---------------- Spielfluss ---------------- */
function startGame(classKey) {
  AudioSys.init();
  if (AudioSys.ctx && AudioSys.ctx.state === 'suspended') AudioSys.ctx.resume();
  G.classKey = classKey;
  G.stats = baseStats(classKey);
  G.player.hp = G.stats.maxHp;
  G.player.pos.set(0, 0, 8);
  G.player.vel.set(0, 0, 0);
  G.player.yaw = 0; G.player.pitch = 0;
  G.level = 1; G.xp = 0; G.xpNeed = xpNeedFor(1); G.pendingLevels = 0;
  G.score = 0; G.kills = 0; G.wave = 0;
  G.novaCD = 0; G.dashCD = 0; G.secCD = 0; G.dashTime = 0; G.iframes = 0;
  G.ult = 0; G.sprint = false; G.ramTime = 0; G.ramDmg = 85;
  G.visorT = 0; G.dragonT = 0; G.airSlam = null; G.heal = null;
  G.shakeT = 0; G.meteors = []; G.ley = null; G.barrier = null;
  G.firing = false; G.srchold = false; G.fireTimer = 0; G.time = 0;
  G.player.py = 0; G.player.vy = 0; G.player.grounded = true;
  // Fokus von Menü-Buttons entfernen (Space löst sonst versehentlich Klicks aus)
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  // Welt aufräumen
  for (const e of enemies) scene.remove(e.mesh);
  enemies.length = 0;
  for (const pool of [playerShots, enemyShots, particles, orbs, nades, beams, rings, warnPool])
    for (const o of pool) { o.active = false; o.mesh.visible = false; }
  barrierMesh.visible = false;
  barrierFrame.visible = false;
  leyGroup.visible = false;
  healRing.visible = false;
  $('menu').classList.add('hidden');
  $('gameover').classList.add('hidden');
  $('pause').classList.add('hidden');
  $('levelup').classList.add('hidden');
  $('hud').classList.remove('hidden');
  $('hud-best').textContent = G.best;
  bossBar.style.display = 'none';
  G.state = 'playing';
  lockPointer();
  buildAbilityBar();
  setActiveWeapon(G.classKey);
  updateStatsMini();
  toast(`Klasse ${CLASSES[classKey].name} — Viel Glück!`, 2600);
  nextWave();
}

function pauseGame() {
  if (G.state !== 'playing') return;
  G.state = 'paused';
  G.firing = false; G.srchold = false;
  $('pause-stats').innerHTML = `Welle <b>${G.wave}</b> • Level <b>${G.level}</b> • Score <b>${G.score}</b><br>Kills <b>${G.kills}</b> • HP <b>${Math.ceil(G.player.hp)}/${G.stats.maxHp}</b>`;
  $('pause').classList.remove('hidden');
}
function resumeGame() {
  if (G.state !== 'paused' && G.state !== 'levelup-wait') return;
  $('pause').classList.add('hidden');
  G.state = 'playing';
  lockPointer();
}
function gameOver() {
  G.state = 'gameover';
  G.firing = false; G.srchold = false;
  document.exitPointerLock && document.exitPointerLock();
  AudioSys.boom();
  spawnParticle(G.player.pos.clone().setY(1.5), 0xff2d55, 14, 1, 24);
  const isBest = G.score > G.best;
  if (isBest) { G.best = G.score; localStorage.setItem('neonArenaBest', String(G.best)); }
  $('go-stats').innerHTML = `Level <b>${G.level}</b> • Welle <b>${G.wave}</b> • Kills <b>${G.kills}</b><br>Score <b>${G.score}</b>${isBest ? '<br>🏆 NEUER REKORD!' : `<br>Rekord: <b>${G.best}</b>`}`;
  $('gameover').classList.remove('hidden');
  $('hud-best').textContent = G.best;
}
function restartToMenu(toMenu = true) {
  $('gameover').classList.add('hidden');
  $('pause').classList.add('hidden');
  $('hud').classList.add('hidden');
  bossBar.style.display = 'none';
  G.state = 'menu';
  if (toMenu) $('menu').classList.remove('hidden');
  else { // direkter Neustart mit gleicher Klasse
    startGame(G.classKey);
  }
}

document.querySelectorAll('.class-card').forEach((btn) => {
  btn.addEventListener('click', () => startGame(btn.dataset.class));
});
/* Klassenwechsel aus Pause / Game-Over (ESC-Menü) */
function buildClassPickers() {
  for (const id of ['pause-classes', 'go-classes']) {
    const box = $(id);
    if (!box) continue;
    box.innerHTML = '';
    for (const [key, c] of Object.entries(CLASSES)) {
      const b = document.createElement('button');
      b.className = 'pick-btn';
      b.innerHTML = `${ABIL[key].primary.icon} ${c.name}<small>${c.title}</small>`;
      b.addEventListener('click', () => startGame(key));
      box.appendChild(b);
    }
  }
}
buildClassPickers();
$('btn-resume').addEventListener('click', resumeGame);
$('btn-restart2').addEventListener('click', () => { $('pause').classList.add('hidden'); startGame(G.classKey); });
$('btn-restart').addEventListener('click', () => restartToMenu(false));
$('btn-tomenu').addEventListener('click', () => restartToMenu(true));
canvas.addEventListener('click', () => {
  if (G.state === 'paused') resumeGame();
  else if (G.state === 'playing' && !pointerLocked) lockPointer();
});

/* ---------------- Wellen ---------------- */
function nextWave() {
  G.wave++;
  const isBoss = G.wave % 5 === 0;
  const q = [];
  if (isBoss) {
    q.push('boss');
    const adds = Math.min(2 + G.wave, 10);
    for (let i = 0; i < adds; i++) q.push(Math.random() < 0.6 ? 'drone' : 'spitter');
    AudioSys.boss();
    showBanner(`☠ BOSS — WELLE ${G.wave}`, 'Besiege den Arena-Champion!');
    feed(`☠ Boss in Welle ${G.wave}!`);
  } else {
    const count = Math.min(4 + G.wave * 2, 30);
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      let t = 'drone';
      if (G.wave >= 3 && r < 0.22) t = 'brute';
      else if (G.wave >= 2 && r < 0.55) t = 'spitter';
      q.push(t);
    }
    // mischen
    q.sort(() => Math.random() - 0.5);
    AudioSys.wave();
    showBanner(`WELLE ${G.wave}`, `${count} Gegner • Viel Glück`);
  }
  G.spawnQueue = q;
  G.spawnTimer = 0.5;
  G.waveState = 'spawning';
  $('hud-wave').textContent = G.wave;
}

/* ---------------- XP / Level / Upgrades ---------------- */
function gainXp(v, pos) {
  G.xp += v;
  if (pos) floater(pos, `+${v} XP`, 'xp');
  AudioSys.pickup();
  while (G.xp >= G.xpNeed) {
    G.xp -= G.xpNeed;
    G.level++;
    G.xpNeed = xpNeedFor(G.level);
    G.pendingLevels++;
  }
  if (G.pendingLevels > 0 && G.state === 'playing') openLevelUp();
}
function openLevelUp() {
  G.state = 'levelup';
  G.firing = false; G.srchold = false;
  document.exitPointerLock && document.exitPointerLock();
  AudioSys.levelup();
  $('lu-level').textContent = G.level;
  const cards = $('lu-cards');
  cards.innerHTML = '';
  // 3 zufällige, unterschiedliche Upgrades
  const pool = [...UPGRADE_POOL].sort(() => Math.random() - 0.5).slice(0, 3);
  G.currentChoices = pool;
  pool.forEach((u, i) => {
    const d = document.createElement('div');
    d.className = 'lu-card';
    d.innerHTML = `<div class="e">${u.icon}</div><div class="t">${u.title}</div><div class="d">${u.desc}</div><div class="k">[ ${i + 1} ] drücken oder klicken</div>`;
    d.addEventListener('click', () => chooseUpgrade(i));
    cards.appendChild(d);
  });
  $('levelup').classList.remove('hidden');
  showBanner.t && clearTimeout(showBanner.t);
}
function chooseUpgrade(i) {
  if (G.state !== 'levelup') return;
  const u = G.currentChoices && G.currentChoices[i];
  if (!u) return;
  applyUpgrade(u.id);
  G.pendingLevels--;
  feed(`⬆ ${u.title}`);
  $('levelup').classList.add('hidden');
  if (G.pendingLevels > 0) { openLevelUp(); return; }
  G.state = 'playing';
  updateStatsMini();
  toast('Klick zum Weiterspielen', 1800);
  // Pointer-Lock braucht eine Geste: der Klick aufs Upgrade zählt —
  // wir versuchen es direkt, sonst hilft der nächste Klick.
  lockPointer();
}
function applyUpgrade(id) {
  const s = G.stats;
  switch (id) {
    case 'dmg': s.dmg *= 1.2; break;
    case 'rate': s.fireRate *= 1.15; break;
    case 'hp': s.maxHp += 25; G.player.hp = Math.min(s.maxHp, G.player.hp + 50); break;
    case 'speed': s.speed *= 1.1; break;
    case 'crit': s.crit = Math.min(0.8, s.crit + 0.1); break;
    case 'multi': s.projectiles = Math.min(8, s.projectiles + 1); break;
    case 'pierce': s.pierce = Math.min(5, s.pierce + 1); break;
    case 'steal': s.lifesteal += 0.02; break;
    case 'armor': s.armor = Math.min(0.6, s.armor + 0.08); break;
    case 'regen': s.regen += 1.2; break;
    case 'magnet': s.magnet *= 1.6; break;
    case 'nova': s.abilityMul *= 1.5; s.novaCDMax = Math.max(3, s.novaCDMax - 1); break;
    case 'dash': s.dashCDMax *= 0.75; s.dashPower *= 1.3; break;
  }
}

/* ---------------- Fähigkeiten ---------------- */
const _novaPos = new THREE.Vector3();
/* Ley-Linien-Bonus (Meteor-Q): +40% Schaden im Kreis */
function dmgBuffMul() {
  if (G.ley && G.ley.t > 0) {
    const dx = G.player.pos.x - G.ley.x, dz = G.player.pos.z - G.ley.z;
    if (dx * dx + dz * dz < 3.5 * 3.5) return 1.4;
  }
  return 1;
}
const abilPow = () => G.stats.abilityMul * (1 + (G.level - 1) * 0.05) * dmgBuffMul();

function gainUlt(v) {
  if (G.state !== 'playing' || G.ult >= 100) return;
  G.ult = Math.min(100, G.ult + v);
  if (G.ult >= 100) {
    toast('💢 ULT BEREIT — [E] drücken!', 2500);
    AudioSys.wave();
  }
}
function addShake(mag, dur) {
  G.shakeMag = mag; G.shakeDur = dur; G.shakeT = dur;
}
function tryJump() {
  if (G.state !== 'playing' || !G.player.grounded) return;
  G.player.vy = 8.5;
  G.player.grounded = false;
  AudioSys.tone(280, 0.12, 'square', 0.22, 250);
}

/* Dispatcher: Primär läuft über playerShoot, Rest hier.
   Angriffe beenden Sprint (nur Move-Fähigkeiten nicht). Ult-Schaden lädt keine Ult. */
function doSecondary() {
  if (G.state !== 'playing' || G.secCD > 0) return;
  G.secCD = G.stats.secCDMax;
  G.sprint = false;
  if (G.classKey === 'pulsar') pulsarShards();
  else if (G.classKey === 'aegis') aegisFirestrike();
  else if (G.classKey === 'meteor') meteorThunder();
  else if (G.classKey === 'ronin') roninShuriken();
  else if (G.classKey === 'doc') docHelix();
  else dragoonSpeer();
}
function doTertiary() {
  if (G.state !== 'playing' || G.novaCD > 0) return;
  G.novaCD = G.stats.novaCDMax;
  G.sprint = false;
  if (G.classKey === 'pulsar') pulsarSlow();
  else if (G.classKey === 'aegis') aegisBarrier();
  else if (G.classKey === 'meteor') meteorLey();
  else if (G.classKey === 'ronin') roninWhirl();
  else if (G.classKey === 'doc') docHeal();
  else dragoonElusive();
}
function doMovement() {
  if (G.state !== 'playing' || G.dashCD > 0) return;
  G.dashCD = G.stats.dashCDMax;
  if (G.classKey === 'pulsar') pulsarBlink();
  else if (G.classKey === 'aegis') aegisCharge();
  else if (G.classKey === 'meteor') meteorTeleport();
  else if (G.classKey === 'ronin') roninStrike();
  else if (G.classKey === 'doc') docSlide();
  else dragoonJump();
}
function doUlt() {
  if (G.state !== 'playing') return;
  if (G.ult < 100) { toast(`Ult lädt … ${Math.floor(G.ult)}% (Kills & Schaden)`, 1500); return; }
  // Ult nur mit Zielen auslösen, sonst erstatten
  if (enemies.length === 0) { toast('Kein Ziel in der Arena!', 1500); return; }
  G.ult = 0;
  G.sprint = false;
  if (G.classKey === 'pulsar') pulsarUlt();
  else if (G.classKey === 'aegis') aegisUlt();
  else if (G.classKey === 'meteor') meteorUlt();
  else if (G.classKey === 'ronin') roninUlt();
  else if (G.classKey === 'doc') docUlt();
  else dragoonUlt();
}

/* Generische Explosion (isUlt: lädt keine Ult auf) */
function explode(pos, radius, dmg, color = 0xffaa33, knock = 12, isUlt = false) {
  AudioSys.boom();
  spawnParticle(pos.clone().setY(1), color, 14, 0.7, 18);
  spawnParticle(pos.clone().setY(1), 0xffffff, 9, 0.4, 6);
  spawnRing(pos, color, radius);
  addShake(0.22, 0.25);
  for (const e of enemies) {
    if (e.dead) continue;
    const d = e.mesh.position.distanceTo(pos);
    if (d < radius + e.radius) {
      _tmpV.copy(e.mesh.position).sub(pos); _tmpV.y = 0;
      if (_tmpV.lengthSq() > 0.001) e.knock = _tmpV.normalize().multiplyScalar(knock).clone();
      damageEnemy(e, dmg * (1 - d / (radius * 2 + 4)), false, isUlt);
    }
  }
}

/* --- PULSAR (Tracer-Hommage) --- */
function pulsarShards() {
  camera.getWorldDirection(_tmpV);
  muzzle.getWorldPosition(_muzzleW);
  const dmg = 30 * abilPow();
  for (let i = -2; i <= 2; i++) {
    _tmpV2.copy(_tmpV);
    const a = i * 0.09, c = Math.cos(a), s2 = Math.sin(a);
    const nx = _tmpV2.x * c - _tmpV2.z * s2, nz = _tmpV2.x * s2 + _tmpV2.z * c;
    _tmpV2.x = nx; _tmpV2.z = nz; _tmpV2.normalize();
    const shot = fireShot(playerShots, _muzzleW, _tmpV2, 70, dmg * rand(0.9, 1.1));
    if (shot) shot.isCrit = false;
  }
  muzzle.material.opacity = 1;
  muzzleLight.intensity = 6;
  AudioSys.shoot();
  cameraKick(0.02);
  triggerWpn('recoil');
}
function pulsarSlow() {
  _novaPos.copy(G.player.pos);
  const radius = 11;
  spawnRing(_novaPos, 0x66d9ff, radius);
  spawnParticle(_novaPos.clone().setY(1.2), 0x66d9ff, 14, 0.8, 22);
  AudioSys.nova();
  let n = 0;
  for (const e of enemies) {
    if (e.dead) continue;
    if (e.mesh.position.distanceTo(_novaPos) < radius + e.radius) {
      e.slowT = 4;
      floater(e.mesh.position, '🐌 SLOW', 'xp');
      damageEnemy(e, 20 * abilPow(), false);
      n++;
    }
  }
  if (n > 0) feed(`⏳ Zeitblase: ${n} verlangsamt!`);
  triggerWpn('cast');
}
/* Geteilter Teleport (Pulsar-Blink / Meteor-Äther-Schritt) */
function blinkMove(dist) {
  const mv = getMoveDir();
  if (mv.lengthSq() < 0.01) {
    mv.set(-Math.sin(G.player.yaw), 0, -Math.cos(G.player.yaw));
  }
  mv.normalize();
  spawnParticle(G.player.pos.clone().setY(1.2), 0x7a5cff, 10, 0.5, 12);
  let d = dist;
  for (; d > 1; d -= 1) {
    const tx = G.player.pos.x + mv.x * d, tz = G.player.pos.z + mv.z * d;
    if (Math.abs(tx) > ARENA - 1.2 || Math.abs(tz) > ARENA - 1.2) continue;
    let blocked = false;
    for (const pl of pillars) {
      const dx = tx - pl.x, dz = tz - pl.z;
      if (dx * dx + dz * dz < (pl.r + 0.9) * (pl.r + 0.9)) { blocked = true; break; }
    }
    if (!blocked) break;
  }
  G.player.pos.x += mv.x * d;
  G.player.pos.z += mv.z * d;
  G.iframes = Math.max(G.iframes, 0.3);
  AudioSys.dash();
  spawnParticle(G.player.pos.clone().setY(1.2), 0x7a5cff, 10, 0.5, 12);
}
function pulsarBlink() {
  blinkMove(8 * (G.stats.dashPower / 26));
}
function pulsarUlt() {
  camera.getWorldDirection(_tmpV);
  muzzle.getWorldPosition(_muzzleW);
  showBanner('💣 PULSBOMBE!', 'Bleibt kleben. Rennt!');
  feed('💣 Pulsbombe geworfen!');
  for (const n of nades) {
    if (n.active) continue;
    n.active = true; n.mesh.visible = true;
    n.mesh.position.copy(_muzzleW);
    n.mesh.material.color.setHex(0xff2d78);
    n.mesh.material.emissive.setHex(0xff2d78);
    n.vel.copy(_tmpV).multiplyScalar(30); n.vel.y += 1;
    n.fuse = 1.2;
    n.blastR = 10; n.blastDmg = 300; n.isUlt = true; n.stick = null;
    break;
  }
  AudioSys.tone(500, 0.15, 'square', 0.4, 200);
  triggerWpn('recoil');
}

/* --- Geteilte Nahkampf-Hilfe (Aegis / Ronin / Dragoon) --- */
const MELEE = {
  aegis:   { range: 4.5, dot: 0.6,  color: 0xff9a3d },
  ronin:   { range: 3.6, dot: 0.5,  color: 0x9adcff },
  dragoon: { range: 5.5, dot: 0.75, color: 0x7fb2ff },
};
function meleePrimary(range, dotMin, color, dmgMult = 1, knock = 9) {
  const s = G.stats;
  camera.getWorldDirection(_tmpV);
  let mult = (1 + (G.level - 1) * 0.05) * dmgBuffMul() * dmgMult;
  if (G.dragonT > 0) mult *= 2; // Drachenklinge
  const isCrit = G.visorT > 0 ? true : Math.random() < s.crit;
  const dmg = s.dmg * mult * (isCrit ? 2 : 1);
  for (const e of enemies) {
    if (e.dead) continue;
    _tmpV2.set(e.mesh.position.x - G.player.pos.x, 0, e.mesh.position.z - G.player.pos.z);
    const d = _tmpV2.length();
    if (d > range + e.radius) continue;
    _tmpV2.normalize();
    const dot = _tmpV2.x * _tmpV.x + _tmpV2.z * _tmpV.z;
    if (dot < dotMin && d > 1.5) continue;
    _tmpV2.multiplyScalar(knock);
    e.knock = _tmpV2.clone();
    damageEnemy(e, dmg, isCrit);
    if (G.dragonT > 0) G.player.hp = Math.min(s.maxHp, G.player.hp + dmg * 0.1);
  }
  for (let i = -2; i <= 2; i++) {
    _tmpV2.copy(_tmpV).multiplyScalar(range * 0.55);
    const a = i * 0.25, c = Math.cos(a), s2 = Math.sin(a);
    const nx = _tmpV2.x * c - _tmpV2.z * s2, nz = _tmpV2.x * s2 + _tmpV2.z * c;
    spawnParticle(new THREE.Vector3(G.player.pos.x + nx, 1.4, G.player.pos.z + nz), color, 4, 0.25, 1);
  }
  AudioSys.noise(0.12, 0.5, 1200);
  cameraKick(0.02);
  muzzle.material.opacity = 1;
  muzzleLight.intensity = 4;
  // Schwung-Animation je nach Nahkampfwaffe
  if (G.classKey === 'ronin') { G.swingSide = -(G.swingSide || 1); triggerWpn('slash', 0.22); }
  else if (G.classKey === 'dragoon') triggerWpn('thrust', 0.3);
  else triggerWpn('chop', 0.32);
}
/* --- AEGIS (Reinhardt/Fernando-Hommage) --- */
/* Feuerstoß: pierct bis zu (2 + Pierce) Ziele in einer Linie */
function aegisFirestrike() {
  camera.getWorldDirection(_tmpV);
  muzzle.getWorldPosition(_muzzleW);
  const maxTargets = 2 + G.stats.pierce;
  const dmg = 95 * abilPow();
  const cands = [];
  for (const e of enemies) {
    if (e.dead) continue;
    _tmpV2.set(e.mesh.position.x, 1.3, e.mesh.position.z).sub(_muzzleW);
    const along = _tmpV2.dot(_tmpV);
    if (along < 0 || along > 42) continue;
    if (_tmpV2.lengthSq() - along * along < 2.2) cands.push({ e, along });
  }
  cands.sort((a, b) => a.along - b.along);
  const end = _muzzleW.clone().addScaledVector(_tmpV, 42);
  cands.slice(0, maxTargets).forEach(({ e }) => damageEnemy(e, dmg, false));
  spawnBeam(_muzzleW, end, 0xff7a3d, 0.7, 0.35);
  AudioSys.tone(180, 0.35, 'sawtooth', 0.5, 120);
  AudioSys.noise(0.2, 0.4, 1500);
  cameraKick(0.03);
  addShake(0.12, 0.15);
  triggerWpn('recoil');
  if (cands.length > 0) feed(`🔥 Feuerstoß: ${Math.min(cands.length, maxTargets)} Treffer!`);
}
/* Barriere: deploybares Schild, blockt feindliche Projektile */
function aegisBarrier() {
  if (G.barrier) { toast('Barriere steht bereits!', 1200); G.novaCD = 0; return; }
  const fx = -Math.sin(G.player.yaw), fz = -Math.cos(G.player.yaw);
  const bx = G.player.pos.x + fx * 2.6, bz = G.player.pos.z + fz * 2.6;
  barrierMesh.position.set(bx, 1.5, bz);
  barrierMesh.rotation.y = G.player.yaw;
  barrierMesh.visible = true;
  G.barrier = { x: bx, z: bz, yaw: G.player.yaw, t: 5, hp: 150 };
  AudioSys.tone(200, 0.3, 'triangle', 0.5, 100);
  toast('🛡️ Barriere errichtet (5s / 150 HP)!', 2000);
  triggerWpn('cast');
}
function aegisCharge() {
  const mv = getMoveDir();
  if (mv.lengthSq() < 0.01) {
    mv.set(-Math.sin(G.player.yaw), 0, -Math.cos(G.player.yaw));
  }
  G.ramDir = mv.normalize().clone();
  G.ramTime = 0.32;
  G.ramId++;
  G.ramDmg = 85;
  G.iframes = Math.max(G.iframes, 0.4);
  AudioSys.dash();
  AudioSys.tone(120, 0.25, 'sawtooth', 0.5, 60);
}
function aegisUlt() {
  camera.getWorldDirection(_tmpV);
  showBanner('🌋 ERDBEBEN!', 'Der Boden bricht auf');
  feed('🌋 Erdbeben!');
  AudioSys.boom();
  addShake(0.55, 0.6);
  spawnRing(G.player.pos, 0xff9a3d, 16);
  let n = 0;
  for (const e of enemies) {
    if (e.dead) continue;
    _tmpV2.set(e.mesh.position.x - G.player.pos.x, 0, e.mesh.position.z - G.player.pos.z);
    const d = _tmpV2.length();
    if (d > 16) continue;
    _tmpV2.normalize();
    const dot = _tmpV2.x * _tmpV.x + _tmpV2.z * _tmpV.z;
    if (dot < 0.6) continue;
    e.stunT = 3;
    floater(e.mesh.position, '💫 BETÄUBT!', 'crit');
    _tmpV2.multiplyScalar(18);
    e.knock = _tmpV2.clone();
    damageEnemy(e, 250 * abilPow(), false, true);
    n++;
  }
  if (n > 0) feed(`🌋 ${n} Gegner betäubt!`);
  triggerWpn('chop', 0.5);
}

/* --- RONIN (Genji-Hommage) --- */
function roninShuriken() {
  camera.getWorldDirection(_tmpV);
  muzzle.getWorldPosition(_muzzleW);
  const dmg = 24 * abilPow();
  for (let i = -1; i <= 1; i++) {
    _tmpV2.copy(_tmpV);
    const a = i * 0.07, c = Math.cos(a), s2 = Math.sin(a);
    const nx = _tmpV2.x * c - _tmpV2.z * s2, nz = _tmpV2.x * s2 + _tmpV2.z * c;
    _tmpV2.x = nx; _tmpV2.z = nz; _tmpV2.normalize();
    const shot = fireShot(playerShots, _muzzleW, _tmpV2, 90, dmg * rand(0.9, 1.1));
    if (shot) shot.isCrit = Math.random() < G.stats.crit;
  }
  muzzle.material.opacity = 1;
  muzzleLight.intensity = 5;
  AudioSys.tone(900, 0.08, 'square', 0.35, 400);
  cameraKick(0.015);
  triggerWpn('recoil');
}
function roninWhirl() {
  const cfg = MELEE.ronin;
  meleePrimary(5.0, -1, cfg.color, 1.2, 12); // 360°-Wirbel
  triggerWpn('spin', 0.35);
  AudioSys.tone(600, 0.2, 'sawtooth', 0.4, 300);
  feed('🌀 Klingenwirbel!');
}
function roninStrike() {
  // Blitzschnitt: langer Dash durch Gegner hindurch
  const mv = getMoveDir();
  if (mv.lengthSq() < 0.01) {
    mv.set(-Math.sin(G.player.yaw), 0, -Math.cos(G.player.yaw));
  }
  G.ramDir = mv.normalize().clone();
  G.ramTime = 0.4;
  G.ramId++;
  G.ramDmg = 70;
  G.iframes = Math.max(G.iframes, 0.45);
  AudioSys.dash();
  AudioSys.tone(1000, 0.18, 'sawtooth', 0.4, 500);
  spawnParticle(G.player.pos.clone().setY(1.2), 0x9adcff, 10, 0.5, 10);
}
function roninUlt() {
  G.dragonT = 8;
  AudioSys.levelup();
  showBanner('🐉 DRACHENKLINGE!', '8s: Doppelter Nahkampfschaden + Lifesteal');
  feed('🐉 Drachenklinge!');
  triggerWpn('cast');
  spawnParticle(G.player.pos.clone().setY(1.5), 0x9adcff, 14, 0.8, 20);
}

/* --- DOC (Soldier-76/Lifeline-Hommage) --- */
function docHelix() {
  camera.getWorldDirection(_tmpV);
  muzzle.getWorldPosition(_muzzleW);
  for (let i = -1; i <= 1; i++) {
    for (const n of nades) {
      if (n.active) continue;
      n.active = true; n.mesh.visible = true;
      n.mesh.position.copy(_muzzleW);
      n.mesh.material.color.setHex(0xffb43d);
      n.mesh.material.emissive.setHex(0xffb43d);
      _tmpV2.copy(_tmpV);
      const a = i * 0.12, c = Math.cos(a), s2 = Math.sin(a);
      const nx = _tmpV2.x * c - _tmpV2.z * s2, nz = _tmpV2.x * s2 + _tmpV2.z * c;
      _tmpV2.x = nx; _tmpV2.z = nz; _tmpV2.normalize();
      n.vel.copy(_tmpV2).multiplyScalar(30); n.vel.y += 1.5;
      n.fuse = 0.9;
      n.blastR = 3.5; n.blastDmg = 50; n.isUlt = false; n.stick = null;
      break;
    }
  }
  AudioSys.tone(400, 0.2, 'square', 0.45, 300);
  cameraKick(0.03);
  triggerWpn('recoil');
}
function docHeal() {
  G.heal = { x: G.player.pos.x, z: G.player.pos.z, t: 6 };
  healRing.position.set(G.heal.x, 0.06, G.heal.z);
  healRing.visible = true;
  AudioSys.tone(520, 0.3, 'sine', 0.5, 260);
  toast('💚 HEILFELD: +8 HP/s im Kreis (6s)!', 2200);
  triggerWpn('cast');
}
function docSlide() {
  // Hechtsprung: kurzer Dash + Absprung
  const mv = getMoveDir();
  if (mv.lengthSq() < 0.01) {
    mv.set(-Math.sin(G.player.yaw), 0, -Math.cos(G.player.yaw));
  }
  G.dashDir = mv.normalize().clone();
  G.dashTime = 0.16;
  G.player.vy = Math.max(G.player.vy, 6);
  G.player.grounded = false;
  G.iframes = Math.max(G.iframes, 0.3);
  AudioSys.dash();
  spawnParticle(G.player.pos.clone().setY(0.6), 0x53ff8a, 8, 0.4, 8);
}
function docUlt() {
  G.visorT = 6;
  AudioSys.levelup();
  showBanner('🎯 VISIER AKTIV!', '6s: Jeder Treffer kritisch, +50% Feuerrate');
  feed('🎯 Taktisches Visier!');
  triggerWpn('cast');
}

/* --- DRAGOON (FF-Hommage) --- */
function dragoonSpeer() {
  camera.getWorldDirection(_tmpV);
  muzzle.getWorldPosition(_muzzleW);
  const shot = fireShot(playerShots, _muzzleW, _tmpV, 55, 60 * abilPow() * rand(0.9, 1.1));
  if (shot) {
    shot.isCrit = Math.random() < G.stats.crit;
    shot.mesh.scale.setScalar(1.8); // dicker Speer
    setTimeout(() => { shot.mesh.scale.setScalar(1); }, 1600);
  }
  muzzle.material.opacity = 1;
  muzzleLight.intensity = 6;
  AudioSys.tone(350, 0.15, 'sawtooth', 0.45, 150);
  cameraKick(0.025);
  triggerWpn('recoil');
}
function dragoonElusive() {
  // Ausweichsprung: rückwärts + i-Frames
  const mv = getMoveDir();
  if (mv.lengthSq() < 0.01) {
    mv.set(-Math.sin(G.player.yaw), 0, -Math.cos(G.player.yaw));
  }
  G.dashDir = mv.normalize().negate().clone();
  G.dashTime = 0.25;
  G.iframes = Math.max(G.iframes, 0.5);
  AudioSys.dash();
  spawnParticle(G.player.pos.clone().setY(1), 0x7fb2ff, 8, 0.4, 8);
}
function dragoonJump() {
  const mv = getMoveDir();
  if (mv.lengthSq() < 0.01) {
    mv.set(-Math.sin(G.player.yaw), 0, -Math.cos(G.player.yaw));
  }
  mv.normalize();
  G.player.vy = Math.max(G.player.vy, 14);
  G.player.grounded = false;
  G.player.vel.set(mv.x * 10, 0, mv.z * 10);
  G.airSlam = { r: 10, dmg: 150, ult: false };
  G.iframes = Math.max(G.iframes, 0.6);
  AudioSys.tone(180, 0.3, 'sawtooth', 0.5, 300);
  feed('🦘 Hochsprung!');
}
function dragoonUlt() {
  // Drachensturz: auf den nächsten Gegner zu, riesiger Slam
  let target = null, bd = 40;
  for (const e of enemies) {
    if (e.dead) continue;
    const d = e.mesh.position.distanceTo(G.player.pos);
    if (d < bd) { bd = d; target = e; }
  }
  _tmpV.set(-Math.sin(G.player.yaw), 0, -Math.cos(G.player.yaw));
  if (target) {
    _tmpV.set(target.mesh.position.x - G.player.pos.x, 0, target.mesh.position.z - G.player.pos.z).normalize();
  }
  G.player.vy = Math.max(G.player.vy, 13);
  G.player.grounded = false;
  G.player.vel.set(_tmpV.x * 20, 0, _tmpV.z * 20);
  G.airSlam = { r: 14, dmg: 350, ult: true };
  G.iframes = Math.max(G.iframes, 1.0);
  showBanner('🐲 DRACHENSTURZ!', 'Der Himmel fällt herab');
  feed('🐲 Drachensturz!');
  AudioSys.boss();
}
/* --- METEOR (Black-Mage-Hommage) --- */
/* Donner: Kettenblitz — springt auf bis zu (1 + Pierce) Ziele über */
function meteorThunder() {
  camera.getWorldDirection(_tmpV);
  muzzle.getWorldPosition(_muzzleW);
  // Erstziel: am nächsten zum Fadenkreuz, max 30m
  let target = null, bestScore = 0.9; // Mindest-Kosinus (~25°)
  for (const e of enemies) {
    if (e.dead) continue;
    _tmpV2.set(e.mesh.position.x, 1.3, e.mesh.position.z).sub(_muzzleW);
    const d = _tmpV2.length();
    if (d > 30) continue;
    const dot = _tmpV2.normalize().dot(_tmpV);
    if (dot > bestScore) { bestScore = dot; target = e; }
  }
  if (!target) {
    G.secCD = 0; // Fehlschlag erstattet
    toast('Kein Ziel im Visier!', 1200);
    return;
  }
  const jumps = 1 + G.stats.pierce;
  const hitSet = new Set();
  let dmg = 70 * abilPow();
  const from = _muzzleW.clone();
  for (let j = 0; j < jumps && target; j++) {
    hitSet.add(target);
    const tp = new THREE.Vector3(target.mesh.position.x, 1.3, target.mesh.position.z);
    spawnBeam(from.clone(), tp, 0x9adcff, 0.4, 0.3);
    spawnParticle(tp, 0x9adcff, 8, 0.4, 6);
    damageEnemy(target, dmg, j === 0);
    from.copy(tp);
    dmg *= 0.65;
    // nächster noch nicht getroffener Gegner in 11m
    let next = null, nd = 11;
    for (const e of enemies) {
      if (e.dead || hitSet.has(e)) continue;
      const d = e.mesh.position.distanceTo(target.mesh.position);
      if (d < nd) { nd = d; next = e; }
    }
    target = next;
  }
  AudioSys.tone(1400, 0.2, 'sawtooth', 0.45, -900);
  cameraKick(0.02);
  triggerWpn('recoil');
}
function meteorLey() {
  G.ley = { x: G.player.pos.x, z: G.player.pos.z, t: 6 };
  leyGroup.position.set(G.ley.x, 0.06, G.ley.z);
  leyGroup.visible = true;
  AudioSys.tone(660, 0.3, 'triangle', 0.5, 330);
  toast('🔷 LEY-LINIEN: +40% Schaden im Kreis (6s)!', 2200);
  triggerWpn('cast');
}
function meteorTeleport() {
  blinkMove(10 * (G.stats.dashPower / 26));
}
function meteorUlt() {
  showBanner('☄️ METEOR!', 'Deckung suchen!');
  feed('☄️ Meteor!');
  AudioSys.boss();
  triggerWpn('cast');
  const alive = enemies.filter((e) => !e.dead);
  let wi = 0;
  for (let i = 0; i < 5; i++) {
    const e = alive.length > 0 ? alive[Math.floor(Math.random() * alive.length)] : null;
    const x = e ? e.mesh.position.x + rand(-2, 2) : rand(-15, 15);
    const z = e ? e.mesh.position.z + rand(-2, 2) : rand(-15, 15);
    // freien Warnkreis suchen
    let warn = -1;
    for (let k = 0; k < warnPool.length; k++) {
      const idx = (wi + k) % warnPool.length;
      if (!warnPool[idx].active) { warn = idx; wi = idx + 1; break; }
    }
    if (warn >= 0) {
      warnPool[warn].active = true; warnPool[warn].mesh.visible = true;
      warnPool[warn].mesh.position.set(x, 0.07, z);
    }
    G.meteors.push({ x, z, t: 1.0 + i * 0.15, warn });
  }
}

/* ---------------- Kampf ---------------- */
const _tmpV = new THREE.Vector3();
const _tmpV2 = new THREE.Vector3();
const _muzzleW = new THREE.Vector3();

function playerShoot(dt) {
  G.fireTimer -= dt;
  if (!G.firing || G.fireTimer > 0) return;
  const s = G.stats;
  const rateMul = G.visorT > 0 ? 1.5 : 1; // Visier-Ult
  G.fireTimer = 1 / (s.fireRate * rateMul);
  G.sprint = false; // Feuern beendet Sprint
  const mc = MELEE[G.classKey];
  if (mc) { meleePrimary(mc.range, mc.dot, mc.color, 1, 9); return; }
  camera.getWorldDirection(_tmpV);
  muzzle.getWorldPosition(_muzzleW);
  const lvlMul = (1 + (G.level - 1) * 0.05) * dmgBuffMul();
  for (let i = 0; i < s.projectiles; i++) {
    _tmpV2.copy(_tmpV);
    // Streuung (bei mehreren Projektilen fächern)
    const spread = s.spread * (s.projectiles > 1 ? 1 : 1);
    _tmpV2.x += rand(-spread, spread);
    _tmpV2.y += rand(-spread, spread) * 0.5;
    _tmpV2.z += rand(-spread, spread);
    _tmpV2.normalize();
    let dmg = s.dmg * lvlMul * rand(0.9, 1.1);
    const isCrit = G.visorT > 0 ? true : Math.random() < s.crit;
    if (isCrit) dmg *= 2;
    const shot = fireShot(playerShots, _muzzleW, _tmpV2, s.shotSpeed, dmg);
    if (shot) shot.isCrit = isCrit;
  }
  muzzle.material.opacity = 1;
  muzzleLight.intensity = 6;
  if (G.classKey === 'meteor') { AudioSys.tone(300, 0.12, 'sawtooth', 0.4, -150); AudioSys.noise(0.1, 0.4, 800); }
  else AudioSys.shoot();
  triggerWpn('recoil');
  // leichter Rückstoß
  cameraKick(0.008);
}
let kick = 0;
function cameraKick(v) { kick = Math.min(0.06, kick + v); }

function damageEnemy(e, dmg, isCrit, isUlt = false) {
  if (e.hp <= 0) return;
  e.hp -= dmg;
  e.flash = 0.08;
  floater(e.mesh.position, `${Math.round(dmg)}${isCrit ? ' CRIT!' : ''}`, isCrit ? 'crit' : '');
  AudioSys.hit();
  spawnParticle(e.mesh.position.clone().setY(1.4), ENEMIES[e.type].color, 6, 0.4, 3);
  // Lifesteal
  if (G.stats.lifesteal > 0) {
    G.player.hp = Math.min(G.stats.maxHp, G.player.hp + dmg * G.stats.lifesteal);
  }
  // Ult lädt über Schaden — aber Ult-Schaden lädt keine Ult
  if (!isUlt) gainUlt(dmg * 0.04);
  // Hitmarker
  const hm = $('hitmarker');
  hm.classList.remove('show'); void hm.offsetWidth; hm.classList.add('show');
  if (e.hp <= 0) killEnemy(e, isUlt);
}
function killEnemy(e, isUlt = false) {
  G.kills++;
  if (!isUlt) gainUlt(12);
  const bonus = 1 + G.wave * 0.05;
  G.score += Math.round(e.score * bonus);
  spawnParticle(e.mesh.position.clone().setY(1.5), ENEMIES[e.type].color, 12, 0.9, 14);
  spawnParticle(e.mesh.position.clone().setY(1.5), 0xffffff, 8, 0.5, 6);
  AudioSys.boom();
  // XP-Orbs (aufgeteilt)
  const chunks = e.type === 'boss' ? 8 : e.type === 'brute' ? 4 : 2;
  const per = Math.max(1, Math.round(e.xp / chunks));
  for (let i = 0; i < chunks; i++) spawnOrb(e.mesh.position, per);
  if (e.type === 'boss') {
    feed(`☠ Boss besiegt! +${e.score} Punkte`);
    showBanner('BOSS BESIEGT!', `+${e.xp} XP`);
    bossBar.style.display = 'none';
    // Boss heilt den Spieler etwas
    G.player.hp = Math.min(G.stats.maxHp, G.player.hp + 30);
    floater(G.player.pos, '+30 HP', 'heal');
  }
  scene.remove(e.mesh);
  e.dead = true;
  $('hud-score').textContent = G.score;
}
function hurtPlayer(dmg, fromPos) {
  if (G.iframes > 0 || G.state !== 'playing') return;
  const real = dmg * (1 - G.stats.armor);
  G.player.hp -= real;
  G.iframes = 0.4;
  AudioSys.hurt();
  floater(G.player.pos, `-${Math.round(real)}`, 'hurt');
  const v = $('dmg-vignette');
  v.style.opacity = 0.9;
  setTimeout(() => { v.style.opacity = 0; }, 180);
  if (fromPos) {
    // Rückstoß weg vom Angreifer
    _tmpV.copy(G.player.pos).sub(fromPos).setY(0).normalize();
    G.player.vel.addScaledVector(_tmpV, 8);
  }
  if (G.player.hp <= 0) { G.player.hp = 0; gameOver(); }
}

/* ---------------- Update-Logik ---------------- */
function getMoveDir() {
  const f = (keys.KeyW ? 1 : 0) - (keys.KeyS ? 1 : 0);
  const r = (keys.KeyD ? 1 : 0) - (keys.KeyA ? 1 : 0);
  // Vorwärts = Blickrichtung in XZ: (-sin yaw, -cos yaw); rechts = (cos yaw, -sin yaw)
  const fx = -Math.sin(G.player.yaw), fz = -Math.cos(G.player.yaw);
  const rx = Math.cos(G.player.yaw), rz = -Math.sin(G.player.yaw);
  _tmpV.set(fx * f + rx * r, 0, fz * f + rz * r);
  if (_tmpV.lengthSq() > 1) _tmpV.normalize();
  return _tmpV;
}

function updatePlayer(dt) {
  const p = G.player, s = G.stats;
  // Ability-Inputs (halten möglich, Cooldowns begrenzen)
  if (keys.ShiftLeft || keys.ShiftRight) doMovement();
  if (keys.KeyQ) doTertiary();
  if (G.srchold) doSecondary();
  G.novaCD = Math.max(0, G.novaCD - dt);
  G.dashCD = Math.max(0, G.dashCD - dt);
  G.secCD = Math.max(0, G.secCD - dt);
  G.iframes = Math.max(0, G.iframes - dt);

  const mv = getMoveDir();
  let speed = s.speed * (G.sprint ? 1.35 : 1);
  if (G.dashTime > 0) {
    G.dashTime -= dt;
    p.vel.copy(G.dashDir).multiplyScalar(s.dashPower);
  } else if (G.ramTime > 0) {
    // Sturmangriff/Blitzschnitt: läuft und schädigt alles im Weg
    G.ramTime -= dt;
    p.vel.copy(G.ramDir).multiplyScalar(s.dashPower * 1.15);
    for (const e of enemies) {
      if (e.dead || e.ramId === G.ramId) continue;
      const dx = e.mesh.position.x - p.pos.x, dz = e.mesh.position.z - p.pos.z;
      if (dx * dx + dz * dz < 2.8 * 2.8) {
        e.ramId = G.ramId;
        _tmpV.set(dx, 0, dz).normalize();
        e.knock = _tmpV.clone().multiplyScalar(20);
        damageEnemy(e, G.ramDmg * abilPow(), false);
      }
    }
  } else {
    const target = mv.clone().multiplyScalar(speed);
    p.vel.lerp(target, 1 - Math.pow(0.0001, dt));
  }
  p.pos.addScaledVector(p.vel, dt);
  // Arena-Begrenzung
  p.pos.x = clamp(p.pos.x, -ARENA + 1, ARENA - 1);
  p.pos.z = clamp(p.pos.z, -ARENA + 1, ARENA - 1);
  // Säulen-Kollision
  for (const pl of pillars) {
    const dx = p.pos.x - pl.x, dz = p.pos.z - pl.z;
    const d = Math.hypot(dx, dz), min = pl.r + p.radius;
    if (d < min && d > 0.001) {
      p.pos.x = pl.x + (dx / d) * min;
      p.pos.z = pl.z + (dz / d) * min;
    }
  }
  // Sprungphysik
  if (!p.grounded) {
    p.vy -= 24 * dt;
    p.py += p.vy * dt;
    if (p.py <= 0) {
      p.py = 0; p.vy = 0; p.grounded = true;
      spawnParticle(p.pos.clone().setY(0.3), 0x8899aa, 4, 0.3, 5);
      if (G.airSlam) {
        const sl = G.airSlam; G.airSlam = null;
        explode(p.pos, sl.r, sl.dmg * abilPow(), 0xffd23f, 18, sl.ult);
        addShake(0.35, 0.4);
      }
    }
  }
  // Buff-Timer
  G.visorT = Math.max(0, G.visorT - dt);
  G.dragonT = Math.max(0, G.dragonT - dt);
  // Heilfeld: heilt im Kreis
  if (G.heal) {
    G.heal.t -= dt;
    if (G.heal.t <= 0) { G.heal = null; healRing.visible = false; }
    else {
      const dx = p.pos.x - G.heal.x, dz = p.pos.z - G.heal.z;
      if (dx * dx + dz * dz < 3.5 * 3.5) p.hp = Math.min(s.maxHp, p.hp + 8 * dt);
    }
  }
  // Regen
  if (s.regen > 0) p.hp = Math.min(s.maxHp, p.hp + s.regen * dt);
  // Kamera (+ Screenshake)
  kick = Math.max(0, kick - dt * 0.4);
  let shX = 0, shY = 0;
  if (G.shakeT > 0) {
    G.shakeT -= dt;
    const k = Math.max(0, G.shakeT / G.shakeDur) * G.shakeMag;
    shX = rand(-1, 1) * k * 0.4; shY = rand(-1, 1) * k * 0.4;
  }
  camera.position.set(p.pos.x + shX, 1.7 + p.py + Math.sin(G.time * 2) * 0.03 + shY, p.pos.z);
  camera.rotation.y = p.yaw;
  camera.rotation.x = p.pitch + kick;
  // FOV-Kick bei Dash/Ram
  const targetFov = (G.dashTime > 0 || G.ramTime > 0) ? 90 : 78;
  camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 10);
  camera.updateProjectionMatrix();
  // Waffe wackeln + Muzzle abklingen
  gun.position.y = -0.28 + Math.sin(G.time * 8) * 0.008 * (mv.lengthSq() > 0.01 ? 1 : 0.3);
  muzzle.material.opacity = Math.max(0, muzzle.material.opacity - dt * 10);
  muzzleLight.intensity = Math.max(0, muzzleLight.intensity - dt * 60);
  updateWeapon(dt);
  playerShoot(dt);
}

function segDist2(px, pz, ax, az, bx, bz) {
  const dx = bx - ax, dz = bz - az;
  const len2 = dx * dx + dz * dz;
  let t = len2 > 0 ? ((px - ax) * dx + (pz - az) * dz) / len2 : 0;
  t = clamp(t, 0, 1);
  const cx = ax + dx * t - px, cz = az + dz * t - pz;
  return cx * cx + cz * cz;
}

function updateShots(dt) {
  // Spieler-Projektile
  for (const s of playerShots) {
    if (!s.active) continue;
    s.life -= dt;
    const mp = s.mesh.position;
    const prevX = mp.x, prevZ = mp.z;
    mp.addScaledVector(s.vel, dt);
    let dead = s.life <= 0 || Math.abs(mp.x) > ARENA + 1 || Math.abs(mp.z) > ARENA + 1 || mp.y < 0 || mp.y > 20;
    if (!dead) {
      for (const pl of pillars) {
        const dx = mp.x - pl.x, dz = mp.z - pl.z;
        if (dx * dx + dz * dz < pl.r * pl.r && mp.y < 8) { dead = true; spawnParticle(mp, 0x00f0ff, 5, 0.3, 3); break; }
      }
    }
    if (!dead) {
      for (const e of enemies) {
        if (e.dead || s.hits.includes(e)) continue;
        const rr = e.radius + 0.4;
        const dy = 1.3 - mp.y;
        if (Math.abs(dy) < 2.6 && segDist2(e.mesh.position.x, e.mesh.position.z, prevX, prevZ, mp.x, mp.z) < rr * rr) {
          s.hits.push(e);
          damageEnemy(e, s.dmg, s.isCrit);
          if (s.pierceLeft > 0) { s.pierceLeft--; } // durchdringt weiter
          else { dead = true; }
          break;
        }
      }
    }
    if (dead) { s.active = false; s.mesh.visible = false; }
  }
  // Gegner-Projektile
  for (const s of enemyShots) {
    if (!s.active) continue;
    s.life -= dt;
    const mp = s.mesh.position;
    const prevX = mp.x, prevZ = mp.z;
    mp.addScaledVector(s.vel, dt);
    let dead = s.life <= 0 || Math.abs(mp.x) > ARENA + 1 || Math.abs(mp.z) > ARENA + 1;
    if (!dead) {
      const dy = 1.2 - mp.y;
      if (Math.abs(dy) < 2.0 && segDist2(G.player.pos.x, G.player.pos.z, prevX, prevZ, mp.x, mp.z) < 1.2) {
        hurtPlayer(s.dmg, null);
        spawnParticle(mp, 0xff5533, 6, 0.4, 5);
        dead = true;
      }
    }
    if (!dead) {
      for (const pl of pillars) {
        const dx = mp.x - pl.x, dz = mp.z - pl.z;
        if (dx * dx + dz * dz < pl.r * pl.r && mp.y < 8) { dead = true; break; }
      }
    }
    // Aegis-Barriere blockt feindliche Projektile
    if (!dead && G.barrier) {
      const b = G.barrier;
      const nx = -Math.sin(b.yaw), nz = -Math.cos(b.yaw);
      const rx = mp.x - b.x, rz = mp.z - b.z;
      const along = Math.abs(rx * nx + rz * nz);
      const lat = Math.abs(rx * nz - rz * nx);
      if (along < 0.6 && lat < 2.6 && mp.y < 3.4) {
        dead = true;
        G.barrier.hp -= s.dmg;
        spawnParticle(mp, 0x53c8ff, 6, 0.4, 5);
        AudioSys.tone(700, 0.08, 'square', 0.25, -200);
      }
    }
    if (dead) { s.active = false; s.mesh.visible = false; }
  }
}

function updateEnemies(dt) {
  const pp = G.player.pos;
  // Separation (günstig, n klein)
  for (let i = 0; i < enemies.length; i++) {
    const a = enemies[i];
    if (a.dead) continue;
    for (let j = i + 1; j < enemies.length; j++) {
      const b = enemies[j];
      if (b.dead) continue;
      const dx = b.mesh.position.x - a.mesh.position.x;
      const dz = b.mesh.position.z - a.mesh.position.z;
      const min = a.radius + b.radius;
      const d2 = dx * dx + dz * dz;
      if (d2 < min * min && d2 > 0.0001) {
        const d = Math.sqrt(d2), push = (min - d) * 0.5;
        const nx = dx / d, nz = dz / d;
        a.mesh.position.x -= nx * push; a.mesh.position.z -= nz * push;
        b.mesh.position.x += nx * push; b.mesh.position.z += nz * push;
      }
    }
  }
  for (const e of enemies) {
    if (e.dead) continue;
    const m = e.mesh;
    _tmpV.copy(pp).sub(m.position); _tmpV.y = 0;
    const dist = _tmpV.length();
    const dir = dist > 0.001 ? _tmpV.divideScalar(dist) : _tmpV.set(0, 0, 0);
    e.atkCD -= dt; e.shootCD -= dt;
    e.flash = Math.max(0, e.flash - dt);
    e.bob += dt * 4;
    e.slowT = Math.max(0, e.slowT - dt);
    const stunned = e.stunT > 0;
    if (stunned) e.stunT -= dt;
    // Knockback abklingen (auch betäubt)
    if (e.knock) {
      m.position.addScaledVector(e.knock, dt);
      e.knock.multiplyScalar(Math.max(0, 1 - dt * 5));
      if (e.knock.length() < 0.5) e.knock = null;
    }
    const spd = e.speed * (e.slowT > 0 ? 0.45 : 1);
    if (!stunned) {
    if (e.type === 'drone') {
      if (dist > 2.0) m.position.addScaledVector(dir, spd * dt);
      else { // auf Distanz halten, umkreisen
        _tmpV2.set(-dir.z, 0, dir.x).multiplyScalar(e.strafeDir * spd * 0.4 * dt);
        m.position.add(_tmpV2);
      }
      m.position.y = Math.abs(Math.sin(e.bob)) * 0.25;
      m.rotation.y += dt * 3;
      if (dist < 2.4 && e.atkCD <= 0 && G.player.py < 0.9) { e.atkCD = 1.0; hurtPlayer(e.dmg, m.position); }
    } else if (e.type === 'spitter') {
      e.strafeT -= dt;
      if (e.strafeT <= 0) { e.strafeT = rand(1, 2.5); e.strafeDir *= -1; }
      if (dist > 16) m.position.addScaledVector(dir, spd * dt);
      else if (dist < 9) m.position.addScaledVector(dir, -spd * dt);
      else {
        _tmpV2.set(-dir.z, 0, dir.x).multiplyScalar(e.strafeDir * spd * 0.7 * dt);
        m.position.add(_tmpV2);
      }
      m.rotation.y = Math.atan2(dir.x, dir.z);
      if (dist < 26 && e.shootCD <= 0) {
        e.shootCD = rand(1.4, 2.4);
        _tmpV2.copy(pp).setY(1.2).sub(m.position.clone().setY(1.2)).normalize();
        fireShot(enemyShots, m.position.clone().setY(1.3), _tmpV2, 15, e.dmg);
        AudioSys.tone(440, 0.12, 'square', 0.25, -200);
      }
    } else if (e.type === 'brute') {
      if (dist > 3.0) m.position.addScaledVector(dir, spd * dt);
      m.rotation.y = Math.atan2(dir.x, dir.z);
      if (dist < 3.2 && e.atkCD <= 0 && G.player.py < 0.9) {
        e.atkCD = 1.6;
        hurtPlayer(e.dmg, m.position);
        spawnParticle(m.position.clone().setY(1), 0xb44dff, 9, 0.5, 10);
      }
    } else if (e.type === 'boss') {
      const enraged = e.hp < e.maxHp * 0.3;
      const sp = spd * (enraged ? 1.5 : 1);
      if (dist > 3.8) m.position.addScaledVector(dir, sp * dt);
      m.rotation.y = Math.atan2(dir.x, dir.z);
      e.radialCD -= dt; e.summonCD -= dt;
      if (dist < 4.2 && e.atkCD <= 0 && G.player.py < 1.4) {
        e.atkCD = 1.4;
        hurtPlayer(e.dmg, m.position);
        spawnParticle(m.position.clone().setY(1.5), 0xff0033, 12, 0.6, 14);
        AudioSys.boom();
      }
      if (e.radialCD <= 0) {
        e.radialCD = enraged ? 2.5 : 4;
        const n = 10;
        for (let k = 0; k < n; k++) {
          const a = (k / n) * Math.PI * 2;
          fireShot(enemyShots, m.position.clone().setY(2), new THREE.Vector3(Math.cos(a), -0.08, Math.sin(a)).normalize(), 11, Math.round(e.dmg * 0.5));
        }
        AudioSys.tone(200, 0.3, 'sawtooth', 0.5, 150);
        spawnParticle(m.position.clone().setY(2.5), 0xff0033, 10, 0.5, 12);
      }
      if (e.summonCD <= 0 && enemies.length < 24) {
        e.summonCD = 9;
        spawnEnemy('drone', G.wave); spawnEnemy('drone', G.wave);
        feed('Boss ruft Verstärkung!');
      }
      // Boss-Balken
      bossBar.style.display = 'block';
      $('bossfill').style.width = `${Math.max(0, (e.hp / e.maxHp) * 100)}%`;
    }
    } // !stunned
    // Säulen-Kollision für Gegner
    for (const pl of pillars) {
      const dx = m.position.x - pl.x, dz = m.position.z - pl.z;
      const d = Math.hypot(dx, dz), min = pl.r + e.radius * 0.7;
      if (d < min && d > 0.001) {
        m.position.x = pl.x + (dx / d) * min;
        m.position.z = pl.z + (dz / d) * min;
      }
    }
    m.position.x = clamp(m.position.x, -ARENA + 0.5, ARENA - 0.5);
    m.position.z = clamp(m.position.z, -ARENA + 0.5, ARENA - 0.5);
    // Körperblock: Gegner können nicht in den Spieler hineinlaufen
    {
      const dx = m.position.x - pp.x, dz = m.position.z - pp.z;
      const d = Math.hypot(dx, dz), min = e.radius * 0.7 + G.player.radius + 0.6;
      if (d < min) {
        if (d > 0.001) {
          m.position.x = pp.x + (dx / d) * min;
          m.position.z = pp.z + (dz / d) * min;
        } else {
          m.position.x = pp.x + min;
        }
      }
    }
    // Treffer-Blitz
    const core = m.userData.core;
    if (core) core.material.emissiveIntensity = e.flash > 0 ? 2.2 : m.userData.baseEmissive;
    // HP-Balken aktualisieren
    const frac = clamp(e.hp / e.maxHp, 0, 1);
    const show = frac < 1;
    m.userData.hpBg.visible = show; m.userData.hpFg.visible = show;
    if (show) {
      m.userData.hpFg.scale.x = Math.max(0.001, frac);
      m.userData.hpFg.position.x = -m.userData.hpW * (1 - frac) / 2;
      m.userData.hpFg.material.color.setHex(frac > 0.5 ? 0x53ff8a : frac > 0.25 ? 0xffd23f : 0xff2d55);
      m.userData.hpBg.lookAt(camera.position);
      m.userData.hpFg.lookAt(camera.position);
    }
  }
  // Tote entfernen
  for (let i = enemies.length - 1; i >= 0; i--) {
    if (enemies[i].dead) enemies.splice(i, 1);
  }
}

function updateOrbs(dt) {
  const pp = G.player.pos;
  for (const o of orbs) {
    if (!o.active) continue;
    _tmpV.copy(pp).sub(o.mesh.position); _tmpV.y = 0;
    const d = _tmpV.length();
    if (d < G.stats.magnet) {
      _tmpV.normalize();
      const pull = 26 * (1 - d / (G.stats.magnet + 1)) + 8;
      o.mesh.position.addScaledVector(_tmpV, pull * dt);
    } else {
      o.vel.y -= 12 * dt;
      o.mesh.position.addScaledVector(o.vel, dt);
      if (o.mesh.position.y < 0.4) { o.mesh.position.y = 0.4; o.vel.set(0, 0, 0); }
    }
    o.mesh.rotation.y += dt * 4;
    if (d < 1.3) {
      o.active = false; o.mesh.visible = false;
      gainXp(o.value, o.mesh.position);
    }
  }
}

function updateParticles(dt) {
  for (const p of particles) {
    if (!p.active) continue;
    p.life -= dt;
    if (p.life <= 0) { p.active = false; p.mesh.visible = false; continue; }
    p.vel.y -= 9 * dt;
    p.mesh.position.addScaledVector(p.vel, dt);
    p.mesh.material.opacity = p.life / p.maxLife;
    p.mesh.rotation.x += dt * 5; p.mesh.rotation.y += dt * 4;
  }
  // Expansionsringe
  for (const r of rings) {
    if (!r.active) continue;
    r.t += dt * 2.2;
    if (r.t >= 1) { r.active = false; r.mesh.visible = false; continue; }
    const rad = Math.max(0.01, r.t * r.maxR);
    r.mesh.scale.set(rad, rad, 1);
    r.mesh.material.opacity = 0.9 * (1 - r.t);
  }
  // Strahlen blenden aus
  for (const bm of beams) {
    if (!bm.active) continue;
    bm.life -= dt;
    if (bm.life <= 0) { bm.active = false; bm.mesh.visible = false; continue; }
    bm.mesh.material.opacity = 0.9 * (bm.life / bm.maxLife);
  }
}

function updateNades(dt) {
  for (const n of nades) {
    if (!n.active) continue;
    n.fuse -= dt;
    const mp = n.mesh.position;
    if (n.stick) {
      // klebt am Gegner: mitlaufen
      if (n.stick.dead) n.stick = null;
      else { mp.set(n.stick.mesh.position.x, 1.4, n.stick.mesh.position.z); }
    } else {
      n.vel.y -= 18 * dt;
      mp.addScaledVector(n.vel, dt);
      // Boden-Abpraller
      if (mp.y < 0.25) { mp.y = 0.25; n.vel.y *= -0.45; n.vel.x *= 0.7; n.vel.z *= 0.7; }
    }
    let boom = n.fuse <= 0 || (!n.stick && (Math.abs(mp.x) > ARENA || Math.abs(mp.z) > ARENA));
    if (!boom && !n.stick) {
      for (const pl of pillars) {
        const dx = mp.x - pl.x, dz = mp.z - pl.z;
        if (dx * dx + dz * dz < pl.r * pl.r && mp.y < 8) { boom = true; break; }
      }
    }
    if (!boom && !n.stick) {
      for (const e of enemies) {
        if (e.dead) continue;
        const dx = e.mesh.position.x - mp.x, dz = e.mesh.position.z - mp.z;
        if (dx * dx + dz * dz < (e.radius + 0.5) * (e.radius + 0.5) && mp.y < 3) {
          n.stick = e; // Pulsbombe bleibt kleben, explodiert per Zünder
          AudioSys.tone(880, 0.15, 'square', 0.4, 220);
          floater(e.mesh.position, '💣 KLEBT!', 'crit');
          break;
        }
      }
    }
    if (boom) {
      n.active = false; n.mesh.visible = false; n.stick = null;
      explode(new THREE.Vector3(mp.x, 0, mp.z), n.blastR, n.blastDmg * abilPow(), 0xff2d78, 14, n.isUlt);
    }
  }
}

function updateMeteors(dt) {
  // Ley-Linien & Barriere altern
  if (G.ley) {
    G.ley.t -= dt;
    if (G.ley.t <= 0) { G.ley = null; leyGroup.visible = false; }
  }
  if (G.barrier) {
    G.barrier.t -= dt;
    barrierMesh.material.opacity = 0.15 + 0.13 * Math.sin(G.time * 6);
    if (G.barrier.t <= 0 || G.barrier.hp <= 0) {
      if (G.barrier.hp <= 0) { feed('🛡️ Barriere zerstört!'); spawnParticle(barrierMesh.position, 0x53c8ff, 10, 0.5, 12); }
      G.barrier = null;
      barrierMesh.visible = false;
      barrierFrame.visible = false;
    } else {
      barrierFrame.position.set(G.barrier.x, 2.95, G.barrier.z);
      barrierFrame.rotation.y = G.barrier.yaw;
    }
  }
  if (G.meteors.length === 0) return;
  for (let i = G.meteors.length - 1; i >= 0; i--) {
    const m = G.meteors[i];
    m.t -= dt;
    const w = warnPool[m.warn];
    if (w) w.mesh.material.opacity = 0.2 + 0.25 * Math.abs(Math.sin(G.time * 10));
    if (m.t <= 0) {
      if (w) { w.active = false; w.mesh.visible = false; }
      explode(new THREE.Vector3(m.x, 0, m.z), 7, 210 * abilPow(), 0xff6a3d, 16, true);
      G.meteors.splice(i, 1);
    }
  }
}

/* ---------------- HUD ---------------- */
function buildAbilityBar() {
  const A = ABIL[G.classKey];
  $('abilities').innerHTML =
    `<div class="ab" id="ab-primary"><span class="key">${A.primary.key}</span><span class="name">${A.primary.icon} ${A.primary.name}</span></div>` +
    `<div class="ab" id="ab-sec"><span class="key">${A.secondary.key}</span><span class="name">${A.secondary.icon} ${A.secondary.name}</span><div class="cd" id="cd-sec"></div></div>` +
    `<div class="ab" id="ab-tert"><span class="key">${A.tertiary.key}</span><span class="name">${A.tertiary.icon} ${A.tertiary.name}</span><div class="cd" id="cd-tert"></div></div>` +
    `<div class="ab" id="ab-move"><span class="key">${A.movement.key}</span><span class="name">${A.movement.icon} ${A.movement.name}</span><div class="cd" id="cd-move"></div></div>` +
    `<div class="ab ult" id="ab-ult"><span class="key">${A.ult.key}</span><span class="name" id="ult-name">${A.ult.icon} ${A.ult.name}</span><div class="cd" id="cd-ult"></div></div>`;
}
function updateHUD() {
  const p = G.player, s = G.stats;
  if (!s) return;
  $('hp-fill').style.width = `${clamp((p.hp / s.maxHp) * 100, 0, 100)}%`;
  $('hp-text').textContent = `${Math.ceil(p.hp)} / ${s.maxHp}`;
  $('xp-fill').style.width = `${clamp((G.xp / G.xpNeed) * 100, 0, 100)}%`;
  $('xp-text').textContent = `LV ${G.level} • ${G.xp}/${G.xpNeed} XP`;
  $('hud-enemies').textContent = enemies.length + G.spawnQueue.length;
  const cd = (id, frac, ready) => {
    const el = $(id);
    if (el) el.style.width = `${clamp(frac * 100, 0, 100)}%`;
  };
  cd('cd-sec', 1 - G.secCD / s.secCDMax);
  cd('cd-tert', 1 - G.novaCD / s.novaCDMax);
  cd('cd-move', 1 - G.dashCD / s.dashCDMax);
  cd('cd-ult', G.ult / 100);
  const tgl = (id, ready) => { const el = $(id); if (el) el.classList.toggle('ready', ready); };
  tgl('ab-sec', G.secCD <= 0);
  tgl('ab-tert', G.novaCD <= 0);
  tgl('ab-move', G.dashCD <= 0);
  const ultEl = $('ab-ult'), ultName = $('ult-name');
  if (ultEl) ultEl.classList.toggle('charged', G.ult >= 100);
  if (ultName) ultName.textContent = G.ult >= 100 ? `💢 ULT BEREIT!` : `${ABIL[G.classKey].ult.icon} Ult ${Math.floor(G.ult)}%`;
  // Buffs + Sprint
  let b = `<span class="buff ${G.sprint ? 'gold' : 'off'}">🏃 SPRINT ${G.sprint ? 'AN' : 'AUS'}</span>`;
  if (G.visorT > 0) b += `<span class="buff gold">🎯 VISIER ${G.visorT.toFixed(0)}s</span>`;
  if (G.dragonT > 0) b += `<span class="buff gold">🐉 KLINGE ${G.dragonT.toFixed(0)}s</span>`;
  if (G.ley && G.ley.t > 0) b += `<span class="buff">🔷 LEY ${G.ley.t.toFixed(0)}s</span>`;
  if (G.heal && G.heal.t > 0) b += `<span class="buff">💚 HEILUNG ${G.heal.t.toFixed(0)}s</span>`;
  $('buffs').innerHTML = b;
}
function updateStatsMini() {
  const s = G.stats;
  if (!s) return;
  $('stats-mini').innerHTML =
    `🔥 DMG <b>${Math.round(s.dmg)}</b> ×<b>${s.projectiles}</b> • ${s.fireRate.toFixed(1)}/s<br>` +
    `🎯 Crit <b>${Math.round(s.crit * 100)}%</b> • 🛡 <b>${Math.round(s.armor * 100)}%</b><br>` +
    `🏹 Pierce <b>${s.pierce}</b> • 🧛 <b>${Math.round(s.lifesteal * 100)}%</b> • 💚 <b>${s.regen.toFixed(1)}</b>/s • 👟 <b>${s.speed.toFixed(1)}</b>`;
}

/* ---------------- Hauptschleife ---------------- */
const clock = new THREE.Clock();
function loop() {
  requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), 0.05);
  // Deko-Kristall rotieren
  const cr = scene.getObjectByName('deko-crystal');
  if (cr) { cr.rotation.y += dt * 0.8; cr.position.y = 6.5 + Math.sin(G.time * 1.2) * 0.4; }

  if (G.state === 'playing') {
    G.time += dt;
    // Watchdog: ungültige Physik-Werte (NaN) sofort zurücksetzen — sonst Blackscreen
    const pp = G.player.pos, pv = G.player.vel;
    if (!isFinite(pp.x) || !isFinite(pp.z) || !isFinite(pv.x) || !isFinite(pv.z)) {
      pp.set(0, 0, 8); pv.set(0, 0, 0);
    }
    updatePlayer(dt);
    // Spawning
    if (G.spawnQueue.length > 0) {
      G.spawnTimer -= dt;
      if (G.spawnTimer <= 0) {
        G.spawnTimer = Math.max(0.25, 0.9 - G.wave * 0.04);
        spawnEnemy(G.spawnQueue.shift(), G.wave);
      }
      G.waveState = 'spawning';
    } else if (enemies.length === 0) {
      // Welle geschafft
      if (G.waveState !== 'cleared') {
        G.waveState = 'cleared';
        const bonus = 50 + G.wave * 25;
        G.score += bonus;
        $('hud-score').textContent = G.score;
        const heal = Math.round(G.stats.maxHp * 0.2);
        G.player.hp = Math.min(G.stats.maxHp, G.player.hp + heal);
        floater(G.player.pos, `+${heal} HP`, 'heal');
        feed(`✔ Welle ${G.wave} geschafft! +${bonus}`);
        G.waveTimer = 3;
      } else {
        G.waveTimer -= dt;
        if (G.waveTimer <= 0) nextWave();
      }
    }
    updateEnemies(dt);
    updateShots(dt);
    updateNades(dt);
    updateMeteors(dt);
    updateOrbs(dt);
    updateParticles(dt);
    updateHUD();
  } else if (G.state === 'menu') {
    // Menü-Kamera: langsame Orbit-Aufnahme der Arena
    G.time += dt;
    const a = G.time * 0.12;
    camera.position.set(Math.sin(a) * 26, 12, Math.cos(a) * 26);
    camera.lookAt(0, 1, 0);
    if (camera.fov !== 60) { camera.fov = 60; camera.updateProjectionMatrix(); }
    updateParticles(dt);
  } else {
    // Pause/Levelup/Gameover: Partikel weiter, sonst Standbild
    updateParticles(dt);
  }
  renderer.render(scene, camera);
}
$('hud-best').textContent = G.best;
loop();

// Debug-Hook (für automatisierte Tests)
window.__NEON = { G, enemies, keys, doSecondary, doTertiary, doMovement, doUlt, tryJump, chooseUpgrade, startGame, spawnEnemy };
