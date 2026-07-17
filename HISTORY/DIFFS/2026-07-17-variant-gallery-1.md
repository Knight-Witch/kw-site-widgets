# 2026-07-17 — Selected-variant modal galleries

## Runtime changes

### `fourthwall/kwfw-modal-product-fix.js`

- Extended the existing shared modal compatibility runtime rather than adding another observer or standalone compatibility layer.
- Added support for both standard `.kwfw-*` modal galleries and Step 3 `.kwpj-*` jacket modal galleries.
- Resolves the currently selected variant from native option selects or `data-kwfw-rule-variant-id` for custom product-rule selectors.
- Reads dedicated media from Fourthwall's official variant `images` array, with additional known media-key compatibility.
- Rebuilds the existing gallery track and dot controls when the selected variant changes.
- Resets the gallery to the first matching image after selection changes.
- Falls back to product-wide media only when the selected variant has no dedicated media.
- Preserves `.kwfw-universal-media-slide` support slides in the standard product modal.
- Fetches and caches the official product-by-slug response once per modal opening to obtain complete variant media when necessary.
- Uses an idempotent gallery key to prevent repeated MutationObserver rebuild loops.
- Retains the existing real Fourthwall `unitPrice` rendering behavior.

Commit: `114b4de424a1de30fbaa46501a03c91a6d10fbd9`

### `fourthwall/global/kw-fourthwall-loader.js`

- Bumped the loader fallback cache key to `20260717-variant-gallery-1`.
- Dependency order and carousel scroll resources were not changed.

Commit: `26760b14a2676316be45e76df034638ae0990379`

## Documentation changes

- Added pre-flight record `PF-20260717-009`.
- Updated `/MASTER.md` with the production candidate, ownership, completed state, and live-verification risk.
- Updated `/fourthwall/README.md` and `/fourthwall/global/README.md` with shared modal-runtime ownership.
- Updated `/fourthwall/global/CHANGELOG.md`.
- Root architecture, style reference, and canonical changelog are updated in the same work session.

## Rollback

Restore global loader commit `63ef5483c10dd2fc803be180faec584d84dbecc6` with cache key `20260717-product-modal-prices-2`. That retains the dual-modal price and CTA fix but removes selected-variant gallery filtering.

## Validation

- `node --check` passed for the updated runtime.
- Fourthwall's official Storefront API documentation confirms that collection product variants expose an `images` array.
- No carousel rail, wheel, grid, card-size, or scroll files changed.
- Live Fourthwall verification is still required for the Samurai vest and representative Step 3 jacket variants.
