---
id: '20250630223952'
title: Mendeklarasikan Variabel Di JavaScript
tags:
  - javascript
  - programming
  - fundamental
  - core-concept
created: 2025-06-30T22:39:52+07:00
updated: 2025-07-10T18:14:04+07:00
---

- Buat nama variabel yang deskriptif
- Gunakan camelCase untuk nama variabel umum
- Rekomendasi gunakan `let` atau `const`
- Sebisanya hindari penggunaan `var`

## Contoh

```javascript
var namaLama = 'ES5' // Function scope (hindari penggunaannya)
let namaModern = 'ES6' // Block scope, bisa diubah
const PI = 3.14 // Block scope, tidak bisa diubah
```

## Penamaan

```javascript
// ❌ Contoh Salah
let 1nama = "John"
let nama-lengkap = "John Doe"
let nama lengkap = "John Doe"

// ✔️ Contoh Benar
let nama = "Jono"
let namaLengkap = "John Doe"
let usia = 25
let isBelajar = true
```

## 🔗 Terkait

- [[20250630124757_alasan_let_dan_const_lebih_direkomendasikan]]
- [[20250630160418_perbedaan_var_let_dan_const]]
- [[20250630121354_alasan_keyword_var_di_javaScript_tidak_direkomendasikan]]
- [[20250621095130_tipe_data_di_javascript]]
- [[Conversation Naming Variabel Di JavaScript]]
- [[20250701030227_kontrol_alur_if_else_di_javascript]]
- [[Looping Di JavaScript]]
