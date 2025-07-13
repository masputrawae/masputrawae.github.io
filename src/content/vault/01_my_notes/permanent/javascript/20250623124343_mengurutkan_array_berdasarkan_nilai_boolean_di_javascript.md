---
id: '20250623124343'
title: Mengurutkan Array Berdasarkan Nilai Boolean Di JavaScript
tags:
  - javascript
  - programming
  - intermediate
created: 2025-06-23T12:43:43+07:00
updated: 2025-07-10T18:15:30+07:00
---

```javascript
const items = [
	{ name: 'Item A', featured: false },
	{ name: 'Item B', featured: true },
	{ name: 'Item C', featured: false },
	{ name: 'Item D', featured: true }
]

// Urutkan featured: true dulu, lalu false
items.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))

console.log(items)
```

### Penjelasan singkat:

- `(a.featured === b.featured) ? 0` → kalau sama, urutan tidak berubah.
- `a.featured ? -1 : 1` → kalau `a.featured` itu `true`, maka `a` akan ditempatkan **sebelum** `b`.

### Hasil:

```js
;[
	{ name: 'Item B', featured: true },
	{ name: 'Item D', featured: true },
	{ name: 'Item A', featured: false },
	{ name: 'Item C', featured: false }
]
```

Kalau mau `false` dulu baru `true`, tinggal balik urutannya jadi:

```js
items.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? 1 : -1))
```

**Terkait**:

- [[Mengurutkan Array Object Berdasarkan Tanggal]]
- [[20250630113534_fungsi_map_di_javascript]]
- [[20250629175251_fungsi_filter_di_javascrip]]
- [[Fungsi reduce Di JavaScript]]
- [[Contoh penggunaan map filter dan reduce Di JavaScript]]
