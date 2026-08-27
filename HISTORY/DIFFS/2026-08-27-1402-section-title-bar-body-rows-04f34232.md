# Optional Section Title-Bar Body Rows

Date: 2026-08-27 14:02 UTC

Runtime commit: `04f3423268aa8b735d85592fb9b25d3210e37d16`

## Request

Allow the reusable Featured-style section title bar to contain several individually editable body-text rows instead of requiring all context to be written as one paragraph.

## Changes by file

### `components/kw-title-bars/kw-title-bars.css`

- Added an optional `.kw-title-bar__body` grid scoped to `.kw-title-bar--section`.
- Added repeatable `.kw-title-bar__body-row` styling with AgencyFB, `#ddd`, centered alignment, normal sentence casing, compact gaps, and responsive sizing.
- Added desktop/mobile body variables for top/bottom padding, row gaps, and font size.

### Examples and documentation

- Added reusable markup showing three independently editable rows.
- Updated the reusable style reference, master project state, pre-flight log, and canonical changelog.

## Fourthwall usage

No new footer loader, stylesheet tag, or JavaScript is required. Add or remove `.kw-title-bar__body-row` elements in the page's existing HTML block.

## Unchanged behavior

- Section bars without `.kw-title-bar__body` render exactly as before.
- Title and subtitle presentation is unchanged.
- Step, compact, and base title bars are unchanged.
- `data-kw-fit`, the title-bar JavaScript, global loader order, and cache keys are unchanged.

## Rollback

Restore `components/kw-title-bars/kw-title-bars.css` from parent commit `dc3dde6348f0a07682b4047c7f49494250e1eb30`.

## Validation

- `git diff --check` passed.
- Stylesheet opening and closing brace counts are balanced.
- New selectors are scoped to `.kw-title-bar--section`.
- Live Fourthwall desktop/mobile verification remains required.
