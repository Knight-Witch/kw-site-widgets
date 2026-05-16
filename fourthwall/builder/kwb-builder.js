(()=>{
  const d=document;
  const w=window;
  const config=w.KWB_CONFIG||{};
  const q=(s,r=d)=>r.querySelector(s);
  const qa=(s,r=d)=>Array.from(r.querySelectorAll(s));
  const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));

  function renderCover(root){
    const copy=config.copy||{};
    const assets=config.assets||{};
    const video=assets.coverVideo?`<video autoplay muted loop playsinline preload="metadata" src="${esc(assets.coverVideo)}"></video>`:`<div class="kwb-state">Cover WEBM placeholder</div>`;
    root.innerHTML=`
      <section class="kwb-frame">
        <div class="kwb-bg"></div>
        <div class="kwb-shell">
          <main class="kwb-main">
            <div class="kwb-cover">
              <div class="kwb-cover-media">${video}</div>
              <div class="kwb-cover-copy">
                <h2 class="kwb-title">${esc(copy.coverTitle||"Design Your Jacket")}</h2>
                <div class="kwb-cover-lines">${(copy.coverLines||["Your Vision","Your Style","Begins Here"]).map(line=>`<div>${esc(line)}</div>`).join("")}</div>
                <button type="button" class="kwb-btn" data-kwb-start>${esc(copy.coverCta||"Start My Design")}</button>
              </div>
            </div>
          </main>
          <aside class="kwb-side" data-kwb-side>
            <h3 class="kwb-side-title">Your Weave</h3>
            <div class="kwb-weave-thumb" data-kwb-core-thumb>Core</div>
            <div class="kwb-side-slot" data-kwb-jacket-thumb>Jacket</div>
            <div class="kwb-side-slot" data-kwb-accent-thumb>Accent</div>
            <div class="kwb-line"><span>Subtotal</span><strong data-kwb-subtotal>$0</strong></div>
            <button type="button" class="kwb-btn kwb-next" data-kwb-next disabled>Next</button>
          </aside>
        </div>
      </section>`;
  }

  function initBuilder(root){
    if(root.dataset.kwbInitialized==="1")return;
    root.dataset.kwbInitialized="1";
    renderCover(root);
  }

  function init(){
    qa(".kwb-builder").forEach(initBuilder);
  }

  d.addEventListener("click",e=>{
    const start=e.target.closest("[data-kwb-start]");
    if(start){
      const root=start.closest(".kwb-builder");
      const collection=root?.dataset.kwbCoreCollection||"blackmass-core";
      const main=q(".kwb-main",root);
      if(main){
        main.innerHTML=`<section class="kwb-step is-active" data-kwb-step="core"><div class="kwb-step-head"><h2 class="kwb-title">${esc((config.copy||{}).coreTitle||"Choose Your Design")}</h2></div><div class="kwb-state">Core step scaffold loaded. Collection: ${esc(collection)}</div><div class="kwb-grid" data-kwb-core-grid></div></section>`;
      }
    }
  });

  w.KWB={init};
  d.readyState==="loading"?d.addEventListener("DOMContentLoaded",init):init();
})();
