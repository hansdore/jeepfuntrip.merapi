const adminRecordTypes = {
    packages: {
        table: "packages",
        title: "Paket & Rute",
        description: "Kelola harga, durasi, status aktif, dan daftar rute paket.",
        fields: ["id", "name", "price", "duration", "routes", "active"],
        labelField: "name",
        emptyRecord: { id: "paket-baru", name: "Nama Paket", price: 0, duration: "Durasi", routes: [], active: false }
    },
    articles: {
        table: "articles",
        title: "Artikel",
        description: "Kelola judul, foto, caption, sasaran pembaca, isi artikel, dan status tayang.",
        fields: ["id", "title", "title_en", "published_at", "excerpt", "excerpt_en", "content", "content_en", "image_url", "alt_text", "alt_text_en", "image_credit", "image_source", "target_audience", "published"],
        labelField: "title",
        emptyRecord: {
            id: "artikel-baru",
            title: "Judul artikel",
            title_en: "",
            published_at: new Date().toISOString().slice(0, 10),
            excerpt: "",
            excerpt_en: "",
            content: "",
            content_en: "",
            image_url: "",
            alt_text: "",
            alt_text_en: "",
            image_credit: "",
            image_source: "",
            target_audience: "Wisatawan umum",
            published: false
        }
    },
    gallery: {
        table: "gallery",
        title: "Galeri Foto",
        description: "Kelola foto, keterangan, atribusi, urutan, dan status tampil.",
        fields: ["id", "caption", "image_url", "alt_text", "credit", "source", "sort_order", "published"],
        labelField: "caption",
        emptyRecord: { id: "foto-baru", caption: "Keterangan foto", image_url: "", alt_text: "", credit: "", source: "", sort_order: 0, published: false }
    }
};

let activeRecordType = "packages";
let creatingRecord = false;

document.addEventListener("DOMContentLoaded", initializeAdmin);

async function initializeAdmin() {
    const config = window.APP_CONFIG;
    const loginForm = document.getElementById("adminLoginForm");
    const signOutButton = document.getElementById("signOutButton");
    if (config?.adminEmail) document.getElementById("adminEmail").value = config.adminEmail;

    const localData = window.JeepFunTripLocalData;
    if (!localData) {
        showLoginError("Data lokal tidak tersedia. Pastikan local-data.js dimuat.");
        loginForm.addEventListener("submit", event => event.preventDefault());
        return;
    }
    if (window.location.protocol === "file:" || !localData.isLocalOrigin()) {
        showLoginError("Mode lokal memerlukan server lokal. Buka melalui alamat localhost, bukan file://.");
        loginForm.addEventListener("submit", event => event.preventDefault());
        return;
    }

    try {
        localData.seedFeaturedArticles(window.JeepFunTripFeaturedArticles);
    } catch (error) {
        showLoginError(`Artikel lokal gagal dimuat: ${error.message}`);
        loginForm.addEventListener("submit", event => event.preventDefault());
        return;
    }

    loginForm.addEventListener("submit", handleAdminLogin);
    signOutButton.addEventListener("click", handleAdminSignOut);
    initializeAdminControls();
    updateLocalLoginPrompt();

    try {
        if (localStorage.getItem("jeepfuntrip-local-admin-session") === "active") {
            const credential = localData.getCredential();
            await showLocalAdminDashboard(credential?.email || config.adminEmail);
        }
    } catch (error) {
        showLoginError(`Tidak dapat membaca sesi admin lokal: ${error.message}`);
    }
}

function initializeAdminControls() {
    document.querySelectorAll(".admin-tab").forEach(button => {
        button.addEventListener("click", () => selectAdminView(button.dataset.adminView));
    });
    document.querySelectorAll(".admin-refresh").forEach(button => {
        button.addEventListener("click", loadBookings);
    });
    document.getElementById("newRecordButton").addEventListener("click", startNewRecord);
    document.getElementById("refreshRecordsButton").addEventListener("click", loadActiveRecords);
    document.getElementById("cancelRecordButton").addEventListener("click", closeRecordEditor);
    document.getElementById("recordEditor").addEventListener("submit", saveRecord);
    document.getElementById("refreshOverviewButton").addEventListener("click", loadAdminOverview);
    document.getElementById("contactSettingsForm").addEventListener("submit", saveAdminContactSettings);
    document.getElementById("accountSettingsForm").addEventListener("submit", saveAdminAccountSettings);
}

