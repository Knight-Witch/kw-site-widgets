# Fourthwall Global Changelog

This module changelog records global-runtime-specific changes. `/HISTORY/CHANGELOG.md` remains canonical.

## 2026-07-18 — restore Featured Spellweave Size Guide row

Production candidate:

```text
Global loader commit: 94a92c443658086ee2a3c5b822ba68a873c3f3ef
Cache key: 20260717-featured-size-guide-restore-1
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
```

Changed:

- Restored the standard `kwfw` quantity/Size Guide row to its last known-good flex/end-aligned layout.
- Removed the failed `kwfw` `display: contents` and explicit grid-row placement.
- Preserved the current Step 3 `kwpj` fixed two-column grid and explicit quantity geometry.
- Bumped the global cache key.

Scope:

- CSS and loader cache key only.
- No chart data, JavaScript, prices, cart, galleries, carousel cards, rail, or wheel behavior changed.

Validation:

- Compared current styling against the known-good Featured state at loader commit `0de2b178480bf6f1128ad50b9c0068e9cda50da7`.
- Restored only `kwfw` behavior from that state.
- Live visual verification remains required.

Rollback:

```text
Global loader commit: 2a3d96c115de79cc6a22eb85181350cb4c76b465
Cache key: 20260717-featured-size-guide-align-1
```

## 2026-07-18 — failed Featured alignment grid

The `kwfw`-only `display: contents`/explicit-grid-row state at loader commit `2a3d96c115de79cc6a22eb85181350cb4c76b465` moved Size Guide onto a separate lower row and is not a valid production state.

## 2026-07-18 — Step 3 quantity-row correction

Loader commit `0e12cbe2ff5b28bfc896c0bdf6bb6c5c8af4d462` corrected Step 3 overlap using explicit quantity tracks. Its Step 3 geometry remains active in the current production candidate.

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
