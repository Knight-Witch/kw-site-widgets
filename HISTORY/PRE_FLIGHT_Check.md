# Pre-Flight Check Log

This file is the rolling pre-flight log for the Knight Witch site/widgets repo.

Each future code or documentation update should add an entry before the change when the update touches shared/global behavior, modules, loaders, Fourthwall snippets, styles, structure, or any multi-page/component behavior.

## 2026-07-07 08:54 UTC — PF-20260707-002 — Deep website documentation map

Requested change:
- Thoroughly review GitHub-hosted website elements and update the repo docs so future work has a clear blueprint/bible/map.
- Document the boundary between GitHub-hosted systems and remaining Fourthwall hard-coded sections.
- Document that native product images may remain Fourthwall-hosted while external product-support media should move toward the Knight Witch CDN over time.

Docs reviewed:
- `/OPERATING_CONTRACT.md`
- `/README.md`
- `/ARCHITECTURE.md`
- `/STYLE_KEYS.md`
- `/MASTER.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `/fourthwall/README.md`
- `/fourthwall/global/README.md`
- `/fourthwall/global/CHANGELOG.md`
- `/components/kw-title-bars/README.md`

Files/modules checked:
- Uploaded `kw-site-widgets-main.zip`
- `fourthwall/global/`
- `components/kw-title-bars/`
- `fourthwall/kwfw-*`
- `fourthwall/prod_card_media/manifest.json`
- `fourthwall/domains/collection/`
- `fourthwall/domains/collection/feature-video/`
- `gallery-portfolio/`
- `logo-banner/`
- `widgets/`

Risk/conflict notes:
- Some live site sections may still be hard-coded in Fourthwall and cannot be fully mapped from GitHub alone.
- `fourthwall/global/README.md` update attempts were blocked by tool safety checks; root docs now identify `/MASTER.md` as current production source.
- Creating `fourthwall/domains/collection/feature-video/README.md` and `fourthwall/prod_card_media/README.md` was blocked by tool safety checks.
- `gallery-portfolio/index.html` references `gallery-portfolio.js`, but that file was not present in the audited `main` snapshot.
- Current global loader still floats title-bar CSS/JS from `main`.
- Current title-bar hotfix remains temporary.

Recommended plan:
- Update root docs first because they are canonical.
- Add module READMEs where the connector allows it.
- Keep blocked documentation targets listed as follow-up items.
- Make no runtime CSS/JS changes in this pass.

User input required:
- No. User authorized the deeper documentation pass.

Validation:
- Documentation-only pass.
- No live Fourthwall testing performed.

## 2026-07-07 08:32 UTC — PF-20260707-001 — Documentation bootstrap

Requested change:
- Begin the documentation bootstrap required by `/OPERATING_CONTRACT.md`.

Docs reviewed:
- `/OPERATING_CONTRACT.md`
- `/fourthwall/README.md`
- `/fourthwall/global/README.md`
- `/fourthwall/global/CHANGELOG.md`
- `/components/kw-title-bars/README.md`

Files/modules checked:
- Uploaded `kw-site-widgets-main.zip`
- `components/kw-title-bars/`
- `fourthwall/global/`
- `fourthwall/domains/collection/`
- `fourthwall/domains/collection/feature-video/`
- `fourthwall/kwfw-*`
- `gallery-portfolio/`
- `logo-banner/`
- `widgets/`

Risk/conflict notes:
- GitHub code search has previously returned no results even for existing files, so the uploaded ZIP and direct path fetches were used for the bootstrap audit.
- `fourthwall/global/README.md` contains older production footer notes and must not be treated as the sole current production source.
- `kw-fourthwall-loader.js` currently loads title-bar CSS/JS from floating `main`, while the active footer loader is pinned. This is a documented architecture risk.
- A temporary title-bar hotfix loader is production-active and must be folded into the proper architecture later.
- GitHub secret scanning blocks committing the literal Fourthwall storefront token; docs use `<FOURTHWALL_STOREFRONT_TOKEN_FROM_LIVE_FOOTER>`.

Recommended plan:
- Create root documentation files and placeholder directories.
- Backfill architecture, style keys, master status, changelog, pre-flight, and diff records from the current repo and recent known updates.
- Do not change runtime behavior during this bootstrap.

User input required:
- No. User already authorized beginning the documentation bootstrap.

Validation:
- Documentation-only pass.
- Live Fourthwall behavior was not tested.
