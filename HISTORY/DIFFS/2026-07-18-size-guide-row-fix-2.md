# 2026-07-18 — Size Guide quantity-row alignment fix

## Scope

Corrected the Size Guide button layout in both product modal systems after live screenshots showed two distinct failures:

- Standard `kwfw` featured-product modal: the Size Guide button sat lower than the quantity controls.
- Step 3 `kwpj` base-jacket modal: the quantity control expanded beyond its grid column and rendered underneath the Size Guide button.

## Runtime changes

### `fourthwall/kwfw-size-guide.css`

- Made `.kw-size-qty-size-row` an explicit two-column grid.
- Reserved exactly `170px` for the quantity field.
- Reserved a separate content-sized column for Size Guide with a `16px` gap.
- Forced both `.kwfw-qty` and `.kwpj-qty` to the same `48px 58px 48px` grid used by the original 170px control.
- Forced quantity buttons and input to remain inside those columns.
- Removed quantity-field bottom margins with `!important` so both controls bottom-align.
- Preserved mobile horizontal overflow instead of allowing overlap.

### `fourthwall/global/kw-fourthwall-loader.js`

Bumped the default cache key to `20260717-size-guide-row-fix-2`.

## Runtime commits

```text
18cd5ac5c38921c29c8bac80de870b8c29914c92
0e12cbe2ff5b28bfc896c0bdf6bb6c5c8af4d462
```

## Scope exclusions

No chart data, chart resolution, popup behavior, pricing, cart, product galleries, carousel grid, or carousel scrolling changed.

## Rollback

Restore global loader commit `698f65f6d87caa4d32b3839fbdfde205b09a022f` with cache key `20260717-size-guide-qty-spacing-1`.
