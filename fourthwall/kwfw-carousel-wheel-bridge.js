(() => {
  const d = document;
  const mq = matchMedia("(max-width: 760px)");
  const zonePad = 20;
  const edge = 2;
  const styleKey = "kwfw-carousel-scroll-controller-style";
  const controller = new AbortController();
  const previous = window.KWFWCarouselScrollController;
  if (previous && typeof previous.destroy === "function") previous.destroy();

  window.KWFWCarouselScrollController = {
    destroy: () => controller.abort()
  };

  const css = `
@media (min-width: 761px) {
  html body .kwfw-root {
    width: min(984px, calc(100vw - 32px)) !important;
    max-width: none !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  html body .kwfw-root .kwfw-rail-wrap {
    position: relative !important;
    width: min(984px, calc(100vw - 32px)) !important;
    max-width: none !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  html body .kwfw-root .kwfw-rail {
    display: var(--kwfw-carousel-layout, flex) !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    align-content: flex-start !important;
    align-items: flex-start !important;
    gap: 12px !important;
    width: min(984px, calc(100vw - 32px)) !important;
    max-width: none !important;
    max-height: 886px !important;
    margin: 0 auto !important;
    padding: 4px 0 18px !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    overscroll-behavior: auto !important;
    scroll-snap-type: none !important;
    scrollbar-width: none !important;
  }

  html body .kwfw-root .kwfw-rail::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }

  html body .kwfw-root .kwfw-card {
    flex: 0 0 320px !important;
    width: 320px !important;
    height: 426px !important;
    min-width: 0 !important;
    max-width: 320px !important;
    min-height: 426px !important;
    scroll-snap-align: none !important;
    justify-self: auto !important;
  }

  html body .kwfw-root .kwfw-arrow {
    display: none !important;
  }
}
`;

  const injectStyle = () => {
    d.querySelectorAll(`[data-kw-loader-resource="${styleKey}"], [data-kwfw-carousel-scroll-controller]`).forEach(element => element.remove());
    const style = d.createElement("style");
    style.dataset.kwLoaderResource = styleKey;
    style.dataset.kwfwCarouselScrollController = "";
    style.textContent = css;
    d.head.appendChild(style);
  };

  const holders = () => Array.from(d.querySelectorAll(".kwfw-carousel,[data-kwfw-collection]")).filter(holder => holder.querySelector(".kwfw-rail"));
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const sync = holder => {
    const root = holder.querySelector(".kwfw-root");
    const rail = holder.querySelector(".kwfw-rail");
    if (!root || !rail) return;
    const max = Math.max(0, rail.scrollHeight - rail.clientHeight);
    root.classList.toggle("kwfw-scroll-has-more", max > edge);
    root.classList.toggle("kwfw-scroll-at-top", rail.scrollTop <= edge);
    root.classList.toggle("kwfw-scroll-at-bottom", rail.scrollTop >= max - edge);
  };

  const syncAll = () => holders().forEach(sync);

  const zoneFor = holder => {
    const rail = holder.querySelector(".kwfw-rail");
    const cards = Array.from(holder.querySelectorAll(".kwfw-card"));
    if (!rail || !cards.length) return null;
    const railRect = rail.getBoundingClientRect();
    const visibleCards = cards.map(card => card.getBoundingClientRect()).filter(rect => rect.width && rect.height && rect.bottom > railRect.top && rect.top < railRect.bottom);
    if (!visibleCards.length) return null;
    const left = clamp(Math.min(...visibleCards.map(rect => rect.left)) - zonePad, 0, window.innerWidth);
    const right = clamp(Math.max(...visibleCards.map(rect => rect.right)) + zonePad, 0, window.innerWidth);
    return {
      holder,
      rail,
      left,
      right,
      top: railRect.top,
      bottom: railRect.bottom
    };
  };

  const zoneAt = (x, y) => holders().map(zoneFor).filter(Boolean).find(zone => x >= zone.left && x <= zone.right && y >= zone.top && y <= zone.bottom);

  const scrollLimit = rail => Math.max(0, rail.scrollHeight - rail.clientHeight);

  const canScroll = (rail, delta) => {
    const max = scrollLimit(rail);
    if (max <= edge) return false;
    if (delta < 0 && rail.scrollTop <= edge) return false;
    if (delta > 0 && rail.scrollTop >= max - edge) return false;
    return true;
  };

  const onWheel = event => {
    if (mq.matches) return;
    const zone = zoneAt(event.clientX, event.clientY);
    if (!zone) return;
    const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    if (!delta || !canScroll(zone.rail, delta)) return;
    event.preventDefault();
    zone.rail.scrollTop = clamp(zone.rail.scrollTop + delta, 0, scrollLimit(zone.rail));
    sync(zone.holder);
  };

  injectStyle();
  d.addEventListener("wheel", onWheel, { passive: false, signal: controller.signal });
  d.addEventListener("scroll", event => {
    const rail = event.target?.closest?.(".kwfw-rail");
    if (rail) sync(rail.closest(".kwfw-carousel,[data-kwfw-collection]"));
  }, { capture: true, passive: true, signal: controller.signal });

  new MutationObserver(() => {
    injectStyle();
    requestAnimationFrame(syncAll);
  }).observe(d.documentElement, { childList: true, subtree: true });

  addEventListener("resize", () => requestAnimationFrame(syncAll), { passive: true, signal: controller.signal });
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", syncAll, { once: true, signal: controller.signal });
  else syncAll();
  setTimeout(syncAll, 250);
  setTimeout(syncAll, 1000);
})();
