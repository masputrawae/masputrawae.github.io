---
title: Linux - MTP Android
description: Cara Koneksikan android ke Linux untuk sharing file menggunakan MTP
categories:
  - Contekan
tags:
  - android
  - mtp
  - berbagi_file
pubDate: 2026-03-28
updatedDate: 2026-03-28
---

## Install paket yang diperlukan

```bash
sudo pacman -S gvfs gvfs-mtp
```

---

## Cek apakah Android terdeteksi

Colok HP → pastikan **USB mode: File Transfer (MTP)**

```bash
gio mount -l
```

Contoh output yang menunjukkan device terdeteksi:

```
Volume(0): Infinix X1102
Type: GProxyVolume (GProxyVolumeMonitorMTP)
```

Cek juga USB:

```bash
lsusb
```

Contoh output:

```
Bus 001 Device 014: ID 0e8d:2008 MediaTek Inc.
```

---

## Mount Android

Gunakan bus dan device number dari `lsusb`.

> Note: gunakan **quotes** agar zsh tidak error dengan `[ ]`

```bash
gio mount "mtp://[usb:001,014]/"
```

Cek lokasi mount:

```bash
ls /run/user/$(id -u)/gvfs/
```

Biasanya muncul folder seperti:

```
mtp:host=%5Busb%3A001%2C014%5D
```

Masuk ke folder:

```bash
cd "/run/user/$(id -u)/gvfs/mtp:host=%5Busb%3A001%2C014%5D"
ls
```

Di dalamnya akan ada:

```
Internal shared storage
```

---

## Copy file dari Linux ke Android

```bash
cp file.txt "Internal shared storage/Download/"
```

## Copy file dari Android ke Linux

```bash
cp "Internal shared storage/DCIM/foto.jpg" ~/
```

---

## Unmount Android

Gunakan nama folder yang muncul di GVFS:

```bash
gio mount -u "/run/user/$(id -u)/gvfs/mtp:host=%5Busb%3A001%2C014%5D"
```

Cek lagi:

```bash
ls /run/user/$(id -u)/gvfs/
```

Folder seharusnya hilang.

---

## Tips praktis (alias di zsh)

Biar cepat:

```bash
alias android-mount='gio mount "mtp://[usb:001,014]/"'
alias android-umount='gio mount -u "/run/user/$(id -u)/gvfs/mtp:host=%5Busb%3A001%2C014%5D"'
```

Gunakan:

```bash
android-mount   # mount HP
android-umount  # unmount HP
```

---

💡 **Catatan penting**

- HP harus **unlock** & **USB mode File Transfer**
- Jangan pakai `mtpfs`, karena sering error di Arch + TTY
- Semua file berada di `/run/user/UID/gvfs/` setelah mount
- Cara ini **stabil di TTY tanpa desktop environment**
