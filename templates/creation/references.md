<%*
const slg = (str) => str.trim().toLowerCase()
  .replace(/\s+/g, "_")
  .replace(/[^a-z0-9_]/g, "_")
  .replace(/_+/g, "_")
  .replace(/^_|_$/g, "");
const title = await tp.system.prompt("Title") || "Untitled"
const source = await tp.system.suggester(
  ["Wikipedia", "YouTube", "Podcast", "Article", "Books", "Medium", "Forum", "Social Media", "Short Video", "ChatGPT", "GrokAI", "GeminiAI", "Copilot"],
  ["Wikipedia", "YouTube", "Podcast", "Article", "Books", "Medium", "Forum", "Social Media", "Short Video", "ChatGPT", "GrokAI", "GeminiAI", "Copilot"]
);

const url = await tp.system.prompt("URL") || "#";
const tagsInput = await tp.system.prompt("Tags (separate with commas)") || "uncategorized";
const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);

const tmpl = 
`---
id: "${tp.date.now("YYYYMMDDHHmm")}"
title: "${title}"
source:
  - "${source}"
tags: 
${tags.map(t => `  - "${slg(t)}"`).join("\n")}
created: ${tp.date.now("YYYY-MM-DDTHH:mm:ssZ")}
---

Sumber: [${url}](${url})
`; await tp.file.create_new(tmpl, `/notes/references/${slg(title)}`, true)
-%>