---
id: "20250830171635"
title: Custom Radio dengan Input di Bawah di HTML
tags:
  - cheat_sheet
  - html
  - javascript
  - css
created: 2025-08-30T17:16:35+07:00
---

```html
<!DOCTYPE html>  
<html lang="id">  
<head>  
<meta charset="UTF-8">  
<meta name="viewport" content="width=device-width, initial-scale=1.0">  
<title>Custom Radio dengan Input di Bawah</title>  
<style>  
  body {  
    font-family: sans-serif;  
    padding: 20px;  
  }

  header {  
    margin-bottom: 40px;  
  }

  /* Label sebagai tombol custom */  
  .custom-radio {  
    display: inline-block;  
    padding: 10px 20px;  
    margin-right: 10px;  
    border: 2px solid #666;  
    border-radius: 8px;  
    cursor: pointer;  
    transition: all 0.2s;  
    user-select: none;  
  }

  /* Style saat aktif */  
  .custom-radio.checked {  
    background-color: #4CAF50;  
    color: white;  
    border-color: #4CAF50;  
  }

  /* Input radio asli disembunyikan */  
  input[type="radio"] {  
    display: none;  
  }  
</style>  
</head>  
<body>

<header>  
  <label for="opt1" class="custom-radio">Option 1</label>  
  <label for="opt2" class="custom-radio">Option 2</label>  
  <label for="opt3" class="custom-radio">Option 3</label>  
</header>

<main>  
  <p>Konten lain di halaman...</p>  
</main>

<!-- Input radio asli di bawah -->  
<input type="radio" id="opt1" name="choice" value="1">  
<input type="radio" id="opt2" name="choice" value="2">  
<input type="radio" id="opt3" name="choice" value="3">

<script>  
  const labels = document.querySelectorAll('.custom-radio');  
  labels.forEach(label => {  
    label.addEventListener('click', () => {  
      // Hapus class checked dari semua label  
      labels.forEach(l => l.classList.remove('checked'));  
      // Tambahkan class checked ke label yang diklik  
      label.classList.add('checked');  
    });  
  });  
</script>

</body>  
</html>
```

## Penjelasan

Fitur yang didapat dari contoh ini:

- Label bisa di header, input radio di bawah.
- Tetap semantik karena label pakai for → id.
- Style “checked” bisa berubah saat diklik menggunakan JS.
- Input radio asli tetap akan bekerja untuk form atau JS lain.
