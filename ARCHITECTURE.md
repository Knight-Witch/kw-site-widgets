# Architecture

This document is the structural blueprint for the Knight Witch site/widgets repo. It maps ownership, loader behavior, dependency order, production snippet policy, website element inventory, and known risks.

Read `/OPERATING_CONTRACT.md` before using this file for edits.

## GitHub vs Fourthwall boundary

GitHub owns the code and docs in this repo. Fourthwall still owns snippet placement, native product data, native product images, and any hard-coded page sections not represented by files here.

If a visible website element is not mapped in this document, assume it may still be hard-coded directly in Fourthwall until audited. Do not guess ownership.

Media boundary:

- Product images may still come from Fourthwall native product media.
- GitHub-hosted code can reference external Knight Witch CDN media.
- Long-term direction is to move non-native/product-support media to DigitalOcean Spaces/CDN rather than Fourthwall-hosting it.
- CDN roots and media assets are documented in `/STYLE_KEYS.md`.

## Repository ownership map

```text
/
├─ OPERATING_CONTRACT.md              Full process policy.
├─ README.md                          Repo overview and required reading order.
├─ ARCHITECTURE.md                    Structural blueprint and ownership map.
├─ STYLE_KEYS.md                      Visual/style/CDN reference.
├─ MASTER.md                          Project source bible and task/risk state.
├─ HISTORY/
│  ├─ CHANGELOG.md                    Canonical repo-wide changelog.
│  ├─ PRE_FLIGHT_Check.md             Rolling pre-flight log.
│  └─ DIFFS/                          Per-update diff/change summaries.
├─ BACKUP_VAULT/                      Major-risk backups only.
├─ ASSETS/                            Assets stored directly in the repo.
├─ components/
│  └─ kw-title-bars/                  Reusable title-bar component and current hotfix.
├─ fourthwall/
│  ├─ global/                         Global Fourthwall runtime and footer loader.
│  ├─ domains/collection/             Collection domain page modules.
│  ├─ prod_card_media/                Product-card media manifest.
│  └─ kwfw-*                          Current and legacy Fourthwall widgets.
├─ gallery-portfolio/                 Standalone gallery portfolio files.
├─ logo-banner/                       Standalone logo banner script.
└─ widgets/                           Older standalone carousel widget.
```

## Website element inventory

### Site-wide/global elements hosted here

- Global loader and dependency orchestration.
- Global red-particle video background.
- Global header/nav and mobile hamburger drilldown.
- Global social icon strip injection.
- Global Fourthwall layout/footer guard.
- Global empty-cart modal/runtime.
- Product carousel runtime and styles.
- Product modal/gallery runtime.
- Universal product media injection.
- Product size guide modal.
- Product option rules for Cyberpunk collar variants.
- Shared title-bar component.
- Info-section spacing helper; core info-section CSS/JS is branch-loaded from `kw-info-accordion-dev`.

### Page/domain elements hosted here

- Collection page hero/banner video and category buttons.
- Collection page standalone feature video block.

### Standalone or legacy elements hosted here

- Gallery portfolio static page shell/styles.
- Logo banner injection script.
- Older jQuery product carousel widget.
- Older carousel scroll/viewport/runtime variants.

### Elements likely still in Fourthwall unless separately documented

- Raw placement snippets for modules.
- Native product grids/details not replaced by custom widgets.
- Native product images.
- Remaining custom HTML sections not represented by GitHub files.
- Per-page hard-coded title bar blocks.
- Any live page section not listed above.

## Global runtime ownership

`fourthwall/global/` owns cross-page Fourthwall runtime. Edit here only when the change is intentionally global.

Current global files:

