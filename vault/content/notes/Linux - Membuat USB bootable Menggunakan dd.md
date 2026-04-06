---
title: Membuat USB bootable Menggunakan dd
description: Cara Membuat USB bootable Menggunakan dd di Linux
heroImage: https://res.cloudinary.com/mpw-img/image/upload/v1773824931/image-2_bzssne.jpg
tags:
  - linux
  - usb
  - bootable
pubDate: 2026-03-15
updatedDate: 2026-03-15
---

> [!warning] Hati-Hati Memilih Disk (Sebelum `dd`)
> Salah pilih target disk = **semua isi drive bisa terhapus permanen**.
> Jadi sebelum menulis ISO, pastikan kamu benar-benar tahu mana HDD/SSD dan mana flashdisk.

## Identifikasi Flashdisk

Jalankan:

```bash
lsblk
```

Contoh output:

```
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0 476.9G  0 disk
├─sda1   8:1    0 111.8G  0 part /
├─sda2   8:2    0     1M  0 part
├─sda3   8:3    0  14.9G  0 part [SWAP]
└─sda4   8:4    0 350.3G  0 part /home
sdb      8:16   1  14.6G  0 disk
├─sdb1   8:17   1   2.6G  0 part
├─sdb2   8:18   1     5M  0 part
├─sdb3   8:19   1   300K  0 part
└─sdb4   8:20   1    12G  0 part
```

### Ciri Flashdisk

Perhatikan kolom berikut:

- **SIZE** → cocok dengan ukuran flashdisk (misal 14–16GB)
- **RM=1** → artinya _removable_ (biasanya USB)
- **TYPE = disk**

Pada contoh di atas:

```
sdb  8:16  1  14.6G  0 disk
```

👉 Jadi flashdisk adalah **`/dev/sdb`**

> [!warning]
> Pastikan yang kamu pilih benar. Jangan asal kira.

---

# Unmount Partisi Flashdisk

Sebelum menulis ISO, unmount dulu:

```bash
sudo umount /dev/sdb*
```

---

# Tulis ISO ke Flashdisk

Gunakan `dd`:

```bash
sudo dd bs=4M if=archlinux-2026.03.01-x86_64.iso of=/dev/sdb status=progress oflag=sync
```

### Penjelasan Singkat:

- `bs=4M` → mempercepat proses
- `if=` → file ISO
- `of=` → target disk (⚠️ tanpa angka partisi, langsung `/dev/sdb`)
- `status=progress` → tampilkan progres
- `oflag=sync` → pastikan data benar-benar tertulis

---

# Pastikan Semua Data Tersimpan

Setelah selesai:

```bash
sync
```

Tunggu sampai prompt kembali muncul.

---

# Selesai

Flashdisk sekarang siap dipakai untuk boot.
