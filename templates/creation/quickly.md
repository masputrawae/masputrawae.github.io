<%*
const tmpl = 
`---
id: "${tp.date.now("YYYYMMDDHHmmss")}"
title: "${await tp.system.prompt("Title (optional)") || "Untitled"}"
created: ${tp.date.now("YYYY-MM-DDTHH:mm:ssZ")}
---

${await tp.system.prompt("Quick idea")}`; await tp.file.create_new(tmpl, `/notes/quickly/${timestamp}`, true);
-%>