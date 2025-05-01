const emojiRegex = /(\p{Extended_Pictographic})/gu;
document
	.querySelectorAll("p, li, h1, h2, h3, h4, h5, h6, span, strong, b, em, del")
	.forEach((el) => {
		const walker = document.createTreeWalker(
			el,
			NodeFilter.SHOW_TEXT,
			null,
			false
		);

		let node;
		const nodesToUpdate = [];

		while ((node = walker.nextNode())) {
			const parent = node.parentNode;
			if (parent && parent.classList && parent.classList.contains("emoji")) {
				continue;
			}

			// Reset regex lastIndex before each test
			emojiRegex.lastIndex = 0;
			if (emojiRegex.test(node.nodeValue)) {
				nodesToUpdate.push(node);
			}
		}

		nodesToUpdate.forEach((textNode) => {
			const parent = textNode.parentNode;
			const fragments = textNode.nodeValue.split(emojiRegex);
			const fragment = document.createDocumentFragment();

			fragments.forEach((part) => {
				// Test with a new regex instance (no side effects)
				if (/^\p{Extended_Pictographic}$/u.test(part)) {
					const span = document.createElement("span");
					span.className = "emoji";
					span.textContent = part;
					fragment.appendChild(span);
				} else {
					fragment.appendChild(document.createTextNode(part));
				}
			});

			parent.replaceChild(fragment, textNode);
		});
	});
const html = document.documentElement;

// ============ SWITCH THEMES ==============

const toggleBtn = document.getElementById("toggleThemes");
const emojiSpan = toggleBtn.querySelector(".emoji");

const setTheme = (theme) => {
	html.setAttribute("data-theme", theme);
	emojiSpan.textContent = theme === "dark" ? "🌙" : "☀️";
};

const getSystemTheme = () => {
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

const initTheme = () => {
	const savedTheme = sessionStorage.getItem("theme");
	if (savedTheme) {
		html.setAttribute("data-theme-system", "manual");
		setTheme(savedTheme);
	} else {
		const systemTheme = getSystemTheme();
		html.setAttribute("data-theme-system", "auto");
		setTheme(systemTheme);
	}
};
toggleBtn.addEventListener("click", () => {
	const currentTheme = html.getAttribute("data-theme");
	const newTheme = currentTheme === "dark" ? "light" : "dark";
	html.setAttribute("data-theme-system", "manual");
	setTheme(newTheme);
	sessionStorage.setItem("theme", newTheme);
});
initTheme();
console.log("%cCARI APA KAWAN!", "color: cyan; font-weight: bold; font-size: 100px; text-align: center;");
console.log("%cTAK ADA YANG SPESIAL!", "color: cyan; font-weight: bold; font-size: 100px; text-align: center;");
console.log("%cSILAHKAN KEMBALI!", "color: cyan; font-weight: bold; font-size: 100px; text-align: center;");