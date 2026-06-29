# Knight Witch Info Sections

Shared Fourthwall accordion system for FAQ, warranty, maintenance, contact, returns, and other reusable information modules.

## Footer install for testing

Use this in the Fourthwall footer while testing the dev branch:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@kw-info-accordion-dev/fourthwall/info-sections/kw-info-sections.css">
<script defer src="https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@kw-info-accordion-dev/fourthwall/info-sections/kw-info-sections.js"></script>
```

After merge, change `@kw-info-accordion-dev` to `@main`.

## Page drop-in

Put this where the information sections should render:

```html
<div class="kw-info-sections" data-kw-info-sections="faq,returns,warranty,maintenance,contact"></div>
```

The modules render in the exact order listed.

## Recommended page setups

FAQ page:

```html
<div class="kw-info-sections" data-kw-info-sections="faq,returns,warranty,maintenance,contact"></div>
```

Warranty page:

```html
<div class="kw-info-sections" data-kw-info-sections="warranty,maintenance,contact"></div>
```

Maintenance & Repairs page:

```html
<div class="kw-info-sections" data-kw-info-sections="maintenance,warranty,contact"></div>
```

Returns page:

```html
<div class="kw-info-sections" data-kw-info-sections="returns,contact"></div>
```

Test page:

```html
<div class="kw-info-sections" data-kw-info-sections="test"></div>
```

## Alternate true/false config

```html
<div class="kw-info-sections" data-kw-info-config='{"faq":true,"returns":true,"warranty":true,"maintenance":false,"contact":true}'></div>
```

## Multiple open sections

By default, opening one drawer closes the others. To allow multiple sections open at once:

```html
<div class="kw-info-sections" data-kw-info-sections="faq,warranty,maintenance" data-kw-info-multiple="true"></div>
```

## Spacing controls

The widget uses CSS variables for page-level spacing:

```html
<div class="kw-info-sections" data-kw-info-sections="faq" style="--kw-info-top-desktop:150px; --kw-info-top-mobile:60px; --kw-info-bottom-desktop:40px; --kw-info-bottom-mobile:30px;"></div>
```

## Existing module keys

- `test`
- `faq`
- `returns`
- `maintenance`
- `warranty`
- `about`
- `promos`
- `inquiries`
- `partnerships`
- `contact`

## Current content status

Rewritten and production-ready first-pass content:

- `faq`
- `returns`
- `maintenance`
- `warranty`
- `contact`

Modules intentionally left as editable starters for future content:

- `about`
- `promos`
- `inquiries`
- `partnerships`

## Editing module content

Each module is an HTML fragment in:

```text
fourthwall/info-sections/modules/
```

Each collapsible block is an article:

```html
<article data-kw-info-item data-kw-info-title="TITLE HERE">
  <h3>Subheader</h3>
  <p>Body content.</p>
</article>
```

Use normal HTML inside the article. Do not add page-level `html`, `head`, `body`, or global reset code inside module files.