- `kw-fourthwall-loader.js` — primary Fourthwall footer/bootstrap loader and dependency order owner.
- `kw-global-config.js` — shared config for CDN roots, fonts, background video assets, and social links.
- `kw-global-fonts.css` — shared `AgencyFB` font-face using DigitalOcean Spaces font files.
- `kw-global-foundation.css` — global page/body foundation styling.
- `kw-fourthwall-layout-guard.css` — Fourthwall page/footer layout correction.
- `kw-background-video.css` and `kw-background-video.js` — global red-particle background video runtime.
- `kw-header.css` and `kw-header.js` — production global header/nav.
- `kw-header-lab.css` and `kw-header-lab.js` — lab/header development variants; do not treat as production without verification.
- `kw-header-about-menu-patch.js` — header compatibility patch that injects/repairs the About submenu.
- `kw-social-icons.css` and `kw-social-icons.js` — social icon stylesheet/load/injection runtime.
- `kw-cart-runtime.css` and `kw-cart-runtime.js` — empty-cart modal/runtime behavior.
- `kw-info-spacing-runtime.js` — spacing helper for info sections.
- `kw-fourthwall-loader-carousel-v4.js`, `kw-fourthwall-loader-carousel-v5.js`, `kw-fourthwall-loader-carousel-v7.js`, and `kw-fourthwall-loader-stable-carousel.js` — legacy/compatibility loaders. Do not use as the production entrypoint unless explicitly revalidated and documented.

## Current global loader dependency order

`fourthwall/global/kw-fourthwall-loader.js` derives `selfRef` from the pinned loader URL, sets `window.KWFW_SETTINGS`, and loads CSS first, then JS. The loader removes stale same-key resources when the target URL changes.

CSS order in the current loader:

1. `fourthwall/global/kw-fourthwall-layout-guard.css` from `selfRef`
2. `fourthwall/global/kw-global-fonts.css` from `selfRef`
3. `fourthwall/global/kw-global-foundation.css` from `selfRef`
4. `fourthwall/global/kw-background-video.css` from `selfRef`
5. `fourthwall/global/kw-social-icons.css` from `selfRef`
6. `fourthwall/global/kw-header.css` from `selfRef`
7. `components/kw-title-bars/kw-title-bars.css` from `main`
8. `fourthwall/info-sections/kw-info-sections.css` from `kw-info-accordion-dev`
9. `fourthwall/kwfw-carousel.css` from pinned commit `69e95f9562e165299897b793103949bfba0ab6e3`
10. `fourthwall/kwfw-font-agencyfb.css` from pinned commit `988f5aa2bb75880d43ccfc58a751b73e20d9e1aa`
11. `fourthwall/kwfw-carousel-desktop-grid.css` from `selfRef`
12. `fourthwall/kwfw-size-guide.css` from pinned commit `03e30bd4c28f5de3fc956ea39a874e6e447583d0`
13. `fourthwall/kwfw-universal-media.css` from pinned commit `579c6124748dec87d5957716eabf0563dfc9401c`
14. `fourthwall/kwfw-product-rules.css` from pinned commit `db73f85d3d4b982e46fea1e57bba48863b651889`
15. `fourthwall/global/kw-cart-runtime.css` from `selfRef`

JS order in the current loader:

1. `fourthwall/global/kw-global-config.js` from `selfRef`
2. `fourthwall/global/kw-background-video.js` from `selfRef`
3. `fourthwall/global/kw-header.js` from `selfRef`
4. `fourthwall/global/kw-header-about-menu-patch.js` from `selfRef` with fixed cache key `20260630-about-menu-cleanup-2`
5. `fourthwall/global/kw-social-icons.js` from `selfRef`
6. `components/kw-title-bars/kw-title-bars.js` from `main`
7. `fourthwall/info-sections/kw-info-sections.js` from `kw-info-accordion-dev`
8. `fourthwall/global/kw-info-spacing-runtime.js` from `selfRef` with fixed cache key `20260628-info-spacing-runtime-2`
9. `fourthwall/kwfw-carousel.js` from pinned commit `1dd6c66c60d54694a177e6f663c060c322154826`
10. `fourthwall/kwfw-carousel-wheel-bridge.js` from `selfRef`
11. `fourthwall/kwfw-size-guide.js` from pinned commit `f00c8dd64c573dd0c782036cf3df3a7dca53482c`
12. `fourthwall/kwfw-universal-media.js` from pinned commit `4327ad13c67468e6b260dbc44758cd9b90574f6d`
13. `fourthwall/kwfw-product-rules.js` from pinned commit `ef9f1ec0947d4144803c46c45c331e93b09dc9d3`
14. `fourthwall/global/kw-cart-runtime.js` from `selfRef`

