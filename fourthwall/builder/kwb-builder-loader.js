(()=>{
  const d=document;
  const currentScript=d.currentScript;
  const explicitBase=currentScript?.dataset?.kwbBase;
  const base=explicitBase||"https://cdn.jsdelivr.net/gh/Knight-Witch/kw-site-widgets@KW_Builder_Dev/fourthwall/builder/";
  const files=[
    {type:"css",href:"kwb-builder.css"},
    {type:"js",src:"kwb-builder-config.js"},
    {type:"js",src:"kwb-builder.js"}
  ];
  function loadCss(href){
    if(d.querySelector(`link[href="${base+href}"]`))return;
    const link=d.createElement("link");
    link.rel="stylesheet";
    link.href=base+href;
    d.head.appendChild(link);
  }
  function loadJs(src){
    return new Promise((resolve,reject)=>{
      if(d.querySelector(`script[src="${base+src}"]`)){resolve();return}
      const script=d.createElement("script");
      script.defer=true;
      script.src=base+src;
      script.onload=resolve;
      script.onerror=reject;
      d.head.appendChild(script);
    });
  }
  async function load(){
    files.filter(file=>file.type==="css").forEach(file=>loadCss(file.href));
    for(const file of files.filter(file=>file.type==="js"))await loadJs(file.src);
  }
  load().catch(error=>console.error("Knight Witch Builder loader failed",error));
})();
