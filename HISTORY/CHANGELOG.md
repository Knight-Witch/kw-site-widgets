# Changelog

This is the canonical repo-wide changelog for Knight Witch site/widgets. Module-specific changelogs may remain, but they do not replace this file.

## 2026-07-07 10:05 UTC — KW-DOC-GLOBAL-README-006 — Global README reconciliation

ID: KW-DOC-GLOBAL-README-006
Date: 2026-07-07
Timestamp: 10:05 UTC

Affected files:
- `/fourthwall/global/README.md`
- `/fourthwall/global/CHANGELOG.md`
- `/fourthwall/README.md`
- `/MASTER.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `/HISTORY/DIFFS/2026-07-07-global-readme-reconcile.md`

Commit SHAs:
- `58d4c6a9dfa22f0aaaaba4af97f567f57777fae0` — Reconciled `/fourthwall/global/README.md`.
- `605bdd283f87c8c3353c36cd9c6fdb29fb1c8e47` — Updated `/fourthwall/README.md` media boundary and inventory.
- `4ee081dc07fbf86a8eddab10415d036fe114b920` — Updated `/fourthwall/global/CHANGELOG.md`.
- `84850a0feb9cc454c028f659f39715a85d097aaf` — Updated `/MASTER.md`.

Summary:
- Reconciled the global runtime README with current root docs, current loader behavior, current production footer state, and current temporary hotfix state.
- Marked older carousel/nav notes in the global module changelog as historical relative to `/MASTER.md`.
- Updated the parent Fourthwall README so its media boundary agrees with `/MEDIA.md`.
- Updated `/MASTER.md` so the stale global README cleanup item is no longer active.

Reason:
- The global runtime README still pointed at older pinned states and could mislead future work on the live footer/global runtime.

Rollback notes:
- Documentation-only change. Runtime behavior should not change.
- To rollback, revert the listed commits and the follow-up history/diff commits.

Risks / follow-ups:
- The title-bar hotfix remains temporary.
- The global loader still pulls title-bar CSS/JS from floating `main`.
- The global loader still references `kw-info-accordion-dev` for info sections.
- Live Fourthwall custom sections still need a separate audit.

Validation:
- Read root docs, module docs, current global loader, global config, header runtime, background-video runtime, cart runtime, title-bar docs, and global module changelog.
- Updated docs only. No runtime CSS/JS changed. No live storefront testing performed.

## 2026-07-07 09:42 UTC — KW-DOC-PROD-MEDIA-005 — Product card media README

ID: KW-DOC-PROD-MEDIA-005
Date: 2026-07-07
Timestamp: 09:42 UTC
Affected files: `/fourthwall/prod_card_media/README.md`, `/MASTER.md`, `/HISTORY/CHANGELOG.md`, `/HISTORY/PRE_FLIGHT_Check.md`, `/HISTORY/DIFFS/2026-07-07-product-card-media-readme.md`
Commit SHAs: `196751d10f09818e2c9c73526777716f7f2cdc18`, `a6094356c78c4298d2d4619ef4d59683c3b0f624`
Summary: Created product-card media folder docs, documented manifest ownership, CDN boundary, current manifest entry, fields, and update rules.
Reason: The manifest was documented in `/STYLE_KEYS.md`, but the owning folder had no local README.
Rollback: Revert the listed commits and associated history commits. Runtime behavior should not change.
Validation: Read the manifest and created docs only; no runtime files changed.

## 2026-07-07 09:28 UTC — KW-DOC-FEATURE-MODULE-004 — Collection feature module README

ID: KW-DOC-FEATURE-MODULE-004
Date: 2026-07-07
Timestamp: 09:28 UTC
Affected files: `/fourthwall/domains/collection/feature-video/README.md`, `/MASTER.md`, `/HISTORY/CHANGELOG.md`, `/HISTORY/PRE_FLIGHT_Check.md`, `/HISTORY/DIFFS/2026-07-07-collection-feature-module-readme.md`
Commit SHAs: `eaa6b71124229ff8384d8af9b93e7d7ee1b83d5d`, `9ad8978d3baee5e8019756bca28c7c0571ccf14b`
Summary: Created Collection feature video module docs and updated project status/history.
Reason: The root README linked to the module README before it existed.
Rollback: Revert the listed commits and associated history commits. Runtime behavior should not change.
Validation: Confirmed the file was missing, created docs only, no runtime files changed.

## 2026-07-07 09:12 UTC — KW-DOC-MEDIA-003 — Media boundary clarification

ID: KW-DOC-MEDIA-003
Date: 2026-07-07
Timestamp: 09:12 UTC
Affected files: `/MEDIA.md`, `/README.md`, `/STYLE_KEYS.md`, `/HISTORY/CHANGELOG.md`
Commit SHAs: `6ffc9cd252dd5ef44cf6597881e09fe09256a8dc`, `d3c0572b5ed7b3130318d3f1370e5e6ff27190e2`, `93273235d4609a2c475a0b22f9568ef647f0cb9a`, `ea6b6e65ddc7668d0fefc5a01b139514873e9e86`
Summary: Added `/MEDIA.md`, linked it from `/README.md`, and made `/STYLE_KEYS.md` use the stricter media boundary.
Reason: Non-product-native media used by this repo belongs on the Knight Witch DigitalOcean CDN unless a documented exception exists.
Rollback: Revert the listed commits and associated history commits. Runtime behavior should not change.
Validation: Confirmed `/README.md`, `/MEDIA.md`, and `/STYLE_KEYS.md` state the boundary.

## 2026-07-07 08:54 UTC — KW-DOC-MAP-002 — Deep website documentation map

ID: KW-DOC-MAP-002
Date: 2026-07-07
Timestamp: 08:54 UTC
Affected files: `/README.md`, `/ARCHITECTURE.md`, `/STYLE_KEYS.md`, `/MASTER.md`, `/fourthwall/README.md`, `/components/kw-title-bars/README.md`, `/fourthwall/domains/collection/README.md`, `/gallery-portfolio/README.md`, `/logo-banner/README.md`, `/widgets/README.md`, `/HISTORY/PRE_FLIGHT_Check.md`, `/HISTORY/CHANGELOG.md`, `/HISTORY/DIFFS/2026-07-07-doc-map.md`
Commit SHAs: `5d30afe3c860305cdce4ca34c975573d11004e68`, `b32e10c35eb8da43988c8b3abaabd418e55cdcbb`, `2c117aa7e59628ab277993ac9b809f6c7504ff41`, `0152b1e204b62ea066ddda52158e398681bbe5a8`, `1c0cc7042756f44f24f50c06238c9c13b893afe6`, `9bfd1f30b926b0010dc22643d044662dcb5da6e6`, `bb886ca9f82552f3539b661d42e6475b47ba0621`, `e7ca4f7291e8dfcec892e2ce437427ce5a7252b8`, `adca936f7a02e3ae8ec319449ecc4b381103c43a`, `ddf2e845749ada7b74551bbb92efd21449e40817`, `652f1df3481640ffdba77219563b114f739cf323`, `793d110d4dce369553fc691f73e3fe4b291db65d`, `e05dc7748b7d317de76fbfc992fab4e16ee77b6d`
Summary: Expanded repo/site documentation map for GitHub-hosted systems, page/domain modules, styles, live systems, risks, and cleanup tasks.
Reason: Future work needed a site blueprint instead of relying on chat memory.
Rollback: Revert the listed commits and associated history commits. Runtime behavior should not change.
Validation: Read current root/module docs and audited the uploaded repo ZIP; no live storefront testing performed.

## 2026-07-07 08:32 UTC — KW-DOC-BOOTSTRAP-001 — Documentation bootstrap

ID: KW-DOC-BOOTSTRAP-001
Date: 2026-07-07
Timestamp: 08:32 UTC
Affected files: `/OPERATING_CONTRACT.md`, `/README.md`, `/ARCHITECTURE.md`, `/STYLE_KEYS.md`, `/MASTER.md`, `/HISTORY/CHANGELOG.md`, `/HISTORY/PRE_FLIGHT_Check.md`, `/HISTORY/DIFFS/2026-07-07-doc-bootstrap.md`, `/ASSETS/.gitkeep`, `/BACKUP_VAULT/.gitkeep`
Commit SHAs: `130fdb75de1aecf16904ecab6c032c5634fec872`, `775a1922b438f5e6606a33ebdfb8a4ced0ae87cb`, `b6cce8b7445d41f277bafde77838f5625798f4e3`, `14f3cfeada3fa40e41f59c97de3f3868f9913106`, `bdaea50064c59fe7ea6b1f901d4f64ef1e16e0f2`, `6998b2de646c40d9be2d667680f8a5a0b5f5c95c`, `48d0239a7e4150cdb1f9d52bf314cfd9bf0e435e`, `ad5ba5c4aa272fbc1a8f5d04d2e19f6fca7e04e9`, `af8246d38fdb7f47a7f4ba0cb294e44aaba8f2ec`
Summary: Created the root documentation system and initial repo map.
Reason: The repo had partial module docs but no root-level operating map or history system.
Rollback: Revert the listed commits and associated history commits. Runtime behavior should not change.
Validation: Read existing module docs, audited the uploaded repo ZIP, created root docs only, no live storefront testing performed.
