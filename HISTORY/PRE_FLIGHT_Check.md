# Pre-Flight Check Log

This is the rolling pre-flight log for the Knight Witch site/widgets repository. Older detailed entries remain available through Git history and paired files under `/HISTORY/DIFFS/`.

## 2026-07-18 22:05 UTC — PF-20260718-021 — Step 3 modal gallery top alignment

Requested change:

- Top-align Step 3 jacket images inside the modal gallery so they match the standard Spellweave/Cauldron Core presentation.
- Leave Step 3 gallery sizing, variant filtering, Size Guide, pricing, quick-shop controls, and scrolling unchanged.

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
- Branch-owned `components/kw-plain-jackets/kw-plain-jackets.css`
- `fourthwall/kwfw-modal-product-fix.css`
- `fourthwall/global/kw-fourthwall-loader.js`
- Supplied Step 3 modal screenshot

Risk/conflict notes:

- The branch-owned Step 3 gallery already uses `object-fit:contain` but does not set `object-position`, so the browser centers the contained media vertically.
- Changing gallery height or object-fit would alter crop/scale behavior and could affect every jacket image.
- The global shared modal compatibility stylesheet already owns cross-system expanded-modal visual corrections and is loaded after the Step 3 source styles.

Plan/result:

- Add a Step 3-only selector for `.kwpj-gallery-track img` and `video`.
- Apply only `object-position:top center!important`.
- Preserve all gallery height, minimum height, object-fit, media source, and selected-variant gallery logic.
- Bump the global loader cache key.

Validation:

- Compared the Step 3 branch rule with the standard modal gallery rule.
- Confirmed no JavaScript or Step 3 branch files changed.
- Confirmed no standard gallery, product data, Size Guide, price, cart, description, option, carousel rail, grid, or wheel behavior changed.
- Live storefront verification remains required after replacing the footer.

User input required:

- None.

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
