# Knight Witch Site Widgets

This repository contains the GitHub-hosted source for Knight Witch Fourthwall storefront widgets, global runtime loaders, shared UI components, page/domain modules, and standalone/legacy website elements.

GitHub is the source of truth for the code stored here. Fourthwall should contain small loader/drop-in snippets whenever possible. Some site elements may still be hard-coded inside Fourthwall; if an element is not documented in this repo, assume it may still live in Fourthwall until audited.

## Required reading order

Before repo work, read:

1. [`/OPERATING_CONTRACT.md`](./OPERATING_CONTRACT.md)
2. [`/ARCHITECTURE.md`](./ARCHITECTURE.md)
3. [`/MASTER.md`](./MASTER.md)
4. [`/STYLE_KEYS.md`](./STYLE_KEYS.md)
5. [`/MEDIA.md`](./MEDIA.md)
6. [`/HISTORY/CHANGELOG.md`](./HISTORY/CHANGELOG.md)
7. [`/HISTORY/PRE_FLIGHT_Check.md`](./HISTORY/PRE_FLIGHT_Check.md)

Then read relevant module docs:

- [`/fourthwall/README.md`](./fourthwall/README.md)
- [`/fourthwall/global/README.md`](./fourthwall/global/README.md)
- [`/fourthwall/global/CHANGELOG.md`](./fourthwall/global/CHANGELOG.md)
- [`/components/kw-title-bars/README.md`](./components/kw-title-bars/README.md)
- [`/fourthwall/domains/collection/README.md`](./fourthwall/domains/collection/README.md)
- [`/fourthwall/domains/collection/feature-video/README.md`](./fourthwall/domains/collection/feature-video/README.md)
- [`/gallery-portfolio/README.md`](./gallery-portfolio/README.md)
- [`/logo-banner/README.md`](./logo-banner/README.md)
- [`/widgets/README.md`](./widgets/README.md)

## Ownership boundary

GitHub owns the runtime code in this repo. Fourthwall owns snippet placement, native product data, native product images, and any remaining hard-coded sections not represented here.

Media policy:

- Native product media can remain on Fourthwall.
- All other site media used by this repo is on the Knight Witch CDN unless a documented exception says otherwise.
- External media roots and usage rules belong in [`/STYLE_KEYS.md`](./STYLE_KEYS.md), [`/MEDIA.md`](./MEDIA.md), or the relevant module README.

The full process rules live in [`/OPERATING_CONTRACT.md`](./OPERATING_CONTRACT.md).

## Major systems

- `fourthwall/global/` — site-wide loader/runtime layer: main loader, config, fonts, foundation, background video, header/nav, social icons, layout guard, cart runtime, info-section spacing helper, and legacy loaders.
- `components/kw-title-bars/` — reusable title bars and current temporary title-bar hotfix.
- `fourthwall/kwfw-*` — current product carousel family, product modal/gallery, universal media injection, size guide, product rules, product-card media, and legacy carousel variants.
- `fourthwall/domains/collection/` — Collection banner/category module.
- `fourthwall/domains/collection/feature-video/` — standalone Collection feature video module.
- `gallery-portfolio/`, `logo-banner/`, and `widgets/` — standalone or legacy systems not currently documented as global-loader dependencies.

## Current production state

The current production footer state is documented in [`/MASTER.md`](./MASTER.md). The known state is the global loader plus the temporary title-bar hotfix loader.

## Documentation system

- [`/ARCHITECTURE.md`](./ARCHITECTURE.md) maps structure, ownership, loaders, dependency order, file inventory, and future edit locations.
- [`/STYLE_KEYS.md`](./STYLE_KEYS.md) maps fonts, colors, assets, CDN roots, breakpoints, spacing, title bars, carousel sizing, backgrounds, product panels, and visual conventions.
- [`/MEDIA.md`](./MEDIA.md) records the media-hosting boundary.
- [`/MASTER.md`](./MASTER.md) tracks live systems, tasks, bugs, risks, snippets, cleanup, hard-coded Fourthwall unknowns, and decisions against.
- [`/HISTORY/CHANGELOG.md`](./HISTORY/CHANGELOG.md) is the canonical repo-wide changelog.
- [`/HISTORY/PRE_FLIGHT_Check.md`](./HISTORY/PRE_FLIGHT_Check.md) is the rolling pre-flight log.
- [`/HISTORY/DIFFS/`](./HISTORY/DIFFS/) stores paired diff/change summaries.
- [`/BACKUP_VAULT/`](./BACKUP_VAULT/) stores major-risk repo backups only.
- [`/ASSETS/`](./ASSETS/) stores assets added directly to the repo.

## Validation note

The documentation map was built from the uploaded `kw-site-widgets-main.zip`, direct GitHub file reads, existing module docs, and known recent commits. Live Fourthwall behavior was not directly validated during the documentation pass.
