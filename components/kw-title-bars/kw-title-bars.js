(() => {
  const barSelector = ".kw-title-bar";
  const fitAttribute = "data-kw-fit";
  const mobileQuery = "(max-width:768px)";
  const minimumFitWidth = 160;

  let frame = 0;
  let resizeObserver = null;
  const observed = new WeakSet();

  const getBars = () => [...document.querySelectorAll(barSelector)];

  function isMobile(){
    return window.matchMedia?.(mobileQuery).matches === true;
  }

  function getFitElements(selector){
    if(!selector) return [];

    try{
      return [...document.querySelectorAll(selector)];
    }catch{
      return [];
    }
  }

  function measureSpan(elements){
    if(!elements.length) return null;

    let left = Infinity;
    let right = -Infinity;

    for(const element of elements){
      const rect = element.getBoundingClientRect();
      if(rect.width <= 0 || rect.height <= 0) continue;

      left = Math.min(left, rect.left);
      right = Math.max(right, rect.right);
    }

    return Number.isFinite(left) && Number.isFinite(right)
      ? Math.round(right - left)
      : null;
  }

  function observe(element){
    if(!resizeObserver || observed.has(element)) return;

    resizeObserver.observe(element);
    observed.add(element);
  }

  function sizeBars(){
    frame = 0;

    for(const bar of getBars()){
      const fitSelector = bar.getAttribute(fitAttribute);
      const fitElements = getFitElements(fitSelector);

      if(fitSelector){
        if(isMobile()){
          bar.style.removeProperty("width");
        }else{
          const width = measureSpan(fitElements);

          if(width !== null && width >= minimumFitWidth){
            bar.style.width = `${width}px`;
          }else{
            bar.style.removeProperty("width");
          }
        }
      }

      observe(bar);

      for(const element of fitElements){
        observe(element);
      }
    }
  }

  function queueSizeBars(){
    if(frame) return;
    frame = requestAnimationFrame(sizeBars);
  }

  function initResizeObserver(){
    if(!("ResizeObserver" in window)) return;
    resizeObserver = new ResizeObserver(queueSizeBars);
  }

  function initMutationObserver(){
    if(!("MutationObserver" in window) || !document.body) return;

    new MutationObserver(queueSizeBars).observe(document.body, {
      childList:true,
      subtree:true,
      attributes:true,
      attributeFilter:["class", "style", fitAttribute]
    });
  }

  function init(){
    initResizeObserver();
    initMutationObserver();
    queueSizeBars();

    window.addEventListener("resize", queueSizeBars, { passive:true });

    if(document.fonts?.ready){
      document.fonts.ready.then(queueSizeBars);
    }
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init, { once:true });
  }else{
    init();
  }
})();
