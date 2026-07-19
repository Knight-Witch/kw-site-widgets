# 2026-07-19 — Collection-aware featured product cards

## Scope

Extend the existing clean-title and collection-subtitle presentation from expanded product modals to standard featured Spellweave cards. Resolve Collection Domain identity per product so mixed carousels can contain products from different domains without receiving one shared label from the holder slug.

## Runtime changes

### `fourthwall/kw-product-modal-presentation.js`

- Expanded the controlled registry from one Edgerunners title mapping to six Collection Domains.
- Registered `-core` and plain-handle aliases for Edgerunners, Basscraft, Wicked Hearts, Astral Plane, Black Mass, and Starchild.
- Added customer-facing tagline, collection name, page destination, and title aliases for every registry item.
- Added a cached one-time collection-index request for pages containing standard product cards.
- Fetches each controlled collection through the Fourthwall Storefront API and indexes returned products by slug, product ID, UUID, and external ID where available.
- Added embedded collection metadata support for `collection`, `collections`, `collectionSlugs`, `collection_slugs`, and `categories`.
- Normalized handle, key, collection-name, and tagline aliases so different API collection representations resolve consistently.
- Added dedicated-holder and controlled title-prefix/suffix fallbacks.
- Established lookup order:
  1. Indexed product membership
  2. Embedded product collection metadata
  3. Dedicated holder handle
  4. Controlled title prefix/suffix
- Added `.kwfw-card` formatting using the holder's existing `_products` array and card index.
- Added `.kw-product-card-collection-link` creation, cleanup, desktop glitch behavior, mobile four-second cycling, reduced-motion handling, and timer cleanup.
- Extended the same registry to expanded-modal title/subtitle formatting.
- Does not mutate Fourthwall product objects.

### `fourthwall/kw-product-modal-presentation.css`

- Restored `.kwfw-card-title` after the universal-media stylesheet's retired hidden-title rule.
- Applied white AgencyFB uppercase card titles with `.055em` tracking and a two-line clamp.
- Added red AgencyFB card collection subtitles beneath the clean title.
- Added shared glitch pseudo-elements and animations for both modal and card collection links.
- Added desktop/mobile subtitle sizing.
- Preserved existing unified modal presentation rules.

### `fourthwall/global/kw-fourthwall-loader.js`

Bumped the production cache key to:

```text
20260718-featured-card-collections-2
```

## Controlled registry

```text
edgerunners-core / edgerunners
  Cyberpunk 2077 <-> Edgerunners Collection
  /pages/edgerunners

basscraft-core / basscraft
  Eat. Sleep. Rave. Repeat. <-> Basscraft Collection
  /pages/basscraft

wicked-hearts-core / wicked-hearts
  Snakes Skulls & Sin <-> Wicked Hearts Collection
  /pages/wicked-hearts

astral-plane-core / astral-plane
  All Things Fantasy <-> Astral Plane Collection
  /pages/astral-plane

black-mass-core / black-mass
  Sci-fi & Beyond <-> Black Mass Collection
  /pages/black-mass

starchild-core / starchild
  Mystics Zodiacs & Vibes <-> Starchild Collection
  /pages/starchild
```

## Runtime commits

```text
7a90ba867318e0491ea60d64fd4c450798231de6
8aa3cc5eb05f286370a85b6c3c365d3cfb9e451e
b5769ac1044197e4ca0c88409b62ecbc0f5abc8e
08c4dca8bf833d283cedfeb471f29bd2741a70cc
```

## Validation

- Final presentation JavaScript passed `node --check`.
- Controlled prefix and suffix stripping was checked for Cyberpunk/Edgerunners title forms.
- Collection indexing is guarded by one cached promise and is not repeated by MutationObserver scans.
- Card formatting uses the existing product array and rendered card order rather than refetching card products.
- Product membership takes precedence over the visible carousel handle.
- The runtime remains idempotent when cards or modals are rescanned.
- Reduced-motion mode disables automated glitch cycling.
- No Step 3 source file changed.
- No variant resolution, price, cart, Size Guide, selected-gallery media, carousel rail, grid, or wheel behavior changed.
- Live storefront verification remains required for mixed and dedicated featured carousels.

## Rollback

Restore:

```text
Global loader commit: e9404864ba58ab7daee8e771894d2c374a5f8fc3
Cache key: 20260718-modal-sync-2
```
