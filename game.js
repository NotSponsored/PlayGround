import * as THREE from 'three';

/* ============================================================
   VOIDLING BOUND — Gebunden ans Licht
   Third-Person 3D-Platformer (Desktop) mit Three.js
   ============================================================ */

const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const params = new URLSearchParams(location.search);

const TOTAL_SHARDS = 12;
const GRAVITY = -24;
const WALK_SPEED = 6.2;
const SPRINT_SPEED = 9.4;
const JUMP_VEL = 9.2;
const DOUBLE_JUMP_VEL = 7.8;
const PULSE_COOLDOWN = 3.5;
const PULSE_RADIUS = 8.5;

/* ---------------- State ---------------- */
const S = {
  state: 'menu', // menu | playing | paused | won | lost
  hp: 100, maxHp: 100,
  stamina: 100,
  shards: 0,
  time: 0,
  pulses: 0,
  damageTaken: 0,
  pulseCd: 0,
  iframes: 0,
  jumps: 1,
  coyote: 0,
  jumpBuffer: 0,
  grounded: false,
  vel: new THREE.Vector3(),
  yaw: Math.PI, pitch: -0.32,
  sensitivity: 1,
  quality: 'high',
  sound: true,
  hintTimer: 14,
  lastSafe: new THREE.Vector3(0, 0.1, 8),
  safeTimer: 0,
  won: false,
};

/* ---------------- Audio (prozedural, keine Assets) ---------------- */
let AC = null, masterGain = null, droneOn = false;
function audio() {
  if (AC) return AC;
  try {
    AC = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = AC.createGain();
    masterGain.gain.value = 0.5;
    masterGain.connect(AC.destination);
  } catch { AC = null; }
  return AC;
}
function tone(freq, dur = 0.15, type = 'sine', vol = 0.25, slideTo = null, delay = 0) {
  if (!S.sound) return;
  if (!audio()) return;
  if (AC.state === 'suspended') AC.resume();
  const t0 = AC.currentTime + delay;
  const o = AC.createOscillator(), g = AC.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t0);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(masterGain);
  o.start(t0); o.stop(t0 + dur + 0.05);
}
function startDrone() {
  if (droneOn || !audio()) return;
  droneOn = true;
  try {
    const g = AC.createGain(); g.gain.value = 0.05; g.connect(masterGain);
    const lfo = AC.createOscillator(), lg = AC.createGain();
    lfo.frequency.value = 0.08; lg.gain.value = 0.02;
    lfo.connect(lg); lg.connect(g.gain); lfo.start();
    [55, 82.5, 110.3].forEach((f, i) => {
      const o = AC.createOscillator(); o.type = i === 2 ? 'triangle' : 'sine';
      o.frequency.value = f; o.detune.value = (i - 1) * 4;
      o.connect(g); o.start();
    });
  } catch { /* egal */ }
}
const sfx = {
  jump() { tone(300, 0.18, 'square', 0.10, 620); },
  doubleJump() { tone(420, 0.2, 'square', 0.10, 880); },
  land() { tone(140, 0.1, 'sine', 0.12, 70); },
  collect(n) { tone(520 + n * 45, 0.16, 'sine', 0.22, 900 + n * 60); tone(780 + n * 45, 0.22, 'sine', 0.16, 1300, 0.09); },
  hurt() { tone(220, 0.3, 'sawtooth', 0.22, 60); },
  pulse() { tone(160, 0.5, 'sawtooth', 0.25, 40); tone(1200, 0.35, 'sine', 0.10, 200); },
  portal() { [440, 554, 659, 880].forEach((f, i) => tone(f, 0.4, 'sine', 0.18, null, i * 0.12)); },
  win() { [523, 659, 784, 1046, 1318].forEach((f, i) => tone(f, 0.5, 'triangle', 0.2, null, i * 0.14)); },
  lose() { [330, 262, 196, 131].forEach((f, i) => tone(f, 0.5, 'sawtooth', 0.14, f * 0.9, i * 0.18)); },
  click() { tone(700, 0.06, 'square', 0.08); },
};

/* ---------------- Renderer / Szene ---------------- */
const canvas = $('scene');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
} catch (e) {
  $('loading').innerHTML = 'WebGL wird nicht unterstützt. Bitte Desktop-Browser mit Hardwarebeschleunigung nutzen.';
  throw e;
}
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07040f);
scene.fog = new THREE.FogExp2(0x0d0618, 0.016);

const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 900);
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
renderer.setSize(innerWidth, innerHeight);

scene.add(new THREE.HemisphereLight(0x8b5cf6, 0x05030a, 0.85));
const moon = new THREE.DirectionalLight(0xbfaaff, 1.4);
moon.position.set(30, 45, 20);
moon.castShadow = true;
moon.shadow.mapSize.set(2048, 2048);
moon.shadow.camera.left = -55; moon.shadow.camera.right = 55;
moon.shadow.camera.top = 55; moon.shadow.camera.bottom = -55;
moon.shadow.camera.far = 140;
moon.shadow.bias = -0.0004;
scene.add(moon);
const playerLight = new THREE.PointLight(0xa855f7, 24, 20, 1.8);
scene.add(playerLight);
const wispLight = new THREE.PointLight(0x22d3ee, 40, 24, 1.8);
scene.add(wispLight);
const portalLight = new THREE.PointLight(0x7c3aed, 0, 30, 1.7);
scene.add(portalLight);

/* ---------------- Texturen (prozedural via Canvas) ---------------- */
function runeTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#171022'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 900; i++) {
    g.fillStyle = `rgba(${20 + Math.random() * 30},${12 + Math.random() * 20},${40 + Math.random() * 40},0.5)`;
    g.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
  }
  g.strokeStyle = 'rgba(168,85,247,0.55)'; g.lineWidth = 2;
  for (let r = 30; r < 130; r += 24) { g.beginPath(); g.arc(128, 128, r, 0, Math.PI * 2); g.stroke(); }
  g.strokeStyle = 'rgba(34,211,238,0.5)';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    g.beginPath(); g.moveTo(128 + Math.cos(a) * 30, 128 + Math.sin(a) * 30);
    g.lineTo(128 + Math.cos(a) * 120, 128 + Math.sin(a) * 120); g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
