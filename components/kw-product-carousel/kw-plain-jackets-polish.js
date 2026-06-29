(() => {
  const roots = () => Array.from(document.querySelectorAll(".kw-product-carousel.kw-plain-jacket-carousel"));
  const groups = root => Array.from(root.querySelectorAll(".kwfw-filter-group"));
  const selected = group => group.querySelector('.kwfw-filter-tab[aria-selected="true"]') || group.querySelector(".kwfw-filter-tab");
  const ensure = group => {
    let slider = group.querySelector(".kwpj-filter-slider");
    if(!slider){
      slider = document.createElement("span");
      slider.className = "kwpj-filter-slider";
      slider.setAttribute("aria-hidden", "true");
      group.prepend(slider);
    }
    return slider;
  };
  const update = group => {
    const tab = selected(group);
    if(!tab) return;
    const slider = ensure(group);
    const groupBox = group.getBoundingClientRect();
    const tabBox = tab.getBoundingClientRect();
    slider.style.width = `${tabBox.width}px`;
    slider.style.height = `${tabBox.height}px`;
    slider.style.transform = `translate(${tabBox.left - groupBox.left}px, ${tabBox.top - groupBox.top}px)`;
  };
  const updateAll = () => roots().forEach(root => groups(root).forEach(update));
  const bind = root => {
    if(root.dataset.kwpjPolishReady) return;
    root.dataset.kwpjPolishReady = "true";
    root.addEventListener("click", e => {
      const tab = e.target.closest(".kwfw-filter-tab");
      if(!tab) return;
      requestAnimationFrame(updateAll);
      setTimeout(updateAll, 260);
    });
    new MutationObserver(updateAll).observe(root, { childList:true, subtree:true, attributes:true, attributeFilter:["aria-selected"] });
  };
  const boot = () => {
    roots().forEach(bind);
    updateAll();
  };
  const start = () => {
    boot();
    new MutationObserver(boot).observe(document.body, { childList:true, subtree:true });
    window.addEventListener("resize", () => requestAnimationFrame(updateAll), { passive:true });
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", start) : start();
})();
