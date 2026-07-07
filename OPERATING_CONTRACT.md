# Knight Witch Site Widgets Operating Contract

This document is the first source of process truth for work in the Knight Witch site/widgets repo. It defines how code, documentation, history, rollback, assets, and Fourthwall production snippets must be handled.

Project instructions should remain compact and point to this file. This file carries the full operating policy.

## 1. Core code standards

All code written for this repo must be professional, clean, maintainable, modular, and production-oriented.

Required standards:

- Keep code efficient, readable, cohesive, and no longer than needed.
- Do not clutter production code with placeholder notes, unnecessary comments, chat-style explanations, TODO sprawl, duplicate utilities, or quick-fix bloat.
- Documentation belongs in repo documentation files, not scattered through production code.
- Segment code into sensible modules with clear ownership.
- Prioritize cohesion, isolation, troubleshooting, and conflict avoidance.
- Avoid duplicate logic, duplicate functions, conflicting utilities, and temporary fixes that create cleanup debt.
- Separate global/shared architecture from one-off module logic where sensible.
- Global styles, loaders, shared UI systems, reusable runtime logic, and cross-page behavior must have clear ownership.
- Do not bury global behavior inside page-specific tools unless the behavior is genuinely local to that page.
- Do not add unnecessary wrappers, abstractions, dependencies, files, selectors, runtime observers, or compatibility layers.

## 2. Manual edit policy

The assistant should not ask the user to manually edit files when tool access can perform the work directly.

Rules:

- Do repo/code busywork directly when tools allow it.
- Do not ask the user to make manual code edits unless the user explicitly asks to do manual edits themselves.
- If a tool limit, safety block, file-size issue, connector issue, or token limit prevents direct work, state the limitation clearly.
- When blocked, provide the cleanest alternative: smaller patch, separate commit, inline snippet, local file instructions, or user-side verification steps.
- Do not pretend a blocked change was completed.

## 3. Required repo documentation system

The repo must maintain this root documentation and support structure:

```text
/OPERATING_CONTRACT.md
/README.md
/ARCHITECTURE.md
/STYLE_KEYS.md
/MASTER.md
/HISTORY/CHANGELOG.md
/HISTORY/PRE_FLIGHT_Check.md
/HISTORY/DIFFS/
/BACKUP_VAULT/
/ASSETS/
```

If the required documentation system does not exist yet, the first repo task is to create it and backfill it from the current repo before more functional code changes.

During the documentation bootstrap, audit and transcribe:

- Current repo structure.
- Existing module docs.
- Active Fourthwall loaders.
- Current live snippets.
- CSS and JS ownership.
- Global behaviors.
- Page/domain behaviors.
- Known hotfixes and temporary overrides.
- Current production state.
- Known risks and cleanup items.
- Existing branches and branch-only docs when relevant.

After the documentation system exists, every future code-changing update must update relevant docs in the same work session.

## 4. Required pre-edit reading

Before making repo changes, first read:

```text
/OPERATING_CONTRACT.md
```

Then read enough state docs to understand the current repo:

```text
/ARCHITECTURE.md
/MASTER.md
/STYLE_KEYS.md
/HISTORY/CHANGELOG.md
/HISTORY/PRE_FLIGHT_Check.md
```

Also read relevant module-level docs before editing that system. Important current module docs include:

```text
/fourthwall/README.md
/fourthwall/global/README.md
/fourthwall/global/CHANGELOG.md
/components/kw-title-bars/README.md
```

Any new module README must be referenced from `/ARCHITECTURE.md` so future chats know it exists.

If repo docs conflict with chat context, flag the conflict and ask for confirmation before structural changes.

## 5. Documentation roles

### `/OPERATING_CONTRACT.md`

This file is the full operating policy and first source of process truth.

It defines:

- Code standards.
- Documentation requirements.
- Pre-flight process.
- Changelog and diff requirements.
- Branch/commit rules.
- Testing and validation rules.
- Rollback expectations.
- Backup rules.
- Asset and secret handling.
- Fourthwall/CDN policy.
- Scope control.
- Memory/continuity expectations.

