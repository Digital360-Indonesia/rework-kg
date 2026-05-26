# Customizer — Decoration panel concepts

File: `src/pages/produk/[slug]/custom.astro` (the `data-panel="decoration"` section).

Two concepts were built. **Concept B (placement map) is LIVE.** Concept A (row cards) is kept
here as a restorable backup. The two only differ in the decoration panel — the shared helpers
(`techIcon`, `DECO_ICON`, `updateDecoDetail`, `pulseDetail`, `compute`, `rp`, the `deco-head` /
`deco-title` / `cz-subline` / `deco-detail*` markup + CSS) stay the same for both.

---

## Concept B — Garment placement map (CURRENT / LIVE)

Shirt line-art with clickable hotspots per placement; click a hotspot → animated chooser of
techniques; Front/Back toggle; filled spots turn orange w/ technique icon; pinned total bar.

### TODO — polish later (not blocking)
- **Hotspot circle positions** are approximate. Tuned in the frontmatter `PLACE_MAP` (x/y are
  % of the SVG box). Nudge per placement once we have the real garment art.
- **Shirt art is a placeholder SVG** (hand-drawn paths in the markup, front + back). Replace with
  a precise kemeja diagram/image so hotspots line up exactly. When swapping to a real image,
  keep the `.dm-shirt` wrapper `position:relative` and the `.dm-hot` absolute `left/top %` model.
- Consider per-garment-type maps (kaos / jaket / topi) when more archetypes land — `PLACE_MAP`
  should become keyed by garment_type.
- Optional: real preview render (decoration shown on the left product image) — v2, needs assets.

---

## Concept A — Row cards (BACKUP — how to restore)

Compact list: each decoration is a card with technique icon + type/placement dropdowns + price
badge + remove, a dashed "+ Tambah dekorasi" button, pinned total bar. To restore, swap the three
blocks below back into `custom.astro` (replacing the Concept B map markup / CSS / JS).

### 1) Panel markup (replace the `data-panel="decoration"` section body)

```astro
<section class="cz-panel" data-panel="decoration">
  <div class="deco-head"><h2 class="deco-title">Dekorasi</h2></div>
  <p class="cz-subline">Tambah bordir, sablon, patch, atau nama. Bisa lebih dari satu titik.</p>
  <div class="deco-scroll">
    <div class="deco-list" id="cz-decolist"></div>
    <button class="deco-add" id="cz-addrow">+ Tambah dekorasi</button>
  </div>
  <div class="deco-detail">
    <div class="deco-detail-l"><span id="deco-count">0 dekorasi</span></div>
    <div class="deco-detail-r"><span class="deco-detail-lbl">Tambahan</span><span id="deco-total">+Rp 0</span><span class="deco-detail-note">/pc</span></div>
  </div>
</section>
```

### 2) CSS (replace the `.dm-*` block with this `.deco-*` block)

