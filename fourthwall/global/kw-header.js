(() => {
  const headerBuild = "20260718-collection-link-decode-hover-2";
  const mobileGlitchDelay = 420;
  const navigationDelay = 220;
  const textSwapDelay = 130;
  const subtitleRevealDelay = 180;
  const subtitleRevealStep = 28;
  const inlineRevealStep = 24;
  const inlineRevealIncrement = 1.15;
  const inlineRevealDuration = 520;
  const collectionCascadeStep = 85;
  const subtitleAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const swapTimers = new WeakMap();
  const subtitleTimers = new WeakMap();
  const inlineTimers = new WeakMap();

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Gallery", href: "/pages/gallery" },
    {
      title: "Shop The Collection",
      drawerTitle: "The Collection Domain",
      href: "/pages/the-collection-domain",
      mobileSubtitle: "Shop Signature Spellweaves",
      children: [
        { title: "Shop The Full Collection", href: "/pages/the-collection-domain" },
        { title: "Edgerunners", hoverText: "Cyberpunk 2077", href: "/pages/edgerunners" },
        { title: "Basscraft", hoverText: "Eat. Sleep. Rave. Repeat.", href: "/pages/basscraft" },
        { title: "Wicked Hearts", hoverText: "Snakes. Skulls. Sin", href: "/pages/wicked-hearts" },
        { title: "Astral Plane", hoverText: "All Things Fantasy", href: "/pages/astral-plane" },
        { title: "Black Mass", hoverText: "Sci-fi & Beyond", href: "/pages/black-mass" },
        { title: "Starchild", hoverText: "Mystics. Zodiacs. Vibes", href: "/pages/starchild" }
      ]
    },
    {
      title: "Shop The Cauldron",
      drawerTitle: "The Cauldron Domain",
      href: "/pages/the-cauldron",
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
      href: "/pages/the-decor-domain",
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
      href: "/pages/about",
      children: [
        { title: "About Us", href: "/pages/about" },
        { title: "User Guide", href: "/pages/userguide" },
        { title: "FAQ", href: "/pages/faq" },
        { title: "Repairs", href: "/pages/maintenance" },
        { title: "Care Plan", href: "/pages/warranty" },
        { title: "News & Updates", href: "/pages/news" }
      ]
    },
    { title: "View Cart", href: "/cart", className: "kw-cart" }
  ];

  const escapeHtml = value => String(value ?? "").replace(/[&<>\"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[character]));
  const escapeAttribute = escapeHtml;

  function renderItems(items, level = 0) {
    return items.map(item => {
      const hasSub = Array.isArray(item.children) && item.children.length;
      const isTopLevel = level === 0;
      const classNames = [item.className, hasSub ? "has-sub" : ""].filter(Boolean).join(" ");
      const linkClasses = ["kw-glitch", item.hoverText ? "kw-hover-swap" : ""].filter(Boolean).join(" ");
      const drawerTitle = item.drawerTitle || item.title;
      const linkData = ` data-kw-text="${escapeAttribute(item.title)}" data-kw-title="${escapeAttribute(item.title)}"`;
      const drawerData = isTopLevel && hasSub ? ` data-kw-drawer-title="${escapeAttribute(drawerTitle)}" data-kw-mobile-subtitle="${escapeAttribute(item.mobileSubtitle || "")}"` : "";
      const hoverData = item.hoverText ? ` data-kw-hover-text="${escapeAttribute(item.hoverText)}"` : "";
      const subtitle = isTopLevel && item.mobileSubtitle ? `<li class="kw-desktop-subtitle kw-subtitle-reveal" data-kw-subtitle="${escapeAttribute(item.mobileSubtitle)}" data-kw-decoded="0"></li>` : "";
      const sub = hasSub ? `<ul class="kw-sub">${subtitle}${renderItems(item.children, level + 1)}</ul>` : "";
      return `<li${classNames ? ` class="${escapeAttribute(classNames)}"` : ""}><a class="${escapeAttribute(linkClasses)}" href="${escapeAttribute(item.href)}"${linkData}${drawerData}${hoverData}>${escapeHtml(item.title)}</a>${sub}</li>`;
    }).join("");
  }

  function injectHeader() {
    const existing = document.getElementById("kw-header");
    if (existing?.dataset.kwHeaderBuild === headerBuild) return;
    existing?.remove();
    document.body.insertAdjacentHTML("afterbegin", `<nav id="kw-header" data-kw-header-build="${escapeAttribute(headerBuild)}"><div class="kw-bar"><button id="kw-toggle" type="button" aria-label="Open navigation">☰</button><button id="kw-close" type="button" aria-label="Close navigation">✕</button><ul class="kw-menu">${renderItems(navItems)}</ul><div class="kw-overlay" id="kw-overlay"></div><div class="kw-panels" id="kw-panels"></div></div></nav>`);
  }

  function triggerGlitch(element) {
    if (!element) return;
    element.classList.remove("is-glitching");
    void element.offsetWidth;
    element.classList.add("is-glitching");
  }

  function clearInlineReveal(element) {
    const existing = inlineTimers.get(element);
    if (existing) window.clearInterval(existing);
    inlineTimers.delete(element);
  }

  function setInlineText(element, value) {
    const text = String(value ?? "");
    clearInlineReveal(element);
    element.textContent = text;
    element.dataset.kwText = text;
  }

  function revealInlineText(element, value) {
    if (!element) return;
    const text = String(value ?? "");
    const currentText = element.dataset.kwText || element.textContent || "";
    if (currentText === text) return;
    clearInlineReveal(element);
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInlineText(element, text);
      return;
    }
    let iteration = 0;
    const timer = window.setInterval(() => {
      const output = text.split("").map((character, index) => {
        if (character === " ") return " ";
        if (index < iteration) return character;
        return subtitleAlphabet[Math.floor(Math.random() * subtitleAlphabet.length)];
      }).join("");
      element.textContent = output;
      element.dataset.kwText = output;
      if (iteration >= text.length) {
        clearInlineReveal(element);
        element.textContent = text;
        element.dataset.kwText = text;
        return;
      }
      iteration += inlineRevealIncrement;
    }, inlineRevealStep);
    inlineTimers.set(element, timer);
  }

  function setGlitchText(element, value) {
    if (!element) return;
    const text = String(value ?? "");
    const currentText = element.dataset.kwText || element.textContent || "";
    const existing = swapTimers.get(element);
    if (existing) window.clearTimeout(existing);
    swapTimers.delete(element);
    if (currentText === text) return;
    triggerGlitch(element);
    const timer = window.setTimeout(() => {
      element.textContent = text;
      element.dataset.kwText = text;
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
    element.dataset.kwDecoded = "0";
  }

  function revealSubtitle(element) {
    if (!element) return;
    const text = element.dataset.kwSubtitle || "";
    if (!text || element.dataset.kwDecoded === "1") return;
    clearSubtitleReveal(element);
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.textContent = text;
      element.dataset.kwDecoded = "1";
      return;
    }
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
        element.dataset.kwDecoded = "1";
        return;
      }
      iteration += 0.55;
    }, subtitleRevealStep);
    subtitleTimers.set(element, timer);
  }

  function resetElementSubtitles(element) {
    element?.querySelectorAll(".kw-subtitle-reveal").forEach(resetSubtitleReveal);
  }

  function revealElementSubtitle(element) {
    const subtitle = element?.querySelector(".kw-subtitle-reveal");
    if (!subtitle) return;
    resetSubtitleReveal(subtitle);
    window.setTimeout(() => revealSubtitle(subtitle), subtitleRevealDelay);
  }

  function getHoverSwapLinks(element) {
    return Array.from(element?.querySelectorAll("a[data-kw-hover-text]") || []);
  }

  function cascadeHoverSwapLinks(element, forward, reverse = false) {
    const links = getHoverSwapLinks(element);
    const ordered = reverse ? links.reverse() : links;
    ordered.forEach((link, index) => {
      window.setTimeout(() => {
        revealInlineText(link, forward ? link.dataset.kwHoverText : link.dataset.kwTitle);
      }, index * collectionCascadeStep);
    });
    return ordered.length ? ((ordered.length - 1) * collectionCascadeStep) + inlineRevealDuration : 0;
  }

  function isModifiedNavigation(event) {
    return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
  }

  function navigateAfterTap(element, href) {
    clearInlineReveal(element);
    element.dataset.kwText = element.textContent || element.dataset.kwText || "";
    triggerGlitch(element);
    element.style.color = "#ff0000";
    setTimeout(() => { window.location.href = href; }, navigationDelay);
  }

  function initHeader() {
    injectHeader();

    const header = document.getElementById("kw-header");
    const toggle = document.getElementById("kw-toggle");
    const closeBtn = document.getElementById("kw-close");
    const overlay = document.getElementById("kw-overlay");
    const desktopMenu = document.querySelector(".kw-menu");
    const panelsRoot = document.getElementById("kw-panels");
    const desktopDropdownBottomBuffer = 32;
    const desktopDropdownScrollSpeed = 0.34;
    let resizeFrame = null;
    let lockedDesktopItem = null;

    if (!header || !toggle || !closeBtn || !overlay || !desktopMenu || !panelsRoot) return;

    const here = location.pathname.replace(/\/+$/, "") || "/";
    document.querySelectorAll("#kw-header a[href]").forEach(a => {
      const href = (a.getAttribute("href") || "").replace(/\/+$/, "") || "/";
      if (href && href !== "#" && href === here) a.classList.add("active");
    });

    function buildDesktopScrollControl(className, text, label) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = className;
      button.textContent = text;
      button.setAttribute("aria-label", label);
      return button;
    }

    function getDesktopSubList(li) {
      return li.querySelector(":scope > .kw-sub") || li.querySelector(":scope > .kw-sub-wrap > .kw-sub");
    }

    function updateDesktopScrollControls(sub) {
      const wrap = sub.closest(".kw-sub-wrap");
      if (!wrap || window.innerWidth <= 1024) return;
      const scrollable = sub.scrollHeight - sub.clientHeight > 2;
      const atTop = sub.scrollTop <= 1;
      const atBottom = sub.scrollTop + sub.clientHeight >= sub.scrollHeight - 1;
      wrap.classList.toggle("kw-sub-scrollable", scrollable);
      wrap.classList.toggle("kw-sub-can-up", scrollable && !atTop);
      wrap.classList.toggle("kw-sub-can-down", scrollable && !atBottom);
    }

    function syncDesktopDropdownHeight(sub) {
      if (window.innerWidth <= 1024) return;
      const li = sub.closest(".kw-menu > li");
      const trigger = li ? li.querySelector(":scope > a") : null;
      const triggerBottom = trigger ? trigger.getBoundingClientRect().bottom : header.getBoundingClientRect().bottom;
      const availableHeight = Math.floor(window.innerHeight - triggerBottom - desktopDropdownBottomBuffer);
      const maxHeight = Math.max(48, availableHeight);
      const wrap = sub.closest(".kw-sub-wrap");
      sub.style.setProperty("--kw-sub-max-height", maxHeight + "px");
      if (wrap) wrap.style.setProperty("--kw-sub-max-height", maxHeight + "px");
      requestAnimationFrame(() => updateDesktopScrollControls(sub));
    }

    function ensureDesktopDropdownScroll(li, sub) {
      let wrap = sub.parentElement && sub.parentElement.classList.contains("kw-sub-wrap") ? sub.parentElement : null;

      if (!wrap) {
        wrap = document.createElement("div");
        wrap.className = "kw-sub-wrap";
        li.insertBefore(wrap, sub);
        wrap.appendChild(sub);
      }

      if (!wrap.dataset.kwControlsReady) {
        const topFade = document.createElement("div");
        const bottomFade = document.createElement("div");
        const topBlock = document.createElement("div");
        const bottomBlock = document.createElement("div");
        const upButton = buildDesktopScrollControl("kw-sub-scroll-btn kw-sub-scroll-up", "⌃", "Scroll menu up");
        const downButton = buildDesktopScrollControl("kw-sub-scroll-btn kw-sub-scroll-down", "⌄", "Scroll menu down");

        topFade.className = "kw-sub-fade kw-sub-fade-top";
        bottomFade.className = "kw-sub-fade kw-sub-fade-bottom";
        topBlock.className = "kw-sub-block kw-sub-block-top";
        bottomBlock.className = "kw-sub-block kw-sub-block-bottom";

        [topBlock, bottomBlock, upButton, downButton].forEach(el => {
          el.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
          });
        });

        wrap.appendChild(topFade);
        wrap.appendChild(bottomFade);
        wrap.appendChild(topBlock);
        wrap.appendChild(bottomBlock);
        wrap.appendChild(upButton);
        wrap.appendChild(downButton);
        wrap.dataset.kwControlsReady = "1";
      }

      if (sub.dataset.kwScrollReady === "1") return;
      sub.dataset.kwScrollReady = "1";

      let hoverScrollFrame = null;
      let lastScrollTime = 0;

      function stopHoverScroll() {
        if (hoverScrollFrame) cancelAnimationFrame(hoverScrollFrame);
        hoverScrollFrame = null;
        lastScrollTime = 0;
      }

      function startHoverScroll(direction) {
        stopHoverScroll();
        const step = time => {
          if (!lastScrollTime) lastScrollTime = time;
          const elapsed = time - lastScrollTime;
          lastScrollTime = time;
          sub.scrollTop += direction * elapsed * desktopDropdownScrollSpeed;
          updateDesktopScrollControls(sub);
          const atTop = sub.scrollTop <= 1;
          const atBottom = sub.scrollTop + sub.clientHeight >= sub.scrollHeight - 1;
          if ((direction < 0 && atTop) || (direction > 0 && atBottom)) {
            stopHoverScroll();
            return;
          }
          hoverScrollFrame = requestAnimationFrame(step);
        };
        hoverScrollFrame = requestAnimationFrame(step);
      }

      const upButton = wrap.querySelector(".kw-sub-scroll-up");
      const downButton = wrap.querySelector(".kw-sub-scroll-down");

      upButton.addEventListener("mouseenter", () => startHoverScroll(-1));
      upButton.addEventListener("focus", () => startHoverScroll(-1));
      upButton.addEventListener("mouseleave", stopHoverScroll);
      upButton.addEventListener("blur", stopHoverScroll);
      upButton.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        sub.scrollTop -= 90;
        updateDesktopScrollControls(sub);
      });

      downButton.addEventListener("mouseenter", () => startHoverScroll(1));
      downButton.addEventListener("focus", () => startHoverScroll(1));
      downButton.addEventListener("mouseleave", stopHoverScroll);
      downButton.addEventListener("blur", stopHoverScroll);
      downButton.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        sub.scrollTop += 90;
        updateDesktopScrollControls(sub);
      });

      sub.addEventListener("scroll", () => updateDesktopScrollControls(sub), { passive: true });
      wrap.addEventListener("mouseleave", stopHoverScroll);
      wrap.addEventListener("wheel", e => {
        if (window.innerWidth <= 1024 || !wrap.classList.contains("kw-sub-scrollable")) return;
        e.preventDefault();
        e.stopPropagation();
        sub.scrollTop += e.deltaY;
        updateDesktopScrollControls(sub);
      }, { passive: false });

      li.addEventListener("mouseenter", () => syncDesktopDropdownHeight(sub));
      li.addEventListener("focusin", () => syncDesktopDropdownHeight(sub));
      syncDesktopDropdownHeight(sub);
    }

    function initDesktopDropdownScroll() {
      if (window.innerWidth <= 1024 || !desktopMenu) return;
      desktopMenu.querySelectorAll(":scope > li.has-sub").forEach(li => {
        const sub = getDesktopSubList(li);
        if (sub) ensureDesktopDropdownScroll(li, sub);
      });
    }

    function syncDesktopDropdowns() {
      if (window.innerWidth <= 1024 || !desktopMenu) return;
      desktopMenu.querySelectorAll(".kw-sub").forEach(sub => syncDesktopDropdownHeight(sub));
    }

    function resetTopLink(li) {
      const link = li.querySelector(":scope > a.kw-glitch");
      if (!link) return;
      setGlitchText(link, link.dataset.kwTitle || link.textContent);
    }

    function setDrawerTopLink(li) {
      const link = li.querySelector(":scope > a.kw-glitch");
      if (!link) return;
      setGlitchText(link, link.dataset.kwDrawerTitle || link.dataset.kwTitle || link.textContent);
    }

    function closeDesktopItem(li) {
      li.classList.remove("open");
      resetTopLink(li);
      resetElementSubtitles(li);
      getHoverSwapLinks(li).forEach(link => setInlineText(link, link.dataset.kwTitle || link.textContent));
    }

    function closeDesktopItems() {
      desktopMenu.querySelectorAll(":scope > li.has-sub").forEach(closeDesktopItem);
    }

    function openDesktopItem(li) {
      desktopMenu.querySelectorAll(":scope > li.has-sub").forEach(item => {
        if (item !== li) closeDesktopItem(item);
      });
      li.classList.add("open");
      setDrawerTopLink(li);
      revealElementSubtitle(li);
      const sub = getDesktopSubList(li);
      if (sub) syncDesktopDropdownHeight(sub);
    }

    function initDesktopInteractions() {
      desktopMenu.querySelectorAll(":scope > li.has-sub").forEach(li => {
        const link = li.querySelector(":scope > a.kw-glitch");
        if (!link) return;

        li.addEventListener("mouseenter", () => {
          if (window.innerWidth <= 1024 || lockedDesktopItem) return;
          openDesktopItem(li);
        });

        link.addEventListener("click", event => {
          if (window.innerWidth <= 1024) return;
          event.preventDefault();
          event.stopPropagation();
          if (lockedDesktopItem === li) {
            lockedDesktopItem = null;
            closeDesktopItem(li);
            return;
          }
          lockedDesktopItem = li;
          openDesktopItem(li);
        });
      });

      desktopMenu.addEventListener("mouseleave", () => {
        if (!lockedDesktopItem) closeDesktopItems();
      });

      desktopMenu.addEventListener("pointerover", event => {
        if (window.innerWidth <= 1024 || (event.pointerType && event.pointerType !== "mouse")) return;
        const target = event.target instanceof Element ? event.target : null;
        const link = target?.closest(".kw-sub a[data-kw-hover-text]");
        if (!link || !desktopMenu.contains(link)) return;
        const related = event.relatedTarget instanceof Node ? event.relatedTarget : null;
        if (related && link.contains(related)) return;
        revealInlineText(link, link.dataset.kwHoverText || link.textContent);
      });

      desktopMenu.addEventListener("pointerout", event => {
        if (window.innerWidth <= 1024 || (event.pointerType && event.pointerType !== "mouse")) return;
        const target = event.target instanceof Element ? event.target : null;
        const link = target?.closest(".kw-sub a[data-kw-hover-text]");
        if (!link || !desktopMenu.contains(link)) return;
        const related = event.relatedTarget instanceof Node ? event.relatedTarget : null;
        if (related && link.contains(related)) return;
        revealInlineText(link, link.dataset.kwTitle || link.textContent);
      });

      document.addEventListener("click", event => {
        if (window.innerWidth <= 1024) return;
        if (header.contains(event.target)) return;
        lockedDesktopItem = null;
        closeDesktopItems();
      });
    }

    function initGlitch() {
      header.addEventListener("pointerover", event => {
        if (event.pointerType && event.pointerType !== "mouse") return;
        const target = event.target instanceof Element ? event.target : null;
        const element = target?.closest(".kw-glitch");
        if (!element || !header.contains(element)) return;
        if (element.dataset.kwHoverText) return;
        const related = event.relatedTarget instanceof Node ? event.relatedTarget : null;
        if (related && element.contains(related)) return;
        triggerGlitch(element);
      });

      header.addEventListener("click", event => {
        const target = event.target instanceof Element ? event.target : null;
        const link = target?.closest(".kw-sub a.kw-glitch");
        if (!link || !header.contains(link) || window.innerWidth <= 1024 || isModifiedNavigation(event)) return;
        const targetWindow = link.getAttribute("target");
        const href = link.href;
        if (!href || targetWindow === "_blank") return;
        event.preventDefault();
        clearInlineReveal(link);
        link.dataset.kwText = link.textContent || link.dataset.kwText || "";
        triggerGlitch(link);
        window.setTimeout(() => { window.location.href = href; }, navigationDelay);
      });

      header.addEventListener("animationend", event => {
        const target = event.target instanceof Element ? event.target : null;
        const element = target?.closest(".kw-glitch");
        if (element) element.classList.remove("is-glitching");
      }, true);
    }

    function calculateMobilePanelWidth() {
      const viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      if (!viewport) return 360;
      return Math.min(viewport, Math.max(280, Math.min(viewport * 0.96, 430)));
    }

    function setMobilePanelWidth() {
      const width = Math.round(calculateMobilePanelWidth());
      panelsRoot.style.setProperty("--kw-mobile-panel-width", width + "px");
      header.style.setProperty("--kw-mobile-panel-width", width + "px");
    }

    function buildMobilePanels() {
      if (window.innerWidth > 1024) return;
      let mobileCloseTimer = null;
      panelsRoot.innerHTML = "";
      panelsRoot.dataset.kwMobileMode = "main";
      setMobilePanelWidth();

      const main = document.createElement("div");
      main.className = "kw-panel main open";
      panelsRoot.appendChild(main);

      function closeSubPanels() {
        const openPanels = Array.from(panelsRoot.querySelectorAll(".kw-panel.sub.open"));
        const delay = openPanels.reduce((duration, panel) => Math.max(duration, cascadeHoverSwapLinks(panel, false, true)), 0);
        const close = () => {
          panelsRoot.dataset.kwMobileMode = "main";
          main.classList.remove("kw-panel-off");
          openPanels.forEach(panel => {
            panel.classList.remove("open");
            resetElementSubtitles(panel);
          });
          mobileCloseTimer = null;
        };
        if (mobileCloseTimer) window.clearTimeout(mobileCloseTimer);
        if (delay) mobileCloseTimer = window.setTimeout(close, delay);
        else close();
      }

      function openSubPanel(panel) {
        if (mobileCloseTimer) {
          window.clearTimeout(mobileCloseTimer);
          mobileCloseTimer = null;
        }
        panelsRoot.dataset.kwMobileMode = "sub";
        main.classList.add("kw-panel-off");
        panelsRoot.querySelectorAll(".kw-panel.sub.open").forEach(openPanel => {
          if (openPanel !== panel) {
            openPanel.classList.remove("open");
            resetElementSubtitles(openPanel);
            getHoverSwapLinks(openPanel).forEach(link => setInlineText(link, link.dataset.kwTitle || link.textContent));
          }
        });
        getHoverSwapLinks(panel).forEach(link => setInlineText(link, link.dataset.kwTitle || link.textContent));
        panel.classList.add("open");
        revealElementSubtitle(panel);
        window.setTimeout(() => cascadeHoverSwapLinks(panel, true), 180);
      }

      const topItems = desktopMenu.querySelectorAll(":scope > li");
      topItems.forEach((li, index) => {
        const a = li.querySelector(":scope > a");
        if (!a) return;

        const label = a.dataset.kwTitle || a.textContent.trim();
        const href = a.getAttribute("href") || "#";
        const drawerTitle = a.dataset.kwDrawerTitle || label;
        const hasCustomDrawerTitle = Boolean(a.dataset.kwDrawerTitle);
        const subtitleText = a.dataset.kwMobileSubtitle || "";
        const hasSub = li.classList.contains("has-sub");

        if (hasSub) {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "kw-mobile-parent";
          if (a.classList.contains("active")) button.classList.add("active");

          const buttonLabel = document.createElement("span");
          buttonLabel.className = "kw-mobile-label kw-glitch";
          buttonLabel.dataset.kwText = label;
          buttonLabel.textContent = label;
          button.appendChild(buttonLabel);

          const panel = document.createElement("div");
          panel.className = "kw-panel sub";
          panel.dataset.kwParentIndex = String(index);

          const back = document.createElement("button");
          back.type = "button";
          back.className = "kw-panel-back";
          back.textContent = "‹ Back";
          back.addEventListener("click", e => {
            e.preventDefault();
            closeSubPanels();
          });
          panel.appendChild(back);

          if (hasCustomDrawerTitle) {
            const title = document.createElement("div");
            title.className = "kw-panel-title kw-panel-title-static";
            title.textContent = drawerTitle;
            panel.appendChild(title);
          } else {
            const title = document.createElement("a");
            title.className = "kw-panel-title kw-glitch";
            title.dataset.kwText = drawerTitle;
            title.href = href;
            title.textContent = drawerTitle;
            title.addEventListener("click", e => {
              e.preventDefault();
              navigateAfterTap(title, title.href);
            });
            panel.appendChild(title);
          }

          if (subtitleText) {
            const subtitle = document.createElement("div");
            subtitle.className = "kw-panel-subtitle kw-subtitle-reveal";
            subtitle.dataset.kwSubtitle = subtitleText;
            subtitle.dataset.kwDecoded = "0";
            subtitle.textContent = "";
            panel.appendChild(subtitle);
          }

          const subList = getDesktopSubList(li);
          const links = subList ? subList.querySelectorAll("a") : [];
          links.forEach(s => {
            const subLink = document.createElement("a");
            const text = s.dataset.kwTitle || s.textContent.trim();
            subLink.href = s.getAttribute("href") || "#";
            subLink.className = s.dataset.kwHoverText ? "kw-glitch kw-hover-swap" : "kw-glitch";
            subLink.dataset.kwText = text;
            subLink.dataset.kwTitle = text;
            if (s.dataset.kwHoverText) subLink.dataset.kwHoverText = s.dataset.kwHoverText;
            subLink.textContent = text;
            if (s.classList.contains("active")) subLink.classList.add("active");
            subLink.addEventListener("click", e => {
              e.preventDefault();
              navigateAfterTap(subLink, subLink.href);
            });
            panel.appendChild(subLink);
          });

          panelsRoot.appendChild(panel);
          button.addEventListener("pointerenter", event => {
            if (event.pointerType && event.pointerType !== "mouse") return;
            triggerGlitch(buttonLabel);
          });
          button.addEventListener("click", e => {
            e.preventDefault();
            if (button.dataset.opening === "1") return;
            button.dataset.opening = "1";
            triggerGlitch(buttonLabel);
            window.setTimeout(() => {
              button.dataset.opening = "";
              openSubPanel(panel);
            }, mobileGlitchDelay);
          });
          main.appendChild(button);
        } else {
          const item = document.createElement("a");
          item.href = href;
          item.className = "kw-glitch";
          item.dataset.kwText = label;
          item.textContent = label;
          if (a.classList.contains("active")) item.classList.add("active");
          item.addEventListener("click", e => {
            e.preventDefault();
            navigateAfterTap(item, item.href);
          });
          main.appendChild(item);
        }
      });
    }

    function openMobile() {
      setTimeout(() => {
        buildMobilePanels();
        overlay.classList.add("open");
        closeBtn.style.display = "block";
      }, 300);
    }

    function closeMobile() {
      overlay.classList.remove("open");
      closeBtn.style.display = "none";
      panelsRoot.querySelectorAll(".kw-panel.sub").forEach(resetElementSubtitles);
      panelsRoot.innerHTML = "";
      panelsRoot.dataset.kwMobileMode = "";
    }

    toggle.addEventListener("click", () => {
      if (panelsRoot.innerHTML.trim()) closeMobile();
      else openMobile();
    });
    closeBtn.addEventListener("click", closeMobile);
    overlay.addEventListener("click", closeMobile);

    let wasMobile = window.innerWidth <= 1024;
    window.addEventListener("resize", () => {
      const isMobile = window.innerWidth <= 1024;
      if (wasMobile !== isMobile) closeMobile();
      if (isMobile) {
        lockedDesktopItem = null;
        closeDesktopItems();
      }
      wasMobile = isMobile;
      if (isMobile && panelsRoot.innerHTML.trim()) setMobilePanelWidth();
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        initDesktopDropdownScroll();
        syncDesktopDropdowns();
      });
    });

    initDesktopDropdownScroll();
    initDesktopInteractions();
    initGlitch();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initHeader);
  else initHeader();
})();