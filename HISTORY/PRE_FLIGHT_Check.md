# Pre-Flight Check Log

This file is the rolling pre-flight log for the Knight Witch site/widgets repo.

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
- Backfill architecture, style keys, master log, changelog, pre-flight, and diff records.
- Make no runtime changes.

Validation:
- Documentation-only pass.
- No live Fourthwall testing performed.