```css
.deco-scroll { flex: 1 1 auto; min-height: 0; overflow-y: auto; padding: 0 1.5rem 1.2rem; }
.deco-list { display: flex; flex-direction: column; gap: 0.7rem; margin-bottom: 0.8rem; }
.deco-card { display: grid; grid-template-columns: auto 1fr auto; gap: 0.9rem; align-items: center; background: #fff; border: 1px solid #e2e2e2; border-radius: 0.7rem; padding: 0.75rem 0.85rem; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
.deco-ic { width: 2.6rem; height: 2.6rem; border-radius: 0.55rem; background: #f2f2f2; color: #1a1a1a; display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
.deco-ic svg { width: 1.4rem; height: 1.4rem; }
.deco-fields { display: flex; flex-direction: column; gap: 0.4rem; min-width: 0; }
.deco-fields select { font: inherit; font-size: 0.85rem; padding: 0.45rem 0.5rem; border: 1px solid #e2e2e2; border-radius: 0.45rem; background: #fff; color: #1a1a1a; width: 100%; cursor: pointer; }
.deco-fields select:focus { outline: none; border-color: #ff4c00; }
.deco-right { display: flex; flex-direction: column; align-items: flex-end; gap: 0.4rem; flex: 0 0 auto; }
.deco-price { font-weight: 700; font-size: 0.82rem; color: #1a1a1a; white-space: nowrap; }
.deco-del { background: none; border: 0; color: #b0b0b0; cursor: pointer; font-size: 1.2rem; line-height: 1; padding: 0; }
.deco-del:hover { color: #ff6b7a; }
.deco-empty { font-size: 0.85rem; color: #9ca3af; padding: 0.6rem 0 1rem; text-align: center; }
.deco-add { width: 100%; border: 1.5px dashed #c6c6c6; background: none; border-radius: 0.7rem; padding: 0.85rem; color: #6b7280; font-weight: 700; font-size: 0.88rem; cursor: pointer; transition: border-color 160ms ease, color 160ms ease, background 160ms ease; }
.deco-add:hover { border-color: #ff4c00; color: #ff4c00; background: rgba(255,76,0,0.03); }
```

### 3) JS (replace the map fns: `dmActive`, `decoFor`, `placeLabel`, `renderDecoHotspots`,
`renderChooser`, `openChooser`, `closeChooser`, `assignTech`, `removePlace`, `renderDecos`
with this single `renderDecos`; and replace the `.dm-hot` / `.dm-viewtab` init wiring with the
one `$('cz-addrow')` handler).

```ts
function renderDecos() {
  const list = $('cz-decolist');
  list.innerHTML = state.decorations.length ? state.decorations.map((d: any, i: number) => {
    const t = cfg.decos.find((x: any) => x.id === d.typeId) || cfg.decos[0];
    const typeOpts = cfg.decos.map((dt: any) => `<option value="${dt.id}"${dt.id === d.typeId ? ' selected' : ''}>${dt.name}</option>`).join('');
    const placeOpts = cfg.placements.map((p: string) => `<option${p === d.placement ? ' selected' : ''}>${p}</option>`).join('');
    return `<div class="deco-card" data-i="${i}">
      <span class="deco-ic">${techIcon(t.technique)}</span>
      <div class="deco-fields"><select class="cz-dtype">${typeOpts}</select><select class="cz-dplace">${placeOpts}</select></div>
      <div class="deco-right"><span class="deco-price">+${rp(t.add_on_per_pc)}</span><button class="deco-del" aria-label="Hapus">×</button></div>
    </div>`;
  }).join('') : '<div class="deco-empty">Belum ada dekorasi. Tambah di bawah ↓</div>';
  list.querySelectorAll<HTMLElement>('.deco-card').forEach((row) => {
    const i = +row.dataset.i!;
    row.querySelector<HTMLSelectElement>('.cz-dtype')!.addEventListener('change', (e) => { state.decorations[i].typeId = (e.target as HTMLSelectElement).value; renderDecos(); refresh(); });
    row.querySelector<HTMLSelectElement>('.cz-dplace')!.addEventListener('change', (e) => { state.decorations[i].placement = (e.target as HTMLSelectElement).value; });
    row.querySelector<HTMLElement>('.deco-del')!.addEventListener('click', () => { state.decorations.splice(i, 1); renderDecos(); refresh(); });
  });
  updateDecoDetail();
}

// init wiring (instead of the .dm-hot / .dm-viewtab handlers):
$('cz-addrow').addEventListener('click', () => { state.decorations.push({ typeId: cfg.decos[0].id, placement: cfg.placements[0] }); renderDecos(); refresh(); pulseDetail(document.querySelector('.deco-detail')); });
```

Note: the map's frontmatter `PLACE_MAP` / `frontHots` / `backHots` can stay (unused) if you only
swap the panel back; or remove them. Concept A uses `cfg.placements` for the placement dropdown.
