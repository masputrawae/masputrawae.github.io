---
id: '20250630160418'
title: Perbedaan var let dan const
tags:
  - javascript
  - programming
  - fundamental
created: 2025-06-30T16:04:18+07:00
updated: 2025-07-10T18:16:47+07:00
---

## 🌏 Scope (cakupan)

- `var` memiliki cakupan function dan global, tidak memiliki cakupan blok atau block scope
- `let` dan `const` memiliki function scope dan block scope you ditandai dengan `{}` dan hanya bisa diakses di dalam block variabel nya saja

## ⤴️ Hoisting

- `var` mendukung Hoisting, tetapi akan di inisialisasi sebagai `undefined` (yang artinya jika dipanggil sebelum dideklarasikan maka menghasilkan undefined)
- `let` dan `const` juga mendukung Hoisting, cuma tidak di inisialisasi `undefined`, maka ketika variabel di panggil sebelum dideklarasikan akan menghasilkan `ReferenceError`

## 📝 Mutabilitas (memungkinkan untuk diubah)

- `var` bisa diubah setelah dideklarasikan, bahkan bisa dideklarasikan ulang dalam cakupan yang sama
- `let` bisa diubah isinya namun tidak bisa dideklarasikan ulang pada cakupan yang sama
- `const` konstan, tidak bisa diubah, ataupun di deklarasikan ulang (sesuai namanya)

## 🔗 Terkait

- [[20250630121354_alasan_keyword_var_di_javaScript_tidak_direkomendasikan]]
- [[Apa Itu Hoisting]]
- [[20250630162416_jenis_jenis_scope_di_javascript]]
- [[20250701115833_perilaku_var_let_dan_const_di_javascript]]