## Important loader risks

1. The current global loader loads title-bar CSS/JS from floating `main` while most other live assets are pinned or loaded from `selfRef`. This caused inconsistent title-bar behavior when the footer used a pinned global-loader URL but title-bar files continued to float.
2. The loader references `kw-info-accordion-dev` for info-section CSS/JS. This means production behavior depends on a branch ref unless later stabilized.
3. Product carousel, size guide, universal media, and product rules are each pinned to different commits. This may be intentional stabilization, but dependency ownership must be checked before upgrades.

Current title-bar mitigation: the Fourthwall footer includes `components/kw-title-bars/kw-title-bars-hotfix-loader.js` after the global loader. This is temporary.

## Header/nav architecture

Production owner:

```text
fourthwall/global/kw-header.css
fourthwall/global/kw-header.js
```

The header runtime injects top-level nav and drawer/mobile panel behavior. Current top-level items:

```text
Home
Gallery
Shop The Collection
Shop The Cauldron
Shop Decor
About
View Cart
```

Current `Shop The Collection` children:

```text
Shop The Full Collection  /pages/the-collection-domain
Edgerunners               /pages/edgerunners
Basscraft                 /pages/basscraft
Wicked Hearts             /pages/wicked-hearts
Astral Plane              /pages/astral-plane
Black Mass                /pages/black-mass
Starchild                 /pages/starchild
```

Current `Shop The Cauldron` children:

```text
Enter The Cauldron        /pages/the-cauldron
Spellcraft: Create        /pages/spellcraft
Dark Alchemy: Modify      /pages/dark-alchemy
```

Current `Shop Decor` children:

```text
Shop All Decor            /pages/the-decor-domain
Wicked Originals          /pages/wicked-designs
Anime                     /pages/anime
Arcane                    /pages/arcane
Baldur's Gate             /pages/baldurs-gate
Cyberpunk 2077            /pages/cyberpunk-2077
Diablo                    /pages/diablo
Dragon Age                /pages/dragon-age
Dungeons & Dragons        /pages/dungeons-dragons
EDM Artists & Music       /pages/music
Elder Scrolls             /pages/elder-scrolls
Lord of The Rings         /pages/lord-of-the-rings
Magic: The Gathering      /pages/mtg
Mass Effect               /pages/mass-effect
Starcraft                 /pages/starcraft
S.T.A.L.K.E.R. 2          /pages/stalker
Star Trek                 /pages/star-trek
Star Wars                 /pages/star-wars
Warhammer 40k             /pages/40k
Zelda                     /pages/zelda
Zodiacs                   /pages/zodiacs
```

Current `About` children:

```text
About Us                  /pages/about
User Guide                /pages/userguide
FAQ                       /pages/faq
Repairs                   /pages/maintenance
Care Plan                 /pages/warranty
News & Updates            /pages/news
```

Behavior owned by the header runtime:

- Desktop hover/click drawer open and close.
- Desktop drawer title swap.
- Desktop subtitle decode/reveal.
- Desktop drawer scrolling for long menus.
- Mobile hamburger injection.
- Mobile drilldown panels.
- Mobile panel width calculation.
- Glitch-before-navigation behavior.

Do not modify the header lab files unless the task explicitly targets the lab variant.

## Component ownership

### `components/kw-title-bars/`

Owns reusable title bars:

- `kw-title-bars.css` — base title-bar visuals.
- `kw-title-bars.js` — `data-kw-fit` width-matching runtime.
- `kw-title-bars-hotfix.css` — temporary global hotfix for title-bar visibility/mobile width.
- `kw-title-bars-hotfix-loader.js` — temporary footer loader for the hotfix stylesheet.
- `README.md` — component usage.
- `examples/fourthwall-title-bars.html` — example markup.

Use this component for page section titles such as `FEATURED SPELLWEAVES`.

Do not change page HTML to work around component defects unless explicitly required. Fix the component or its loader path.

### `fourthwall/domains/collection/`

