# Style Keys

This file records reusable visual rules, assets, CDN roots, breakpoints, layout footprints, and shared UI conventions. Read `/OPERATING_CONTRACT.md` and `/ARCHITECTURE.md` before changing shared styles.

## CDN roots

```text
Knight Witch media
https://knightwitch.nyc3.cdn.digitaloceanspaces.com

GitHub/jsDelivr
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets

Fourthwall Storefront API
https://storefront-api.fourthwall.com/v1
```

Native product and variant media may remain Fourthwall-hosted. Other site media should use the Knight Witch CDN unless documented otherwise. Repo-local assets belong in `/ASSETS/`.

## Fonts

Primary display stack:

```css
font-family: "AgencyFB", "Agency FB", AgencyFB, Arial, sans-serif;
```

Current font assets live under `/FONTS/`. Product descriptions, forms, and size-chart tables use Arial/Helvetica for readability.

## Core palette

```css
#fff       primary white text
#000       black backgrounds
#050505    modal panel black
#111       controls and secondary surfaces
#f00       Knight Witch red
#8a0000    dark red borders
#ff4b4b    product price red
#ff7a00    orange CTA / active control
#ffb04a    bright orange CTA border
#140a00    dark CTA text
#aaa       muted text
```

## Breakpoints

```css
@media (max-width: 768px)  shared mobile breakpoint
@media (max-width: 760px)  carousel mobile split
@media (min-width: 761px)  carousel desktop split
```

## Global foundation and background

Owned by:

```text
fourthwall/global/kw-global-foundation.css
fourthwall/global/kw-fourthwall-layout-guard.css
fourthwall/global/kw-global-config.js
fourthwall/global/kw-background-video.css
fourthwall/global/kw-background-video.js
```

The global page background uses transparent page/module wrappers where the video should remain visible. Intentional panels use black or near-black surfaces.

## Header and navigation

Owned by:

```text
fourthwall/global/kw-header.css
fourthwall/global/kw-header.js
```

Conventions: black/white glitch behavior, red drawer titles, fade/slide transitions, mobile drilldown, and internally scrolling desktop drawers.

## Title bars

Owned by `components/kw-title-bars/`.

```text
.kw-title-bar
.kw-title-bar--step
.kw-title-bar--compact
```

Transparent background, red 1px border, AgencyFB uppercase title, white title text, muted subtitle, and responsive fitting. The separate title-bar hotfix remains temporary.

## Product carousel

Owned by:

```text
fourthwall/kwfw-carousel.css
fourthwall/kwfw-carousel.js
fourthwall/kwfw-carousel-desktop-grid.css
fourthwall/kwfw-carousel-wheel-bridge.js
fourthwall/kwfw-font-agencyfb.css
```

Desktop footprint:

```text
rail width: min(984px, calc(100vw - 32px))
card width: 320px
card height: 426px
gap: 12px
```

Carousel scroll behavior is shared across base CSS, desktop overrides, and the wheel bridge. Do not change one layer in isolation.

## Product modal

Shared compatibility owner:

```text
fourthwall/kwfw-modal-product-fix.css
fourthwall/kwfw-modal-product-fix.js
```

Supported namespaces:

```text
.kwfw-modal / .kwfw-panel
.kwpj-modal / .kwpj-panel
```

Primary Add to Cart CTA:

```css
background: #ff7a00;
color: #140a00;
border-color: #ffb04a;
```

The expanded Add to Cart button uses an orange glow/pulse. View Details remains dark. Prices use `#ff4b4b` and must come from real Fourthwall variant data. Selected variants switch to their assigned `variant.images` media with product-wide fallback.

## Global size guide

Owned by:

```text
fourthwall/kwfw-size-guide-data.js
fourthwall/kwfw-size-guide.js
fourthwall/kwfw-size-guide.css
```

Primary classes:

```text
.kw-size-guide-btn
.kw-size-guide-native-btn
.kw-size-qty-size-row
.kw-size-qty-size-row--kwfw
.kw-size-qty-size-row--kwpj
.kw-size-modal
.kw-size-panel
.kw-size-top
.kw-size-units
.kw-size-unit
.kw-size-title
.kw-size-body
.kw-size-table-wrap
.kw-size-table
.kw-size-notes
.kw-size-picker
.kw-size-choice
```

Visual and layout rules:

- Size Guide buttons use AgencyFB, white uppercase text, black background, a subtle white border, and orange hover/focus state.
- Modal control height is `46px`.
- Standard `kwfw` and Step 3 `kwpj` use different quantity-row ownership.
- Featured Spellweaves keep `.kwfw-label` directly inside `.kwfw-field`; `.kwfw-qty` and Size Guide share a two-column row.
- Featured row selectors intentionally target both `.kw-size-qty-size-row` and `.kw-size-qty-size-row--kwfw` so hot-reloaded legacy rows cannot lose alignment.
- Featured quantity controls use explicit `48px 58px 48px` tracks with two `8px` gaps; Size Guide occupies a separate column with a `10px` desktop gap.
- Step 3 retains a field-level `.kw-size-qty-size-row` grid with a `170px` quantity column, separate Size Guide column, and `16px` desktop gap.
- Do not reintroduce one shared field-wrapper rule for both namespaces.
- Native product-page buttons remain full width before Add to Cart.
- Overlay: `rgba(0,0,0,.82)`.
- Panel is content-driven with `width:fit-content`, a `560px` desktop minimum where space permits, viewport-constrained maximum width, `max-height:92vh`, near-black background, and subtle red shadow.
- Size-chart titles use AgencyFB at heavy weight with `.09em` desktop letter spacing and `.075em` mobile letter spacing.
- Header controls remain sticky.
- US/Metric active state uses `#ff7a00`.
- Chart tables remain Arial/Helvetica for readability, use content-driven column widths, black cells, red headers/borders, and tighter desktop padding.
- Mobile tables remove the former forced `560px` minimum, wrap header labels, use `12.5px` text and `7px 5px` cell padding, and only scroll horizontally when the actual columns require it.
- Body scroll locks while the popup is open and focus returns on close.

Chart resolution is registry-driven. Product-scoped material rules must be used for generic values such as `Vegan Leather` and `Genuine Leather`; never route those values globally.

## Universal product media

Owned by:

```text
fourthwall/kwfw-universal-media.css
fourthwall/kwfw-universal-media.js
fourthwall/prod_card_media/manifest.json
```

Shared support media uses the Knight Witch CDN.

## Product rules

Owned by:

```text
fourthwall/kwfw-product-rules.css
fourthwall/kwfw-product-rules.js
```

Current specialized fields include Logo Colour, System Type, and Text / Logo.

## Cart modal

Owned by:

```text
fourthwall/global/kw-cart-runtime.css
fourthwall/global/kw-cart-runtime.js
```

## Collection domain

Owned by `fourthwall/domains/collection/`. The collection feature video has its own module under `fourthwall/domains/collection/feature-video/`.

## Legacy warnings

`widgets/` is a legacy jQuery carousel. `gallery-portfolio/` references a missing runtime in the audited main branch. Experimental carousel loaders must not be used in production without revalidation.

## Update rule

Update this file whenever a change alters fonts, colors, reusable UI behavior, layout footprint, breakpoints, spacing, borders, buttons, carousel sizing, modal behavior, visual assets, CDN paths, title-bar conventions, or background behavior.
