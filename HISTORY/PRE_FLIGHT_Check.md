# Pre-Flight Check Log

This is the rolling pre-flight log for the Knight Witch site/widgets repository. Older detailed entries remain available through Git history and paired files under `/HISTORY/DIFFS/`.

## 2026-07-18 05:30 UTC — PF-20260718-018 — Samurai routing and original Featured row ownership

Requested change:

- Fix the still-crooked Featured Spellweave Size Guide without changing the verified Step 3 layout.
- Correct Samurai vest chart titles/routing.
- Add separate unisex Vegan and Genuine Leather Samurai Moto charts.

Files reviewed:

- Historical `fourthwall/kwfw-size-guide.js` at commit `f00c8dd64c573dd0c782036cf3df3a7dca53482c`.
- Current `fourthwall/kwfw-size-guide.js` and `kwfw-size-guide.css`.
- Current size-guide registry.
- Standard `.kwfw-field`, `.kwfw-label`, and `.kwfw-qty` ownership.
- Step 3 `.kwpj-field` and `.kwpj-qty` ownership.
- Live Samurai vest and Samurai Moto product pages/variant labels.
- Supplied Vegan and Genuine Leather chart screenshots.

Risk/conflict notes:

- The historical working Featured implementation wrapped only `.kwfw-qty`; recent implementations wrapped the entire field, which includes the Qty label and causes vertical misalignment or row wrapping.
- Step 3 requires the opposite ownership: the full field remains inside its fixed two-column grid.
- `Vegan Leather` and `Genuine Leather` are generic values used by unrelated products, so material-only global aliases would route incorrect charts.
- The Samurai Moto genuine chart contains regular, tall, big, and big-tall rows and requires horizontal table scrolling on narrow viewports.

Plan/result:

- Restore standard-modal injection inside `.kwfw-field` around `.kwfw-qty` only.
- Preserve Step 3 field-level wrapping and fixed geometry.
- Add namespace-specific row classes and cleanup for legacy hot-reloaded wrappers.
- Add product-scoped variant rules before generic aliases in resolver priority.
- Route Ladies Rocker Vest to Ladies Crop-Top Vest.
- Route Mens Rocker Vest and mens vest-only/collar variants to Men's Hooded Vest.
- Add separate Vegan and Genuine Leather unisex Samurai Moto charts.
- Bump the pinned loader cache key.

Validation:

- Replacement JavaScript and registry passed `node --check`.
- Live product title, slug, and material labels were checked.
- Step 3 CSS selectors and geometry were preserved.
- No price, cart, variant-gallery, carousel card, rail, grid, or wheel code changed.
- Live visual verification remains required after replacing the footer.

## 2026-07-18 04:55 UTC — PF-20260718-017 — Restore Featured Spellweave quantity row

Requested change:

- Restore the Featured Spellweave `kwfw` Size Guide placement that was working before the July 18 quantity-row changes.
- Preserve the now-correct Step 3 `kwpj` quantity and Size Guide layout.

Files reviewed:

- Current `fourthwall/kwfw-size-guide.css`
- Current `fourthwall/kwfw-size-guide.js`
- Base `fourthwall/kwfw-carousel.css`
- Last known-good Featured Spellweave CSS at loader commit `0de2b178480bf6f1128ad50b9c0068e9cda50da7`
- Current loader and live screenshot

Risk/conflict notes:

- The previous fix flattened the `kwfw` quantity field with `display: contents` and assigned explicit grid rows, which moved Size Guide below the quantity controls in the live modal.
- Returning both modal systems to the old flex rule would regress the Step 3 overlap fix.
- The modal injector itself is functioning; the regression is CSS-only.

Plan/result:

- Split quantity-row rules by namespace.
- Restore only `kwfw` to the prior flex/end-aligned layout.
- Retain the current fixed two-column grid and `48px 58px 48px` quantity geometry for `kwpj`.
- Remove the bad `kwfw` display-contents/explicit-grid-row rules.
- Bump the global loader cache key.

Validation:

- Compared the old and current size-guide CSS directly.
- No JavaScript, chart data, prices, cart, gallery, carousel card, rail, or wheel behavior changed.
- Live visual verification failed; the full field remained the wrong ownership boundary and this state was superseded by PF-20260718-018.

## 2026-07-18 04:40 UTC — PF-20260718-016 — Featured Size Guide vertical alignment

Requested change:

- Leave the now-correct Step 3 `kwpj` quantity row untouched.
- Raise the featured Spellweave `kwfw` Size Guide button so it aligns exactly with the quantity controls.

Files reviewed:

- `fourthwall/kwfw-size-guide.css`
- `fourthwall/kwfw-size-guide.js`
- Base `fourthwall/kwfw-carousel.css`
- Live featured-modal screenshot

Risk/conflict notes:

- The standard quantity label and controls live inside one `.kwfw-field`, so aligning the button against the field can align it against the combined label-plus-control height rather than the control row.
- Applying another shared `kwpj` rule would risk regressing the Step 3 fix.

