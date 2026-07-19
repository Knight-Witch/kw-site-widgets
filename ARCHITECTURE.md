# Architecture

This file is the structural blueprint for the Knight Witch site/widgets repository. Read `/OPERATING_CONTRACT.md` before editing runtime code.

## Source-of-truth boundary

GitHub owns shared code and repository documentation. Fourthwall owns snippet placement, native product and variant data, native product media, checkout, and custom page sections not represented here.

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
│  └─ kwfw-* / kw-product-*      product widgets and shared presentation systems
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

The global loader derives `selfRef` from its pinned jsDelivr URL, sets `window.KWFW_SETTINGS`, loads CSS first, and loads JavaScript sequentially. When a same-key resource points to a different URL, the loader removes the stale resource before loading the new one.

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
13. `fourthwall/kwfw-universal-media.css` from `selfRef`
14. `fourthwall/kwfw-product-rules.css` from its pinned commit
15. `fourthwall/kwfw-modal-product-fix.css` from `selfRef`
16. `fourthwall/kw-product-modal-presentation.css` from `selfRef`
17. `fourthwall/global/kw-cart-runtime.css` from `selfRef`

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
13. `fourthwall/kwfw-universal-media.js` from `selfRef`
14. `fourthwall/kwfw-product-rules.js` from its pinned commit
15. `fourthwall/kwfw-modal-product-fix.js` from `selfRef`
16. `fourthwall/kw-product-modal-presentation.js` from `selfRef`
17. `fourthwall/global/kw-cart-runtime.js` from `selfRef`

`kwfw-size-guide-data.js` must load before `kwfw-size-guide.js`. The presentation module loads after modal compatibility so it can format final card/modal DOM without owning variant, price, cart, or selected-gallery logic.

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

The base runtime owns product loading, card construction, the standard product modal, option selection, cart actions, and gallery controls. Desktop grid and wheel behavior are shared across base CSS, the desktop override, and the wheel bridge. Do not treat the wheel bridge as an isolated listener.

The base runtime renders product descriptions inside `.kwfw-panel-info`. Universal media must preserve that ownership and must not clone the description below the two-column modal grid.

### Step 3 `kwpj` base-jacket carousel

The authoritative implementation remains on branch `kw-product-carousel-refactor` under:

```text
components/kw-plain-jackets/
```

It uses separate `.kwpj-*` selectors and a body-level `.kwpj-modal`. Global compatibility and presentation modules may support both namespaces, but Step 3 product loading, filtering, modal construction, and cart logic remain branch-owned until merged.

### Shared modal compatibility

Owned by:

```text
fourthwall/kwfw-modal-product-fix.css
fourthwall/kwfw-modal-product-fix.js
```

Responsibilities:

- Resolve actual Fourthwall `variant.unitPrice` values.
- Restore the expanded Add to Cart CTA.
- Switch galleries to selected-variant native media with product-wide fallback.
- Preserve the original collection-product object separately from fetched product details.
- Relabel standard `Description` controls as `Size & Style Variant` without changing the API option key.
- Measure standard select width from the longest option and clamp it to available width.
- Leave Step 3 option labels and select widths unchanged.

### Unified product presentation

Owned by:

```text
fourthwall/kw-product-modal-presentation.css
fourthwall/kw-product-modal-presentation.js
```

This module owns shared visual presentation and customer-facing title formatting for standard `kwfw` cards/modals and Step 3 `kwpj` modals. It does not own product loading, variant resolution, pricing, Add to Cart, or selected-variant media selection.

Visual responsibilities:

- Black panel, gallery, track, and information-column surfaces across both modal namespaces.
- Shared desktop panel width, column ratio, 540px gallery cap, top-aligned `contain` media, AgencyFB typography, control colors, close buttons, details buttons, dots, and transparent gallery navigation.
- Shared mobile gallery height, compact information spacing, dots/cue placement, and transparent edge-positioned arrows.
- Single-media navigation suppression.
- Standard featured-card main-title and collection-subtitle styling.