function updateLocalLoginPrompt() {
    const passwordInput = document.getElementById("adminPassword");
    const passwordLabel = document.querySelector('label[for="adminPassword"]');
    const submitButton = document.querySelector("#adminLoginForm button[type='submit']");
    let credential;
    try {
        credential = window.JeepFunTripLocalData.getCredential();
    } catch (error) {
        showLoginError(`Data kredensial lokal tidak dapat dibaca: ${error.message}`);
        return;
    }

    const isSetup = !credential;
    document.getElementById("adminEmail").value = credential?.email || window.APP_CONFIG.adminEmail;
    document.querySelector("#adminLoginPanel > p").textContent = isSetup
        ? "Mode prototipe lokal: buat password admin saat pertama kali membuka panel. Data hanya tersimpan di browser ini."
        : "Masuk dengan password admin lokal yang dibuat di browser ini.";
    passwordLabel.textContent = isSetup ? "Buat password admin lokal" : "Password admin lokal";
    passwordInput.autocomplete = isSetup ? "new-password" : "current-password";
    passwordInput.minLength = isSetup ? 8 : 1;
    submitButton.innerHTML = isSetup
        ? '<i class="fa-solid fa-user-plus"></i> Buat admin lokal'
        : '<i class="fa-solid fa-right-to-bracket"></i> Masuk';
}

async function handleAdminLogin(event) {
    event.preventDefault();
    const email = document.getElementById("adminEmail").value.trim().toLowerCase();
    const password = document.getElementById("adminPassword").value;
    try {
        const localData = window.JeepFunTripLocalData;
        const credential = localData.getCredential();
        const allowedEmail = (credential?.email || window.APP_CONFIG.adminEmail).trim().toLowerCase();
        if (email !== allowedEmail) {
            showLoginError("Email ini tidak diizinkan sebagai admin.");
            return;
        }
        if (!credential) {
            if (password.length < 8) {
                showLoginError("Password admin lokal minimal 8 karakter.");
                return;
            }
            const salt = window.crypto.getRandomValues(new Uint8Array(16));
            const saltHex = Array.from(salt, byte => byte.toString(16).padStart(2, "0")).join("");
            localData.saveCredential({
                email,
                salt: saltHex,
                hash: await deriveLocalPasswordHash(password, salt)
            });
        } else {
            const salt = Uint8Array.from(credential.salt.match(/.{2}/g), pair => parseInt(pair, 16));
            const hash = await deriveLocalPasswordHash(password, salt);
            if (hash !== credential.hash) {
                showLoginError("Password admin lokal salah.");
                return;
            }
        }
        localStorage.setItem("jeepfuntrip-local-admin-session", "active");
        document.getElementById("adminPassword").value = "";
        await showLocalAdminDashboard(email);
    } catch (error) {
        showLoginError(`Login admin lokal gagal: ${error.message}`);
    }
}

async function deriveLocalPasswordHash(password, salt) {
    if (!window.crypto?.subtle) throw new Error("Web Crypto tidak tersedia. Jalankan situs melalui localhost.");
    const key = await window.crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveBits"]
    );
    const bits = await window.crypto.subtle.deriveBits({
        name: "PBKDF2",
        salt,
        iterations: 120000,
        hash: "SHA-256"
    }, key, 256);
    return Array.from(new Uint8Array(bits), byte => byte.toString(16).padStart(2, "0")).join("");
}

async function showLocalAdminDashboard(email) {
    document.getElementById("adminLoginPanel").hidden = true;
    document.getElementById("adminDashboard").hidden = false;
    document.getElementById("signedInAs").textContent = `Login lokal sebagai ${email}`;
    document.getElementById("loginError").hidden = true;
    await Promise.all([loadAdminOverview(), loadBookings()]);
}

