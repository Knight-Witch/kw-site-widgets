(() => {
  const css = `
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card * {
      isolation:auto !important;
    }

    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-rail-wrap::before,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-rail-wrap::after,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-rail-wrap.can-scroll-left::before,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-rail-wrap.can-scroll-right::after,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card::before,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card::after,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-media::before,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-media::after,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-body::before,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-body::after,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-actions::before,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-actions::after,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-btn::before,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-btn::after {
      display:none !important;
      content:none !important;
      opacity:0 !important;
      visibility:hidden !important;
      background:none !important;
      background-image:none !important;
      box-shadow:none !important;
    }

    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card {
      overflow:visible !important;
      background:#000 !important;
      background-image:none !important;
    }

    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-media {
      overflow:hidden !important;
      background:#000 !important;
      background-image:none !important;
    }

    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-body {
      position:relative !important;
      left:auto !important;
      right:auto !important;
      bottom:auto !important;
      display:flex !important;
      flex:0 0 auto !important;
      flex-direction:column !important;
      justify-content:flex-end !important;
      padding:10px 18px 18px !important;
      margin:0 !important;
      background:#000 !important;
      background-image:none !important;
      box-shadow:none !important;
      overflow:visible !important;
      pointer-events:auto !important;
      z-index:20 !important;
    }

    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-title,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-price {
      display:none !important;
    }

    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-actions {
      display:block !important;
      position:relative !important;
      overflow:visible !important;
      margin:0 !important;
      padding:0 !important;
      background:transparent !important;
      background-image:none !important;
      box-shadow:none !important;
      z-index:30 !important;
    }

    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-actions::after {
      content:"" !important;
      display:block !important;
      position:absolute !important;
      inset:2px 3px !important;
      border-radius:7px !important;
      background:#ff7a00 !important;
      box-shadow:0 0 10px rgba(255,122,0,.55),0 0 24px rgba(255,122,0,.35) !important;
      opacity:0 !important;
      pointer-events:none !important;
      z-index:1 !important;
      transition:opacity .12s ease !important;
    }

    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-btn {
      display:inline-flex !important;
      position:relative !important;
      align-items:center !important;
      justify-content:center !important;
      width:100% !important;
      min-height:46px !important;
      padding:10px 16px !important;
      border:1px solid #b35300 !important;
      border-radius:7px !important;
      background:#ff7a00 !important;
      background-image:none !important;
      color:#140a00 !important;
      font:900 18px/1 'AgencyFB','Agency FB',AgencyFB,sans-serif !important;
      letter-spacing:.02em !important;
      text-transform:none !important;
      text-decoration:none !important;
      animation:none !important;
      box-shadow:none !important;
      filter:none !important;
      overflow:visible !important;
      z-index:2 !important;
    }

    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card:hover .kwfw-card-actions::after,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-actions:hover::after,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-actions:focus-within::after {
      opacity:1 !important;
      animation:kwfwFlicker .9s linear infinite !important;
    }

    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card:hover .kwfw-btn,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-btn:hover,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-btn:focus,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-btn:focus-visible,
    .kw-product-carousel.kw-plain-jacket-carousel .kwfw-btn:active {
      animation:kwfwFlicker .9s linear infinite !important;
      box-shadow:0 0 10px rgba(255,122,0,.55),0 0 24px rgba(255,122,0,.35) !important;
      filter:none !important;
    }

    @media(max-width:760px) {
      .kw-product-carousel.kw-plain-jacket-carousel .kwfw-rail-wrap::before,
      .kw-product-carousel.kw-plain-jacket-carousel .kwfw-rail-wrap::after,
      .kw-product-carousel.kw-plain-jacket-carousel .kwfw-rail-wrap.can-scroll-left::before,
      .kw-product-carousel.kw-plain-jacket-carousel .kwfw-rail-wrap.can-scroll-right::after {
        display:none !important;
        content:none !important;
        opacity:0 !important;
        background:none !important;
        background-image:none !important;
        box-shadow:none !important;
      }

      .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-actions::after {
        opacity:1 !important;
        animation:kwfwFlicker .9s linear infinite !important;
      }

      .kw-product-carousel.kw-plain-jacket-carousel .kwfw-btn {
        animation:kwfwFlicker .9s linear infinite !important;
        box-shadow:0 0 10px rgba(255,122,0,.55),0 0 24px rgba(255,122,0,.35) !important;
        filter:none !important;
      }
    }

    @keyframes kwfwFlicker {
      0%{filter:brightness(1)}
      5%{filter:brightness(1.25)}
      10%{filter:brightness(.85)}
      15%{filter:brightness(1.3)}
      25%{filter:brightness(.9)}
      35%{filter:brightness(1.2)}
      55%{filter:brightness(1)}
      75%{filter:brightness(1.35)}
      100%{filter:brightness(1)}
    }
  `;

  const inject = () => {
    const old = document.getElementById("kw-plain-jackets-runtime-fix");
    if(old) old.remove();
    const style = document.createElement("style");
    style.id = "kw-plain-jackets-runtime-fix";
    style.textContent = css;
    document.head.appendChild(style);
  };

  const scrub = () => {
    document.querySelectorAll(".kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-body, .kw-product-carousel.kw-plain-jacket-carousel .kwfw-card-actions, .kw-product-carousel.kw-plain-jacket-carousel .kwfw-btn").forEach(el => {
      el.style.removeProperty("background-image");
      el.style.removeProperty("box-shadow");
    });
  };

  const run = () => {
    inject();
    scrub();
  };

  if(document.readyState === "complete") run();
  else window.addEventListener("load", run, { once:true });

  new MutationObserver(run).observe(document.documentElement, { childList:true, subtree:true });
})();
