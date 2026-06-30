(() => {
  const d = document;
  const source = d.currentScript;
  const key = "kw-fourthwall-base-loader";
  if (d.querySelector(`[data-kw-loader-resource="${key}"]`)) return;
  const element = d.createElement("scr" + "ipt");
  element.src = "https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@main/fourthwall/global/kw-fourthwall-loader.js?v=20260629-layout-guard-1";
  element.defer = true;
  element.async = false;
  element.dataset.kwLoaderResource = key;
  if (source) Array.from(source.attributes).forEach(attribute => {
    if (attribute.name.startsWith("data-")) element.setAttribute(attribute.name, attribute.value);
  });
  element.onerror = () => {
    window.KW_GLOBAL_LOADER_ERROR = new Error(element.src);
    console.error(window.KW_GLOBAL_LOADER_ERROR);
  };
  d.head.appendChild(element);
})();
