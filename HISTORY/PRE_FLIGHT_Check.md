# Pre-Flight Check Log

This file is the rolling pre-flight log for the Knight Witch site/widgets repository. Older entries before the active July 2026 runtime work remain available in Git history and paired diff records.

## 2026-07-18 00:45 UTC — PF-20260718-012 — Size Guide modal placement and typography

Requested change:

- Return the Size Guide button to the quantity-control row in both carousel modal systems.
- Match the carousel/display AgencyFB typography.
- Preserve native product-page injection.

Docs reviewed:

- `/ARCHITECTURE.md`
- `/STYLE_KEYS.md`
- `/MASTER.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `/fourthwall/global/README.md`
- `/fourthwall/global/CHANGELOG.md`

Files/modules inspected:

- `fourthwall/kwfw-size-guide.js`
- `fourthwall/kwfw-size-guide.css`
- Standard `kwfw` modal quantity markup in `fourthwall/kwfw-carousel.js`
- Step 3 `kwpj` modal quantity markup in `components/kw-plain-jackets/kw-plain-jackets-v2.js`
- `fourthwall/global/kw-fourthwall-loader.js`

Risk and conflict notes:

- The current injector inserts directly before Add to Cart, which produces a full-width row.
- Both modal systems have equivalent quantity-field structures but different namespace prefixes.
- Repeated MutationObserver refreshes must not create duplicate wrappers or buttons.
- Native Fourthwall product pages should retain their existing full-width placement because their markup differs from carousel modals.

Plan:

- Wrap each modal's existing quantity field and Size Guide button in one idempotent `.kw-size-qty-size-row`.
- Keep native-page buttons outside that wrapper.
- Use the AgencyFB carousel font stack for the button.
- Keep chart resolution, product data, prices, galleries, Add to Cart, and scrolling unchanged.

User input required: none.

## 2026-07-18 00:25 UTC — PF-20260718-011 — Global product size-guide registry

Requested change:

- Avoid product-by-product Fourthwall backend size-guide HTML.
- Add one targeted size-guide system for featured Spellweaves, Step 3 base jackets, and qualifying native product pages.
- Follow the currently selected garment variant.
- Import the supplied mens vest charts without inventing unreadable rows.

Docs reviewed:

- `/OPERATING_CONTRACT.md`
- `/ARCHITECTURE.md`
- `/STYLE_KEYS.md`
- `/MASTER.md`
- `/HISTORY/CHANGELOG.md`
- `/HISTORY/PRE_FLIGHT_Check.md`
- `/fourthwall/README.md`
- `/fourthwall/global/README.md`
- `/fourthwall/global/CHANGELOG.md`

Files/modules inspected:

- `fourthwall/global/kw-fourthwall-loader.js`
- `fourthwall/kwfw-size-guide.js`
- `fourthwall/kwfw-size-guide.css`
- `fourthwall/kwfw-modal-product-fix.js`
- Standard `.kwfw-*` product modal structure
- Step 3 `.kwpj-*` product modal structure
- Current native Fourthwall product pages and product slugs
- Eight uploaded mens vest size-chart images

Risk and conflict notes:

- The old size-guide runtime used broad terms such as `vest` and `mens`, which can show the wrong manufacturer's chart.
- The Step 3 modal uses a different namespace and is appended to `body`.
- Native Fourthwall product markup is platform-rendered and may change; injection must use resolved chart context and a tolerant Add to Cart lookup.
- Registry data must load before the runtime.
- A MutationObserver must be idempotent and must not recreate its own button continuously.
- The Punkass 8X row and Black & Red Moto rows below brand size 42 were obscured in the supplied images.

Plan:

- Create `fourthwall/kwfw-size-guide-data.js` as the sole chart registry.
- Replace broad matching with exact variant aliases, product slugs, and controlled title aliases.
- Inject one Size Guide button before Add to Cart in `kwfw`, `kwpj`, and native product contexts only when a registered chart resolves.
- Preserve US/Metric preference and normal modal dismissal/focus behavior.
- Load registry data before runtime from the global loader.
- Leave carousel scrolling, grid, prices, CTA behavior, and variant-gallery code untouched.

Validation:

- Both size-guide JavaScript files passed `node --check`.
- Loader order was reviewed.
- The runtime is idempotent under child-list mutations.
- Unreadable chart rows were omitted rather than inferred.
- Live verification remains required for native product-page button placement and exact title/slug aliases.

User input required:

- None for the initial registry.
- Unobscured images are required later to add the omitted Punkass 8X and smaller Black & Red Moto rows.

## 2026-07-17 23:58 UTC — PF-20260717-010 — Variant gallery selection correction

Requested change:

- Fix variant-specific modal galleries that narrowed correctly on initial open but continued showing the default variant after the dropdown changed.

Docs/files reviewed:

- Root architecture, style, master, changelog, and pre-flight docs.
- `fourthwall/kwfw-modal-product-fix.js`.
- Both carousel option builders and modal product-object ownership.

Risk notes:

- The previous runtime replaced `modal._product` with a differently shaped detail payload.
- The dropdown and detail response could expose different option keys/representations.

Plan and result:

- Preserve the original collection-product object.
- Store detail data separately.
- Resolve the selected variant with normalized exact/value matching and map detail media by variant ID.
- No scroll/layout files changed.

Validation:

- JavaScript passed `node --check`.
- Focused matching tests covered ladies, mens/no-collar, and mens/detachable-collar values.
- Live storefront verification remained required.

## 2026-07-17 23:38 UTC — PF-20260717-009 — Variant-specific product modal galleries

Requested change:

- Switch standard and Step 3 product modal galleries to the currently selected variant's assigned Fourthwall images.

Files reviewed:

- Global loader.
- Standard carousel/modal runtime.
- Step 3 jacket modal runtime.
- Universal product media.
- Product rules.
- Shared modal compatibility runtime.
- Fourthwall Storefront API variant-media schema.

Risk notes:

- Separate modal namespaces and option selectors.
- Universal support slides must remain in the standard modal.
- Product-rule variant IDs must be honored.
- Gallery rebuilds must be idempotent.

Plan and result:

- Extend the shared modal runtime.
- Use official variant media, product-wide fallback, and slide-zero reset.
- Preserve universal support slides.
- No carousel rail, wheel, grid, or card-size changes.

## 2026-07-17 21:19 UTC — PF-20260717-008 — Dual-carousel product modal audit

Requested change:

- Restore actual prices in both expanded product modals.
- Restore the Step 3 orange Add to Cart CTA.

Risk notes:

- The two modal systems use different selectors.
- The Step 3 modal does not inherit carousel-scoped CSS variables.
- Fourthwall selling price is exposed through `variant.unitPrice`.

Plan and result:

- Support both modal namespaces.
- Read real Fourthwall price fields without placeholders.
- Use explicit modal CTA values.
- No scroll files changed.

## 2026-07-17 20:45 UTC — PF-20260717-007 — Product modal price and CTA fix

Requested change:

- Fix blank expanded-modal prices and low-contrast Add to Cart styling.

Risk notes:

- The initial helper only targeted the standard modal and did not cover all live price shapes.

Plan and result:

- Add modal-only price and CTA compatibility resources after product rules.
- Do not insert estimated or placeholder prices.
- No live storefront verification was available during the initial pass.
