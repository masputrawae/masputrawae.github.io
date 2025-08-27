<%*
const tmpl = 
`---
id: "${tp.date.now("YYYYMMDDHHmmss")}"
title: "${await tp.system.prompt("Title") || "Untitled"}"
created: ${tp.date.now("YYYY-MM-DDTHH:mm:ssZ")}
---

${await tp.system.prompt("Ide Cepat") || ""}`; await tp.file.create_new(tmpl, `/notes/quickly/${tp.date.now("YYYYMMDDHHmmss")}`, true)
-%>
