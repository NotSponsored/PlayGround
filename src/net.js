// P2P Multiplayer via PeerJS-Cloud (kein eigener Server nötig).
// Host ist autoritativ für Gegner/Wellen. Spieler-States werden per Mesh verteilt.
import { Peer } from 'peerjs';

export class Net {
  constructor(game){
    this.game = game;
    this.peer = null; this.conns = new Map();
    this.isHost = false; this.joined = false;
    this.myId = ''; this.hostId = '';
    this.lastSend = 0; this.onStatus = (s)=>{};
  }
  status(s){ this.onStatus(s); }
  makeCode(){ const c='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; let s=''; for(let i=0;i<6;i++) s+=c[Math.floor(Math.random()*c.length)]; return 'HB-'+s; }
  normalize(code){ return code.trim().toUpperCase().replace(/[^A-Z0-9-]/g,''); }

  async host(onReady, attempt=1, code=null){
    this.isHost = true;
    if(!code) code = this.makeCode();
    const myCode = code;
    this.myId = 'heartbound-'+myCode;
    this.status('Erstelle Host '+code+' … (Versuch '+attempt+')');
    try{ this.peer?.destroy(); }catch{}
    this.conns.clear();
    this.peer = new Peer(this.myId, { debug: 0 });
    this.peer.on('open', ()=>{ this.status('Host bereit! Code: '+myCode+' — warte auf Mitspieler…'); onReady(myCode, attempt); this.game.setMultiplayer('host'); });
    this.peer.on('connection', (c)=>this.bindConn(c, true));
    this.peer.on('error', (e)=>{
      console.warn(e);
      if(e.type==='unavailable-id'&&attempt===1){ this.status('Code belegt, versuche neuen…'); setTimeout(()=>this.host(onReady,1,null),500); }
      else if((e.type==='network'||e.type==='server-error'||e.type==='socket-error'||e.type==='socket-closed')&&attempt<5){
        this.status('Netzwerk wackelt — neuer Versuch in 4s … (solange spielst du mit KI-Partner)');
        setTimeout(()=>{ if(this.isHost&&!this.peer?.open) this.host(onReady,attempt+1,myCode); },4000);
      }
      else this.status('Netzwerk: '+e.type+' — du spielst solange mit KI-Partnern. (Beide brauchen Internet/WebSocket zur PeerJS-Cloud.)');
    });
  }

  async join(codeRaw, onReady){
    const code = this.normalize(codeRaw);
    if(!code) { this.status('Bitte gültigen Host-Code eingeben.'); return; }
    this.isHost = false; this.hostId = 'heartbound-'+code;
    this.myId = 'heartbound-P-'+Math.random().toString(36).slice(2,8).toUpperCase();
    this.status('Verbinde mit '+code+' …');
    this.peer = new Peer(this.myId, { debug: 0 });
    this.peer.on('open', ()=>{
      const c = this.peer.connect(this.hostId, { reliable: true });
      c.on('open', ()=>{ this.bindConn(c, false); this.joined=true; this.status('Verbunden mit '+code+'!'); onReady(); this.game.setMultiplayer('client'); });
      c.on('error', (e)=>this.status('Verbindung fehlgeschlagen: '+e));
    });
    this.peer.on('error', (e)=>{ console.warn(e); this.status('Fehler: '+e.type+' (PeerJS-Cloud erreichbar? Prüfe Internet/Adblock).'); });
    // Timeout-Hinweis
    setTimeout(()=>{ if(!this.joined) this.status('Noch kein Kontakt — Host-Code prüfen, beide online? Adblock/P2P blockiert?'); }, 8000);
  }

  bindConn(conn, incoming){
    this.conns.set(conn.peer, conn);
    this.game.addRemotePlayer(conn.peer);
    this.status((incoming?'Mitspieler beigetreten: ':'Verbunden: ')+conn.peer+' ('+this.conns.size+' verbunden)');
    conn.on('data', (d)=>this.game.onNetData(conn.peer, d));
    conn.on('close', ()=>{ this.conns.delete(conn.peer); this.game.removeRemotePlayer(conn.peer); this.status('Mitspieler getrennt: '+conn.peer); });
    conn.on('error', ()=>{});
    // Falls Host: sofort Snapshot schicken
    if(this.isHost) setTimeout(()=>this.game.sendSnapshotTo(conn.peer), 800);
  }

  broadcast(kind, payload, except=null){
    for(const [id,c] of this.conns){
      if(id===except||!c.open) continue;
      try{ c.send({kind, ...payload, _from:this.myId}); }catch{}
    }
  }
  sendTo(id, kind, payload){
    const c=this.conns.get(id); if(c&&c.open){ try{c.send({kind,...payload,_from:this.myId})}catch{} }
  }
  peerCount(){ return this.conns.size+1; }
  destroy(){ try{this.peer?.destroy()}catch{} this.conns.clear(); }
}
