# Style Keys

This file records reusable visual rules, assets, CDN roots, breakpoints, layout footprints, and shared UI conventions. Read `/OPERATING_CONTRACT.md` and `/ARCHITECTURE.md` before changing shared styles.

## CDN roots

```text
Knight Witch media
https://knightwitch.nyc3.cdn.digitaloceanspaces.com

GitHub/jsDelivr
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets

Fourthwall Storefront API
https://storefront-api.fourthwall.com/v1
```

Native product and variant media may remain Fourthwall-hosted. Other site media should use the Knight Witch CDN unless documented otherwise. Repo-local assets belong in `/ASSETS/`.

## Fonts

Primary display stack:

```css
font-family: "AgencyFB", "Agency FB", AgencyFB, Arial, sans-serif;
```

Current font assets live under `/FONTS/`. Product descriptions, forms, and size-chart tables use Arial/Helvetica where readability requires it.

## Core palette

```css
#fff       primary white text
#000       black backgrounds
#050505    modal panel black
#111       controls and secondary surfaces
#1d1d1d    secondary modal buttons
#292929    form and quantity controls
#f00       Knight Witch red
#ff2a1d    collection subtitle red
#8a0000    dark red borders
#ff4b4b    product price red
#ff7a00    orange CTA / active control
#ffb04a    bright orange CTA border
#140a00    dark CTA text
#aaa       muted text
```

## Breakpoints

```css
@media (max-width: 768px)  shared mobile breakpoint
@media (max-width: 760px)  carousel/mobile modal split
@media (min-width: 761px)  carousel/desktop modal split
```

## Global foundation and background

Owned by:

```text
fourthwall/global/kw-global-foundation.css
fourthwall/global/kw-fourthwall-layout-guard.css
fourthwall/global/kw-global-config.js
fourthwall/global/kw-background-video.css
fourthwall/global/kw-background-video.js
```

The global page background uses transparent page/module wrappers where the video should remain visible. Intentional panels use black or near-black surfaces.

## Header and navigation

Owned by:

```text
fourthwall/global/kw-header.css
fourthwall/global/kw-header.js
```

Conventions: black/white glitch behavior, red drawer titles, fade/slide transitions, mobile drilldown, and internally scrolling desktop drawers.

## Title bars

Owned by `components/kw-title-bars/`.

```text
.kw-title-bar
.kw-title-bar--step
.kw-title-bar--compact
```

Transparent background, red 1px border, AgencyFB uppercase title, white title text, muted subtitle, and responsive fitting. The separate title-bar hotfix remains temporary.

## Product carousel

Owned by:

```text
fourthwall/kwfw-carousel.css
fourthwall/kwfw-carousel.js
fourthwall/kwfw-carousel-desktop-grid.css
fourthwall/kwfw-carousel-wheel-bridge.js
fourthwall/kwfw-font-agencyfb.css
```

Desktop footprint:

```text
rail width: min(984px, calc(100vw - 32px))
card width: 320px
card height: 426px
gap: 12px
```

Carousel scroll behavior is shared across base CSS, desktop overrides, and the wheel bridge. Do not change one layer in isolation.

## Product modal

Shared compatibility owner:

```text
fourthwall/kwfw-modal-product-fix.css
fourthwall/kwfw-modal-product-fix.js
```

Shared presentation owner:

```text
fourthwall/kw-product-modal-presentation.css
fourthwall/kw-product-modal-presentation.js
```

Supported namespaces:

```text
.kwfw-modal / .kwfw-panel
.kwpj-modal / .kwpj-panel
```

Primary Add to Cart CTA:

```css
background: #ff7a00;
color: #140a00;
border-color: #ffb04a;
```

The expanded Add to Cart button uses an orange glow/pulse. View Details uses `#1d1d1d`. Prices use `#ff4b4b` and must come from real Fourthwall variant data. Selected variants switch to assigned `variant.images` media with product-wide fallback.

### Unified modal surfaces and geometry

- Entire modal panels, grids, galleries, tracks, and information columns are black so transparent and black-background product media blend into the window.
- Desktop panels use `width:min(1120px,96vw)`.
- Desktop grids use `minmax(380px,1.18fr) minmax(360px,.82fr)`.
- Desktop galleries and tracks use a fixed `540px` height.
- All standard and Step 3 gallery media use `object-fit:contain`, `object-position:top center`, full track height, and black backgrounds.
- Single-media galleries hide navigation and dots.
- Both modal namespaces use AgencyFB for titles, prices, labels, controls, buttons, and description content.
- Product titles are white, prices red, collection subtitles red, and customer controls use `#292929`.
- Close buttons use black circular surfaces with white borders and Arial glyphs.

### Gallery navigation

- Both namespaces use the standard transparent white chevron style with no box or border.
- Desktop navigation is vertically centered, `44px × 60px`, with `10px` edge offsets.
- Mobile navigation is vertically centered, `38px × 56px`, with `8px` edge offsets.
- Hover/focus adds an orange/black text-shadow accent without adding a background box.
- Dots remain centered at the gallery bottom; active dots use `#ff7a00`.
- Standard `Swipe images` stays above the dots.

