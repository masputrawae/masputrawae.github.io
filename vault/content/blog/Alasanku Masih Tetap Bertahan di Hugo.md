---
title: Alasanku Masih Tetap Bertahan di Hugo
description: Pengalaman pribadi ketika mencoba memindahkan blog ini ke Astro, dan alasan tetap memiliki untuk bertahan di Hugo.
tags:
  - astro
  - hugo
  - javascript
  - golang
pubDate: 2025-12-29
updatedDate: 2026-04-05
---

Kemarin aku sempat menulis tentang ketertarikanku pada Astro[^1], sekaligus pengalaman pertamaku mencobanya[^2]. Sempat terpikir untuk memindahkan blog ini ke Astro, dan setelah beberapa hari benar-benar kucoba, ternyata muncul banyak masalah yang tidak sesuai dengan ekspektasiku 😅.

Bukan berarti Astro itu buruk. Justru sebaliknya, ada banyak hal yang aku suka. Tapi pada akhirnya, ada beberapa kendala yang membuatku memutuskan untuk tetap bertahan di Hugo—setidaknya untuk saat ini.

## Taxonomy dan Term

Soal taxonomy dan term ini sebenarnya sudah pernah aku bahas sebelumnya[^1] 😅. Untuk kasus sederhana seperti `tags`, masih cukup mudah diatasi karena hanya satu taxonomy saja.

Masalahnya muncul ketika pikiran liarku mulai bertanya:

> Bagaimana kalau suatu saat ingin menambah taxonomy lain?  
> Misalnya `categories`, `series`, dan sebagainya…

Memang terdengar agak overthinking, karena saat ini blog ini bahkan belum memakai taxonomy selain `tags` 😁. Tapi tetap saja, pikiran seperti itu bikin tidur jadi nggak nyenyak.

## Masalah Sections & Wiki Link Style

Mungkin ini murni *skill issue* 😅, tapi bagian ini benar-benar bikin aku pusing.

Alasan aku membahas *sections* dan *wikilink* adalah karena aku beberapa kali mencoba menggunakan `remark` (dan sejenisnya) di Astro. Masalah utamanya ada pada *path* antar *content collection* yang sering tidak sesuai.

Contohnya:
- Konten di-generate lewat dynamic routing di  
  `src/pages/posts/[...slug].astro`
- Dan juga di  
  `src/pages/notes/[...slug].astro`

Dari sudut pandangku, ini berarti ada lebih dari satu *section*. Namun plugin `remark-wikilink` yang aku temui seolah hanya bisa bekerja dengan satu collection saja.

Akhirnya, ketika aku mencoba membuat link dari *notes* ke *posts*, path-nya salah dan berujung ke halaman 404 😵‍💫.

Aku sendiri belum yakin apakah ini keterbatasan tooling, kurangnya pemahamanku, atau memang salah implementasi. Jadi ya… anggap saja ini *skill issue*.

## Performa dan Build Time

Bagian ini cukup menyakitkan 🙄  
PC-ku termasuk kentang 😅, dan ketika ngoding Astro—bahkan sebelum proses build—CPU usage sudah tinggi banget.

Asumsiku, kemungkinan penyebabnya:
- IntelliSense
- LSP
- Node.js itu sendiri
- Validasi TypeScript (mungkin)

Aku pakai Neovim, dan hanya membuka file `.astro` saja sudah terasa berat. Apalagi kalau `astro dev` sedang jalan 🥴.

Bandingkan dengan Hugo: super cepat dan ringan. Bahkan ketika aku pakai VS Code sekalipun, rasanya tetap nyaman dan responsif.

## Shortcodes

Ini salah satu hal yang menurutku agak kurang.

Secara konsep, aku suka pendekatan MDX + components. Terlihat lebih modern dan fleksibel. Tapi masalahnya, aku menulis konten di Obsidian 🥹, yang pada dasarnya tidak bisa membuka file `.mdx`.

Di titik ini, harapanku agak pupus. Ke depannya, aku berharap ada dukungan penggunaan komponen langsung di Markdown biasa, tanpa harus bergantung pada MDX.

## Pagination

Balik lagi ke *skill issue* 😅.

Astro memang menyediakan fitur pagination, tapi implementasinya menurutku cukup ribet dan harus banyak manual. Aku sudah coba cari referensi ke sana-sini, tapi jarang yang benar-benar sesuai dengan kebutuhanku.

Mungkin kalau aku sudah lebih jago JavaScript, ini bakal terasa mudah. Tapi saat ini, sebagai newbie, bagian ini terasa terasa berat.

## Entah Apa Lagi

Aku sadar, sebagian besar masalah di atas kemungkinan besar karena aku memang belum siap dengan Astro.

Padahal, jujur saja, ada banyak hal yang aku suka dari Astro. Dan masalah-masalah yang aku sebutkan tadi sebenarnya hanya sebagian kecil dibandingkan semua kelebihan yang ia tawarkan.

Namun pada akhirnya, aku memilih realistis:  
menggunakan alat yang sudah ada, stabil, dan memenuhi kebutuhanku saat ini. Tidak perlu berpindah jika yang sekarang sudah bekerja dengan baik 😊.

## Kesimpulan

Aku sama sekali tidak bermaksud menjelekkan Astro. Justru aku suka dengan komunitas dan fleksibilitas yang ia tawarkan—bahkan dibandingkan Hugo yang kadang templating-nya bisa bikin pusing 😅.

Tulisan ini murni berdasarkan pengalamanku **saat ini**, dan sangat mungkin berubah di masa depan, terutama jika aku sudah lebih memahami JavaScript secara mendalam (semoga saja 🤞).

Sedikit cerita penutup:  
dulu, saat masih memakai Jekyll, aku juga merasa Hugo itu membingungkan. Tapi seiring waktu dan konsistensi belajar, Hugo justru jadi alat yang sangat aku sukai.

Mungkin nanti Astro juga akan berada di titik yang sama.

Terima kasih sudah membaca 😊

---

## Postingan Menarik Lainnya

- [[Satu SSG Yang Keren]]
- [[Pengalaman 1 Bulan Ngulik AstroJS]]
- [[Kebutuhan vs Keinginan]]
- [[Dari Mau Nangis Kejebak Vim Sampai Jadi Pecandu Berat]]
- [[Jatuh Cinta Pada TailwindCSS]]

[^1]: [[Pengalaman 1 Bulan Ngulik AstroJS]]
[^2]: [[Satu SSG Yang Keren]]