async function handleAdminSignOut() {
    try {
        localStorage.removeItem("jeepfuntrip-local-admin-session");
    } catch (error) {
        showAdminNotice(`Gagal mengakhiri sesi lokal: ${error.message}`, true);
        return;
    }
    document.getElementById("adminDashboard").hidden = true;
    document.getElementById("adminLoginPanel").hidden = false;
    document.getElementById("adminPassword").value = "";
    updateLocalLoginPrompt();
}

function selectAdminView(viewName) {
    const isOverview = viewName === "overview";
    const isBookings = viewName === "bookings";
    const isContact = viewName === "contact";
    const isAccount = viewName === "account";
    document.getElementById("adminOverviewView").hidden = !isOverview;
    document.getElementById("adminBookingsView").hidden = !isBookings;
    document.getElementById("adminRecordsView").hidden = !adminRecordTypes[viewName];
    document.getElementById("adminContactView").hidden = !isContact;
    document.getElementById("adminAccountView").hidden = !isAccount;
    document.querySelectorAll(".admin-tab").forEach(button => {
        button.classList.toggle("active", button.dataset.adminView === viewName);
    });

    if (!isBookings && !isOverview && adminRecordTypes[viewName]) {
        activeRecordType = viewName;
        document.getElementById("recordsTitle").textContent = adminRecordTypes[viewName].title;
        document.getElementById("recordsDescription").textContent = adminRecordTypes[viewName].description;
        closeRecordEditor();
        loadActiveRecords();
    }
    if (isContact) loadAdminContactSettings();
    if (isAccount) loadAdminAccountSettings();
    if (isOverview) loadAdminOverview();
}

function loadAdminAccountSettings() {
    const message = document.getElementById("accountSettingsMessage");
    message.hidden = true;
    message.classList.remove("admin-error");
    try {
        const credential = window.JeepFunTripLocalData.getCredential();
        document.getElementById("accountEmail").value = credential?.email || window.APP_CONFIG.adminEmail;
    } catch (error) {
        message.textContent = `Pengaturan akun lokal gagal dimuat: ${error.message}`;
        message.classList.add("admin-error");
        message.hidden = false;
    }
}

async function saveAdminAccountSettings(event) {
    event.preventDefault();
    const message = document.getElementById("accountSettingsMessage");
    message.hidden = true;
    message.classList.remove("admin-error");

    try {
        const localData = window.JeepFunTripLocalData;
        const credential = localData.getCredential();
        if (!credential) throw new Error("Kredensial admin lokal tidak ditemukan.");

        const currentPassword = document.getElementById("accountCurrentPassword").value;
        const currentHash = await deriveLocalPasswordHash(
            currentPassword,
            Uint8Array.from(credential.salt.match(/.{2}/g), pair => parseInt(pair, 16))
        );
        if (currentHash !== credential.hash) throw new Error("Password saat ini salah.");

        const email = document.getElementById("accountEmail").value.trim().toLowerCase();
        const newPassword = document.getElementById("accountNewPassword").value;
        const confirmPassword = document.getElementById("accountConfirmPassword").value;
        if (newPassword && newPassword.length < 8) throw new Error("Password baru minimal 8 karakter.");
        if (newPassword !== confirmPassword) throw new Error("Konfirmasi password baru tidak cocok.");

        const updatedCredential = { ...credential, email };
        if (newPassword) {
            const salt = window.crypto.getRandomValues(new Uint8Array(16));
            updatedCredential.salt = Array.from(salt, byte => byte.toString(16).padStart(2, "0")).join("");
            updatedCredential.hash = await deriveLocalPasswordHash(newPassword, salt);
        }
        localData.saveCredential(updatedCredential);
        document.getElementById("signedInAs").textContent = `Login lokal sebagai ${email}`;
        document.getElementById("accountCurrentPassword").value = "";
        document.getElementById("accountNewPassword").value = "";
        document.getElementById("accountConfirmPassword").value = "";
        message.textContent = "Pengaturan akun berhasil diperbarui.";
    } catch (error) {
        message.textContent = `Pengaturan akun gagal disimpan: ${error.message}`;
        message.classList.add("admin-error");
    }
    message.hidden = false;
}

