(() => {
  const start = () => {
    const config = window.KW_GLOBAL_CONFIG?.background;

    if (!config || document.querySelector(".kw-background-video-wrapper")) return;

    document.querySelectorAll(".background-video-wrapper").forEach(element => element.remove());

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const effectiveType = String(connection?.effectiveType || "").toLowerCase();
    const saveData = Boolean(connection?.saveData);
    const slowConnection = saveData || effectiveType === "slow-2g" || effectiveType === "2g";
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const mobileViewport = window.matchMedia?.("(max-width: 768px), (pointer: coarse)").matches;
    const variants = config.variants || {};
    const probe = document.createElement("video");

    const codecs = [
      { key: "av1", type: "video/webm", test: 'video/webm; codecs="av01.0.05M.08"' },
      { key: "vp9", type: "video/webm", test: 'video/webm; codecs="vp9"' },
      { key: "mp4", type: "video/mp4", test: "video/mp4" }
    ];

    const supportedCodecs = codecs.filter(codec => {
      const support = probe.canPlayType(codec.test);
      return support === "probably" || support === "maybe";
    });

    const wrapper = document.createElement("div");
    wrapper.className = "kw-background-video-wrapper";
    wrapper.setAttribute("aria-hidden", "true");

    if (config.poster) wrapper.style.backgroundImage = `url("${config.poster}")`;

    document.body.insertAdjacentElement("afterbegin", wrapper);

    if (reducedMotion || saveData || !supportedCodecs.length) return;

    const availableResolutions = Object.keys(variants)
      .map(value => Number(value))
      .filter(value => Number.isFinite(value))
      .sort((a, b) => a - b);

    const chooseDesiredResolution = () => {
      const cssWidth = Math.max(window.innerWidth || 0, document.documentElement.clientWidth || 0);
      const pixelWidth = cssWidth * Math.max(window.devicePixelRatio || 1, 1);

      if (mobileViewport || slowConnection) return 720;
      if (pixelWidth >= 1200 || effectiveType === "" || effectiveType === "4g") return 2160;
      return 1440;
    };

    const nearestResolution = desired => {
      const usable = availableResolutions.filter(value => value <= desired);
      return usable.length ? usable[usable.length - 1] : availableResolutions[0];
    };

    const selectAsset = desired => {
      const primary = nearestResolution(desired);
      const resolutions = [primary, ...availableResolutions.filter(value => value < primary).sort((a, b) => b - a)];

      for (const resolution of resolutions) {
        const variant = variants[resolution];
        if (!variant) continue;

        for (const codec of supportedCodecs) {
          if (variant[codec.key]) return { src: variant[codec.key], type: codec.type, resolution, codec: codec.key };
        }
      }

      return null;
    };

    const createVideo = asset => {
      const video = document.createElement("video");
      const source = document.createElement("source");

      video.className = "kw-background-video";
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "auto";
      video.disablePictureInPicture = true;
      video.setAttribute("aria-hidden", "true");
      video.setAttribute("data-resolution", String(asset.resolution));
      video.setAttribute("data-codec", asset.codec);

      if (config.poster) video.poster = config.poster;

      source.src = asset.src;
      source.type = asset.type;
      video.appendChild(source);

      return video;
    };

    const playVideo = video => {
      const ready = () => {
        wrapper.style.backgroundImage = "none";
        video.classList.add("is-ready");
        video.play().catch(() => {});
      };

      video.addEventListener("canplay", ready, { once: true });
      video.addEventListener("loadeddata", ready, { once: true });
      video.load();
      video.play().catch(() => {});
    };

    const desiredResolution = chooseDesiredResolution();
    const initialResolution = !mobileViewport && desiredResolution > 1440 && !slowConnection ? 1440 : desiredResolution;
    const initialAsset = selectAsset(initialResolution);
    const desiredAsset = selectAsset(desiredResolution);

    if (!initialAsset) return;

    const primary = createVideo(initialAsset);
    wrapper.appendChild(primary);
    playVideo(primary);

    if (!desiredAsset || desiredAsset.src === initialAsset.src || mobileViewport || slowConnection || config.desktopUpgrade === false) return;

    primary.addEventListener("playing", () => {
      const upgrade = createVideo(desiredAsset);
      let swapped = false;

      upgrade.addEventListener("canplay", () => {
        if (swapped) return;
        swapped = true;

        try {
          upgrade.currentTime = primary.currentTime;
        } catch (error) {}

        upgrade.play().catch(() => {});
        wrapper.appendChild(upgrade);

        requestAnimationFrame(() => {
          upgrade.classList.add("is-ready");
          primary.classList.remove("is-ready");
          window.setTimeout(() => primary.remove(), 500);
        });
      }, { once: true });

      upgrade.load();
    }, { once: true });
  };

  if (document.body) start();
  else document.addEventListener("DOMContentLoaded", start, { once: true });
})();
