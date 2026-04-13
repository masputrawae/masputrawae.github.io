---
title: "Tanpa judul"
description:
pubDate:
---

Ada masa dimana kemarin bingung 😕 mendefinisikan konfigurasi di proyek javascript.
Dan sempat menemukan beberapa cara yang menurutku bagus untuk digunakan 😁, cuma memang tidak ada cara yang 100% mutlak bagus.

Apa saja yang aku temukan?

## Sederhana Simpel tapi Ini Masalah ku

Paling simpel adalah bikin 1 file di root dan beri aja nama `site.config.ts` dan definisikan disana langsung. Contoh

```ts
interface SiteOptions {
	title?: string
	description?: string
	author?: string
}

export const SITE:SiteOptions = {
	title: "Judul Dari Pengguna",
	description: "Deskripsi Dari Penggunaan"
}
```

Beres tinggal `import { SITE } from "./site.config.ts"` 😁. 

Masalah untuk kasus ku kemarin adalah opsional value, dan default value yang harus aku isi di hampir semua tempat yang memanggil konfigurasi, dan itu bisa saja menyebabkan tidak konsisten.

Contoh nih:

```ts
// panggil konfigurasi tadi
import { SITE } from "./site.config.ts"

// Aku perlu cek dulu, dan bikin fallback nya
const title = SITE.title || "Default Title"
const description = SITE.description || "Default Deskripsi"
const author = SITE.author || "Jono"

console.log(title) // output: "Judul Dari Pengguna"
console.log(description) // output: "Deskripsi Dari Penggunaan"
console.log(author) // output: "Jono"
```

Bayangin misal aku punya 10 file yang butuh menggunakan konfigurasi tersebut, aku harus menuliskan ulang hal sama 10 kali🤯. Dan dari situ aku perlu mencari cara lain untuk mendefinisikan konfigurasi.

## Menggunakan Spread Operator

Yang pertama aku nemuin cara ini, yang menurutku cukup bisa di andalkan. Contoh nya seperti ini

### Buat 1 File Config Function Nya

Mungkin kita perlu folder dan file seperti ini `lib/create-config.ts`, biar jelas aja 😁
Dan buat fungsi untuk mendefinisikan konfigurasi nya

```ts
// lib/create-config.ts
interface SiteOptions {
	title?: string
	description?: string
	author?: string
}

// Mungkin createConfig nama yang pas 😁
export default function createConfig(userConfig:SiteOptions):SiteOptions {
	// Nah disini aku bisa isi nilai default
	const defaultConfig: SiteOptions = {
		title: "Judul Bawaan",
		description: "Deskripsi Bawaan",
		author: "Jono"
	}
	
	return {...defaultConfig, ...userConfig}
}
```

### Gunakan di File Konfigurasi

Nah tinggal kita panggil dan gunakan di `site.config.ts`. Contohnya seperti berikut:

```ts
// site.config.ts

// Panggil fungsi createConfig() Yang telah dibuat 
import { createConfig } from "./lib/create-config.ts"

// Tinggal kita definisikan konfigurasi nya
// Coba jangan diisi semua
export const SITE = createConfig({
	title: "Judul Dari Pengguna",
})

// Cek hasilnya
console.log(SITE)
```

Hasilnya:

```ts
{ 
	title: 'Judul Dari Pengguna',
	description: "Deskripsi Bawaan", 
	author: "Jono"
}
```

Nah kesimpulan nya ini cocok dengan yang aku harapkan, karena aku bisa panggil di manapun tanpa perlu buat default value Di banyak tempat. Cukup satu tempat beres 😁.

## Ketemu Yang Lebih Keren

Cara ini yang menurutku paling keren dan paling aman untuk digunakan. Yaitu menggunakan *ZOD* dan fungsi mirip seperti sebelumnya.

Oke langsung ke contoh nya:

### Install ZOD Terlebih Dahulu

...

### Buat File `lib/create-config.ts` Seperti Sebelumnya

```ts
// Import ZOD nya
import { z } from "zod"

// Buat skema nya
const configSchema = z.object({
	title: z.string().default("Judul Default"),
	description: z.string().default("Deskripsi Default"),
	author: z.string().default("Jono")
})

// Buat type nya agar nanti muncul auto competition
type ConfigInput = z.input<typeof configSchema>
type ConfigOutput = z.output<typeof configSchema>

// buat fungsi untuk mendefinisikan konfigurasi 
export function createConfig(userConfig: ConfigInput): ConfigOutput {
  return configSchema.parse(userConfig)
}
```

Dah beres tinggal di pakai seperti cara sebelumnya 😁. 

Untuk penggunaan zod lebih lanjut, baca aja di dokumentasi nya 😁 *jangan malas*

## Kesimpulan

Entah cara apa yang dilakukan oleh banyak orang?, aku juga tidak tahu, namun menurut ku cara ketiga adalah yang paling enak sih🤔, namun mungkin tergantung juga seberapa kompleks konfigurasi yang dibuat. 
