(() => {
  const spacing = "35px";
  const zeroTop = element => {
    if (!element || !element.style) return;
    element.style.setProperty("margin-top", "0", "important");
    element.style.setProperty("padding-top", "0", "important");
  };
  const zeroBottom = element => {
    if (!element || !element.style) return;
    element.style.setProperty("margin-bottom", "0", "important");
    element.style.setProperty("padding-bottom", "0", "important");
  };
  const apply = () => {
    document.querySelectorAll(".kw-info-root").forEach(root => {
      root.style.setProperty("--kw-info-top-desktop", spacing);
      root.style.setProperty("--kw-info-top-mobile", spacing);
      root.style.setProperty("--kw-info-bottom-desktop", "0px");
      root.style.setProperty("--kw-info-bottom-mobile", "0px");
      root.style.setProperty("margin-top", "0", "important");
      root.style.setProperty("padding-top", spacing, "important");
      zeroBottom(root);
      const list = root.querySelector(".kw-info-list");
      zeroTop(list);
      zeroBottom(list);
      const firstItem = root.querySelector(".kw-info-list > .kw-info-item:first-child");
      if (firstItem) firstItem.style.setProperty("margin-top", "0", "important");
      const lastItem = root.querySelector(".kw-info-list > .kw-info-item:last-child");
      if (lastItem) lastItem.style.setProperty("margin-bottom", "0", "important");
      let node = root.parentElement;
      for (let i = 0; node && i < 8; i += 1, node = node.parentElement) {
        if (node.matches(".container.wrapper, .custom-html, .fw-section")) zeroTop(node);
      }
    });
  };
  const start = () => {
    apply();
    setTimeout(apply, 50);
    setTimeout(apply, 250);
    setTimeout(apply, 1000);
    new MutationObserver(apply).observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
