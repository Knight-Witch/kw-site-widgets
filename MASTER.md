# Master Project Log

This is the project source bible for the Knight Witch site/widgets repo. It tracks live systems, tasks, bugs, risks, snippets, hard-coded Fourthwall unknowns, cleanup, and decisions.

Read `/OPERATING_CONTRACT.md` before editing this file.

## Current source-of-truth boundary

GitHub owns the runtime code documented here. Fourthwall still owns snippet placement, native product data, native product images, and any hard-coded page sections not represented by GitHub files.

If a live website element is not documented in `/ARCHITECTURE.md`, `/STYLE_KEYS.md`, this file, or a module README, assume it may still be hard-coded in Fourthwall until audited.

Media direction:

- Native product media returned by the Fourthwall product API can remain Fourthwall-hosted.
- All other site media used by this repo is on the Knight Witch DigitalOcean CDN unless a documented exception says otherwise.
- Repo-local assets belong in `/ASSETS/`.

## Current live / production-facing systems

### Global Fourthwall loader

Production-facing footer currently uses:

- Global loader commit: `b7672d41f8a011f47675ef2394b7d99028c90158`
- Global loader cache key: `20260706-title-carousel-spacing-2`
- Entrypoint: `fourthwall/global/kw-fourthwall-loader.js`
- Shop domain: `knightwitchapparel.com`
- Currency: `USD`
- The live storefront value is intentionally not committed to repo docs.

Current global loader URL:

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@b7672d41f8a011f47675ef2394b7d99028c90158/fourthwall/global/kw-fourthwall-loader.js?v=20260706-title-carousel-spacing-2
```

### Temporary title-bar hotfix

Production footer also currently uses a temporary title-bar hotfix loader:

- Hotfix commit: `663b046d1dcb77b86a06ee1af427af2a5b0821dc`
- Cache key: `20260706-titlebar-hotfix-1`
- Entrypoint: `components/kw-title-bars/kw-title-bars-hotfix-loader.js`

Hotfix URL:

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@663b046d1dcb77b86a06ee1af427af2a5b0821dc/components/kw-title-bars/kw-title-bars-hotfix-loader.js?v=20260706-titlebar-hotfix-1
```

Status: temporary production hotfix.

Required follow-up: fold this into the title-bar component/global loader so the extra footer snippet can be removed.

### Global background video

Owned by:

```text
fourthwall/global/kw-global-config.js
fourthwall/global/kw-background-video.css
fourthwall/global/kw-background-video.js
```

Status: active global system.

### Header/nav

Owned by:

```text
fourthwall/global/kw-header.css
fourthwall/global/kw-header.js
```

Status: active global system.

Top-level items currently injected by the GitHub header runtime:

```text
Home
Gallery
Shop The Collection
Shop The Cauldron
Shop Decor
About
View Cart
```

The detailed nav tree is documented in `/ARCHITECTURE.md`.

### Social icons

Owned by:

```text
fourthwall/global/kw-social-icons.css
fourthwall/global/kw-social-icons.js
fourthwall/global/kw-global-config.js
```

Status: active global system.

### Cart runtime

Owned by:

```text
fourthwall/global/kw-cart-runtime.css
fourthwall/global/kw-cart-runtime.js
```

Status: active global system.

Purpose: empty-cart modal/redirect guard and cart count/item checks.

### Product carousel

Owned by:

```text
fourthwall/kwfw-carousel.css
fourthwall/kwfw-carousel.js
fourthwall/kwfw-carousel-desktop-grid.css
fourthwall/kwfw-carousel-wheel-bridge.js
fourthwall/kwfw-font-agencyfb.css
```

Status: active via the global loader.

Current spacing work changed the desktop/mobile carousel pull-up to `-35px` and preserved a tighter title-to-carousel layout.

### Universal product media

Owned by:

```text
fourthwall/kwfw-universal-media.css
fourthwall/kwfw-universal-media.js
fourthwall/prod_card_media/manifest.json
fourthwall/prod_card_media/README.md
```

Status: active via the global loader.

Current manifest asset:

```text
https://knightwitch.nyc3.cdn.digitaloceanspaces.com/GLOBAL/PROD_CARD_MEDIA/feature_card.webp
```

### Product size guide

Owned by:

```text
fourthwall/kwfw-size-guide.css
fourthwall/kwfw-size-guide.js
```

Status: active via the global loader.

Current chart set:

```text
Mantle / Sandevistan
Ladies Moto
Ladies Vest
Men's Moto
Men's Vest
```

### Product rules

Owned by:

```text
fourthwall/kwfw-product-rules.css
fourthwall/kwfw-product-rules.js
```

Status: active via the global loader.

Current special case: Cyberpunk collar variant UI.

### Title bars

Owned by:

```text
components/kw-title-bars/
```

Status: active and currently protected by temporary hotfix.

Known issue: the global loader loads title-bar CSS/JS from floating `main`, creating mismatch risk when the global loader itself is pinned to an older commit.

### Collection domain page

Owned by:

```text
fourthwall/domains/collection/
```

Status: active page/domain module.

The banner/category module was split from the lower feature video.

### Collection feature video

Owned by:

```text
fourthwall/domains/collection/feature-video/
```

Status: active page/drop-in module.

Current feature video asset:

```text
https://knightwitch.nyc3.cdn.digitaloceanspaces.com/domainvideos/ENTER-TCD-V2.webm
```

### Info sections

The global loader currently references `kw-info-accordion-dev` for info-section CSS/JS.

Status: branch-loaded system; inspect the branch before editing.

### Standalone gallery portfolio

Owned by:

```text
gallery-portfolio/
```

Status: standalone/incomplete in audited `main` snapshot.

