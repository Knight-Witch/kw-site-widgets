# Architecture

This file is the structural blueprint for the Knight Witch site/widgets repository. Read `/OPERATING_CONTRACT.md` before editing runtime code.

## Source-of-truth boundary

GitHub owns the code and documentation in this repository. Fourthwall owns snippet placement, native product data, native product and variant media, checkout, and any custom page section not represented here.

Fourthwall pages should contain small loader/drop-in snippets. Shared source belongs in GitHub.

## Root structure

```text
/
├─ OPERATING_CONTRACT.md
├─ README.md
├─ ARCHITECTURE.md
├─ STYLE_KEYS.md
├─ MASTER.md
├─ MEDIA.md
├─ HISTORY/
│  ├─ CHANGELOG.md
│  ├─ PRE_FLIGHT_Check.md
│  └─ DIFFS/
├─ BACKUP_VAULT/
├─ ASSETS/
├─ components/
│  ├─ kw-title-bars/
│  └─ kw-plain-jackets/          branch-owned Step 3 jacket system
├─ fourthwall/
│  ├─ global/
│  ├─ domains/collection/
│  ├─ info-sections/
│  ├─ prod_card_media/
│  └─ kwfw-*
├─ gallery-portfolio/
├─ logo-banner/
└─ widgets/
```

## Global Fourthwall ownership

`fourthwall/global/` owns site-wide runtime and the footer entrypoint.

Primary files:

```text
fourthwall/global/kw-fourthwall-loader.js
fourthwall/global/kw-global-config.js
fourthwall/global/kw-global-fonts.css
fourthwall/global/kw-global-foundation.css
fourthwall/global/kw-fourthwall-layout-guard.css
fourthwall/global/kw-background-video.css
fourthwall/global/kw-background-video.js
fourthwall/global/kw-header.css
fourthwall/global/kw-header.js
fourthwall/global/kw-header-about-menu-patch.js
fourthwall/global/kw-social-icons.css
fourthwall/global/kw-social-icons.js
fourthwall/global/kw-info-spacing-runtime.js
fourthwall/global/kw-cart-runtime.css
fourthwall/global/kw-cart-runtime.js
```

The global loader derives `selfRef` from its pinned jsDelivr URL, sets `window.KWFW_SETTINGS`, loads CSS first, then loads JavaScript sequentially. When a same-key resource points to a different URL, the loader removes the stale resource before loading the new one.

## Current global dependency order

### CSS

1. `fourthwall/global/kw-fourthwall-layout-guard.css` from `selfRef`
2. `fourthwall/global/kw-global-fonts.css` from `selfRef`
3. `fourthwall/global/kw-global-foundation.css` from `selfRef`
4. `fourthwall/global/kw-background-video.css` from `selfRef`
5. `fourthwall/global/kw-social-icons.css` from `selfRef`
6. `fourthwall/global/kw-header.css` from `selfRef`
7. `components/kw-title-bars/kw-title-bars.css` from floating `main`
8. `fourthwall/info-sections/kw-info-sections.css` from `kw-info-accordion-dev`
9. Base `fourthwall/kwfw-carousel.css` from its pinned commit
10. `fourthwall/kwfw-font-agencyfb.css` from its pinned commit
11. `fourthwall/kwfw-carousel-desktop-grid.css` from `selfRef`
12. `fourthwall/kwfw-size-guide.css` from `selfRef`
13. `fourthwall/kwfw-universal-media.css` from its pinned commit
14. `fourthwall/kwfw-product-rules.css` from its pinned commit
15. `fourthwall/kwfw-modal-product-fix.css` from `selfRef`
16. `fourthwall/global/kw-cart-runtime.css` from `selfRef`

### JavaScript

1. `fourthwall/global/kw-global-config.js` from `selfRef`
2. `fourthwall/global/kw-background-video.js` from `selfRef`
3. `fourthwall/global/kw-header.js` from `selfRef`
4. `fourthwall/global/kw-header-about-menu-patch.js`
5. `fourthwall/global/kw-social-icons.js` from `selfRef`
6. `components/kw-title-bars/kw-title-bars.js` from floating `main`
7. `fourthwall/info-sections/kw-info-sections.js` from `kw-info-accordion-dev`
8. `fourthwall/global/kw-info-spacing-runtime.js`
9. Base `fourthwall/kwfw-carousel.js` from its pinned commit
10. `fourthwall/kwfw-carousel-wheel-bridge.js` from `selfRef`
11. `fourthwall/kwfw-size-guide-data.js` from `selfRef`
12. `fourthwall/kwfw-size-guide.js` from `selfRef`
13. `fourthwall/kwfw-universal-media.js` from its pinned commit
14. `fourthwall/kwfw-product-rules.js` from its pinned commit
15. `fourthwall/kwfw-modal-product-fix.js` from `selfRef`
16. `fourthwall/global/kw-cart-runtime.js` from `selfRef`

`kwfw-size-guide-data.js` must load before `kwfw-size-guide.js`.

## Product carousel systems

### Standard `kwfw` carousel

Owned by:

```text
fourthwall/kwfw-carousel.css
fourthwall/kwfw-carousel.js
fourthwall/kwfw-carousel-desktop-grid.css
fourthwall/kwfw-carousel-wheel-bridge.js
fourthwall/kwfw-font-agencyfb.css
```

Holder selectors:

```text
.kwfw-carousel
[data-kwfw-collection]
```

