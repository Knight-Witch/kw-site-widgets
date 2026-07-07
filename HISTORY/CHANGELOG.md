# Changelog

This is the canonical repo-wide changelog for Knight Witch site/widgets.

Module-specific changelogs may remain, but they do not replace this file.

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
