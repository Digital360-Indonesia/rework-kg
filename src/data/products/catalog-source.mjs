/**
 * Catalog source switch (Phase 2).
 *   PMS_SOURCE=pb  → load the catalog from PocketBase (the PMS) at build time.
 *   (unset/default) → use the committed catalog.json (current behaviour).
 * Always falls back to catalog.json if PocketBase is unreachable/empty, so the
 * build can never break. Pages import { catalog } (or default) from here.
 */
import json from './catalog.json';
import { loadCatalogFromPB } from './pms-adapter.mjs';

let catalog = json;
if (process.env.PMS_SOURCE === 'pb') {
  try {
    catalog = await loadCatalogFromPB();
    console.log(`[PMS] catalog from PocketBase — ${catalog.archetypes.length} products, ${catalog.fabrics.length} fabrics`);
  } catch (e) {
    console.warn(`[PMS] PocketBase load failed (${e.message}) — falling back to catalog.json`);
  }
}

export { catalog };
export default catalog;
