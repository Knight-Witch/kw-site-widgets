# Changelog

Canonical repo-wide changelog. Module changelogs do not replace this file. Earlier detailed entries remain available through Git history and paired records in `/HISTORY/DIFFS/`.

## 2026-07-18 00:25 UTC — KW-RUNTIME-SIZE-GUIDES-011

Summary: Rebuilt product sizing as one global registry and injector. Targeted Size Guide buttons now support standard `kwfw` product modals, Step 3 `kwpj` base-jacket modals, and qualifying native Fourthwall `/products/` pages. The active chart follows the current garment variant, supports US/Metric output, and is not shown for unresolved products.

Affected files:

```text
fourthwall/kwfw-size-guide-data.js
fourthwall/kwfw-size-guide.js
fourthwall/kwfw-size-guide.css
fourthwall/global/kw-fourthwall-loader.js
ARCHITECTURE.md
STYLE_KEYS.md
MASTER.md
fourthwall/global/README.md
fourthwall/global/CHANGELOG.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-07-18-size-guide-registry-1.md
```

Runtime commits:

```text
416cb9dbb1303a53f6837d5f92b04e4d589d42bf
6e97e78432418d4389515da2223b3be69feb2a8a
0367b737e8177bf3f5bf0e4b102d443ba20cbb52
1e5cb24e662a37358d296949e998c4980309a883
```

Reason: The previous size guide used broad category guessing and only injected into the standard carousel. Exact manufacturer/product measurements need a central source that avoids backend HTML on every Fourthwall product.

Initial chart registry:

```text
Neo4ic Zyphr Mantle
Ladies Rocker Vest
Men's Leather Rocker Vest
Ladies Moto Vest
Men's Moto Vest
Men's Hexweave Merc Vest
Men's Blackout Merc Vest
Men's Hooded Vest
Men's Denim Vest
Men's Tactical Vest
Men's Punkass Vest
Men's Black & Red Moto Vest
Men's Classic Leather Moto Vest
```

Rollback: Restore loader commit `8ef32a18b59ef932c9b5364ca3e37c72183d5c3e` with cache key `20260717-variant-gallery-2`.

Production candidate: Loader commit `1e5cb24e662a37358d296949e998c4980309a883`, cache key `20260717-size-guide-registry-1`.

Validation: Both new JavaScript files passed `node --check`. Registry data loads before the size-guide runtime. Buttons only appear after exact registry resolution. No carousel wheel, grid, card-size, price, CTA, or variant-gallery code changed.

Risks/follow-up: Native Fourthwall Add to Cart placement and exact aliases require live verification. Punkass 8X and Black & Red Moto rows below brand size 42 were obscured and were not fabricated.

## 2026-07-17 23:58 UTC — KW-RUNTIME-VARIANT-GALLERIES-010

Summary: Corrected variant gallery switching after the detail response caused every dropdown selection to fall back to the first variant.

Affected runtime files: `fourthwall/kwfw-modal-product-fix.js`; `fourthwall/global/kw-fourthwall-loader.js`.

Commits: `8c10091152888eb446b4d215cc837507354e6c91`; `8ef32a18b59ef932c9b5364ca3e37c72183d5c3e`.

Reason: `modal._product` was being replaced by a differently shaped product-detail payload. The corrected runtime preserves the original collection-product object, stores detail data separately, normalizes option matching, and maps detail media by variant ID.

Rollback: Loader commit `26760b14a2676316be45e76df034638ae0990379`, cache key `20260717-variant-gallery-1`.

Validation: JavaScript passed `node --check`; focused matching tests covered ladies, mens/no-collar, and mens/detachable-collar values. No carousel scroll/layout files changed.

## 2026-07-17 23:38 UTC — KW-RUNTIME-VARIANT-GALLERIES-009

Summary: Added selected-variant media switching to standard and Step 3 product modals using Fourthwall variant media, with product-wide fallback and preserved universal support slides.

Primary commits: `114b4de424a1de30fbaa46501a03c91a6d10fbd9`; `26760b14a2676316be45e76df034638ae0990379`.

Rollback: Loader commit `63ef5483c10dd2fc803be180faec584d84dbecc6`, cache key `20260717-product-modal-prices-2`.

Validation: JavaScript passed `node --check`; no carousel wheel/grid/card-size files changed.

## 2026-07-17 21:19 UTC — KW-RUNTIME-PRODUCT-MODALS-008

Summary: Corrected real Fourthwall modal prices in both carousel systems and restored the Step 3 orange glowing Add to Cart CTA.

Commits: `e4cb9d63a9c5e91d0acf006ab7a2acaad637a5a2`; `05945c729bca2dec9e03bd76b583278dd8252185`; `63ef5483c10dd2fc803be180faec584d84dbecc6`.

Reason: The original helpers omitted Fourthwall `variant.unitPrice`, and the body-level Step 3 modal did not inherit carousel-scoped orange values.

Rollback: Loader commit `7db18a8ddae88d5c6dd0880014f1a07b54277761`, cache key `20260717-modal-product-fix-1`.

## 2026-07-17 20:45 UTC — KW-RUNTIME-MODAL-PRODUCT-007

Summary: Added the initial modal-only price and Add to Cart compatibility layer.

Commits: `335a0f92ea0d5b1302ddef7336745aee0f38b10e`; `0ec1c1c6d59f348781ff78b889ce8678dec12f10`; `7db18a8ddae88d5c6dd0880014f1a07b54277761`.

Validation: The helper only wrote API-derived prices and did not insert placeholders.

## Documentation bootstrap and module mapping — 2026-07-07

The repository operating contract, root documentation system, media boundary, module READMEs, global runtime map, product-media documentation, Collection feature module documentation, and paired diff/history system were established during the July 7 documentation pass. Detailed commit lists remain in Git history and the corresponding `/HISTORY/DIFFS/` records.
