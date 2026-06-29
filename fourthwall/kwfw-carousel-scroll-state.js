(() => {
  const d = document;
  const isMobile = () => matchMedia("(max-width:760px)").matches;
  const clamp = (value,min,max) => Math.min(max,Math.max(min,value));
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
  const routeWheel = e => {
    if(isMobile()) return;
    const wrap = e.target.closest?.(".kwfw-rail-wrap");
    if(!wrap) return;
    const holder = wrap.closest(".kwfw-carousel,[data-kwfw-collection]");
    const rail = wrap.querySelector(".kwfw-rail");
    if(!holder || !rail) return;
    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if(!delta) return;
    const max = Math.max(0,rail.scrollHeight - rail.clientHeight);
    if(max <= 2) return;
    const next = clamp(rail.scrollTop + delta,0,max);
    e.preventDefault();
    if(Math.abs(next - rail.scrollTop) > .5){
      rail.scrollTop = next;
      sync(holder);
      return;
    }
    window.scrollBy({top:delta,left:0,behavior:"auto"});
  };
  d.addEventListener("wheel",routeWheel,{passive:false});
  d.addEventListener("scroll",e => {
    const rail = e.target?.closest?.(".kwfw-rail");
    if(rail) sync(rail.closest(".kwfw-carousel,[data-kwfw-collection]") || d);
  },true);
  new MutationObserver(() => requestAnimationFrame(syncAll)).observe(d.documentElement,{childList:true,subtree:true});
  addEventListener("resize",() => requestAnimationFrame(syncAll),{passive:true});
  d.readyState === "loading" ? d.addEventListener("DOMContentLoaded",syncAll) : syncAll();
})();
