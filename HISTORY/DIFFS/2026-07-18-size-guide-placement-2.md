# 2026-07-18 — Size Guide modal placement and typography

## Scope

Returned the Size Guide button to the quantity-control row in both carousel modal systems and matched the carousel AgencyFB typography. Native Fourthwall product-page placement remains full width before Add to Cart.

## Changes

### `fourthwall/kwfw-size-guide.js`

- Added idempotent `.kw-size-qty-size-row` creation.
- Moves the existing `kwfw` or `kwpj` quantity field into that row.
- Places the Size Guide button directly after the quantity field.
- Reuses the same row and button during MutationObserver refreshes.
- Retains the previous full-width fallback when a modal has no detectable quantity field.
- Leaves native product-page placement unchanged.

### `fourthwall/kwfw-size-guide.css`

- Added quantity-row flex layout.
- Set the modal button to the same `AgencyFB / Agency FB / AgencyFB` stack used by the carousel displays.
- Matched the existing quantity-control height of `46px`.
- Kept native product-page buttons full width.
- Added compact mobile sizing while preserving the side-by-side row.

### `fourthwall/global/kw-fourthwall-loader.js`

- Bumped the default/cache version to `20260717-size-guide-placement-2`.

## Runtime commits

```text
642d30b4d34cc7a5aa8a81a99e99de48742b6257
2655c77e18f52a8861240deb1c21449541301693
3ae4a2f1827a4aa132da234faac94a876e18e489
```

## Scope exclusions

No chart data, chart resolution, product prices, variant galleries, Add to Cart behavior, carousel grid, carousel rail, or wheel/page-scroll behavior changed.

## Rollback

Restore global loader commit `1e5cb24e662a37358d296949e998c4980309a883` with cache key `20260717-size-guide-registry-1`.
