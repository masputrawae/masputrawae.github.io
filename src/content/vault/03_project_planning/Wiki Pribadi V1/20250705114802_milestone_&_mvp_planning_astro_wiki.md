---
id: '20250705114802'
title: Milestone & MVP Planning Astro Wiki
tags:
  - astro-js
created: 2025-07-05T11:48:02+07:00
updated: 2025-07-10T18:28:43+07:00
---

🎯 Target: V 1.0.0 selesai dalam 3 hari
Fokus halaman utama + pola slug 4 halaman dasar, rapi & berfungsi.
Styling lanjutan & plugin non-krusial dikerjakan bila waktu memungkinkan.

---

## 📅 Timeline Harian

### ✅ Hari 1: Setup & Struktur Dasar

🎯 Tujuan: Semua environment ter-setup, struktur direktori rapi, layout dasar siap.

#### 1️⃣ Install & Setup

- [x] Astro
- [x] TailwindCSS + Typography plugin
- [x] MDX
- [x] Pagefind
- [x] Astro Icons
- [x] Prettier
- [x] Remark Wikilinks (+ plugin pendukung)

#### 2️⃣ Struktur Direktori

- [x] Buat components/, layouts/, pages/, content/
- [x] Setup Prettier + penamaan file konsisten

#### 3️⃣ Layout Dasar

- [x] Header, footer, sidebar kasar (belum styling penuh)
- [x] Setup content collection + dummy konten
- [x] Cek build & dev server berjalan

---

### ✅ Hari 2: Routing & Slug

🎯 Tujuan: Routing pola 4 halaman dasar berjalan stabil dengan dynamic routing Astro.

#### 1️⃣ Buat pola slug untuk:

- [x] /Main/content/
- [x] /Source/content/
- [x] /Talk/content/
- [x] /History/content/

#### 2️⃣ Implementasi File Routing:

- [x] pages/Main/[...slug].astro
- [x] pages/Source/[...source].astro
- [x] pages/Talk/[...discussion].astro
- [x] pages/History/[...history].astro

#### 3️⃣ Testing:

- [x] Cek setiap dynamic routing bisa fetch konten dari content collection dummy
- [x] Validasi error handling bila slug tidak ditemukan

---

### ✅ Hari 3: Navigasi & Polishing

🎯 Tujuan: Navigasi berfungsi, halaman bersih, styling dasar layak tayang.

#### 1️⃣ Navigasi Sidebar:

- [x] Logo + Judul
- [x] Link ke: Home, Recent Changes, Random Page, About Us
- [x] Social Links
- [x] Opsi beberapa menu tambahan lewat config

#### 2️⃣ Implementasi:

- [x] Setup Remark Wikilinks agar auto internal linking
- [x] Styling dasar Tailwind: Heading, paragraph, blockquote, list Spacing & warna konsisten
- [x] Cek URL slug sesuai pola
- [x] Tes navigasi antar halaman

#### 3️⃣ Testing Build:

- [x] astro build dan astro preview
- [x] Pastikan halaman berfungsi di build environment

---

### ✅ Checklist Pencapaian V 1.0.0

- [x] Semua dependency terpasang
- [x] Struktur direktori rapi
- [x] Layout dasar selesai
- [x] Routing pola slug 4 halaman selesai
- [x] Sidebar navigasi selesai
- [x] Wikilinks berfungsi
- [x] Styling dasar rapih
- [x] Bisa build dan preview dengan halaman berfungsi

---

🚦 Setelah V 1.0.0

Jika selesai lebih cepat dari 3 hari, lanjut:

- [x] Setup Pagefind untuk local search
- [x] Styling lanjutan (dark mode, responsive improvements)
- [x] Setup CI/CD (Netlify, Vercel, GitHub Actions, atau GitHub Pages)

---

🗂️ Tips Eksekusi

- ✅ Gunakan Git branch mvp-v1 khusus milestone ini.
- ✅ Catat progres per hari dalam Notion atau Obsidian untuk tracking.
- ✅ Bila stuck plugin/slug, prioritaskan halaman dasar jalan dulu.
- ✅ Pastikan push ke repo setiap selesai task kecil agar aman rollback.

---
