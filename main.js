import * as THREE from 'three';

// ============ DEVIL WALKER: STYLISH PEACE OPERATION (DMC5 x MGS Peace Walker) ============
const $=id=>document.getElementById(id);
const canvas=$('game'), hud=$('hud'), menu=$('menu'), baseUI=$('base'), pauseUI=$('pause'), endUI=$('end');
$('loadstatus').textContent='Three.js r160 geladen ✓ — bereit.';

// ---------- Audio (prozedural, kein Asset nötig) ----------
let AC=null, muted=false, musicTimer=null;
function audio(){ if(!AC){ try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){} } if(AC&&AC.state==='suspended')AC.resume(); return AC; }
function beep(f=440,d=0.08,type='square',v=0.12,slide=0){ if(muted)return; const ac=audio(); if(!ac)return;
  const o=ac.createOscillator(),g=ac.createGain(); o.type=type;o.frequency.value=f;
  if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(30,f+slide),ac.currentTime+d);
  g.gain.value=v; g.gain.exponentialRampToValueAtTime(0.0001,ac.currentTime+d);
  o.connect(g).connect(ac.destination); o.start();o.stop(ac.currentTime+d); }
function noise(d=0.15,v=0.2,lp=2000){ if(muted)return; const ac=audio(); if(!ac)return;
  const b=ac.createBuffer(1,ac.sampleRate*d,ac.sampleRate),ch=b.getChannelData(0);
  for(let i=0;i<ch.length;i++)ch[i]=(Math.random()*2-1)*(1-i/ch.length);
  const s=ac.createBufferSource();s.buffer=b;const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=lp;
  const g=ac.createGain();g.gain.value=v;s.connect(f).connect(g).connect(ac.destination);s.start(); }
const SFX={ swing(){noise(0.12,0.25,4000);beep(300,0.08,'sawtooth',0.06,-200);}, hit(){noise(0.1,0.35,1500);beep(140,0.1,'square',0.15,-60);},
  shoot(){beep(900,0.07,'square',0.12,-600);noise(0.08,0.2,5000);}, zzz(){beep(500,0.15,'sine',0.1,-300);},
  alarm(){beep(660,0.25,'square',0.14);setTimeout(()=>beep(440,0.25,'square',0.14),260);},
  fulton(){beep(300,0.4,'sine',0.14,500);}, hack(){beep(1200,0.06,'square',0.08);}, dash(){noise(0.18,0.15,800);},
  dt(){beep(80,0.6,'sawtooth',0.2,400);noise(0.5,0.2,900);}, hurt(){beep(200,0.2,'sawtooth',0.2,-120);}, die(){beep(400,0.5,'sawtooth',0.15,-350);},
  launch(){beep(200,0.25,'sawtooth',0.15,600);} };
function startMusic(){ if(musicTimer||muted)return; const bass=[110,110,130,98,110,110,146,130];
  let i=0; musicTimer=setInterval(()=>{ if(muted||G.state!=='play')return; beep(bass[i%bass.length],0.22,'triangle',0.05);
    if(i%2===0)noise(0.05,0.05,6000); i++; },300); }

// ---------- Game State ----------
const G={ state:'menu', time:0, timeScale:1, hitstop:0,
  hp:100, maxhp:100, dt:0, dtActive:0, dtLen:12, dmgMul:1,
  style:0, styleHeat:0, combo:0, comboT:0, maxRankI:0,
  camo:20, crouch:false, box:false, weapon:'lethal', sprint:false,
  fultonN:3, fultonMax:3, staff:0, gmp:200, hacks:0, fultons:0, kills:0,
  phase:'INFILTRATION', alarmT:0, mission:0, bossSpawned:false, opsT:0,
  yaw:0.6, pitch:-0.25, dist:6, shake:0, muted:false, startTime:0, dmgTaken:0 };
const RANKS=[{n:'D',w:'Dismal',at:0},{n:'C',w:'Crazy',at:300},{n:'B',w:'Badass',at:800},{n:'A',w:'Apocalyptic',at:1500},{n:'S',w:'Savage',at:2500},{n:'SS',w:'Sick Skills',at:4000},{n:'SSS',w:'Smokin Sexy Style',at:6000}];
function rankOf(s){ let r=0; RANKS.forEach((x,i)=>{if(s>=x.at)r=i;}); return r; }

// ---------- Three.js Setup ----------
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setSize(innerWidth,innerHeight); renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFShadowMap;
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x0a1420); scene.fog=new THREE.Fog(0x0a1420,30,130);
const camera=new THREE.PerspectiveCamera(62,innerWidth/innerHeight,0.1,400);
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
scene.add(new THREE.HemisphereLight(0x8fb8ff,0x1a2a1a,1.25));
scene.add(new THREE.AmbientLight(0x334455,0.5));
const sun=new THREE.DirectionalLight(0xffe8c0,1.6); sun.position.set(30,50,20); sun.castShadow=true;
sun.shadow.mapSize.set(1024,1024); sun.shadow.camera.left=-70;sun.shadow.camera.right=70;sun.shadow.camera.top=70;sun.shadow.camera.bottom=-70;
scene.add(sun);
const moon=new THREE.DirectionalLight(0x5a189a,0.5); moon.position.set(-20,30,-30); scene.add(moon);

