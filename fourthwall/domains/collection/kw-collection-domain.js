(() => {
  const cdn = "https://knightwitch.nyc3.cdn.digitaloceanspaces.com";
  const buttons = [
    { label: "Edgerunners", href: "/pages/edgerunners" },
    { label: "Starchild", href: "/pages/starchild" },
    { label: "Basscraft", href: "/pages/basscraft" },
    { label: "Black Mass", href: "/pages/black-mass" },
    { label: "Astral Plane", href: "/pages/astral-plane" },
    { label: "Wicked Hearts", href: "/pages/wicked-hearts" }
  ];

  const renderButtons = className => `
    <nav class="${className}" aria-label="Collection categories">
      ${buttons.map(button => `<a href="${button.href}" class="kw-collection-button" data-kw-text="${button.label}">${button.label}</a>`).join("")}
    </nav>
  `;

  const render = () => `
    <section class="kw-collection-domain" data-kw-collection-domain>
      <div class="kw-collection-hero">
        <div class="kw-collection-video-banner">
          <video class="kw-collection-hero-video" autoplay loop muted playsinline preload="metadata">
            <source data-src="${cdn}/BANNERS/Collection.webm" type="video/webm">
          </video>
          ${renderButtons("kw-collection-buttons-desktop")}
        </div>
      </div>
      ${renderButtons("kw-collection-buttons-mobile")}
      <div class="kw-collection-video-section">
        <div class="kw-collection-feature-video-container">
          <video class="kw-collection-feature-video" autoplay loop playsinline muted preload="metadata">
            <source data-src="${cdn}/domainvideos/ENTER-TCD-V2.webm" type="video/webm">
          </video>
          <div class="kw-collection-controls">
            <button type="button" class="kw-collection-mute">Unmute</button>
            <button type="button" class="kw-collection-restart" aria-label="Restart video">
              <img src="${cdn}/restart%20svg.svg" alt="">
            </button>
          </div>
        </div>
      </div>
    </section>
  `;

  const triggerGlitch = element => {
    if (!element) return;
    element.classList.remove("is-glitching");
    void element.offsetWidth;
    element.classList.add("is-glitching");
    window.setTimeout(() => element.classList.remove("is-glitching"), 460);
  };

  const loadVideo = video => {
    const source = video.querySelector("source[data-src]");
    if (!source || source.src) return;

    source.src = source.dataset.src;
    video.load();
    video.play().catch(() => {});
    video.classList.add("is-ready");
  };

  const observeVideos = root => {
    const videos = Array.from(root.querySelectorAll("video"));

    if (!("IntersectionObserver" in window)) {
      videos.forEach(loadVideo);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        loadVideo(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    videos.forEach(video => observer.observe(video));
  };

  const bindButtons = root => {
    root.querySelectorAll(".kw-collection-button").forEach(button => {
      button.addEventListener("mouseenter", () => triggerGlitch(button));
      button.addEventListener("focus", () => triggerGlitch(button));
      button.addEventListener("click", event => {
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        const href = button.getAttribute("href");
        if (!href) return;
        event.preventDefault();
        triggerGlitch(button);
        window.setTimeout(() => {
          window.location.href = href;
        }, 220);
      });
    });
  };

  const bindFeatureControls = root => {
    const video = root.querySelector(".kw-collection-feature-video");
    const muteButton = root.querySelector(".kw-collection-mute");
    const restartButton = root.querySelector(".kw-collection-restart");

    if (video && muteButton) {
      muteButton.addEventListener("click", () => {
        video.muted = !video.muted;
        muteButton.textContent = video.muted ? "Unmute" : "Mute";
      });
    }

    if (video && restartButton) {
      restartButton.addEventListener("click", () => {
        video.currentTime = 0;
        video.play().catch(() => {});
      });
    }
  };

  const mount = host => {
    if (!host || host.dataset.kwCollectionMounted === "1") return;
    host.dataset.kwCollectionMounted = "1";
    host.innerHTML = render();

    const root = host.querySelector("[data-kw-collection-domain]");
    if (!root) return;

    bindButtons(root);
    bindFeatureControls(root);
    observeVideos(root);
  };

  const start = () => {
    document.querySelectorAll("[data-kw-collection-domain-host]").forEach(mount);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
