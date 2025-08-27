---
id: "20250827223955"
title: "JavaScript | Fungsi Membuat Id Timestamp"
tags:
  - cheat_sheet
  - javascript
  - timestamp
  - function
created: 2025-08-27T22:39:55+07:00
---

```javascript
function generateTimestampId() {
	const now = new Date();
	const year = now.getFullYear().toString().padStart(4, '0');
	
	// +1 karena getMonth() mulai dari 0
	const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
	const day = now.getDate().toString().padStart(2, '0');
	const hours = now.getHours().toString().padStart(2, '0');
	const minutes = now.getMinutes().toString().padStart(2, '0'); 
	const seconds = now.getSeconds().toString().padStart(2, '0');
	return `${year}${month}${day}${hours}${minutes}${seconds}`; 
}
```

## Penjelasan

Belum mengerti sepenuhnya, cuma ingin akan me-return id dengan format YYYYMMDDHHmmss yang cukup unik karena perbedaan 1 detik. Cocok untuk id seperti catatan 👍