# Changelog

This is the canonical repo-wide changelog for Knight Witch site/widgets.

Module-specific changelogs may remain, but they do not replace this file.

## 2026-07-07 09:28 UTC — KW-DOC-FEATURE-MODULE-004 — Collection feature module README

ID: KW-DOC-FEATURE-MODULE-004

Date: 2026-07-07

Timestamp: 09:28 UTC

Summary:
- Created `/fourthwall/domains/collection/feature-video/README.md`.
- Updated `/MASTER.md` to mark the Collection feature module README as completed and narrow the remaining module README cleanup task.
- Added a paired diff record for this documentation-only update.

Reason:
- `/README.md` already linked to the Collection feature module README, but the file did not exist because earlier creation attempts were blocked.
- The module now has local ownership documentation for its loader, CSS, JS, assets, boundary, and known production URL.

Affected files:
- `/fourthwall/domains/collection/feature-video/README.md`
- `/MASTER.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `/HISTORY/DIFFS/2026-07-07-collection-feature-module-readme.md`

Commit SHAs:
- `eaa6b71124229ff8384d8af9b93e7d7ee1b83d5d` — Added `/fourthwall/domains/collection/feature-video/README.md`.
- `9ad8978d3baee5e8019756bca28c7c0571ccf14b` — Updated `/MASTER.md` for the completed module README and current media boundary.

Rollback notes:
- Documentation-only change. Runtime behavior should not change.
- To rollback, revert the commits listed above and the follow-up changelog/pre-flight/diff commits.

Risks / follow-ups:
- `/fourthwall/prod_card_media/README.md` still needs to be created.
- `fourthwall/global/README.md` still needs reconciliation.
- Live Fourthwall hard-coded snippets still need a separate audit.

Validation:
- Confirmed the target README was missing before creation.
- Created the target README successfully.
- No runtime CSS/JS changed.
- No live storefront testing performed.

## 2026-07-07 09:12 UTC — KW-DOC-MEDIA-003 — Media boundary clarification

ID: KW-DOC-MEDIA-003

Date: 2026-07-07

Timestamp: 09:12 UTC

Summary:
- Added `/MEDIA.md` as the explicit media-hosting boundary.
- Updated `/README.md` to include `/MEDIA.md` in the required reading order and documentation system.
- Updated `/STYLE_KEYS.md` to use the stricter media boundary.
- Clarified that native product media returned by the Fourthwall product API can remain on Fourthwall, while all other site media used by this repo is expected to live on the Knight Witch DigitalOcean CDN unless a documented exception exists.

Reason:
- The previous wording said external media should use DigitalOcean/CDN where practical. The actual project rule is stricter: non-product-API media used outside Fourthwall native product media is on the DigitalOcean CDN.

Affected files:
- `/MEDIA.md`
- `/README.md`
- `/STYLE_KEYS.md`
- `/HISTORY/CHANGELOG.md`

Commit SHAs:
- `6ffc9cd252dd5ef44cf6597881e09fe09256a8dc` — Added `/MEDIA.md`.
- `d3c0572b5ed7b3130318d3f1370e5e6ff27190e2` — Referenced `/MEDIA.md` in `/README.md`.
- `93273235d4609a2c475a0b22f9568ef647f0cb9a` — Clarified product API media boundary in `/MEDIA.md`.
- `ea6b6e65ddc7668d0fefc5a01b139514873e9e86` — Updated `/STYLE_KEYS.md` media-hosting convention and product-support media wording.

Rollback notes:
- Documentation-only change. Runtime behavior should not change.
- To rollback, revert the commits listed above and this changelog update.

Risks / follow-ups:
- Live Fourthwall hard-coded snippets still need a separate audit.

Validation:
- Confirmed `/README.md` now points to `/MEDIA.md` in the required reading order.
- Confirmed `/MEDIA.md` contains the strict product API vs CDN boundary.
- Confirmed `/STYLE_KEYS.md` now mirrors the stricter media boundary.
- No live storefront testing performed.

## 2026-07-07 08:54 UTC — KW-DOC-MAP-002 — Deep website documentation map

ID: KW-DOC-MAP-002

Date: 2026-07-07

Timestamp: 08:54 UTC

Summary:
- Expanded the repo documentation map for GitHub-hosted website elements.
- Documented the GitHub/Fourthwall ownership boundary.
- Documented that native product images may still be Fourthwall-hosted while product-support media and brand media should move toward the Knight Witch CDN where practical.
- Expanded architecture coverage for global runtime, header/nav, product carousel, universal media, size guide, product rules, Collection modules, standalone gallery, logo banner, and legacy widgets.
- Expanded style keys for colors, fonts, breakpoints, background video, header/nav, title bars, carousel, product modal systems, Collection modules, gallery, logo banner, and legacy widgets.
- Expanded the master project log with live systems, risks, current URLs, hard-coded Fourthwall unknowns, and cleanup tasks.
- Added module documentation where the connector allowed it.

Reason:
- The initial bootstrap established the doc system, but the repo needed a more detailed map of every website element currently housed on GitHub.
- Future work should not require guessing whether a system lives in GitHub or directly in Fourthwall.

Affected files:
- `/README.md`
- `/ARCHITECTURE.md`
- `/STYLE_KEYS.md`
- `/MASTER.md`
- `/fourthwall/README.md`
- `/components/kw-title-bars/README.md`
- `/fourthwall/domains/collection/README.md`
- `/gallery-portfolio/README.md`
- `/logo-banner/README.md`
- `/widgets/README.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/DIFFS/2026-07-07-doc-map.md`

Commit SHAs:
- `5d30afe3c860305cdce4ca34c975573d11004e68` — Expanded `/README.md` documentation map.
- `b32e10c35eb8da43988c8b3abaabd418e55cdcbb` — Expanded `/ARCHITECTURE.md` site map.
- `2c117aa7e59628ab277993ac9b809f6c7504ff41` — Expanded `/STYLE_KEYS.md` style and media documentation.
- `0152b1e204b62ea066ddda52158e398681bbe5a8` — Expanded `/MASTER.md` site status map.
- `1c0cc7042756f44f24f50c06238c9c13b893afe6` — Expanded `/fourthwall/README.md`.
- `9bfd1f30b926b0010dc22643d044662dcb5da6e6` — Added `/fourthwall/domains/collection/README.md`.
- `bb886ca9f82552f3539b661d42e6475b47ba0621` — Added placeholder `/gallery-portfolio/README.md`.
- `e7ca4f7291e8dfcec892e2ce437427ce5a7252b8` — Expanded `/gallery-portfolio/README.md`.
- `adca936f7a02e3ae8ec319449ecc4b381103c43a` — Added `/logo-banner/README.md`.
- `ddf2e845749ada7b74551bbb92efd21449e40817` — Added placeholder `/widgets/README.md`.
- `652f1df3481640ffdba77219563b114f739cf323` — Expanded `/widgets/README.md`.
- `793d110d4dce369553fc691f73e3fe4b291db65d` — Expanded `/components/kw-title-bars/README.md`.
- `e05dc7748b7d317de76fbfc992fab4e16ee77b6d` — Logged the deep documentation pre-flight.

Relevant snippets / jsDelivr URLs:
- Current production/global URLs are documented in `/MASTER.md`.
- Repo docs continue to avoid committing the live storefront value. The live value should remain in Fourthwall/project instructions.

Rollback notes:
- This update is documentation-only. Runtime behavior should not change.
- To rollback, revert the listed documentation commits and any follow-up diff/changelog commits.
- If rolling back only part of the documentation map, keep `/OPERATING_CONTRACT.md`, `/ARCHITECTURE.md`, `/MASTER.md`, and `/STYLE_KEYS.md` internally consistent.

Risks / follow-ups:
- `fourthwall/global/README.md` update attempts were blocked by tool safety checks, so it remains stale relative to `/MASTER.md`.
- Creating `/fourthwall/prod_card_media/README.md` was blocked by tool safety checks.
- `gallery-portfolio/index.html` references `gallery-portfolio.js`, which was not present in the audited `main` snapshot.
- Live Fourthwall hard-coded snippets still need a separate audit.
- The title-bar hotfix and floating title-bar dependency issue remain active cleanup tasks.

Validation:
- Re-read current root docs and module docs.
- Audited uploaded `kw-site-widgets-main.zip` file inventory and key CSS/JS files.
- Updated docs only.
- Did not change runtime CSS/JS.
- Did not perform live storefront testing.

## 2026-07-07 08:32 UTC — KW-DOC-BOOTSTRAP-001 — Documentation bootstrap

ID: KW-DOC-BOOTSTRAP-001

Date: 2026-07-07

Timestamp: 08:32 UTC

Summary:
- Created the root documentation system required by `/OPERATING_CONTRACT.md`.
- Backfilled initial architecture, style, project status, pre-flight, and diff documentation from the current repo ZIP, existing module docs, and known recent commits.
- Added placeholder directories for `/ASSETS/` and `/BACKUP_VAULT/`.
- Did not change runtime code or Fourthwall behavior.

Reason:
- The repo had partial module docs but no root-level source bible, architecture blueprint, style reference, repo-wide changelog, pre-flight log, or diff record system.
- Future chats need stable repo-level context instead of relying on chat memory.

Affected files:
- `/OPERATING_CONTRACT.md`
- `/README.md`
- `/ARCHITECTURE.md`
- `/STYLE_KEYS.md`
- `/MASTER.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `/HISTORY/DIFFS/2026-07-07-doc-bootstrap.md`
- `/ASSETS/.gitkeep`
- `/BACKUP_VAULT/.gitkeep`

