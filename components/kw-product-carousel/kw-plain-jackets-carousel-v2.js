(() => {
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => Array.from(r.querySelectorAll(s));
  const names = ["plain-jackets", "plain-jacket-selector", "jacket-step-2", "jacket-builder"];
  const target = root => root && (root.classList.contains("kw-plain-jacket-carousel") || names.includes(root.dataset.kwCarousel));
  const update = rail => {
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
    if(!target(root)) return;
    root.dataset.kwResolvedLayout = "single-row-scroll";
    const rail = q(".kwfw-rail", root);
    if(!rail || rail.dataset.kwPlainJacketsV2) return;
    rail.dataset.kwPlainJacketsV2 = "true";
    rail.addEventListener("scroll", () => update(rail), { passive:true });
    requestAnimationFrame(() => update(rail));
  };
  const bindAll = () => qa(".kw-product-carousel").forEach(bind);
  const watch = () => {
    bindAll();
    new MutationObserver(bindAll).observe(document.body, { childList:true, subtree:true });
    window.addEventListener("resize", () => requestAnimationFrame(() => qa(".kw-product-carousel .kwfw-rail").forEach(update)), { passive:true });
  };
  document.addEventListener("wheel", e => {
    const rail = e.target.closest(".kwfw-rail");
    const root = rail?.closest(".kw-product-carousel");
    if(!rail || !target(root) || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    rail.scrollBy({ left:e.deltaY, behavior:"smooth" });
  }, { passive:false });
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", watch) : watch();
})();
