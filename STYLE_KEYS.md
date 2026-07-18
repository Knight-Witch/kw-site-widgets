# Style Keys

This file records reusable visual rules, assets, CDN roots, breakpoints, layout footprints, and shared UI conventions. Read `/OPERATING_CONTRACT.md` and `/ARCHITECTURE.md` before changing shared styles.

## CDN and external roots

```text
Knight Witch media CDN
https://knightwitch.nyc3.cdn.digitaloceanspaces.com

GitHub/jsDelivr runtime
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets

Fourthwall Storefront API
https://storefront-api.fourthwall.com/v1

Font Awesome
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css
```

Native product and variant media may remain Fourthwall-hosted. Non-native site media referenced by GitHub code belongs on the Knight Witch CDN unless documented otherwise. Repo-local assets belong in `/ASSETS/`.

## Fonts

Primary brand display stack:

```css
font-family: "AgencyFB", "Agency FB", Arial, sans-serif;
```

Current assets:

```text
/FONTS/AgencyFB-CY.woff2
/FONTS/AgencyFB-CY.woff
/FONTS/agencyfb-webfont.woff2
/FONTS/agencyfb-webfont.woff
```

Readable utility content, product descriptions, forms, and size-chart tables use Arial/Helvetica rather than AgencyFB.

## Core palette

```css
#fff       primary white text
#000       black backgrounds and overlays
#050505    modal/panel black
#111       controls and secondary surfaces
#f00       Knight Witch red
#8a0000    dark red borders
#ff4b4b    product price red
#ff7a00    primary orange CTA and active unit control
#ffb04a    bright orange CTA border
#140a00    dark text on orange CTA
#aaa       muted support text
```

Default visual language: black backgrounds, white typography, red framing/emphasis, and orange primary actions.

## Breakpoints

```css
@media (max-width: 768px)  shared mobile breakpoint
@media (max-width: 760px)  product carousel/mobile split
@media (min-width: 761px)  product carousel/desktop split
```

Do not alter desktop behavior for a mobile-only task or mobile behavior for a desktop-only task unless the dependency requires it and the risk is stated first.

## Global foundation

Owned by:

```text
fourthwall/global/kw-global-foundation.css
fourthwall/global/kw-fourthwall-layout-guard.css
```

Page and module wrappers remain transparent where the global video background should show through. Intentional panels and overlays may use near-black surfaces.

## Global background video

Owned by:

```text
fourthwall/global/kw-global-config.js
fourthwall/global/kw-background-video.css
fourthwall/global/kw-background-video.js
```

Primary poster:

```text
/GLOBAL/BACKGROUND/Red_Particles_16-9-poster.webp
```

Desktop and mobile AV1/VP9/MP4 variants live under `/GLOBAL/BACKGROUND/`. The runtime respects reduced motion, save-data, codec support, viewport class, and staged desktop quality upgrades.

## Header and navigation

Owned by:

```text
fourthwall/global/kw-header.css
fourthwall/global/kw-header.js
```

Conventions:

- Black/white glitch behavior on desktop interaction.
- Red drawer titles.
- Fade/slide drawer transitions.
- Mobile drilldown panels.
- Long desktop drawers stay inside the viewport and scroll internally.

## Social icons

Owned by:

```text
fourthwall/global/kw-social-icons.css
fourthwall/global/kw-social-icons.js
fourthwall/global/kw-global-config.js
```

Configured channels currently include Instagram, TikTok, YouTube, Discord, and Facebook.

## Title bars

Owned by `components/kw-title-bars/`.

Base classes:

```text
.kw-title-bar
.kw-title-bar--step
.kw-title-bar--compact
```

Conventions:

- Transparent background.
- Red `1px` border.
- AgencyFB uppercase title.
- White title text and muted gray subtitle.
- Desktop title tracking may reach `.6em`.
- Base max width is `95vw`.
- Negative outside margins may tighten title-to-product spacing.
- `data-kw-fit` targets the repeated visual children, not only a parent wrapper.

The separate title-bar hotfix remains temporary.

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

