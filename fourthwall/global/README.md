# Fourthwall Global Runtime

This directory owns the global Fourthwall runtime layer for Knight Witch Apparel.

Read the root docs before editing this system:

1. `/OPERATING_CONTRACT.md`
2. `/ARCHITECTURE.md`
3. `/MASTER.md`
4. `/STYLE_KEYS.md`
5. `/MEDIA.md`
6. `/HISTORY/CHANGELOG.md`
7. `/HISTORY/PRE_FLIGHT_Check.md`

`/MASTER.md` is the current production snippet/status source. This README documents global-runtime ownership, loader behavior, and module-specific risks.

## Purpose

Fourthwall should contain a small footer/bootstrap snippet that loads `fourthwall/global/kw-fourthwall-loader.js` from a pinned GitHub/jsDelivr commit.

The global loader coordinates the site-wide runtime for:

- Layout guard.
- Global fonts and foundation styles.
- Global background video.
- Header/nav.
- Social icons.
- Title bars.
- Info sections.
- Product carousel.
- Desktop carousel grid/wheel bridge.
- Product modal pricing, CTA, and selected-variant gallery behavior.
- Size guide.
- Universal product media.
- Product rules.
- Cart runtime.

The Fourthwall footer should not include separate global component CSS/JS tags when the global loader already owns them, except for documented temporary hotfixes.

## Current production candidate

Current production state is tracked in `/MASTER.md`.

```text
Commit: 26760b14a2676316be45e76df034638ae0990379
Cache key: 20260717-variant-gallery-1
Entrypoint: fourthwall/global/kw-fourthwall-loader.js
Shop domain: knightwitchapparel.com
Currency: USD
```

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@26760b14a2676316be45e76df034638ae0990379/fourthwall/global/kw-fourthwall-loader.js?v=20260717-variant-gallery-1
```

The live storefront token is intentionally not committed into repo docs. Keep the actual token in Fourthwall/project instructions.

## Temporary production hotfix

The production footer also includes the title-bar hotfix loader after the global loader.

```text
Commit: 663b046d1dcb77b86a06ee1af427af2a5b0821dc
Cache key: 20260706-titlebar-hotfix-1
Entrypoint: components/kw-title-bars/kw-title-bars-hotfix-loader.js
```

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@663b046d1dcb77b86a06ee1af427af2a5b0821dc/components/kw-title-bars/kw-title-bars-hotfix-loader.js?v=20260706-titlebar-hotfix-1
```

Status: temporary. Do not remove it until title bars are verified live without it.

Required follow-up: fold this hotfix into the base title-bar/global-loader architecture, then remove the extra footer snippet.

## Current global files

```text
kw-fourthwall-loader.js              Global dependency loader and footer entrypoint.
kw-global-config.js                  CDN, font, background, and social config.
kw-global-fonts.css                  Global AgencyFB font-face.
kw-global-foundation.css             Global page/body foundation.
kw-fourthwall-layout-guard.css       Fourthwall page/footer layout guard.
kw-background-video.css              Global background video styling.
kw-background-video.js               Global background video runtime.
kw-header.css                        Production header/nav styling.
kw-header.js                         Production header/nav runtime.
kw-header-about-menu-patch.js        About menu compatibility patch.
kw-social-icons.css                  Social icon styling.
kw-social-icons.js                   Social icon loader/injection runtime.
kw-info-spacing-runtime.js           Info-section spacing helper.
kw-cart-runtime.css                  Empty-cart modal styling.
kw-cart-runtime.js                   Empty-cart modal/cart guard runtime.
kw-header-lab.css                    Lab header styling; not production unless verified.
kw-header-lab.js                     Lab header runtime; not production unless verified.
kw-fourthwall-loader-carousel-v4.js  Legacy/compatibility loader.
kw-fourthwall-loader-carousel-v5.js  Legacy/compatibility loader.
kw-fourthwall-loader-carousel-v7.js  Legacy/compatibility loader.
kw-fourthwall-loader-stable-carousel.js Legacy/compatibility loader.
```

The global loader also owns `fourthwall/kwfw-modal-product-fix.css` and `fourthwall/kwfw-modal-product-fix.js` through its dependency list. That shared modal runtime supports both the standard `kwfw` modal and the Step 3 branch-loaded `kwpj` jacket modal. It reads official Fourthwall variant pricing and `variant.images`, updates the gallery when selection changes, and preserves standard-modal universal support slides.

## Current loader behavior

`kw-fourthwall-loader.js`:

