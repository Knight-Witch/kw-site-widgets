# Changelog

Canonical repo-wide changelog. Module changelogs do not replace this file. Earlier detailed entries remain available through Git history and paired records in `/HISTORY/DIFFS/`.

## 2026-07-18 03:25 UTC — KW-RUNTIME-SIZE-GUIDES-013

Summary: Corrected the ladies size-guide registry to use exact product identities instead of the inherited generic `Ladies Rocker Vest` and `Ladies Moto Vest` chart names. Added exact charts for Ladies Goth Merc Vest, Ladies Punkass Vest, Ladies Biker Vest, and Ladies Crop-Top Rocker Jacket. The Ladies Snakeskin Crop Top Vest shares the Crop-Top Rocker chart as directed.

Affected files:

```text
fourthwall/kwfw-size-guide-data.js
fourthwall/global/kw-fourthwall-loader.js
MASTER.md
fourthwall/global/README.md
fourthwall/global/CHANGELOG.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-07-18-ladies-size-guide-corrections-1.md
```

Runtime commits:

```text
0c42e82110db0f3e13c5dc32bdc666f3821c3a30
0de2b178480bf6f1128ad50b9c0068e9cda50da7
```

Reason: The older ladies keys came from a generic five-chart routing system and did not represent the actual current base-garment names. Manufacturer-specific sizing cannot safely use broad vest/moto labels.

Behavior:

- `Ladies Rocker Vest` remains only as a featured-product variant alias and resolves to the shared Ladies Crop-Top Rocker Jacket / Ladies Snakeskin Crop Top Vest chart.
- Exact native/base-product slugs now resolve Goth Merc, Punkass, Biker, Crop-Top Rocker, and Snakeskin charts.
- The unverified generic `ladies-moto-vest` chart was removed rather than exposed under a false product identity.

Rollback: Restore loader commit `3ae4a2f1827a4aa132da234faac94a876e18e489` with cache key `20260717-size-guide-placement-2`.

Production candidate: Loader commit `0de2b178480bf6f1128ad50b9c0068e9cda50da7`, cache key `20260717-ladies-size-guides-1`.

Validation: Registry passed `node --check`. No modal placement, typography, price, gallery, cart, carousel layout, or scroll code changed.

## 2026-07-18 00:45 UTC — KW-RUNTIME-SIZE-GUIDES-012

Summary: Returned the Size Guide button to the quantity-control row in both standard `kwfw` and Step 3 `kwpj` product modals. The button now uses the same AgencyFB display stack and 46px control height as the carousel quantity UI. Native Fourthwall product-page buttons remain full width before Add to Cart.

Affected files:

```text
fourthwall/kwfw-size-guide.js
fourthwall/kwfw-size-guide.css
fourthwall/global/kw-fourthwall-loader.js
ARCHITECTURE.md
STYLE_KEYS.md
MASTER.md
fourthwall/global/README.md
fourthwall/global/CHANGELOG.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-07-18-size-guide-placement-2.md
```

Runtime commits:

```text
642d30b4d34cc7a5aa8a81a99e99de48742b6257
2655c77e18f52a8861240deb1c21449541301693
3ae4a2f1827a4aa132da234faac94a876e18e489
```

Reason: The global injector initially placed the modal button directly before Add to Cart, which changed the established compact quantity-row layout and made the Step 3 button full width.

Rollback: Restore loader commit `1e5cb24e662a37358d296949e998c4980309a883` with cache key `20260717-size-guide-registry-1`.

Production candidate: Loader commit `3ae4a2f1827a4aa132da234faac94a876e18e489`, cache key `20260717-size-guide-placement-2`.

Validation: Reviewed both modal quantity structures. The injector creates one idempotent `.kw-size-qty-size-row`, reuses the existing quantity field/button, and keeps a full-width fallback only when no quantity field exists. No chart data, price, gallery, cart, grid, rail, or scroll behavior changed. Live visual verification remains required.
