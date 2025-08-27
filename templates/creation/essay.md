<%*
const slg = (str) => str.trim().toLowerCase()
  .replace(/\s+/g, "_")
  .replace(/[^a-z0-9_]/g, "_")
  .replace(/_+/g, "_")
  .replace(/^_|_$/g, "");
const title = await tp.system.prompt("Title") || "Untitled"
const tagsInput = await tp.system.prompt("Tags (separate with commas)") || "uncategorized";
const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);
const tmpl = 
`---
id: "${tp.date.now("YYYYMMDDHHmmss")}"
title: "${title}"
description: "${await tp.system.prompt("Description") || ""}"
images: ["${await tp.system.prompt("Image") || "assets/images/default-image.webp"}"]
tags:
${tags.map(t => `  - "${slg(t)}"`).join("\n")}
created: ${tp.date.now("YYYY-MM-DDTHH:mm:ssZ")}
updated: ${tp.date.now("YYYY-MM-DDTHH:mm:ssZ")}
---`; await tp.file.create_new(tmpl, `/content/essay/${slg(title)}`, true)
-%>
