(() => {
  const d = document;
  const script = d.currentScript;
  const base = "https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets";
  const version = script?.dataset.version || "20260628-carousel-v7";
  const settings = window.KWFW_SETTINGS || {};

  window.KWFW_SETTINGS = {
    ...settings,
    storefrontToken: script?.dataset.storefrontToken || settings.storefrontToken || settings.token || "",
    shopDomain: script?.dataset.shopDomain || settings.shopDomain || settings.shop || location.host,
    currency: script?.dataset.currency || settings.currency || "USD"
  };

  const exists = key => d.querySelector(`[data-kw-loader-resource="${key}"]`);

  const css = (key, href) => {
    if (exists(key)) return;
    const link = d.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.kwLoaderResource = key;
    d.head.appendChild(link);
  };

  const js = (key, src, copyData) => new Promise((resolve, reject) => {
    if (exists(key)) {
      resolve();
      return;
    }
    const element = d.createElement("script");
    element.src = src;
    element.defer = true;
    element.async = false;
    element.dataset.kwLoaderResource = key;
    if (copyData && script) {
      Array.from(script.attributes).forEach(attr => {
        if (attr.name.startsWith("data-")) element.setAttribute(attr.name, attr.value);
      });
    }
    element.onload = () => resolve();
    element.onerror = () => reject(new Error(src));
    d.head.appendChild(element);
  });

  js("kw-fourthwall-base-loader", `${base}@9f5b61a65c10e7b6473abd7e88caedd5ed62ddd8/fourthwall/global/kw-fourthwall-loader.js?v=20260628-info-spacing-runtime-2`, true)
    .then(() => {
      css("kwfw-carousel-v7-css", `${base}@f3893a0b20605d9676394305f81d97194272aa49/fourthwall/kwfw-carousel-v7.css?v=${encodeURIComponent(version)}`);
      return js("kwfw-carousel-v7-runtime-js", `${base}@4e45b1dd716ba57b925de94558f4dc287877c75c/fourthwall/kwfw-carousel-v7-runtime.js?v=${encodeURIComponent(version)}`, false);
    })
    .catch(error => {
      window.KW_GLOBAL_LOADER_ERROR = error;
      console.error(error);
    });
})();
