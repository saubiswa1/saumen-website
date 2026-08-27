document.documentElement.classList.add("has-js");

const header = document.querySelector("#site-header");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const year = document.querySelector("#year");

if (year) {
    year.textContent = String(new Date().getFullYear());
}

const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    primaryNav?.classList.toggle("is-open", !isOpen);
});

primaryNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menuToggle?.setAttribute("aria-expanded", "false");
        primaryNav.classList.remove("is-open");
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        menuToggle?.setAttribute("aria-expanded", "false");
        primaryNav?.classList.remove("is-open");
    }
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, instance) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                instance.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}
