(() => {
  const spaces = "https://knightwitch.nyc3.cdn.digitaloceanspaces.com";
  const existing = window.KW_GLOBAL_CONFIG || {};

  const config = {
    ...existing,
    cdn: {
      ...existing.cdn,
      spaces
    },
    fonts: {
      ...existing.fonts,
      agencyFbWoff2: `${spaces}/FONTS/AgencyFB-CY.woff2`,
      agencyFbWoff: `${spaces}/FONTS/AgencyFB-CY.woff`
    },
    background: {
      ...existing.background,
      poster: `${spaces}/GLOBAL/BACKGROUND/Red_Particles_16-9-poster.webp`,
      desktopUpgrade: true,
      variants: {
        720: {
          av1: `${spaces}/GLOBAL/BACKGROUND/Red_Particles_16-9-720.av1.webm`,
          vp9: `${spaces}/GLOBAL/BACKGROUND/Red_Particles_16-9-720.vp9.webm`,
          mp4: `${spaces}/GLOBAL/BACKGROUND/Red_Particles_16-9-720.fallback.mp4`
        },
        1080: {
          av1: `${spaces}/GLOBAL/BACKGROUND/Red_Particles_16-9-1080.av1.webm`,
          vp9: `${spaces}/GLOBAL/BACKGROUND/Red_Particles_16-9-1080.vp9.webm`,
          mp4: `${spaces}/GLOBAL/BACKGROUND/Red_Particles_16-9-1080.fallback.mp4`
        },
        1440: {
          av1: `${spaces}/GLOBAL/BACKGROUND/Red_Particles_16-9-1440.av1.webm`
        },
        2160: {
          av1: `${spaces}/GLOBAL/BACKGROUND/Red_Particles_16-9-2160.av1.webm`
        }
      }
    },
    social: {
      ...existing.social,
      fontAwesome: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
      links: [
        { href: "https://instagram.com/knightwitchapparel", label: "Instagram", icon: "fa-brands fa-instagram" },
        { href: "https://tiktok.com/@knightwitchapparel", label: "TikTok", icon: "fa-brands fa-tiktok" },
        { href: "https://youtube.com/@knightwitchapparel", label: "YouTube", icon: "fa-brands fa-youtube" },
        { href: "https://discord.com/users/579968778360848395", label: "Discord", icon: "fa-brands fa-discord" },
        { href: "https://facebook.com/knightwitchapparel", label: "Facebook", icon: "fa-brands fa-facebook-f" }
      ]
    }
  };

  const appendLink = attributes => {
    if (document.querySelector(attributes.selector)) return;
    const link = document.createElement("link");
    Object.entries(attributes).forEach(([key, value]) => {
      if (key !== "selector" && value !== undefined && value !== null) link.setAttribute(key, value);
    });
    document.head.appendChild(link);
  };

  window.KW_GLOBAL_CONFIG = config;

  appendLink({ selector: `link[rel="preconnect"][href="${spaces}"]`, rel: "preconnect", href: spaces, crossorigin: "" });
  appendLink({ selector: `link[rel="preload"][href="${config.fonts.agencyFbWoff2}"]`, rel: "preload", as: "font", href: config.fonts.agencyFbWoff2, type: "font/woff2", crossorigin: "" });
  appendLink({ selector: `link[rel="preload"][href="${config.background.poster}"]`, rel: "preload", as: "image", href: config.background.poster });
})();
