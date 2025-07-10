---
id: "20250628211305"
title: Else If Statement Di JavaScript
tags:
  - javascript
  - programming
  - fundamental
created: 2025-06-28T21:13:05+07:00
updated: 2025-07-10T17:49:18+07:00
---

Lanjutan dari [[If Statement Di JavaScript]]

Untuk membuat alur yang lebih kompleks, Kita bisa gunakan else if (jika tidak) atau else (kalau tidak) misalnya:

```javascript
const nilai = 70

if (nilai > 90) {
  console.log('Great A')
} else if (nilai > 70) {
  console.log('Great B')
} else {
  console.log('Great C')
}
```

**Penjelasannya**:

- Jika nilai lebih dari 90 maka cetak Great A
- Jika tidak, apakah nilai lebih dari 70?, jika iya cetak Great B
- Jika tidak sama sekali makan cetak Great C

else sebagai kondisi akhir jika kondisi diatasnya tidak ada yang terpenuhi.
untuk operator perbandingan bisa lihat 👉 [[Operator Perbandingan Di JavaScript]]

**Terkait**:

- [[Switch Statement Di JavaScript]]
- [[Operator Perbandingan Di JavaScript]]
- [[Ternary Operator Di JavaScript]]
- [[20250628212840_contoh_pengkondisian_yang_lebih_kompleks_di_javascript]]
