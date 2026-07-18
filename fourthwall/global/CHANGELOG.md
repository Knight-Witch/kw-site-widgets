# Fourthwall Global Changelog

This module changelog records global-runtime-specific changes. `/HISTORY/CHANGELOG.md` remains canonical.

## 2026-07-18 — global size-guide registry and injector

Production candidate:

```text
Global loader commit: 1e5cb24e662a37358d296949e998c4980309a883
Cache key: 20260717-size-guide-registry-1
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
```

Added:

- `fourthwall/kwfw-size-guide-data.js` as the central product/variant chart registry.
- Targeted Size Guide injection for standard `kwfw` modals.
- Targeted Size Guide injection for Step 3 `kwpj` modals.
- Targeted injection on native Fourthwall `/products/` pages.
- Selected-variant chart switching.
- Exact slug/title/variant alias resolution.
- US/Metric conversion for values and ranges.
- Backdrop, Escape, close-button, body-scroll-lock, and focus-restoration behavior.

Loader changes:

- Size-guide CSS now loads from `selfRef`.
- Registry data loads from `selfRef` before the size-guide runtime.
- Size-guide runtime now loads from `selfRef`.

Scope:

- No carousel rail, wheel, grid, card-size, price, Add to Cart, or variant-gallery runtime changed.
- Buttons only appear when a registered chart resolves.
- Unknown products and non-garment products do not receive a generic chart.

Validation:

- Both size-guide JavaScript files passed `node --check`.
- Loader order was reviewed.
- Live product-page placement and alias coverage remain to be verified.

Rollback:

```text
Global loader commit: 8ef32a18b59ef932c9b5364ca3e37c72183d5c3e
Cache key: 20260717-variant-gallery-2
```

## 2026-07-17 — variant gallery selection correction

Production candidate:

```text
Global loader commit: 8ef32a18b59ef932c9b5364ca3e37c72183d5c3e
Cache key: 20260717-variant-gallery-2
```

Fixed:

- Preserved the original collection-product object used to build variant controls.
- Kept product-detail data separate.
- Matched product-detail media by variant ID.
- Added normalized option/value matching.

Scope:

- No carousel rail, wheel, card sizing, grid, or scroll files changed.

## 2026-07-17 — selected-variant modal galleries

Production candidate:

```text
Global loader commit: 26760b14a2676316be45e76df034638ae0990379
Cache key: 20260717-variant-gallery-1
```

Added:

- Selected-variant media switching for standard `kwfw` and Step 3 `kwpj` product modals.
- Product-wide media fallback.
- Preserved standard-modal universal support slides.

## 2026-07-17 — dual-modal prices and CTA

Production candidate:

```text
Global loader commit: 63ef5483c10dd2fc803be180faec584d84dbecc6
Cache key: 20260717-product-modal-prices-2
```

Fixed:

- Actual Fourthwall `variant.unitPrice` rendering in both modal systems.
- Explicit orange glowing Add to Cart styling in the body-level Step 3 modal.

## 2026-07-07 — global README reconciliation

Reconciled global-runtime documentation with the root documentation system and current footer architecture.

## 2026-06-29 — verified carousel scroll runtime

Historical verified state:

```text
Commit: 31a02608065694efdd766bad4e5efc35c097e25a
Cache key: 20260629-carousel-scroll-4
```

The wheel bridge limits interception to visible card bounds plus a side buffer, resumes page scroll at boundaries, and carries the final desktop grid override.

Failed state to avoid:

```text
3f0582046c6c0f31aedefa5e9d4805ec9eedddf3
```

That commit contained a mutation loop that could freeze the editor/browser.