// Boden + Deko
const obstacles=[]; // {mesh,minX,maxX,minZ,maxZ} für Kollision + Sicht
const deco=[];
function solid(mesh,hx,hz){ mesh.updateMatrixWorld(); const p=new THREE.Vector3(); mesh.getWorldPosition(p);
  obstacles.push({mesh,minX:p.x-hx,maxX:p.x+hx,minZ:p.z-hz,maxZ:p.z+hz}); return mesh; }
{
  const gnd=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({color:0x1d3a24,roughness:1}));
  gnd.rotation.x=-Math.PI/2; gnd.receiveShadow=true; scene.add(gnd);
  // Wege
  const road=new THREE.Mesh(new THREE.PlaneGeometry(220,10),new THREE.MeshStandardMaterial({color:0x3a3a35,roughness:1}));
  road.rotation.x=-Math.PI/2; road.position.y=0.02; scene.add(road);
  const road2=road.clone(); road2.rotation.z=Math.PI/2; scene.add(road2);
  // Dschungel-Bäume
  const trunkM=new THREE.MeshStandardMaterial({color:0x4a3728}), leafM=new THREE.MeshStandardMaterial({color:0x2d6a4f});
  for(let i=0;i<70;i++){ const x=(Math.random()-0.5)*190,z=(Math.random()-0.5)*190;
    if(Math.abs(x)<14||Math.abs(z)<14)continue;
    const t=new THREE.Group(); const trunk=new THREE.Mesh(new THREE.CylinderGeometry(0.25,0.4,4,6),trunkM);
    trunk.position.y=2;trunk.castShadow=true; t.add(trunk);
    for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(2.2-k*0.5,2.5,7),leafM);c.position.y=4.5+k*1.4;c.castShadow=true;t.add(c);}
    t.position.set(x,0,z); const s=0.7+Math.random()*0.9; t.scale.setScalar(s); scene.add(t); }
  const wallM=new THREE.MeshStandardMaterial({color:0x6c757d,roughness:0.9});
  const darkM=new THREE.MeshStandardMaterial({color:0x2b2d42,roughness:0.8});
  function wall(x,z,w,d,h=4,gap=false){ if(gap&&w>d){ // Tor in der Mitte (8m breit)
      const seg=(w-8)/2, cx=w/4+2;
      for(const s of [-1,1]){const m=new THREE.Mesh(new THREE.BoxGeometry(seg,h,d),wallM);
        m.position.set(x+s*cx,h/2,z);m.castShadow=m.receiveShadow=true;scene.add(m);solid(m,seg/2,d/2);}
      // Torbogen-Deko
      const arch=new THREE.Mesh(new THREE.BoxGeometry(9,1,3),darkM);arch.position.set(x,h+0.5,z);scene.add(arch);
      return arch; }
    const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),wallM);m.position.set(x,h/2,z);m.castShadow=m.receiveShadow=true;scene.add(m);solid(m,w/2,d/2);return m;}
  wall(0,-32,60,2,true); wall(0,32,60,2,true); wall(-32,0,2,60); wall(32,0,2,60);
  wall(-12,-12,8,2,5); wall(12,10,8,2,5); wall(10,-14,2,10,5);
  // Säulen
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const m=new THREE.Mesh(new THREE.CylinderGeometry(0.8,1,9,8),darkM);
    m.position.set(Math.cos(a)*24,4.5,Math.sin(a)*24);m.castShadow=true;scene.add(m);solid(m,1,1);}
  // Wachtürme
  for(const [x,z] of [[-20,-20],[20,-20],[-20,20],[20,20]]){
    const tw=new THREE.Group(); const legs=new THREE.Mesh(new THREE.BoxGeometry(3,8,3),new THREE.MeshStandardMaterial({color:0x5c4a36}));
    legs.position.y=4;legs.castShadow=true;tw.add(legs);
    const top=new THREE.Mesh(new THREE.BoxGeometry(5,1,5),darkM);top.position.y=8.5;tw.add(top);
    const roof=new THREE.Mesh(new THREE.ConeGeometry(4,2,4),new THREE.MeshStandardMaterial({color:0x7f1d1d}));roof.position.y=10;tw.add(roof);
    tw.position.set(x,0,z);scene.add(tw);solid(top,2,2);}
  // Dämonen-Kristalle (DMC-Flair)
  const cryM=new THREE.MeshStandardMaterial({color:0xff0a54,emissive:0x880022,emissiveIntensity:1});
  for(let i=0;i<10;i++){const c=new THREE.Mesh(new THREE.OctahedronGeometry(0.7),cryM);
    c.position.set((Math.random()-0.5)*50,1,(Math.random()-0.5)*50);scene.add(c);c.userData.spin=true;deco.push(c);}
}
// Terminals (Hack-Ziele)
const terminals=[];
{
  const m1=new THREE.MeshStandardMaterial({color:0x111111,emissive:0x00ffcc,emissiveIntensity:0.9});
  for(const [x,z] of [[-20,0],[18,-14],[0,22]]){
    const grp=new THREE.Group();
    const base=new THREE.Mesh(new THREE.BoxGeometry(1.6,2.2,0.8),new THREE.MeshStandardMaterial({color:0x222255}));
    base.position.y=1.1;base.castShadow=true;grp.add(base);
    const scr=new THREE.Mesh(new THREE.PlaneGeometry(1.2,0.9),m1.clone());scr.position.set(0,1.5,0.42);grp.add(scr);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(2.2,0.1,8,32),new THREE.MeshBasicMaterial({color:0x00ffcc}));
    ring.rotation.x=Math.PI/2;ring.position.y=0.1;grp.add(ring);
    grp.position.set(x,0,z);scene.add(grp);
    terminals.push({grp,scr,ring,hacked:false,pos:new THREE.Vector3(x,0,z),hackP:0});
  }
}
// Fackeln / Licht
for(const [x,z,c] of [[-24,0,0xff6600],[24,0,0x00ccff],[0,-24,0xff0a54]]){
  const l=new THREE.PointLight(c,20,30);l.position.set(x,4,z);scene.add(l);}

// ---------- Figuren-Factory ----------
function makeHumanoid(cBody,cHead,sword=true){
  const g=new THREE.Group();
  const body=new THREE.Mesh(new THREE.CapsuleGeometry(0.42,0.9,4,10),new THREE.MeshStandardMaterial({color:cBody,roughness:0.7}));
  body.position.y=1.15;body.castShadow=true;g.add(body);
  const head=new THREE.Mesh(new THREE.SphereGeometry(0.3,12,12),new THREE.MeshStandardMaterial({color:cHead}));
  head.position.y=2.15;head.castShadow=true;g.add(head);
  let sw=null;
  if(sword){ sw=new THREE.Mesh(new THREE.BoxGeometry(0.1,1.6,0.18),new THREE.MeshStandardMaterial({color:0xdddddd,metalness:0.8,roughness:0.2,emissive:0x222222}));
    sw.position.set(0.55,1.2,0.2);sw.rotation.z=-0.4;g.add(sw); }
  const gun=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.12,0.5),new THREE.MeshStandardMaterial({color:0x111111}));
  gun.position.set(-0.5,1.2,0.3);g.add(gun);
  return {g,body,head,sw}; }

// Spieler
const P={ pos:new THREE.Vector3(0,0,40), vel:new THREE.Vector3(), vy:0, grounded:true, jumps:0,
  atk:0, atkT:0, atkCD:0, shootCD:0, dashCD:0, dashT:0, iframes:0, hackHold:0, swingA:0, airTime:0, fultonAnim:null };
const pm=makeHumanoid(0x9d0208,0xffd6a5); scene.add(pm.g);
const coat=new THREE.Mesh(new THREE.BoxGeometry(0.9,1.1,0.15),new THREE.MeshStandardMaterial({color:0x370617}));
coat.position.set(0,0.9,-0.4); pm.g.add(coat);
const aura=new THREE.Mesh(new THREE.SphereGeometry(1.4,16,16),new THREE.MeshBasicMaterial({color:0xff0a54,transparent:true,opacity:0}));
aura.position.y=1.2; pm.g.add(aura);
// Pappkarton
const boxMesh=new THREE.Mesh(new THREE.BoxGeometry(1.1,1.1,1.1),new THREE.MeshStandardMaterial({color:0x9c6644}));
boxMesh.position.y=0.55;boxMesh.visible=false;pm.g.add(boxMesh);
// Schwert-Trail
const trail=new THREE.Mesh(new THREE.PlaneGeometry(2.6,0.5),new THREE.MeshBasicMaterial({color:0xffea00,transparent:true,opacity:0,side:THREE.DoubleSide}));
trail.position.set(0,1.4,0.8);pm.g.add(trail);

