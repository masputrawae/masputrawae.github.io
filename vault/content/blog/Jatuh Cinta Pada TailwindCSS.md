---
title: Jatuh Cinta Pada TailwindCSS
description: Pengalaman pribadiku pertama kali menggunakan TailwindCSS, yang awalnya benci jadi cinta 😁
tags:
  - story
  - css
  - scss
  - tailwind
pubDate: 2025-12-15T15:56:19+07:00
updatedDate: 2025-12-30T00:36:54+07:00
---

Hal paling konyol yang pernah aku alami selama belajar CSS adalah penolakan keras terhadap [Tailwind](https://tailwindcss.com/). 😅 Alasannya sederhana: markup HTML-nya terlihat *sangat* berantakan. Banyaknya class yang menumpuk membuatku pusing sendiri, dan saat itu aku memutuskan untuk tidak mau menyentuh Tailwind sama sekali.

## Scss & BEM Adalah Keindahan Bagiku

Salah satu hal yang paling aku suka adalah menggunakan Scss dengan pendekatan BEM (block, element, modifier). Menurutku, markup yang rapi dan bersih adalah pemandangan paling indah bagi mata dan otak.

Bayangkan saja ketika membuat sebuah card, markup yang kutulis bisa serapih ini:

```html
<div class="card">
  <div class="card__header">
    <img class="card__img" src="./image.png" />
  </div>
  <div class="card__body">
    <h2 class="card__title">Judul Kartu</h2>
    <p class="card__summary">Ringkasan / Deskripsi...</p>
    <span class="card__price">Harga: 20.000</span>
  </div>
  <div class="card__footer">
    <button class="card__btn">Lihat Produk</button>
    <button class="card__btn card__btn--primary">Beli</button>
  </div>
</div>
````

Itu rapi, jelas, dan mudah dibaca.

Nah, beda lagi kalau pakai [Tailwind](https://tailwindcss.com/). Markup-nya bisa terlihat seperti ini:

```html
<div class="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white">
  <img class="w-full" src="./image.png" alt="Product">
  <div class="px-6 py-4">
    <h2 class="font-bold text-xl mb-2">Judul Kartu</h2>
    <p class="text-gray-700 text-base">Ringkasan / Deskripsi...</p>
    <span class="inline-block text-lg font-semibold text-gray-800 mt-2">Harga: Rp20.000</span>
  </div>
  <div class="px-6 pt-4 pb-6 flex gap-3">
    <button class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition">
      Lihat Produk
    </button>
    <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition">
      Beli
    </button>
  </div>
</div>
```

Gila kan. Dulu pas pertama kali lihat markup seperti ini, refleks langsung kututup tab-nya. 😅 Itulah alasan kenapa aku dulu sama sekali tidak mau menyentuh Tailwind.

## Kebosanan Mengubah Cara Pandang

Suatu hari aku merasa sangat bosan. Seharian cuma tiduran, main ponsel, nonton turnamen Dota, dan nggak melakukan hal baru sama sekali. Karena takut hari itu lewat tanpa belajar apa pun, muncul ide iseng untuk coba-coba Tailwind.

### Coba Dulu, Urusan Pusing, Nanti Beli Obat 😅

Akhirnya aku install Tailwind. Yang bikin makin sulit, aku juga menggunakan [Hugo](https://gohugo.io). Pengalaman awalnya adalah: pusing, bingung, dan berantakan. Setelah menulis 2–3 baris saja sudah muncul pikiran _“Kayaknya aku nggak berbakat pakai Tailwind.”_

Tapi aku putuskan untuk menjelaskan satu bagian header dulu sebelum menyerah.

Di pertengahan proses, aku membaca dokumentasi Tailwind dan menemukan rekomendasi untuk menggunakan `prettier` agar class-class bisa lebih teratur. Dan ya, itu benar-benar membantu merapikan class yang awalnya seperti bubur ayam. 😅 Walaupun tetap bikin pusing, setidaknya lebih enak dilihat.

### Setelah Selesai…

Setelah hampir menyelesaikan satu header, tiba-tiba muncul perasaan: _“Lah kok enak!?”_ 😅  
Dan alasannya cukup jelas:

- Cuma butuh satu file CSS untuk import Tailwind
- Nggak perlu mikir nama class
- Fokus di file HTML saja, tanpa bolak-balik ke CSS
- Pilihan warna banyak banget 😁
- Hasil build CSS jauh lebih kecil

Di momen itulah aku mulai jatuh cinta pada Tailwind.

> “Wah enak juga ya, cukup di HTML aja. Nggak perlu mikir mixins, variables, functions, atau file Scss yang terpisah. Nggak perlu mikir penamaan class, dan pilihan warnanya juga lengkap.”

Dan akhirnya aku mulai berpikir bahwa Tailwind sebenarnya lebih cocok denganku. 😅

## Kesimpulan

Terkadang, hal yang tidak kita sukai justru bisa menjadi sesuatu yang paling berharga ketika kita mau membuka hati dan pikiran. Sama seperti aku yang dulu tidak suka Tailwind, tapi akhirnya malah menyukainya setelah mencoba dan memahaminya.

Namun pada akhirnya, semuanya kembali pada kenyamanan dan kebutuhan proyek. Pendekatan awalku dengan Scss dan BEM tidak salah, dan Tailwind juga bukan solusi terbaik untuk semua kasus. Semua tergantung bagaimana proyek dibangun dan bagaimana kesepakatan tim.

Tidak ada metode yang mutlak paling bagus. Yang penting adalah bagaimana kita bisa beradaptasi dengan berbagai pendekatan dan lingkungan yang berbeda.

Sekian 😅 dan terima kasih sudah mau membaca ceritaku. 😁

---

## Postingan Menarik Lainnya

- [[Kekonyolan Yang Sering Aku Alami Part 1]]
- [[Ingin Jadi Programmer Tapi Enggan Ngoding]]
- [[Motivasi Belajar]]
- [[Membebaskan Diri Dari Tutorial Hell]]
