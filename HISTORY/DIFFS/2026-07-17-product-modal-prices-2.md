# Product modal prices and Step 3 CTA

Date: 2026-07-17 21:19 UTC

Runtime commits:
- `e4cb9d63a9c5e91d0acf006ab7a2acaad637a5a2`
- `05945c729bca2dec9e03bd76b583278dd8252185`
- `63ef5483c10dd2fc803be180faec584d84dbecc6`

## fourthwall/kwfw-modal-product-fix.css

- Expanded the modal price visibility rule to cover both `.kwfw-panel-price` and `.kwpj-panel-price`.
- Expanded the Add to Cart CTA rule to cover both `[data-kwfw-add]` and `[data-kwpj-add]`.
- Uses explicit orange/background/border/glow values so the Step 3 modal does not depend on CSS variables scoped to `.kwpj-carousel`.
- Does not alter View Details buttons, carousel cards, rails, or scroll behavior.

## fourthwall/kwfw-modal-product-fix.js

- Replaced the single-carousel helper with a dual-system modal runtime.
- Supports standard `.kwfw-modal/.kwfw-panel` and Step 3 `.kwpj-modal/.kwpj-panel` markup.
- Reads the selected variant's Fourthwall `unitPrice.value` and `unitPrice.currency` first.
- Uses the product's real variant/product API data and does not create a placeholder price.
- Supports nested Fourthwall variant attributes such as `attributes.color.name` and `attributes.size.name`.
- Updates the displayed price on initial modal creation and option changes.
- Fixes initial detection when the MutationObserver-added node is itself the modal panel.
- Uses the official product-by-slug Storefront API endpoint only when the collection product object has no usable price; requests are cached by slug.

## fourthwall/global/kw-fourthwall-loader.js

- Bumped the loader fallback/cache identity to `20260717-product-modal-prices-2`.
- Preserved existing dependency order and existing carousel scroll files.
- Continues loading the shared modal compatibility CSS/JS after product rules.

## Rollback

Restore loader commit `7db18a8ddae88d5c6dd0880014f1a07b54277761` with cache key `20260717-modal-product-fix-1`, or revert the three runtime commits listed above.

## Validation

- `kwfw-modal-product-fix.js` passed `node --check`.
- Fourthwall official Storefront API documentation confirms collection product variants expose `unitPrice: { value, currency }`.
- No carousel layout, wheel, or scrolling code changed.
- Live storefront verification remains required after updating the footer snippet.
