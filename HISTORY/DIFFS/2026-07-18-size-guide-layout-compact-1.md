# 2026-07-18 — Featured row compatibility and compact size-chart layout

## Scope

Correct the Featured Spellweave Size Guide button still appearing below the quantity controls and reduce unnecessary size-chart width/spacing on desktop and mobile. Preserve Step 3 jacket geometry and all chart routing/data.

## Runtime changes

### `fourthwall/kwfw-size-guide.css`

Featured row compatibility:

- Expanded Featured selectors from modifier-only `.kw-size-qty-size-row--kwfw` to both the base `.kw-size-qty-size-row` and modifier class.
- Changed the Featured row to an explicit two-column `170px max-content` grid.
- Kept the native quantity control at `48px 58px 48px` with two `8px` gaps.
- Kept Size Guide in a separate same-row column with a `10px` desktop gap.
- Left all Step 3 `.kwpj-*` geometry unchanged.

Chart presentation:

- Changed `.kw-size-title` to the AgencyFB display stack.
- Added `.09em` desktop and `.075em` mobile title tracking.
- Replaced the broad fixed panel footprint with content-driven `fit-content` sizing constrained by the viewport.
- Reduced header, body, table-cell, note, and picker spacing.
- Changed desktop tables to content-driven `max-content` widths.
- Removed the former mobile `min-width:560px` table rule.
- Allowed mobile table headers to wrap.
- Reduced mobile table text to `12.5px` and padding to `7px 5px`.

### `fourthwall/global/kw-fourthwall-loader.js`

Bumped the default cache key to:

```text
20260718-size-guide-layout-compact-1
```

## Runtime commits

```text
f28f4ae79bca76ba40c26ec91d5e326eaf7d8098
aa8ad96cb30ddfcff156be0785846040633aea3d
```

## Why the Featured selector changed

Fourthwall editor hot reloads can preserve an older `.kw-size-qty-size-row` created before the `--kwfw` modifier existed. The current runtime structure may therefore be correct while modifier-only CSS does not apply. Targeting both classes makes the layout deterministic without changing the injector or touching Step 3.

## Validation

- Reviewed current `kwfw` and `kwpj` DOM ownership.
- Reviewed base `kwfw` quantity geometry.
- Confirmed Step 3 selectors were copied unchanged.
- No JavaScript, registry, resolver, product pricing, Add to Cart, gallery, carousel card, rail, grid, or wheel code changed.
- Live visual verification remains required after the pinned footer is replaced.

## Rollback

Restore:

```text
Global loader commit: 8666ed87f3e7a84ddebbbf1f7e3d45b25d1054c0
Cache key: 20260718-samurai-size-guides-1
```
