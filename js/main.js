/* =========================================================
   TECHAUTO PLUS — main.js
   Tek dosyadan yönetim. Telefon/WhatsApp/e-posta gibi
   bilgileri AŞAĞIDAKİ CONFIG bölümünden güncelleyin.
   ========================================================= */

/* ====== 1) İŞLETME BİLGİLERİ ======
   Bu bilgiler artık YÖNETİM PANELİNDEN (/admin) düzenlenir.
   Panel, her sayfaya window.SITE objesini enjekte eder; aşağıdaki
   değerler yalnızca panel/JSON erişilemezse kullanılan yedeklerdir. */
var SITE = (typeof window !== "undefined" && window.SITE) ? window.SITE : {};
var B = SITE.business || {};
const TAP = {
  whatsapp:    B.whatsapp    || "905555555555",
  telHref:     B.phoneHref   || "+905555555555",
  telDisplay:  B.phoneDisplay || "0555 555 55 55",
  email:       B.email       || "info@techautoplus.com",
  addressHtml: B.addressHtml || "Maltepe / İstanbul",
  hoursHtml:   B.hoursHtml    || "Pzt - Cmt: 08:30 - 19:00<br>Pazar: Kapalı",
  brand:       B.brand       || "TECHAUTO PLUS",
};

/* ====== 2) Yardımcılar ====== */
function waLink(message) {
  return "https://wa.me/" + TAP.whatsapp + "?text=" + encodeURIComponent(message);
}

document.addEventListener("DOMContentLoaded", function () {
  initYear();
  initNav();
  initReveal();
  initWhatsAppLinks();
  initForms();
  initCalculator();
});

/* Footer yıl */
function initYear() {
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
}

/* Mobil menü */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll(".nav-links a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("open"); });
  });
  // Aktif sayfayi otomatik isaretle
  let path = location.pathname.split("/").pop();
  if (!path) path = "index.php";
  nav.querySelectorAll(".nav-links a").forEach(function (a) {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });
}

/* Scroll ile beliren bloklar */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach(function (e) { e.classList.add("in"); });
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(function (e) { io.observe(e); });
}

/* data-wa="genel" gibi WhatsApp linklerini doldurur */
function initWhatsAppLinks() {
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    const kind = el.getAttribute("data-wa");
    let msg = "Merhaba " + TAP.brand + ", ";
    if (kind === "randevu") msg += "randevu almak istiyorum.";
    else if (kind === "fiyat") msg += "fiyat teklifi almak istiyorum.";
    else msg += "bilgi almak istiyorum.";
    el.setAttribute("href", waLink(msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
  // tel ve mailto bağlantıları
  document.querySelectorAll("[data-tel]").forEach(function (el) {
    el.setAttribute("href", "tel:" + TAP.telHref);
    if (el.hasAttribute("data-tel-text")) el.textContent = TAP.telDisplay;
  });
  document.querySelectorAll("[data-mail]").forEach(function (el) {
    el.setAttribute("href", "mailto:" + TAP.email);
    if (el.hasAttribute("data-mail-text")) el.textContent = TAP.email;
  });
  // Adres ve çalışma saatleri (tek yerden yönetilir)
  document.querySelectorAll("[data-addr]").forEach(function (el) { el.innerHTML = TAP.addressHtml; });
  document.querySelectorAll("[data-hours]").forEach(function (el) { el.innerHTML = TAP.hoursHtml; });
}

/* İletişim & Randevu formları -> WhatsApp mesajı oluşturur */
function initForms() {
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const type = form.getAttribute("data-form");
      const get = function (n) {
        const f = form.elements[n];
        return f ? String(f.value || "").trim() : "";
      };
      let lines = [];
      if (type === "randevu") {
        lines.push("🚗 *" + TAP.brand + " — Randevu Talebi*");
        lines.push("Ad Soyad: " + get("ad"));
        lines.push("Telefon: " + get("telefon"));
        lines.push("Araç: " + get("arac"));
        lines.push("Hizmet: " + get("hizmet"));
        if (get("tarih")) lines.push("Tercih edilen tarih: " + get("tarih"));
        if (get("mesaj")) lines.push("Not: " + get("mesaj"));
      } else {
        lines.push("✉️ *" + TAP.brand + " — İletişim Mesajı*");
        lines.push("Ad Soyad: " + get("ad"));
        lines.push("Telefon: " + get("telefon"));
        if (get("email")) lines.push("E-posta: " + get("email"));
        if (get("konu")) lines.push("Konu: " + get("konu"));
        lines.push("Mesaj: " + get("mesaj"));
      }
      // Basit zorunlu alan kontrolü
      if (!get("ad") || !get("telefon")) {
        alert("Lütfen ad soyad ve telefon alanlarını doldurun.");
        return;
      }
      window.open(waLink(lines.join("\n")), "_blank", "noopener");
      const ok = form.querySelector(".form-ok");
      if (ok) { ok.style.display = "block"; }
      form.reset();
    });
  });
}

/* =========================================================
   3) BAKIM MALİYETİ HESAPLAMA ARACI
   Fiyatları aşağıdaki PRICES tablosundan güncelleyebilirsiniz.
   Tüm değerler KDV dahil tahmini işçilik+parça fiyatlarıdır.
   ========================================================= */
