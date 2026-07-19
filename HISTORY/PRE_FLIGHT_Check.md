# Pre-Flight Check Log

This is the rolling pre-flight log for the Knight Witch site/widgets repository. Older detailed entries remain available through Git history and paired files under `/HISTORY/DIFFS/`.

## 2026-07-18 23:58 UTC — PF-20260718-022 — Unified standard and Step 3 modal presentation

Requested change:

- Synchronize the standard Spellweave/Cauldron Core and Step 3 expanded product-window styling.
- Make the complete product window black in both systems.
- Use the standard modal’s smaller desktop gallery footprint for Step 3.
- Standardize AgencyFB typography, color assignment, control styling, navigation styling, and information presentation.
- Use the standard transparent arrow style on Step 3 desktop.
- On mobile, retain Step 3 edge positioning while using the standard arrow appearance.
- Reduce the excessive standard-mobile gap between media, gallery controls, and product information.
- Remove recognized collection text such as `- Cyberpunk 2077` from the primary product title.
- Add a smaller red linked collection subtitle that glitches between `Cyberpunk 2077` and `Edgerunners Collection` on desktop and cycles every four seconds on mobile.

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
- Production-pinned `fourthwall/kwfw-carousel.css`
- Production-pinned `fourthwall/kwfw-carousel.js`
- `fourthwall/kwfw-universal-media.css`
- `fourthwall/kwfw-modal-product-fix.css`
- `fourthwall/kwfw-modal-product-fix.js`
- Branch-owned `components/kw-plain-jackets/kw-plain-jackets.css`
- Branch-owned `components/kw-plain-jackets/kw-plain-jackets-v2.js`
- `fourthwall/global/kw-header.css`
- `fourthwall/global/kw-header.js`
- Supplied desktop and mobile modal screenshots

Risk/conflict notes:

- `kwfw` and `kwpj` have separate product-loading, modal-construction, variant, cart, and gallery-event implementations; synchronization must remain presentation-only.
- Fixed gallery geometry can introduce crop, scale, or mobile whitespace regressions if `object-fit`, track height, and media height are not coordinated.
- Single-media galleries must not expose unusable arrows or dots.
- Collection parsing must be controlled rather than stripping arbitrary title suffixes.
- Mobile subtitle timers must stop when elements are removed and respect reduced-motion preferences.
- A broad MutationObserver must remain idempotent and must not rewrite its own subtitle continuously.
- Fourthwall editor hot swaps cannot remove listeners installed by earlier script instances without a full preview reload.

Plan/result:

- Added `fourthwall/kw-product-modal-presentation.css` as the sole cross-system expanded-modal visual owner.
- Added `fourthwall/kw-product-modal-presentation.js` as the controlled product-title and collection-subtitle owner.
- Loaded both resources after shared modal compatibility from the global loader.
- Standardized black surfaces, desktop panel/grid/gallery dimensions, top-aligned contained media, AgencyFB typography, controls, close buttons, details buttons, dots, and transparent navigation.
- Applied shared mobile gallery geometry and compact information spacing.
- Kept Step 3 edge offsets on mobile while applying the standard arrow appearance.
- Suppressed controls for single-media galleries.
- Added a Cyberpunk-only prefix/suffix parser and linked subtitle to `/pages/edgerunners`.
- Added desktop hover/focus glitch swapping and mobile four-second cycling with reduced-motion handling.
- Left product objects, pricing, variant matching, Add to Cart, media selection, rail, grid, and wheel behavior unchanged.

Validation:

- `node --check` passed for `kw-product-modal-presentation.js`.
- Title parser checks covered:
  - `Sandevistan V2 - Cyberpunk 2077` → `Sandevistan V2`
  - `Samurai Moto Jacket — Cyberpunk 2077` → `Samurai Moto Jacket`
  - `Cyberpunk 2077 - Johnny's Samurai Jacket` → `Johnny's Samurai Jacket`
  - unrelated titles remain unchanged
- Verified single-media control suppression in the final stylesheet.
- Verified loader order places presentation after modal compatibility.
- Verified no branch-owned Step 3 source file or business-logic runtime was modified.
- Live visual verification remains required across representative standard, Step 3, desktop, and mobile products.

User input required:

- None for this release.
- Additional collection-title mappings require explicit collection names and destinations later.

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
