# 2026-07-17 Modal Product Fix

## Summary

Fixed expanded carousel product modal pricing and Add to Cart visibility without changing carousel scroll behavior.

## Runtime commits

```text
335a0f92ea0d5b1302ddef7336745aee0f38b10e  Add kwfw modal product visual fix
0ec1c1c6d59f348781ff78b889ce8678dec12f10  Add kwfw modal API price fix
7db18a8ddae88d5c6dd0880014f1a07b54277761  Load modal product price and CTA fixes
```

## Documentation commits

```text
24384bc7dffe9c780b43f89d5ac93ac22692d8ca  Log modal product fix pre-flight
cc7d51d5f6a5b06bbb3e4672333b91211475a0af  Log modal product fix changelog
```

## Changed files

### `fourthwall/kwfw-modal-product-fix.css`

Added modal-only CSS targeting `.kwfw-panel .kwfw-btn[data-kwfw-add]` and `.kwfw-panel .kwfw-panel-price`.

The Add to Cart CTA now forces:

```text
orange background
visible dark text
orange border
orange glow
pulse animation
normal disabled state
```

This deliberately targets only the expanded product modal button, not carousel card buttons or dark secondary buttons.

### `fourthwall/kwfw-modal-product-fix.js`

Added a modal-only helper that reads the live `modal._product` object produced by `kwfw-carousel.js`.

The helper resolves actual API-derived prices from:

```text
selected variant price fields
product price fields
price range fields
pricing objects
formatted/display price fields
```

The helper does not insert placeholder prices. If no real price can be resolved from the live product/variant object, it leaves the existing price text unchanged and marks the element with `data-kwfw-price-source="missing"` for debugging.

The helper also responds to modal changes/clicks so variant selectors and product-rule selections can refresh `.kwfw-panel-price`.

### `fourthwall/global/kw-fourthwall-loader.js`

Added two resources after product-rule assets:

```text
kwfw-modal-product-fix.css
kwfw-modal-product-fix.js
```

The loader cache fallback was updated to:

```text
20260717-modal-product-fix-1
```

## Rollback notes

Remove these two resources from `fourthwall/global/kw-fourthwall-loader.js` or revert the runtime commits listed above.

## Validation notes

Reviewed:

```text
ARCHITECTURE.md
STYLE_KEYS.md
MASTER.md
HISTORY/CHANGELOG.md
HISTORY/PRE_FLIGHT_Check.md
fourthwall/README.md
fourthwall/global/README.md
fourthwall/global/CHANGELOG.md
components/kw-title-bars/README.md
fourthwall/global/kw-fourthwall-loader.js
fourthwall/kwfw-carousel.css
fourthwall/kwfw-carousel.js
fourthwall/kwfw-product-rules.js
```

No live storefront testing was performed in this session.

## Follow-up risks

If a modal still shows no price, inspect the live `document.querySelector('.kwfw-modal.is-open')._product` object and add the missing price field path to `kwfw-modal-product-fix.js`.
