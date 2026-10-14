// Der Dämonenjäger: prozedurales Charaktermodell, Movement & Kampfsystem
// (Schwert-Kombo, Pistolen, Dash, Launcher, Slam, Teufels-Explosion).
import * as THREE from 'three';

const COMBO = [
  { dur: 0.34, range: 3.4, arc: 2.0, dmg: 18, lunge: 5.5, color: 0x9fd8ff },
  { dur: 0.34, range: 3.4, arc: 2.0, dmg: 20, lunge: 5.5, color: 0x9fd8ff },
  { dur: 0.38, range: 3.7, arc: 2.4, dmg: 24, lunge: 7.0, color: 0xc0e8ff },
  { dur: 0.44, range: 4.0, arc: 2.8, dmg: 32, lunge: 8.5, color: 0xffb060 },
  { dur: 0.55, range: 4.4, arc: 3.4, dmg: 48, lunge: 10.0, color: 0xff5a4a },
];

class SwordTrail {
  constructor(scene, max = 18) {
    this.max = max;
    this.tips = [];
    this.bases = [];
    const geo = new THREE.BufferGeometry();
    this.posArr = new Float32Array(max * 2 * 3);
    this.colArr = new Float32Array(max * 2 * 3);
    geo.setAttribute('position', new THREE.BufferAttribute(this.posArr, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(this.colArr, 3));
    const idx = [];
    for (let i = 0; i < max - 1; i++) {
      const a = i * 2, b = i * 2 + 1, c = i * 2 + 2, d = i * 2 + 3;
      idx.push(a, b, c, b, d, c);
    }
    geo.setIndex(idx);
    this.mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    }));
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 18;
    scene.add(this.mesh);
  }
  push(tip, base) {
    this.tips.unshift(tip.clone());
    this.bases.unshift(base.clone());
    if (this.tips.length > this.max) { this.tips.pop(); this.bases.pop(); }
    this.rebuild();
  }
  decay(n = 2) {
    for (let i = 0; i < n; i++) { this.tips.pop(); this.bases.pop(); }
    this.rebuild();
  }
  clear() { this.tips.length = 0; this.bases.length = 0; this.rebuild(); }
  rebuild() {
    const n = this.tips.length;
    for (let i = 0; i < this.max; i++) {
      const t = this.tips[Math.min(i, n - 1)] || new THREE.Vector3();
      const b = this.bases[Math.min(i, n - 1)] || new THREE.Vector3();
      this.posArr.set([b.x, b.y, b.z], i * 6);
      this.posArr.set([t.x, t.y, t.z], i * 6 + 3);
      const f = n <= 1 ? 0 : Math.pow(1 - i / (this.max - 1), 1.6) * Math.min(1, n / 4);
      this.colArr.set([0.55 * f, 0.8 * f, 1.0 * f], i * 6);
      this.colArr.set([1.0 * f, 0.95 * f, 0.85 * f], i * 6 + 3);
    }
    this.mesh.geometry.attributes.position.needsUpdate = true;
    this.mesh.geometry.attributes.color.needsUpdate = true;
    this.mesh.visible = n > 1;
  }
}

export class Player {
  constructor(scene, fx, audio) {
    this.scene = scene;
    this.fx = fx;
    this.audio = audio;

    this.group = new THREE.Group();
    scene.add(this.group);

    this.vel = new THREE.Vector3();
    this.yaw = 0;
    this.grounded = true;
    this.jumps = 0;
    this.hp = 100; this.maxHp = 100;
    this.energy = 0; this.maxEnergy = 100;
    this.iframes = 0;
    this.hurtT = 0;
    this.dead = false;

    // Kampf-State
    this.attack = null;       // { index, t, hitSet }
    this.comboQueued = false;
    this.comboWindow = false;
    this.gunCd = 0;
    this.muzzleFlash = 0;
    this.dashT = 0; this.dashCd = 0; this.dashDir = new THREE.Vector3();
    this.afterT = 0;
    this.specialT = 0;        // läuft die Special-Animation?
    this.specialHitDone = false;
    this.slamming = false;
    this.flipT = 0;
    this.runPhase = 0;
    this.gunSide = 1;

    this.buildModel();
    this.trail = new SwordTrail(scene);
    this.ghosts = [];
    const ghostMat = new THREE.MeshBasicMaterial({ color: 0x66ccff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
    for (let i = 0; i < 6; i++) {
      const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 1.1, 4, 8), ghostMat.clone());
      m.visible = false;
      scene.add(m);
      this.ghosts.push({ mesh: m, t: 1 });
    }
  }

