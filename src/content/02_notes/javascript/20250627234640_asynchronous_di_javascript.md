---
id: '20250627234640'
title: Asynchronous Di JavaScript
tags:
  - javascript
  - fundamental
  - programming
created: 2025-06-27T23:46:40+07:00
updated: 2025-07-10T17:45:01+07:00
---

Secara sederhana kode tidak berjalan sesuai urutan dari atas ke bawah, tanpa menunggu kode selesai di jalankan

Kenapa ini penting?. Bayangkan ada satu proses yang mengambil data API dari server, tidak mungkin langsung datang, normal nya harus menunggu 200 ms, dan kalau tanpa Asynchronous maka kode lain akan gagal di eksekusi karena terhambat satu proses saat mengambil API dari server

---

**Terkait**:

- [[20250628065020_async_await_di_javascript]]
- [[20250628070829_promise_di_javascript]]
- [[20250628071334_callback_function_di_javascript]]
- [[Praktik Mengambil Data Dari API Public Dengan JavaScript]]