// Gegner
const enemies=[];
const ENEMY_TYPES=[
  {name:'Marionette',hp:70,spd:4.2,dmg:10,range:2.2,score:150,sight:20,col:0x3a506b},
  {name:'Schütze',hp:50,spd:3.2,dmg:7,range:16,score:180,sight:26,col:0x5c8001,ranged:true},
  {name:'Ravager',hp:140,spd:3.4,dmg:18,range:2.6,score:300,sight:18,col:0x6a040f,heavy:true}];
function spawnEnemy(type,x,z,patrol){
  const t=ENEMY_TYPES[type]; const m=makeHumanoid(t.col,0xdad7cd,type!==1);
  scene.add(m.g);
  const cone=new THREE.Mesh(new THREE.CircleGeometry(t.sight,20, -0.55,1.1),
    new THREE.MeshBasicMaterial({color:0xffee00,transparent:true,opacity:0.13,side:THREE.DoubleSide,depthWrite:false}));
  cone.rotation.x=-Math.PI/2;cone.position.y=0.05;m.g.add(cone);
  const e={type:ENEMY_TYPES[type],hp:t.hp,maxhp:t.hp,pos:new THREE.Vector3(x,0,z),m,cone,
    state:'patrol',wp:patrol||[[x,z],[x+8,z+6]],wpi:0,susp:0,lastSeen:null,atkCD:0,stun:0,maxstun:60,
    sleep:0,dead:false,deadT:0,fultonable:false,hitT:0,vx:0,vz:0,vy:0,y:0,face:0,shootT:0,fx:'!'};
  const tag=document.createElement('div');tag.className='etag';document.body.appendChild(tag);e.tag=tag;
  enemies.push(e);return e; }
function spawnWave(n,centerR=26){ for(let i=0;i<n;i++){ const a=Math.random()*Math.PI*2,r=8+Math.random()*centerR;
    const t=Math.random()<0.55?0:(Math.random()<0.6?1:2);
    spawnEnemy(t,Math.cos(a)*r,Math.sin(a)*r); } }
// Boss
let boss=null;
function spawnBoss(){ const m=makeHumanoid(0x212529,0xff0a54,false); m.g.scale.setScalar(2.6); scene.add(m.g);
  const gunL=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,2),new THREE.MeshStandardMaterial({color:0x333333}));
  gunL.position.set(1,1.5,0.5);m.g.add(gunL);
  boss={hp:1400,maxhp:1400,pos:new THREE.Vector3(0,0,-8),m,atkCD:0,mode:'chase',modeT:0,slamT:0,stun:0,face:0,dead:false};
  $('bossbar-wrap').classList.remove('hidden'); toast('☠ PEACE SENTINEL ERWACHT — ZERSTÖRE IHN!'); SFX.alarm(); }

// Partikel
const parts=[];
function burst(p,color,n=12,spd=6,up=5){ for(let i=0;i<n;i++){ const m=new THREE.Mesh(new THREE.BoxGeometry(0.15,0.15,0.15),
    new THREE.MeshBasicMaterial({color})); m.position.copy(p); m.position.y+=1; scene.add(m);
    parts.push({m,vx:(Math.random()-0.5)*spd,vy:Math.random()*up,vz:(Math.random()-0.5)*spd,life:0.6+Math.random()*0.4}); } }
function updateParts(dt){ for(let i=parts.length-1;i>=0;i--){ const p=parts[i]; p.life-=dt;
    p.vy-=18*dt; p.m.position.x+=p.vx*dt;p.m.position.y+=p.vy*dt;p.m.position.z+=p.vz*dt;
    p.m.rotation.x+=5*dt; if(p.life<=0||p.m.position.y<0){scene.remove(p.m);parts.splice(i,1);} } }
// Damage-Numbers (HTML)
function dmgNum(worldPos,txt,cls=''){ const v=worldPos.clone(); v.y+=2.2; v.project(camera);
  if(v.z>1)return; const d=document.createElement('div'); d.className='dmgnum '+cls; d.textContent=txt;
  d.style.left=((v.x*0.5+0.5)*innerWidth)+'px'; d.style.top=((-v.y*0.5+0.5)*innerHeight)+'px';
  $('dmgnums').appendChild(d); setTimeout(()=>d.remove(),800); }
function toast(t,ms=2600){ const el=$('mission-toast'); el.textContent=t; el.style.opacity=1;
  clearTimeout(el._t); el._t=setTimeout(()=>el.style.opacity=0,ms); }

// ---------- Input ----------
const keys={};
addEventListener('keydown',e=>{ if(e.code==='Tab')e.preventDefault(); keys[e.code]=true;
  if(G.state!=='play')return;
  if(e.code==='KeyC'){G.crouch=!G.crouch;G.box=false;beep(200,0.05,'square',0.06);}
  if(e.code==='KeyB'){G.box=!G.box;if(G.box)G.crouch=true;beep(150,0.08,'square',0.08);}
  if(e.code==='Digit1'){G.weapon='lethal';updWeapon();}
  if(e.code==='Digit2'){G.weapon='stun';updWeapon();}
  if(e.code==='KeyF')tryFulton();
  if(e.code==='KeyT')tryDT();
  if(e.code==='KeyE')P.atkLaunch=true;
  if(e.code==='Tab')openBase();
  if(e.code==='KeyP')togglePause();
  if(e.code==='KeyM'){muted=!muted;toast(muted?'🔇 TON AUS':'🔊 TON AN');}
  if(e.code==='Space'&&(P.grounded||P.jumps<2)){P.vy=P.grounded?8:7;P.grounded=false;P.jumps++;SFX.dash();}
});
addEventListener('keyup',e=>{keys[e.code]=false; if(e.code==='KeyE')P.atkLaunch=false;});
let mouseL=false,mouseR=false;
canvas.addEventListener('mousedown',e=>{ if(G.state==='play'){audio();startMusic();
    if(document.pointerLockElement!==canvas)canvas.requestPointerLock?.();
    if(e.button===0)mouseL=true; if(e.button===2)mouseR=true; }});
addEventListener('mouseup',e=>{if(e.button===0)mouseL=false;if(e.button===2)mouseR=false;});
addEventListener('contextmenu',e=>e.preventDefault());
addEventListener('mousemove',e=>{ if(document.pointerLockElement===canvas&&G.state==='play'){
  G.yaw-=e.movementX*0.0026; G.pitch-=e.movementY*0.0022; G.pitch=Math.max(-1.1,Math.min(0.5,G.pitch)); }});
function updWeapon(){$('weapon').textContent=(G.weapon==='lethal'?'KATANA · lethal':'TRANQ · betäubend')+' [1/2]';}
$('startBtn').onclick=()=>{ audio();startMusic(); menu.classList.add('hidden');hud.classList.remove('hidden');
  G.state='play';G.startTime=performance.now(); canvas.requestPointerLock?.();
  toast('OP 1: HACKE 3 TERMINALS — BLEIB UNGESEHEN'); };
