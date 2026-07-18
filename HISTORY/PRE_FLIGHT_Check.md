# Pre-Flight Check Log

This is the rolling pre-flight log for the Knight Witch site/widgets repository. Older detailed entries remain available through Git history and paired files under `/HISTORY/DIFFS/`.

## 2026-07-18 20:40 UTC — PF-20260718-019 — Featured row compatibility and chart compaction

Requested change:

- Fix the Featured Spellweave Size Guide button still appearing below the quantity controls.
- Keep the now-correct Step 3 jacket layout unchanged.
- Use AgencyFB for chart titles with enough tracking to remain readable.
- Reduce unused desktop chart space.
- Reduce unnecessary mobile column width and spacing.

Docs/files reviewed:

- `/OPERATING_CONTRACT.md`
- `/ARCHITECTURE.md`
- `/STYLE_KEYS.md`
- `/MASTER.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `/fourthwall/global/README.md`
- `/fourthwall/global/CHANGELOG.md`
- `fourthwall/kwfw-size-guide.js`
- `fourthwall/kwfw-size-guide.css`
- `fourthwall/global/kw-fourthwall-loader.js`
- Base `fourthwall/kwfw-carousel.css`
- Supplied live Featured Spellweave screenshot

Risk/conflict notes:

- The live editor may preserve an older `.kw-size-qty-size-row` without the newer `--kwfw` modifier during hot reload.
- Modifier-only CSS therefore leaves the row at its default block layout even though the current runtime structure is otherwise correct.
- Step 3 uses the same base row class but requires different field-level geometry.
- The existing `560px` mobile table minimum makes short charts unnecessarily wide.
- Size-chart table text must remain Arial/Helvetica for mobile readability even while the title changes to AgencyFB.

Plan/result:

- Extend only Featured selectors to cover both base and modifier row classes.
- Use a two-column `170px + max-content` Featured row with centered alignment.
- Preserve all current `.kwpj-*` rules unchanged.
- Change chart titles to AgencyFB with controlled desktop/mobile tracking.
- Make panel/table width content-driven on desktop.
- Reduce desktop cell padding and note spacing.
- Remove the blanket mobile `560px` minimum, wrap header labels, and use tighter mobile cell padding.
- Bump the global loader cache key.

Validation:

- Reviewed base quantity geometry and current namespace-specific selectors.
- Confirmed no JavaScript, registry, resolver, price, cart, gallery, carousel card, rail, grid, or wheel files changed.
- Live storefront verification remains required after replacing the pinned footer.

User input required:

- None.

## 2026-07-18 05:30 UTC — PF-20260718-018 — Samurai routing and original Featured row ownership

Restored Featured quantity-box ownership, preserved Step 3 field-level wrapping, added product-scoped material rules, corrected Samurai vest routing, and added separate Vegan/Genuine unisex Samurai Moto charts. JavaScript and registry passed syntax validation.

## 2026-07-18 04:55 UTC — PF-20260718-017 — Restore Featured Spellweave quantity row

Split Featured and Step 3 styling by namespace. Live Featured verification remained unsuccessful and was superseded by later work.

## 2026-07-18 04:40 UTC — PF-20260718-016 — Featured Size Guide vertical alignment

Attempted `display:contents`/explicit grid-row placement for Featured. Live verification failed; this state is not production-valid.

## 2026-07-18 04:25 UTC — PF-20260718-015 — Namespace-specific quantity-row correction

Applied explicit quantity geometry. Step 3 verified fixed; Featured remained unresolved.

## 2026-07-18 04:05 UTC — PF-20260718-014 — Size Guide quantity-control spacing

Introduced a separate Size Guide column to prevent quantity overlap.

## 2026-07-18 03:25 UTC — PF-20260718-013 — Correct ladies garment chart identities

Replaced generic ladies chart names with exact Crop-Top Rocker/Snakeskin, Goth Merc, Punkass, and Biker mappings. Removed the unverified generic ladies moto mapping.

## 2026-07-18 02:45 UTC — PF-20260718-012 — Size Guide modal placement and typography

Moved Size Guide into carousel quantity rows and retained native-page placement.

## 2026-07-18 00:25 UTC — PF-20260718-011 — Global product size-guide registry

Created the exact chart registry and targeted injector for standard modals, Step 3 modals, and qualifying native product pages.

## 2026-07-17 — Product modal compatibility

Restored real prices and modal CTA styling, added variant-specific galleries, and corrected variant matching without changing carousel scrolling.