- Derives `repo` and `selfRef` from its own jsDelivr URL.
- Uses `data-version` as the primary cache key, with an internal fallback only when no `data-version` is present.
- Sets `window.KWFW_SETTINGS.storefrontToken`, `shopDomain`, `currency`, and `appendProductMediaManifest` from the footer dataset or existing settings.
- Defaults the product-media manifest to a pinned GitHub/jsDelivr manifest unless `data-product-media-manifest` overrides it.
- Loads CSS resources first.
- Loads JS resources sequentially.
- Removes older same-key resources when the URL differs, preventing stale CSS/JS from staying active after a version bump.

Full dependency order is documented in `/ARCHITECTURE.md`.

## Current dependency risks

1. Title-bar CSS/JS are loaded from floating `main` by the global loader. This can mismatch a pinned global loader and is the reason the temporary title-bar hotfix remains production-active.
2. Info-section CSS/JS are loaded from the `kw-info-accordion-dev` branch. Inspect that branch before editing info sections.
3. Product carousel, size guide, universal media, and product rules are pinned to separate commits. Treat those pins as intentional until a dedicated dependency audit says otherwise.
4. Legacy global loaders remain in this directory. Do not use them as production entrypoints unless revalidated and documented.
5. Selected-variant gallery behavior depends on Fourthwall's documented variant `images` payload. Products without assigned variant media intentionally fall back to product-wide media.

## Header/nav ownership

Production header/nav work belongs in:

```text
kw-header.css
kw-header.js
```

Current header/nav behavior includes injected global navigation, desktop drawers, subtitle reveal, long-menu scrolling, mobile drilldown panels, responsive panel sizing, and glitch-before-navigation behavior.

Do not edit `kw-header-lab.css` or `kw-header-lab.js` for production work unless the task explicitly targets the lab variant.

## Background video ownership

Owned by:

```text
kw-global-config.js
kw-background-video.css
kw-background-video.js
```

Media assets come from the Knight Witch DigitalOcean CDN. The runtime respects reduced motion, save-data, codec support, mobile viewport selection, and staged desktop upgrades.

## Media boundary

Native product and variant media returned by the Fourthwall product API can remain Fourthwall-hosted.

All other site media used by this repo is expected to live on the Knight Witch DigitalOcean CDN unless a documented exception exists.

## Cart runtime ownership

Owned by:

```text
kw-cart-runtime.css
kw-cart-runtime.js
```

The cart runtime guards `/cart` navigation when local cart state is empty and shows the empty-cart modal.

Cart state keys:

```text
kwfw_cart_id
kwfw_cart_count
kwfw_cart_items
```

## Layout guard ownership

`kw-fourthwall-layout-guard.css` is loaded first. It owns Fourthwall page/footer layout correction and should keep the native Fourthwall footer from appearing in the middle of short pages.

## Legacy compatibility loaders

These are not the current production footer entrypoint:

```text
kw-fourthwall-loader-carousel-v4.js
kw-fourthwall-loader-carousel-v5.js
kw-fourthwall-loader-carousel-v7.js
kw-fourthwall-loader-stable-carousel.js
```

Do not point production Fourthwall snippets at these files unless they are revalidated and the root docs are updated.

## Update protocol

1. Make changes in the owning GitHub file, not directly in the Fourthwall footer, unless the task is snippet placement.
2. If changing what loads globally, edit `kw-fourthwall-loader.js` and update `/ARCHITECTURE.md`.
3. If changing global media/CDN config, edit `kw-global-config.js` and update `/STYLE_KEYS.md` and `/MEDIA.md` if needed.
4. If changing layout behavior around the native Fourthwall page/footer, edit `kw-fourthwall-layout-guard.css`.
5. If changing header/nav behavior, edit `kw-header.js` and/or `kw-header.css`.
6. If changing product modal pricing, CTA visibility, or variant-media selection, edit `fourthwall/kwfw-modal-product-fix.css` and/or `fourthwall/kwfw-modal-product-fix.js`.
7. If changing carousel rail behavior, inspect `kwfw-carousel.css`, `kwfw-carousel-desktop-grid.css`, `kwfw-carousel-wheel-bridge.js`, and the loader entries.
8. Use pinned commits for production snippets. Do not use `@main` for live production unless explicitly testing.
9. When cache invalidation is needed, bump both jsDelivr `?v=` and relevant `data-version` values.
10. Update `/MASTER.md`, `/HISTORY/CHANGELOG.md`, `/HISTORY/PRE_FLIGHT_Check.md`, and `/HISTORY/DIFFS/` for repo updates.

Do not rely on chat history as the only architecture record. Use the root docs plus this module README.
