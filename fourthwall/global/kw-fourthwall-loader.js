(() => {
  const d = document;
  const s = d.currentScript;
  const src = s ? s.src : "";
  const m = src.match(/\/gh\/([^@/]+\/[^@/]+)@([^/]+)\//);

  const repo = m ? m[1] : "Knight-Witch/kw-site-widgets";
  const selfRef = m ? m[2] : "main";
  const base = `https://cdn.jsdelivr.net/gh/${repo}`;
  const version = s?.dataset.version || "20260717-size-guide-registry-1";

  const manifest =
    s?.dataset.productMediaManifest ||
    `${base}@de31d9904d9984126a65537dca0f526b2a01daf6/fourthwall/prod_card_media/manifest.json`;

  const settings = window.KWFW_SETTINGS || {};

  window.KWFW_SETTINGS = {
    ...settings,
    storefrontToken: s?.dataset.storefrontToken || settings.storefrontToken || settings.token || "",
    shopDomain: s?.dataset.shopDomain || settings.shopDomain || settings.shop || location.host,
    currency: s?.dataset.currency || settings.currency || "USD",
    appendProductMediaManifest:
      s?.dataset.productMediaManifest || settings.appendProductMediaManifest || manifest,
  };

  const url = (ref, path, tag) => {
    const u = `${base}@${ref}/${path}`;
    return tag ? `${u}${u.includes("?") ? "&" : "?"}v=${encodeURIComponent(tag)}` : u;
  };

  const resources = [
    { type: "css", key: "kw-fourthwall-layout-guard-css", href: url(selfRef, "fourthwall/global/kw-fourthwall-layout-guard.css", version) },
    { type: "css", key: "kw-global-fonts-css", href: url(selfRef, "fourthwall/global/kw-global-fonts.css", version) },
    { type: "css", key: "kw-global-foundation-css", href: url(selfRef, "fourthwall/global/kw-global-foundation.css", version) },
    { type: "css", key: "kw-background-video-css", href: url(selfRef, "fourthwall/global/kw-background-video.css", version) },
    { type: "css", key: "kw-social-icons-css", href: url(selfRef, "fourthwall/global/kw-social-icons.css", version) },
    { type: "css", key: "kw-header-css", href: url(selfRef, "fourthwall/global/kw-header.css", version) },
    { type: "css", key: "kw-title-bars-css", href: url("main", "components/kw-title-bars/kw-title-bars.css", version) },
    { type: "css", key: "kw-info-sections-css", href: url("kw-info-accordion-dev", "fourthwall/info-sections/kw-info-sections.css", "20260628-tight-spacing-4") },
    { type: "css", key: "kwfw-carousel-css", href: url("69e95f9562e165299897b793103949bfba0ab6e3", "fourthwall/kwfw-carousel.css") },
    { type: "css", key: "kwfw-font-agencyfb-css", href: url("988f5aa2bb75880d43ccfc58a751b73e20d9e1aa", "fourthwall/kwfw-font-agencyfb.css") },
    { type: "css", key: "kwfw-carousel-desktop-grid-css", href: url(selfRef, "fourthwall/kwfw-carousel-desktop-grid.css", version) },
    { type: "css", key: "kwfw-size-guide-css", href: url(selfRef, "fourthwall/kwfw-size-guide.css", version) },
    { type: "css", key: "kwfw-universal-media-css", href: url("579c6124748dec87d5957716eabf0563dfc9401c", "fourthwall/kwfw-universal-media.css") },
    { type: "css", key: "kwfw-product-rules-css", href: url("db73f85d3d4b982e46fea1e57bba48863b651889", "fourthwall/kwfw-product-rules.css") },
    { type: "css", key: "kwfw-modal-product-fix-css", href: url(selfRef, "fourthwall/kwfw-modal-product-fix.css", version) },
    { type: "css", key: "kw-cart-runtime-css", href: url(selfRef, "fourthwall/global/kw-cart-runtime.css", version) },

    { type: "js", key: "kw-global-config-js", src: url(selfRef, "fourthwall/global/kw-global-config.js", version) },
    { type: "js", key: "kw-background-video-js", src: url(selfRef, "fourthwall/global/kw-background-video.js", version) },
    { type: "js", key: "kw-header-js", src: url(selfRef, "fourthwall/global/kw-header.js", version) },
    { type: "js", key: "kw-header-about-menu-patch-js", src: url(selfRef, "fourthwall/global/kw-header-about-menu-patch.js", "20260630-about-menu-cleanup-2") },
    { type: "js", key: "kw-social-icons-js", src: url(selfRef, "fourthwall/global/kw-social-icons.js", version) },
    { type: "js", key: "kw-title-bars-js", src: url("main", "components/kw-title-bars/kw-title-bars.js", version) },
    { type: "js", key: "kw-info-sections-js", src: url("kw-info-accordion-dev", "fourthwall/info-sections/kw-info-sections.js", "20260628-info-host-spacing-1") },
    { type: "js", key: "kw-info-spacing-runtime-js", src: url(selfRef, "fourthwall/global/kw-info-spacing-runtime.js", "20260628-info-spacing-runtime-2") },
    { type: "js", key: "kwfw-carousel-js", src: url("1dd6c66c60d54694a177e6f663c060c322154826", "fourthwall/kwfw-carousel.js") },
    { type: "js", key: "kwfw-carousel-wheel-bridge-js", src: url(selfRef, "fourthwall/kwfw-carousel-wheel-bridge.js", version) },
    { type: "js", key: "kwfw-size-guide-data-js", src: url(selfRef, "fourthwall/kwfw-size-guide-data.js", version) },
    { type: "js", key: "kwfw-size-guide-js", src: url(selfRef, "fourthwall/kwfw-size-guide.js", version) },
    { type: "js", key: "kwfw-universal-media-js", src: url("4327ad13c67468e6b260dbc44758cd9b90574f6d", "fourthwall/kwfw-universal-media.js") },
    { type: "js", key: "kwfw-product-rules-js", src: url("ef9f1ec0947d4144803c46c45c331e93b09dc9d3", "fourthwall/kwfw-product-rules.js") },
    { type: "js", key: "kwfw-modal-product-fix-js", src: url(selfRef, "fourthwall/kwfw-modal-product-fix.js", version) },
    { type: "js", key: "kw-cart-runtime-js", src: url(selfRef, "fourthwall/global/kw-cart-runtime.js", version) },
  ];

  const currentUrl = element => element?.src || element?.href || "";
  const sameUrl = (a, b) => currentUrl(a) === b;
  const existing = key => Array.from(d.querySelectorAll(`[data-kw-loader-resource="${key}"]`));

  const loadCss = r => {
    const matches = existing(r.key);
    if(matches.some(element => sameUrl(element, r.href))) return;
    matches.forEach(element => element.remove());
    const link = d.createElement("link");
    link.rel = "stylesheet";
    link.href = r.href;
    link.dataset.kwLoaderResource = r.key;
    d.head.appendChild(link);
  };

  const loadScript = r =>
    new Promise((resolve, reject) => {
      const matches = existing(r.key);
      if(matches.some(element => sameUrl(element, r.src))){
        resolve();
        return;
      }
      matches.forEach(element => element.remove());
      const element = d.createElement("script");
      element.src = r.src;
      element.defer = true;
      element.async = false;
      element.dataset.kwLoaderResource = r.key;
      element.onload = () => resolve();
      element.onerror = () => reject(new Error(r.src));
      d.head.appendChild(element);
    });

  resources.filter(r => r.type === "css").forEach(loadCss);
  resources
    .filter(r => r.type === "js")
    .reduce((chain, r) => chain.then(() => loadScript(r)), Promise.resolve())
    .catch(error => {
      window.KW_GLOBAL_LOADER_ERROR = error;
      console.error(error);
    });
})();
