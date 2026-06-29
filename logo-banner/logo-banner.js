(() => {
  const currentScript = document.currentScript;
  const cssId = "kw-logo-banner-css";

  if (!document.getElementById(cssId)) {
    const style = document.createElement("style");
    style.id = cssId;
    style.textContent = `
      .kw-logo-banner-wrapper {
        width: 100%;
        position: relative;
        background-color: #000;
        overflow: hidden;
        z-index: 0;
      }

      .kw-logo-banner {
        width: 100%;
        position: relative;
        overflow: hidden;
        z-index: 2;
      }

      .kw-logo-banner-video-container {
        width: 100%;
        max-width: 2000px;
        margin: 0 auto;
      }

      .kw-logo-banner-video {
        width: 100%;
        height: auto;
        object-fit: contain;
        display: block;
        opacity: 1 !important;
      }

      @media (max-width: 768px) {
        .kw-logo-banner-wrapper {
          margin-top: 0;
          padding-top: 0;
          margin-bottom: -70px;
        }

        .kw-logo-banner {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
        }

        .kw-logo-banner-video-container {
          width: 100%;
          max-width: 100%;
        }

        .kw-logo-banner-video {
          width: 100%;
          max-height: 32vh;
          object-fit: contain;
        }
      }

      @media (min-width: 769px) {
        .kw-logo-banner-wrapper {
          margin-top: -250px;
          padding-top: 250px;
          margin-bottom: -60px;
        }

        .kw-logo-banner {
          width: 100%;
          max-width: 1100px;
          margin: -30px auto 30px;
        }

        .kw-logo-banner-video-container {
          max-width: 1300px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const wrapper = document.createElement("div");
  wrapper.className = "kw-logo-banner-wrapper";
  wrapper.innerHTML = `
    <div class="kw-logo-banner">
      <div class="kw-logo-banner-video-container">
        <video class="kw-logo-banner-video" autoplay muted loop playsinline>
          <source src="https://knightwitch.nyc3.cdn.digitaloceanspaces.com/BANNERS/Knight%20Witch%20Redux%202.webm" type="video/webm">
        </video>
      </div>
    </div>
  `;

  if (currentScript && currentScript.parentNode) {
    currentScript.insertAdjacentElement("beforebegin", wrapper);
  } else {
    document.body.appendChild(wrapper);
  }
})();
