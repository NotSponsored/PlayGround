/* 2D-Top-down-Welt: Canvas, Tilemap, Zufallsräume, Kollision, Encounter-Auslösung. Eigene Roguelite-Regel (kein FFd20). */
'use strict';
var FFD20 = FFD20 || {};
FFD20.World = (function () {
  var TILE = 32, W = 20, H = 15;
  var state = null;
  function genZone(zone) {
    // 0 Wand, 1 Boden, 2 Schatz, 3 Ausgang/Boss, 4 Encounter-Marker (unsichtbar bis Trigger)
    var map = [];
    for (var y = 0; y < H; y++) { map.push([]); for (var x = 0; x < W; x++) map[y].push((x === 0 || y === 0 || x === W - 1 || y === H - 1) ? 0 : 1); }
    // Zufallswände (Räume)
    for (var i = 0; i < 14; i++) {
      var wx = 2 + Math.floor(Math.random() * (W - 4)), wy = 2 + Math.floor(Math.random() * (H - 4));
      var len = 2 + Math.floor(Math.random() * 4), horiz = Math.random() < 0.5;
      for (var k = 0; k < len; k++) {
        var ax = horiz ? wx + k : wx, ay = horiz ? wy : wy + k;
        if (ax > 0 && ay > 0 && ax < W - 1 && ay < H - 1 && !(ax === 2 && ay === 2)) map[ay][ax] = 0;
      }
    }
    function freeSpot() {
      for (var t = 0; t < 200; t++) {
        var x = 1 + Math.floor(Math.random() * (W - 2)), y = 1 + Math.floor(Math.random() * (H - 2));
        if (map[y][x] === 1 && !(x <= 3 && y <= 3)) return { x: x, y: y };
      }
      return { x: W - 3, y: H - 3 };
    }
    var isBoss = zone % 3 === 0;
    var nFights = isBoss ? 1 : 3 + Math.min(3, zone);
    var encounters = [];
    for (var e = 0; e < nFights; e++) encounters.push(freeSpot());
    var chest = freeSpot(); map[chest.y][chest.x] = 2;
    var exit = freeSpot(); map[exit.y][exit.x] = 3;
    return { map: map, encounters: encounters, chest: chest, exit: exit, isBoss: isBoss, chestLooted: false };
  }
  function start(zone) {
    state = { zone: zone, data: genZone(zone), px: 2, py: 2, fx: 2, fy: 2 };
    return state;
  }
  function tryMove(dx, dy) {
    if (!state) return { event: null };
    var nx = state.px + dx, ny = state.py + dy;
    if (nx < 0 || ny < 0 || nx >= W || ny >= H) return { event: null };
    if (state.data.map[ny][nx] === 0) return { event: null };
    state.px = nx; state.py = ny;
    // Encounter?
    for (var i = 0; i < state.data.encounters.length; i++) {
      var e = state.data.encounters[i];
      if (e && e.x === nx && e.y === ny) { state.data.encounters[i] = null; return { event: 'fight', boss: state.data.isBoss && i === 0 }; }
    }
    if (state.data.chest.x === nx && state.data.chest.y === ny && !state.data.chestLooted) {
      state.data.chestLooted = true; return { event: 'chest' };
    }
    if (state.data.exit.x === nx && state.data.exit.y === ny) return { event: state.data.isBoss ? 'boss' : 'exit' };
    return { event: null };
  }
  function draw(ctx) {
    if (!state) return;
    ctx.clearRect(0, 0, W * TILE, H * TILE);
    for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
      var t = state.data.map[y][x];
      ctx.fillStyle = t === 0 ? '#262b45' : t === 2 ? '#5a4a1a' : t === 3 ? '#1a5a3a' : '#141830';
      ctx.fillRect(x * TILE, y * TILE, TILE - 1, TILE - 1);
      if (t === 2 && !state.data.chestLooted) { ctx.fillStyle = '#e8c35a'; ctx.fillRect(x * TILE + 10, y * TILE + 10, 12, 12); }
      if (t === 3) { ctx.fillStyle = '#2ecc71'; ctx.font = '12px sans-serif'; ctx.fillText(state.data.isBoss ? 'BOSS' : 'EXIT', x * TILE + 2, y * TILE + 18); }
    }
    // Spieler
    ctx.fillStyle = '#e8c35a';
    ctx.beginPath(); ctx.arc(state.px * TILE + 16, state.py * TILE + 16, 11, 0, 7); ctx.fill();
    ctx.fillStyle = '#000'; ctx.font = '10px sans-serif'; ctx.fillText('PC', state.px * TILE + 8, state.py * TILE + 20);
  }
  return { start: start, tryMove: tryMove, draw: draw, get: function () { return state; }, W: W, H: H, TILE: TILE };
})();
