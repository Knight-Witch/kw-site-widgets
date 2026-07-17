# Style Keys

This document records reusable visual rules, assets, CDN roots, fonts, breakpoints, media-hosting conventions, layout footprints, and shared UI behavior for Knight Witch site widgets.

Read `/OPERATING_CONTRACT.md` and `/ARCHITECTURE.md` before changing shared styles or reusable interaction behavior.

## CDN and external roots

Primary Knight Witch media CDN:

```text
https://knightwitch.nyc3.cdn.digitaloceanspaces.com
```

GitHub/jsDelivr runtime root:

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets
```

Fourthwall Storefront API root:

```text
https://storefront-api.fourthwall.com/v1
```

Font Awesome social-icon CDN:

```text
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css
```

Legacy `widgets/` carousel font CDN:

```text
https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap
```

## Media-hosting convention

- Native product and variant media returned by the Fourthwall Storefront API can remain Fourthwall-hosted.
- All non-native Knight Witch site media referenced by GitHub-hosted code is expected to live on the DigitalOcean Spaces/CDN root unless an explicit exception is documented.
- This includes product-support media, brand media, background videos, feature cards, banners, page videos, icons, SVGs, fonts, and logos.
- CDN asset paths must be documented here, in `/MEDIA.md`, or in the relevant module README.
- Assets committed directly to the repo belong in `/ASSETS/`.

## Fonts

Primary brand display font:

```css
font-family: "AgencyFB", "Agency FB", Arial, sans-serif;
```

Current AgencyFB assets:

```text
/FONTS/AgencyFB-CY.woff2
/FONTS/AgencyFB-CY.woff
```

Older product-widget AgencyFB assets:

```text
/FONTS/agencyfb-webfont.woff2
/FONTS/agencyfb-webfont.woff
```

Legacy `widgets/` carousel uses Open Sans.

## Core colors

```css
#fff                  primary white text
#000                  black backgrounds/overlays
#050505 / #111        near-black panels
#f00 / #ff0000        Knight Witch red borders/emphasis
#8a0000               dark red accent
#ff1717               vivid red swatch
#ff4b4b               product price red
#ff7a00               primary orange CTA/glow
#ff9800               gold/orange swatch
#ff6b13               alternate orange swatch
#b35300               dark orange CTA border
#140a00               dark CTA text
#d8b6ff               holographic crystal swatch
#76fff3               holographic swatch
#1598f5               sky/blue swatch
#009b12               green swatch
#7b16ff               purple swatch
#ffd18a               brass swatch
#aaa / #bbb           muted support text and silver swatch
```

Common overlay values:

```css
rgba(0,0,0,.55)
rgba(0,0,0,.62)
rgba(0,0,0,.68)
rgba(0,0,0,.72)
rgba(0,0,0,.78)
rgba(0,0,0,.9)
rgba(255,255,255,.12)
rgba(255,255,255,.22)
rgba(255,255,255,.28)
```

Default shared visual system: black backgrounds, white typography, red framing/emphasis, orange interactive CTA states.

## Breakpoints

Primary shared mobile breakpoint:

```css
@media (max-width: 768px)
```

Carousel desktop/mobile split:

```css
@media (min-width: 761px)
@media (max-width: 760px)
```

Do not change desktop behavior for a mobile-only request or mobile behavior for a desktop-only request unless necessary and stated before editing.

## Global foundation

Owned by:

```text
fourthwall/global/kw-global-foundation.css
fourthwall/global/kw-fourthwall-layout-guard.css
```

Rules:

- Global foundation should not bury module-specific visuals.
- Layout guard owns Fourthwall page/footer correction.
- Page backgrounds must remain transparent where the global video background should remain visible.
- Module containers should generally use transparent backgrounds unless a panel/overlay is intentional.

## Global background video

Owned by:

```text
fourthwall/global/kw-global-config.js
fourthwall/global/kw-background-video.css
fourthwall/global/kw-background-video.js
```

Poster:

```text
/GLOBAL/BACKGROUND/Red_Particles_16-9-poster.webp
```

Desktop variants:

```text
/GLOBAL/BACKGROUND/Red_Particles_16-9-720.av1.webm
/GLOBAL/BACKGROUND/Red_Particles_16-9-720.vp9.webm
/GLOBAL/BACKGROUND/Red_Particles_16-9-720.fallback.mp4
/GLOBAL/BACKGROUND/Red_Particles_16-9-1080.av1.webm
/GLOBAL/BACKGROUND/Red_Particles_16-9-1080.vp9.webm
/GLOBAL/BACKGROUND/Red_Particles_16-9-1080.fallback.mp4
/GLOBAL/BACKGROUND/Red_Particles_16-9-1440.av1.webm
/GLOBAL/BACKGROUND/Red_Particles_16-9-2160.av1.webm
```

Mobile variants:

```text
/GLOBAL/BACKGROUND/Mobile_Red_Particles-720.av1.webm
/GLOBAL/BACKGROUND/Mobile_Red_Particles-720.fallback.mp4
/GLOBAL/BACKGROUND/Mobile_Red_Particles-1080.av1.webm
/GLOBAL/BACKGROUND/Mobile_Red_Particles-1080.vp9.webm
/GLOBAL/BACKGROUND/Mobile_Red_Particles-1080.fallback.mp4
```

Behavior:

- Respect reduced motion and save-data conditions.
- Select codec by browser support.
- Use mobile variants on mobile viewports.
- Desktop staged quality upgrade is enabled in config.

## Header/nav

Owned by:

```text
fourthwall/global/kw-header.css
fourthwall/global/kw-header.js
```

Visual conventions:

- Black/white glitch effect on desktop nav hover and link activation.
- Red drawer titles while a desktop drawer is expanded.
- Fade/slide drawer opening.
- Decode/reveal subtitles.
- Mobile drilldown panels.
- Decor drawer supports long lists without extending beyond the viewport.

The current nav tree is documented in `/ARCHITECTURE.md`.

## Social icons

Owned by:

```text
fourthwall/global/kw-social-icons.css
fourthwall/global/kw-social-icons.js
fourthwall/global/kw-global-config.js
```

Current configured channels include Instagram, TikTok, YouTube, Discord, and Facebook. Link values are owned by `kw-global-config.js`.

## Title bars

Owned by:

```text
components/kw-title-bars/
```

Base classes:

```text
.kw-title-bar
.kw-title-bar--step
.kw-title-bar--compact
```

Conventions:

- Transparent background.
- Red `1px` border.
- AgencyFB uppercase typography.
- White title text.
- Muted gray subtitle.
- Desktop title letter spacing: `.6em`.
- Base max width: `95vw`.
- Negative outside margins are used to tighten title-to-product spacing.
- `data-kw-fit` should target repeated child buttons or tiles, not only a parent wrapper.

Temporary hotfix:

- `components/kw-title-bars/kw-title-bars-hotfix.css` forces visibility and restores mobile width.
- Mobile hotfix width: `calc(100vw - 32px)`.
- Mobile hotfix title letter spacing: `.18em`.
- The hotfix must be folded into the base component and removed from the footer after verification.

## Product carousel

Current global carousel files:

```text
fourthwall/kwfw-carousel.css
fourthwall/kwfw-carousel.js
fourthwall/kwfw-carousel-desktop-grid.css
fourthwall/kwfw-carousel-wheel-bridge.js
fourthwall/kwfw-font-agencyfb.css
fourthwall/kwfw-modal-product-fix.css
fourthwall/kwfw-modal-product-fix.js
```

Desktop footprint:

```css
width: min(984px, calc(100vw - 32px));
card width: 320px;
card height: 426px;
gap: 12px;
```

Current spacing override:

```css
html body .kwfw-root {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-top: -35px !important;
  margin-bottom: -24px !important;
  background: transparent !important;
}
```

Mobile spacing override:

```css
@media (max-width: 760px) {
  html body .kwfw-root {
    margin-top: -35px !important;
    margin-bottom: -20px !important;
  }
}
```

Primary standard-carousel classes:

```text
.kwfw-root
.kwfw-head
.kwfw-title
.kwfw-rail-wrap
.kwfw-rail
.kwfw-arrow
.kwfw-card
.kwfw-card-media
.kwfw-card-body
.kwfw-card-title
.kwfw-card-price
.kwfw-card-actions
.kwfw-btn
.kwfw-cart-btn
.kwfw-cart-count
.kwfw-toast
.kwfw-modal
.kwfw-panel
.kwfw-gallery
```

Carousel scroll behavior is split across base carousel CSS, desktop-grid overrides, and the wheel bridge. `kwfw-carousel-wheel-bridge.js` is not only a wheel listener; do not modify or remove it casually.

## Product modal behavior

Shared modal compatibility owner:

```text
fourthwall/kwfw-modal-product-fix.css
fourthwall/kwfw-modal-product-fix.js
```

Supported modal namespaces:

```text
.kwfw-modal / .kwfw-panel
.kwpj-modal / .kwpj-panel
```

CTA conventions:

- Expanded Add to Cart buttons use explicit orange values rather than relying on a carousel-scoped custom property.
- Background: `#ff7a00`.
- Text: `#140a00`.
- Border: `#ffb04a` or dark-orange equivalent.
- Orange glow/pulse remains visible in both modal systems.
- View Details remains visually secondary and dark.

