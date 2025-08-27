---
id: "20250827003843"
title: Kode Sumber
stage:
  - Seedling
tags:
  - source_code
  - programming
created: 2025-08-27T00:38:43+07:00
updated: 2025-08-27T00:38:43+07:00
---

**Kode sumber** (*source code*) adalah kumpulan instruksi yang ditulis dengan bahasa pemrograman agar dapat dibaca manusia, sebelum dijalankan komputer melalui *kompilator* (contoh: C, Go) atau *interpreter* (contoh: Python, JavaScript).

## Contoh Kode

```javascript
/*!
 * Simple Hello Button
 * @version 1.0.0
 * @author John Doe
 */

// Variabel
var name = "John Doe";
var button = document.getElementById('clickButton');

// Fungsi untuk menampilkan pesan
function sayHello() {
  alert(`Hello ${name}`);
};

// Jalankan fungsi saat tombol diklik
button.addEventListener('click', sayHello);
```

## Bagian dari Kode Sumber

Dari contoh di atas, kita bisa melihat bahwa kode sumber tidak hanya berisi instruksi:

- Instruksi → `alert(...)`
- Deklarasi variabel → `var name = "John Doe";`
- Fungsi → `function sayHello() { ... }`
- Komentar → `/*! ... */` dan `//`

Kode sumber biasanya ditulis agar mudah dimengerti manusia, meski yang menjalankan akhirnya adalah mesin.
