(() => {
  const d = document;
  const keys = {
    cartId: "kwfw_cart_id",
    count: "kwfw_cart_count",
    items: "kwfw_cart_items"
  };

  const getCount = () => Math.max(0, Number(localStorage.getItem(keys.count) || 0) || 0);

  const getItems = () => {
    try {
      const value = JSON.parse(localStorage.getItem(keys.items) || "[]");
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  };

  const hasCart = () => {
    if (localStorage.getItem(keys.cartId)) return true;
    if (getCount() > 0) return true;
    return getItems().some(item => Math.max(0, Number(item?.qty || item?.quantity || 0) || 0) > 0);
  };

  const getModal = () => {
    let modal = d.querySelector(".kw-cart-empty-modal");
    if (modal) return modal;
    modal = d.createElement("div");
    modal.className = "kw-cart-empty-modal";
    modal.innerHTML = '<div class="kw-cart-empty-panel"><h2 class="kw-cart-empty-title">Your Cart Is Empty</h2><p class="kw-cart-empty-copy">Add something to your cart before checking out.</p><div class="kw-cart-empty-actions"><button type="button" class="kw-cart-empty-btn" data-kw-cart-empty-close>Continue Shopping</button></div></div>';
    d.body.appendChild(modal);
    return modal;
  };

  const closeModal = () => {
    d.querySelector(".kw-cart-empty-modal")?.classList.remove("is-open");
  };

  const openModal = () => {
    const modal = getModal();
    modal.classList.add("is-open");
    requestAnimationFrame(() => modal.querySelector("[data-kw-cart-empty-close]")?.focus());
  };

  d.addEventListener("click", event => {
    if (event.target.closest("[data-kw-cart-empty-close]")) {
      event.preventDefault();
      closeModal();
      return;
    }

    const modal = event.target.closest(".kw-cart-empty-modal");
    if (modal && event.target === modal) closeModal();
  });

  d.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
  });

  d.addEventListener("click", event => {
    const link = event.target.closest('a[href]');
    if (!link) return;

    const target = new URL(link.href, location.href);
    const path = target.pathname.replace(/\/+$/, "") || "/";
    if (path !== "/cart") return;
    if (hasCart()) return;

    event.preventDefault();
    event.stopPropagation();
    openModal();
  }, true);
})();