Collection-title responsibilities:

- Maintain the controlled six-collection registry.
- Index product membership by fetching each controlled Fourthwall collection once per page.
- Match products by slug and stable product identifiers, independent of the collection slug used by the visible carousel.
- Use embedded product collection metadata when Fourthwall supplies it.
- Use the holder collection only as a fallback for a dedicated single-collection carousel.
- Use recognized title prefixes/suffixes only as the final fallback.
- Never mutate the Fourthwall product object.
- Format both standard featured cards and expanded modals.
- Desktop pointer/focus swaps the red tagline to the collection name through the shared glitch transition.
- Mobile cycles between tagline and collection name every four seconds unless reduced motion is enabled.

Controlled registry:

```text
edgerunners-core / edgerunners
  Cyberpunk 2077 <-> Edgerunners Collection

basscraft-core / basscraft
  Eat. Sleep. Rave. Repeat. <-> Basscraft Collection

wicked-hearts-core / wicked-hearts
  Snakes Skulls & Sin <-> Wicked Hearts Collection

astral-plane-core / astral-plane
  All Things Fantasy <-> Astral Plane Collection

black-mass-core / black-mass
  Sci-fi & Beyond <-> Black Mass Collection

starchild-core / starchild
  Mystics Zodiacs & Vibes <-> Starchild Collection
```

Mixed homepage/featured carousels must resolve each card from product membership. They must not assign one subtitle to every card based only on the visible carousel handle.

## Global size-guide architecture

Owned by:

```text
fourthwall/kwfw-size-guide-data.js
fourthwall/kwfw-size-guide.js
fourthwall/kwfw-size-guide.css
```

`kwfw-size-guide-data.js` is the only chart-data registry. Each chart defines exact product slugs, product-title aliases, selected-variant aliases or product-scoped rules, columns, rows, and notes.

Resolution order:

1. Product-scoped selected-variant rules
2. Current selected-variant aliases
3. Exact product slug
4. Exact product-title aliases
5. Controlled phrase aliases

Injection points:

```text
.kwfw modal: inside the existing .kwfw-field, wrapping only .kwfw-qty
.kwpj modal: around the existing .kwpj-field
native /products/ pages: before the detected Add to Cart control
```

The two carousel namespaces intentionally use different quantity-row ownership. Product-scoped rules are required for generic values such as `Vegan Leather` and `Genuine Leather`. Unknown products and accessories do not receive a generic chart.

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

It appends shared support media to standard product modal galleries. Native product/variant media remains Fourthwall-hosted. Shared support media should use the Knight Witch CDN.

Universal media does not own product-description placement. It removes legacy `.kwfw-desc-wide` clones and leaves the original `.kwfw-desc` inside `.kwfw-panel-info`.

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
- Public storefront tokens may appear in live frontend snippets but are not committed to repository documentation.

## Legacy warnings

Legacy or experimental carousel loaders remain under `fourthwall/global/` and `fourthwall/kwfw-*`. Do not point production at them without revalidation.

Known dangerous state: commit `3f0582046c6c0f31aedefa5e9d4805ec9eedddf3` contained a mutation loop capable of freezing the editor/browser.

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
- Shared modal prices/CTA/variant gallery and standard options: `fourthwall/kwfw-modal-product-fix.*`
- Cross-system modal visuals, featured-card titles, collection membership, and glitch subtitles: `fourthwall/kw-product-modal-presentation.*`
- Standard modal support media and description preservation: `fourthwall/kwfw-universal-media.*`
- Size-chart data and routing: `fourthwall/kwfw-size-guide-data.js`
- Size-guide injection/modal behavior: `fourthwall/kwfw-size-guide.js`
- Size-guide visuals and namespace-specific quantity geometry: `fourthwall/kwfw-size-guide.css`
- Product option rules: `fourthwall/kwfw-product-rules.*`
- Cart guard: `fourthwall/global/kw-cart-runtime.*`
- Collection domain: `fourthwall/domains/collection/`
