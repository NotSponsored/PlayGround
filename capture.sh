#!/usr/bin/env bash
# Capture desktop + mobile screenshots of the preview.
# - Reads CAPTURE_URL (exact page to open) and CAPTURE_DIR (output dir).
# - Saves final-desktop.png and final-mobile.png into CAPTURE_DIR (outside
#   the project source) and leaves the app running.
# - Exit 75: temporary navigation/browser infrastructure failure.
# - Exit 1: script usage error or page/rendering defect.
set -euo pipefail
time -p cd "$(dirname "$0")"
/usr/bin/time -p bash -c ': "${CAPTURE_URL:?Set CAPTURE_URL to the preview URL.}"'
/usr/bin/time -p bash -c ': "${CAPTURE_DIR:?Set CAPTURE_DIR to the capture output directory.}"'
/usr/bin/time -p node "${RUNTIME_DIR:?}/scripts/default-capture.mjs"
