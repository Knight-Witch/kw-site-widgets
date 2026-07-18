# Fourthwall Global Changelog

This module changelog records global-runtime-specific changes. `/HISTORY/CHANGELOG.md` remains canonical.

## 2026-07-18 — Step 3 modal gallery top alignment

Production candidate:

```text
Global loader commit: e0a3259a41624d7e45ebb74a145d888a76246410
Cache key: 20260718-step3-gallery-top-align-1
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
```

Changed:

- Added a Step 3-only gallery media override in `kwfw-modal-product-fix.css`.
- `.kwpj-gallery-track img` and `video` now use `object-position:top center!important`.
- Preserved the existing `object-fit:contain`, gallery height, minimum height, media source, and selected-variant gallery behavior.
- Standard Spellweave/Cauldron Core gallery behavior remains unchanged.

Scope:

- CSS and loader cache-key change only.
- No price, Add to Cart, Size Guide, description, option control, gallery filtering, carousel rail, grid, or wheel behavior changed.

Rollback:

```text
Global loader commit: 4bc31f2f1c2dd6253625391a45d11c9786e93f06
Cache key: 20260718-standard-modal-layout-1
```

## 2026-07-18 — Standard modal description and dynamic variant control

Loader commit `4bc31f2f1c2dd6253625391a45d11c9786e93f06` returned standard descriptions to the right-side information column, relabeled the combined option, and added stable longest-option select widths.

## 2026-07-18 — Featured row compatibility and compact size charts

Loader commit `aa8ad96cb30ddfcff156be0785846040633aea3d` added legacy-row-compatible Featured alignment, AgencyFB size-chart titles, content-driven chart widths, and tighter mobile table spacing.

## 2026-07-18 — Samurai chart routing and original Featured row ownership

Loader commit `8666ed87f3e7a84ddebbbf1f7e3d45b25d1054c0` restored Featured quantity-box ownership, preserved Step 3 field-level geometry, corrected Samurai vest routing, and added product-scoped Vegan/Genuine unisex Samurai Moto charts.

## 2026-07-18 — Step 3 quantity-row correction

Loader commit `0e12cbe2ff5b28bfc896c0bdf6bb6c5c8af4d462` corrected Step 3 overlap using explicit quantity tracks.

## 2026-07-17 — product modal compatibility

The July 17 runtime work restored real Fourthwall prices, the Step 3 orange Add to Cart CTA, selected-variant media switching, and stable collection/detail variant matching.

## 2026-06-29 — verified carousel scroll runtime

Historical verified state:

```text
Commit: 31a02608065694efdd766bad4e5efc35c097e25a
Cache key: 20260629-carousel-scroll-4
```

Dangerous state to avoid:

```text
3f0582046c6c0f31aedefa5e9d4805ec9eedddf3
```

That commit contained a mutation loop capable of freezing the editor/browser.
