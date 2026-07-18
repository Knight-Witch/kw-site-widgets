# Changelog

Canonical repo-wide changelog. Module changelogs do not replace this file. Earlier detailed entries remain available through Git history and paired records under `/HISTORY/DIFFS/`.

## 2026-07-18 22:05 UTC — KW-RUNTIME-STEP3-GALLERY-021

Summary: Step 3 jacket modal gallery images and videos are now top-justified inside the existing fixed gallery viewport, matching the standard Spellweave/Cauldron Core modal presentation.

Affected files:

```text
fourthwall/kwfw-modal-product-fix.css
fourthwall/global/kw-fourthwall-loader.js
STYLE_KEYS.md
MASTER.md
fourthwall/global/README.md
fourthwall/global/CHANGELOG.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-07-18-step3-gallery-top-align-1.md
```

Runtime commits:

```text
76d116c4283c654d3bc3f9ba4b6030782fb43b95
e0a3259a41624d7e45ebb74a145d888a76246410
```

Reason: Step 3 gallery media used `object-fit:contain` without an explicit object position, so shorter jacket images were vertically centered and left excessive empty space above the product.

Behavior:

- `.kwpj-gallery-track img` and `.kwpj-gallery-track video` now use `object-position:top center!important`.
- Existing gallery dimensions and `object-fit:contain` remain unchanged.
- Standard `kwfw` gallery presentation is unchanged.
- No variant-gallery selection, pricing, Add to Cart, Size Guide, product descriptions, selects, carousel rail, grid, or wheel behavior changed.

Rollback: Restore loader commit `4bc31f2f1c2dd6253625391a45d11c9786e93f06` with cache key `20260718-standard-modal-layout-1`.

Production candidate: Loader commit `e0a3259a41624d7e45ebb74a145d888a76246410`, cache key `20260718-step3-gallery-top-align-1`.

Validation: Compared the Step 3 branch gallery rule against the standard modal’s explicit `object-position:top center`. The change is a Step 3-only CSS override loaded through the shared modal compatibility layer. Live visual verification remains required.

## 2026-07-18 21:20 UTC — KW-RUNTIME-STANDARD-MODAL-020

Summary: Standard Spellweave/Cauldron Core product descriptions now remain in the right-side information column; the visible combined variant label now reads `Size & Style Variant`; standard selects receive stable product-specific widths based on their longest option.

Runtime commits:

```text
59fba0ff65f137f3bf5c1e5835f4f6ea18201965
9d2cb7e61fca4d27b32035f8aff8bf59833d6f87
a721343eaa347a0ae3d49e2a3c468705d90727fa
87805c95bceb8b0060273857fe8120de28273af4
4bc31f2f1c2dd6253625391a45d11c9786e93f06
```

Behavior:

- `.kwfw-desc` stays in the standard modal’s right column beneath quick-shop controls.
- Legacy `.kwfw-desc-wide` clones are removed/hidden.
- Visible `Description` labels become `Size & Style Variant`; the API option key remains unchanged.
- Each standard select measures all options and keeps a stable longest-option width.
- Step 3 option controls remain unchanged.

## 2026-07-18 20:40 UTC — KW-RUNTIME-SIZE-GUIDES-019

Added legacy-row-compatible Featured Size Guide alignment, AgencyFB size-chart titles, content-driven chart widths, and tighter mobile table spacing.

Runtime commits: `f28f4ae79bca76ba40c26ec91d5e326eaf7d8098`; `aa8ad96cb30ddfcff156be0785846040633aea3d`.

## 2026-07-18 05:30 UTC — KW-RUNTIME-SIZE-GUIDES-018

Restored Featured quantity-box injection, preserved Step 3 field-level geometry, corrected Samurai vest routing, and added product-scoped Vegan/Genuine unisex Samurai Moto charts.

Runtime commits: `e04c39dd4dafcf7f33ff10cfb2e792e32a972623`; `32c872f7d081e095133301132743f7c4498b23d3`; `68e06910b03a489fe3a61820b5fc2b07b79494be`; `8666ed87f3e7a84ddebbbf1f7e3d45b25d1054c0`.

## 2026-07-18 04:25 UTC — KW-RUNTIME-SIZE-GUIDES-015

Corrected Step 3 quantity overlap with explicit internal geometry. Step 3 was verified fixed.

## 2026-07-18 03:25 UTC — KW-RUNTIME-SIZE-GUIDES-013

Corrected ladies chart identities and added exact Crop-Top Rocker/Snakeskin, Goth Merc, Punkass, and Biker mappings. Removed the unverified generic ladies moto mapping.

## 2026-07-17 — Product modal compatibility

Added real Fourthwall prices, restored modal Add to Cart styling, introduced selected-variant galleries, and corrected collection/detail variant matching. Detailed records remain in Git history and `/HISTORY/DIFFS/`.
