// Die Kathedrale: gotische Arena mit Mond, Glasfenstern, Feuern, Nebel & Glut.
import * as THREE from 'three';

export const ARENA_RADIUS = 30;

function glowTexture(inner = 'rgba(255,200,120,1)', outer = 'rgba(255,120,30,0)') {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(64, 64, 2, 64, 64, 64);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.35, inner.replace(/1\)$/, '0.55)'));
  grad.addColorStop(1, outer);
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

function stainedGlassTexture(hue) {
  // Gotisches Spitzbogen-Fenster, prozedural gemalt
  const c = document.createElement('canvas');
  c.width = 128; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#05050c'; g.fillRect(0, 0, 128, 256);
  const cols = [`hsl(${hue},80%,45%)`, `hsl(${(hue + 40) % 360},85%,50%)`, `hsl(${(hue + 160) % 360},80%,40%)`, `hsl(${(hue + 260) % 360},85%,55%)`];
  // Lanzetten
  for (let l = 0; l < 2; l++) {
    for (let r = 0; r < 6; r++) {
      g.fillStyle = cols[(l + r) % cols.length];
      const x = 14 + l * 52, y = 60 + r * 30;
      g.beginPath();
      if (r === 0) { g.moveTo(x, y + 26); g.lineTo(x + 22, y); g.lineTo(x + 44, y + 26); }
      else { g.rect(x, y, 44, 26); }
      g.fill();
    }
  }
  // Rosette oben
  g.fillStyle = cols[1];
  g.beginPath(); g.arc(64, 32, 20, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#0a0a14';
  g.beginPath(); g.arc(64, 32, 9, 0, Math.PI * 2); g.fill();
  // Bleiruten
  g.strokeStyle = 'rgba(0,0,0,0.9)'; g.lineWidth = 3;
  for (let r = 0; r <= 6; r++) { g.beginPath(); g.moveTo(10, 58 + r * 30); g.lineTo(118, 58 + r * 30); g.stroke(); }
  g.beginPath(); g.moveTo(64, 8); g.lineTo(64, 248); g.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function buildWorld(scene) {
  const group = new THREE.Group();
  scene.add(group);

  scene.fog = new THREE.FogExp2(0x07070f, 0.014);
  scene.background = new THREE.Color(0x04040a);

  // ---------- Licht ----------
  scene.add(new THREE.AmbientLight(0x2a2a55, 0.7));
  const hemi = new THREE.HemisphereLight(0x4a3a8a, 0x0a0505, 0.55);
  scene.add(hemi);

  const moonLight = new THREE.DirectionalLight(0x8fa8ff, 1.6);
  moonLight.position.set(-28, 42, -34);
  moonLight.castShadow = true;
  moonLight.shadow.mapSize.set(2048, 2048);
  moonLight.shadow.camera.left = -42; moonLight.shadow.camera.right = 42;
  moonLight.shadow.camera.top = 42; moonLight.shadow.camera.bottom = -42;
  moonLight.shadow.camera.far = 140;
  moonLight.shadow.bias = -0.0004;
  scene.add(moonLight);

  const rim = new THREE.SpotLight(0xff2a3c, 380, 120, 0.7, 0.6, 1.6);
  rim.position.set(20, 26, -40);
  rim.target.position.set(0, 0, 10);
  scene.add(rim, rim.target);

  const fill = new THREE.PointLight(0x6a4aff, 60, 90, 1.8);
  fill.position.set(0, 18, 26);
  scene.add(fill);

  // ---------- Boden: polierter Marmor ----------
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0b0b13, metalness: 0.75, roughness: 0.42, envMapIntensity: 0.3,
  });
  const floor = new THREE.Mesh(new THREE.CircleGeometry(ARENA_RADIUS + 4, 72), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  group.add(floor);

  // Abgrund darunter
  const abyss = new THREE.Mesh(
    new THREE.CircleGeometry(400, 32),
    new THREE.MeshBasicMaterial({ color: 0x020208 })
  );
  abyss.rotation.x = -Math.PI / 2;
  abyss.position.y = -8;
  group.add(abyss);

  // Runenringe (emissiv)
  const runeMat = new THREE.MeshBasicMaterial({ color: 0xff3b55, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const runeMat2 = new THREE.MeshBasicMaterial({ color: 0x7a5aff, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const ring1 = new THREE.Mesh(new THREE.RingGeometry(ARENA_RADIUS - 1.2, ARENA_RADIUS - 0.4, 96), runeMat);
  ring1.rotation.x = -Math.PI / 2; ring1.position.y = 0.03;
  const ring2 = new THREE.Mesh(new THREE.RingGeometry(9, 9.5, 72), runeMat2);
  ring2.rotation.x = -Math.PI / 2; ring2.position.y = 0.03;
  const ring3 = new THREE.Mesh(new THREE.RingGeometry(9.9, 10.1, 72), runeMat);
  ring3.rotation.x = -Math.PI / 2; ring3.position.y = 0.03;
  group.add(ring1, ring2, ring3);

  // Boden-Plattenlinien (dezent)
  const grid = new THREE.PolarGridHelper(ARENA_RADIUS, 12, 6, 72, 0x2a2a4a, 0x1a1a30);
  grid.position.y = 0.02;
  grid.material.transparent = true; grid.material.opacity = 0.35;
  group.add(grid);

  // ---------- Säulenring ----------
  const pillarMat = new THREE.MeshStandardMaterial({ color: 0x3a3a4a, metalness: 0.2, roughness: 0.8 });
  const pillarDark = new THREE.MeshStandardMaterial({ color: 0x23232f, metalness: 0.3, roughness: 0.75 });
  const pillars = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const R = ARENA_RADIUS + 7;
    const broken = i % 3 === 2;
    const h = broken ? 4 + Math.random() * 4 : 13 + Math.random() * 4;
    const p = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.6, 3.4), pillarDark);
    base.position.y = 0.8;
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.25, h, 8), pillarMat);
    shaft.position.y = 1.6 + h / 2;
    const cap = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.0, 3.0), pillarDark);
    cap.position.y = 1.6 + h + 0.5;
    if (broken) cap.visible = false;
    p.add(base, shaft, cap);
    // Glut-Riss an manchen Säulen
    if (i % 4 === 0) {
      const crack = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, h * 0.7, 0.18),
        new THREE.MeshBasicMaterial({ color: 0xff5a2a })
      );
      crack.position.set(1.05, 1.6 + h / 2, 0.3);
      p.add(crack);
    }
    p.position.set(Math.cos(a) * R, 0, Math.sin(a) * R);
    p.rotation.y = -a;
    if (broken) { p.rotation.z = (Math.random() - 0.5) * 0.14; }
    p.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    group.add(p);
    pillars.push(p);
  }

  // ---------- Kathedralen-Rückwand mit Glasfenstern ----------
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x15151f, roughness: 0.9, metalness: 0.1 });
  const wall = new THREE.Mesh(new THREE.BoxGeometry(150, 46, 4), wallMat);
  wall.position.set(0, 20, -62);
  wall.receiveShadow = true;
  group.add(wall);

  for (let i = -3; i <= 3; i++) {
    const tex = stainedGlassTexture((200 + i * 32 + 360) % 360);
    const win = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 15),
      new THREE.MeshBasicMaterial({ map: tex })
    );
    win.position.set(i * 13, 20, -59.9);
    group.add(win);
    // Spitzbogen-Rahmen
    const frame = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.7, 6, 12, Math.PI), pillarDark);
    frame.position.set(i * 13, 27.5, -59.8);
    group.add(frame);
    // Rücklicht je Fenster (gedämpft, nur 3 echte Lichter)
    if (i % 3 === 0) {
      const wl = new THREE.PointLight(new THREE.Color(`hsl(${(220 + i * 30 + 360) % 360},80%,55%)`), 120, 60, 1.8);
      wl.position.set(i * 13, 20, -56);
      scene.add(wl);
    }
  }

  // Türme/Silhouetten
  for (const [x, h, w] of [[-58, 60, 10], [-46, 48, 8], [46, 52, 8], [58, 64, 10], [0, 70, 12]]) {
    const spire = new THREE.Mesh(new THREE.ConeGeometry(w * 0.6, h * 0.5, 6), wallMat);
    spire.position.set(x, h * 0.75, -66);
    group.add(spire);
    const tower = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), wallMat);
    tower.position.set(x, h / 2, -66);
    group.add(tower);
  }

  // ---------- Mond + Sterne ----------
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(9, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xdfe8ff })
  );
  moon.position.set(-70, 62, -150);
  group.add(moon);
  const moonGlowTex = glowTexture('rgba(180,200,255,1)', 'rgba(120,140,255,0)');
  const moonGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: moonGlowTex, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }));
  moonGlow.scale.setScalar(70);
  moonGlow.position.copy(moon.position);
  group.add(moonGlow);
  // Blutroter Zwillingsmond (DMC-Vibe)
  const bloodMoon = new THREE.Mesh(new THREE.SphereGeometry(4, 24, 24), new THREE.MeshBasicMaterial({ color: 0xff4a5a }));
  bloodMoon.position.set(55, 40, -160);
  group.add(bloodMoon);
  const bloodGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture('rgba(255,80,90,1)', 'rgba(255,40,60,0)'), transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending }));
  bloodGlow.scale.setScalar(34);
  bloodGlow.position.copy(bloodMoon.position);
  group.add(bloodGlow);

  {
    const n = 700;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const e = Math.random() * Math.PI * 0.45 + 0.05;
      const r = 300;
      pos[i * 3] = Math.cos(a) * Math.cos(e) * r;
      pos[i * 3 + 1] = Math.sin(e) * r;
      pos[i * 3 + 2] = Math.sin(a) * Math.cos(e) * r - 60;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const stars = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xaabbff, size: 1.4, sizeAttenuation: false, transparent: true, opacity: 0.8, fog: false }));
    group.add(stars);
  }

  // ---------- Feuer-Schalen ----------
  const flameTex = glowTexture('rgba(255,220,150,1)', 'rgba(255,90,20,0)');
  const braziers = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.26;
    const R = ARENA_RADIUS - 4;
    const b = new THREE.Group();
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.55, 2.4, 8), pillarDark);
    stem.position.y = 1.2; stem.castShadow = true;
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 0.5, 0.9, 10), pillarMat);
    bowl.position.y = 2.8; bowl.castShadow = true;
    const flame = new THREE.Sprite(new THREE.SpriteMaterial({ map: flameTex, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending }));
    flame.position.y = 3.9; flame.scale.set(1.7, 2.5, 1);
    const light = new THREE.PointLight(0xff7a30, 55, 26, 1.9);
    light.position.y = 4.2;
    b.add(stem, bowl, flame, light);
    b.position.set(Math.cos(a) * R, 0, Math.sin(a) * R);
    group.add(b);
    braziers.push({ flame, light, seed: Math.random() * 100 });
  }

  // ---------- Licht-Kegel (God Rays) ----------
  const rayMat = new THREE.MeshBasicMaterial({ color: 0x5a6aff, transparent: true, opacity: 0.05, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false });
  for (let i = 0; i < 5; i++) {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(6 + i * 1.5, 60, 16, 1, true), rayMat.clone());
    cone.position.set(-20 + i * 10, 26, -20 - i * 4);
    cone.rotation.z = 0.35; cone.rotation.x = -0.15;
    cone.material.opacity = 0.04 + Math.random() * 0.03;
    group.add(cone);
  }

  // ---------- Schwebende Trümmer ----------
  const rocks = [];
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x2a2a38, roughness: 0.85, metalness: 0.2 });
  for (let i = 0; i < 16; i++) {
    const s = 0.5 + Math.random() * 1.8;
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), rockMat);
    const a = Math.random() * Math.PI * 2;
    const R = 20 + Math.random() * 45;
    rock.position.set(Math.cos(a) * R, 6 + Math.random() * 22, Math.sin(a) * R);
    rock.castShadow = true;
    rock.userData = { baseY: rock.position.y, speed: 0.3 + Math.random() * 0.7, spin: (Math.random() - 0.5) * 1.2, phase: Math.random() * 10 };
    group.add(rock);
    rocks.push(rock);
  }

  // ---------- Glut-Partikel (ambient, endlos) ----------
  const EMBERS = 320;
  const ePos = new Float32Array(EMBERS * 3);
  const eSeed = new Float32Array(EMBERS);
  for (let i = 0; i < EMBERS; i++) {
    const a = Math.random() * Math.PI * 2, R = Math.sqrt(Math.random()) * (ARENA_RADIUS + 14);
    ePos[i * 3] = Math.cos(a) * R;
    ePos[i * 3 + 1] = Math.random() * 16;
    ePos[i * 3 + 2] = Math.sin(a) * R;
    eSeed[i] = Math.random() * 100;
  }
  const eGeo = new THREE.BufferGeometry();
  eGeo.setAttribute('position', new THREE.BufferAttribute(ePos, 3));
  const emberMat = new THREE.PointsMaterial({ color: 0xff8a3c, size: 0.28, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending });
  const emberPts = new THREE.Points(eGeo, emberMat);
  emberPts.frustumCulled = false;
  group.add(emberPts);

  // ---------- Boden-Nebel ----------
  const mistTex = glowTexture('rgba(120,120,200,0.55)', 'rgba(60,60,140,0)');
  const mists = [];
  for (let i = 0; i < 10; i++) {
    const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: mistTex, transparent: true, opacity: 0.13, depthWrite: false }));
    const a = Math.random() * Math.PI * 2, R = 8 + Math.random() * (ARENA_RADIUS - 6);
    m.position.set(Math.cos(a) * R, 0.8 + Math.random() * 1.2, Math.sin(a) * R);
    m.scale.set(14 + Math.random() * 14, 5 + Math.random() * 4, 1);
    m.userData = { speed: 0.2 + Math.random() * 0.4, phase: Math.random() * 10 };
    group.add(m);
    mists.push(m);
  }

  // ---------- Blitz ----------
  let lightningT = 8;
  let flash = 0;

  function update(dt, t, camera) {
    // Flammen flackern
    for (const b of braziers) {
      const f = Math.sin(t * 11 + b.seed) * 0.5 + Math.sin(t * 23 + b.seed * 2) * 0.3 + Math.sin(t * 5 + b.seed) * 0.2;
      b.flame.scale.set(1.7 + f * 0.25, 2.5 + f * 0.55, 1);
      b.light.intensity = 55 + f * 16;
    }
    // Runen pulsieren
    runeMat.opacity = 0.6 + Math.sin(t * 2.2) * 0.2;
    runeMat2.opacity = 0.4 + Math.sin(t * 1.6 + 2) * 0.15;
    ring2.rotation.z = t * 0.12;
    ring3.rotation.z = -t * 0.08;
    // Trümmer schweben
    for (const r of rocks) {
      const u = r.userData;
      r.position.y = u.baseY + Math.sin(t * u.speed + u.phase) * 1.6;
      r.rotation.x += dt * u.spin; r.rotation.y += dt * u.spin * 0.7;
    }
    // Glut steigt auf
    const p = eGeo.attributes.position.array;
    for (let i = 0; i < EMBERS; i++) {
      p[i * 3 + 1] += dt * (0.9 + (eSeed[i] % 1) * 1.4);
      p[i * 3] += Math.sin(t * 0.8 + eSeed[i]) * dt * 0.7;
      if (p[i * 3 + 1] > 17) {
        const a = Math.random() * Math.PI * 2, R = Math.sqrt(Math.random()) * (ARENA_RADIUS + 14);
        p[i * 3] = Math.cos(a) * R; p[i * 3 + 1] = 0.2; p[i * 3 + 2] = Math.sin(a) * R;
      }
    }
    eGeo.attributes.position.needsUpdate = true;
    // Nebel treibt (blendet aus, wenn die Kamera eintaucht)
    for (const m of mists) {
      m.position.x += Math.sin(t * 0.2 + m.userData.phase) * dt * m.userData.speed * 2;
      m.position.z += Math.cos(t * 0.16 + m.userData.phase) * dt * m.userData.speed * 2;
      if (camera) {
        const d = m.position.distanceTo(camera.position);
        const target = 0.13 * THREE.MathUtils.smoothstep(d, 2.5, 9);
        m.material.opacity += (target - m.material.opacity) * Math.min(1, dt * 4);
      }
    }
    moonGlow.material.opacity = 0.8 + Math.sin(t * 0.7) * 0.06;
    // Blitz aus der Ferne
    lightningT -= dt;
    if (lightningT <= 0) {
      flash = 1;
      lightningT = 6 + Math.random() * 10;
    }
    if (flash > 0) {
      flash = Math.max(0, flash - dt * 2.2);
      moonLight.intensity = 1.6 + flash * 3.2;
      hemi.intensity = 0.55 + flash * 1.2;
    }
  }

  return { group, update, moonLight };
}
