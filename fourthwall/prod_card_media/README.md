# Product Card Media

Product-support media manifest used by the universal media system.

## Files

- `manifest.json`

## Ownership

This folder owns reusable product-support media entries that are not returned by the Fourthwall product API.

The manifest is consumed by:

- `fourthwall/kwfw-universal-media.js`
- `fourthwall/kwfw-universal-media.css`

## Media boundary

Native product media returned by the Fourthwall product API can remain Fourthwall-hosted.

All extra product-support media in this folder should use the Knight Witch DigitalOcean CDN unless a documented exception exists.

CDN root:

```text
https://knightwitch.nyc3.cdn.digitaloceanspaces.com
```

## Current manifest entry

```json
{
  "type": "image",
  "src": "https://knightwitch.nyc3.cdn.digitaloceanspaces.com/GLOBAL/PROD_CARD_MEDIA/feature_card.webp",
  "alt": "Knight Witch LED jacket features",
  "label": "Features"
}
```

## Entry fields

- `type` — media type, currently `image` or `video` when supported by the universal media runtime.
- `src` — absolute CDN URL.
- `alt` — accessible description for image media.
- `label` — short display label for the modal/gallery UI.

## Update rules

- Keep entries concise and reusable.
- Use descriptive `alt` text.
- Use CDN-hosted files unless a specific exception is documented.
- Update `/STYLE_KEYS.md`, `/MEDIA.md`, and `/MASTER.md` when media ownership or active product-support assets change.
