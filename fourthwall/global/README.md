# Fourthwall Global Runtime

This directory owns the site-wide Fourthwall runtime layer. Read `/OPERATING_CONTRACT.md`, `/ARCHITECTURE.md`, `/MASTER.md`, `/STYLE_KEYS.md`, `/HISTORY/CHANGELOG.md`, and `/HISTORY/PRE_FLIGHT_Check.md` before editing.

## Purpose

Fourthwall should contain a small footer snippet that loads `fourthwall/global/kw-fourthwall-loader.js` from a pinned GitHub/jsDelivr commit. The global loader coordinates shared CSS and JavaScript while implementation remains in GitHub.

## Current production candidate

```text
Commit: 3ae4a2f1827a4aa132da234faac94a876e18e489
Cache key: 20260717-size-guide-placement-2
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
Shop domain: knightwitchapparel.com
Currency: USD
```

URL:

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@3ae4a2f1827a4aa132da234faac94a876e18e489/fourthwall/global/kw-fourthwall-loader.js?v=20260717-size-guide-placement-2
```

The live storefront token is intentionally not stored in repository documentation.

## Temporary title-bar hotfix

The footer also uses:

```text
Commit: 663b046d1dcb77b86a06ee1af427af2a5b0821dc
Cache key: 20260706-titlebar-hotfix-1
Entrypoint: components/kw-title-bars/kw-title-bars-hotfix-loader.js
```

This remains temporary and must be folded into the title-bar component/global loader after live verification.

## Loader behavior

`kw-fourthwall-loader.js`:

- Derives `repo` and `selfRef` from its own pinned jsDelivr URL.
- Sets `window.KWFW_SETTINGS.storefrontToken`, `shopDomain`, `currency`, and product-media manifest values.
- Uses `data-version` as the cache key.
- Loads CSS first.
- Loads JavaScript sequentially.
- Removes stale same-key resources when their URLs differ.
- Loads `kwfw-size-guide-data.js` before `kwfw-size-guide.js`.

The exact dependency order is documented in `/ARCHITECTURE.md`.

## Current global files

```text
kw-fourthwall-loader.js
kw-global-config.js
kw-global-fonts.css
kw-global-foundation.css
kw-fourthwall-layout-guard.css
kw-background-video.css
kw-background-video.js
kw-header.css
kw-header.js
kw-header-about-menu-patch.js
kw-social-icons.css
kw-social-icons.js
kw-info-spacing-runtime.js
kw-cart-runtime.css
kw-cart-runtime.js
```

Legacy compatibility loaders remain in this directory. Do not use them as production entrypoints without revalidation.

## Shared systems loaded by the global loader

- Global layout guard and foundation.
- Background video.
- Header/nav.
- Social icons.
- Title bars.
- Info sections.
- Standard product carousel.
- Desktop carousel grid/wheel bridge.
- Global size-chart registry and injector.
- Universal product-support media.
- Product rules.
- Shared modal price/CTA/variant-gallery compatibility.
- Cart runtime.

## Global size-guide system

Owned by:

```text
fourthwall/kwfw-size-guide-data.js
fourthwall/kwfw-size-guide.js
fourthwall/kwfw-size-guide.css
```

The registry file is the sole location for chart data and exact product/variant mappings.

The injector supports:

```text
standard .kwfw product modals
Step 3 .kwpj base-jacket modals
native Fourthwall /products/ pages
```

In standard and Step 3 modals, the button is placed beside the existing quantity controls in one idempotent `.kw-size-qty-size-row`. It uses the same AgencyFB display typography and 46px control height as the carousel UI. Native product-page buttons remain full width before Add to Cart.

A button only appears when the current product slug, product title, or selected garment variant resolves to a registered chart. Unknown products and non-garment products do not receive a generic chart.

The popup supports US/Metric output, measurement-range conversion, Escape/backdrop/close-button dismissal, body scroll lock, and focus restoration.

## Shared modal compatibility

Owned by:

```text
fourthwall/kwfw-modal-product-fix.css
fourthwall/kwfw-modal-product-fix.js
```

It supports `.kwfw-*` and `.kwpj-*` modals, resolves actual Fourthwall `variant.unitPrice`, restores the orange Add to Cart CTA, and switches gallery media to the selected variant while preserving product-wide fallback.

## Header ownership

Production header/nav work belongs in:

```text
kw-header.css
kw-header.js
```

Do not edit lab header files for production work unless explicitly requested.

## Media boundary

Native Fourthwall product and variant media may remain Fourthwall-hosted. Other site media referenced by this repository should use the Knight Witch DigitalOcean CDN unless documented otherwise.

## Dependency risks

1. Title-bar CSS/JS still float from `main`.
2. Info-section CSS/JS still load from `kw-info-accordion-dev`.
3. Several product modules remain pinned to different historical commits.
4. Legacy global loaders remain in the directory.
5. Native Fourthwall product-page markup may change and requires live verification after global injector updates.

## Fourthwall/jsDelivr rules

- Use pinned commit SHAs for production.
- Do not use `@main` for live production unless explicitly testing.
- Bump both the URL query string and `data-version` when invalidating cache.
- Keep Fourthwall snippets small.
- Record current production snippets in `/MASTER.md`.

## Update protocol

1. Perform and log a pre-flight check.
2. Edit the owning runtime, not backend copies.
3. Update the global loader only when dependency order or globally loaded resources change.
4. Update `/ARCHITECTURE.md`, `/STYLE_KEYS.md`, `/MASTER.md`, `/HISTORY/CHANGELOG.md`, `/HISTORY/PRE_FLIGHT_Check.md`, and `/HISTORY/DIFFS/` as applicable.
5. Provide rollback commit and cache-key information.
6. State anything not verified live.

Do not rely on chat history as the source of truth. Use the repository documentation.