function loadAdminContactSettings() {
    const message = document.getElementById("contactSettingsMessage");
    message.hidden = true;
    message.classList.remove("admin-error");
    try {
        const settings = window.JeepFunTripLocalData.readContactSettings();
        document.getElementById("contactWhatsappNumber").value = settings.whatsappNumber;
        document.getElementById("contactInstagramUrl").value = settings.instagramUrl;
        document.getElementById("contactBasecampAddress").value = settings.basecampAddress;
    } catch (error) {
        message.textContent = `Informasi kontak lokal gagal dimuat: ${error.message}`;
        message.classList.add("admin-error");
        message.hidden = false;
    }
}

function saveAdminContactSettings(event) {
    event.preventDefault();
    const message = document.getElementById("contactSettingsMessage");
    message.hidden = true;
    message.classList.remove("admin-error");

    try {
        const settings = window.JeepFunTripLocalData.saveContactSettings({
            whatsappNumber: document.getElementById("contactWhatsappNumber").value,
            instagramUrl: document.getElementById("contactInstagramUrl").value,
            basecampAddress: document.getElementById("contactBasecampAddress").value
        });
        document.getElementById("contactWhatsappNumber").value = settings.whatsappNumber;
        document.getElementById("contactInstagramUrl").value = settings.instagramUrl;
        document.getElementById("contactBasecampAddress").value = settings.basecampAddress;
        message.textContent = "Informasi kontak berhasil disimpan dan diperbarui di website.";
    } catch (error) {
        message.textContent = `Informasi kontak gagal disimpan: ${error.message}`;
        message.classList.add("admin-error");
    }
    message.hidden = false;
}

async function loadAdminOverview() {
    try {
        const data = window.JeepFunTripLocalData.readAll();
        const publishedPackages = data.packages.filter(item => item.active).length;
        const publishedArticles = data.articles.filter(item => item.published).length;
        const publishedPhotos = data.gallery.filter(item => item.published).length;
        document.getElementById("overviewBookingCount").textContent = data.bookings.length.toLocaleString("id-ID");
        document.getElementById("overviewContentCount").textContent =
            (publishedPackages + publishedArticles + publishedPhotos).toLocaleString("id-ID");
    } catch (error) {
        showVisitorNotice(`Ringkasan lokal gagal dimuat: ${error.message}`, true);
        return;
    }

    loadVisitorAnalytics();
}

function loadVisitorAnalytics() {
    const report = document.getElementById("visitorReport");
    const todayViews = document.getElementById("visitorViewsToday");
    const weekViews = document.getElementById("visitorViews7");
    const monthViews = document.getElementById("visitorViews30");
    report.replaceChildren();

    todayViews.textContent = "—";
    weekViews.textContent = "— kunjungan dalam 7 hari";
    monthViews.textContent = "—";
    report.append(createVisitorMessage("Statistik kunjungan tidak tersedia dalam mode lokal."));
    showVisitorNotice("Mode lokal tidak mengirim statistik kunjungan.");
}

function createVisitorMessage(message) {
    const element = document.createElement("p");
    element.className = "admin-empty";
    element.textContent = message;
    return element;
}

function showVisitorNotice(message, isError = false) {
    const notice = document.getElementById("visitorNotice");
    notice.textContent = message;
    notice.classList.toggle("admin-error", isError);
    notice.hidden = false;
}

