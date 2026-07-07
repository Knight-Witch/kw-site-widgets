(() => {
  const start = () => {
    const config = window.KW_GLOBAL_CONFIG?.social || {};
    const links = Array.isArray(config.links) ? config.links : [];

    if (!links.length) return;

    if (config.fontAwesome && !document.querySelector('link[href*="font-awesome"], link[data-kw-social-icons-fontawesome]')) {
      const fontAwesome = document.createElement("link");
      fontAwesome.rel = "stylesheet";
      fontAwesome.href = config.fontAwesome;
      fontAwesome.crossOrigin = "anonymous";
      fontAwesome.referrerPolicy = "no-referrer";
      fontAwesome.dataset.kwSocialIconsFontawesome = "true";
      document.head.appendChild(fontAwesome);
    }

    const html = links.map(link => {
      const href = String(link.href || "");
      const label = String(link.label || "Social");
      const icon = String(link.icon || "");

      return `<a href="${href}" aria-label="${label}" target="_blank" rel="noopener noreferrer"><i class="${icon}"></i></a>`;
    }).join("");

    let nav = document.querySelector("nav.social-icons") || document.querySelector(".social-icons");

    if (!nav) {
      nav = document.createElement("nav");
      nav.className = "social-icons";
    } else {
      nav.className = "social-icons";
    }

    nav.innerHTML = html;

    const header = document.querySelector("#kw-header, [data-component='Header'], .site-header, .header");

    if (header && header.nextElementSibling !== nav) {
      header.insertAdjacentElement("afterend", nav);
    } else if (!nav.parentNode) {
      document.body.insertAdjacentElement("afterbegin", nav);
    }
  };

  if (document.body) start();
  else document.addEventListener("DOMContentLoaded", start, { once: true });
})();
