# Checkpoint — 2026-05-21 (VPS deploy of dev.kustomgarment.com)

**Branch:** `main` (uncommitted, greenfield — fine per Araya).
Continues from `checkpoint-2026-05-21.md` (CMS + pages + media). This session: got the real site **live** on the VPS the devs had pre-provisioned.

## What shipped
`https://dev.kustomgarment.com` now serves the real Astro build (was a placeholder "Aku araya"). Verified: server file = real HTML, public URL HTTP 200 (101 KB) through Cloudflare, title renders.

## Infrastructure (discovered + wired)
- **Host:** Hostinger VPS — IP `72.61.214.241`, `srv1187723.hstgr.cloud`, HestiaCP panel at `:8083`. Cloudflare in front of the domain.
- **Site path:** HestiaCP user `fabrikgroup`. nginx document root = `/home/fabrikgroup/web/dev.kustomgarment.com/public_html/dist`. Devs had pre-built the folder + `dist/` subfolder + nginx vhost + Cloudflare, but only left placeholder files — the actual build was never deployed until now.
- **SSH:** passwordless `ssh kg-vps` (alias added to `~/.ssh/config`). Working key is `~/.ssh/id_ed25519_new` (not `id_ed25519`). `IdentitiesOnly yes` set.
- **Deploy script:** `rework-kg/deploy.sh` — `astro build` then `rsync -avz --delete dist/ kg-vps:.../dist/`. First push ~83 MB; incremental after. Run `bash deploy.sh` to redeploy.

## Decision log
- **Model A (rsync from Mac) over model B (git-based) for now.** Rationale: gets the site live today with zero new accounts; proves the whole pipe end-to-end. Model B (GitHub + Actions → deploy) is **required** for the Sveltia CMS to auto-publish admin edits, but its prerequisites (repo on GitHub, OAuth) aren't set up yet. Chose to ship A now and grow it into B later — the SSH key + rsync are reused by Actions, so nothing is throwaway.
- **Build goes in `dist/` subfolder, not `public_html`.** Confirmed via `grep root` on the vhost — devs pointed nginx at `public_html/dist`.
- **Reused existing key, didn't generate a new one.** `ssh-copy-id` installed `id_ed25519_new`; pinned it in config rather than making a fresh keypair.

## Next
- **CMS go-live (model B):** push repo to GitHub → GitHub OAuth for `/admin` → GitHub Actions builds on push (code *and* CMS commits) → deploy to this VPS reusing the key/rsync. (Needs Araya's GitHub/host accounts.)
- **Production:** same pattern pointed at `kustomgarment.com` (different folder/domain) when dev is approved.
- `/admin` is uploaded but non-functional in prod until the git backend is wired.
