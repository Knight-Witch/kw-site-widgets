(() => {
  const d = document;
  const api = "https://storefront-api.fourthwall.com/v1";
  const systems = [
    {
      modal: ".kwfw-modal",
      panel: ".kwfw-panel",
      price: ".kwfw-panel-price",
      option: "[data-kwfw-option]",
      optionKey: "kwfwOption",
      ruleVariantKey: "kwfwRuleVariantId"
    },
    {
      modal: ".kwpj-modal",
      panel: ".kwpj-panel",
      price: ".kwpj-panel-price",
      option: "[data-kwpj-option]",
      optionKey: "kwpjOption"
    }
  ];
  const detailCache = new Map();
  const q = (selector, root = d) => root.querySelector(selector);
  const qa = (selector, root = d) => Array.from(root.querySelectorAll(selector));
  const settings = () => window.KWFW_SETTINGS || {};
  const variants = product => product?.variants || product?.productVariants || product?.product_variants || product?.options?.variants || [];
  const variantId = variant => variant?.id || variant?.variantId || variant?.uuid || variant?.externalId || variant?.external_id || "";
  const slug = product => product?.slug || product?.handle || product?.productSlug || product?.product_slug || "";
  const systemForPanel = panel => systems.find(system => panel.matches(system.panel));
  const currencyCode = value => value?.currency || value?.currencyCode || value?.currency_code || settings().currency || "USD";
  const formatNumber = (value, currency) => {
    const amount = Number(value);
    if(!Number.isFinite(amount)) return "";
    try{
      return new Intl.NumberFormat("en-US",{
        style:"currency",
        currency:currency || settings().currency || "USD"
      }).format(amount);
    }catch{
      return `$${amount.toFixed(2)}`;
    }
  };
  const formatMoney = value => {
    if(value == null || value === "") return "";
    if(typeof value === "number") return formatNumber(value,settings().currency || "USD");
    if(typeof value === "string"){
      const text = value.trim();
      if(!text || /^(null|undefined|nan)$/i.test(text)) return "";
      if(/[$€£¥]|\b[A-Z]{3}\b/.test(text) && /\d/.test(text)) return text;
      const numeric = Number(text.replace(/[^0-9.-]/g,""));
      return Number.isFinite(numeric) ? formatNumber(numeric,settings().currency || "USD") : "";
    }
    if(typeof value === "object"){
      for(const key of ["formatted","display","displayAmount","display_amount","localized","label","text"]){
        const found = formatMoney(value[key]);
        if(found) return found;
      }
      if(value.value != null) return formatNumber(value.value,currencyCode(value));
      if(value.amount != null) return formatNumber(value.amount,currencyCode(value));
      for(const key of ["price","current","sale","regular","minimum","min"]){
        const found = formatMoney(value[key]);
        if(found) return found;
      }
    }
    return "";
  };
  const variantPrice = variant => {
    if(!variant) return "";
    for(const value of [
      variant.unitPrice,
      variant.unit_price,
      variant.price,
      variant.currentPrice,
      variant.current_price,
      variant.salePrice,
      variant.sale_price
    ]){
      const found = formatMoney(value);
      if(found) return found;
    }
    return "";
  };
  const productPrice = product => {
    if(!product) return "";
    for(const variant of variants(product)){
      const found = variantPrice(variant);
      if(found) return found;
    }
    for(const value of [
      product.price,
      product.currentPrice,
      product.current_price,
      product.salePrice,
      product.sale_price,
      product.priceRange?.min,
      product.priceRange?.minimum,
      product.price_range?.min,
      product.price_range?.minimum
    ]){
      const found = formatMoney(value);
      if(found) return found;
    }
    return "";
  };
  const optionMap = variant => {
    const result = {};
    const options = variant?.options || variant?.attributes || variant?.optionValues || variant?.selectedOptions || {};
    if(Array.isArray(options)){
      options.forEach(option => {
        const name = option?.optionName || option?.key || option?.type || option?.name;
        const raw = option?.optionValue ?? option?.value ?? option?.label;
        const value = raw && typeof raw === "object" ? raw.name ?? raw.value ?? raw.label : raw;
        if(name && value != null && !/^description$/i.test(name)) result[name] = value;
      });
    }else{
      Object.keys(options).forEach(name => {
        if(/^description$/i.test(name)) return;
        const raw = options[name];
        const value = raw && typeof raw === "object" ? raw.name ?? raw.value ?? raw.label ?? raw.optionValue : raw;
        if(value != null) result[name] = value;
      });
    }
    ["style","Style","size","Size","color","Color","colour","Colour"].forEach(name => {
      if(variant?.[name] != null && result[name] == null) result[name] = variant[name];
    });
    if(!Object.keys(result).length && (variant?.name || variant?.title)) result.Option = variant.name || variant.title;
    return result;
  };
  const selectedVariant = (panel, product, system) => {
    const list = variants(product);
    if(!list.length) return null;
    const ruleId = system.ruleVariantKey ? panel.dataset[system.ruleVariantKey] : "";
    if(ruleId){
      const match = list.find(variant => String(variantId(variant)) === String(ruleId));
      if(match) return match;
    }
    const selects = qa(system.option,panel);
    if(selects.length){
      const selected = {};
      selects.forEach(select => {
        const name = select.dataset[system.optionKey];
        if(name) selected[name] = select.value;
      });
      const match = list.find(variant => {
        const mapped = optionMap(variant);
        return Object.keys(selected).every(name => String(mapped[name] ?? "") === String(selected[name] ?? ""));
      });
      if(match) return match;
    }
    return list[0];
  };
  const fetchProduct = product => {
    const productSlug = slug(product);
    const token = settings().storefrontToken || settings().token || "";
    if(!productSlug || !token) return Promise.resolve(null);
    if(detailCache.has(productSlug)) return detailCache.get(productSlug);
    const params = new URLSearchParams({storefront_token:token,currency:settings().currency || "USD"});
    const request = fetch(`${api}/products/${encodeURIComponent(productSlug)}?${params.toString()}`)
      .then(response => {
        if(!response.ok) throw new Error(`Fourthwall product request failed ${response.status}`);
        return response.json();
      })
      .then(data => data?.product || data?.data || data)
      .catch(() => null);
    detailCache.set(productSlug,request);
    return request;
  };
  const renderPrice = (panel, product, system) => {
    const element = q(system.price,panel);
    if(!element) return "";
    const selected = selectedVariant(panel,product,system);
    const price = variantPrice(selected) || productPrice(product);
    if(price){
      element.textContent = price;
      element.hidden = false;
      element.dataset.kwPriceSource = "fourthwall-product-api";
    }
    return price;
  };
  const syncPanel = async panel => {
    const system = systemForPanel(panel);
    if(!system) return;
    const modal = panel.closest(system.modal);
    const product = modal?._product;
    if(!modal || !product) return;
    if(renderPrice(panel,product,system)) return;
    if(modal._kwPriceRequest) return modal._kwPriceRequest;
    modal._kwPriceRequest = fetchProduct(product).then(detail => {
      if(detail){
        modal._product = {...product,...detail};
        renderPrice(panel,modal._product,system);
      }
    }).finally(() => {
      modal._kwPriceRequest = null;
    });
    return modal._kwPriceRequest;
  };
  const scan = root => {
    if(root?.nodeType !== 1 && root !== d) return;
    systems.forEach(system => {
      if(root.matches?.(system.panel)) syncPanel(root);
      qa(system.panel,root).forEach(syncPanel);
    });
  };
  d.addEventListener("change",event => {
    const panel = systems.map(system => event.target.closest?.(system.panel)).find(Boolean);
    if(panel) setTimeout(() => syncPanel(panel),0);
  },true);
  d.addEventListener("click",event => {
    const panel = systems.map(system => event.target.closest?.(system.panel)).find(Boolean);
    if(panel) setTimeout(() => syncPanel(panel),0);
    if(event.target.closest?.("[data-kwfw-open],[data-kwpj-open]")){
      [0,50,160].forEach(delay => setTimeout(() => scan(d),delay));
    }
  },true);
  new MutationObserver(mutations => {
    mutations.forEach(mutation => mutation.addedNodes.forEach(node => scan(node)));
  }).observe(d.documentElement,{childList:true,subtree:true});
  d.readyState === "loading" ? d.addEventListener("DOMContentLoaded",() => scan(d)) : scan(d);
})();
