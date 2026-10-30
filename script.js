/* =========================
   Wesamba Innocent portfolio
   Edit the configuration below.
   ========================= */

// Keep public contact details out of the source until you decide what is safe to publish.
const CONFIG = {
  whatsapp: "", // International format, e.g. 2547XXXXXXXX (only add a public/business contact)
  email: "",    // Public-facing email address
  mpesa: ""     // Optional: leave blank unless you intentionally want payment details public
};

const SERVICES = [
  { name: "Poster design", text: "Eye-catching posters for events, businesses and community groups, designed in Canva." },
  { name: "AI prompt writing", text: "Clear prompts that help you get more useful results from AI tools." },
  { name: "Websites", text: "Simple, clean and mobile-friendly websites for personal projects or businesses." },
  { name: "CV writing", text: "A neat, professional CV and cover letter that presents your experience clearly." },
  { name: "Transcription", text: "Audio or video converted into clean, carefully formatted text." }
];

const DESIGNS = [
  { file: "design1.png", alt: "Poster design 1" },
  { file: "design2.png", alt: "Poster design 2" },
  { file: "design3.png", alt: "Poster design 3" },
  { file: "design4.png", alt: "Poster design 4" },
  { file: "design5.png", alt: "Edited photo 1" },
  { file: "design6.png", alt: "Edited photo 2" }
];

// Add genuine testimonials only. Leave empty until you have permission to publish reviews.
const TESTIMONIALS = [];

const $ = (selector) => document.querySelector(selector);
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[char]);

function makeWhatsAppLink(message) {
  if (!CONFIG.whatsapp) return "";
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Footer year
$("#year").textContent = new Date().getFullYear();

// Theme: persist the selection when browser storage is available.
$("#themeBtn").addEventListener("click", () => {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  $("#themeBtn").setAttribute("aria-label", `Switch to ${next === "dark" ? "dark" : "light"} mode`);
  try { localStorage.setItem("theme", next); } catch (_) {}
});

// Mobile navigation
const menuBtn = $("#menuBtn");
const navLinks = $("#navLinks");
menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open navigation");
  }
});

// Services
$("#services").innerHTML = SERVICES.map((service) => {
  const message = `Hello, I would like to enquire about: ${service.name}.`;
  const href = makeWhatsAppLink(message);
  return `<article class="card service">
    <h3>${escapeHTML(service.name)}</h3>
    <p>${escapeHTML(service.text)}</p>
    <a class="btn btn-teal btn-sm service-link" href="${href || "#contact"}"
       ${href ? 'target="_blank" rel="noopener noreferrer"' : ""}>
       ${href ? "Request this service" : "Contact for details"}
    </a>
  </article>`;
}).join("");

// Gallery: missing files are removed; show the empty-state message if none load.
const gallery = $("#gallery");
let loadedImages = 0;
DESIGNS.forEach((design) => {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = `assets/${design.file}`;
  img.alt = design.alt;
  img.loading = "lazy";
  img.addEventListener("load", () => { loadedImages += 1; }, { once: true });
  img.addEventListener("error", () => {
    figure.remove();
    if (!gallery.children.length) {
      gallery.hidden = true;
      $("#galleryEmpty").hidden = false;
    }
  }, { once: true });
  figure.appendChild(img);
  gallery.appendChild(figure);
});

// Testimonials
if (TESTIMONIALS.length) {
  $("#tEmpty").hidden = true;
  $("#tList").innerHTML = TESTIMONIALS.map((review) => `
    <article class="card t-card">
      <p>${escapeHTML(review.text)}</p>
      <p class="who">${escapeHTML(review.name)}${review.role ? `, ${escapeHTML(review.role)}` : ""}</p>
    </article>`).join("");
}
const reviewLink = makeWhatsAppLink("Hello, I would like to share feedback about your work.");
if (reviewLink) $("#reviewBtn").href = reviewLink;
else $("#reviewBtn").href = "#contact";

// Contact links are only activated after you configure public contact details.
if (CONFIG.whatsapp) {
  $("#waLink").href = `https://wa.me/${CONFIG.whatsapp}`;
  $("#waLink").textContent = "Message on WhatsApp";
} else {
  $("#waLink").textContent = "Contact form (configure WhatsApp in js/script.js)";
}
if (CONFIG.email) {
  $("#mailLink").href = `mailto:${CONFIG.email}`;
  $("#mailLink").textContent = CONFIG.email;
} else {
  $("#mailLink").textContent = "Contact form (configure email in js/script.js)";
}
if (CONFIG.mpesa) $("#mpesaNumber").textContent = CONFIG.mpesa;
else $("#gift").hidden = true;

// Contact form: use the actual submit button, including keyboard submission fallback.
$("#msgForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const name = $("#fname").value.trim();
  const message = $("#fmsg").value.trim();
  if (!name || !message) return;

  const body = `Hello, I am ${name}.\n\n${message}`;
  const via = event.submitter?.dataset.via || "whatsapp";

  if (via === "email") {
    if (!CONFIG.email) {
      alert("The email contact has not been configured yet. Please use the contact details provided by the site owner.");
      return;
    }
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(`Message from ${name}`)}&body=${encodeURIComponent(body)}`;
    return;
  }

  const url = makeWhatsAppLink(body);
  if (!url) {
    alert("WhatsApp contact has not been configured yet. Please use the contact details provided by the site owner.");
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
});
