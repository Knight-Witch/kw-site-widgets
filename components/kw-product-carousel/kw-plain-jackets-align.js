(() => {
  const roots = () => Array.from(document.querySelectorAll(".kw-product-carousel.kw-plain-jacket-carousel"));
  const groups = root => Array.from(root.querySelectorAll(".kwfw-filter-group"));
  const tabs = group => Array.from(group.querySelectorAll(".kwfw-filter-tab"));
  const selectedIndex = group => {
    const items = tabs(group);
    const active = group.querySelector('.kwfw-filter-tab[aria-selected="true"]');
    const index = items.indexOf(active);
    return Math.max(0, index);
  };
  const slider = group => {
    let el = group.querySelector(".kwpj-filter-slider");
    if(!el){
      el = document.createElement("span");
      el.className = "kwpj-filter-slider";
      el.setAttribute("aria-hidden", "true");
      group.prepend(el);
    }
    return el;
  };
  const update = group => {
    const items = tabs(group);
    if(!items.length) return;
    const el = slider(group);
    const width = group.clientWidth / items.length;
    el.style.width = `${width}px`;
    el.style.transform = `translateX(${selectedIndex(group) * width}px)`;
  };
  const updateAll = () => roots().forEach(root => groups(root).forEach(update));
  const bind = root => {
    if(root.dataset.kwpjAlignReady) return;
    root.dataset.kwpjAlignReady = "true";
    root.addEventListener("click", e => {
      if(!e.target.closest(".kwfw-filter-tab")) return;
      requestAnimationFrame(updateAll);
      setTimeout(updateAll, 260);
    });
    new MutationObserver(updateAll).observe(root, { childList:true, subtree:true, attributes:true, attributeFilter:["aria-selected", "class", "style"] });
  };
  const boot = () => {
    roots().forEach(bind);
    updateAll();
  };
  const start = () => {
    boot();
    new MutationObserver(boot).observe(document.body, { childList:true, subtree:true });
    window.addEventListener("resize", () => requestAnimationFrame(updateAll), { passive:true });
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(updateAll).catch(() => {});
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", start) : start();
})();
