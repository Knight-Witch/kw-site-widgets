(() => {
  const d = document;
  const script = d.currentScript;
  const base = "https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets";
  const version = script?.dataset.version || "20260628-carousel-v5";
  const settings = window.KWFW_SETTINGS || {};

  window.KWFW_SETTINGS = {
    ...settings,
    storefrontToken: script?.dataset.storefrontToken || settings.storefrontToken || settings.token || "",
    shopDomain: script?.dataset.shopDomain || settings.shopDomain || settings.shop || location.host,
    currency: script?.dataset.currency || settings.currency || "USD",
    appendProductMediaManifest: script?.dataset.productMediaManifest || settings.appendProductMediaManifest || `${base}@de31d9904d9984126a65537dca0f526b2a01daf6/fourthwall/prod_card_media/manifest.json`
  };

  const url = (ref,path,tag) => {
    const resource = `${base}@${ref}/${path}`;
    return tag ? `${resource}?v=${encodeURIComponent(tag)}` : resource;
  };

  const resources = [
    {type:"css",key:"kw-header-css",href:url("main","fourthwall/global/kw-header.css",version)},
    {type:"css",key:"kw-title-bars-css",href:url("main","components/kw-title-bars/kw-title-bars.css",version)},
    {type:"css",key:"kw-info-sections-css",href:url("kw-info-accordion-dev","fourthwall/info-sections/kw-info-sections.css","20260628-tight-spacing-4")},
    {type:"css",key:"kwfw-carousel-css",href:url("69e95f9562e165299897b793103949bfba0ab6e3","fourthwall/kwfw-carousel.css")},
    {type:"css",key:"kwfw-font-agencyfb-css",href:url("988f5aa2bb75880d43ccfc58a751b73e20d9e1aa","fourthwall/kwfw-font-agencyfb.css")},
    {type:"css",key:"kwfw-size-guide-css",href:url("03e30bd4c28f5de3fc956ea39a874e6e447583d0","fourthwall/kwfw-size-guide.css")},
    {type:"css",key:"kwfw-universal-media-css",href:url("579c6124748dec87d5957716eabf0563dfc9401c","fourthwall/kwfw-universal-media.css")},
    {type:"css",key:"kwfw-product-rules-css",href:url("db73f85d3d4b982e46fea1e57bba48863b651889","fourthwall/kwfw-product-rules.css")},
    {type:"css",key:"kwfw-carousel-desktop-v5-css",href:url("c6971726d1b0123832ab1ce069146cceb9ac7acf","fourthwall/kwfw-carousel-desktop-v5.css")},
    {type:"css",key:"kw-cart-runtime-css",href:url("main","fourthwall/global/kw-cart-runtime.css",version)},
    {type:"js",key:"kw-header-js",src:url("main","fourthwall/global/kw-header.js",version)},
    {type:"js",key:"kw-title-bars-js",src:url("main","components/kw-title-bars/kw-title-bars.js",version)},
    {type:"js",key:"kw-info-sections-js",src:url("kw-info-accordion-dev","fourthwall/info-sections/kw-info-sections.js","20260628-info-host-spacing-1")},
    {type:"js",key:"kw-info-spacing-runtime-js",src:url("main","fourthwall/global/kw-info-spacing-runtime.js","20260628-info-spacing-runtime-2")},
    {type:"js",key:"kwfw-carousel-js",src:url("1dd6c66c60d54694a177e6f663c060c322154826","fourthwall/kwfw-carousel.js")},
    {type:"js",key:"kwfw-carousel-scroll-state-only-js",src:url("496ae3df325e1fbf69e46c9d240abf720fde8661","fourthwall/kwfw-carousel-scroll-state-only.js")},
    {type:"js",key:"kwfw-size-guide-js",src:url("f00c8dd64c573dd0c782036cf3df3a7dca53482c","fourthwall/kwfw-size-guide.js")},
    {type:"js",key:"kwfw-universal-media-js",src:url("4327ad13c67468e6b260dbc44758cd9b90574f6d","fourthwall/kwfw-universal-media.js")},
    {type:"js",key:"kwfw-product-rules-js",src:url("ef9f1ec0947d4144803c46c45c331e93b09dc9d3","fourthwall/kwfw-product-rules.js")},
    {type:"js",key:"kw-cart-runtime-js",src:url("main","fourthwall/global/kw-cart-runtime.js",version)}
  ];

  const exists = key => d.querySelector(`[data-kw-loader-resource="${key}"]`);

  const loadCss = resource => {
    if(exists(resource.key)) return;
    const link = d.createElement("link");
    link.rel = "stylesheet";
    link.href = resource.href;
    link.dataset.kwLoaderResource = resource.key;
    d.head.appendChild(link);
  };

  const loadScript = resource => new Promise((resolve,reject) => {
    if(exists(resource.key)){
      resolve();
      return;
    }
    const element = d.createElement("script");
    element.src = resource.src;
    element.defer = true;
    element.async = false;
    element.dataset.kwLoaderResource = resource.key;
    element.onload = () => resolve();
    element.onerror = () => reject(new Error(`Failed to load ${resource.src}`));
    d.head.appendChild(element);
  });

  resources.filter(resource => resource.type === "css").forEach(loadCss);
  resources.filter(resource => resource.type === "js").reduce((chain,resource) => chain.then(() => loadScript(resource)),Promise.resolve()).catch(error => {
    window.KW_GLOBAL_LOADER_ERROR = error;
    console.error(error);
  });
})();
