(() => {
  const d = document;
  const w = window;
  const api = "https://storefront-api.fourthwall.com/v1";
  const cartKey = "kwfw_cart_id";
  const countKey = "kwfw_cart_count";
  const itemsKey = "kwfw_cart_items";
  const cfg = () => w.KWFW_SETTINGS || {};
  const q = (s, r = d) => r.querySelector(s);
  const qa = (s, r = d) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s ?? "").replace(/[&<>"']/g, m => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[m]));
  const html = s => {
    const t = d.createElement("template");
    t.innerHTML = String(s ?? "");
    qa("script", t.content).forEach(x => x.remove());
    return t.innerHTML;
  };
  const token = root => root.dataset.storefrontToken || w.KW_STOREFRONT_TOKEN || w.KW_FW_TOKEN || cfg().storefrontToken || cfg().token || "";
  const shop = () => String(cfg().shopDomain || cfg().shop || location.host).replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/\/$/, "");
  const currency = () => cfg().currency || "USD";
  const asset = o => typeof o === "string" ? o : o?.url || o?.src || o?.originalUrl || o?.thumbnailUrl || o?.imageUrl || o?.image_url || o?.cdnUrl || o?.cdn_url || o?.transformedUrl || "";
  const uniq = a => [...new Set(a.filter(Boolean))];
  const mediaKind = src => /\.(mp4|webm|ogg)(\?|#|$)/i.test(String(src || "")) ? "video" : "image";
  const variants = p => p.variants || p.productVariants || p.product_variants || p.options?.variants || [];
  const variantId = v => v?.id || v?.variantId || v?.uuid || v?.externalId;
  const available = v => v && v.available !== false && v.isAvailable !== false && v.inStock !== false && v.stock !== 0 && v.inventory !== 0;
  const slug = p => p.slug || p.handle || p.productSlug || p.product_slug || "";
  const productUrl = p => p.url || p.productUrl || p.product_url || (slug(p) ? "/products/" + slug(p) : "#");
  const images = p => {
    const a = [p.featuredImage, p.featured_image, p.image, p.thumbnail, p.primaryImage, p.primary_image, ...(p.images || []), ...(p.media || []), ...(p.gallery || []), ...(p.productImages || []), ...(p.product_images || [])].map(asset);
    variants(p).forEach(v => a.push(asset(v.image), asset(v.featuredImage), asset(v.thumbnail)));
    return uniq(a);
  };
  const image = p => images(p)[0] || "";
  const money = v => {
    let x = v?.amount ?? v?.value ?? v?.price ?? v;
    if(typeof x === "string" && /[$€£]/.test(x)) return x;
    x = Number(x);
    if(!Number.isFinite(x)) return "";
    if(x > 999) x = x / 100;
    try{
      return new Intl.NumberFormat("en-US", { style:"currency", currency:currency() }).format(x);
    }catch{
      return "$" + x.toFixed(2);
    }
  };
  const price = p => money(p.price) || money(p.priceRange?.min) || money(p.price_range?.min) || money(variants(p)[0]?.price) || "";
  const getCount = () => Number(localStorage.getItem(countKey) || 0);
  const setCount = n => {
    n = Math.max(0, Number(n) || 0);
    localStorage.setItem(countKey, String(n));
    qa(".kwfw-cart-count").forEach(x => x.textContent = String(n));
    const t = q(".kwfw-toast");
    if(t){
      t.classList.toggle("is-live", n > 0);
      const s = q("span", t);
      if(s) s.textContent = `${n} item${n === 1 ? "" : "s"} in cart`;
    }
  };
  const getItems = () => {
    try{
      return JSON.parse(localStorage.getItem(itemsKey) || "[]");
    }catch{
      return [];
    }
  };
  const setItems = a => localStorage.setItem(itemsKey, JSON.stringify(a));
  const request = async (u, o = {}) => {
    const r = await fetch(u, o);
    const t = await r.text();
    let j = null;
    try{
      j = t ? JSON.parse(t) : null;
    }catch{
      j = t;
    }
    if(!r.ok){
      const e = new Error(j?.message || j?.error || j?.detail || t || `Fourthwall request failed ${r.status}`);
      e.status = r.status;
      e.data = j;
      throw e;
    }
    return j;
  };
  const optMap = v => {
    const r = {};
    const o = v?.options || v?.attributes || v?.optionValues || v?.selectedOptions || {};
    if(Array.isArray(o)){
      o.forEach(x => {
        const n = x.name || x.optionName || x.key || x.type;
        const k = x.value || x.optionValue || x.label || x.name;
        if(n && k) r[n] = k;
      });
    }else{
      Object.keys(o).forEach(k => {
        if(o[k] != null && typeof o[k] !== "object") r[k] = o[k];
        if(o[k] && typeof o[k] === "object") r[k] = o[k].name || o[k].value || o[k].label;
      });
    }
    ["style", "Style", "size", "Size", "color", "Color", "colour", "Colour"].forEach(k => {
      if(v?.[k] && !r[k]) r[k] = v[k];
    });
    if(!Object.keys(r).length && (v?.name || v?.title)) r.Option = v.name || v.title;
    return r;
  };
  const optionNames = vs => {
    const s = new Set();
    vs.forEach(v => Object.keys(optMap(v)).forEach(k => s.add(k)));
    return Array.from(s);
  };
  const selectedVariant = (p, panel) => {
    const vs = variants(p).filter(available);
    const names = optionNames(vs);
    const sel = {};
    names.forEach(n => {
      const el = q(`[data-kwfw-option="${CSS.escape(n)}"]`, panel);
      if(el) sel[n] = el.value;
    });
    return vs.find(v => {
      const m = optMap(v);
      return names.every(n => String(m[n] ?? "") === String(sel[n] ?? ""));
    }) || vs[0] || variants(p)[0];
  };
  const renderOptions = p => {
    const vs = variants(p).filter(available);
    const names = optionNames(vs);
    return names.map(n => {
      const vals = [...new Set(vs.map(v => optMap(v)[n]).filter(Boolean))];
      if(vals.length < 2) return "";
      return `<div class="kwfw-field"><label class="kwfw-label">${esc(n)}</label><select class="kwfw-select" data-kwfw-option="${esc(n)}">${vals.map(v => `<option value="${esc(v)}">${esc(v)}</option>`).join("")}</select></div>`;
    }).join("");
  };
  const fetchProducts = async (handle, limit, tok) => {
    const h = encodeURIComponent(handle || "all");
    const tk = encodeURIComponent(tok);
    const size = encodeURIComponent(limit || 12);
    const urls = [
      `${api}/collections/${h}/products?storefront_token=${tk}&page=0&size=${size}`,
      `${api}/collections/${h}?storefront_token=${tk}&page=0&size=${size}`,
      `${api}/products?collection=${h}&storefront_token=${tk}&page=0&size=${size}`
    ];
    let last;
    for(const u of urls){
      try{
        const j = await request(u);
        return j.results || j.products || j.items || j.data?.products || j.data?.results || [];
      }catch(e){
        last = e;
      }
    }
    throw last;
  };
  const fetchProduct = async (p, tok) => {
    if(images(p).length > 1 || !slug(p)) return p;
    const s = encodeURIComponent(slug(p));
    const tk = encodeURIComponent(tok);
    const urls = [`${api}/products/${s}?storefront_token=${tk}`, `${api}/products/slug/${s}?storefront_token=${tk}`];
    for(const u of urls){
      try{
        const j = await request(u);
        const x = j.product || j.data || j;
        return { ...p, ...x };
      }catch{}
    }
    return p;
  };
  const createCartWithItem = async (id, qty, tok) => {
    const j = await request(`${api}/carts?storefront_token=${encodeURIComponent(tok)}&currency=${encodeURIComponent(currency())}`, {
      method:"POST",
      headers:{ "Content-Type":"application/json", "Accept":"application/json" },
      body:JSON.stringify({ items:[{ variantId:id, quantity:qty }] })
    });
    const cartId = j?.id || j?.cart?.id;
    if(!cartId) throw new Error("Fourthwall did not return a cart ID");
    localStorage.setItem(cartKey, cartId);
    return j;
  };
  const addRequest = (cartId, id, qty, tok) => request(`${api}/carts/${encodeURIComponent(cartId)}/add?storefront_token=${encodeURIComponent(tok)}&currency=${encodeURIComponent(currency())}`, {
    method:"POST",
    headers:{ "Content-Type":"application/json", "Accept":"application/json" },
    body:JSON.stringify({ items:[{ variantId:id, quantity:qty }] })
  });
  const addToCart = async (id, qty, tok) => {
    if(!id) throw new Error("No variant selected");
    const cartId = localStorage.getItem(cartKey);
    if(!cartId) return createCartWithItem(id, qty, tok);
    try{
      return await addRequest(cartId, id, qty, tok);
    }catch(e){
      if(e.status === 404 || String(e.message || "").includes("CART_NOT_FOUND")){
        localStorage.removeItem(cartKey);
        return createCartWithItem(id, qty, tok);
      }
      throw e;
    }
  };
  const checkout = () => {
    const id = localStorage.getItem(cartKey);
    if(id){
      location.href = `https://${shop()}/cart/checkout?cartId=${encodeURIComponent(id)}&currency=${encodeURIComponent(currency())}`;
      return;
    }
    const items = getItems();
    if(items.length){
      location.href = `https://${shop()}/cart/checkout?products=${encodeURIComponent(items.map(x => `${x.id}:${x.qty}`).join(","))}&currency=${encodeURIComponent(currency())}`;
    }
  };
  const gallery = media => {
    const items = media.length ? media : [];
    const single = items.length < 2;
    return `<div class="kwfw-gallery ${single ? "is-single" : ""}" data-kwfw-gallery><div class="kwfw-gallery-track">${items.map((src, i) => mediaKind(src) === "video" ? `<video src="${esc(src)}" controls playsinline preload="metadata"></video>` : `<img src="${esc(src)}" alt="Product image ${i + 1}" draggable="false">`).join("")}</div><button type="button" class="kwfw-gallery-nav kwfw-gallery-prev" data-kwfw-gallery-move="-1">‹</button><button type="button" class="kwfw-gallery-nav kwfw-gallery-next" data-kwfw-gallery-move="1">›</button><div class="kwfw-gallery-cue">Swipe images</div><div class="kwfw-dots">${items.map((_, i) => `<button type="button" class="kwfw-dot ${i ? "" : "is-active"}" data-kwfw-gallery-dot="${i}" aria-label="Image ${i + 1}"></button>`).join("")}</div></div>`;
  };
  const modal = () => {
    let m = q(".kwfw-modal");
    if(!m){
      m = d.createElement("div");
      m.className = "kwfw-modal";
      d.body.appendChild(m);
    }
    return m;
  };
  const setGallery = (m, i) => {
    const track = q(".kwfw-gallery-track", m);
    const slides = track ? Array.from(track.children) : [];
    const dots = qa(".kwfw-dot", m);
    if(!track || !slides.length) return;
    i = (i + slides.length) % slides.length;
    m._galleryIndex = i;
    track.style.transform = `translateX(${-i * 100}%)`;
    dots.forEach((x, n) => x.classList.toggle("is-active", n === i));
  };
  const openProduct = async (p, tok) => {
    const m = modal();
    m.classList.add("is-open");
    m.innerHTML = '<div class="kwfw-panel"><button class="kwfw-modal-close" type="button" aria-label="Close"></button><div class="kwfw-state">Loading product…</div></div>';
    p = await fetchProduct(p, tok);
    m._product = p;
    m._token = tok;
    m._galleryIndex = 0;
    const galleryImages = images(p);
    const safeImages = galleryImages.length ? galleryImages : [image(p)].filter(Boolean);
    m.innerHTML = `<div class="kwfw-panel"><button class="kwfw-modal-close" type="button" aria-label="Close"></button><div class="kwfw-panel-grid">${gallery(safeImages)}<div class="kwfw-panel-info"><h3 class="kwfw-panel-title">${esc(p.title || p.name || "Product")}</h3><p class="kwfw-panel-price">${esc(price(p))}</p>${renderOptions(p)}<div class="kwfw-field"><label class="kwfw-label">Qty</label><div class="kwfw-qty"><button type="button" data-kwfw-qty="-1">−</button><input value="1" min="1" inputmode="numeric" data-kwfw-qty-input><button type="button" data-kwfw-qty="1">+</button></div></div><button type="button" class="kwfw-btn" data-kwfw-add>Add to cart</button><a class="kwfw-btn kwfw-btn-dark" href="${esc(productUrl(p))}" style="margin-top:10px">View details</a><div class="kwfw-status"></div>${p.description ? `<div class="kwfw-desc">${html(p.description)}</div>` : ""}</div>${p.description ? `<div class="kwfw-desc-wide">${html(p.description)}</div>` : ""}</div></div>`;
  };
  const renderMedia = p => {
    const src = image(p);
    if(!src) return "";
    return mediaKind(src) === "video" ? `<video src="${esc(src)}" muted autoplay loop playsinline preload="metadata"></video>` : `<img src="${esc(src)}" alt="${esc(p.title || p.name || "Product")}" loading="lazy">`;
  };
  const renderRail = (el, products) => {
    const title = el.dataset.kwfwTitle || el.dataset.title || "";
    const rows = products.map((p, i) => `<article class="kwfw-card"><div class="kwfw-card-media" data-kwfw-open="${i}">${renderMedia(p)}</div><div class="kwfw-card-body"><h3 class="kwfw-card-title">${esc(p.title || p.name || "Product")}</h3><p class="kwfw-card-price">${esc(price(p))}</p><div class="kwfw-card-actions"><button type="button" class="kwfw-btn" data-kwfw-open="${i}">View & Add to Cart</button></div></div></article>`).join("");
    el._products = products;
    el.innerHTML = `<section class="kwfw-root"><div class="kwfw-head">${title ? `<h2 class="kwfw-title">${esc(title)}</h2>` : "<span></span>"}<button type="button" class="kwfw-cart-btn" data-kwfw-checkout>Cart <span class="kwfw-cart-count">${getCount()}</span></button></div><div class="kwfw-rail-wrap"><button type="button" class="kwfw-arrow kwfw-prev" data-kwfw-scroll="-1">‹</button><div class="kwfw-rail">${rows}</div><button type="button" class="kwfw-arrow kwfw-next" data-kwfw-scroll="1">›</button></div></section>`;
  };
  const jacketPreset = {
    genders:[["mens", "MEN"], ["ladies", "LADIES"]],
    categories:[["vests", "VESTS"], ["jackets", "JACKETS"], ["coats", "COATS"], ["cosplay", "COSPLAY"], ["custom", "CUSTOM"]],
    slugs:{
      mens:{ vests:"mens-vests", jackets:"mens-jackets", coats:"mens-coats", cosplay:"mens-cosplay" },
      ladies:{ vests:"ladies-vests", jackets:"ladies-jackets", coats:"ladies-coats", cosplay:"ladies-cosplay" },
      custom:"custom-jacket"
    }
  };
  const filterButton = (filter, value, label, selected) => `<button type="button" class="kwfw-filter-tab" data-filter="${esc(filter)}" data-value="${esc(value)}" aria-selected="${selected ? "true" : "false"}">${esc(label)}</button>`;
  const renderFilters = root => {
    if(root.dataset.kwCarousel !== "jacket-builder") return "";
    const gender = root._kwGender || root.dataset.defaultGender || "mens";
    const category = root._kwCategory || root.dataset.defaultCategory || "vests";
    const genders = jacketPreset.genders.map(([value, label]) => filterButton("gender", value, label, value === gender)).join("");
    const categories = jacketPreset.categories.map(([value, label]) => filterButton("category", value, label, value === category)).join("");
    return `<div class="kwfw-filter-shell"><div class="kwfw-filter-row"><div class="kwfw-filter-group" data-filter="gender" data-disabled="${category === "custom" ? "true" : "false"}" role="tablist" aria-label="Gender">${genders}</div><div class="kwfw-filter-group" data-filter="category" role="tablist" aria-label="Category">${categories}</div></div></div>`;
  };
  const selectedSlug = root => {
    if(root.dataset.kwCarousel !== "jacket-builder") return root.dataset.collection || root.dataset.collectionSlug || root.dataset.kwfwCollection || "all";
    const gender = root._kwGender || root.dataset.defaultGender || "mens";
    const category = root._kwCategory || root.dataset.defaultCategory || "vests";
    return category === "custom" ? jacketPreset.slugs.custom : jacketPreset.slugs[gender]?.[category];
  };
  const shell = root => {
    if(root._kwContent) return root._kwContent;
    const content = d.createElement("div");
    content.className = "kwfw-content";
    root.innerHTML = `${renderFilters(root)}`;
    root.appendChild(content);
    root._kwContent = content;
    return content;
  };
  const syncFilters = root => {
    const gender = root._kwGender || root.dataset.defaultGender || "mens";
    const category = root._kwCategory || root.dataset.defaultCategory || "vests";
    qa(".kwfw-filter-tab", root).forEach(tab => {
      const selected = (tab.dataset.filter === "gender" && tab.dataset.value === gender) || (tab.dataset.filter === "category" && tab.dataset.value === category);
      tab.setAttribute("aria-selected", selected ? "true" : "false");
    });
    const genderGroup = q('.kwfw-filter-group[data-filter="gender"]', root);
    if(genderGroup) genderGroup.dataset.disabled = category === "custom" ? "true" : "false";
  };
  const ensureToast = () => {
    if(q(".kwfw-toast")) return;
    const t = d.createElement("div");
    t.className = "kwfw-toast";
    t.innerHTML = `<span>${getCount()} items in cart</span><button type="button" data-kwfw-checkout>Checkout</button>`;
    d.body.appendChild(t);
    setCount(getCount());
  };
  const loadRoot = async root => {
    const tok = token(root);
    const content = shell(root);
    const handle = selectedSlug(root);
    const limit = root.dataset.kwfwLimit || root.dataset.limit || 12;
    root._token = tok;
    if(!tok){
      content.innerHTML = '<div class="kwfw-state">Missing storefront token.</div>';
      return;
    }
    if(!handle){
      content.innerHTML = '<div class="kwfw-state">Missing collection slug.</div>';
      return;
    }
    content.innerHTML = '<div class="kwfw-state">Loading products…</div>';
    try{
      const products = await fetchProducts(handle, limit, tok);
      renderRail(content, products);
    }catch(e){
      content.innerHTML = `<div class="kwfw-state">Product load failed: ${esc(e.message)}</div>`;
    }
  };
  const initRoot = root => {
    if(root._kwProductCarouselReady) return;
    root._kwProductCarouselReady = true;
    root._kwGender = root.dataset.defaultGender || "mens";
    root._kwCategory = root.dataset.defaultCategory || root.dataset.defaultType || "vests";
    ensureToast();
    shell(root);
    loadRoot(root);
  };
  const init = () => qa(".kw-product-carousel").forEach(initRoot);
  d.addEventListener("click", async e => {
    const filter = e.target.closest(".kwfw-filter-tab");
    if(filter){
      const root = filter.closest(".kw-product-carousel");
      if(!root) return;
      if(filter.dataset.filter === "gender"){
        root._kwGender = filter.dataset.value;
        if(root._kwCategory === "custom") root._kwCategory = "vests";
      }
      if(filter.dataset.filter === "category"){
        root._kwCategory = filter.dataset.value;
        if(root._kwCategory === "custom") root._kwGender = null;
        if(root._kwCategory !== "custom" && !root._kwGender) root._kwGender = root.dataset.defaultGender || "mens";
      }
      syncFilters(root);
      await loadRoot(root);
      return;
    }
    const close = e.target.closest(".kwfw-modal-close");
    if(close){
      e.target.closest(".kwfw-modal").classList.remove("is-open");
      return;
    }
    if(e.target.classList.contains("kwfw-modal")){
      e.target.classList.remove("is-open");
      return;
    }
    const move = e.target.closest("[data-kwfw-gallery-move]");
    if(move){
      const m = move.closest(".kwfw-modal");
      setGallery(m, (m._galleryIndex || 0) + Number(move.dataset.kwfwGalleryMove));
      return;
    }
    const dot = e.target.closest("[data-kwfw-gallery-dot]");
    if(dot){
      setGallery(dot.closest(".kwfw-modal"), Number(dot.dataset.kwfwGalleryDot));
      return;
    }
    const sc = e.target.closest("[data-kwfw-scroll]");
    if(sc){
      const rail = q(".kwfw-rail", sc.closest(".kwfw-root"));
      rail.scrollBy({ left:Number(sc.dataset.kwfwScroll) * Math.max(280, rail.clientWidth * .82), behavior:"smooth" });
      return;
    }
    const open = e.target.closest("[data-kwfw-open]");
    if(open){
      const content = open.closest(".kwfw-content");
      const root = content?.closest(".kw-product-carousel");
      if(content && root) openProduct(content._products[Number(open.dataset.kwfwOpen)], root._token || token(root));
      return;
    }
    const qty = e.target.closest("[data-kwfw-qty]");
    if(qty){
      const input = q("[data-kwfw-qty-input]", qty.closest(".kwfw-panel"));
      input.value = Math.max(1, (parseInt(input.value, 10) || 1) + Number(qty.dataset.kwfwQty));
      return;
    }
    if(e.target.closest("[data-kwfw-checkout]")){
      checkout();
      return;
    }
    const add = e.target.closest("[data-kwfw-add]");
    if(add){
      const panel = add.closest(".kwfw-panel");
      const m = add.closest(".kwfw-modal");
      const status = q(".kwfw-status", panel);
      const p = m._product;
      const v = selectedVariant(p, panel);
      const id = variantId(v);
      const qtyValue = Math.max(1, parseInt(q("[data-kwfw-qty-input]", panel).value, 10) || 1);
      if(!id){
        status.textContent = "No purchasable variant was found for this selection.";
        return;
      }
      add.disabled = true;
      status.textContent = "Adding…";
      try{
        await addToCart(id, qtyValue, m._token || token(q(".kw-product-carousel")));
        const items = getItems();
        const existing = items.find(x => x.id === id);
        existing ? existing.qty += qtyValue : items.push({ id, qty:qtyValue });
        setItems(items);
        setCount(getCount() + qtyValue);
        status.textContent = "Added to cart.";
        add.textContent = "Added";
        setTimeout(() => add.textContent = "Add to cart", 1200);
      }catch(err){
        status.textContent = "Failed to add: " + err.message;
      }finally{
        add.disabled = false;
      }
    }
  });
  d.addEventListener("touchstart", e => {
    const g = e.target.closest("[data-kwfw-gallery]");
    if(!g) return;
    g._sx = e.touches[0].clientX;
    g._sy = e.touches[0].clientY;
  }, { passive:true });
  d.addEventListener("touchend", e => {
    const g = e.target.closest("[data-kwfw-gallery]");
    if(!g || g._sx == null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - g._sx;
    const dy = t.clientY - g._sy;
    if(Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.2) setGallery(g.closest(".kwfw-modal"), (g.closest(".kwfw-modal")._galleryIndex || 0) + (dx < 0 ? 1 : -1));
    g._sx = null;
    g._sy = null;
  }, { passive:true });
  d.addEventListener("change", e => {
    if(e.target.matches("[data-kwfw-option]")){
      const panel = e.target.closest(".kwfw-panel");
      const p = e.target.closest(".kwfw-modal")._product;
      const v = selectedVariant(p, panel);
      const pr = money(v?.price) || price(p);
      if(pr) q(".kwfw-panel-price", panel).textContent = pr;
    }
  });
  w.KWProductCarousel = { init, checkout };
  d.readyState === "loading" ? d.addEventListener("DOMContentLoaded", init) : init();
})();