### `/README.md`

The repo overview and start-here document.

It should summarize:

- What the repo is for.
- Where production snippets live.
- Which docs to read first.
- Major systems in the repo.
- Basic Fourthwall deployment expectations.
- Links to `/OPERATING_CONTRACT.md`, `/ARCHITECTURE.md`, `/MASTER.md`, `/STYLE_KEYS.md`, and `/HISTORY/CHANGELOG.md`.

### `/ARCHITECTURE.md`

The structural blueprint.

It must document:

- Folder ownership.
- Global-vs-module boundaries.
- Loader hierarchy.
- Dependency order.
- Fourthwall snippet policy.
- jsDelivr cache/version rules.
- Pinned commit rules.
- Legacy-file warnings.
- File ownership for common edits.
- Module docs and where they live.
- Known branch-only systems.
- Which files should not be edited for a given problem.

Update `/ARCHITECTURE.md` whenever a change alters structure, ownership, loader behavior, dependency flow, global behavior, module boundaries, or future edit locations.

### `/STYLE_KEYS.md`

The visual/style reference.

It must document:

- Fonts.
- Colors.
- CDN roots.
- Asset locations.
- Breakpoints.
- Spacing conventions.
- Border conventions.
- Title bar rules.
- Carousel sizing rules.
- Video background behavior.
- Button/glitch conventions.
- Reusable visual patterns.
- External asset URLs and their purposes.

Update `/STYLE_KEYS.md` whenever a change alters styles, visual conventions, fonts, colors, CDN assets, layout footprint, or reusable UI behavior.

### `/MASTER.md`

The project source bible.

It must track:

- Current live systems.
- Current production snippets.
- Planned features.
- Completed items.
- Active bugs.
- Cleanup tasks.
- Pending refactors.
- Temporary hotfixes.
- Known risks.
- Unresolved issues.
- Decisions that affect future work.
- REMOVALS / DECISIONS AGAINST.

Update `/MASTER.md` when task status, bugs, risks, snippets, cleanup items, active systems, removed items, or decisions change.

The REMOVALS / DECISIONS AGAINST section must include items discussed and rejected, removed from scope, reversed, or replaced, along with the reason.

### `/HISTORY/CHANGELOG.md`

The canonical repo-wide changelog.

Module-specific changelogs may remain, but they do not replace this file.

Update `/HISTORY/CHANGELOG.md` for every GitHub update.

Each entry must include:

- ID.
- Date.
- Timestamp.
- Commit SHA.
- Affected files.
- Summary.
- Reason for change.
- Rollback notes.
- Relevant production snippets or jsDelivr URLs when applicable.
- Risks.
- Follow-up tasks.
- Testing/validation performed.
- Anything that was not verified.

### `/HISTORY/PRE_FLIGHT_Check.md`

The rolling pre-flight log.

Each pre-flight entry should include:

- Date/time.
- Requested change.
- Docs reviewed.
- Files/modules checked.
- Conflict/duplicate/stale-file risks.
- Cache/version risks.
- Loader-order risks.
- Recommended plan.
- Whether user input is required.

Micro-edits during an active rolling fix can use shorter entries, but the log still needs updating when a commit is made.

### `/HISTORY/DIFFS/`

Stores paired diff/change summaries for code-changing commits.

Diff records should:

- Be named with date/time and commit SHA where possible.
- Summarize what changed per file.
- Include enough detail for rollback and debugging without relying on chat memory.
- Mention whether the change was code, docs, config, snippet, or asset related.

### `/BACKUP_VAULT/`

Stores repo backups for major refactors, structural rewrites, loader architecture changes, migrations, or risky multi-system updates.

Never remove files from `/BACKUP_VAULT/`. Only add new backups.

### `/ASSETS/`

Stores assets added directly to the repo.

External/CDN assets may remain external, but must be documented in `/STYLE_KEYS.md` or the relevant module README.

## 6. Pre-flight process

Before adding a tool, changing a module, modifying shared/global code, or touching behavior affecting multiple pages/components, perform a pre-flight check.

