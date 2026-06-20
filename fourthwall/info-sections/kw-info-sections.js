(() => {
  const d = document;
  const script = d.currentScript;
  const settings = window.KW_INFO_SECTIONS || {};
  const baseUrl = settings.baseUrl || (script ? new URL("./modules/", script.src).href : "");
  const moduleMap = settings.modules || {};
  const defaultSections = ["test"];
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (match) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[match]));
  const clean = (value) => {
    const template = d.createElement("template");
    template.innerHTML = String(value ?? "");
    template.content.querySelectorAll("script").forEach((node) => node.remove());
    return template;
  };
  const normalizeKey = (value) => String(value || "").trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  const splitKeys = (value) => String(value || "").split(",").map(normalizeKey).filter(Boolean);
  const configKeys = (holder) => {
    const direct = splitKeys(holder.dataset.kwInfoSections || holder.dataset.kwInfoOrder || "");
    if (direct.length) return direct;
    const raw = holder.dataset.kwInfoConfig;
    if (!raw) return defaultSections;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.map(normalizeKey).filter(Boolean);
      if (parsed && Array.isArray(parsed.order)) return parsed.order.map(normalizeKey).filter((key) => parsed[key] !== false && parsed[key] !== "false" && parsed[key] !== 0);
      if (parsed && typeof parsed === "object") return Object.keys(parsed).map(normalizeKey).filter((key) => parsed[key] === true || parsed[key] === "true" || parsed[key] === 1);
    } catch (error) {
      return defaultSections;
    }
    return defaultSections;
  };
  const moduleUrl = (key) => moduleMap[key] || new URL(`${key}.html`, baseUrl).href;
  const titleFromArticle = (article, fallback) => {
    const attr = article.getAttribute("data-kw-info-title") || article.getAttribute("data-title");
    if (attr) return attr;
    const heading = article.querySelector("h1, h2");
    if (!heading) return fallback;
    const title = heading.textContent.trim();
    heading.remove();
    return title || fallback;
  };
  const parseModule = (key, html) => {
    const template = clean(html);
    const articles = Array.from(template.content.querySelectorAll("[data-kw-info-item]"));
    if (!articles.length) {
      return [{ key, id: `${key}-0`, title: key.replace(/-/g, " "), content: template.innerHTML.trim(), open: false }];
    }
    return articles.map((article, index) => ({
      key,
      id: `${key}-${index}`,
      title: titleFromArticle(article, key.replace(/-/g, " ")),
      content: article.innerHTML.trim(),
      open: article.getAttribute("data-kw-info-open") === "true"
    }));
  };
  const loadModule = async (key) => {
    const response = await fetch(moduleUrl(key), { cache: settings.cache || "no-store" });
    if (!response.ok) throw new Error(`${key} module failed to load`);
    return parseModule(key, await response.text());
  };
  const renderItem = (item, index) => {
    const itemId = `kw-info-${item.id}-${index}`.replace(/[^a-zA-Z0-9_-]/g, "-");
    const openClass = item.open ? " is-open" : "";
    const expanded = item.open ? "true" : "false";
    return `<section class="kw-info-item${openClass}" data-kw-info-key="${esc(item.key)}"><button class="kw-info-trigger" type="button" aria-expanded="${expanded}" aria-controls="${esc(itemId)}"><span class="kw-info-title">${esc(item.title)}</span><span class="kw-info-icon" aria-hidden="true"></span></button><div class="kw-info-panel" id="${esc(itemId)}"><div class="kw-info-panel-shell"><div class="kw-info-panel-content">${item.content}</div></div></div></section>`;
  };
  const render = (holder, items) => {
    holder.classList.add("kw-info-root");
    holder.innerHTML = `<div class="kw-info-list">${items.map(renderItem).join("")}</div>`;
  };
  const initHolder = async (holder) => {
    const keys = configKeys(holder);
    holder.classList.add("kw-info-root");
    holder.innerHTML = `<div class="kw-info-state">Loading information sections…</div>`;
    try {
      const groups = await Promise.all(keys.map(loadModule));
      render(holder, groups.flat());
    } catch (error) {
      holder.innerHTML = `<div class="kw-info-state">${esc(error.message)}</div>`;
    }
  };
  const closeItem = (item) => {
    item.classList.remove("is-open");
    const button = item.querySelector(".kw-info-trigger");
    if (button) button.setAttribute("aria-expanded", "false");
  };
  const toggleItem = (item) => {
    const root = item.closest(".kw-info-root");
    const isOpen = item.classList.contains("is-open");
    if (root && root.dataset.kwInfoMultiple !== "true") {
      root.querySelectorAll(".kw-info-item.is-open").forEach((openItem) => {
        if (openItem !== item) closeItem(openItem);
      });
    }
    item.classList.toggle("is-open", !isOpen);
    const button = item.querySelector(".kw-info-trigger");
    if (button) button.setAttribute("aria-expanded", String(!isOpen));
  };
  d.addEventListener("click", (event) => {
    const trigger = event.target.closest(".kw-info-trigger");
    if (!trigger) return;
    const item = trigger.closest(".kw-info-item");
    if (!item) return;
    toggleItem(item);
  });
  const init = () => {
    Array.from(d.querySelectorAll("[data-kw-info-sections], [data-kw-info-order], [data-kw-info-config], .kw-info-sections")).forEach(initHolder);
  };
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", init);
  else init();
})();
