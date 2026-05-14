# Knight Witch Fourthwall Widgets

## Site-wide footer code

```html
<script>
window.KWFW_SETTINGS={
  storefrontToken:"PASTE_STOREFRONT_TOKEN_HERE",
  shopDomain:"PASTE_SHOP_DOMAIN_HERE",
  currency:"USD"
};
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@main/fourthwall/kwfw-carousel.css">
<script defer src="https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@main/fourthwall/kwfw-carousel.js"></script>
```

## Per-page carousel block

```html
<div class="kwfw-carousel" data-kwfw-collection="COLLECTION_SLUG" data-kwfw-title="Luminous Apparel" data-kwfw-limit="12"></div>
```

## Browser console reset

```js
KWFW.clearCart();
localStorage.removeItem("cartId");
localStorage.removeItem("fw_cart_id");
localStorage.removeItem("fourthwall_cart_id");
localStorage.removeItem("kw_fourthwall_cart_id");
```
