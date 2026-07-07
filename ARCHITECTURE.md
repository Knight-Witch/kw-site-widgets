# Architecture

This document is the structural blueprint for the Knight Witch site/widgets repo. It maps ownership, loader behavior, dependency order, production snippet policy, and known risks.

Read `/OPERATING_CONTRACT.md` before using this file for edits.

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
├─ gallery-portfolio/                 Standalone/legacy gallery portfolio files.
├─ logo-banner/                       Standalone logo banner script.
└─ widgets/                           Older standalone carousel widget.
```

## Global runtime ownership

`fourthwall/global/` owns cross-page Fourthwall runtime. Edit here only when the change is intentionally global.

Current global files:

- `kw-fourthwall-loader.js` — primary Fourthwall footer/bootstrap loader and dependency order owner.
- `kw-global-config.js` — shared config for CDN roots, fonts, background video assets, and social links.
- `kw-global-fonts.css` — shared `AgencyFB` font-face.
- `kw-global-foundation.css` — global page/body foundation styling.
- `kw-fourthwall-layout-guard.css` — Fourthwall page/footer layout correction.
- `kw-background-video.css` and `kw-background-video.js` — global red-particle background video runtime.
- `kw-header.css` and `kw-header.js` — production global header/nav.
- `kw-header-lab.css` and `kw-header-lab.js` — lab/header development variants; do not treat as production without verification.
- `kw-header-about-menu-patch.js` — header compatibility patch.
- `kw-social-icons.css` and `kw-social-icons.js` — social icon injection/runtime.
- `kw-cart-runtime.css` and `kw-cart-runtime.js` — cart/empty-cart runtime behavior.
- `kw-info-spacing-runtime.js` — spacing helper for info sections.
- `kw-fourthwall-loader-carousel-v4.js`, `kw-fourthwall-loader-carousel-v5.js`, `kw-fourthwall-loader-carousel-v7.js`, and `kw-fourthwall-loader-stable-carousel.js` — legacy/compatibility loaders. Do not use as the production entrypoint unless explicitly revalidated and documented.

## Current global loader dependency order

`fourthwall/global/kw-fourthwall-loader.js` derives `selfRef` from the pinned loader URL, sets `window.KWFW_SETTINGS`, and loads CSS first, then JS.

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

## Important loader risk

The current global loader loads title-bar CSS/JS from floating `main` while most other live assets are pinned or loaded from `selfRef`. This caused inconsistent title-bar behavior when the footer used a pinned global-loader URL but title-bar files continued to float.

Current mitigation: the Fourthwall footer includes `components/kw-title-bars/kw-title-bars-hotfix-loader.js` after the global loader.

This is temporary. Fold the title-bar hotfix into the proper title-bar/global-loader architecture before removing the hotfix footer snippet.

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

- `kw-collection-domain-loader.js`
- `kw-collection-domain.css`
- `kw-collection-domain.js`

The module renders the hero video banner and category buttons. It no longer owns the lower feature video.

### `fourthwall/domains/collection/feature-video/`

Owns the standalone Collection feature video block:

- `kw-collection-feature-video-loader.js`
- `kw-collection-feature-video.css`
- `kw-collection-feature-video.js`

This module renders the `ENTER-TCD-V2.webm` feature video and mute/restart controls.

### `fourthwall/kwfw-*`

Current and legacy product widget systems live here. Important active files include:

- `kwfw-carousel.css`
- `kwfw-carousel.js`
- `kwfw-carousel-desktop-grid.css`
- `kwfw-carousel-wheel-bridge.js`
- `kwfw-font-agencyfb.css`
- `kwfw-size-guide.css`
- `kwfw-size-guide.js`
- `kwfw-universal-media.css`
- `kwfw-universal-media.js`
- `kwfw-product-rules.css`
- `kwfw-product-rules.js`

Known legacy or experimental variants include:

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

- `gallery-portfolio/` — standalone gallery page files.
- `logo-banner/` — standalone logo banner runtime.
- `widgets/` — older standalone carousel widget.

These are not documented as active global-loader dependencies. Treat them as standalone/legacy until proven otherwise.

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
- Header/nav visuals: `fourthwall/global/kw-header.css`
- Header/nav behavior: `fourthwall/global/kw-header.js`
- Title-bar visuals: `components/kw-title-bars/kw-title-bars.css`
- Title-bar fit behavior: `components/kw-title-bars/kw-title-bars.js`
- Temporary title-bar visibility/mobile fix: `components/kw-title-bars/kw-title-bars-hotfix.css`
- Product carousel visual footprint: `fourthwall/kwfw-carousel.css` and `fourthwall/kwfw-carousel-desktop-grid.css`
- Product carousel wheel/scroll behavior: `fourthwall/kwfw-carousel-wheel-bridge.js`
- Collection banner/category page: `fourthwall/domains/collection/`
- Collection feature video: `fourthwall/domains/collection/feature-video/`

## Known cleanup targets

- Fold title-bar hotfix into the base title-bar/global-loader architecture.
- Stop floating title-bar dependencies from `main` in the production global loader.
- Reconcile stale production notes in `fourthwall/global/README.md` with `/MASTER.md`.
- Review legacy carousel loaders and variants, then document keep/remove decisions.
- Add module README files for Collection domain and Collection feature video modules.
