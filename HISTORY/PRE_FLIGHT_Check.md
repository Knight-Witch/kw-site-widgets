# Pre-Flight Check Log

This is the rolling pre-flight log for the Knight Witch site/widgets repository. Older detailed entries remain available through Git history and paired files under `/HISTORY/DIFFS/`.

## 2026-08-27 06:51 UTC — PF-20260827-025 — Step title-bar black fill

Requested change:

- Give `.kw-title-bar--step` containers a 95%-opaque black background inside the existing red border.
- Preserve the current title-bar dimensions, typography, spacing, border, and other variants.

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
- `/components/kw-title-bars/README.md`
- `components/kw-title-bars/kw-title-bars.css`
- `components/kw-title-bars/kw-title-bars-hotfix.css`
- `components/kw-title-bars/kw-title-bars-hotfix-loader.js`
- `fourthwall/global/kw-fourthwall-loader.js`

Risk/conflict notes:

- The temporary hotfix forces `.kw-title-bar` to `background:transparent!important` and loads after the base stylesheet.
- A normal background declaration in the base step rule would therefore remain transparent in production.
- The fill must be scoped to the step variant so Featured Spellweaves and compact title bars are unchanged.
- No loader-order, JavaScript, dimensions, or responsive behavior needs to change.

Plan:

- Add a step-specific 95%-opaque black background to the base stylesheet with enough specificity to beat the active hotfix.
- Mirror the same step-specific rule in the hotfix source for compatibility parity.
- Update the title-bar style documentation and history records.

Result/validation:

- Added `.kw-title-bar.kw-title-bar--step` with `background:rgba(0, 0, 0, .95)!important` to both title-bar stylesheets.
- Confirmed the base selector has greater specificity than the active hotfix's general transparent-background selector.
- Confirmed jsDelivr serves the updated base stylesheet from `@main` with the existing loader cache query.
- Ran `git diff --check`; no whitespace errors were reported.
- Live visual verification in Fourthwall remains required.

User input required:

- None. The user confirmed 95% opacity, leaving 5% transparency.

## 2026-07-19 01:10 UTC — PF-20260719-024 — Media-only compact carousel cards

Requested change:

- Remove product titles from all compact product carousel tiles.
- Remove Collection Domain subtitles from all compact product carousel tiles.
- Preserve product title and Collection Domain presentation inside expanded product windows.
- Leave standard and Step 3 card media/actions intact.

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
- `fourthwall/kw-product-modal-presentation.css`
- `fourthwall/kw-product-modal-presentation.js`
- Production-pinned `fourthwall/kwfw-carousel.css`
- Branch-owned `components/kw-plain-jackets/kw-plain-jackets.css`
- `fourthwall/global/kw-fourthwall-loader.js`
- Supplied standard compact-card and expanded-modal screenshots

Risk/conflict notes:

- Standard card titles are displayed by the pinned base carousel and restored by the shared presentation stylesheet.
- Older Fourthwall editor script instances can leave `.kw-product-card-collection-link` elements in compact cards after a hot reload.
- Step 3 already hides `.kwpj-name`, but defensive global consistency is required.
- Expanded modal titles use `.kwfw-panel-title` / `.kwpj-panel-title` and modal collection subtitles use `.kw-product-collection-link`; these must not be hidden.
- Product media, CTA, prices, variants, galleries, Size Guide, rails, grids, and wheel behavior must remain untouched.

Plan/result:

- Added final namespace-scoped suppression selectors in `kw-product-modal-presentation.css`.
- Hid `.kwfw-card-title` and card-scoped `.kw-product-card-collection-link`.
- Kept `.kwpj-name` hidden with a defensive global selector.
- Did not target expanded modal title or collection-link classes.
- Bumped the global loader cache key.
- Did not modify JavaScript or branch-owned Step 3 source.

Validation:

- Verified the suppression block appears after earlier compact-title/subtitle display declarations.
- Verified `display:none!important` has greater specificity than the earlier `.kwfw-card-title` rule.
- Verified modal title/subtitle selectors are separate and unaffected.
- Verified no product loading, variant, price, cart, Size Guide, selected-gallery, rail, grid, or wheel file changed.
- Live desktop/mobile verification remains required for standard and Step 3 compact cards.

User input required:

- None.

## 2026-07-19 00:35 UTC — PF-20260719-023 — Collection-aware featured product cards

Added the controlled six-collection registry, one-time product-membership indexing, mixed-carousel-safe product resolution, clean product-title formatting, and linked Collection Domain subtitles. Product/variant/cart/gallery/scroll systems remained unchanged.

## 2026-07-18 23:58 UTC — PF-20260718-022 — Unified standard and Step 3 modal presentation

Added the shared expanded-modal presentation layer, black surfaces, synchronized gallery geometry, AgencyFB typography, transparent arrows, mobile spacing, and controlled collection subtitles.

## 2026-07-18 22:05 UTC — PF-20260718-021 — Step 3 modal gallery top alignment

Top-aligned Step 3 jacket media inside the existing gallery without changing dimensions, variant filtering, Size Guide, prices, cart controls, or carousel scrolling.

## 2026-07-18 21:20 UTC — PF-20260718-020 — Standard modal description and variant-control layout

Returned standard descriptions to the right information column, relabeled the combined option, and added stable longest-option select widths. Step 3 remained unchanged.

## 2026-07-18 20:40 UTC — PF-20260718-019 — Featured row compatibility and chart compaction

Added legacy-row-compatible Featured alignment selectors, AgencyFB chart titles, content-driven chart widths, and tighter mobile table spacing.

## 2026-07-18 05:30 UTC — PF-20260718-018 — Samurai routing and original Featured row ownership

Restored Featured quantity-box ownership, preserved Step 3 field-level wrapping, added product-scoped material rules, corrected Samurai vest routing, and added separate Vegan/Genuine unisex Samurai Moto charts.

## 2026-07-18 04:25 UTC — PF-20260718-015 — Namespace-specific quantity-row correction

Applied explicit quantity geometry. Step 3 verified fixed.

## 2026-07-18 03:25 UTC — PF-20260718-013 — Correct ladies garment chart identities

Replaced generic ladies chart names with exact Crop-Top Rocker/Snakeskin, Goth Merc, Punkass, and Biker mappings.

## 2026-07-17 — Product modal compatibility

Restored real prices and modal CTA styling, added variant-specific galleries, and corrected variant matching without changing carousel scrolling.
