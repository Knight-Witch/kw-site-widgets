# Fourthwall Global Runtime

This directory owns the site-wide Fourthwall runtime layer. Read `/OPERATING_CONTRACT.md`, `/ARCHITECTURE.md`, `/MASTER.md`, `/STYLE_KEYS.md`, `/HISTORY/CHANGELOG.md`, and `/HISTORY/PRE_FLIGHT_Check.md` before editing.

## Current production candidate

```text
Commit: aa8ad96cb30ddfcff156be0785846040633aea3d
Cache key: 20260718-size-guide-layout-compact-1
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
Shop domain: knightwitchapparel.com
Currency: USD
```

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@aa8ad96cb30ddfcff156be0785846040633aea3d/fourthwall/global/kw-fourthwall-loader.js?v=20260718-size-guide-layout-compact-1
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

The two carousel namespaces intentionally use different DOM ownership:

- Featured `kwfw`: `.kwfw-label` remains inside `.kwfw-field`; `.kwfw-qty` and Size Guide share the same quantity row.
- Step 3 `kwpj`: the full `.kwpj-field` remains inside its fixed two-column row.

Featured CSS targets both `.kw-size-qty-size-row` and `.kw-size-qty-size-row--kwfw`. This is deliberate: Fourthwall editor hot reloads can preserve an older base-class row, and modifier-only styling leaves Size Guide below the quantity controls.

Do not force both systems through one field-level wrapper.

The resolver supports exact product slugs, controlled aliases, selected-variant aliases, and product-scoped variant rules. Product-scoped rules are required for generic values such as `Vegan Leather` and `Genuine Leather`.

Current Samurai routing:

- Ladies Rocker Vest → Ladies Crop-Top Vest Size Chart.
- Mens Rocker Vest / mens vest-only/collar variants → Men's Hooded Vest Size Chart.
- Samurai Moto + Vegan Leather → Vegan Moto Jacket - Unisex.
- Samurai Moto + Genuine Leather → Genuine Leather Moto Jacket - Unisex.

Unknown products do not receive generic charts. Native product-page buttons remain full width before Add to Cart.

Current chart presentation:

- Size-chart titles use AgencyFB with explicit tracking.
- Table text remains Arial/Helvetica for readability.
- Desktop panel/table widths are content-driven.
- Desktop cell and note spacing is compact.
- Mobile tables no longer force a blanket 560px width.
- Mobile header labels can wrap; horizontal scrolling is reserved for genuinely wide charts.

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
6. The latest Featured compatibility selector and compact chart layout require live verification after publishing the loader.

## Production rules

- Use pinned commit SHAs.
- Do not use `@main` for live production unless explicitly testing.
- Bump both the URL query string and `data-version` for cache invalidation.
- Keep Fourthwall snippets small.
- Record the current production snippet in `/MASTER.md`.
- Log pre-flight, changelog, and diff records for runtime updates.