function glowTexture(color = '#a855f7') {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(64, 64, 2, 64, 64, 64);
  grad.addColorStop(0, '#ffffff'); grad.addColorStop(0.25, color); grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad; g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const texRune = runeTexture();
const texGlowViolet = glowTexture('#a855f7');
const texGlowCyan = glowTexture('#22d3ee');
const texGlowRed = glowTexture('#ef4444');

/* ---------------- Welt: Inseln & Brücken ---------------- */
const colliders = []; // {kind:'disc',x,z,r,y} | {kind:'seg',ax,az,bx,bz,w,y}
const islandsGroup = new THREE.Group();
scene.add(islandsGroup);

const ISLANDS = [
  { x: 0, z: 0, r: 13, y: 0 },
  { x: 21, z: 3, r: 6, y: 0.5 },
  { x: -20, z: 7, r: 6.5, y: 1.0 },
  { x: 4, z: -22, r: 6, y: 1.5 },
  { x: -7, z: 23, r: 5.5, y: 1.2 },
  { x: 25, z: -14, r: 4.5, y: 2.2 },
  { x: -25, z: -13, r: 4.5, y: 2.0 },
  { x: 9, z: 33, r: 4, y: 2.4 },
  { x: -13, z: -32, r: 5, y: 2.6 },
  { x: 38, z: 9, r: 3.8, y: 3.0 },
  { x: -38, z: 15, r: 3.8, y: 3.0 },
];
const BRIDGES = [
  [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 6], [4, 7], [3, 8], [1, 9], [2, 10],
];
const rockMat = new THREE.MeshStandardMaterial({ color: 0x241a38, roughness: 0.95, metalness: 0.05 });
const topMat = new THREE.MeshStandardMaterial({ map: texRune, color: 0xbfb3e6, roughness: 0.85, emissive: 0x4c1d95, emissiveIntensity: 0.25, emissiveMap: texRune });
const rimMat = new THREE.MeshStandardMaterial({ color: 0x1a0f2e, emissive: 0xa855f7, emissiveIntensity: 1.6, roughness: 0.4 });
const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x2d2145, roughness: 0.8, emissive: 0x6d28d9, emissiveIntensity: 0.35 });

function buildIsland(def) {
  const { x, z, r, y } = def;
  const g = new THREE.Group();
  const thick = 6;
  const cyl = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.55, thick, 28), rockMat);
  cyl.position.y = y - thick / 2;
  cyl.receiveShadow = true;
  g.add(cyl);
  const top = new THREE.Mesh(new THREE.CircleGeometry(r, 28), topMat);
  top.rotation.x = -Math.PI / 2;
  top.position.y = y + 0.01;
  top.receiveShadow = true;
  g.add(top);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(r - 0.05, 0.12, 10, 48), rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = y + 0.02;
  g.add(rim);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(r * 0.5, 7, 9), rockMat);
  tip.rotation.x = Math.PI;
  tip.position.y = y - thick - 3.2;
  g.add(tip);
  const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.35),
    new THREE.MeshStandardMaterial({ color: 0x0b0620, emissive: 0x22d3ee, emissiveIntensity: 2.2 }));
  gem.position.y = y - thick - 1.5;
  gem.userData.spin = Math.random() * 10;
  g.add(gem);
  g.position.set(x, 0, z);
  islandsGroup.add(g);
  colliders.push({ kind: 'disc', x, z, r: r - 0.15, y });
  return g;
}
const islandMeshes = ISLANDS.map(buildIsland);

function buildBridge(a, b) {
  const A = ISLANDS[a], B = ISLANDS[b];
  const ax = A.x, az = A.z, bx = B.x, bz = B.z;
  const dx = bx - ax, dz = bz - az;
  const dist = Math.hypot(dx, dz);
  const gap = A.r + B.r;
  const len = dist - gap + 2.4;
  const cx = (ax + bx) / 2, cz = (az + bz) / 2;
  const y = lerp(A.y, B.y, 0.5) - 0.15;
  const w = 2.2;
  const geo = new THREE.BoxGeometry(len, 0.5, w);
  const m = new THREE.Mesh(geo, bridgeMat);
  m.position.set(cx, y - 0.25, cz);
  m.rotation.y = -Math.atan2(dz, dx);
  m.receiveShadow = true; m.castShadow = true;
  islandsGroup.add(m);
  // Geländer-Leuchten
  const railGeo = new THREE.BoxGeometry(len, 0.08, 0.08);
  [-w / 2, w / 2].forEach((off) => {
    const rail = new THREE.Mesh(railGeo, rimMat);
    rail.position.set(cx, y + 0.35, cz);
    rail.rotation.y = m.rotation.y;
    rail.translateZ(off);
    islandsGroup.add(rail);
  });
  // Kollision als Segment (gekürzt auf Lücke)
  const ux = dx / dist, uz = dz / dist;
  colliders.push({
    kind: 'seg',
    ax: ax + ux * (A.r - 1), az: az + uz * (A.r - 1),
    bx: bx - ux * (B.r - 1), bz: bz - uz * (B.r - 1),
    w, y,
  });
}
BRIDGES.forEach(([a, b]) => buildBridge(a, b));

function distToSeg(px, pz, ax, az, bx, bz) {
  const dx = bx - ax, dz = bz - az;
  const l2 = dx * dx + dz * dz;
  let t = l2 ? ((px - ax) * dx + (pz - az) * dz) / l2 : 0;
  t = clamp(t, 0, 1);
  return Math.hypot(px - (ax + dx * t), pz - (az + dz * t));
}
/** Höchstes begehbares Plateau unter den Füßen (oder null). */
function groundAt(x, z, feetY) {
  let best = null;
  for (const c of colliders) {
    if (c.kind === 'disc') {
      if (Math.hypot(x - c.x, z - c.z) > c.r) continue;
      if (feetY >= c.y - 1.3 && feetY <= c.y + 0.6) {
        if (best === null || c.y > best) best = c.y;
      }
    } else {
      if (distToSeg(x, z, c.ax, c.az, c.bx, c.bz) > c.w / 2) continue;
      if (feetY >= c.y - 1.3 && feetY <= c.y + 0.6) {
        if (best === null || c.y > best) best = c.y;
      }
    }
  }
  return best;
}

