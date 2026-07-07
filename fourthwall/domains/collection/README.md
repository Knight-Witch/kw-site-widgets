# Collection Domain Module

This module owns the Collection page hero/banner video and category button block.

Read first:

1. `/OPERATING_CONTRACT.md`
2. `/ARCHITECTURE.md`
3. `/STYLE_KEYS.md`
4. `/MASTER.md`
5. `/HISTORY/CHANGELOG.md`
6. `/HISTORY/PRE_FLIGHT_Check.md`

## Files

```text
kw-collection-domain-loader.js
kw-collection-domain.css
kw-collection-domain.js
feature-video/
```

The lower feature video no longer belongs to this module. It is owned by `feature-video/`.

## Fourthwall usage

Use the loader as a small page/drop-in snippet. The loader creates a host immediately before the script tag, then loads the module CSS and JS from the same pinned GitHub/jsDelivr ref.

Current known loader URL:

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@ab0ccd97765db5f0318895fe8f8be626e537b211/fourthwall/domains/collection/kw-collection-domain-loader.js?v=20260706-collection-domain-6
```

## Runtime ownership

`kw-collection-domain-loader.js` owns:

- Host creation using `data-kw-collection-domain-host`.
- Loading `kw-collection-domain.css`.
- Loading `kw-collection-domain.js`.
- Cache key forwarding through `data-version`.

`kw-collection-domain.js` owns:

- Rendering the Collection hero section.
- Rendering desktop and mobile category nav buttons.
- Lazy-starting the hero video through IntersectionObserver.
- Button glitch effect on hover/focus/click.
- Delayed navigation after click glitch.

`kw-collection-domain.css` owns:

- Banner layout.
- Desktop over-video category buttons.
- Mobile stacked category buttons.
- Button visuals and glitch keyframes.
- Legacy block suppression for previous Fourthwall hard-coded sections.

## Assets

Base CDN:

```text
https://knightwitch.nyc3.cdn.digitaloceanspaces.com
```

Hero video:

```text
/BANNERS/Collection.webm
```

## Category links

```text
Edgerunners    /pages/edgerunners
Starchild      /pages/starchild
Basscraft      /pages/basscraft
Black Mass     /pages/black-mass
Astral Plane   /pages/astral-plane
Wicked Hearts  /pages/wicked-hearts
```

## Style rules

Desktop:

- Video fills full available width and remains transparent around media.
- Button group is absolutely positioned over the video at `top: 70%`.
- Button group is centered with horizontal overflow hidden visually.
- Buttons use black translucent background, white text, red border, uppercase AgencyFB text, and nav-style glitch.

Mobile:

- Desktop button group is hidden.
- Mobile button group displays as a vertical stack.
- Button width is `80%`, max `390px`.

## Legacy suppression

This module intentionally hides old Fourthwall hard-coded blocks:

```text
.desktop-banner-container
.banner-buttons-mobile
.standalone-video-section
```

Do not remove those suppressions unless the old Fourthwall blocks have been removed from the live page or the page layout is reworked.

## Risks / follow-ups

- Confirm whether the old hard-coded Fourthwall blocks still exist.
- If Fourthwall hard-coded blocks are removed, simplify the CSS suppression.
- Keep this module separate from the standalone feature video module.
