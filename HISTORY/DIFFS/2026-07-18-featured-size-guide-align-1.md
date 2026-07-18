# 2026-07-18 — Featured Spellweave Size Guide alignment

## Scope

Corrected the remaining vertical misalignment of the Size Guide button in the standard `kwfw` featured-product modal. The Step 3 `kwpj` layout was already correct and remains unchanged.

## Runtime changes

### `fourthwall/kwfw-size-guide.css`

The standard `kwfw` quantity field is now flattened into the shared grid with `display: contents` so its label and 46px quantity controls occupy explicit rows:

- Row 1: Qty label.
- Row 2: minus/input/plus controls and Size Guide button.

The Size Guide button is assigned to column 2, row 2, aligning it directly with the quantity controls instead of aligning against the full label-plus-control field height.

The Step 3 `.kwpj-*` rules were not changed.

### `fourthwall/global/kw-fourthwall-loader.js`

Bumped the cache key to `20260717-featured-size-guide-align-1`.

## Runtime commits

```text
f3be53876a4ed3b5fc4f54a022818cbfd700abf9
2a3d96c115de79cc6a22eb85181350cb4c76b465
```

## Rollback

Restore loader commit `0e12cbe2ff5b28bfc896c0bdf6bb6c5c8af4d462` with cache key `20260717-size-guide-row-fix-2`.
