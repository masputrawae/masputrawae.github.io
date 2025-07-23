---
id: "202507231124"
title: Masalah Wikilink Di Hugo
tags:
  - problems
created: 2025-07-23T11:24:18+07:00
updated: 2025-07-23T11:24:18+07:00
---
Ambiguitas yang masih jadi masalah 
- Ketika ada nama tags/categories atau taxonomy apapun yang sama persis dengan nama file bisa menyebabkan ambigu. Contoh: `content/foo.md` dengan `tags: foo`.

- Ketika menggunakan multilingual. Masalahnya sendiri kita harus menyediakan nama file yang sama di semua bahasa yang tersedia misal:
	`en/foo.md` dan harus ada juga di bahasa lain `id/foo.md` kalau hanya salah satu tidak ada `foo.md` maka walaupun `[[wikilink]]` tidak digunakan maka tetap terdeteksi ambigu juga.

> [!note] Belum Dipecahkan
> Belum menemukan solusi yang tepat 


---

## Lihat Juga

- Masalah tersebut terkait dengan [[202507191421_cara_merender_wikilink_di_hugo]]