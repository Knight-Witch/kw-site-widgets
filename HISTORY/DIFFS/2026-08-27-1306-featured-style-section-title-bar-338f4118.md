# Reusable Featured-Style Section Title Bar

Date: 2026-08-27 13:06 UTC

Runtime commit: `338f4118005e8749122fdafb3d51bcae8529f07f`

## Request

Create a reusable GitHub-owned title bar with the same title/subtitle presentation as the Featured Spellweaves heading currently embedded in Fourthwall. It must accept arbitrary per-placement text and require only an HTML block on the Fourthwall page.

## Changes by file

### `components/kw-title-bars/kw-title-bars.css`

- Added `.kw-title-bar--section` with a solid black background and hidden overflow.
- Preserved the supplied Featured Spellweaves mobile margins, padding, font sizes, and title letter spacing against the active hotfix.
- Kept section behavior isolated from step and compact variants.

### `components/kw-title-bars/kw-title-bars.js`

- Changed explicit desktop `data-kw-fit` widths to important inline declarations so they outrank the temporary hotfix's general important width.
- Left fitting opt-in and selector-driven; bars without `data-kw-fit` are unchanged.

### Examples and documentation

- Added standalone section markup and an example matched to the Featured Spellweaves button-row span.
- Updated the reusable style reference, master project state, pre-flight log, and canonical changelog.

## Fourthwall usage

No new footer loader or jsDelivr tag is required. The existing global loader already loads the shared title-bar CSS and JavaScript from `main`.

## Unchanged behavior

- The original Featured Spellweaves carousel block remains in Fourthwall.
- Step title bars retain their 95%-opaque black fill.
- Base and compact title bars remain transparent.
- Carousel structure and behavior are unchanged.
- Global loader order and cache keys are unchanged.

## Rollback

Restore the title-bar CSS and JavaScript from parent commit `631b36b2b16c4a23709f691e50b65b90f70f86f5`.

## Validation

- `node --check components/kw-title-bars/kw-title-bars.js` passed.
- `git diff --check` passed.
- CSS values were compared directly with the user-supplied Featured Spellweaves implementation.
- Local rendered QA could not run because the browser binary was unavailable and its download timed out.
- Live Fourthwall desktop/mobile verification remains required.
