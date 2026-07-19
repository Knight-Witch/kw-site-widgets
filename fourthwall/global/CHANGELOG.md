# Fourthwall Global Changelog

This module changelog records global-runtime-specific changes. `/HISTORY/CHANGELOG.md` remains canonical.

## 2026-07-19 — Collection-aware featured product cards

Production candidate:

```text
Global loader commit: 08c4dca8bf833d283cedfeb471f29bd2741a70cc
Cache key: 20260718-featured-card-collections-2
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
```

Changed:

- Extended `kw-product-modal-presentation.js` from modal-only title formatting to standard `kwfw` card and modal formatting.
- Added a controlled six-collection registry for Edgerunners, Basscraft, Wicked Hearts, Astral Plane, Black Mass, and Starchild.
- Added one-time per-page collection membership indexing through the Fourthwall Storefront API.
- Product membership is keyed by slug and stable product identifiers.
- Embedded collection metadata accepts normalized handle, key, collection-name, and tagline aliases.
- Mixed homepage carousels resolve every card independently instead of inheriting the visible carousel handle.
- Dedicated holder handles and title parsing remain ordered fallbacks.
- Standard card titles are visible in AgencyFB and limited to two lines.
- Cards receive a red linked collection tagline beneath the clean main title.
- Desktop pointer/focus glitches from tagline to collection name.
- Mobile cycles between tagline and collection name every four seconds unless reduced motion is active.
- The same registry supplies collection-aware expanded-modal subtitles.

Controlled pairs:

```text
Cyberpunk 2077 <-> Edgerunners Collection
Eat. Sleep. Rave. Repeat. <-> Basscraft Collection
Snakes Skulls & Sin <-> Wicked Hearts Collection
All Things Fantasy <-> Astral Plane Collection
Sci-fi & Beyond <-> Black Mass Collection
Mystics Zodiacs & Vibes <-> Starchild Collection
```

Scope:

- Standard featured-card and shared title presentation only.
- No product object mutation, variant resolution, pricing, Add to Cart, Size Guide, selected-gallery media, rail, grid, or wheel behavior changed.

Runtime commits:

```text
7a90ba867318e0491ea60d64fd4c450798231de6
8aa3cc5eb05f286370a85b6c3c365d3cfb9e451e
b5769ac1044197e4ca0c88409b62ecbc0f5abc8e
08c4dca8bf833d283cedfeb471f29bd2741a70cc
```

Rollback:

```text
Global loader commit: e9404864ba58ab7daee8e771894d2c374a5f8fc3
Cache key: 20260718-modal-sync-2
```

## 2026-07-18 — Unified standard and Step 3 modal presentation

Production candidate:

```text
Global loader commit: e9404864ba58ab7daee8e771894d2c374a5f8fc3
Cache key: 20260718-modal-sync-2
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
```

Added:

```text
fourthwall/kw-product-modal-presentation.css
fourthwall/kw-product-modal-presentation.js
```

Changed:

- Standard `kwfw` and Step 3 `kwpj` expanded modals now share black panel, grid, gallery, track, and information surfaces.
- Both use the standard desktop `1120px` panel cap, two-column ratio, `540px` gallery cap, top-aligned `contain` media, AgencyFB typography, color assignment, close buttons, details buttons, and dot treatment.
- Step 3 boxed gallery navigation was replaced with the standard transparent white chevron style and standard desktop positioning.
- Both mobile systems use Step 3 edge positioning with the transparent standard arrow style.
- Mobile gallery height is constrained with `clamp(360px,118vw,620px)` and information padding is reduced.
- Single-media galleries suppress arrows and dots.
- Recognized `Cyberpunk 2077` prefixes/suffixes are removed from the main product title.
- A red collection subtitle links to `/pages/edgerunners`.
- Desktop hover/focus glitches the subtitle to `Edgerunners Collection`.
- Mobile cycles between the two labels every four seconds unless reduced motion is active.

Scope:

- Shared cross-system presentation only.
- No product loading, option data, selected-variant resolution, pricing, Add to Cart request, gallery media selection, carousel rail, grid, or wheel behavior changed.

Runtime commits:

```text
91ad6c2b3dd51b72507c95b5f93453ae80a5d512
c1e708b95ee19da4291d3dc7ee37f39d5c33fae8
3bf1285653188743c082de2a2a4584d70100d81e
d5dbd4e43cab008b6869439afab14e85109ba77f
e9404864ba58ab7daee8e771894d2c374a5f8fc3
```

Rollback:

```text
Global loader commit: e0a3259a41624d7e45ebb74a145d888a76246410
Cache key: 20260718-step3-gallery-top-align-1
```

## 2026-07-18 — Step 3 modal gallery top alignment

Loader commit `e0a3259a41624d7e45ebb74a145d888a76246410` top-aligned Step 3 media without changing gallery dimensions. Superseded by the unified presentation module.

## 2026-07-18 — Standard modal description and dynamic variant control

Loader commit `4bc31f2f1c2dd6253625391a45d11c9786e93f06` returned standard descriptions to the right-side information column, relabeled the combined option, and added stable longest-option select widths.

## 2026-07-18 — Featured row compatibility and compact size charts

Loader commit `aa8ad96cb30ddfcff156be0785846040633aea3d` added legacy-row-compatible Featured alignment, AgencyFB size-chart titles, content-driven chart widths, and tighter mobile table spacing.

## 2026-07-18 — Samurai chart routing and original Featured row ownership

Loader commit `8666ed87f3e7a84ddebbbf1f7e3d45b25d1054c0` restored Featured quantity-box ownership, preserved Step 3 field-level geometry, corrected Samurai vest routing, and added product-scoped Vegan/Genuine unisex Samurai Moto charts.

## 2026-07-18 — Step 3 quantity-row correction

Loader commit `0e12cbe2ff5b28bfc896c0bdf6bb6c5c8af4d462` corrected Step 3 overlap using explicit quantity tracks.

## 2026-07-17 — Product modal compatibility

The July 17 runtime work restored real Fourthwall prices, the Step 3 orange Add to Cart CTA, selected-variant media switching, and stable collection/detail variant matching.

## 2026-06-29 — Verified carousel scroll runtime

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