$('restartBtn').onclick=()=>location.reload();
function togglePause(){ if(G.state==='play'){G.state='pause';pauseUI.classList.remove('hidden');document.exitPointerLock?.();}
  else if(G.state==='pause'){G.state='play';pauseUI.classList.add('hidden');} }
pauseUI.onclick=togglePause;
// Mother Base
function openBase(){ G.state='base'; baseUI.classList.remove('hidden'); document.exitPointerLock?.(); renderBase(); }
$('closeBase').onclick=()=>{ baseUI.classList.add('hidden'); G.state='play'; };
const SHOP=[{id:'hp',n:'❤ Max-HP +25',c:500,f:()=>{G.maxhp+=25;G.hp=G.maxhp;}},
  {id:'dmg',n:'⚔ Schaden +20%',c:750,f:()=>{G.dmgMul*=1.2;}},
  {id:'ful',n:'🎈 Fulton +2 (max)',c:300,f:()=>{G.fultonMax+=2;G.fultonN+=2;}},
  {id:'dt',n:'😈 Devil-Trigger +4s',c:600,f:()=>{G.dtLen+=4;}}];
const bought={};
function renderBase(){ $('base-gmp').textContent='· '+G.gmp+' GMP · '+G.staff+' Soldaten · Fulton '+G.fultonN+'/'+G.fultonMax;
  $('base-staff').innerHTML=G.staff===0?'Noch keine Rekruten — fultone betäubte Gegner mit <b>F</b>!':
    `👥 ${G.staff} Soldaten arbeiten in Outer Ops.<br>⏱ Verdienst: ${G.staff*8} GMP / 30s. Kills: ${G.kills} · Fultons: ${G.fultons}`;
  $('ops-log').innerHTML='<i>'+(G.opsLog||['Outer Ops bereit.']).slice(-3).join('<br>')+'</i>';
  $('shop').innerHTML=''; SHOP.forEach(s=>{ const d=document.createElement('div');d.className='shop-item';
    d.innerHTML=`<span>${s.n}<br><small>${s.c} GMP</small></span>`;
    const b=document.createElement('button');b.textContent=G.gmp>=s.c?'KAUFEN':'—';b.disabled=G.gmp<s.c;
    b.onclick=()=>{if(G.gmp>=s.c){G.gmp-=s.c;s.f();beep(800,0.15,'square',0.1,400);renderBase();}};d.appendChild(b);$('shop').appendChild(d);}); }

// ---------- Kampf ----------
const COMBO=[{dmg:14,t:0.32,range:2.8},{dmg:14,t:0.32,range:2.8},{dmg:18,t:0.36,range:3.0},{dmg:22,t:0.4,range:3.2},{dmg:32,t:0.5,range:3.4}];
function addStyle(pts){ G.style=Math.min(7000,G.style+pts); G.styleHeat=2.2; G.combo++; G.comboT=2.5;
  const r=rankOf(G.style); if(r>G.maxRankI)G.maxRankI=r;
  G.dt=Math.min(100,G.dt+pts*0.012); }
function playerAttack(dt){ // LMB-Kombo
  P.atkCD-=dt;
  if(mouseL&&P.atkCD<=0&&P.atkT<=0){ P.atk=(P.atk)%5; const c=COMBO[P.atk]; P.atkT=c.t; P.atkDur=c.t; P.didHit=false;
    P.atkCD=0.12; P.swingA=1; SFX.swing(); }
  if(P.atkT>0){ P.atkT-=dt; P.swingA=Math.max(0,P.swingA-dt*4);
    trail.material.opacity=P.atkT>P.atkDur*0.4?0.85:0;
    trail.rotation.z+=dt*20;
    if(!P.didHit&&P.atkT<P.atkDur*0.6){ P.didHit=true; const c=COMBO[P.atk]; meleeHit(c.dmg,c.range,P.atk===4); P.atk++; } }
  else trail.material.opacity=0;
  // Launcher E
  if(P.atkLaunch&&P.atkCD<=0){ P.atkLaunch=false;P.atkCD=0.8; SFX.launch(); burst(P.pos,0x4cc9f0,14,7,8);
    enemies.forEach(e=>{ if(!e.dead&&e.pos.distanceTo(P.pos)<3.4){ damageEnemy(e,25*G.dmgMul*(G.dtActive>0?2:1),'launch'); e.vy=9; addStyle(140);} });
    if(boss&&!boss.dead&&boss.pos.distanceTo(P.pos)<4.5){damageBoss(30*G.dmgMul);addStyle(140);} }
  // Pistolen RMB
  P.shootCD-=dt;
  if(mouseR&&P.shootCD<=0){ P.shootCD=G.weapon==='lethal'?0.22:0.5; SFX.shoot();
    burst(P.pos.clone().add(new THREE.Vector3(0,1.5,0)),G.weapon==='lethal'?0xffd60a:0x4cc9f0,4,3,2);
    const dir=new THREE.Vector3(-Math.sin(G.yaw),0,-Math.cos(G.yaw));
    let best=null,bd=30;
    enemies.forEach(e=>{ if(e.dead)return; const to=e.pos.clone().sub(P.pos); to.y=0; const d=to.length();
      if(d<30&&to.normalize().dot(dir)>0.92&&d<bd){bd=d;best=e;} });
    if(boss&&!boss.dead){const to=boss.pos.clone().sub(P.pos);if(to.length()<32&&to.normalize().dot(dir)>0.9&&(!best||boss.pos.distanceTo(P.pos)<bd)){best='boss';bd=boss.pos.distanceTo(P.pos);}}
    if(best){ if(best==='boss'){damageBoss(G.weapon==='lethal'?10*G.dmgMul:4);addStyle(40);}
      else if(G.weapon==='lethal'){damageEnemy(best,12*G.dmgMul,'shot');addStyle(60);}
      else {best.stun+=22;best.susp=Math.min(100,best.susp+20);dmgNum(best.pos,'Zzz','stun');SFX.zzz();addStyle(80);
        if(best.stun>=best.maxstun){best.sleep=12;best.state='sleep';toast('😴 Gegner schläft — FULTON mit [F]!');}} }
  }
}
function meleeHit(dmg,range,finisher){ const dir=new THREE.Vector3(-Math.sin(G.yaw),0,-Math.cos(G.yaw));
  let hitAny=false;
  enemies.forEach(e=>{ if(e.dead)return; const to=e.pos.clone().sub(P.pos);to.y=0;const d=to.length();
    if(d<range+0.6&&to.normalize().dot(dir)>0.5){ damageEnemy(e,dmg*G.dmgMul*(G.dtActive>0?2:1)*(finisher?1.4:1),finisher?'FINISH':'slash'); addStyle(finisher?220:110); hitAny=true; }});
  if(boss&&!boss.dead){const to=boss.pos.clone().sub(P.pos);if(to.length()<range+2.5){damageBoss(dmg*G.dmgMul*1.2);addStyle(150);hitAny=true;}}
  if(hitAny){G.hitstop=0.06;G.shake=Math.min(1,G.shake+0.4);$('hitmarker').style.opacity=1;
    setTimeout(()=>$('hitmarker').style.opacity=0,90);} }
