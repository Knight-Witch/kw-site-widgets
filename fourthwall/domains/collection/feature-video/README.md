# Collection Feature Module

Standalone module for the Collection page media block.

## Files

- `kw-collection-feature-video-loader.js`
- `kw-collection-feature-video.css`
- `kw-collection-feature-video.js`

## Ownership

The loader creates the host and loads this module's CSS and JS from the same pinned GitHub ref.

The runtime renders the section, starts the media when visible, and binds the control buttons.

The stylesheet owns module width, margins, media transition, control placement, and mobile spacing.

## Assets

Base CDN:

```text
https://knightwitch.nyc3.cdn.digitaloceanspaces.com
```

Media path:

```text
/domainvideos/ENTER-TCD-V2.webm
```

Restart icon path:

```text
/restart%20svg.svg
```

## Boundaries

This folder does not own the Collection category banner. That module lives in `fourthwall/domains/collection/`.

## Known loader URL

```text
https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@ab0ccd97765db5f0318895fe8f8be626e537b211/fourthwall/domains/collection/feature-video/kw-collection-feature-video-loader.js?v=20260706-collection-feature-video-1
```
