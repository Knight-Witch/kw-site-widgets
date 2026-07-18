# Fourthwall Global Runtime

This directory owns the site-wide Fourthwall runtime layer. Read `/OPERATING_CONTRACT.md`, `/ARCHITECTURE.md`, `/MASTER.md`, `/STYLE_KEYS.md`, `/HISTORY/CHANGELOG.md`, and `/HISTORY/PRE_FLIGHT_Check.md` before editing.

## Current production candidate

```text
Commit: e0a3259a41624d7e45ebb74a145d888a76246410
Cache key: 20260718-step3-gallery-top-align-1
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
Shop domain: knightwitchapparel.com
Currency: USD
```

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@e0a3259a41624d7e45ebb74a145d888a76246410/fourthwall/global/kw-fourthwall-loader.js?v=20260718-step3-gallery-top-align-1
```

The live storefront token is intentionally not stored in repository documentation.

## Temporary title-bar hotfix

```text
Commit: 663b046d1dcb77b86a06ee1af427af2a5b0821dc
Cache key: 20260706-titlebar-hotfix-1
Entrypoint: components/kw-title-bars/kw-title-bars-hotfix-loader.js
```

This remains temporary and must be folded into the title-bar component/global loader after live verification.

## Loader behavior

`kw-fourthwall-loader.js`:

- Derives `repo` and `selfRef` from its pinned jsDelivr URL.
- Sets shared Storefront API settings.
- Uses `data-version` as the cache key.
- Loads CSS first and JavaScript sequentially.
- Replaces stale same-key resources when URLs change.
- Loads `kwfw-size-guide-data.js` before `kwfw-size-guide.js`.
- Loads current universal-media and shared modal compatibility resources from `selfRef`.

The exact dependency order is documented in `/ARCHITECTURE.md`.

## Shared systems loaded globally

- Layout guard/foundation.
- Background video.
- Header/nav and social icons.
- Title bars and info sections.
- Standard product carousel and desktop wheel/grid behavior.
- Global size-chart registry and injector.
- Universal product-support media.
- Product rules.
- Shared modal price/CTA/variant-gallery and presentation compatibility.
- Cart runtime.

## Standard product modal presentation

Owned across:

```text
fourthwall/kwfw-universal-media.css
fourthwall/kwfw-universal-media.js
fourthwall/kwfw-modal-product-fix.css
fourthwall/kwfw-modal-product-fix.js
```

Current behavior:

- Spellweave and Cauldron Core descriptions remain in `.kwfw-panel-info` under the quick-shop controls.
- The old full-width `.kwfw-desc-wide` clone is removed/hidden.
- The customer-facing `Description` option label is changed to `Size & Style Variant` while the underlying API key remains unchanged.
- Standard selects use stable product-specific widths based on their longest option.

## Step 3 modal presentation

The branch-owned Step 3 module remains under `components/kw-plain-jackets/` on `kw-product-carousel-refactor`.

The shared compatibility stylesheet applies one Step 3-only media rule:

```css
.kwpj-panel .kwpj-gallery-track img,
.kwpj-panel .kwpj-gallery-track video {
  object-position: top center;
}
```

This keeps `object-fit:contain`, gallery dimensions, and variant media unchanged while aligning jacket imagery to the top of the gallery viewport.

## Global size-guide system

Owned by:

```text
fourthwall/kwfw-size-guide-data.js
fourthwall/kwfw-size-guide.js
fourthwall/kwfw-size-guide.css
```

Supported contexts:

```text
standard .kwfw product modals
Step 3 .kwpj base-jacket modals
native Fourthwall /products/ pages
```

The two carousel namespaces intentionally use different quantity-row ownership. Unknown products do not receive generic charts. Native product-page buttons remain full width before Add to Cart.

The popup supports US/Metric conversion, numeric-range conversion, Escape/backdrop/close dismissal, body scroll lock, and focus restoration.

## Shared modal compatibility

Owned by:

```text
fourthwall/kwfw-modal-product-fix.css
fourthwall/kwfw-modal-product-fix.js
```

It supports `.kwfw-*` and `.kwpj-*` modals, resolves actual Fourthwall prices, restores the orange Add to Cart CTA, switches gallery media to selected-variant media, owns standard-only option presentation, and applies Step 3-only top media alignment.

## Risks

1. Title-bar CSS/JS still float from `main`.
2. Info-section CSS/JS still load from `kw-info-accordion-dev`.
3. Legacy global loaders remain in the directory.
4. Native Fourthwall product-page markup and exact product slugs require live verification.
5. The latest Step 3 gallery top-alignment rule requires live verification after publishing the loader.

## Production rules

- Use pinned commit SHAs.
- Do not use `@main` for live production unless explicitly testing.
- Bump both the URL query string and `data-version` for cache invalidation.
- Keep Fourthwall snippets small.
- Record the current production snippet in `/MASTER.md`.
- Log pre-flight, changelog, and diff records for runtime updates.
