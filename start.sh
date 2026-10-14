#!/usr/bin/env bash
# Project startup: serve the built static site in the foreground.
# - Runs from the project directory, installs dependencies and builds when
#   needed, then serves on PORT (default 3000) via the runtime starter.
# - Writes the deployment-output.json pointer (project + absolute dist dir).
# - Source and built output stay inside PROJECT_DIR; OPENCODE_WEB_DIR and
#   RUNNER_TEMP are only used for worker metadata / capture evidence.
set -euo pipefail
time -p cd "$(dirname "$0")"
if [[ -n "${OPENCODE_WEB_DIR:-}" ]]; then
  /usr/bin/time -p node -e 'const fs=require("node:fs"),path=require("node:path");const project=process.cwd();fs.mkdirSync(process.env.OPENCODE_WEB_DIR,{recursive:true});fs.writeFileSync(path.join(process.env.OPENCODE_WEB_DIR,"deployment-output.json"),JSON.stringify({project,directory:path.join(project,"dist")}));'
fi
/usr/bin/time -p node "${RUNTIME_DIR:?}/scripts/default-start.mjs"
