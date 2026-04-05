---
title: Python - Kumpulan Pesan Error
description: Daftar lengkap pesan kesalahan (error) di bahas pemrograman Python, beserta penjelasannya
tags:
  - python
  - programming
pubDate: 2026-03-28
updatedDate: 2026-03-28
---

**Setiap entri berisi**:

- Nama error
- Contoh pesan asli yang sering keluar
- Penjelasan singkat
- Contoh kode penyebabnya

---

## 1. Error Sintaks & Struktur Dasar

| Error                | Pesan Umum                                                     | Arti                    | Contoh                          |
| -------------------- | -------------------------------------------------------------- | ----------------------- | ------------------------------- |
| **SyntaxError**      | `SyntaxError: invalid syntax`                                  | Salah nulis kode Python | `if True print("ok")`           |
| **IndentationError** | `IndentationError: expected an indented block`                 | Salah spasi/tab         | `if True:\nprint("ok")`         |
| **TabError**         | `TabError: inconsistent use of tabs and spaces in indentation` | Campur tab & spasi      | Kombinasi `\t` dan di satu blok |

---

## 2. Error Variabel & Nama

| Error                 | Pesan                                                                | Arti                              | Contoh              |
| --------------------- | -------------------------------------------------------------------- | --------------------------------- | ------------------- |
| **NameError**         | `NameError: name 'x' is not defined`                                 | Variabel belum dibuat             | `print(x)`          |
| **UnboundLocalError** | `UnboundLocalError: local variable 'x' referenced before assignment` | Variabel dipakai duluan di fungsi |                     |
| **AttributeError**    | `'str' object has no attribute 'append'`                             | Salah panggil metode/atribut      | `"abc".append('x')` |

---

## 3. Error Tipe & Nilai

| Error          | Pesan                                           | Arti                         | Contoh          |
| -------------- | ----------------------------------------------- | ---------------------------- | --------------- |
| **TypeError**  | `can only concatenate str (not "int") to str`   | Gabung string & int          | `"a" + 1`       |
|                | `'int' object is not subscriptable`             | Coba akses indeks dari angka | `5[0]`          |
|                | `'NoneType' object is not iterable`             | `for i in None:`             |                 |
| **ValueError** | `invalid literal for int() with base 10: 'abc'` | Konversi nilai tak valid     | `int('abc')`    |
|                | `too many values to unpack (expected 2)`        | Destruktur salah             | `a,b = [1,2,3]` |

---

## 4. Error Koleksi Data (List, Dict, Set)

| Error             | Pesan                     | Arti                          | Contoh                  |
| ----------------- | ------------------------- | ----------------------------- | ----------------------- |
| **IndexError**    | `list index out of range` | Akses list di luar panjangnya | `[1,2,3][5]`            |
| **KeyError**      | `KeyError: 'username'`    | Key tak ada di dict           | `d = {}; print(d['x'])` |
| **StopIteration** | `StopIteration`           | Iterator sudah habis          | `next(iter([]))`        |

---

## 5. Error Aritmatika

| Error                  | Pesan                                     | Arti                        | Contoh                                |
| ---------------------- | ----------------------------------------- | --------------------------- | ------------------------------------- |
| **ZeroDivisionError**  | `division by zero`                        | Bagi dengan nol             | `1/0`                                 |
| **OverflowError**      | `OverflowError: (34, 'Result too large')` | Hasil operasi terlalu besar | `math.exp(1000)`                      |
| **FloatingPointError** | `FloatingPointError: division by zero`    | Kesalahan numerik (jarang)  | Set `np.seterr(all='raise')` di NumPy |

---

## 6. Error File & Sistem

