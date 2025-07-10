---
id: '20250630124757'
title: Alasan let Dan const Lebih Direkomendasikan
tags:
  - javascript
  - programming
  - fundamental
created: 2025-06-30T12:47:57+07:00
updated: 2025-07-10T17:41:57+07:00
---

- Mengatasi kasus Hoisting
- Lebih modern
- Block Scope (yang tidak dimiliki oleh var)
- Tidak bisa replace atau dideklarasikan ulang

## 🔍 Contoh Kelebihan nya

### 🚨 Mengatasi Hoisting

```javascript
console.log(a)

let a = 10
// Output:
// Uncaught ReferenceError: Cannot access 'a' before initialization
```

Lebih jelas daripada hanya `Undefined`

### 🔒 Block Scope

```javascript
{
	let a = 10
	console.log(a)
}
console.log(a)

// Output:
// 10
// Uncaught ReferenceError: a is not defined
```

### 📝 Tidak bisa replace atau dideklarasikan ulang

```javascript
let nama = 'John Doe'
console.log(nama)

let nama = 'Smith'
console.log(nama)

// Output:
// Uncaught SyntaxError: Identifier 'nama' has already been declared
```

## 🔗 Terkait

- [[20250630121354_alasan_keyword_var_di_javaScript_tidak_direkomendasikan]]
- [[20250630162416_jenis_jenis_scope_di_javascript]]
- [[Apa Itu Hoisting]]
- [[20250630160418_perbedaan_var_let_dan_const]]
