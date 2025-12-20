/* widgets/kw-carousel.js */

(function () {
  const root = document.getElementById("fpx-qs");
  if (!root) return;

  if (!document.querySelector('link[data-fpx-open-sans="1"]')) {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap";
    l.setAttribute("data-fpx-open-sans", "1");
    document.head.appendChild(l);
  }

  if (!root.querySelector(".fpx-carousel")) {
    root.innerHTML = `
      <div class="fpx-carousel">
        <button class="fpx-nav fpx-prev" aria-label="Scroll left">‹</button>
        <div class="fpx-viewport" id="fpx-viewport">
          <div class="fpx-track" id="fpx-track" tabindex="0" aria-live="polite"></div>
        </div>
        <button class="fpx-nav fpx-next" aria-label="Scroll right">›</button>
      </div>
    `;
  }
})();

function fpxLoadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

(async function () {
  if (!window.jQuery) {
    await fpxLoadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js");
  }

  const root = document.getElementById("fpx-qs");
  if (!root) return;

  const FPX_TOKEN = root.getAttribute("data-fpx-token") || "";
  const FPX_SLUG = root.getAttribute("data-fpx-slug") || "";

  let FPX_CART_ID = localStorage.getItem("fw_cart_id") || null;

  $(async function () {
    await fpxLoadProducts();
    fpxWireArrows();
    fpxDragScroll(document.getElementById("fpx-viewport"));

    document.addEventListener("click", (e) => {
      const r = document.getElementById("fpx-qs");
      if (r && !r.contains(e.target)) {
        document.querySelectorAll("#fpx-qs .fpx-card.flip180").forEach((c) => {
          const front = c.querySelector(".fpx-front"),
            back = c.querySelector(".fpx-back");
          c.classList.remove("flip180");
          back.style.display = "none";
          front.style.display = "";
        });
      }
    });
  });

  async function fpxLoadProducts() {
    const $track = $("#fpx-track").empty().append('<div style="color:#aaa;padding:8px">Loading…</div>');
    try {
      const url = `https://storefront-api.fourthwall.com/v1/collections/${encodeURIComponent(
        FPX_SLUG
      )}/products?storefront_token=${encodeURIComponent(FPX_TOKEN)}&size=100`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed " + res.status);
      const data = await res.json();
      $track.empty();
      (data.results || []).forEach((p) => {
        const $item = $('<div class="fpx-item"></div>').append(fpxBuildCard(p));
        $track.append($item);
      });
    } catch (err) {
      console.error(err);
      $track.html('<div style="color:#f66;padding:8px">Failed to load products.</div>');
    }
  }

  let fpxHoldTimer = null;
  function fpxWireArrows() {
    const prev = document.querySelector("#fpx-qs .fpx-prev");
    const next = document.querySelector("#fpx-qs .fpx-next");
    const step = 332 + 12;

    const startHold =
      (dx) =>
      () => {
        const el = document.getElementById("fpx-track");
        const tick = () => el.scrollBy({ left: dx, behavior: "smooth" });
        tick();
        fpxHoldTimer = setInterval(tick, 220);
      };
    const stopHold = () => {
      if (fpxHoldTimer) {
        clearInterval(fpxHoldTimer);
        fpxHoldTimer = null;
      }
    };

    prev.addEventListener("mousedown", startHold(-step));
    next.addEventListener("mousedown", startHold(+step));
    ["mouseup", "mouseleave", "touchend", "touchcancel"].forEach((ev) => {
      prev.addEventListener(ev, stopHold);
      next.addEventListener(ev, stopHold);
    });
  }

  function fpxDragScroll(el) {
    let isDown = false,
      startX = 0,
      startLeft = 0;
    const track = document.getElementById("fpx-track");
    const onDown = (x) => {
      isDown = true;
      startX = x;
      startLeft = track.scrollLeft;
      el.classList.add("grabbing");
    };
    const onMove = (x, ev) => {
      if (!isDown) return;
      ev && ev.preventDefault();
      const walk = (x - startX) * 1.2;
      track.scrollLeft = startLeft - walk;
    };
    const onUp = () => {
      isDown = false;
      el.classList.remove("grabbing");
    };

    el.addEventListener("mousedown", (e) => onDown(e.pageX), { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    el.addEventListener("mousemove", (e) => onMove(e.pageX, e));

    el.addEventListener("touchstart", (e) => onDown(e.touches[0].pageX), { passive: true });
    el.addEventListener("touchend", onUp, { passive: true });
    el.addEventListener("touchmove", (e) => onMove(e.touches[0].pageX, e), { passive: false });
  }

  async function fpxAddToCart(variantId, quantity) {
    try {
      if (window.FW && window.FW.cart && typeof window.FW.cart.add === "function") {
        await window.FW.cart.add({ variantId, quantity });
        return;
      }
    } catch (e) {
      console.warn("FW.cart.add failed, using API cart", e);
    }

    if (!FPX_CART_ID) {
      const res = await fetch(
        `https://storefront-api.fourthwall.com/v1/carts?storefront_token=${encodeURIComponent(FPX_TOKEN)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: [{ variantId, quantity }] }),
        }
      );
      if (!res.ok) throw new Error("Create cart failed " + res.status);
      const j = await res.json();
      FPX_CART_ID = j.id;
      localStorage.setItem("fw_cart_id", FPX_CART_ID);
    } else {
      const res = await fetch(
        `https://storefront-api.fourthwall.com/v1/carts/${encodeURIComponent(
          FPX_CART_ID
        )}/add?storefront_token=${encodeURIComponent(FPX_TOKEN)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: [{ variantId, quantity }] }),
        }
      );
      if (!res.ok) throw new Error("Add item failed " + res.status);
      await res.json();
    }
  }

  function fpxDecodeHtml(str) {
    const t = document.createElement("textarea");
    t.innerHTML = String(str || "");
    return t.value;
  }
  function fpxCleanName(name) {
    let n = fpxDecodeHtml(name);
    n = n
      .replace(/^\s*Cyberpunk\s*2077\s*[-–—:]\s*/i, "")
      .replace(/\s*\[[^\]]*\]\s*$/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
    return n;
  }
  function fpxImgOf(arr, i) {
    return arr?.[i]?.transformedUrl || arr?.[i]?.url || "";
  }
  function fpxImgUrl(im) {
    return im?.transformedUrl || im?.url || "";
  }
  function fpxEsc(s) {
    return String(s || "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }
  function fpxCss(s) {
    return String(s || "").replace(/"/g, '\\"');
  }
  function fpxOptions(vals, placeholder) {
    const ph = placeholder ? `<option value="" disabled selected>${fpxEsc(placeholder)}</option>` : "";
    return ph + vals.map((v) => `<option value="${fpxEsc(v)}">${fpxEsc(v)}</option>`).join("");
  }
  function fpxUniq(a) {
    return [...new Set(a)];
  }
  function fpxAttrMap(variant) {
    const out = {};
    const attrs = variant?.attributes;
    if (!attrs) return out;
    if (Array.isArray(attrs)) {
      for (const a of attrs) {
        const k = String(a.key || a.name || a.label || "").toLowerCase().trim();
        const v = String(a.name || a.value || a.option || "").trim();
        if (k) out[k] = { name: v, value: v };
      }
    } else {
      for (const k in attrs) {
        const v = attrs[k];
        const key = String(k).toLowerCase().trim();
        const val = String(v?.name || v?.value || "").trim();
        if (key) out[key] = { name: val, value: val };
      }
    }
    return out;
  }
  function fpxCollectKeys(vars) {
    const s = new Set();
    vars.forEach((v) => Object.keys(fpxAttrMap(v)).forEach((k) => s.add(k)));
    return [...s];
  }
  function fpxValuesForKey(vars, key) {
    return vars
      .map((v) => fpxAttrMap(v)[key]?.name || fpxAttrMap(v)[key]?.value || null)
      .filter(Boolean);
  }
  function fpxFindKey(keys, candidates) {
    const expanded = {
      colour: ["colour", "color", "colourway"],
      style: ["style", "type", "fit", "garment", "product", "variant", "cut", "material", "fabric", "option", "title", "gender"],
      size: ["size"],
    };
    const list = candidates.flatMap((c) => expanded[c] || [c]);
    return list.find((k) => keys.includes(k)) || null;
  }
  function fpxVariantStyleLabel(v) {
    const raw = fpxDecodeHtml(v?.title || v?.name || v?.label || "");
    if (!raw) return null;
    return String(raw)
      .replace(/^.*?\]\s*-\s*/g, "")
      .replace(/^.*?-\s*/g, "")
      .replace(/\b(XXS|XS|S|SM|M|MD|L|LG|XL|XXL|2XL|3XL|4XL|2X|3X)\b/gi, "")
      .replace(/,\s*$/g, "")
      .trim();
  }
  function fpxChooseVariant(vars, { styleKey, sizeKey, colorKey, style, size, colour }) {
    let v = vars.find((v) => {
      const a = fpxAttrMap(v);
      if (styleKey && style && (a[styleKey]?.name || a[styleKey]?.value) !== style) return false;
      if (sizeKey && size && (a[sizeKey]?.name || a[sizeKey]?.value) !== size) return false;
      if (colorKey && colour && (a[colorKey]?.name || a[colorKey]?.value) !== colour) return false;
      return true;
    });
    if (v) return v;
    if (style) {
      v = vars.find((x) => fpxVariantStyleLabel(x) === style);
      if (v) return v;
    }
    return vars[0] || null;
  }
  function fpxColourPill(label) {
    const $b = $(`<button type="button" class="fpx-colour" title="${fpxEsc(label)}"></button>`);
    $b.css("background", fpxColourToCss(label));
    return $b;
  }
  function fpxColourToCss(name) {
    const n = String(name || "").trim().toLowerCase();
    const basic = {
      black: "#000",
      white: "#fff",
      red: "#e53935",
      blue: "#1e88e5",
      green: "#43a047",
      yellow: "#fdd835",
      orange: "#fb8c00",
      purple: "#8e24aa",
      pink: "#d81b60",
      gray: "#9e9e9e",
      grey: "#9e9e9e",
      silver: "#bdbdbd",
      gold: "#d4af37",
    };
    return basic[n] || name;
  }

  function fpxNormalizePriceObj(obj) {
    if (!obj || typeof obj.value !== "number") return null;
    const v = obj.value;
    if (v >= 10000) return { amount: v / 100, currency: obj.currency || "USD" };
    return { amount: v, currency: obj.currency || "USD" };
  }
  function fpxPriceOf(v) {
    if (!v) return null;
    if (v.unitPrice && typeof v.unitPrice.value === "number") return fpxNormalizePriceObj(v.unitPrice);
    if (v.price && typeof v.price.value === "number") return fpxNormalizePriceObj(v.price);
    if (typeof v.price === "number") return { amount: v.price, currency: "USD" };
    if (typeof v.amount === "number") return { amount: v.amount, currency: "USD" };
    return null;
  }
  function fpxPriceFromProduct(p) {
    const vs = p?.variants || [];
    for (const v of vs) {
      const m = fpxPriceOf(v);
      if (m) return m;
    }
    const pr = p?.priceRange || p?.price || null;
    if (pr?.min && typeof pr.min.value === "number") return fpxNormalizePriceObj(pr.min);
    if (pr?.value && typeof pr.value === "number") return fpxNormalizePriceObj(pr);
    return null;
  }
  function fpxFormatMoney(p, ccy = "USD") {
    if (p && typeof p.amount === "number") {
      const amt = Math.round(p.amount);
      return amt.toLocaleString(undefined, { style: "currency", currency: p.currency || ccy, minimumFractionDigits: 0 });
    }
    return "";
  }

  function fpxBuildCard(p) {
    const variants = p.variants || [];
    const images = p.images || [];
    let selected = variants[0] || null;

    const keys = fpxCollectKeys(variants);
    const kSize = fpxFindKey(keys, ["size"]);
    const kStyle = fpxFindKey(keys, ["style"]);
    const kColor = fpxFindKey(keys, ["colour"]);

    let styleVals = [];
    if (kStyle) {
      styleVals = fpxUniq(
        fpxValuesForKey(variants, kStyle).map((v) => {
          let lbl = fpxDecodeHtml(v);
          lbl = lbl.replace(/^.*?\]\s*-\s*/g, "").replace(/^.*?-\s*/g, "");
          lbl = lbl.replace(/\b(XXS|XS|SM|MD|LG|XL|XXL|2XL|3XL|4XL|2X|3X)\b/gi, "");
          lbl = lbl.replace(/,\s*$/g, "").trim();
          return lbl;
        })
      );
    } else {
      styleVals = fpxUniq(
        variants
          .map((v) => {
            let lbl = fpxDecodeHtml(fpxVariantStyleLabel(v) || "");
            lbl = lbl.replace(/^.*?\]\s*-\s*/g, "").replace(/^.*?-\s*/g, "");
            lbl = lbl.replace(/\b(XXS|XS|SM|MD|LG|XL|XXL|2XL|3XL|4XL|2X|3X)\b/gi, "");
            lbl = lbl.replace(/,\s*$/g, "").trim();
            return lbl;
          })
          .filter(Boolean)
      );
    }

    const colorVals = kColor ? fpxUniq(fpxValuesForKey(variants, kColor)) : [];

    const $space = $('<div class="fpx-space"></div>');
    const $card = $('<div class="fpx-card"></div>').appendTo($space);

    const $front = $(`
<div class="fpx-front">
  <div class="fpx-overlay"></div>
  <img alt="">
  <div class="fpx-view">View details</div>
  <div class="fpx-stats"><div class="fpx-container">
    <div class="fpx-fields">
      <div class="fpx-row">
        <div class="fpx-field">
          <label>Style</label>
          <select class="fpx-select fpx-style"></select>
        </div>
        <div class="fpx-field">
          <label>Qty</label>
          <div class="fpx-stepper">
            <button class="dec" type="button">−</button>
            <input class="qty" type="number" min="1" value="1">
            <button class="inc" type="button">+</button>
          </div>
        </div>
      </div>
      <div class="fpx-row">
        <div class="fpx-field">
          <label>Colour</label>
          <div class="fpx-colours"></div>
        </div>
        <div class="fpx-field">
          <span class="fpx-price"></span>
        </div>
      </div>
      <div class="fpx-row"><button class="fpx-add" type="button">ADD TO CART</button></div>
      <div class="fpx-row"><span class="fpx-title"></span></div>
    </div>
    <div class="fpx-msg" aria-live="polite" style="min-height:16px;font-size:12px;color:#b6b6b6;margin-top:6px;"></div>
  </div></div>
</div>
</div>`).appendTo($card);

    $front.find(".fpx-title").text(fpxCleanName(p.name || ""));
    $front.find(".fpx-price").text(fpxFormatMoney(fpxPriceOf(selected) || fpxPriceFromProduct(p)));
    $front.find("img").attr("src", fpxImgOf(images, 0));

    const $styleSel = $front.find(".fpx-style");
    if (styleVals.length) $styleSel.html(fpxOptions(styleVals, "Select Style"));

    const $qty = $front.find(".qty");
    $front.find(".dec").on("click", () => $qty.val(Math.max(1, (+$qty.val() || 1) - 1)));
    $front.find(".inc").on("click", () => $qty.val(Math.max(1, (+$qty.val() || 1) + 1)));

    const $colourWrap = $front.find(".fpx-colours");
    let chosenColor = null;
    if (colorVals.length) {
      colorVals.forEach((v) => {
        const $pill = fpxColourPill(v).appendTo($colourWrap);
        $pill.on("click", function () {
          $colourWrap.children().attr("aria-selected", "false");
          $(this).attr("aria-selected", "true");
          chosenColor = v;
          selected =
            fpxChooseVariant(variants, {
              styleKey: kStyle,
              sizeKey: kSize,
              colorKey: kColor,
              style: $styleSel.val(),
              size: null,
              colour: chosenColor,
            }) || selected;
          updatePrice();
          updateVariantImages();
        });
      });
      $colourWrap.children().first().attr("aria-selected", "true");
      chosenColor = colorVals[0];
    } else {
      const $pill = fpxColourPill("Black").appendTo($colourWrap);
      $pill.attr("aria-selected", "true").attr("disabled", true);
      chosenColor = "Black";
    }

    function updatePrice() {
      $front.find(".fpx-price").text(fpxFormatMoney(fpxPriceOf(selected) || fpxPriceFromProduct(p)));
    }

    $styleSel.on("change", function () {
      selected =
        fpxChooseVariant(variants, {
          styleKey: kStyle,
          sizeKey: kSize,
          colorKey: kColor,
          style: $styleSel.val(),
          size: null,
          colour: chosenColor,
        }) || selected;
      updatePrice();
      updateVariantImages();
    });

    $front.find(".fpx-add").on("click", async () => {
      const qty = Math.max(1, parseInt($qty.val()) || 1);
      try {
        await fpxAddToCart(selected.id, qty);
        $front.find(".fpx-msg").text("✅ Added to cart!").css("color", "#2bd47c");
      } catch (e) {
        console.error(e);
        $front.find(".fpx-msg").text("❌ Failed to add to cart").css("color", "#e22121");
      }
    });

    $card.on("mouseenter", () => $card.addClass("animate")).on("mouseleave", () => $card.removeClass("animate"));
    $front.on("click", function (e) {
      if (window.matchMedia("(max-width: 720px)").matches) {
        const isControl = e.target.closest(".fpx-fields,.fpx-view");
        if (!isControl) $card.toggleClass("animate");
      }
    });

    const $back = $(`
    <div class="fpx-back">
      <div class="fpx-gallery">
        <ul style="left:0px"></ul>
        <div class="fpx-g-arrows">
          <div class="fpx-g-prev"><div class="arrow"></div></div>
          <div class="fpx-g-next"><div class="arrow"></div></div>
        </div>
      </div>
      <div class="fpx-close" title="Close"></div>
    </div>`).appendTo($card);

    const $ul = $back.find("ul");
    images.forEach((im) => $ul.append(`<li style="background-image:url('${fpxCss(fpxImgUrl(im))}')"></li>`));
    const slideW = parseInt(getComputedStyle(document.querySelector("#fpx-qs")).getPropertyValue("--tile-w")) || 320;
    const totalW = slideW * images.length;
    $ul.css({ width: totalW + "px", left: "0px" });

    let anim = false;
    $back.find(".fpx-g-next").on("click", function () {
      if (anim) return;
      anim = true;
      const left = Math.abs(parseInt($ul.css("left") || "0", 10));
      const next = left + slideW;
      if (next >= totalW) {
        anim = false;
        return;
      }
      $ul.css({ left: "-" + next + "px", transition: "300ms ease-out" });
      setTimeout(() => (anim = false), 300);
    });
    $back.find(".fpx-g-prev").on("click", function () {
      if (anim) return;
      anim = true;
      const left = Math.abs(parseInt($ul.css("left") || "0", 10));
      const next = left - slideW;
      if (next < 0) {
        anim = false;
        return;
      }
      $ul.css({ left: "-" + next + "px", transition: "300ms ease-out" });
      setTimeout(() => (anim = false), 300);
    });

    $front.find(".fpx-view").on("click", function (e) {
      e.stopPropagation();
      const c = $card;
      c.addClass("flip-10");
      setTimeout(() => {
        c.removeClass("flip-10").addClass("flip90");
        $front.hide();
      }, 50);
      setTimeout(() => {
        c.removeClass("flip90").addClass("flip190");
        $back.show();
        setTimeout(() => {
          c.removeClass("flip190").addClass("flip180");
        }, 100);
      }, 150);
    });

    $back.find(".fpx-close").on("click", function (e) {
      e.stopPropagation();
      const c = $card;
      c.removeClass("flip180").addClass("flip190");
      setTimeout(() => {
        c.removeClass("flip190").addClass("flip90");
        $back.hide();
        $front.show();
      }, 50);
      setTimeout(() => {
        c.removeClass("flip90");
      }, 150);
    });

    function updateVariantImages() {
      const vImgs = selected?.images || selected?.media || null;
      if (Array.isArray(vImgs) && vImgs.length) {
        $ul.empty();
        vImgs.forEach((im) => $ul.append(`<li style="background-image:url('${fpxCss(fpxImgUrl(im))}')"></li>`));
        $ul.css({ width: slideW * vImgs.length + "px", left: "0px" });
        $front.find("img").attr("src", fpxImgUrl(vImgs[0]));
      } else {
        $ul.empty();
        images.forEach((im) => $ul.append(`<li style="background-image:url('${fpxCss(fpxImgUrl(im))}')"></li>`));
        $ul.css({ width: slideW * images.length + "px", left: "0px" });
        $front.find("img").attr("src", fpxImgOf(images, 0));
      }
    }

    return $space;
  }
})();
