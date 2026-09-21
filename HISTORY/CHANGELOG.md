# Changelog

## 2026-09-21 07:25 UTC — KW-LICENSE-028

Commit SHAs: `753283224f91eb608ff4416fe049957a646509de` (`LICENSE`), `146d88a0fd4cea68f35d77406ca80e195398c062` (`README.md`).

Summary: Added the Knight Witch Apparel Web Runtime License v1.0 and documented the licensing boundary in the repository README.

Affected files:

```text
LICENSE
README.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
```

Reason: This repository must remain publicly readable for the current GitHub/jsDelivr production delivery model, but public visibility should not imply an open-source grant or general reuse right.

Behavior: Official-site browser execution, normal browser caching, and official CDN delivery are expressly permitted. Independent reuse, redistribution, rehosting, derivative deployment, and commercialization remain reserved.

Rollback: Revert the license/README commits if the legal terms are intentionally replaced by a later license. No loader, CDN URL, cache key, Fourthwall snippet, or runtime rollback is required.

Risks/follow-up: If storefront delivery is later moved away from public GitHub/jsDelivr, repository visibility can be reconsidered independently of this license.

Validation: Documentation-only change. No JS, CSS, asset, loader, snippet, cache/version, or production runtime file changed; live Fourthwall validation is not required.

Canonical repo-wide changelog. Module changelogs do not replace this file. Earlier detailed entries remain available through Git history and paired records under `/HISTORY/DIFFS/`.

## 2026-08-27 14:04 UTC — KW-TITLE-BARS-027

Commit SHA: `04f3423268aa8b735d85592fb9b25d3210e37d16`

Summary: Added an optional body area to `.kw-title-bar--section` with any number of individually editable text rows. Existing section bars remain unchanged when the body markup is omitted.

Affected files:

```text
components/kw-title-bars/kw-title-bars.css
components/kw-title-bars/README.md
components/kw-title-bars/examples/fourthwall-title-bars.html
STYLE_KEYS.md
MASTER.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-08-27-1402-section-title-bar-body-rows-04f34232.md
```

Reason: Introductory section bars need to outline several short points without forcing them into a single paragraph or requiring one-off Fourthwall styling.

Behavior:

- Adds an optional `.kw-title-bar__body` grid to the reusable section variant.
- Supports any number of repeated `.kw-title-bar__body-row` elements.
- Gives each row separate centered AgencyFB body styling with responsive type, spacing, tracking, and line height.
- Keeps title, subtitle, width matching, step bars, compact bars, JavaScript, loader order, and existing section bars unchanged.
- Requires no new JavaScript or global-footer resource.

Rollback: Restore `components/kw-title-bars/kw-title-bars.css` from parent commit `dc3dde6348f0a07682b4047c7f49494250e1eb30`. No JavaScript, loader, or Fourthwall snippet rollback is required.

Production URL: `https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@main/components/kw-title-bars/kw-title-bars.css`

Risks/follow-up: Title-bar assets still float from `main`, and the separate pinned hotfix remains active. Live desktop/mobile verification is required with representative short and wrapping body rows.

Validation: `git diff --check` passed, CSS brace counts are balanced, and the new rules are scoped to `.kw-title-bar--section`. Live Fourthwall visual verification remains required.

## 2026-08-27 13:10 UTC — KW-TITLE-BARS-026

Commit SHA: `338f4118005e8749122fdafb3d51bcae8529f07f`

Summary: Added `.kw-title-bar--section`, a reusable solid-black title/subtitle bar matching the supplied Featured Spellweaves presentation. Fourthwall placements require only the shared title-bar HTML markup; no additional footer resource is needed.

Affected files:

```text
components/kw-title-bars/kw-title-bars.css
components/kw-title-bars/kw-title-bars.js
components/kw-title-bars/README.md
components/kw-title-bars/examples/fourthwall-title-bars.html
STYLE_KEYS.md
MASTER.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-08-27-1306-featured-style-section-title-bar-338f4118.md
```

Reason: The Featured Spellweaves title bar remained embedded directly in Fourthwall and could not be reused as simple page markup. The new component variant centralizes that visual treatment in GitHub and supports arbitrary per-placement text.

Behavior:

- Adds the reusable `.kw-title-bar--section` modifier to the existing `.kw-title-bar` component.
- Uses the supplied solid black background, red border, AgencyFB title/subtitle typography, desktop spacing, and mobile spacing/type values.
- Preserves the section variant against conflicting temporary-hotfix declarations without changing step or compact presentation.
- Keeps the existing optional `data-kw-fit` API and makes its desktop inline width outrank the active hotfix's general important width.
- Requires no new JavaScript file, footer loader, loader-order change, cache-key change, or carousel-code change.

Rollback: Restore `components/kw-title-bars/kw-title-bars.css` and `components/kw-title-bars/kw-title-bars.js` from parent commit `631b36b2b16c4a23709f691e50b65b90f70f86f5`. No Fourthwall snippet rollback is required.

