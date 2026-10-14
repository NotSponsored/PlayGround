import { Game } from './game.js';

const $ = (id)=>document.getElementById(id);
const game = new Game($('game-canvas'));
window.__game = game; // Debug-Hook (für Tests)
game.init().then(()=>$('loading').classList.add('hidden'));

$('btn-solo').onclick = ()=>{ game.sfx.ensure(); game.startSolo(); game.setMultiplayer('solo'); $('mp-badge').classList.add('hidden'); };
$('btn-host').onclick = async ()=>{
  $('mp-status').textContent='Starte Host… (erfordert Internet für PeerJS-Cloud)';
  game.sfx.ensure();
  await game.net.host((code, attempt)=>{
    $('host-code').textContent=code;
    $('host-code-box').classList.remove('hidden');
    if(attempt<=1) game.startHost(code);
    else game.toast('🌐 Verbunden! Code '+code+' gilt jetzt.');
  });
};
$('btn-join-show').onclick = ()=>{ $('join-box').classList.toggle('hidden'); $('join-code').focus(); };
$('btn-join').onclick = async ()=>{
  const code=$('join-code').value;
  game.sfx.ensure();
  game.startClient();
  await game.net.join(code, ()=>{});
};
$('btn-copy').onclick = async ()=>{ try{ await navigator.clipboard.writeText($('host-code').textContent); game.toast('Code kopiert!'); }catch{ game.toast('Code: '+$('host-code').textContent); } };
$('btn-help').onclick = ()=>{ game.state==='playing'?game.pause():($('pause-menu').classList.remove('hidden')); $('pause-info').textContent='Titel-Hilfe — starte erst ein Spiel für Pause-Infos.'; };
$('btn-resume').onclick = ()=>game.pause();
$('btn-mute').onclick = (e)=>{ const m=game.sfx.toggle(); e.target.textContent=m?'🔇 Ton aus':'🔊 Ton an/aus'; };
$('btn-quit').onclick = ()=>game.quitToTitle();
$('btn-retry').onclick = ()=>{ $('gameover').classList.add('hidden'); game.role==='client'?game.startClient():(game.role==='host'?game.startHost($('host-code').textContent||'HB-??????'):game.startSolo()); };
$('btn-title2').onclick = ()=>game.quitToTitle();
$('chat-input').addEventListener('keydown',(e)=>{ if(e.key==='Enter'){ e.stopPropagation(); game.sendChat(e.target.value); e.target.value=''; e.target.blur(); } e.stopPropagation(); }, true);

// Canvas-Klick blendet Hilfe aus
game.canvas.addEventListener('click',()=>{ if(game.state==='playing'&&!$('hud').classList.contains('hidden')){} });
addEventListener('keydown',(e)=>{ if(e.code==='Escape'&&game.state==='paused'){ /* handled in game */ } });
console.log('%cHEARTBOUND: Dusk Reborn — eigenes, KH2-inspiriertes Original. Keine Square-Enix/Disney-Assets.','color:#ffd76a;font-size:14px');
