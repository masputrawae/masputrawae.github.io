// ==== Collapsible Navbar
function navbarCollapse() {
  const button = document.getElementById("toggle-navbar");
  const navbar = document.getElementById("navbar");

  if (!button || !navbar) {
    console.log("==|🚧|: Button & Navbar elements not found. :|🚧|==");
    return;
  }

  const iconOpen = button.querySelector(".icon-open");
  const iconClose = button.querySelector(".icon-close");

  const toggle = (isOpen) => {
    navbar.classList.toggle("max-md:invisible", !isOpen);
    navbar.classList.toggle("max-md:scale-y-0", !isOpen);

    navbar.classList.toggle("max-md:visible", isOpen);
    navbar.classList.toggle("max-md:scale-y-100", isOpen);

    if (iconOpen || iconClose) {
      iconOpen.classList.toggle("hidden", isOpen);
      iconOpen.classList.toggle("inline", !isOpen);

      iconClose.classList.toggle("inline", isOpen);
      iconClose.classList.toggle("hidden", !isOpen);
    }
  };

  button.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = navbar.classList.contains("max-md:visible");
    toggle(!isOpen);
  });

  document.addEventListener("click", () => {
    const isOpen = navbar.classList.contains("max-md:visible");
    if (isOpen) {
      toggle(false);
    }
  });
}

// ==== COPY ARTICLE
function copyArticle() {
  document.addEventListener("copy", (e) => {
    const sel = window.getSelection();
    const anchorNode = sel.anchorNode;

    const codeParent = anchorNode?.parentElement?.closest(
      "pre, code, .code, .code-block, .hljs, .highlight",
    );
    if (codeParent) return;
    
    const selectedText = sel.toString();
    const title = document.title;
    const href = window.location.href

    const source = `\n\nJudul: ${title}\nSumber: ${href}\n`;
    e.clipboardData.setData("text/plain", selectedText + source);
    e.preventDefault();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  navbarCollapse();
  copyArticle();
});
