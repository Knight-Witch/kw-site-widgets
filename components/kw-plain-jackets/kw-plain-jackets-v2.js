(() => {
  const d = document;
  const w = window;
  const api = "https://storefront-api.fourthwall.com/v1";
  const cartKey = "kwfw_cart_id";
  const countKey = "kwfw_cart_count";
  const itemsKey = "kwfw_cart_items";
  const slugs = {
    mens:{vests:"mens-vests",jackets:"mens-jackets",coats:"mens-coats",cosplay:"mens-cosplay"},
    ladies:{vests:"ladies-vests",jackets:"ladies-jackets",coats:"ladies-coats",cosplay:"ladies-cosplay"}
  };
  const genders = ["mens","ladies","all"];
  const categories = ["vests","jackets","coats","cosplay"];
  const genderLabels = {mens:"MEN",ladies:"LADIES",all:"ALL"};
  const categoryLabels = {vests:"VESTS",jackets:"JACKETS",coats:"COATS",cosplay:"COSPLAY"};
  const q = (s,r=d) => r.querySelector(s);
  const qa = (s,r=d) => Array.from(r.querySelectorAll(s));
  const cfg = () => w.KWFW_SETTINGS || {};
  const tok = root => root.dataset.storefrontToken || w.KW_STOREFRONT_TOKEN || cfg().storefrontToken || cfg().token || "";
  const shop = () => String(cfg().shopDomain || cfg().shop || location.host).replace(/^https?:\/\//,"").replace(/\/.*$/,"").replace(/\/$/,"");
  const currency = () => cfg().currency || "USD";
  const esc = s => String(s ?? "").replace(/[&<>"']/g,m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  const html = s => {
    const t = d.createElement("template");
    t.innerHTML = String(s ?? "");
    qa("script",t.content).forEach(x => x.remove());
    return t.innerHTML;
  };
  const asset = o => typeof o === "string" ? o : o?.url || o?.src || o?.originalUrl || o?.thumbnailUrl || o?.imageUrl || o?.image_url || o?.cdnUrl || o?.cdn_url || o?.transformedUrl || "";
  const uniq = a => [...new Set(a.filter(Boolean))];
  const variants = p => p.variants || p.productVariants || p.product_variants || p.options?.variants || [];
  const variantId = v => v?.id || v?.variantId || v?.uuid || v?.externalId;
  const available = v => v && v.available !== false && v.isAvailable !== false && v.inStock !== false && v.stock !== 0 && v.inventory !== 0;
  const slug = p => p.slug || p.handle || p.productSlug || p.product_slug || "";
  const productKey = p => slug(p) || p.id || p.productId || p.uuid || p.externalId || p.title || p.name || "";
  const productUrl = p => p.url || p.productUrl || p.product_url || (slug(p) ? "/products/" + slug(p) : "#");
  const images = p => {
    const a = [p.featuredImage,p.featured_image,p.image,p.thumbnail,p.primaryImage,p.primary_image,...(p.images || []),...(p.media || []),...(p.gallery || []),...(p.productImages || []),...(p.product_images || [])].map(asset);
    variants(p).forEach(v => a.push(asset(v.image),asset(v.featuredImage),asset(v.thumbnail)));
    return uniq(a);
  };
  const mainImage = p => images(p)[0] || "";
  const mediaKind = src => /\.(mp4|webm|ogg)(\?|#|$)/i.test(String(src || "")) ? "video" : "image";
  const money = v => {
    let x = v?.amount ?? v?.value ?? v?.price ?? v;
    if(typeof x === "string" && /[$€£]/.test(x)) return x;
    x = Number(x);
    if(!Number.isFinite(x)) return "";
    if(x > 999) x = x / 100;
    try{return new Intl.NumberFormat("en-US",{style:"currency",currency:currency()}).format(x)}catch{return "$" + x.toFixed(2)}
  };
  const price = p => money(p.price) || money(p.priceRange?.min) || money(p.price_range?.min) || money(variants(p)[0]?.price) || "";
  const request = async (u,o={}) => {
    const r = await fetch(u,o);
    const t = await r.text();
    let j = null;
    try{j = t ? JSON.parse(t) : null}catch{j = t}
    if(!r.ok){
      const e = new Error(j?.message || j?.error || j?.detail || t || `Fourthwall request failed ${r.status}`);
      e.status = r.status;
      e.data = j;
      throw e;
    }
    return j;
  };
  const fetchCollection = async (handle,limit,token) => {
    const h = encodeURIComponent(handle), tk = encodeURIComponent(token), size = encodeURIComponent(limit || 12);
    const urls = [`${api}/collections/${h}/products?storefront_token=${tk}&page=0&size=${size}`,`${api}/collections/${h}?storefront_token=${tk}&page=0&size=${size}`,`${api}/products?collection=${h}&storefront_token=${tk}&page=0&size=${size}`];
    let last;
    for(const u of urls){
      try{
        const j = await request(u);
        return j.results || j.products || j.items || j.data?.products || j.data?.results || [];
      }catch(e){last = e}
    }
    throw last;
  };
  const fetchList = async (handles,limit,token) => {
    const batches = await Promise.all(handles.filter(Boolean).map(h => fetchCollection(h,limit,token)));
    const seen = new Set();
    const out = [];
    batches.flat().forEach(p => {
      const key = productKey(p);
      if(key && seen.has(key)) return;
      if(key) seen.add(key);
      out.push(p);
    });
    return out;
  };
  const fetchProduct = async (p,token) => {
    if(images(p).length > 1 || !slug(p)) return p;
    const s = encodeURIComponent(slug(p)), tk = encodeURIComponent(token);
    const urls = [`${api}/products/${s}?storefront_token=${tk}`,`${api}/products/slug/${s}?storefront_token=${tk}`];
    for(const u of urls){
      try{
        const j = await request(u), x = j.product || j.data || j;
        return {...p,...x};
      }catch{}
    }
    return p;
  };
  const selectedHandles = root => {
    const gender = root._kwpjGender || root.dataset.defaultGender || "all";
    const category = root._kwpjCategory || root.dataset.defaultCategory || "vests";
    if(gender === "all") return [slugs.mens[category],slugs.ladies[category]].filter(Boolean);
    return [slugs[gender]?.[category]].filter(Boolean);
  };
  const getCount = () => Number(localStorage.getItem(countKey) || 0);
  const setCount = n => {
    n = Math.max(0,Number(n) || 0);
    localStorage.setItem(countKey,String(n));
    qa(".kwpj-count").forEach(x => x.textContent = String(n));
    const t = q(".kwpj-toast");
    if(t){
      t.classList.toggle("is-live",n > 0);
      const s = q("span",t);
      if(s) s.textContent = `${n} item${n === 1 ? "" : "s"} in cart`;
    }
  };
  const getItems = () => {
    try{return JSON.parse(localStorage.getItem(itemsKey) || "[]")}catch{return []}
  };
  const setItems = a => localStorage.setItem(itemsKey,JSON.stringify(a));
  const createCartWithItem = async (id,qty,token) => {
    const j = await request(`${api}/carts?storefront_token=${encodeURIComponent(token)}&currency=${encodeURIComponent(currency())}`,{
      method:"POST",
      headers:{"Content-Type":"application/json","Accept":"application/json"},
      body:JSON.stringify({items:[{variantId:id,quantity:qty}]})
    });
    const cartId = j?.id || j?.cart?.id;
    if(!cartId) throw new Error("Fourthwall did not return a cart ID");
    localStorage.setItem(cartKey,cartId);
    return j;
  };
  const addRequest = (cartId,id,qty,token) => request(`${api}/carts/${encodeURIComponent(cartId)}/add?storefront_token=${encodeURIComponent(token)}&currency=${encodeURIComponent(currency())}`,{
    method:"POST",
    headers:{"Content-Type":"application/json","Accept":"application/json"},
    body:JSON.stringify({items:[{variantId:id,quantity:qty}]})
  });
  const addToCart = async (id,qty,token) => {
    if(!id) throw new Error("No variant selected");
    const cartId = localStorage.getItem(cartKey);
    if(!cartId) return createCartWithItem(id,qty,token);
    try{return await addRequest(cartId,id,qty,token)}
    catch(e){
      if(e.status === 404 || String(e.message || "").includes("CART_NOT_FOUND")){
        localStorage.removeItem(cartKey);
        return createCartWithItem(id,qty,token);
      }
      throw e;
    }
  };
  const checkout = () => {
    const id = localStorage.getItem(cartKey);
    if(id){location.href = `https://${shop()}/cart/checkout?cartId=${encodeURIComponent(id)}&currency=${encodeURIComponent(currency())}`;return}
    const items = getItems();
    if(items.length) location.href = `https://${shop()}/cart/checkout?products=${encodeURIComponent(items.map(x => `${x.id}:${x.qty}`).join(","))}&currency=${encodeURIComponent(currency())}`;
  };
  const optMap = v => {
    const r = {};
    const o = v?.options || v?.attributes || v?.optionValues || v?.selectedOptions || {};
    if(Array.isArray(o)){
      o.forEach(x => {
        const n = x.name || x.optionName || x.key || x.type;
        const k = x.value || x.optionValue || x.label || x.name;
        if(n && k && !/^description$/i.test(n)) r[n] = k;
      });
    }else{
      Object.keys(o).forEach(k => {
        if(/^description$/i.test(k)) return;
        if(o[k] != null && typeof o[k] !== "object") r[k] = o[k];
        if(o[k] && typeof o[k] === "object") r[k] = o[k].name || o[k].value || o[k].label;
      });
    }
    ["style","Style","size","Size","color","Color","colour","Colour"].forEach(k => {
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
  const selectedVariant = modal => {
    const p = modal._product;
    const vs = variants(p).filter(available);
    const names = optionNames(vs);
    const sel = {};
    names.forEach(n => {
      const el = q(`[data-kwpj-option="${CSS.escape(n)}"]`,modal);
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
      return `<div class="kwpj-field"><label class="kwpj-label">${esc(n)}</label><select class="kwpj-select" data-kwpj-option="${esc(n)}">${vals.map(v => `<option value="${esc(v)}">${esc(v)}</option>`).join("")}</select></div>`;
    }).join("");
  };
  const mediaTag = (src,alt="") => mediaKind(src) === "video" ? `<video src="${esc(src)}" muted autoplay loop playsinline preload="metadata"></video>` : `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`;
  const tabGroup = (name,values,labels,current) => `<div class="kwpj-tabs" data-kwpj-filter="${name}" data-count="${values.length}">${values.map(v => `<button type="button" class="kwpj-tab ${v === current ? "is-active" : ""}" data-kwpj-filter="${name}" data-value="${v}">${labels[v]}</button>`).join("")}</div>`;
  const renderCard = (p,i) => `<article class="kwpj-card"><div class="kwpj-media" data-kwpj-open="${i}">${mediaTag(mainImage(p),p.title || p.name || "Product")}</div><div class="kwpj-body"><h3 class="kwpj-name">${esc(p.title || p.name || "Product")}</h3><p class="kwpj-price">${esc(price(p))}</p><div class="kwpj-action"><button type="button" class="kwpj-btn" data-kwpj-open="${i}">View & Add to Cart</button></div></div></article>`;
  const updateRail = root => {
    const rail = q(".kwpj-rail",root), frame = q(".kwpj-frame",root);
    if(!rail || !frame) return;
    const max = rail.scrollWidth - rail.clientWidth;
    frame.classList.toggle("can-left",max > 2 && rail.scrollLeft > 2);
    frame.classList.toggle("can-right",max > 2 && rail.scrollLeft < max - 2);
  };
  const renderRoot = (root,products) => {
    const gender = root._kwpjGender || root.dataset.defaultGender || "all";
    const category = root._kwpjCategory || root.dataset.defaultCategory || "vests";
    root._products = products;
    root.innerHTML = `<div class="kwpj-filters">${tabGroup("gender",genders,genderLabels,gender)}${tabGroup("category",categories,categoryLabels,category)}</div><section class="kwpj-root"><div class="kwpj-head"><span></span><button type="button" class="kwpj-cart" data-kwpj-checkout>Cart <span class="kwpj-count">${getCount()}</span></button></div><div class="kwpj-frame"><button type="button" class="kwpj-arrow kwpj-prev" data-kwpj-scroll="-1">‹</button><div class="kwpj-rail">${products.map(renderCard).join("")}</div><button type="button" class="kwpj-arrow kwpj-next" data-kwpj-scroll="1">›</button></div></section>`;
    const rail = q(".kwpj-rail",root);
    if(rail) rail.addEventListener("scroll",() => updateRail(root),{passive:true});
    requestAnimationFrame(() => updateRail(root));
  };
  const load = async root => {
    const token = tok(root), limit = root.dataset.kwpjLimit || root.dataset.limit || "50";
    root._token = token;
    if(!token){root.innerHTML = `<div class="kwpj-state">Missing storefront token.</div>`;return}
    root.innerHTML = `<div class="kwpj-state">Loading products…</div>`;
    try{renderRoot(root,await fetchList(selectedHandles(root),limit,token))}
    catch(e){root.innerHTML = `<div class="kwpj-state">Product load failed: ${esc(e.message)}</div>`}
  };
  const ensureToast = () => {
    if(q(".kwpj-toast")) return;
    const t = d.createElement("div");
    t.className = "kwpj-toast";
    t.innerHTML = `<span>${getCount()} items in cart</span><button type="button" data-kwpj-checkout>Checkout</button>`;
    d.body.appendChild(t);
    setCount(getCount());
  };
  const gallery = media => `<div class="kwpj-gallery ${media.length < 2 ? "is-single" : ""}" data-kwpj-gallery><div class="kwpj-gallery-track">${media.map((src,i) => mediaKind(src) === "video" ? `<video src="${esc(src)}" controls playsinline preload="metadata"></video>` : `<img src="${esc(src)}" alt="Product image ${i + 1}" draggable="false">`).join("")}</div><button type="button" class="kwpj-gallery-nav kwpj-gallery-prev" data-kwpj-gallery-move="-1">‹</button><button type="button" class="kwpj-gallery-nav kwpj-gallery-next" data-kwpj-gallery-move="1">›</button><div class="kwpj-dots">${media.map((_,i) => `<button type="button" class="kwpj-dot ${i ? "" : "is-active"}" data-kwpj-gallery-dot="${i}" aria-label="Image ${i + 1}"></button>`).join("")}</div></div>`;
  const setGallery = (modal,i) => {
    const track = q(".kwpj-gallery-track",modal), slides = track ? Array.from(track.children) : [], dots = qa(".kwpj-dot",modal);
    if(!track || !slides.length) return;
    i = (i + slides.length) % slides.length;
    modal._galleryIndex = i;
    track.style.transform = `translateX(${-i * 100}%)`;
    dots.forEach((x,n) => x.classList.toggle("is-active",n === i));
  };
  const openProduct = async (root,p) => {
    let modal = q(".kwpj-modal");
    if(!modal){modal = d.createElement("div");modal.className = "kwpj-modal";d.body.appendChild(modal)}
    modal.classList.add("is-open");
    modal.innerHTML = `<div class="kwpj-panel"><button type="button" class="kwpj-close" data-kwpj-close>×</button><div class="kwpj-state">Loading product…</div></div>`;
    p = await fetchProduct(p,root._token || tok(root));
    modal._product = p;
    modal._token = root._token || tok(root);
    modal._galleryIndex = 0;
    const media = images(p).length ? images(p) : [mainImage(p)].filter(Boolean);
    modal.innerHTML = `<div class="kwpj-panel"><button type="button" class="kwpj-close" data-kwpj-close>×</button><div class="kwpj-panel-grid">${gallery(media)}<div class="kwpj-info"><h3 class="kwpj-panel-title">${esc(p.title || p.name || "Product")}</h3><p class="kwpj-panel-price">${esc(price(p))}</p>${renderOptions(p)}<div class="kwpj-field"><label class="kwpj-label">Qty</label><div class="kwpj-qty"><button type="button" data-kwpj-qty="-1">−</button><input value="1" min="1" inputmode="numeric" data-kwpj-qty-input><button type="button" data-kwpj-qty="1">+</button></div></div><button type="button" class="kwpj-btn" data-kwpj-add>Add to cart</button><a class="kwpj-btn" href="${esc(productUrl(p))}" style="margin-top:10px;background:#111;color:#fff;border-color:#333">View details</a><div class="kwpj-status"></div>${p.description ? `<div class="kwpj-desc">${html(p.description)}</div>` : ""}</div></div></div>`;
  };
  const init = () => {
    ensureToast();
    qa(".kwpj-carousel").forEach(root => {
      if(root._kwpjReady) return;
      root._kwpjReady = true;
      root._kwpjGender = root.dataset.defaultGender || "all";
      root._kwpjCategory = root.dataset.defaultCategory || "vests";
      load(root);
    });
  };
  d.addEventListener("click",async e => {
    const tab = e.target.closest(".kwpj-tab");
    if(tab){
      const root = tab.closest(".kwpj-carousel");
      if(!root) return;
      if(tab.dataset.kwpjFilter === "gender") root._kwpjGender = tab.dataset.value;
      if(tab.dataset.kwpjFilter === "category") root._kwpjCategory = tab.dataset.value;
      await load(root);
      return;
    }
    const open = e.target.closest("[data-kwpj-open]");
    if(open){
      const root = open.closest(".kwpj-carousel");
      if(root) openProduct(root,root._products[Number(open.dataset.kwpjOpen)]);
      return;
    }
    const scroll = e.target.closest("[data-kwpj-scroll]");
    if(scroll){
      const root = scroll.closest(".kwpj-carousel"), rail = q(".kwpj-rail",root);
      if(rail) rail.scrollBy({left:Number(scroll.dataset.kwpjScroll) * Math.max(280,rail.clientWidth * .82),behavior:"smooth"});
      return;
    }
    const close = e.target.closest("[data-kwpj-close]");
    if(close){close.closest(".kwpj-modal").classList.remove("is-open");return}
    if(e.target.classList.contains("kwpj-modal")){e.target.classList.remove("is-open");return}
    const move = e.target.closest("[data-kwpj-gallery-move]");
    if(move){const m = move.closest(".kwpj-modal");setGallery(m,(m._galleryIndex || 0) + Number(move.dataset.kwpjGalleryMove));return}
    const dot = e.target.closest("[data-kwpj-gallery-dot]");
    if(dot){setGallery(dot.closest(".kwpj-modal"),Number(dot.dataset.kwpjGalleryDot));return}
    const qty = e.target.closest("[data-kwpj-qty]");
    if(qty){const input = q("[data-kwpj-qty-input]",qty.closest(".kwpj-panel"));input.value = Math.max(1,(parseInt(input.value,10) || 1) + Number(qty.dataset.kwpjQty));return}
    if(e.target.closest("[data-kwpj-checkout]")){checkout();return}
    const add = e.target.closest("[data-kwpj-add]");
    if(add){
      const modal = add.closest(".kwpj-modal"), status = q(".kwpj-status",modal), v = selectedVariant(modal), id = variantId(v), qtyValue = Math.max(1,parseInt(q("[data-kwpj-qty-input]",modal).value,10) || 1);
      if(!id){status.textContent = "No purchasable variant was found for this selection.";return}
      add.disabled = true;
      status.textContent = "Adding…";
      try{
        await addToCart(id,qtyValue,modal._token);
        const items = getItems(), existing = items.find(x => x.id === id);
        existing ? existing.qty += qtyValue : items.push({id,qty:qtyValue});
        setItems(items);
        setCount(getCount() + qtyValue);
        status.textContent = "Added to cart.";
        add.textContent = "Added";
        setTimeout(() => add.textContent = "Add to cart",1200);
      }catch(err){status.textContent = "Failed to add: " + err.message}
      finally{add.disabled = false}
    }
  });
  d.addEventListener("wheel",e => {
    const rail = e.target.closest(".kwpj-rail");
    if(!rail || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    rail.scrollBy({left:e.deltaY,behavior:"smooth"});
  },{passive:false});
  w.addEventListener("resize",() => qa(".kwpj-carousel").forEach(updateRail),{passive:true});
  d.readyState === "loading" ? d.addEventListener("DOMContentLoaded",init) : init();
})();
