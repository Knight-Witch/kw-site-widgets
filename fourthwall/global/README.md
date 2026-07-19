# Fourthwall Global Runtime

This directory owns the site-wide Fourthwall runtime layer. Read `/OPERATING_CONTRACT.md`, `/ARCHITECTURE.md`, `/MASTER.md`, `/STYLE_KEYS.md`, `/HISTORY/CHANGELOG.md`, and `/HISTORY/PRE_FLIGHT_Check.md` before editing.

## Current production candidate

```text
Commit: e9404864ba58ab7daee8e771894d2c374a5f8fc3
Cache key: 20260718-modal-sync-2
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
Shop domain: knightwitchapparel.com
Currency: USD
```

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@e9404864ba58ab7daee8e771894d2c374a5f8fc3/fourthwall/global/kw-fourthwall-loader.js?v=20260718-modal-sync-2
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
- Loads shared modal compatibility before shared modal presentation.

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
- Shared modal price/CTA/variant-gallery compatibility.
- Shared standard/Step 3 modal presentation and collection-title behavior.
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

## Unified product modal presentation

Owned by:

```text
fourthwall/kw-product-modal-presentation.css
fourthwall/kw-product-modal-presentation.js
```

This layer supports both `.kwfw-*` and `.kwpj-*` expanded modals and loads after compatibility code.

Current behavior:

- Black panel/grid/gallery/track/information surfaces.
- Shared `1120px` desktop panel cap and standard two-column ratio.
- Shared `540px` desktop gallery cap with top-aligned `contain` media.
- Shared AgencyFB typography, color assignment, close buttons, details buttons, dots, and transparent arrow style.
- Shared mobile gallery height `clamp(360px,118vw,620px)` and compact information padding.
- Mobile arrows use the Step 3 edge offsets with the standard transparent Spellweave styling.
- Single-media galleries hide navigation and dots.
- Recognized `Cyberpunk 2077` text is split out of the main product title.
- A red linked collection subtitle points to `/pages/edgerunners`.
- Desktop hover/focus glitches to `Edgerunners Collection`.
- Mobile cycles both labels every four seconds unless reduced motion is active.

This module does not alter products, variants, prices, cart requests, or selected-variant gallery resolution.

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

## Risks

1. Title-bar CSS/JS still float from `main`.
2. Info-section CSS/JS still load from `kw-info-accordion-dev`.
3. Legacy global loaders remain in the directory.
4. Native Fourthwall product-page markup and exact product slugs require live verification.
5. Unified modal dimensions, mobile spacing, arrows, and collection subtitle behavior require live verification across both namespaces.
6. Fourthwall editor hot swaps cannot remove listeners from earlier script instances without a full preview reload.

## Production rules

- Use pinned commit SHAs.
- Do not use `@main` for live production unless explicitly testing.
- Bump both the URL query string and `data-version` for cache invalidation.
- Keep Fourthwall snippets small.
- Record the current production snippet in `/MASTER.md`.
- Log pre-flight, changelog, and diff records for runtime updates.
