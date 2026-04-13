---
title: Bikin Dark Mode Website Tanpa Ribet Part 2
description: Pengembangan dark mode dengan JavaScript, deteksi tema sistem, dan penyimpanan preferensi pengguna.
categories:
  - Pengembangan Web
tags:
  - mode_gelap
  - skema_warna
  - penyimpanan_lokal
pubDate: 2026-04-07
updatedDate: 2026-04-07
---

Kemarin aku sempat posting soal: [[Bikin Dark Mode Website Tanpa Ribet]]. Tapi di postingan sebelumnya cuma contoh dasar saja. Meski begitu, cara kemarin sebenarnya sudah cukup untuk kasus-kasus umum.

Di postingan ini, kita bakal membahas beberapa cara untuk mengembangkan fitur tersebut menggunakan JavaScript, yang kemungkinan bakal sering kepakai.

## Otomatis Menyesuaikan Tema Sistem

Sebenarnya, CSS dengan `@media (prefers-color-scheme: dark)` sudah cukup, seperti yang dibahas kemarin[^1]. Namun, pada beberapa kasus—seperti browser atau perangkat yang tidak mendukung—fitur ini tidak akan bekerja. Jadi mau tidak mau kita harus menanganinya secara manual menggunakan JavaScript.

Tenang, caranya tidak serumit yang dibayangkan. Berikut contohnya:

```javascript
// Ambil media query untuk mencocokkan tema sistem
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

// Ambil elemen <html> untuk menerapkan atribut tema
const htmlElement = document.documentElement

// Fungsi untuk mengubah tema
function change() {
  const theme = mediaQuery.matches ? 'dark' : 'light'
  htmlElement.setAttribute('data-theme', theme)
}

// Inisialisasi saat pertama kali halaman dimuat
change()

// Pantau perubahan tema sistem
mediaQuery.addEventListener('change', change)
```

Cukup sederhana, dan mudah dipahami.

## Simpan Preferensi Pengguna di Local Storage

Masalah berikutnya: ketika pengguna menutup browser lalu membukanya kembali, tema akan kembali ke default. Untuk mengatasinya, kita perlu menyimpan preferensi tema terakhir.

Kita modifikasi sedikit script sebelumnya[^1]:

```javascript
const KEY_THEME = 'theme'

const btn = document.getElementById('toggle-theme')
const htmlElement = document.documentElement

// Inisialisasi tema dari localStorage
function init() {
  const saved = localStorage.getItem(KEY_THEME)
  const theme = saved || 'light'
  htmlElement.setAttribute('data-theme', theme)
}

function change() {
  const current = htmlElement.getAttribute('data-theme')
  const theme = current === 'dark' ? 'light' : 'dark'
  htmlElement.setAttribute('data-theme', theme)

  // Simpan preferensi
  localStorage.setItem(KEY_THEME, theme)
}

btn.addEventListener('click', change)

init()
```

Sekarang, meskipun pengguna membuka dan menutup browser berkali-kali, tema akan tetap sesuai dengan pilihan terakhir.

## Bonus (Tinggal Copy-Paste)

Kalau kamu tipe yang perfeksionis 😅 atau cuma ingin langsung pakai, berikut contoh lengkap yang menggabungkan semua metode:

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <title>Belajar Mengubah Tema</title>
    <style>
      :root {
        --background-color: #fff;
        --text-color: #000;
      }

      /* Dark mode berdasarkan data-theme */
      :root[data-theme='dark'] {
        --background-color: #000;
        --text-color: #fff;
      }

      /* Fallback jika browser mendukung prefers-color-scheme */
      @media (prefers-color-scheme: dark) {
        :root:not([data-theme='light']) {
          --background-color: #000;
          --text-color: #fff;
        }
      }

      html {
        background-color: var(--background-color);
        color: var(--text-color);
      }
    </style>
  </head>
  <body>
    <h1>Belajar Mengubah Tema</h1>
    <button id="toggle-theme">Klik untuk mengubah tema</button>

    <script>
      const KEY_THEME = 'theme'

      const btn = document.getElementById('toggle-theme')
      const htmlElement = document.documentElement

      function init() {
        const saved = localStorage.getItem(KEY_THEME)
        const theme = saved || 'light'
        htmlElement.setAttribute('data-theme', theme)
      }

      function change() {
        const current = htmlElement.getAttribute('data-theme')
        const theme = current === 'dark' ? 'light' : 'dark'
        htmlElement.setAttribute('data-theme', theme)
        localStorage.setItem(KEY_THEME, theme)
      }

      btn.addEventListener('click', change)

      init()
    </script>
  </body>
</html>
```

## Permasalahan Umum Yang Sering Terjadi

Kasus yang sering terjadi adalah tema terlambat diterapkan. Biasanya terlihat seperti ada "flash" atau kedipan dari gelap ke terang (atau sebaliknya). Masalah ini dikenal sebagai Flash of Inaccurate Color Theme (FART).

Cara mengatasinya cukup sederhana: jalankan script secepat mungkin di dalam `<head>`, sebelum halaman di render.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script>
      const theme = localStorage.getItem('theme') || 'light'
      document.documentElement.dataset.theme = theme
    </script>

    <meta charset="UTF-8" />
    <title>Judul halaman</title>
  </head>
  <body>
    <!-- konten halaman -->
  </body>
</html>
```

Intinya, kita harus menerapkan tema sebelum browser menampilkan tampilan awal halaman.

## Kesimpulan & Penutup

Menurutku, pendekatan di atas sudah cukup untuk menangani kebutuhan dark mode di kebanyakan kasus. Kalau mau dikembangkan lebih jauh, sebenarnya masih banyak yang bisa dieksplorasi.

Tapi perlu diingat, dari pengalaman pribadi, bagian yang paling menantang bukan JavaScript-nya, melainkan styling di CSS. Kita harus memikirkan kombinasi warna yang cocok untuk dua tema, sering kali dengan banyak variabel, dan itu bisa jadi cukup kompleks kalau tidak dirancang dengan baik.

Kalau tidak dipikirkan dari awal, bisa jadi malah merepotkan di kemudian hari.

Next mungkin tutorial memancing 😅  
_See you next time, and keep coding!_

[^1]: [[Bikin Dark Mode Website Tanpa Ribet]]
