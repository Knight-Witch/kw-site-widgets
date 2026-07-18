# Changelog

Canonical repo-wide changelog. Module changelogs do not replace this file. Earlier detailed entries remain available through Git history and paired records under `/HISTORY/DIFFS/`.

## 2026-07-18 04:25 UTC — KW-RUNTIME-SIZE-GUIDES-015

Summary: Corrected the remaining live quantity-row failures in both carousel modal namespaces. The standard `kwfw` Size Guide button now bottom-aligns with the quantity controls, and the Step 3 `kwpj` quantity control can no longer expand underneath the Size Guide button.

Affected files:

```text
fourthwall/kwfw-size-guide.css
fourthwall/global/kw-fourthwall-loader.js
MASTER.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-07-18-size-guide-row-fix-2.md
```

Runtime commits:

```text
18cd5ac5c38921c29c8bac80de870b8c29914c92
0e12cbe2ff5b28bfc896c0bdf6bb6c5c8af4d462
```

Reason: Live screenshots showed the earlier two-column grid still inherited conflicting internal quantity widths. In `kwfw`, the button sat below the control line; in `kwpj`, the input expanded beyond the nominal 170px field and rendered below the Size Guide column.

Change:

- Forced the shared row to an explicit two-column grid using `!important`.
- Forced both `kwfw` and `kwpj` quantity controls to `48px 58px 48px` plus two 8px gaps.
- Forced the input and buttons to remain inside those columns.
- Removed quantity-field bottom margins and bottom-aligned the Size Guide button.
- Increased the desktop column gap to 16px and mobile gap to 10px.

Rollback: Restore loader commit `698f65f6d87caa4d32b3839fbdfde205b09a022f` with cache key `20260717-size-guide-qty-spacing-1`.

Production candidate: Loader commit `0e12cbe2ff5b28bfc896c0bdf6bb6c5c8af4d462`, cache key `20260717-size-guide-row-fix-2`.

Scope: No JavaScript, chart data, prices, cart, product galleries, carousel card layout, rail, or wheel behavior changed.

## 2026-07-18 04:05 UTC — KW-RUNTIME-SIZE-GUIDES-014

Summary: Corrected the carousel modal Size Guide quantity-row layout so the Size Guide control no longer covers the quantity input or plus button.

Affected files:

```text
fourthwall/kwfw-size-guide.css
fourthwall/global/kw-fourthwall-loader.js
STYLE_KEYS.md
MASTER.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-07-18-size-guide-quantity-spacing-1.md
```

Runtime commits:

```text
dd094b674e2d27209433bba24d5b56a5782a6c1b
698f65f6d87caa4d32b3839fbdfde205b09a022f
```

Reason: The previous auto-width flex row allowed the wrapped quantity field to consume the available row width. The Size Guide button could then visually occupy the input/plus-control area.

Change:

- Replaced the auto-width flex row with a two-column grid.
- Reserved a fixed 170px quantity column matching the native `- / input / +` control.
- Added a separate max-content Size Guide column.
- Set a 14px desktop gap and 8px mobile gap.

Rollback: Restore loader commit `0de2b178480bf6f1128ad50b9c0068e9cda50da7` with cache key `20260717-ladies-size-guides-1`.

Production candidate: Loader commit `698f65f6d87caa4d32b3839fbdfde205b09a022f`, cache key `20260717-size-guide-qty-spacing-1`.

Validation: Reviewed both standard `kwfw` and Step 3 `kwpj` 170px quantity grids. No JavaScript, chart data, prices, cart, galleries, carousel layout, rail, or wheel behavior changed. Live visual verification remains required.

## 2026-07-18 03:25 UTC — KW-RUNTIME-SIZE-GUIDES-013

Corrected ladies chart identities and added exact Crop-Top Rocker/Snakeskin, Goth Merc, Punkass, and Biker mappings. Removed the unverified generic ladies moto mapping.

Runtime commits: `0c42e82110db0f3e13c5dc32bdc666f3821c3a30`; `0de2b178480bf6f1128ad50b9c0068e9cda50da7`.

## 2026-07-18 00:45 UTC — KW-RUNTIME-SIZE-GUIDES-012

Moved Size Guide into the quantity row in both modal systems, matched AgencyFB typography, and retained full-width native product-page placement.

Runtime commits: `642d30b4d34cc7a5aa8a81a99e99de48742b6257`; `2655c77e18f52a8861240deb1c21449541301693`; `3ae4a2f1827a4aa132da234faac94a876e18e489`.

## 2026-07-18 00:25 UTC — KW-RUNTIME-SIZE-GUIDES-011

Added the centralized exact chart registry and targeted injector for standard modals, Step 3 modals, and qualifying native product pages.

## 2026-07-17 — Product modal compatibility

Added real Fourthwall prices, restored modal Add to Cart styling, introduced selected-variant galleries, and corrected collection/detail variant matching. Detailed records remain in Git history and `/HISTORY/DIFFS/`.