async function loadBookings() {
    const tbody = document.getElementById("bookingsTableBody");
    tbody.replaceChildren();
    let data;
    try {
        data = window.JeepFunTripLocalData.readCollection("bookings")
            .sort((first, second) => second.created_at.localeCompare(first.created_at))
            .slice(0, 250);
    } catch (error) {
        showAdminNotice(`Tidak dapat memuat data booking lokal: ${error.message}`, true);
        return;
    }
    showAdminNotice(`${data.length} data booking dimuat.`);
    if (!data.length) {
        tbody.append(createTableMessage("Belum ada booking masuk."));
        return;
    }

    data.forEach(booking => {
        const row = document.createElement("tr");
        appendCell(row, new Date(booking.created_at).toLocaleString("id-ID"));
        appendCell(row, booking.full_name);
        appendCell(row, `${booking.package_name}\n${booking.route_name}`);
        appendCell(row, new Date(`${booking.trip_date}T00:00:00`).toLocaleDateString("id-ID"));
        appendCell(row, `${booking.jeep_count} Jeep\n${booking.participant_count} orang`);
        appendCell(row, `Rp ${Number(booking.total_price).toLocaleString("id-ID")}`);

        const statusCell = document.createElement("td");
        const statusSelect = document.createElement("select");
        ["baru", "dikonfirmasi", "selesai", "dibatalkan"].forEach(status => {
            statusSelect.add(new Option(status, status));
        });
        statusSelect.value = booking.status;
        colorBookingStatus(statusSelect);
        statusSelect.setAttribute("aria-label", `Status booking ${booking.full_name}`);
        statusSelect.addEventListener("change", () => {
            colorBookingStatus(statusSelect);
            updateBookingStatus(booking.id, statusSelect.value, statusSelect);
        });
        statusCell.append(statusSelect);
        row.append(statusCell);
        tbody.append(row);
    });
}

function createTableMessage(message) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 7;
    cell.className = "admin-empty";
    cell.textContent = message;
    row.append(cell);
    return row;
}

function appendCell(row, value) {
    const cell = document.createElement("td");
    cell.textContent = value;
    row.append(cell);
}

function colorBookingStatus(select) {
    select.className = `booking-status-select booking-status-${select.value}`;
}

async function updateBookingStatus(bookingId, status, select) {
    select.disabled = true;
    try {
        window.JeepFunTripLocalData.updateBookingStatus(bookingId, status);
    } catch (error) {
        showAdminNotice(`Status booking tidak berhasil disimpan: ${error.message}`, true);
        await loadBookings();
        return;
    } finally {
        select.disabled = false;
    }
    showAdminNotice("Status booking lokal berhasil diperbarui.");
}

async function loadActiveRecords() {
    const definition = adminRecordTypes[activeRecordType];
    const list = document.getElementById("recordsList");
    list.replaceChildren();

    let data;
    try {
        data = window.JeepFunTripLocalData.readCollection(activeRecordType)
            .sort((first, second) => first.id.localeCompare(second.id));
    } catch (error) {
        showAdminNotice(`Tidak dapat memuat ${definition.title.toLowerCase()} lokal: ${error.message}`, true);
        return;
    }
    showAdminNotice(`${data.length} data ${definition.title.toLowerCase()} dimuat.`);
    if (!data.length) {
        const empty = document.createElement("p");
        empty.className = "admin-empty";
        empty.textContent = "Belum ada data. Gunakan tombol Tambah data untuk membuat data pertama.";
        list.append(empty);
        return;
    }

    data.forEach(record => {
        const card = document.createElement("article");
        card.className = `admin-record admin-record-${activeRecordType}`;
        if (record.image_url) {
            const image = document.createElement("img");
            image.className = "admin-record-image";
            image.src = record.image_url;
            image.alt = record.alt_text || record.title || record.caption || "";
            image.loading = "lazy";
            card.append(image);
        }
        const details = document.createElement("div");
        details.className = "admin-record-details";
        const title = document.createElement("h3");
        title.textContent = record[definition.labelField] || record.id;
        const summary = document.createElement("p");
        summary.className = `status-chip ${(record.published || record.active) ? "status-published" : "status-draft"}`;
        summary.textContent = record.published === undefined
            ? (record.active ? "Paket aktif" : "Paket disembunyikan")
            : (record.published ? "Tayang di website" : "Draft · belum tampil");
        details.append(title, summary);
        if (record.target_audience) {
            const audience = document.createElement("span");
            audience.className = "audience-chip";
            audience.textContent = `Untuk: ${record.target_audience}`;
            details.append(audience);
        }
        const caption = record.excerpt || record.caption;
        if (caption) {
            const captionText = document.createElement("p");
            captionText.className = "admin-record-caption";
            captionText.textContent = caption;
            details.append(captionText);
        }

        const actions = document.createElement("div");
        actions.className = "admin-actions";
        const editButton = document.createElement("button");
        editButton.className = "btn btn-record-edit";
        editButton.type = "button";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editRecord(record));
        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-record-delete";
        deleteButton.type = "button";
        deleteButton.textContent = "Hapus";
        deleteButton.addEventListener("click", () => deleteRecord(record));
        actions.append(editButton, deleteButton);
        card.append(details, actions);
        list.append(card);
    });
}

