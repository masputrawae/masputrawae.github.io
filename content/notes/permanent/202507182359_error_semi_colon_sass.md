---
id: "202507182359"
title: Error semi-colon Sass
tags:
  - error_handling
created: 2025-07-18T23:59:52+07:00
updated: 2025-07-19T13:53:21+07:00
---

Arti error `semi-colon expectedscss(css-semicolonexpected)`, sass atau scss tidak menemukan `;` di akhir baris, atau lupa memberikan penutup baris.

**Contoh**:

```scss
@mixin box {
  width: 100px   // <== di sini lupa titik koma
  height: 100px;
}
```

## Lihat Juga

- [[202507191332_baru_tahu_arti_semi_colon]]