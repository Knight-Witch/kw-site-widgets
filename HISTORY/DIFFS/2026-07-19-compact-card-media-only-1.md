# 2026-07-19 — Media-only compact carousel cards

## Scope

Remove product-title and Collection Domain text from the compact product tiles in both active carousel systems while preserving the expanded modal presentation.

## Runtime changes

### `fourthwall/kw-product-modal-presentation.css`

Added final defensive selectors:

```css
.kwfw-card .kwfw-card-title,
.kwfw-card .kw-product-card-collection-link,
.kwpj-card .kwpj-name,
.kwpj-card .kw-product-card-collection-link{
  display:none!important
}
```

The block is intentionally placed after all earlier card-title and card-subtitle declarations so it wins the cascade, including against the earlier `.kwfw-card-title { display:-webkit-box!important; }` rule.

Expanded modal identity remains visible because it uses separate selectors:

```text
.kwfw-panel-title
.kwpj-panel-title
.kw-product-collection-link
```

### `fourthwall/global/kw-fourthwall-loader.js`

Bumped the cache key to:

```text
20260719-compact-card-media-only-1
```

## Runtime commits

```text
5340614e27eec89244f15b0fe8aaa80605b455c4
4e93f2dfefb50e6e84de61d4b45ab5dab2438b2a
```

## Behavior preserved

- Compact-card images and videos.
- View & Add to Cart controls.
- Expanded modal product title and Collection Domain subtitle.
- Product pricing.
- Variant selection.
- Selected-variant galleries.
- Size Guide behavior.
- Add to Cart requests.
- Carousel rail/grid/wheel behavior.
- Step 3 branch-owned product and modal logic.

## Validation

- Reviewed production-pinned standard card selectors.
- Reviewed branch-owned Step 3 compact-card selectors.
- Confirmed Step 3 already hides `.kwpj-name`; the new rule is defensive.
- Confirmed the compact subtitle class differs from the expanded modal subtitle class.
- No JavaScript or Step 3 source file changed.
- Live visual verification remains required after the pinned footer is replaced.

## Rollback

Restore:

```text
Global loader commit: 08c4dca8bf833d283cedfeb471f29bd2741a70cc
Cache key: 20260718-featured-card-collections-2
```