function startNewRecord() {
    openRecordEditor({ ...adminRecordTypes[activeRecordType].emptyRecord }, true);
}

function editRecord(record) {
    openRecordEditor({ ...record }, false);
}

function openRecordEditor(record, isNew) {
    const definition = adminRecordTypes[activeRecordType];
    creatingRecord = isNew;
    document.getElementById("recordEditorTitle").textContent =
        `${isNew ? "Tambah" : "Edit"} ${definition.title.toLowerCase()}`;
    document.getElementById("recordEditorDescription").textContent =
        activeRecordType === "packages"
            ? "Atur informasi paket dan rute. Tulis satu nama lokasi pada setiap baris."
            : "Isi formulir dan gunakan pratinjau untuk memastikan foto, caption, serta status tampil sudah sesuai.";
    buildRecordFields(record);
    document.getElementById("recordError").hidden = true;
    document.getElementById("recordEditor").hidden = false;
    updateRecordPreview();
    document.getElementById("recordEditor").scrollIntoView({ behavior: "smooth", block: "start" });
}

function addEditorField(container, labelText, name, value, options = {}) {
    const wrapper = document.createElement("div");
    wrapper.className = `record-field${options.wide ? " record-field-wide" : ""}`;
    const label = document.createElement("label");
    label.textContent = labelText;
    const control = options.multiline ? document.createElement("textarea") : document.createElement("input");
    control.name = name;
    if (options.multiline) control.rows = options.rows || 3;
    else control.type = options.type || "text";
    if (options.required) control.required = true;
    if (options.readOnly) control.readOnly = true;
    if (options.min !== undefined) control.min = String(options.min);
    if (options.step !== undefined) control.step = String(options.step);
    if (options.placeholder) control.placeholder = options.placeholder;
    if (options.multiline) control.value = value || "";
    else if (options.type === "checkbox") control.checked = Boolean(value);
    else control.value = value ?? "";
    label.append(control);
    wrapper.append(label);
    container.append(wrapper);
    control.addEventListener("input", updateRecordPreview);
    control.addEventListener("change", updateRecordPreview);
    return control;
}

