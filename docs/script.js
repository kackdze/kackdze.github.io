async function loadAndRenderMarkdown() {
  const container = document.querySelector("#content[data-md]");
  const url = container?.dataset.md;
  if (!container) return;

  if (url) { 
    container.innerHTML = '<p>Loading markdown…</p>';

  const errorContainer = document.createElement("div");
  errorContainer.style.color = "#d32f2f";
  container.before(errorContainer);
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

      const text = await resp.text();
      const html  = marked.parse(text, {
        gfm: true,
        breaks: true,
        headerIds: true,
        mangle: false,
      });

      // Optional: DOMPurify.sanitize(html) if content isn't fully trusted

      const section = document.createElement("div");
      container.innerHTML = html;
    } catch (err) {
      console.error(err);
      errorContainer.innerHTML += `<p>Failed to load ${url.split('/').pop()}: ${err.message}</p>`;
    }

   }
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadAndRenderMarkdown);
} else {
  loadAndRenderMarkdown();
}