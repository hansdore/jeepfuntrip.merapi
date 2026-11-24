# Jeep Funtrip Merapi

Website statis untuk informasi paket wisata, rute, artikel, galeri, booking, dan panel administrasi Jeep Funtrip Merapi.

## Fitur

- Halaman publik untuk paket wisata dan detail rute
- Formulir booking yang membuka WhatsApp
- Galeri dan artikel
- Panel admin untuk mengelola paket, booking, artikel, galeri, kontak, dan akun
- Penyimpanan data berbasis `localStorage` browser
- Tidak memerlukan PHP, database, API, atau backend

> Versi saat ini berjalan sepenuhnya di browser. Booking dan perubahan pada panel admin tidak tersinkron ke server atau perangkat/browser lain.

## Persyaratan

- Git
- Browser modern
- Salah satu server web lokal:
  - VS Code Live Server atau ekstensi server statis lain
  - Python 3
  - Node.js

## Instalasi dan Menjalankan di Lokal

### 1. Clone repository

```bash
git clone https://github.com/hansdore/jeepfuntrip.merapi.git
cd jeepfuntrip.merapi
```

### 2. Jalankan server web lokal

Jangan membuka `index.html` atau `admin.html` langsung melalui `file://`. Jalankan salah satu perintah berikut dari folder hasil clone.

#### Menggunakan Python 3

```bash
python -m http.server 5500
```

Buka:

- Website: `http://localhost:5500/`
- Panel admin: `http://localhost:5500/admin.html`

#### Menggunakan Node.js

Tanpa menginstal paket tambahan:

```bash
npx serve . -l 5500
```

Buka:

- Website: `http://localhost:5500/`
- Panel admin: `http://localhost:5500/admin.html`

#### Menggunakan VS Code Live Server

1. Buka folder repository di VS Code.
2. Klik kanan `index.html`, lalu pilih **Open with Live Server**.
3. Untuk panel admin, buka `admin.html` pada origin dan port yang sama.

## Struktur Proyek

Folder utama berisi versi situs yang aktif untuk pengembangan. Folder `jeep/` merupakan salinan terpisah yang juga dapat dijalankan sebagai root web.

```text
jeepfuntrip.merapi/
├── index.html
├── admin.html
├── script.js
├── admin.js
├── style.css
├── admin.css
├── app-config.js
├── local-data.js
├── rute.html
└── jeep/
```

Jalankan satu folder sebagai root web. Contoh:

- Versi utama: `http://localhost:5500/index.html`
- Versi di folder `jeep`: `http://localhost:5500/jeep/index.html`

## Konfigurasi Admin Lokal

Saat pertama kali membuka `admin.html`:

1. Gunakan email admin yang tertera di `app-config.js`.
2. Buat password admin lokal dengan minimal 8 karakter.
3. Masuk ke panel administrasi.

Email default:

```js
adminEmail: "hansewdims@gmail.com"
```

Email dan password dapat diubah kemudian melalui menu **Akun** di panel admin. Perubahan password memerlukan password saat ini.

## Penyimpanan Data

Data berikut disimpan pada `localStorage` browser:

- Booking
- Paket wisata
- Artikel
- Galeri
- Nomor WhatsApp
- Tautan Instagram
- Alamat basecamp
- Kredensial dan sesi admin lokal

Data hanya berlaku untuk kombinasi origin dan browser yang sama. Misalnya, data dari `localhost:5500` tidak akan muncul di `127.0.0.1:5500` meskipun menunjuk ke file yang sama.

Menghapus data situs dari pengaturan browser akan menghapus semua perubahan lokal. Menggunakan mode private/incognito juga dapat mengurangi daya tahan penyimpanan data.

## Mengubah Konten dan Kontak

- Gunakan menu **Paket**, **Artikel**, atau **Galeri** pada panel admin untuk mengubah konten.
- Gunakan menu **Kontak** untuk mengubah nomor WhatsApp, Instagram, dan alamat basecamp.
- Data contoh akan dibuat otomatis saat pertama kali aplikasi membaca penyimpanan lokal.
- Untuk mengubah alamat atau struktur navigasi secara permanen pada source code, edit file HTML dan JavaScript yang bersangkutan.

## Deployment

Karena situs bersifat statis, folder hasil clone dapat diunggah ke layanan hosting statis seperti GitHub Pages, Netlify, atau hosting web biasa.

Sebelum deployment:

1. Pastikan semua link dan konfigurasi sudah sesuai.
2. Jangan gunakan data atau password produksi hanya sebagai penyimpanan lokal browser.
3. Pastikan versi dan folder utama yang akan diunggah sudah dipilih.