/* Deko: Kristalle, Sterne, Nebel, Treibgut */
const drifters = [];
{
  const cryMatA = new THREE.MeshStandardMaterial({ color: 0x2a1650, emissive: 0xa855f7, emissiveIntensity: 1.25, roughness: 0.25, metalness: 0.3 });
  const cryMatB = new THREE.MeshStandardMaterial({ color: 0x0e2a3a, emissive: 0x22d3ee, emissiveIntensity: 1.15, roughness: 0.25, metalness: 0.3 });
  const spots = [[8, 0, -6], [-9, 1, -3], [3, 0.5, 10], [21, 0.5, 5], [-20, 1, 9], [5, 1.5, -22], [-26, 2, -12], [9, 2.4, 33]];
  spots.forEach(([x, y, z], i) => {
    const n = 2 + (i % 2);
    for (let k = 0; k < n; k++) {
      const h = 0.7 + Math.random() * 1.4;
      const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.3 + Math.random() * 0.3), i % 2 ? cryMatA : cryMatB);
      m.position.set(x + (Math.random() - 0.5) * 3, y + h * 0.4, z + (Math.random() - 0.5) * 3);
      m.scale.y = h; m.castShadow = true;
      m.rotation.set(Math.random(), Math.random() * 3, Math.random() * 0.3);
      scene.add(m);
    }
  });
}
let stars, motes;
{
  const n = 1600, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = 380 + Math.random() * 120, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = Math.abs(r * Math.cos(ph)) * 0.7 - 30;
    pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  stars = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xcfd8ff, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0.9, fog: false }));
  scene.add(stars);
  const m2 = 380, p2 = new Float32Array(m2 * 3);
  for (let i = 0; i < m2; i++) {
    p2[i * 3] = (Math.random() - 0.5) * 130;
    p2[i * 3 + 1] = Math.random() * 30 - 8;
    p2[i * 3 + 2] = (Math.random() - 0.5) * 130;
  }
  const g2 = new THREE.BufferGeometry();
  g2.setAttribute('position', new THREE.BufferAttribute(p2, 3));
  motes = new THREE.Points(g2, new THREE.PointsMaterial({ color: 0xa855f7, size: 0.14, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
  scene.add(motes);
  // Nebel-Sprites
  [[0x6d28d9, -160, 40, -220, 320], [0x0e7490, 200, 60, -140, 280], [0xbe185d, -40, 90, 220, 300]].forEach(([col, x, y, z, s]) => {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture('#ffffff'), color: col, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
    sp.position.set(x, y, z); sp.scale.set(s, s, 1); scene.add(sp);
  });
  // Treibende Felsen in der Ferne
  const rockGeo = new THREE.DodecahedronGeometry(1, 0);
  for (let i = 0; i < 26; i++) {
    const m = new THREE.Mesh(rockGeo, rockMat);
    const a = Math.random() * Math.PI * 2, r = 90 + Math.random() * 120;
    m.position.set(Math.cos(a) * r, -10 + Math.random() * 50, Math.sin(a) * r);
    m.scale.setScalar(1 + Math.random() * 4);
    m.rotation.set(Math.random() * 3, Math.random() * 3, 0);
    m.userData = { rs: (Math.random() - 0.5) * 0.2, by: m.position.y, bs: Math.random() * 3 };
    scene.add(m);
    drifters.push(m);
  }
}

/* ---------------- Spieler: Voidling ---------------- */
const player = new THREE.Group();
const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0d0716, roughness: 0.35, metalness: 0.25, emissive: 0x2e1065, emissiveIntensity: 0.5 });
const body = new THREE.Mesh(new THREE.SphereGeometry(0.55, 24, 18), bodyMat);
body.scale.set(1, 1.15, 0.95);
body.position.y = 0.75;
body.castShadow = true;
player.add(body);
const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xc084fc, emissiveIntensity: 3 });
[-0.2, 0.2].forEach((x) => {
  const e = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), eyeMat);
  e.position.set(x, 0.88, 0.44);
  player.add(e);
});
const hornMat = new THREE.MeshStandardMaterial({ color: 0x1a0f2e, emissive: 0xa855f7, emissiveIntensity: 1.8 });
[-0.3, 0.3].forEach((x) => {
  const h = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.5, 8), hornMat);
  h.position.set(x, 1.42, -0.05);
  h.rotation.z = x > 0 ? -0.35 : 0.35;
  player.add(h);
});
const bellyGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: texGlowViolet, color: 0xa855f7, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
bellyGlow.scale.set(1.6, 1.6, 1); bellyGlow.position.y = 0.7;
player.add(bellyGlow);
const blobShadow = new THREE.Mesh(new THREE.CircleGeometry(0.5, 20),
  new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.4, depthWrite: false }));
blobShadow.rotation.x = -Math.PI / 2;
player.add(blobShadow);
scene.add(player);
player.position.set(0, 0.1, 8);
const SPAWN = new THREE.Vector3(0, 0.1, 8);

/* Irrlicht-Begleiter + Band */
const wisp = new THREE.Group();
const wispCore = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12),
  new THREE.MeshStandardMaterial({ color: 0xe0feff, emissive: 0x22d3ee, emissiveIntensity: 4 }));
wisp.add(wispCore);
const wispHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: texGlowCyan, color: 0x22d3ee, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
wispHalo.scale.set(1.8, 1.8, 1);
wisp.add(wispHalo);
scene.add(wisp);
const wispPos = new THREE.Vector3(2, 2.5, 6);
const tetherGeo = new THREE.BufferGeometry().setFromPoints(new Array(20).fill(0).map(() => new THREE.Vector3()));
const tether = new THREE.Line(tetherGeo, new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending }));
scene.add(tether);
function updateTether(a, b, t) {
  const p = tetherGeo.attributes.position;
  for (let i = 0; i < 20; i++) {
    const k = i / 19;
    const sag = Math.sin(k * Math.PI) * (0.5 + Math.sin(t * 3) * 0.12);
    p.setXYZ(i, lerp(a.x, b.x, k), lerp(a.y, b.y, k) - sag, lerp(a.z, b.z, k));
  }
  p.needsUpdate = true;
}

