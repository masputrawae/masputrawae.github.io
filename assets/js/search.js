import Fuse from "fuse.js";

const searchHandler = async () => {
  const searchInput = document.querySelector("#searchInput");
  const resultsContainer = document.querySelector("#results");

  if (!searchInput || !resultsContainer) return;

  const resultsPanel = document.querySelector("#searchContainerResults");

  const clearSearch = () => {
    searchInput.value = "";
    resultsContainer.innerHTML = "";
    resultsPanel.hidden = true;
  };

  try {
    const searchUrl = searchInput.closest(".search-bar")?.dataset.search;
    if (!searchUrl) throw new Error("Search URL not found");

    const response = await fetch(searchUrl);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

    const store = await response.json();

    const fuse = new Fuse(store, {
      keys: ["title", "tags", "description", "id", "date", "image"],
      threshold: 0.3,
      minMatchCharLength: 1,
    });

    const displayResults = (results, query) => {
      if (!query) return clearSearch();

      resultsContainer.innerHTML = results.length
        ? results
            .map((res) => {
              const item = res.item;
              return `<li><a href="${item.url}">${item.title}</a></li>`;
            })
            .join("")
        : `<p class="class="link-broken">No results found for: "${query}"</p>`;
      resultsPanel.hidden = false;
    };

    const handleSearch = (event) => {
      event?.preventDefault();
      const query = searchInput.value.trim();
      const results = query.length >= 2 ? fuse.search(query) : [];
      displayResults(results, query);
    };

    const debounce = (fn, wait = 300) => {
      let t;
      return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
      };
    };

    // Event listener
    searchInput.addEventListener("input", debounce(handleSearch, 300));

    // Prefill dari URL
    const params = new URLSearchParams(location.search);
    const initialQuery = params.get("query");
    if (initialQuery) {
      searchInput.value = initialQuery;
      setTimeout(() => handleSearch(new Event("input")), 100);
    }
  } catch (err) {
    console.error("Search error:", err);
    resultsPanel.hidden = false;
    resultsContainer.innerHTML = `
      <p class="class="link-broken">Search is currently unavailable</p>`;
  }
};

document.addEventListener("DOMContentLoaded", searchHandler)