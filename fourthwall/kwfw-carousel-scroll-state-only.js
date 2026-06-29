(() => {
  const d = document;
  const holders = () => Array.from(d.querySelectorAll(".kwfw-carousel,[data-kwfw-collection]"));
  const sync = holder => {
    const root = holder.querySelector(".kwfw-root");
    const rail = holder.querySelector(".kwfw-rail");
    if(!root || !rail) return;
    const max = Math.max(0,rail.scrollHeight - rail.clientHeight);
    root.classList.toggle("kwfw-scroll-has-more",max > 2);
    root.classList.toggle("kwfw-scroll-at-top",rail.scrollTop <= 2);
    root.classList.toggle("kwfw-scroll-at-bottom",rail.scrollTop >= max - 2);
  };
  const syncAll = () => holders().forEach(sync);
  d.addEventListener("scroll",e => {
    const rail = e.target?.closest?.(".kwfw-rail");
    if(!rail) return;
    const holder = rail.closest(".kwfw-carousel,[data-kwfw-collection]");
    if(holder) sync(holder);
  },true);
  new MutationObserver(() => requestAnimationFrame(syncAll)).observe(d.documentElement,{childList:true,subtree:true});
  addEventListener("resize",() => requestAnimationFrame(syncAll),{passive:true});
  d.readyState === "loading" ? d.addEventListener("DOMContentLoaded",syncAll) : syncAll();
})();
