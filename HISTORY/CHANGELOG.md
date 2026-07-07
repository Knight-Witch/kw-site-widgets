# Changelog

Canonical repo-wide changelog. Module changelogs may remain, but they do not replace this file.

## 2026-07-07 10:05 UTC — KW-DOC-GLOBAL-README-006

Summary: Reconciled global runtime documentation with current root docs, current loader behavior, current production footer state, and current temporary title-bar hotfix state. Updated the parent Fourthwall README media boundary and inventory, the global module changelog, MASTER, pre-flight, and diff record.

Affected files: /fourthwall/global/README.md; /fourthwall/global/CHANGELOG.md; /fourthwall/README.md; /MASTER.md; /HISTORY/CHANGELOG.md; /HISTORY/PRE_FLIGHT_Check.md; /HISTORY/DIFFS/2026-07-07-global-readme.md.

Commits: 58d4c6a9dfa22f0aaaaba4af97f567f57777fae0; 605bdd283f87c8c3353c36cd9c6fdb29fb1c8e47; 4ee081dc07fbf86a8eddab10415d036fe114b920; 84850a0feb9cc454c028f659f39715a85d097aaf; 6a440708d2d708b5b4ae2a1da34db415d81b1d94; b84694c76b48af3fcea56ac36ec8fb4b7304fb27; e0cad86c8e4757671dae70b5181a97ee80a3616a.

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
