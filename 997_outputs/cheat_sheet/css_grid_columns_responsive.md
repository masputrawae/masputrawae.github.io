---
id: "20250831165610"
title: CSS | Grid Columns Responsive
tags:
  - cheat_sheet
  - css
  - layout
  - grid
  - column
  - responsive
created: 2025-08-31T16:56:10+07:00
---

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.item {
  background: #eee;
  padding: 1rem;
  border-radius: 8px;
}
```

## Penjelasan

- `auto-fit` → kolom akan collapse kalau tidak cukup ruang.
- `minmax(200px, 1fr)` → lebar kolom minimal 200px, tapi bisa melebar maksimal mengisi baris.
- Jadi jumlah kolom otomatis berubah sesuai lebar layar, tanpa butuh breakpoint.