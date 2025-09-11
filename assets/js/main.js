document.getElementById("toggle-menu").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("sidebar--is-active");
});

function linkPreviewHandler() {
  const tooltip = document.querySelector("#linkpreview");
  if (!tooltip)
    return console.warn("⚠️ Tooltip element #linkpreview not found.");

  const elements = document.querySelectorAll("article .internal-link");
  const origin = window.location.origin;

  let currentHref = "";
  let showPreviewTimer;
  let hidePreviewTimer;

  function resetTooltip() {
    tooltip.style.display = "none";
    tooltip.innerHTML = "";
  }

  function hideLinkPreview() {
    clearTimeout(showPreviewTimer);
    if (hidePreviewTimer !== undefined) return;

    hidePreviewTimer = setTimeout(() => {
      currentHref = "";
      resetTooltip();
      hidePreviewTimer = undefined;
    }, 200);
  }

  function clearTimers() {
    clearTimeout(showPreviewTimer);
    clearTimeout(hidePreviewTimer);
    hidePreviewTimer = undefined;
  }

  tooltip.addEventListener("mouseenter", clearTimers);
  tooltip.addEventListener("mouseleave", hideLinkPreview);

  async function getPagePreviewContent(href) {
    const text = await fetch(href).then((x) => x.text());
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.querySelector("article")?.outerHTML || "";
  }

  function positionTooltip(target, offsetTop = 10) {
    const rect = target.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    const tooltipRect = tooltip.getBoundingClientRect();

    let top = rect.bottom + scrollTop + offsetTop;
    let left = rect.left + scrollLeft;

    // Kalau tooltip kepanjangan & keluar kanan layar → geser
    if (left + tooltipRect.width > window.innerWidth) {
      left = window.innerWidth - tooltipRect.width - 10;
    }

    // Kalau tooltip nggak muat di bawah → flip ke atas
    if (top + tooltipRect.height > window.innerHeight + scrollTop) {
      top = rect.top + scrollTop - tooltipRect.height - offsetTop;
      // Pastikan tidak keluar atas layar
      if (top < scrollTop) {
        top = scrollTop + 10;
      }
    }

    Object.assign(tooltip.style, {
      top: `${top}px`,
      left: `${left}px`,
    });
  }

  async function showLinkPreview(e) {
    const target = e.target.closest("a");
    if (!target) return;

    const href = target.href;
    const hash = new URL(href).hash;
    const hrefWithoutAnchor = href.replace(hash, "");
    const locationWithoutAnchor = window.location.href.replace(
      window.location.hash,
      "",
    );

    currentHref = href;

    if (
      hrefWithoutAnchor === locationWithoutAnchor ||
      !href.startsWith(origin)
    ) {
      hideLinkPreview();
      return;
    }

    clearTimers();

    try {
      const content = await getPagePreviewContent(href);
      if (currentHref !== href) return;

      showPreviewTimer = setTimeout(() => {
        if (currentHref !== href) return;

        tooltip.innerHTML = content;
        tooltip.style.display = "block";
        tooltip.dataset.theme = document.documentElement.dataset.theme;

        let offsetTop = 0;
        if (hash) {
          const heading = tooltip.querySelector(hash);
          if (heading) offsetTop = heading.offsetTop;
        }

        tooltip.scroll({ top: offsetTop, behavior: "instant" });

        // posisikan tooltip
        positionTooltip(target, 10);
      }, 500);
    } catch (err) {
      console.error("Failed to fetch link preview:", err);
    }
  }

  const events = [
    ["mouseenter", showLinkPreview],
    ["mouseleave", hideLinkPreview],
    ["focus", showLinkPreview],
    ["blur", hideLinkPreview],
  ];

  elements.forEach((element) => {
    events.forEach(([event, listener]) => {
      element.addEventListener(event, listener);
    });
  });
}

document.addEventListener("DOMContentLoaded", linkPreviewHandler);
