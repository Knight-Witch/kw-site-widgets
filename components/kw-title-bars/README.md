# KW Title Bars

Reusable Knight Witch title bars for Fourthwall page sections.

## Files

```text
components/kw-title-bars/kw-title-bars.css
components/kw-title-bars/kw-title-bars.js
components/kw-title-bars/examples/fourthwall-title-bars.html
```

## Fourthwall Usage

Load the shared CSS and JS once on the page, then add one title-bar instance wherever needed.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@main/components/kw-title-bars/kw-title-bars.css">
<script src="https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@main/components/kw-title-bars/kw-title-bars.js" defer></script>
```

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

## Width Matching

Add `data-kw-fit` when the title bar should match the visual span of an existing row of buttons or tiles.

```html
<div class="kw-title-bar kw-title-bar--step" data-kw-fit=".your-row .your-button">
  <div class="kw-title-bar__title">STEP 1: CHOOSE YOUR CAULDRON CORE™</div>
</div>
```

The selector should target the repeated child buttons or tiles, not only the parent wrapper.
