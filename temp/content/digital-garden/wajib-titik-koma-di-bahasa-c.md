---
id: "202508052232"
title: Wajib Titik Koma di bahasa C
stage:
  - Seedlings
tags:
  - language
  - programming
  - c
created: 2025-08-05T22:32:34+07:00
updated: 2025-08-06T11:28:55+07:00
---

Di dalam bahasa C, titik koma itu wajib. Contoh

```c
int x = 10;
printf("Nilai x: %d\n", x);
```

Kalau lupa

```c
int x = 10
printf("Nilai x: %d\n", x);
```

Maka saat di-_compile_, akan muncul error seperti ini

```bash
error: expected ‘;’ before ‘printf’
```
