# 2026-07-18 — Global size-guide registry and injector

## Scope

Added one global sizing system for featured Spellweaves, Step 3 base-jacket product modals, and qualifying native Fourthwall product pages.

## Runtime changes

### `fourthwall/kwfw-size-guide-data.js`

Created the central chart registry. Each chart owns its exact title, product slugs, title aliases, selected-variant aliases, measurement columns, rows, and notes.

Initial chart set:

- Neo4ic Zyphr Mantle
- Ladies Rocker Vest
- Men's Leather Rocker Vest
- Ladies Moto Vest
- Men's Moto Vest
- Men's Hexweave Merc Vest
- Men's Blackout Merc Vest
- Men's Hooded Vest
- Men's Denim Vest
- Men's Tactical Vest
- Men's Punkass Vest
- Men's Black & Red Moto Vest
- Men's Classic Leather Moto Vest

### `fourthwall/kwfw-size-guide.js`

Replaced broad category guessing with exact resolution priority:

1. Current selected-variant aliases.
2. Exact product slug.
3. Exact product-title aliases.
4. Controlled phrase aliases.

The runtime now:

- Injects into `.kwfw-panel` before `[data-kwfw-add]`.
- Injects into `.kwpj-panel` before `[data-kwpj-add]`.
- Injects into native `/products/` pages only when the current title, slug, or selected option resolves to a registered chart.
- Re-evaluates after variant changes.
- Changes an open popup to the newly selected garment chart.
- Supports explicit buttons using `data-kw-size-guide="chart-key"`.
- Preserves US/Metric preference in `kw_size_unit`.
- Converts numeric values and numeric ranges from inches to centimeters.
- Supports close button, backdrop click, Escape, body scroll lock, and focus restoration.

### `fourthwall/kwfw-size-guide.css`

Updated the Size Guide button for modal and native product-page placement. Preserved regular Arial/Helvetica table typography, responsive table scrolling, sticky popup controls, and mobile layout.

### `fourthwall/global/kw-fourthwall-loader.js`

Changed size-guide CSS/JS from old pinned commits to `selfRef` and added `kwfw-size-guide-data.js` before the runtime. Cache key candidate: `20260717-size-guide-registry-1`.

## Source-data limitations

- The uploaded Punkass chart's 8X-Large row was obscured, so it was omitted rather than inferred.
- The uploaded Black & Red Moto chart's rows below brand size 42 were obscured, so they were omitted rather than inferred.

## Validation

- `kwfw-size-guide-data.js` passed `node --check`.
- `kwfw-size-guide.js` passed `node --check`.
- Loader order was checked so registry data loads before the injector.
- No carousel wheel, grid, card-size, price, CTA, or variant-gallery files changed.

## Rollback

Restore global loader commit `8ef32a18b59ef932c9b5364ca3e37c72183d5c3e` with cache key `20260717-variant-gallery-2`. The four size-guide runtime commits can then be reverted independently.
