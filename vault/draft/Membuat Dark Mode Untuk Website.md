---
title: 'Membuat Dark Mode Untuk Website'
description:
tags:
pubDate:
updatedDate:
---

Sebenarnya ada cara paling sederhana untuk membuat 2 tema (dark & light) Untuk website, yang pertama yaitu menggunakan CSS aja, memanfaatkan media query.

```css
/* Buat variabel */
:root {
	--background-color: #fff;
	--Text-color: #000;
}

@media (prefers-color-scheme: dark) {
	:root {
		--background-color: #fff;
		--Text-color: #000;
	}
}

html {
	background-color: var(--background-color);
	color: var(--text-color);
}
```