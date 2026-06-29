# Fourthwall Global Runtime

This directory is the source of truth for global Fourthwall code used by Knight Witch Apparel.

Fourthwall should not carry large inline CSS, HTML, or JavaScript blocks. Fourthwall should only contain a small bootstrap snippet that loads the global runtime from this repository.

## Current architecture

The footer loads `kw-fourthwall-loader.js`.

The loader is responsible for loading global CSS and JavaScript in the correct order. It does not contain component implementation code. Component implementation stays in the component files listed below.

## Fourthwall footer snippet

Use this snippet when testing the Stage 2 branch:

```html
<script
  defer
  src="https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@kw-footer-stage-2-global-loader/fourthwall/global/kw-fourthwall-loader.js?v=20260628-stage2"
  data-storefront-token="YOUR_STOREFRONT_TOKEN"
  data-shop-domain="knightwitchapparel.com"
  data-currency="USD">
</script>
```

After this branch is tested and merged, use this snippet:

```html
<script
  defer
  src="https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@main/fourthwall/global/kw-fourthwall-loader.js?v=20260628-stage2"
  data-storefront-token="YOUR_STOREFRONT_TOKEN"
  data-shop-domain="knightwitchapparel.com"
  data-currency="USD">
</script>
```

The footer should not include separate header, title bar, accordion, carousel, size guide, universal media, or product rule tags when this loader is active.

## Global files

| File | Owner | Purpose |
|---|---|---|
| `fourthwall/global/kw-fourthwall-loader.js` | Global runtime | Loads all Fourthwall global dependencies and sets `window.KWFW_SETTINGS`. |
| `fourthwall/global/kw-header.css` | Header/nav | Styles the custom global header, desktop dropdowns, mobile drawer, and cart nav button. |
| `fourthwall/global/kw-header.js` | Header/nav | Injects the global nav markup and handles desktop dropdowns, mobile drawer behavior, active links, and responsive behavior. |
| `fourthwall/global/kw-cart-runtime.css` | Cart runtime | Styles the empty-cart modal. |
| `fourthwall/global/kw-cart-runtime.js` | Cart runtime | Intercepts empty `/cart` navigation and opens the empty-cart modal. |

## Component files loaded by the global loader

| Component | Files | Notes |
|---|---|---|
| Title bars | `components/kw-title-bars/kw-title-bars.css`, `components/kw-title-bars/kw-title-bars.js` | Used by `.kw-title-bar` page snippets. |
| Info sections | `fourthwall/info-sections/kw-info-sections.css`, `fourthwall/info-sections/kw-info-sections.js` | Currently loaded from `kw-info-accordion-dev` until promoted to `main`. Used by `data-kw-info-sections`, `data-kw-info-order`, `data-kw-info-config`, and `.kw-info-sections`. |
| Carousel | `fourthwall/kwfw-carousel.css`, `fourthwall/kwfw-carousel.js` | Used by `data-kwfw-collection` and `.kwfw-carousel` snippets. |
| Carousel grid | `fourthwall/kwfw-carousel-desktop-grid.css` | Desktop carousel layout extension. |
| AgencyFB font | `fourthwall/kwfw-font-agencyfb.css` | Shared display font load. |
| Size guide | `fourthwall/kwfw-size-guide.css`, `fourthwall/kwfw-size-guide.js` | Product/page size-guide behavior. |
| Universal media | `fourthwall/kwfw-universal-media.css`, `fourthwall/kwfw-universal-media.js` | Shared product media behavior. |
| Product rules | `fourthwall/kwfw-product-rules.css`, `fourthwall/kwfw-product-rules.js` | Product-specific rule behavior. |

## Update protocol

1. Create a branch from `main`.
2. Make changes in the owning file, not in the Fourthwall footer.
3. If changing what loads globally, edit `kw-fourthwall-loader.js`.
4. If changing header/nav behavior, edit `kw-header.js` or `kw-header.css`.
5. If changing carousel behavior, edit the carousel files, not the loader.
6. If changing accordion behavior, edit the info-section files, not the loader.
7. Test through a branch CDN URL before merging.
8. Merge to `main` only after Fourthwall branch testing passes.
9. Bump the `?v=` query string in the Fourthwall footer when cache invalidation is needed.

## Branch testing rule

When testing a branch, the footer snippet should point to the branch name:

```html
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@branch-name/fourthwall/global/kw-fourthwall-loader.js?v=cache-key
```

The loader automatically loads global files from the same ref as the loader itself. This means branch tests can verify edits to `kw-header.js`, `kw-header.css`, `kw-cart-runtime.js`, `kw-cart-runtime.css`, and `kw-fourthwall-loader.js` before those edits reach `main`.

Pinned component refs inside the loader are intentionally stable until the component is promoted or updated.

## Cache control

jsDelivr can cache aggressively. The `?v=` string is the cache-busting control for Fourthwall.

Use meaningful version strings:

```text
20260628-stage2
20260628-empty-cart-1
20260628-carousel-fix-1
```

Change the cache key when the loaded file changed and Fourthwall still appears to be serving old behavior.

## Page-level snippet contract

Page snippets should stay small. They should declare intent only.

Examples:

```html
<div data-kwfw-collection="collection-slug" data-kwfw-title="Featured"></div>
```

```html
<div data-kw-info-sections="faq,warranty,returns"></div>
```

```html
<div class="kw-title-bar" data-kw-fit=".target-selector">Title</div>
```

Page snippets should not include large scripts or styles.

## Do not do this

Do not paste large component code back into Fourthwall.

Do not make the loader a giant component file.

Do not move unrelated component behavior into the header runtime.

Do not edit pinned commit hashes casually. If a component update should become stable, promote the component intentionally and update the README.

Do not rely on chat history as the only record of architecture decisions. This README is the operating map.
