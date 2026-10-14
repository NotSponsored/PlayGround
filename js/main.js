import { Game } from './game.js';
import { UI } from './ui.js';
import { GameAudio } from './audio.js';

const canvas=document.getElementById('game-canvas');
const loaderFill=document.getElementById('loader-fill');
const loaderText=document.getElementById('loader-text');
function progress(p,t){ loaderFill.style.width=(p*100)+'%'; if(t) loaderText.textContent=t; }

const audio=new GameAudio();
const game=new Game(canvas,audio);
const ui=new UI(game,audio);
window.__game=game; window.__ui=ui;

async function boot(){
  progress(0.15,'Lade 3D-Engine …');
  await new Promise(r=>setTimeout(r,120));
  progress(0.45,'Baue Neon-City …');
  game.startDemo();
  // Ersten Frame rendern damit Shader kompilieren
  for(let i=0;i<5;i++){ game.update(); await new Promise(r=>setTimeout(r,30)); }
  progress(0.8,'Starte Motor …');
  await new Promise(r=>setTimeout(r,150));
  progress(1,'Bereit!');
  document.getElementById('loader').classList.add('hidden');
  document.getElementById('menu').classList.remove('hidden');
  // ?autostart=modus für Screenshots/Tests
  const q=new URLSearchParams(location.search);
  if(q.has('autostart')){
    ui.sel.mode=q.get('autostart')||'sprint';
    document.querySelectorAll('.mode-card').forEach(x=>x.classList.toggle('active',x.dataset.mode===ui.sel.mode));
    ui.startRace();
  }
  if(q.has('demo')){ /* bleibe im Menü mit Demo-Hintergrund */ }
}
function loop(){
  requestAnimationFrame(loop);
  try{ game.update(); }catch(e){ console.error(e); }
}
boot();
loop();
