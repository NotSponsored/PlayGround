#!/usr/bin/env bash
# Capture desktop + mobile screenshots of the running app.
# Inputs: CAPTURE_URL, CAPTURE_DIR. Leaves the app running.
set -euo pipefail
time -p cd "$(dirname "$0")"
if [[ -z "${CAPTURE_URL:-}" || -z "${CAPTURE_DIR:-}" ]]; then
  echo "Set CAPTURE_URL and CAPTURE_DIR." >&2
  exit 1
fi
time -p mkdir -p "$CAPTURE_DIR"
time -p node "${RUNTIME_DIR:?}/scripts/default-capture.mjs"
