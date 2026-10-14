// Zentrales Partikel-/Effektsystem: GPU-Points mit Custom-Shader + Ring-/Schockwellen-Pool.
import * as THREE from 'three';

const MAX = 1600;

const pointVert = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aAlpha;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vColor = aColor;
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (240.0 / max(1.0, -mv.z));
    gl_Position = projectionMatrix * mv;
  }
`;

const pointFrag = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    float a = smoothstep(0.5, 0.05, d) * vAlpha;
    if (a < 0.01) discard;
    // heißer Kern
    vec3 col = mix(vColor, vec3(1.0, 0.95, 0.85), smoothstep(0.28, 0.0, d) * 0.7);
    gl_FragColor = vec4(col, a);
  }
`;

export class FX {
  constructor(scene) {
    this.scene = scene;
    this.pos = new Float32Array(MAX * 3);
    this.vel = new Float32Array(MAX * 3);
    this.col = new Float32Array(MAX * 3);
    this.size = new Float32Array(MAX);
    this.alpha = new Float32Array(MAX);
    this.life = new Float32Array(MAX);
    this.maxLife = new Float32Array(MAX);
    this.grav = new Float32Array(MAX);
    this.drag = new Float32Array(MAX);
    this.head = 0;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(this.col, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alpha, 1));
    const mat = new THREE.ShaderMaterial({
      vertexShader: pointVert,
      fragmentShader: pointFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = 20;
    scene.add(this.points);

    // Ring-Pool (Schockwellen / Slashes am Boden)
    this.rings = [];
    const ringGeo = new THREE.RingGeometry(0.85, 1.0, 48);
    for (let i = 0; i < 14; i++) {
      const m = new THREE.Mesh(
        ringGeo,
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending })
      );
      m.visible = false;
      m.renderOrder = 19;
      scene.add(m);
      this.rings.push({ mesh: m, t: 0, dur: 1, maxR: 5, grow: 0 });
    }

    // Slash-Bögen (flache Klingen-Spuren in der Luft)
    this.slashes = [];
    const slashGeo = new THREE.TorusGeometry(2.2, 0.16, 8, 40, Math.PI * 0.85);
    for (let i = 0; i < 8; i++) {
      const m = new THREE.Mesh(
        slashGeo,
        new THREE.MeshBasicMaterial({ color: 0x9fd8ff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })
      );
      m.visible = false;
      m.renderOrder = 19;
      scene.add(m);
      this.slashes.push({ mesh: m, t: 0, dur: 0.3 });
    }

