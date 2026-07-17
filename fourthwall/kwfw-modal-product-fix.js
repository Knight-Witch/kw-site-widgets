(() => {
  const d = document;
  const currency = () => window.KWFW_SETTINGS?.currency || "USD";
  const q = (selector, root = d) => root.querySelector(selector);
  const qa = (selector, root = d) => Array.from(root.querySelectorAll(selector));
  const variantId = variant => variant?.id || variant?.variantId || variant?.uuid || variant?.externalId || variant?.external_id || "";
  const variants = product => product?.variants || product?.productVariants || product?.product_variants || product?.options?.variants || [];
  const available = variant => variant && variant.available !== false && variant.isAvailable !== false && variant.inStock !== false && variant.stock !== 0 && variant.inventory !== 0;
  const formatMoney = value => {
    if(value == null || value === "") return "";
    if(typeof value === "string"){
      const text = value.trim();
      if(!text || /^(null|undefined|nan)$/i.test(text)) return "";
      if(/[$€£¥]|\b[A-Z]{3}\b/.test(text) && /\d/.test(text)) return text;
      const numeric = Number(text.replace(/[^0-9.-]/g,""));
      if(!Number.isFinite(numeric)) return "";
      return formatMoney(numeric);
    }
    if(typeof value === "number"){
      if(!Number.isFinite(value)) return "";
      const amount = Number.isInteger(value) && Math.abs(value) >= 1000 ? value / 100 : value;
      try{return new Intl.NumberFormat("en-US",{style:"currency",currency:currency()}).format(amount)}catch{return `$${amount.toFixed(2)}`}
    }
    if(typeof value === "object"){
      for(const key of ["formatted","display","displayAmount","display_amount","localized","label","text"]){
        const found = formatMoney(value[key]);
        if(found) return found;
      }
      for(const key of ["amount","value","price","min","minimum","current","sale","regular","cents","centAmount","cent_amount","unitAmount","unit_amount"]){
        const found = formatMoney(value[key]);
        if(found) return found;
      }
    }
    return "";
  };
  const productPrice = product => {
    const paths = [
      product?.price,
      product?.displayPrice,
      product?.display_price,
      product?.currentPrice,
      product?.current_price,
      product?.salePrice,
      product?.sale_price,
      product?.basePrice,
      product?.base_price,
      product?.defaultPrice,
      product?.default_price,
      product?.minPrice,
      product?.min_price,
      product?.minimumPrice,
      product?.minimum_price,
      product?.priceRange?.min,
      product?.priceRange?.minimum,
      product?.priceRange?.from,
      product?.price_range?.min,
      product?.price_range?.minimum,
      product?.price_range?.from,
      product?.pricing?.price,
      product?.pricing?.min,
      product?.pricing?.minimum
    ];
    for(const path of paths){
      const found = formatMoney(path);
      if(found) return found;
    }
    return "";
  };
  const optMap = variant => {
    const result = {};
    const options = variant?.options || variant?.attributes || variant?.optionValues || variant?.selectedOptions || {};
    if(Array.isArray(options)){
      options.forEach(option => {
        const name = option.name || option.optionName || option.key || option.type;
        const value = option.value || option.optionValue || option.label || option.name;
        if(name && value) result[name] = value;
      });
    }else{
      Object.keys(options).forEach(key => {
        if(options[key] != null && typeof options[key] !== "object") result[key] = options[key];
      });
    }
    ["style","Style","size","Size","color","Color","colour","Colour"].forEach(key => {
      if(variant?.[key] && !result[key]) result[key] = variant[key];
    });
    if(!Object.keys(result).length && (variant?.name || variant?.title)) result.Option = variant.name || variant.title;
    return result;
  };
  const selectedVariant = (panel, product) => {
    const list = variants(product).filter(available);
    const ruleId = panel.dataset.kwfwRuleVariantId;
    if(ruleId){
      const found = list.find(variant => String(variantId(variant)) === String(ruleId));
      if(found) return found;
    }
    const selects = qa("[data-kwfw-option]", panel);
    if(selects.length){
      const selected = {};
      selects.forEach(select => selected[select.dataset.kwfwOption] = select.value);
      const found = list.find(variant => {
        const mapped = optMap(variant);
        return Object.keys(selected).every(key => String(mapped[key] ?? "") === String(selected[key] ?? ""));
      });
      if(found) return found;
    }
    return list[0] || variants(product)[0] || null;
  };
  const variantPrice = variant => {
    if(!variant) return "";
    const paths = [
      variant.price,
      variant.displayPrice,
      variant.display_price,
      variant.currentPrice,
      variant.current_price,
      variant.salePrice,
      variant.sale_price,
      variant.basePrice,
      variant.base_price,
      variant.defaultPrice,
      variant.default_price,
      variant.unitPrice,
      variant.unit_price,
      variant.priceRange?.min,
      variant.priceRange?.minimum,
      variant.price_range?.min,
      variant.price_range?.minimum,
      variant.pricing?.price,
      variant.pricing?.min
    ];
    for(const path of paths){
      const found = formatMoney(path);
      if(found) return found;
    }
    return "";
  };
  const syncPanel = panel => {
    const modal = panel.closest(".kwfw-modal");
    const product = modal?._product;
    if(!product) return;
    const priceElement = q(".kwfw-panel-price", panel);
    if(!priceElement) return;
    const price = variantPrice(selectedVariant(panel, product)) || productPrice(product);
    if(price){
      priceElement.textContent = price;
      priceElement.removeAttribute("hidden");
      priceElement.dataset.kwfwPriceSource = "product-api";
    }else{
      priceElement.dataset.kwfwPriceSource = "missing";
    }
  };
  const syncAll = (root = d) => qa(".kwfw-panel", root).forEach(syncPanel);
  d.addEventListener("change", event => {
    const panel = event.target.closest?.(".kwfw-panel");
    if(panel) setTimeout(() => syncPanel(panel), 0);
  }, true);
  d.addEventListener("click", event => {
    const panel = event.target.closest?.(".kwfw-panel");
    if(panel) setTimeout(() => syncPanel(panel), 0);
  }, true);
  new MutationObserver(mutations => {
    mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
      if(node.nodeType === 1) setTimeout(() => syncAll(node), 30);
    }));
  }).observe(d.documentElement,{childList:true,subtree:true});
  d.readyState === "loading" ? d.addEventListener("DOMContentLoaded",() => syncAll()) : syncAll();
})();