function damageEnemy(e,dmg,kind){ if(e.dead)return; e.hp-=dmg; e.hitT=0.25; e.lastSeen=P.pos.clone();
  if(e.state==='patrol'||e.state==='idle')e.susp=Math.min(100,e.susp+45);
  burst(e.pos,0xff2d2d,8,5,5); dmgNum(e.pos,Math.round(dmg)+(kind==='FINISH'?'!':''),kind==='FINISH'?'crit':'');
  SFX.hit();
  // Stagger → fultonbar
  if(e.hp<=e.maxhp*0.3||e.sleep>0)e.fultonable=true;
  if(e.hp<=0){ e.dead=true;e.deadT=0;e.fultonable=true;G.kills++;G.gmp+=50;addStyle(150);SFX.die();
    burst(e.pos,0x660000,20,8,7); e.m.g.rotation.x=-Math.PI/2.2;
    setTimeout(()=>{ if(e.fultonable&&!e.gone){e.gone=true;} },6000); }
  else if(kind==='launch'){e.vy=9;}
}
function damageBoss(dmg){ if(!boss||boss.dead)return; boss.hp-=dmg; burst(boss.pos,0xffd60a,10,7,6);
  dmgNum(boss.pos,Math.round(dmg),'crit'); SFX.hit();
  $('bossfill').style.width=Math.max(0,boss.hp/boss.maxhp*100)+'%';
  if(boss.hp<=0){boss.dead=true;G.kills++;winGame();} }
function tryFulton(){ if(G.fultonN<=0){toast('🎈 Keine Fulton-Ballons! (Shop: TAB)');beep(150,0.2,'square',0.1);return;}
  let best=null,bd=3.6;
  enemies.forEach(e=>{ if(e.dead&&e.gone)return; if(e.gone)return;
    if(!(e.sleep>0||e.fultonable))return; const d=e.pos.distanceTo(P.pos); if(d<bd){bd=d;best=e;} });
  if(!best){toast('Fulton braucht BETÄUBTE / TAUMELNDE Gegner (2 = Tranq, dann F)');return;}
  G.fultonN--;G.fultons++;G.staff++;G.gmp+=120;best.gone=true;best.fultonAnim=0;
  SFX.fulton();dmgNum(best.pos,'FULTON +1 🎈','fulton');addStyle(300);
  toast('🎈 EXTRAHIERT! Mother Base: '+G.staff+' Soldaten (+120 GMP)');
  G.opsLog=G.opsLog||[];G.opsLog.push(`+ Rekrut (${best.type.name}) → ${G.staff} total`);
  checkMission(); }
function tryDT(){ if(G.dtActive>0||G.dt<100){ if(G.dt<100)toast('😈 Devil Trigger lädt: '+Math.round(G.dt)+'%'); return; }
  G.dt=0;G.dtActive=G.dtLen;document.body.classList.add('dt');SFX.dt();burst(P.pos,0xff0a54,30,9,9);
  toast('😈 DEVIL TRIGGER — D Doppelter Schaden + Regen!'); }

// ---------- Kollision ----------
function collide(pos,r=0.7){ for(const o of obstacles){
    const cx=Math.max(o.minX,Math.min(pos.x,o.maxX)),cz=Math.max(o.minZ,Math.min(pos.z,o.maxZ));
    const dx=pos.x-cx,dz=pos.z-cz,d=Math.hypot(dx,dz);
    if(d<r){ if(d<0.001){pos.x+=r;} else {pos.x=cx+dx/d*r;pos.z=cz+dz/d*r;} } }
  pos.x=Math.max(-100,Math.min(100,pos.x));pos.z=Math.max(-100,Math.min(100,pos.z)); }

// ---------- Feind-KI (Patrouille / Sicht / Alarm) ----------
const _rc=new THREE.Raycaster();
function losClear(a,b){ const dir=b.clone().sub(a);dir.y=0;const d=dir.length();if(d<0.5)return true;dir.normalize();
  _rc.set(new THREE.Vector3(a.x,1.5,a.z),dir);_rc.far=d;
  const hits=_rc.intersectObjects(obstacles.map(o=>o.mesh),false);return hits.length===0; }
