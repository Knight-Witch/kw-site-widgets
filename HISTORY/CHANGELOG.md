# Changelog

Canonical repo-wide changelog. Module changelogs do not replace this file. Earlier detailed entries remain available through Git history and paired records under `/HISTORY/DIFFS/`.

## 2026-07-19 00:35 UTC — KW-RUNTIME-FEATURED-COLLECTIONS-023

Summary: Standard featured Spellweave cards now use clean main titles and collection-aware linked subtitles. Collection identity is resolved per product, so mixed homepage carousels can correctly label products from different Collection Domains without inheriting one label from the carousel holder.

Affected files:

```text
fourthwall/kw-product-modal-presentation.css
fourthwall/kw-product-modal-presentation.js
fourthwall/global/kw-fourthwall-loader.js
ARCHITECTURE.md
STYLE_KEYS.md
MASTER.md
fourthwall/README.md
fourthwall/global/README.md
fourthwall/global/CHANGELOG.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-07-19-featured-card-collections-2.md
```

Runtime commits:

```text
7a90ba867318e0491ea60d64fd4c450798231de6
8aa3cc5eb05f286370a85b6c3c365d3cfb9e451e
b5769ac1044197e4ca0c88409b62ecbc0f5abc8e
08c4dca8bf833d283cedfeb471f29bd2741a70cc
```

Reason: Standard cards previously hid their product titles and had no reliable Collection Domain label. Classifying from the visible carousel handle would fail on mixed homepage carousels, while classifying only from product-title text would fail when the source title does not include the collection name.

Behavior:

- Restores `.kwfw-card-title` as a white AgencyFB title with a two-line clamp.
- Adds a smaller red linked collection subtitle beneath the main title.
- Uses one controlled registry for Edgerunners, Basscraft, Wicked Hearts, Astral Plane, Black Mass, and Starchild.
- Fetches each controlled Fourthwall collection once per page and indexes membership by product slug and stable identifiers.
- Resolves each product independently, including mixed carousels.
- Uses embedded collection metadata, a dedicated holder handle, and recognized title text as progressively weaker fallbacks.
- Extends the same registry to expanded-modal title/subtitle formatting.
- Desktop pointer/focus glitches from the tagline to the collection name.
- Mobile cycles between tagline and collection name every four seconds unless reduced motion is enabled.

Controlled display pairs:

```text
Cyberpunk 2077 <-> Edgerunners Collection
Eat. Sleep. Rave. Repeat. <-> Basscraft Collection
Snakes Skulls & Sin <-> Wicked Hearts Collection
All Things Fantasy <-> Astral Plane Collection
Sci-fi & Beyond <-> Black Mass Collection
Mystics Zodiacs & Vibes <-> Starchild Collection
```

Scope exclusions:

- No Fourthwall product object is mutated.
- No variant resolution, price calculation, Add to Cart request, Size Guide behavior, selected-gallery media, carousel rail, grid, or wheel behavior changed.
- No Step 3 source file changed.

Rollback: Restore loader commit `e9404864ba58ab7daee8e771894d2c374a5f8fc3` with cache key `20260718-modal-sync-2`.

Production candidate: Loader commit `08c4dca8bf833d283cedfeb471f29bd2741a70cc`, cache key `20260718-featured-card-collections-2`.

Validation: The final presentation runtime passed `node --check`. Title prefix/suffix stripping, one-time collection-index caching, lookup priority, reduced-motion handling, and non-interference with price/cart/gallery/scroll systems were reviewed. Live verification remains required on the mixed homepage carousel and dedicated Edgerunners/Basscraft carousels.

Risks/follow-up: Future Collection Domain handles must be confirmed if they differ from the registered `-core` or plain aliases. Collection indexing adds one successful lookup per controlled collection, with an alias retry when the first handle is empty or unavailable. A full Fourthwall preview reload is required after replacing the footer so earlier script instances are discarded.

## 2026-07-18 23:58 UTC — KW-RUNTIME-MODAL-PRESENTATION-022

Summary: Added one shared presentation layer for the standard Spellweave/Cauldron Core `kwfw` modal and Step 3 jacket `kwpj` modal. Both product windows now share black surfaces, desktop gallery geometry, AgencyFB typography, color assignment, navigation treatment, mobile media spacing, clean product titles, and a linked Cyberpunk/Edgerunners collection subtitle.

Affected files:

```text
fourthwall/kw-product-modal-presentation.css
fourthwall/kw-product-modal-presentation.js
fourthwall/global/kw-fourthwall-loader.js
ARCHITECTURE.md
STYLE_KEYS.md
MASTER.md
fourthwall/README.md
fourthwall/global/README.md
fourthwall/global/CHANGELOG.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-07-18-modal-sync-2.md
```

Runtime commits:

```text
91ad6c2b3dd51b72507c95b5f93453ae80a5d512
c1e708b95ee19da4291d3dc7ee37f39d5c33fae8
3bf1285653188743c082de2a2a4584d70100d81e
d5dbd4e43cab008b6869439afab14e85109ba77f
e9404864ba58ab7daee8e771894d2c374a5f8fc3
```