| Error                  | Pesan                                             | Arti                    | Contoh                      |
| ---------------------- | ------------------------------------------------- | ----------------------- | --------------------------- |
| **FileNotFoundError**  | `[Errno 2] No such file or directory: 'file.txt'` | File tidak ada          | `open('tidakada.txt')`      |
| **PermissionError**    | `[Errno 13] Permission denied`                    | Tidak punya izin        | `open('/root/secret.txt')`  |
| **IsADirectoryError**  | `[Errno 21] Is a directory`                       | File ternyata direktori | `open('/')`                 |
| **NotADirectoryError** | `[Errno 20] Not a directory`                      | Jalur bukan direktori   | `open('file.txt/test')`     |
| **OSError**            | `[Errno 28] No space left on device`              | Masalah OS umum         | Disk penuh, file rusak, dsb |

---

## 7. Error Jaringan & Proses

| Error                 | Pesan                                              | Arti                       | Contoh                        |
| --------------------- | -------------------------------------------------- | -------------------------- | ----------------------------- |
| **ConnectionError**   | `Failed to establish a new connection`             | Tidak bisa konek ke server | requests                      |
| **TimeoutError**      | `[Errno 110] Connection timed out`                 | Waktu tunggu habis         | socket timeout                |
| **BrokenPipeError**   | `[Errno 32] Broken pipe`                           | Koneksi terputus           | kirim data ke socket tertutup |
| **ChildProcessError** | `ChildProcessError: [Errno 10] No child processes` | Subproses gagal dikelola   | multiprocessing error         |

---

## 8. Error Data & Parsing

| Error                  | Pesan                                       | Arti                                         | Contoh           |
| ---------------------- | ------------------------------------------- | -------------------------------------------- | ---------------- |
| **JSONDecodeError**    | `Expecting value: line 1 column 1 (char 0)` | JSON kosong / rusak                          | `json.loads('')` |
| **UnicodeEncodeError** | `'ascii' codec can't encode character`      | Encoding tidak mendukung karakter            |                  |
| **UnicodeDecodeError** | `'utf-8' codec can't decode byte 0xff`      | Baca file encoding beda                      |                  |
| **EOFError**           | `EOF when reading a line`                   | `input()` tanpa input di mode non-interaktif |                  |

---

## 9. Error Eksekusi & Internal

| Error                   | Pesan                                            | Arti                            | Contoh          |
| ----------------------- | ------------------------------------------------ | ------------------------------- | --------------- |
| **RuntimeError**        | `RuntimeError: maximum recursion depth exceeded` | Loop rekursif tanpa henti       |                 |
| **RecursionError**      | (sama seperti di atas)                           |                                 |                 |
| **AssertionError**      | `AssertionError`                                 | `assert` gagal                  | `assert 2+2==5` |
| **ImportError**         | `cannot import name 'x' from 'module'`           | Nama salah di `from` import     |                 |
| **ModuleNotFoundError** | `No module named 'numpy'`                        | Modul belum diinstal            |                 |
| **SystemExit**          | `SystemExit`                                     | Program keluar via `sys.exit()` |                 |
| **KeyboardInterrupt**   | `KeyboardInterrupt`                              | Ditekan Ctrl+C di terminal      |                 |

---

## 10. Error Khusus (Jarang Tapi Muncul di Proyek Nyata)

| Error                                  | Pesan                                              | Kapan Muncul                |
| -------------------------------------- | -------------------------------------------------- | --------------------------- |
| **NotImplementedError**                | `Subclass must implement abstract method`          | Di class abstract           |
| **DeprecationWarning** _(bukan error)_ | `DeprecationWarning: function xyz() is deprecated` | Fitur lama                  |
| **MemoryError**                        | `MemoryError`                                      | RAM habis (loop/data besar) |
| **ArithmeticError**                    | (induk dari ZeroDivision, Overflow)                | Operasi matematik gagal     |
| **LookupError**                        | (induk dari IndexError, KeyError)                  | Pencarian gagal             |
| **ReferenceError**                     | `weakly-referenced object no longer exists`        | WeakRef sudah dihapus       |

---

## Tips Debug Cepat

1. Tambahkan:

   ```python
   import traceback
   traceback.print_exc()
   ```

   → buat nampilin baris error lengkap.

2. Kalau kamu mau tahu semua error bawaan Python:

   ```python
   print([x for x in dir(__builtins__) if x.endswith("Error")])
   ```
