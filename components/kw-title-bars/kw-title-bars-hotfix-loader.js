(() => {
  const d = document;
  const s = d.currentScript;
  const src = s ? s.src : "";
  const match = src.match(/\/gh\/([^@/]+\/[^@/]+)@([^/]+)\//);
  const repo = match ? match[1] : "Knight-Witch/kw-site-widgets";
  const ref = match ? match[2] : "main";
  const version = s?.dataset.version || "20260706-titlebar-hotfix-1";
  const href = `https://cdn.jsdelivr.net/gh/${repo}@${ref}/components/kw-title-bars/kw-title-bars-hotfix.css?v=${encodeURIComponent(version)}`;

  const existing = d.querySelector('[data-kw-titlebar-hotfix="true"]');
  if (existing) existing.remove();

  const link = d.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.dataset.kwTitlebarHotfix = "true";
  d.head.appendChild(link);
})();
