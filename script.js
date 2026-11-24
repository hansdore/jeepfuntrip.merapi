// --- INISIALISASI ---
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("bookingForm") || document.getElementById("routeDetail")) {
        initializeWebsite();
    }
});

const englishText = {
    metaDescription: "Merapi Jeep tours in Yogyakarta. Choose a package, explore the routes, and book your trip.",
    routeMetaDescription: "See the stops and map for your Merapi Jeep tour route.",
    navHome: "Home",
    navRoutes: "Destinations",
    navPackages: "Tour Packages",
    navGallery: "Trip Gallery",
    navArticles: "Articles",
    navBooking: "Book Now",
    heroBadge: "Local adventure, real stories",
    heroDescription: "Ride a Jeep across volcanic landscapes, hillside villages, and Merapi stories with a local driver.",
    heroPackages: "Find your journey",
    heroExplore: "Discover the area",
    heroFactGuests: "guests per Jeep",
    heroFactSpots: "stops to choose from",
    heroFactLocal: "local basecamp",
    visualBadge: "Trip Highlights",
    visualTitle: "Photos Along the Route",
    visualDescription: "See photos of locations and travel experiences at several Merapi Jeep tour stops. Open Google Maps to view each location.",
    spotMuseum: "A witness to the devastating 2010 Merapi eruption. The collection includes household items, vehicles, and a melted wall clock.",
    spotAlien: "A giant volcanic rock thrown from Mount Merapi's crater, with a distinctive shape resembling a human face.",
    spotBunker: "A historic bunker set against the impressive peak and active crater of Mount Merapi.",
    spotMaridjan: "The historic site of the late Mbah Maridjan's home, remembered as Mount Merapi's iconic guardian.",
    spotTrack: "The most exciting and challenging experience! Ride a Jeep through streams and water pools—expect to get wet.",
    packagesBadge: "Prices & Routes",
    packagesTitle: "Choose Your Merapi Jeep Tour",
    packagesDescription: "Price is per Jeep (maximum capacity: 4 people). Choose your preferred route!",
    perJeep: "/ Jeep",
    chooseShort: "Choose Short Trip",
    chooseShortPlus: "Choose Short Plus",
    chooseMedium: "Choose Medium Trip",
    chooseLong: "Choose Long Trip",
    chooseSunrise: "Choose Sunrise Trip",
    bestSeller: "Best Seller",
    sunriseSpecial: "Sunrise Special",
    durationShort: "1 to 1.5 hours",
    durationShortPlus: "1.5 to 2 hours",
    durationMedium: "2 to 2.5 hours",
    durationLong: "3 to 3.5 hours",
    durationSunrise: "Starts 04:30–07:30",
    galleryBadge: "Trip Memories",
    galleryTitle: "Memorable Moments in Merapi",
    galleryDescription: "Guest trip photos and reference images of Merapi. Click a photo to enlarge it, or open its source to see more details.",
    galleryLava: "Lava Tour journey",
    galleryClock: "Clock damaged in the Merapi eruption",
    galleryDriveGroup: "Jeep group at Merapi",
    galleryDriveRiver: "Guests enjoying the river track",
    galleryDriveSunset: "Sunset with a yellow Jeep",
    galleryDriveJeepPair: "Red and yellow Jeeps with Merapi",
    galleryDriveRedJeep: "Guests posing in front of Merapi",
    articlesBadge: "Blog & Travel Guide",
    articlesTitle: "Merapi Travel Articles",
    articlesDescription: "Explore useful information, local history, and tips before your Merapi Jeep tour.",
    article1Title: "How to Enjoy a Golden Sunrise at Mount Merapi",
    article1Excerpt: "Helpful Sunrise Trip preparations: warm clothing, departure time, and scenic photo spots.",
    articleDate1: "October 18, 2026",
    article2Title: "The Moving Story Behind Mini Museum Sisa Hartaku",
    article2Excerpt: "Learn about residents' belongings preserved as a reminder of the devastating 2010 eruption.",
    articleDate2: "October 10, 2026",
    article3Title: "Safety Guide for a Merapi Lava Tour",
    article3Excerpt: "Wear comfortable clothing, secure your belongings, and follow your driver's instructions throughout the trip.",
    articleDate3: "October 2, 2026",
    readArticle: "Read the full article",
    loadMoreArticles: count => `Load ${count} more article${count === 1 ? "" : "s"}`,
    articleCount: (shown, total) => `Showing ${shown} of ${total} articles`,
    bookingBadge: "Quick Booking",
    bookingTitle: "Book Your Jeep FunTrip Merapi Trip",
    bookingDescription: "Fill in your booking details below. Your booking will be recorded in the system, and a WhatsApp message will be prepared for the administrator.",
    fullName: "Full Name",
    namePlaceholder: "Enter your name",
    selectPackage: "Choose a Tour Package",
    selectRoute: "Choose a Route",
    routeDetails: "View route details & map",
    tripDate: "Trip Date",
    jeepCount: "Number of Jeeps",
    participantCount: "Number of Guests",
    participantPlaceholder: "Max. 4 people per Jeep",
    totalCost: "Total:",
    whatsappSubmit: "Chat with us on WhatsApp",
    routeBack: "Back to tour packages",
    routeNotFound: "Route not found. Please choose a package and route option from the home page.",
    mapBadge: "Google Maps",
    mapTitle: "Route Map",
    openDirections: "Open directions",
    mapNote: "The map shows destinations from Google Maps. Off-road paths, access conditions, and the actual order of stops may change based on the operator's guidance and local conditions.",
    stopSequence: "Stops along the route",
    bookThisRoute: "Choose this route and book",
    routeFooter: "Maps by Google Maps. Licensed location photos link to their original sources.",
    routeOption: "Option",
    routeMapLink: "View location on Google Maps",
    routePriceDescription: (price, count) => `Price: IDR ${price} per Jeep. This route includes ${count} ${count === 1 ? "stop" : "stops"} based on the selected package.`,
    packagePlaceholder: "-- Choose a package --",
    packageFirst: "-- Choose a package first --",
    routePlaceholder: "-- Choose a route option --",
    chooseValid: "Please choose a valid package and route before continuing.",
    checkBooking: "Please check the trip date, number of Jeeps, and number of guests.",
    whatsappMessage: (name, pkg, route, date, jeeps, guests, total) =>
        `Hello Jeep FunTrip Merapi,\n\nI would like to book a Jeep tour with the following details:\n` +
        `• Guest name: ${name}\n• Package: ${pkg}\n• Route: ${route}\n• Trip date: ${date}\n` +
        `• Jeeps: ${jeeps}\n• Guests: ${guests}\n• Total price: IDR ${total}\n\n` +
        `Please confirm availability and the next steps. Thank you!`,
    localOnlyUnavailable: "This booking could not be saved in this browser. Open the website through localhost to save it locally.",
    bookingSaveError: error => `The booking could not be saved to the admin panel: ${error}. Continue in WhatsApp.`,
    bookingSaved: "Booking recorded. Please continue with the confirmation in the WhatsApp window."
};

