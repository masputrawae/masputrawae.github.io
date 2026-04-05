---
title: Linux - Install Wireshark CLI
description: Cara menginstal Wireshark CLI di Linux
tags:
  - linux
  - network
  - sniffing
pubDate: 2026-03-28
updatedDate: 2026-03-28
draft: false
---

## 1. Install Wireshark CLI

Jalankan:

```bash
sudo pacman -S wireshark-cli
```

Ini akan meng install:

- `tshark` (packet capture CLI)
- `dumpcap`
- beberapa tool analisis jaringan lainnya.

## 2. Tambahkan user ke grup wireshark (opsional tapi direkomendasikan)

Agar bisa capture tanpa root:

```bash
sudo usermod -aG wireshark $USER
```

set permission

```bash
sudo chgrp wireshark /usr/bin/dumpcap
sudo chmod 750 /usr/bin/dumpcap
sudo setcap cap_net_raw,cap_net_admin=eip /usr/bin/dumpcap
```

Lalu logout dan login kembali.

## 3. Cek apakah berhasil

Tes dengan:

```bash
tshark -v
```

atau lihat interface:

```bash
tshark -D
```
