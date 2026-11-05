document.addEventListener("DOMContentLoaded", () => {
  const path = (location.pathname || "").toLowerCase();

  const isIndex =
    path === "/" ||
    path.endsWith("/") ||
    path.endsWith("index.html");

  const isLander = path.endsWith("lander.html");

  // Only show on index or lander
  if (!isIndex && !isLander) return;

  // Prevent double rendering
  if (document.querySelector(".modal-backdrop")) return;

  setTimeout(() => {
  // Create popup
  const bd = document.createElement("div");
  bd.className = "modal-backdrop cookie-modal-backdrop";
  if (isLander) bd.classList.add("cookie-modal-backdrop--betfinal");
  bd.innerHTML = `
    <div class="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      <button class="cookie-modal-close" id="gn-dismiss" type="button" aria-label="Close">×</button>
      <div class="cookie-illustration" role="img" aria-label="Chocolate chip cookie">
        <svg viewBox="0 0 160 160" aria-hidden="true">
          <circle cx="80" cy="80" r="72" fill="#d88d53"/>
          <circle cx="77" cy="75" r="68" fill="#f3b36c"/>
          <g fill="#60382f">
            <circle cx="62" cy="29" r="8"/><circle cx="107" cy="45" r="8"/>
            <circle cx="42" cy="65" r="8"/><circle cx="78" cy="57" r="8"/>
            <circle cx="132" cy="89" r="7"/><circle cx="77" cy="91" r="8"/>
            <circle cx="51" cy="108" r="8"/><circle cx="103" cy="116" r="8"/>
            <circle cx="82" cy="137" r="8"/><circle cx="113" cy="78" r="7"/>
          </g>
        </svg>
      </div>
      <div class="cookie-modal-content">
        <h2 id="cookie-title">We use Cookies</h2>
        <p>We use cookies to improve your browsing experience and keep this site working smoothly.</p>
        <div class="cookie-modal-actions">
          <button class="cookie-button cookie-button-accept" id="gn-yes" type="button">Accept cookies</button>
          <button class="cookie-button cookie-button-decline" id="gn-close" type="button">Decline cookies</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(bd);
  bd.style.display = "flex";

  const close = () => {
    bd.style.display = "none";
    bd.remove();
  };

  /**
   * LANDER LOGIC (Redirect on both buttons)
   */
  const landerRedirect = "https://toppickzone.site/";

  document.getElementById("gn-yes").addEventListener("click", () => {
    if (isLander) {
      window.location.href = landerRedirect;
    } else {
      // Index = just close
      close();
    }
  });

  document.getElementById("gn-close").addEventListener("click", () => {
    if (isLander) {
      window.location.href = landerRedirect;
    } else {
      // INDEX CLOSE BEHAVIOR
      const target =
        (document.querySelector('a[href*="terms.html"]') && "terms.html") ||
        (document.querySelector('a[href*="privacy.html"]') && "privacy.html");

      if (target) {
        window.location.href = target;
      } else {
        close(); // fallback
      }
    }
  });
  document.getElementById("gn-dismiss").addEventListener("click", () => {
    document.getElementById("gn-close").click();
  });
  },   300);//Delay to avoid flash of content
});