function updateEnemy(e,dt){ if(e.gone){ if(e.fultonAnim!==undefined&&e.fultonAnim<2){e.fultonAnim+=dt;
      e.m.g.position.y+=dt*5; if(e.fultonAnim>=2){scene.remove(e.m.g);e.tag.remove();}} return; }
  if(e.dead){ e.deadT+=dt; if(e.deadT>6){scene.remove(e.m.g);e.tag.remove();e.gone=true;} return; }
  if(e.sleep>0){ e.sleep-=dt; e.m.g.rotation.z=Math.sin(G.time*2)*0.1; if(e.sleep<=0){e.state='alert';e.susp=80;} return; }
  e.hitT=Math.max(0,e.hitT-dt); e.atkCD-=dt;
  // --- Wahrnehmung
  const toP=P.pos.clone().sub(e.pos);toP.y=0;const dist=toP.length();
  const facing=new THREE.Vector3(Math.sin(e.face),0,Math.cos(e.face));
  const inCone=toP.clone().normalize().dot(facing)>Math.cos(0.6);
  let vis=1-G.camo/130; if(P.sprint)vis+=0.5; if(G.box&&!keys['KeyW']&&!keys['KeyA']&&!keys['KeyS']&&!keys['KeyD'])vis*=0.25;
  const seen=dist<e.type.sight*vis&&inCone&&losClear(e.pos,P.pos);
  const noiseR=P.sprint?12:(P.atkT>0?9:0);
  if(dist<noiseR&&losClear(e.pos,P.pos))e.susp=Math.min(100,e.susp+60*dt);
  if(seen){ e.susp=Math.min(100,e.susp+(dist<8?90:45)*dt*vis); e.lastSeen=P.pos.clone(); }
  else e.susp=Math.max(0,e.susp-8*dt);
  if(e.susp>=100&&e.state!=='alert'){e.state='alert';e.fx='!';SFX.alarm();setAlarm();}
  else if(e.susp>35&&e.state==='patrol'){e.state='suspicious';e.fx='?';}
  if(e.state==='suspicious'&&e.susp<=5)e.state='patrol';
  // --- Verhalten
  let mvx=0,mvz=0,spd=e.type.spd;
  if(e.state==='patrol'){ const wp=e.wp[e.wpi]; const dx=wp[0]-e.pos.x,dz=wp[1]-e.pos.z;
    if(Math.hypot(dx,dz)<1.5)e.wpi=(e.wpi+1)%e.wp.length;
    else {mvx=dx;mvz=dz;const l=Math.hypot(mvx,mvz);mvx/=l;mvz/=l;}
    e.face=Math.atan2(mvx,mvz); }
  else if(e.state==='suspicious'&&e.lastSeen){ const dx=e.lastSeen.x-e.pos.x,dz=e.lastSeen.z-e.pos.z;
    if(Math.hypot(dx,dz)>1){mvx=dx;mvz=dz;const l=Math.hypot(mvx,mvz);mvx/=l;mvz/=l;e.face=Math.atan2(mvx,mvz);} }
  else if(e.state==='alert'&&e.lastSeen){ const dx=P.pos.x-e.pos.x,dz=P.pos.z-e.pos.z;const d=Math.hypot(dx,dz);
    e.face=Math.atan2(dx,dz);
    if(e.type.ranged){ if(d>e.type.range){mvx=dx/d;mvz=dz/d;} else if(d<6){mvx=-dx/d;mvz=-dz/d;}
      e.shootT-=dt; if(e.shootT<=0&&d<24&&losClear(e.pos,P.pos)){e.shootT=1.6;enemyShoot(e);} }
    else { if(d>e.type.range*0.8){mvx=dx/d;mvz=dz/d;spd*=1.4;} 
      else if(e.atkCD<=0){e.atkCD=1.1;enemyMelee(e);} }
    if(dist>34){e.state='patrol';e.susp=20;} }
  // Launch-Physik
  if(e.vy===undefined)e.vy=0; e.y=(e.y||0)+ (e.vy||0)*dt; if(e.y>0){e.vy-=25*dt;} else {e.y=0;e.vy=0;}
  e.pos.x+=mvx*spd*dt;e.pos.z+=mvz*spd*dt;collide(e.pos,0.7);
  e.m.g.position.set(e.pos.x,e.y,e.pos.z);e.m.g.rotation.y=e.face;
  e.m.g.position.y+=Math.abs(Math.sin(G.time*8+e.wpi))*0.03*(mvx||mvz?1:0);
  if(e.hitT>0)e.m.body.material.emissive?.setHex(0x660000);else e.m.body.material.emissive?.setHex(0x000000);
  e.cone.material.color.setHex(e.state==='alert'?0xff0000:(e.state==='suspicious'?0xffaa00:0xffee00));
  // Tag (?/!)
  const v=e.pos.clone();v.y+=2.8;v.project(camera);
  if(v.z<1){e.tag.style.display='block';e.tag.textContent=(e.sleep>0?'💤':(e.fultonable?'🎈':e.fx));
    e.tag.style.left=((v.x*0.5+0.5)*innerWidth-10)+'px';e.tag.style.top=((-v.y*0.5+0.5)*innerHeight)+'px';
    e.tag.style.color=e.state==='alert'?'#ff4d4d':'#ffd60a';}
  else e.tag.style.display='none';
}
const ESHOTS=[];
function enemyShoot(e){ beep(700,0.1,'square',0.08,-300); const from=e.pos.clone();from.y=1.5;
  const dir=P.pos.clone().sub(from).normalize();
  const m=new THREE.Mesh(new THREE.SphereGeometry(0.12,8,8),new THREE.MeshBasicMaterial({color:0xff5555}));
  m.position.copy(from);scene.add(m);ESHOTS.push({m,dir,life:2}); }
function enemyMelee(e){ SFX.swing(); setTimeout(()=>{ if(P.pos.distanceTo(e.pos)<3&&P.iframes<=0&&P.dashT<=0){
    hurtPlayer(e.type.dmg);} },300);
  burst(e.pos,0xffffff,5,4,4); }
function hurtPlayer(d){ if(G.dtActive>0)d*=0.5; G.hp-=d;G.dmgTaken+=d;G.style=Math.max(0,G.style-250);G.combo=0;
  SFX.hurt();G.shake=1;$('dmgflash').style.opacity=0.55;setTimeout(()=>$('dmgflash').style.opacity=0,120);
  if(G.hp<=0){G.hp=0;loseGame();} }
function setAlarm(){ if(G.phase!=='ALARM'){G.phase='ALARM';G.alarmT=14;SFX.alarm();toast('🚨 ALARM! Bleib in Deckung — oder kämpfe mit STYLE');}
  else G.alarmT=14; }

// Boss-KI
const BSHOTS=[];
function updateBoss(dt){ if(!boss||boss.dead)return; boss.atkCD-=dt;boss.modeT-=dt;
  const d=boss.pos.distanceTo(P.pos); boss.face=Math.atan2(P.pos.x-boss.pos.x,P.pos.z-boss.pos.z);
  boss.m.g.position.copy(boss.pos);boss.m.g.rotation.y=boss.face;
  boss.m.g.position.y=Math.abs(Math.sin(G.time*3))*0.15;
  if(boss.modeT<=0){boss.mode=boss.mode==='chase'?(d>10?'volley':(Math.random()<0.5?'slam':'volley')):'chase';boss.modeT=boss.mode==='chase'?2.5:1.2;}
  if(boss.mode==='chase'&&d>4){const dx=(P.pos.x-boss.pos.x)/d,dz=(P.pos.z-boss.pos.z)/d;
    boss.pos.x+=dx*4*dt;boss.pos.z+=dz*4*dt;collide(boss.pos,1.5);}
  else if(boss.mode==='slam'&&boss.atkCD<=0){boss.atkCD=2;SFX.die();G.shake=1.4;burst(boss.pos,0xff6600,25,10,8);
    setTimeout(()=>{if(P.pos.distanceTo(boss.pos)<7&&P.iframes<=0&&P.dashT<=0)hurtPlayer(22);},400);}
  else if(boss.mode==='volley'&&boss.atkCD<=0){boss.atkCD=0.35;beep(500,0.08,'square',0.09,-200);
    const from=boss.pos.clone();from.y=3;const dir=P.pos.clone().sub(from).normalize();
    const m=new THREE.Mesh(new THREE.SphereGeometry(0.2,8,8),new THREE.MeshBasicMaterial({color:0xffaa00}));
    m.position.copy(from);scene.add(m);BSHOTS.push({m,dir,life:3}); if(Math.random()<0.1)boss.modeT=0;}
  // Tag
  const v=boss.pos.clone();v.y+=7;v.project(camera);
}

