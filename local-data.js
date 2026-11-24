(function () {
    const dataKey = "jeepfuntrip-local-data-v1";
    const credentialKey = "jeepfuntrip-local-admin-credential-v1";
    const seedKey = "jeepfuntrip-local-default-content-seeded-v1";
    const featuredArticlesSeedKey = "jeepfuntrip-local-featured-articles-seeded-v1";
    const contactSettingsKey = "jeepfuntrip-local-contact-settings-v1";
    const defaultContactSettings = {
        whatsappNumber: "0877 1631 5613",
        instagramUrl: "https://www.instagram.com/jeepfuntripmerapi/",
        basecampAddress: "Pangkukrejo, Umbulharjo, Cangkringan, Sleman, DIY"
    };
    const collectionNames = ["bookings", "packages", "articles", "gallery"];
    const defaultContent = {
        packages: [
            {
                id: "short-trip",
                name: "Short Trip",
                price: 450000,
                duration: "1 s/d 1,5 Jam",
                routes: [
                    { id: "short-a", option: "Opsi A", stops: ["Mini Museum Sisa Hartaku", "Batu Alien, Kaliadem", "Track Kalikuning"] },
                    { id: "short-b", option: "Opsi B", stops: ["Mini Museum Sisa Hartaku", "Batu Alien, Kaliadem", "Bunker Kaliadem"] },
                    { id: "short-c", option: "Opsi C", stops: ["Mini Museum Sisa Hartaku", "TLW Park, Cangkringan", "Track Kalikuning"] }
                ],
                active: true
            },
            {
                id: "short-plus-trip",
                name: "Short Plus Trip",
                price: 500000,
                duration: "1,5 s/d 2 Jam",
                routes: [
                    { id: "short-plus-a", option: "Opsi A", stops: ["Bunker Kaliadem", "Mini Museum Sisa Hartaku", "Track Kalikuning"] },
                    { id: "short-plus-b", option: "Opsi B", stops: ["Bunker Kaliadem", "Tebing Gendol, Cangkringan", "Track Kalikuning"] }
                ],
                active: true
            },
            {
                id: "medium-trip",
                name: "Medium Trip",
                price: 550000,
                duration: "2 s/d 2,5 Jam",
                routes: [
                    { id: "medium-a", option: "Opsi A", stops: ["Mini Museum Sisa Hartaku", "Batu Alien, Kaliadem", "Bunker Kaliadem", "Track Kalikuning"] },
                    { id: "medium-b", option: "Opsi B", stops: ["Mini Museum Sisa Hartaku", "Batu Alien, Kaliadem", "Bunker Kaliadem", "Museum Mbah Maridjan, Kinahrejo"] },
                    { id: "medium-c", option: "Opsi C", stops: ["Mini Museum Sisa Hartaku", "TLW Park, Cangkringan", "Bunker Kaliadem", "Track Kalikuning"] }
                ],
                active: true
            },
            {
                id: "long-trip",
                name: "Long Trip",
                price: 650000,
                duration: "3 s/d 3,5 Jam",
                routes: [
                    { id: "long-a", option: "Opsi A", stops: ["Mini Museum Sisa Hartaku", "Batu Alien, Kaliadem", "Bunker Kaliadem", "TLW Park, Cangkringan", "Track Kalikuning"] },
                    { id: "long-b", option: "Opsi B", stops: ["Museum Mbah Maridjan, Kinahrejo", "Mini Museum Sisa Hartaku", "Batu Alien, Kaliadem", "Bunker Kaliadem", "Track Kalikuning"] }
                ],
                active: true
            },
            {
                id: "sunrise-trip",
                name: "Sunrise Trip",
                price: 600000,
                duration: "Start 04.30 - 07.30",
                routes: [
                    { id: "sunrise-a", option: "Opsi A", stops: ["Bunker Kaliadem", "Batu Alien, Kaliadem", "Mini Museum Sisa Hartaku"] },
                    { id: "sunrise-b", option: "Opsi B", stops: ["Bunker Kaliadem", "Mini Museum Sisa Hartaku", "Track Kalikuning"] }
                ],
                active: true
            }
        ],
        articles: [
            {
                id: "golden-sunrise-merapi",
                title: "Tips Menikmati Golden Sunrise Gunung Merapi",
                published_at: "2026-10-18",
                excerpt: "Persiapan penting bagi Anda yang mengambil Sunrise Trip: pakaian hangat, waktu keberangkatan, dan spot foto tercantik.",
                content: `Perjalanan sunrise memberi kesempatan untuk melihat suasana lereng Merapi saat pagi mulai terang. Cuaca, kabut, dan aktivitas gunung dapat memengaruhi pemandangan, jadi sunrise tidak selalu terlihat jelas. Nikmati perjalanan dan suasananya tanpa menganggap kemunculan matahari sebagai sesuatu yang bisa dijamin.

Persiapan sebelum berangkat

Konfirmasikan jam kumpul dan titik keberangkatan kepada pengelola sehari sebelumnya. Siapkan jaket atau pakaian berlapis karena udara pagi dapat terasa dingin, terutama saat Jeep bergerak. Gunakan alas kaki yang nyaman dan tidak licin, serta bawa air minum secukupnya.

Isi daya ponsel dan kamera, lalu simpan perangkat di kantong atau tas yang mudah dijangkau. Bila membawa kamera, siapkan baterai cadangan dan kain kecil untuk membersihkan lensa. Jangan membawa barang terlalu banyak agar tetap leluasa saat naik-turun kendaraan.

Selama perjalanan

Duduklah dengan aman, gunakan pegangan yang tersedia, dan ikuti arahan pengemudi. Jangan berdiri di atas Jeep atau berpindah tempat ketika kendaraan berjalan. Pengemudi dapat menyesuaikan rute maupun waktu berhenti mengikuti cuaca, kondisi jalan, dan ketentuan kawasan.

Jika cuaca berawan atau hujan, utamakan keselamatan daripada mengejar foto. Hormati area yang dibatasi dan jangan mendekati titik berbahaya. Untuk mengetahui rute dan pilihan paket, lihat halaman Paket Wisata atau tanyakan kondisi terbaru kepada pengelola sebelum booking.`,
                image_url: "https://upload.wikimedia.org/wikipedia/commons/8/82/Merapi_Volcano_during_sunrise_2019.jpg",
                image_credit: "Desember01 / Wikimedia Commons (CC BY-SA 4.0)",
                image_source: "https://commons.wikimedia.org/wiki/File:Merapi_Volcano_during_sunrise_2019.jpg",
                target_audience: "Wisatawan yang tertarik Sunrise Trip",
                published: true
            },
            {
                id: "kisah-museum-sisa-hartaku",
                title: "Kisah Haru di Balik Mini Museum Sisa Hartaku",
                published_at: "2026-10-10",
                excerpt: "Mengenal lebih dalam sejarah benda-benda peninggalan warga yang menjadi monumen ingatan dahsyatnya erupsi 2010.",
                content: `Mini Museum Sisa Hartaku di kawasan Petung, Kepuharjo, menyimpan benda-benda yang menjadi pengingat dampak erupsi Merapi tahun 2010 terhadap kehidupan warga. Koleksi seperti peralatan rumah tangga dan barang yang rusak akibat awan panas menunjukkan bahwa bencana bukan sekadar peristiwa alam, tetapi juga pengalaman yang mengubah kehidupan masyarakat.

Nama museum ini mengajak pengunjung untuk berhenti sejenak dan memaknai benda-benda yang tersisa. Setiap koleksi memiliki konteks dan kisahnya sendiri. Saat berkunjung, luangkan waktu membaca keterangan yang tersedia dan dengarkan penuturan pemandu atau warga setempat bila ada.

Berkunjung dengan sikap menghormati

Tempat ini berkaitan dengan kehilangan dan pemulihan. Jagalah ketenangan, jangan menyentuh atau memindahkan koleksi tanpa izin, dan minta izin sebelum memotret orang atau ruang tertentu. Hindari menjadikan benda peninggalan sebagai properti untuk candaan atau foto yang tidak pantas.

Pengelolaan, jam kunjungan, serta kondisi akses dapat berubah. Konfirmasikan informasi sebelum berangkat dan ikuti petunjuk pengelola di lokasi. Foto yang digunakan pada halaman ini merupakan dokumentasi koleksi yang sumber dan lisensinya ditautkan di bawah foto; informasi kunjungan sebaiknya dikonfirmasi langsung kepada pengelola setempat.

Bagian dari perjalanan Merapi

Kunjungan ke museum dapat menjadi bagian dari perjalanan yang juga mencakup beberapa titik wisata lain. Urutan dan durasi pemberhentian bergantung pada paket, keadaan jalan, serta arahan pengelola. Pilih rute sesuai waktu yang tersedia dan berikan waktu yang cukup untuk mengunjungi museum dengan tenang.`,
                image_url: "https://upload.wikimedia.org/wikipedia/commons/2/25/Museum_Mini_Sisa_Hartaku_%282%29.jpg",
                image_credit: "Aniisasan / Wikimedia Commons (CC BY-SA 4.0)",
                image_source: "https://commons.wikimedia.org/wiki/File:Museum_Mini_Sisa_Hartaku_(2).jpg",
                target_audience: "Pengunjung yang tertarik sejarah Merapi",
                published: true
            },
            {
                id: "panduan-aman-lava-tour",
                title: "Panduan Aman Saat Mengikuti Lava Tour Merapi",
                published_at: "2026-10-02",
                excerpt: "Siapkan pakaian nyaman, lindungi barang bawaan, dan ikuti arahan pengemudi selama perjalanan di kawasan Merapi.",
                content: `Lava Tour Merapi membawa wisatawan melintasi kawasan yang memiliki medan dan kondisi berbeda dari perjalanan kota. Agar perjalanan lebih nyaman, persiapkan pakaian yang mudah bergerak dan alas kaki yang kuat. Debu, cipratan air, atau perubahan cuaca mungkin terjadi, bergantung pada rute dan kondisi hari itu.

Jaga diri dan barang bawaan

Simpan ponsel, kamera, dan dokumen di tas tertutup atau kantong tahan air. Jangan meletakkan barang lepas di tepi kendaraan. Pegang erat barang yang dibawa saat kendaraan bergerak, dan hindari menggunakan perangkat elektronik ketika melewati bagian jalan yang berguncang.

Gunakan pegangan, duduk dengan stabil, dan jangan berdiri atau berpindah tempat saat Jeep berjalan. Anak-anak perlu didampingi orang dewasa. Jika memiliki kondisi kesehatan tertentu, sampaikan kepada pengelola sebelum berangkat agar dapat didiskusikan apakah perjalanan sesuai untuk Anda.

Ikuti arahan pengemudi dan pengelola

Pengemudi mengetahui kondisi medan dan dapat mengubah rute atau menghentikan perjalanan bila cuaca maupun akses tidak aman. Ikuti instruksi saat naik-turun kendaraan dan saat berada di titik pemberhentian. Jangan memasuki area yang ditutup, mendekati aliran air atau tebing tanpa izin, atau meminta pengemudi melanggar aturan keselamatan demi foto.

Rute wisata bukan jaminan akses ke area tertentu. Aktivitas Gunung Merapi, cuaca, dan peraturan kawasan dapat berubah. Periksa pengumuman resmi serta konfirmasikan kondisi dan titik yang dapat dikunjungi langsung kepada pengelola sebelum melakukan pemesanan.

Sesudah perjalanan

Bersihkan diri dan periksa kembali barang bawaan setelah turun. Jika membawa sampah, bawa kembali sampai menemukan tempat pembuangan. Dengan persiapan yang baik dan sikap menghormati lingkungan, perjalanan dapat dinikmati dengan lebih nyaman tanpa mengabaikan keselamatan.`,
                image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Lava_Tour_Jogja.jpg",
                image_credit: "Wrsrachma / Wikimedia Commons (CC BY-SA 4.0)",
                image_source: "https://commons.wikimedia.org/wiki/File:Lava_Tour_Jogja.jpg",
                target_audience: "Wisatawan Lava Tour dan keluarga",
                published: true
            }
        ],
        gallery: [
            {
                id: "lava-tour-journey",
                caption: "Perjalanan Lava Tour",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Lava_Tour_Jogja.jpg",
                alt_text: "Perjalanan Lava Tour Jogja",
                credit: "Wrsrachma / CC BY-SA 4.0",
                source: "https://commons.wikimedia.org/wiki/File:Lava_Tour_Jogja.jpg",
                sort_order: 0,
                published: true
            },
            {
                id: "bunker-kaliadem",
                caption: "Bunker Kaliadem",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Bunker_Kaliadem.jpg",
                alt_text: "Bunker Kaliadem",
                credit: "Iyosswazzo / CC BY-SA 4.0",
                source: "https://commons.wikimedia.org/wiki/File:Bunker_Kaliadem.jpg",
                sort_order: 1,
                published: true
            },
            {
                id: "museum-sisa-hartaku",
                caption: "Museum Mini Sisa Hartaku",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/2/25/Museum_Mini_Sisa_Hartaku_%282%29.jpg",
                alt_text: "Museum Mini Sisa Hartaku",
                credit: "Aniisasan / CC BY-SA 4.0",
                source: "https://commons.wikimedia.org/wiki/File:Museum_Mini_Sisa_Hartaku_(2).jpg",
                sort_order: 2,
                published: true
            },
            {
                id: "jam-erupsi-merapi",
                caption: "Jam peninggalan erupsi Merapi",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Clock-moment_of_eruption-Mount_Merapi.jpg",
                alt_text: "Jam yang rusak akibat erupsi Merapi di Museum Mini Sisa Hartaku",
                credit: "Prokurator11 / Domain publik",
                source: "https://commons.wikimedia.org/wiki/File:Clock-moment_of_eruption-Mount_Merapi.jpg",
                sort_order: 3,
                published: true
            },
            {
                id: "rombongan-jeep-merapi",
                caption: "Rombongan Jeep di Merapi",
                image_url: "https://lh3.googleusercontent.com/d/1J90iBAriuvEQ2gOzLwB1SIxVfEf7FVvW=w1200",
                alt_text: "Rombongan wisatawan berfoto bersama di beberapa Jeep dengan latar Gunung Merapi",
                credit: "Foto peserta / Google Drive",
                source: "https://drive.google.com/file/d/1J90iBAriuvEQ2gOzLwB1SIxVfEf7FVvW/view?usp=sharing",
                sort_order: 4,
                published: true
            },
            {
                id: "wisatawan-track-sungai",
                caption: "Wisatawan menikmati track sungai",
                image_url: "https://lh3.googleusercontent.com/d/1Wkb04sGCMRJ4lYfT4vQzmhr4d3JnbuZ5=w1200",
                alt_text: "Wisatawan menikmati track sungai dengan dua Jeep",
                credit: "Foto peserta / Google Drive",
                source: "https://drive.google.com/file/d/1Wkb04sGCMRJ4lYfT4vQzmhr4d3JnbuZ5/view?usp=sharing",
                sort_order: 5,
                published: true
            },
            {
                id: "sunset-jeep-kuning",
                caption: "Sunset bersama Jeep kuning",
                image_url: "https://lh3.googleusercontent.com/d/1u2eDF_eb0PXTou_CIkeMODrC9R1ARCgw=w1200",
                alt_text: "Wisatawan berfoto di Jeep kuning saat langit senja di Merapi",
                credit: "Foto peserta / Google Drive",
                source: "https://drive.google.com/file/d/1u2eDF_eb0PXTou_CIkeMODrC9R1ARCgw/view?usp=sharing",
                sort_order: 6,
                published: true
            },
            {
                id: "jeep-merah-kuning-merapi",
                caption: "Jeep merah dan kuning dengan latar Merapi",
                image_url: "https://lh3.googleusercontent.com/d/1Ud6T4Q63bEsnnLg2pAxXERAGajEWdHzg=w1200",
                alt_text: "Jeep merah dan kuning dengan latar Gunung Merapi",
                credit: "Foto peserta / Google Drive",
                source: "https://drive.google.com/file/d/1Ud6T4Q63bEsnnLg2pAxXERAGajEWdHzg/view?usp=sharing",
                sort_order: 7,
                published: true
            },
            {
                id: "wisatawan-depan-merapi",
                caption: "Wisatawan berfoto di depan Merapi",
                image_url: "https://lh3.googleusercontent.com/d/192LPQupSZHDNqz7Cs2Fb60Ye01qXIBai=w1200",
                alt_text: "Wisatawan berfoto di Jeep merah dengan latar Gunung Merapi",
                credit: "Foto peserta / Google Drive",
                source: "https://drive.google.com/file/d/192LPQupSZHDNqz7Cs2Fb60Ye01qXIBai/view?usp=sharing",
                sort_order: 8,
                published: true
            }
        ]
    };

    function isLocalOrigin() {
        return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
    }

    function normalizeContactSettings(settings) {
        if (!settings || typeof settings !== "object") {
            throw new Error("Informasi kontak tidak valid.");
        }

        const whatsappNumber = typeof settings.whatsappNumber === "string"
            ? settings.whatsappNumber.trim()
            : "";
        const whatsappDigits = whatsappNumber.replace(/\D/g, "");
        if (!/^[+\d\s().-]+$/.test(whatsappNumber) || whatsappDigits.length < 8 || whatsappDigits.length > 15) {
            throw new Error("Nomor WhatsApp harus berisi 8–15 digit.");
        }

        let instagram;
        try {
            instagram = new URL(settings.instagramUrl);
        } catch {
            throw new Error("Masukkan tautan profil Instagram yang valid.");
        }
        if (instagram.protocol !== "https:" ||
            !["instagram.com", "www.instagram.com"].includes(instagram.hostname.toLowerCase())) {
            throw new Error("Tautan Instagram harus menggunakan domain instagram.com.");
        }
        const instagramUsername = instagram.pathname.split("/").filter(Boolean)[0];
        if (!instagramUsername || !/^[A-Za-z0-9._]{1,30}$/.test(instagramUsername)) {
            throw new Error("Tautan Instagram harus mengarah ke profil akun.");
        }

        const basecampAddress = typeof settings.basecampAddress === "string"
            ? settings.basecampAddress.trim()
            : "";
        if (!basecampAddress || basecampAddress.length > 300) {
            throw new Error("Alamat basecamp wajib diisi dan maksimal 300 karakter.");
        }

        return {
            whatsappNumber,
            instagramUrl: `https://www.instagram.com/${instagramUsername}/`,
            basecampAddress
        };
    }

    function readContactSettings() {
        const serialized = localStorage.getItem(contactSettingsKey);
        return normalizeContactSettings(
            serialized === null ? defaultContactSettings : JSON.parse(serialized)
        );
    }

    function saveContactSettings(settings) {
        const normalized = normalizeContactSettings(settings);
        localStorage.setItem(contactSettingsKey, JSON.stringify(normalized));
        window.dispatchEvent(new CustomEvent("jeepfuntrip-contact-settings-updated", {
            detail: normalized
        }));
        return normalized;
    }

    function ensureCollection(name) {
        if (!collectionNames.includes(name)) throw new Error(`Koleksi lokal tidak dikenal: ${name}`);
    }

    function readAll() {
        const serialized = localStorage.getItem(dataKey);
        const data = serialized === null
            ? { bookings: [], packages: [], articles: [], gallery: [] }
            : JSON.parse(serialized);
        if (!data || typeof data !== "object" ||
            collectionNames.some(name => !Array.isArray(data[name]))) {
            throw new Error("Data lokal tidak valid. Hapus data situs lokal untuk memulai ulang.");
        }
        seedDefaultContent(data);
        migrateArticleAudience(data);
        return data;
    }

    function migrateArticleAudience(data) {
        let changed = false;
        const defaultsById = new Map(defaultContent.articles.map(article => [article.id, article.target_audience]));
        data.articles.forEach(article => {
            if (!article.target_audience && defaultsById.has(article.id)) {
                article.target_audience = defaultsById.get(article.id);
                changed = true;
            }
        });
        if (changed) saveAll(data);
    }

    function seedDefaultContent(data) {
        if (localStorage.getItem(seedKey) === "complete") return;

        for (const name of Object.keys(defaultContent)) {
            const existingIds = new Set(data[name].map(item => item.id));
            data[name].push(...defaultContent[name].filter(item => !existingIds.has(item.id)));
        }
        saveAll(data);
        localStorage.setItem(seedKey, "complete");
    }

    function seedFeaturedArticles(articles) {
        if (localStorage.getItem(featuredArticlesSeedKey) === "complete") return;
        if (!Array.isArray(articles)) throw new Error("Katalog artikel tidak tersedia.");

        const data = readAll();
        const existingIds = new Set(data.articles.map(article => article.id));
        articles.forEach(article => {
            if (!article.id || existingIds.has(article.id)) return;
            data.articles.push({
                id: article.id,
                title: article.title.id,
                title_en: article.title.en,
                published_at: article.publishedAt,
                excerpt: article.excerpt.id,
                excerpt_en: article.excerpt.en,
                content: article.paragraphs.id.join("\n\n"),
                content_en: article.paragraphs.en.join("\n\n"),
                image_url: article.image,
                image_credit: article.credit,
                image_source: article.source,
                alt_text: article.alt.id,
                alt_text_en: article.alt.en,
                target_audience: "Wisatawan umum",
                published: true
            });
            existingIds.add(article.id);
        });
        saveAll(data);
        localStorage.setItem(featuredArticlesSeedKey, "complete");
    }

    function saveAll(data) {
        localStorage.setItem(dataKey, JSON.stringify(data));
    }

    function readCollection(name) {
        ensureCollection(name);
        return readAll()[name];
    }

    function upsertRecord(name, record) {
        ensureCollection(name);
        const data = readAll();
        const index = data[name].findIndex(item => item.id === record.id);
        if (index === -1) data[name].push(record);
        else data[name][index] = record;
        saveAll(data);
    }

    function deleteRecord(name, recordId) {
        ensureCollection(name);
        const data = readAll();
        data[name] = data[name].filter(item => item.id !== recordId);
        saveAll(data);
    }

    function addBooking(booking) {
        const data = readAll();
        data.bookings.unshift({
            ...booking,
            id: globalThis.crypto.randomUUID(),
            created_at: new Date().toISOString(),
            status: "baru"
        });
        saveAll(data);
    }

    function updateBookingStatus(bookingId, status) {
        const data = readAll();
        const booking = data.bookings.find(item => item.id === bookingId);
        if (!booking) throw new Error("Booking lokal tidak ditemukan.");
        booking.status = status;
        saveAll(data);
    }

    function getCredential() {
        const serialized = localStorage.getItem(credentialKey);
        return serialized === null ? null : JSON.parse(serialized);
    }

    function saveCredential(credential) {
        localStorage.setItem(credentialKey, JSON.stringify(credential));
    }

    window.JeepFunTripLocalData = {
        isLocalOrigin,
        readAll,
        readCollection,
        contactSettingsKey,
        readContactSettings,
        saveContactSettings,
        upsertRecord,
        deleteRecord,
        addBooking,
        updateBookingStatus,
        getCredential,
        saveCredential,
        seedFeaturedArticles
    };
})();
