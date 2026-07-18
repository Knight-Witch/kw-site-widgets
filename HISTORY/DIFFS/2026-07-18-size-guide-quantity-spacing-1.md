# 2026-07-18 — Size Guide quantity-row spacing

## Scope

Corrected the carousel modal Size Guide layout so the button cannot occupy or cover the quantity input and plus control.

## Runtime changes

### `fourthwall/kwfw-size-guide.css`

Changed `.kw-size-qty-size-row` from a flexible auto-width row to an explicit two-column grid:

```text
quantity column: 170px
Size Guide column: max-content
desktop gap: 14px
mobile gap: 8px
```

The wrapped `.kwfw-field` or `.kwpj-field` and its `.kwfw-qty`/`.kwpj-qty` control are now fixed to the native 170px quantity width. The Size Guide button has its own column with a 138px desktop minimum width.

This preserves all three quantity controls (`-`, input, `+`) and positions Size Guide after them without overlap.

### `fourthwall/global/kw-fourthwall-loader.js`

Bumped the default cache key to `20260717-size-guide-qty-spacing-1`.

## Validation

- Reviewed the standard `kwfw` quantity grid and Step 3 `kwpj` quantity grid; both use a 170px three-control footprint.
- No JavaScript changed.
- No chart data, price, cart, gallery, carousel rail, card grid, or wheel behavior changed.

## Runtime commits

```text
dd094b674e2d27209433bba24d5b56a5782a6c1b
698f65f6d87caa4d32b3839fbdfde205b09a022f
```

## Rollback

Restore loader commit `0de2b178480bf6f1128ad50b9c0068e9cda50da7` with cache key `20260717-ladies-size-guides-1`.
