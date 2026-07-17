# Changelog

Canonical repo-wide changelog. Module changelogs may remain, but they do not replace this file.

## 2026-07-17 21:19 UTC — KW-RUNTIME-PRODUCT-MODALS-008

Summary: Corrected expanded product modal pricing for both the standard `kwfw` carousel and the Step 3 `kwpj` base-jacket carousel. The shared modal runtime now reads Fourthwall Storefront API `variant.unitPrice.value` and its currency without inventing or scaling placeholder values. It also restores the orange glowing Add to Cart CTA in the Step 3 jacket modal.

Affected files: /fourthwall/kwfw-modal-product-fix.css; /fourthwall/kwfw-modal-product-fix.js; /fourthwall/global/kw-fourthwall-loader.js; /HISTORY/PRE_FLIGHT_Check.md; /HISTORY/CHANGELOG.md; /HISTORY/DIFFS/2026-07-17-product-modal-prices-2.md.

Commits: e4cb9d63a9c5e91d0acf006ab7a2acaad637a5a2; 05945c729bca2dec9e03bd76b583278dd8252185; 63ef5483c10dd2fc803be180faec584d84dbecc6.

Reason: Both carousel implementations were reading `variant.price`, while Fourthwall documents the live selling price on collection/product variants as `unitPrice.value`. The earlier compatibility runtime only targeted `kwfw` panels and did not initialize when the added DOM node was itself the modal panel. The Step 3 modal also lived outside `.kwpj-carousel`, so its inherited orange CSS variables were unavailable.

Rollback: Revert the listed runtime commits and restore loader commit `7db18a8ddae88d5c6dd0880014f1a07b54277761` with cache key `20260717-modal-product-fix-1`.

Production candidate: Global loader commit `63ef5483c10dd2fc803be180faec584d84dbecc6` with cache key `20260717-product-modal-prices-2`.

Validation: JavaScript passed `node --check`. Reviewed both modal implementations, their actual modal/product object ownership, Fourthwall’s official Storefront API product schema, the global loader order, and scoped CTA selectors. No carousel scroll files were changed. Live storefront verification remains required.

Risks: The compatibility runtime performs a single cached official product-by-slug request only when the collection product object does not already expose a usable `unitPrice`. It does not fabricate a fallback price.

## 2026-07-17 20:45 UTC — KW-RUNTIME-MODAL-PRODUCT-007

Summary: Added a modal-only product fix for expanded carousel product listings. The fix restores visible API-derived modal prices and forces the expanded modal Add to Cart button back to the orange glowing/pulsing CTA style without touching carousel scroll behavior.

Affected files: /fourthwall/kwfw-modal-product-fix.css; /fourthwall/kwfw-modal-product-fix.js; /fourthwall/global/kw-fourthwall-loader.js; /HISTORY/PRE_FLIGHT_Check.md; /HISTORY/CHANGELOG.md; /HISTORY/DIFFS/2026-07-17-modal-product-fix.md.

Commits: 335a0f92ea0d5b1302ddef7336745aee0f38b10e; 0ec1c1c6d59f348781ff78b889ce8678dec12f10; 7db18a8ddae88d5c6dd0880014f1a07b54277761; 24384bc7dffe9c780b43f89d5ac93ac22692d8ca.

Reason: Expanded product modal prices were blank because the existing modal price helper did not cover all live Fourthwall product/variant price field shapes. The modal Add to Cart button was too low contrast in expanded view.

Rollback: Revert the listed runtime commits or remove `kwfw-modal-product-fix.css` and `kwfw-modal-product-fix.js` from the global loader. Use the previous production footer if immediate rollback is needed.

Production snippet: Use global loader commit `7db18a8ddae88d5c6dd0880014f1a07b54277761` with cache key `20260717-modal-product-fix-1`.

Validation: Inspected global loader order, carousel CSS/JS, product rules JS, and modal ownership. The JS helper only writes a price when it resolves one from the live `modal._product` API object or selected variant. No placeholder price is inserted. No live storefront testing performed in this session.

Risks: Product data shape may still expose an undocumented field not covered by the helper. If a modal still has no price, inspect `modal._product` in DevTools and add that field path.

## 2026-07-07 10:05 UTC — KW-DOC-GLOBAL-README-006

Summary: Reconciled global runtime documentation with current root docs, current loader behavior, current production footer state, and current temporary title-bar hotfix state. Updated the parent Fourthwall README media boundary and inventory, the global module changelog, MASTER, pre-flight, and diff record.

Affected files: /fourthwall/global/README.md; /fourthwall/global/CHANGELOG.md; /fourthwall/README.md; /MASTER.md; /HISTORY/CHANGELOG.md; /HISTORY/PRE_FLIGHT_Check.md; /HISTORY/DIFFS/2026-07-07-global-readme.md.

Commits: 58d4c6a9dfa22f0aaaaba4af97f567f57777fae0; 605bdd283f87c8c3353c36cd9c6fdb29fb1c8e47; 4ee081dc07fbf86a8eddab10415d036fe114b920; 84850a0feb9cc454c028f659f39715a85d097aaf; 6a440708d2d708b5b4ae2a1da34db415d81b1d94; b84694c76b48af3fcea56ac36ec8fb4b7304fb27; e0cad86c8e4757671dae70b5181a97ee80a3616a; 5749d85b22dee99ab6fe2f43259c73165cdfa8d5; 749cff3d8cf1ab4878bfd14f54e9c7f7a6a098ea.

Reason: The global runtime README still referenced older pinned states and could mislead future global/footer work.

Rollback: Revert the listed commits. Runtime behavior should not change.

Validation: Read root docs, module docs, current global loader, global config, header runtime, background video runtime, cart runtime, title-bar docs, and global module changelog. Updated docs only. No live storefront testing performed.

Risks: Title-bar hotfix remains temporary; title-bar CSS/JS still float from main; info sections still load from kw-info-accordion-dev; remaining live Fourthwall custom sections still need audit.

## 2026-07-07 09:42 UTC — KW-DOC-PROD-MEDIA-005

Summary: Created product media folder README and updated related project history. Commits: 196751d10f09818e2c9c73526777716f7f2cdc18; a6094356c78c4298d2d4619ef4d59683c3b0f624. Runtime impact: none.

## 2026-07-07 09:28 UTC — KW-DOC-FEATURE-MODULE-004

Summary: Created Collection feature module README and updated related project history. Commits: eaa6b71124229ff8384d8af9b93e7d7ee1b83d5d; 9ad8978d3baee5e8019756bca28c7c0571ccf14b. Runtime impact: none.

## 2026-07-07 09:12 UTC — KW-DOC-MEDIA-003

Summary: Added MEDIA.md, linked it from README, and aligned STYLE_KEYS with the stricter media boundary. Commits: 6ffc9cd252dd5ef44cf6597881e09fe09256a8dc; d3c0572b5ed7b3130318d3f1370e5e6ff27190e2; 93273235d4609a2c475a0b22f9568ef647f0cb9a; ea6b6e65ddc7668d0fefc5a01b139514873e9e86. Runtime impact: none.

## 2026-07-07 08:54 UTC — KW-DOC-MAP-002

Summary: Expanded the repo/site documentation map for GitHub-hosted systems, modules, styles, live systems, risks, and cleanup tasks. See HISTORY/DIFFS/2026-07-07-doc-map.md for details. Runtime impact: none.

## 2026-07-07 08:32 UTC — KW-DOC-BOOTSTRAP-001

Summary: Created the root documentation system and initial repo map. See HISTORY/DIFFS/2026-07-07-doc-bootstrap.md for details. Runtime impact: none.
