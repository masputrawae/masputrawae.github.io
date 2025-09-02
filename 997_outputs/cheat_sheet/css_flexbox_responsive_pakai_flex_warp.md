---
id: "20250831170411"
title: CSS | Flexbox Responsive Pakai flex-warp
tags:
  - cheat_sheet
  - css
  - flexbox
  - responsive
  - layout
  - column
created: 2025-08-31T17:04:11+07:00
---

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.item {
  flex: 1 1 250px; /* grow, shrink, basis */
  min-width: 200px;
  max-width: 1fr; /* optional */
}
```

## Penjelasan

Item akan otomatis turun ke baris baru kalau tidak muat.
