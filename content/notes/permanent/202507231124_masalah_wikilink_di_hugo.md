---
id: "202507231124"
title: Masalah Wikilink Di Hugo
tags:
  - problems
created: 2025-07-23T11:24:18+07:00
updated: 2025-07-23T11:24:18+07:00
---

Ambiguitas yang masih jadi masalah:

Ketika ada nama tags/categories atau taxonomy apapun yang sama persis dengan nama file bisa menyebabkan ambigu. Contoh: `content/foo.md` dengan `tags: foo`.
 ^f7b205
 
 Ketika menggunakan multilingual. Masalahnya sendiri kita harus menyediakan nama file yang sama di semua bahasa yang tersedia misal:
- `en/foo.md` dan harus ada juga di bahasa lain `id/foo.md` kalau hanya salah satu tidak ada `foo.md` maka walaupun `[[wikilink]]` tidak digunakan maka tetap terdeteksi ambigu juga.  ^5a203b

> [!note] Belum Dipecahkan
> Belum menemukan solusi yang tepat 
> Ide Sementara Yang Terfikir: [[202507231153_fitur_wikilinks_experiental_untuk_tema_hugo]]

---

## Lihat Juga

- [[202507191421_cara_merender_wikilink_di_hugo]]
- [[202507231512_hal_utama_untuk_menangani_wikilink_hugo]]
- [[202507231153_fitur_wikilinks_experiental_untuk_tema_hugo]]