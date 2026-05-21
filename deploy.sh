#!/usr/bin/env bash
# Deploy the Kustom Garment site to dev.kustomgarment.com (VPS, nginx static).
# Usage:  bash deploy.sh
set -euo pipefail
cd "$(dirname "$0")"

REMOTE="kg-vps:/home/fabrikgroup/web/dev.kustomgarment.com/public_html/dist/"

echo "==> Building..."
npm run build

echo "==> Uploading dist -> $REMOTE"
rsync -avz --delete dist/ "$REMOTE"

echo "==> Done. Live at https://dev.kustomgarment.com"
