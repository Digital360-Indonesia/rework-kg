# Handoff → Lord-Shipwright

**From:** Manager-Lord (Claudy)
**Date:** 2026-05-22
**Re:** Route B — auto-deploy on push so CMS edits go live without a manual `deploy.sh`. (Araya's pick: do this before R2 offsite backup.)

---

## Why
CMS saves commit to `main` but the live site only updates when someone runs `deploy.sh`. Editors see no change after saving → feels broken. A GitHub Action that builds + rsyncs on push closes the gap. This is your lane (CI + the deploy key); I own the app/content, so I'm handing the workflow to you to finalize + own `.github/workflows/`.

## Recommended approach (build-in-CI + rsync, mirrors deploy.sh)
A workflow on push to `main` (+ manual `workflow_dispatch`): checkout → `npm ci` → `npm run build` → rsync `dist/` to the VPS over SSH. Draft to adapt:

```yaml
name: Deploy to VPS
on:
  push: { branches: [main] }
  workflow_dispatch:
concurrency: { group: deploy-vps, cancel-in-progress: true }
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
      - name: SSH setup
        run: |
          mkdir -p ~/.ssh && echo "${{ secrets.VPS_SSH_KEY }}" > ~/.ssh/id && chmod 600 ~/.ssh/id
          ssh-keyscan -H "${{ secrets.VPS_HOST }}" >> ~/.ssh/known_hosts
      - name: rsync
        run: rsync -avz --delete -e "ssh -i ~/.ssh/id" dist/ "${{ secrets.VPS_USER }}@${{ secrets.VPS_HOST }}:${{ secrets.VPS_PATH }}"
```

## What you decide / set
- **Dedicated CI deploy key (recommended over reusing Araya's `id_ed25519_new`):** generate a new keypair, add the public key to the VPS `fabrikgroup` `authorized_keys`, store the **private** key as the `VPS_SSH_KEY` GitHub Actions secret. Cleaner to rotate; doesn't expose Araya's personal key.
- **Repo secrets to add** (GitHub → repo Settings → Secrets and variables → Actions): `VPS_SSH_KEY`, `VPS_HOST`, `VPS_USER` (`fabrikgroup`), `VPS_PATH` (`/home/fabrikgroup/web/dev.kustomgarment.com/public_html/dist/`). **Needs repo admin** — if you lack it, Araya adds the secrets (you provide the values).
- Keep `deploy.sh` as the manual fallback.
- **PocketBase/`/pb/` is unaffected** — the Action only rsyncs `dist/`, never touches `pb_data` or nginx.

## Verify
- Make a trivial commit (or a CMS edit) → Action runs green → change appears live within ~1–2 min (mind Cloudflare cache).

## Note
- `business.astro` keeps showing fresh uncommitted WIP at deploy time — once Route B is live, that WIP still won't deploy until Page-Builder commits it (Action builds committed `main` only). Worth flagging to Page-Builder.

— Manager-Lord, on behalf of Araya
