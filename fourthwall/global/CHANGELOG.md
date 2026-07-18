# Fourthwall Global Changelog

This module changelog records global-runtime-specific changes. `/HISTORY/CHANGELOG.md` remains canonical.

## 2026-07-18 — featured Size Guide vertical alignment

Production candidate:

```text
Global loader commit: 2a3d96c115de79cc6a22eb85181350cb4c76b465
Cache key: 20260717-featured-size-guide-align-1
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
```

Changed:

- Standard `kwfw` quantity rows now use separate label and control grid rows.
- Qty label occupies row 1.
- Quantity controls and Size Guide occupy row 2.
- The standard `.kwfw-field` is flattened only inside the injected row.
- Step 3 `.kwpj-*` rules remain unchanged.

Scope:

- CSS-only alignment correction plus loader cache-key bump.
- No chart data, price, cart, gallery, carousel rail, grid, or scroll behavior changed.

Rollback:

```text
Global loader commit: 0e12cbe2ff5b28bfc896c0bdf6bb6c5c8af4d462
Cache key: 20260717-size-guide-row-fix-2
```

## 2026-07-18 — exact ladies size-guide mappings

Production candidate:

```text
Global loader commit: 0de2b178480bf6f1128ad50b9c0068e9cda50da7
Cache key: 20260717-ladies-size-guides-1
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
```

Changed:

- Replaced the generic `ladies-rocker-vest` registry identity with `ladies-crop-top-rocker-jacket`.
- Added `ladies-snakeskin-crop-top-vest` to the same chart.
- Kept featured `Ladies Rocker Vest` option labels as aliases to that shared chart.
- Added exact Ladies Goth Merc Vest, Ladies Punkass Vest, and Ladies Biker Vest charts.
- Removed the unverified generic `ladies-moto-vest` chart.

Scope:

- Data/mapping change only, plus loader cache-key bump.
- No Size Guide placement, modal UI, price, cart, gallery, rail, grid, or scroll behavior changed.

Validation:

- Registry passed `node --check`.
- Four supplied ladies charts were transcribed directly.

Rollback:

```text
Global loader commit: 3ae4a2f1827a4aa132da234faac94a876e18e489
Cache key: 20260717-size-guide-placement-2
```

## 2026-07-18 — size-guide modal placement and typography

Production candidate:

```text
Global loader commit: 3ae4a2f1827a4aa132da234faac94a876e18e489
Cache key: 20260717-size-guide-placement-2
```

Changed:

- Standard `kwfw` and Step 3 `kwpj` Size Guide buttons sit beside quantity controls.
- Modal buttons use AgencyFB and match quantity-control height.
- Native product-page buttons remain full width before Add to Cart.

## 2026-07-18 — global size-guide registry and injector

Production candidate:

```text
Global loader commit: 1e5cb24e662a37358d296949e998c4980309a883
Cache key: 20260717-size-guide-registry-1
```

Added:

- Central chart registry.
- Standard/Step 3/native-page injection.
- Selected-variant chart switching.
- Exact slug/title/variant resolution.
- US/Metric conversion.
- Standard modal dismissal, body-scroll-lock, and focus behavior.

## 2026-07-17 — variant gallery selection correction

Production candidate:

```text
Global loader commit: 8ef32a18b59ef932c9b5364ca3e37c72183d5c3e
Cache key: 20260717-variant-gallery-2
```

Fixed collection/detail product separation and selected-variant matching without changing carousel scroll/layout.

## 2026-07-17 — selected-variant modal galleries

Production candidate:

```text
Global loader commit: 26760b14a2676316be45e76df034638ae0990379
Cache key: 20260717-variant-gallery-1
```

Added selected-variant media switching with product-wide fallback and preserved universal support slides.

## 2026-07-17 — dual-modal prices and CTA

Production candidate:

```text
Global loader commit: 63ef5483c10dd2fc803be180faec584d84dbecc6
Cache key: 20260717-product-modal-prices-2
```

Restored real Fourthwall prices and the Step 3 orange Add to Cart CTA.

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
