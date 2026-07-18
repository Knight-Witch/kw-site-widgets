# Changelog

Canonical repo-wide changelog. Module changelogs do not replace this file. Earlier detailed entries remain available through Git history and paired records under `/HISTORY/DIFFS/`.

## 2026-07-18 21:20 UTC — KW-RUNTIME-STANDARD-MODAL-020

Summary: Standard Spellweave/Cauldron Core product descriptions now remain in the right-side information column; the visible combined variant label now reads `Size & Style Variant`; standard selects receive stable product-specific widths based on their longest option.

Affected files:

```text
fourthwall/kwfw-universal-media.js
fourthwall/kwfw-universal-media.css
fourthwall/kwfw-modal-product-fix.js
fourthwall/kwfw-modal-product-fix.css
fourthwall/global/kw-fourthwall-loader.js
ARCHITECTURE.md
STYLE_KEYS.md
MASTER.md
fourthwall/README.md
fourthwall/global/README.md
fourthwall/global/CHANGELOG.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-07-18-standard-modal-layout-1.md
```

Runtime commits:

```text
59fba0ff65f137f3bf5c1e5835f4f6ea18201965
9d2cb7e61fca4d27b32035f8aff8bf59833d6f87
a721343eaa347a0ae3d49e2a3c468705d90727fa
87805c95bceb8b0060273857fe8120de28273af4
4bc31f2f1c2dd6253625391a45d11c9786e93f06
```

Reason: The standard base carousel already rendered descriptions inside `.kwfw-panel-info`, but the universal-media layer cloned them into a full-width row and hid the original. The internal Fourthwall option name `Description` was also exposed directly to customers, and the default `width:100%` select styling ignored product-specific option lengths.

Behavior:

- `.kwfw-desc` stays in the standard modal’s right column beneath quick-shop controls.
- New universal-media code no longer creates `.kwfw-desc-wide`.
- Legacy clones are removed by JavaScript and hidden by CSS for editor hot-reload compatibility.
- Visible `Description` labels become `Size & Style Variant`; the underlying option key remains unchanged for variant/cart selection.
- Each standard select measures all option labels with its computed font and receives one stable width based on the longest option.
- Width includes padding, borders, and dropdown-arrow allowance; it uses a `124px` minimum and clamps to the available field width.
- Width recalculates after font readiness and viewport resize.
- Step 3 `.kwpj-*` behavior is unchanged.

Rollback: Restore loader commit `aa8ad96cb30ddfcff156be0785846040633aea3d` with cache key `20260718-size-guide-layout-compact-1`.

Production candidate: Loader commit `4bc31f2f1c2dd6253625391a45d11c9786e93f06`, cache key `20260718-standard-modal-layout-1`.

Validation: Both updated JavaScript files passed `node --check`. The standard and Step 3 modal ownership paths were compared directly. No size-chart registry/routing, price resolution, Add to Cart request, selected-variant gallery selection, carousel rail, grid, or wheel code changed. Live visual verification remains required.

## 2026-07-18 20:40 UTC — KW-RUNTIME-SIZE-GUIDES-019

Added legacy-row-compatible Featured Size Guide alignment, AgencyFB size-chart titles, content-driven chart widths, and tighter mobile table spacing.

Runtime commits: `f28f4ae79bca76ba40c26ec91d5e326eaf7d8098`; `aa8ad96cb30ddfcff156be0785846040633aea3d`.

## 2026-07-18 05:30 UTC — KW-RUNTIME-SIZE-GUIDES-018

Restored Featured quantity-box injection, preserved Step 3 field-level geometry, corrected Samurai vest routing, and added product-scoped Vegan/Genuine unisex Samurai Moto charts.

Runtime commits: `e04c39dd4dafcf7f33ff10cfb2e792e32a972623`; `32c872f7d081e095133301132743f7c4498b23d3`; `68e06910b03a489fe3a61820b5fc2b07b79494be`; `8666ed87f3e7a84ddebbbf1f7e3d45b25d1054c0`.

## 2026-07-18 04:55 UTC — KW-RUNTIME-SIZE-GUIDES-017

Restored separate Featured and Step 3 row styling. Superseded by later compatibility work after live Featured verification still failed.

## 2026-07-18 04:40 UTC — KW-RUNTIME-SIZE-GUIDES-016

Attempted a `kwfw` explicit-grid/display-contents correction. Live verification failed and this state is not production-valid.

## 2026-07-18 04:25 UTC — KW-RUNTIME-SIZE-GUIDES-015

Corrected Step 3 quantity overlap with explicit internal geometry. Step 3 was verified fixed.

## 2026-07-18 04:05 UTC — KW-RUNTIME-SIZE-GUIDES-014

Introduced a two-column quantity/Size Guide grid.

## 2026-07-18 03:25 UTC — KW-RUNTIME-SIZE-GUIDES-013

Corrected ladies chart identities and added exact Crop-Top Rocker/Snakeskin, Goth Merc, Punkass, and Biker mappings. Removed the unverified generic ladies moto mapping.

## 2026-07-18 00:45 UTC — KW-RUNTIME-SIZE-GUIDES-012

Moved Size Guide into carousel quantity rows, matched AgencyFB button typography, and retained full-width native product-page placement.

## 2026-07-18 00:25 UTC — KW-RUNTIME-SIZE-GUIDES-011

Added the centralized exact chart registry and targeted injector for standard modals, Step 3 modals, and qualifying native product pages.

## 2026-07-17 — Product modal compatibility

Added real Fourthwall prices, restored modal Add to Cart styling, introduced selected-variant galleries, and corrected collection/detail variant matching. Detailed records remain in Git history and `/HISTORY/DIFFS/`.