const englishArticles = [
    `<p>A sunrise trip offers a chance to see the slopes of Merapi as the morning light appears. Weather, mist, and volcanic activity can affect visibility, so a clear sunrise cannot be guaranteed. Enjoy the journey and atmosphere without expecting the sun to appear on schedule.</p>
     <h4>Before you set off</h4>
     <p>Confirm the meeting time and departure point with the operator the day before. Bring a warm jacket or layers, as the early morning air can feel cold, especially while the Jeep is moving. Wear comfortable, non-slip shoes and bring enough drinking water.</p>
     <p>Charge your phone and camera, and keep them in an easy-to-reach pocket or bag. If you bring a camera, pack a spare battery and a small cloth to clean the lens. Avoid carrying too much so you can get in and out of the vehicle comfortably.</p>
     <h4>During the trip</h4>
     <p>Sit securely, use the handholds provided, and follow the driver's instructions. Do not stand on the Jeep or change seats while it is moving. The driver may adjust the route or stop times based on the weather, road conditions, and local regulations.</p>
     <p>If it is cloudy or raining, put safety ahead of getting a photo. Respect restricted areas and stay away from hazardous locations. To compare routes and packages, visit <a href="#paket">Tour Packages</a> or ask the operator for the latest conditions before booking.</p>`,
    `<p>Mini Museum Sisa Hartaku in the Petung area of Kepuharjo preserves belongings that remind visitors how the 2010 Merapi eruption affected local lives. Household items and possessions damaged by hot clouds show that a disaster is not only a natural event—it can also transform an entire community.</p>
     <p>The museum's name invites visitors to pause and reflect on what remains. Each item has its own context and story. Take time to read the displays and, when available, listen to a guide or local resident.</p>
     <h4>Visit with respect</h4>
     <p>This place is connected to loss and recovery. Keep noise to a minimum, do not touch or move the collection without permission, and ask before photographing people or particular rooms. Do not use the preserved belongings as props for jokes or inappropriate photos.</p>
     <p>Management, opening hours, and access conditions may change. Confirm details before setting out and follow the site's instructions. The photo on this page documents an item in the collection; its source and license are linked below the image. Please confirm visitor information directly with the local operator.</p>
     <h4>Part of a Merapi trip</h4>
     <p>The museum can be one stop on a trip that includes other attractions. The order and duration of stops depend on the package, road conditions, and the operator's guidance. Choose a route that fits your schedule and allow enough time to visit the museum thoughtfully.</p>`,
    `<p>A Merapi Lava Tour takes visitors through areas with terrain and conditions that differ from city travel. For a more comfortable trip, wear clothes that allow you to move freely and sturdy footwear. Dust, splashes, or changing weather may occur depending on the route and conditions that day.</p>
     <h4>Look after yourself and your belongings</h4>
     <p>Keep your phone, camera, and documents in a closed or waterproof bag. Do not leave loose items on the edge of the vehicle. Hold onto anything you carry while the Jeep is moving, and avoid using electronic devices on bumpy sections.</p>
     <p>Use the handholds, sit securely, and do not stand or change seats while the Jeep is moving. Children should be accompanied by an adult. If you have a health condition, tell the operator before departure so you can discuss whether the trip is suitable for you.</p>
     <h4>Follow the driver and operator</h4>
     <p>The driver knows the terrain and may change the route or stop the trip if the weather or access becomes unsafe. Follow instructions when getting on or off the vehicle and at each stop. Do not enter closed areas, approach watercourses or cliffs without permission, or ask the driver to break safety rules for a photo.</p>
     <p>A tour route does not guarantee access to a particular area. Mount Merapi activity, weather, and local regulations can change. Check official announcements and confirm current conditions and accessible stops with the operator before booking.</p>
     <h4>After the trip</h4>
     <p>Clean up and check your belongings after leaving the Jeep. Take any rubbish with you until you find a bin. With good preparation and respect for the environment, you can enjoy the trip more comfortably without compromising safety.</p>`
];

const latestArticles = window.JeepFunTripFeaturedArticles;
const featuredArticleIds = new Set(latestArticles.map(article => article.id));
const existingArticleIds = new Set([
    "golden-sunrise-merapi",
    "kisah-museum-sisa-hartaku",
    "panduan-aman-lava-tour"
]);

let currentLanguage = "id";
let localizedDefaults = [];
let localizedContentDefaults = [];
let articleDefaults = [];
let websiteInitialized = false;
let localFeaturedArticles = new Map();
let useLocalFeaturedArticles = false;

function initializeLanguage() {
    const queryLanguage = new URLSearchParams(window.location.search).get("lang");
    let preferredLanguage = queryLanguage === "en" || queryLanguage === "id"
        ? queryLanguage
        : localStorage.getItem("jeepfuntrip-language");
    if (preferredLanguage !== "en" && preferredLanguage !== "id") {
        preferredLanguage = navigator.language?.toLowerCase().startsWith("en") ? "en" : "id";
    }

    localizedDefaults = [...document.querySelectorAll("[data-i18n]")].map(element => [element, element.textContent]);
    localizedContentDefaults = [...document.querySelectorAll("[data-i18n-content]")].map(element => [element, element.content]);
    articleDefaults = [...document.querySelectorAll("[data-locale-article]")].map(element => [element, element.innerHTML]);
    document.querySelectorAll("[data-language]").forEach(button => {
        button.addEventListener("click", () => setLanguage(button.dataset.language, true));
    });
    setLanguage(preferredLanguage, queryLanguage === "en" || queryLanguage === "id");
}

