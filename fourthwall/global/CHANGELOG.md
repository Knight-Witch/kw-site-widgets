# Fourthwall Global Changelog

This module changelog records global-runtime-specific changes. `/HISTORY/CHANGELOG.md` remains canonical.

## 2026-07-18 — Featured row compatibility and compact size charts

Production candidate:

```text
Global loader commit: aa8ad96cb30ddfcff156be0785846040633aea3d
Cache key: 20260718-size-guide-layout-compact-1
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
```

Changed:

- Featured row styling now covers both `.kw-size-qty-size-row` and `.kw-size-qty-size-row--kwfw`.
- This prevents Fourthwall editor hot-reloaded legacy rows from rendering Size Guide below the quantity controls.
- Step 3 field-level grid and internal quantity geometry remain unchanged.
- Size-chart titles now use AgencyFB with explicit letter spacing.
- Desktop panel/table widths are content-driven instead of fixed to a broad 980px footprint.
- Desktop table and note spacing is tighter.
- Mobile tables no longer force a 560px minimum width.
- Mobile header labels wrap and cells use conservative padding.

Scope:

- CSS and loader cache-key change only.
- No registry, resolver, price, cart, gallery, carousel card, rail, grid, or wheel behavior changed.

Rollback:

```text
Global loader commit: 8666ed87f3e7a84ddebbbf1f7e3d45b25d1054c0
Cache key: 20260718-samurai-size-guides-1
```

## 2026-07-18 — Samurai chart routing and original Featured row ownership

Loader commit `8666ed87f3e7a84ddebbbf1f7e3d45b25d1054c0` restored Featured quantity-box ownership, preserved Step 3 field-level geometry, corrected Samurai vest routing, and added product-scoped Vegan/Genuine unisex Samurai Moto charts.

## 2026-07-18 — restore Featured Spellweave Size Guide row

Loader commit `94a92c443658086ee2a3c5b822ba68a873c3f3ef` restored namespace-specific styling but remained incomplete under live editor DOM reuse.

## 2026-07-18 — failed Featured alignment grid

The `display:contents`/explicit-grid-row state at loader commit `2a3d96c115de79cc6a22eb85181350cb4c76b465` moved Size Guide onto a separate lower row and is not production-valid.

## 2026-07-18 — Step 3 quantity-row correction

Loader commit `0e12cbe2ff5b28bfc896c0bdf6bb6c5c8af4d462` corrected Step 3 overlap using explicit quantity tracks. That Step 3 geometry remains active.

## 2026-07-18 — exact ladies size-guide mappings

Loader commit `0de2b178480bf6f1128ad50b9c0068e9cda50da7` added exact Crop-Top Rocker/Snakeskin, Goth Merc, Punkass, and Biker mappings and removed the unverified generic ladies moto chart.

## 2026-07-18 — global size-guide registry and injector

Loader commit `1e5cb24e662a37358d296949e998c4980309a883` added the central registry, standard/Step 3/native-page injection, selected-variant chart switching, exact resolution, US/Metric conversion, and normal modal dismissal behavior.

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
