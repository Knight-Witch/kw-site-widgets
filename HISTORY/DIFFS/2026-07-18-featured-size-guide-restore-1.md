# 2026-07-18 — Restore Featured Spellweave Size Guide row

## Scope

Restored the standard `kwfw` Featured Spellweave Size Guide placement to the last known-good flex layout from before the July 18 quantity-row experiments, while retaining the corrected fixed-grid Step 3 `kwpj` layout.

## Runtime changes

### `fourthwall/kwfw-size-guide.css`

Separated the two modal namespaces instead of forcing them through one shared grid.

Standard `kwfw` modal:

- Uses the prior flex row.
- Keeps the native 170px quantity control.
- Bottom-aligns Size Guide beside the quantity field, including its Qty label.
- Removes the later `display: contents`, explicit row placement, and shared fixed-grid rules that pushed Size Guide onto a separate line.

Step 3 `kwpj` modal:

- Retains the current two-column grid.
- Retains the explicit `48px 58px 48px` quantity geometry.
- Retains the separate Size Guide column and 16px desktop gap.

### `fourthwall/global/kw-fourthwall-loader.js`

Bumped the default cache key to `20260717-featured-size-guide-restore-1`.

## Runtime commits

```text
03128a0f5d4e06b3b16ff7a244cfd359677ca84d
94a92c443658086ee2a3c5b822ba68a873c3f3ef
```

## Validation

- Compared the current CSS against the last known-good Featured Spellweave state at loader commit `0de2b178480bf6f1128ad50b9c0068e9cda50da7`.
- Restored only the `kwfw` row behavior from that state.
- Preserved the current `kwpj` geometry that fixed Step 3 overlap.
- No JavaScript, chart data, prices, cart, galleries, carousel cards, rail, or wheel behavior changed.

## Rollback

Restore loader commit `2a3d96c115de79cc6a22eb85181350cb4c76b465` with cache key `20260717-featured-size-guide-align-1`.
