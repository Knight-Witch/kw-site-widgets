# Fourthwall Global Changelog

This module changelog records global-runtime-specific notes. `/HISTORY/CHANGELOG.md` remains the canonical repo-wide changelog.

## 2026-07-07 — global README reconciliation

Documentation-only update.

Reconciled `fourthwall/global/README.md` with the current root documentation state.

Current documented production state now points to:

- Global loader commit: `b7672d41f8a011f47675ef2394b7d99028c90158`
- Global loader cache key: `20260706-title-carousel-spacing-2`
- Temporary title-bar hotfix commit: `663b046d1dcb77b86a06ee1af427af2a5b0821dc`
- Temporary title-bar hotfix cache key: `20260706-titlebar-hotfix-1`

The older `20260629-carousel-scroll-4` and `20260630-nav-phase-2-title-hold-red` notes below are historical and should not be treated as the current production footer state.

## 2026-06-29 — verified carousel scroll runtime

Verified live storefront fix:

- Commit: `31a02608065694efdd766bad4e5efc35c097e25a`
- Cache key: `20260629-carousel-scroll-4`
- Entrypoint: `fourthwall/global/kw-fourthwall-loader.js`

Use the pinned commit above for the live Fourthwall footer. Do not use `@main` for the live storefront after this fix unless actively testing a new change.

### Fixed

- Carousel desktop scroll now works through `fourthwall/kwfw-carousel-wheel-bridge.js`.
- The wheel bridge injects the final desktop carousel CSS override so `fourthwall/kwfw-carousel.css` cannot win the cascade with older scroll rules.
- Wheel interception is limited to visible card bounds plus a 20px side buffer.
- Page scroll resumes when the carousel cannot scroll in the wheel direction.
- Incomplete rows are centered through the final flex-wrap override.
- The global loader now replaces same-key resources when the target URL changes. This prevents stale desktop-grid CSS or controller JS from remaining active after a version bump.

### Failed intermediate states to avoid

- `3f0582046c6c0f31aedefa5e9d4805ec9eedddf3` must not be used. It included a MutationObserver loop that could freeze the browser/Fourthwall editor.
- `20260629-carousel-scroll-3` should be considered superseded by `20260629-carousel-scroll-4`.
- Removing `kwfw-carousel-wheel-bridge.js` alone is not a valid no-scroll revert because base `kwfw-carousel.css` also contains carousel scroll rules.
- The old desktop grid refs, including `a4f56c6eab3ca9793c7ea1009c1a69318fd1d73c`, should not be treated as the current carousel runtime.

### Files involved

- `fourthwall/global/kw-fourthwall-loader.js`
- `fourthwall/kwfw-carousel-desktop-grid.css`
- `fourthwall/kwfw-carousel-wheel-bridge.js`
- `fourthwall/kwfw-carousel.css`

### Handoff notes for future GPT sessions

Before editing nav/header/footer/carousel behavior, read:

1. `fourthwall/global/README.md`
2. `fourthwall/global/CHANGELOG.md`
3. `fourthwall/global/kw-fourthwall-loader.js`
4. The owning runtime/CSS file for the area being edited.

For nav bar work, inspect `fourthwall/global/kw-header.js` and `fourthwall/global/kw-header.css`. Do not modify carousel files unless the task is explicitly carousel-related.
