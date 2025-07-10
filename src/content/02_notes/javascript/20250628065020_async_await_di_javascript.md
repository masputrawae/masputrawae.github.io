---
id: '20250628065020'
title: async-await di JavaScript
tags:
  - javascript
  - programming
  - fundamental
created: 2025-06-28T06:50:20+07:00
updated: 2025-07-10T17:44:15+07:00
---

Cara yang mudah dan modern untuk menangani proses Asynchronous adalah menggunakan async await

**Contoh**:

```javascript
const API_URL = 'https://jsonplaceholder.typicode.com/todos/1'

async function getData(url) {
	try {
		const res = await fetch(url)
		const data = await res.json()
		console.log(data)
	} catch (err) {
		console.log('Terjadi Error: ', err)
	}
}

getData(API_URL)
```

**Terkait**:

- [[20250627234640_asynchronous_di_javascript]]
- [[20250628070829_promise_di_javascript]]
- [[20250628071334_callback_function_di_javascript]]