/* ---------------- Splitter ---------------- */
const shards = [];
const SHARD_SPOTS = [
  [5, 0, -4], [-6, 0, 3],
  [21, 0.5, 3], [-20, 1, 7], [4, 1.5, -22], [-7, 1.2, 23],
  [25, 2.2, -14], [-25, 2, -13], [9, 2.4, 33], [-13, 2.6, -32],
  [38, 3, 9], [-38, 3, 15],
];
SHARD_SPOTS.forEach(([x, y, z], i) => {
  const grp = new THREE.Group();
  const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.45),
    new THREE.MeshStandardMaterial({ color: 0x100826, emissive: i % 2 ? 0x22d3ee : 0xa855f7, emissiveIntensity: 3, roughness: 0.2 }));
  core.castShadow = true;
  grp.add(core);
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.4, 26, 8, 1, true),
    new THREE.MeshBasicMaterial({ color: i % 2 ? 0x22d3ee : 0xa855f7, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
  beam.position.y = 12;
  grp.add(beam);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: i % 2 ? texGlowCyan : texGlowViolet, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }));
  halo.scale.set(2.4, 2.4, 1);
  grp.add(halo);
  grp.position.set(x, y + 1.4, z);
  grp.userData = { idx: i, taken: false, phase: Math.random() * 6 };
  scene.add(grp);
  shards.push(grp);
});

/* ---------------- Sentinels (Gegner) ---------------- */
const enemies = [];
function spawnSentinel(x, y, z, range) {
  const g = new THREE.Group();
  const cloak = new THREE.Mesh(new THREE.ConeGeometry(0.75, 2.0, 8),
    new THREE.MeshStandardMaterial({ color: 0x160a12, roughness: 0.6, emissive: 0x7f1d1d, emissiveIntensity: 0.5 }));
  cloak.position.y = 1.0; cloak.castShadow = true;
  g.add(cloak);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12),
    new THREE.MeshStandardMaterial({ color: 0x0c0512, roughness: 0.4, emissive: 0x991b1b, emissiveIntensity: 0.7 }));
  head.position.y = 2.0; head.castShadow = true;
  g.add(head);
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xef4444, emissiveIntensity: 5 }));
  eye.position.set(0, 2.0, 0.36);
  g.add(eye);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: texGlowRed, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
  halo.scale.set(2.2, 2.2, 1); halo.position.y = 1.4;
  g.add(halo);
  g.position.set(x, y, z);
  scene.add(g);
  enemies.push({
    mesh: g, eye, home: new THREE.Vector3(x, y, z), range,
    dir: Math.random() * Math.PI * 2, stun: 0, atkCd: 0, flash: 0,
    vel: new THREE.Vector3(),
  });
}
spawnSentinel(21, 0.5, 0, 3.5);
spawnSentinel(-20, 1, 4, 4);
spawnSentinel(4, 1.5, -19, 3.5);
spawnSentinel(25, 2.2, -12, 2.5);
spawnSentinel(-25, 2, -11, 2.5);

/* ---------------- Portal ---------------- */
const portal = new THREE.Group();
const portalRing = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.22, 14, 40),
  new THREE.MeshStandardMaterial({ color: 0x2a2438, emissive: 0x555566, emissiveIntensity: 0.4, roughness: 0.3, metalness: 0.6 }));
portalRing.castShadow = true;
portal.add(portalRing);
const portalDisc = new THREE.Mesh(new THREE.CircleGeometry(1.5, 40),
  new THREE.MeshBasicMaterial({ color: 0x1a1230, transparent: true, opacity: 0.85, side: THREE.DoubleSide }));
portal.add(portalDisc);
const portalGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: texGlowViolet, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false }));
portalGlow.scale.set(7, 7, 1);
portal.add(portalGlow);
const portalBeam = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 1.1, 40, 10, 1, true),
  new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
portalBeam.position.y = 20;
portal.add(portalBeam);
portal.position.set(0, 2.1, -7);
scene.add(portal);
portalLight.position.set(0, 3, -7);
let portalActive = false;

