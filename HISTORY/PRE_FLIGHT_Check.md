# Pre-Flight Check Log

This file is the rolling pre-flight log for the Knight Witch site/widgets repo.

## 2026-07-17 23:58 UTC — PF-20260717-010 — Variant gallery selection correction

Requested change:
- Fix variant-specific modal galleries that narrowed correctly on initial open but continued showing the default variant after the dropdown changed.

Docs/files reviewed:
- `/OPERATING_CONTRACT.md`
- `/ARCHITECTURE.md`
- `/STYLE_KEYS.md`
- `/MASTER.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `/fourthwall/README.md`
- `/fourthwall/global/README.md`
- `/fourthwall/global/CHANGELOG.md`
- `fourthwall/global/kw-fourthwall-loader.js`
- `fourthwall/kwfw-carousel.js`
- `fourthwall/kwfw-modal-product-fix.js`
- `components/kw-plain-jackets/kw-plain-jackets-v2.js` on `kw-product-carousel-refactor`
- Official Fourthwall Storefront API variant schema.

Risk notes:
- The dropdowns are created from collection-product variants, but the previous compatibility runtime later replaced `modal._product` with a product-detail response.
- Exact option matching can fail when collection and detail payloads use different option-key casing, naming, or description-only representations.
- Replacing `modal._product` also risks changing the source used by the original Add to Cart variant resolver.
- No carousel rail, wheel, grid, card-size, or scroll code should change.

Plan:
- Preserve the original collection-product object on `modal._product`.
- Store product-detail data separately.
- Resolve the selected variant against the original variant set that built the dropdown.
- Match detailed variant media back by stable variant ID.
- Add normalized exact-key matching plus attribute-value, description, and variant-name fallback matching.
- Bump the global loader cache key.

Validation:
- JavaScript passed `node --check`.
- Focused matcher tests resolved ladies, mens/no-collar, and mens/detachable-collar variants.
- Tests covered mismatched option-key casing and description-only variants.
- Confirmed `modal._product` is no longer overwritten.
- No scroll or layout files changed.
- Live storefront verification remains required.

## 2026-07-17 23:38 UTC — PF-20260717-009 — Variant-specific product modal galleries

Requested change:
- Update both the standard `kwfw` product modal and the Step 3 `kwpj` jacket modal so selecting a product variant switches the gallery to that variant's assigned Fourthwall images.
- Preserve product-wide gallery fallback when a variant has no dedicated images.

Docs/files reviewed:
- `/OPERATING_CONTRACT.md`
- `/ARCHITECTURE.md`
- `/STYLE_KEYS.md`
- `/MASTER.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `/fourthwall/README.md`
- `/fourthwall/global/README.md`
- `/fourthwall/global/CHANGELOG.md`
- `fourthwall/global/kw-fourthwall-loader.js`
- `fourthwall/kwfw-carousel.js`
- `fourthwall/kwfw-universal-media.js`
- `fourthwall/kwfw-product-rules.js`
- `fourthwall/kwfw-modal-product-fix.js`
- `components/kw-plain-jackets/kw-plain-jackets-v2.js` on `kw-product-carousel-refactor`
- Official Fourthwall Storefront API collection/product documentation.

Risk notes:
- The two modal systems use separate gallery, dot, and option-selector namespaces.
- The standard modal also receives shared support media from `kwfw-universal-media.js`; variant filtering must preserve those common slides without restoring unrelated product images.
- The Cyberpunk collar selector can set the active variant through `data-kwfw-rule-variant-id` rather than only through visible native selects.
- Rebuilding gallery children can trigger existing MutationObservers, so the runtime needs an idempotent gallery key to prevent loops.
- No carousel rail, wheel, layout, or scroll code should change.

Plan:
- Extend the existing shared modal compatibility runtime rather than add another observer/runtime.
- Resolve the active variant from each modal's current selectors or rule-selected variant ID.
- Read the official Fourthwall `variant.images` array, rebuild the existing gallery and dots, and reset to slide zero.
- Fall back to product-level media only when the selected variant has no dedicated media.
- Fetch the official product-by-slug endpoint once per modal opening so full variant media is available when the collection payload is incomplete.
- Preserve standard-modal universal support slides.

Validation:
- Confirmed Fourthwall's official Storefront API schema exposes an `images` array on each product variant.
- JavaScript passed `node --check` before commit.
- Confirmed selectors cover both `.kwfw-*` and `.kwpj-*` modal systems.
- Confirmed no scroll, rail, grid, or card-layout files were changed.
- Live storefront verification remains required.

## 2026-07-17 21:19 UTC — PF-20260717-008 — Dual-carousel product modal audit

Requested change:
- Fix missing expanded-modal prices in both the standard `kwfw` carousel and the Step 3 `kwpj` base-jacket carousel.
- Restore the visible orange glowing Add to Cart CTA specifically in the Step 3 jacket modal.