Production URLs:

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@main/components/kw-title-bars/kw-title-bars.css
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@main/components/kw-title-bars/kw-title-bars.js
```

Risks/follow-up: Title-bar assets still float from `main`, and the separate pinned hotfix remains active. The original Featured Spellweaves inline Fourthwall block remains in place and was not migrated in this update. Folding the hotfix into the base/global-loader architecture remains pending.

Validation: `node --check` and `git diff --check` passed. Source values were compared directly against the supplied Featured Spellweaves CSS. Local rendered QA was blocked by an unavailable browser binary and a timed-out download; live Fourthwall visual verification remains required.

## 2026-08-27 06:53 UTC — KW-TITLE-BARS-025

Commit SHA: `1a87d806d05b1bb8dd32cdc3280a3408a33fc756`

Summary: Added a 95%-opaque black background inside the red border of `.kw-title-bar--step` containers. Base and compact title-bar variants remain transparent.

Affected files:

```text
components/kw-title-bars/kw-title-bars.css
components/kw-title-bars/kw-title-bars-hotfix.css
components/kw-title-bars/README.md
STYLE_KEYS.md
MASTER.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-08-27-0651-step-title-bar-black-fill-1a87d806.md
```

Reason: The transparent step bars allowed the page background to show fully through the bordered title area. The requested treatment keeps only 5% transparency while preserving the existing layout and red border.

Behavior:

- Applies `rgba(0, 0, 0, .95)` only to `.kw-title-bar--step`.
- Uses the combined `.kw-title-bar.kw-title-bar--step` selector with `!important` so the base rule beats the active hotfix's general transparent-background declaration.
- Mirrors the step rule in the hotfix source for compatibility parity.
- Leaves dimensions, margins, padding, typography, borders, responsive sizing, JavaScript, and non-step title-bar backgrounds unchanged.

Rollback: Restore both title-bar stylesheets from parent commit `c29c146b818e62c8c405e2b93a7c28127a1e14c0`. No loader, snippet, or cache-key rollback is required.

Production URL: `https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@main/components/kw-title-bars/kw-title-bars.css`

Risks/follow-up: The title-bar base assets still float from `main`, and the separate pinned hotfix remains active. Folding the hotfix into the base/global-loader architecture remains pending.

Validation: `git diff --check` passed. The updated rule was retrieved from jsDelivr using the current loader cache query, and selector specificity was checked against the active hotfix. Live Fourthwall visual verification remains required.

## 2026-07-19 01:10 UTC — KW-RUNTIME-COMPACT-CARDS-024

Summary: Removed product-title and Collection Domain text from all compact active carousel tiles. Standard `kwfw` and Step 3 `kwpj` tiles remain image-led with their existing View & Add to Cart action; product identity and collection subtitle remain in the expanded modal only.

Affected files:

```text
fourthwall/kw-product-modal-presentation.css
fourthwall/global/kw-fourthwall-loader.js
ARCHITECTURE.md
STYLE_KEYS.md
MASTER.md
fourthwall/README.md
fourthwall/global/README.md
fourthwall/global/CHANGELOG.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-07-19-compact-card-media-only-1.md
```

Runtime commits:

```text
5340614e27eec89244f15b0fe8aaa80605b455c4
4e93f2dfefb50e6e84de61d4b45ab5dab2438b2a
```

Reason: The compact tiles are intended to function as image-led launch points. Product titles and Collection Domain subtitles add visual noise and should be shown only after the customer opens the product window.

Behavior:

- Hides `.kwfw-card-title` on standard compact tiles.
- Hides `.kw-product-card-collection-link` on compact tiles, including links left by an older editor script instance.
- Keeps `.kwpj-name` hidden on Step 3 compact tiles with a defensive global rule.
- Leaves `.kwfw-panel-title`, `.kwpj-panel-title`, and `.kw-product-collection-link` visible in expanded modals.
- Leaves media, CTA, price, variant, gallery, Size Guide, cart, rail, grid, and wheel behavior unchanged.

Rollback: Restore loader commit `08c4dca8bf833d283cedfeb471f29bd2741a70cc` with cache key `20260718-featured-card-collections-2`.

Production candidate: Loader commit `4e93f2dfefb50e6e84de61d4b45ab5dab2438b2a`, cache key `20260719-compact-card-media-only-1`.

Validation: Final CSS suppression appears after all prior compact-title and card-subtitle display declarations and uses namespace-scoped `display:none!important`. Expanded modal classes are separate and were not targeted. No JavaScript or Step 3 branch source changed. Live verification remains required across standard/Step 3 desktop and mobile cards.

## 2026-07-19 00:35 UTC — KW-RUNTIME-FEATURED-COLLECTIONS-023

Summary: Added a controlled six-collection registry and per-product collection membership resolution for standard featured products and expanded modals. Mixed homepage carousels resolve products independently rather than inheriting the visible carousel handle.

Affected files:

```text
fourthwall/kw-product-modal-presentation.css
fourthwall/kw-product-modal-presentation.js
fourthwall/global/kw-fourwall-loader.js
ARCHITECTURE.md
STYLE_KEYS.md
MASTER.md
fourthwall/README.md
fourthwall/global/README.md
fourthwall/global/CHANGELOG.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-07-19-featured-card-collections-2.md
```

Runtime commits:

```text
7a90ba867318e0491ea60d64fd4c450798231de6
8aa3cc5eb05f286370a85b6c3c365d3cfb9e451e
b5769ac1044197e4ca0c88409b62ecbc0f5abc8e
08c4dca8bf833d283cedfeb471f29bd2741a70cc
```

Controlled display pairs:

```text
Cyberpunk 2077 <-> Edgerunners Collection
Eat. Sleep. Rave. Repeat. <-> Basscraft Collection
Snakes Skulls & Sin <-> Wicked Hearts Collection
All Things Fantasy <-> Astral Plane Collection
Sci-fi & Beyond <-> Black Mass Collection
Mystics Zodiacs & Vibes <-> Starchild Collection
```

## 2026-07-18 23:58 UTC — KW-RUNTIME-MODAL-PRESENTATION-022

Added one shared presentation layer for standard `kwfw` and Step 3 `kwpj` expanded product windows. Both now share black surfaces, desktop gallery geometry, AgencyFB typography, controls, transparent navigation, mobile spacing, clean product titles, and linked collection subtitles.

Runtime commits:

```text
91ad6c2b3dd51b72507c95b5f93453ae80a5d512
c1e708b95ee19da4291d3dc7ee37f39d5c33fae8
3bf1285653188743c082de2a2a4584d70100d81e
d5dbd4e43cab008b6869439afab14e85109ba77f
e9404864ba58ab7daee8e771894d2c374a5f8fc3
```

## 2026-07-18 22:05 UTC — KW-RUNTIME-STEP3-GALLERY-021

Top-aligned Step 3 jacket modal gallery media inside the existing fixed viewport without changing gallery dimensions, variants, prices, cart controls, Size Guide, or scrolling. Superseded by the unified presentation layer.

Runtime commits: `76d116c4283c654d3bc3f9ba4b6030782fb43b95`; `e0a3259a41624d7e45ebb74a145d888a76246410`.

## 2026-07-18 21:20 UTC — KW-RUNTIME-STANDARD-MODAL-020

Returned standard product descriptions to the right information column, presented `Description` as `Size & Style Variant`, and added stable product-specific select widths based on the longest option.

Runtime commits: `59fba0ff65f137f3bf5c1e5835f4f6ea18201965`; `9d2cb7e61fca4d27b32035f8aff8bf59833d6f87`; `a721343eaa347a0ae3d49e2a3c468705d90727fa`; `87805c95bceb8b0060273857fe8120de28273af4`; `4bc31f2f1c2dd6253625391a45d11c9786e93f06`.

## 2026-07-18 20:40 UTC — KW-RUNTIME-SIZE-GUIDES-019

Added legacy-row-compatible Featured Size Guide alignment, AgencyFB size-chart titles, content-driven chart widths, and tighter mobile table spacing.

Runtime commits: `f28f4ae79bca76ba40c26ec91d5e326eaf7d8098`; `aa8ad96cb30ddfcff156be0785846040633aea3d`.

## 2026-07-18 05:30 UTC — KW-RUNTIME-SIZE-GUIDES-018

Restored Featured quantity-box injection, preserved Step 3 field-level geometry, corrected Samurai vest routing, and added product-scoped Vegan/Genuine unisex Samurai Moto charts.

Runtime commits: `e04c39dd4dafcf7f33ff10cfb2e792e32a972623`; `32c872f7d081e095133301132743f7c4498b23d3`; `68e06910b03a489fe3a61820b5fc2b07b79494be`; `8666ed87f3e7a84ddebbbf1f7e3d45b25d1054c0`.

## 2026-07-18 04:25 UTC — KW-RUNTIME-SIZE-GUIDES-015

Corrected Step 3 quantity overlap with explicit internal geometry. Step 3 was verified fixed.

## 2026-07-18 03:25 UTC — KW-RUNTIME-SIZE-GUIDES-013

Corrected ladies chart identities and added exact Crop-Top Rocker/Snakeskin, Goth Merc, Punkass, and Biker mappings. Removed the unverified generic ladies moto mapping.

## 2026-07-17 — Product modal compatibility

Added real Fourthwall prices, restored modal Add to Cart styling, introduced selected-variant galleries, and corrected collection/detail variant matching. Detailed records remain in Git history and `/HISTORY/DIFFS/`.
