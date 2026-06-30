# Fourthwall Global Runtime

This directory is the source of truth for global Fourthwall code used by Knight Witch Apparel.

Fourthwall should only contain a small bootstrap snippet that loads `fourthwall/global/kw-fourthwall-loader.js` from this repository.

The global loader owns dependency order for header, title bars, info sections, carousel, font, desktop carousel grid, size guide, universal media, product rules, cart runtime, and the Fourthwall layout guard.

The Fourthwall footer should not include separate component CSS or JavaScript tags when this loader is active.

## Production entrypoint

Use `fourthwall/global/kw-fourthwall-loader.js` as the production footer entrypoint.

Use a `?v=` cache key whenever Fourthwall or jsDelivr appears to be serving stale behavior. Current cache key for the layout-guard fix: `20260629-layout-guard-1`.

## Layout guard

`fourthwall/global/kw-fourthwall-layout-guard.css` is loaded first by the global loader. It owns the Fourthwall page and footer layout correction. It must keep the main page region expanding above the footer so the native Fourthwall footer does not appear in the middle of short pages.

## Legacy compatibility loaders

`fourthwall/global/kw-fourthwall-loader-carousel-v7.js` is not the production footer entrypoint. It must not pin an older base loader. If retained, it should delegate to the current global loader only.

## Update protocol

1. Make changes in the owning file, not in the Fourthwall footer.
2. If changing what loads globally, edit `kw-fourthwall-loader.js`.
3. If changing layout behavior around the native Fourthwall page or footer, edit `kw-fourthwall-layout-guard.css`.
4. If changing header or nav behavior, edit `kw-header.js` or `kw-header.css`.
5. If changing carousel behavior, edit the carousel files, not the footer snippet.
6. Test through a branch CDN URL before merging when the change is risky.
7. Bump the `?v=` query string in the Fourthwall footer when cache invalidation is needed.

Do not rely on chat history as the only record of architecture decisions. This README is the operating map.