Owns the Collection landing/banner category system:

- `README.md`
- `kw-collection-domain-loader.js`
- `kw-collection-domain.css`
- `kw-collection-domain.js`

The module renders the hero video banner and category buttons. It no longer owns the lower feature video.

### `fourthwall/domains/collection/feature-video/`

Owns the standalone Collection feature video block:

- `README.md`
- `kw-collection-feature-video-loader.js`
- `kw-collection-feature-video.css`
- `kw-collection-feature-video.js`

This module renders the `ENTER-TCD-V2.webm` feature video and mute/restart controls.

## Product/widget systems in `fourthwall/`

### Active product carousel family

- `kwfw-carousel.css` — base product carousel, card, modal, gallery, buttons, toast, and mobile/desktop styles.
- `kwfw-carousel.js` — product fetching, card rendering, modal rendering, variant selection, add-to-cart, checkout routing, carousel arrows/rail scroll, modal gallery controls, and cart count storage.
- `kwfw-carousel-desktop-grid.css` — desktop grid/scroll layout overrides and current title-to-carousel spacing.
- `kwfw-carousel-wheel-bridge.js` — desktop wheel routing and final injected scroll/grid override. Do not treat it as only a wheel listener.
- `kwfw-font-agencyfb.css` — legacy product-widget AgencyFB face and product-widget font assignments.

Expected holder selectors:

```text
[data-kwfw-collection]
.kwfw-carousel
```

Expected holder attributes:

```text
data-kwfw-collection
data-kwfw-limit
data-kwfw-title
```

Cart storage keys:

```text
kwfw_cart_id
kwfw_cart_count
kwfw_cart_items
```

### Universal media

- `kwfw-universal-media.css`
- `kwfw-universal-media.js`

Adds extra media to product modal galleries from config, DOM `data-kwfw-append-media`, or `fourthwall/prod_card_media/manifest.json`.

Manifest owner:

```text
fourthwall/prod_card_media/manifest.json
```

Current manifest media:

```text
https://knightwitch.nyc3.cdn.digitaloceanspaces.com/GLOBAL/PROD_CARD_MEDIA/feature_card.webp
```

### Size guide

- `kwfw-size-guide.css`
- `kwfw-size-guide.js`

Owns size-guide modal, unit switching, context detection, and chart rendering.

Current chart keys:

```text
sandevistan  Mantle Size Chart
ladiesMoto   Ladies Moto Size Chart
ladiesVest   Ladies Vest Size Chart
mensMoto     Men's Moto Size Chart
mensVest     Men's Vest Size Chart
```

Unit preference is stored in localStorage as:

```text
kw_size_unit
```

### Product rules

- `kwfw-product-rules.css`
- `kwfw-product-rules.js`

Currently specializes Cyberpunk collar products. It detects `cyberpunk-collar-v1` or product titles containing `Cyberpunk Collar`, hides raw option fields, and renders:

```text
Logo Colour
System Type
Text / Logo
```

Variant titles are parsed as comma-separated values:

```text
colour, system, logo
```

### Legacy carousel variants

Known legacy or experimental variants:

- `kwfw-carousel-desktop-v5.css`
- `kwfw-carousel-desktop-viewport.css`
- `kwfw-carousel-scroll-state-only.js`
- `kwfw-carousel-scroll-state.js`
- `kwfw-carousel-v6-runtime.js`
- `kwfw-carousel-v6.css`
- `kwfw-carousel-v7-runtime.js`
- `kwfw-carousel-v7.css`

Do not modify legacy variants unless the task explicitly targets them or they are confirmed production-active.

## Standalone or legacy folders

### `gallery-portfolio/`

Files:

- `README.md`
- `index.html`
- `gallery-portfolio.css`

Purpose: standalone Gallery Portfolio page shell and styles.

Important risk: `index.html` references `./gallery-portfolio.js`, but that file is not present in the audited `main` snapshot. Treat the page as incomplete until the missing JS is found, restored, or intentionally removed.

### `logo-banner/`

Files:

- `README.md`
- `logo-banner.js`

