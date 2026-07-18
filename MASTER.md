# Master Project Log

This is the source bible for the Knight Witch site/widgets repository. It tracks production-facing systems, current snippets, completed work, active risks, cleanup, planned work, and decisions against.

Read `/OPERATING_CONTRACT.md` before editing this file.

## Source-of-truth boundary

GitHub owns the runtime code documented here. Fourthwall owns snippet placement, checkout, native product data, native product and variant media, and any custom page section not represented in this repository.

Native product media may remain Fourthwall-hosted. Other Knight Witch site media should use the DigitalOcean CDN unless documented otherwise.

## Current production candidate

### Global Fourthwall loader

```text
Commit: 1e5cb24e662a37358d296949e998c4980309a883
Cache key: 20260717-size-guide-registry-1
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
Shop domain: knightwitchapparel.com
Currency: USD
```

URL:

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@1e5cb24e662a37358d296949e998c4980309a883/fourthwall/global/kw-fourthwall-loader.js?v=20260717-size-guide-registry-1
```

The live storefront token is intentionally not committed to documentation.

### Temporary title-bar hotfix

```text
Commit: 663b046d1dcb77b86a06ee1af427af2a5b0821dc
Cache key: 20260706-titlebar-hotfix-1
Entrypoint: components/kw-title-bars/kw-title-bars-hotfix-loader.js
```

URL:

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@663b046d1dcb77b86a06ee1af427af2a5b0821dc/components/kw-title-bars/kw-title-bars-hotfix-loader.js?v=20260706-titlebar-hotfix-1
```

Status: temporary. Fold into the base title-bar/global-loader architecture after live verification.

## Active production-facing systems

### Global foundation and background

Owned by:

```text
fourthwall/global/kw-fourthwall-layout-guard.css
fourthwall/global/kw-global-foundation.css
fourthwall/global/kw-global-config.js
fourthwall/global/kw-background-video.css
fourthwall/global/kw-background-video.js
```

Status: active.

### Header and navigation

Owned by:

```text
fourthwall/global/kw-header.css
fourthwall/global/kw-header.js
fourthwall/global/kw-header-about-menu-patch.js
```

Status: active. Detailed nav ownership is in `/ARCHITECTURE.md`.

### Social icons

Owned by:

```text
fourthwall/global/kw-social-icons.css
fourthwall/global/kw-social-icons.js
fourthwall/global/kw-global-config.js
```

Status: active.

### Cart runtime

Owned by:

```text
fourthwall/global/kw-cart-runtime.css
fourthwall/global/kw-cart-runtime.js
```

Status: active. Guards empty-cart navigation and uses `kwfw_cart_id`, `kwfw_cart_count`, and `kwfw_cart_items`.

### Standard product carousel

Owned by:

```text
fourthwall/kwfw-carousel.css
fourthwall/kwfw-carousel.js
fourthwall/kwfw-carousel-desktop-grid.css
fourthwall/kwfw-carousel-wheel-bridge.js
fourthwall/kwfw-font-agencyfb.css
```

Status: active through the global loader.

### Step 3 base-jacket carousel

Owned on branch `kw-product-carousel-refactor` by:

```text
components/kw-plain-jackets/
```

Status: active page-level system using `.kwpj-*` selectors. Global compatibility modules support its modal without taking ownership of the base module.

### Shared product modal compatibility

Owned by:

```text
fourthwall/kwfw-modal-product-fix.css
fourthwall/kwfw-modal-product-fix.js
```

Status: active.

Current behavior:

- Supports standard `.kwfw-*` and Step 3 `.kwpj-*` modals.
- Reads actual Fourthwall `variant.unitPrice` data.
- Restores the orange glowing Add to Cart CTA.
- Switches galleries to selected-variant `variant.images` media.
- Keeps collection-product selection data separate from product-detail media data.
- Falls back to product-wide media when a variant has no dedicated media.
- Preserves standard-modal universal support slides.

### Global product size guide

Owned by:

```text
fourthwall/kwfw-size-guide-data.js
fourthwall/kwfw-size-guide.js
fourthwall/kwfw-size-guide.css
```

Status: production candidate through the global loader.

The system injects a targeted Size Guide button into:

- Featured Spellweave/standard `kwfw` modals.
- Step 3 `kwpj` base-jacket modals.
- Native Fourthwall `/products/` pages when a registered chart resolves.

It follows selected garment variants, supports US/Metric display, and does not show a generic chart for unresolved products.

Current chart registry:

```text
neo4ic-zyphr-mantle
ladies-rocker-vest
mens-leather-rocker-vest
ladies-moto-vest
mens-moto-vest
mens-hexweave-merc-vest
mens-blackout-merc-vest
mens-hooded-vest
mens-denim-vest
mens-tactical-vest
mens-punkass-vest
mens-black-red-moto-vest
mens-classic-leather-moto-vest
```

Known source-data gaps:

- Punkass 8X-Large row was obscured in the supplied chart and was not inferred.
- Black & Red Moto rows below brand size 42 were obscured and were not inferred.

### Universal product media

Owned by:

```text
fourthwall/kwfw-universal-media.css
fourthwall/kwfw-universal-media.js
fourthwall/prod_card_media/manifest.json
```

Current support asset:

```text
https://knightwitch.nyc3.cdn.digitaloceanspaces.com/GLOBAL/PROD_CARD_MEDIA/feature_card.webp
```

### Product rules

Owned by:

```text
fourthwall/kwfw-product-rules.css
fourthwall/kwfw-product-rules.js
```

Current specialization: Cyberpunk collar variants.

### Title bars

Owned by `components/kw-title-bars/`.

Status: active with temporary footer hotfix. The global loader still floats base title-bar CSS/JS from `main`.

### Info sections

Status: branch-loaded from `kw-info-accordion-dev`. Inspect the branch before editing.

### Collection domain and feature video

Owned by:

```text
fourthwall/domains/collection/
fourthwall/domains/collection/feature-video/
```

Current feature video:

```text
https://knightwitch.nyc3.cdn.digitaloceanspaces.com/domainvideos/ENTER-TCD-V2.webm
```

## Active bugs and risks

1. Title-bar CSS/JS float from `main` while the global loader is pinned.
2. The temporary title-bar hotfix remains a separate production snippet.
3. Info sections are loaded from `kw-info-accordion-dev` rather than a stable pinned main commit.
4. Legacy carousel loaders and experimental runtime files remain in the repo and may be mistaken for production entrypoints.
5. `gallery-portfolio/index.html` references a missing `gallery-portfolio.js`.
6. Some Fourthwall custom sections remain unaudited and may still be backend-only.
7. Variant-gallery behavior still requires representative live verification across products with and without assigned variant media.
8. Native product-page Size Guide placement requires live verification against Fourthwall's current rendered Add to Cart markup.
9. Exact size-chart aliases/slugs may need additions when more base-jacket products are registered.

## Completed items

- Created the operating contract and required documentation system.
- Externalized the global Fourthwall loader and runtime modules.
- Added global background, header/nav, social icons, layout guard, and cart runtime.
- Split the Collection feature video into its own module.
- Added the title-bar hotfix and tightened title-to-carousel spacing.
- Stabilized expanded-modal prices and Add to Cart styling for both modal systems.
- Added selected-variant modal gallery filtering.
- Corrected variant matching so detail data no longer forces the default variant.
- Added a centralized product size-chart registry.
- Added Size Guide injection for standard modals, Step 3 modals, and qualifying native product pages.
- Added exact US/Metric conversion including measurement ranges.

## Pending cleanup

1. Fold the title-bar hotfix into the base component/global loader.
2. Stop floating title-bar dependencies from `main`.
3. Stabilize or merge `kw-info-accordion-dev`.
4. Audit and archive/remove obsolete carousel loaders and experimental variants.
5. Resolve the missing gallery portfolio runtime.
6. Audit remaining Fourthwall-only custom sections.
7. Add remaining jacket, vest, coat, and LUXE size charts to `kwfw-size-guide-data.js`.
8. Obtain unobscured Punkass 8X and Black & Red Moto smaller-size rows.
9. Verify native product-page Size Guide placement and selected-option detection live.
10. Verify all Samurai ladies/mens and collar/no-collar gallery and size-guide mappings live.

## Planned work

- Continue chart-registry expansion as source charts are supplied.
- Keep non-native site media on the Knight Witch CDN.
- Maintain pinned production snippets and paired cache-key bumps.
- Record every runtime update in `/HISTORY/CHANGELOG.md`, `/HISTORY/PRE_FLIGHT_Check.md`, and `/HISTORY/DIFFS/`.

## Other production URLs

```text
Title-bar hotfix
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@663b046d1dcb77b86a06ee1af427af2a5b0821dc/components/kw-title-bars/kw-title-bars-hotfix-loader.js?v=20260706-titlebar-hotfix-1

Collection domain loader
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@ab0ccd97765db5f0318895fe8f8be626e537b211/fourthwall/domains/collection/kw-collection-domain-loader.js?v=20260706-collection-domain-6

Collection feature video loader
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@ab0ccd97765db5f0318895fe8f8be626e537b211/fourthwall/domains/collection/feature-video/kw-collection-feature-video-loader.js?v=20260706-collection-feature-video-1
```

## REMOVALS / DECISIONS AGAINST

### Do not use `@main` for production Fourthwall snippets

Reason: floating source and cache behavior can change live output without a footer update.

### Do not keep the title-bar hotfix as permanent architecture

Reason: it is a compatibility layer that should be folded into the owning component.

### Do not use legacy carousel loaders without revalidation

Reason: prior experiments produced stale and at least one browser-freezing state.

### Do not use broad generic vest/jacket size-chart guessing

Reason: base garments from different manufacturers have different measurements. The size-guide resolver must use exact product/variant registry mappings.

### Do not fabricate obscured sizing rows

Reason: customer-facing measurements must come from supplied source data, not inferred numeric patterns.

### Do not assume undocumented Fourthwall sections are GitHub-owned

Reason: some live sections remain backend-only until audited and documented.
