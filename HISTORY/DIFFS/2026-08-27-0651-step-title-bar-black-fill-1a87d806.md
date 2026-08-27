# Step Title-Bar Black Fill

Date: 2026-08-27 06:51 UTC

Runtime commit: `1a87d806d05b1bb8dd32cdc3280a3408a33fc756`

## Request

Add a nearly solid black background inside the red border of the step title bars, using 95% opacity and leaving only slight transparency.

## Changes by file

### `components/kw-title-bars/kw-title-bars.css`

- Added a step-specific `rgba(0, 0, 0, .95)` background.
- Used the combined base-and-step selector plus `!important` so the new fill overrides the active compatibility stylesheet's general transparent-background declaration.

### `components/kw-title-bars/kw-title-bars-hotfix.css`

- Mirrored the same step-specific background rule for compatibility parity while the temporary hotfix remains active.

### Documentation

- Updated the title-bar module README and reusable style reference.
- Updated the master project state, pre-flight record, and canonical changelog.

## Unchanged behavior

- Base and compact title-bar backgrounds remain transparent.
- Red borders, sizing, margins, padding, fonts, letter spacing, responsive rules, and width-fitting JavaScript are unchanged.
- Global loader order, Fourthwall snippets, and cache keys are unchanged.

## Rollback

Restore both title-bar stylesheets from parent commit `c29c146b818e62c8c405e2b93a7c28127a1e14c0`.

## Validation

- `git diff --check` passed.
- The updated base stylesheet was retrieved from jsDelivr with the current loader cache query.
- Live Fourthwall visual verification was not available in this work session.