Docs/files reviewed:
- `/ARCHITECTURE.md`
- `/STYLE_KEYS.md`
- `/MASTER.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `/fourthwall/README.md`
- `/fourthwall/global/README.md`
- `/fourthwall/global/CHANGELOG.md`
- `/components/kw-title-bars/README.md`
- `fourthwall/global/kw-fourthwall-loader.js`
- `fourthwall/kwfw-carousel.css`
- `fourthwall/kwfw-carousel.js`
- `fourthwall/kwfw-modal-product-fix.css`
- `fourthwall/kwfw-modal-product-fix.js`
- `components/kw-plain-jackets/kw-plain-jackets.css`
- `components/kw-plain-jackets/kw-plain-jackets-v2.js`
- `components/kw-plain-jackets/kw-plain-jackets-polish.css`
- `components/kw-plain-jackets/kw-plain-jackets-polish.js`
- Fourthwall official Storefront API collection/product documentation.

Risk notes:
- The two carousel systems use separate modal class namespaces and separate option selectors.
- The Step 3 modal is appended to `body`, outside `.kwpj-carousel`, so carousel-scoped CSS custom properties do not inherit into the modal.
- Both original carousel price helpers omit Fourthwall's documented `variant.unitPrice` field.
- The previous compatibility runtime only scanned descendants and therefore missed an added node when that node was itself the modal panel.
- No carousel rail, wheel, layout, or scroll behavior should be touched.

Plan:
- Expand the existing modal compatibility CSS to target both `[data-kwfw-add]` and `[data-kwpj-add]` with explicit values rather than inherited jacket-carousel variables.
- Replace the modal compatibility runtime with a dual-system implementation that reads `unitPrice.value` and `unitPrice.currency` directly from the Fourthwall API product/variant object.
- Update prices on initial modal render and variant-selection changes.
- Request the official product-by-slug endpoint only when the collection product object lacks a usable price.
- Do not insert a placeholder price.

Validation:
- JavaScript passed `node --check`.
- Confirmed the official Fourthwall collection schema exposes variant selling prices as `unitPrice: { value, currency }`.
- Confirmed both modal implementations assign the active product object to `modal._product`.
- Confirmed the CSS selectors affect only modal Add to Cart buttons and price elements.
- No scroll files were changed.
- Live storefront verification remains required.

## 2026-07-17 20:45 UTC — PF-20260717-007 — Product modal price and CTA fix

Requested change:
- Fix expanded carousel product modal where Add to Cart was visually too low-contrast and modal prices were missing.

Docs/files reviewed:
- `/ARCHITECTURE.md`
- `/STYLE_KEYS.md`
- `/MASTER.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `/fourthwall/README.md`
- `/fourthwall/global/README.md`
- `/fourthwall/global/CHANGELOG.md`
- `/components/kw-title-bars/README.md`
- `fourthwall/global/kw-fourthwall-loader.js`
- `fourthwall/kwfw-carousel.css`
- `fourthwall/kwfw-carousel.js`
- `fourthwall/kwfw-product-rules.js`

Risk notes:
- Modal price rendering came from API product/variant objects and could be blank if price fields use keys not covered by the original carousel helper.
- The modal CTA shared `.kwfw-btn` with other carousel buttons, so the visual fix needed to target only `[data-kwfw-add]` inside `.kwfw-panel`.
- No carousel scroll changes should be included in this fix.

Plan:
- Add a modal-only CSS fix for Add to Cart visibility/glow and modal price visibility.
- Add a modal-only JS helper that reads the live `modal._product` API object and selected variant data, then fills `.kwfw-panel-price` only when a real API-derived price can be resolved.
- Load both helpers after product rules in the global loader.

Validation:
- Confirmed loader order and product modal ownership.
- Confirmed the patch does not create placeholder prices.
- No live storefront testing performed in this session.

## 2026-07-07 10:05 UTC — PF-20260707-006 — Global README reconciliation

Requested change:
- Reconcile `/fourthwall/global/README.md` with current root docs, current loader behavior, and current known production footer state.