function setLanguage(language, persist = false) {
    if (language !== "id" && language !== "en") return;
    currentLanguage = language;
    document.documentElement.lang = language;
    document.title = language === "en"
        ? "Jeep FunTrip Merapi — Volcano Jeep Tours"
        : "Jeep FunTrip Merapi — Jelajah Lereng";
    localizedContentDefaults.forEach(([element, originalContent]) => {
        const translation = language === "en" ? englishText[element.dataset.i18nContent] : originalContent;
        if (typeof translation === "string") element.content = translation;
    });
    document.querySelectorAll(".language-switch").forEach(group => {
        group.setAttribute("aria-label", language === "en" ? "Choose language" : "Pilih bahasa");
    });

    localizedDefaults.forEach(([element, originalText]) => {
        const key = element.dataset.i18n;
        const translation = language === "en" ? englishText[key] : originalText;
        if (typeof translation === "string") element.textContent = translation;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        const key = element.dataset.i18nPlaceholder;
        const original = element.dataset.originalPlaceholder || element.placeholder;
        element.dataset.originalPlaceholder = original;
        element.placeholder = language === "en" ? englishText[key] || original : original;
    });
    articleDefaults.forEach(([element, originalHtml]) => {
        const articleIndex = Number(element.dataset.localeArticle);
        element.innerHTML = language === "en" ? englishArticles[articleIndex] : originalHtml;
    });
    updateLatestArticleLanguage();
    document.querySelectorAll("[data-language]").forEach(button => {
        const selected = button.dataset.language === language;
        button.setAttribute("aria-pressed", String(selected));
    });
    if (persist) localStorage.setItem("jeepfuntrip-language", language);
    renderPackageRoutes();
    updateBookingSelectLanguage();
    updateArticlePagination();
    if (websiteInitialized) initRoutePage();
}

function localizeRouteOption(option) {
    return currentLanguage === "en" ? option.replace(/^Opsi\b/, englishText.routeOption) : option;
}

function updateBookingSelectLanguage() {
    const packageSelect = document.getElementById("packageSelect");
    const routeSelect = document.getElementById("bookingRouteSelect");
    if (!packageSelect || !routeSelect) return;
    if (packageSelect.options.length) {
        packageSelect.options[0].textContent = currentLanguage === "en"
            ? englishText.packagePlaceholder
            : "-- Pilih Paket --";
        [...packageSelect.options].slice(1).forEach(option => {
            const packageId = getPackageIdFromName(option.value);
            const packageData = routePackages[packageId];
            if (!packageData) return;
            const currency = currentLanguage === "en" ? "IDR" : "Rp";
            const locale = currentLanguage === "en" ? "en-US" : "id-ID";
            option.textContent = `${packageData.label} (${currency} ${packageData.price.toLocaleString(locale)} / Jeep)`;
        });
    }
    const routeId = routeSelect.value;
    const packageId = getPackageIdFromName(packageSelect.value);
    if (!packageId || !routePackages[packageId]) {
        if (!routeSelect.options.length || routeSelect.disabled) {
            routeSelect.replaceChildren(new Option(
                currentLanguage === "en" ? englishText.packageFirst : "-- Pilih paket terlebih dahulu --", ""
            ));
        }
    } else {
        handlePackageChange(routeId);
    }
}

async function initializeWebsite() {
    initializeLanguage();
    await loadPublicContent();
    renderLatestArticles();
    initArticlePagination();
    initNavigation();
    renderPackageRoutes();
    initBookingRoutes();
    initRoutePage();
    initializeContactSettings();
    websiteInitialized = true;
}

function initializeContactSettings() {
    const whatsappLink = document.getElementById("bookingWhatsappLink");
    if (!whatsappLink) return;

    const localData = window.JeepFunTripLocalData;
    const notice = document.getElementById("bookingContactNotice");
    const refresh = () => {
        try {
            renderContactSettings(localData.readContactSettings());
            notice.hidden = true;
        } catch (error) {
            notice.textContent = `Informasi kontak gagal dimuat: ${error.message}`;
            notice.hidden = false;
        }
    };

    if (!localData?.readContactSettings) {
        notice.textContent = "Informasi kontak lokal tidak tersedia.";
        notice.hidden = false;
        return;
    }
    refresh();
    window.addEventListener("storage", event => {
        if (event.key === localData.contactSettingsKey) refresh();
    });
    window.addEventListener("jeepfuntrip-contact-settings-updated", event => {
        try {
            renderContactSettings(event.detail);
            notice.hidden = true;
        } catch (error) {
            notice.textContent = `Informasi kontak gagal diperbarui: ${error.message}`;
            notice.hidden = false;
        }
    });
}

