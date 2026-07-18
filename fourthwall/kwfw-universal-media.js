(() => {
  const d = document;
  const w = window;
  const settings = w.KWFW_SETTINGS || {};
  const q = (selector, root = d) => root.querySelector(selector);
  const qa = (selector, root = d) => Array.from(root.querySelectorAll(selector));

  let cache = null;
  let loading = null;

  const absolute = (source, base) => {
    if(!source) return source;
    try{
      return new URL(source, base || location.href).href;
    }catch{
      return source;
    }
  };

  const normalize = (item, base) => {
    if(!item) return null;
    if(typeof item === "string") return { src:absolute(item,base) };
    if(!item.src) return null;
    return {
      ...item,
      src:absolute(item.src,base),
      poster:item.poster ? absolute(item.poster,base) : item.poster
    };
  };

  const inferType = item => {
    const explicit = String(item.type || "").toLowerCase();
    if(explicit === "video" || explicit === "image") return explicit;
    return /\.(webm|mp4|m4v|mov)(\?|#|$)/i.test(item.src) ? "video" : "image";
  };

  const configMedia = () => {
    const media = [];
    if(Array.isArray(settings.appendProductMedia)) media.push(...settings.appendProductMedia);
    if(Array.isArray(settings.universalProductMedia)) media.push(...settings.universalProductMedia);
    if(settings.universalFeatureImage) media.push({ type:"image", src:settings.universalFeatureImage, alt:settings.universalFeatureAlt || "LED jacket features" });
    if(settings.universalFeatureCardImage) media.push({ type:"image", src:settings.universalFeatureCardImage, alt:settings.universalFeatureAlt || "LED jacket features" });
    if(settings.appendProductImage) media.push({ type:"image", src:settings.appendProductImage, alt:settings.universalFeatureAlt || "LED jacket features" });
    if(settings.universalFeatureVideo) media.push({
      type:"video",
      src:settings.universalFeatureVideo,
      poster:settings.universalFeatureVideoPoster || "",
      mime:settings.universalFeatureVideoType || ""
    });
    if(settings.appendProductVideo) media.push({
      type:"video",
      src:settings.appendProductVideo,
      poster:settings.appendProductVideoPoster || "",
      mime:settings.appendProductVideoType || ""
    });

    const raw = q("[data-kwfw-append-media]")?.dataset.kwfwAppendMedia;
    if(raw){
      try{
        const parsed = JSON.parse(raw);
        Array.isArray(parsed) ? media.push(...parsed) : media.push(parsed);
      }catch{
        media.push({ src:raw });
      }
    }

    return media.map(item => normalize(item)).filter(Boolean);
  };

  const manifestMedia = async () => {
    const source = settings.appendProductMediaManifest || settings.universalProductMediaManifest || settings.productMediaManifest;
    if(!source) return [];

    const url = absolute(source);
    const response = await fetch(url,{ cache:"no-store" });
    if(!response.ok) throw new Error(`Media manifest failed ${response.status}`);

    const text = await response.text();
    let data;
    try{
      data = JSON.parse(text);
    }catch{
      data = text.split(/\r?\n/).map(value => value.trim()).filter(Boolean);
    }

    if(Array.isArray(data)) return data.map(item => normalize(item,url)).filter(Boolean);
    if(Array.isArray(data.media)) return data.media.map(item => normalize(item,url)).filter(Boolean);
    return [];
  };

  const mediaList = async () => {
    if(cache) return cache;
    if(loading) return loading;

    loading = Promise.resolve().then(async () => {
      const seen = new Set();
      const result = [];
      [...configMedia(),...await manifestMedia()].forEach(item => {
        if(!item?.src || seen.has(item.src)) return;
        seen.add(item.src);
        result.push(item);
      });
      cache = result;
      return result;
    }).catch(error => {
      console.error(error);
      cache = configMedia();
      return cache;
    });

    return loading;
  };

  const slides = gallery => {
    const track = q(".kwfw-gallery-track",gallery);
    return track ? Array.from(track.children).filter(element => element.matches("img,video")) : [];
  };

  const setGallery = (modal, index) => {
    const gallery = q(".kwfw-gallery",modal);
    const track = q(".kwfw-gallery-track",modal);
    if(!gallery || !track) return;

    const items = slides(gallery);
    const dots = qa(".kwfw-dot",gallery);
    if(!items.length) return;

    const target = (index + items.length) % items.length;
    modal._galleryIndex = target;
    track.style.transform = `translateX(${-target * 100}%)`;
    dots.forEach((dot, position) => dot.classList.toggle("is-active",position === target));
    items.forEach((item, position) => {
      if(item.tagName === "VIDEO" && position !== target) item.pause();
    });
  };

  const makeSlide = (item, index) => {
    if(inferType(item) === "video"){
      const video = d.createElement("video");
      video.className = "kwfw-universal-media-slide";
      video.controls = item.controls !== false;
      video.playsInline = true;
      video.preload = item.preload || "metadata";
      video.setAttribute("aria-label",item.alt || item.label || `Product video ${index + 1}`);
      if(item.poster) video.poster = item.poster;
      if(item.muted) video.muted = true;
      if(item.loop) video.loop = true;
      if(item.autoplay) video.autoplay = true;

      const source = d.createElement("source");
      source.src = item.src;
      source.type = item.mime || (/\.webm(\?|#|$)/i.test(item.src) ? "video/webm" : "video/mp4");
      video.appendChild(source);
      return video;
    }

    const image = d.createElement("img");
    image.className = "kwfw-universal-media-slide";
    image.src = item.src;
    image.alt = item.alt || item.label || `Product image ${index + 1}`;
    image.draggable = false;
    return image;
  };

  const removeLegacyDescriptionClones = root => {
    if(root?.matches?.(".kwfw-desc-wide")){
      root.remove();
      return;
    }
    qa(".kwfw-desc-wide",root).forEach(element => element.remove());
  };

  const inject = async (root = d) => {
    removeLegacyDescriptionClones(root);
    const media = await mediaList();
    if(!media.length) return;

    qa(".kwfw-modal .kwfw-gallery",root).forEach(gallery => {
      const track = q(".kwfw-gallery-track",gallery);
      const dots = q(".kwfw-dots",gallery);
      if(!track || !dots) return;

      const existing = new Set(slides(gallery).map(element => element.currentSrc || element.src || element.querySelector?.("source")?.src || ""));
      let added = false;

      media.forEach(item => {
        if(existing.has(item.src)) return;
        track.appendChild(makeSlide(item,slides(gallery).length));

        const dot = d.createElement("button");
        dot.type = "button";
        dot.className = "kwfw-dot";
        dot.dataset.kwfwGalleryDot = String(slides(gallery).length - 1);
        dot.setAttribute("aria-label",item.dotLabel || item.label || `Media ${slides(gallery).length}`);
        dots.appendChild(dot);

        existing.add(item.src);
        added = true;
      });

      if(added || slides(gallery).length > 1){
        gallery.classList.remove("is-single");
        setGallery(gallery.closest(".kwfw-modal"),gallery.closest(".kwfw-modal")._galleryIndex || 0);
      }
    });
  };

  const scan = () => {
    inject();
    setTimeout(inject,80);
    setTimeout(inject,250);
    setTimeout(inject,700);
  };

  d.addEventListener("click",event => {
    const move = event.target.closest("[data-kwfw-gallery-move]");
    if(move){
      const modal = move.closest(".kwfw-modal");
      const gallery = move.closest(".kwfw-gallery");
      if(modal && gallery && slides(gallery).length){
        event.preventDefault();
        event.stopImmediatePropagation();
        setGallery(modal,(modal._galleryIndex || 0) + Number(move.dataset.kwfwGalleryMove));
        return;
      }
    }

    const dot = event.target.closest(".kwfw-dot");
    if(dot?.closest(".kwfw-gallery")){
      const modal = dot.closest(".kwfw-modal");
      if(modal){
        event.preventDefault();
        event.stopImmediatePropagation();
        setGallery(modal,Number(dot.dataset.kwfwGalleryDot) || 0);
        return;
      }
    }

    if(event.target.closest("[data-kwfw-open]")) scan();
  },true);

  d.addEventListener("touchstart",event => {
    const gallery = event.target.closest(".kwfw-gallery");
    if(!gallery) return;
    gallery._kwsx = event.touches[0].clientX;
    gallery._kwsy = event.touches[0].clientY;
  },{ capture:true, passive:true });

  d.addEventListener("touchend",event => {
    const gallery = event.target.closest(".kwfw-gallery");
    if(!gallery || gallery._kwsx == null) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - gallery._kwsx;
    const dy = touch.clientY - gallery._kwsy;
    if(Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.2){
      event.stopImmediatePropagation();
      const modal = gallery.closest(".kwfw-modal");
      setGallery(modal,(modal._galleryIndex || 0) + (dx < 0 ? 1 : -1));
    }
    gallery._kwsx = null;
    gallery._kwsy = null;
  },{ capture:true, passive:true });

  new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(node => {
      if(node.nodeType === 1) inject(node);
    }));
  }).observe(d.documentElement,{ childList:true, subtree:true });

  w.KWFWInjectUniversalMedia = scan;
  w.KWFWRefreshUniversalMedia = () => {
    cache = null;
    loading = null;
    scan();
  };

  d.readyState === "loading" ? d.addEventListener("DOMContentLoaded",scan) : scan();
})();
