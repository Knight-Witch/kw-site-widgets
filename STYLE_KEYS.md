# Style Keys

This document records reusable visual rules, assets, CDN roots, fonts, breakpoints, media-hosting conventions, and layout patterns for Knight Witch site widgets.

Read `/OPERATING_CONTRACT.md` and `/ARCHITECTURE.md` before changing shared styles.

## CDN and external roots

Primary Knight Witch media CDN:

```text
https://knightwitch.nyc3.cdn.digitaloceanspaces.com
```

GitHub/jsDelivr runtime root:

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets
```

Fourthwall Storefront API root used by product/cart systems:

```text
https://storefront-api.fourthwall.com/v1
```

Font Awesome CDN used by social icons:

```text
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css
```

Google Fonts Open Sans is used in the legacy `widgets/` carousel:

```text
https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap
```

## Media-hosting convention

- Product images may remain in Fourthwall when they are native product images.
- Product support media, brand media, background videos, feature cards, banners, and standalone videos should use DigitalOcean Spaces/CDN where practical.
- Long-term direction is to move away from Fourthwall for media hosting except where Fourthwall native product data requires it.
- CDN asset paths used by code must be documented here or in the relevant module README.
- Assets added directly to this repo belong in `/ASSETS/`.

## Fonts

Primary brand display font:

```css
font-family: "AgencyFB", Arial, sans-serif;
```

Current AgencyFB assets:

```text
/FONTS/AgencyFB-CY.woff2
/FONTS/AgencyFB-CY.woff
```

Older/alternate AgencyFB files appear in product-widget CSS:

```text
/FONTS/agencyfb-webfont.woff2
/FONTS/agencyfb-webfont.woff
```

Legacy `widgets/` carousel uses Open Sans for older product-card UI.

Do not add new font files unless needed. If new font assets are added directly to the repo, place them in `/ASSETS/` and document them here.

## Core colors

Common colors found across current styles:

```css
#fff                  primary white text
#000                  black overlays/backgrounds
#f00 / #ff0000        Knight Witch red borders and emphasis
#ff1717               vivid red product-rule swatch
#ff7a00               orange accent/glow
#ff9800               gold/orange swatch
#ff6b13               orange swatch
#d8b6ff               holographic crystal swatch
#76fff3               holographic swatch
#1598f5               sky/blue swatch
#009b12               green swatch
#7b16ff               purple swatch
#ffd18a               brass swatch
#aaa                  muted support text / silver swatch
#bbb                  muted subtitle text
#111 / #050505        near-black panels
#8a0000               dark red accent
```

Common overlay patterns:

```css
rgba(0, 0, 0, 0.72)
rgba(0, 0, 0, 0.7)
rgba(0, 0, 0, 0.3)
rgba(0,0,0,.55)
rgba(0,0,0,.68)
rgba(0,0,0,.9)
rgba(255,255,255,.12)
rgba(255,255,255,.28)
```

Use the red/black/white visual system unless a module has a documented reason to diverge.

## Breakpoints

Primary mobile breakpoint used across global and module code:

```css
@media (max-width: 768px)
```

Carousel desktop/mobile split:

```css
@media (min-width: 761px)
@media (max-width: 760px)
```

When changing responsive behavior, do not change desktop behavior for a mobile-only request or mobile behavior for a desktop-only request unless necessary and stated first.

## Global foundation

Owned by:

```text
fourthwall/global/kw-global-foundation.css
fourthwall/global/kw-fourthwall-layout-guard.css
```

Rules:

- Global foundation should not bury module-specific visuals.
- Layout guard owns Fourthwall page/footer correction.
- Background transparency must allow the global video background to show through.
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

Behavior notes:

- Runtime respects reduced motion and save-data conditions.
- Runtime chooses codec by browser support.
- Mobile viewport uses mobile variants.
- Desktop upgrade is enabled in config.

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
- Decode/reveal subtitle effect.
- Mobile drilldown panels.
- Decor drawer must support long lists without running off-screen.

Current nav label set is documented in `/ARCHITECTURE.md`.

## Social icons

Owned by:

```text
fourthwall/global/kw-social-icons.css
fourthwall/global/kw-social-icons.js
fourthwall/global/kw-global-config.js
```

Current social links in config:

```text
Instagram  https://instagram.com/knightwitchapparel
TikTok     https://tiktok.com/@knightwitchapparel
YouTube    https://youtube.com/@knightwitchapparel
Discord    https://discord.com/users/579968778360848395
Facebook   https://facebook.com/knightwitchapparel
```

## Title bars

Owned by:

```text
/components/kw-title-bars/
```

Base title-bar class:

```html
<div class="kw-title-bar" data-kw-fit=".featured-prebuilds-nav .featured-prebuilds-btn">
  <div class="kw-title-bar__title">FEATURED SPELLWEAVES</div>
  <div class="kw-title-bar__subtitle">Ready-to-buy in just one click.</div>
