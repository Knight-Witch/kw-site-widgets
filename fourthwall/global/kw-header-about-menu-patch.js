(() => {
  const patchVersion = "20260630-about-menu-cleanup-2";
  const aboutLinks = [
    { title: "About Us", href: "/pages/about" },
    { title: "User Guide", href: "/pages/userguide" },
    { title: "FAQ", href: "/pages/faq" },
    { title: "Repairs", href: "/pages/maintenance" },
    { title: "Care Plan", href: "/pages/warranty" },
    { title: "News & Updates", href: "/pages/news" }
  ];

  const escapeHtml = value => String(value ?? "").replace(/[&<>\"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[character]));

  function renderLinks() {
    return aboutLinks
      .map(link => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.title)}</a></li>`)
      .join("");
  }

  function findAboutItem(header) {
    const links = Array.from(header.querySelectorAll(".kw-menu > li > a"));
    const aboutLink = links.find(link => link.textContent.trim().toLowerCase() === "about");
    return aboutLink ? aboutLink.closest("li") : null;
  }

  function getSubmenu(item) {
    return item.querySelector(":scope > .kw-sub") || item.querySelector(":scope > .kw-sub-wrap > .kw-sub");
  }

  function patchAboutMenu() {
    const header = document.getElementById("kw-header");
    if (!header) return false;

    const aboutItem = findAboutItem(header);
    if (!aboutItem) return false;

    aboutItem.classList.add("has-sub");

    let submenu = getSubmenu(aboutItem);
    if (!submenu) {
      submenu = document.createElement("ul");
      submenu.className = "kw-sub";
      aboutItem.appendChild(submenu);
    }

    submenu.innerHTML = renderLinks();
    header.dataset.kwAboutMenuPatch = patchVersion;

    const panels = document.getElementById("kw-panels");
    if (panels) panels.innerHTML = "";

    return true;
  }

  function runPatchWithRetry() {
    if (patchAboutMenu()) return;

    let tries = 0;
    const retry = window.setInterval(() => {
      tries += 1;
      if (patchAboutMenu() || tries >= 20) window.clearInterval(retry);
    }, 100);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runPatchWithRetry);
  } else {
    runPatchWithRetry();
  }

  window.addEventListener("load", () => {
    window.setTimeout(runPatchWithRetry, 250);
    window.setTimeout(runPatchWithRetry, 1000);
  });
})();