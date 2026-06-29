(() => {
  const d = document;
  const desktop = () => matchMedia("(min-width:1025px)").matches;
  const tablet = () => matchMedia("(min-width:761px) and (max-width:1024px)").matches;
  const dims = () => desktop() ? { columns:3, width:984 } : tablet() ? { columns:2, width:652 } : null;
  const holders = () => Array.from(d.querySelectorAll(".kwfw-carousel,[data-kwfw-collection]"));
  const px = value => `${value}px`;
  const clamp = (value,min,max) => Math.min(max,Math.max(min,value));
  const set = (el,styles) => Object.assign(el.style,styles);
  const sync = holder => {
    const root = holder.querySelector(".kwfw-root");
    const wrap = holder.querySelector(".kwfw-rail-wrap");
    const rail = holder.querySelector(".kwfw-rail");
    const cards = Array.from(holder.querySelectorAll(".kwfw-card"));
    const mode = dims();
    if(!root || !wrap || !rail || !cards.length) return;
    if(!mode){
      [root,wrap,rail,...cards].forEach(el => el.removeAttribute("style"));
      root.classList.remove("kwfw-scroll-has-more","kwfw-scroll-at-top","kwfw-scroll-at-bottom");
      return;
    }
    const gap = 12;
    const cardWidth = (mode.width - gap * (mode.columns - 1)) / mode.columns;
    const cardHeight = 426;
    const viewportHeight = cardHeight * 2 + gap + 22;
    set(root,{width:px(mode.width),maxWidth:"none",marginLeft:"auto",marginRight:"auto"});
    set(wrap,{position:"relative",width:px(mode.width),maxWidth:"none",margin:"0 auto",overflow:"hidden"});
    set(rail,{display:"flex",flexWrap:"wrap",gap:px(gap),justifyContent:"center",alignContent:"flex-start",alignItems:"flex-start",overflowY:"auto",overflowX:"hidden",scrollSnapType:"y proximity",overscrollBehavior:"auto",padding:"4px 0 18px",width:px(mode.width),maxWidth:"none",maxHeight:px(viewportHeight),margin:"0 auto",scrollbarWidth:"none"});
    cards.forEach(card => {
      set(card,{flex:`0 0 ${cardWidth}px`,width:px(cardWidth),height:px(cardHeight),minWidth:"0",maxWidth:px(cardWidth),minHeight:px(cardHeight),scrollSnapAlign:"start",boxShadow:"none"});
      const media = card.querySelector(".kwfw-card-media");
      if(media) set(media,{height:"100%",minHeight:px(cardHeight)});
    });
    const max = Math.max(0,rail.scrollHeight - rail.clientHeight);
    root.classList.toggle("kwfw-scroll-has-more",max > 2);
    root.classList.toggle("kwfw-scroll-at-top",rail.scrollTop <= 2);
    root.classList.toggle("kwfw-scroll-at-bottom",rail.scrollTop >= max - 2);
  };
  const syncAll = () => holders().forEach(sync);
  const routeWheel = e => {
    const wrap = e.target.closest?.(".kwfw-rail-wrap");
    if(!wrap || !dims()) return;
    const holder = wrap.closest(".kwfw-carousel,[data-kwfw-collection]");
    const rail = wrap.querySelector(".kwfw-rail");
    if(!holder || !rail) return;
    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if(!delta) return;
    const max = Math.max(0,rail.scrollHeight - rail.clientHeight);
    if(max <= 2) return;
    const current = rail.scrollTop;
    const target = current + delta;
    const next = clamp(target,0,max);
    const overflow = target - next;
    e.preventDefault();
    rail.scrollTop = next;
    sync(holder);
    if(Math.abs(overflow) > .5) window.scrollBy({top:overflow,left:0,behavior:"auto"});
  };
  d.addEventListener("wheel",routeWheel,{passive:false});
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
