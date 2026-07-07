# Master Project Log

This is the project source bible for the Knight Witch site/widgets repo. It tracks live systems, tasks, bugs, risks, snippets, cleanup, and decisions.

Read `/OPERATING_CONTRACT.md` before editing this file.

## Current live / production-facing systems

### Global Fourthwall loader

Production-facing footer currently uses:

- Global loader commit: `b7672d41f8a011f47675ef2394b7d99028c90158`
- Global loader cache key: `20260706-title-carousel-spacing-2`
- Entrypoint: `fourthwall/global/kw-fourthwall-loader.js`

Current footer snippet uses a placeholder token in docs because GitHub secret scanning blocks committing the literal token:

```html
<script
  defer
  src="https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@b7672d41f8a011f47675ef2394b7d99028c90158/fourthwall/global/kw-fourthwall-loader.js?v=20260706-title-carousel-spacing-2"
  data-version="20260706-title-carousel-spacing-2"
  data-storefront-token="<FOURTHWALL_STOREFRONT_TOKEN_FROM_LIVE_FOOTER>"
  data-shop-domain="knightwitchapparel.com"
  data-currency="USD">
</script>
```

### Temporary title-bar hotfix

Production footer also currently uses a temporary title-bar hotfix loader:

- Hotfix commit: `663b046d1dcb77b86a06ee1af427af2a5b0821dc`
- Cache key: `20260706-titlebar-hotfix-1`
- Entrypoint: `components/kw-title-bars/kw-title-bars-hotfix-loader.js`

```html
<script
  defer
  src="https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@663b046d1dcb77b86a06ee1af427af2a5b0821dc/components/kw-title-bars/kw-title-bars-hotfix-loader.js?v=20260706-titlebar-hotfix-1"
  data-version="20260706-titlebar-hotfix-1">
</script>
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

Module docs describe the current verified nav/header behavior. Future header/nav edits must review `/fourthwall/global/README.md`, `/fourthwall/global/CHANGELOG.md`, and the owning header files.

### Product carousel

Owned by:

```text
fourthwall/kwfw-carousel.css
fourthwall/kwfw-carousel.js
fourthwall/kwfw-carousel-desktop-grid.css
fourthwall/kwfw-carousel-wheel-bridge.js
```

Status: active via the global loader.

Current spacing work changed the desktop/mobile carousel pull-up to `-35px` and preserved a tighter title-to-carousel layout.

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

### Size guide, universal media, product rules, cart runtime

These are loaded by the global loader and should be treated as active unless proven otherwise:

```text
fourthwall/kwfw-size-guide.css
fourthwall/kwfw-size-guide.js
fourthwall/kwfw-universal-media.css
fourthwall/kwfw-universal-media.js
fourthwall/kwfw-product-rules.css
fourthwall/kwfw-product-rules.js
fourthwall/global/kw-cart-runtime.css
fourthwall/global/kw-cart-runtime.js
```

## Active bugs / risks

1. Title-bar dependencies float from `main` in `kw-fourthwall-loader.js`.
   - Risk: pinned global loader can still pull newer/broken title-bar files.
   - Current mitigation: temporary title-bar hotfix snippet in footer.
   - Required fix: pin or self-ref title-bar assets appropriately and fold hotfix into base component.

2. `fourthwall/global/README.md` contains older production state.
   - Risk: future sessions may confuse old known-good snippets with current production footer.
   - Required fix: update module README or mark it as subordinate to `/MASTER.md` for live snippets.

3. Legacy carousel loaders and variants remain in the repo.
   - Risk: stale loaders may be mistaken for production entrypoints.
   - Required fix: audit and mark keep/remove decisions.

4. `kw-info-accordion-dev` is branch-loaded from the production global loader.
   - Risk: production depends on a branch ref.
   - Required fix: decide whether to merge/pin/stabilize the info-section system.

5. GitHub code search may be unreliable for this repo.
   - Risk: search may return no results even when files exist.
   - Required mitigation: use direct path fetches or local ZIP audit when necessary.

6. GitHub secret scanning blocks committing the literal Fourthwall storefront token.
   - Risk: docs snippets cannot contain the live token.
   - Required mitigation: use `<FOURTHWALL_STOREFRONT_TOKEN_FROM_LIVE_FOOTER>` placeholder in repo docs.

## Completed items

- Created `/OPERATING_CONTRACT.md`.
- Began documentation bootstrap for the root documentation system.
- Documented current global loader, active hotfix, architecture, style keys, and known risks.
- Split Collection feature video into standalone module.
- Removed Collection lower feature video from banner module.
- Tightened carousel/title-bar spacing.
- Added temporary title-bar hotfix loader and stylesheet.
- Established current production footer as global loader plus hotfix loader.

## Pending cleanup tasks

1. Fold title-bar hotfix into base component/global loader.
2. Stop title-bar CSS/JS from floating from `main` in the global loader.
3. Update or deprecate stale notes in `fourthwall/global/README.md`.
4. Add module README files for:
   - `fourthwall/domains/collection/`
   - `fourthwall/domains/collection/feature-video/`
5. Audit legacy carousel files and decide keep/remove/archive status.
6. Stabilize or document the `kw-info-accordion-dev` dependency.
7. Audit `gallery-portfolio/`, `logo-banner/`, and `widgets/` for active vs legacy status.
8. Continue backfilling changelog history from recent commits.

## Planned work

- Complete documentation bootstrap.
- Use `/HISTORY/PRE_FLIGHT_Check.md` before future code edits.
- Use `/HISTORY/CHANGELOG.md` and `/HISTORY/DIFFS/` for every GitHub update.
- Keep current production snippets in this file.
- Move temporary fixes into proper owning modules when verified.

## Current production snippets

See the global loader and title-bar hotfix snippets at the top of this file.

Do not paste the literal storefront token into repo docs. Use the live Fourthwall footer value in Fourthwall.

## REMOVALS / DECISIONS AGAINST

### Do not rely on `@main` for production Fourthwall snippets

Reason: jsDelivr/Fourthwall cache behavior and floating source changes can produce inconsistent live behavior. Production snippets should use pinned commits unless explicitly testing.

### Do not leave title-bar hotfix as permanent architecture

Reason: the hotfix exists to override a broken/mismatched loader state. It should be folded into the base title-bar/global-loader system and then removed from the footer.

### Do not use legacy carousel loader refs without verification

Reason: prior carousel work produced stale/intermediate loader states, including at least one mutation loop that could freeze the Fourthwall editor. Legacy loaders must be audited before use.

### Do not use `fourthwall/global/CHANGELOG.md` as canonical repo changelog

Reason: it is module-specific. `/HISTORY/CHANGELOG.md` is the canonical repo-wide history.
