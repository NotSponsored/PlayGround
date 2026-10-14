// Dämonen-KI: Puppets, Stalker, Brutes + Boss (Kathedralen-Wächter).
import * as THREE from 'three';

const TYPES = {
  puppet:  { hp: 60,  speed: 5.5, dmg: 10, scale: 1.0,  score: 100,  range: 2.4, windup: 0.55, color: 0xff3b2a },
  stalker: { hp: 42,  speed: 8.2, dmg: 8,  scale: 0.85, score: 150,  range: 2.2, windup: 0.38, color: 0xff8a2a },
  brute:   { hp: 150, speed: 3.6, dmg: 16, scale: 1.4,  score: 250,  range: 3.0, windup: 0.7,  color: 0xc02a4a },
  boss:    { hp: 950, speed: 4.6, dmg: 20, scale: 2.6,  score: 2000, range: 4.2, windup: 0.6,  color: 0xff1030 },
};

export class Demon {
  constructor(scene, fx, audio, type, x, z) {
    this.scene = scene;
    this.fx = fx;
    this.audio = audio;
    this.type = type;
    this.cfg = TYPES[type];
    this.isBoss = type === 'boss';

    this.hp = this.cfg.hp;
    this.maxHp = this.cfg.hp;
    this.alive = true;
    this.state = 'spawn';
    this.stateT = 1.3;
    this.atkCd = 1 + Math.random();
    this.vy = 0;
    this.launched = false;
    this.flash = 0;
    this.deathT = 0;
    this.soulsGiven = false;
    this.phase = Math.random() * 10;
    this.enraged = false;
    // Boss-Specials
    this.pattern = 'slash';
    this.patternT = 0;
    this.chargeDir = new THREE.Vector3();
    this.slamWarn = null;

    this.group = new THREE.Group();
    this.group.position.set(x, -2.4, z);
    scene.add(this.group);
    this.buildModel();

    this.fx.burst(new THREE.Vector3(x, 0.3, z), { count: 26, speed: 5, color: this.cfg.color, life: 0.9, size: 2.4 });
    this.fx.ring(new THREE.Vector3(x, 0.2, z), this.cfg.color, 4, 0.6);
  }

  get pos() { return this.group.position; }

