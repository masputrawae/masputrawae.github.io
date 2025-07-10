---
id: '20250701054353'
title: Ternary Operator Di JavaScript
tags:
  - javascript
  - programming
  - fundamental
created: 2025-07-01T05:43:53+07:00
updated: 2025-07-10T18:19:17+07:00
---

- Cara ringkasan menulis kondisi dalam satu baris
- Cocok untuk kondisi yang hanya sedikit pernyataan
- Sering dipakai nanti ketika memakai framework seperti vue, react dll

# Syntax

```javascript
kondisi ? aksi_1 : aksi_2
```

## Contoh penggunaan

```javascript
const isLoggedIn = true
const userName = 'John Doe'

console.log(isLoggedIn ? userName : 'Not a John')
```

Jika menggunakan if else biasa, akan seperti ini

```javascript
const isLoggedIn = true
const userName = 'John Doe'

if (isLoggedIn) {
	console.log(userName)
} else {
	console.log('Not a John')
}
```

## 🔗 Terkait

- [[20250701030227_kontrol_alur_if_else_di_javascript]]
- [[20250628171342_operator_perbandingan_di_javascript]]
- [[20250627161909_logical_or_operator_di_javascript]]
- [[20250627165415_logical_and_operator_di_javascript]]
