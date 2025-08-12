---
id: "202508122320"
title: Menulis Program Pertama Di Bahasa C
stage:
  - Seedlings
tags:
  - programming
  - c
created: 2025-08-12T23:20:59+07:00
updated: 2025-08-12T23:20:59+07:00
---

**Buat File**

```bash
vim hello.c
```

**Isi Dengan**

```c
#include <stdio.h>

int main(){
    printf("Hello, World!\n");
    return 0;
}
```

**Simpan**

```vim
:wq
```

**Compile program**

```bash
ggc hello.c -o hello
```

**Jalankan**

```bash
./hello
```
