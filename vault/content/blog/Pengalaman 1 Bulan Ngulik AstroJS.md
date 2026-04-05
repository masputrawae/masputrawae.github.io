---
title: Pengalaman 1 Bulan Ngulik AstroJS
description: Pengalaman pribadi ku ketika iseng cobain AstroJS, dan perbedaan antara Hugo dan Astro dari sudut pandang ku.
tags:
  - ssg
  - astro
  - hugo
  - javascript
pubDate: 2025-12-27T05:51:41+07:00
updatedDate: 2025-12-30T00:36:38+07:00
---

Kemarin sempat membahas tentang [[Satu SSG Yang Keren]] yaitu Astro. Entah kenapa, selama iseng-iseng mencoba bikin blog, rasanya nyaman. Aku juga sempat bilang bahwa kemungkinan besar aku **tidak akan memindahkan website ini dari Hugo ke Astro**, tapi sepertinya sekarang aku mulai berubah pikiran 🤔.

## Alasan kuat ingin migrasi ke Astro

### 1. Clean Markup

Alasan paling spesifik sebenarnya ada di bagian templating. Di Astro, markup terasa lebih bersih (walaupun sebenarnya ini bukan templating tradisional), karena sintaksnya mirip JSX — atau setidaknya bisa dibilang begitu.

Itulah kenapa aku merasa lebih nyaman. Buat orang yang terbiasa dengan React, jujur saja rasanya tidak jauh berbeda 😅.

### 2. Magic of MDX

Alasan lainnya adalah MDX (walaupun sebelumnya aku hampir tidak pernah memakainya). Tapi setelah mencoba MDX di Astro, ternyata cukup enak. Kita bisa menggunakan komponen yang kita buat sendiri langsung di dalam konten.

Kalau di Hugo, konsepnya mirip dengan shortcodes 🤔. Bedanya, di Astro komponen hanya bisa digunakan di MDX, tidak di Markdown biasa.

### 3. TailwindCSS so Beautiful

Ini salah satu alasan yang bikin aku betah. Menulis banyak class Tailwind terasa lebih rapi dengan `class:list`. Aku bisa memisahkan class ke beberapa kelompok, yang jelas sangat membantu dari sisi keterbacaan HTML.

Contohnya:

#### Kasus di Hugo

```html
{{ $primary := true }}

<a 
  href="{{ .Site.Home.Permalink }}"
  class="{{ if $primary }}bg-blue-600 text-white{{ else }}text-black bg-neutral-200 dark:text-white dark:bg-neutral-700{{ end }} inline-flex items-center rounded-md text-lg px-6 py-3"
>
  Home
</a>
````

Jujur, ini agak melelahkan untuk dibaca. Class menumpuk, banyak kurung, dan ini baru kasus sederhana. Kalau sudah lebih kompleks, bisa makin sulit dipahami.

#### Kasus di Astro

```html
---
const isPrimary = true
---

<a
  href="/"
  class:list={[
    isPrimary
      ? "bg-blue-600 text-white"
      : "text-black bg-neutral-200 dark:text-white dark:bg-neutral-700",
    "inline-flex items-center rounded-md text-lg px-6 py-3"
  ]}
>
  Home
</a>
```

Menurutku ini jauh lebih enak dibaca 🤔 (mungkin kalian juga 😅).  
Dan bukan cuma soal ini saja — karena `class:list` berbentuk array, kita bisa mengelompokkan beberapa aturan class tanpa membuat satu baris yang panjang seperti 🐍 ular.

### 4. Image Processing & Responsive

Ini poin penting juga. Untuk mendapatkan performa website yang cepat dan efisien, kita perlu mengoptimalkan aset lain, terutama gambar. Menurutku, gambar adalah salah satu aset yang paling besar kontribusinya terhadap ukuran halaman.

Di Hugo sebenarnya ada image processing juga — bahkan menurutku lebih cepat dan fleksibel. Tapi kita dituntut untuk membuat sendiri solusi gambar responsifnya, dan itu cukup menyebalkan. Lagi-lagi, templating Go terasa terlalu verbose 🥴.

Di Astro, enaknya sudah tersedia komponen bawaan. Saat build, Astro otomatis menghasilkan gambar dengan ukuran dan breakpoint yang sesuai, jadi benar-benar minim ribet.

## Yang tidak sesuai ekspektasiku

Dari semua hal yang aku suka di atas, tentu tidak semuanya sempurna. Ada beberapa fitur di Hugo yang secara nyata belum terasa di Astro.

### 1. Taxonomies & Terms

Jika ingin mengelompokkan konten berdasarkan tag, kategori, series, author, dan sebagainya — di Astro semuanya harus dibuat manual.

Berbeda dengan Hugo, di mana fitur ini adalah salah satu keunggulan utamanya. Kita tidak perlu menyortir atau mengelompokkan konten secara manual karena semuanya sudah otomatis tersedia.

Walaupun di Astro sebenarnya masih cukup mudah untuk dibuat. Buat orang pemalas seperti aku 😅, ini sedikit memberatkan hati.

### 2. Section Pages

Di Hugo, setiap folder di dalam `content/` yang memiliki `_index.md` otomatis menjadi section page. Ini sangat praktis.

Di Astro, kita mengandalkan dynamic routing dan content collection. Walaupun ini terdengar lebih eksplisit dan bahkan lebih rapi — apalagi dengan validasi Zod untuk konsistensi metadata/frontmatter — tetap saja aku harus membuatnya secara manual 😅.

### 3. Build Time

Mungkin ini hanya perasaanku saja, tapi tetap tidak bisa dipungkiri: Hugo masih juara soal build time.

Namun sekarang selisihnya sudah tidak terlalu jauh. Untuk konten yang tidak besar, menurutku perbedaannya hampir tidak terasa — Astro juga tetap cepat.

Dalam kasusku pribadi, ini bukan masalah besar karena kontenku juga belum banyak, jadi masih sangat bisa ditoleransi.

## Kesimpulan

Tidak ada yang benar-benar lebih unggul atau lebih baik secara mutlak. Keduanya memiliki karakteristik, kelebihan, dan kekurangannya masing-masing.

Hugo dan Astro hanyalah alat. Tools yang tepat akan mempermudah pekerjaan, sementara tools yang tidak sesuai justru bisa menyulitkan. Jadi, pemilihan tools sebaiknya berdasarkan **masalah yang ingin diselesaikan**, bukan karena fanatisme.

---

## Related

- [[Satu SSG Yang Keren]]
- [[Kebutuhan vs Keinginan]]
- [[Akhirnya Migrasi ke Astro]]
