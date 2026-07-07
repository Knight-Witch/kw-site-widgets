# Style Keys

This document records reusable visual rules, assets, CDN roots, fonts, breakpoints, and layout conventions for Knight Witch site widgets.

Read `/OPERATING_CONTRACT.md` and `/ARCHITECTURE.md` before changing shared styles.

## CDN and external roots

Primary external asset CDN:

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

Google Fonts Open Sans is used in legacy/standalone gallery work:

```text
https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap
```

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

Older/alternate AgencyFB files appear in some widget CSS:

```text
/FONTS/agencyfb-webfont.woff2
/FONTS/agencyfb-webfont.woff
```

Do not add new font files unless needed. If new font assets are added directly to the repo, place them in `/ASSETS/` and document them here.

## Core colors

Common colors found across current styles:

```css
#fff                  primary white text
#000                  black overlays/backgrounds
#f00 / #ff0000        Knight Witch red borders and emphasis
#ff7a00               orange accent/glow
#bbb                  muted subtitle text
#aaa                  muted support text
#111 / #050505        near-black panels
#8a0000               dark red accent
```

Common overlay patterns:

```css
rgba(0, 0, 0, 0.72)
rgba(0, 0, 0, 0.7)
rgba(0,0,0,.55)
rgba(0,0,0,.68)
rgba(0,0,0,.9)
rgba(255,255,255,.12)
rgba(255,255,255,.28)
```

Use existing red/black/white conventions unless a module has a documented reason to diverge.

## Breakpoints

Primary mobile breakpoint used across global and module code:

```css
@media (max-width: 768px)
```

Carousel desktop override breakpoint:

```css
@media (min-width: 761px)
@media (max-width: 760px)
```

When changing responsive behavior, do not change desktop behavior for a mobile-only request or mobile behavior for a desktop-only request unless necessary and stated first.

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

Carousel scroll behavior is split across base carousel CSS, desktop grid overrides, and the wheel bridge. Do not assume `kwfw-carousel-wheel-bridge.js` is only a wheel listener.

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

Current verified behavior from module docs:

- Desktop main nav links use black/white glitch effect on hover.
- Desktop expanded drawer titles stay red until close.
- Desktop drawer links use the glitch effect on hover/click before navigation.
- Desktop drawer open/close uses fade/slide.
- Desktop drawer subtitles decode/reveal.
- Mobile hamburger drilldown remains intact.
- Mobile submenu subtitles decode/reveal when opened.
- Mobile submenu links glitch before navigation.

Current header labels from module docs:

```text
Shop The Full Collection
Repairs
Care Plan
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

- Desktop category buttons sit over the banner video.
- Mobile category buttons render as a separate stack.
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

## Product card media

Manifest:

```text
fourthwall/prod_card_media/manifest.json
```

Current external card asset:

```text
/GLOBAL/PROD_CARD_MEDIA/feature_card.webp
```

## Style change rule

If a change alters fonts, colors, layout footprint, breakpoints, reusable UI behavior, visual assets, CDN paths, title-bar conventions, carousel sizing, button styles, or background behavior, update this file in the same work session.