Plan/result:

- Add `kwfw`-only grid rows.
- Flatten only the standard `.kwfw-field` with `display: contents`.
- Place the Qty label in row 1.
- Place both `.kwfw-qty` and Size Guide in row 2.
- Leave all `.kwpj-*` geometry unchanged.
- Bump the global loader cache key.

Validation:

- CSS-only namespace-specific change.
- No JavaScript, chart data, prices, cart, gallery, carousel card, rail, or wheel behavior changed.
- Live visual verification failed; the button moved onto its own lower row and this state was replaced by later entries.

## 2026-07-18 04:25 UTC — PF-20260718-015 — Namespace-specific quantity-row correction

Requested change:

- Standard `kwfw`: raise the Size Guide button so it aligns with the quantity controls.
- Step 3 `kwpj`: stop the quantity input/plus control from rendering underneath the Size Guide button.

Files reviewed:

- `fourthwall/kwfw-size-guide.css`
- `fourthwall/kwfw-size-guide.js`
- Base `fourthwall/kwfw-carousel.css` quantity rules
- Branch-owned `components/kw-plain-jackets/kw-plain-jackets.css`
- `components/kw-plain-jackets/kw-plain-jackets-polish.css`
- Both supplied live screenshots

Risk/conflict notes:

- The wrapper field was fixed at 170px, but live Step 3 styles still allowed its internal `.kwpj-qty` grid/input to expand beyond that field.
- The standard modal retained bottom margin/height differences that shifted Size Guide below the quantity controls.
- Changing the injector or moving nodes again would add unnecessary risk; the failure is CSS geometry.

Plan/result:

- Keep the existing shared wrapper/injector.
- Force both namespaces to an explicit `48px 58px 48px` quantity grid with two 8px gaps.
- Constrain the input and buttons to their grid tracks.
- Force quantity-field margin to zero.
- Bottom-align Size Guide in a separate grid column with a 16px desktop gap.
- Preserve mobile access with a 10px gap and horizontal overflow.

Validation:

- No JavaScript, chart data, prices, cart, galleries, carousel cards, rail, or wheel code changed.
- Step 3 verified fixed. Featured Spellweave alignment remained incorrect and was superseded by later entries.

## 2026-07-18 04:05 UTC — PF-20260718-014 — Size Guide quantity-control spacing

Requested change:

- Move the carousel Size Guide button away from the quantity input so it no longer covers the quantity area or plus control.

Docs/files reviewed:

- `/ARCHITECTURE.md`
- `/STYLE_KEYS.md`
- `/MASTER.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `fourthwall/kwfw-size-guide.css`
- `fourthwall/kwfw-size-guide.js`
- Standard `kwfw` quantity CSS
- Step 3 `kwpj` quantity CSS
- Supplied screenshot showing the overlap

Risk/conflict notes:

- Both carousel modal systems use a native 170px three-control quantity grid.
- The previous wrapper used auto-sized flex children; the wrapped `.kwfw-field`/`.kwpj-field` could claim the available row width, allowing the Size Guide button to visually cover the input/plus area.
- The fix must not change button injection, chart resolution, modal JavaScript, or carousel behavior.

Plan/result:

- Convert `.kw-size-qty-size-row` to a two-column grid.
- Reserve exactly 170px for the quantity field/control.
- Place Size Guide in a separate max-content column with a 14px desktop gap and 8px mobile gap.
- Bump the global loader cache key.

Validation:

- Reviewed both native quantity control footprints.
- No JavaScript changed.
- No chart data, price, cart, gallery, rail, grid, or wheel behavior changed.

## 2026-07-18 03:25 UTC — PF-20260718-013 — Correct ladies garment chart identities

Replaced generic ladies chart names with exact Crop-Top Rocker/Snakeskin, Goth Merc, Punkass, and Biker mappings. Removed the unverified generic ladies moto mapping. Registry passed syntax validation; no modal UI or carousel behavior changed.

## 2026-07-18 02:45 UTC — PF-20260718-012 — Size Guide modal placement and typography

Moved Size Guide into the quantity row in both modal systems, matched AgencyFB typography, and retained full-width native product-page placement.

## 2026-07-18 00:25 UTC — PF-20260718-011 — Global product size-guide registry

Created the exact chart registry and targeted injector for standard modals, Step 3 modals, and qualifying native product pages. Added US/Metric conversion and normal modal dismissal/focus behavior.

## 2026-07-17 23:58 UTC — PF-20260717-010 — Variant gallery selection correction

Preserved the collection-product object, separated detail data, and corrected selected-variant matching without changing carousel layout or scroll.

## 2026-07-17 23:38 UTC — PF-20260717-009 — Variant-specific product modal galleries

Added selected-variant media switching with product-wide fallback and preserved universal support slides.

## 2026-07-17 21:19 UTC — PF-20260717-008 — Dual-carousel product modal audit

Restored real Fourthwall modal prices and the Step 3 orange Add to Cart CTA.
