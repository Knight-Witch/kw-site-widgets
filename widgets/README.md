# Widgets

Older standalone widget folder.

## Files

- `kw-carousel.css`
- `kw-carousel.js`

## Status

Legacy / standalone. Not documented as active through the global Fourthwall loader.

## Ownership

`kw-carousel.js` owns an older product carousel mounted at `#fpx-qs`. It loads jQuery if needed, fetches products from the Fourthwall Storefront API, builds flip cards, handles drag scroll, variant selects, cart actions, and checkout routing.

`kw-carousel.css` owns the `.fpx-` visual system for the older carousel.

## External dependencies

```text
https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js
https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap
https://storefront-api.fourthwall.com/v1
```

## Mounting notes

Known mount/attribute prefix:

```text
#fpx-qs
data-fpx-slug
.fpx-
```

## Follow-ups

- Decide whether this widget is retained as legacy reference, archived, or removed after confirming it is not live.
- Do not use this as the current product carousel unless explicitly reactivated.
