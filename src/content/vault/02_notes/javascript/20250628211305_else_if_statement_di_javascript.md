---
id: '20250628211305'
title: Else If Statement Di JavaScript
tags:
  - javascript
  - programming
  - fundamental
created: 2025-06-28T21:13:05+07:00
updated: 2025-07-10T17:49:18+07:00
---

Lanjutan dari [[20250628205351_if_statement_di_javascript]]

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
untuk operator perbandingan bisa lihat 👉 [[20250628171342_operator_perbandingan_di_javascript]]

**Terkait**:

- [[Switch Statement Di JavaScript]]
- [[20250628171342_operator_perbandingan_di_javascript]]
- [[20250701054353_ternary_operator_di_javascript]]
- [[20250628212840_contoh_pengkondisian_yang_lebih_kompleks_di_javascript]]