### Mobile modal geometry

- Panels use `width:min(100%,560px)` and `max-height:calc(100dvh - 16px)`.
- Gallery/track height uses `clamp(360px,118vw,620px)`.
- This replaces intrinsic-height expansion that created large gaps beneath standard product media.
- Information columns use `28px 22px 24px` padding so titles/descriptions begin closer to the gallery.

### Product title and collection subtitle

- Product titles use AgencyFB, heavy uppercase weight, and `.065em` tracking.
- Recognized `Cyberpunk 2077` title prefixes/suffixes are removed from the main title.
- The collection appears as a smaller red subtitle linked to `/pages/edgerunners`.
- Desktop hover/focus glitches between `Cyberpunk 2077` and `Edgerunners Collection`.
- Mobile cycles between both labels every four seconds using the same glitch treatment.
- Reduced-motion users receive a static subtitle without automatic animation.
- Unrecognized collection text remains part of the original product title until a controlled mapping is documented.

### Standard `kwfw` modal layout

- Gallery remains in the left column.
- Product title, collection subtitle, price, options, quantity, Size Guide, Add to Cart, View Details, status, and product description remain in `.kwfw-panel-info` in the right column.
- `.kwfw-desc-wide` is a retired full-width treatment and is always hidden.
- The visible option label `Description` is presented as `Size & Style Variant`; the underlying Fourthwall option name remains unchanged.
- Standard select width is calculated from the longest option for that specific product, not the selected option.
- Minimum standard select width is `124px`; maximum width is the available option-field width.
- Step 3 `.kwpj-select` sizing and option labels are not affected by the standard compatibility rule.

## Global size guide

Owned by:

```text
fourthwall/kwfw-size-guide-data.js
fourthwall/kwfw-size-guide.js
fourthwall/kwfw-size-guide.css
```

Primary classes:

```text
.kw-size-guide-btn
.kw-size-guide-native-btn
.kw-size-qty-size-row
.kw-size-qty-size-row--kwfw
.kw-size-qty-size-row--kwpj
.kw-size-modal
.kw-size-panel
.kw-size-top
.kw-size-units
.kw-size-unit
.kw-size-title
.kw-size-body
.kw-size-table-wrap
.kw-size-table
.kw-size-notes
.kw-size-picker
.kw-size-choice
```

Visual and layout rules:

- Size Guide buttons use AgencyFB, white uppercase text, black background, a subtle white border, and orange hover/focus state.
- Modal control height is `46px`.
- Standard `kwfw` and Step 3 `kwpj` use different quantity-row ownership.
- Featured Spellweaves keep `.kwfw-label` directly inside `.kwfw-field`; `.kwfw-qty` and Size Guide share a two-column row.
- Featured quantity controls use explicit `48px 58px 48px` tracks with two `8px` gaps; Size Guide occupies a separate column with a `10px` desktop gap.
- Step 3 retains a field-level `.kw-size-qty-size-row` grid with a `170px` quantity column, separate Size Guide column, and `16px` desktop gap.
- Native product-page buttons remain full width before Add to Cart.
- Overlay: `rgba(0,0,0,.82)`.
- Panel is content-driven with `width:fit-content`, a `560px` desktop minimum where space permits, viewport-constrained maximum width, `max-height:92vh`, near-black background, and subtle red shadow.
- Size-chart titles use AgencyFB at heavy weight with `.09em` desktop letter spacing and `.075em` mobile letter spacing.
- Chart tables remain Arial/Helvetica for readability, use content-driven column widths, black cells, red headers/borders, and tighter desktop padding.
- Mobile tables wrap header labels, use `12.5px` text and `7px 5px` cell padding, and scroll horizontally only when required.
- Body scroll locks while the popup is open and focus returns on close.

Chart resolution is registry-driven. Product-scoped material rules must be used for generic values such as `Vegan Leather` and `Genuine Leather`; never route those values globally.

## Universal product media

Owned by:

```text
fourthwall/kwfw-universal-media.css
fourthwall/kwfw-universal-media.js
fourthwall/prod_card_media/manifest.json
```

Shared support media uses the Knight Witch CDN. Universal-media behavior may style standard gallery media but must not relocate product descriptions outside `.kwfw-panel-info`.

## Product rules

Owned by:

```text
fourthwall/kwfw-product-rules.css
fourthwall/kwfw-product-rules.js
```

Current specialized fields include Logo Colour, System Type, and Text / Logo.

## Cart modal

Owned by:

```text
fourthwall/global/kw-cart-runtime.css
fourthwall/global/kw-cart-runtime.js
```

## Collection domain

Owned by `fourthwall/domains/collection/`. The collection feature video has its own module under `fourthwall/domains/collection/feature-video/`.

## Legacy warnings

`widgets/` is a legacy jQuery carousel. `gallery-portfolio/` references a missing runtime in the audited main branch. Experimental carousel loaders must not be used in production without revalidation.

## Update rule

Update this file whenever a change alters fonts, colors, reusable UI behavior, layout footprint, breakpoints, spacing, borders, buttons, carousel sizing, modal behavior, visual assets, CDN paths, title-bar conventions, or background behavior.
