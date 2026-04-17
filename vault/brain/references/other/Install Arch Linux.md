Cara yang lebih mudah untuk sekarang, adalah menggunakan

```bash
archinstall
```

---

Untuk cara manual seperti berikut

## 1️⃣ Persiapan Awal

### 🔌 Pastikan Internet Aktif

```bash
ping archlinux.org
```

### ⏰ Sinkronisasi Waktu

```bash
timedatectl set-ntp true
timedatectl status
```

Pastikan:

```
System clock synchronized: yes
```

### 💾 Cek Disk

```bash
lsblk
```

---

# 2️⃣ Partisi Disk (GPT)

```bash
cfdisk /dev/sda
```

Pilih **GPT** jika diminta.

Buat partisi:

| Partisi | Size | Type             |
| ------- | ---- | ---------------- |
| EFI     | 512M | EFI System       |
| Root    | Sisa | Linux filesystem |

Save → Quit

---

# 3️⃣ Format Partisi

```bash
mkfs.fat -F32 /dev/sda1
mkfs.btrfs /dev/sda2
```

---

# 4️⃣ Mount Partisi

```bash
mount /dev/sda2 /mnt
mkdir /mnt/boot
mount /dev/sda1 /mnt/boot
```

---

# 5️⃣ Install Base System

```bash
pacstrap /mnt base linux linux-firmware nano sudo networkmanager
```

---

# 6️⃣ Generate fstab

```bash
genfstab -U /mnt >> /mnt/etc/fstab
cat /mnt/etc/fstab
```

Pastikan file terisi.

---

# 7️⃣ Masuk ke Sistem Baru

```bash
arch-chroot /mnt
```

---

# ⚙️ Konfigurasi Sistem

## 🕒 Timezone

```bash
ln -sf /usr/share/zoneinfo/Asia/Jakarta /etc/localtime
hwclock --systohc
```

## 🌍 Locale

Edit:

```bash
nano /etc/locale.gen
```

Uncomment:

```
en_US.UTF-8 UTF-8
```

Lalu:

```bash
locale-gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf
```

## 🖥️ Hostname

```bash
echo "arch-pc" > /etc/hostname
```

Edit `/etc/hosts`:

```
127.0.0.1   localhost
::1         localhost
127.0.1.1   arch-pc.localdomain arch-pc
```

## 🔐 Set Password Root

```bash
passwd
```

---

# 🥾 Install Bootloader (GRUB UEFI)

Install:

```bash
pacman -S grub efibootmgr
```

Install ke EFI:

```bash
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
```

Generate config:

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

---

# 🌐 Enable NetworkManager

```bash
systemctl enable NetworkManager
```

---

# 🚪 Selesai Install

```bash
exit
umount -R /mnt
reboot
```

Login:

```
root
```

---

# 👤 Buat User Biasa

```bash
useradd -m -G wheel -s /bin/bash username
passwd username
```

## Aktifkan sudo

```bash
EDITOR=nano visudo
```

Uncomment:

```
%wheel ALL=(ALL:ALL) ALL
```

Reboot:

```bash
reboot
```

Login pakai user baru.

---

# 🔄 Post-Install Setup

## Update System

```bash
sudo pacman -Syu
```

## Tools Dasar

```bash
sudo pacman -S --needed base-devel git
```

---

# 🎮 GPU Driver (Intel iGPU)

Cek GPU:

```bash
lspci | grep -i vga
```

Install:

```bash
sudo pacman -S mesa xf86-video-intel
sudo pacman -S mesa vulkan-intel
```

---

# 🔊 Audio (PipeWire)

```bash
sudo pacman -S pipewire pipewire-pulse wireplumber
```

---

# 🌍 Browser

```bash
sudo pacman -S firefox
```

---

# 🔐 SSH & Git

```bash
sudo pacman -S openssh git
sudo systemctl enable sshd
```

Konfigurasi Git:

```bash
git config --global user.name "Nama Kamu"
git config --global user.email "emailkamu@example.com"
git config --global init.defaultBranch main
git config --global color.ui auto
git config --global --list
```

Generate SSH key:

```bash
ssh-keygen -t ed25519 -C "emailkamu@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
ssh -T git@github.com
```

---

# 📋 Clipboard (Wayland)

```bash
sudo pacman -S wl-clipboard
```

---

# 🐚 Zsh

```bash
sudo pacman -S zsh
chsh -s /bin/zsh
```

---

# 🔤 Fonts

```bash
sudo pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji
sudo pacman -S ttf-jetbrains-mono-nerd
fc-cache -fv
```
