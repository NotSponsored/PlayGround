import { CARS, PAINTS, NEONS, MODES, getBest, setBest, fmtTime } from './config.js';

export class UI{
  constructor(game, audio){
    this.game=game; this.audio=audio;
    this.$=id=>document.getElementById(id);
    this.sel={ car:0, paint:0, neon:0, vinyl:'stripe', spoiler:'sport', motor:2, grip:2, nitro:2, mode:'sprint' };
    this.buildGarage();
    this.buildSwatches();
    this.bindMenu();
    this.mm=document.getElementById('minimap').getContext('2d');
  }
  buildGarage(){
    const box=this.$('car-cards'); box.innerHTML='';
    CARS.forEach((c,i)=>{
      const d=document.createElement('div');
      d.className='car-card'+(i===0?' active':'');
      d.innerHTML=`<b>${c.name}</b><small>${c.desc}</small>
        <div class="car-stat"><div style="width:${c.stats.speed*100}%"></div></div>
        <div class="car-stat"><div style="width:${c.stats.accel*100}%"></div></div>
        <div class="car-stat"><div style="width:${c.stats.grip*100}%"></div></div>
        <small>TOP ${(c.topspeed*3.6)|0} km/h</small>`;
      d.onclick=()=>{ this.sel.car=i; [...box.children].forEach((x,j)=>x.classList.toggle('active',j===i)); this.audio.init(); this.audio.uiClick(); };
      box.appendChild(d);
    });
  }
  buildSwatches(){
    const ps=this.$('paint-sw'), ns=this.$('neon-sw');
    PAINTS.forEach((c,i)=>{
      const s=document.createElement('div'); s.className='sw'+(i===0?' active':'');
      s.style.background='#'+c.toString(16).padStart(6,'0');
      s.onclick=()=>{ this.sel.paint=i; [...ps.children].forEach((x,j)=>x.classList.toggle('active',j===i)); };
      ps.appendChild(s);
    });
    NEONS.forEach((c,i)=>{
      const s=document.createElement('div'); s.className='sw'+(i===0?' active':'');
      s.style.background='#'+c.toString(16).padStart(6,'0');
      s.style.boxShadow=`0 0 10px #${c.toString(16).padStart(6,'0')}`;
      s.onclick=()=>{ this.sel.neon=i; [...ns.children].forEach((x,j)=>x.classList.toggle('active',j===i)); };
      ns.appendChild(s);
    });
    this.$('sel-vinyl').onchange=e=>this.sel.vinyl=e.target.value;
    this.$('sel-spoiler').onchange=e=>this.sel.spoiler=e.target.value;
    const bind=(id,key,vid)=>{ this.$(id).oninput=e=>{ this.sel[key]=+e.target.value; this.$(vid).textContent=e.target.value; }; };
    bind('rg-motor','motor','v-motor'); bind('rg-grip','grip','v-grip'); bind('rg-nitro','nitro','v-nitro');
  }
  bindMenu(){
    document.querySelectorAll('.mode-card').forEach(b=>{
      b.onclick=()=>{
        document.querySelectorAll('.mode-card').forEach(x=>x.classList.remove('active'));
        b.classList.add('active'); this.sel.mode=b.dataset.mode;
        // Track passend vorschlagen
        const m=MODES[this.sel.mode];
        this.$('sel-track').value=m.track;
        this.$('sel-laps').value=String(m.laps);
        if(this.sel.mode==='canyon') this.$('sel-ai').value='1';
        this.audio.init(); this.audio.uiClick();
      };
    });
    this.$('btn-howto').onclick=()=>this.$('howto').classList.remove('hidden');
    this.$('btn-howto-close').onclick=()=>this.$('howto').classList.add('hidden');
    this.$('btn-start').onclick=()=>this.startRace();
    this.$('btn-restart').onclick=()=>{ this.$('result').classList.add('hidden'); this.startRace(); };
    this.$('btn-tomenu').onclick=()=>{ this.$('result').classList.add('hidden'); this.toMenu(); };
    this.refreshBest();
  }
  playerSetup(){
    return {
      car:CARS[this.sel.car],
      paint:PAINTS[this.sel.paint],
      neon:NEONS[this.sel.neon],
      vinyl:this.sel.vinyl, spoiler:this.sel.spoiler,
      tune:{motor:this.sel.motor,grip:this.sel.grip,nitro:this.sel.nitro},
    };
  }
  async startRace(){
    this.audio.init(); this.audio.resume();
    this.$('menu').classList.add('hidden');
    this.$('result').classList.add('hidden');
    this.$('hud').classList.remove('hidden');
    const track=this.$('sel-track').value;
    const laps=+this.$('sel-laps').value;
    const ai=+this.$('sel-ai').value;
    const mode=this.sel.mode;
    this.$('countdown').classList.remove('hidden');
    // HUD-Reset
    this.$('hud-heat').classList.toggle('hidden',mode!=='pursuit');
    this.$('hud-wanted').classList.toggle('hidden',mode!=='pursuit');
    this.$('hud-escape').classList.toggle('hidden',mode!=='pursuit');
    await this.game.newRace({ track, laps, aiCount:ai, mode,
      playerSetup:this.playerSetup(),
      onHud:h=>this.hud(h), onMsg:t=>this.msg(t),
      onFinish:r=>this.results(r), onMute:m=>this.msg(m?'SOUND AUS (M zum Einschalten)':'SOUND AN'),
      onQuitToMenu:()=>{ this.$('result').classList.add('hidden'); this.toMenu(); },
    });
  }
  toMenu(){
    this.$('menu').classList.remove('hidden');
    this.$('hud').classList.add('hidden');
    this.refreshBest();
    this.game.startDemo();
  }
  refreshBest(){
    const b=getBest(); const keys=Object.keys(b);
    this.$('best-times').innerHTML=keys.length?keys.map(k=>`<div>${k} — <b>${fmtTime(b[k])}</b></div>`).join(''):'Noch keine Rennen gefahren.';
  }
  msg(t){ this.$('hud-msg').textContent=t||''; }
  hud(h){
    if(h.countdown!=null){
      const c=h.countdown;
      const el=this.$('countdown');
      if(c>0.2){ el.textContent=c>2.6?'3':c>1.6?'2':c>0.6?'1':'GO!'; el.style.color=c<=0.6?'#b6ff00':'#fff'; }
      else el.classList.add('hidden');
      if(c<=0.2) setTimeout(()=>el.classList.add('hidden'),400);
      return;
    }
    if(h.paused){ this.$('hud-pause').classList.remove('hidden'); return; }
    this.$('hud-pause').classList.add('hidden');
    if(h.speed!=null){
      this.$('speed').textContent=Math.round(h.speed);
      this.$('nitro-fill').style.width=(h.nitro*100).toFixed(1)+'%';
      this.$('hud-lap').textContent=h.mode==='pursuit'?`HEAT ${h.heat} • ${fmtTime(h.survive)} / 3:00`:`RUNDE ${Math.min(h.lap,h.laps)}/${h.laps}`;
      this.$('hud-time').textContent=fmtTime(h.time);
      this.$('hud-last').textContent='Letzte: '+(h.last?fmtTime(h.last):'—');
      this.$('hud-pos').innerHTML=`P${h.pos}<span>/${h.count}</span>`;
      if(h.mode==='pursuit'){
        this.$('heat-stars').innerHTML='★'.repeat(h.heat)+`<span style="opacity:.25">${'★'.repeat(5-h.heat)}</span>`;
        this.$('busted-fill').style.width=(h.busted*100)+'%';
        this.$('hud-escape').classList.toggle('hidden',!(h.escape>0.3));
        this.$('escape-t').textContent=h.escape.toFixed(1);
      }
      const d=this.$('drift-score');
      if(h.drift>40){ d.classList.remove('hidden'); this.$('drift-pts').textContent=Math.round(h.drift); }
      else d.classList.add('hidden');
      this.drawMinimap();
    }
  }
  drawMinimap(){
    const g=this.game.world; if(!g) return;
    const c=this.mm, W=180,H=180;
    c.clearRect(0,0,W,H);
    // Bounds
    let minX=1e9,maxX=-1e9,minZ=1e9,maxZ=-1e9;
    for(let i=0;i<g.N;i+=8){ const p=g.samples[i].pos; minX=Math.min(minX,p.x);maxX=Math.max(maxX,p.x);minZ=Math.min(minZ,p.z);maxZ=Math.max(maxZ,p.z); }
    const sx=(W-24)/(maxX-minX||1), sz=(H-24)/(maxZ-minZ||1), s=Math.min(sx,sz);
    const ox=(W-(maxX-minX)*s)/2-minX*s, oz=(H-(maxZ-minZ)*s)/2-minZ*s;
    const X=x=>x*s+ox, Z=z=>z*s+oz;
    c.lineWidth=5; c.strokeStyle='rgba(0,229,255,.35)';
    c.beginPath();
    for(let i=0;i<=g.N;i+=8){ const p=g.samples[i%g.N].pos; i===0?c.moveTo(X(p.x),Z(p.z)):c.lineTo(X(p.x),Z(p.z)); }
    c.closePath(); c.stroke();
    c.lineWidth=2; c.strokeStyle='#00e5ff'; c.stroke();
    // Verkehr/Cops/Gegner
    for(const r of this.game.racers){
      const p=r.pos;
      c.fillStyle=r===this.game.player?'#fff':r.isCop?'#ff1744':r.isTraffic?'#8899ff':'#ffd600';
      c.beginPath(); c.arc(X(p.x),Z(p.z),r===this.game.player?4:3,0,7); c.fill();
      if(r.isCop){ c.strokeStyle='#ff1744'; c.beginPath(); c.arc(X(p.x),Z(p.z),6,0,7); c.stroke(); }
    }
  }
  results(r){
    this.$('hud').classList.add('hidden');
    const el=this.$('result'); el.classList.remove('hidden');
    this.$('res-title').textContent=r.title;
    let sub='';
    if(r.mode==='pursuit') sub=`Heat ${r.heat} • Überlebt: ${fmtTime(r.survive)} • Drift: ${r.drift} P`;
    else sub=`Zeit: ${fmtTime(r.time)} • Beste Runde: ${fmtTime(r.best)} • Drift: ${r.drift} P`;
    this.$('res-sub').textContent=sub;
    const t=this.$('res-table');
    t.innerHTML='<tr><th>PLATZ</th><th>FAHRER</th><th>RÜCKSTAND</th></tr>';
    const order=r.order||[];
    order.forEach((x,i)=>{
      const tr=document.createElement('tr');
      const gap=x===this.game.player?'—':(x.isTraffic||x.isCop?'':`+${Math.max(0,(this.game.player.progress-x.progress)/60).toFixed(1)}s`);
      tr.innerHTML=`<td>${i+1}</td><td>${x===this.game.player?'DU ('+this.game.playerSetup.car.name+')':x.name}${x.isCop?' 🚔':''}</td><td>${x.finishTime?fmtTime(x.finishTime):gap}</td>`;
      if(x===this.game.player) tr.style.color='#b6ff00';
      t.appendChild(tr);
    });
    // Bestzeit speichern (Sprint/Canyon Sieg oder jede Zielankunft mit Zeit)
    if(r.mode!=='pursuit'&&r.win!==false){
      const key=`${this.game.cfg.track}_${this.game.cfg.laps}R`;
      const prev=getBest()[key];
      const isBest=setBest(key,r.time);
      if(isBest) sub+=` — NEUE BESTZEIT! (vorher ${prev?fmtTime(prev):'—'})`;
      this.$('res-sub').textContent=sub;
    }
    this.refreshBest();
  }
}
