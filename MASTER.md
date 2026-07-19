# Master Project Log

This is the source bible for the Knight Witch site/widgets repository. Read `/OPERATING_CONTRACT.md` before editing runtime code.

## Current production candidate

### Global Fourthwall loader

```text
Commit: 08c4dca8bf833d283cedfeb471f29bd2741a70cc
Cache key: 20260718-featured-card-collections-2
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
Shop domain: knightwitchapparel.com
Currency: USD
```

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@08c4dca8bf833d283cedfeb471f29bd2741a70cc/fourthwall/global/kw-fourthwall-loader.js?v=20260718-featured-card-collections-2
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

Current standard modal behavior:

- Product descriptions remain in the right-side `.kwfw-panel-info` column.
- Legacy `.kwfw-desc-wide` clones are removed/hidden.
- The combined variant label is presented as `Size & Style Variant` while the Fourthwall API key remains `Description`.
- Standard selects use a stable product-specific width based on the longest option.
- Selected variants switch to native assigned media with product-wide fallback.

### Step 3 base-jacket carousel

Owned on branch `kw-product-carousel-refactor` under `components/kw-plain-jackets/`.

Current shared presentation behavior:

- Step 3 modal media remains `object-fit:contain` and is top-aligned.
- Step 3 uses the same black modal surfaces, gallery footprint, AgencyFB typography, color assignment, transparent arrows, dots, close control, CTA treatment, and mobile gallery spacing as the standard modal.
- Step 3 product loading, filters, modal construction, variant selection, and cart logic remain branch-owned.

### Shared product-modal compatibility

Owned by:

```text
fourthwall/kwfw-modal-product-fix.css
fourthwall/kwfw-modal-product-fix.js
```

Current behavior:

- Supports `.kwfw-*` and `.kwpj-*` modals.
- Displays real selected-variant Fourthwall prices.
- Restores the orange glowing Add to Cart CTA.
- Switches galleries to selected-variant media.
- Falls back to product-wide media.
- Preserves standard universal support slides.
- Owns standard-only visible option relabeling and select-width calculation.

### Unified product presentation

Owned by:

```text
fourthwall/kw-product-modal-presentation.css
fourthwall/kw-product-modal-presentation.js
```

Current behavior:

- Synchronizes expanded `kwfw` and `kwpj` visual styling.
- Formats standard featured-product card titles.
- Formats collection-aware modal titles.
- Uses one controlled six-collection registry.
- Fetches each controlled Fourthwall collection once per page and indexes membership by slug/product identifiers.
- Resolves each product independently, including mixed homepage carousels.
- Uses embedded product collection metadata when available.
- Uses the visible carousel handle only as a dedicated-carousel fallback.
- Uses title parsing only as the final fallback.
- Does not mutate Fourthwall product objects.
- Desktop subtitles glitch between tagline and collection name on pointer/focus.
- Mobile subtitles cycle every four seconds unless reduced motion is enabled.

Controlled display registry:

```text
Edgerunners: Cyberpunk 2077 <-> Edgerunners Collection
Basscraft: Eat. Sleep. Rave. Repeat. <-> Basscraft Collection
Wicked Hearts: Snakes Skulls & Sin <-> Wicked Hearts Collection
Astral Plane: All Things Fantasy <-> Astral Plane Collection
Black Mass: Sci-fi & Beyond <-> Black Mass Collection
Starchild: Mystics Zodiacs & Vibes <-> Starchild Collection
```

Collection handle aliases:

```text
edgerunners-core / edgerunners
basscraft-core / basscraft
wicked-hearts-core / wicked-hearts
astral-plane-core / astral-plane
black-mass-core / black-mass
starchild-core / starchild
```

### Global product size guide

Owned by:

```text
fourthwall/kwfw-size-guide-data.js
fourthwall/kwfw-size-guide.js
fourthwall/kwfw-size-guide.css
```

Current behavior:

- Injects into standard featured modals, Step 3 modals, and registered native product pages.
- Follows the selected garment variant.
- Uses separate namespace-specific quantity-row ownership.
- Keeps native product-page buttons full width before Add to Cart.
- Supports US/Metric conversion, normal dismissal, body scroll lock, and focus restoration.
- Supports product-scoped variant rules for generic material values.
- Does not show a generic chart for unresolved products.
- Uses AgencyFB chart headings and content-driven table widths.
- Mobile tables do not enforce a blanket `560px` minimum width.