Price behavior:

- Modal prices come from Fourthwall's actual selected variant `unitPrice` data.
- Do not insert placeholder or estimated prices.
- Price color: `#ff4b4b`.

Selected-variant gallery behavior:

- When a user changes a product variant, the existing modal gallery switches to that selected variant's Fourthwall `variant.images` array.
- The gallery resets to its first matching slide after selection changes.
- A selected variant with no dedicated images falls back to the product-wide gallery.
- The standard `kwfw` modal preserves universal support-media slides after variant-specific images.
- The Step 3 `kwpj` modal uses the same behavior through the shared runtime.
- Product and variant media remain Fourthwall-hosted native media.
- This behavior must not alter carousel rail, card grid, or wheel/page-scroll handling.

## Universal product media

Owned by:

```text
fourthwall/kwfw-universal-media.css
fourthwall/kwfw-universal-media.js
fourthwall/prod_card_media/manifest.json
```

Universal media adds product-support images or videos from config, DOM attributes, or the manifest.

Current manifest asset:

```text
/GLOBAL/PROD_CARD_MEDIA/feature_card.webp
```

Modal galleries support image and video slides. Extra product-support media is expected to be DigitalOcean CDN-hosted unless explicitly documented otherwise.

## Product size guide

Owned by:

```text
fourthwall/kwfw-size-guide.css
fourthwall/kwfw-size-guide.js
```

