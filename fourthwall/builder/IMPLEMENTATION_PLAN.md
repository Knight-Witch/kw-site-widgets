# Knight Witch Builder Implementation Plan

## Phase 1: Builder shell and Core selection

Goal: establish the isolated builder widget, validate layout, product fetching, core selection, media expansion, and right-panel state.

Files:

```txt
kwb-builder-loader.js
kwb-builder-config.js
kwb-builder.css
kwb-builder.js
```

Deliverables:

- Loader script that injects builder CSS, config, and JS.
- `kwb-builder` page placeholder detection.
- Desktop builder shell.
- Cover screen.
- Core step using `data-kwb-core-collection`.
- 4x2 paged Core grid carousel.
- Expanded product media viewer.
- Select Core button.
- Right panel thumbnail and price update.
- Next button enabled after valid Core selection.

Testing:

```html
<div class="kwb-builder" data-kwb-core-collection="blackmass-core"></div>
```

## Phase 2: Jacket selection

Goal: add fixed jacket matrix and jacket variant/size selection.

Deliverables:

- Gender selector rail.
- Garment category selector rail.
- Config-driven jacket collection slug resolution.
- 3-tile focused jacket carousel.
- Expanded jacket media viewer.
- Size selector.
- Select Jacket button.
- Right panel thumbnail/line item update.

Required user inputs:

- Jacket collection slug matrix.

## Phase 3: Review and cart write

Goal: add final review and controlled Fourthwall cart writing.

Deliverables:

- Review screen.
- Editable size/selection summary.
- Add selected Core + selected Jacket variant to Fourthwall cart.
- Prevent duplicate cart items by writing only at final confirmation.
- Confirmation screen with View Cart button opening in a new tab.

Required user inputs:

- Confirmation whether Cores are real line items.

## Phase 4: Accent color scaffolding

Goal: add optional accent step driven by eligibility config.

Deliverables:

- Accent eligibility data file.
- Accent step skip logic.
- Accent product/option selection if enabled.

Required user inputs:

- Accent eligibility list.
- Accent product/collection model.

## Phase 5: Promo, Afterpay, shipping estimate polish

Goal: improve right-panel commercial information.

Deliverables:

- Promo code field UI.
- Subtotal calculation.
- Afterpay estimate display.
- Shipping/free-shipping messaging if Fourthwall exposes usable data.

## Phase 6: Outro and cross-sell panel

Goal: complete the post-add state.

Deliverables:

- Outro WEBM panel.
- Decor domain product tiles/webm buttons.
- See More button.
- Optional Instagram/social link.

## Phase 7: Mobile adaptation

Goal: convert desktop-first UI into a solid mobile experience.

Approach:

- Stack right panel as collapsible summary drawer.
- Convert core grid paging to horizontal mobile carousel.
- Keep modals full-screen and touch-friendly.
- Reduce persistent panel density.