Risk: `gallery-portfolio/index.html` references `gallery-portfolio.js`, but that file is not present in the audited `main` snapshot.

### Standalone logo banner

Owned by:

```text
logo-banner/logo-banner.js
```

Status: standalone; not documented as global-loader active.

### Legacy FPX carousel

Owned by:

```text
widgets/kw-carousel.css
widgets/kw-carousel.js
```

Status: legacy; not documented as global-loader active.

## Active bugs / risks

1. Title-bar dependencies float from `main` in `kw-fourthwall-loader.js`.
   - Risk: pinned global loader can still pull newer/broken title-bar files.
   - Current mitigation: temporary title-bar hotfix snippet in footer.
   - Required fix: pin or self-ref title-bar assets appropriately and fold hotfix into base component.

2. Legacy carousel loaders and variants remain in the repo.
   - Risk: stale loaders may be mistaken for production entrypoints.
   - Required fix: audit and mark keep/remove/archive decisions.

3. `kw-info-accordion-dev` is branch-loaded from the production global loader.
   - Risk: production depends on a branch ref.
   - Required fix: decide whether to merge/pin/stabilize the info-section system.

4. GitHub code search may be unreliable for this repo.
   - Risk: search may return no results even when files exist.
   - Required mitigation: use direct path fetches or local ZIP audit when necessary.

5. Live frontend storefront value cannot be committed into repo docs.
   - Risk: docs snippets must use placeholders for that value.
   - Required mitigation: keep the live value in Fourthwall/project instructions, not repo files.

6. `gallery-portfolio/index.html` references a missing script.
   - Risk: standalone gallery page will not function fully from current `main` files alone.
   - Required fix: find, restore, rebuild, or remove the missing script reference.

7. Unknown Fourthwall hard-coded sections remain.
   - Risk: docs may not yet represent the whole live website.
   - Required mitigation: audit Fourthwall page custom HTML snippets and add them to GitHub or document them as Fourthwall-owned.

## Completed items

- Created `/OPERATING_CONTRACT.md`.
- Created the root documentation system.
- Expanded repo architecture, style, master, changelog, pre-flight, and diff records.
- Reconciled `/fourthwall/global/README.md` with current production/global runtime docs.
- Clarified `/fourthwall/README.md` media boundary and current product media docs.
- Documented current global loader, active hotfix, title-bar risk, loader order, website element inventory, and media-hosting boundary.
- Split Collection feature video into standalone module.
- Added `/fourthwall/domains/collection/feature-video/README.md`.
- Added `/fourthwall/prod_card_media/README.md`.
- Removed Collection lower feature video from banner module.
- Tightened carousel/title-bar spacing.
- Added temporary title-bar hotfix loader and stylesheet.
- Established current production footer as global loader plus hotfix loader.

## Pending cleanup tasks

1. Fold title-bar hotfix into base component/global loader.
2. Stop title-bar CSS/JS from floating from `main` in the global loader.
3. Audit legacy carousel files and decide keep/remove/archive status.
4. Stabilize or document the `kw-info-accordion-dev` dependency.
5. Resolve or document the missing `gallery-portfolio/gallery-portfolio.js`.
6. Audit remaining Fourthwall hard-coded site sections and either migrate them into GitHub or document them as Fourthwall-owned.
7. Continue backfilling changelog history from recent commits.
8. Expand product media migration notes as CDN-hosted product-support media is added.

## Planned work

- Continue deeper documentation passes for GitHub-hosted website elements.
- Use `/HISTORY/PRE_FLIGHT_Check.md` before future code edits.
- Use `/HISTORY/CHANGELOG.md` and `/HISTORY/DIFFS/` for every GitHub update.
- Keep current production snippets/URLs in this file.
- Move temporary fixes into proper owning modules when verified.
- Keep non-product-API media references on the Knight Witch CDN unless an exception is documented.

## Current production snippets / URLs

Global loader URL:

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@b7672d41f8a011f47675ef2394b7d99028c90158/fourthwall/global/kw-fourthwall-loader.js?v=20260706-title-carousel-spacing-2
```

Temporary title-bar hotfix URL:

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@663b046d1dcb77b86a06ee1af427af2a5b0821dc/components/kw-title-bars/kw-title-bars-hotfix-loader.js?v=20260706-titlebar-hotfix-1
```

Collection banner/category loader URL:

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@ab0ccd97765db5f0318895fe8f8be626e537b211/fourthwall/domains/collection/kw-collection-domain-loader.js?v=20260706-collection-domain-6
```

Collection feature video loader URL:

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@ab0ccd97765db5f0318895fe8f8be626e537b211/fourthwall/domains/collection/feature-video/kw-collection-feature-video-loader.js?v=20260706-collection-feature-video-1
```

## REMOVALS / DECISIONS AGAINST

### Do not rely on `@main` for production Fourthwall snippets

Reason: jsDelivr/Fourthwall cache behavior and floating source changes can produce inconsistent live behavior. Production snippets should use pinned commits unless explicitly testing.

### Do not leave title-bar hotfix as permanent architecture

Reason: the hotfix exists to override a broken/mismatched loader state. It should be folded into the base title-bar/global-loader system and then removed from the footer.

### Do not use legacy carousel loader refs without verification

Reason: prior carousel work produced stale/intermediate loader states, including at least one mutation loop that could freeze the Fourthwall editor. Legacy loaders must be audited before use.

### Do not use `fourthwall/global/CHANGELOG.md` as canonical repo changelog

Reason: it is module-specific. `/HISTORY/CHANGELOG.md` is the canonical repo-wide history.

### Do not assume undocumented live sections are GitHub-owned

Reason: some site sections may still be hard-coded in Fourthwall. GitHub ownership begins only when code/docs for that element exist here or when the Fourthwall snippet points to a GitHub loader documented here.
