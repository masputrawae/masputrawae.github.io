---
title: Python - Table Tipe Data Lengkap
description: Daftar lengkap jenis jenis tipe data di bahasa pemrograman Python
tags:
  - python
  - programming
  - data_type
pubDate: 2026-03-28
updatedDate: 2026-03-28
---

| Grouping        | Data Type                          |
| --------------- | ---------------------------------- |
| Text Type:      | `str`                              |
| Numeric Types:  | `int`, `float`, `complex`          |
| Sequence Types: | `list`, `tuple`, `range`           |
| Mapping Type:   | `dict`                             |
| Set Types:      | `set`, `frozenset`                 |
| Boolean Type:   | `bool`                             |
| Binary Types:   | `bytes`, `bytearray`, `memoryview` |
| None Type:      | `NoneType`                         |

## Setting the Data Type

Dalam Python, tipe data ditetapkan saat Anda menetapkan nilai ke variabel:

| Example                                        | Data Type  |
| ---------------------------------------------- | ---------- |
| `x = "Hello World"`                            | str        |
| `x = 20`                                       | int        |
| `x = 20.5`                                     | float      |
| `x = 1j`                                       | complex    |
| `x = ["apple", "banana", "cherry"]`            | list       |
| `x = ("apple", "banana", "cherry")`            | tuple      |
| `x = range(6)`                                 | range      |
| `x = {"name" : "John", "age" : 36}`            | dict       |
| `x = {"apple", "banana", "cherry"}`            | set        |
| `x = frozenset({"apple", "banana", "cherry"})` | frozenset  |
| `x = True`                                     | bool       |
| `x = b"Hello"`                                 | bytes      |
| `x = bytearray(5)`                             | bytearray  |
| `x = memoryview(bytes(5))`                     | memoryview |
| `x = None`                                     | NoneType   |

## Setting the Specific Data Type

Jika ingin menentukan tipe data, kita dapat menggunakan fungsi berikut:

| Example                                        | Data Type  |
| ---------------------------------------------- | ---------- |
| `x = str("Hello World")`                       | str        |
| `x = int(20)`                                  | int        |
| `x = float(20.5)`                              | float      |
| `x = complex(1j)`                              | complex    |
| `x = list(("apple", "banana", "cherry"))`      | list       |
| `x = tuple(("apple", "banana", "cherry"))`     | tuple      |
| `x = range(6)`                                 | range      |
| `x = dict(name="John", age=36)`                | dict       |
| `x = set(("apple", "banana", "cherry"))`       | set        |
| `x = frozenset(("apple", "banana", "cherry"))` | frozenset  |
| `x = bool(5)`                                  | bool       |
| `x = bytes(5)`                                 | bytes      |
| `x = bytearray(5)`                             | bytearray  |
| `x = memoryview(bytes(5))`                     | memoryview |