Commit SHAs captured during bootstrap:
- `130fdb75de1aecf16904ecab6c032c5634fec872` — Add repo operating contract.
- `775a1922b438f5e6606a33ebdfb8a4ced0ae87cb` — Bootstrap root README.
- `b6cce8b7445d41f277bafde77838f5625798f4e3` — Bootstrap architecture documentation.
- `14f3cfeada3fa40e41f59c97de3f3868f9913106` — Bootstrap style keys documentation.
- `bdaea50064c59fe7ea6b1f901d4f64ef1e16e0f2` — Bootstrap master project log.
- `6998b2de646c40d9be2d667680f8a5a0b5f5c95c` — Bootstrap pre-flight log.
- `48d0239a7e4150cdb1f9d52bf314cfd9bf0e435e` — Create assets directory placeholder.
- `ad5ba5c4aa272fbc1a8f5d04d2e19f6fca7e04e9` — Create backup vault placeholder.
- `af8246d38fdb7f47a7f4ba0cb294e44aaba8f2ec` — Add documentation bootstrap diff record.

Relevant snippets / jsDelivr URLs:
- Current production footer state is documented in `/README.md` and `/MASTER.md`.
- The literal Fourthwall storefront token is intentionally not committed. Repo docs use `<FOURTHWALL_STOREFRONT_TOKEN_FROM_LIVE_FOOTER>`.

