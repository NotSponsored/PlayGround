import * as THREE from 'three';
import { SoundFX } from './audio.js';
import { Net } from './net.js';

export const CHARS = {
  sol:   { name:'Sol',   title:'Sonnen-Wächter', color:0xff6a4d, coat:0x2b2f55, speed:7.2, power:1.0, hp:120 },
  luna:  { name:'Luna',  title:'Mond-Läuferin',  color:0x6ab8ff, coat:0x1d2440, speed:8.4, power:0.85, hp:100 },
  ignis: { name:'Ignis', title:'Stern-Brecher',  color:0x51ff9e, coat:0x24301f, speed:6.4, power:1.3, hp:150 },
};
export const MAGICS = [
  { id:'fire', name:'Feuer',  color:0xff7a2d, cost:10, dmg:34, desc:'Feuerball' },
  { id:'ice',  name:'Eis',    color:0x7ad7ff, cost:10, dmg:28, desc:'Eissplitter (verlangsamt)' },
  { id:'bolt', name:'Blitz',  color:0xffe14d, cost:14, dmg:44, desc:'Kettenblitz' },
  { id:'cure', name:'Vita',   color:0x7dff9a, cost:20, dmg:-50, desc:'Heilt dich + Gruppe' },
];

const $ = (id)=>document.getElementById(id);

export class Game {
  constructor(canvas){
    this.canvas = canvas;
    this.sfx = new SoundFX();
    this.net = new Net(this);
    this.net.onStatus = (s)=>{ $('mp-status').textContent = s; this.toast(s); };
    this.state = 'title'; // title|playing|paused|over
    this.charId = 'sol';
    this.players = []; // local + ai + remote Fighter objects
    this.me = null;
    this.enemies = [];
    this.orbs = [];
    this.shots = [];
    this.particles = [];
    this.wave = 0; this.waveActive = false; this.boss = null;
    this.enemySeq = 1;
    this.lockTarget = null;
    this.cmdIndex = 0; this.magicIndex = 0; this.magicOpen = false;
    this.keys = {};
    this.camYaw = 0; this.camPitch = 0.32;
    this.clock = new THREE.Clock();
    this.snapTimer = 0; this.pstateTimer = 0;
    this.role = 'solo'; // solo|host|client
    this.remote = new Map();
    this.lumen = 0;
    this.time = 0;
  }

  // ---------- UI helpers ----------
  toast(msg, ms=2600){
    const w=$('toast-wrap'); const d=document.createElement('div');
    d.className='toast'; d.textContent=msg; w.appendChild(d);
    setTimeout(()=>{ d.style.opacity='0'; d.style.transition='opacity .4s'; setTimeout(()=>d.remove(),400); }, ms);
    while(w.children.length>4) w.firstChild.remove();
  }
  chat(name, text){
    const log=$('chat-log'); const d=document.createElement('div');
    d.innerHTML='<b></b> '; d.firstChild.textContent=name+': '; d.appendChild(document.createTextNode(text));
    log.appendChild(d); log.scrollTop=log.scrollHeight;
  }

  // ---------- init ----------
  async init(){
    const c=this.canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas:c, antialias:true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    this.renderer.setSize(innerWidth,innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x141a3a, 0.012);
    this.camera = new THREE.PerspectiveCamera(58, innerWidth/innerHeight, 0.1, 600);
    addEventListener('resize', ()=>{ this.camera.aspect=innerWidth/innerHeight; this.camera.updateProjectionMatrix(); this.renderer.setSize(innerWidth,innerHeight); });
    this.buildSky();
    this.buildWorld();
    this.buildLights();
    this.bindInput();
    this.loop();
  }

  buildSky(){
    // Verlaufshimmel via Canvas-Textur
    const cv=document.createElement('canvas'); cv.width=4; cv.height=256;
    const g=cv.getContext('2d'); const gr=g.createLinearGradient(0,0,0,256);
    gr.addColorStop(0,'#050816'); gr.addColorStop(0.45,'#1b2350'); gr.addColorStop(0.72,'#6a3f8f'); gr.addColorStop(0.88,'#e0784d'); gr.addColorStop(1,'#2a1a3a');
    g.fillStyle=gr; g.fillRect(0,0,4,256);
    const tex=new THREE.CanvasTexture(cv); tex.colorSpace=THREE.SRGBColorSpace;
    const sky=new THREE.Mesh(new THREE.SphereGeometry(400,24,16), new THREE.MeshBasicMaterial({map:tex,side:THREE.BackSide,fog:false}));
    this.scene.add(sky);
    // Sterne
    const n=700, pos=new Float32Array(n*3);
    for(let i=0;i<n;i++){ const r=360,th=Math.random()*Math.PI*2,ph=Math.random()*Math.PI*0.5;
      pos[i*3]=r*Math.cos(th)*Math.cos(ph); pos[i*3+1]=r*Math.sin(ph)+10; pos[i*3+2]=r*Math.sin(th)*Math.cos(ph); }
    const sg=new THREE.BufferGeometry(); sg.setAttribute('position',new THREE.BufferAttribute(pos,3));
    this.scene.add(new THREE.Points(sg,new THREE.PointsMaterial({color:0xcdd6ff,size:1.4,sizeAttenuation:false,fog:false,transparent:true,opacity:0.85})));
    // Mond (groß, KH2-Dusk-Stimmung, aber eigenes Design)
    const moon=new THREE.Mesh(new THREE.CircleGeometry(26,48), new THREE.MeshBasicMaterial({color:0xffe9b0,fog:false}));
    moon.position.set(120,150,-280); moon.lookAt(0,20,0); this.scene.add(moon);
    const halo=new THREE.Mesh(new THREE.CircleGeometry(40,48), new THREE.MeshBasicMaterial({color:0xffd76a,fog:false,transparent:true,opacity:0.18}));
    halo.position.copy(moon.position).add(new THREE.Vector3(0,0,1)); halo.lookAt(0,20,0); this.scene.add(halo);
  }

  buildLights(){
    this.scene.add(new THREE.HemisphereLight(0x9aabff,0x4a3560,1.25));
    this.scene.add(new THREE.AmbientLight(0x404a7a,0.6));
    const sun=new THREE.DirectionalLight(0xffc98a,1.7);
    sun.position.set(-40,60,20); sun.castShadow=true;
    sun.shadow.mapSize.set(2048,2048); sun.shadow.camera.left=-70; sun.shadow.camera.right=70; sun.shadow.camera.top=70; sun.shadow.camera.bottom=-70;
    this.scene.add(sun);
    // 4 echte Punktlichter an den Platz-Laternen
    [[18,0,18],[-18,0,18],[18,0,-18],[-18,0,-18]].forEach(([x,,z])=>{
      const pl=new THREE.PointLight(0xffb46a,140,34,1.7); pl.position.set(x,6,z); this.scene.add(pl);
    });
  }

