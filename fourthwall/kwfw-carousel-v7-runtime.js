(() => {
  const d = document;
  const mobile = () => matchMedia("(max-width:760px)").matches;
  const holders = () => Array.from(d.querySelectorAll(".kwfw-carousel,[data-kwfw-collection]"));
  const clamp = (value,min,max) => Math.min(max,Math.max(min,value));
  const px = value => `${Math.round(value * 1000) / 1000}px`;
  const set = (el,prop,value) => el.style.setProperty(prop,value,"important");
  const remove = (el,props) => props.forEach(prop => el.style.removeProperty(prop));
  const clear = holder => {
    const root = holder.querySelector(".kwfw-root");
    const wrap = holder.querySelector(".kwfw-rail-wrap");
    const rail = holder.querySelector(".kwfw-rail");
    const cards = Array.from(holder.querySelectorAll(".kwfw-card"));
    if(root){
      remove(root,["width","max-width","margin-left","margin-right","box-sizing","padding-left","padding-right"]);
      root.classList.remove("kwfw-scroll-has-more","kwfw-scroll-at-top","kwfw-scroll-at-bottom");
    }
    if(wrap) remove(wrap,["position","width","max-width","margin","overflow","box-sizing"]);
    if(rail) remove(rail,["display","flex-wrap","gap","justify-content","align-content","align-items","overflow-y","overflow-x","scroll-snap-type","overscroll-behavior","padding","width","max-width","max-height","margin","scrollbar-width","box-sizing"]);
    cards.forEach(card => {
      remove(card,["flex","width","height","min-width","max-width","min-height","scroll-snap-align","box-shadow","box-sizing"]);
      const media = card.querySelector(".kwfw-card-media");
      if(media) remove(media,["height","min-height"]);
    });
  };
  const sync = holder => {
    const root = holder.querySelector(".kwfw-root");
    const wrap = holder.querySelector(".kwfw-rail-wrap");
    const rail = holder.querySelector(".kwfw-rail");
    const cards = Array.from(holder.querySelectorAll(".kwfw-card"));
    if(!root || !wrap || !rail || !cards.length) return;
    if(mobile()){
      clear(holder);
      return;
    }
    const gap = 12;
    const columns = 3;
    const cardHeight = 426;
    const viewportWidth = d.documentElement.clientWidth || innerWidth || 984;
    const railWidth = clamp(viewportWidth - 32,720,984);
    const cardWidth = (railWidth - gap * (columns - 1)) / columns;
    const viewportHeight = cardHeight * 2 + gap + 22;
    set(root,"width",px(railWidth));
    set(root,"max-width","none");
    set(root,"margin-left","auto");
    set(root,"margin-right","auto");
    set(root,"box-sizing","border-box");
    set(root,"padding-left","0");
    set(root,"padding-right","0");
    set(wrap,"position","relative");
    set(wrap,"width",px(railWidth));
    set(wrap,"max-width","none");
    set(wrap,"margin","0 auto");
    set(wrap,"overflow","hidden");
    set(wrap,"box-sizing","border-box");
    set(rail,"display","flex");
    set(rail,"flex-wrap","wrap");
    set(rail,"gap",px(gap));
    set(rail,"justify-content","center");
    set(rail,"align-content","flex-start");
    set(rail,"align-items","flex-start");
    set(rail,"overflow-y","auto");
    set(rail,"overflow-x","hidden");
    set(rail,"scroll-snap-type","y proximity");
    set(rail,"overscroll-behavior","auto");
    set(rail,"padding","4px 0 18px");
    set(rail,"width",px(railWidth));
    set(rail,"max-width","none");
    set(rail,"max-height",px(viewportHeight));
    set(rail,"margin","0 auto");
    set(rail,"scrollbar-width","none");
    set(rail,"box-sizing","border-box");
    cards.forEach(card => {
      set(card,"flex",`0 0 ${px(cardWidth)}`);
      set(card,"width",px(cardWidth));
      set(card,"height",px(cardHeight));
      set(card,"min-width","0");
      set(card,"max-width",px(cardWidth));
      set(card,"min-height",px(cardHeight));
      set(card,"scroll-snap-align","start");
      set(card,"box-shadow","none");
      set(card,"box-sizing","border-box");
      const media = card.querySelector(".kwfw-card-media");
      if(media){
        set(media,"height","100%");
        set(media,"min-height",px(cardHeight));
      }
    });
    const max = Math.max(0,rail.scrollHeight - rail.clientHeight);
    root.classList.toggle("kwfw-scroll-has-more",max > 2);
    root.classList.toggle("kwfw-scroll-at-top",rail.scrollTop <= 2);
    root.classList.toggle("kwfw-scroll-at-bottom",rail.scrollTop >= max - 2);
  };
  const syncAll = () => holders().forEach(sync);
  const zone = holder => {
    const wrap = holder.querySelector(".kwfw-rail-wrap");
    const cards = Array.from(holder.querySelectorAll(".kwfw-card"));
    if(!wrap || !cards.length) return null;
    const wrapRect = wrap.getBoundingClientRect();
    const rects = cards.map(card => card.getBoundingClientRect()).filter(rect => rect.width && rect.height);
    if(!rects.length) return null;
    return {
      holder,
      rail:holder.querySelector(".kwfw-rail"),
      left:Math.max(wrapRect.left,Math.min(...rects.map(rect => rect.left)) - 20),
      right:Math.min(wrapRect.right,Math.max(...rects.map(rect => rect.right)) + 20),
      top:wrapRect.top,
      bottom:wrapRect.bottom
    };
  };
  const zoneAt = (x,y) => holders().map(zone).filter(Boolean).find(item => x >= item.left && x <= item.right && y >= item.top && y <= item.bottom);
  const routeWheel = e => {
    if(mobile()) return;
    const item = zoneAt(e.clientX,e.clientY);
    if(!item || !item.rail) return;
    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if(!delta) return;
    const rail = item.rail;
    const max = Math.max(0,rail.scrollHeight - rail.clientHeight);
    if(max <= 2) return;
    const current = rail.scrollTop;
    const atTop = current <= 2;
    const atBottom = current >= max - 2;
    if((delta < 0 && atTop) || (delta > 0 && atBottom)){
      e.preventDefault();
      scrollBy({top:delta,left:0,behavior:"auto"});
      return;
    }
    e.preventDefault();
    rail.scrollTop = clamp(current + delta,0,max);
    sync(item.holder);
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