Current chart registry:

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
samurai-vegan-moto-jacket
samurai-genuine-leather-moto-jacket
```

Samurai mapping decisions:

- Featured `Ladies Rocker Vest` resolves to **Ladies Crop-Top Vest Size Chart**.
- Featured `Mens Rocker Vest` and mens vest-only/collar variants resolve to **Men's Hooded Vest Size Chart**.
- Samurai Moto uses product-scoped Vegan/Genuine routing.
- Generic Vegan/Genuine options on unrelated products do not resolve to Samurai charts.

Known chart-data gaps:

- Men's Punkass 8X-Large row remains obscured.
- Men's Black & Red Moto rows below brand size 42 remain obscured.

### Universal product media

Owned by:

```text
fourthwall/kwfw-universal-media.css
fourthwall/kwfw-universal-media.js
fourthwall/prod_card_media/manifest.json
```

Current behavior:

- Appends configured support media to standard modal galleries.
- Does not own product-description placement.
- Removes legacy full-width description clones.

## Active bugs and risks

1. Title-bar CSS/JS still float from `main`.
2. The title-bar hotfix remains a separate production snippet.
3. Info sections still load from `kw-info-accordion-dev`.
4. Legacy carousel loaders remain in the repository.
5. Native product-page Size Guide placement depends on current Fourthwall markup.
6. Exact product slugs and chart aliases must expand as charts are supplied.
7. Variant-specific gallery behavior still needs broad live verification.
8. `gallery-portfolio/index.html` references a missing runtime in the audited main branch.
9. Controlled collection handles must be verified live as each Collection Domain begins carrying featured Spellweaves.
10. Fourthwall editor hot-swaps can leave old JavaScript listeners resident until a full preview reload.
11. Collection membership indexing performs one successful lookup per controlled collection, with an alias retry when the first handle is empty or unavailable.

## Completed recent work

- Restored real modal prices and the expanded Add to Cart CTA.
- Added selected-variant galleries and corrected default fallback.
- Added the centralized size-chart registry and injector.
- Corrected ladies product identities and Samurai mappings.
- Fixed namespace-specific quantity/Size Guide geometry.
- Added AgencyFB chart titles and compact mobile/desktop chart spacing.
- Returned standard descriptions to the right information column.
- Added `Size & Style Variant` presentation and stable longest-option select widths.
- Synchronized standard and Step 3 modal backgrounds, gallery footprint, fonts, arrows, dots, buttons, and mobile spacing.
- Added collection-aware clean modal titles and red glitch subtitles.
- Added collection-aware featured-card main titles and subtitles.
- Added mixed-carousel-safe per-product collection membership resolution.

## Pending work

1. Verify the latest loader live on the homepage mixed featured carousel and dedicated Edgerunners/Basscraft carousels.
2. Confirm exact Fourthwall handles for future Wicked Hearts, Astral Plane, Black Mass, and Starchild featured-product collections.
3. Add remaining garment charts as exact source data is supplied.
4. Confirm native product slugs where normalized names differ.
5. Obtain unobscured missing men's chart rows.
6. Separate size and style into independent front-end controls while resolving one correct Fourthwall variant for cart submission.
7. Fold the title-bar hotfix into the base component.
8. Stabilize or merge `kw-info-accordion-dev`.
9. Audit/archive obsolete carousel experiments.
10. Resolve the missing gallery portfolio runtime.

## REMOVALS / DECISIONS AGAINST

### No carousel-handle-only collection labeling

Reason: mixed featured carousels contain products from multiple Collection Domains. Each card must resolve from the product's own membership.

### No title-only collection classification

Reason: artist and product names do not reliably contain the Collection Domain name. Title parsing remains a fallback, not the primary classifier.

### No mutation of Fourthwall product titles

Reason: customer-facing presentation can be cleaned in the DOM without changing source product data used by cart, variant, URL, and API logic.

### No vertical centering for modal product media

Reason: jacket imagery should align to the top of the fixed gallery viewport.

### No full-width standard product description row

Reason: descriptions belong in the right-side information column.

### No selected-option-driven dropdown width

Reason: resizing on every option change is visually unstable.

### No visible `Description` label for combined variants

Reason: it is an internal Fourthwall option name, not useful customer-facing copy.

### No shared quantity-row DOM ownership for `kwfw` and `kwpj`

Reason: the two modal architectures require different wrapper ownership.

### No fixed blanket mobile size-table width

Reason: short charts should use available mobile space efficiently.

### No global material-only chart routing

Reason: generic material values occur on unrelated products.

### No broad generic jacket/vest chart matching

Reason: garments use different manufacturers and measurements.

### No fabricated sizing rows

Reason: customer-facing measurements must come from legible source data.

### No `@main` production footer

Reason: production must remain pinned and cache-versioned.

### No permanent title-bar hotfix architecture

Reason: the compatibility layer must eventually be folded into the owning component.
