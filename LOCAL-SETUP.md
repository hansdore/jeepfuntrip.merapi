# Menjalankan Versi Lokal

Versi ini menyimpan booking, paket, artikel, galeri, dan sesi admin di `localStorage` browser. Tidak memerlukan PHP atau MariaDB.

## Menjalankan

Jalankan folder situs melalui server web lokal, misalnya ekstensi VS Code Live Server, lalu buka alamat `http://localhost` yang diberikan server. Jangan buka `index.html` atau `admin.html` langsung dengan `file://` jika ingin booking tersimpan di panel admin atau menggunakan login admin. Form booking tetap dapat membuka WhatsApp dari `file://`, tetapi booking tidak tersimpan secara lokal.

Folder situs utama dan `jeep/` merupakan salinan terpisah. Jalankan salah satunya sebagai root web agar halaman publik dan admin memakai penyimpanan browser yang sama.
Buka halaman publik dan admin dengan hostname serta port yang sama. Contohnya, jika admin dibuka dari `http://127.0.0.1:5500/jeepfuntripmerapi.jogjacreativepro.com/admin.html`, buka websitenya dari `http://127.0.0.1:5500/jeepfuntripmerapi.jogjacreativepro.com/index.html`. `file://`, `localhost`, dan `127.0.0.1` memiliki penyimpanan browser yang terpisah.

## Panel admin

Buka `admin.html`. Saat pertama kali masuk, gunakan email admin di `app-config.js` dan buat password lokal minimal 8 karakter. Data dan sesi tersimpan hanya pada browser serta origin tersebut.

Paket, artikel, dan galeri contoh diisikan otomatis saat data lokal pertama kali dibaca. Booking baru muncul setelah formulir booking disimpan. Data tidak tersinkron ke perangkat/browser lain; menghapus data situs dari browser dapat menghapus data lokal.

Gunakan menu **Kontak** di panel admin untuk mengubah nomor WhatsApp, tautan profil Instagram, dan alamat basecamp. Perubahan juga memperbarui tautan kontak serta tujuan WhatsApp booking pada website yang dibuka dengan hostname dan port yang sama.

Gunakan menu **Akun** untuk mengubah email login dan/atau password admin. Perubahan memerlukan password saat ini dan hanya berlaku di browser serta origin yang sama.
