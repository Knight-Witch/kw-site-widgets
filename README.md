# Knight Witch Site Widgets

This repository contains the GitHub-hosted source for Knight Witch Fourthwall storefront widgets, global runtime loaders, shared UI components, and page/domain modules.

## Required reading order

Before repo work, read:

1. [`/OPERATING_CONTRACT.md`](./OPERATING_CONTRACT.md)
2. [`/ARCHITECTURE.md`](./ARCHITECTURE.md)
3. [`/MASTER.md`](./MASTER.md)
4. [`/STYLE_KEYS.md`](./STYLE_KEYS.md)
5. [`/HISTORY/CHANGELOG.md`](./HISTORY/CHANGELOG.md)
6. [`/HISTORY/PRE_FLIGHT_Check.md`](./HISTORY/PRE_FLIGHT_Check.md)

Then read relevant module docs, especially:

- [`/fourthwall/README.md`](./fourthwall/README.md)
- [`/fourthwall/global/README.md`](./fourthwall/global/README.md)
- [`/fourthwall/global/CHANGELOG.md`](./fourthwall/global/CHANGELOG.md)
- [`/components/kw-title-bars/README.md`](./components/kw-title-bars/README.md)

## Source of truth

GitHub is the source of truth for the runtime code. Fourthwall should use small loader/drop-in snippets that point to pinned GitHub/jsDelivr commits.

The full process rules live in [`/OPERATING_CONTRACT.md`](./OPERATING_CONTRACT.md).

## Major systems

- `fourthwall/global/` — global Fourthwall runtime: main loader, config, page background video, header/nav, social icons, title-bar dependency loading, layout guard, cart runtime, and related global helpers.
- `components/kw-title-bars/` — reusable title bars used across Fourthwall sections.
- `fourthwall/` root widget files — product carousel, desktop carousel overrides, wheel bridge, size guide, universal media, product rules, and legacy carousel variants.
- `fourthwall/domains/collection/` — Collection domain page banner/category module.
- `fourthwall/domains/collection/feature-video/` — standalone Collection feature video module.
- `gallery-portfolio/`, `logo-banner/`, and `widgets/` — older or standalone widget systems that are not currently documented as part of the global Fourthwall loader.

## Current production footer state

The current footer state reported during bootstrap uses the global loader plus a temporary title-bar hotfix loader.

Global loader:

```html
<script
  defer
  src="https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@b7672d41f8a011f47675ef2394b7d99028c90158/fourthwall/global/kw-fourthwall-loader.js?v=20260706-title-carousel-spacing-2"
  data-version="20260706-title-carousel-spacing-2"
  data-storefront-token="<FOURTHWALL_STOREFRONT_TOKEN_FROM_LIVE_FOOTER>"
  data-shop-domain="knightwitchapparel.com"
  data-currency="USD">
</script>
```

Temporary title-bar hotfix loader:

```html
<script
  defer
  src="https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@663b046d1dcb77b86a06ee1af427af2a5b0821dc/components/kw-title-bars/kw-title-bars-hotfix-loader.js?v=20260706-titlebar-hotfix-1"
  data-version="20260706-titlebar-hotfix-1">
</script>
```

The hotfix is temporary and must be tracked in [`/MASTER.md`](./MASTER.md) until folded into the proper title-bar/global-loader architecture.

## Documentation system

- [`/ARCHITECTURE.md`](./ARCHITECTURE.md) maps structure, ownership, loaders, dependency order, and future edit locations.
- [`/STYLE_KEYS.md`](./STYLE_KEYS.md) maps fonts, colors, assets, breakpoints, spacing, title bars, carousel sizing, video backgrounds, and visual conventions.
- [`/MASTER.md`](./MASTER.md) tracks live systems, tasks, bugs, risks, snippets, cleanup, and decisions against.
- [`/HISTORY/CHANGELOG.md`](./HISTORY/CHANGELOG.md) is the canonical repo-wide changelog.
- [`/HISTORY/PRE_FLIGHT_Check.md`](./HISTORY/PRE_FLIGHT_Check.md) is the rolling pre-flight log.
- [`/HISTORY/DIFFS/`](./HISTORY/DIFFS/) stores paired diff/change summaries.
- [`/BACKUP_VAULT/`](./BACKUP_VAULT/) stores major-risk repo backups only.
- [`/ASSETS/`](./ASSETS/) stores assets added directly to the repo.

## Validation note

The documentation bootstrap was built from the uploaded `kw-site-widgets-main.zip`, existing module docs, and known recent GitHub commits. Live Fourthwall behavior was not directly validated during the bootstrap.