    this.tmpColor = new THREE.Color();
  }

  spawn(x, y, z, vx, vy, vz, life, size, color, grav = 0, drag = 0) {
    const i = this.head;
    this.head = (this.head + 1) % MAX;
    this.pos[i * 3] = x; this.pos[i * 3 + 1] = y; this.pos[i * 3 + 2] = z;
    this.vel[i * 3] = vx; this.vel[i * 3 + 1] = vy; this.vel[i * 3 + 2] = vz;
    this.tmpColor.set(color);
    this.col[i * 3] = this.tmpColor.r; this.col[i * 3 + 1] = this.tmpColor.g; this.col[i * 3 + 2] = this.tmpColor.b;
    this.life[i] = life; this.maxLife[i] = life;
    this.size[i] = size;
    this.alpha[i] = 1;
    this.grav[i] = grav; this.drag[i] = drag;
  }

  burst(p, { count = 24, speed = 8, life = 0.7, size = 2.2, color = 0xff8030, up = 3, gravity = -12, spread = 1 } = {}) {
    for (let n = 0; n < count; n++) {
      const a = Math.random() * Math.PI * 2;
      const r = (0.3 + Math.random() * 0.7) * speed * spread;
      this.spawn(
        p.x, p.y, p.z,
        Math.cos(a) * r, up * (0.4 + Math.random()), Math.sin(a) * r,
        life * (0.6 + Math.random() * 0.7), size * (0.6 + Math.random() * 0.8),
        color, gravity, 1.2
      );
    }
  }

  embers(p, count, color) {
    for (let n = 0; n < count; n++) {
      const a = Math.random() * Math.PI * 2;
      this.spawn(
        p.x + (Math.random() - 0.5) * 2, p.y + Math.random() * 0.5, p.z + (Math.random() - 0.5) * 2,
        Math.cos(a) * 1.5, 2 + Math.random() * 4, Math.sin(a) * 1.5,
        0.8 + Math.random() * 0.8, 1.2 + Math.random() * 1.4, color, 2.5, 0.6
      );
    }
  }

  souls(p, count = 10) {
    // violette Seelen-Wisps steigen auf (sammeln sich als Energie)
    for (let n = 0; n < count; n++) {
      this.spawn(
        p.x + (Math.random() - 0.5) * 1.5, p.y + 0.5, p.z + (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 2, 4 + Math.random() * 3, (Math.random() - 0.5) * 2,
        1.0 + Math.random() * 0.5, 1.8 + Math.random(), 0xb04dff, 3.0, 0.4
      );
    }
  }

  ring(p, color = 0xffcf9a, maxR = 7, dur = 0.5, flat = true) {
    const r = this.rings.find((r) => !r.mesh.visible) || this.rings[0];
    r.mesh.visible = true;
    r.mesh.position.copy(p);
    r.mesh.position.y = Math.max(0.12, p.y * (flat ? 0.1 : 1));
    if (flat) r.mesh.rotation.set(-Math.PI / 2, 0, 0);
    else r.mesh.rotation.set(0, 0, 0);
    r.mesh.material.color.set(color);
    r.mesh.scale.setScalar(0.2);
    r.t = 0; r.dur = dur; r.maxR = maxR;
  }

  slash(p, yaw, color = 0x9fd8ff, big = 1) {
    const s = this.slashes.find((s) => !s.mesh.visible) || this.slashes[0];
    s.mesh.visible = true;
    s.mesh.position.copy(p);
    s.mesh.rotation.set(0, yaw + Math.PI / 2, 0.35);
    s.mesh.scale.setScalar(big);
    s.mesh.material.color.set(color);
    s.t = 0; s.dur = 0.28;
  }

  update(dt) {
    // Punkte
    for (let i = 0; i < MAX; i++) {
      if (this.life[i] <= 0) { this.alpha[i] = 0; continue; }
      this.life[i] -= dt;
      const k = Math.max(0, this.life[i] / this.maxLife[i]);
      this.alpha[i] = k * k;
      const dr = 1 - Math.min(0.9, this.drag[i] * dt);
      this.vel[i * 3] *= dr; this.vel[i * 3 + 2] *= dr;
      this.vel[i * 3 + 1] = this.vel[i * 3 + 1] * dr + this.grav[i] * dt;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      if (this.pos[i * 3 + 1] < 0.05) { this.pos[i * 3 + 1] = 0.05; this.vel[i * 3 + 1] *= -0.3; }
    }
    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.aAlpha.needsUpdate = true;
    this.points.geometry.attributes.aColor.needsUpdate = true;
    this.points.geometry.attributes.aSize.needsUpdate = true;

    // Ringe
    for (const r of this.rings) {
      if (!r.mesh.visible) continue;
      r.t += dt;
      const k = r.t / r.dur;
      if (k >= 1) { r.mesh.visible = false; continue; }
      const e = 1 - Math.pow(1 - k, 3);
      r.mesh.scale.setScalar(0.2 + e * r.maxR);
      r.mesh.material.opacity = 0.9 * (1 - k);
    }
    // Slashes
    for (const s of this.slashes) {
      if (!s.mesh.visible) continue;
      s.t += dt;
      const k = s.t / s.dur;
      if (k >= 1) { s.mesh.visible = false; continue; }
      s.mesh.material.opacity = 0.95 * (1 - k);
      s.mesh.scale.multiplyScalar(1 + dt * 2.2);
    }
  }
}
