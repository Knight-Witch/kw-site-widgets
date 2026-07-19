(() => {
  const d = document;
  const api = "https://storefront-api.fourthwall.com/v1";
  const systems = [
    { panel: ".kwfw-panel", modal: ".kwfw-modal", title: ".kwfw-panel-title" },
    { panel: ".kwpj-panel", modal: ".kwpj-modal", title: ".kwpj-panel-title" }
  ];
  const collections = [
    {
      key: "edgerunners",
      handles: ["edgerunners-core", "edgerunners"],
      primary: "Cyberpunk 2077",
      alternate: "Edgerunners Collection",
      href: "/pages/edgerunners",
      titleAliases: ["Cyberpunk 2077", "Edgerunners", "Edgerunners Collection"]
    },
    {
      key: "basscraft",
      handles: ["basscraft-core", "basscraft"],
      primary: "Eat. Sleep. Rave. Repeat.",
      alternate: "Basscraft Collection",
      href: "/pages/basscraft",
      titleAliases: ["Basscraft", "Basscraft Collection", "Eat. Sleep. Rave. Repeat."]
    },
    {
      key: "wicked-hearts",
      handles: ["wicked-hearts-core", "wicked-hearts"],
      primary: "Snakes Skulls & Sin",
      alternate: "Wicked Hearts Collection",
      href: "/pages/wicked-hearts",
      titleAliases: ["Wicked Hearts", "Wicked Hearts Collection", "Snakes Skulls & Sin"]
    },
    {
      key: "astral-plane",
      handles: ["astral-plane-core", "astral-plane"],
      primary: "All Things Fantasy",
      alternate: "Astral Plane Collection",
      href: "/pages/astral-plane",
      titleAliases: ["Astral Plane", "Astral Plane Collection", "All Things Fantasy"]
    },
    {
      key: "black-mass",
      handles: ["black-mass-core", "black-mass"],
      primary: "Sci-fi & Beyond",
      alternate: "Black Mass Collection",
      href: "/pages/black-mass",
      titleAliases: ["Black Mass", "Black Mass Collection", "Sci-fi & Beyond"]
    },
    {
      key: "starchild",
      handles: ["starchild-core", "starchild"],
      primary: "Mystics Zodiacs & Vibes",
      alternate: "Starchild Collection",
      href: "/pages/starchild",
      titleAliases: ["Starchild", "Starchild Collection", "Mystics Zodiacs & Vibes"]
    }
  ];
  const collectionByHandle = new Map();
  const collectionByProduct = new Map();
  const cycleTimers = new WeakMap();
  const swapTimers = new WeakMap();
  const glitchTimers = new WeakMap();
  const mobileQuery = matchMedia("(max-width:760px)");
  const reducedQuery = matchMedia("(prefers-reduced-motion:reduce)");
  const q = (selector, root = d) => root.querySelector(selector);
  const qa = (selector, root = d) => Array.from(root.querySelectorAll(selector));
  let collectionIndexRequest = null;

  const settings = () => window.KWFW_SETTINGS || {};
  const normalizeTitle = value => String(value ?? "").replace(/\s+/g," ").trim();
  const normalizeKey = value => String(value ?? "").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

  collections.forEach(collection => {
    [...collection.handles,collection.key,collection.alternate,collection.primary].forEach(value => {
      const key = normalizeKey(value);
      if(key) collectionByHandle.set(key,collection);
    });
  });
  const escapePattern = value => String(value).replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  const productSlug = product => product?.slug || product?.handle || product?.productSlug || product?.product_slug || "";
  const productKeys = product => [...new Set([
    productSlug(product),
    product?.id,
    product?.productId,
    product?.product_id,
    product?.uuid,
    product?.externalId,
    product?.external_id
  ].map(normalizeKey).filter(Boolean))];

  const embeddedCollectionValues = product => {
    const values = [];
    const add = value => {
      if(value == null) return;
      if(Array.isArray(value)){
        value.forEach(add);
        return;
      }
      if(typeof value === "object"){
        [value.slug,value.handle,value.name,value.title,value.key,value.id].forEach(add);
        return;
      }
      values.push(normalizeKey(value));
    };
    add(product?.collection);
    add(product?.collections);
    add(product?.collectionSlugs);
    add(product?.collection_slugs);
    add(product?.categories);
    return values.filter(Boolean);
  };

  const titleCollection = value => {
    const title = normalizeTitle(value);
    for(const collection of collections){
      if(collection.titleAliases.some(alias => new RegExp(`(?:^|[-–—|:]\\s*)${escapePattern(alias)}(?:\\s*[-–—|:]|$)`,`i`).test(title))) return collection;
    }
    return null;
  };

  const stripCollectionTitle = (value, collection) => {
    let title = normalizeTitle(value);
    if(!collection) return title;
    for(const alias of collection.titleAliases){
      const escaped = escapePattern(alias);
      const suffix = new RegExp(`\\s*(?:[-–—|:]\\s*)${escaped}\\s*$`,`i`);
      const prefix = new RegExp(`^\\s*${escaped}\\s*(?:[-–—|:]\\s*)`,`i`);
      const next = normalizeTitle(title.replace(suffix,"").replace(prefix,""));
      if(next && next !== title) return next;
    }
    return title;
  };

  const collectionFromHolder = holder => {
    const handle = normalizeKey(holder?.dataset?.kwfwCollection || holder?.dataset?.collection || holder?.dataset?.collectionSlug || "");
    return collectionByHandle.get(handle) || null;
  };

  const collectionFromProduct = (product, holder = null) => {
    for(const key of productKeys(product)){
      const collection = collectionByProduct.get(key);
      if(collection) return collection;
    }
    for(const value of embeddedCollectionValues(product)){
      const collection = collectionByHandle.get(value);
      if(collection) return collection;
    }
    return collectionFromHolder(holder) || titleCollection(product?.title || product?.name || "");
  };

  const indexProduct = (product, collection) => {
    productKeys(product).forEach(key => {
      if(!collectionByProduct.has(key)) collectionByProduct.set(key,collection);
    });
  };

  const productsFromResponse = payload => payload?.results || payload?.products || payload?.items || payload?.data?.products || payload?.data?.results || payload?.collection?.products || [];

  const fetchCollectionProducts = async handle => {
    const token = settings().storefrontToken || settings().token || "";
    if(!token) return [];
    const params = new URLSearchParams({ storefront_token:token, page:"0", size:"100" });
    const url = `${api}/collections/${encodeURIComponent(handle)}/products?${params.toString()}`;
    try{
      const response = await fetch(url);
      if(!response.ok) return [];
      const products = productsFromResponse(await response.json());
      return Array.isArray(products) ? products : [];
    }catch{
      return [];
    }
  };

  const indexCollection = async collection => {
    for(const handle of collection.handles){
      const products = await fetchCollectionProducts(handle);
      if(!products.length) continue;
      products.forEach(product => indexProduct(product,collection));
      return;
    }
  };

  const ensureCollectionIndex = () => {
    if(collectionIndexRequest) return collectionIndexRequest;
    if(!(settings().storefrontToken || settings().token)) return Promise.resolve();
    collectionIndexRequest = Promise.all(collections.map(indexCollection)).then(() => scan(d)).catch(() => {});
    return collectionIndexRequest;
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

  const syncCollectionLink = (owner, title, raw, collection, className) => {
    let link = q(`.${className}`,owner);
    if(!collection){
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
      link.className = className;
      title.insertAdjacentElement("afterend",link);
    }
    const signature = `${raw}|${collection.key}|${collection.href}|${collection.primary}|${collection.alternate}`;
    if(link.dataset.kwCollectionSignature !== signature) resetLink(link,collection,signature);
    bindLink(link);
    syncCycle(link);
  };

  const formatPanelTitle = (panel, system) => {
    const modal = panel.closest(system.modal);
    const title = q(system.title,panel);
    if(!modal || !title) return;
    const product = modal._product;
    const raw = normalizeTitle(product?.title || product?.name || title.dataset.kwProductRawTitle || title.textContent);
    if(!raw) return;
    const collection = collectionFromProduct(product);
    const main = stripCollectionTitle(raw,collection);
    title.dataset.kwProductRawTitle = raw;
    if(normalizeTitle(title.textContent) !== main) title.textContent = main;
    syncCollectionLink(panel,title,raw,collection,"kw-product-collection-link");
  };

  const formatCardTitle = (card, product, holder) => {
    const title = q(".kwfw-card-title",card);
    if(!title || !product) return;
    const raw = normalizeTitle(product.title || product.name || title.dataset.kwProductRawTitle || title.textContent);
    if(!raw) return;
    const collection = collectionFromProduct(product,holder);
    const main = stripCollectionTitle(raw,collection);
    title.dataset.kwProductRawTitle = raw;
    if(normalizeTitle(title.textContent) !== main) title.textContent = main;
    syncCollectionLink(card,title,raw,collection,"kw-product-card-collection-link");
  };

  const syncHolder = holder => {
    const products = Array.isArray(holder?._products) ? holder._products : [];
    if(!products.length) return;
    qa(".kwfw-card",holder).forEach((card,index) => formatCardTitle(card,products[index],holder));
    ensureCollectionIndex();
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
    const holder = root.closest?.(".kwfw-carousel,[data-kwfw-collection]");
    if(holder) syncHolder(holder);
    if(root.matches?.(".kwfw-carousel,[data-kwfw-collection]")) syncHolder(root);
    qa(".kwfw-carousel,[data-kwfw-collection]",root).forEach(syncHolder);
  };

  const resync = () => {
    qa(".kw-product-collection-link,.kw-product-card-collection-link").forEach(link => {
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
