# Pre-Flight Check Log

This is the rolling pre-flight log for the Knight Witch site/widgets repository. Older detailed entries remain available through Git history and paired files under `/HISTORY/DIFFS/`.

## 2026-07-18 21:20 UTC — PF-20260718-020 — Standard modal description and variant-control layout

Requested change:

- Move Spellweave and Cauldron Core descriptions from the full-width row below the gallery into the standard modal’s right-side information column.
- Rename the standard combined variant option label from `Description` to `Size & Style Variant`.
- Give each standard product select a stable width based on that product’s longest option, rather than the currently selected option or the full column width.
- Leave the Step 3 jacket modal unchanged.

Docs/files reviewed:

- `/OPERATING_CONTRACT.md`
- `/ARCHITECTURE.md`
- `/STYLE_KEYS.md`
- `/MASTER.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `/fourthwall/README.md`
- `/fourthwall/global/README.md`
- `/fourthwall/global/CHANGELOG.md`
- Base standard `fourthwall/kwfw-carousel.js` at its production pin
- `fourthwall/kwfw-universal-media.js`
- `fourthwall/kwfw-universal-media.css`
- `fourthwall/kwfw-modal-product-fix.js`
- `fourthwall/kwfw-modal-product-fix.css`
- Step 3 `components/kw-plain-jackets/kw-plain-jackets-v2.js`
- Step 3 `components/kw-plain-jackets/kw-plain-jackets.css`
- Supplied standard and Step 3 modal screenshots

Risk/conflict notes:

- The standard carousel already renders `.kwfw-desc` inside `.kwfw-panel-info`; the universal-media runtime deliberately cloned it into `.kwfw-desc-wide` and hid the original on desktop. The full-width description was therefore not owned by the base carousel.
- Existing editor sessions may retain the old universal-media MutationObserver after a loader swap. CSS must hide any legacy `.kwfw-desc-wide` clone even after the new runtime stops creating it.
- The Step 3 description already remains in `.kwpj-info` and must not be modified.
- The `Description` option key is used by the standard base carousel to select the correct Fourthwall variant and add it to cart. Only the visible label can change; the option key/data attribute must remain intact.
- Select width measurement must inspect all option labels, include native select padding/arrow space, remain fixed while the user switches variants, and clamp to the available right-column width.

Plan/result:

- Updated universal-media CSS so the original `.kwfw-panel-info > .kwfw-desc` is visible and `.kwfw-desc-wide` is always hidden.
- Updated universal-media JavaScript to stop cloning descriptions and remove legacy clones it encounters.
- Extended the shared modal compatibility runtime with standard-only option presentation logic.
- Renamed only the visible `Description` label.
- Measured the longest option using the select’s computed font and assigned a stable inline width with a responsive maximum.
- Added recalculation after modal creation, font readiness, and viewport resize.
- Preserved all `.kwpj-*` source and behavior.
- Moved universal-media CSS/JS to the current pinned `selfRef` in the global loader and bumped the cache key.

Validation:

- `node --check` passed for both updated JavaScript files.
- Confirmed Step 3 files were inspected but not modified.
- Confirmed no size-chart registry/routing, price resolution, Add to Cart request, selected-variant gallery selection, carousel card, rail, grid, or wheel code changed.
- Live storefront verification remains required after replacing the pinned footer.

User input required:

- None.

## 2026-07-18 20:40 UTC — PF-20260718-019 — Featured row compatibility and chart compaction

Added legacy-row-compatible Featured alignment selectors, AgencyFB chart titles, content-driven chart widths, and tighter mobile table spacing. Step 3 remained unchanged.

## 2026-07-18 05:30 UTC — PF-20260718-018 — Samurai routing and original Featured row ownership

Restored Featured quantity-box ownership, preserved Step 3 field-level wrapping, added product-scoped material rules, corrected Samurai vest routing, and added separate Vegan/Genuine unisex Samurai Moto charts.

## 2026-07-18 04:55 UTC — PF-20260718-017 — Restore Featured Spellweave quantity row

Split Featured and Step 3 styling by namespace. Live Featured verification remained unsuccessful and was superseded by later work.

## 2026-07-18 04:40 UTC — PF-20260718-016 — Featured Size Guide vertical alignment

Attempted `display:contents`/explicit grid-row placement for Featured. Live verification failed; this state is not production-valid.

## 2026-07-18 04:25 UTC — PF-20260718-015 — Namespace-specific quantity-row correction

Applied explicit quantity geometry. Step 3 verified fixed; Featured remained unresolved.

## 2026-07-18 04:05 UTC — PF-20260718-014 — Size Guide quantity-control spacing

Introduced a separate Size Guide column to prevent quantity overlap.

## 2026-07-18 03:25 UTC — PF-20260718-013 — Correct ladies garment chart identities

Replaced generic ladies chart names with exact Crop-Top Rocker/Snakeskin, Goth Merc, Punkass, and Biker mappings. Removed the unverified generic ladies moto mapping.

## 2026-07-18 02:45 UTC — PF-20260718-012 — Size Guide modal placement and typography

Moved Size Guide into carousel quantity rows and retained native-page placement.

## 2026-07-18 00:25 UTC — PF-20260718-011 — Global product size-guide registry

Created the exact chart registry and targeted injector for standard modals, Step 3 modals, and qualifying native product pages.

## 2026-07-17 — Product modal compatibility

Restored real prices and modal CTA styling, added variant-specific galleries, and corrected variant matching without changing carousel scrolling.
