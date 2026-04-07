---
title: Bikin Dark Mode Website Tanpa Ribet
description: Mau bikin dark mode di website? Di sini aku bahas cara paling simpel pakai CSS, sampai yang lebih fleksibel pakai JavaScript.
tags:
  - css
  - javascript
  - html
  - web_development
pubDate: 2026-04-07
updatedDate: 2026-04-08
---

Ada banyak cara yang umum digunakan untuk membuat tema gelap dan terang di sebuah website. Cara-caranya juga tidak terlalu rumit, bahkan bisa tanpa JavaScript. Berikut beberapa cara yang bisa digunakan.

## CSS Only (menggunakan media query)

Cara paling sederhana untuk membuat dua tema (dark & light) pada website adalah menggunakan CSS saja, yaitu dengan memanfaatkan media query. Contohnya seperti berikut:

```css
/* ☀️ Default color, light mode */
:root {
	--background-color: #fff;
	--text-color: #000;
}

/* 🌑 Varian dark mode */
@media (prefers-color-scheme: dark) {
	:root {
		--background-color: #000;
		--text-color: #fff;
	}
}

html {
	background-color: var(--background-color);
	color: var(--text-color);
}
````

Prinsip kerjanya adalah browser otomatis mendeteksi tema pada sistem (OS) yang digunakan, kemudian menerapkannya ke `@media (prefers-color-scheme: dark)` jika tema sistem adalah `dark`. Jadi, di balik layar, browser yang mengatur penggunaan aturan CSS yang sesuai.

Cara ini cukup sederhana dan sudah didukung secara native di banyak browser modern. Namun, metode ini juga memiliki beberapa kekurangan, seperti:

- Tidak bisa mengubah tema melalui toggle.
- Tidak bisa menyimpan preferensi pengguna.
- Terbatas hanya pada dark & light mode.
- Tidak bisa melakukan perubahan dinamis (misalnya berdasarkan waktu).

## Menggunakan JavaScript (kontrol penuh)

Jika kamu ingin menggunakan toggle, memiliki lebih dari dua tema, atau menyimpan preferensi pengguna, maka pilihan yang paling fleksibel adalah menggunakan JavaScript. Contoh sederhana:

### HTML

```html
<!DOCTYPE html>
<html lang="en" data-theme="">
<head>
	<meta charset="UTF-8">
	<title>Belajar Mengubah Tema</title>
</head>
<body>
	<h1>Belajar Mengubah Tema</h1>
	
	<button id="toggle-theme">
		Klik untuk mengubah tema
	</button>
	
	<script src="main.js"></script>
</body>
</html>
```

### CSS

```css
:root {
	--background-color: #fff;
	--text-color: #000;
}

:root[data-theme="dark"] {
	--background-color: #000;
	--text-color: #fff;
}

html {
	background-color: var(--background-color);
	color: var(--text-color);
}
```

### JavaScript

```javascript
const btn = document.getElementById("toggle-theme");
const htmlElement = document.documentElement;

function change() {
	const current = htmlElement.getAttribute('data-theme');
	const theme = current === "dark" ? "light" : "dark";
	htmlElement.setAttribute("data-theme", theme);
}

btn.addEventListener("click", change);
```

### Bonus (untuk uji coba cepat, copy-paste saja)

```html
<!DOCTYPE html>
<html lang="en" data-theme="">
<head>
	<meta charset="UTF-8">
	<title>Belajar Mengubah Tema</title>
	<style>
		:root {
			--background-color: #fff;
			--text-color: #000;
		}
		:root[data-theme="dark"] {
			--background-color: #000;
			--text-color: #fff;
		}
		html {
			background-color: var(--background-color);
			color: var(--text-color);
		}
	</style>
</head>
<body>
	<h1>Belajar Mengubah Tema</h1>
	<button id="toggle-theme">
		Klik untuk mengubah tema
	</button>
	<script>
		const btn = document.getElementById("toggle-theme");
		const htmlElement = document.documentElement;
		
		function change() {
			const current = htmlElement.getAttribute('data-theme');
			const theme = current === "dark" ? "light" : "dark";
			htmlElement.setAttribute("data-theme", theme);
		}
		
		btn.addEventListener("click", change);
	</script>
</body>
</html>
```

## Peningkatan

Untuk pengembangan lebih lanjut, penggunaan JavaScript cukup fleksibel. Kita bisa menyimpan preferensi tema di `localStorage`, membuat lebih dari dua mode tema, bahkan mengubah tema secara otomatis berdasarkan waktu.

Namun, jika semua dibahas di sini, artikel ini akan menjadi terlalu panjang. Jadi, mungkin akan dibahas di postingan terpisah (tergantung mood 😅).

## Kesimpulan

Kedua cara di atas sama-sama bisa digunakan, bahkan bisa digabungkan untuk mendapatkan dukungan yang lebih luas.

Sedikit pengalaman pribadi, aku lebih sering menggunakan CSS saja karena lebih simpel. Lagipula, kebanyakan pengguna sudah menyesuaikan tema di perangkat mereka masing-masing, sehingga biasanya sudah nyaman untuk mata.

Namun, tetap ada kasus di mana JavaScript dibutuhkan, misalnya untuk perangkat lama yang belum mendukung fitur tersebut, atau jika ingin menyediakan lebih dari dua tema.

Jadi, langkah terbaik adalah menyesuaikan dengan kebutuhan. Jangan membuat fitur yang kemungkinan besar jarang digunakan.

_Just keep it simple._

## Konten Menarik Lainnya

- [[Bikin Dark Mode Website Tanpa Ribet Part 2]]