  buildModel() {
    const s = this.cfg.scale;
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x161218, roughness: 0.55, metalness: 0.4 });
    const boneMat = new THREE.MeshStandardMaterial({ color: 0x4a4a58, roughness: 0.4, metalness: 0.7 });
    this.glowMat = new THREE.MeshBasicMaterial({ color: this.cfg.color });

    // Rumpf
    this.body = new THREE.Mesh(new THREE.CapsuleGeometry(0.42 * s, 0.8 * s, 4, 10), bodyMat);
    this.body.position.y = 1.15 * s;
    this.body.castShadow = true;
    // Glut-Kern in der Brust
    this.core = new THREE.Mesh(new THREE.SphereGeometry(0.16 * s, 10, 10), this.glowMat);
    this.core.position.set(0, 1.35 * s, 0.32 * s);
    // Kopf
    this.head = new THREE.Group();
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.26 * s, 12, 12), bodyMat);
    skull.castShadow = true;
    this.head.add(skull);
    for (const hx of [-0.14 * s, 0.14 * s]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.05 * s, 6, 6), this.glowMat);
      eye.position.set(hx, 0.04 * s, 0.21 * s);
      this.head.add(eye);
    }
    // Hörner (Brute & Boss größer)
    const hornN = this.isBoss ? 3 : (this.type === 'brute' ? 2 : (this.type === 'stalker' ? 2 : 0));
    for (let i = 0; i < hornN; i++) {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.07 * s, (0.4 + i * 0.15) * s, 6), boneMat);
      const side = i === 2 ? 0 : (i === 0 ? -1 : 1);
      horn.position.set(side * 0.2 * s, 0.28 * s, -0.05 * s);
      horn.rotation.z = -side * 0.5;
      this.head.add(horn);
    }
    if (this.isBoss) {
      // Krone
      for (let i = -2; i <= 2; i++) {
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.06 * s, 0.5 * s, 5), this.glowMat);
        spike.position.set(i * 0.14 * s, 0.34 * s, 0);
        this.head.add(spike);
      }
    }
    this.head.position.y = 1.95 * s;
    // Sense / Großschwert
    this.armR = new THREE.Group();
    this.armR.position.set(0.5 * s, 1.55 * s, 0);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.2 * s, 0.7 * s, 0.2 * s), bodyMat);
    arm.position.y = -0.3 * s;
    this.armR.add(arm);
    const bladeLen = this.isBoss ? 2.2 * s : 1.2 * s;
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.1 * s, bladeLen, 0.3 * s), boneMat);
    blade.position.y = -0.7 * s - bladeLen / 2;
    blade.castShadow = true;
    const bladeEdge = new THREE.Mesh(new THREE.BoxGeometry(0.12 * s, bladeLen, 0.08 * s), this.glowMat);
    bladeEdge.position.y = blade.position.y;
    this.armR.add(blade, bladeEdge);
    // Linker Arm (Klaue)
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.2 * s, 0.65 * s, 0.2 * s), bodyMat);
    armL.position.set(-0.5 * s, 1.25 * s, 0);
    armL.rotation.z = 0.3;
    // Schultern (Boss: Stacheln)
    for (const sx of [-0.5 * s, 0.5 * s]) {
      const sh = new THREE.Mesh(new THREE.SphereGeometry(0.2 * s, 8, 8), boneMat);
      sh.position.set(sx, 1.6 * s, 0);
      this.group.add(sh);
      if (this.isBoss) {
        const sp = new THREE.Mesh(new THREE.ConeGeometry(0.1 * s, 0.6 * s, 6), boneMat);
        sp.position.set(sx * 1.2, 1.9 * s, 0);
        this.group.add(sp);
      }
    }
    // Zerfetzter Umhang
    const cloak = new THREE.Mesh(
      new THREE.PlaneGeometry(1.0 * s, 1.4 * s),
      new THREE.MeshStandardMaterial({ color: 0x0e0c12, roughness: 0.9, side: THREE.DoubleSide, transparent: true, opacity: 0.92 })
    );
    cloak.position.set(0, 1.1 * s, -0.35 * s);
    this.cloak = cloak;

    this.group.add(this.body, this.core, this.head, this.armR, armL, cloak);
    this.mats = [bodyMat, boneMat];
  }

  takeDamage(amount, dir, { launch = 0, knock = 4 } = {}) {
    if (!this.alive || this.state === 'spawn') return false;
    if (this.launched) amount *= 1.5; // Juggling-Bonus
    this.hp -= amount;
    this.flash = 0.12;
    if (dir) {
      this.group.position.x += dir.x * knock * 0.12;
      this.group.position.z += dir.z * knock * 0.12;
    }
    if (launch > 0 && !this.isBoss) {
      this.vy = Math.max(this.vy, launch);
      this.launched = true;
      this.state = 'launched';
    } else if (this.isBoss) {
      // Boss wankt nur kurz
      if (this.state === 'chase') { this.state = 'stagger'; this.stateT = 0.25; }
    } else if (!this.launched && Math.random() < 0.35) {
      this.state = 'stagger'; this.stateT = 0.35;
    }
    if (this.hp <= 0) {
      this.hp = 0;
      this.alive = false;
      this.deathT = 0.9;
      this.state = 'dead';
      const p = this.pos;
      this.fx.burst(new THREE.Vector3(p.x, p.y + 1, p.z), { count: 45, speed: 9, color: this.cfg.color, life: 0.9, size: 2.8 });
      this.fx.burst(new THREE.Vector3(p.x, p.y + 1, p.z), { count: 20, speed: 5, color: 0xffffff, life: 0.5, size: 2.0 });
      this.fx.ring(new THREE.Vector3(p.x, 0.2, p.z), this.cfg.color, 5, 0.5);
      this.fx.souls(new THREE.Vector3(p.x, p.y, p.z), this.isBoss ? 30 : 12);
      this.audio.die();
      return true;
    }
    this.audio.hit();
    return false;
  }

  update(dt, player, others, t) {
    const p = this.pos;
    const pp = player.pos;
    this.flash = Math.max(0, this.flash - dt);

    // Enrage beim Boss
    if (this.isBoss && !this.enraged && this.hp < this.maxHp * 0.32) {
      this.enraged = true;
      this.glowMat.color.set(0xff6000);
      this.fx.burst(new THREE.Vector3(p.x, p.y + 2, p.z), { count: 60, speed: 12, color: 0xff4000, life: 1, size: 3 });
      this.audio.horn();
    }

    // Tod: zusammensinken
    if (this.state === 'dead') {
      this.deathT -= dt;
      this.group.rotation.x += dt * 1.4;
      p.y -= dt * 1.2;
      return this.deathT <= 0; // true = kann entfernt werden
    }

    // Spawn: aus dem Boden steigen
    if (this.state === 'spawn') {
      this.stateT -= dt;
      p.y = -2.4 * Math.max(0, this.stateT / 1.3);
      if (Math.random() < 0.4) this.fx.embers(new THREE.Vector3(p.x, 0.3, p.z), 1, this.cfg.color);
      if (this.stateT <= 0) { p.y = 0; this.state = 'chase'; }
      return false;
    }

    // Launch-Physik
    if (this.launched || p.y > 0.02) {
      this.vy -= 26 * dt;
      p.y += this.vy * dt;
      if (p.y <= 0) {
        p.y = 0;
        if (this.vy < -6) {
          // Aufprall
          this.fx.burst(new THREE.Vector3(p.x, 0.3, p.z), { count: 12, speed: 5, color: 0x887766, life: 0.5, size: 2 });
          this.state = 'stagger'; this.stateT = 0.5;
        } else { this.state = 'chase'; }
        this.vy = 0; this.launched = false;
      }
    }

    const toPlayer = new THREE.Vector3().subVectors(pp, p);
    toPlayer.y = 0;
    const dist = toPlayer.length();
    const dir = dist > 0.001 ? toPlayer.clone().normalize() : new THREE.Vector3(0, 0, 1);
    const speedMul = this.enraged ? 1.45 : 1;

    // Separation von anderen Dämonen
    for (const o of others) {
      if (o === this || !o.alive) continue;
      const d = new THREE.Vector3().subVectors(p, o.pos);
      d.y = 0;
      const l = d.length();
      if (l < 2.2 && l > 0.001) {
        p.addScaledVector(d.normalize(), dt * 2.5);
      }
    }

    this.atkCd -= dt;

    switch (this.state) {
      case 'chase': {
        if (dist > this.cfg.range && !this.launched) {
          p.addScaledVector(dir, this.cfg.speed * speedMul * dt);
        } else if (this.atkCd <= 0 && this.groundedOrLow()) {
          if (this.isBoss) this.chooseBossPattern(dist);
          else { this.state = 'windup'; this.stateT = this.cfg.windup; }
        }
        break;
      }
      case 'windup': {
        this.stateT -= dt;
        if (this.stateT <= 0) {
          this.state = 'attack'; this.stateT = 0.28;
          // Treffer wenn Spieler noch in Reichweite
          const dd = new THREE.Vector3().subVectors(player.pos, p);
          const d = Math.hypot(dd.x, dd.z);
          if (d < this.cfg.range + 1.2 && Math.abs(dd.y) < 2.5) {
            player.takeDamage(this.cfg.dmg, p);
          }
          this.audio.swingHeavy();
        }
        break;
      }
      case 'attack': {
        this.stateT -= dt;
        if (this.stateT > 0.1) p.addScaledVector(dir, 6 * dt); // Nachsetzen
        if (this.stateT <= 0) { this.state = 'recover'; this.stateT = 0.5; this.atkCd = 1.1 + Math.random() * 1.2; }
        break;
      }
      case 'recover': {
        this.stateT -= dt;
        if (this.stateT <= 0) this.state = 'chase';
        break;
      }
      case 'stagger': {
        this.stateT -= dt;
        if (this.stateT <= 0 && !this.launched) this.state = 'chase';
        break;
      }
      case 'launched': {
        // trudelt in der Luft, keine Aktion
        break;
      }
      // ---- Boss-Patterns ----
      case 'boss_windup': {
        this.stateT -= dt;
        if (this.stateT <= 0) {
          if (this.pattern === 'slam') {
            this.state = 'boss_slam'; this.stateT = 0.4;
            this.audio.explosion();
            this.fx.ring(new THREE.Vector3(p.x, 0.2, p.z), 0xff2030, 11, 0.7);
            this.fx.burst(new THREE.Vector3(p.x, 0.5, p.z), { count: 50, speed: 12, color: 0xff4030, life: 0.8, size: 3 });
            // Schaden wenn Spieler am Boden & nah
            const dd = new THREE.Vector3().subVectors(player.pos, p);
            if (Math.hypot(dd.x, dd.z) < 8 && player.pos.y < 1.5) {
              player.takeDamage(this.isBoss && this.enraged ? 26 : 20, p);
            }
          } else if (this.pattern === 'charge') {
            this.state = 'boss_charge'; this.stateT = 0.75;
            this.chargeDir.copy(dir);
            this.audio.dash();
          } else {
            this.state = 'boss_slash'; this.stateT = 0.5; this.slashHits = 0;
            this.audio.swingHeavy();
          }
        }
        break;
      }
      case 'boss_slash': {
        this.stateT -= dt;
        p.addScaledVector(dir, 7 * dt);
        this.slashHits = (this.slashHits || 0) + dt;
        // 3 Treffer-Checks über die Dauer
        if (!this._s1 && this.slashHits > 0.12) { this._s1 = true; this.tryBossHit(player, p, 14); }
        if (!this._s2 && this.slashHits > 0.3) { this._s2 = true; this.tryBossHit(player, p, 14); }
        if (this.stateT <= 0) { this.state = 'recover'; this.stateT = 0.7; this.atkCd = 1.0 + Math.random(); this._s1 = this._s2 = false; }
        break;
      }
      case 'boss_charge': {
        this.stateT -= dt;
        p.addScaledVector(this.chargeDir, (this.enraged ? 22 : 17) * dt);
        this.fx.embers(new THREE.Vector3(p.x, 0.5, p.z), 1, 0xff3030);
        const dd = new THREE.Vector3().subVectors(player.pos, p);
        if (Math.hypot(dd.x, dd.z) < 2.6 && !this._charged) {
          this._charged = true;
          player.takeDamage(18, p);
        }
        // Arena-Grenze respektieren
        const r = Math.hypot(p.x, p.z);
        if (r > 28 || this.stateT <= 0) {
          this.state = 'recover'; this.stateT = 0.8; this.atkCd = 1.2 + Math.random(); this._charged = false;
          this.fx.ring(new THREE.Vector3(p.x, 0.2, p.z), 0xff8030, 5, 0.4);
        }
        break;
      }
      case 'boss_slam': {
        this.stateT -= dt;
        if (this.stateT <= 0) { this.state = 'recover'; this.stateT = 0.9; this.atkCd = 1.0 + Math.random() * 0.8; }
        break;
      }
    }

    // Arena-Grenze
    const r = Math.hypot(p.x, p.z);
    if (r > 29) { p.x *= 29 / r; p.z *= 29 / r; }

    // Blick zum Spieler
    const targetYaw = Math.atan2(dir.x, dir.z);
    this.group.rotation.y = targetYaw;

    this.animate(dt, t, dist);
    return false;
  }

  groundedOrLow() { return this.pos.y < 0.6 && !this.launched; }

  tryBossHit(player, p, dmg) {
    const dd = new THREE.Vector3().subVectors(player.pos, p);
    if (Math.hypot(dd.x, dd.z) < this.cfg.range + 1.4 && Math.abs(dd.y) < 3) {
      player.takeDamage(dmg, p);
    }
  }

  chooseBossPattern(dist) {
    if (dist < 9 && Math.random() < 0.4) this.pattern = 'slam';
    else if (dist > 8 && Math.random() < 0.55) this.pattern = 'charge';
    else this.pattern = 'slash';
    this.state = 'boss_windup';
    this.stateT = (this.pattern === 'slam' ? 0.9 : 0.55) * (this.enraged ? 0.7 : 1);
    this.audio.launch();
  }

  animate(dt, t, dist) {
    const s = this.cfg.scale;
    const walking = (this.state === 'chase' || this.state === 'boss_charge') ? 1 : 0;
    this.phase += dt * (3 + walking * 6);
    const bob = Math.sin(this.phase) * 0.08 * s * (0.4 + walking);
    this.body.position.y = 1.15 * s + bob;
    this.head.position.y = 1.95 * s + bob * 1.3;
    this.head.rotation.y = Math.sin(t * 0.7 + this.phase) * 0.15;
    this.cloak.rotation.x = 0.15 + walking * 0.35 + Math.sin(this.phase * 0.7) * 0.06;

    // Sense-Animation
    let armTarget = -0.3 + Math.sin(this.phase * 0.8) * 0.1;
    if (this.state === 'windup' || this.state === 'boss_windup') {
      const k = 1 - this.stateT / this.cfg.windup;
      armTarget = -0.3 - k * 2.2; // holt aus
    } else if (this.state === 'attack' || this.state === 'boss_slash') {
      armTarget = 1.4; // schlägt zu
    } else if (this.state === 'boss_slam') {
      armTarget = 1.8;
    }
    this.armR.rotation.x += (armTarget - this.armR.rotation.x) * Math.min(1, dt * 10);

    // Kern pulsiert (schneller bei Windup / Enrage)
    const pulse = this.state === 'windup' || this.state === 'boss_windup' ? 6 + Math.sin(t * 30) * 2 : 1.6 + Math.sin(t * 4) * 0.5;
    const base = this.enraged ? 2.2 : 1;
    this.core.scale.setScalar(base * pulse * 0.75);
    this.glowMat.color.offsetHSL(0, 0, 0); // Farbe bleibt

    // Treffer-Blitz (gedämpft, damit Bloom nicht ausbrennt)
    const f = this.flash > 0 ? 1 : 0;
    for (const m of this.mats) {
      m.emissive.setRGB(f * 0.55, f * 0.5, f * 0.45);
    }
  }

  dispose() {
    this.scene.remove(this.group);
  }

  // Blendet den Dämon aus, wenn er der Kamera zu nahe kommt (verdeckt sonst alles)
  setFade(f) {
    for (const m of this.mats) {
      m.transparent = f < 1;
      m.opacity = f;
    }
    this.cloak.material.transparent = true;
    this.cloak.material.opacity = 0.92 * f;
    this.glowMat.transparent = true;
    this.glowMat.opacity = f;
  }
}
