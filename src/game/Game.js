// CRIMSON HUNT — Spiel-Orchestrator: Loop, Kamera, Wellen, Treffer, HUD.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildWorld, ARENA_RADIUS } from './World.js';
import { FX } from './Effects.js';
import { Player } from './Player.js';
import { Demon } from './Enemies.js';
import { GameAudio } from './Audio.js';

const WAVES = [
  { name: 'DIE ERSTEN SCHATTEN', subs: 'Puppets der Kathedrale', units: ['puppet', 'puppet', 'puppet'] },
  { name: 'SCHWERES GERÄT', subs: 'Ein Brute naht', units: ['puppet', 'puppet', 'puppet', 'brute'] },
  { name: 'FLINKE JÄGER', subs: 'Stalker im Dunkel', units: ['puppet', 'puppet', 'stalker', 'stalker', 'brute'] },
  { name: 'DER SCHWARM', subs: 'Keine Gnade', units: ['stalker', 'stalker', 'stalker', 'brute', 'brute', 'puppet'] },
  { name: '⛧ DER KATHEDRALEN-WÄCHTER ⛧', subs: 'Töte ihn. Beende die Jagd.', units: ['boss', 'puppet', 'puppet'] },
];

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.state = 'title'; // title | playing | paused | over | victory
    this.wave = 0;
    this.toSpawn = 0;
    this.enemies = [];
    this.boss = null;
    this.score = 0;
    this.time = 0;
    this.hits = 0;
    this.hitTimer = 0;
    this.waveDelay = 0;
    this.overT = 0;

    this.camYaw = Math.PI;
    this.camPitch = 0.25;
    this.trauma = 0;
    this.hitstop = 0;
    this.slowmo = 0;
    this.fovKick = 0;

    this.lockTarget = null;
    this.input = { forward: false, back: false, left: false, right: false, gun: false };

    this.dmgPool = [];
  }

  init() {
    const canvas = this.canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 800);
    this.camera.position.set(0, 6, 20);

    // Reflektionen für polierten Marmor & Stahl
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 0.25;

    // Post-Processing: Bloom für den "atemberaubenden" Look
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.65, 0.5, 0.62);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());

    this.audio = new GameAudio();
    this.fx = new FX(this.scene);
    this.world = buildWorld(this.scene);
    this.player = new Player(this.scene, this.fx, this.audio);
    this.player.reset();

    this.cacheDOM();
    this.bindInput();
    window.addEventListener('resize', () => this.onResize());

    this.clock = new THREE.Clock();
    this.renderer.setAnimationLoop(() => this.frame());
    window.__gameReady = false;
  }

  cacheDOM() {
    const $ = (id) => document.getElementById(id);
    this.el = {
      hud: $('hud'), hpFill: $('hp-fill'), hpText: $('hp-text'), devilFill: $('devil-fill'),
      wave: $('wave-label'), enemies: $('enemies-label'), hits: $('hits-count'),
      score: $('score-count'), time: $('time-count'),
      bossBar: $('boss-bar'), bossFill: $('boss-fill'),
      crosshair: $('crosshair'), lockon: $('lockon-marker'),
      vignette: $('damage-vignette'), flash: $('flash'),
      announce: $('announce'), announceSub: $('announce-sub'),
      help: $('help'), title: $('title-screen'), pause: $('pause-screen'),
      over: $('gameover-screen'), victory: $('victory-screen'),
      overStats: $('gameover-stats'), victoryStats: $('victory-stats'),
      dmgLayer: $('dmg-layer'),
      startBtn: $('start-btn'), resumeBtn: $('resume-btn'),
      restart1: $('restart-btn-1'), restart2: $('restart-btn-2'), restart3: $('restart-btn-3'),
    };
    // Damage-Number-Pool
    for (let i = 0; i < 28; i++) {
      const d = document.createElement('div');
      d.className = 'dmg-num';
      d.style.display = 'none';
      this.el.dmgLayer.appendChild(d);
      this.dmgPool.push({ el: d, wp: new THREE.Vector3(), t: 1, dur: 0.8 });
    }
  }

  // ---------------- Input ----------------
  bindInput() {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Tab') e.preventDefault();
      if (e.code === 'Space') e.preventDefault();
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': this.input.forward = true; break;
        case 'KeyS': case 'ArrowDown': this.input.back = true; break;
        case 'KeyA': case 'ArrowLeft': this.input.left = true; break;
        case 'KeyD': case 'ArrowRight': this.input.right = true; break;
        case 'Space': if (this.state === 'playing') this.player.tryJump(); break;
        case 'ShiftLeft': case 'ShiftRight': if (this.state === 'playing') this.doDash(); break;
        case 'KeyF': if (this.state === 'playing') this.player.tryLauncher(); break;
        case 'KeyE': if (this.state === 'playing') this.player.trySlam(); break;
        case 'KeyR': if (this.state === 'playing') this.doSpecial(); break;
        case 'KeyJ': if (this.state === 'playing') this.player.tryAttack(); break;
        case 'Tab':
          if (this.state === 'playing' && !e.repeat) this.cycleLock();
          break;
        case 'KeyM': {
          const m = this.audio.toggleMute();
          this.subAnnounce(m ? 'TON AUS' : 'TON AN');
          break;
        }
      }
    });
    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': this.input.forward = false; break;
        case 'KeyS': case 'ArrowDown': this.input.back = false; break;
        case 'KeyA': case 'ArrowLeft': this.input.left = false; break;
        case 'KeyD': case 'ArrowRight': this.input.right = false; break;
      }
    });
    this.canvas.addEventListener('mousedown', (e) => {
      if (this.state === 'paused') { this.resume(); return; }
      if (this.state !== 'playing') return;
      if (document.pointerLockElement !== this.canvas) { this.lock(); return; }
      if (e.button === 0) this.player.tryAttack();
      if (e.button === 2) this.input.gun = true;
    });
    window.addEventListener('mouseup', (e) => {
      if (e.button === 2) this.input.gun = false;
    });
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('mousemove', (e) => {
      if (document.pointerLockElement !== this.canvas || this.state !== 'playing') return;
      this.camYaw -= e.movementX * 0.0026;
      this.camPitch = THREE.MathUtils.clamp(this.camPitch + e.movementY * 0.0022, -0.45, 1.05);
    });
    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement !== this.canvas && this.state === 'playing') {
        this.pause();
      }
    });

    this.el.startBtn.addEventListener('click', () => this.start());
    this.el.resumeBtn.addEventListener('click', () => this.resume());
    this.el.restart1.addEventListener('click', () => this.restart());
    this.el.restart2.addEventListener('click', () => this.restart());
    this.el.restart3.addEventListener('click', () => this.restart());
  }

  lock() {
    try {
      const p = this.canvas.requestPointerLock();
      if (p && p.catch) p.catch(() => {});
    } catch { /* headless / ohne Pointer Lock spielbar */ }
  }

  // ---------------- State ----------------
  start() {
    this.audio.init();
    this.audio.ui();
    this.resetRun();
    this.el.title.classList.add('hidden');
    this.el.hud.classList.remove('hidden');
    this.el.help.classList.remove('hidden');
    this.state = 'playing';
    this.lock();
    this.nextWave();
  }

  restart() {
    this.audio.init();
    this.audio.ui();
    // Gegner aufräumen
    for (const e of this.enemies) e.dispose();
    this.enemies = [];
    this.boss = null;
    this.resetRun();
    this.el.pause.classList.add('hidden');
    this.el.over.classList.add('hidden');
    this.el.victory.classList.add('hidden');
    this.el.title.classList.add('hidden');
    this.el.hud.classList.remove('hidden');
    this.el.help.classList.remove('hidden');
    this.state = 'playing';
    this.lock();
    this.nextWave();
  }

  resetRun() {
    this.wave = 0;
    this.toSpawn = 0;
    this.score = 0;
    this.time = 0;
    this.hits = 0;
    this.hitTimer = 0;
    this.waveDelay = 0;
    this.overT = 0;
    this.lockTarget = null;
    this.trauma = 0; this.hitstop = 0; this.slowmo = 0;
    this.player.reset();
    this.camYaw = Math.PI;
    this.camPitch = 0.25;
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.input.gun = false;
    this.el.pause.classList.remove('hidden');
  }

  resume() {
    this.audio.ui();
    this.el.pause.classList.add('hidden');
    this.state = 'playing';
    this.lock();
  }

  gameOver() {
    this.state = 'over';
    document.exitPointerLock?.();
    this.el.overStats.textContent = `Welle ${this.wave} · ${this.score} Punkte · ${this.fmtTime(this.time)} überlebt · ${this.hits} max. Trefferkette`;
    this.el.over.classList.remove('hidden');
  }

  victory() {
    this.state = 'victory';
    document.exitPointerLock?.();
    this.el.victoryStats.textContent = `${this.score} Punkte · Zeit ${this.fmtTime(this.time)} · Die Kathedrale schweigt.`;
    this.el.victory.classList.remove('hidden');
  }

  fmtTime(s) {
    const m = Math.floor(s / 60);
    return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  }

  // ---------------- Wellen ----------------
  nextWave() {
    this.wave++;
    if (this.wave > WAVES.length) return;
    const w = WAVES[this.wave - 1];
    this.announce(`WELLE ${this.wave}`, `${w.name} — ${w.subs}`);
    this.audio.horn();
    this.toSpawn = w.units.length;
    const pp = this.player.pos;
    w.units.forEach((type, i) => {
      let x, z;
      if (type === 'boss') { x = 0; z = -16; }
      else {
        const a = (i / w.units.length) * Math.PI * 2 + Math.random() * 0.6;
        const R = 13 + Math.random() * 7;
        x = THREE.MathUtils.clamp(pp.x + Math.cos(a) * R, -26, 26);
        z = THREE.MathUtils.clamp(pp.z + Math.sin(a) * R, -26, 26);
      }
      // gestaffeltes Spawning
      setTimeout(() => {
        if (this.state !== 'playing' && this.state !== 'paused') return;
        const d = new Demon(this.scene, this.fx, this.audio, type, x, z);
        this.enemies.push(d);
        this.toSpawn = Math.max(0, this.toSpawn - 1);
        if (type === 'boss') { this.boss = d; this.el.bossBar.classList.remove('hidden'); }
      }, i * 450);
    });
  }

  announce(text, sub = '') {
    this.el.announce.textContent = text;
    this.el.announce.classList.remove('hidden');
    this.el.announce.style.animation = 'none';
    void this.el.announce.offsetWidth;
    this.el.announce.style.animation = '';
    this.el.announceSub.textContent = sub;
    this.el.announceSub.classList.remove('hidden');
    clearTimeout(this._annT);
    this._annT = setTimeout(() => {
      this.el.announce.classList.add('hidden');
      this.el.announceSub.classList.add('hidden');
    }, 2400);
  }

  subAnnounce(text) {
    this.el.announceSub.textContent = text;
    this.el.announceSub.classList.remove('hidden');
    clearTimeout(this._subT);
    this._subT = setTimeout(() => this.el.announceSub.classList.add('hidden'), 1200);
  }

  cycleLock() {
    const alive = this.enemies.filter((e) => e.alive && e.state !== 'spawn');
    if (!alive.length) { this.lockTarget = null; return; }
    // sortiert nach Distanz zum Spieler
    const pp = this.player.pos;
    alive.sort((a, b) => a.pos.distanceToSquared(pp) - b.pos.distanceToSquared(pp));
    const idx = alive.indexOf(this.lockTarget);
    this.lockTarget = alive[(idx + 1) % alive.length];
    this.audio.ui();
  }

  // ---------------- Aktionen ----------------
  doDash() {
    const i = this.input;
    let dx = (i.right ? 1 : 0) - (i.left ? 1 : 0);
    let dz = (i.forward ? 1 : 0) - (i.back ? 1 : 0);
    const sin = Math.sin(this.camYaw), cos = Math.cos(this.camYaw);
    let wx = dx * cos - dz * sin;
    let wz = -dx * sin - dz * cos;
    if (wx === 0 && wz === 0) { wx = Math.sin(this.player.yaw); wz = Math.cos(this.player.yaw); }
    if (this.player.tryDash(new THREE.Vector3(wx, 0, wz))) {
      this.fovKick = 1;
      this.fx.embers(this.player.pos, 6, 0x66ccff);
    }
  }

  doSpecial() {
    if (this.player.trySpecial()) {
      this.flashEl(0.85);
      this.trauma = Math.min(1, this.trauma + 0.55);
      this.subAnnounce('TEUFELS-EXPLOSION!');
    }
  }

  flashEl(op) {
    this.el.flash.style.transition = 'none';
    this.el.flash.style.opacity = op;
    requestAnimationFrame(() => {
      this.el.flash.style.transition = 'opacity 0.5s';
      this.el.flash.style.opacity = 0;
    });
  }

  damageNumber(wp, text, cls = '') {
    const d = this.dmgPool.find((d) => d.t >= d.dur) || this.dmgPool[0];
    d.wp.copy(wp);
    d.t = 0;
    d.el.textContent = text;
    d.el.className = 'dmg-num ' + cls;
    d.el.style.display = 'block';
  }

  updateDamageNumbers(dt) {
    for (const d of this.dmgPool) {
      if (d.t >= d.dur) { d.el.style.display = 'none'; continue; }
      d.t += dt;
      d.wp.y += dt * 1.6;
      const v = d.wp.clone().project(this.camera);
      if (v.z > 1) { d.el.style.display = 'none'; continue; }
      d.el.style.display = 'block';
      d.el.style.left = ((v.x * 0.5 + 0.5) * window.innerWidth) + 'px';
      d.el.style.top = ((-v.y * 0.5 + 0.5) * window.innerHeight) + 'px';
      d.el.style.opacity = 1 - (d.t / d.dur);
    }
  }

  registerHit(dmg, killed, isGun = false) {
    this.hits++;
    this.hitTimer = 3;
    this.player.addEnergy(killed ? 12 : (isGun ? 1.6 : 4));
    this.score += killed ? 0 : Math.round(dmg); // Kill-Bonus kommt vom Gegner-Typ
    this.hitstop = Math.max(this.hitstop, killed ? 0.12 : (dmg >= 30 ? 0.085 : 0.045));
    this.trauma = Math.min(1, this.trauma + (killed ? 0.3 : (dmg >= 30 ? 0.22 : 0.1)));
  }

  // ---------------- Kampf-Auflösung ----------------
  resolveSword() {
    const at = this.player.attack;
    if (!at) return;
    const cfg = [
      { range: 3.4, arc: 2.0, dmg: 18 }, { range: 3.4, arc: 2.0, dmg: 20 },
      { range: 3.7, arc: 2.4, dmg: 24 }, { range: 4.0, arc: 2.8, dmg: 32 },
      { range: 4.4, arc: 3.4, dmg: 48 },
    ][at.index];
    const k = at.t / at.dur;
    if (k < 0.12 || k > 0.9) return;
    const pp = this.player.pos;
    const fx = Math.sin(this.player.yaw), fz = Math.cos(this.player.yaw);
    for (const e of this.enemies) {
      if (!e.alive || e.state === 'spawn' || at.hitSet.has(e)) continue;
      const dx = e.pos.x - pp.x, dz = e.pos.z - pp.z;
      const dist = Math.hypot(dx, dz);
      if (dist > cfg.range + e.cfg.scale) continue;
      const ang = Math.acos(THREE.MathUtils.clamp((dx * fx + dz * fz) / (dist || 1), -1, 1));
      if (dist > 1.1 && ang > cfg.arc / 2) continue;
      const dy = Math.abs((e.pos.y + 1) - (pp.y + 1.2));
      if (dy > 3.2) continue;
      at.hitSet.add(e);
      const launcher = !!at.launcher;
      const dmg = Math.round(cfg.dmg * (launcher ? 1.2 : 1) * (0.92 + Math.random() * 0.16));
      const dir = new THREE.Vector3(dx, 0, dz).normalize();
      const killed = e.takeDamage(dmg, dir, {
        launch: launcher ? 16 : (at.index === 4 ? 9 : 0),
        knock: at.index === 4 ? 10 : 4,
      });
      if (killed) this.score += e.cfg.score;
      this.registerHit(dmg, killed);
      const hp = new THREE.Vector3(e.pos.x, e.pos.y + 1.6 * e.cfg.scale, e.pos.z);
      this.fx.burst(hp, { count: at.index >= 3 ? 30 : 16, speed: 9, color: at.index >= 3 ? 0xff7040 : 0xffcf9a, life: 0.6, size: 2.4 });
      this.fx.embers(hp, 4, 0xff5020);
      this.damageNumber(hp, dmg, at.index >= 3 || launcher ? 'crit' : '');
      if (launcher && !killed) {
        this.player.vel.y = Math.max(this.player.vel.y, 4); // mit hochspringen
        this.subAnnounce('LAUNCHER!');
      }
    }
  }

  resolveGuns(dt) {
    if (!this.input.gun || this.state !== 'playing') return;
    if (!this.player.tryGun()) return;
    // Ziel: Lock-On oder bestes Ziel im Fadenkreuz
    let target = (this.lockTarget && this.lockTarget.alive) ? this.lockTarget : null;
    if (!target) {
      const camDir = new THREE.Vector3();
      this.camera.getWorldDirection(camDir);
      let best = null, bestScore = 0.88;
      for (const e of this.enemies) {
        if (!e.alive || e.state === 'spawn') continue;
        const to = new THREE.Vector3(e.pos.x, e.pos.y + 1.2, e.pos.z).sub(this.camera.position);
        const dist = to.length();
        if (dist > 36) continue;
        const dot = to.normalize().dot(camDir);
        if (dot > bestScore) { bestScore = dot; best = e; }
      }
      target = best;
    }
    // Mündung
    const muzzle = new THREE.Vector3();
    this.player.muzzle.getWorldPosition(muzzle);
    this.fx.burst(muzzle, { count: 4, speed: 3, color: 0xffe0a0, life: 0.15, size: 2.5 });
    if (!target) return;
    const hp = new THREE.Vector3(target.pos.x, target.pos.y + 1.3 * target.cfg.scale, target.pos.z);
    // Leuchtspur
    const steps = 8;
    for (let i = 1; i <= steps; i++) {
      const p = muzzle.clone().lerp(hp, i / steps);
      this.fx.spawn(p.x, p.y, p.z, 0, 0, 0, 0.18, 1.6, 0xffe0a0, 0, 0);
    }
    const dmg = Math.round(7 * (0.9 + Math.random() * 0.2));
    const dir = new THREE.Vector3().subVectors(target.pos, this.player.pos).setY(0).normalize();
    const killed = target.takeDamage(dmg, dir, { knock: 1 });
    if (killed) this.score += target.cfg.score;
    this.registerHit(dmg, killed, true);
    this.fx.burst(hp, { count: 6, speed: 5, color: 0xffb060, life: 0.35, size: 1.8 });
    this.damageNumber(hp, dmg, '');
    this.player.addEnergy(0); // bereits in registerHit
  }

  resolveSpecial() {
    if (this.player.specialT <= 0 || this.player.specialHitDone) return;
    if (this.player.specialT > 0.55) return; // Höhepunkt der Animation
    this.player.specialHitDone = true;
    const pp = this.player.pos;
    this.fx.ring(pp, 0xff2a4a, 13, 0.8);
    this.fx.ring(pp, 0xffcf9a, 9, 0.6);
    this.fx.burst(new THREE.Vector3(pp.x, pp.y + 1, pp.z), { count: 90, speed: 14, color: 0xff4a5a, life: 1, size: 3.2 });
    this.fx.burst(new THREE.Vector3(pp.x, pp.y + 1, pp.z), { count: 40, speed: 8, color: 0xb04dff, life: 1, size: 2.6 });
    this.slowmo = Math.max(this.slowmo, 0.5);
    this.hitstop = Math.max(this.hitstop, 0.1);
    for (const e of this.enemies) {
      if (!e.alive || e.state === 'spawn') continue;
      const d = Math.hypot(e.pos.x - pp.x, e.pos.z - pp.z);
      if (d > 12) continue;
      const dir = new THREE.Vector3(e.pos.x - pp.x, 0, e.pos.z - pp.z).normalize();
      const killed = e.takeDamage(85, dir, { launch: e.isBoss ? 0 : 10, knock: 12 });
      if (killed) this.score += e.cfg.score;
      this.registerHit(85, killed);
      this.damageNumber(new THREE.Vector3(e.pos.x, e.pos.y + 2, e.pos.z), 85, 'crit');
    }
  }

  resolveSlam() {
    if (!this.player.slamShock) return;
    this.player.slamShock = false;
    const pp = this.player.pos;
    this.trauma = Math.min(1, this.trauma + 0.4);
    this.hitstop = Math.max(this.hitstop, 0.08);
    for (const e of this.enemies) {
      if (!e.alive || e.state === 'spawn') continue;
      const d = Math.hypot(e.pos.x - pp.x, e.pos.z - pp.z);
      if (d > 6.5 || e.pos.y > 3) continue;
      const dir = new THREE.Vector3(e.pos.x - pp.x, 0, e.pos.z - pp.z).normalize();
      const killed = e.takeDamage(40, dir, { launch: e.isBoss ? 0 : 7, knock: 8 });
      if (killed) this.score += e.cfg.score;
      this.registerHit(40, killed);
      this.damageNumber(new THREE.Vector3(e.pos.x, e.pos.y + 1.5, e.pos.z), 40, 'crit');
    }
  }

  // ---------------- Frame ----------------
  frame() {
    let rawDt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.elapsedTime;

    // Timescale: Hitstop > Slow-Mo > Normal
    this.hitstop = Math.max(0, this.hitstop - rawDt);
    this.slowmo = Math.max(0, this.slowmo - rawDt);
    const ts = this.hitstop > 0 ? 0.06 : (this.slowmo > 0 ? 0.3 : 1);
    const dt = rawDt * ts;

    if (this.state === 'playing') {
      this.time += rawDt;
      this.hitTimer -= rawDt;
      if (this.hitTimer <= 0) this.hits = 0;

      // Spieler
      this.player.update(dt, this.input, this.camYaw, (this.lockTarget && this.lockTarget.alive) ? this.lockTarget : null);
      if (this.lockTarget && !this.lockTarget.alive) this.lockTarget = null;

      // Kampf
      this.resolveSword();
      this.resolveGuns(dt);
      this.resolveSpecial();
      this.resolveSlam();

      // Gegner
      for (let i = this.enemies.length - 1; i >= 0; i--) {
        const e = this.enemies[i];
        const done = e.update(dt, this.player, this.enemies, t);
        if (done) { e.dispose(); this.enemies.splice(i, 1); continue; }
        // Körperblock: Gegner aus dem Spieler herausschieben
        const ex = e.pos.x - this.player.pos.x, ez = e.pos.z - this.player.pos.z;
        const ed = Math.hypot(ex, ez);
        const minD = 1.1 + e.cfg.scale * 0.5;
        if (ed < minD && ed > 0.001 && e.pos.y < 2) {
          e.pos.x = this.player.pos.x + (ex / ed) * minD;
          e.pos.z = this.player.pos.z + (ez / ed) * minD;
        }
        // Ausblenden bei Kamera-Nähe (Säulen-Test über die Körperhöhe)
        const dh = Math.hypot(e.pos.x - this.camera.position.x, e.pos.z - this.camera.position.z);
        const top = e.pos.y + e.cfg.scale * 2.0;
        const cy = this.camera.position.y;
        const dy = cy < e.pos.y ? e.pos.y - cy : (cy > top ? cy - top : 0);
        const dc = Math.hypot(dh, dy);
        let fade = THREE.MathUtils.clamp((dc - 1.6) / 2.2, 0, 1);
        // … und hart ausblenden, wenn der Gegner direkt die Sicht versperrt
        const lx = this.player.pos.x, ly = this.player.pos.y + 1.8, lz = this.player.pos.z;
        const cx = this.camera.position.x, cyy = this.camera.position.y, cz = this.camera.position.z;
        const sx = lx - cx, sy = ly - cyy, sz = lz - cz;
        const len2 = sx * sx + sy * sy + sz * sz || 1;
        const nx = e.pos.x, ny = e.pos.y + e.cfg.scale, nz = e.pos.z;
        let tt = ((nx - cx) * sx + (ny - cyy) * sy + (nz - cz) * sz) / len2;
        tt = THREE.MathUtils.clamp(tt, 0, 1);
        const qx = cx + sx * tt - nx, qy = cyy + sy * tt - ny, qz = cz + sz * tt - nz;
        const pd = Math.sqrt(qx * qx + qy * qy + qz * qz);
        if (pd < 0.9 * e.cfg.scale + 0.5) fade = Math.min(fade, 0.06);
        e.setFade(fade);
      }

      // Spieler-Tod
      if (this.player.dead) {
        this.overT += rawDt;
        this.slowmo = Math.max(this.slowmo, 0.2);
        if (this.overT > 1.4) this.gameOver();
      }

      // Wellen-Logik: erst wenn alle Spawns da UND alle tot sind
      if (!this.player.dead && this.toSpawn === 0 && this.enemies.length === 0 && this.wave >= 1 && this.waveDelay <= 0) {
        // Welle geschafft
        this.player.heal(12);
        this.player.addEnergy(25);
        this.score += 200 * this.wave;
        if (this.wave >= WAVES.length) { this.victory(); }
        else {
          this.announce('WELLE BESIEGT', `+${200 * this.wave} Punkte · +12 Leben`);
          this.slowmo = Math.max(this.slowmo, 0.8);
          this.waveDelay = 2.6;
        }
      }
      if (this.waveDelay > 0) {
        this.waveDelay -= rawDt;
        if (this.waveDelay <= 0 && this.state === 'playing') this.nextWave();
      }

      // Schadens-Vignette
      this.el.vignette.style.opacity = this.player.hurtT > 0 ? 1 : 0;

      this.updateCamera(rawDt);
      this.updateHUD();
    } else if (this.state === 'title') {
      // Demo-Kamera kreist um die Arena (auch für Screenshots)
      const a = t * 0.08;
      this.camera.position.set(Math.cos(a) * 26, 8 + Math.sin(t * 0.2) * 2, Math.sin(a) * 26);
      this.camera.lookAt(0, 4, 0);
      // Idle-Animation des Spielers
      this.player.update(dt, this.input, this.camYaw, null);
    } else {
      // Pause/Over/Victory: Welt lebt weiter, Kamera bleibt
      this.updateCamera(rawDt);
    }

    this.world.update(dt, t, this.camera);
    this.fx.update(dt);
    this.updateDamageNumbers(rawDt);
    if (this.lockTarget) this.updateLockMarker();

    this.composer.render();
    window.__gameReady = true;
  }

  updateCamera(rawDt) {
    if (this.state === 'title') return;
    const p = this.player.pos;
    const dist = 6.8;
    const cp = Math.cos(this.camPitch), sp = Math.sin(this.camPitch);
    const cx = p.x + Math.sin(this.camYaw) * dist * cp;
    const cz = p.z + Math.cos(this.camYaw) * dist * cp;
    const cy = p.y + 2.5 + sp * dist;

    // Shake
    this.trauma = Math.max(0, this.trauma - rawDt * 1.6);
    const sh = this.trauma * this.trauma;
    const shx = (Math.random() - 0.5) * 2 * sh * 0.7;
    const shy = (Math.random() - 0.5) * 2 * sh * 0.7;

    // weiche Kameraführung
    const k = 1 - Math.pow(0.0001, rawDt);
    this.camera.position.x += (cx - this.camera.position.x) * k;
    this.camera.position.y += (cy - this.camera.position.y) * k;
    this.camera.position.z += (cz - this.camera.position.z) * k;

    // FOV-Kick bei Dash
    this.fovKick = Math.max(0, this.fovKick - rawDt * 3);
    const fov = 60 + this.fovKick * 10 + sh * 3;
    if (Math.abs(this.camera.fov - fov) > 0.1) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    }

    this.camera.lookAt(p.x + shx, p.y + 1.8 + shy, p.z);
  }

  updateLockMarker() {
    const lt = this.lockTarget;
    if (!lt || !lt.alive || this.state !== 'playing') {
      this.el.lockon.classList.add('hidden');
      return;
    }
    const v = new THREE.Vector3(lt.pos.x, lt.pos.y + 2.4 * lt.cfg.scale, lt.pos.z).project(this.camera);
    if (v.z > 1) { this.el.lockon.classList.add('hidden'); return; }
    this.el.lockon.classList.remove('hidden');
    this.el.lockon.style.left = ((v.x * 0.5 + 0.5) * window.innerWidth) + 'px';
    this.el.lockon.style.top = ((-v.y * 0.5 + 0.5) * window.innerHeight) + 'px';
  }

  updateHUD() {
    const pl = this.player;
    this.el.hpFill.style.width = (pl.hp / pl.maxHp * 100) + '%';
    this.el.hpText.textContent = Math.ceil(pl.hp);
    this.el.devilFill.style.width = (pl.energy / pl.maxEnergy * 100) + '%';
    this.el.wave.textContent = `WELLE ${Math.min(this.wave, WAVES.length)} / ${WAVES.length}`;
    const alive = this.enemies.filter((e) => e.alive).length;
    this.el.enemies.textContent = alive > 0 ? `DÄMONEN: ${alive}` : 'GEBIET SICHER';
    this.el.hits.textContent = this.hits;
    this.el.score.textContent = this.score;
    this.el.time.textContent = this.fmtTime(this.time);
    if (this.boss && this.enemies.includes(this.boss)) {
      this.el.bossBar.classList.remove('hidden');
      this.el.bossFill.style.width = (this.boss.hp / this.boss.maxHp * 100) + '%';
      if (!this.boss.alive) this.el.bossBar.classList.add('hidden');
    } else {
      this.el.bossBar.classList.add('hidden');
    }
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }
}