const DEFAULT_PRICES = {
  // Yakıt tipine göre çarpan (dizel parçalar genelde daha pahalı)
  fuelFactor: { benzin: 1.0, dizel: 1.15, hibrit: 1.1, lpg: 1.05 },

  // Paketlerde yer alan kalemler ve baz fiyatları (TL)
  packages: {
    mini: {
      label: "Mini Bakım",
      items: [
        { ad: "Motor yağı", fiyat: 1400 },
        { ad: "Yağ filtresi", fiyat: 350 },
        { ad: "İşçilik", fiyat: 600, labor: true },
      ],
    },
    standart: {
      label: "Standart Bakım",
      items: [
        { ad: "Motor yağı", fiyat: 1400 },
        { ad: "Yağ filtresi", fiyat: 350 },
        { ad: "Hava filtresi", fiyat: 450 },
        { ad: "Polen filtresi", fiyat: 400 },
        { ad: "İşçilik", fiyat: 900, labor: true },
      ],
    },
    premium: {
      label: "Premium Bakım",
      items: [
        { ad: "Motor yağı (tam sentetik)", fiyat: 1900 },
        { ad: "Yağ filtresi", fiyat: 350 },
        { ad: "Hava filtresi", fiyat: 450 },
        { ad: "Polen filtresi", fiyat: 400 },
        { ad: "Yakıt filtresi", fiyat: 700 },
        { ad: "Buji takımı", fiyat: 1200 },
        { ad: "Fren kontrol + balata kontrolü", fiyat: 500, labor: true },
        { ad: "İşçilik", fiyat: 1400, labor: true },
      ],
    },
  },

  // Kilometreye göre ek (yüksek km'de ekstra kontrol/işçilik)
  kmSurcharge: [
    { min: 150000, ek: 900 },
    { min: 100000, ek: 600 },
    { min: 60000, ek: 300 }
  ],
};

// Yönetim panelinden gelen fiyatlar varsa onları kullan, yoksa yedeği kullan
const PRICES = (SITE.prices && SITE.prices.packages && SITE.prices.fuelFactor)
  ? SITE.prices : DEFAULT_PRICES;

function formatTL(n) {
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(Math.round(n)) + " ₺";
}

function initCalculator() {
  const form = document.getElementById("calc-form");
  const out = document.getElementById("calc-out");
  if (!form || !out) return;

  function compute() {
    const marka = (form.elements["marka"].value || "").trim();
    const km = parseInt(form.elements["km"].value, 10) || 0;
    const yakit = form.elements["yakit"].value;
    const paketKey = form.elements["paket"].value;
    const paket = PRICES.packages[paketKey];
    if (!paket) return;

    const factor = PRICES.fuelFactor[yakit] || 1.0;
    let rows = [];
    let subtotal = 0;
    paket.items.forEach(function (it) {
      // İşçilik/kontrol kalemine yakıt çarpanı uygulanmaz (sadece parçalara uygulanır)
      const isLabor = !!it.labor;
      const price = isLabor ? it.fiyat : it.fiyat * factor;
      subtotal += price;
      rows.push({ ad: it.ad, fiyat: price });
    });

    let kmEk = 0;
    var kmArr = PRICES.kmSurcharge || [];
    for (var ki = 0; ki < kmArr.length; ki++) { if (km >= kmArr[ki].min) { kmEk = kmArr[ki].ek; break; } }
    if (kmEk > 0) { rows.push({ ad: "Yüksek km kontrol/işçilik", fiyat: kmEk }); subtotal += kmEk; }

    const total = subtotal;

    // Çıktı
    let html = '<div class="calc-line" style="border-bottom:1px solid rgba(255,255,255,.18);">';
    html += '<span style="color:#fff;font-weight:600;">' + paket.label + (marka ? " — " + escapeHtml(marka) : "") + "</span>";
    html += '<span>' + (km ? new Intl.NumberFormat("tr-TR").format(km) + " km" : "") + "</span></div>";
    rows.forEach(function (r) {
      html += '<div class="calc-line"><span>' + escapeHtml(r.ad) + "</span><span>" + formatTL(r.fiyat) + "</span></div>";
    });
    html += '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:18px;">';
    html += '<span style="color:#9fb0c7;">Tahmini Toplam</span><span class="total">' + formatTL(total) + "</span></div>";
    html += '<p style="color:#8095ae;font-size:.8rem;margin-top:10px;">* Fiyatlar tahminidir; kesin tutar araç incelemesi sonrası netleşir.</p>';

    // Randevu butonu (ön doldurulmuş)
    const msg =
      "Merhaba " + TAP.brand + ", bakım randevusu almak istiyorum.\n" +
      "Araç: " + (marka || "-") + "\n" +
      "Kilometre: " + (km ? km : "-") + "\n" +
      "Yakıt: " + yakit + "\n" +
      "Paket: " + paket.label + "\n" +
      "Tahmini tutar: " + formatTL(total);
    html += '<a class="btn btn--wa btn--block" style="margin-top:18px;" target="_blank" rel="noopener" href="' + waLink(msg) + '">WhatsApp ile Hemen Randevu Al</a>';

    out.innerHTML = html;
  }

  form.addEventListener("submit", function (e) { e.preventDefault(); compute(); });
  form.addEventListener("change", function () {
    if (form.elements["paket"].value) compute();
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