Rollback notes:
- This bootstrap is documentation-only. Runtime behavior should not change.
- To rollback, revert the listed bootstrap commits and any follow-up changelog commit.
- If reverting the documentation system, future repo work will lose the required operating context, so rollback should only be done if the docs themselves are malformed.

Risks / follow-ups:
- `fourthwall/global/README.md` still contains older production footer notes and should be reconciled with `/MASTER.md`.
- `components/kw-title-bars/kw-title-bars-hotfix-loader.js` remains a temporary production hotfix and should be folded into the proper title-bar/global-loader architecture.
- `kw-fourthwall-loader.js` still loads title-bar CSS/JS from floating `main`; this should be corrected in a separate functional/docs update.
- Legacy carousel files and loaders need a dedicated audit.
- Branch-loaded `kw-info-accordion-dev` should be reviewed and stabilized/pinned/merged as appropriate.
- Live Fourthwall behavior was not tested during this documentation bootstrap.

Validation:
- Read `/OPERATING_CONTRACT.md`.
- Read existing module docs: `/fourthwall/README.md`, `/fourthwall/global/README.md`, `/fourthwall/global/CHANGELOG.md`, `/components/kw-title-bars/README.md`.
- Audited the uploaded repo ZIP file list and key CSS/JS ownership.
- Created root documentation and placeholder directories.
- Did not perform live storefront testing.
