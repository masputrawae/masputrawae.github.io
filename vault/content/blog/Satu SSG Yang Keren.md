---
title: Satu SSG Yang Keren
description: Pengalaman pribadi dan tanggapan ku soal AstroJS
tags:
  - ssg
  - astro
  - hugo
  - javascript
  - golang
pubDate: 2025-12-15T15:56:19+07:00
updatedDate: 2026-03-27
---

Hampir satu minggu terakhir aku mencoba **Astro.js**, dan jujur, pengalaman pribadi: aku cukup kagum. Yang paling bikin suka tentu karena dia _javascript first_ 😅 — di Astro beneran bisa pakai JavaScript murni (walaupun TypeScript tetap direkomendasikan).

Berikut beberapa hal yang paling aku suka:

## Island Hydration

Istilahnya agak lucu ya 😅 Tapi intinya, kita bisa memakai komponen dari berbagai framework, misalnya **React**, Svelte, Preact, Vue, sampai SolidJS. Dan menurutku ini salah satu fitur paling keren.

Contoh kecil: bikin menu hamburger. Tinggal pakai komponen React dengan `useState`, beres — nggak perlu nulis script manual.

## Image Processing Bawaan

Ini juga fitur yang sangat membantu. Astro sudah punya komponen khusus untuk memproses gambar otomatis agar responsif. Jadi kita nggak perlu repot bikin berbagai ukuran manual; Astro akan menghasilkan beberapa versi gambar yang sesuai dengan perangkat pengguna.

## Zero JavaScript by Default

Aku juga awalnya bingung apa maksudnya 😅 Tapi maksudnya: secara default Astro **tidak** mengeluarkan JavaScript di runtime. Hasilnya, halaman jadi jauh lebih cepat.

Tapi tentu saja, kalau kita pakai React atau framework lain, ya bakal ada JS juga — jadi “zero” itu hanya berlaku kalau kita tetap bermain di komponen Astro saja.

## Beautiful Markup

Kalau kamu terbiasa dengan React atau JSX, sintaks file `.astro` akan terasa familiar. Bentuknya mirip JSX, tapi lebih dekat ke HTML. Ini yang aku suka: berbeda dengan SSG tradisional yang heavily dependent ke templating engine.

Untuk logika yang agak rumit, pendekatan Astro terasa jauh lebih nyaman.

## Hybrid Strategy

Ini salah satu fitur yang benar-benar gila menurutku. Astro bukan cuma SSG, tapi bisa juga SSR, bahkan **hybrid**.

Misal:

- Konten markdown dibuild secara statis
- Tapi fitur seperti form, search, dan interaksi yang harus diproses di server bisa tetap dikerjakan secara server-side

Semua ini bisa jalan bersamaan 😅

## Hugo Tetap Nomor Satu

Meskipun aku cukup kagum dengan Astro dan fitur-fitur canggihnya (terutama kemampuan memakai React dan image processing-nya), tapi **Hugo tetap nomor satu** buatku.

Kenapa? Karena Hugo itu super ringan. Nggak bawa “alat berat”. Tinggal install binary, langsung jalan.

Yang bikin aku betah:

- Build time super cepat, bahkan untuk banyak halaman — cuma kedipan mata 😅
- Sangat efisien dan stabil

Sesuai dengan cerita di [[Kebutuhan vs Keinginan]], ini sangat related.

Walaupun aku suka banyak hal di Astro, bukan berarti aku akan memindahkan website ini ke Astro. Ya, mungkin tidak untuk sekarang, tapi nanti kalau udah dirasa butuh astro untuk website ini😁.

Tapi dibanding learning curve templating vs performa dan build time, aku tetap memilih Hugo. Dan untuk sekarang, belum ada niat migrasi ke Astro 😁

---

## Postingan Menarik Lainnya

- [[Pengalaman 1 Bulan Ngulik AstroJS]]
- [[Kebutuhan vs Keinginan]]
- [[Akhirnya Migrasi ke Astro]]
