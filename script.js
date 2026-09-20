// =========================
// MOBILE MENU
// =========================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}


// =========================
// CLOSE MOBILE MENU
// =========================

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});


// =========================
// CURRENT YEAR
// =========================

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// =========================
// SCROLL ANIMATION
// =========================

const animatedElements =
    document.querySelectorAll(
        ".project-card, .skill-card, .education-card, .certificate-card, .timeline-item"
    );

const observer = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.1
    }
);


animatedElements.forEach(function (element) {

    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});
