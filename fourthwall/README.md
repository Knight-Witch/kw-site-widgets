# Knight Witch Fourthwall Widgets

This folder contains Fourthwall-facing runtime code, global loaders, page/domain modules, product widgets, product support media manifests, and legacy widget variants.

Before editing anything in this folder, read:

1. `/OPERATING_CONTRACT.md`
2. `/ARCHITECTURE.md`
3. `/MASTER.md`
4. `/STYLE_KEYS.md`
5. `/HISTORY/CHANGELOG.md`
6. `/HISTORY/PRE_FLIGHT_Check.md`
7. The relevant module README.

## Current ownership

```text
fourthwall/global/                         Global Fourthwall runtime and production footer loader.
fourthwall/domains/collection/             Collection banner/category page module.
fourthwall/domains/collection/feature-video/ Collection feature video module.
fourthwall/prod_card_media/                Product-card media manifest.
fourthwall/kwfw-*                          Product carousel, size guide, universal media, product rules, and legacy variants.
```

## Global runtime

See:

```text
fourthwall/global/README.md
```

Global runtime work should usually happen in `fourthwall/global/` or the owning `fourthwall/kwfw-*` component file loaded by the global loader.

## Product/widget runtime

Active product/widget systems include:

```text
kwfw-carousel.css
kwfw-carousel.js
kwfw-carousel-desktop-grid.css
kwfw-carousel-wheel-bridge.js
kwfw-font-agencyfb.css
kwfw-size-guide.css
kwfw-size-guide.js
kwfw-universal-media.css
kwfw-universal-media.js
kwfw-product-rules.css
kwfw-product-rules.js
prod_card_media/manifest.json
```

Legacy/experimental carousel variants are present in this folder. Do not use or edit them unless the task explicitly targets them or they are revalidated.

## Page/domain modules

Active documented modules:

```text
domains/collection/
domains/collection/feature-video/
```

Each module should use a small Fourthwall snippet that loads a GitHub/jsDelivr loader from a pinned commit.

## Fourthwall boundary

Fourthwall may still contain hard-coded custom HTML sections that are not represented in this repo. If a live page element is not documented in `/ARCHITECTURE.md`, `/STYLE_KEYS.md`, `/MASTER.md`, or a module README, assume it may still live directly in Fourthwall until audited.

## Media boundary

Native product images may still be hosted by Fourthwall. Product support media, banners, background videos, feature cards, and standalone page videos should use the Knight Witch CDN where practical.

## Update protocol

1. Edit the owning GitHub file, not the Fourthwall footer, unless the task is snippet placement.
2. Use pinned commits for production snippets.
3. Bump both jsDelivr `?v=` and `data-version` when cache invalidation is needed.
4. Update `/ARCHITECTURE.md`, `/STYLE_KEYS.md`, `/MASTER.md`, `/HISTORY/CHANGELOG.md`, `/HISTORY/PRE_FLIGHT_Check.md`, and `/HISTORY/DIFFS/` when required by `/OPERATING_CONTRACT.md`.
