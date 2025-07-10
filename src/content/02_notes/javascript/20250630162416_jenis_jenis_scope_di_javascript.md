---
id: '20250630162416'
title: Jenis Jenis Scope Di JavaScript
tags:
  - javascript
  - programming
  - fundamental
created: 2025-06-30T16:24:16+07:00
updated: 2025-07-10T18:09:12+07:00
---

## 🌏 Global Scope

Cakupan global yang bisa diakses dari mana saja
**Contoh**:

```javascript
var a = 'Aku Di Global'

console.log('Dari Global: ', a)

function functionScope() {
	console.log('Dari Function: ', a)
}

{
	console.log('Dari Block: ', a)
}

functionScope()
```

## 🤖 Function Scope

Variabel yang dideklarasikan di dalam function Hanya bisa di akses di dalam function saja

```javascript
function hanyaFungsi() {
	let a = 'Aku Berada Di Function'
	console.log('Dari Function: ', a)
}
hanyaFungsi()
// Output: Dari Function: Aku Berada Di Function

console.log('Dari Luar Function: ', a)
// Output: Uncaught ReferenceError: a is not defined
```

## 🔒 Block scope

Scope yang dikurung oleh `{}` akan terisolasi di dalam block scope tersebut

**Contoh**:

```javascript
{
	let a = 'Aku Dari Blok Scope'
	console.log('Dari Block Scope: ', a)
	// Output: Dari Block Scope: Aku Berada Di Block Scope
}

console.log('Dari Luar Block Scope: ', a)
// Output: Uncaught ReferenceError: a is not defined
```

> [!important]+
> `var` tidak mendukung block scope, jadi walaupun di deklarasikan di dalam blok scope tetap bisa di akses dari luar (karakteristik `var` global Scope)

## 🔗 Terkait

- [[20250630160418_perbedaan_var_let_dan_const]]
- [[20250630124757_alasan_let_dan_const_lebih_direkomendasikan]]
- [[20250630121354_alasan_keyword_var_di_javaScript_tidak_direkomendasikan]]
- [[Return Di JavaScript]]
- [[20250630165318_function_di_javascript]]
