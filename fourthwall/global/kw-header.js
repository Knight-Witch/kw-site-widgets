(() => {
  const navItems = [
    { title: "Home", href: "/" },
    { title: "Gallery", href: "/pages/gallery" },
    {
      title: "Shop The Collection",
      drawerTitle: "The Collection Domain",
      href: "/pages/the-collection-domain",
      children: [
        { title: "See The Full Collection", href: "/pages/the-collection-domain" },
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
      href: "/pages/the-cauldron",
      children: [
        { title: "Enter The Cauldron", href: "/pages/the-cauldron" },
        { title: "Spellcraft - Commission", href: "/pages/spellcraft" },
        { title: "Dark Alchemy Modification", href: "/pages/dark-alchemy" }
      ]
    },
    {
      title: "Shop Decor",
      drawerTitle: "The Decor Domain",
      href: "/pages/the-decor-domain",
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
      href: "/pages/about",
      children: [
        { title: "About Us", href: "/pages/about" },
        { title: "User Guide", href: "/pages/userguide" },
        { title: "FAQ", href: "/pages/faq" },
        { title: "Maintenance & Repairs", href: "/pages/maintenance" },
        { title: "Coverage & Care Plan", href: "/pages/warranty" },
        { title: "News & Updates", href: "/pages/news" }
      ]
    },
    { title: "View Cart", href: "/cart", className: "kw-cart" }
  ];

  const escapeHtml = value => String(value ?? "").replace(/[&<>\"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[character]));
  const escapeAttribute = escapeHtml;

  function renderItems(items) {
    return items.map(item => {
      const hasSub = Array.isArray(item.children) && item.children.length;
      const classNames = [item.className, hasSub ? "has-sub" : ""].filter(Boolean).join(" ");
      const sub = hasSub ? `<ul class="kw-sub">${renderItems(item.children)}</ul>` : "";
      const drawerTitle = item.drawerTitle ? ` data-kw-drawer-title="${escapeAttribute(item.drawerTitle)}"` : "";
      return `<li${classNames ? ` class="${escapeAttribute(classNames)}"` : ""}><a href="${escapeAttribute(item.href)}"${drawerTitle}>${escapeHtml(item.title)}</a>${sub}</li>`;
    }).join("");
  }

  function injectHeader() {
    if (document.getElementById("kw-header")) return;
    document.body.insertAdjacentHTML("afterbegin", `<nav id="kw-header"><div class="kw-bar"><button id="kw-toggle" type="button" aria-label="Open navigation">☰</button><button id="kw-close" type="button" aria-label="Close navigation">✕</button><ul class="kw-menu">${renderItems(navItems)}</ul><div class="kw-overlay" id="kw-overlay"></div><div class="kw-panels" id="kw-panels"></div></div></nav>`);
  }

  function initHeader() {
    injectHeader();

    const toggle = document.getElementById("kw-toggle");
    const closeBtn = document.getElementById("kw-close");
    const overlay = document.getElementById("kw-overlay");
    const desktopMenu = document.querySelector(".kw-menu");
    const panelsRoot = document.getElementById("kw-panels");
    const desktopDropdownBottomBuffer = 32;
    const desktopDropdownScrollSpeed = 0.34;
    let resizeFrame = null;

    if (!toggle || !closeBtn || !overlay || !desktopMenu || !panelsRoot) return;

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
      const header = document.getElementById("kw-header");
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

    function calculateMobilePanelWidth() {
      const viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      if (!viewport) return 360;
      return Math.min(viewport, Math.max(280, Math.min(viewport * 0.96, 430)));
    }

    function setMobilePanelWidth() {
      const width = Math.round(calculateMobilePanelWidth());
      panelsRoot.style.setProperty("--kw-mobile-panel-width", width + "px");
      document.getElementById("kw-header")?.style.setProperty("--kw-mobile-panel-width", width + "px");
    }

    function navigateAfterTap(element, href) {
      element.style.color = "#ff0000";
      setTimeout(() => { window.location.href = href; }, 120);
    }

    function buildMobilePanels() {
      if (window.innerWidth > 1024) return;
      panelsRoot.innerHTML = "";
      panelsRoot.dataset.kwMobileMode = "main";
      setMobilePanelWidth();

      const main = document.createElement("div");
      main.className = "kw-panel main open";
      panelsRoot.appendChild(main);

      function closeSubPanels() {
        panelsRoot.dataset.kwMobileMode = "main";
        main.classList.remove("kw-panel-off");
        panelsRoot.querySelectorAll(".kw-panel.sub.open").forEach(panel => panel.classList.remove("open"));
      }

      function openSubPanel(panel) {
        panelsRoot.dataset.kwMobileMode = "sub";
        main.classList.add("kw-panel-off");
        panelsRoot.querySelectorAll(".kw-panel.sub.open").forEach(openPanel => {
          if (openPanel !== panel) openPanel.classList.remove("open");
        });
        panel.classList.add("open");
      }

      const topItems = desktopMenu.querySelectorAll(":scope > li");
      topItems.forEach((li, index) => {
        const a = li.querySelector(":scope > a");
        if (!a) return;

        const label = a.textContent.trim();
        const href = a.getAttribute("href") || "#";
        const drawerTitle = a.dataset.kwDrawerTitle || label;
        const hasCustomDrawerTitle = Boolean(a.dataset.kwDrawerTitle);
        const hasSub = li.classList.contains("has-sub");

        if (hasSub) {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "kw-mobile-parent";
          button.textContent = label;
          if (a.classList.contains("active")) button.classList.add("active");

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
            title.className = "kw-panel-title";
            title.href = href;
            title.textContent = drawerTitle;
            title.addEventListener("click", e => {
              e.preventDefault();
              navigateAfterTap(title, title.href);
            });
            panel.appendChild(title);
          }

          const subList = getDesktopSubList(li);
          const links = subList ? subList.querySelectorAll("a") : [];
          links.forEach(s => {
            const subLink = document.createElement("a");
            subLink.href = s.getAttribute("href") || "#";
            subLink.textContent = s.textContent.trim();
            if (s.classList.contains("active")) subLink.classList.add("active");
            subLink.addEventListener("click", e => {
              e.preventDefault();
              navigateAfterTap(subLink, subLink.href);
            });
            panel.appendChild(subLink);
          });

          panelsRoot.appendChild(panel);
          button.addEventListener("click", e => {
            e.preventDefault();
            openSubPanel(panel);
          });
          main.appendChild(button);
        } else {
          const item = document.createElement("a");
          item.href = href;
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
      wasMobile = isMobile;
      if (isMobile && panelsRoot.innerHTML.trim()) setMobilePanelWidth();
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        initDesktopDropdownScroll();
        syncDesktopDropdowns();
      });
    });

    initDesktopDropdownScroll();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initHeader);
  else initHeader();
})();