function buildRecordFields(record) {
    const fields = document.getElementById("recordFields");
    fields.replaceChildren();
    addEditorField(fields, "ID / slug", "id", record.id, {
        required: true,
        readOnly: !creatingRecord
    });

    if (activeRecordType === "packages") {
        addEditorField(fields, "Nama paket", "name", record.name, { required: true });
        addEditorField(fields, "Harga per Jeep (Rp)", "price", record.price, { type: "number", min: 0, step: 1000, required: true });
        addEditorField(fields, "Durasi", "duration", record.duration, { required: true });
        addEditorField(fields, "Tampilkan di website", "active", record.active, { type: "checkbox" });
        const routesHeading = document.createElement("div");
        routesHeading.className = "record-field-heading record-field-wide";
        const title = document.createElement("h4");
        title.textContent = "Rute paket";
        const addRouteButton = document.createElement("button");
        addRouteButton.className = "btn btn-secondary";
        addRouteButton.type = "button";
        addRouteButton.textContent = "Tambah rute";
        addRouteButton.addEventListener("click", () => {
            addRouteEditor(document.getElementById("routeEditorList"), { id: "", option: "", stops: [] });
            updateRecordPreview();
        });
        routesHeading.append(title, addRouteButton);
        fields.append(routesHeading);
        const routeList = document.createElement("div");
        routeList.id = "routeEditorList";
        routeList.className = "route-editor-list record-field-wide";
        (record.routes || []).forEach(route => addRouteEditor(routeList, route));
        fields.append(routeList);
    } else if (activeRecordType === "articles") {
        addEditorField(fields, "Judul artikel (Bahasa Indonesia)", "title", record.title, { required: true });
        addEditorField(fields, "Judul artikel (English)", "title_en", record.title_en);
        addEditorField(fields, "Tanggal tayang", "published_at", record.published_at, { type: "date", required: true });
        addEditorField(fields, "Sasaran pembaca", "target_audience", record.target_audience || "Wisatawan umum", {
            placeholder: "Contoh: keluarga, pemula, pencinta sunrise",
            required: true
        });
        addEditorField(fields, "Ringkasan (Bahasa Indonesia)", "excerpt", record.excerpt, { multiline: true, rows: 3, wide: true, required: true });
        addEditorField(fields, "Ringkasan (English)", "excerpt_en", record.excerpt_en, { multiline: true, rows: 3, wide: true });
        addEditorField(fields, "Isi artikel (Bahasa Indonesia)", "content", record.content, { multiline: true, rows: 10, wide: true, required: true });
        addEditorField(fields, "Isi artikel (English)", "content_en", record.content_en, { multiline: true, rows: 10, wide: true });
        addEditorField(fields, "URL foto", "image_url", record.image_url, { wide: true, required: true, placeholder: "https://..." });
        addEditorField(fields, "Teks alternatif foto", "alt_text", record.alt_text);
        addEditorField(fields, "Teks alternatif foto (English)", "alt_text_en", record.alt_text_en);
        addEditorField(fields, "Kredit foto", "image_credit", record.image_credit, { placeholder: "Nama pemilik / lisensi" });
        addEditorField(fields, "Tautan sumber foto", "image_source", record.image_source, { placeholder: "https://..." });
        addEditorField(fields, "Publikasikan di website", "published", record.published, { type: "checkbox" });
    } else {
        addEditorField(fields, "Caption foto", "caption", record.caption, { required: true });
        addEditorField(fields, "Teks alternatif foto", "alt_text", record.alt_text, { required: true });
        addEditorField(fields, "Urutan tampil", "sort_order", record.sort_order, { type: "number", min: 0, step: 1 });
        addEditorField(fields, "URL foto", "image_url", record.image_url, { wide: true, required: true, placeholder: "https://..." });
        addEditorField(fields, "Kredit foto", "credit", record.credit, { placeholder: "Nama pemilik / lisensi" });
        addEditorField(fields, "Tautan sumber foto", "source", record.source, { placeholder: "https://..." });
        addEditorField(fields, "Publikasikan di website", "published", record.published, { type: "checkbox" });
    }
}

function addRouteEditor(container, route) {
    const card = document.createElement("fieldset");
    card.className = "route-editor-card";
    const legend = document.createElement("legend");
    legend.textContent = "Rute";
    const fields = document.createElement("div");
    fields.className = "route-editor-fields";
    const routeId = addEditorField(fields, "ID rute", "route-id", route.id, { required: true });
    const option = addEditorField(fields, "Nama opsi", "route-option", route.option, { required: true });
    const stops = addEditorField(fields, "Lokasi (satu per baris)", "route-stops", (route.stops || []).join("\n"), {
        multiline: true,
        rows: 4,
        wide: true,
        required: true,
        placeholder: "Mini Museum Sisa Hartaku\nBatu Alien, Kaliadem"
    });
    [routeId, option, stops].forEach(field => field.addEventListener("input", updateRecordPreview));
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-danger";
    removeButton.type = "button";
    removeButton.textContent = "Hapus rute ini";
    removeButton.addEventListener("click", () => {
        card.remove();
        updateRecordPreview();
    });
    card.append(legend, fields, removeButton);
    container.append(card);
}

function editorValue(name) {
    const control = document.querySelector(`#recordFields [name="${name}"]`);
    if (!control) return "";
    if (control.type === "checkbox") return control.checked;
    if (control.type === "number") return Number(control.value);
    return control.value.trim();
}

function collectEditorRecord() {
    const definition = adminRecordTypes[activeRecordType];
    const record = {};
    definition.fields.forEach(field => {
        record[field] = editorValue(field);
    });
    record.id = editorValue("id");
    if (activeRecordType === "packages") {
        record.routes = [...document.querySelectorAll("#routeEditorList .route-editor-card")].map(card => ({
            id: card.querySelector('[name="route-id"]').value.trim(),
            option: card.querySelector('[name="route-option"]').value.trim(),
            stops: card.querySelector('[name="route-stops"]').value.split(/\r?\n/).map(stop => stop.trim()).filter(Boolean)
        }));
    }
    return record;
}