  buildWorld(){
    const S=this.scene;
    // Boden
    const ground=new THREE.Mesh(new THREE.PlaneGeometry(400,400), new THREE.MeshStandardMaterial({color:0x2b3560,roughness:1}));
    ground.rotation.x=-Math.PI/2; ground.receiveShadow=true; S.add(ground);
    // Plaza
    const plaza=new THREE.Mesh(new THREE.CircleGeometry(30,48), new THREE.MeshStandardMaterial({color:0x565f96,roughness:0.8}));
    plaza.rotation.x=-Math.PI/2; plaza.position.y=0.02; plaza.receiveShadow=true; S.add(plaza);
    const ring=new THREE.Mesh(new THREE.RingGeometry(30,32,48), new THREE.MeshStandardMaterial({color:0x8a7bff,emissive:0x4a3fb8,emissiveIntensity:0.7}));
    ring.rotation.x=-Math.PI/2; ring.position.y=0.03; S.add(ring);
    // Straßen
    const roadMat=new THREE.MeshStandardMaterial({color:0x2a3054,roughness:0.9});
    [[0,45,14,60],[0,-45,14,60],[45,0,60,14],[-45,0,60,14]].forEach(([x,z,w,d])=>{
      const r=new THREE.Mesh(new THREE.PlaneGeometry(w,d),roadMat); r.rotation.x=-Math.PI/2; r.position.set(x,0.015,z); r.receiveShadow=true; S.add(r);
    });
    // Uhrturm (Wahrzeichen, eigenes Design)
    const tower=new THREE.Group();
    const stone=new THREE.MeshStandardMaterial({color:0x6a6f9e,roughness:0.8});
    const base=new THREE.Mesh(new THREE.BoxGeometry(10,34,10),stone); base.position.y=17; base.castShadow=base.receiveShadow=true; tower.add(base);
    const trim=new THREE.Mesh(new THREE.BoxGeometry(11,2,11),new THREE.MeshStandardMaterial({color:0x3a3f6e})); trim.position.y=8; tower.add(trim);
    const face=new THREE.Mesh(new THREE.CircleGeometry(3.4,32),new THREE.MeshStandardMaterial({color:0xfff2c0,emissive:0xffd76a,emissiveIntensity:1.2}));
    face.position.set(0,27,5.05); tower.add(face);
    const face2=face.clone(); face2.rotation.y=Math.PI; face2.position.z=-5.05; tower.add(face2);
    // Zeiger
    const h1=new THREE.Mesh(new THREE.BoxGeometry(0.25,2.2,0.05),new THREE.MeshBasicMaterial({color:0x222244})); h1.position.set(0,27,5.12); h1.rotation.z=-1.1; tower.add(h1);
    const roof=new THREE.Mesh(new THREE.ConeGeometry(7.5,7,4),new THREE.MeshStandardMaterial({color:0x39406f,roughness:0.7})); roof.position.y=37.5; roof.rotation.y=Math.PI/4; roof.castShadow=true; tower.add(roof);
    tower.position.set(0,0,-44); S.add(tower);
    // Häuser-Ring
    const houseCols=[0x4a3f6e,0x5e4a6e,0x3f5e6e,0x6e5a3f];
    for(let i=0;i<14;i++){
      const a=(i/14)*Math.PI*2+0.2, R=52;
      const x=Math.cos(a)*R, z=Math.sin(a)*R;
      if(Math.abs(x)<10&&z<-30) continue;
      const w=8+Math.random()*5,h=7+Math.random()*7,d=8;
      const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color:houseCols[i%4],roughness:0.9}));
      m.position.set(x,h/2,z); m.lookAt(0,h/2,0); m.castShadow=m.receiveShadow=true; S.add(m);
      const winMat=new THREE.MeshStandardMaterial({color:0x332f55,emissive:0xffc46a,emissiveIntensity:1.4});
      for(let k=-1;k<=1;k++){ const win=new THREE.Mesh(new THREE.PlaneGeometry(1.4,1.8),winMat);
        win.position.set(x-Math.sin(a)*0+k*2*Math.cos(a),h*0.6,z-Math.cos(a)*0+k*0); win.position.y=h*0.6;
        win.position.x+=Math.cos(a)*0; win.lookAt(0,h*0.6,0); win.translateZ(d/2+0.05); S.add(win); }
      const r=new THREE.Mesh(new THREE.ConeGeometry(Math.max(w,d)*0.75,3,4),new THREE.MeshStandardMaterial({color:0x2a2f55})); r.position.set(x,h+1.5,z); r.rotation.y=Math.PI/4; S.add(r);
    }
    // Laternen
    const poleMat=new THREE.MeshStandardMaterial({color:0x22263e,roughness:0.6,metalness:0.5});
    const lampMat=new THREE.MeshStandardMaterial({color:0x554422,emissive:0xffb46a,emissiveIntensity:2});
    [[18,18],[-18,18],[18,-18],[-18,-18],[0,28],[0,-28],[28,0],[-28,0]].forEach(([x,z])=>{
      const p=new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.25,6,8),poleMat); p.position.set(x,3,z); p.castShadow=true; S.add(p);
      const l=new THREE.Mesh(new THREE.SphereGeometry(0.7,12,10),lampMat); l.position.set(x,6.4,z); S.add(l);
    });
    // Brunnen in der Mitte? Nein — Kampf-Arena frei lassen; stattdessen Säulen
    for(let i=0;i<6;i++){
      const a=i/6*Math.PI*2, x=Math.cos(a)*24, z=Math.sin(a)*24;
      const col=new THREE.Mesh(new THREE.CylinderGeometry(0.8,1,7,10),stone); col.position.set(x,3.5,z); col.castShadow=col.receiveShadow=true; S.add(col);
      const orb=new THREE.Mesh(new THREE.SphereGeometry(0.55,12,10),new THREE.MeshStandardMaterial({color:0x222244,emissive:0x7ad7ff,emissiveIntensity:1.6}));
      orb.position.set(x,7.4,z); S.add(orb);
    }
  }

  // ---------- Charaktere bauen (alle prozedural, eigene Designs) ----------
  nameSprite(text, color='#ffd76a'){
    const cv=document.createElement('canvas'); cv.width=256; cv.height=64;
    const g=cv.getContext('2d'); g.font='bold 30px sans-serif'; g.textAlign='center';
    g.shadowColor='#000'; g.shadowBlur=8; g.fillStyle=color; g.fillText(text,128,40);
    const t=new THREE.CanvasTexture(cv); t.colorSpace=THREE.SRGBColorSpace;
    const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthWrite:false}));
    s.scale.set(2.6,0.65,1); return s;
  }

  buildKeyblade(color){
    const g=new THREE.Group();
    const metal=new THREE.MeshStandardMaterial({color:0xb9c2e8,roughness:0.35,metalness:0.85});
    const glow=new THREE.MeshStandardMaterial({color:0x333344,emissive:color,emissiveIntensity:1.6});
    const handle=new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.09,0.7,8),new THREE.MeshStandardMaterial({color:0x3a2f5a,roughness:0.7})); g.add(handle);
    const guard=new THREE.Mesh(new THREE.BoxGeometry(0.55,0.12,0.12),glow); guard.position.y=0.4; g.add(guard);
    const blade=new THREE.Mesh(new THREE.BoxGeometry(0.22,2.1,0.1),metal); blade.position.y=1.5; blade.castShadow=true; g.add(blade);
    // Zähne (Schlüsselbart)
    for(let i=0;i<3;i++){ const t=new THREE.Mesh(new THREE.BoxGeometry(0.35,0.12,0.1),glow); t.position.set(0.22,1.0+i*0.4,0); g.add(t); }
    const bow=new THREE.Mesh(new THREE.TorusGeometry(0.22,0.07,8,20),glow); bow.position.y=-0.5; g.add(bow);
    const orb=new THREE.Mesh(new THREE.SphereGeometry(0.1,10,8),new THREE.MeshStandardMaterial({emissive:color,emissiveIntensity:2.5,color:0x111111})); orb.position.y=2.6; g.add(orb);
    return g;
  }

  buildFighterMesh(charId, label, isEnemy=false){
    const def=CHARS[charId]||CHARS.sol;
    const g=new THREE.Group();
    const coat=new THREE.MeshStandardMaterial({color:isEnemy?0x14141f:def.coat,roughness:0.8});
    const skin=new THREE.MeshStandardMaterial({color:isEnemy?0x1c1c2a:0xf2c89b,roughness:0.7});
    const accent=new THREE.MeshStandardMaterial({color:def.color,emissive:def.color,emissiveIntensity:0.7});
    const mk=(geo,mat,x,y,z)=>{ const m=new THREE.Mesh(geo,mat); m.position.set(x,y,z); m.castShadow=true; g.add(m); return m; };
    // Beine / Torso / Kopf / Arme
    const legL=mk(new THREE.CapsuleGeometry(0.16,0.6,4,8),coat,-0.2,0.55,0);
    const legR=mk(new THREE.CapsuleGeometry(0.16,0.6,4,8),coat,0.2,0.55,0);
    const torso=mk(new THREE.CapsuleGeometry(0.32,0.6,4,10),coat,0,1.5,0);
    const belt=mk(new THREE.TorusGeometry(0.33,0.06,8,18),accent,0,1.25,0); belt.rotation.x=Math.PI/2;
    const head=mk(new THREE.SphereGeometry(0.3,16,12),skin,0,2.35,0);
    const hair=mk(new THREE.SphereGeometry(0.32,12,10,0,Math.PI*2,0,1.6),new THREE.MeshStandardMaterial({color:isEnemy?0x0a0a12:def.color,roughness:0.6}),0,2.42,-0.04);
    const armL=mk(new THREE.CapsuleGeometry(0.11,0.55,4,8),coat,-0.5,1.55,0);
    const armR=mk(new THREE.CapsuleGeometry(0.11,0.55,4,8),coat,0.5,1.55,0);
    if(isEnemy){
      const e1=mk(new THREE.SphereGeometry(0.07,8,8),new THREE.MeshBasicMaterial({color:0xffe14d}),-0.11,2.38,0.24);
      const e2=mk(new THREE.SphereGeometry(0.07,8,8),new THREE.MeshBasicMaterial({color:0xffe14d}),0.11,2.38,0.24);
      e1.castShadow=e2.castShadow=false;
    } else {
      const e1=mk(new THREE.SphereGeometry(0.045,8,8),new THREE.MeshBasicMaterial({color:0x182038}),-0.1,2.36,0.26);
      const e2=mk(new THREE.SphereGeometry(0.045,8,8),new THREE.MeshBasicMaterial({color:0x182038}),0.1,2.36,0.26);
    }
    // Keyblade in rechter Hand
    const kb=this.buildKeyblade(def.color); kb.position.set(0.5,1.1,0.25); kb.rotation.x=0.4; g.add(kb);
    const tag=this.nameSprite(label||def.name); tag.position.y=3.1; g.add(tag);
    g.userData={legL,legR,armL,armR,torso,head,kb,walk:Math.random()*10};
    return g;
  }

  makeFighter({charId='sol', name='Sol', remoteId=null, ai=false, x=0, z=6}){
    const def=CHARS[charId];
    const mesh=this.buildFighterMesh(charId,name, false);
    mesh.position.set(x,0,z); this.scene.add(mesh);
    const f={ charId, def, name, mesh, remoteId, ai,
      pos:mesh.position, vel:new THREE.Vector3(), yaw:0,
      hp:def.hp, maxhp:def.hp, mp:80, maxmp:80,
      combo:0, comboT:0, atkCd:0, atkAnim:0, castCd:0, dodgeCd:0, dodgeT:0, block:false,
      jump:0, vy:0, grounded:true, hurtT:0, drive:0, driveOn:false, driveT:0, down:false, deadT:0,
      mpRegen:6, isMe:false, walkPh:0 };
    return f;
  }

  // ---------- Gegner ----------
  spawnEnemy(kind='shade', x=null, z=null){
    const id=this.enemySeq++;
    let hp=50, scale=1, speed=4, dmg=10, name='Schatten';
    if(kind==='brute'){ hp=140; scale=1.7; speed=3.2; dmg=18; name='Schattenbrecher'; }
    if(kind==='boss'){ hp=900+this.wave*60; scale=3.1; speed=3.6; dmg=26; name='SCHATTENLORD'; }
    if(x===null){ const a=Math.random()*Math.PI*2, r=26+Math.random()*10; x=Math.cos(a)*r; z=Math.sin(a)*r; }
    const mesh=this.buildFighterMesh('sol', kind==='boss'?name:'', true);
    mesh.scale.setScalar(scale);
    mesh.position.set(x,0,z); this.scene.add(mesh);
    // Boss-Krone
    if(kind==='boss'){ const crown=new THREE.Mesh(new THREE.TorusGeometry(0.4,0.09,8,14),new THREE.MeshStandardMaterial({color:0x331133,emissive:0xff2d78,emissiveIntensity:1.5})); crown.position.y=2.85; crown.rotation.x=0.3; mesh.add(crown); }
    const e={ id, kind, mesh, pos:mesh.position, hp, maxhp:hp, speed, dmg, atkCd:0, atkAnim:0, hurtT:0, slowT:0, target:null, dead:false, deadT:0, wanderA:Math.random()*6 };
    this.enemies.push(e);
    if(kind==='boss'){ this.boss=e; $('boss-bar').classList.remove('hidden'); $('boss-name').textContent=name+' · Welle '+this.wave; }
    return e;
  }

  startWave(n){
    this.wave=n; this.waveActive=true;
    $('wave-num').textContent=n;
    const count = n%5===0 ? 0 : 3+Math.floor(n*1.2);
    for(let i=0;i<count;i++) setTimeout(()=>{ if(this.role!=='client') this.spawnEnemy(Math.random()<0.22?'brute':'shade'); }, i*700);
    if(n%5===0) setTimeout(()=>{ if(this.role!=='client'){ this.spawnEnemy('boss'); this.toast('⚠ Der SCHATTENLORD erscheint!'); } }, 800);
    else this.toast('Welle '+n+' — '+count+' Schatten nahen!');
    this.sfx.wave();
    this.updateObjective();
  }

  updateObjective(){
    const alive=this.enemies.filter(e=>!e.dead).length;
    $('enemy-count').textContent = this.waveActive?('· '+alive+' übrig · 💠 '+this.lumen):'';
  }

  // ---------- Input ----------
  bindInput(){
    addEventListener('keydown',(e)=>{
      if(e.code==='Tab') e.preventDefault();
      const typing=document.activeElement===$('chat-input')||document.activeElement===$('join-code');
      if(this.state!=='playing'){ if(!typing) this.keys[e.code]=true; return; }
      if(e.code==='Enter'){ const ci=$('chat-input'); if(document.activeElement===ci){ this.sendChat(ci.value); ci.value=''; ci.blur(); } else ci.focus(); return; }
      if(typing) return; // keine Spiel-Aktionen beim Tippen (verhindert u.a. Springen durch Leerzeichen im Chat)
      this.keys[e.code]=true;
      if(e.repeat) return; // Tastenwiederholung: keine Mehrfach-Aktionen (verhinderte u.a. Dauer-Aufstieg)
      if(e.code==='Digit1') this.selectMagic(0);
      if(e.code==='Digit2') this.selectMagic(1);
      if(e.code==='Digit3') this.selectMagic(2);
      if(e.code==='Digit4') this.selectMagic(3);
      if(e.code==='KeyT') this.tryDrive();
      if(e.code==='KeyQ') this.me&&(this.me.block=true);
      if(e.code==='Tab'||e.code==='KeyV') this.toggleLock();
      if(e.code==='KeyK'||e.code==='KeyF') this.castMagic();
      if(e.code==='KeyJ') this.attack();
      if(e.code==='KeyE') this.interact();
      if(e.code==='Escape'||e.code==='KeyP') this.pause();
      if(e.code==='ArrowDown'||e.code==='KeyS'&&false){}
      // Command-Menü Navigation
      if(e.code==='ArrowUp'){ this.moveCmd(-1); e.preventDefault(); }
      if(e.code==='ArrowDown'){ this.moveCmd(1); e.preventDefault(); }
      if(e.code==='ArrowRight'||e.code==='KeyX'){ this.execCmd(); }
    });
    addEventListener('keyup',(e)=>{ this.keys[e.code]=false; if(e.code==='KeyQ'&&this.me) this.me.block=false; });
    addEventListener('blur',()=>{ this.keys={}; if(this.me) this.me.block=false; }); // keine hängenden Tasten nach Alt-Tab/Fokusverlust
    this.canvas.addEventListener('mousedown',(e)=>{
      if(this.state!=='playing') return;
      if(document.pointerLockElement!==this.canvas) this.canvas.requestPointerLock();
      if(e.button===0) this.attack();
      if(e.button===2) this.castMagic();
      if(e.button===1){ this.toggleLock(); e.preventDefault(); }
    });
    addEventListener('contextmenu',(e)=>{ if(this.state==='playing') e.preventDefault(); });
    addEventListener('mousemove',(e)=>{
      if(document.pointerLockElement===this.canvas&&this.state==='playing'){
        this.camYaw-=e.movementX*0.0028; this.camPitch+=e.movementY*0.0022;
        this.camPitch=Math.max(0.05,Math.min(1.1,this.camPitch));
      }
    });
    // Char-Auswahl
    document.querySelectorAll('.char-card').forEach(el=>el.addEventListener('click',()=>{
      document.querySelectorAll('.char-card').forEach(x=>x.classList.remove('selected'));
      el.classList.add('selected'); this.charId=el.dataset.char; this.sfx.ui();
    }));
  }

  pollGamepad(){
    const gps=navigator.getGamepads?navigator.getGamepads():[];
    const gp=[...gps].find(g=>g&&g.connected); if(!gp||!this.me||this.state!=='playing') return;
    const dz=(v)=>Math.abs(v)>0.18?v:0;
    const ax=dz(gp.axes[0]||0), ay=dz(gp.axes[1]||0);
    if(ax||ay){ const s=Math.hypot(ax,ay); this.gpMove={x:ax/s*Math.min(1,s),y:ay/s*Math.min(1,s)}; } else this.gpMove=null;
    const b=(i)=>gp.buttons[i]?.pressed;
    if(b(0)&&!this._gpA){ this.jump(); } this._gpA=b(0);
    if(b(2)&&!this._gpX){ this.attack(); } this._gpX=b(2);
    if(b(3)&&!this._gpY){ this.castMagic(); } this._gpY=b(3);
    if(b(1)&&!this._gpB){ this.dodge(); } this._gpB=b(1);
    if(b(5)){ this.me.block=true; } else if(!this.keys['KeyQ']) this.me.block=false;
    if(b(4)&&!this._gpLB){ this.toggleLock(); } this._gpLB=b(4);
    if(gp.axes[2]||gp.axes[3]){ this.camYaw-=(dz(gp.axes[2]||0))*0.05; this.camPitch=Math.max(0.05,Math.min(1.1,this.camPitch+(dz(gp.axes[3]||0))*0.04)); }
  }

  // ---------- Spielstart ----------
  startSolo(){
    this.role='solo'; this.resetRun();
    // KI-Partner (die beiden anderen Charaktere)
    const others=Object.keys(CHARS).filter(c=>c!==this.charId);
    others.forEach((c,i)=>{ const f=this.makeFighter({charId:c,name:CHARS[c].name,ai:true,x:-3+i*6,z:9}); this.players.push(f); });
    this.beginPlay('Solo — mit KI-Partnern '+others.map(c=>CHARS[c].name).join(' & '));
  }
  startHost(code){
    this.role='host'; this.resetRun();
    $('host-code').textContent=code; $('host-code-box').classList.remove('hidden');
    // 1 KI-Partner als Lückenfüller (geht, wenn 2. Spieler joint)
    const others=Object.keys(CHARS).filter(c=>c!==this.charId);
    const f=this.makeFighter({charId:others[0],name:CHARS[others[0]].name+' (KI)',ai:true,x:-3,z:9}); this.players.push(f); this.aiFiller=f;
    this.beginPlay('Host '+code+' — teile den Code mit Freunden!');
  }
  startClient(){
    this.role='client'; this.resetRun(true);
    this.beginPlay('Gast — der Host steuert Wellen & Gegner.');
  }

  resetRun(asGuest=false){
    // aufräumen
    [...this.enemies,...this.orbs,...this.shots].forEach(o=>this.scene.remove(o.mesh||o));
    this.players.forEach(p=>{ if(p!==this.me) this.scene.remove(p.mesh); });
    if(this.me) this.scene.remove(this.me.mesh);
    this.enemies=[]; this.orbs=[]; this.shots=[]; this.players=[]; this.remote.clear();
    this.wave=0; this.waveActive=false; this.boss=null; this.lumen=0; this.lockTarget=null;
    this.me=this.makeFighter({charId:this.charId,name:CHARS[this.charId].name+(this.role==='client'?' (Gast)':''),x:0,z:6});
    this.me.isMe=true; this.players.push(this.me);
    this.camYaw=Math.PI; this.camPitch=0.32;
  }

  beginPlay(msg){
    if(document.activeElement&&document.activeElement.blur) document.activeElement.blur(); // kein Space/Enter-Re-Trigger von Menü-Buttons
    this.keys={}; this.gpMove=null;
    $('title-screen').classList.add('hidden'); $('gameover').classList.add('hidden'); $('pause-menu').classList.add('hidden');
    $('hud').classList.remove('hidden'); $('loading').classList.add('hidden');
    this.state='playing'; this.sfx.ensure(); this.sfx.startPad();
    this.buildCmdMenu(); this.buildPartyFrames();
    if(this.role!=='client') this.startWave(1);
    this.toast('✨ '+msg);
    this.toast('WASD laufen · J Angriff · K Magie · Shift Rolle · Tab Lock-On');
    this.chat('System', msg);
  }

  setMultiplayer(role){
    const b=$('mp-badge'); b.classList.remove('hidden');
    $('mp-role').textContent=role==='host'?'Host':role==='client'?'Gast':'Solo';
    this.updateMpCount();
  }
  updateMpCount(){ $('mp-peers').textContent=this.net.peerCount(); }

  // ---------- Netzwerk-Events ----------
  addRemotePlayer(pid){
    if(this.remote.has(pid)||this.state!=='playing') return;
    const used=new Set(this.players.map(p=>p.charId));
    const free=Object.keys(CHARS).find(c=>!used.has(c))||'luna';
    const f=this.makeFighter({charId:free,name:'Gast-'+pid.slice(-4),remoteId:pid,x:3,z:8});
    this.players.push(f); this.remote.set(pid,f);
    // KI-Füller entfernen, sobald echter Spieler da ist
    if(this.aiFiller){ this.scene.remove(this.aiFiller.mesh); this.players=this.players.filter(p=>p!==this.aiFiller); this.aiFiller=null; }
    this.buildPartyFrames(); this.updateMpCount();
    this.chat('System','Mitspieler beigetreten ('+this.net.peerCount()+'/'+3+')');
    if(this.role==='host') this.sendSnapshotTo(pid);
  }
  removeRemotePlayer(pid){
    const f=this.remote.get(pid); if(f){ this.scene.remove(f.mesh); this.players=this.players.filter(p=>p!==f); this.remote.delete(pid); this.buildPartyFrames(); this.updateMpCount(); }
  }
  sendSnapshotTo(pid){
    this.net.sendTo(pid,'snapshot',{ wave:this.wave, lumen:this.lumen,
      enemies:this.enemies.filter(e=>!e.dead).map(e=>({id:e.id,kind:e.kind,x:+e.pos.x.toFixed(2),y:+e.pos.y.toFixed(2),z:+e.pos.z.toFixed(2),hp:Math.ceil(e.hp)})),
      orbs:this.orbs.map(o=>({x:+o.mesh.position.x.toFixed(1),z:+o.mesh.position.z.toFixed(1),kind:o.kind})) });
  }
  onNetData(pid, d){
    const f=this.remote.get(pid);
    if(d.kind==='hello'&&f){ f.charId=d.charId||f.charId; }
    if(d.kind==='pstate'&&f){
      f._netT=performance.now(); f._netFrom=f.pos.clone(); f._netTo=new THREE.Vector3(d.p[0],d.p[1],d.p[2]);
      f.yaw=d.ry; f.hp=d.hp; f.mp=d.mp; f.atkAnim=d.atk||0; f.driveOn=!!d.drive; f.down=!!d.down;
      f.mesh.rotation.y=d.ry;
      if(d.atk) f.userAttackFlash=d.atk;
    }
    if(d.kind==='hit'&&this.role==='host'){
      const e=this.enemies.find(x=>x.id===d.id&&!x.dead);
      if(e) this.damageEnemy(e,d.dmg,f);
    }
    if(d.kind==='cast'&&this.role==='host'){ this.spawnShot(d.magic,f||this.me,null); }
    if(d.kind==='snapshot'&&this.role==='client'){ this.applySnapshot(d); }
    if(d.kind==='estate'&&this.role==='client'){ this.applyEstates(d.list); }
    if(d.kind==='chat'){ this.chat(d.name||'Gast',d.text||''); }
    if(d.kind==='down'){ if(f){f.down=true;} }
    if(d.kind==='revive'){ const p=this.players.find(p=>p.remoteId===d.who||p===this.me&&d.who==='me'); }
  }
  applySnapshot(d){
    this.wave=d.wave||this.wave; $('wave-num').textContent=this.wave;
    // Gegner abgleichen (id-basiert)
    const seen=new Set();
    (d.enemies||[]).forEach(se=>{
      seen.add(se.id); let e=this.enemies.find(x=>x.id===se.id);
      if(!e){ e=this.spawnEnemyClient(se); }
      e._netTo=new THREE.Vector3(se.x,se.y,se.z); e.hp=se.hp;
      if(e.kind==='boss'){ this.boss=e; $('boss-bar').classList.remove('hidden'); }
    });
    this.enemies.filter(e=>!seen.has(e.id)).forEach(e=>{ this.scene.remove(e.mesh); });
    this.enemies=this.enemies.filter(e=>seen.has(e.id));
    this.updateObjective();
  }
  applyEstates(list){
    (list||[]).forEach(s=>{ const e=this.enemies.find(x=>x.id===s.id); if(e){ e._netTo=new THREE.Vector3(s.x,s.y,s.z); e.hp=s.hp; e.atkAnim=s.a||0; } });
  }
  spawnEnemyClient(se){
    const e=this.spawnEnemy(se.kind,se.x,se.z); e.id=se.id; this.enemySeq=Math.max(this.enemySeq,se.id+1); return e;
  }
  sendChat(text){
    if(!text.trim()) return;
    const name=this.me?this.me.name:'Ich';
    this.chat(name,text);
    if(this.role!=='solo') this.net.broadcast('chat',{text,name});
  }

  // ---------- Kampf-Aktionen ----------
  attack(){
    const m=this.me; if(!m||this.state!=='playing'||m.down) return;
    if(m.atkCd>0||m.dodgeT>0) return;
    m.atkCd=0.42; m.combo=(m.combo+1)%3; m.comboT=1.2; m.atkAnim=1;
    this.sfx.swing();
    const range=m.driveOn?4.2:3.4;
    const dmg=(14+m.combo*7)*m.def.power*(m.driveOn?1.6:1);
    let hitAny=false;
    // Ziel: Lock-On oder alles vor mir
    for(const e of this.enemies){
      if(e.dead) continue;
      const d=e.pos.clone().sub(m.pos); d.y=0; const dist=d.length();
      if(dist>range) continue;
      const ang=Math.abs(this.angDiff(Math.atan2(d.x,d.z),m.yaw));
      if(ang>1.2&&this.lockTarget!==e) continue;
      hitAny=true;
      if(this.role==='client'){ this.net.broadcast('hit',{id:e.id,dmg:Math.round(dmg)}); this.hitFlash(e); }
      else this.damageEnemy(e,dmg,m);
    }
    if(!hitAny){ /* Luft-Schwung */ }
    this.burst(m.pos.clone().add(new THREE.Vector3(0,1.5,0)),m.def.color,6,3);
    if(this.role!=='solo') this.net.broadcast('pstate',this.myPstate(true));
  }
  angDiff(a,b){ let d=a-b; while(d>Math.PI)d-=Math.PI*2; while(d<-Math.PI)d+=Math.PI*2; return d; }

  damageEnemy(e,dmg,from){
    if(e.dead) return;
    e.hp-=dmg; e.hurtT=0.25; this.hitFlash(e); this.sfx.hit();
    this.burst(e.pos.clone().add(new THREE.Vector3(0,1.6,0)),0xffe14d,8,4);
    if(from===this.me){ this.lumen+=2; this.me.drive=Math.min(100,this.me.drive+dmg*0.35); }
    if(e.hp<=0){
      e.dead=true; e.deadT=0.6; this.sfx.blip(90,0.4,'sawtooth',0.15,-40);
      this.burst(e.pos.clone().add(new THREE.Vector3(0,1.2,0)),0x7ad7ff,22,6);
      this.dropOrbs(e);
      if(e.kind==='boss'){ this.boss=null; $('boss-bar').classList.add('hidden'); this.toast('👑 SCHATTENLORD besiegt! +150 Lumen'); this.lumen+=150; if(from)from.drive=100; }
      this.updateObjective();
      if(this.role==='host') this.checkWaveEnd();
      else if(this.role==='solo') this.checkWaveEnd();
    }
    this.updateObjective();
  }
  checkWaveEnd(){
    if(this.enemies.some(e=>!e.dead)) return;
    this.waveActive=false;
    // heilen zwischen Wellen
    this.players.forEach(p=>{ if(!p.down){ p.hp=Math.min(p.maxhp,p.hp+25); p.mp=Math.min(p.maxmp,p.mp+30);} });
    this.toast('Welle '+this.wave+' geschafft! +Heilung ✨');
    setTimeout(()=>{ if(this.state==='playing'&&this.role!=='client') this.startWave(this.wave+1); }, 2600);
  }

  castMagic(){
    const m=this.me; if(!m||this.state!=='playing'||m.down||m.castCd>0) return;
    const mg=MAGICS[this.magicIndex];
    if(m.mp<mg.cost){ this.toast('Nicht genug MP für '+mg.name+'!'); return; }
    m.mp-=mg.cost; m.castCd=0.9; m.atkAnim=0.8;
    if(this.role==='client') this.net.broadcast('cast',{magic:mg.id});
    this.spawnShot(mg.id,m,this.lockTarget);
    if(mg.id==='fire') this.sfx.fire(); else if(mg.id==='ice') this.sfx.ice(); else if(mg.id==='bolt') this.sfx.bolt(); else this.sfx.cure();
  }
  spawnShot(id,from,target){
    const mg=MAGICS.find(m=>m.id===id);
    if(id==='cure'){
      this.players.forEach(p=>{ if(p.pos.distanceTo(from.pos)<14){ p.hp=Math.min(p.maxhp,p.hp+(-mg.dmg)); p.down=false; } });
      this.burst(from.pos.clone().add(new THREE.Vector3(0,1.5,0)),0x7dff9a,26,5);
      this.toast('💚 Vita! Gruppe geheilt.');
      return;
    }
    const mesh=new THREE.Mesh(new THREE.SphereGeometry(id==='bolt'?0.22:0.32,12,10),
      new THREE.MeshBasicMaterial({color:mg.color}));
    const dir=new THREE.Vector3(Math.sin(from.yaw),0,Math.cos(from.yaw));
    mesh.position.copy(from.pos).add(new THREE.Vector3(dir.x,1.6,dir.z));
    this.scene.add(mesh);
    this.shots.push({mesh,id,mg,from,vel:dir.multiplyScalar(id==='ice'?16:20),life:1.6,hitR:id==='bolt'?2.6:1.4});
  }

  selectMagic(i){ this.magicIndex=i; this.sfx.ui(); this.buildCmdMenu(); }
  moveCmd(d){
    if(this.magicOpen){ this.magicIndex=(this.magicIndex+d+4)%4; }
    else this.cmdIndex=(this.cmdIndex+d+4)%4;
    this.sfx.ui(); this.buildCmdMenu();
  }
  execCmd(){
    const cmds=['attack','magic','drive','item'];
    if(this.magicOpen){ this.magicOpen=false; this.castMagic(); }
    else{
      const c=cmds[this.cmdIndex];
      if(c==='attack') this.attack();
      if(c==='magic'){ this.magicOpen=true; }
      if(c==='drive') this.tryDrive();
      if(c==='item') this.interact();
    }
    this.buildCmdMenu();
  }
  tryDrive(){
    const m=this.me; if(!m||m.driveOn||m.drive<100){ if(m&&m.drive<100) this.toast('Drive-Leiste lädt: '+Math.floor(m.drive)+'%'); return; }
    m.driveOn=true; m.driveT=15; m.drive=0; this.sfx.drive();
    this.toast('🔥 DRIVE-FORM! 15s verstärkt!');
    this.burst(m.pos,0xffd76a,40,7);
  }
  interact(){
    const m=this.me; if(!m) return;
    // Gefallene Partner wiederbeleben / HP-Orb einsammeln per Nähe
    const mate=this.players.find(p=>p!==m&&p.down&&p.pos.distanceTo(m.pos)<4);
    if(mate){ mate.down=false; mate.hp=mate.maxhp*0.5; this.toast('💛 '+mate.name+' wiederbelebt!'); this.sfx.cure(); return; }
    const orb=this.orbs.find(o=>o.mesh.position.distanceTo(m.pos)<4);
    if(orb){ this.collectOrb(m,orb); return; }
    // Sonst kleiner Heal für 20 Lumen
    if(this.lumen>=20&&m.hp<m.maxhp){ this.lumen-=20; m.hp=Math.min(m.maxhp,m.hp+30); this.toast('🧪 Trank benutzt (-20 💠)'); this.sfx.cure(); }
    else this.toast('E: Nahe Partner/Orbs nutzen · sonst Trank (20 💠)');
  }
  jump(){
    const m=this.me;
    if(!m||m.down||this.state!=='playing') return;
    if(m.grounded){ m.vy=7.5; m.grounded=false; m.jump=1; this.sfx.blip(300,0.12,'sine',0.06,200); }
  }
  dodge(){
    const m=this.me; if(!m||m.dodgeCd>0||m.down) return;
    m.dodgeT=0.38; m.dodgeCd=0.9;
    const f=this.moveDir(); m.vel.add(f.multiplyScalar(14)); this.sfx.swing();
  }
  toggleLock(){
    if(this.lockTarget){ this.lockTarget=null; this.toast('Lock-On gelöst'); return; }
    let best=null,bd=30;
    for(const e of this.enemies){ if(e.dead) continue; const d=e.pos.distanceTo(this.me.pos); if(d<bd){bd=d;best=e;} }
    if(best){ this.lockTarget=best; this.toast('🎯 Lock-On: '+(best.kind==='boss'?'SCHATTENLORD':'Schatten')); }
  }
  pause(){
    if(this.state==='playing'){ this.state='paused'; this.keys={}; $('pause-menu').classList.remove('hidden'); document.exitPointerLock?.(); }
    else if(this.state==='paused'){ this.state='playing'; $('pause-menu').classList.add('hidden'); }
  }

  // ---------- Orbs / Partikel ----------
  dropOrbs(e){
    const n=e.kind==='boss'?12:e.kind==='brute'?5:3;
    for(let i=0;i<n;i++){
      const kind=Math.random()<0.22?'hp':'lumen';
      const mesh=new THREE.Mesh(new THREE.IcosahedronGeometry(0.22,0),
        new THREE.MeshStandardMaterial({color:0x111111,emissive:kind==='hp'?0x51ff7a:0x4dd7ff,emissiveIntensity:2}));
      mesh.position.copy(e.pos).add(new THREE.Vector3((Math.random()-0.5)*3,0.6,(Math.random()-0.5)*3));
      this.scene.add(mesh);
      this.orbs.push({mesh,kind,ph:Math.random()*6});
    }
    if(this.role==='host') this.orbs=this.orbs.slice(-60);
  }
  collectOrb(p,o){
    if(o.kind==='lumen'){ if(p===this.me){ this.lumen+=5; this.me.drive=Math.min(100,this.me.drive+3);} this.sfx.pickup(); }
    else { p.hp=Math.min(p.maxhp,p.hp+18); if(p===this.me) this.toast('+18 HP'); this.sfx.cure(); }
    this.scene.remove(o.mesh); this.orbs.splice(this.orbs.indexOf(o),1);
    this.burst(o.mesh.position,0xffffff,6,2.5);
  }
  burst(p,color,n=10,power=4){
    for(let i=0;i<n;i++){
      const m=new THREE.Mesh(new THREE.SphereGeometry(0.09,6,5),new THREE.MeshBasicMaterial({color,transparent:true,opacity:0.95}));
      m.position.copy(p);
      this.scene.add(m);
      this.particles.push({mesh:m,vel:new THREE.Vector3((Math.random()-0.5)*power,Math.random()*power,(Math.random()-0.5)*power),life:0.5+Math.random()*0.4});
    }
  }
  hitFlash(e){ e.hurtT=0.22; }

  // ---------- Frames / Menü ----------
  buildPartyFrames(){
    const w=$('party-frames'); w.innerHTML='';
    this.players.forEach((p,i)=>{
      const d=document.createElement('div'); d.className='pframe'+(p.isMe?' me':'');
      d.innerHTML='<div class="pname"><span></span><span class="lvl"></span></div><div class="bar"><div class="hp"></div></div><div class="bar"><div class="mp"></div></div>';
      d.querySelector('.pname span').textContent=(p.isMe?'▶ ':'')+p.name+(p.down?' 💀':'');
      d.querySelector('.lvl').textContent='W'+Math.max(1,this.wave)+' 💠'+(p.isMe?this.lumen:'');
      d.querySelector('.hp').style.width=(100*Math.max(0,p.hp)/p.maxhp)+'%';
      d.querySelector('.mp').style.width=(100*Math.max(0,p.mp)/p.maxmp)+'%';
      if(p.down) d.querySelector('.hp').style.width='2%';
      w.appendChild(d);
    });
  }
  buildCmdMenu(){
    const cmds=[['⚔ Angriff','attack'],['✨ Magie','magic'],['🔥 Drive','drive'],['🧪 Item','item']];
    const list=$('cmd-list'); list.innerHTML='';
    cmds.forEach(([label,id],i)=>{
      const d=document.createElement('div'); d.className='cmd'+(i===this.cmdIndex&&!this.magicOpen?' active':'');
      d.textContent=label+(id==='drive'&&this.me?(this.me.driveOn?' ON':' '+Math.floor(this.me.drive)+'%'):'');
      d.onclick=()=>{ this.cmdIndex=i; this.magicOpen=(id==='magic'); this.execCmd(); };
      list.appendChild(d);
    });
    const ml=$('magic-list'); ml.classList.toggle('hidden',!this.magicOpen); ml.innerHTML='';
    MAGICS.forEach((m,i)=>{
      const d=document.createElement('div'); d.className='cmd'+(i===this.magicIndex?' active':'');
      d.textContent=(i===this.magicIndex?'▸ ':'')+m.name+' ('+m.cost+' MP) — '+m.desc;
      d.onclick=()=>{ this.magicIndex=i; this.magicOpen=false; this.castMagic(); this.buildCmdMenu(); };
      ml.appendChild(d);
    });
  }

  // ---------- Update ----------
  moveDir(){
    const m=this.me; const f=new THREE.Vector3();
    let x=0,z=0;
    if(this.keys['KeyW'])z+=1; if(this.keys['KeyS'])z-=1; if(this.keys['KeyA'])x-=1; if(this.keys['KeyD'])x+=1;
    if(this.gpMove){ x+=this.gpMove.x; z-=this.gpMove.y; }
    if(x||z){
      const yaw=this.camYaw;
      f.set(x*Math.cos(yaw)+z*Math.sin(yaw),0,-x*Math.sin(yaw)+z*Math.cos(yaw)).normalize();
    }
    return f;
  }

  myPstate(atk=false){
    const m=this.me;
    return { p:[+m.pos.x.toFixed(2),+m.pos.y.toFixed(2),+m.pos.z.toFixed(2)], ry:+m.yaw.toFixed(3),
      hp:Math.ceil(m.hp), mp:Math.ceil(m.mp), atk:atk?1:0, drive:m.driveOn?1:0, down:m.down?1:0, charId:m.charId, name:m.name };
  }

  update(dt){
    this.time+=dt;
    this.pollGamepad();
    if(this.state!=='playing'){ this.renderer.render(this.scene,this.camera); return; }
    const m=this.me;
    // --- lokaler Spieler ---
    if(m&&!m.down){
      const dir=this.moveDir();
      const sp=m.def.speed*(m.driveOn?1.3:1)*(m.block?0.4:1);
      m.pos.x+=dir.x*sp*dt; m.pos.z+=dir.z*sp*dt;
      const R=Math.hypot(m.pos.x,m.pos.z);
      if(R>58){ m.pos.x*=58/R; m.pos.z*=58/R; }
      if(dir.lengthSq()>0.01){ m.yaw=Math.atan2(dir.x,dir.z); m.walkPh+=dt*11; }
      // Sprung/Gravitation (nur mit Bodenkontakt; kein Nachspringen in der Luft)
      if(!m.grounded||m.vy!==0){
        m.pos.y+=m.vy*dt; m.vy-=22*dt;
        if(m.pos.y<=0){ m.pos.y=0; m.vy=0; m.jump=0; m.grounded=true; }
        if(m.pos.y>25){ m.pos.y=25; m.vy=Math.min(m.vy,0); } // Sicherheits-Clamp
      }
      // Dodge
      if(this.keys['ShiftLeft']||this.keys['ShiftRight']) this.dodge();
      if(m.dodgeT>0){ m.dodgeT-=dt; const d=new THREE.Vector3(Math.sin(m.yaw),0,Math.cos(m.yaw)); m.pos.addScaledVector(d,10*dt); }
      // Cooldowns
      m.atkCd=Math.max(0,m.atkCd-dt); m.castCd=Math.max(0,m.castCd-dt); m.dodgeCd=Math.max(0,m.dodgeCd-dt); m.hurtT=Math.max(0,m.hurtT-dt);
      m.atkAnim=Math.max(0,(m.atkAnim||0)-dt*2.4); m.comboT-=dt; if(m.comboT<=0) m.combo=0;
      m.mp=Math.min(m.maxmp,m.mp+m.mpRegen*dt*(m.block?0.5:1));
      if(m.driveOn){ m.driveT-=dt; if(m.driveT<=0){ m.driveOn=false; this.toast('Drive-Form endet.'); } }
      // Space
      if(this.keys['Space']){ this.keys['Space']=false; this.jump(); }
      // Lock-On-Kamera
      if(this.lockTarget&&(this.lockTarget.dead)){ this.lockTarget=null; }
      if(this.lockTarget){ const d=this.lockTarget.pos.clone().sub(m.pos); this.camYaw=this.dampAngle(this.camYaw,Math.atan2(-d.x,-d.z)+Math.PI,8,dt); }
    }
    // --- Kamera ---
    const cd=6.2, ch=2.6;
    const cx=m.pos.x-Math.sin(this.camYaw)*Math.cos(this.camPitch)*cd;
    const cz=m.pos.z-Math.cos(this.camYaw)*Math.cos(this.camPitch)*cd;
    const cy=m.pos.y+ch+Math.sin(this.camPitch)*cd;
    this.camera.position.lerp(new THREE.Vector3(cx,Math.max(1.2,cy),cz),1-Math.pow(0.0001,dt));
    this.camera.lookAt(m.pos.x,m.pos.y+1.8,m.pos.z);

    // --- KI-Partner ---
    for(const p of this.players){
      if(p===m||p.remoteId) continue;
      this.updateAI(p,dt);
    }
    // --- Remote-Interpolation ---
    for(const [,f] of this.remote){
      if(f._netTo){ f.pos.lerp(f._netTo,1-Math.pow(0.001,dt)); f.atkAnim=Math.max(0,(f.atkAnim||0)-dt*2); }
      this.animateFighter(f,dt);
    }
    // --- Gegner (nur Host/Solo simulieren) ---
    if(this.role!=='client'){
      for(const e of this.enemies) this.updateEnemy(e,dt);
      // Orbs einsammeln (jeder lokale/KI)
      for(const p of this.players){ if(p.remoteId||p.down) continue;
        for(let i=this.orbs.length-1;i>=0;i--){ const o=this.orbs[i];
          if(o.mesh.position.distanceTo(p.pos)<1.6) this.collectOrb(p,o); } }
      this.enemies=this.enemies.filter(e=>{ if(e.dead){ e.deadT-=dt; e.mesh.position.y-=dt*2; e.mesh.rotation.x+=dt*4; if(e.deadT<=0){ this.scene.remove(e.mesh); return false; } } return true; });
    } else {
      for(const e of this.enemies){ if(e._netTo) e.pos.lerp(e._netTo,1-Math.pow(0.002,dt)); e.atkAnim=Math.max(0,(e.atkAnim||0)-dt*2); this.animateEnemy(e,dt); }
    }
    // --- Schüsse ---
    for(let i=this.shots.length-1;i>=0;i--){
      const s=this.shots[i]; s.life-=dt;
      s.mesh.position.addScaledVector(s.vel,dt);
      s.mesh.rotation.y+=dt*6;
      let dead=s.life<=0;
      if(!dead&&this.role!=='client'){
        for(const e of this.enemies){ if(e.dead) continue;
          if(e.pos.distanceTo(s.mesh.position)<s.hitR+e.mesh.scale.x*0.8){
            if(s.id==='ice') e.slowT=3;
            this.damageEnemy(e,s.mg.dmg,s.from); dead=true; break; } }
        if(s.id==='bolt'&&!dead){ // Kette: zweiter Gegner in 8m
          const first=this.enemies.find(e=>!e.dead&&e.pos.distanceTo(s.mesh.position)<8);
          if(first&&Math.random()<0.06){ this.damageEnemy(first,Math.round(s.mg.dmg*0.6),s.from); this.burst(first.pos.clone().add(new THREE.Vector3(0,1.5,0)),0xffe14d,6,3); } }
      }
      if(s.mesh.position.length()>90) dead=true;
      if(dead){ this.burst(s.mesh.position,s.mg.color,8,3); this.scene.remove(s.mesh); this.shots.splice(i,1); }
    }
    // --- Partikel ---
    for(let i=this.particles.length-1;i>=0;i--){ const p=this.particles[i]; p.life-=dt;
      p.mesh.position.addScaledVector(p.vel,dt); p.vel.y-=9*dt; p.mesh.material.opacity=Math.max(0,p.life*2);
      if(p.life<=0){ this.scene.remove(p.mesh); this.particles.splice(i,1); } }
    // --- Orbs wobbeln ---
    for(const o of this.orbs){ o.ph+=dt*3; o.mesh.position.y=0.6+Math.sin(o.ph)*0.2; o.mesh.rotation.y+=dt*2; }
    // --- Animationen ---
    this.animateFighter(m,dt);
    for(const p of this.players){ if(p!==m&&!p.remoteId) this.animateFighter(p,dt); }
    if(this.role!=='client') for(const e of this.enemies) this.animateEnemy(e,dt);

    // --- Boss-Leiste / HUD ---
    if(this.boss&&!this.boss.dead) $('boss-fill').style.width=(100*this.boss.hp/this.boss.maxhp)+'%';
    $('drive-fill').style.width=(m.driveOn?100*m.driveT/15:m.drive)+'%';
    this.hudTimer=(this.hudTimer||0)+dt; if(this.hudTimer>0.25){ this.hudTimer=0; this.buildPartyFrames(); this.updateObjective(); }

    // --- Tod / Game Over ---
    if(m.hp<=0&&!m.down){
      if(this.players.some(p=>p!==m&&!p.down)){ m.down=true; m.hp=0; this.toast('💀 Besiegt! Ein Partner muss dich mit E wiederbeleben!'); this.sfx.hurt();
        if(this.role!=='solo') this.net.broadcast('down',{});
      } else this.gameOver(false);
    }
    // Sieg-Bedingung: Welle 10 geschafft
    if(this.wave>=10&&!this.waveActive&&this.enemies.length===0&&this.role!=='client'){ this.gameOver(true); }

    // --- Netzwerk-Ticks ---
    if(this.role!=='solo'){
      this.pstateTimer+=dt;
      if(this.pstateTimer>0.05){ this.pstateTimer=0; this.net.broadcast('pstate',this.myPstate()); }
      if(this.role==='host'){ this.snapTimer+=dt;
        if(this.snapTimer>0.35){ this.snapTimer=0;
          this.net.broadcast('estate',{list:this.enemies.filter(e=>!e.dead).slice(0,24).map(e=>({id:e.id,x:+e.pos.x.toFixed(1),y:+e.pos.y.toFixed(1),z:+e.pos.z.toFixed(1),hp:Math.ceil(e.hp),a:e.atkAnim?1:0}))});
          this.updateMpCount(); } }
    }
    this.renderer.render(this.scene,this.camera);
  }

  dampAngle(a,b,l,dt){ let d=b-a; while(d>Math.PI)d-=Math.PI*2; while(d<-Math.PI)d+=Math.PI*2; return a+d*(1-Math.pow(0.001,l*dt/8)); }

  updateAI(p,dt){
    if(p.down) return;
    p.atkCd=Math.max(0,p.atkCd-dt); p.hurtT=Math.max(0,p.hurtT-dt); p.atkAnim=Math.max(0,(p.atkAnim||0)-dt*2);
    p.mp=Math.min(p.maxmp,p.mp+p.mpRegen*dt);
    // Ziel: nächster Gegner, sonst folge mir
    let t=null,bd=1e9;
    for(const e of this.enemies){ if(e.dead) continue; const d=e.pos.distanceTo(p.pos); if(d<bd){bd=d;t=e;} }
    const anchor=this.me.pos;
    if(t&&bd<26){
      const d=t.pos.clone().sub(p.pos); d.y=0; const dist=d.length();
      if(dist>2.6){ d.normalize(); p.pos.addScaledVector(d,p.def.speed*dt); p.yaw=Math.atan2(d.x,d.z); p.walkPh+=dt*11; }
      else { p.yaw=Math.atan2(d.x,d.z);
        if(p.atkCd<=0){ p.atkCd=0.9+Math.random()*0.5; p.atkAnim=1; this.sfx.swing();
          if(this.role!=='client') this.damageEnemy(t,(10+Math.random()*10)*p.def.power,p); } }
    } else {
      const want=anchor.clone().add(new THREE.Vector3(p===this.players[1]?-2.5:2.5,0,-2));
      const d=want.sub(p.pos); d.y=0;
      if(d.length()>1){ d.normalize(); p.pos.addScaledVector(d,p.def.speed*0.9*dt); p.yaw=Math.atan2(d.x,d.z); p.walkPh+=dt*10; }
      // Heile mich, wenn kritisch
      if(this.me.hp<this.me.maxhp*0.35&&p.mp>25&&Math.random()<dt*0.5){ p.mp-=25; this.me.hp=Math.min(this.me.maxhp,this.me.hp+35); this.burst(this.me.pos.clone().add(new THREE.Vector3(0,1.5,0)),0x7dff9a,14,4); this.chat(p.name,'Vita!'); }
    }
    p.mesh.rotation.y=p.yaw;
  }

  updateEnemy(e,dt){
    if(e.dead) return;
    e.atkCd=Math.max(0,e.atkCd-dt); e.hurtT=Math.max(0,e.hurtT-dt); e.atkAnim=Math.max(0,(e.atkAnim||0)-dt*2); e.slowT=Math.max(0,(e.slowT||0)-dt);
    // Ziel: nächster lebender Spieler
    let t=null,bd=1e9;
    for(const p of this.players){ if(p.down) continue; const d=p.pos.distanceTo(e.pos); if(d<bd){bd=d;t=p;} }
    if(!t) return;
    e.target=t;
    const sp=e.speed*(e.slowT>0?0.45:1);
    const d=t.pos.clone().sub(e.pos); d.y=0; const dist=d.length();
    const reach=e.kind==='boss'?4.2:2.4;
    if(dist>reach){ d.normalize(); e.pos.addScaledVector(d,sp*dt); e.mesh.rotation.y=Math.atan2(d.x,d.z); e.walkPh=(e.walkPh||0)+dt*9; }
    else { e.mesh.rotation.y=Math.atan2(d.x,d.z);
      if(e.atkCd<=0){ e.atkCd=(e.kind==='boss'?1.4:1.9)+Math.random()*0.6; e.atkAnim=1;
        setTimeout(()=>{ if(e.dead||this.state!=='playing') return;
          const dd=t.pos.distanceTo(e.pos);
          if(dd<reach+1.2&&!t.down){
            if(t.dodgeT>0||t===this.me&&(this.keys['KeyQ'])||t.block){ this.burst(t.pos.clone().add(new THREE.Vector3(0,1.5,0)),0x7ad7ff,8,3); }
            else { t.hp-=e.dmg*(t.driveOn?0.6:1); t.hurtT=0.3; this.sfx.hurt();
              this.burst(t.pos.clone().add(new THREE.Vector3(0,1.5,0)),0xff4d6a,10,4);
              if(t===this.me) this.toast('💥 -'+e.dmg+' HP'); }
          }
        },380); } }
  }

  animateFighter(f,dt){
    const u=f.mesh.userData; if(!u) return;
    const w=Math.sin((f.walkPh||0))*0.5;
    const moving=this.moveDir&&f.isMe?(this.keys['KeyW']||this.keys['KeyA']||this.keys['KeyS']||this.keys['KeyD']||this.gpMove):(f._moving||Math.random()<0);
    u.legL.rotation.x=w*0.8; u.legR.rotation.x=-w*0.8;
    u.armL.rotation.x=-w*0.6;
    const atk=f.atkAnim||0;
    u.armR.rotation.x=-atk*2.4 - 0.2;
    u.kb.rotation.x=0.4-atk*1.8; u.kb.rotation.z=Math.sin(this.time*2+u.walk)*0.08;
    f.mesh.rotation.y=f.yaw||f.mesh.rotation.y;
    // HINWEIS: pos === mesh.position (gleiches Objekt!). Das Lauf-Hüpfen darf
    // daher nicht einfach addiert werden (würde jeden Frame wachsen = Schweben),
    // sondern altes Offset erst abziehen, neues drauf.
    const bob=f.jump?0:Math.abs(Math.sin((f.walkPh||0)))*0.05;
    f.mesh.position.y=f.pos.y-(u.bob||0)+bob; u.bob=bob;
    // Drive-Glow
    const glow=f.driveOn?1.6+Math.sin(this.time*10)*0.6:(f.hurtT>0?2.2:0.7);
    u.torso.material.emissive=new THREE.Color(f.def.color); u.torso.material.emissiveIntensity=f.driveOn?0.45:(f.hurtT>0?0.6:0.06);
    if(f.down){ f.mesh.rotation.x=-1.2; } else f.mesh.rotation.x=0;
  }
  animateEnemy(e,dt){
    const u=e.mesh.userData; if(!u) return;
    const w=Math.sin((e.walkPh||0))*0.6;
    u.legL.rotation.x=w; u.legR.rotation.x=-w;
    u.armL.rotation.x=-w; u.armR.rotation.x=-(e.atkAnim||0)*2.2;
    u.kb.visible=false;
    const ebob=Math.sin(this.time*3+e.id)*0.08;
    e.mesh.position.y=e.pos.y-(u.ebob||0)+ebob; u.ebob=ebob;
    const s=e.mesh.scale.x; e.mesh.scale.setScalar(s); // keep
    if(e.hurtT>0){ e.mesh.traverse?.(o=>{}); }
  }

  gameOver(win){
    this.state='over'; document.exitPointerLock?.();
    $('gameover').classList.remove('hidden');
    $('gameover-title').textContent=win?'🌟 Dusk gerettet!':'💔 Besiegt…';
    $('gameover-sub').textContent=win?('Welle 10 geschafft! Lumen: '+this.lumen+' — Danke fürs Spielen!') : ('Welle '+this.wave+' · Lumen: '+this.lumen+' · Tipp: Ausweichen (Shift), Blocken (Q), Vita (4+K).');
    this.sfx.stopPad();
  }

  quitToTitle(){
    this.state='title'; this.net.destroy();
    $('hud').classList.add('hidden'); $('gameover').classList.add('hidden'); $('pause-menu').classList.add('hidden');
    $('title-screen').classList.remove('hidden'); $('mp-badge').classList.add('hidden'); $('boss-bar').classList.add('hidden');
    $('host-code-box').classList.add('hidden');
    this.role='solo'; this.net=new Net(this); this.net.onStatus=(s)=>{ $('mp-status').textContent=s; };
    location.hash='';
  }

  loop(){
    const step=()=>{ requestAnimationFrame(step); const dt=Math.min(0.05,this.clock.getDelta()||0.016); try{ this.update(dt); }catch(err){ console.error(err); } };
    step();
  }
}
