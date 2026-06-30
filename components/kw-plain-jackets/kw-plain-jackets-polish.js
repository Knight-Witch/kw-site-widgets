(() => {
  const tabs = group => Array.from(group.querySelectorAll(".kwpj-tab"));
  const activeIndex = group => Math.max(0,tabs(group).findIndex(tab => tab.classList.contains("is-active")));
  const ensureSlider = group => {
    let slider = group.querySelector(".kwpj-slider");
    if(!slider){
      slider = document.createElement("span");
      slider.className = "kwpj-slider";
      slider.setAttribute("aria-hidden","true");
      group.prepend(slider);
    }
    return slider;
  };
  const updateGroup = group => {
    const items = tabs(group);
    if(!items.length) return;
    ensureSlider(group);
    group.style.setProperty("--kwpj-slider-count",String(items.length));
    group.style.setProperty("--kwpj-slider-index",String(activeIndex(group)));
  };
  const updateAll = root => (root || document).querySelectorAll(".kwpj-tabs").forEach(updateGroup);
  const setActive = tab => {
    const group = tab.closest(".kwpj-tabs");
    if(!group) return;
    tabs(group).forEach(item => item.classList.toggle("is-active",item === tab));
    updateGroup(group);
  };
  const delayedClick = tab => {
    if(tab.dataset.kwpjAllowBaseClick === "true") return true;
    tab.dataset.kwpjAllowBaseClick = "pending";
    setActive(tab);
    setTimeout(() => {
      tab.dataset.kwpjAllowBaseClick = "true";
      tab.click();
      requestAnimationFrame(() => {
        delete tab.dataset.kwpjAllowBaseClick;
      });
    },300);
    return false;
  };
  const boot = () => updateAll(document);
  document.addEventListener("click",e => {
    const tab = e.target.closest(".kwpj-tab");
    if(!tab) return;
    if(delayedClick(tab)){
      setActive(tab);
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  },true);
  new MutationObserver(mutations => {
    for(const mutation of mutations){
      mutation.addedNodes.forEach(node => {
        if(node.nodeType !== 1) return;
        if(node.matches?.(".kwpj-tabs")) updateGroup(node);
        updateAll(node);
      });
    }
  }).observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener("resize",() => requestAnimationFrame(() => updateAll(document)),{passive:true});
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded",boot) : boot();
})();