function updateRecordPreview() {
    const preview = document.getElementById("recordPreview");
    if (!preview) return;
    const record = collectEditorRecord();
    preview.replaceChildren();
    const label = document.createElement("span");
    label.className = `preview-category preview-${activeRecordType}`;
    label.textContent = adminRecordTypes[activeRecordType].title;
    const title = document.createElement("h4");
    title.textContent = record.title || record.name || record.caption || "Pratinjau konten";
    const imageUrl = record.image_url;
    if (imageUrl) {
        const image = document.createElement("img");
        image.className = "record-preview-image";
        image.src = imageUrl;
        image.alt = record.alt_text || record.title || record.caption || "";
        image.addEventListener("error", () => {
            image.alt = "Foto tidak dapat dimuat. Periksa kembali URL foto.";
            image.classList.add("preview-image-error");
        }, { once: true });
        preview.append(label, image, title);
    } else {
        preview.append(label, title);
        const placeholder = document.createElement("div");
        placeholder.className = "preview-image-placeholder";
        placeholder.textContent = "Pratinjau foto akan muncul di sini";
        preview.append(placeholder);
    }
    const caption = document.createElement("p");
    caption.className = "preview-caption";
    caption.textContent = record.excerpt || record.caption || record.duration || "";
    preview.append(caption);
    if (record.target_audience) {
        const audience = document.createElement("span");
        audience.className = "audience-chip";
        audience.textContent = `Untuk: ${record.target_audience}`;
        preview.append(audience);
    }
    const status = document.createElement("span");
    status.className = `status-chip ${(record.published || record.active) ? "status-published" : "status-draft"}`;
    status.textContent = activeRecordType === "packages"
        ? (record.active ? "Aktif di website" : "Tidak ditampilkan")
        : (record.published ? "Tayang di website" : "Draft");
    preview.append(status);
}

async function saveRecord(event) {
    event.preventDefault();
    const definition = adminRecordTypes[activeRecordType];
    const record = collectEditorRecord();
    if (!record.id) {
        showRecordError("ID / slug wajib diisi.");
        return;
    }
    if (activeRecordType === "packages" &&
        (!Array.isArray(record.routes) || record.routes.some(route =>
            !route.id || !route.option || !route.stops.length))) {
        showRecordError("Setiap rute wajib memiliki ID, nama opsi, dan minimal satu lokasi.");
        return;
    }

    const values = Object.fromEntries(definition.fields.map(field => [field, record[field]]));
    try {
        window.JeepFunTripLocalData.upsertRecord(activeRecordType, values);
    } catch (error) {
        showRecordError(`Gagal menyimpan data lokal: ${error.message}`);
        return;
    }
    closeRecordEditor();
    showAdminNotice(`${definition.title} berhasil disimpan.`);
    await loadActiveRecords();
}

async function deleteRecord(record) {
    const definition = adminRecordTypes[activeRecordType];
    if (!window.confirm(`Hapus "${record[definition.labelField] || record.id}"? Tindakan ini tidak dapat dibatalkan.`)) return;

    try {
        window.JeepFunTripLocalData.deleteRecord(activeRecordType, record.id);
    } catch (error) {
        showAdminNotice(`Gagal menghapus data lokal: ${error.message}`, true);
        return;
    }
    showAdminNotice(`${definition.title} berhasil dihapus.`);
    await loadActiveRecords();
}

function closeRecordEditor() {
    document.getElementById("recordEditor").hidden = true;
    document.getElementById("recordFields").replaceChildren();
    document.getElementById("recordPreview").replaceChildren();
    creatingRecord = false;
}

function showRecordError(message) {
    const error = document.getElementById("recordError");
    error.textContent = message;
    error.hidden = false;
}

function showLoginError(message) {
    const error = document.getElementById("loginError");
    error.textContent = message;
    error.hidden = false;
}

function showAdminNotice(message, isError = false) {
    const notice = document.getElementById("adminNotice");
    notice.textContent = message;
    notice.classList.toggle("admin-error", isError);
    notice.hidden = false;
}
