---
id: "202507231512"
title: Hal Utama Untuk Menangani Wikilink Hugo
tags:
  - problems
  - hugo
  - wikilink
created: 2025-07-23T15:12:52+07:00
updated: 2025-07-23T15:12:52+07:00
---

- `[[foo]]` => `[foo](foo)`
- `[[foo|label]]` => `[label](foo)`
- `[[folder/foo]]` => `[folder/foo](folder/foo)`
- `[[folder/foo|label]]` => `[label](folder/foo)`
- `[[foo#bar]]` => `[foo#bar](foo#bar)`
- `[[foo#bar|label]]` => `[label](foo#bar)`
- `[[folder/foo#bar]]` =>  `[folder/foo#bar](folder/foo#bar)`
- `[[folder/foo#bar|label]]` =>  `[label](folder/foo#bar)`
- `[[#^1]]` => 
- `[[foo#^1]]` =>
- `[[folder/foo#^1]]`
- `![[foo.jpg]]` => `![foo.jpg](foo.jpg)`
- `![[foo.jpg|label]]` => `![label](foo.jpg)`

Perlukah mendeteksi link broken/hilang (opsional tapi rekondisi ya).
Seperti [[202507231124_masalah_wikilink_di_hugo#^f7b205]] yang ambiguitas karena nama taxonomy sama dengan nama file seharusnya bisa di perketat lagi agar hanya scope file yang ada, dan tidak merujuk pada taxonomy, kalau soal [[202507231124_masalah_wikilink_di_hugo#^5a203b]] multilingual yang ambiguitas juga, seharusnya ketika hugo menggunakan multilingual scope yang juga harus diperketat lagi, sesuai scope konten di folder bahasa yang aktif.

## Kesimpulan Sementara:

Jika tanpa validasi yang kompleks, misalnya cuma convert `[[wikilink]]` jadi `[wikilink](wikilink)` itu sebenarnya cukup sederhana (!tanpa validasi apapun, polos aja).

---

## Lihat Juga

- [[202507231124_masalah_wikilink_di_hugo]]
- [[202507191421_cara_merender_wikilink_di_hugo]]