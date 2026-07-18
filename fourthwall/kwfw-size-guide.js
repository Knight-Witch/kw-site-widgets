(() => {
  const d = document;
  const w = window;
  const q = (selector, root = d) => root.querySelector(selector);
  const qa = (selector, root = d) => Array.from(root.querySelectorAll(selector));
  const charts = () => w.KW_SIZE_GUIDE_CHARTS || {};
  const normalize = value => String(value || "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  const slugify = value => normalize(value).replace(/\s+/g, "-");
  const unique = values => [...new Set(values.filter(Boolean))];

  let unit = localStorage.getItem("kw_size_unit") || "us";
  let returnFocus = null;
  let bodyOverflow = "";
  let refreshFrame = 0;

  const chartEntries = () => Object.entries(charts());
  const exactMatch = (values, aliases) => {
    const normalizedValues = values.map(normalize).filter(Boolean);
    return aliases.some(alias => normalizedValues.includes(normalize(alias)));
  };
  const phraseMatch = (values, aliases) => {
    const normalizedValues = values.map(normalize).filter(Boolean);
    return aliases.some(alias => {
      const target = normalize(alias);
      return target && normalizedValues.some(value => value === target || value.includes(target));
    });
  };
  const resolve = input => {
    const context = typeof input === "string" ? { token: input } : input || {};
    if(context.token && charts()[context.token]) return context.token;

    const selectedValues = unique([
      ...(context.selectedValues || []),
      context.variant,
      context.style,
      context.type,
      context.gender
    ]);

    for(const [key, chart] of chartEntries()){
      if(exactMatch(selectedValues, chart.variantAliases || [])) return key;
    }
    for(const [key, chart] of chartEntries()){
      if(phraseMatch(selectedValues, chart.variantAliases || [])) return key;
    }

    const slug = slugify(context.slug || "");
    if(slug){
      for(const [key, chart] of chartEntries()){
        if((chart.productSlugs || []).map(slugify).includes(slug)) return key;
      }
    }

    const titles = unique([context.title, context.name, context.product, context.token]);
    for(const [key, chart] of chartEntries()){
      if(exactMatch(titles, chart.aliases || [])) return key;
    }
    for(const [key, chart] of chartEntries()){
      if(phraseMatch(titles, chart.aliases || [])) return key;
    }

    return null;
  };

  const formatMetric = value => {
    const amount = Number(value);
    if(!Number.isFinite(amount)) return value;
    return String(Math.round(amount * 25.4) / 10).replace(/\.0$/, "");
  };
  const convertCell = (value, column) => {
    if(unit === "us" || column?.unit !== "in") return String(value);
    if(typeof value === "number") return formatMetric(value);

    const text = String(value).trim();
    const range = text.match(/^(-?\d+(?:\.\d+)?)\s*[-–]\s*(-?\d+(?:\.\d+)?)$/);
    return range ? `${formatMetric(range[1])}–${formatMetric(range[2])}` : text;
  };
  const columnLabel = column => {
    if(!column?.unit) return column?.label || "";
    return `${column.label} (${unit === "metric" ? "cm" : "in"})`;
  };

  const modal = () => {
    let element = q(".kw-size-modal");
    if(element) return element;

    element = d.createElement("div");
    element.className = "kw-size-modal";
    element.setAttribute("aria-hidden", "true");
    element.innerHTML = `<div class="kw-size-panel" role="dialog" aria-modal="true" aria-labelledby="kw-size-title"><div class="kw-size-top"><div class="kw-size-units"><button type="button" class="kw-size-unit" data-kw-size-unit="us">US</button><button type="button" class="kw-size-unit" data-kw-size-unit="metric">Metric</button></div><h2 class="kw-size-title" id="kw-size-title"></h2><button type="button" class="kw-size-close" aria-label="Close size guide"></button></div><div class="kw-size-body"></div></div>`;
    d.body.appendChild(element);
    return element;
  };
  const renderChart = key => {
    const chart = charts()[key];
    if(!chart) return false;

    const element = modal();
    element.dataset.chartKey = key;
    q(".kw-size-title", element).textContent = chart.title;
    qa("[data-kw-size-unit]", element).forEach(button => {
      button.classList.toggle("is-active", button.dataset.kwSizeUnit === unit);
    });

    const head = chart.columns.map(column => `<th>${columnLabel(column)}</th>`).join("");
    const rows = chart.rows.map(row => `<tr>${row.map((value, index) => `<td>${convertCell(value, chart.columns[index])}</td>`).join("")}</tr>`).join("");
    const notes = chart.notes?.length
      ? `<ul class="kw-size-notes">${chart.notes.map(note => `<li>${note}</li>`).join("")}</ul>`
      : "";

    q(".kw-size-body", element).innerHTML = `<div class="kw-size-table-wrap"><table class="kw-size-table"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>${notes}`;
    return true;
  };
  const renderPicker = () => {
    const element = modal();
    element.dataset.chartKey = "";
    q(".kw-size-title", element).textContent = "Select Size Chart";
    qa("[data-kw-size-unit]", element).forEach(button => {
      button.classList.toggle("is-active", button.dataset.kwSizeUnit === unit);
    });
    q(".kw-size-body", element).innerHTML = `<div class="kw-size-picker">${chartEntries().map(([key, chart]) => `<button type="button" class="kw-size-choice" data-kw-size-chart="${key}">${chart.title}</button>`).join("")}</div>`;
  };
  const open = (context, trigger = d.activeElement) => {
    const key = resolve(context);
    if(key && !renderChart(key)) return false;
    if(!key) renderPicker();

    const element = modal();
    returnFocus = trigger instanceof HTMLElement ? trigger : null;
    bodyOverflow = d.body.style.overflow;
    d.body.style.overflow = "hidden";
    element.classList.add("is-open");
    element.setAttribute("aria-hidden", "false");
    q(".kw-size-close", element)?.focus({ preventScroll: true });
    return true;
  };
  const close = () => {
    const element = q(".kw-size-modal");
    if(!element?.classList.contains("is-open")) return;

    element.classList.remove("is-open");
    element.setAttribute("aria-hidden", "true");
    d.body.style.overflow = bodyOverflow;
    returnFocus?.focus?.({ preventScroll: true });
    returnFocus = null;
  };

  const modalContext = source => {
    const standardModal = source?.closest?.(".kwfw-modal");
    const jacketModal = source?.closest?.(".kwpj-modal");
    const owner = standardModal || jacketModal;
    if(!owner) return null;

    const product = owner._product || {};
    const selector = standardModal ? "[data-kwfw-option]" : "[data-kwpj-option]";
    const selectedValues = [];
    qa(selector, owner).forEach(select => {
      selectedValues.push(select.value, select.options?.[select.selectedIndex]?.textContent);
    });

    return {
      slug: product.slug || product.handle || product.productSlug || product.product_slug,
      title: product.title || product.name,
      selectedValues
    };
  };
  const nativeSelectedValues = root => {
    const values = [];

    qa("select", root).forEach(select => {
      values.push(select.value, select.options?.[select.selectedIndex]?.textContent);
    });
    qa('input[type="radio"]:checked,input[type="checkbox"]:checked', root).forEach(input => {
      values.push(input.value);
      const label = input.id
        ? q(`label[for="${CSS.escape(input.id)}"]`, root)
        : input.closest("label");
      if(label) values.push(label.textContent);
    });
    qa('[aria-checked="true"],[data-state="checked"]', root).forEach(element => {
      values.push(element.textContent, element.getAttribute("value"));
    });

    return unique(values.map(value => String(value || "").trim()));
  };
  const nativeContext = () => {
    const root = q("main") || d.body;
    const path = location.pathname.split("/").filter(Boolean);
    const productIndex = path.lastIndexOf("products");
    const slug = productIndex >= 0 ? path[productIndex + 1] || "" : "";
    const title = q("h1", root)?.textContent || d.title;

    return {
      slug,
      title,
      selectedValues: nativeSelectedValues(root)
    };
  };
  const buttonContext = button => modalContext(button) || nativeContext();

  const makeButton = () => {
    const button = d.createElement("button");
    button.type = "button";
    button.className = "kw-size-guide-btn";
    button.textContent = "Size Guide";
    button.setAttribute("aria-haspopup", "dialog");
    return button;
  };
  const ensureQuantityRow = (panel, quantityField) => {
    let row = quantityField.closest(".kw-size-qty-size-row");
    if(row) return row;

    row = d.createElement("div");
    row.className = "kw-size-qty-size-row";
    quantityField.parentNode.insertBefore(row, quantityField);
    row.appendChild(quantityField);
    return row;
  };
  const installModalButton = (panel, namespace) => {
    const add = q(`[data-${namespace}-add]`, panel);
    if(!add) return;

    let button = q(".kw-size-guide-btn", panel);
    if(!button) button = makeButton();

    const quantityInput = q(`[data-${namespace}-qty-input]`, panel);
    const quantityField = quantityInput?.closest(`.${namespace}-field`);

    if(quantityField){
      const row = ensureQuantityRow(panel, quantityField);
      if(button.parentNode !== row) row.appendChild(button);
    }else if(button.nextElementSibling !== add){
      add.parentNode.insertBefore(button, add);
    }

    button.hidden = !resolve(modalContext(button));
  };
  const findNativeAddButton = root => {
    const candidates = qa('button,[role="button"],input[type="submit"]', root);
    return candidates.find(element => /add\s+to\s+(cart|auto\s*buy)/i.test(element.textContent || element.value || "")) || null;
  };
  const installNativeButton = () => {
    if(!/\/products\//.test(location.pathname)) return;

    const root = q("main") || d.body;
    const key = resolve(nativeContext());
    let button = q(".kw-size-guide-native-btn", root);

    if(!key){
      button?.remove();
      return;
    }

    const add = findNativeAddButton(root);
    if(!add) return;

    if(!button){
      button = makeButton();
      button.classList.add("kw-size-guide-native-btn");
    }

    const parent = add.parentNode;
    if(button.parentNode !== parent || button.nextElementSibling !== add){
      parent.insertBefore(button, add);
    }
    button.hidden = false;
  };
  const installExplicitButtons = root => {
    qa("[data-kw-size-guide]", root).forEach(button => {
      button.classList.add("kw-size-guide-explicit");
    });
  };
  const refresh = () => {
    qa(".kwfw-panel").forEach(panel => installModalButton(panel, "kwfw"));
    qa(".kwpj-panel").forEach(panel => installModalButton(panel, "kwpj"));
    installNativeButton();
    installExplicitButtons(d);

    const openModal = q(".kw-size-modal.is-open");
    if(openModal && returnFocus?.isConnected){
      const key = resolve(buttonContext(returnFocus));
      if(key && openModal.dataset.chartKey !== key) renderChart(key);
    }
  };
  const scheduleRefresh = () => {
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(refresh);
  };

  d.addEventListener("click", event => {
    if(event.target.closest(".kw-size-close") || event.target === q(".kw-size-modal")){
      close();
      return;
    }

    const unitButton = event.target.closest("[data-kw-size-unit]");
    if(unitButton){
      unit = unitButton.dataset.kwSizeUnit;
      localStorage.setItem("kw_size_unit", unit);
      const key = q(".kw-size-modal")?.dataset.chartKey;
      key ? renderChart(key) : renderPicker();
      return;
    }

    const chartButton = event.target.closest("[data-kw-size-chart]");
    if(chartButton){
      renderChart(chartButton.dataset.kwSizeChart);
      return;
    }

    const explicit = event.target.closest("[data-kw-size-guide]");
    if(explicit){
      open(explicit.dataset.kwSizeGuide || buttonContext(explicit), explicit);
      return;
    }

    const guide = event.target.closest(".kw-size-guide-btn");
    if(guide){
      open(buttonContext(guide), guide);
      return;
    }

    scheduleRefresh();
  }, true);
  d.addEventListener("change", scheduleRefresh, true);
  d.addEventListener("input", scheduleRefresh, true);
  d.addEventListener("keydown", event => {
    if(event.key === "Escape") close();
  });
  new MutationObserver(scheduleRefresh).observe(d.documentElement, {
    childList: true,
    subtree: true
  });

  w.KWSizeGuide = {
    open,
    close,
    resolve,
    refresh,
    charts: charts()
  };

  d.readyState === "loading"
    ? d.addEventListener("DOMContentLoaded", refresh)
    : refresh();
})();
