<%*
const title = await tp.system.prompt("Title") || "Untitled"
const source = await tp.system.suggester(
  ["Wikipedia", "YouTube", "Podcast", "Article", "Books", "Medium", "Forum", "Social Media", "Short Video", "ChatGPT", "GrokAI", "GeminiAI", "Copilot"],
  ["Wikipedia", "YouTube", "Podcast", "Article", "Books", "Medium", "Forum", "Social Media", "Short Video", "ChatGPT", "GrokAI", "GeminiAI", "Copilot"]
);

const tagsIn = await tp.system.prompt("Tags (separate with commas)") || "uncategorized";
const tags = tagsIn.split(",").map(t => t.trim()).filter(Boolean);

const tmpl = 
`---
id: "${tp.date.now("YYYYMMDDHHmmss")}"
title: "${title}"
source: ["${source}"]
tags: 
${tags.map(t => `  - "${tp.user.slugfy(t)}"`).join("\n")}
created: ${tp.date.now("YYYY-MM-DDTHH:mm:ssZ")}
---

Sumber: [${source}](${await tp.system.prompt("URL") || "#"})`; 
await tp.file.create_new(tmpl, `/notes/references/${tp.user.slugfy(title)}`, true)
-%>