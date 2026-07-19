# Knight Witch Fourthwall Widgets

This folder contains Fourthwall-facing runtime code, global loaders, page/domain modules, product widgets, product support media manifests, and legacy widget variants.

Before editing anything in this folder, read the root docs first, then the relevant module README.

## Current ownership

```text
fourthwall/global/                           Global Fourthwall runtime and production footer loader.
fourthwall/domains/collection/               Collection banner/category page module.
fourthwall/domains/collection/feature-video/ Collection feature video module.
fourthwall/prod_card_media/                  Product-card media manifest.
fourthwall/kwfw-*                            Standard carousel, compatibility, size guide, universal media, and product rules.
fourthwall/kw-product-modal-presentation.*   Shared compact-card visibility and expanded-modal presentation.
```

## Global runtime

See `fourthwall/global/README.md`.

Global runtime work should usually happen in `fourthwall/global/` or the owning `fourthwall/kwfw-*` / `fourthwall/kw-product-*` file loaded by the global loader.

## Product/widget runtime

Active product/widget systems include:

```text
kwfw-carousel.css
kwfw-carousel.js
kwfw-carousel-desktop-grid.css
kwfw-carousel-wheel-bridge.js
kwfw-font-agencyfb.css
kwfw-modal-product-fix.css
kwfw-modal-product-fix.js
kw-product-modal-presentation.css
kw-product-modal-presentation.js
kwfw-size-guide.css
kwfw-size-guide.js
kwfw-universal-media.css
kwfw-universal-media.js
kwfw-product-rules.css
kwfw-product-rules.js
prod_card_media/manifest.json
prod_card_media/README.md
```

`kwfw-modal-product-fix.*` is the shared expanded-modal compatibility owner for standard `kwfw` and Step 3 `kwpj`. It handles live Fourthwall pricing, Add to Cart styling, selected-variant gallery filtering, and standard-only option presentation without owning rail or wheel behavior.

`kw-product-modal-presentation.*` owns shared visual/title presentation. It standardizes black modal surfaces, gallery caps, AgencyFB typography, arrows, dots, mobile spacing, clean modal titles, and linked Collection Domain subtitles. It also suppresses product titles and collection subtitles on compact `kwfw` and `kwpj` tiles so identity information appears only after the product window is expanded. It maintains the controlled Collection Domain registry and must not take ownership of variant resolution, price resolution, cart requests, or selected-gallery logic.

`kwfw-universal-media.*` owns appended support media and preserves the standard product description inside `.kwfw-panel-info`. The retired full-width `.kwfw-desc-wide` treatment must not be reintroduced.

Legacy/experimental carousel variants are present in this folder. Do not use or edit them unless the task explicitly targets them or they are revalidated.

## Page/domain modules

Active documented modules:

```text
domains/collection/
domains/collection/feature-video/
```

Each module should use a small Fourthwall snippet that loads a GitHub/jsDelivr loader from a pinned commit.

## Fourthwall boundary

Fourthwall may still contain custom sections that are not represented in this repo. If a live page element is not documented in the root docs or a module README, assume it may still live directly in Fourthwall until audited.

## Media boundary

Native product and variant media returned by the Fourthwall product API can remain Fourthwall-hosted. All other site media used by this repo should be on the Knight Witch DigitalOcean CDN unless a documented exception exists.

## Update protocol

1. Edit the owning GitHub file, not the Fourthwall footer, unless the task is snippet placement.
2. Use pinned commits for production snippets.
3. Bump both jsDelivr `?v=` and `data-version` when cache invalidation is needed.
4. Update the required root docs and history files when required by `/OPERATING_CONTRACT.md`.
