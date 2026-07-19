# Master Project Log

This is the source bible for the Knight Witch site/widgets repository. Read `/OPERATING_CONTRACT.md` before editing runtime code.

## Current production candidate

### Global Fourthwall loader

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

Standard modal behavior:

- Product descriptions remain in the right-side `.kwfw-panel-info` column below quick-shop controls.
- Legacy full-width `.kwfw-desc-wide` clones are removed/hidden.
- The visible combined variant label is `Size & Style Variant` while the Fourthwall option key remains `Description` for correct cart selection.
- Standard selects use a stable product-specific width based on their longest option and clamp to the available column width.

### Step 3 base-jacket carousel

Owned on branch `kw-product-carousel-refactor` under `components/kw-plain-jackets/`.

The branch retains product loading, filter tabs, modal construction, quantity controls, cart actions, and gallery navigation events. Shared global presentation now standardizes the final Step 3 modal visuals without changing that branch-owned behavior.

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
- Switches galleries to selected-variant media with product-wide fallback.
- Preserves standard-modal universal support slides.
- Owns standard-only visible option relabeling and stable select-width calculation.

### Unified product modal presentation

Owned by:

```text
fourthwall/kw-product-modal-presentation.css
fourthwall/kw-product-modal-presentation.js
```

Current behavior:

- Makes the complete `kwfw` and `kwpj` modal surface black: panel, grid, gallery, track, and information column.
- Uses one desktop panel width, column ratio, `540px` gallery cap, AgencyFB typography, color system, close-button style, details-button style, dot style, and transparent white arrow treatment.
- Forces both systems’ media to `object-fit:contain`, `object-position:top center`, and the full fixed gallery height.
- Hides controls for single-media galleries.
- Uses a shared mobile gallery height of `clamp(360px,118vw,620px)` and compact information spacing.
- Positions both mobile arrow systems at the Step 3 edge offsets while using the standard transparent Spellweave arrow style.
- Removes recognized `Cyberpunk 2077` prefixes/suffixes from modal titles.
- Adds a smaller red `Cyberpunk 2077` collection subtitle linked to `/pages/edgerunners`.
- Desktop hover/focus glitches the subtitle to `Edgerunners Collection`.
- Mobile cycles between both labels every four seconds unless reduced motion is enabled.
- Does not alter product objects, prices, variant selection, cart submission, or selected-variant gallery routing.

### Global product size guide

Owned by:

```text
fourthwall/kwfw-size-guide-data.js
fourthwall/kwfw-size-guide.js
fourthwall/kwfw-size-guide.css
```

Current behavior:

- Injects into featured Spellweave/standard modals, Step 3 base-jacket modals, and registered native Fourthwall product pages.
- Follows the selected garment variant.
- Keeps separate `kwfw` and `kwpj` quantity-row ownership.
- Supports US/Metric conversion and standard dismissal/focus behavior.
- Supports product-scoped variant rules for generic material options.
- Does not show a generic chart for unresolved products.
- Uses AgencyFB chart headings, content-driven widths, and compact mobile tables.

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
samurai-vegan-moto-jacket
samurai-genuine-leather-moto-jacket
```

Samurai mapping decisions:

- Featured `Ladies Rocker Vest` resolves to **Ladies Crop-Top Vest Size Chart**.
- Featured `Mens Rocker Vest` and mens vest-only/collar variants resolve to **Men's Hooded Vest Size Chart**.
- `Vegan Leather` resolves to **Vegan Moto Jacket - Unisex** only within the Samurai Moto product context.
- `Genuine Leather` resolves to **Genuine Leather Moto Jacket - Unisex** only within the Samurai Moto product context.

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

It appends configured support media, preserves the standard description in `.kwfw-panel-info`, removes legacy wide clones, and does not own cross-system modal presentation.

## Active risks

1. Title-bar CSS/JS still float from `main`.
2. The title-bar hotfix remains a separate production snippet.
3. Info sections still load from a development branch.
4. Legacy carousel loaders remain in the repository.
5. Native product-page Size Guide placement depends on current Fourthwall markup.
6. Exact product slugs/aliases must expand as more garment charts are supplied.
7. Variant-specific gallery behavior still needs broad live verification.
8. `gallery-portfolio/index.html` references a missing runtime in the audited branch.
9. The unified desktop/mobile modal geometry, arrows, and title subtitle behavior require live visual verification across representative standard and Step 3 products.
10. Collection-title parsing currently recognizes Cyberpunk 2077 only; other collection mappings require controlled additions.
11. Fourthwall editor hot swaps cannot remove listeners from older scripts without a full preview reload.

## Completed recent work

- Restored real modal prices and Add to Cart styling.
- Added selected-variant galleries and corrected default-variant fallback.
- Added the centralized size-chart registry and global injector.
- Corrected ladies product identities and Samurai chart mappings.
- Fixed Step 3 quantity overlap and Featured Size Guide placement.
- Added AgencyFB chart titles and compact desktop/mobile table spacing.
- Returned standard product descriptions to the right information column.
- Added `Size & Style Variant` presentation and stable longest-option select widths.
- Top-aligned Step 3 gallery media.
- Added a shared modal presentation layer for black surfaces, gallery caps, typography, navigation, mobile spacing, clean titles, and linked collection subtitles.

## Pending work

1. Verify the new loader live in standard Spellweave, Cauldron Core, Step 3, and mobile contexts.
2. Add controlled collection-title mappings beyond Cyberpunk 2077 as required.
3. Add remaining garment size charts as exact source data is supplied.
4. Confirm native product slugs where normalized names differ.
5. Obtain unobscured missing men's chart rows.
6. Separate size and style into independent front-end controls while resolving the correct Fourthwall variant for cart submission.
7. Fold the title-bar hotfix into the base component.
8. Stabilize or merge `kw-info-accordion-dev`.
9. Audit/archive obsolete carousel experiments.
10. Resolve the missing gallery portfolio runtime.

## REMOVALS / DECISIONS AGAINST

### No separate visual systems for standard and Step 3 expanded modals

Reason: product windows should share panel color, gallery footprint, typography, navigation, mobile spacing, and color assignment. Functional product-loading and cart logic remain separate.

### No collection text embedded in recognized primary product titles

Reason: `Cyberpunk 2077` is metadata/navigation context rather than the core product name. It now occupies a linked red subtitle.

### No boxed Step 3 gallery arrows

Reason: both modal systems use the cleaner transparent Spellweave arrow treatment.

### No intrinsic-height mobile gallery expansion

Reason: uncontrolled media height created excessive blank space between standard product imagery, dots, and product information.

### No full-width standard product description row

Reason: descriptions belong in the right-side information column.

### No selected-option-driven dropdown width

Reason: width must remain stable based on the product's longest option.

### No shared quantity-row DOM ownership for `kwfw` and `kwpj`

Reason: the two systems require different Size Guide wrapper geometry.

### No global material-only chart routing

Reason: generic material values must also match the product context.

### No broad generic jacket/vest chart matching or fabricated rows

Reason: customer-facing sizing must use exact source data.

### No `@main` production footer

Reason: production must remain pinned and cache-versioned.

### No permanent title-bar hotfix architecture

Reason: the compatibility layer must eventually be folded into the owning component.