Primary classes:

```text
.kw-size-guide-btn
.kw-size-modal
.kw-size-panel
.kw-size-top
.kw-size-title
.kw-size-body
.kw-size-table
.kw-size-unit
.kw-size-choice
```

Current chart keys:

```text
sandevistan  Mantle Size Chart
ladiesMoto   Ladies Moto Size Chart
ladiesVest   Ladies Vest Size Chart
mensMoto     Men's Moto Size Chart
mensVest     Men's Vest Size Chart
```

Units:

```text
US
Metric
```

## Product rules / Cyberpunk collar selector

Owned by:

```text
fourthwall/kwfw-product-rules.css
fourthwall/kwfw-product-rules.js
```

Current custom fields:

```text
Logo Colour
System Type
Text / Logo
```

Swatch colors are inferred from option text. Known names include holographic, holographic crystal, red, gold, silver, brass, green, purple, sky/blue, orange, and black.

The modal compatibility runtime must honor `data-kwfw-rule-variant-id` so custom rule selection updates both price and gallery media.

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

Owned by:

```text
fourthwall/domains/collection/
```

Banner video:

```text
/BANNERS/Collection.webm
```

Category links include Edgerunners, Starchild, Basscraft, Black Mass, Astral Plane, and Wicked Hearts.

Conventions:

- Desktop category buttons sit over the banner video near `top: 70%`.
- Desktop buttons use `2px` red borders and black overlays.
- Mobile category buttons render as a separate stack.
- Mobile button width: `80%`, max `390px`.
- Buttons use nav-style glitch conventions.

## Collection feature video

Owned by:

```text
fourthwall/domains/collection/feature-video/
```

Feature video:

```text
/domainvideos/ENTER-TCD-V2.webm
```

Restart icon:

```text
/restart%20svg.svg
```

Desktop footprint:

```css
.kw-collection-feature-module {
  width: min(92vw, 1280px);
  margin: 16px auto 28px;
}
```

Mobile footprint:

```css
.kw-collection-feature-module {
  width: 94vw;
  margin: 4px auto 24px;
}
```

## Gallery portfolio

Owned by:

```text
gallery-portfolio/
```

Visual system:

- AgencyFB display font.
- Black/red/white palette.
- Card-based layout.
- Video preview, featured image, detail image, and lightbox areas.

Known risk: `gallery-portfolio/index.html` references `gallery-portfolio.js`, which is not present in the audited `main` snapshot.

## Logo banner

Owned by:

```text
logo-banner/logo-banner.js
```

Media asset:

```text
/BANNERS/Knight%20Witch%20Redux%202.webm
```

## Legacy `widgets/` carousel

Owned by:

```text
widgets/kw-carousel.css
widgets/kw-carousel.js
```

Visual prefix:

```text
.fpx-
```

This is an older jQuery-based product carousel using Open Sans, flip-card behavior, drag scroll, variant selects, and add-to-cart behavior. Treat it as legacy unless explicitly reactivated.

## Style and shared-behavior update rule

Update this file in the same work session whenever a change alters fonts, colors, reusable UI behavior, layout footprint, breakpoints, spacing, borders, buttons, carousel sizing, modal gallery behavior, visual assets, CDN paths, title-bar conventions, or background behavior.
