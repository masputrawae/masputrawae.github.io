---
id: '20250612114841'
title: Percabangan Di Python
tags:
  - python
  - programming
  - fundamental
created: 2025-06-12T11:48:41+07:00
updated: 2025-07-10T18:24:24+07:00
---

Membuat percabangan menggunakan `if`, `elif`, dan `else`.
Contoh:

```python
jalan = True

if jalan == True:
    print("Sedang Jalan")
else:
    print("Tidak Jalan")
```

Penjelasannya:
Cek apakah jalan bernilai benar/`True` jika iya eksekusi `print("Sedang Jalan")` jika tidak maka akan mengeksekusi `print("Tidak Jalan")`.

Contoh lain:

```python
nilai = 75

if nilai >= 95:
    print("Great A")
elif nilai >= 75:
    print("Great B")
elif nilai >= 60:
    print("Great C")
else:
    print("Great D")
```

Penjelasannya:
Secara sederhananya kondisi ini akan mencocokkan nilai dengan perbandingan lebih dari sama dengan `>=`, dan akan menyesuaikan sesuai kondisi nya, jika kode tersebut ditulis secara lebih detail mungkin akan seperti ini:

- Cek nilai, apakah lebih besar atau sama dengan 95?, jika iya
  - Tampilkan Great A
- Jika tidak, apakah lebih besar atau sama dengan 75, jika iya
  - Tampilkan Great B
- Jika tidak, apakah lebih besar atau sama dengan 60, jika iya
  - Tampilkan Great C
- Jika tidak ada satupun Kondisi di atas
  - Tampilkan Great D

## 🔗 Terkait

- [[20250630104722_operator_perbandingan_di_python]]
- [[20250612114301_operasi_aritmatika_di_python]]
- [[Function Di Python]]