Pre-flight should review relevant docs and code for:

- Ownership conflicts.
- Duplicate systems.
- Duplicate functions.
- Stale files.
- Legacy loaders.
- Cache/version risks.
- Loader-order risks.
- Selector conflicts.
- Mobile/desktop regressions.
- Runtime observer loops.
- Temporary hotfixes that should be folded into the main system.
- Whether the requested change belongs in a local module or global owner.

If a critical decision, ambiguity, or meaningful risk exists, flag it before changing code.

If the solution is clear and low-risk, provide a short plan and proceed after confirmation when appropriate.

For ongoing micro-edits in an active bugfix, a simplified summary is acceptable, but the documentation still needs updating when a commit is made.

## 7. Gameplan requirement

Before changes, provide a concise gameplan.

The gameplan should state:

- What will be inspected.
- What will be changed.
- Which files/docs will be updated.
- Known risks.
- Whether confirmation is needed.

Do not write a dissertation.

For active rolling bugfixes, a simplified summary is acceptable.

## 8. Branch and commit policy

Rules:

- Prefer small, logically scoped commits.
- Do not bundle unrelated fixes into one commit.
- Use clear commit messages naming the affected system and purpose.
- Use a branch for risky features, refactors, or experiments unless direct-to-main is approved.
- Do not delete, rename, or move files unless necessary and documented.
- Do not create temporary, duplicate, `final-final`, backup, or experimental files in production folders.
- Use branches, `/BACKUP_VAULT/`, or documented dev folders for experimental work.

If a change is risky, structural, or likely to affect multiple systems, prefer a branch and document the reason.

## 9. Testing and validation policy

After code changes, perform the strongest available validation before reporting completion.

For frontend/Fourthwall work, check:

- Loader order.
- CDN URLs.
- jsDelivr `?v=` cache keys.
- `data-version` values.
- Pinned commit references.
- Affected selectors.
- Mobile behavior.
- Desktop behavior.
- Snippet compatibility.
- Whether the change touches shared/global runtime.

If live testing is not possible from the available tools, state exactly what was not verified and what the user needs to check.

Never claim verification unless it was actually checked.

## 10. Rollback policy

Every changelog entry needs rollback guidance.

For Fourthwall/jsDelivr work, include previous known-good snippets or commit SHAs when available.

Rollback notes should explain:

- Which commit or snippet to restore.
- Which files changed.
- Whether a cache/version bump is needed.
- Whether a temporary hotfix must be removed.
- What risk the rollback addresses.

If a change is temporary, label it temporary in `/MASTER.md` and `/HISTORY/CHANGELOG.md`, and create a follow-up task to fold it into the proper system or remove it.

## 11. Backup policy

For major refactors, structural rewrites, loader architecture changes, migrations, or risky multi-system changes, create a backup first.

Backups go in:

```text
/BACKUP_VAULT/
```

Naming convention:

```text
REPO_BACKUP_mm-dd-yy_timestamp
```

Never remove files from `/BACKUP_VAULT/`. Only add new backups.

Routine micro-fixes do not require full backups if covered by Git history, `/HISTORY/CHANGELOG.md`, and `/HISTORY/DIFFS/`.

## 12. Assets policy

Assets added directly to the repo must go in:

```text
/ASSETS/
```

Rules:

- Use sensible, descriptive filenames.
- Do not scatter images, fonts, SVGs, videos, or other assets across random folders unless a module has a documented reason to own them locally.
- External assets, such as DigitalOcean Spaces/CDN assets, must be documented in `/STYLE_KEYS.md` or the relevant module README.
- Asset URLs should include purpose, owner/module, and any sizing/format notes relevant to usage.

## 13. Secrets and credentials policy

Do not commit private keys, API secrets, passwords, private tokens, or credentials.

Public frontend tokens or intended-public client IDs may be documented only when they are already part of the public runtime.

If a value might be sensitive, ask before committing or documenting it.

## 14. Naming and file ownership policy

New files must use clear, descriptive names that identify the system they belong to.

New files must be placed in the correct owning folder.

