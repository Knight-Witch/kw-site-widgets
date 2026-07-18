# Pre-Flight Check Log

This is the rolling pre-flight log for the Knight Witch site/widgets repository. Older detailed entries remain available through Git history and paired files under `/HISTORY/DIFFS/`.

## 2026-07-18 04:05 UTC — PF-20260718-014 — Size Guide quantity-control spacing

Requested change:

- Move the carousel Size Guide button away from the quantity input so it no longer covers the quantity area or plus control.

Docs/files reviewed:

- `/ARCHITECTURE.md`
- `/STYLE_KEYS.md`
- `/MASTER.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `fourthwall/kwfw-size-guide.css`
- `fourthwall/kwfw-size-guide.js`
- Standard `kwfw` quantity CSS
- Step 3 `kwpj` quantity CSS
- Supplied screenshot showing the overlap

Risk/conflict notes:

- Both carousel modal systems use a native 170px three-control quantity grid.
- The previous wrapper used auto-sized flex children; the wrapped `.kwfw-field`/`.kwpj-field` could claim the available row width, allowing the Size Guide button to visually cover the input/plus area.
- The fix must not change button injection, chart resolution, modal JavaScript, or carousel behavior.

Plan/result:

- Convert `.kw-size-qty-size-row` to a two-column grid.
- Reserve exactly 170px for the quantity field/control.
- Place Size Guide in a separate max-content column with a 14px desktop gap and 8px mobile gap.
- Bump the global loader cache key.

Validation:

- Reviewed both native quantity control footprints.
- No JavaScript changed.
- No chart data, price, cart, gallery, rail, grid, or wheel behavior changed.

User input required:

- None. Live visual verification remains required after the footer update.

## 2026-07-18 03:25 UTC — PF-20260718-013 — Correct ladies garment chart identities

Replaced generic ladies chart names with exact Crop-Top Rocker/Snakeskin, Goth Merc, Punkass, and Biker mappings. Removed the unverified generic ladies moto mapping. Registry passed syntax validation; no modal UI or carousel behavior changed.

## 2026-07-18 02:45 UTC — PF-20260718-012 — Size Guide modal placement and typography

Moved Size Guide into the quantity row for both modal systems, matched AgencyFB typography, and retained full-width native product-page placement.

## 2026-07-18 00:25 UTC — PF-20260718-011 — Global product size-guide registry

Created the exact chart registry and targeted injector for standard modals, Step 3 modals, and qualifying native product pages. Added US/Metric conversion and normal modal dismissal/focus behavior.

## 2026-07-17 23:58 UTC — PF-20260717-010 — Variant gallery selection correction

Preserved the collection-product object, separated detail data, and corrected selected-variant matching without changing carousel layout or scroll.

## 2026-07-17 23:38 UTC — PF-20260717-009 — Variant-specific product modal galleries

Added selected-variant media switching with product-wide fallback and preserved universal support slides.

## 2026-07-17 21:19 UTC — PF-20260717-008 — Dual-carousel product modal audit

Restored real Fourthwall modal prices and the Step 3 orange Add to Cart CTA.
