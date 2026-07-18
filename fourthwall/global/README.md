# Fourthwall Global Runtime

This directory owns the site-wide Fourthwall runtime layer. Read `/OPERATING_CONTRACT.md`, `/ARCHITECTURE.md`, `/MASTER.md`, `/STYLE_KEYS.md`, `/HISTORY/CHANGELOG.md`, and `/HISTORY/PRE_FLIGHT_Check.md` before editing.

## Current production candidate

```text
Commit: 94a92c443658086ee2a3c5b822ba68a873c3f3ef
Cache key: 20260717-featured-size-guide-restore-1
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
Shop domain: knightwitchapparel.com
Currency: USD
```

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@94a92c443658086ee2a3c5b822ba68a873c3f3ef/fourthwall/global/kw-fourthwall-loader.js?v=20260717-featured-size-guide-restore-1
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
- Cart runtime.

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

Carousel-modal buttons sit beside quantity controls and use AgencyFB. Native product-page buttons remain full width before Add to Cart.

The two carousel modal namespaces intentionally use different row geometry:

- Standard `kwfw` uses its restored flex/end-aligned quantity row and native 170px quantity control.
- Step 3 `kwpj` uses the fixed two-column grid and explicit `48px 58px 48px` quantity geometry required to prevent overlap.

Do not force both modal systems through one shared quantity-row grid.

The registry uses exact product slugs, controlled title aliases, and selected-variant aliases. Unknown products do not receive generic charts.

Current ladies mapping decisions:

- Ladies Crop-Top Rocker Jacket and Ladies Snakeskin Crop Top Vest share one chart.
- Featured `Ladies Rocker Vest` option labels resolve to that shared chart.
- Ladies Goth Merc Vest, Ladies Punkass Vest, and Ladies Biker Vest have separate charts.
- The old unverified generic `ladies-moto-vest` chart was removed.

The popup supports US/Metric conversion, numeric-range conversion, Escape/backdrop/close dismissal, body scroll lock, and focus restoration.

## Shared modal compatibility

Owned by:

```text
fourthwall/kwfw-modal-product-fix.css
fourthwall/kwfw-modal-product-fix.js
```

It supports `.kwfw-*` and `.kwpj-*` modals, resolves actual Fourthwall `variant.unitPrice`, restores the orange Add to Cart CTA, and switches gallery media to selected-variant media with product-wide fallback.

## Risks

1. Title-bar CSS/JS still float from `main`.
2. Info-section CSS/JS still load from `kw-info-accordion-dev`.
3. Several modules remain pinned to different historical commits.
4. Legacy global loaders remain in the directory.
5. Native Fourthwall product-page markup and exact product slugs require live verification.
6. The latest Featured Spellweave Size Guide restore requires live visual verification.

## Production rules

- Use pinned commit SHAs.
- Do not use `@main` for live production unless explicitly testing.
- Bump both the URL query string and `data-version` for cache invalidation.
- Keep Fourthwall snippets small.
- Record the current production snippet in `/MASTER.md`.
- Log pre-flight, changelog, and diff records for runtime updates.
