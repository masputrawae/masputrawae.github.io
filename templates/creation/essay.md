<%*
const title = await tp.system.prompt("Title") || "Untitled"
const tagsIn = await tp.system.prompt("Tags (separate with commas)") || "uncategorized";
const tags = tagsIn.split(",").map(t => t.trim()).filter(Boolean);
const tmpl = 
`---
id: "${tp.date.now("YYYYMMDDHHmmss")}"
title: "${title}"
description: "${await tp.system.prompt("Description") || "There is currently no description available."}"
images: ["${await tp.system.prompt("Image") || "images/default-image.webp"}"]
tags:
${tags.map(t => `  - "${tp.user.slugfy(t)}"`).join("\n")}
created: ${tp.date.now("YYYY-MM-DDTHH:mm:ssZ")}
---`; await tp.file.create_new(tmpl, `/content/essay/${tp.user.slugfy(title)}`, true)
-%>
