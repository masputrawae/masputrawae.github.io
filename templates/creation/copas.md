<%*
const title = await tp.system.prompt("Title!") || "Untitled";
const tagIn = await tp.system.prompt("Tags (separate with commas)") || "unorganized";
const tags = tagIn.split(",").map(t => t.trim()).filter(Boolean);
const tmpl = 
`---
id: "${tp.date.now("YYYYMMDDHHmmss")}"
title: "${title}"
tags:
  - copas
${tags.map(t => `  - ${tp.user.slugfy(t)}`).join("\n")}
created: ${tp.date.now("YYYY-MM-DDTHH:mm:ssZ")}
---

**Source of**: [${await tp.system.prompt("Title or Source") || "Unknown Source"}](${await tp.system.prompt("URL") || "#"})

${await tp.system.prompt("Paste Copy Result")}`;
await tp.file.create_new(tmpl, `/notes/copas/${tp.user.slugfy(title)}`, true);
-%>