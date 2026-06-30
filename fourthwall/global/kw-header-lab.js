(() => {
  const d = document;
  const current = d.currentScript;
  const src = current ? current.src : "";
  const match = src.match(/\/gh\/([^@/]+\/[^@/]+)@([^/]+)\//);
  const repo = match ? match[1] : "Knight-Witch/kw-site-widgets";
  const ref = match ? match[2] : "main";
  const version = current?.dataset.version || "20260629-nav-lab-1";
  const cssUrl = `https://cdn.jsdelivr.net/gh/${repo}@${ref}/fourthwall/global/kw-header-lab.css?v=${encodeURIComponent(version)}`;
  const mobileGlitchDelay = 420;
  const textSwapDelay = 130;
  const subtitleRevealDelay = 180;
  const subtitleRevealStep = 28;
  const subtitleAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const swapTimers = new WeakMap();
  const subtitleTimers = new WeakMap();

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Gallery", href: "/pages/gallery" },
    {
      title: "Shop The Collection",
      drawerTitle: "The Collection Domain",
      mobileSubtitle: "Shop Signature Spellweaves",
      children: [
        { title: "Shop The Full Collection", href: "/pages/the-collection-domain" },
        { title: "Edgerunners", href: "/pages/edgerunners" },
        { title: "Basscraft", href: "/pages/basscraft" },
        { title: "Wicked Hearts", href: "/pages/wicked-hearts" },
        { title: "Astral Plane", href: "/pages/astral-plane" },
        { title: "Black Mass", href: "/pages/black-mass" },
        { title: "Starchild", href: "/pages/starchild" }
      ]
    },
    {
      title: "Shop The Cauldron",
      drawerTitle: "The Cauldron Domain",
      mobileSubtitle: "Customize A Spellweave",
      children: [
        { title: "Enter The Cauldron", href: "/pages/the-cauldron" },
        { title: "Spellcraft: Create", href: "/pages/spellcraft" },
        { title: "Dark Alchemy: Modify", href: "/pages/dark-alchemy" }
      ]
    },
    {
      title: "Shop Decor",
      drawerTitle: "The Decor Domain",
      mobileSubtitle: "LED Wall Art & More",
      children: [
        { title: "Shop All Decor", href: "/pages/the-decor-domain" },
        { title: "Wicked Originals", href: "/pages/wicked-designs" },
        { title: "Anime", href: "/pages/anime" },
        { title: "Arcane", href: "/pages/arcane" },
        { title: "Baldur's Gate", href: "/pages/baldurs-gate" },
        { title: "Cyberpunk 2077", href: "/pages/cyberpunk-2077" },
        { title: "Diablo", href: "/pages/diablo" },
        { title: "Dragon Age", href: "/pages/dragon-age" },
        { title: "Dungeons & Dragons", href: "/pages/dungeons-dragons" },
        { title: "EDM Artists & Music", href: "/pages/music" },
        { title: "Elder Scrolls", href: "/pages/elder-scrolls" },
        { title: "Lord of The Rings", href: "/pages/lord-of-the-rings" },
        { title: "Magic: The Gathering", href: "/pages/mtg" },
        { title: "Mass Effect", href: "/pages/mass-effect" },
        { title: "Starcraft", href: "/pages/starcraft" },
        { title: "S.T.A.L.K.E.R. 2", href: "/pages/stalker" },
        { title: "Star Trek", href: "/pages/star-trek" },
        { title: "Star Wars", href: "/pages/star-wars" },
        { title: "Warhammer 40k", href: "/pages/40k" },
        { title: "Zelda", href: "/pages/zelda" },
        { title: "Zodiacs", href: "/pages/zodiacs" }
      ]
    },
    {
      title: "About",
      drawerTitle: "About",
      children: [
        { title: "About Us", href: "/pages/about" },
        { title: "User Guide", href: "/pages/userguide" },
        { title: "FAQ", href: "/pages/faq" },
        { title: "Repairs", href: "/pages/maintenance" },
        { title: "Care Plan", href: "/pages/warranty" },
        { title: "News & Updates", href: "/pages/news" }
      ]
    },
    { title: "View Cart", href: "/cart", className: "kw-lab-cart" }
  ];

  const escapeHtml = value => String(value ?? "").replace(/[&<>\"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[character]));
  const escapeAttribute = escapeHtml;

  function loadCss() {
    const existing = d.querySelector('link[data-kw-loader-resource="kw-header-lab-css"]');
    if (existing && existing.href === cssUrl) return;
    if (existing) existing.remove();
    const link = d.createElement("link");
    link.rel = "stylesheet";
    link.href = cssUrl;
    link.dataset.kwLoaderResource = "kw-header-lab-css";
    d.head.appendChild(link);
  }

  function renderDesktopItems() {
    return navItems.map((item, index) => {
      const hasSub = Array.isArray(item.children) && item.children.length;
      const className = [item.className, hasSub ? "has-sub" : ""].filter(Boolean).join(" ");
      if (!hasSub) {
        return `<li${className ? ` class="${escapeAttribute(className)}"` : ""}><a class="kw-lab-top-link kw-lab-glitch" data-kw-lab-text="${escapeAttribute(item.title)}" href="${escapeAttribute(item.href)}">${escapeHtml(item.title)}</a></li>`;
      }
      const title = item.title;
      const drawerTitle = item.drawerTitle || item.title;
      const subtitle = item.mobileSubtitle ? `<div class="kw-lab-desktop-subtitle kw-lab-subtitle-reveal" data-kw-lab-subtitle="${escapeAttribute(item.mobileSubtitle)}" data-kw-lab-decoded="0"></div>` : "";
      const links = item.children.map(child => `<a href="${escapeAttribute(child.href)}">${escapeHtml(child.title)}</a>`).join("");
      return `<li class="${escapeAttribute(className)}" data-kw-lab-index="${index}"><button class="kw-lab-top-button kw-lab-glitch" data-kw-lab-title="${escapeAttribute(title)}" data-kw-lab-drawer-title="${escapeAttribute(drawerTitle)}" data-kw-lab-text="${escapeAttribute(title)}" type="button">${escapeHtml(title)}</button><div class="kw-lab-sub-wrap"><div class="kw-lab-sub">${subtitle}${links}</div></div></li>`;
    }).join("");
  }

  function injectHeader() {
    d.body.classList.add("kw-nav-lab-active");
    d.getElementById("kw-header-lab")?.remove();
    d.body.insertAdjacentHTML("afterbegin", `<nav id="kw-header-lab"><div class="kw-lab-bar"><button id="kw-lab-toggle" type="button" aria-label="Open navigation">☰</button><button id="kw-lab-close" type="button" aria-label="Close navigation">✕</button><ul class="kw-lab-menu">${renderDesktopItems()}</ul><div class="kw-lab-overlay" id="kw-lab-overlay"></div><div class="kw-lab-panels" id="kw-lab-panels"></div></div></nav>`);
  }

  function setPanelWidth(panels) {
    const viewport = Math.max(d.documentElement.clientWidth || 0, window.innerWidth || 0);
    const width = Math.min(viewport || 360, Math.max(280, Math.min((viewport || 360) * 0.96, 430)));
    panels.style.setProperty("--kw-lab-panel-width", Math.round(width) + "px");
    d.getElementById("kw-header-lab")?.style.setProperty("--kw-lab-panel-width", Math.round(width) + "px");
  }

  function triggerGlitch(element) {
    if (!element) return;
    element.classList.remove("is-glitching");
    void element.offsetWidth;
    element.classList.add("is-glitching");
  }

  function setGlitchText(element, value) {
    if (!element) return;
    const text = String(value ?? "");
    const currentText = element.dataset.kwLabText || element.textContent || "";
    const existing = swapTimers.get(element);
    if (existing) window.clearTimeout(existing);
    swapTimers.delete(element);
    if (currentText === text) return;
    triggerGlitch(element);
    const timer = window.setTimeout(() => {
      element.textContent = text;
      element.dataset.kwLabText = text;
      triggerGlitch(element);
      swapTimers.delete(element);
    }, textSwapDelay);
    swapTimers.set(element, timer);
  }

  function clearSubtitleReveal(element) {
    const existing = subtitleTimers.get(element);
    if (existing) window.clearInterval(existing);
    subtitleTimers.delete(element);
  }

  function resetSubtitleReveal(element) {
    if (!element) return;
    clearSubtitleReveal(element);
    element.textContent = "";
    element.dataset.kwLabDecoded = "0";
  }

  function revealSubtitle(element) {
    if (!element) return;
    const text = element.dataset.kwLabSubtitle || "";
    if (!text || element.dataset.kwLabDecoded === "1") return;
    clearSubtitleReveal(element);
    let iteration = 0;
    element.textContent = "";
    const timer = window.setInterval(() => {
      element.textContent = text.split("").map((character, index) => {
        if (character === " ") return " ";
        if (index < iteration) return character;
        return subtitleAlphabet[Math.floor(Math.random() * subtitleAlphabet.length)];
      }).join("");
      if (iteration >= text.length) {
        clearSubtitleReveal(element);
        element.textContent = text;
        element.dataset.kwLabDecoded = "1";
        return;
      }
      iteration += 0.55;
    }, subtitleRevealStep);
    subtitleTimers.set(element, timer);
  }

  function resetElementSubtitles(element) {
    element?.querySelectorAll(".kw-lab-subtitle-reveal").forEach(resetSubtitleReveal);
  }

  function revealElementSubtitle(element) {
    const subtitle = element?.querySelector(".kw-lab-subtitle-reveal");
    if (!subtitle) return;
    resetSubtitleReveal(subtitle);
    window.setTimeout(() => revealSubtitle(subtitle), subtitleRevealDelay);
  }

  function initGlitch() {
    const nav = d.getElementById("kw-header-lab");
    if (!nav) return;

    nav.addEventListener("pointerover", event => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      const target = event.target instanceof Element ? event.target : null;
      const element = target?.closest(".kw-lab-glitch");
      if (!element || !nav.contains(element)) return;
      const related = event.relatedTarget instanceof Node ? event.relatedTarget : null;
      if (related && element.contains(related)) return;
      triggerGlitch(element);
    });

    nav.addEventListener("animationend", event => {
      const target = event.target instanceof Element ? event.target : null;
      const element = target?.closest(".kw-lab-glitch");
      if (element) element.classList.remove("is-glitching");
    }, true);
  }

  function initDesktop() {
    const nav = d.getElementById("kw-header-lab");
    const menu = nav?.querySelector(".kw-lab-menu");
    if (!nav || !menu) return;

    let locked = null;

    function resetButton(li) {
      const button = li.querySelector(":scope > .kw-lab-top-button");
      if (!button) return;
      setGlitchText(button, button.dataset.kwLabTitle || button.textContent);
    }

    function setDrawerButton(li) {
      const button = li.querySelector(":scope > .kw-lab-top-button");
      if (!button) return;
      setGlitchText(button, button.dataset.kwLabDrawerTitle || button.dataset.kwLabTitle || button.textContent);
    }

    function closeItem(li) {
      li.classList.remove("is-open");
      resetButton(li);
      resetElementSubtitles(li);
    }

    function closeAll() {
      menu.querySelectorAll(":scope > li.has-sub").forEach(closeItem);
    }

    function openItem(li, lockTitle = false) {
      menu.querySelectorAll(":scope > li.has-sub").forEach(item => {
        if (item !== li) closeItem(item);
      });
      li.classList.add("is-open");
      if (lockTitle) setDrawerButton(li);
      revealElementSubtitle(li);
    }

    menu.querySelectorAll(":scope > li.has-sub").forEach(li => {
      const button = li.querySelector(":scope > .kw-lab-top-button");
      if (!button) return;

      li.addEventListener("mouseenter", () => {
        if (window.innerWidth <= 1024 || locked) return;
        openItem(li, true);
      });

      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        if (locked === li) {
          locked = null;
          closeItem(li);
          return;
        }
        locked = li;
        openItem(li, true);
      });
    });

    menu.addEventListener("mouseleave", () => {
      if (!locked) closeAll();
    });

    d.addEventListener("click", event => {
      if (window.innerWidth <= 1024) return;
      if (nav.contains(event.target)) return;
      locked = null;
      closeAll();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 1024) {
        locked = null;
        closeAll();
      }
    });
  }

  function buildMobilePanels() {
    const panels = d.getElementById("kw-lab-panels");
    if (!panels || window.innerWidth > 1024) return;
    panels.innerHTML = "";
    panels.dataset.mode = "main";
    setPanelWidth(panels);

    const main = d.createElement("div");
    main.className = "kw-lab-panel main is-open";
    panels.appendChild(main);

    function closeSub() {
      panels.dataset.mode = "main";
      main.classList.remove("is-off");
      panels.querySelectorAll(".kw-lab-panel.sub.is-open").forEach(panel => {
        panel.classList.remove("is-open");
        resetElementSubtitles(panel);
      });
    }

    function openSub(panel) {
      panels.dataset.mode = "sub";
      main.classList.add("is-off");
      panels.querySelectorAll(".kw-lab-panel.sub.is-open").forEach(openPanel => {
        if (openPanel !== panel) {
          openPanel.classList.remove("is-open");
          resetElementSubtitles(openPanel);
        }
      });
      panel.classList.add("is-open");
      revealElementSubtitle(panel);
    }

    navItems.forEach(item => {
      const hasSub = Array.isArray(item.children) && item.children.length;
      if (!hasSub) {
        const link = d.createElement("a");
        link.href = item.href;
        link.className = "kw-lab-glitch";
        link.dataset.kwLabText = item.title;
        link.textContent = item.title;
        main.appendChild(link);
        return;
      }

      const button = d.createElement("button");
      button.type = "button";
      button.className = "kw-lab-mobile-parent";

      const label = d.createElement("span");
      label.className = "kw-lab-mobile-label kw-lab-glitch";
      label.dataset.kwLabText = item.title;
      label.textContent = item.title;
      button.appendChild(label);

      const panel = d.createElement("div");
      panel.className = "kw-lab-panel sub";

      const back = d.createElement("button");
      back.type = "button";
      back.className = "kw-lab-back";
      back.textContent = "‹ Back";
      back.addEventListener("click", event => {
        event.preventDefault();
        closeSub();
      });
      panel.appendChild(back);

      const title = d.createElement("div");
      title.className = "kw-lab-mobile-title";
      title.textContent = item.drawerTitle || item.title;
      panel.appendChild(title);

      if (item.mobileSubtitle) {
        const subtitle = d.createElement("div");
        subtitle.className = "kw-lab-mobile-subtitle kw-lab-subtitle-reveal";
        subtitle.dataset.kwLabSubtitle = item.mobileSubtitle;
        subtitle.dataset.kwLabDecoded = "0";
        subtitle.textContent = "";
        panel.appendChild(subtitle);
      }

      item.children.forEach(child => {
        const link = d.createElement("a");
        link.href = child.href;
        link.textContent = child.title;
        panel.appendChild(link);
      });

      panels.appendChild(panel);
      button.addEventListener("pointerenter", event => {
        if (event.pointerType && event.pointerType !== "mouse") return;
        triggerGlitch(label);
      });
      button.addEventListener("click", event => {
        event.preventDefault();
        if (button.dataset.opening === "1") return;
        button.dataset.opening = "1";
        triggerGlitch(label);
        window.setTimeout(() => {
          button.dataset.opening = "";
          openSub(panel);
        }, mobileGlitchDelay);
      });
      main.appendChild(button);
    });
  }

  function initMobile() {
    const toggle = d.getElementById("kw-lab-toggle");
    const close = d.getElementById("kw-lab-close");
    const overlay = d.getElementById("kw-lab-overlay");
    const panels = d.getElementById("kw-lab-panels");
    if (!toggle || !close || !overlay || !panels) return;

    function open() {
      buildMobilePanels();
      overlay.classList.add("is-open");
      close.style.display = "block";
    }

    function shut() {
      overlay.classList.remove("is-open");
      close.style.display = "none";
      panels.querySelectorAll(".kw-lab-panel.sub").forEach(resetElementSubtitles);
      panels.innerHTML = "";
      panels.dataset.mode = "";
    }

    toggle.addEventListener("click", () => {
      if (panels.innerHTML.trim()) shut();
      else open();
    });
    close.addEventListener("click", shut);
    overlay.addEventListener("click", shut);

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) shut();
      else if (panels.innerHTML.trim()) setPanelWidth(panels);
    });
  }

  function init() {
    loadCss();
    injectHeader();
    initGlitch();
    initDesktop();
    initMobile();
  }

  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", init);
  else init();
})();