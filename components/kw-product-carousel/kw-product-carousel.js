(() => {
  const rootSelector = ".kw-product-carousel";
  const apiBase = "https://storefront-api.fourthwall.com/v1";
  const presets = {
    "jacket-builder": {
      genders: [
        ["mens", "MEN"],
        ["ladies", "LADIES"]
      ],
      categories: [
        ["vests", "VESTS"],
        ["jackets", "JACKETS"],
        ["coats", "COATS"],
        ["cosplay", "COSPLAY"],
        ["custom", "CUSTOM"]
      ],
      slugs: {
        mens: {
          vests: "mens-vests",
          jackets: "mens-jackets",
          coats: "mens-coats",
          cosplay: "mens-cosplay"
        },
        ladies: {
          vests: "ladies-vests",
          jackets: "ladies-jackets",
          coats: "ladies-coats",
          cosplay: "ladies-cosplay"
        },
        custom: "custom-jacket"
      }
    }
  };

  const ready = callback => {
    if(document.readyState === "loading"){
      document.addEventListener("DOMContentLoaded", callback, { once:true });
    }else{
      callback();
    }
  };

  function decodeHtml(value){
    const textarea = document.createElement("textarea");
    textarea.innerHTML = String(value || "");
    return textarea.value;
  }

  function esc(value){
    return String(value || "").replace(/[&<>"']/g, match => ({
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      "\"":"&quot;",
      "'":"&#39;"
    }[match]));
  }

  function cleanName(value){
    return decodeHtml(value)
      .replace(/^\s*Cyberpunk\s*2077\s*[-–—:]\s*/i, "")
      .replace(/\s*\[[^\]]*\]\s*$/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  function imageUrl(image){
    return image?.transformedUrl || image?.url || "";
  }

  function unique(values){
    return [...new Set(values.filter(Boolean))];
  }

  function moneyObject(value){
    if(!value || typeof value.value !== "number") return null;
    return {
      amount:value.value >= 10000 ? value.value / 100 : value.value,
      currency:value.currency || "USD"
    };
  }

  function variantPrice(variant){
    if(!variant) return null;
    if(variant.unitPrice && typeof variant.unitPrice.value === "number") return moneyObject(variant.unitPrice);
    if(variant.price && typeof variant.price.value === "number") return moneyObject(variant.price);
    if(typeof variant.price === "number") return { amount:variant.price, currency:"USD" };
    if(typeof variant.amount === "number") return { amount:variant.amount, currency:variant.currency || "USD" };
    return null;
  }

  function productPrice(product){
    const variants = product?.variants || [];
    for(const variant of variants){
      const price = variantPrice(variant);
      if(price) return price;
    }

    const source = product?.priceRange || product?.price || null;
    if(source?.min && typeof source.min.value === "number") return moneyObject(source.min);
    if(source?.value && typeof source.value === "number") return moneyObject(source);
    return null;
  }

  function formatMoney(price){
    if(!price || typeof price.amount !== "number") return "";
    return price.amount.toLocaleString(undefined, {
      style:"currency",
      currency:price.currency || "USD"
    });
  }

  function attributeMap(variant){
    const output = {};
    const attrs = variant?.attributes;
    if(!attrs) return output;

    if(Array.isArray(attrs)){
      for(const item of attrs){
        const key = String(item.key || item.name || item.label || "").toLowerCase().trim();
        const value = String(item.name || item.value || item.option || "").trim();
        if(key) output[key] = { name:value, value };
      }
    }else{
      for(const key in attrs){
        const item = attrs[key];
        const normalized = String(key).toLowerCase().trim();
        const value = String(item?.name || item?.value || item || "").trim();
        if(normalized) output[normalized] = { name:value, value };
      }
    }

    return output;
  }

  function variantKeys(variants){
    const keys = new Set();
    for(const variant of variants){
      Object.keys(attributeMap(variant)).forEach(key => keys.add(key));
    }
    return [...keys];
  }

  function findKey(keys, candidates){
    const map = {
      colour:["colour", "color", "colourway", "colorway"],
      style:["style", "type", "fit", "garment", "product", "variant", "cut", "material", "fabric", "option", "title", "gender"],
      size:["size"]
    };

    return candidates
      .flatMap(candidate => map[candidate] || [candidate])
      .find(candidate => keys.includes(candidate)) || null;
  }

  function valuesForKey(variants, key){
    return variants.map(variant => {
      const attrs = attributeMap(variant);
      return attrs[key]?.name || attrs[key]?.value || null;
    }).filter(Boolean);
  }

  function variantStyleLabel(variant){
    const raw = decodeHtml(variant?.title || variant?.name || variant?.label || "");
    if(!raw) return null;

    return raw
      .replace(/^.*?\]\s*-\s*/g, "")
      .replace(/^.*?-\s*/g, "")
      .replace(/\b(XXS|XS|S|SM|M|MD|L|LG|XL|XXL|2XL|3XL|4XL|2X|3X)\b/ig, "")
      .replace(/,\s*$/, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  function cleanOptionLabel(value){
    return decodeHtml(value)
      .replace(/^.*?\]\s*-\s*/g, "")
      .replace(/^.*?-\s*/g, "")
      .replace(/\b(XXS|XS|SM|MD|LG|XL|XXL|2XL|3XL|4XL|2X|3X)\b/gi, "")
      .replace(/,\s*$/, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  function colorToCss(value){
    const name = String(value || "").trim().toLowerCase();
    const map = {
      black:"#000",
      white:"#fff",
      red:"#e53935",
      blue:"#1e88e5",
      green:"#43a047",
      yellow:"#fdd835",
      orange:"#fb8c00",
      purple:"#8e24aa",
      pink:"#d81b60",
      gray:"#9e9e9e",
      grey:"#9e9e9e",
      silver:"#bdbdbd",
      gold:"#d4af37"
    };
    return map[name] || value || "#000";
  }

  function findVariant(variants, options){
    const match = variants.find(variant => {
      const attrs = attributeMap(variant);

      if(options.styleKey && options.style){
        const value = attrs[options.styleKey]?.name || attrs[options.styleKey]?.value;
        if(cleanOptionLabel(value) !== cleanOptionLabel(options.style)) return false;
      }

      if(options.sizeKey && options.size){
        const value = attrs[options.sizeKey]?.name || attrs[options.sizeKey]?.value;
        if(value !== options.size) return false;
      }

      if(options.colorKey && options.color){
        const value = attrs[options.colorKey]?.name || attrs[options.colorKey]?.value;
        if(value !== options.color) return false;
      }

      return true;
    });

    if(match) return match;

    if(options.style){
      const byTitle = variants.find(variant => cleanOptionLabel(variantStyleLabel(variant)) === cleanOptionLabel(options.style));
      if(byTitle) return byTitle;
    }

    return variants[0] || null;
  }

  class ProductCarousel{
    constructor(root){
      this.root = root;
      this.presetName = root.dataset.kwCarousel || root.dataset.preset || "collection";
      this.preset = presets[this.presetName] || null;
      this.token = root.dataset.storefrontToken || window.KW_STOREFRONT_TOKEN || window.KW_FW_TOKEN || "";
      this.size = root.dataset.pageSize || "50";
      this.defaultGender = root.dataset.defaultGender || "mens";
      this.defaultCategory = root.dataset.defaultCategory || root.dataset.defaultType || "vests";
      this.gender = this.defaultGender;
      this.category = this.defaultCategory;
      this.collection = root.dataset.collection || root.dataset.collectionSlug || "";
      this.loading = false;
      this.holdTimer = null;
      this.abortController = null;
      this.renderShell();
      this.bindShell();
      this.load();
    }

    renderShell(){
      this.root.innerHTML = `${this.filterHtml()}<div class="kwpc-carousel"><button class="kwpc-shell-button kwpc-prev" type="button" aria-label="Scroll left">‹</button><div class="kwpc-viewport"><div class="kwpc-track" tabindex="0" aria-live="polite"></div></div><button class="kwpc-shell-button kwpc-next" type="button" aria-label="Scroll right">›</button></div>`;
      this.track = this.root.querySelector(".kwpc-track");
      this.prev = this.root.querySelector(".kwpc-prev");
      this.next = this.root.querySelector(".kwpc-next");
    }

    filterHtml(){
      if(this.presetName !== "jacket-builder" || !this.preset) return "";

      const genderButtons = this.preset.genders.map(([value, label]) => this.tabHtml("gender", value, label, value === this.gender)).join("");
      const categoryButtons = this.preset.categories.map(([value, label]) => this.tabHtml("category", value, label, value === this.category)).join("");

      return `<div class="kwpc-filters"><div class="kwpc-filter-bar" data-filter="gender" role="tablist" aria-label="Gender">${genderButtons}</div><div class="kwpc-filter-bar" data-filter="category" role="tablist" aria-label="Category">${categoryButtons}</div></div>`;
    }

    tabHtml(filter, value, label, selected){
      return `<button class="kwpc-tab" type="button" role="tab" data-filter="${esc(filter)}" data-value="${esc(value)}" aria-selected="${selected ? "true" : "false"}">${esc(label)}</button>`;
    }

    bindShell(){
      this.root.addEventListener("click", event => this.handleClick(event));
      this.prev.addEventListener("mousedown", () => this.startHold(-1));
      this.next.addEventListener("mousedown", () => this.startHold(1));
      ["mouseup", "mouseleave", "touchend", "touchcancel"].forEach(type => {
        this.prev.addEventListener(type, () => this.stopHold());
        this.next.addEventListener(type, () => this.stopHold());
      });

      this.track.addEventListener("wheel", event => {
        if(Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
        event.preventDefault();
        this.track.scrollBy({ left:event.deltaY, behavior:"smooth" });
      }, { passive:false });

      this.bindDrag();
    }

    bindDrag(){
      let active = false;
      let startX = 0;
      let scrollLeft = 0;

      const down = pageX => {
        active = true;
        startX = pageX - this.track.offsetLeft;
        scrollLeft = this.track.scrollLeft;
        this.track.dataset.dragging = "true";
      };

      const move = (pageX, event) => {
        if(!active) return;
        event.preventDefault();
        this.track.scrollLeft = scrollLeft - ((pageX - this.track.offsetLeft) - startX) * 1.2;
      };

      const up = () => {
        active = false;
        this.track.dataset.dragging = "false";
      };

      this.track.addEventListener("mousedown", event => down(event.pageX));
      window.addEventListener("mouseup", up, { passive:true });
      this.track.addEventListener("mousemove", event => move(event.pageX, event));
      this.track.addEventListener("touchstart", event => down(event.touches[0].pageX), { passive:true });
      this.track.addEventListener("touchend", up, { passive:true });
      this.track.addEventListener("touchcancel", up, { passive:true });
      this.track.addEventListener("touchmove", event => move(event.touches[0].pageX, event), { passive:false });
    }

    handleClick(event){
      const tab = event.target.closest(".kwpc-tab");
      if(tab && this.root.contains(tab)){
        this.selectFilter(tab);
        return;
      }

      const card = event.target.closest(".kwpc-card");
      if(!card || !this.root.contains(card)) return;

      const action = event.target.closest("[data-kwpc-action]")?.dataset.kwpcAction;
      const state = this.cardState(card);

      if(action === "details"){
        card.dataset.gallery = "open";
        return;
      }

      if(action === "close"){
        card.dataset.gallery = "closed";
        return;
      }

      if(action === "gallery-prev"){
        this.moveGallery(card, -1);
        return;
      }

      if(action === "gallery-next"){
        this.moveGallery(card, 1);
        return;
      }

      if(action === "qty-dec"){
        state.qty.value = Math.max(1, (parseInt(state.qty.value, 10) || 1) - 1);
        return;
      }

      if(action === "qty-inc"){
        state.qty.value = Math.max(1, (parseInt(state.qty.value, 10) || 1) + 1);
        return;
      }

      if(action === "swatch"){
        this.selectSwatch(card, event.target.closest(".kwpc-swatch"));
        return;
      }

      if(action === "add"){
        this.addCardToCart(card);
        return;
      }

      if(window.matchMedia("(max-width: 720px)").matches && !event.target.closest(".kwpc-panel, .kwpc-details, .kwpc-back")){
        card.dataset.active = card.dataset.active === "true" ? "false" : "true";
      }
    }

    selectFilter(tab){
      const filter = tab.dataset.filter;
      const value = tab.dataset.value;

      if(filter === "gender"){
        this.gender = value;
        if(this.category === "custom") this.category = "vests";
      }

      if(filter === "category"){
        this.category = value;
        if(value === "custom") this.gender = null;
        if(value !== "custom" && !this.gender) this.gender = this.defaultGender;
      }

      this.syncFilters();
      this.load();
    }

    syncFilters(){
      this.root.querySelectorAll(".kwpc-tab").forEach(tab => {
        const selected = (tab.dataset.filter === "gender" && tab.dataset.value === this.gender) || (tab.dataset.filter === "category" && tab.dataset.value === this.category);
        tab.setAttribute("aria-selected", selected ? "true" : "false");
      });

      const genderBar = this.root.querySelector('[data-filter="gender"]');
      if(genderBar) genderBar.dataset.disabled = this.category === "custom" ? "true" : "false";
    }

    currentSlug(){
      if(this.presetName === "jacket-builder" && this.preset){
        return this.category === "custom" ? this.preset.slugs.custom : this.preset.slugs[this.gender]?.[this.category];
      }

      return this.collection;
    }

    collectionUrl(slug){
      const params = new URLSearchParams({ storefront_token:this.token, size:this.size });
      return `${apiBase}/collections/${encodeURIComponent(slug)}/products?${params.toString()}`;
    }

    async load(){
      const slug = this.currentSlug();

      if(!slug){
        this.status("No collection slug set.", true);
        return;
      }

      if(!this.token){
        this.status("No storefront token set.", true);
        return;
      }

      if(this.loading && this.abortController){
        this.abortController.abort();
      }

      this.loading = true;
      this.abortController = new AbortController();
      this.status("Loading…", false);

      try{
        const response = await fetch(this.collectionUrl(slug), { signal:this.abortController.signal });
        if(!response.ok) throw new Error(`Product load failed ${response.status}`);

        const data = await response.json();
        this.renderProducts(data.results || []);
      }catch(error){
        if(error.name !== "AbortError"){
          console.error(error);
          this.status("Failed to load products.", true);
        }
      }finally{
        this.loading = false;
      }
    }

    status(message, error){
      this.track.innerHTML = `<div class="kwpc-status${error ? " kwpc-status--error" : ""}">${esc(message)}</div>`;
    }

    renderProducts(products){
      if(!products.length){
        this.status("No products found.", false);
        return;
      }

      this.track.innerHTML = "";

      for(const product of products){
        const item = document.createElement("div");
        item.className = "kwpc-item";
        item.appendChild(this.renderCard(product));
        this.track.appendChild(item);
      }

      this.track.scrollTo({ left:0, behavior:"auto" });
    }

    renderCard(product){
      const variants = product.variants || [];
      const images = product.images || [];
      const selected = variants[0] || null;
      const keys = variantKeys(variants);
      const sizeKey = findKey(keys, ["size"]);
      const styleKey = findKey(keys, ["style"]);
      const colorKey = findKey(keys, ["colour"]);
      const styleValues = this.optionValues(variants, styleKey);
      const sizeValues = this.optionValues(variants, sizeKey);
      const selectValues = styleValues.length ? styleValues : sizeValues;
      const selectMode = styleValues.length ? "style" : "size";
      const colorValues = colorKey ? unique(valuesForKey(variants, colorKey)) : [];
      const space = document.createElement("div");
      const image = imageUrl(images[0]);

      space.className = "kwpc-card-space";
      space.innerHTML = this.cardHtml(product, image, selectValues, colorValues, selected);

      const card = space.querySelector(".kwpc-card");
      card.kwpcProduct = product;
      card.kwpcVariants = variants;
      card.kwpcImages = images;
      card.kwpcKeys = { sizeKey, styleKey, colorKey, selectMode };
      card.kwpcSelection = {
        variant:selected,
        style:selectMode === "style" ? selectValues[0] || null : null,
        size:selectMode === "size" ? selectValues[0] || null : null,
        color:colorValues[0] || null,
        galleryIndex:0
      };

      const select = card.querySelector(".kwpc-select");
      if(select){
        select.addEventListener("change", () => {
          if(selectMode === "style") card.kwpcSelection.style = select.value;
          if(selectMode === "size") card.kwpcSelection.size = select.value;
          this.updateVariant(card);
        });
      }

      this.updateVariant(card);
      return space;
    }

    optionValues(variants, key){
      if(key){
        return unique(valuesForKey(variants, key).map(value => cleanOptionLabel(value)).filter(Boolean));
      }

      return unique(variants.map(variant => cleanOptionLabel(variantStyleLabel(variant))).filter(Boolean));
    }

    cardHtml(product, image, selectValues, colorValues, variant){
      const select = selectValues.length ? `<select class="kwpc-select">${selectValues.map((value, index) => `<option value="${esc(value)}"${index === 0 ? " selected" : ""}>${esc(value)}</option>`).join("")}</select>` : `<select class="kwpc-select" disabled><option>Default</option></select>`;
      const swatches = (colorValues.length ? colorValues : ["Black"]).map((value, index) => `<button class="kwpc-swatch" type="button" data-kwpc-action="swatch" data-color="${esc(value)}" title="${esc(value)}" aria-selected="${index === 0 ? "true" : "false"}" style="background:${esc(colorToCss(value))}"></button>`).join("");
      const slides = (product.images || []).map(item => `<div class="kwpc-gallery-slide" style="background-image:url('${esc(imageUrl(item))}')"></div>`).join("");
      const price = formatMoney(variantPrice(variant) || productPrice(product));

      return `<div class="kwpc-card" data-active="false" data-gallery="closed"><div class="kwpc-front"><img class="kwpc-image" src="${esc(image)}" alt="${esc(cleanName(product.name || ""))}"><div class="kwpc-overlay"></div><button class="kwpc-details" type="button" data-kwpc-action="details">View details</button><div class="kwpc-panel"><div class="kwpc-panel-inner"><div class="kwpc-fields"><div class="kwpc-row"><div class="kwpc-field"><label>Style</label>${select}</div><div class="kwpc-field"><label>Qty</label><div class="kwpc-stepper"><button type="button" data-kwpc-action="qty-dec">−</button><input class="kwpc-qty" type="number" min="1" value="1"><button type="button" data-kwpc-action="qty-inc">+</button></div></div></div><div class="kwpc-row"><div class="kwpc-field"><label>Colour</label><div class="kwpc-swatches">${swatches}</div></div><div class="kwpc-field"><span class="kwpc-price">${esc(price)}</span></div></div><div class="kwpc-row kwpc-row--full"><button class="kwpc-add" type="button" data-kwpc-action="add">ADD TO CART</button></div><div class="kwpc-row kwpc-row--full"><span class="kwpc-name">${esc(cleanName(product.name || ""))}</span></div></div><div class="kwpc-message" aria-live="polite"></div></div></div></div><div class="kwpc-back"><div class="kwpc-gallery"><div class="kwpc-gallery-track">${slides}</div><div class="kwpc-gallery-nav"><button class="kwpc-gallery-btn" type="button" data-kwpc-action="gallery-prev">‹</button><button class="kwpc-gallery-btn" type="button" data-kwpc-action="gallery-next">›</button></div></div><button class="kwpc-close" type="button" data-kwpc-action="close" aria-label="Close gallery"></button></div></div>`;
    }

    cardState(card){
      return {
        qty:card.querySelector(".kwpc-qty"),
        price:card.querySelector(".kwpc-price"),
        image:card.querySelector(".kwpc-image"),
        message:card.querySelector(".kwpc-message"),
        galleryTrack:card.querySelector(".kwpc-gallery-track")
      };
    }

    selectSwatch(card, swatch){
      if(!swatch) return;
      card.querySelectorAll(".kwpc-swatch").forEach(item => item.setAttribute("aria-selected", "false"));
      swatch.setAttribute("aria-selected", "true");
      card.kwpcSelection.color = swatch.dataset.color || null;
      this.updateVariant(card);
    }

    updateVariant(card){
      const state = this.cardState(card);
      const keys = card.kwpcKeys;
      const selection = card.kwpcSelection;
      const variant = findVariant(card.kwpcVariants, {
        styleKey:keys.styleKey,
        sizeKey:keys.sizeKey,
        colorKey:keys.colorKey,
        style:selection.style,
        size:selection.size,
        color:selection.color
      });

      selection.variant = variant;
      state.price.textContent = formatMoney(variantPrice(variant) || productPrice(card.kwpcProduct));
      this.renderGallery(card, variant?.images || variant?.media || card.kwpcImages || []);
    }

    renderGallery(card, images){
      const state = this.cardState(card);
      const validImages = Array.isArray(images) && images.length ? images : card.kwpcImages || [];
      const first = imageUrl(validImages[0]);

      if(first) state.image.src = first;
      card.kwpcSelection.galleryIndex = 0;
      state.galleryTrack.innerHTML = validImages.map(item => `<div class="kwpc-gallery-slide" style="background-image:url('${esc(imageUrl(item))}')"></div>`).join("");
      state.galleryTrack.style.transform = "translateX(0%)";
    }

    moveGallery(card, direction){
      const state = this.cardState(card);
      const count = state.galleryTrack.children.length;
      if(count <= 1) return;

      const next = Math.max(0, Math.min(count - 1, card.kwpcSelection.galleryIndex + direction));
      card.kwpcSelection.galleryIndex = next;
      state.galleryTrack.style.transform = `translateX(-${next * 100}%)`;
    }

    async addCardToCart(card){
      const state = this.cardState(card);
      const variant = card.kwpcSelection.variant;
      const quantity = Math.max(1, parseInt(state.qty.value, 10) || 1);

      if(!variant?.id){
        this.setMessage(state.message, "No variant selected.", true);
        return;
      }

      try{
        await this.addToCart(variant.id, quantity);
        this.setMessage(state.message, "Added to cart.", false);
      }catch(error){
        console.error(error);
        this.setMessage(state.message, "Failed to add to cart.", true);
      }
    }

    async addToCart(variantId, quantity){
      if(window.FW?.cart?.add && typeof window.FW.cart.add === "function"){
        await window.FW.cart.add({ variantId, quantity });
        return;
      }

      if(window.fourthwall?.cart?.add && typeof window.fourthwall.cart.add === "function"){
        await window.fourthwall.cart.add({ variantId, quantity });
        return;
      }

      throw new Error("Fourthwall cart API unavailable");
    }

    setMessage(target, message, error){
      target.textContent = message;
      target.style.color = error ? "#e22121" : "#2bd47c";
    }

    scrollStep(){
      const styles = getComputedStyle(this.root);
      const width = parseFloat(styles.getPropertyValue("--kwpc-tile-w")) || 320;
      const gap = parseFloat(styles.getPropertyValue("--kwpc-gap")) || 12;
      return width + gap;
    }

    startHold(direction){
      const scroll = () => this.track.scrollBy({ left:this.scrollStep() * direction, behavior:"smooth" });
      scroll();
      this.stopHold();
      this.holdTimer = window.setInterval(scroll, 220);
    }

    stopHold(){
      if(!this.holdTimer) return;
      window.clearInterval(this.holdTimer);
      this.holdTimer = null;
    }
  }

  window.KWProductCarousel = {
    init(root){
      if(root.kwProductCarousel) return root.kwProductCarousel;
      root.kwProductCarousel = new ProductCarousel(root);
      return root.kwProductCarousel;
    },
    initAll(){
      document.querySelectorAll(rootSelector).forEach(root => this.init(root));
    }
  };

  ready(() => window.KWProductCarousel.initAll());
})();
