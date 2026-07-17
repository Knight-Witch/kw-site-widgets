# Fourthwall Global Changelog

This module changelog records global-runtime-specific notes. `/HISTORY/CHANGELOG.md` remains the canonical repo-wide changelog.

## 2026-07-17 — variant gallery selection correction

Production candidate:

- Global loader commit: `8ef32a18b59ef932c9b5364ca3e37c72183d5c3e`
- Cache key: `20260717-variant-gallery-2`
- Entrypoint: `fourthwall/global/kw-fourthwall-loader.js`

### Fixed

- The modal runtime no longer replaces `modal._product` with a differently shaped product-detail payload.
- Variant selection is resolved from the original collection-product variants that built the dropdown.
- Product-detail media is matched back to the selected variant by variant ID.
- Option matching now tolerates key casing/format differences and description/name-only variant representations.

### Scope

- No carousel rail, wheel, card sizing, grid, or scroll files changed.
- Existing real Fourthwall price resolution, CTA styling, product-wide media fallback, and universal support slides remain active.

### Validation

- JavaScript passed `node --check`.
- Focused matcher tests covered ladies, mens/no-collar, and mens/detachable-collar selections.
- Live storefront verification remains required.

## 2026-07-17 — selected-variant modal galleries

Production candidate:

- Global loader commit: `26760b14a2676316be45e76df034638ae0990379`
- Cache key: `20260717-variant-gallery-1`
- Entrypoint: `fourthwall/global/kw-fourthwall-loader.js`

### Added

- The shared `fourthwall/kwfw-modal-product-fix.js` runtime now updates both standard `kwfw` and Step 3 `kwpj` product modal galleries when variant selection changes.
- Gallery media comes from Fourthwall's official `variant.images` payload.
- Product-wide media remains the fallback when a variant has no dedicated images.
- The standard `kwfw` modal keeps universal product-support slides when its product images are filtered.
- Product detail requests are cached and used to obtain complete variant media when a collection payload is incomplete.

### Scope

- No carousel rail, wheel, card sizing, or scroll files changed.
- Existing real Fourthwall price resolution and modal CTA styling remain in the same shared runtime/CSS pair.

### Validation

- Confirmed Fourthwall's official Storefront API collection schema exposes `images` on each variant.
- JavaScript passed `node --check`.
- Live storefront verification remains required.

## 2026-07-07 — global README reconciliation

Documentation-only update.

Reconciled `fourthwall/global/README.md` with the current root documentation state.

Current documented production state at that time pointed to:

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

Use the pinned commit above for that historical live Fourthwall footer state. Do not use `@main` for live production unless actively testing a new change.

### Fixed

- Carousel desktop scroll works through `fourthwall/kwfw-carousel-wheel-bridge.js`.
- The wheel bridge injects the final desktop carousel CSS override so `fourthwall/kwfw-carousel.css` cannot win the cascade with older scroll rules.
- Wheel interception is limited to visible card bounds plus a 20px side buffer.
- Page scroll resumes when the carousel cannot scroll in the wheel direction.
- Incomplete rows are centered through the final flex-wrap override.
- The global loader replaces same-key resources when the target URL changes.

### Failed intermediate states to avoid

- `3f0582046c6c0f31aedefa5e9d4805ec9eedddf3` must not be used. It included a MutationObserver loop that could freeze the browser/Fourthwall editor.
- `20260629-carousel-scroll-3` is superseded by `20260629-carousel-scroll-4`.
- Removing `kwfw-carousel-wheel-bridge.js` alone is not a valid no-scroll revert because base `kwfw-carousel.css` also contains carousel scroll rules.
- Old desktop grid refs, including `a4f56c6eab3ca9793c7ea1009c1a69318fd1d73c`, are not the current carousel runtime.

### Files involved

- `fourthwall/global/kw-fourthwall-loader.js`
- `fourthwall/kwfw-carousel-desktop-grid.css`
- `fourthwall/kwfw-carousel-wheel-bridge.js`
- `fourthwall/kwfw-carousel.css`

### Handoff notes

Before editing nav/header/footer/carousel behavior, read:

1. `fourthwall/global/README.md`
2. `fourthwall/global/CHANGELOG.md`
3. `fourthwall/global/kw-fourthwall-loader.js`
4. The owning runtime/CSS file for the area being edited.

For nav bar work, inspect `fourthwall/global/kw-header.js` and `fourthwall/global/kw-header.css`. Do not modify carousel files unless the task is explicitly carousel-related.
