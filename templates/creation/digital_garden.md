<%*
const title = await tp.system.prompt("Title") || "Untitled";
const tagsIn = await tp.system.prompt("Tags (separate with commas)") || "unorganized";
const tags = tagsIn.split(",").map(t => t.trim()).filter(Boolean);
const stage = await tp.system.suggester(
  ["Seedling", "Growing", "Evergreen"],
  ["Seedling", "Growing", "Evergreen"]
);

const tmpl = 
`---
id: "${tp.date.now("YYYYMMDDHHmmss")}"
title: "${title}"
stage: ["${stage}"]
tags:
${tags.map(t => `  - "${tp.user.slugfy(t)}"`).join("\n")}
created: ${tp.date.now("YYYY-MM-DDTHH:mm:ssZ")}
---`;
await tp.file.create_new(tmpl, `/content/${tp.user.slugfy(title)}`, true)
-%>