function renderContactSettings(settings) {
    const whatsappLink = document.getElementById("bookingWhatsappLink");
    const instagramLink = document.getElementById("bookingInstagramLink");
    const basecampLink = document.getElementById("bookingBasecampLink");
    const whatsappDigits = settings.whatsappNumber.replace(/\D/g, "");
    const internationalNumber = whatsappDigits.startsWith("0")
        ? `62${whatsappDigits.slice(1)}`
        : whatsappDigits.startsWith("8")
            ? `62${whatsappDigits}`
            : whatsappDigits;
    const instagramUsername = new URL(settings.instagramUrl).pathname.split("/").filter(Boolean)[0];

    whatsappLink.href = `https://wa.me/${internationalNumber}`;
    whatsappLink.textContent = settings.whatsappNumber;
    instagramLink.href = settings.instagramUrl;
    instagramLink.textContent = `@${instagramUsername}`;
    basecampLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.basecampAddress)}`;
    basecampLink.textContent = settings.basecampAddress;
}

let routePackages = {
    "short-trip": {
        name: "Short Trip (450K)",
        label: "Short Trip",
        price: 450000,
        routes: [
            { id: "short-a", option: "Opsi A", stops: ["Mini Museum Sisa Hartaku", "Batu Alien, Kaliadem", "Track Kalikuning"] },
            { id: "short-b", option: "Opsi B", stops: ["Mini Museum Sisa Hartaku", "Batu Alien, Kaliadem", "Bunker Kaliadem"] },
            { id: "short-c", option: "Opsi C", stops: ["Mini Museum Sisa Hartaku", "TLW Park, Cangkringan", "Track Kalikuning"] }
        ]
    },
    "short-plus-trip": {
        name: "Short Plus Trip (500K)",
        label: "Short Plus Trip",
        price: 500000,
        routes: [
            { id: "short-plus-a", option: "Opsi A", stops: ["Bunker Kaliadem", "Mini Museum Sisa Hartaku", "Track Kalikuning"] },
            { id: "short-plus-b", option: "Opsi B", stops: ["Bunker Kaliadem", "Tebing Gendol, Cangkringan", "Track Kalikuning"] }
        ]
    },
    "medium-trip": {
        name: "Medium Trip (550K)",
        label: "Medium Trip",
        price: 550000,
        routes: [
            { id: "medium-a", option: "Opsi A", stops: ["Mini Museum Sisa Hartaku", "Batu Alien, Kaliadem", "Bunker Kaliadem", "Track Kalikuning"] },
            { id: "medium-b", option: "Opsi B", stops: ["Mini Museum Sisa Hartaku", "Batu Alien, Kaliadem", "Bunker Kaliadem", "Museum Mbah Maridjan, Kinahrejo"] },
            { id: "medium-c", option: "Opsi C", stops: ["Mini Museum Sisa Hartaku", "TLW Park, Cangkringan", "Bunker Kaliadem", "Track Kalikuning"] }
        ]
    },
    "long-trip": {
        name: "Long Trip (650K)",
        label: "Long Trip",
        price: 650000,
        routes: [
            { id: "long-a", option: "Opsi A", stops: ["Mini Museum Sisa Hartaku", "Batu Alien, Kaliadem", "Bunker Kaliadem", "TLW Park, Cangkringan", "Track Kalikuning"] },
            { id: "long-b", option: "Opsi B", stops: ["Museum Mbah Maridjan, Kinahrejo", "Mini Museum Sisa Hartaku", "Batu Alien, Kaliadem", "Bunker Kaliadem", "Track Kalikuning"] }
        ]
    },
    "sunrise-trip": {
        name: "Sunrise Trip (600K)",
        label: "Sunrise Trip",
        price: 600000,
        routes: [
            { id: "sunrise-a", option: "Opsi A", stops: ["Bunker Kaliadem", "Batu Alien, Kaliadem", "Mini Museum Sisa Hartaku"] },
            { id: "sunrise-b", option: "Opsi B", stops: ["Bunker Kaliadem", "Mini Museum Sisa Hartaku", "Track Kalikuning"] }
        ]
    }
};

const basecampQuery = "Basecamp Jeep FunTrip Merapi, Pangkukrejo, Umbulharjo, Cangkringan, Sleman, Yogyakarta";

const routeStopPhotos = {
    "Mini Museum Sisa Hartaku": {
        src: "https://upload.wikimedia.org/wikipedia/commons/2/25/Museum_Mini_Sisa_Hartaku_%282%29.jpg",
        alt: "Koleksi benda peninggalan erupsi di Museum Mini Sisa Hartaku",
        caption: "Museum Mini Sisa Hartaku",
        credit: "Aniisasan / Wikimedia Commons (CC BY-SA 4.0)",
        source: "https://commons.wikimedia.org/wiki/File:Museum_Mini_Sisa_Hartaku_(2).jpg"
    },
    "Bunker Kaliadem": {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Bunker_Kaliadem.jpg",
        alt: "Bunker Kaliadem di kawasan Merapi",
        caption: "Bunker Kaliadem",
        credit: "Iyosswazzo / Wikimedia Commons (CC BY-SA 4.0)",
        source: "https://commons.wikimedia.org/wiki/File:Bunker_Kaliadem.jpg"
    },
    "Batu Alien, Kaliadem": {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Mount_Merapi_from_the_south_side_with_rocks_from_the_eruption.jpg",
        alt: "Batuan vulkanik di kawasan Gunung Merapi, bukan foto spesifik Batu Alien",
        caption: "Foto batuan kawasan Merapi (bukan foto spesifik Batu Alien)",
        credit: "Rovitavare / Wikimedia Commons (CC BY-SA 4.0)",
        source: "https://commons.wikimedia.org/wiki/File:Mount_Merapi_from_the_south_side_with_rocks_from_the_eruption.jpg"
    },
    "TLW Park, Cangkringan": {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Lava_Tour_Jogja.jpg",
        alt: "Perjalanan Lava Tour di kawasan Merapi, bukan foto spesifik TLW Park",
        caption: "Foto perjalanan di kawasan Merapi (bukan foto spesifik TLW Park)",
        credit: "Wrsrachma / Wikimedia Commons (CC BY-SA 4.0)",
        source: "https://commons.wikimedia.org/wiki/File:Lava_Tour_Jogja.jpg"
    },
    "Track Kalikuning": {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Lava_Tour_Jogja.jpg",
        alt: "Perjalanan Lava Tour di kawasan Merapi, bukan foto spesifik Track Kalikuning",
        caption: "Foto perjalanan Lava Tour (bukan foto spesifik Track Kalikuning)",
        credit: "Wrsrachma / Wikimedia Commons (CC BY-SA 4.0)",
        source: "https://commons.wikimedia.org/wiki/File:Lava_Tour_Jogja.jpg"
    },
    "Museum Mbah Maridjan, Kinahrejo": {
        src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/The_House_of_Memory_%28Merapi%29.jpg",
        alt: "The House of Memory di rumah lama Mbah Maridjan, Kinahrejo",
        caption: "Rumah lama Mbah Maridjan (The House of Memory)",
        credit: "Aldifauzan / Wikimedia Commons (CC BY-SA 4.0)",
        source: "https://commons.wikimedia.org/wiki/File:The_House_of_Memory_(Merapi).jpg"
    },
    "Tebing Gendol, Cangkringan": {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Mount_Merapi_from_the_south_side_with_rocks_from_the_eruption.jpg",
        alt: "Batuan vulkanik di kawasan Gunung Merapi, bukan foto spesifik Tebing Gendol",
        caption: "Foto batuan kawasan Merapi (bukan foto spesifik Tebing Gendol)",
        credit: "Rovitavare / Wikimedia Commons (CC BY-SA 4.0)",
        source: "https://commons.wikimedia.org/wiki/File:Mount_Merapi_from_the_south_side_with_rocks_from_the_eruption.jpg"
    }
};

async function loadPublicContent() {
    if (window.location.protocol === "file:") return;
    if (window.APP_CONFIG?.backendMode !== "local" ||
        !window.JeepFunTripLocalData?.isLocalOrigin()) return;

    try {
        const store = window.JeepFunTripLocalData;
        store.seedFeaturedArticles(latestArticles);
        const localData = store.readAll();
        useLocalFeaturedArticles = true;
        const packages = localData.packages.filter(item => item.active);
        routePackages = Object.fromEntries(packages
            .filter(item => item.id && item.name && Number.isFinite(item.price) && Array.isArray(item.routes) &&
                item.routes.every(route => route?.id && route.option && Array.isArray(route.stops) &&
                    route.stops.every(stop => typeof stop === "string")))
            .map(item => [item.id, {
                name: `${item.name} (${Math.round(item.price / 1000)}K)`,
                label: item.name,
                price: item.price,
                duration: item.duration,
                routes: item.routes
            }]));
        renderPublicPackages();
        const articles = localData.articles.filter(item => item.published)
            .sort((first, second) => second.published_at.localeCompare(first.published_at));
        localFeaturedArticles = new Map(articles
            .filter(article => featuredArticleIds.has(article.id))
            .map(article => [article.id, article]));
        renderPublicArticles(articles.filter(article =>
            !featuredArticleIds.has(article.id) && !existingArticleIds.has(article.id)));
        const gallery = localData.gallery.filter(item => item.published)
            .sort((first, second) => first.sort_order - second.sort_order);
        renderPublicGallery(gallery);
    } catch (error) {
        console.error("Konten lokal gagal dimuat:", error.message);
    }
}

function renderPublicPackages() {
    const grid = document.querySelector(".packages-grid");
    const select = document.getElementById("packageSelect");
    if (!grid || !select) return;

    grid.replaceChildren();
    select.replaceChildren(new Option("-- Pilih Paket --", ""));
    Object.entries(routePackages).forEach(([packageId, packageData]) => {
        const card = document.createElement("div");
        card.className = `package-card${packageId === "medium-trip" ? " featured" : ""}`;
        if (packageId === "medium-trip" || packageId === "sunrise-trip") {
            const badge = document.createElement("div");
            badge.className = "pkg-badge";
            badge.textContent = packageId === "medium-trip"
                ? englishText.bestSeller
                : currentLanguage === "en" ? englishText.sunriseSpecial : "Spesial Pagi";
            card.append(badge);
        }

        const header = document.createElement("div");
        header.className = "pkg-header";
        const title = document.createElement("h3");
        title.textContent = packageData.label;
        const duration = document.createElement("div");
        duration.className = "pkg-duration";
        duration.innerHTML = '<i class="fa-regular fa-clock"></i> ';
        duration.append(document.createTextNode(packageData.duration || (currentLanguage === "en" ? "Duration upon confirmation" : "Durasi sesuai konfirmasi")));
        const price = document.createElement("div");
        price.className = "pkg-price";
        price.append(document.createTextNode(`${Math.round(packageData.price / 1000)}K `));
        const perJeep = document.createElement("span");
        perJeep.textContent = currentLanguage === "en" ? "/ Jeep" : "/ Jeep";
        price.append(perJeep);
        header.append(title, duration, price);

        const routes = document.createElement("div");
        routes.className = "pkg-routes";
        routes.dataset.packageId = packageId;
        const button = document.createElement("button");
        button.className = packageId === "medium-trip" ? "btn btn-primary btn-card" : "btn btn-card";
        button.type = "button";
        button.textContent = currentLanguage === "en" ? `Choose ${packageData.label}` : `Pilih ${packageData.label}`;
        button.addEventListener("click", () => selectPackage(packageData.name));
        card.append(header, routes, button);
        grid.append(card);
        const currency = currentLanguage === "en" ? "IDR" : "Rp";
        const locale = currentLanguage === "en" ? "en-US" : "id-ID";
        select.add(new Option(`${packageData.label} (${currency} ${packageData.price.toLocaleString(locale)} / Jeep)`, packageData.name));
    });

    if (!Object.keys(routePackages).length) {
        const empty = document.createElement("p");
        empty.className = "admin-empty";
        empty.textContent = currentLanguage === "en" ? "No active packages are available. Please contact the operator." : "Belum ada paket aktif. Silakan hubungi pengelola.";
        grid.append(empty);
    }
}

function renderPublicArticles(articles) {
    const grid = document.querySelector(".articles-grid");
    if (!grid) return;

    if (!articles.length) {
        if (grid.querySelector(".article-card")) return;
        const empty = document.createElement("p");
        empty.className = "admin-empty";
        empty.textContent = currentLanguage === "en" ? "No articles have been published yet." : "Belum ada artikel yang dipublikasikan.";
        grid.append(empty);
        return;
    }

    const existingTitles = new Set([...grid.querySelectorAll(".article-card h3")]
        .map(title => title.textContent.trim()));
    articles.forEach(article => {
        if (existingTitles.has(article.title)) return;
        existingTitles.add(article.title);
        const language = currentLanguage === "en" ? "en" : "id";
        const card = document.createElement("article");
        card.className = "article-card";
        const imageWrap = document.createElement("div");
        imageWrap.className = "article-img";
        const image = document.createElement("img");
        image.src = article.image_url;
        image.alt = language === "en" ? article.alt_text_en || article.alt_text || article.title_en || article.title
            : article.alt_text || article.title;
        image.loading = "lazy";
        imageWrap.append(image);
        if (article.image_source) {
            const source = createSourceLink(article.image_source, article.image_credit || "Sumber foto");
            source.className = "image-source";
            imageWrap.append(source);
        }

        const content = document.createElement("div");
        content.className = "article-content";
        const date = document.createElement("span");
        date.className = "article-date";
        date.textContent = new Date(`${article.published_at}T00:00:00`).toLocaleDateString(language === "en" ? "en-US" : "id-ID", {
            day: "numeric", month: "long", year: "numeric"
        });
        const title = document.createElement("h3");
        title.textContent = language === "en" ? article.title_en || article.title : article.title;
        const excerpt = document.createElement("p");
        excerpt.textContent = language === "en" ? article.excerpt_en || article.excerpt : article.excerpt;
        const details = document.createElement("details");
        details.className = "article-details";
        const summary = document.createElement("summary");
        summary.className = "article-readmore";
        summary.textContent = currentLanguage === "en" ? englishText.readArticle : "Baca artikel lengkap";
        const fullText = document.createElement("div");
        fullText.className = "article-full-text";
        const articleContent = language === "en" ? article.content_en || article.content : article.content;
        articleContent.split(/\n\s*\n/).filter(Boolean).forEach(paragraph => {
            const text = document.createElement("p");
            text.textContent = paragraph;
            fullText.append(text);
        });
        details.append(summary, fullText);
        content.append(date, title, excerpt, details);
        card.append(imageWrap, content);
        grid.append(card);
    });
}

function renderLatestArticles() {
    const grid = document.querySelector(".articles-grid");
    if (!grid || !grid.querySelector("[data-locale-article]")) return;

    const fragment = document.createDocumentFragment();
    latestArticles.filter(article => {
        const localArticle = localFeaturedArticles.get(article.id);
        return !useLocalFeaturedArticles || localArticle?.published;
    }).forEach(article => {
        const card = document.createElement("article");
        card.className = "article-card";
        card.dataset.featuredArticle = article.id;

        const imageWrap = document.createElement("div");
        imageWrap.className = "article-img";
        const image = document.createElement("img");
        image.src = article.image;
        image.loading = "lazy";
        const source = createSourceLink(article.source, article.credit);
        source.className = "image-source";
        imageWrap.append(image, source);

        const content = document.createElement("div");
        content.className = "article-content";
        const date = document.createElement("span");
        date.className = "article-date";
        date.dataset.featuredDate = "";

        const title = document.createElement("h3");
        title.dataset.featuredTitle = "";
        const excerpt = document.createElement("p");
        excerpt.dataset.featuredExcerpt = "";

        const details = document.createElement("details");
        details.className = "article-details";
        const summary = document.createElement("summary");
        summary.className = "article-readmore";
        summary.dataset.featuredReadMore = "";
        summary.innerHTML = '<span></span> <i class="fa-solid fa-arrow-right"></i>';
        const fullText = document.createElement("div");
        fullText.className = "article-full-text";
        fullText.dataset.featuredContent = "";
        details.append(summary, fullText);
        content.append(date, title, excerpt, details);
        card.append(imageWrap, content);
        fragment.append(card);
    });

    grid.prepend(fragment);
    updateLatestArticleLanguage();
}

function updateLatestArticleLanguage() {
    document.querySelectorAll("[data-featured-article]").forEach(card => {
        const article = latestArticles.find(item => item.id === card.dataset.featuredArticle);
        if (!article) return;

        const language = currentLanguage === "en" ? "en" : "id";
        const localArticle = localFeaturedArticles.get(article.id);
        const image = card.querySelector("img");
        image.src = localArticle?.image_url || article.image;
        image.alt = language === "en"
            ? localArticle?.alt_text_en || article.alt.en
            : localArticle?.alt_text || article.alt.id;
        const source = card.querySelector(".image-source");
        source.href = localArticle?.image_source || article.source;
        source.textContent = localArticle?.image_credit || article.credit;
        card.querySelector("[data-featured-date]").textContent =
            new Date(`${localArticle?.published_at || article.publishedAt}T00:00:00`).toLocaleDateString(language === "en" ? "en-US" : "id-ID", {
                day: "numeric", month: "long", year: "numeric"
            });
        card.querySelector("[data-featured-title]").textContent = language === "en"
            ? localArticle?.title_en || article.title.en
            : localArticle?.title || article.title.id;
        card.querySelector("[data-featured-excerpt]").textContent = language === "en"
            ? localArticle?.excerpt_en || article.excerpt.en
            : localArticle?.excerpt || article.excerpt.id;
        card.querySelector("[data-featured-read-more] span").textContent =
            language === "en" ? englishText.readArticle : "Baca artikel lengkap";

        const fullText = card.querySelector("[data-featured-content]");
        const localContent = language === "en" ? localArticle?.content_en : localArticle?.content;
        const paragraphs = localContent
            ? localContent.split(/\n\s*\n/).filter(Boolean)
            : article.paragraphs[language];
        fullText.replaceChildren(...paragraphs.map(paragraph => {
            const element = document.createElement("p");
            element.textContent = paragraph;
            return element;
        }));
    });
}

function initArticlePagination() {
    const grid = document.querySelector(".articles-grid");
    const button = document.getElementById("articleLoadMore");
    if (!grid || !button) return;

    const cards = [...grid.querySelectorAll(".article-card")];
    cards.forEach((card, index) => {
        card.hidden = index >= 3;
    });

    if (!button.dataset.initialized) {
        button.addEventListener("click", () => {
            const hiddenCards = [...grid.querySelectorAll(".article-card[hidden]")];
            hiddenCards.slice(0, 3).forEach(card => {
                card.hidden = false;
            });
            updateArticlePagination();
        });
        button.dataset.initialized = "true";
    }

    updateArticlePagination();
}

function updateArticlePagination() {
    const grid = document.querySelector(".articles-grid");
    const button = document.getElementById("articleLoadMore");
    const count = document.getElementById("articleCount");
    if (!grid || !button || !count) return;

    const cards = [...grid.querySelectorAll(".article-card")];
    const shown = cards.filter(card => !card.hidden).length;
    const remaining = cards.length - shown;
    button.hidden = remaining === 0;
    count.hidden = cards.length === 0;
    count.textContent = currentLanguage === "en"
        ? englishText.articleCount(shown, cards.length)
        : `Menampilkan ${shown} dari ${cards.length} artikel`;
    button.textContent = currentLanguage === "en"
        ? englishText.loadMoreArticles(Math.min(3, remaining))
        : `Muat ${Math.min(3, remaining)} artikel lagi`;
}

function renderPublicGallery(photos) {
    const gallery = document.querySelector(".polaroid-gallery");
    if (!gallery) return;
    gallery.replaceChildren();

    if (!photos.length) {
        const empty = document.createElement("p");
        empty.className = "admin-empty";
        empty.textContent = currentLanguage === "en" ? "No gallery photos have been published yet." : "Belum ada foto galeri yang dipublikasikan.";
        gallery.append(empty);
        return;
    }

    const rotations = ["rot-left", "rot-right", "rot-left-2", "rot-right-2"];
    photos.forEach((photo, index) => {
        const card = document.createElement("div");
        card.className = `polaroid-card ${rotations[index % rotations.length]}`;
        const image = document.createElement("img");
        image.src = photo.image_url;
        image.alt = photo.alt_text || photo.caption;
        image.loading = "lazy";
        const caption = document.createElement("p");
        caption.className = "polaroid-caption";
        caption.textContent = photo.caption;
        card.append(image, caption);
        card.addEventListener("click", () => openModal(photo.image_url, photo.caption));
        if (photo.source) {
            const source = createSourceLink(photo.source, photo.credit || "Sumber foto");
            source.className = "image-source";
            source.addEventListener("click", event => event.stopPropagation());
            card.append(source);
        }
        gallery.append(card);
    });
}

function createSourceLink(href, label) {
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = label;
    return link;
}

function getPackageIdFromName(packageName) {
    return Object.keys(routePackages).find(id => routePackages[id].name === packageName);
}

function getRouteById(routeId) {
    for (const packageId of Object.keys(routePackages)) {
        const route = routePackages[packageId].routes.find(item => item.id === routeId);
        if (route) {
            return { packageId, packageData: routePackages[packageId], route };
        }
    }
    return null;
}

function renderPackageRoutes() {
    document.querySelectorAll(".pkg-routes[data-package-id]").forEach(container => {
        container.replaceChildren();
        const packageData = routePackages[container.dataset.packageId];
        if (!packageData) return;

        packageData.routes.forEach(route => {
            const option = document.createElement("div");
            option.className = "route-option";

            const description = document.createElement("span");
            const routeOption = localizeRouteOption(route.option);
            description.innerHTML = `<strong>${routeOption}:</strong> `;
            description.append(document.createTextNode(route.stops.join(" - ")));

            const link = document.createElement("a");
            link.className = "route-view-link";
            link.href = `rute.html?rute=${encodeURIComponent(route.id)}`;
            link.innerHTML = `${currentLanguage === "en" ? "View route & map" : "Lihat rute & peta"} <i class="fa-solid fa-arrow-up-right-from-square"></i>`;

            option.append(description, link);
            container.append(option);
        });
    });
}

function initBookingRoutes() {
    const packageSelect = document.getElementById("packageSelect");
    const routeSelect = document.getElementById("bookingRouteSelect");
    if (!packageSelect || !routeSelect) return;

    routeSelect.addEventListener("change", updateBookingRouteLink);

    const params = new URLSearchParams(window.location.search);
    const packageId = params.get("paket");
    const routeId = params.get("rute");
    if (packageId && routePackages[packageId]) {
        packageSelect.value = routePackages[packageId].name;
        handlePackageChange(routeId);
        calculateTotal();
        if (window.location.hash === "#pemesanan") {
            document.getElementById("pemesanan").scrollIntoView();
        }
    }
}

function handlePackageChange(preferredRouteId) {
    const packageSelect = document.getElementById("packageSelect");
    const routeSelect = document.getElementById("bookingRouteSelect");
    if (!packageSelect || !routeSelect) return;

    const packageId = getPackageIdFromName(packageSelect.value);
    const packageData = routePackages[packageId];
    routeSelect.replaceChildren();

    if (!packageData) {
        routeSelect.disabled = true;
        routeSelect.add(new Option(currentLanguage === "en" ? englishText.packageFirst : "-- Pilih paket terlebih dahulu --", ""));
        updateBookingRouteLink();
        calculateTotal();
        return;
    }

    routeSelect.disabled = false;
    routeSelect.add(new Option(currentLanguage === "en" ? englishText.routePlaceholder : "-- Pilih opsi rute --", ""));
    packageData.routes.forEach(route => {
        const option = new Option(`${localizeRouteOption(route.option)}: ${route.stops.join(" - ")}`, route.id);
        routeSelect.add(option);
    });

    const selectedRoute = packageData.routes.find(route => route.id === preferredRouteId);
    routeSelect.value = selectedRoute ? selectedRoute.id : "";
    updateBookingRouteLink();
    calculateTotal();
}

function updateBookingRouteLink() {
    const routeSelect = document.getElementById("bookingRouteSelect");
    const routeLink = document.getElementById("bookingRouteLink");
    if (!routeSelect || !routeLink) return;

    const routeData = getRouteById(routeSelect.value);
    routeLink.hidden = !routeData;
    if (routeData) {
        routeLink.href = `rute.html?rute=${encodeURIComponent(routeData.route.id)}`;
    }
}

function initRoutePage() {
    const detail = document.getElementById("routeDetail");
    if (!detail) return;

    const routeData = getRouteById(new URLSearchParams(window.location.search).get("rute"));
    const notFound = document.getElementById("routeNotFound");
    if (!routeData) {
        notFound.hidden = false;
        return;
    }

    const { packageId, packageData, route } = routeData;
    const localizedOption = localizeRouteOption(route.option);
    const routeName = `${packageData.label} - ${localizedOption}`;
    const routeStops = document.getElementById("routeStops");
    routeStops.replaceChildren();
    const destination = route.stops[route.stops.length - 1];
    const waypoints = route.stops.slice(0, -1);
    const directionsUrl = new URL("https://www.google.com/maps/dir/");
    directionsUrl.searchParams.set("api", "1");
    directionsUrl.searchParams.set("origin", basecampQuery);
    directionsUrl.searchParams.set("destination", `${destination}, Merapi, Sleman, Yogyakarta`);
    directionsUrl.searchParams.set("travelmode", "driving");
    if (waypoints.length) {
        directionsUrl.searchParams.set("waypoints", waypoints.map(stop => `${stop}, Merapi, Sleman, Yogyakarta`).join("|"));
    }

    const embeddedMapUrl = new URL("https://maps.google.com/maps");
    embeddedMapUrl.searchParams.set("output", "embed");
    embeddedMapUrl.searchParams.set("saddr", basecampQuery);
    embeddedMapUrl.searchParams.set("daddr", route.stops.map(stop => `${stop}, Merapi, Sleman, Yogyakarta`).join(" to:"));

    document.title = `${routeName} | Jeep FunTrip Merapi`;
    document.getElementById("routePackageName").textContent = packageData.label;
    document.getElementById("routeTitle").textContent = routeName;
    const routePrice = packageData.price.toLocaleString(currentLanguage === "en" ? "en-US" : "id-ID");
    document.getElementById("routeDescription").textContent = currentLanguage === "en"
        ? englishText.routePriceDescription(routePrice, route.stops.length)
        : `Harga Rp ${routePrice} per Jeep. Rute ini memiliki ${route.stops.length} pemberhentian sesuai opsi paket yang dipilih.`;
    document.getElementById("openGoogleRoute").href = directionsUrl.toString();
    document.getElementById("routeMap").src = embeddedMapUrl.toString();
    document.getElementById("bookThisRoute").href = `index.html?paket=${encodeURIComponent(packageId)}&rute=${encodeURIComponent(route.id)}#pemesanan`;

    route.stops.forEach((stop, index) => {
        const item = document.createElement("li");
        item.className = "route-stop";

        const photo = routeStopPhotos[stop];
        const figure = document.createElement("figure");
        figure.className = "route-stop-photo";

        const image = document.createElement("img");
        image.src = photo.src;
        image.alt = photo.alt;
        image.loading = "lazy";

        const caption = document.createElement("figcaption");
        caption.textContent = photo.caption;

        const credit = document.createElement("a");
        credit.href = photo.source;
        credit.target = "_blank";
        credit.rel = "noopener noreferrer";
        credit.textContent = photo.credit;

        figure.append(image, caption, credit);

        const number = document.createElement("span");
        number.className = "route-stop-number";
        number.textContent = String(index + 1);

        const content = document.createElement("div");
        content.className = "route-stop-content";

        const title = document.createElement("h3");
        title.textContent = stop;

        const mapLink = document.createElement("a");
        mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${stop}, Merapi, Sleman, Yogyakarta`)}`;
        mapLink.target = "_blank";
        mapLink.rel = "noopener noreferrer";
        mapLink.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${currentLanguage === "en" ? englishText.routeMapLink : "Lihat lokasi di Google Maps"}`;

        content.append(title, mapLink);
        item.append(number, figure, content);
        routeStops.append(item);
    });

    detail.hidden = false;
}

// --- TOGGLE NAVBAR MOBILE ---
function initNavigation() {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (!menuToggle || !navLinks) return;
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// --- LIGHTBOX MODAL ---
function openModal(imgUrl, captionText) {
    const modal = document.getElementById("photoModal");
    const modalImg = document.getElementById("modalImage");
    const caption = document.getElementById("modalCaption");

    modal.style.display = "flex";
    modalImg.src = imgUrl;
    caption.innerText = captionText;
}

function closeModal() {
    document.getElementById("photoModal").style.display = "none";
}

// --- SELEKSI PAKET & KALKULASI ---
function selectPackage(packageName) {
    const select = document.getElementById("packageSelect");
    select.value = packageName;
    handlePackageChange();

    document.getElementById("pemesanan").scrollIntoView({ behavior: 'smooth' });
}

function calculateTotal() {
    const select = document.getElementById("packageSelect");
    const jeepCount = parseInt(document.getElementById("jeepCount").value) || 1;
    const priceDisplay = document.getElementById("totalPriceDisplay");

    const packageData = routePackages[getPackageIdFromName(select.value)];
    const pricePerJeep = packageData?.price || 0;

    const total = pricePerJeep * jeepCount;
    priceDisplay.innerText = (currentLanguage === "en" ? "IDR " : "Rp ") +
        total.toLocaleString(currentLanguage === "en" ? "en-US" : "id-ID");
}

// --- PROSES BOOKING WHATSAPP ---
async function handleBooking(event) {
    event.preventDefault();

    const name = document.getElementById("userName").value.trim();
    const packageSelect = document.getElementById("packageSelect");
    const packageName = packageSelect.value;
    const packageData = routePackages[getPackageIdFromName(packageName)];
    const date = document.getElementById("tripDate").value;
    const jeepCount = Number(document.getElementById("jeepCount").value);
    const participantCount = Number(document.getElementById("participantCount").value);
    const routeSelect = document.getElementById("bookingRouteSelect");
    const selectedRoute = getRouteById(routeSelect.value);
    const notice = document.getElementById("bookingNotice");

    if (!packageData || !selectedRoute || selectedRoute.packageData !== packageData) {
        notice.textContent = currentLanguage === "en" ? englishText.chooseValid : "Pilih paket dan rute yang valid sebelum melanjutkan.";
        notice.hidden = false;
        return;
    }
    if (!Number.isInteger(jeepCount) || jeepCount < 1 || jeepCount > 50 ||
        !Number.isInteger(participantCount) || participantCount < 1 || participantCount > 200 ||
        !date || new Date(`${date}T00:00:00`) < new Date(new Date().toDateString())) {
        notice.textContent = currentLanguage === "en" ? englishText.checkBooking : "Periksa kembali tanggal trip, jumlah Jeep, dan jumlah peserta.";
        notice.hidden = false;
        return;
    }

    const totalPriceValue = packageData.price * jeepCount;
    const totalPrice = totalPriceValue.toLocaleString(currentLanguage === "en" ? "en-US" : "id-ID");

    const localizedRoute = `${localizeRouteOption(selectedRoute.route.option)} - ${selectedRoute.route.stops.join(" - ")}`;
    const message = currentLanguage === "en"
        ? englishText.whatsappMessage(name, packageData.label, localizedRoute, date,
            `${jeepCount} Jeep${jeepCount === 1 ? "" : "s"}`, `${participantCount}`, totalPrice)
        : `Halo Admin *Jeep FunTrip Merapi*,\n\nSaya ingin memesan paket wisata Jeep dengan rincian berikut:\n` +
          `• *Nama Pemesan:* ${name}\n` +
          `• *Paket Wisata:* ${packageName}\n` +
          `• *Opsi Rute:* ${localizedRoute}\n` +
          `• *Tanggal Trip:* ${date}\n` +
          `• *Jumlah Jeep:* ${jeepCount} Jeep\n` +
          `• *Jumlah Peserta:* ${participantCount} Orang\n` +
          `• *Total Biaya:* Rp ${totalPrice}\n\n` +
          `Mohon konfirmasi ketersediaan dan informasi langkah selanjutnya. Terima kasih!`;

    const whatsappLink = document.getElementById("bookingWhatsappLink");
    let whatsappUrl;
    try {
        whatsappUrl = new URL(whatsappLink.href);
        if (whatsappUrl.protocol !== "https:" || whatsappUrl.hostname !== "wa.me") {
            throw new Error("Tautan WhatsApp admin tidak valid.");
        }
        whatsappUrl.searchParams.set("text", message);
    } catch (error) {
        notice.textContent = `Tautan WhatsApp admin gagal dimuat: ${error.message}`;
        notice.classList.add("booking-notice-error");
        notice.hidden = false;
        return;
    }

    const localData = window.JeepFunTripLocalData;
    const canSaveLocally = window.APP_CONFIG?.backendMode === "local" && localData?.isLocalOrigin();
    let bookingSaved = false;
    let saveError = "";
    if (canSaveLocally) {
        try {
            localData.addBooking({
                full_name: name,
                package_name: packageData.label,
                route_id: selectedRoute.route.id,
                route_name: `${selectedRoute.route.option}: ${selectedRoute.route.stops.join(" - ")}`,
                trip_date: date,
                jeep_count: jeepCount,
                participant_count: participantCount,
                total_price: totalPriceValue
            });
            bookingSaved = true;
        } catch (error) {
            saveError = error.message;
        }
    }

    window.location.assign(whatsappUrl.href);
    let noticeText;
    if (bookingSaved) {
        noticeText = currentLanguage === "en"
            ? englishText.bookingSaved
            : "Booking tersimpan. Silakan lanjutkan konfirmasi melalui WhatsApp.";
        notice.classList.remove("booking-notice-error");
    } else {
        noticeText = saveError
            ? (currentLanguage === "en"
                ? englishText.bookingSaveError(saveError)
                : `Booking gagal disimpan di panel admin: ${saveError}. Silakan lanjutkan melalui WhatsApp.`)
            : (currentLanguage === "en"
                ? englishText.localOnlyUnavailable
                : "Booking tidak tersimpan di panel admin. Silakan lanjutkan pemesanan melalui WhatsApp. Buka situs melalui localhost agar booking tersimpan.");
        notice.classList.add("booking-notice-error");
    }
    const fallbackLink = document.createElement("a");
    fallbackLink.href = whatsappUrl.href;
    fallbackLink.target = "_blank";
    fallbackLink.rel = "noopener noreferrer";
    fallbackLink.textContent = currentLanguage === "en"
        ? "Open WhatsApp"
        : "Klik di sini jika WhatsApp belum terbuka";
    notice.replaceChildren(document.createTextNode(`${noticeText} `), fallbackLink);
    notice.hidden = false;
}