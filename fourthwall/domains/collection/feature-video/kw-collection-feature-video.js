(() => {
  const base = "https://knightwitch.nyc3.cdn.digitaloceanspaces.com";

  const startVideo = video => {
    const source = video.querySelector("source[data-src]");
    if (!source || source.src) return;
    source.src = source.dataset.src;
    video.load();
    video.play().catch(() => {});
    video.classList.add("is-ready");
  };

  const mount = host => {
    if (!host || host.dataset.kwCollectionFeatureMounted === "1") return;
    host.dataset.kwCollectionFeatureMounted = "1";
    host.innerHTML = [
      '<section class="kw-collection-feature-module" data-kw-collection-feature-video>',
      '<div class="kw-collection-feature-frame">',
      '<video class="kw-collection-feature-media" autoplay loop playsinline muted preload="metadata">',
      `<source data-src="${base}/domainvideos/ENTER-TCD-V2.webm" type="video/webm">`,
      '</video>',
      '<div class="kw-collection-feature-controls">',
      '<button type="button" class="kw-collection-feature-mute">Unmute</button>',
      '<button type="button" class="kw-collection-feature-restart" aria-label="Restart video">',
      `<img src="${base}/restart%20svg.svg" alt="">`,
      '</button>',
      '</div>',
      '</div>',
      '</section>'
    ].join("");

    const root = host.querySelector("[data-kw-collection-feature-video]");
    const video = root?.querySelector(".kw-collection-feature-media");
    const mute = root?.querySelector(".kw-collection-feature-mute");
    const replay = root?.querySelector(".kw-collection-feature-restart");

    if (video && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          startVideo(video);
          observer.disconnect();
        });
      }, { threshold: 0.2 });
      observer.observe(video);
    } else if (video) {
      startVideo(video);
    }

    if (video && mute) {
      mute.addEventListener("click", () => {
        video.muted = !video.muted;
        mute.textContent = video.muted ? "Unmute" : "Mute";
      });
    }

    if (video && replay) {
      replay.addEventListener("click", () => {
        video.currentTime = 0;
        video.play().catch(() => {});
      });
    }
  };

  const init = () => {
    document.querySelectorAll("[data-kw-collection-feature-video-host]").forEach(mount);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
