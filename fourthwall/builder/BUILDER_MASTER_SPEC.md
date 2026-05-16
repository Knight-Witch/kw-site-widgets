# Knight Witch Builder Master Specification

## Working name

Knight Witch Builder

## Purpose

The builder is a desktop-first Fourthwall widget that lets a customer build a luminous jacket bundle without leaving the collection domain page.

The customer flow is:

1. Start builder from cover screen.
2. Select Cauldron Core design.
3. Select jacket style and size.
4. Select accent color if the selected core permits it.
5. Review selections.
6. Add final build to cart.
7. Show confirmation and optional post-purchase navigation.

## Required page drop-in

```html
<div class="kwb-builder" data-kwb-core-collection="blackmass-core"></div>
```

## Namespacing

All builder code must use the `kwb-` prefix.

Avoid `kwfw-`; that namespace belongs to the featured carousel widget.

## Core collection slugs

Known collection-domain core slugs:

```txt
basscraft-core
blackmass-core
edgerunners-core
wickedhearts-core
astralplane-core
starchild-core
```

## Visual direction

The long-term visual model is the attached mockup set from the builder planning discussion:

- Cover screen with left looping silent WEBM and right text stack.
- Red magic / dark panel background.
- Red outline UI containers.
- AgencyFB for major titles and buttons.
- Trade Gothic LT Std preferred for right panel detail text, pending CDN/font source.
- Orange/yellow heartbeat CTA styling reused from the featured carousel.
- Right-side persistent summary panel titled `Your Weave`.

## Functional stages

### Stage 0: Cover

Show a left media panel and right CTA panel.

CTA copy:

```txt
DESIGN YOUR JACKET
YOUR VISION
YOUR STYLE
BEGINS HERE
START MY DESIGN
```

The left media panel should use a silent, autoplaying, looping WEBM with no controls. If no URL is configured, show a placeholder panel.

### Stage 1: Cauldron Core

Fetch products from `data-kwb-core-collection`.

Display products in a desktop carousel grid.

User can open a product media viewer.

Expanded product view requirements:

- Dim only the builder content area, not the right-side summary panel.
- Show media thumbnails in a vertical rail when more than one item exists.
- Show selected media in a large square/near-square viewport.
- Click/tap outside or Escape closes without selecting.
- `Select Core` button selects the product.
- Selected core tile receives the orange/yellow heartbeat selected outline.
- Right panel Core thumbnail populates from the selected product's first image.
- Next button enables once a core is selected.

### Stage 2: Jacket

Uses fixed jacket collection slug matrix from config.

Controls:

- Gender rail: Men / Women / Neutral.
- Style rail: Jackets / Coats / Vests.

The active rail item should slide/animate visually and have stronger red border/text scale.

The selected gender + style resolves to the proper jacket collection slug.

Jacket product carousel shows three tiles, with center focus enlarged and thicker red border.

Expanded jacket view requirements:

- Same media viewer structure as Core.
- Size selector inside expanded view.
- `Select Jacket` button.
- Selected jacket thumbnail populates right panel.
- Selected jacket price and variant update subtotal.

### Stage 3: Accent Color

Scaffolding only until product/eligibility data is defined.

Accent step should be skipped if selected Core is not eligible.

Eligibility should be driven by config or data file, not Fourthwall product metadata, unless usable metadata is later discovered.

### Stage 4: Review

Show Core and Jacket selection tiles.

Clicking either tile returns user to that step and scrolls/focuses selected item.

Show size and accent controls if applicable.

Changing size should update selected variant state and should not duplicate old cart items.

### Stage 5: Add to Cart / Confirmation

Final cart write should happen only at review confirmation, not during intermediate steps.

Add selected Core item, selected Jacket variant, and optional Accent item in one controlled action.

Confirmation screen shows:

```txt
ADDED TO CART!
Finish your checkout process & our witches will start your Spellweave!
VIEW CART
```

`View Cart` opens cart in a new tab.

### Stage 6: Outro / Cross-sell

Silent looping WEBM on left.

Right-side panel with clickable decor/webm tiles and `See More` button.

Instagram/social link can come later.

## Cart strategy

Do not write to cart during selection steps. Maintain a local builder state and only write to Fourthwall cart on final confirmation.

Reason: prevents duplicate cart lines when users change core, jacket, size, or accent.

## Right panel

The right panel remains fixed within the builder UI throughout interactive steps.

It should show:

- Core thumbnail once selected.
- Jacket thumbnail once selected.
- Accent selection if applicable.
- Promo code field placeholder.
- Selection line items and costs.
- Subtotal estimate.
- Afterpay estimate if feasible.
- Shipping/tax note.
- Next/Add button.

## Promo / shipping / Afterpay constraints

Fourthwall may not expose exact active promotion, shipping, or Afterpay calculations to public storefront widgets.

Initial implementation should show local subtotal and an estimated installment message. Exact discounts/free-shipping detection should be added only after confirming the cart API returns those values.

## Performance constraints

- Use external GitHub-hosted files.
- Keep Fourthwall footer small.
- Loader pattern preferred.
- Avoid large inline code on Fourthwall.
- Use lazy rendering/fetching per step where possible.
- Avoid conflicts with existing featured carousel.

## Open questions

1. Are Cauldron Cores real purchasable Fourthwall products added as cart line items?
2. Are Jacket products separate purchasable Fourthwall products added as cart line items?
3. What are the exact jacket collection slugs for the gender/style matrix?
4. What is the cover WEBM URL?
5. What is the builder red magic background asset URL?
6. What is the Trade Gothic LT Std CDN/font source?
7. Which Cores are accent-color eligible?
8. Is accent color represented by a product, variant, customization, or non-cart selection?
