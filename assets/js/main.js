// === UTILITIES === //
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => ctx.querySelectorAll(sel);
const setAttr = (el, name, value) => el && el.setAttribute(name, value);

// === THEME SWITCH === //
(() => {
  const html = document.documentElement;
  const toggleBtn = $("#toggleThemes");
  const emojiSpan = $(".emoji", toggleBtn);

  const setTheme = (theme) => {
    setAttr(html, "data-theme", theme);
    if (emojiSpan) emojiSpan.textContent = theme === "dark" ? "🌙" : "☀️";
  };

  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const initTheme = () => {
    const saved = sessionStorage.getItem("theme");
    const theme = saved || getSystemTheme();
    setAttr(html, "data-theme-system", saved ? "manual" : "auto");
    setTheme(theme);
  };

  toggleBtn?.addEventListener("click", () => {
    const curr = html.getAttribute("data-theme");
    const next = curr === "dark" ? "light" : "dark";
    setAttr(html, "data-theme-system", "manual");
    setTheme(next);
    sessionStorage.setItem("theme", next);
  });

  initTheme();
})();

// === SIDEBAR TOGGLE === //
(() => {
  const SIDEBAR_ID = "sidebar";
  const sidebar = $(`#${SIDEBAR_ID}`);
  const buttons = $$(`[data-sidebar="${SIDEBAR_ID}"]`);
  const BREAKPOINT = 62 * 16;

  const isDesktop = () => window.innerWidth >= BREAKPOINT;

  const updateIcon = (state = null) => {
    const active = state ?? sidebar?.classList.contains("sidebar--active");
    buttons.forEach((btn) => {
      const emoji = btn.querySelector(".emoji");
      if (isDesktop() && btn.querySelector(".btn__emoji") && emoji) {
        emoji.textContent = active ? "🧭" : "✖️" ;
      }
    });
  };

  const singleColumns = (active) => {
    if (isDesktop()) {
      document.body.classList.toggle("single-columns", active);
    } else {
      document.body.classList.remove("single-columns");
    }
  };

  const updateSidebarFromSession = () => {
    if (!sidebar) return;
    if (isDesktop()) {
      const saved = sessionStorage.getItem("sidebar-active");
      const isActive = saved === "true";
      sidebar.classList.toggle("sidebar--active", isActive);
      singleColumns(isActive);
      updateIcon(isActive);
    } else {
      sidebar.classList.remove("sidebar--active");
      singleColumns(false);
    }
  };

  const toggleSidebar = () => {
    if (!sidebar) return;
    const willBeActive = !sidebar.classList.contains("sidebar--active");
    sidebar.classList.toggle("sidebar--active");
    if (isDesktop()) {
      sessionStorage.setItem("sidebar-active", willBeActive);
      singleColumns(willBeActive);
      updateIcon(willBeActive);
    }
  };

  buttons.forEach((btn) => btn.addEventListener("click", toggleSidebar));
  window.addEventListener("resize", updateSidebarFromSession);
  updateSidebarFromSession();
})();

// === MODAL DRAWER === //
(() => {
  const overlayClass = "modal--active";
  const drawers = $$(".drawer__button[data-drawer]");
  const closes = $$(".drawer__button--closed");

  const closeAll = () => $$(".drawer__fill." + overlayClass).forEach(m => m.classList.remove(overlayClass));

  drawers.forEach(btn =>
    btn.addEventListener("click", () => {
      const id = btn.dataset.drawer;
      const modal = document.getElementById(id);
      if (!modal) return;
      closeAll();
      modal.classList.add(overlayClass);
    })
  );

  closes.forEach(btn =>
    btn.addEventListener("click", e => {
      e.stopPropagation();
      btn.closest(".drawer__fill")?.classList.remove(overlayClass);
    })
  );

  document.addEventListener("click", (e) => {
    $$(".drawer__fill." + overlayClass).forEach((modal) => {
      if (!modal.contains(e.target) && !e.target.closest(".drawer__button")) {
        modal.classList.remove(overlayClass);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
})();

// === EMOJI AUTO WRAP === //
(() => {
  const emojiRegex = /(\p{Extended_Pictographic})/gu;
  const elements = $$("p, li, h1, h2, h3, h4, h5, h6, span, strong, b, em, del");

  elements.forEach((el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node;
    const targets = [];

    while ((node = walker.nextNode())) {
      if (!node.parentNode?.classList?.contains("emoji") && emojiRegex.test(node.nodeValue)) {
        targets.push(node);
      }
    }

    targets.forEach((textNode) => {
      const parent = textNode.parentNode;
      const parts = textNode.nodeValue.split(emojiRegex);
      const frag = document.createDocumentFragment();

      parts.forEach((part) => {
        if (emojiRegex.test(part)) {
          const span = document.createElement("span");
          span.className = "emoji";
          span.textContent = part;
          frag.appendChild(span);
        } else {
          frag.appendChild(document.createTextNode(part));
        }
      });

      parent.replaceChild(frag, textNode);
    });
  });
})();

// === BACK TO TOP === //
(() => {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  const SCROLL_THRESHOLD = 300; // px

  const toggleVisibility = () => {
    btn.style.display = window.scrollY > SCROLL_THRESHOLD ? "block" : "none";
  };

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", toggleVisibility);
  toggleVisibility(); // Init
})();

// === KONSOLE BERCANDA === //
console.log(
  "%cCARI APA KAWAN!",
  "color: cyan; font-weight: bold; font-size: 100px; text-align: center;"
);