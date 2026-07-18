# Changelog

Canonical repo-wide changelog. Module changelogs do not replace this file. Earlier detailed entries remain available through Git history and paired records under `/HISTORY/DIFFS/`.

## 2026-07-18 20:40 UTC — KW-RUNTIME-SIZE-GUIDES-019

Summary: Corrected Featured Spellweave Size Guide row compatibility and condensed the size-chart modal. Standard `kwfw` rows now align even when Fourthwall editor hot reloads leave an older unmodified `.kw-size-qty-size-row` in the DOM. Chart titles now use AgencyFB with deliberate tracking; desktop and mobile tables use content-driven widths and tighter spacing.

Affected files:

```text
fourthwall/kwfw-size-guide.css
fourthwall/global/kw-fourthwall-loader.js
STYLE_KEYS.md
MASTER.md
fourthwall/global/README.md
fourthwall/global/CHANGELOG.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-07-18-size-guide-layout-compact-1.md
```

Runtime commits:

```text
f28f4ae79bca76ba40c26ec91d5e326eaf7d8098
aa8ad96cb30ddfcff156be0785846040633aea3d
```

Reason: Live verification showed the Featured Size Guide button still appearing on a second row. The current runtime can encounter an older row without the newer `--kwfw` modifier during editor hot reload, so modifier-only CSS did not apply. The chart modal also used a fixed 980px panel and forced 560px mobile table minimum, creating unnecessary empty space and excessive mobile width.

Behavior:

- Featured row styling targets both base and modifier row classes.
- Featured quantity controls remain `48px 58px 48px`; Size Guide occupies a separate same-row column.
- Step 3 layout and selectors remain unchanged.
- Chart titles use AgencyFB with `.09em` desktop and `.075em` mobile letter spacing.
- Desktop tables use content-driven widths and reduced padding.
- Mobile headers may wrap; cells use `12.5px` text and `7px 5px` padding.
- The former blanket mobile `560px` minimum was removed.

Rollback: Restore loader commit `8666ed87f3e7a84ddebbbf1f7e3d45b25d1054c0` with cache key `20260718-samurai-size-guides-1`.

Production candidate: Loader commit `aa8ad96cb30ddfcff156be0785846040633aea3d`, cache key `20260718-size-guide-layout-compact-1`.

Validation: Reviewed current Featured/Step 3 DOM ownership and base carousel quantity geometry. CSS-only runtime change plus loader cache bump. No chart data, resolver, prices, cart, galleries, carousel cards, rail, grid, or wheel behavior changed. Live visual verification remains required.

## 2026-07-18 05:30 UTC — KW-RUNTIME-SIZE-GUIDES-018

Restored Featured quantity-box injection, preserved Step 3 field-level geometry, corrected Samurai vest routing, and added product-scoped Vegan/Genuine unisex Samurai Moto charts.

Runtime commits: `e04c39dd4dafcf7f33ff10cfb2e792e32a972623`; `32c872f7d081e095133301132743f7c4498b23d3`; `68e06910b03a489fe3a61820b5fc2b07b79494be`; `8666ed87f3e7a84ddebbbf1f7e3d45b25d1054c0`.

## 2026-07-18 04:55 UTC — KW-RUNTIME-SIZE-GUIDES-017

Restored separate Featured and Step 3 row styling. Superseded by later compatibility work after live Featured verification still failed.

Runtime commits: `03128a0f5d4e06b3b16ff7a244cfd359677ca84d`; `94a92c443658086ee2a3c5b822ba68a873c3f3ef`.

## 2026-07-18 04:40 UTC — KW-RUNTIME-SIZE-GUIDES-016

Attempted a `kwfw` explicit-grid/display-contents correction. Live verification failed and this state is not production-valid.

Runtime commits: `f3be53876a4ed3b5fc4f54a022818cbfd700abf9`; `2a3d96c115de79cc6a22eb85181350cb4c76b465`.

## 2026-07-18 04:25 UTC — KW-RUNTIME-SIZE-GUIDES-015

Corrected Step 3 quantity overlap with explicit internal geometry. Step 3 was verified fixed.

Runtime commits: `18cd5ac5c38921c29c8bac80de870b8c29914c92`; `0e12cbe2ff5b28bfc896c0bdf6bb6c5c8af4d462`.

## 2026-07-18 04:05 UTC — KW-RUNTIME-SIZE-GUIDES-014

Introduced a two-column quantity/Size Guide grid.

Runtime commits: `dd094b674e2d27209433bba24d5b56a5782a6c1b`; `698f65f6d87caa4d32b3839fbdfde205b09a022f`.

## 2026-07-18 03:25 UTC — KW-RUNTIME-SIZE-GUIDES-013

Corrected ladies chart identities and added exact Crop-Top Rocker/Snakeskin, Goth Merc, Punkass, and Biker mappings. Removed the unverified generic ladies moto mapping.

Runtime commits: `0c42e82110db0f3e13c5dc32bdc666f3821c3a30`; `0de2b178480bf6f1128ad50b9c0068e9cda50da7`.

## 2026-07-18 00:45 UTC — KW-RUNTIME-SIZE-GUIDES-012

Moved Size Guide into carousel quantity rows, matched AgencyFB button typography, and retained full-width native product-page placement.

## 2026-07-18 00:25 UTC — KW-RUNTIME-SIZE-GUIDES-011

Added the centralized exact chart registry and targeted injector for standard modals, Step 3 modals, and qualifying native product pages.

## 2026-07-17 — Product modal compatibility

Added real Fourthwall prices, restored modal Add to Cart styling, introduced selected-variant galleries, and corrected collection/detail variant matching. Detailed records remain in Git history and `/HISTORY/DIFFS/`.
