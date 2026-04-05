---
title: JavaScript - prefers-color-scheme
description: Penggunaan prefers-color-scheme untuk membuat tema gelap dan terang dengan javascript
tags:
  - javascript
  - programming
pubDate: 2026-03-28
updatedDate: 2026-03-28
---

Ada 3 pilihan, yaitu menggunakan JavaScript, CSS, ataupun keduanya. Bisa dikombinasikan dengan media query di CSS dan JavaScript secara bersamaan, untuk dukungan yang lebih luas, atau jika ingin menggunakan kombinasi toggle atau lebih dari 2 tema.

## Javascript

```css
:root[data-theme='light'] {
  --text-color: #000000;
  --bg-color: #ffffff;
}

:root[data-theme='dark'] {
  --text-color: #ffffff;
  --bg-color: #000000;
}

html {
  background-color: var(--bg-color);
  color: var(--text-color);
}
```

```javascript
// Fungsi utama
function main() {
  // Tag <html>
  const elm = document.documentElement

  // Media query
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  // Fungsi untuk menerapkan tema
  const apply = () => {
    // Ambil tema yang sesuai
    const theme = mediaQuery.matches ? 'dark' : 'light'

    // Terapkan tema (bisa pakai attribute data)
    elm.setAttribute('data-theme', theme)
  }

  // Memantau perubahan
  mediaQuery.addEventListener('change', () => {
    // Ubah tema
    apply()
  })

  // Inisialisasi tema
  apply()
}

// Jalankan fungsi utama
main()
```

## Css Only

Bisa juga tanpa menggunakan javascript sama sekali, cukup dengan mengandalkan css

```css
:root {
  --text-color: #000000;
  --bg-color: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #ffffff;
    --bg-color: #000000;
  }
}

html {
  background-color: var(--bg-color);
  color: var(--text-color);
}
```
