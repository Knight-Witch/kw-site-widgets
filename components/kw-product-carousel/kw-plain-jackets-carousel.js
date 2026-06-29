(() => {
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => Array.from(r.querySelectorAll(s));
  const isPlain = root => root && ["plain-jackets", "plain-jacket-selector", "jacket-step-2"].includes(root.dataset.kwCarousel);
  const state = rail => {
    if(!rail) return;
    const wrap = rail.closest(".kwfw-rail-wrap");
    if(!wrap) return;
    const max = rail.scrollWidth - rail.clientWidth;
    const left = rail.scrollLeft;
    wrap.classList.toggle("is-scrollable", max > 2);
    wrap.classList.toggle("can-scroll-left", max > 2 && left > 2);
    wrap.classList.toggle("can-scroll-right", max > 2 && left < max - 2);
  };
  const bind = root => {
    if(!isPlain(root)) return;
    const rail = q(".kwfw-rail", root);
    if(!rail || rail.dataset.kwPlainJacketsReady) return;
    rail.dataset.kwPlainJacketsReady = "true";
    rail.addEventListener("scroll", () => state(rail), { passive:true });
    requestAnimationFrame(() => state(rail));
  };
  const bindAll = () => qa(".kw-product-carousel").forEach(bind);
  const watch = () => {
    bindAll();
    new MutationObserver(bindAll).observe(document.body, { childList:true, subtree:true });
    window.addEventListener("resize", () => requestAnimationFrame(() => qa(".kw-product-carousel .kwfw-rail").forEach(state)), { passive:true });
  };
  document.addEventListener("wheel", e => {
    const rail = e.target.closest(".kwfw-rail");
    const root = rail?.closest(".kw-product-carousel");
    if(!rail || !isPlain(root) || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    rail.scrollBy({ left:e.deltaY, behavior:"smooth" });
  }, { passive:false });
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", watch) : watch();
})();
