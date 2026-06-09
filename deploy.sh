#!/usr/bin/env bash
# Deploy the Kustom Garment site to dev.kustomgarment.com (VPS, nginx static).
# Usage:  bash deploy.sh
set -euo pipefail
cd "$(dirname "$0")"

REMOTE="kg-vps:/home/fabrikgroup/web/dev.kustomgarment.com/public_html/dist/"

echo "==> Building (clean — wipe dist so no stale pages from a prior PMS_SOURCE=pb build leak through)..."
rm -rf dist
npm run build

echo "==> Uploading dist -> $REMOTE"
rsync -avz --checksum --delete dist/ "$REMOTE"

echo "==> Done. Live at https://dev.kustomgarment.com"
