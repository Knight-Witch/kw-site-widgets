(() => {
  const d = document;
  const systems = [
    { panel: ".kwfw-panel", modal: ".kwfw-modal", title: ".kwfw-panel-title" },
    { panel: ".kwpj-panel", modal: ".kwpj-modal", title: ".kwpj-panel-title" }
  ];
  const collections = [
    {
      suffix: /\s*(?:[-–—|:]\s*)cyberpunk\s*2077\s*$/i,
      prefix: /^\s*cyberpunk\s*2077\s*(?:[-–—|:]\s*)/i,
      primary: "Cyberpunk 2077",
      alternate: "Edgerunners Collection",
      href: "/pages/edgerunners"
    }
  ];
  const cycleTimers = new WeakMap();
  const swapTimers = new WeakMap();
  const glitchTimers = new WeakMap();
  const mobileQuery = matchMedia("(max-width:760px)");
  const reducedQuery = matchMedia("(prefers-reduced-motion:reduce)");
  const q = (selector, root = d) => root.querySelector(selector);
  const qa = (selector, root = d) => Array.from(root.querySelectorAll(selector));

  const normalizeTitle = value => String(value ?? "").replace(/\s+/g," ").trim();

  const splitTitle = value => {
    const title = normalizeTitle(value);
    for(const collection of collections){
      const suffix = title.match(collection.suffix);
      if(suffix){
        const main = normalizeTitle(title.slice(0,suffix.index));
        if(main) return { main, collection };
      }
      const main = normalizeTitle(title.replace(collection.prefix,""));
      if(main !== title && main) return { main, collection };
    }
    return { main:title, collection:null };
  };

  const clearTimer = (map, element) => {
    const timer = map.get(element);
    if(timer) clearTimeout(timer);
    map.delete(element);
  };

  const clearCycle = link => {
    const timer = cycleTimers.get(link);
    if(timer) clearInterval(timer);
    cycleTimers.delete(link);
  };

  const triggerGlitch = link => {
    clearTimer(glitchTimers,link);
    link.classList.remove("is-glitching");
    void link.offsetWidth;
    link.classList.add("is-glitching");
    glitchTimers.set(link,setTimeout(() => {
      link.classList.remove("is-glitching");
      glitchTimers.delete(link);
    },430));
  };

  const setLinkText = (link, text, animate = true) => {
    const target = String(text || "");
    if(!target || link.textContent === target) return;
    clearTimer(swapTimers,link);
    if(!animate || reducedQuery.matches){
      link.textContent = target;
      link.dataset.kwText = target;
      return;
    }
    triggerGlitch(link);
    swapTimers.set(link,setTimeout(() => {
      link.textContent = target;
      link.dataset.kwText = target;
      triggerGlitch(link);
      swapTimers.delete(link);
    },130));
  };

  const primaryText = link => link.dataset.kwPrimary || "";
  const alternateText = link => link.dataset.kwAlternate || "";

  const syncCycle = link => {
    const mode = mobileQuery.matches && !reducedQuery.matches ? "mobile" : "desktop";
    if(link.dataset.kwCollectionMode === mode) return;
    link.dataset.kwCollectionMode = mode;
    clearCycle(link);
    clearTimer(swapTimers,link);
    setLinkText(link,primaryText(link),false);
    link.dataset.kwCollectionState = "primary";
    if(mode !== "mobile") return;
    const timer = setInterval(() => {
      if(!link.isConnected){
        clearCycle(link);
        return;
      }
      const alternate = link.dataset.kwCollectionState !== "alternate";
      link.dataset.kwCollectionState = alternate ? "alternate" : "primary";
      setLinkText(link,alternate ? alternateText(link) : primaryText(link));
    },4000);
    cycleTimers.set(link,timer);
  };

  const bindLink = link => {
    if(link.dataset.kwCollectionBound === "1") return;
    link.dataset.kwCollectionBound = "1";
    link.addEventListener("mouseenter",() => {
      if(mobileQuery.matches) return;
      link.dataset.kwCollectionState = "alternate";
      setLinkText(link,alternateText(link));
    });
    link.addEventListener("mouseleave",() => {
      if(mobileQuery.matches) return;
      link.dataset.kwCollectionState = "primary";
      setLinkText(link,primaryText(link));
    });
    link.addEventListener("focus",() => {
      if(mobileQuery.matches) return;
      link.dataset.kwCollectionState = "alternate";
      setLinkText(link,alternateText(link));
    });
    link.addEventListener("blur",() => {
      if(mobileQuery.matches) return;
      link.dataset.kwCollectionState = "primary";
      setLinkText(link,primaryText(link));
    });
  };

  const resetLink = (link, collection, signature) => {
    clearCycle(link);
    clearTimer(swapTimers,link);
    clearTimer(glitchTimers,link);
    link.dataset.kwCollectionSignature = signature;
    link.dataset.kwPrimary = collection.primary;
    link.dataset.kwAlternate = collection.alternate;
    link.dataset.kwText = collection.primary;
    link.dataset.kwCollectionState = "primary";
    delete link.dataset.kwCollectionMode;
    link.href = collection.href;
    link.textContent = collection.primary;
    link.setAttribute("aria-label",`Open ${collection.alternate}`);
  };

  const formatPanelTitle = (panel, system) => {
    const modal = panel.closest(system.modal);
    const title = q(system.title,panel);
    if(!modal || !title) return;
    const product = modal._product;
    const raw = normalizeTitle(product?.title || product?.name || title.dataset.kwProductRawTitle || title.textContent);
    if(!raw) return;
    const parsed = splitTitle(raw);
    title.dataset.kwProductRawTitle = raw;
    if(normalizeTitle(title.textContent) !== parsed.main) title.textContent = parsed.main;
    let link = q(".kw-product-collection-link",panel);
    if(!parsed.collection){
      if(link){
        clearCycle(link);
        clearTimer(swapTimers,link);
        clearTimer(glitchTimers,link);
        link.remove();
      }
      return;
    }
    if(!link){
      link = d.createElement("a");
      link.className = "kw-product-collection-link";
      title.insertAdjacentElement("afterend",link);
    }
    const collection = parsed.collection;
    const signature = `${raw}|${collection.href}|${collection.primary}|${collection.alternate}`;
    if(link.dataset.kwCollectionSignature !== signature) resetLink(link,collection,signature);
    bindLink(link);
    syncCycle(link);
  };

  const syncPanel = panel => {
    const system = systems.find(item => panel.matches(item.panel));
    if(system) formatPanelTitle(panel,system);
  };

  const scan = root => {
    if(root !== d && root?.nodeType !== 1) return;
    systems.forEach(system => {
      const owner = root.closest?.(system.panel);
      if(owner) syncPanel(owner);
      if(root.matches?.(system.panel)) syncPanel(root);
      qa(system.panel,root).forEach(syncPanel);
    });
  };

  const resync = () => {
    qa(".kw-product-collection-link").forEach(link => {
      delete link.dataset.kwCollectionMode;
      syncCycle(link);
    });
    scan(d);
  };

  d.addEventListener("click",event => {
    if(event.target.closest?.("[data-kwfw-open],[data-kwpj-open]")){
      [0,50,160].forEach(delay => setTimeout(() => scan(d),delay));
    }
  },true);

  new MutationObserver(mutations => {
    mutations.forEach(mutation => mutation.addedNodes.forEach(node => scan(node)));
  }).observe(d.documentElement,{ childList:true, subtree:true });

  mobileQuery.addEventListener?.("change",resync);
  reducedQuery.addEventListener?.("change",resync);
  d.readyState === "loading" ? d.addEventListener("DOMContentLoaded",() => scan(d)) : scan(d);
})();
