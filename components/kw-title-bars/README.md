# KW Title Bars

Reusable Knight Witch title bars for Fourthwall page sections.

Read root docs before editing this component:

1. `/OPERATING_CONTRACT.md`
2. `/ARCHITECTURE.md`
3. `/STYLE_KEYS.md`
4. `/MASTER.md`
5. `/HISTORY/CHANGELOG.md`
6. `/HISTORY/PRE_FLIGHT_Check.md`

## Files

```text
kw-title-bars.css
kw-title-bars.js
kw-title-bars-hotfix.css
kw-title-bars-hotfix-loader.js
examples/fourthwall-title-bars.html
README.md
```

## Current status

Active shared component.

Current production risk: the global loader loads `kw-title-bars.css` and `kw-title-bars.js` from floating `main`. The live footer currently also loads `kw-title-bars-hotfix-loader.js` as a temporary override to preserve title-bar visibility and mobile width.

Required follow-up: fold the hotfix into the base component/global-loader architecture and remove the extra hotfix footer snippet.

## Ownership

`kw-title-bars.css` owns base title-bar visuals.

`kw-title-bars.js` owns `data-kw-fit` width matching.

`kw-title-bars-hotfix.css` owns the temporary visibility/mobile-width override.

`kw-title-bars-hotfix-loader.js` owns loading the hotfix stylesheet from a pinned GitHub/jsDelivr ref.

## Fourthwall usage

When the global loader is active, do not add separate base CSS/JS tags for title bars. Add only the title-bar markup where needed.

## Featured Spellweaves

```html
<div class="kw-title-bar" data-kw-fit=".featured-prebuilds-nav .featured-prebuilds-btn">
  <div class="kw-title-bar__title">FEATURED SPELLWEAVES</div>
  <div class="kw-title-bar__subtitle">Ready-to-buy in just one click.</div>
</div>
```

## Step Title

```html
<div class="kw-title-bar kw-title-bar--step">
  <div class="kw-title-bar__title">STEP 1: CHOOSE YOUR CAULDRON CORE™</div>
</div>
```

## Compact Title

```html
<div class="kw-title-bar kw-title-bar--compact">
  <div class="kw-title-bar__title">STEP 2: CHOOSE YOUR JACKET STYLE</div>
</div>
```

## Width matching

Add `data-kw-fit` when the title bar should match the visual span of an existing row of buttons or tiles.

```html
<div class="kw-title-bar kw-title-bar--step" data-kw-fit=".your-row .your-button">
  <div class="kw-title-bar__title">STEP 1: CHOOSE YOUR CAULDRON CORE™</div>
</div>
```

The selector should target the repeated child buttons or tiles, not only the parent wrapper.

## Style rules

Base conventions:

- Transparent background.
- Red `1px` border.
- AgencyFB uppercase title text.
- White title.
- Muted gray subtitle.
- Desktop title letter spacing: `.6em`.
- Base max width: `95vw`.
- Negative outside margins used to tighten spacing around product sections.

Temporary hotfix conventions:

- Forces title bar, title, and subtitle visibility.
- Mobile width: `calc(100vw - 32px)`.
- Mobile title letter spacing: `.18em`.
- Must not become permanent architecture.

## Editing rules

- Fix base component behavior in this folder, not by changing every title-bar HTML block.
- Do not change global loader title-bar refs without updating `/ARCHITECTURE.md`, `/MASTER.md`, `/STYLE_KEYS.md`, `/HISTORY/CHANGELOG.md`, and `/HISTORY/DIFFS/`.
- Do not remove the hotfix until live title bars are verified without it.
