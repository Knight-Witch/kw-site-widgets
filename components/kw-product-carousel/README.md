# KW Product Carousel

Reusable Fourthwall product carousel for Knight Witch storefront sections.

This component is being developed on the `kw-product-carousel-refactor` branch. Do not replace the live carousel loader until the branch version is tested on a hidden or non-critical Fourthwall page.

## Files

```text
components/kw-product-carousel/kw-product-carousel.css
components/kw-product-carousel/kw-product-carousel.js
components/kw-product-carousel/examples/featured-spellweaves.html
components/kw-product-carousel/examples/cauldron-cores.html
components/kw-product-carousel/examples/jacket-builder.html
```

## Branch Test Loader

Use this only while testing the refactor branch.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@kw-product-carousel-refactor/components/kw-product-carousel/kw-product-carousel.css">
<script>
  window.KW_STOREFRONT_TOKEN = "YOUR_FOURTHWALL_STOREFRONT_TOKEN";
</script>
<script src="https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@kw-product-carousel-refactor/components/kw-product-carousel/kw-product-carousel.js" defer></script>
```

## Featured Spellweaves

```html
<div
  class="kw-product-carousel"
  data-kw-carousel="collection"
  data-collection="featured-spellweaves">
</div>
```

## Cauldron Cores

```html
<div
  class="kw-product-carousel"
  data-kw-carousel="collection"
  data-collection="cauldron-cores">
</div>
```

## Jacket Builder

```html
<div
  class="kw-product-carousel"
  data-kw-carousel="jacket-builder"
  data-default-gender="mens"
  data-default-category="vests">
</div>
```

## Jacket Builder Slugs

```text
mens + vests = mens-vests
mens + jackets = mens-jackets
mens + coats = mens-coats
mens + cosplay = mens-cosplay
ladies + vests = ladies-vests
ladies + jackets = ladies-jackets
ladies + coats = ladies-coats
ladies + cosplay = ladies-cosplay
custom = custom-jacket
```

## Notes

The refactor removes the jQuery dependency and scopes carousel state per instance. Multiple carousels can exist on the same page without shared IDs or global state conflicts.

The first pass uses Fourthwall native cart methods only. The old separate API-cart fallback is intentionally not included in this branch version.
