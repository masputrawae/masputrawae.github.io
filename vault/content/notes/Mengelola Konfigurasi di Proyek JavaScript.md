---
title: Mengelola Konfigurasi di Proyek JavaScript
description: Beberapa cara sederhana hingga lebih aman untuk mendefinisikan konfigurasi di proyek JavaScript.
tags:
  - javascript
  - konfigurasi
  - zod
categories:
  - Programming
pubDate: 2026-04-13
---

Ada masa di mana aku sempat bingung 😕 saat harus mendefinisikan konfigurasi di proyek JavaScript. Dari situ, aku mencoba beberapa pendekatan yang menurutku cukup menarik 😁

Tapi ya… seperti biasa, tidak ada cara yang 100% paling benar.

Jadi, apa saja yang aku temukan?

---

## Sederhana, Simpel… Tapi Ini Masalahku

Cara paling simpel adalah membuat satu file di root, misalnya `site.config.ts`, lalu langsung definisikan di sana.

Contoh:

```ts
interface SiteOptions {
  title?: string
  description?: string
  author?: string
}

export const SITE: SiteOptions = {
  title: "Judul Dari Pengguna",
  description: "Deskripsi Dari Penggunaan"
}
````

Lalu tinggal pakai:

```ts
import { SITE } from "./site.config.ts"
```

Beres 😁

---

### Masalahnya...

Di kasusku, ada value yang sifatnya opsional, jadi aku harus sering bikin default value di setiap pemanggilan.

Contoh:

```ts
import { SITE } from "./site.config.ts"

const title = SITE.title || "Default Title"
const description = SITE.description || "Default Deskripsi"
const author = SITE.author || "Jono"

console.log(title)
console.log(description)
console.log(author)
```

Bayangin kalau ada 10 file yang butuh konfigurasi ini…  
Harus nulis hal yang sama berulang-ulang 🤯

Dan ini berpotensi bikin tidak konsisten.

---

## Menggunakan Spread Operator

Akhirnya aku coba cara yang menurutku lebih rapi: pakai fungsi untuk merge default config.

---

### 1. Buat File Helper

Misalnya di `lib/create-config.ts`:

```ts
interface SiteOptions {
  title?: string
  description?: string
  author?: string
}

export default function createConfig(userConfig: SiteOptions): SiteOptions {
  const defaultConfig: SiteOptions = {
    title: "Judul Bawaan",
    description: "Deskripsi Bawaan",
    author: "Jono"
  }

  return { ...defaultConfig, ...userConfig }
}
```

---

### 2. Gunakan di File Konfigurasi

```ts
import createConfig from "./lib/create-config.ts"

export const SITE = createConfig({
  title: "Judul Dari Pengguna"
})

console.log(SITE)
```

Hasilnya:

```ts
{
  title: "Judul Dari Pengguna",
  description: "Deskripsi Bawaan",
  author: "Jono"
}
```

---

### Kenapa Ini Lebih Enak?

Karena:

- Default value cukup didefinisikan sekali
- Tidak perlu fallback di banyak tempat
- Lebih konsisten 😁

---

## Ketemu yang Lebih Keren 😎

Nah, ini cara yang menurutku paling aman dan powerful: pakai **Zod**.

---

### 1. Install Zod

```bash
npm install zod
```

---

### 2. Buat Schema Konfigurasi

```ts
import * as z from "zod"

const configSchema = z.object({
  title: z.string().default("Judul Default"),
  description: z.string().default("Deskripsi Default"),
  author: z.string().default("Jono")
})

type ConfigInput = z.input<typeof configSchema>
type ConfigOutput = z.output<typeof configSchema>

export function createConfig(userConfig: ConfigInput): ConfigOutput {
  return configSchema.parse(userConfig)
}
```

---

### Kenapa Ini Lebih Mantap?

- Ada **validasi otomatis**
- Default value langsung dari schema
- TypeScript jadi lebih kuat (auto inference 🔥)
- Lebih aman untuk skala besar

---

## Kesimpulan

Aku sendiri belum tahu cara mana yang paling umum dipakai orang-orang 🤔  
Tapi menurutku:

- Cara 1 → simpel, tapi cepat berantakan
- Cara 2 → cukup rapi dan praktis
- Cara 3 (Zod) → paling aman dan scalable

Balik lagi, semua tergantung kebutuhan dan kompleksitas proyekmu 😁