```css
width: min(984px, calc(100vw - 32px));
card width: 320px;
card height: 426px;
gap: 12px;
```

Current title-to-carousel spacing:

```css
margin-top: -35px;
margin-bottom: -24px;
```

Mobile bottom spacing uses `-20px`.

Carousel scroll behavior is split across base CSS, desktop grid overrides, and the wheel bridge. Do not remove one layer in isolation.

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

The expanded Add to Cart action uses an orange glow/pulse. View Details remains dark and secondary. Modal prices use `#ff4b4b` and must come from real Fourthwall variant data.

Selected variants switch the gallery to the corresponding Fourthwall `variant.images` media. Product-wide media is the fallback when a variant has no dedicated images. Standard `kwfw` modals preserve universal support slides.

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

Visual rules:

- Size Guide buttons use the carousel AgencyFB stack, white uppercase text, a black background, a subtle white border, and an orange hover/focus state.
- Standard and Step 3 modal buttons sit beside the existing quantity controls inside `.kw-size-qty-size-row`.
- The modal button height is `46px`, matching the quantity controls.
- The modal row uses `display:flex`, `align-items:flex-end`, a `10px` desktop gap, and an `8px` mobile gap.
- Native product-page buttons remain full width before Add to Cart.
- The overlay uses `rgba(0,0,0,.82)`.
- Panel width is `min(980px, 96vw)` with `max-height: 92vh`.
- Panel background is `#050505` with a subtle red shadow.
- Header controls are sticky.
- US/Metric toggle uses `#ff7a00` for the active unit.
- Chart title is red, uppercase, and uses readable Arial/Helvetica.
- Tables use regular Arial/Helvetica, black cells, red headers/borders, and horizontal overflow on narrow screens.
- Mobile modal padding is `10px`; mobile table minimum width is `560px`.
- The runtime locks body scroll while open and restores focus on close.

Chart resolution is exact and registry-driven. Do not add a broad generic jacket/vest fallback that can show the wrong manufacturer's measurements.

## Universal product media

Owned by:

```text
fourthwall/kwfw-universal-media.css
fourthwall/kwfw-universal-media.js
fourthwall/prod_card_media/manifest.json
```

Current manifest asset:

```text
/GLOBAL/PROD_CARD_MEDIA/feature_card.webp
```

Shared support media should use the Knight Witch CDN.

## Product rules

Owned by:

```text
fourthwall/kwfw-product-rules.css
fourthwall/kwfw-product-rules.js
```

Current specialized fields:

```text
Logo Colour
System Type
Text / Logo
```

Known swatch names include holographic, holographic crystal, red, gold, silver, brass, green, purple, sky/blue, orange, and black.

## Empty-cart modal

Owned by:

```text
fourthwall/global/kw-cart-runtime.css
fourthwall/global/kw-cart-runtime.js
```

Primary classes:

```text
.kw-cart-empty-modal
.kw-cart-empty-panel
.kw-cart-empty-title
.kw-cart-empty-copy
.kw-cart-empty-actions
.kw-cart-empty-btn
```

## Collection domain

Owned by `fourthwall/domains/collection/`.

Banner asset:

```text
/BANNERS/Collection.webm
```

Desktop buttons overlay the banner; mobile buttons render as a separate stack. Mobile width is `80%`, max `390px`.

## Collection feature video

Owned by `fourthwall/domains/collection/feature-video/`.

```text
/domainvideos/ENTER-TCD-V2.webm
/restart%20svg.svg
```

Desktop module width is `min(92vw, 1280px)`. Mobile width is `94vw`.

## Legacy systems

`widgets/` uses the `.fpx-` prefix, Open Sans, jQuery, flip cards, and drag scrolling. Treat it as legacy unless explicitly reactivated.

`gallery-portfolio/` uses AgencyFB and the black/red/white card system but references a missing JavaScript file in the audited main branch.

## Update rule

Update this file whenever a change alters fonts, colors, reusable UI behavior, layout footprint, breakpoints, spacing, borders, buttons, carousel sizing, modal behavior, visual assets, CDN paths, title-bar conventions, or background behavior.
