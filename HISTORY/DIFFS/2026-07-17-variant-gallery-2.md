# Variant gallery selection fix

Date: 2026-07-17

Runtime commits:
- `8c10091152888eb446b4d215cc837507354e6c91`
- `8ef32a18b59ef932c9b5364ca3e37c72183d5c3e`

## fourthwall/kwfw-modal-product-fix.js

- Stopped replacing `modal._product` with the product-detail response.
- Kept the original collection-product object as the selection source because it is the object used to build the modal dropdowns.
- Stored product-detail data separately on the modal.
- Added normalized option-key matching.
- Added attribute-value, description, variant-name, and SKU fallback matching.
- Matched detailed variant media back to the selected collection variant by stable variant ID.
- Preserved existing price, product-wide fallback, universal-media, and gallery reset behavior.

## fourthwall/global/kw-fourthwall-loader.js

- Bumped the cache key from `20260717-variant-gallery-1` to `20260717-variant-gallery-2`.
- Did not change carousel scroll, grid, rail, or card dependencies.

## Validation

- JavaScript passed `node --check`.
- Focused matcher tests resolved ladies, mens/no-collar, and mens/detachable-collar variants correctly.
- Tested mismatched option-key casing and description-only variant representations.

## Rollback

Restore global loader commit `26760b14a2676316be45e76df034638ae0990379` with cache key `20260717-variant-gallery-1`.