  buildModel() {
    const g = this.group;
    const coat = new THREE.MeshStandardMaterial({ color: 0x5a0d16, roughness: 0.6, metalness: 0.25 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x16161e, roughness: 0.5, metalness: 0.6 });
    const steel = new THREE.MeshStandardMaterial({ color: 0xb8c4d4, roughness: 0.25, metalness: 0.95 });
    const skin = new THREE.MeshStandardMaterial({ color: 0xd8c0a8, roughness: 0.7 });

    // Beine
    this.legL = new THREE.Group(); this.legR = new THREE.Group();
    const legGeo = new THREE.BoxGeometry(0.26, 0.85, 0.3);
    for (const [leg, x] of [[this.legL, -0.2], [this.legR, 0.2]]) {
      const m = new THREE.Mesh(legGeo, dark);
      m.position.y = -0.42; m.castShadow = true;
      leg.add(m); leg.position.set(x, 0.9, 0);
      g.add(leg);
    }
    // Torso + Mantel
    this.torso = new THREE.Group();
    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.75, 0.42), dark);
    chest.position.y = 0.38; chest.castShadow = true;
    const mantle = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.62, 0.9, 8), coat);
    mantle.position.y = -0.1; mantle.castShadow = true;
    this.torso.add(chest, mantle);
    this.torso.position.y = 0.9;
    g.add(this.torso);
    // Mantelschöße (hinten)
    this.coatTail = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 1.0), new THREE.MeshStandardMaterial({ color: 0x5a0d16, roughness: 0.7, side: THREE.DoubleSide }));
    this.coatTail.position.set(0, 0.55, -0.32);
    this.coatTail.rotation.x = 0.25;
    g.add(this.coatTail);
    // Schultern
    for (const x of [-0.5, 0.5]) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), steel);
      s.position.set(x, 1.62, 0); s.castShadow = true;
      g.add(s);
    }
    // Kopf + Silberhaar + Augen
    this.head = new THREE.Group();
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 14), skin);
    skull.castShadow = true;
    const hair = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.5, 8), new THREE.MeshStandardMaterial({ color: 0xd8d8e2, roughness: 0.4, metalness: 0.3 }));
    hair.position.y = 0.24; hair.rotation.x = -0.25;
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x66e0ff });
    for (const x of [-0.09, 0.09]) {
      const e = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 6), eyeMat);
      e.position.set(x, 0.02, 0.21);
      this.head.add(e);
    }
    this.head.add(skull, hair);
    this.head.position.y = 1.92;
    g.add(this.head);

    // Schwert-Arm (rechts)
    this.armR = new THREE.Group();
    this.armR.position.set(0.52, 1.6, 0);
    const armGeo = new THREE.BoxGeometry(0.2, 0.7, 0.22);
    const armRMesh = new THREE.Mesh(armGeo, coat);
    armRMesh.position.y = -0.32; armRMesh.castShadow = true;
    this.armR.add(armRMesh);
    // Schwert
    this.sword = new THREE.Group();
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.13, 1.75, 0.045), steel);
    blade.position.y = 1.2; blade.castShadow = true;
    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.75, 0.06), new THREE.MeshBasicMaterial({ color: 0xff6a5a }));
    edge.position.set(0.05, 1.2, 0);
    const guard = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.08, 0.12), dark);
    guard.position.y = 0.3;
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 6), dark);
    grip.position.y = 0.12;
    this.sword.add(blade, edge, guard, grip);
    this.sword.position.y = -0.62;
    this.armR.add(this.sword);
    this.tipObj = new THREE.Object3D(); this.tipObj.position.y = 2.1;
    this.baseObj = new THREE.Object3D(); this.baseObj.position.y = 0.35;
    this.sword.add(this.tipObj, this.baseObj);
    g.add(this.armR);

    // Pistolen-Arm (links)
    this.armL = new THREE.Group();
    this.armL.position.set(-0.52, 1.6, 0);
    const armLMesh = new THREE.Mesh(armGeo, coat);
    armLMesh.position.y = -0.32; armLMesh.castShadow = true;
    this.armL.add(armLMesh);
    const gun = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.62), dark);
    gun.position.set(0, -0.62, 0.25);
    const gunTip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.1), new THREE.MeshBasicMaterial({ color: 0xffcf7a }));
    gunTip.position.set(0, -0.62, 0.58);
    this.armL.add(gun, gunTip);
    this.muzzle = new THREE.Object3D();
    this.muzzle.position.set(0, -0.62, 0.65);
    this.armL.add(this.muzzle);
    g.add(this.armL);

    // Mündungs-Blitzlicht
    this.flashLight = new THREE.PointLight(0xffcf7a, 0, 14, 2);
    this.scene.add(this.flashLight);
    this.flashSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.makeFlashTex(), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    this.flashSprite.scale.setScalar(1.6);
    this.scene.add(this.flashSprite);

    // Teufels-Aura (bereit wenn Energie voll)
    this.aura = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.makeFlashTex(), color: 0xff2a4a, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    this.aura.scale.set(3.2, 4.2, 1);
    this.aura.position.y = 1.2;
    g.add(this.aura);
  }

  makeFlashTex() {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const x = c.getContext('2d');
    const gr = x.createRadialGradient(32, 32, 1, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,240,1)');
    gr.addColorStop(0.4, 'rgba(255,200,120,0.7)');
    gr.addColorStop(1, 'rgba(255,120,30,0)');
    x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }

  reset(x = 0, z = 8) {
    this.group.position.set(x, 0, z);
    this.vel.set(0, 0, 0);
    this.yaw = Math.PI;
    this.hp = this.maxHp; this.energy = 0;
    this.attack = null; this.dead = false;
    this.iframes = 0; this.dashT = 0; this.dashCd = 0;
    this.slamming = false; this.specialT = 0;
    this.trail.clear();
  }

  get pos() { return this.group.position; }

  get attacking() { return !!this.attack; }

  // ---- Aktionen (werden von Game aufgerufen, geben true bei Erfolg zurück) ----
  tryAttack() {
    if (this.dead || this.slamming || this.specialT > 0) return false;
    if (this.attack) { this.comboQueued = true; return false; } // Chain-Input merken
    this.startSwing(0);
    return true;
  }

  startSwing(index) {
    const c = COMBO[index];
    this.attack = { index, t: 0, dur: c.dur, hitSet: new Set() };
    this.comboQueued = false;
    this.comboWindow = false;
    // Lunge nach vorn
    const fx = Math.sin(this.yaw), fz = Math.cos(this.yaw);
    this.vel.x += fx * c.lunge; this.vel.z += fz * c.lunge;
    this.audio.swing();
    if (index >= 3) this.audio.swingHeavy();
  }

  tryGun() {
    if (this.dead || this.gunCd > 0 || this.specialT > 0) return false;
    this.gunCd = 0.13;
    this.muzzleFlash = 0.06;
    this.gunSide *= -1;
    this.audio.gun();
    return true;
  }

  tryLauncher() {
    if (this.dead || !this.grounded || this.attack || this.specialT > 0) return false;
    this.startSwing(0);
    this.attack.launcher = true;
    this.audio.launch();
    return true;
  }

  trySlam() {
    if (this.dead || this.grounded || this.slamming) return false;
    this.slamming = true;
    this.attack = null;
    this.vel.set(0, -26, 0);
    this.audio.swingHeavy();
    return true;
  }

  tryDash(dir) {
    if (this.dead || this.dashCd > 0 || this.specialT > 0) return false;
    this.dashT = 0.22; this.dashCd = 0.55;
    this.dashDir.copy(dir).normalize();
    this.iframes = Math.max(this.iframes, 0.32);
    this.afterT = 0;
    // Angriff abbrechen für flüssiges Ausweichen (DMC-like)
    if (this.attack && this.attack.t > 0.1) this.attack = null;
    this.audio.dash();
    return true;
  }

  tryJump() {
    if (this.dead || this.specialT > 0) return false;
    if (this.grounded) {
      this.vel.y = 12; this.grounded = false; this.jumps = 1;
      this.audio.jump();
      return true;
    }
    if (this.jumps < 2) {
      this.vel.y = 10.5; this.jumps = 2;
      this.flipT = 0.42;
      this.audio.jump();
      this.fx.ring(this.pos, 0x9fd8ff, 3, 0.4);
      return true;
    }
    return false;
  }

  trySpecial() {
    if (this.dead || this.energy < 50 || this.specialT > 0) return false;
    this.energy -= 50;
    this.specialT = 0.9;
    this.specialHitDone = false;
    this.attack = null;
    this.iframes = Math.max(this.iframes, 1.0);
    this.audio.explosion();
    return true;
  }

  takeDamage(amount, fromPos) {
    if (this.dead || this.iframes > 0 || this.dashT > 0 || this.specialT > 0) return false;
    this.hp -= amount;
    this.hurtT = 0.4;
    this.iframes = 0.7;
    this.audio.hurt();
    if (fromPos) {
      const d = new THREE.Vector3().subVectors(this.pos, fromPos);
      d.y = 0; d.normalize();
      this.vel.addScaledVector(d, 7);
    }
    if (this.hp <= 0) { this.hp = 0; this.dead = true; this.audio.die(); }
    return true;
  }

  heal(n) { this.hp = Math.min(this.maxHp, this.hp + n); }
  addEnergy(n) { this.energy = Math.min(this.maxEnergy, this.energy + n); }

  spawnGhost() {
    const gh = this.ghosts.find((g) => g.t >= 1) || this.ghosts[0];
    gh.mesh.visible = true;
    gh.mesh.position.copy(this.pos);
    gh.mesh.position.y += 1.1;
    gh.mesh.rotation.y = this.yaw;
    gh.t = 0;
  }

  update(dt, input, camYaw, lockTarget) {
    const p = this.pos;

    this.iframes = Math.max(0, this.iframes - dt);
    this.hurtT = Math.max(0, this.hurtT - dt);
    this.gunCd = Math.max(0, this.gunCd - dt);
    this.dashCd = Math.max(0, this.dashCd - dt);
    this.muzzleFlash = Math.max(0, this.muzzleFlash - dt);

    // ---- Blickrichtung ----
    let moveX = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    let moveZ = (input.forward ? 1 : 0) - (input.back ? 1 : 0);
    const hasMove = (moveX !== 0 || moveZ !== 0);
    // Kamera-relative Bewegung
    const sin = Math.sin(camYaw), cos = Math.cos(camYaw);
    const wx = moveX * cos - moveZ * sin;
    const wz = -moveX * sin - moveZ * cos;

    if (!this.dead && this.specialT <= 0) {
      if (lockTarget && (this.attack || input.gun)) {
        // Im Lock-On dem Ziel zugewandt
        const d = new THREE.Vector3().subVectors(lockTarget.pos, p);
        this.yaw = Math.atan2(d.x, d.z);
      } else if (hasMove && !this.attack) {
        const targetYaw = Math.atan2(wx, wz);
        let dy = targetYaw - this.yaw;
        while (dy > Math.PI) dy -= Math.PI * 2;
        while (dy < -Math.PI) dy += Math.PI * 2;
        this.yaw += dy * Math.min(1, dt * 12);
      }
    }

    // ---- Dash ----
    if (this.dashT > 0) {
      this.dashT -= dt;
      const k = this.dashT / 0.22;
      this.vel.x = this.dashDir.x * (8 + 22 * k);
      this.vel.z = this.dashDir.z * (8 + 22 * k);
      this.afterT -= dt;
      if (this.afterT <= 0) { this.afterT = 0.05; this.spawnGhost(); }
      if (Math.abs(this.vel.y) < 0.1 && this.grounded) this.vel.y = 0;
    } else {
      // ---- normale Bewegung ----
      const speed = this.attack ? 2.2 : 9.2;
      const accel = this.grounded ? 40 : 18;
      this.vel.x += THREE.MathUtils.clamp(wx * speed - this.vel.x, -accel * dt, accel * dt);
      this.vel.z += THREE.MathUtils.clamp(wz * speed - this.vel.z, -accel * dt, accel * dt);
    }

    // ---- Schwerkraft ----
    if (!this.grounded || this.vel.y !== 0) {
      this.vel.y -= (this.slamming ? 60 : 30) * dt;
    }
    p.x += this.vel.x * dt;
    p.y += this.vel.y * dt;
    p.z += this.vel.z * dt;

    // Arena begrenzen
    const r = Math.hypot(p.x, p.z);
    const maxR = 29;
    if (r > maxR) { p.x *= maxR / r; p.z *= maxR / r; }

    // Boden
    if (p.y <= 0) {
      if (!this.grounded && this.slamming) {
        // SLAM-Aufprall
        this.slamming = false;
        this.slamShock = true; // Game löst AoE aus
        this.fx.ring(p, 0xff8040, 8, 0.5);
        this.fx.burst(p, { count: 40, speed: 10, color: 0xff7030, life: 0.7, size: 2.6 });
        this.audio.explosion();
      }
      p.y = 0; this.vel.y = 0; this.grounded = true; this.jumps = 0;
    } else if (p.y > 0.02) {
      this.grounded = false;
    }

    // ---- Angriffs-State ----
    if (this.attack) {
      const c = COMBO[this.attack.index];
      this.attack.t += dt;
      const k = this.attack.t / this.attack.dur;
      // Chain-Fenster in der zweiten Hälfte
      if (k > 0.45) this.comboWindow = true;
      if (k >= 1) {
        if (this.comboQueued && this.attack.index < COMBO.length - 1 && !this.attack.launcher) {
          this.startSwing(this.attack.index + 1);
        } else {
          this.attack = null;
        }
      }
      // Schwert-Trail während der aktiven Phase
      if (k > 0.15 && k < 0.85) {
        this.tipObj.getWorldPosition(Player._v1);
        this.baseObj.getWorldPosition(Player._v2);
        this.trail.push(Player._v1, Player._v2);
        if (Math.random() < 0.5) {
          this.fx.slash(
            new THREE.Vector3(p.x, p.y + 1.3, p.z),
            this.yaw + (this.attack.index % 2 === 0 ? 0.5 : -0.5),
            c.color, 0.9 + this.attack.index * 0.12
          );
        }
      }
    } else {
      this.trail.decay(2);
    }

    // ---- Special-Animation ----
    if (this.specialT > 0) {
      this.specialT -= dt;
      this.vel.x *= 0.9; this.vel.z *= 0.9;
      if (Math.random() < 0.6) {
        this.fx.embers(p, 2, 0xff3b55);
      }
    }

    // ---- Geister verblassen ----
    for (const gh of this.ghosts) {
      if (gh.t >= 1) { gh.mesh.visible = false; continue; }
      gh.t += dt * 2.4;
      gh.mesh.material.opacity = 0.5 * (1 - gh.t);
    }

    // ---- Mündungsfeuer ----
    this.muzzle.getWorldPosition(Player._v1);
    this.flashLight.position.copy(Player._v1);
    this.flashSprite.position.copy(Player._v1);
    const fl = this.muzzleFlash > 0 ? 1 : 0;
    this.flashLight.intensity = fl * 160;
    this.flashSprite.material.opacity = fl * 0.95;
    this.flashSprite.material.rotation = Math.random() * Math.PI;

    // ---- Aura bei voller Energie ----
    const ready = this.energy >= 50;
    this.aura.material.opacity += ((ready ? 0.3 + Math.sin(performance.now() * 0.006) * 0.1 : 0) - this.aura.material.opacity) * Math.min(1, dt * 5);

    this.animate(dt, hasMove);
    this.group.rotation.y = this.yaw;
  }

  animate(dt, hasMove) {
    const speed2d = Math.hypot(this.vel.x, this.vel.z);
    this.runPhase += dt * (4 + speed2d * 1.6);
    const run = Math.min(1, speed2d / 8);
    const air = this.grounded ? 0 : 1;

    // Beine
    this.legL.rotation.x = Math.sin(this.runPhase) * 0.75 * run + air * -0.5;
    this.legR.rotation.x = -Math.sin(this.runPhase) * 0.75 * run + air * 0.35;
    // Torso-Lehne
    this.torso.rotation.x = run * 0.16 + (this.dashT > 0 ? 0.5 : 0) + air * 0.12;
    this.coatTail.rotation.x = 0.25 + run * 0.7 + air * 0.5 + Math.sin(this.runPhase * 0.5) * 0.06;

    // Doppelsprung-Flip
    if (this.flipT > 0) {
      this.flipT -= dt;
      this.group.rotation.x = (1 - this.flipT / 0.42) * Math.PI * 2;
      if (this.flipT <= 0) this.group.rotation.x = 0;
    }

    // Standard-Armhaltung
    if (!this.attack && this.specialT <= 0) {
      this.armR.rotation.set(Math.sin(this.runPhase) * 0.4 * run, 0, -0.15);
      this.sword.rotation.set(0.4, 0, 0.25);
      this.armL.rotation.set(-Math.sin(this.runPhase) * 0.4 * run, 0, 0.15);
    }

    // Angriffsposen
    if (this.attack) {
      const i = this.attack.index;
      const k = this.attack.t / this.attack.dur;
      const swing = Math.sin(k * Math.PI);
      const dir = i % 2 === 0 ? 1 : -1;
      this.armR.rotation.set(-1.6 + swing * 2.2, dir * (0.9 - swing * 1.8), -0.4);
      this.sword.rotation.set(0.2, 0, dir * 0.9);
      this.torso.rotation.y = dir * (0.5 - swing * 1.0);
      if (this.attack.launcher) {
        this.armR.rotation.set(-2.4 + k * 2.6, 0, 0);
      }
    } else {
      this.torso.rotation.y *= 0.85;
    }

    // Special-Pose: Schwert in Boden gerammt
    if (this.specialT > 0) {
      const k = 1 - this.specialT / 0.9;
      this.armR.rotation.set(-0.4 - Math.sin(k * Math.PI) * 1.4, 0, 0);
      this.torso.rotation.x = 0.45;
    }

    // Slam-Pose
    if (this.slamming) {
      this.armR.rotation.set(-2.6, 0, 0);
      this.torso.rotation.x = 0.5;
    }

    // Treffer-Blinken
    const blink = this.hurtT > 0 && Math.floor(this.hurtT * 20) % 2 === 0;
    this.group.traverse((o) => {
      if (o.isMesh && o.material && o.material.emissive) {
        o.material.emissive.setHex(blink ? 0xff2020 : 0x000000);
      }
    });
  }
}
Player._v1 = new THREE.Vector3();
Player._v2 = new THREE.Vector3();
