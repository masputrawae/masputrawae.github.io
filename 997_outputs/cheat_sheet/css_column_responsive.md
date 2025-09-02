---
id: "20250831170024"
title: CSS | Column Responsive
tags:
  - cheat_sheet
  - css
  - layout
  - responsive
  - column
created: 2025-08-31T17:00:24+07:00
---

```css
.container {
  column-width: 250px;
  column-gap: 1rem;
}

.item {
  background: #ddd;
  display: inline-block;
  width: 100%;
  margin: 0 0 1rem;
}
```

## Penjelasan

- `column-width: 250px;` → browser berusaha bikin kolom selebar itu.
- Jumlah kolom otomatis tergantung ruang.
- Tapi ingat: urutan konten dibagi ke bawah (column flow), bukan baris dulu seperti grid.
