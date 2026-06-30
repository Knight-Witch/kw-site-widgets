(() => {
  const d = document;
  const mq = matchMedia("(max-width: 760px)");
  const zonePad = 20;
  const edge = 2;
  const holders = () => Array.from(d.querySelectorAll(".kwfw-carousel,[data-kwfw-collection]"));
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const zoneFor = holder => {
    const root = holder.querySelector(".kwfw-root");
    const rail = holder.querySelector(".kwfw-rail");
    const cards = Array.from(holder.querySelectorAll(".kwfw-card"));
    if (!root || !rail || !cards.length) return null;

    const railRect = rail.getBoundingClientRect();
    const cardRects = cards.map(card => card.getBoundingClientRect()).filter(rect => rect.width && rect.height);
    if (!cardRects.length) return null;

    const minLeft = Math.min(...cardRects.map(rect => rect.left));
    const maxRight = Math.max(...cardRects.map(rect => rect.right));
    const left = clamp(minLeft - zonePad, 0, window.innerWidth);
    const right = clamp(maxRight + zonePad, 0, window.innerWidth);

    return {
      holder,
      root,
      rail,
      left,
      right,
      top: railRect.top,
      bottom: railRect.bottom
    };
  };

  const zoneAt = (x, y) => holders().map(zoneFor).filter(Boolean).find(zone => x >= zone.left && x <= zone.right && y >= zone.top && y <= zone.bottom);

  const sync = holder => {
    const root = holder.querySelector(".kwfw-root");
    const rail = holder.querySelector(".kwfw-rail");
    if (!root || !rail) return;

    const max = Math.max(0, rail.scrollHeight - rail.clientHeight);
    root.classList.toggle("kwfw-scroll-has-more", max > edge);
    root.classList.toggle("kwfw-scroll-at-top", rail.scrollTop <= edge);
    root.classList.toggle("kwfw-scroll-at-bottom", rail.scrollTop >= max - edge);
  };

  const syncAll = () => holders().forEach(sync);

  const canScroll = (rail, delta) => {
    const max = Math.max(0, rail.scrollHeight - rail.clientHeight);
    if (max <= edge) return false;
    if (delta < 0 && rail.scrollTop <= edge) return false;
    if (delta > 0 && rail.scrollTop >= max - edge) return false;
    return true;
  };

  d.addEventListener("scroll", event => {
    const rail = event.target?.closest?.(".kwfw-rail");
    if (rail) sync(rail.closest(".kwfw-carousel,[data-kwfw-collection]") || d);
  }, true);

  d.addEventListener("wheel", event => {
    if (mq.matches) return;

    const zone = zoneAt(event.clientX, event.clientY);
    if (!zone) return;

    const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    if (!delta || !canScroll(zone.rail, delta)) return;

    event.preventDefault();
    zone.rail.scrollTop = clamp(zone.rail.scrollTop + delta, 0, Math.max(0, zone.rail.scrollHeight - zone.rail.clientHeight));
    sync(zone.holder);
  }, { passive: false });

  new MutationObserver(() => requestAnimationFrame(syncAll)).observe(d.documentElement, {
    childList: true,
    subtree: true
  });

  addEventListener("resize", () => requestAnimationFrame(syncAll), { passive: true });

  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", syncAll);
  else syncAll();

  setTimeout(syncAll, 250);
  setTimeout(syncAll, 1000);
})();
