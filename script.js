
/* ==================================
   WESAMBA INNOCENT PORTFOLIO
   Main JavaScript
================================== */

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close menu after selecting a section
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// Dark and light theme
const themeToggle = document.getElementById("themeToggle");

// Restore saved theme
const savedTheme = localStorage.getItem("wesamba-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

function updateThemeIcon() {
  if (!themeToggle) return;

  themeToggle.textContent =
    document.body.classList.contains("light-theme") ? "🌙" : "☀️";
}

updateThemeIcon();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const currentTheme =
      document.body.classList.contains("light-theme") ? "light" : "dark";

    localStorage.setItem("wesamba-theme", currentTheme);
    updateThemeIcon();
  });
}

// Automatically update copyright year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

console.log("Wesamba Innocent Portfolio loaded successfully!");
