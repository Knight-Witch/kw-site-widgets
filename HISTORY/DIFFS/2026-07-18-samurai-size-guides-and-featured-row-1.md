# 2026-07-18 — Samurai size-guide routing and Featured row restoration

## Scope

Corrected the remaining Featured Spellweave Size Guide misalignment and repaired Samurai product chart routing.

## Runtime changes

### `fourthwall/kwfw-size-guide.js`

- Restored the original standard-modal ownership model: `.kwfw-label` remains in `.kwfw-field`, while only `.kwfw-qty` and Size Guide are placed in `.kw-size-qty-size-row--kwfw`.
- Preserved the Step 3 field-level wrapper and grid.
- Added product-scoped variant rules so generic values such as `Vegan Leather` and `Genuine Leather` only route when the current product is the Samurai Moto Jacket.
- Added cleanup for legacy standard-modal wrappers already present in a hot-reloaded editor session.
- Added HTML escaping for rendered registry content.

### `fourthwall/kwfw-size-guide.css`

- Added namespace-specific row classes.
- Featured Spellweave row now uses centered flex alignment around the native `.kwfw-qty` box.
- Step 3 retains its verified field-level grid and fixed quantity geometry.
- No carousel rail, wheel, card, or modal pricing styles changed.

### `fourthwall/kwfw-size-guide-data.js`

- Renamed the featured ladies chart to `Ladies Crop-Top Vest Size Chart`.
- Routed `Mens Rocker Vest` and mens vest-only/collar variants to `Men's Hooded Vest Size Chart`.
- Removed those variant aliases from `Men's Leather Rocker Vest`.
- Added `Vegan Moto Jacket - Unisex` using the supplied faux-leather chart.
- Added `Genuine Leather Moto Jacket - Unisex` using the supplied genuine-leather chart, including regular, tall, big, and big-tall sizes.
- Scoped both Samurai Moto charts to the product slug `cp-2077-johnnys-samurai-jacket-prebuilt-design-led-jacket` and Samurai product-title aliases.

### `fourthwall/global/kw-fourthwall-loader.js`

- Bumped the cache key to `20260718-samurai-size-guides-1`.

## Runtime commits

```text
e04c39dd4dafcf7f33ff10cfb2e792e32a972623
32c872f7d081e095133301132743f7c4498b23d3
68e06910b03a489fe3a61820b5fc2b07b79494be
8666ed87f3e7a84ddebbbf1f7e3d45b25d1054c0
```

## Validation

- The replacement JavaScript and registry passed `node --check` before commit.
- Live product data was checked for the Samurai vest and Samurai Moto product names, slug, and material options.
- Step 3 selectors and geometry were not changed.
- No product price, Add to Cart, gallery, carousel grid, rail, or wheel code changed.

## Rollback

Restore global loader commit `94a92c443658086ee2a3c5b822ba68a873c3f3ef` with cache key `20260717-featured-size-guide-restore-1`.
