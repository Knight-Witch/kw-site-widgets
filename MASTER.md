# Master Project Log

This is the source bible for the Knight Witch site/widgets repository. Read `/OPERATING_CONTRACT.md` before editing runtime code.

## Current production candidate

### Global Fourthwall loader

```text
Commit: 2a3d96c115de79cc6a22eb85181350cb4c76b465
Cache key: 20260717-featured-size-guide-align-1
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
Shop domain: knightwitchapparel.com
Currency: USD
```

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@2a3d96c115de79cc6a22eb85181350cb4c76b465/fourthwall/global/kw-fourthwall-loader.js?v=20260717-featured-size-guide-align-1
```

The live storefront token is intentionally not stored in repository documentation.

### Temporary title-bar hotfix

```text
Commit: 663b046d1dcb77b86a06ee1af427af2a5b0821dc
Cache key: 20260706-titlebar-hotfix-1
Entrypoint: components/kw-title-bars/kw-title-bars-hotfix-loader.js
```

Status: active temporary compatibility layer.

## Active systems

### Global runtime

Owned by `fourthwall/global/` and coordinated by `kw-fourthwall-loader.js`.

### Standard product carousel

Owned by:

```text
fourthwall/kwfw-carousel.css
fourthwall/kwfw-carousel.js
fourthwall/kwfw-carousel-desktop-grid.css
fourthwall/kwfw-carousel-wheel-bridge.js
fourthwall/kwfw-font-agencyfb.css
```

Status: active. Scroll behavior remains shared across base CSS, desktop overrides, and the wheel bridge.

### Step 3 base-jacket carousel

Owned on branch `kw-product-carousel-refactor` under `components/kw-plain-jackets/`.

### Shared product modal compatibility

Owned by:

```text
fourthwall/kwfw-modal-product-fix.css
fourthwall/kwfw-modal-product-fix.js
```

Current behavior:

- Supports `.kwfw-*` and `.kwpj-*` modals.
- Displays actual Fourthwall selected-variant prices.
- Restores the orange glowing Add to Cart CTA.
- Switches galleries to selected-variant media.
- Falls back to product-wide media.
- Preserves standard-modal universal support slides.

### Global product size guide

Owned by:

```text
fourthwall/kwfw-size-guide-data.js
fourthwall/kwfw-size-guide.js
fourthwall/kwfw-size-guide.css
```

Current behavior:

- Injects into featured Spellweave/standard modals.
- Injects into Step 3 base-jacket modals.
- Injects into registered native Fourthwall product pages.
- Follows the selected garment variant.
- Uses AgencyFB in carousel modals.
- Uses an explicit two-column modal grid: fixed 170px quantity controls plus a separate Size Guide column.
- Forces both modal namespaces to the original `48px 58px 48px` quantity-control geometry.
- Preserves the `-`, quantity input, and `+` controls without overlap.
- In standard `kwfw` modals, puts the Qty label in row 1 and aligns the quantity controls and Size Guide together in row 2.
- Leaves the corrected Step 3 `kwpj` row geometry unchanged.
- Uses a 16px desktop gap and 10px mobile gap.
- Remains full width before Add to Cart on native product pages.
- Supports US/Metric conversion and standard modal dismissal/focus behavior.
- Does not show a generic chart for unresolved products.

Current registry:

```text
neo4ic-zyphr-mantle
ladies-crop-top-rocker-jacket
ladies-goth-merc-vest
ladies-punkass-vest
ladies-biker-vest
mens-leather-rocker-vest
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

Ladies mapping decisions:

- Ladies Crop-Top Rocker Jacket and Ladies Snakeskin Crop Top Vest share one chart.
- Featured `Ladies Rocker Vest` option labels resolve to that shared chart.
- The old generic ladies rocker identity was removed.
- The unverified generic ladies moto mapping was removed.

Known chart-data gaps:

- Men's Punkass 8X-Large row remains obscured.
- Men's Black & Red Moto rows below brand size 42 remain obscured.

## Active risks

1. Title-bar CSS/JS still float from `main`.
2. The title-bar hotfix remains a separate production snippet.
3. Info sections still load from a development branch.
4. Legacy carousel loaders remain in the repository.
5. Native product-page Size Guide placement depends on current Fourthwall markup.
6. Exact product slugs/aliases must expand as more garment charts are supplied.
7. Variant-specific gallery behavior still needs broad live verification.
8. `gallery-portfolio/index.html` references a missing runtime in the audited branch.

## Completed recent work

- Restored real modal prices and Add to Cart styling.
- Added selected-variant galleries and corrected default-variant fallback.
- Added the centralized size-chart registry and global injector.
- Restored compact quantity-row placement and carousel typography.
- Corrected ladies product identities and chart mappings.
- Separated Size Guide from the quantity controls and normalized both modal namespaces to fixed internal quantity geometry.
- Aligned the featured Spellweave Size Guide specifically to the standard quantity-control row without touching Step 3.

## Pending work

1. Verify the latest loader live in standard, Step 3, and native product contexts.
2. Add remaining garment charts as exact source data is supplied.
3. Confirm native product slugs where normalized names differ.
4. Obtain unobscured missing men's chart rows.
5. Fold the title-bar hotfix into the base component.
6. Stabilize or merge `kw-info-accordion-dev`.
7. Audit/archive obsolete carousel experiments.
8. Resolve the missing gallery portfolio runtime.

## REMOVALS / DECISIONS AGAINST

### No broad generic jacket/vest chart matching

Reason: garments use different manufacturers and measurements.

### No fabricated sizing rows

Reason: customer-facing measurements must come from legible source data.

### No `@main` production footer

Reason: production must remain pinned and cache-versioned.

### No permanent title-bar hotfix architecture

Reason: the compatibility layer must eventually be folded into the owning component.