Reason: The two expanded product systems had diverged in panel color, gallery dimensions, typography, navigation controls, mobile spacing, and title presentation even though they serve the same storefront workflow. The synchronization belongs in a shared presentation layer rather than duplicated changes inside separate product/cart runtimes.

Behavior:

- Entire `kwfw` and `kwpj` product windows use black panel, grid, gallery, track, and information-column surfaces.
- Desktop panels use `width:min(1120px,96vw)`, the standard two-column ratio, and a `540px` gallery cap.
- All modal media use `object-fit:contain`, `object-position:top center`, and full fixed track height.
- Both systems use AgencyFB titles, labels, controls, buttons, and descriptions with the same white/red/orange color assignments.
- Step 3 boxed gallery arrows are replaced by the standard transparent white chevrons.
- Mobile uses Step 3 edge offsets with standard arrow styling, shared `clamp(360px,118vw,620px)` gallery height, and tighter information padding.
- Single-media galleries hide navigation and dots.
- Recognized `Cyberpunk 2077` prefixes/suffixes are removed from the main product title.
- A red subtitle links to `/pages/edgerunners`.
- Desktop hover/focus glitches the subtitle to `Edgerunners Collection`; mobile cycles both labels every four seconds unless reduced motion is active.

Scope exclusions:

- No product loading, product data, option values, selected-variant resolution, price calculation, Add to Cart request, gallery-media selection, carousel rail, grid, or wheel behavior changed.
- No branch-owned Step 3 source file was modified.

Rollback: Restore loader commit `e0a3259a41624d7e45ebb74a145d888a76246410` with cache key `20260718-step3-gallery-top-align-1`.

Production candidate: Loader commit `e9404864ba58ab7daee8e771894d2c374a5f8fc3`, cache key `20260718-modal-sync-2`.

Validation: Shared presentation JavaScript passed `node --check`; controlled title parsing was checked against prefix, suffix, em-dash, and unrelated-title cases; single-media controls are explicitly suppressed; loader order was reviewed. Live desktop/mobile storefront verification remains required.

Risks/follow-up: The first controlled collection mapping recognizes Cyberpunk 2077 only. Additional collections require explicit mappings. Fourthwall editor sessions should be fully reloaded after replacing the footer so earlier script listeners are discarded.

## 2026-07-18 22:05 UTC — KW-RUNTIME-STEP3-GALLERY-021

Top-aligned Step 3 jacket modal gallery media inside the existing fixed viewport without changing gallery dimensions, variants, prices, cart controls, Size Guide, or scrolling. Superseded by the unified presentation layer.

Runtime commits: `76d116c4283c654d3bc3f9ba4b6030782fb43b95`; `e0a3259a41624d7e45ebb74a145d888a76246410`.

## 2026-07-18 21:20 UTC — KW-RUNTIME-STANDARD-MODAL-020

Returned standard product descriptions to the right information column, presented `Description` as `Size & Style Variant`, and added stable product-specific select widths based on the longest option.

Runtime commits: `59fba0ff65f137f3bf5c1e5835f4f6ea18201965`; `9d2cb7e61fca4d27b32035f8aff8bf59833d6f87`; `a721343eaa347a0ae3d49e2a3c468705d90727fa`; `87805c95bceb8b0060273857fe8120de28273af4`; `4bc31f2f1c2dd6253625391a45d11c9786e93f06`.

## 2026-07-18 20:40 UTC — KW-RUNTIME-SIZE-GUIDES-019

Added legacy-row-compatible Featured Size Guide alignment, AgencyFB size-chart titles, content-driven chart widths, and tighter mobile table spacing.

Runtime commits: `f28f4ae79bca76ba40c26ec91d5e326eaf7d8098`; `aa8ad96cb30ddfcff156be0785846040633aea3d`.

## 2026-07-18 05:30 UTC — KW-RUNTIME-SIZE-GUIDES-018

Restored Featured quantity-box injection, preserved Step 3 field-level geometry, corrected Samurai vest routing, and added product-scoped Vegan/Genuine unisex Samurai Moto charts.

Runtime commits: `e04c39dd4dafcf7f33ff10cfb2e792e32a972623`; `32c872f7d081e095133301132743f7c4498b23d3`; `68e06910b03a489fe3a61820b5fc2b07b79494be`; `8666ed87f3e7a84ddebbbf1f7e3d45b25d1054c0`.

## 2026-07-18 04:25 UTC — KW-RUNTIME-SIZE-GUIDES-015

Corrected Step 3 quantity overlap with explicit internal geometry. Step 3 was verified fixed.

## 2026-07-18 03:25 UTC — KW-RUNTIME-SIZE-GUIDES-013

Corrected ladies chart identities and added exact Crop-Top Rocker/Snakeskin, Goth Merc, Punkass, and Biker mappings. Removed the unverified generic ladies moto mapping.

## 2026-07-17 — Product modal compatibility

Added real Fourthwall prices, restored modal Add to Cart styling, introduced selected-variant galleries, and corrected collection/detail variant matching. Detailed records remain in Git history and `/HISTORY/DIFFS/`.
