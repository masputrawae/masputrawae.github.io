---
unique_Id: "20250612040535"
title: Perbedaan const let dan var Di JavaScript
tags:
  - javascript
  - variable
date: 2025-06-12T04:05:35+07:00
---

# Perbedaan const let dan var Di JavaScript

Perilaku Jika Pakai `let`

- block scope -> `{...}`
- bisa diubah nilainya
- Redeclare di blok -> Membuat variabel baru
- Keamanan nama -> Lebih aman dari bentrok

Perilaku Jika Pakai `var`

- function scope, mengabaikan -> `{..}`
- bisa diubah juga nilainya
- Redeclare di blok -> Menimpa variabel lama
- Keamanan nama -> Rentan bentrok

Perilaku Jika Pakai `const`

- block scope `{..}`
- tidak bisa diubah nilainya setelah di deklarasikan

---

Contoh dengan `let`

```javascript
let angka = 10;
{
	let angka = 20;
	console.log(angka);
}
console.log(angka);

// Output
// 20
// 10
```

Contoh dengan `var`

```javascript
var angka = 10;
{
	var angka = 20;
	console.log(angka);
}
console.log(angka);

// Output
// 20
// 20
```

Contoh dengan `const`

```javascript
const angka = 10;
angka = 20;

console.log(angka);

// Output
// Error: Assignment to constant variable.
```
