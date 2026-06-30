# Fourthwall Global Runtime

This directory is the source of truth for global Fourthwall code used by Knight Witch Apparel.

Fourthwall should only contain a small bootstrap snippet that loads `fourthwall/global/kw-fourthwall-loader.js` from this repository.

The global loader owns dependency order for header, title bars, info sections, carousel, font, desktop carousel grid, size guide, universal media, product rules, cart runtime, and the Fourthwall layout guard.

The Fourthwall footer should not include separate component CSS or JavaScript tags when this loader is active.

## Current production footer

Known-good pinned commit: `f9a47a4cd77fdbf9cbc1f223b051fada41058204`

Current production cache key: `20260630-nav-phase-2-title-hold-red`

Production loader URL:

`https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@f9a47a4cd77fdbf9cbc1f223b051fada41058204/fourthwall/global/kw-fourthwall-loader.js?v=20260630-nav-phase-2-title-hold-red`

Required footer attributes:

- `defer`
- `data-version="20260630-nav-phase-2-title-hold-red"`
- `data-storefront-token` must remain the active Fourthwall storefront token from the live footer.
- `data-shop-domain="knightwitchapparel.com"`
- `data-currency="USD"`

Do not switch the live Fourthwall footer back to `@main` after this fix. Use the pinned commit above as the live storefront entrypoint until the next verified deploy.

## Current header/nav state

The current verified header/nav deploy is `20260630-nav-phase-2-title-hold-red` at commit `f9a47a4cd77fdbf9cbc1f223b051fada41058204`.

Verified behavior:

- Desktop main nav links use the black/white glitch effect on hover.
- Desktop expanded drawer titles stay red until the drawer closes.
- Desktop drawer links use the same glitch effect on hover and click before navigation.
- Desktop drawer open/close uses the fade/slide transition instead of instant pop-in.
- Desktop main nav drawer buttons swap into domain titles on hover/click and swap back on close.
- Desktop drawer subtitles decode/reveal above the drawer links.
- Desktop drawer content is center-aligned.
- Mobile hamburger drilldown remains intact.
- Mobile parent menu labels glitch before submenu open.
- Mobile submenu subtitles decode/reveal when the panel opens.
- Mobile submenu links glitch before navigation.

Current header labels:

- `Shop The Full Collection`
- `Repairs`
- `Care Plan`

Keep nav/header work scoped to `kw-header.js`, `kw-header.css`, `kw-header-lab.js`, or `kw-header-lab.css` unless dependency loading changes require `kw-fourthwall-loader.js`.

## Current carousel state

The working carousel fix is `20260629-carousel-scroll-4` at commit `31a02608065694efdd766bad4e5efc35c097e25a`.

The carousel scroll problem had three separate causes:

1. `fourthwall/kwfw-carousel.css` already contained scroll behavior in the base carousel CSS. Removing the wheel bridge alone does not remove carousel scroll.
2. The loader previously skipped same-key resources even when the resource URL changed. That allowed stale pinned assets such as older desktop-grid CSS to remain active.
3. The earlier pinned test commit `3f0582046c6c0f31aedefa5e9d4805ec9eedddf3` had a mutation loop. Do not use it.

The current fixed loader replaces same-key resources when the URL differs. The current carousel wheel bridge owns the final carousel CSS override and the desktop wheel behavior.

Expected live carousel runtime checks:

- Footer loader URL includes `f9a47a4cd77fdbf9cbc1f223b051fada41058204`.
- Footer loader query includes `v=20260630-nav-phase-2-title-hold-red`.
- `data-version` is `20260630-nav-phase-2-title-hold-red`.
- `kwfw-carousel-wheel-bridge.js` loads with `20260630-nav-phase-2-title-hold-red`.
- `window.KWFWCarouselScrollController.destroy` exists.
- A style element with `data-kwfw-carousel-scroll-controller` exists.
- Desktop carousel rails compute to `display:flex`, `flex-wrap:wrap`, `justify-content:center`, `overflow-y:auto`, and `scroll-snap-type:none`.

## Carousel ownership

Do not treat `kwfw-carousel-wheel-bridge.js` as only a wheel listener. In the current fixed version, it also injects the final desktop carousel override so the base carousel CSS cannot win the cascade.

Do not reintroduce a MutationObserver that removes and recreates the same style element it observes. That caused Fourthwall/browser freezing when attempting to save the footer snippet. If the controller style needs to be maintained, update the existing style element in place.

## Layout guard

`fourthwall/global/kw-fourthwall-layout-guard.css` is loaded first by the global loader. It owns the Fourthwall page and footer layout correction. It must keep the main page region expanding above the footer so the native Fourthwall footer does not appear in the middle of short pages.

Current layout-guard cache key history: `20260629-layout-guard-1`.

## Legacy compatibility loaders

`fourthwall/global/kw-fourthwall-loader-carousel-v7.js` is not the production footer entrypoint. It must not pin an older base loader. If retained, it should delegate to the current global loader only.

## Update protocol

1. Make changes in the owning file, not in the Fourthwall footer.
2. If changing what loads globally, edit `kw-fourthwall-loader.js`.
3. If changing layout behavior around the native Fourthwall page or footer, edit `kw-fourthwall-layout-guard.css`.
4. If changing header or nav behavior, edit `kw-header.js` or `kw-header.css`.
5. If changing carousel behavior, edit `kwfw-carousel-desktop-grid.css`, `kwfw-carousel-wheel-bridge.js`, and the loader entry if dependency loading changes.
6. Test risky changes with a pinned commit URL, not `@main`, when Fourthwall/jsDelivr cache behavior matters.
7. Bump both the loader `?v=` query string and `data-version` when cache invalidation is needed.
8. After a fix is verified on the live storefront, pin the Fourthwall footer to the verified commit.

Do not rely on chat history as the only record of architecture decisions. This README is the operating map.