Docs/files reviewed:
- `/OPERATING_CONTRACT.md`
- `/README.md`
- `/ARCHITECTURE.md`
- `/STYLE_KEYS.md`
- `/MEDIA.md`
- `/MASTER.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `/fourthwall/README.md`
- `/fourthwall/global/README.md`
- `/fourthwall/global/CHANGELOG.md`
- `/components/kw-title-bars/README.md`
- `/fourthwall/global/kw-fourthwall-loader.js`
- `/fourthwall/global/kw-global-config.js`
- `/fourthwall/global/kw-header.js`
- `/fourthwall/global/kw-background-video.js`
- `/fourthwall/global/kw-cart-runtime.js`

Risk notes:
- Existing global README had stale production footer commit/cache notes.
- `/MASTER.md` is the current production snippet source.
- Title-bar files still float from `main` in the global loader.
- The title-bar hotfix remains temporary.
- Info sections still load from `kw-info-accordion-dev`.
- Documentation-only update; no runtime behavior touched.

Plan:
- Replace stale global README content with current module documentation.
- Update parent Fourthwall README for the stricter media boundary.
- Update module changelog, MASTER, root changelog, pre-flight, and diff record.

Validation:
- Confirmed loader behavior from the current global loader and production-pinned ref.
- Confirmed global config CDN/social/background assets.
- Confirmed header/nav behavior from current runtime.
- No runtime CSS/JS changed.
- No live storefront testing performed.

## 2026-07-07 09:42 UTC — PF-20260707-005 — Product media folder README

Requested change:
- Create local documentation for `fourthwall/prod_card_media/`.

Docs/files reviewed:
- Root documentation files.
- `fourthwall/prod_card_media/manifest.json`.

Risk notes:
- Documentation-only update.
- Manifest was read, not changed.

Plan:
- Create the README.
- Update master, changelog, pre-flight, and diff records.

Validation:
- Target README was missing before creation.
- README was created successfully.
- No runtime files changed.

## 2026-07-07 09:28 UTC — PF-20260707-004 — Collection feature module README

Requested change:
- Create `/fourthwall/domains/collection/feature-video/README.md` to fix the broken module-doc link from `/README.md`.

Docs/files reviewed:
- `/OPERATING_CONTRACT.md`
- `/ARCHITECTURE.md`
- `/STYLE_KEYS.md`
- `/MASTER.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `/README.md`
- `/fourthwall/domains/collection/feature-video/`

Risk notes:
- Previous attempts to create this README were blocked, so the content was kept concise and module-specific.
- Documentation-only update.
- No runtime behavior touched.

Plan:
- Confirm the target file is missing.
- Create the module README.
- Update `/MASTER.md`, changelog, pre-flight, and diff records.

Validation:
- Confirmed the target file returned 404 before creation.
- Created the README successfully.
- No runtime CSS/JS changed.

## 2026-07-07 09:12 UTC — PF-20260707-003 — Media boundary clarification

Requested change:
- Clarify media-hosting policy: native product media can remain on Fourthwall; all other site media used by this repo is on the Knight Witch CDN unless a documented exception exists.

Docs/files reviewed:
- `/README.md`
- `/STYLE_KEYS.md`
- `/MEDIA.md`
- `/HISTORY/CHANGELOG.md`

Risk notes:
- Documentation-only update.
- No runtime behavior touched.

Plan:
- Update `/MEDIA.md`, `/README.md`, `/STYLE_KEYS.md`, changelog, and diff record.

Validation:
- Confirmed docs now state the stricter product API/native media vs CDN boundary.

## 2026-07-07 08:54 UTC — PF-20260707-002 — Deep website documentation map

Requested change:
- Review GitHub-hosted website elements and update the repo docs into a clearer blueprint/map.
- Document GitHub vs Fourthwall ownership boundaries.
- Document media-hosting direction.

Docs/files reviewed:
- Root docs.
- Existing module docs.
- Uploaded `kw-site-widgets-main.zip`.
- `fourthwall/global/`.
- `components/kw-title-bars/`.
- `fourthwall/kwfw-*`.
- `fourthwall/domains/collection/`.
- `gallery-portfolio/`.
- `logo-banner/`.
- `widgets/`.

Risk notes:
- Some live site sections may still be hard-coded in Fourthwall.
- Some module README write attempts were blocked.
- `gallery-portfolio/index.html` references missing `gallery-portfolio.js`.
- Current title-bar hotfix remains temporary.

Plan:
- Update canonical root docs first.
- Add module READMEs where connector allows it.
- Make no runtime CSS/JS changes.

Validation:
- Documentation-only pass.
- No live Fourthwall testing performed.

## 2026-07-07 08:32 UTC — PF-20260707-001 — Documentation bootstrap

Requested change:
- Create the root documentation system required by `/OPERATING_CONTRACT.md`.

Docs/files reviewed:
- `/OPERATING_CONTRACT.md`.
- Existing module docs.
- Uploaded repo ZIP.

Risk notes:
- GitHub search was unreliable, so direct path fetches and the uploaded ZIP were used.
- Older global README production notes were stale relative to current work.
- Title-bar assets floated from `main` while the footer loader was pinned.

Plan:
- Create root docs and placeholder directories.
- Backfill architecture, style, master log, changelog, pre-flight, and diff records.
- Make no runtime changes.

Validation:
- Documentation-only pass.
- No live Fourthwall testing performed.
