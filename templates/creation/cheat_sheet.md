<%*
const title = await tp.system.prompt("Title!") || "Untitled";
const tagIn = await tp.system.prompt("Tags (separate with commas)") || "unorganized";
const tags = tagIn.split(",").map(t => t.trim()).filter(Boolean);
const langCode = await tp.system.prompt("Lang Code (example: python or py, javascript or js)")
const tmpl = 
`---
id: "${tp.date.now("YYYYMMDDHHmmss")}"
title: "${title}"
tags:
  - cheat_sheet
${tags.map(t => `  - ${tp.user.slugfy(t)}`).join("\n")}
created: ${tp.date.now("YYYY-MM-DDTHH:mm:ssZ")}
---

\`\`\`${tp.user.slugfy(langCode)}
${await tp.system.prompt("Paste your code")}
\`\`\`

## Penjelasan

`;
await tp.file.create_new(tmpl, `/notes/cheat_sheet/${tp.user.slugfy(title)}`, true);
-%>