/* ---------------- Partikel-Bursts & Puls-Ring ---------------- */
const bursts = [];
function burst(pos, color = 0xa855f7, n = 26, speed = 6) {
  const geo = new THREE.BufferGeometry();
  const p = new Float32Array(n * 3), v = [];
  for (let i = 0; i < n; i++) {
    p[i * 3] = pos.x; p[i * 3 + 1] = pos.y; p[i * 3 + 2] = pos.z;
    const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), s = speed * (0.4 + Math.random());
    v.push(new THREE.Vector3(Math.sin(ph) * Math.cos(th) * s, Math.abs(Math.cos(ph)) * s, Math.sin(ph) * Math.sin(th) * s));
  }
  geo.setAttribute('position', new THREE.BufferAttribute(p, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color, size: 0.22, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false }));
  scene.add(pts);
  bursts.push({ pts, v, life: 0.9, age: 0 });
}
const pulseRings = [];
function pulseRing(pos) {
  const m = new THREE.Mesh(new THREE.RingGeometry(0.9, 1.15, 48),
    new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.95, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
  m.rotation.x = -Math.PI / 2;
  m.position.copy(pos); m.position.y += 0.25;
  scene.add(m);
  pulseRings.push({ m, age: 0 });
}

/* ---------------- Input (Desktop) ---------------- */
const keys = new Set();
addEventListener('keydown', (e) => {
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
  keys.add(e.code);
  if (e.code === 'Space') S.jumpBuffer = 0.15;
  if (e.code === 'KeyF') doPulse();
  if (e.code === 'KeyM') toggleSound();
  if (e.code === 'KeyR' && (S.state === 'won' || S.state === 'lost')) resetGame();
  if (e.code === 'KeyP') togglePause();
  if (e.code === 'Enter' && S.state === 'menu') startGame();
  audio(); startDrone();
});
addEventListener('keyup', (e) => keys.delete(e.code));

let dragging = false, lx = 0, ly = 0;
canvas.addEventListener('mousedown', (ev) => {
  audio(); startDrone();
  if (S.state === 'playing' && document.pointerLockElement !== canvas) {
    try { canvas.requestPointerLock(); } catch { /* fallback drag */ }
  }
  dragging = true; lx = ev.clientX; ly = ev.clientY;
});
addEventListener('mouseup', () => { dragging = false; });
addEventListener('mousemove', (e) => {
  if (S.state !== 'playing') return;
  let dx = 0, dy = 0;
  if (document.pointerLockElement === canvas) { dx = e.movementX; dy = e.movementY; }
  else if (dragging) { dx = e.clientX - lx; dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; }
  else return;
  S.yaw -= dx * 0.0026 * S.sensitivity;
  S.pitch = clamp(S.pitch - dy * 0.0022 * S.sensitivity, -1.15, 0.55);
});
canvas.addEventListener('click', () => {
  if (S.state === 'playing' && !document.pointerLockElement) { /* Puls bei Klick ohne Lock */ }
});
addEventListener('click', (e) => {
  if (S.state !== 'playing' || e.target !== canvas) return;
  // Der Klick, der Pointer-Lock anfordert, soll keinen Puls auslösen.
  if (document.pointerLockElement === canvas || S.noLock) doPulse();
});
document.addEventListener('pointerlockerror', () => { S.noLock = true; });
document.addEventListener('pointerlockchange', () => {
  if (document.pointerLockElement !== canvas && S.state === 'playing' && S.lockWasActive) {
    // Esc wurde gedrückt → Pause (nur wenn zuvor gelockt)
    pauseGame();
  }
  S.lockWasActive = document.pointerLockElement === canvas;
});

/* ---------------- UI ---------------- */
function toast(msg, ms = 2600) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.add('hidden'), ms);
}
function fmtTime(s) {
  const m = Math.floor(s / 60), ss = Math.floor(s % 60);
  return `${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}
function updateHUD() {
  $('hp-fill').style.width = `${(S.hp / S.maxHp) * 100}%`;
  $('hp-text').textContent = Math.ceil(S.hp);
  $('stamina-fill').style.width = `${S.stamina}%`;
  $('shard-text').textContent = `${S.shards} / ${TOTAL_SHARDS}`;
  $('timer').textContent = fmtTime(S.time);
  $('objective').textContent = portalActive ? '➜ Zum Portal in der Mitte!' : `Sammle ${TOTAL_SHARDS} Void-Splitter (${TOTAL_SHARDS - S.shards} fehlen)`;
  $('pulse-cd').textContent = S.pulseCd > 0 ? `(${S.pulseCd.toFixed(1)}s)` : 'BEREIT';
  $('vignette').style.opacity = S.hp < 35 ? 0.7 : (S.iframes > 0.6 ? 0.55 : 0);
  if (S.hintTimer > 0) { S.hintTimer -= 1 / 60; if (S.hintTimer <= 0) $('controls-hint').style.opacity = 0; }
}
function toggleSound() {
  $('sound-toggle').checked = !$('sound-toggle').checked;
  S.sound = $('sound-toggle').checked;
  if (masterGain) masterGain.gain.value = S.sound ? 0.5 : 0;
}
$('sound-toggle').addEventListener('change', () => {
  S.sound = $('sound-toggle').checked;
  if (masterGain) masterGain.gain.value = S.sound ? 0.5 : 0;
});
$('quality').addEventListener('change', (e) => applyQuality(e.target.value));
$('sensitivity').addEventListener('input', (e) => { S.sensitivity = parseFloat(e.target.value); });
$('start-btn').addEventListener('click', () => { sfx.click(); startGame(); });
$('resume-btn').addEventListener('click', () => resumeGame());
$('restart-btn').addEventListener('click', () => { resetGame(); });
$('restart-btn-2').addEventListener('click', () => { resetGame(); });

function applyQuality(q) {
  S.quality = q;
  if (q === 'high') {
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    moon.castShadow = true;
    moon.shadow.mapSize.set(2048, 2048);
    motes.visible = true;
  } else if (q === 'med') {
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
    renderer.shadowMap.enabled = true;
    moon.castShadow = true;
    moon.shadow.mapSize.set(1024, 1024);
    motes.visible = true;
  } else {
    renderer.setPixelRatio(1);
    renderer.shadowMap.enabled = false;
    moon.castShadow = false;
    motes.visible = false;
  }
  if (moon.shadow.map) { moon.shadow.map.dispose(); moon.shadow.map = null; }
}
applyQuality('high');

/* ---------------- Spielablauf ---------------- */
function startGame() {
  audio(); startDrone();
  $('menu').classList.add('hidden');
  $('end').classList.add('hidden');
  $('pause').classList.add('hidden');
  $('hud').classList.remove('hidden');
  S.state = 'playing';
  toast('Finde die Splitter — folge dem ➤-Pfeil!');
}
function pauseGame() {
  if (S.state !== 'playing') return;
  S.state = 'paused';
  $('pause').classList.remove('hidden');
  if (document.pointerLockElement) document.exitPointerLock();
}
function resumeGame() {
  $('pause').classList.add('hidden');
  S.state = 'playing';
}
function togglePause() {
  if (S.state === 'playing') pauseGame();
  else if (S.state === 'paused') resumeGame();
}
function endGame(won) {
  S.state = won ? 'won' : 'lost';
  S.won = won;
  if (document.pointerLockElement) document.exitPointerLock();
  $('end').classList.remove('hidden');
  $('end-title').textContent = won ? 'GEBUNDEN — UND FREI' : 'VERSCHLUNGEN VON DER LEERE';
  $('end-text').textContent = won
    ? 'Das Portal trägt dich und dein Irrlicht nach Hause. Das Band hält — für immer.'
    : 'Der Voidling löst sich auf … aber das Irrlicht wartet auf einen neuen Versuch.';
  $('end-stats').innerHTML =
    `<div><b>${fmtTime(S.time)}</b>Zeit</div>` +
    `<div><b>${S.shards}/${TOTAL_SHARDS}</b>Splitter</div>` +
    `<div><b>${S.pulses}</b>Pulse</div>` +
    `<div><b>${Math.round(S.damageTaken)}</b>Schaden</div>`;
  if (won) { sfx.win(); burst(portal.position, 0x22d3ee, 60, 9); }
  else sfx.lose();
}
function resetGame() {
  S.hp = 100; S.stamina = 100; S.shards = 0; S.time = 0;
  S.pulses = 0; S.damageTaken = 0; S.pulseCd = 0; S.iframes = 0;
  S.vel.set(0, 0, 0);
  S.yaw = Math.PI; S.pitch = -0.32;
  player.position.copy(SPAWN);
  S.lastSafe.copy(SPAWN);
  portalActive = false;
  portalLight.intensity = 0;
  portalRing.material.emissive.setHex(0x555566);
  portalRing.material.emissiveIntensity = 0.4;
  portalDisc.material.color.setHex(0x1a1230);
  portalGlow.material.opacity = 0.25;
  portalBeam.material.opacity = 0;
  shards.forEach((s) => { s.visible = true; s.userData.taken = false; });
  enemies.forEach((e) => { e.mesh.position.copy(e.home); e.stun = 0; e.vel.set(0, 0, 0); });
  $('end').classList.add('hidden');
  $('pause').classList.add('hidden');
  $('menu').classList.add('hidden');
  $('hud').classList.remove('hidden');
  S.state = 'playing';
  toast('Neuer Versuch — das Band hält!');
}

function damage(amount, fromPos) {
  if (S.iframes > 0 || S.state !== 'playing') return;
  S.hp -= amount;
  S.damageTaken += amount;
  S.iframes = 1.0;
  sfx.hurt();
  burst(player.position.clone().add(new THREE.Vector3(0, 1, 0)), 0xef4444, 20, 5);
  if (fromPos) {
    const away = player.position.clone().sub(fromPos).setY(0).normalize();
    S.vel.x = away.x * 10; S.vel.z = away.z * 10; S.vel.y = 5;
  }
  if (S.hp <= 0) { S.hp = 0; endGame(false); }
  else if (S.hp < 35) toast('Wenig Leben! Splitter heilen +10.');
}

function doPulse(fromClick = false) {
  if (S.state !== 'playing' || S.pulseCd > 0 || S.stamina < 20) return;
  S.pulseCd = PULSE_COOLDOWN;
  S.stamina -= 20;
  S.pulses++;
  sfx.pulse();
  pulseRing(player.position);
  burst(player.position.clone().add(new THREE.Vector3(0, 1, 0)), 0x22d3ee, 40, 10);
  enemies.forEach((e) => {
    const d = e.mesh.position.distanceTo(player.position);
    if (d < PULSE_RADIUS) {
      const away = e.mesh.position.clone().sub(player.position).setY(0).normalize();
      e.vel.x = away.x * 16; e.vel.z = away.z * 16;
      e.stun = 1.6; e.flash = 0.4;
    }
  });
}

function collectShard(s) {
  s.userData.taken = true;
  s.visible = false;
  S.shards++;
  S.hp = Math.min(S.maxHp, S.hp + 10);
  sfx.collect(S.shards);
  burst(s.position, 0xa855f7, 36, 7);
  burst(s.position, 0x22d3ee, 20, 5);
  if (S.shards === Math.floor(TOTAL_SHARDS / 2)) toast('Halbzeit! 6 Splitter — das Band glüht stärker.');
  else if (S.shards === TOTAL_SHARDS) {
    portalActive = true;
    portalLight.intensity = 60;
    portalRing.material.emissive.setHex(0xa855f7);
    portalRing.material.emissiveIntensity = 2.5;
    portalDisc.material.color.setHex(0x7c3aed);
    portalGlow.material.opacity = 0.9;
    portalBeam.material.opacity = 0.35;
    sfx.portal();
    toast('Alle Splitter! ➜ Das PORTAL ist offen — kehre zur Mitte zurück!', 4500);
  } else {
    toast(`Splitter ${S.shards}/${TOTAL_SHARDS} — +10 Leben`);
  }
}

/* ---------------- Update ---------------- */
const clock = new THREE.Clock();
const camTarget = new THREE.Vector3();
const tmpV = new THREE.Vector3();
let menuOrbit = 0;

function updatePlayer(dt) {
  const fwdInput = (keys.has('KeyW') || keys.has('ArrowUp') ? 1 : 0) - (keys.has('KeyS') || keys.has('ArrowDown') ? 1 : 0);
  const strafe = (keys.has('KeyD') || keys.has('ArrowRight') ? 1 : 0) - (keys.has('KeyA') || keys.has('ArrowLeft') ? 1 : 0);
  const wantSprint = keys.has('ShiftLeft') || keys.has('ShiftRight');
  const sprinting = wantSprint && fwdInput > 0 && S.stamina > 1;
  const maxSpeed = sprinting ? SPRINT_SPEED : WALK_SPEED;

  // Richtung relativ zur Kamera (V = Blickrichtung, Right = V x Up)
  const sin = Math.sin(S.yaw), cos = Math.cos(S.yaw);
  const wish = new THREE.Vector3(
    (fwdInput * sin - strafe * cos),
    0,
    (fwdInput * cos + strafe * sin)
  );
  if (wish.lengthSq() > 1) wish.normalize();
  const moving = wish.lengthSq() > 0.001;

  const accel = S.grounded ? 42 : 20;
  S.vel.x = lerp(S.vel.x, wish.x * maxSpeed, clamp(accel * dt / maxSpeed, 0, 1));
  S.vel.z = lerp(S.vel.z, wish.z * maxSpeed, clamp(accel * dt / maxSpeed, 0, 1));

  if (sprinting && moving) {
    S.stamina = Math.max(0, S.stamina - 22 * dt);
    camera.fov = lerp(camera.fov, 68, 4 * dt);
  } else {
    S.stamina = Math.min(100, S.stamina + (S.grounded ? 16 : 7) * dt);
    camera.fov = lerp(camera.fov, 60, 4 * dt);
  }
  camera.updateProjectionMatrix();

  // Schwerkraft + Springen
  S.vel.y += GRAVITY * dt;
  S.vel.y = Math.max(S.vel.y, -30);
  S.coyote -= dt; S.jumpBuffer -= dt; S.iframes -= dt; S.pulseCd = Math.max(0, S.pulseCd - dt);

  if (S.jumpBuffer > 0) {
    if (S.grounded || S.coyote > 0) {
      S.vel.y = JUMP_VEL; S.grounded = false; S.coyote = 0; S.jumpBuffer = 0; S.jumps = 1;
      sfx.jump(); burst(player.position, 0xa855f7, 10, 3);
    } else if (S.jumps > 0) {
      S.jumps--; S.vel.y = DOUBLE_JUMP_VEL; S.jumpBuffer = 0;
      sfx.doubleJump(); burst(player.position.clone().add(new THREE.Vector3(0, 0.4, 0)), 0x22d3ee, 16, 4);
    }
  }

  player.position.x += S.vel.x * dt;
  player.position.z += S.vel.z * dt;
  player.position.y += S.vel.y * dt;

  // Bodenkontakt
  const feet = player.position.y;
  const g = groundAt(player.position.x, player.position.z, feet);
  if (S.vel.y <= 0 && g !== null && feet <= g + 0.08) {
    if (!S.grounded && S.vel.y < -8) { sfx.land(); burst(player.position, 0x8b5cf6, 8, 2.5); }
    player.position.y = g;
    S.vel.y = 0;
    if (!S.grounded) { S.grounded = true; S.jumps = 1; }
    S.coyote = 0.13;
    S.safeTimer += dt;
    if (S.safeTimer > 1) { S.safeTimer = 0; S.lastSafe.copy(player.position); }
  } else {
    if (S.grounded) { S.grounded = false; }
  }

  // Drehung zur Bewegung
  if (moving) {
    const targetRot = Math.atan2(S.vel.x, S.vel.z);
    let d = targetRot - player.rotation.y;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    player.rotation.y += d * Math.min(1, 12 * dt);
  }

  // Squash & Stretch + Laufen-Wippen
  const stretch = clamp(1 + S.vel.y * 0.012, 0.85, 1.25);
  const t = performance.now() * 0.001;
  const bob = S.grounded && moving ? Math.abs(Math.sin(t * 11)) * 0.08 : Math.sin(t * 2.2) * 0.03;
  body.scale.set(1 / Math.sqrt(stretch), 1.15 * stretch, 0.95 / Math.sqrt(stretch));
  body.position.y = 0.75 + bob;
  body.visible = S.iframes > 0 ? (Math.floor(t * 14) % 2 === 0) : true;

  // Blob-Schatten
  const below = groundAt(player.position.x, player.position.z, player.position.y + 0.5);
  if (below !== null) {
    const h = player.position.y - below;
    blobShadow.visible = true;
    blobShadow.position.y = below - player.position.y + 0.03;
    blobShadow.material.opacity = clamp(0.42 - h * 0.05, 0.05, 0.42);
    const sc = clamp(1 - h * 0.06, 0.4, 1);
    blobShadow.scale.set(sc, sc, 1);
  } else blobShadow.visible = false;

  playerLight.position.copy(player.position).add(new THREE.Vector3(0, 2.2, 0));

  // Sturz in die Leere
  if (player.position.y < -13) {
    S.hp -= 20; S.damageTaken += 20;
    sfx.hurt();
    burst(S.lastSafe.clone().add(new THREE.Vector3(0, 1, 0)), 0xef4444, 24, 5);
    if (S.hp <= 0) { S.hp = 0; endGame(false); return; }
    player.position.copy(S.lastSafe).add(new THREE.Vector3(0, 0.5, 0));
    S.vel.set(0, 0, 0);
    S.iframes = 1.2;
    toast('Die Leere beißt! −20 Leben — zurück zum letzten sicheren Boden.');
  }
}

function updateWisp(dt, t) {
  const anchor = player.position.clone().add(new THREE.Vector3(
    Math.sin(t * 0.7) * 1.6, 2.1 + Math.sin(t * 2.1) * 0.35, Math.cos(t * 0.7) * 1.6));
  wispPos.lerp(anchor, Math.min(1, 3.2 * dt));
  wisp.position.copy(wispPos);
  wispLight.position.copy(wispPos);
  wispLight.intensity = 36 + Math.sin(t * 5) * 6;
  updateTether(player.position.clone().add(new THREE.Vector3(0, 1.1, 0)), wispPos, t);
}

function updateEnemies(dt, t) {
  for (const e of enemies) {
    const toPlayer = player.position.clone().sub(e.mesh.position);
    const dist = toPlayer.length();
    const dy = Math.abs(player.position.y - e.mesh.position.y);
    e.stun = Math.max(0, e.stun - dt);
    e.atkCd -= dt; e.flash = Math.max(0, e.flash - dt);

    let mvx = 0, mvz = 0, speed = 0;
    if (e.stun > 0) {
      // zurückgestoßen, Reibung
      e.vel.x = lerp(e.vel.x, 0, 3 * dt); e.vel.z = lerp(e.vel.z, 0, 3 * dt);
      mvx = e.vel.x; mvz = e.vel.z;
    } else if (S.state === 'playing' && dist < 13 && dy < 4.5) {
      speed = 4.4;
      mvx = (toPlayer.x / dist) * speed; mvz = (toPlayer.z / dist) * speed;
      e.mesh.rotation.y = Math.atan2(toPlayer.x, toPlayer.z);
    } else {
      // Patrouille um Zuhause
      e.dir += dt * 0.7;
      const px = e.home.x + Math.cos(e.dir) * e.range;
      const pz = e.home.z + Math.sin(e.dir) * e.range;
      tmpV.set(px - e.mesh.position.x, 0, pz - e.mesh.position.z);
      const d = tmpV.length();
      if (d > 0.2) { tmpV.normalize().multiplyScalar(2.4); mvx = tmpV.x; mvz = tmpV.z; }
      e.mesh.rotation.y += dt * 1.5;
    }
    e.mesh.position.x += mvx * dt;
    e.mesh.position.z += mvz * dt;
    // Höhe: Schweben über Boden
    const g = groundAt(e.mesh.position.x, e.mesh.position.z, e.mesh.position.y + 1);
    const targetY = (g !== null ? g : e.home.y) + 0.15 + Math.sin(t * 2.4 + e.home.x) * 0.25;
    e.mesh.position.y = lerp(e.mesh.position.y, targetY, Math.min(1, 4 * dt));

    // Angriff
    if (S.state === 'playing' && dist < 1.9 && e.atkCd <= 0 && e.stun <= 0) {
      e.atkCd = 1.3;
      damage(12, e.mesh.position);
    }
    e.eye.material.emissiveIntensity = e.stun > 0 ? 1 : 4 + Math.sin(t * 6 + e.home.z) * 1.2;
  }
}

function updateShards(dt, t) {
  for (const s of shards) {
    if (s.userData.taken) continue;
    s.rotation.y += dt * 1.6;
    s.position.y += Math.sin(t * 2 + s.userData.phase) * dt * 0.45;
    if (S.state === 'playing' && s.position.distanceTo(player.position.clone().add(new THREE.Vector3(0, 1, 0))) < 1.9) {
      collectShard(s);
    }
  }
  // Portal
  portalRing.rotation.z += dt * (portalActive ? 1.4 : 0.15);
  portalDisc.rotation.z -= dt * (portalActive ? 0.9 : 0.05);
  const sc = portalActive ? 1 + Math.sin(t * 3) * 0.03 : 1;
  portalGlow.scale.set(7 * sc, 7 * sc, 1);
  if (portalActive) {
    portalLight.intensity = 55 + Math.sin(t * 4) * 12;
    if (S.state === 'playing' && portal.position.distanceTo(player.position) < 2.6) {
      endGame(true);
    }
  }
}

function updateCamera(dt) {
  if (S.state === 'menu') {
    menuOrbit += dt * 0.18;
    camTarget.set(0, 1.5, 0);
    camera.position.set(Math.sin(menuOrbit) * 26, 10 + Math.sin(menuOrbit * 0.6) * 2, Math.cos(menuOrbit) * 26);
    camera.lookAt(camTarget);
    return;
  }
  const dist = 7.6;
  camTarget.copy(player.position).add(new THREE.Vector3(0, 1.7, 0));
  const cx = camTarget.x - Math.sin(S.yaw) * Math.cos(S.pitch) * dist;
  const cz = camTarget.z - Math.cos(S.yaw) * Math.cos(S.pitch) * dist;
  const cy = camTarget.y - Math.sin(S.pitch) * dist;
  tmpV.set(cx, cy, cz);
  // Kamera nicht unter Boden
  const g = groundAt(cx, cz, cy);
  if (g !== null && tmpV.y < g + 0.6) tmpV.y = g + 0.6;
  camera.position.lerp(tmpV, Math.min(1, 9 * dt));
  camera.lookAt(camTarget);
}

function updateCompass() {
  let target = null, isPortal = false;
  let best = Infinity;
  if (!portalActive) {
    for (const s of shards) {
      if (s.userData.taken) continue;
      const d = s.position.distanceTo(player.position);
      if (d < best) { best = d; target = s.position; }
    }
  } else { target = portal.position; best = target.distanceTo(player.position); isPortal = true; }
  if (!target) return;
  const angWorld = Math.atan2(target.x - player.position.x, target.z - player.position.z);
  // Bildschirm-relative Drehung: Kamera-Yaw vs Ziel
  const rel = angWorld - (S.yaw + Math.PI);
  $('compass-arrow').style.transform = `rotate(${-rel}rad)`;
  $('compass-label').textContent = `${isPortal ? 'Portal' : '◈'} ${Math.round(best)}m`;
}

function updateBursts(dt) {
  for (let i = bursts.length - 1; i >= 0; i--) {
    const b = bursts[i];
    b.age += dt;
    const p = b.pts.geometry.attributes.position;
    for (let j = 0; j < b.v.length; j++) {
      b.v[j].y -= 9 * dt;
      p.setXYZ(j, p.getX(j) + b.v[j].x * dt, Math.max(-14, p.getY(j) + b.v[j].y * dt), p.getZ(j) + b.v[j].z * dt);
    }
    p.needsUpdate = true;
    b.pts.material.opacity = 1 - b.age / b.life;
    if (b.age >= b.life) { scene.remove(b.pts); b.pts.geometry.dispose(); b.pts.material.dispose(); bursts.splice(i, 1); }
  }
  for (let i = pulseRings.length - 1; i >= 0; i--) {
    const r = pulseRings[i];
    r.age += dt;
    const k = r.age / 0.55;
    r.m.scale.setScalar(1 + k * PULSE_RADIUS);
    r.m.material.opacity = 0.95 * (1 - k);
    if (k >= 1) { scene.remove(r.m); r.m.geometry.dispose(); r.m.material.dispose(); pulseRings.splice(i, 1); }
  }
}

/* ---------------- Loop ---------------- */
let firstFrame = true;
function loop() {
  requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  if (S.state === 'playing') {
    S.time += dt;
    updatePlayer(dt);
    updateEnemies(dt, t);
    updateShards(dt, t);
    updateHUD();
    updateCompass();
  } else if (S.state === 'menu') {
    // Idle-Animation im Menü
    player.position.set(0, 0, 8);
    body.position.y = 0.75 + Math.sin(t * 2.2) * 0.04;
    updateShards(dt, t);
    updateEnemies(dt, t);
  } else {
    updateShards(dt, t);
  }
  updateWisp(dt, t);
  updateCamera(dt);
  updateBursts(dt);

  // Ambiente
  motes.rotation.y += dt * 0.02;
  stars.rotation.y += dt * 0.002;
  const mp = motes.geometry.attributes.position;
  for (let i = 0; i < mp.count; i += 4) {
    let y = mp.getY(i) + dt * 0.5;
    if (y > 25) y = -8;
    mp.setY(i, y);
  }
  mp.needsUpdate = true;
  for (const d of drifters) {
    d.rotation.y += dt * d.userData.rs;
    d.position.y = d.userData.by + Math.sin(t * 0.3 + d.userData.bs) * 2;
  }

  renderer.render(scene, camera);
  if (firstFrame) {
    firstFrame = false;
    $('loading').style.display = 'none';
  }
}
loop();

/* Autostart für Screenshots (?play / ?autostart) */
if (params.has('play') || params.has('autostart')) {
  setTimeout(() => { if (S.state === 'menu') startGame(); }, 800);
}

/* Für Tests / Automatisierung */
window.__voidling = { S, startGame, resetGame, endGame, collectShard, player, shards, enemies, portal, doPulse, damage };
