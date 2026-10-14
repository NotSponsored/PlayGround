#!/usr/bin/env bash
# Static server for the FFd20 Roguelite browser game.
# Build output lives inside PROJECT_DIR (./dist); OPENCODE_WEB_DIR is only
# used for worker metadata (deployment-output.json).
set -euo pipefail
time -p cd "$(dirname "$0")"
time -p rm -rf dist
time -p cp -r ffd20-roguelite dist
time -p test -f dist/index.html
if [[ -f package.json ]]; then
  time -p npm install --no-audit --no-fund
  time -p npm run build
fi
PORT="${PORT:-3000}"
export PORT
PROJECT_DIR="$(pwd)"
export PROJECT_DIR
WEB_DIR="${OPENCODE_WEB_DIR:-/home/runner/work/_temp/omgithub-web}"
export WEB_DIR
time -p mkdir -p "$WEB_DIR"
time -p node <<'EOF'
const fs = require("fs"), path = require("path");
const dir = process.env.WEB_DIR || "/home/runner/work/_temp/omgithub-web";
const out = {
  project: process.env.PROJECT_DIR,
  directory: path.join(process.env.PROJECT_DIR, "dist")
};
fs.writeFileSync(path.join(dir, "deployment-output.json"), JSON.stringify(out));
console.log("wrote " + path.join(dir, "deployment-output.json"));
EOF
time -p exec node --eval '
const http = require("http"), fs = require("fs"), path = require("path");
const root = path.join(process.env.PROJECT_DIR || process.cwd(), "dist");
const mime = { ".html": "text/html", ".js": "application/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png" };
http.createServer((req, res) => {
  try {
    const p = path.resolve(root, "." + decodeURIComponent(new URL(req.url, "http://x").pathname));
    if (p !== root && !p.startsWith(root + path.sep)) { res.writeHead(404); res.end(); return; }
    const f = fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
    res.writeHead(200, { "Content-Type": mime[path.extname(f)] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(fs.readFileSync(f));
  } catch { res.writeHead(404); res.end("Not found"); }
}).listen(Number(process.env.PORT || 3000), "0.0.0.0", () => console.log("serving " + root + " on " + (process.env.PORT || 3000)));
'
