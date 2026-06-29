(() => {
  const d = document;
  const isMobile = () => matchMedia("(max-width:760px)").matches;
  const holders = () => Array.from(d.querySelectorAll(".kwfw-carousel,[data-kwfw-collection]"));
  const holderAtY = y => holders().find(holder => {
    const rect = holder.getBoundingClientRect();
    return y >= rect.top && y <= rect.bottom;
  });
  const getHolder = e => e.target.closest(".kwfw-carousel,[data-kwfw-collection]") || holderAtY(e.clientY);
  const canScroll = (rail, delta) => {
    const max = rail.scrollHeight - rail.clientHeight;
    if (max <= 1 || !delta) return false;
    if (delta > 0) return rail.scrollTop < max - 1;
    return rail.scrollTop > 1;
  };
  d.addEventListener("wheel", e => {
    if (isMobile()) return;
    const holder = getHolder(e);
    if (!holder) return;
    const rail = holder.querySelector(".kwfw-rail");
    if (!rail) return;
    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (!canScroll(rail, delta)) return;
    e.preventDefault();
    rail.scrollTop += delta;
  }, { passive: false });
})();