// ---------- Missionen ----------
const OBJECTIVES=['◆ OP 1: Hacke 3 Terminals [E halten] (grüne Ringe)','◆ OP 2: Fultone 4 Soldaten [F] (Tranq [2] → F)','◆ OP 3: ZERSTÖRE PEACE SENTINEL'];
function checkMission(){
  if(G.mission===0&&G.hacks>=3){G.mission=1;toast('✅ OP 1 GESCHAFFT — OP 2: FULTONE 4 SOLDATEN');spawnWave(4);SFX.hack();}
  if(G.mission===1&&G.fultons>=4){G.mission=2;spawnBoss();setAlarm();}
  $('obj-text').textContent=OBJECTIVES[G.mission]+(G.mission===0?` — ${G.hacks}/3`:(G.mission===1?` — ${G.fultons}/4`:''));
}
function winGame(){ if(G.state!=='play')return; G.state='win';document.exitPointerLock?.();
  const t=Math.round((performance.now()-G.startTime)/1000);
  const rank=G.dmgTaken<30&&G.maxRankI>=5?'SSS':(G.maxRankI>=4?'S':(G.maxRankI>=3?'A':'B'));
  $('end-title').textContent=rank+'-RANG — FRIEDEN ERKÄMPFT';
  $('end-stats').innerHTML=`Zeit ${t}s · Max-Style ${RANKS[G.maxRankI].n} (${RANKS[G.maxRankI].w}) · Kills ${G.kills} · Fultons ${G.fultons} · Mother Base ${G.staff} · Schaden ${Math.round(G.dmgTaken)}<br><br>Venom Dante verschwindet im Nebel. Die Mother Base wächst. <b>Kept you styling, huh?</b>`;
  endUI.classList.remove('hidden');hud.classList.add('hidden');beep(600,0.8,'sawtooth',0.12,600); }
function loseGame(){ if(G.state!=='play')return; G.state='lose';document.exitPointerLock?.();
  $('end-title').textContent='☠ MISSION GESCHEITERT';$('end-stats').textContent='Venom Dante fällt. Aber Dämonen sterben nie — versuch es erneut.';
  endUI.classList.remove('hidden'); }

// ---------- Update: Spieler ----------
function updatePlayer(dt){ const sp=(keys['ShiftLeft']||keys['ShiftRight'])?8.5:(G.crouch?2.6:5.2);
  G.sprint=(keys['ShiftLeft']||keys['ShiftRight'])&&(keys['KeyW']||keys['KeyA']||keys['KeyS']||keys['KeyD']);
  let fx=0,fz=0;
  if(keys['KeyW'])fz+=1;if(keys['KeyS'])fz-=1;if(keys['KeyA'])fx-=1;if(keys['KeyD'])fx+=1;
  const moving=fx||fz;
  const s=Math.sin(G.yaw),c=Math.cos(G.yaw);
  let wx=(fx*c-fz*s),wz=(-fz*c-fx*s);
  const l=Math.hypot(wx,wz)||1;wx/=l;wz/=l;
  // Dash
  P.dashCD-=dt;P.iframes-=dt;
  if(keys['ShiftLeft']&&P.dashCD<=0&&moving&&(keys['Space']||G.sprint&&false)){}
  if((keys['ShiftLeft']||keys['ShiftRight'])&&P.dashCD<=0&&moving&&P.dashT<=0&&(keys['KeyW']||keys['KeyA']||keys['KeyS']||keys['KeyD'])&&!G.sprint){}
  // einfacher Dash: Shift antippen = Dash in Bewegungsrichtung
  if(moving&&(keys['ShiftLeft']||keys['ShiftRight'])&&P.dashCD<=0&&!G._dashHeld){P.dashT=0.22;P.dashCD=0.9;P.iframes=0.3;G._dashHeld=true;SFX.dash();burst(P.pos,0xffffff,8,4,3);}
  if(!(keys['ShiftLeft']||keys['ShiftRight']))G._dashHeld=false;
  let cur=sp*(G.dtActive>0?1.25:1);
  if(P.dashT>0){P.dashT-=dt;cur=16;}
  if(moving){P.pos.x+=wx*cur*dt;P.pos.z+=wz*cur*dt;
    pm.g.rotation.y=Math.atan2(wx,wz);}
  collide(P.pos,0.7);
  // Sprung/Gravitation
  P.vy-=22*dt;P.pos.y+=P.vy*dt;
  if(P.pos.y<=0){P.pos.y=0;P.vy=0;if(!P.grounded){P.grounded=true;P.jumps=0;burst(P.pos,0xaaaaaa,5,3,2);}}
  else P.grounded=false;
  P.airTime=P.grounded?0:P.airTime+dt;
  // Tarnindex
  let camo=G.box?85:(G.crouch?60:20);
  if(moving)camo-=G.sprint?25:15; if(!moving&&G.box)camo=92;
  G.camo=Math.max(0,Math.min(95,camo));
  // Devil Trigger
  if(G.dtActive>0){G.dtActive-=dt;aura.material.opacity=0.25+Math.sin(G.time*10)*0.1;
    G.hp=Math.min(G.maxhp,G.hp+6*dt); if(G.dtActive<=0){document.body.classList.remove('dt');aura.material.opacity=0;}}
  playerAttack(dt);
  // Terminals hacken
  let nearT=null;terminals.forEach(t=>{if(!t.hacked&&t.pos.distanceTo(P.pos)<3)nearT=t;});
  if(nearT){ nearT.hackP+=dt/2; SFX.hack();
    if(nearT.hackP>=1){nearT.hacked=true;G.hacks++;G.gmp+=150;addStyle(250);SFX.fulton();
      nearT.scr.material.emissive.setHex(0x003300);toast(`✅ TERMINAL GEHACKT (${G.hacks}/3) +150 GMP`);checkMission();}
    $('prompt').textContent='⌁ HACKE … '+Math.round(nearT.hackP*100)+'%'; }
  else { // Fulton-Prompt
    let f=null;enemies.forEach(e=>{if(!e.dead&&!e.gone&&(e.sleep>0||e.fultonable)&&e.pos.distanceTo(P.pos)<3.6)f=e;});
    $('prompt').textContent=f?'🎈 [F] FULTON — '+f.type.name+' extrahieren!':(nearT?'':'');
  }
  // Mesh
  pm.g.position.copy(P.pos);boxMesh.visible=G.box;
  pm.body.visible=!G.box;
  coat.visible=!G.box;
  pm.g.scale.y=G.crouch||G.box?0.75:1;
  if(P.atkT>0&&pm.sw)pm.sw.rotation.x=-2+P.swingA*2; else if(pm.sw)pm.sw.rotation.x=Math.sin(G.time*3)*0.1;
  // Style-Verfall
  if(G.styleHeat>0)G.styleHeat-=dt; else {G.style=Math.max(0,G.style-140*dt);if(G.style===0)G.combo=0;}
  if(G.comboT>0)G.comboT-=dt; else G.combo=0;
  if(G.phase==='ALARM'){G.alarmT-=dt;if(G.alarmT<=0){G.phase='EVASION';toast('… EVASION — sie suchen dich. Versteck dich!');setTimeout(()=>{if(G.phase==='EVASION'){G.phase='INFILTRATION';toast('✓ INFILTRATION — unentdeckt');}},8000);}}
  // Outer Ops Einkommen
  G.opsT+=dt; if(G.opsT>30){G.opsT=0;if(G.staff>0){const g=G.staff*8;G.gmp+=g;G.opsLog=G.opsLog||[];G.opsLog.push(`Outer Ops: +${g} GMP`);}}
}

