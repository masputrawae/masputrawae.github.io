<%*
const tmpl = 
`---
id: "${tp.date.now("YYYYMMDDHHmm")}"
title: "${await tp.system.prompt("Title") || "Untitled"}"
created: ${tp.date.now("YYYY-MM-DDTHH:mm:ssZ")}
---

${await tp.system.prompt("Ide Cepat") || ""}`; await tp.file.create_new(tmpl, `/notes/quickly/${tp.date.now("YYYYMMDDHHmm")}`, true)
-%>
