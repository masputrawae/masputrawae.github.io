---
id: '20250710010121'
title: Memikirkan Rancangan System
tags:
  - astro-js
  - hugo
created: 2025-07-10T01:01:21+07:00
updated: 2025-07-05T11:48:02+07:00
---

Setelah meninjau kembali proyek [[20250705114802_milestone_&_mvp_planning_astro_wiki]] Sempat berfikir tentang tantangan performa yang dihadapi untuk kedepannya

**Pertanyaan**:

- Apakah mampu generate ribuan markdown?
- Apakah mampu untuk dijalankan dengan [[20250710010556_script_untuk_ambil_data_di_git_dengan_javascript]] untuk menampilkan historis pada setiap konten

Disini mulai bimbang dengan performa di masa mendatang

**Alternatif**:

- Berpindah ke hugo
- Tetap di astro pakai mode ssr

**Kendala Jika Pakai Hugo**:

- Templating agak rumit (tapi tidak masalah bisa dipelajari sedikit demi sedikit)
- Susah mengintegrasikan agar support link style wiki

**Alasan Hugo Lebih Masuk Akal**

- Performa Build yang sangat cepat (bahkan ribuan markdown)
- Taxonomy untuk pengelompokkan konten yang mudah
- Tidak ketergantungan terhadap package node

**Kesimpulan**
Sekarang belum ada kendala pada performa build, cuma kebimbangan kalau di masa mendatang jika file markdown banyak bisa semakin lama untuk generate nya.