// ---------- Kamera ----------
function updateCamera(dt){ const px=P.pos.x+Math.sin(G.yaw)*G.dist*Math.cos(G.pitch),
    pz=P.pos.z+Math.cos(G.yaw)*G.dist*Math.cos(G.pitch),
    py=P.pos.y+2.2-Math.sin(G.pitch)*G.dist;
  const target=new THREE.Vector3(px,Math.max(1,py),pz);
  camera.position.lerp(target,1-Math.pow(0.0001,dt));
  if(G.shake>0){G.shake-=dt*3;camera.position.x+=(Math.random()-0.5)*G.shake*0.5;camera.position.y+=(Math.random()-0.5)*G.shake*0.5;}
  camera.lookAt(P.pos.x,P.pos.y+1.8,P.pos.z); }

// ---------- HUD ----------
const mm=$('minimap').getContext('2d');
function updateHUD(){ $('hpfill').style.width=(G.hp/G.maxhp*100)+'%';$('hptext').textContent=`HP ${Math.ceil(G.hp)}/${G.maxhp}`;
  $('dtfill').style.width=(G.dtActive>0?(G.dtActive/G.dtLen*100):G.dt)+'%';
  $('dttext').textContent=G.dtActive>0?'😈 DEVIL TRIGGER AKTIV!':'DEVIL TRIGGER '+Math.round(G.dt)+'% [T]';
  $('camo').textContent='TARININDEX '+Math.round(G.camo)+'%';
  $('camo').style.color=G.camo>60?'#80ed99':(G.camo>35?'#ffd60a':'#ff6b6b');
  $('stance').textContent=G.box?'📦 KARTON':(G.crouch?'DUCKEN':'STEHEND');
  const r=rankOf(G.style);$('rank').textContent=RANKS[r].n;$('rank').className='rank-'+RANKS[r].n;
  $('rankword').textContent=RANKS[r].w;$('combo').textContent=G.combo+' HITS';
  $('stylefill').style.width=Math.min(100,G.style%1000/10)+'%';
  const ph=$('phase');ph.textContent=G.phase==='ALARM'?'🚨 ALARM':(G.phase==='EVASION'?'👁 EVASION':'✓ INFILTRATION');
  ph.className=G.phase==='ALARM'?'alarm':'';
  $('staff').textContent=G.staff;$('gmp').textContent=G.gmp;$('fulton').textContent=G.fultonN+'/'+G.fultonMax;
  checkMissionOff();
  // Minimap
  mm.clearRect(0,0,170,170);mm.save();mm.translate(85,85);
  const sc=170/130;
  mm.strokeStyle='#2d6a4f';mm.beginPath();mm.arc(0,0,80,0,7);mm.stroke();
  function dot(x,z,col,s=4){mm.fillStyle=col;mm.beginPath();mm.arc((x-P.pos.x)*sc,(z-P.pos.z)*sc,s,0,7);mm.fill();}
  terminals.forEach(t=>{if(!t.hacked)dot(t.pos.x,t.pos.z,'#00ffcc',5);});
  enemies.forEach(e=>{if(!e.gone&&!e.dead)dot(e.pos.x,e.pos.z,e.state==='alert'?'#ff0000':'#ffaa00',3.5);});
  if(boss&&!boss.dead)dot(boss.pos.x,boss.pos.z,'#ff0a54',7);
  // Spieler-Pfeil
  mm.fillStyle='#fff';mm.save();mm.rotate(Math.atan2(-Math.sin(G.yaw),-Math.cos(G.yaw))+Math.PI);mm.beginPath();
  mm.moveTo(0,-8);mm.lineTo(5,6);mm.lineTo(-5,6);mm.closePath();mm.fill();mm.restore();mm.restore();
  // Missions-Pfeil (Objektiv-Kompass)
  let obj=null;
  if(G.mission===0){const t=terminals.find(t=>!t.hacked);if(t)obj=t.pos;}
  else if(G.mission===1){let bd=1e9;enemies.forEach(e=>{if(!e.gone&&!e.dead){const d=e.pos.distanceTo(P.pos);if(d<bd){bd=d;obj=e.pos;}}});}
  else if(boss&&!boss.dead)obj=boss.pos;
  if(obj){const dx=obj.x-P.pos.x,dz=obj.z-P.pos.z;const a=Math.atan2(dx,dz)-Math.atan2(-Math.sin(G.yaw),-Math.cos(G.yaw));
    mm.save();mm.translate(85,85);mm.rotate(-a+Math.PI);mm.fillStyle='#ffd60a';mm.fillRect(-2,-78,4,14);mm.restore();}
}
function checkMissionOff(){}

// ---------- Loop ----------
spawnWave(6);
updWeapon();
let last=performance.now();
function loop(now){ requestAnimationFrame(loop);
  let dt=Math.min(0.05,(now-last)/1000);last=now;
  if(G.hitstop>0){G.hitstop-=dt;dt*=0.1;}
  dt*=G.timeScale;
  if(G.state==='play'||G.state==='base'){ G.time+=dt;
    if(G.state==='play'){updatePlayer(dt);enemies.forEach(e=>updateEnemy(e,dt));updateBoss(dt);
      // Projektile
      for(let i=ESHOTS.length-1;i>=0;i--){const s=ESHOTS[i];s.life-=dt;s.m.position.addScaledVector(s.dir,18*dt);
        if(s.m.position.distanceTo(P.pos)<1.2&&P.iframes<=0&&P.dashT<=0){hurtPlayer(7);scene.remove(s.m);ESHOTS.splice(i,1);continue;}
        if(s.life<=0||s.m.position.y<0){scene.remove(s.m);ESHOTS.splice(i,1);}}
      for(let i=BSHOTS.length-1;i>=0;i--){const s=BSHOTS[i];s.life-=dt;s.m.position.addScaledVector(s.dir,14*dt);
        if(s.m.position.distanceTo(P.pos)<1.4&&P.iframes<=0&&P.dashT<=0){hurtPlayer(12);scene.remove(s.m);BSHOTS.splice(i,1);continue;}
        if(s.life<=0){scene.remove(s.m);BSHOTS.splice(i,1);}}
      updateParts(dt);
      deco.forEach(d=>{d.rotation.y+=dt;});
      updateHUD();
    }
    updateCamera(dt);
    renderer.render(scene,camera);
  } else if(G.state==='menu'){ G.time+=dt; G.yaw+=dt*0.1;
    camera.position.set(Math.sin(G.yaw)*30,12,Math.cos(G.yaw)*30);camera.lookAt(0,2,0);
    renderer.render(scene,camera); }
  else { renderer.render(scene,camera); }
}
requestAnimationFrame(loop);
$('obj-text').textContent=OBJECTIVES[0];
// Debug-Hooks (für Tests / Konsole)
window.DW={G,P,enemies,terminals,meleeHit,damageEnemy,tryFulton,tryDT,spawnBoss,get boss(){return boss;}};
