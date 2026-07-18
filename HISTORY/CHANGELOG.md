# Changelog

Canonical repo-wide changelog. Module changelogs do not replace this file. Earlier detailed entries remain available through Git history and paired records under `/HISTORY/DIFFS/`.

## 2026-07-18 05:30 UTC — KW-RUNTIME-SIZE-GUIDES-018

Summary: Restored the Featured Spellweave Size Guide to the original quantity-box injection model, preserved the verified Step 3 field-level grid, corrected Samurai vest chart routing, and added separate unisex Vegan and Genuine Leather Samurai Moto charts.

Affected files:

```text
fourthwall/kwfw-size-guide.js
fourthwall/kwfw-size-guide.css
fourthwall/kwfw-size-guide-data.js
fourthwall/global/kw-fourthwall-loader.js
ARCHITECTURE.md
STYLE_KEYS.md
MASTER.md
fourthwall/global/README.md
fourthwall/global/CHANGELOG.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-07-18-samurai-size-guides-and-featured-row-1.md
```

Runtime commits:

```text
e04c39dd4dafcf7f33ff10cfb2e792e32a972623
32c872f7d081e095133301132743f7c4498b23d3
68e06910b03a489fe3a61820b5fc2b07b79494be
8666ed87f3e7a84ddebbbf1f7e3d45b25d1054c0
```

Reason: Featured Spellweaves were still misaligned because recent fixes wrapped the entire `.kwfw-field`. The historical working implementation wrapped only `.kwfw-qty`, leaving the Qty label in place. Samurai vest aliases also pointed to generic rocker charts, and the unisex Samurai Moto product needed material-specific measurements.

Behavior:

- Featured `kwfw` Size Guide now shares a row directly with `.kwfw-qty` inside the existing field.
- Step 3 `kwpj` remains on its verified field-level grid.
- Ladies Samurai vest resolves to `Ladies Crop-Top Vest Size Chart`.
- Mens Samurai vest resolves to `Men's Hooded Vest Size Chart`.
- Samurai Moto `Vegan Leather` resolves to `Vegan Moto Jacket - Unisex`.
- Samurai Moto `Genuine Leather` resolves to `Genuine Leather Moto Jacket - Unisex`.
- Material rules are product-scoped so unrelated Vegan/Genuine products are not affected.

Rollback: Restore loader commit `94a92c443658086ee2a3c5b822ba68a873c3f3ef` with cache key `20260717-featured-size-guide-restore-1`.

Production candidate: Loader commit `8666ed87f3e7a84ddebbbf1f7e3d45b25d1054c0`, cache key `20260718-samurai-size-guides-1`.

Validation: Replacement JavaScript and registry passed `node --check`. The live Samurai vest and Samurai Moto product titles, slug, and material labels were checked. No price, Add to Cart, gallery, carousel grid, rail, or wheel code changed.

## 2026-07-18 04:55 UTC — KW-RUNTIME-SIZE-GUIDES-017

Summary: Restored the Featured Spellweave `kwfw` Size Guide quantity-row layout to the last known-good flex behavior from before the July 18 spacing experiments, while preserving the corrected fixed-grid Step 3 `kwpj` layout.

Affected files:

```text
fourthwall/kwfw-size-guide.css
fourthwall/global/kw-fourthwall-loader.js
MASTER.md
STYLE_KEYS.md
fourthwall/global/README.md
fourthwall/global/CHANGELOG.md
HISTORY/PRE_FLIGHT_Check.md
HISTORY/CHANGELOG.md
HISTORY/DIFFS/2026-07-18-featured-size-guide-restore-1.md
```

Runtime commits:

```text
03128a0f5d4e06b3b16ff7a244cfd359677ca84d
94a92c443658086ee2a3c5b822ba68a873c3f3ef
```

Reason: The prior `kwfw`-only `display: contents`/explicit-grid-row correction moved Size Guide onto a separate lower row in the live Featured Spellweave modal. The Featured layout had already been correct before the shared Step 3 spacing work.

Change:

- Split standard and Step 3 quantity-row CSS by namespace.
- Restored the old `kwfw` flex/end-aligned row and native 170px quantity control.
- Retained the current `kwpj` two-column grid and explicit `48px 58px 48px` quantity geometry.
- Removed the bad `kwfw` display-contents and explicit row-placement rules.

Rollback: Restore loader commit `2a3d96c115de79cc6a22eb85181350cb4c76b465` with cache key `20260717-featured-size-guide-align-1`.

Production candidate: Loader commit `94a92c443658086ee2a3c5b822ba68a873c3f3ef`, cache key `20260717-featured-size-guide-restore-1`.

Scope: CSS and loader cache key only. No JavaScript, chart data, prices, cart, galleries, carousel cards, rail, or wheel behavior changed.

## 2026-07-18 04:40 UTC — KW-RUNTIME-SIZE-GUIDES-016

Summary: Attempted a `kwfw`-only explicit grid-row alignment using `display: contents` on the quantity field. Live verification showed this moved Size Guide onto a separate lower row. This state is superseded by KW-RUNTIME-SIZE-GUIDES-017.

Runtime commits:

```text
f3be53876a4ed3b5fc4f54a022818cbfd700abf9
2a3d96c115de79cc6a22eb85181350cb4c76b465
```

## 2026-07-18 04:25 UTC — KW-RUNTIME-SIZE-GUIDES-015

Summary: Corrected Step 3 quantity overlap by constraining both modal systems to explicit internal quantity geometry. Step 3 was verified fixed; Featured alignment remained unresolved.

Runtime commits:

```text
18cd5ac5c38921c29c8bac80de870b8c29914c92
0e12cbe2ff5b28bfc896c0bdf6bb6c5c8af4d462
```

## 2026-07-18 04:05 UTC — KW-RUNTIME-SIZE-GUIDES-014

Summary: Introduced a two-column quantity/Size Guide grid to prevent overlap.

Runtime commits:

```text
dd094b674e2d27209433bba24d5b56a5782a6c1b
698f65f6d87caa4d32b3839fbdfde205b09a022f
```

## 2026-07-18 03:25 UTC — KW-RUNTIME-SIZE-GUIDES-013

Corrected ladies chart identities and added exact Crop-Top Rocker/Snakeskin, Goth Merc, Punkass, and Biker mappings. Removed the unverified generic ladies moto mapping.

Runtime commits: `0c42e82110db0f3e13c5dc32bdc666f3821c3a30`; `0de2b178480bf6f1128ad50b9c0068e9cda50da7`.

## 2026-07-18 00:45 UTC — KW-RUNTIME-SIZE-GUIDES-012

Moved Size Guide into the quantity row in both modal systems, matched AgencyFB typography, and retained full-width native product-page placement.

Runtime commits: `642d30b4d34cc7a5aa8a81a99e99de48742b6257`; `2655c77e18f52a8861240deb1c21449541301693`; `3ae4a2f1827a4aa132da234faac94a876e18e489`.

## 2026-07-18 00:25 UTC — KW-RUNTIME-SIZE-GUIDES-011

Added the centralized exact chart registry and targeted injector for standard modals, Step 3 modals, and qualifying native product pages.

## 2026-07-17 — Product modal compatibility

Added real Fourthwall prices, restored modal Add to Cart styling, introduced selected-variant galleries, and corrected collection/detail variant matching. Detailed records remain in Git history and `/HISTORY/DIFFS/`.
