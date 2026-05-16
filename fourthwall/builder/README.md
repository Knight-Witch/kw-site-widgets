# Knight Witch Builder Widget

This folder contains the standalone Fourthwall jacket builder module. It is isolated from the featured carousel and uses the `kwb-` namespace for HTML, CSS, JavaScript state, and public methods.

## Intended Fourthwall page drop-in

```html
<div class="kwb-builder" data-kwb-core-collection="blackmass-core"></div>
```

Core collection examples:

```html
<div class="kwb-builder" data-kwb-core-collection="basscraft-core"></div>
<div class="kwb-builder" data-kwb-core-collection="blackmass-core"></div>
<div class="kwb-builder" data-kwb-core-collection="edgerunners-core"></div>
<div class="kwb-builder" data-kwb-core-collection="wickedhearts-core"></div>
<div class="kwb-builder" data-kwb-core-collection="astralplane-core"></div>
<div class="kwb-builder" data-kwb-core-collection="starchild-core"></div>
```

## Current development branch

`KW_Builder_Dev`

Use commit-pinned URLs when testing on Fourthwall to avoid jsDelivr cache lag.

## Initial module goals

Version 0.1 builds the desktop-first foundation:

1. Builder shell and visual container.
2. Cover screen with left video panel and right CTA copy.
3. Cauldron Core product step populated from `data-kwb-core-collection`.
4. Core selection state.
5. Expanded product media viewer.
6. Persistent right-side summary panel.
7. Disabled/enabled Next button based on valid selections.

Jacket selection, final cart writing, accent color logic, promo handling, Afterpay estimate polish, mobile optimization, and outro flow are staged after the Core foundation is stable.

## File map

```txt
fourthwall/builder/
  README.md
  BUILDER_MASTER_SPEC.md
  IMPLEMENTATION_PLAN.md
  CHANGELOG.md
  NOTES_CHANGELOG.md
  kwb-builder-loader.js
  kwb-builder-config.js
  kwb-builder.css
  kwb-builder.js
  data/
    accent-eligibility.json
```

## Namespace rules

The builder uses only `kwb-` classes, attributes, and public globals.

The existing featured carousel uses `kwfw-`. Do not mix the two namespaces.

## Public globals

```js
window.KWB_CONFIG
window.KWB
```

## Required inputs before full implementation

The builder can begin with placeholders, but these are needed before a complete production pass:

1. Jacket collection slugs for men/women/neutral + jackets/coats/vests.
2. Cover WEBM URL.
3. Optional outro WEBM URL.
4. Builder background image URL if it should be explicitly set inside the module.
5. Confirmation whether Cauldron Cores are real cart line items or only design selectors.
6. Accent eligibility rules or a list of core slugs that permit accent colors.
7. Trade Gothic LT Std CDN font URL if it should be loaded directly by the builder.
