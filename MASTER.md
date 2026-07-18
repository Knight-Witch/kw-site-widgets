# Master Project Log

This is the source bible for the Knight Witch site/widgets repository. Read `/OPERATING_CONTRACT.md` before editing runtime code.

## Current production candidate

### Global Fourthwall loader

```text
Commit: 0de2b178480bf6f1128ad50b9c0068e9cda50da7
Cache key: 20260717-ladies-size-guides-1
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
Shop domain: knightwitchapparel.com
Currency: USD
```

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@0de2b178480bf6f1128ad50b9c0068e9cda50da7/fourthwall/global/kw-fourthwall-loader.js?v=20260717-ladies-size-guides-1
```

The live storefront token is intentionally not stored in repository documentation.

### Temporary title-bar hotfix

```text
Commit: 663b046d1dcb77b86a06ee1af427af2a5b0821dc
Cache key: 20260706-titlebar-hotfix-1
Entrypoint: components/kw-title-bars/kw-title-bars-hotfix-loader.js
```

Status: active temporary compatibility layer. Fold into the base component after verification.

## Active systems

### Global runtime

Owned by `fourthwall/global/` and coordinated by `kw-fourthwall-loader.js`.

Active systems include the foundation/layout guard, background video, header/nav, social icons, info spacing, cart guard, standard carousel dependencies, global size guides, product rules, and shared modal compatibility.

### Standard product carousel

Owned by:

```text
fourthwall/kwfw-carousel.css
fourthwall/kwfw-carousel.js
fourthwall/kwfw-carousel-desktop-grid.css
fourthwall/kwfw-carousel-wheel-bridge.js
fourthwall/kwfw-font-agencyfb.css
```

Status: active. Scroll behavior is shared across base CSS, desktop override, and the wheel bridge.

### Step 3 base-jacket carousel

Owned on branch `kw-product-carousel-refactor` under:

```text
components/kw-plain-jackets/
```

Status: active page-level system using `.kwpj-*` selectors.

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
- Preserves standard-modal support slides.

### Global product size guide

Owned by:

```text
fourthwall/kwfw-size-guide-data.js
fourthwall/kwfw-size-guide.js
fourthwall/kwfw-size-guide.css
```

Current behavior:

- Injects into featured Spellweave/standard product modals.
- Injects into Step 3 base-jacket modals.
- Injects into registered native Fourthwall `/products/` pages.
- Follows the selected garment variant.
- Uses AgencyFB and sits in the quantity row in both carousel modal systems.
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

Ladies chart mapping decisions:

- `ladies-crop-top-rocker-jacket` and `ladies-snakeskin-crop-top-vest` share one chart.
- Featured `Ladies Rocker Vest` option labels resolve to that shared chart.
- The old generic `ladies-rocker-vest` registry identity was removed.
- The old unverified generic `ladies-moto-vest` mapping was removed rather than exposing an incorrect chart.

Known source-data gaps:

- Men's Punkass 8X-Large row remains obscured.
- Men's Black & Red Moto rows below brand size 42 remain obscured.

### Universal product media

Owned by:

```text
fourthwall/kwfw-universal-media.css
fourthwall/kwfw-universal-media.js
fourthwall/prod_card_media/manifest.json
```

### Product rules

Owned by:

```text
fourthwall/kwfw-product-rules.css
fourthwall/kwfw-product-rules.js
```

Current specialization: Cyberpunk collar variants.

### Title bars

Owned by `components/kw-title-bars/`. Base CSS/JS still float from `main`; a separate pinned hotfix remains active.

### Info sections

Loaded from `kw-info-accordion-dev`. Inspect the branch before editing.

## Active risks

1. Title-bar CSS/JS still float from `main`.
2. The title-bar hotfix remains a separate production snippet.
3. Info sections still load from a development branch.
4. Legacy carousel loaders remain in the repository.
5. Native product-page Size Guide placement depends on current Fourthwall markup and requires live verification.
6. Exact product slugs/aliases must be extended as additional garment charts are supplied.
7. Variant-specific gallery behavior still needs representative live checks across products.
8. `gallery-portfolio/index.html` references a missing runtime in the audited branch.

## Completed recent work

- Stabilized real prices and modal Add to Cart styling in both carousel systems.
- Added selected-variant gallery filtering and corrected default-variant fallback behavior.
- Added one centralized size-chart registry.
- Added Size Guide injection to standard modals, Step 3 modals, and qualifying native product pages.
- Restored compact quantity-row Size Guide placement and carousel typography.
- Replaced generic ladies chart identities with exact Crop-Top Rocker/Snakeskin, Goth Merc, Punkass, and Biker mappings.

## Pending work

1. Verify the current loader live across representative standard, Step 3, and native product contexts.
2. Add remaining ladies jackets, vests, coats, and LUXE charts as exact source data is supplied.
3. Confirm actual native product slugs if any differ from normalized product names.
4. Obtain unobscured missing men's chart rows.
5. Fold the title-bar hotfix into the base component.
6. Stabilize or merge `kw-info-accordion-dev`.
7. Audit and archive obsolete carousel experiments.
8. Resolve the missing gallery portfolio runtime.

## REMOVALS / DECISIONS AGAINST

### No broad generic jacket/vest chart matching

Reason: garments use different manufacturers and measurements. Chart resolution must use exact registry mappings.

### No fabricated sizing rows

Reason: customer-facing measurements must come from legible source data.

### No `@main` production footer

Reason: production must remain pinned and cache-versioned.

### No permanent title-bar hotfix architecture

Reason: the compatibility layer must eventually be folded into the owning component.
