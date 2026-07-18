# 2026-07-18 — Ladies size-guide product corrections

## Scope

Corrected the ladies garment chart registry using the exact product names supplied by the user instead of the previous generic `Ladies Rocker Vest` and `Ladies Moto Vest` labels.

## Runtime changes

### `fourthwall/kwfw-size-guide-data.js`

Removed the incorrect generic ladies entries and added exact registered products:

- `ladies-crop-top-rocker-jacket`
- `ladies-goth-merc-vest`
- `ladies-punkass-vest`
- `ladies-biker-vest`

The `ladies-crop-top-rocker-jacket` chart also resolves:

- `ladies-snakeskin-crop-top-vest`
- `Ladies Rocker Vest` featured-product variant labels
- existing no-collar/detachable-collar ladies variant labels

This preserves the user's stated shared chart between the snakeskin garment and Ladies Crop-Top Rocker Jacket without creating duplicate data.

Added source measurements from the four supplied charts:

- Ladies Goth Merc Vest: XXS–5XL, bust/waist/hips ranges.
- Ladies Punkass Vest: S–XL, US size/bust/shoulder/length.
- Ladies Crop-Top Rocker Jacket / Snakeskin Crop-Top Vest: SM–XL, bust/shoulder/sleeve/length.
- Ladies Biker Vest: X-Small–4X-Large, chest/waist/length.

The unverified generic `ladies-moto-vest` mapping was removed rather than continuing to display a potentially incorrect manufacturer's chart.

### `fourthwall/global/kw-fourthwall-loader.js`

Bumped the default cache key to `20260717-ladies-size-guides-1`.

## Validation

- The generated registry passed `node --check` before commit.
- No size-guide modal behavior, placement, styling, price, gallery, cart, carousel layout, or scroll code changed.
- Product slugs use the normalized exact product names supplied by the user.

## Runtime commits

```text
0c42e82110db0f3e13c5dc32bdc666f3821c3a30
0de2b178480bf6f1128ad50b9c0068e9cda50da7
```

## Rollback

Restore loader commit `3ae4a2f1827a4aa132da234faac94a876e18e489` with cache key `20260717-size-guide-placement-2`.