</div>
```

Base conventions:

- Transparent background.
- Red `1px` border.
- AgencyFB uppercase title text.
- White title text.
- Muted gray subtitle.
- Desktop title letter spacing: `.6em`.
- Base max width: `95vw`.
- Base title bar uses negative outside margins to tighten layout around product sections.
- `data-kw-fit` should target repeated child buttons/tiles, not just the parent wrapper.

Current title-bar variants:

```text
.kw-title-bar
.kw-title-bar--step
.kw-title-bar--compact
```

Temporary hotfix conventions:

- `components/kw-title-bars/kw-title-bars-hotfix.css` currently forces visibility and restores mobile width.
- Mobile hotfix width: `calc(100vw - 32px)`.
- Mobile hotfix title letter spacing: `.18em`.
- Hotfix is temporary and must be folded into the base component/global loader.

## Product carousel

Current global carousel files include:

```text
fourthwall/kwfw-carousel.css
fourthwall/kwfw-carousel.js
fourthwall/kwfw-carousel-desktop-grid.css
fourthwall/kwfw-carousel-wheel-bridge.js
fourthwall/kwfw-font-agencyfb.css
```

Desktop grid footprint:

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

Mobile carousel spacing override:

```css
@media (max-width: 760px) {
  html body .kwfw-root {
    margin-top: -35px !important;
    margin-bottom: -20px !important;
  }
}
```

Carousel UI classes include:

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

Carousel scroll behavior is split across base carousel CSS, desktop grid overrides, and the wheel bridge. Do not assume `kwfw-carousel-wheel-bridge.js` is only a wheel listener.

## Product modal / universal media

Owned by:

```text
fourthwall/kwfw-carousel.css
fourthwall/kwfw-carousel.js
fourthwall/kwfw-universal-media.css
fourthwall/kwfw-universal-media.js
fourthwall/prod_card_media/manifest.json
```

Universal media adds product-support media into modal galleries from config, DOM attributes, or manifest.

Current manifest asset:

```text
/GLOBAL/PROD_CARD_MEDIA/feature_card.webp
```

The modal should support images and video slides. Extra product support media should be CDN-hosted where possible.

## Product size guide

Owned by:

```text
fourthwall/kwfw-size-guide.css
fourthwall/kwfw-size-guide.js
```

Current modal/classes:

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

Swatch colors are inferred from option text. Existing swatch names include holographic, holographic crystal, red, gold, silver, brass, green, purple, sky/blue, orange, and black.

## Empty-cart modal

Owned by:

```text
fourthwall/global/kw-cart-runtime.css
fourthwall/global/kw-cart-runtime.js
```

Classes:

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

Collection banner video:

```text
/BANNERS/Collection.webm
```

Category button links:

```text
Edgerunners    /pages/edgerunners
Starchild      /pages/starchild
Basscraft      /pages/basscraft
Black Mass     /pages/black-mass
Astral Plane   /pages/astral-plane
Wicked Hearts  /pages/wicked-hearts
```

Visual behavior:

- Desktop category buttons sit over the banner video at `top: 70%`.
- Desktop buttons use `2px` red borders and black overlays.
- Mobile category buttons render as a separate stack.
- Mobile button width: `80%`, max `390px`.
- Buttons use nav-style glitch conventions.
- Legacy Fourthwall hard-coded blocks hidden by this module include `.desktop-banner-container`, `.banner-buttons-mobile`, and `.standalone-video-section`.

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

Current module spacing:

```css
.kw-collection-feature-module {
  width: min(92vw, 1280px);
  margin: 16px auto 28px;
}
```

Mobile:

```css
.kw-collection-feature-module {
  width: 94vw;
  margin: 4px auto 24px;
}
```

Controls:

```text
.kw-collection-feature-mute
.kw-collection-feature-restart
```

## Gallery portfolio

Owned by:

```text
gallery-portfolio/
```

Primary classes:

```text
.kw-gallery-portfolio
.kwgp-shell
.kwgp-header
.kwgp-nav
.kwgp-stage
.kwgp-video-card
.kwgp-image-grid
.kwgp-image-card
.kwgp-lightbox
```

Visual system:

- AgencyFB display font.
- Black/red/white palette.
- Card-based gallery layout.
- Video preview, featured image, detail image, and lightbox areas.

Current risk: `index.html` references `gallery-portfolio.js`, which is not present in the audited `main` snapshot.

## Logo banner

Owned by:

```text
logo-banner/logo-banner.js
```

Media asset:

```text
/BANNERS/Knight%20Witch%20Redux%202.webm
```

Injected classes:

```text
.kw-logo-banner-wrapper
.kw-logo-banner
.kw-logo-banner-video-container
.kw-logo-banner-video
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

This is an older jQuery-based product carousel using Open Sans, local product cards, flip-card behavior, drag scroll, variant selects, and add-to-cart behavior.

Treat as legacy unless explicitly reactivated.

## Style change rule

If a change alters fonts, colors, layout footprint, breakpoints, reusable UI behavior, visual assets, CDN paths, title-bar conventions, carousel sizing, button styles, or background behavior, update this file in the same work session.
