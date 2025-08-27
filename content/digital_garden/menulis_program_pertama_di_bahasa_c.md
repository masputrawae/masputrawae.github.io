---
id: "20250812232059"
title: Menulis Program Pertama Di Bahasa C
stage:
  - Seedling
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
#include <stdio.h>               // Library standar untuk input-output

int main() {                     // Fungsi utama, titik awal eksekusi program
    printf("Hello, World!\n");   // Perintah untuk menampilkan teks
    return 0;                    // Mengembalikan nilai 0 artinya program selesai normal
}
```

## Penjelasan

1. `#include <stdio.h>`

	- `#include` adalah _preprocessor directive_.
	- `stdio.h` adalah library standar berisi fungsi input/output seperti printf dan scanf.
	- Tanpa ini, compiler tidak akan tahu apa itu printf.

2. `int main()`

	- `main()` adalah fungsi utama. Semua program C selalu mulai dari sini.
	- `int` artinya fungsi `main` akan mengembalikan bilangan bulat (_integer_) ke sistem.
	- nilai `return 0;` artinya "Program berjalan sukses".

3. `printf("Hello, World!\n");`

	- `printf` adalah fungsi untuk mencetak teks ke layar.
	- `\n` adalah _newline character_ -> pindah baris setelah teks.

4. `return 0;`

	- Memberi tahu sistem bahwa program selesai dan status sukses.
	- kalau `return`, selain 0 biasanya dianggap error.

**Simpan**

```vim
:wq
```

## Compile program

```bash
ggc hello.c -o hello
```

**Jalankan**

```bash
./hello
```
