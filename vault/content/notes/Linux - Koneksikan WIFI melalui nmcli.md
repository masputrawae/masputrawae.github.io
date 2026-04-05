---
title: Linux - Koneksikan WIFI melalui nmcli
description: Cara Koneksikan WIFI di Linux melalui nmcli
tags:
  - linux
  - network
  - wifi
pubDate: 2026-03-28
updatedDate: 2026-03-28
draft: false
---

## 1. Cek daftar WiFi

```bash
nmcli device wifi list
```

Ini akan menampilkan daftar jaringan WiFi yang terdeteksi, misalnya:

```
SSID             SIGNAL  SECURITY
MyWifi           90      WPA2
KostanPutra      70      WPA3
```

---

## 2. Konek ke WiFi

Gunakan nama SSID dan password:

```bash
nmcli device wifi connect "NamaSSID" password "PasswordWifi"
```

Contoh:

```bash
nmcli device wifi connect "KostanPutra" password "12345678"
```

Kalau berhasil, akan muncul pesan:

```
Device 'wlan0' successfully activated with 'xxxx-xxxx-xxxx-xxxx'.
```

---

## 3. Cek status koneksi

```bash
nmcli connection show --active
```

Atau untuk detail interface:

```bash
nmcli device status
```

---

## 4. Kalau kamu pengen otomatis connect tiap boot

Setel agar koneksi disimpan:

```bash
nmcli connection modify "NamaSSID" connection.autoconnect yes
```

---

## Tips tambahan

- Kalau mau putus koneksi:
    ```bash
    nmcli connection down "NamaSSID"
    ```
- Kalau mau lihat semua koneksi yang tersimpan:
    ```bash
    nmcli connection show
    ```

---

Kalau `nmcli` belum terpasang (jarang sih), install dulu:

```bash
sudo apt install network-manager
```