Purpose: standalone script that injects a Knight Witch logo/banner video section using `BANNERS/Knight%20Witch%20Redux%202.webm`.

### `widgets/`

Files:

- `README.md`
- `kw-carousel.css`
- `kw-carousel.js`

Purpose: older jQuery/Fourthwall Storefront product carousel using `#fpx-qs` and `data-fpx-slug` attributes.

Treat as legacy unless explicitly reactivated.

## Branch-only systems

The current loader references `kw-info-accordion-dev` for info sections. Branch-only documentation and files may exist outside `main`.

Known branch systems from prior repo state:

- `kw-info-accordion-dev` — reusable info sections accordion.
- `kw-product-carousel-refactor` — product carousel refactor branch.

Before editing branch systems, inspect the branch docs and do not assume `main` has the authoritative files.

## Fourthwall snippet policy

Fourthwall should contain small snippets only. Runtime source belongs in GitHub.

Use pinned commits for production snippets. Avoid `@main` for live production unless explicitly testing.

When cache invalidation is needed, bump both:

- jsDelivr query string, such as `?v=20260706-title-carousel-spacing-2`
- any matching `data-version` value

Document current snippets in `/MASTER.md`.

## Common edit ownership

- Global footer/runtime load order: `fourthwall/global/kw-fourthwall-loader.js`
- Fourthwall page/footer layout: `fourthwall/global/kw-fourthwall-layout-guard.css`
- Global config/CDN/social/background asset settings: `fourthwall/global/kw-global-config.js`
- Global font face: `fourthwall/global/kw-global-fonts.css`
- Global foundation/page styles: `fourthwall/global/kw-global-foundation.css`
- Background video visuals: `fourthwall/global/kw-background-video.css`
- Background video behavior: `fourthwall/global/kw-background-video.js`
- Header/nav visuals: `fourthwall/global/kw-header.css`
- Header/nav behavior: `fourthwall/global/kw-header.js`
- Social icon visuals/runtime: `fourthwall/global/kw-social-icons.css` and `fourthwall/global/kw-social-icons.js`
- Empty-cart modal/runtime: `fourthwall/global/kw-cart-runtime.css` and `fourthwall/global/kw-cart-runtime.js`
- Title-bar visuals: `components/kw-title-bars/kw-title-bars.css`
- Title-bar fit behavior: `components/kw-title-bars/kw-title-bars.js`
- Temporary title-bar visibility/mobile fix: `components/kw-title-bars/kw-title-bars-hotfix.css`
- Product carousel base UI/runtime: `fourthwall/kwfw-carousel.css` and `fourthwall/kwfw-carousel.js`
- Product carousel visual footprint: `fourthwall/kwfw-carousel-desktop-grid.css`
- Product carousel wheel/scroll behavior: `fourthwall/kwfw-carousel-wheel-bridge.js`
- Product extra media: `fourthwall/kwfw-universal-media.css`, `fourthwall/kwfw-universal-media.js`, and `fourthwall/prod_card_media/manifest.json`
- Product size guide: `fourthwall/kwfw-size-guide.css` and `fourthwall/kwfw-size-guide.js`
- Product option rules: `fourthwall/kwfw-product-rules.css` and `fourthwall/kwfw-product-rules.js`
- Collection banner/category page: `fourthwall/domains/collection/`
- Collection feature video: `fourthwall/domains/collection/feature-video/`
- Standalone gallery portfolio: `gallery-portfolio/`
- Standalone logo banner: `logo-banner/`
- Legacy FPX carousel: `widgets/`

## Known cleanup targets

- Fold title-bar hotfix into the base title-bar/global-loader architecture.
- Stop floating title-bar dependencies from `main` in the production global loader.
- Reconcile stale production notes in `fourthwall/global/README.md` with `/MASTER.md`.
- Review legacy carousel loaders and variants, then document keep/remove decisions.
- Resolve the missing `gallery-portfolio/gallery-portfolio.js` reference or document why it is intentionally absent.
- Stabilize or explicitly document the `kw-info-accordion-dev` dependency.
- Audit which remaining Fourthwall hard-coded sections still exist outside GitHub.
