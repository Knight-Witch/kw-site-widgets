(() => {
  const current = window.KW_SIZE_GUIDE_CHARTS || {};
  const tactical = current["mens-tactical-vest"];
  if(!tactical) return;

  const unique = values => [...new Set(values.filter(Boolean))];
  const patched = Object.freeze({
    ...tactical,
    title: "Men's Tactical Merc Vest Size Chart",
    productSlugs: unique([
      ...(tactical.productSlugs || []),
      "mens-tactical-merc-vest"
    ]),
    aliases: unique([
      ...(tactical.aliases || []),
      "mens tactical merc vest",
      "men's tactical merc vest",
      "tactical merc vest"
    ]),
    variantAliases: unique([
      ...(tactical.variantAliases || []),
      "mens tactical merc vest",
      "men's tactical merc vest",
      "tactical merc vest"
    ])
  });

  window.KW_SIZE_GUIDE_CHARTS = Object.freeze({
    ...current,
    "mens-tactical-vest": patched,
    "mens-tactical-merc-vest": patched
  });
})();
