(() => {
  const d = document;
  const s = d.currentScript;
  const src = s ? s.src : "";
  const match = src.match(/\/gh\/([^@/]+\/[^@/]+)@([^/]+)\//);
  const repo = match ? match[1] : "Knight-Witch/kw-site-widgets";
  const ref = match ? match[2] : "main";
  const base = `https://cdn.jsdelivr.net/gh/${repo}@${ref}`;
  const version = s?.dataset.version || "20260706-collection-domain-1";
  const path = "fourthwall/domains/collection";

  const withVersion = url => `${url}${url.includes("?") ? "&" : "?"}v=${encodeURIComponent(version)}`;

  const ensureHost = () => {
    if (!s) return null;

    const previous = s.previousElementSibling;
    if (previous?.hasAttribute("data-kw-collection-domain-host")) return previous;

    const host = d.createElement("div");
    host.setAttribute("data-kw-collection-domain-host", "");
    s.insertAdjacentElement("beforebegin", host);
    return host;
  };

  const loadCss = href => {
    if (d.querySelector(`link[data-kw-collection-domain-css][href="${href}"]`)) return;

    const link = d.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.kwCollectionDomainCss = "true";
    d.head.appendChild(link);
  };

  const loadScript = src => {
    if (d.querySelector(`script[data-kw-collection-domain-js][src="${src}"]`)) return;

    const script = d.createElement("script");
    script.src = src;
    script.defer = true;
    script.dataset.kwCollectionDomainJs = "true";
    d.head.appendChild(script);
  };

  ensureHost();
  loadCss(withVersion(`${base}/${path}/kw-collection-domain.css`));
  loadScript(withVersion(`${base}/${path}/kw-collection-domain.js`));
})();