The base runtime owns product loading, card rendering, the standard product modal, option selection, cart actions, and gallery controls. Desktop grid and wheel behavior are shared across the base CSS, desktop override, and wheel bridge. Do not treat the wheel bridge as an isolated listener.

### Step 3 `kwpj` base-jacket carousel

Authoritative implementation is on branch `kw-product-carousel-refactor` under:

```text
components/kw-plain-jackets/
```

It uses separate `.kwpj-*` selectors and a body-level `.kwpj-modal`. Global compatibility modules may intentionally support both `.kwfw-*` and `.kwpj-*`, but the underlying Step 3 module remains branch-owned until merged.

### Shared modal compatibility

Owned by:

```text
fourthwall/kwfw-modal-product-fix.css
fourthwall/kwfw-modal-product-fix.js
```

This shared layer supports both modal namespaces. It resolves real Fourthwall `variant.unitPrice` values, restores modal Add to Cart styling, and switches galleries to the selected variant's native `variant.images` media. It keeps the original collection-product object separate from product-detail data so dropdown selection remains stable.

## Global size-guide architecture

Owned by:

```text
fourthwall/kwfw-size-guide-data.js
fourthwall/kwfw-size-guide.js
fourthwall/kwfw-size-guide.css
```

`kwfw-size-guide-data.js` is the only chart-data registry. Each chart defines exact product slugs, product-title aliases, selected-variant aliases, measurement columns, rows, and notes.

`kwfw-size-guide.js` resolves charts in this order:

1. Current selected-variant aliases
2. Exact product slug
3. Exact product-title aliases
4. Controlled phrase aliases

The runtime injects a Size Guide button into:

```text
.kwfw-panel before [data-kwfw-add]
.kwpj-panel before [data-kwpj-add]
native /products/ pages before the detected Add to Cart control
```

A button is only shown when a registered chart resolves. Unknown products, Cauldron Cores, wall art, collars, and other accessories do not receive a generic size chart.

Optional explicit markup:

```html
<button type="button" data-kw-size-guide="mens-hooded-vest">Size Guide</button>
```

## Universal product media

Owned by:

```text
fourthwall/kwfw-universal-media.css
fourthwall/kwfw-universal-media.js
fourthwall/prod_card_media/manifest.json
```

It appends shared support media to standard product modal galleries. Native product/variant media remains Fourthwall-hosted; shared support media should use the Knight Witch CDN.

## Product rules

Owned by:

```text
fourthwall/kwfw-product-rules.css
fourthwall/kwfw-product-rules.js
```

Current specialization: Cyberpunk collar options. It may set the active variant through `data-kwfw-rule-variant-id`, which shared modal code must honor.

## Header, title bars, and info sections

Header/nav production work belongs in `fourthwall/global/kw-header.css` and `kw-header.js`.

Reusable title bars belong in `components/kw-title-bars/`. The separate title-bar hotfix loader remains temporary.

Info sections are currently branch-loaded from `kw-info-accordion-dev`. Inspect that branch before editing.

## Fourthwall and jsDelivr policy

- Production snippets must use pinned commit SHAs.
- Do not use `@main` for live production unless explicitly testing.
- When cache invalidation is needed, bump both the jsDelivr `?v=` value and matching `data-version`.
- Fourthwall should contain small loaders/drop-ins, not duplicated runtime code.
- Current production snippets belong in `/MASTER.md`.
- Public storefront tokens may appear in live frontend snippets but are not committed to repo documentation.

## Legacy warnings

Legacy or experimental carousel loaders remain under `fourthwall/global/` and `fourthwall/kwfw-*`. Do not point production at them without revalidation.

Known dangerous state: commit `3f0582046c6c0f31aedefa5e9d4805ec9eedddf3` contained a mutation loop that could freeze the editor/browser.

`widgets/` is an older jQuery carousel and is not production-active.

`gallery-portfolio/index.html` references a missing `gallery-portfolio.js` in the audited main branch.

## Common edit ownership

- Global footer/dependency order: `fourthwall/global/kw-fourthwall-loader.js`
- Global page/footer layout: `fourthwall/global/kw-fourthwall-layout-guard.css`
- Header/nav: `fourthwall/global/kw-header.css`, `kw-header.js`
- Background media: `fourthwall/global/kw-global-config.js`, `kw-background-video.*`
- Title bars: `components/kw-title-bars/`
- Standard carousel base UI/runtime: `fourthwall/kwfw-carousel.css`, `kwfw-carousel.js`
- Carousel desktop footprint: `fourthwall/kwfw-carousel-desktop-grid.css`
- Carousel wheel/page-scroll behavior: `fourthwall/kwfw-carousel-wheel-bridge.js`
- Shared product modal prices/CTA/variant gallery: `fourthwall/kwfw-modal-product-fix.*`
- Size-chart data: `fourthwall/kwfw-size-guide-data.js`
- Size-guide injection/modal behavior: `fourthwall/kwfw-size-guide.js`
- Size-guide visuals: `fourthwall/kwfw-size-guide.css`
- Universal product-support media: `fourthwall/kwfw-universal-media.*`
- Product option rules: `fourthwall/kwfw-product-rules.*`
- Cart guard: `fourthwall/global/kw-cart-runtime.*`
- Collection domain: `fourthwall/domains/collection/`

## Documentation rule

Update this file whenever folder ownership, loader order, dependency flow, global behavior, module boundaries, production entrypoints, or future edit locations change.
