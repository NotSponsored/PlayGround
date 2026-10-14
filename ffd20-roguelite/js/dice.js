/* Würfel-Engine. Quelle: Pathfinder 1e Core (d20-System), via FFd20 System Rules → Pathfinder Basics. */
'use strict';
var FFD20 = FFD20 || {};
FFD20.Dice = (function () {
  var rng = Math.random;
  function setRng(fn) { rng = fn; }
  function roll(sides) { return 1 + Math.floor(rng() * sides); }
  // Parse "2d6+3", "d20", "4d4x3" (xN = multipliziere Würfelanzahl, für FFd20 Waffenschaden-Regel)
  function parse(expr) {
    var m = /^(\d*)d(\d+)([+-]\d+)?(x(\d+))?$/.exec(String(expr).trim());
    if (!m) throw new Error('Ungültiger Würfelausdruck: ' + expr);
    return { n: m[1] === '' ? 1 : +m[1], sides: +m[2], mod: m[3] ? +m[3] : 0, mult: m[5] ? +m[5] : 1 };
  }
  function rollExpr(expr) {
    var p = parse(expr), total = p.mod, rolls = [];
    for (var i = 0; i < p.n * p.mult; i++) { var r = roll(p.sides); rolls.push(r); total += r; }
    return { total: total, rolls: rolls, expr: expr };
  }
  function d20() { return roll(20); }
  return { roll: roll, rollExpr: rollExpr, parse: parse, d20: d20, setRng: setRng };
})();
