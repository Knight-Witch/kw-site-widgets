(() => {
  const d = document;
  const mq = matchMedia("(max-width:760px)");
  const holders = () => Array.from(d.querySelectorAll(".kwfw-carousel,[data-kwfw-collection]"));
  const clamp = (value,min,max) => Math.min(max,Math.max(min,value));
  const zoneFor = holder => {
    const root = holder.querySelector(".kwfw-root");
    const rail = holder.querySelector(".kwfw-rail");
    const cards = Array.from(holder.querySelectorAll(".kwfw-card"));
    if(!root || !rail || !cards.length) return null;
    const rootRect = root.getBoundingClientRect();
    const railRect = rail.getBoundingClientRect();
    const cardRects = cards.map(card => card.getBoundingClientRect()).filter(rect => rect.width && rect.height);
    if(!cardRects.length) return null;
    const left = Math.min(...cardRects.map(rect => rect.left)) - 84;
    const right = Math.max(...cardRects.map(rect => rect.right)) + 84;
    return {
      holder,
      root,
      rail,
      left:clamp(left,railRect.left,railRect.right),
      right:clamp(right,railRect.left,railRect.right),
      top:rootRect.top,
      bottom:rootRect.bottom
    };
  };
  const zoneAt = (x,y) => holders().map(zoneFor).filter(Boolean).find(zone => x >= zone.left && x <= zone.right && y >= zone.top && y <= zone.bottom);
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
  d.addEventListener("scroll", e => {
    const rail = e.target?.closest?.(".kwfw-rail");
    if(rail) sync(rail.closest(".kwfw-carousel,[data-kwfw-collection]") || d);
  },true);
  d.addEventListener("wheel", e => {
    if(mq.matches) return;
    const zone = zoneAt(e.clientX,e.clientY);
    if(!zone) return;
    const rail = zone.rail;
    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if(!delta) return;
    const max = Math.max(0,rail.scrollHeight - rail.clientHeight);
    const next = clamp(rail.scrollTop + delta,0,max);
    if(Math.abs(next - rail.scrollTop) < .5) return;
    e.preventDefault();
    rail.scrollTop = next;
    sync(zone.holder);
  },{passive:false});
  new MutationObserver(() => requestAnimationFrame(syncAll)).observe(d.documentElement,{childList:true,subtree:true});
  addEventListener("resize",() => requestAnimationFrame(syncAll),{passive:true});
  d.readyState === "loading" ? d.addEventListener("DOMContentLoaded",syncAll) : syncAll();
})();
