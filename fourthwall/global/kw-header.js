(() => {
  const navItems = [
    { title: "Home", href: "/" },
    { title: "Gallery", href: "/pages/gallery" },
    {
      title: "Shop The Collection",
      href: "/pages/the-collection-domain",
      children: [
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
      href: "/pages/the-cauldron",
      children: [
        { title: "Spellcraft", href: "/pages/spellcraft" },
        { title: "Dark Alchemy", href: "/pages/dark-alchemy" }
      ]
    },
    {
      title: "Shop Decor",
      href: "/pages/the-decor-domain",
      children: [
        { title: "All Decor", href: "/pages/the-decor-domain" },
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
      return `<li${classNames ? ` class="${escapeAttribute(classNames)}"` : ""}><a href="${escapeAttribute(item.href)}">${escapeHtml(item.title)}</a>${sub}</li>`;
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

    function buildMobilePanels() {
      if (window.innerWidth > 1024) return;
      panelsRoot.innerHTML = "";

      const main = document.createElement("div");
      main.className = "kw-panel main";
      panelsRoot.appendChild(main);

      const topItems = desktopMenu.querySelectorAll(":scope > li");
      topItems.forEach(li => {
        const a = li.querySelector(":scope > a");
        if (!a) return;

        const item = document.createElement("a");
        item.href = a.getAttribute("href") || "#";
        item.textContent = a.textContent.trim();
        if (a.classList.contains("active")) item.classList.add("active");

        const hasSub = li.classList.contains("has-sub");
        if (hasSub) {
          const sub = document.createElement("div");
          sub.className = "kw-panel sub";
          sub.style.transform = "translateX(-100%)";
          sub.style.left = "var(--kw-sub-left,260px)";
          sub.style.transition = "none";

          const subList = getDesktopSubList(li);
          const links = subList ? subList.querySelectorAll("a") : [];
          links.forEach(s => {
            const sl = document.createElement("a");
            sl.href = s.getAttribute("href") || "#";
            sl.textContent = s.textContent.trim();
            if (s.classList.contains("active")) sl.classList.add("active");
            sl.addEventListener("click", e => {
              e.preventDefault();
              sl.style.color = "#ff0000";
              setTimeout(() => { window.location.href = sl.href; }, 120);
            });
            sub.appendChild(sl);
          });
          panelsRoot.appendChild(sub);

          const wrap = document.createElement("div");
          wrap.className = "has-sub";
          wrap.appendChild(item);
          main.appendChild(wrap);

          sub.classList.remove("open");

          item.addEventListener("click", e => {
            e.preventDefault();
            const isOpen = sub.classList.contains("open");
            panelsRoot.querySelectorAll(".kw-panel.sub.open").forEach(p => p.classList.remove("open"));
            if (!isOpen) sub.classList.add("open");
            else window.location.href = item.href;
          });
        } else {
          item.addEventListener("click", e => {
            e.preventDefault();
            item.style.color = "#ff0000";
            setTimeout(() => { window.location.href = item.href; }, 120);
          });
          main.appendChild(item);
        }
      });

      requestAnimationFrame(() => {
        const links = main.querySelectorAll("a");
        let w = 220;
        links.forEach(el => { w = Math.max(w, Math.ceil(el.getBoundingClientRect().width) + 24); });
        w = Math.min(w, Math.floor(window.innerWidth * 0.8));
        main.style.width = w + "px";
        panelsRoot.style.setProperty("--kw-sub-left", (w + 8) + "px");

        const waitForPanels = () => {
          const subsReady = panelsRoot.querySelectorAll(".kw-panel.sub").length;
          if (subsReady) requestAnimationFrame(() => main.classList.add("open"));
          else requestAnimationFrame(waitForPanels);
        };
        waitForPanels();
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