If no correct folder exists, propose the folder structure before creating files.

Do not place module-specific logic in global files unless the behavior is genuinely cross-system.

Do not patch symptoms globally if the issue has a clear local owner, unless the issue is cross-system by design.

## 15. Legacy, hotfix, and cleanup policy

If a fix introduces a temporary patch, compatibility shim, legacy loader, override file, or hotfix, it must be documented as temporary.

Documentation must state:

- Why it exists.
- Which system it affects.
- Whether it is production-active.
- How it should be removed or folded in later.
- Which task tracks cleanup.

`/MASTER.md` must track whether that temporary file should be kept, folded into the main system, or removed later.

Do not allow old loaders, stale snippets, abandoned files, or temporary overrides to remain undocumented.

## 16. Fourthwall and CDN policy

Fourthwall should contain small loader/drop-in snippets whenever possible.

GitHub is the source of truth unless explicitly stated otherwise.

For Fourthwall/global runtime work, always review:

```text
/fourthwall/global/README.md
```

Rules:

- Do not rely on `@main` for live production snippets unless explicitly testing.
- Prefer pinned commits for stable production snippets.
- When cache invalidation is needed, bump both jsDelivr `?v=` and relevant `data-version` values.
- Document current production snippets in `/MASTER.md`.
- If changing what loads globally, inspect the global loader and dependency order.
- If changing layout behavior around the native Fourthwall page/footer, inspect the layout guard.
- If changing header/nav behavior, inspect the header CSS/JS owners.
- If changing carousel behavior, inspect carousel CSS, desktop grid overrides, wheel bridge behavior, and loader dependency order.
- If changing title bars, inspect the title-bar component docs and the global loader path that loads the title-bar CSS/JS.

Known Fourthwall/jsDelivr risks to document when relevant:

- Floating `@main` dependencies.
- Loader assets pinned to a different commit than the loader itself.
- Stale same-key resources left active in the DOM.
- MutationObserver loops.
- CSS cascade conflicts between base CSS, desktop overrides, hotfixes, and module CSS.
- Mobile-only fixes leaking into desktop, or desktop-only fixes leaking into mobile.

## 17. Scope control

Before editing, identify the smallest correct owning file or module.

Rules:

- Do not patch symptoms globally if a local owner is clear.
- Do not change desktop behavior for a mobile-only request unless necessary and stated first.
- Do not change mobile behavior for a desktop-only request unless necessary and stated first.
- Do not change unrelated styles, spacing, selectors, or runtime behavior while fixing a specific issue.
- Do not refactor while hotfixing unless the refactor is required to solve the bug.
- If the correct fix requires structural cleanup, explain that before changing code.

## 18. Memory and continuity policy

Do not rely on chat history as the only source of truth.

Use the repo documentation system to reconstruct current project state.

When starting in a new chat:

1. Read `/OPERATING_CONTRACT.md`.
2. Read relevant root state docs.
3. Read relevant module docs.
4. Inspect the owning files before changing code.

If repo docs conflict with chat context, flag the conflict and ask before structural changes.

## 19. Initial documentation bootstrap procedure

When this contract exists but the rest of the documentation system is incomplete, perform a documentation bootstrap before additional functional code changes.

Bootstrap tasks:

1. Create missing required docs and directories.
2. Audit existing markdown files.
3. Audit repo structure.
4. Identify global runtime files.
5. Identify module-owned files.
6. Identify active Fourthwall snippets and loader paths.
7. Identify known temporary hotfixes.
8. Identify current production risks.
9. Backfill `/ARCHITECTURE.md`.
10. Backfill `/STYLE_KEYS.md`.
11. Backfill `/MASTER.md`.
12. Start `/HISTORY/CHANGELOG.md` with a bootstrap entry and recent known updates.
13. Start `/HISTORY/PRE_FLIGHT_Check.md` with the bootstrap pre-flight entry.
14. Add initial records to `/HISTORY/DIFFS/` for bootstrap changes.
15. Ensure `/README.md` points to the required reading order.

After bootstrap, proceed under the normal update requirements in this contract.
