# 2026-07-18 — Standard modal description and variant-control layout

## Scope

Update the standard `kwfw` expanded product modal used by Featured Spellweaves and Cauldron Cores. Keep Step 3 `kwpj` behavior unchanged.

## Runtime changes

### `fourthwall/kwfw-universal-media.js`

Removed the description-widening system:

- Deleted creation of `.kwfw-desc-wide` clones.
- Added cleanup for legacy `.kwfw-desc-wide` elements.
- Preserved universal support-media manifest/config loading.
- Preserved image/video slide injection, dots, arrows, swipes, and global refresh functions.
- Reformatted the previously compressed runtime into maintainable production JavaScript.

### `fourthwall/kwfw-universal-media.css`

Returned descriptions to the information column:

- `.kwfw-desc-wide` is always hidden.
- `.kwfw-panel-info > .kwfw-desc` is visible on desktop and mobile.
- Desktop `.kwfw-panel-grid` no longer reserves a second full-width description row.
- Description styling remains AgencyFB with sentence casing and existing content formatting.
- Gallery/card media presentation remains unchanged.

### `fourthwall/kwfw-modal-product-fix.js`

Added standard-only option presentation:

- Detects a standard option whose underlying key or visible label is `Description`.
- Replaces only its visible label with `Size & Style Variant`.
- Preserves `data-kwfw-option="Description"` so the base carousel continues resolving and submitting the correct Fourthwall variant.
- Measures every option label using the select’s computed font.
- Adds horizontal padding, border, and native-arrow allowance to the measured width.
- Uses a `124px` minimum and clamps to the field’s available width.
- Assigns one width based on the longest option, so the control does not jump when selection changes.
- Recalculates after font readiness and viewport resize.
- Leaves all `kwpj` option labels and widths unchanged.
- Preserves price resolution and selected-variant gallery behavior.

### `fourthwall/kwfw-modal-product-fix.css`

- Added a standard-select responsive maximum-width rule.
- Reformatted existing price and Add to Cart compatibility styles without changing their values or behavior.

### `fourthwall/global/kw-fourthwall-loader.js`

- Bumped the cache key to `20260718-standard-modal-layout-1`.
- Changed universal-media CSS/JS from historical fixed commits to the current loader `selfRef` so the updated source files load with the pinned production loader.

## Runtime commits

```text
59fba0ff65f137f3bf5c1e5835f4f6ea18201965
9d2cb7e61fca4d27b32035f8aff8bf59833d6f87
a721343eaa347a0ae3d49e2a3c468705d90727fa
87805c95bceb8b0060273857fe8120de28273af4
4bc31f2f1c2dd6253625391a45d11c9786e93f06
```

## Validation

- `node --check fourthwall/kwfw-universal-media.js`: passed.
- `node --check fourthwall/kwfw-modal-product-fix.js`: passed.
- Compared standard base modal markup against Step 3 modal markup.
- Confirmed the base standard carousel already owns the original description inside `.kwfw-panel-info`.
- Confirmed Step 3 source files were read but not modified.
- No size-guide registry/routing, price source, cart request, selected-variant gallery selection, carousel card, rail, grid, or wheel code changed.
- Live storefront verification remains required.

## Rollback

Restore:

```text
Global loader commit: aa8ad96cb30ddfcff156be0785846040633aea3d
Cache key: 20260718-size-guide-layout-compact-1
```

The previous loader retains the full-width description clone and full-width standard selects.
