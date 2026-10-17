
document.addEventListener("DOMContentLoaded", () => {

    // DAYS TOGETHER

    const daysElement = document.getElementById("days");
    const startDate = Date.UTC(2024, 10, 15);

    function updateDays() {
        const now = new Date();

        const today = Date.UTC(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );

        const days = Math.max(
            0,
            Math.round((today - startDate) / 86400000)
        );

        if (daysElement) {
            daysElement.textContent = days;
        }
    }

    updateDays();


    // SCROLL ANIMATIONS

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }


    // FLOATING HEARTS

    const heartsContainer = document.querySelector(".floating-hearts");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function createHeart() {
        if (!heartsContainer || reducedMotion) {
            return;
        }

        const heart = document.createElement("span");

        heart.classList.add("heart-particle");
        heart.textContent = Math.random() > 0.5 ? "♡" : "♥";

        heart.style.left = Math.random() * 100 + "%";
        heart.style.fontSize = 12 + Math.random() * 17 + "px";
        heart.style.animationDuration = 7 + Math.random() * 5 + "s";

        heartsContainer.appendChild(heart);

        heart.addEventListener("animationend", () => {
            heart.remove();
        });
    }

    if (!reducedMotion) {
        setInterval(createHeart, 1500);
    }


    // LOVE LETTER

    const envelope = document.getElementById("envelope");
    const letter = document.getElementById("letter-content");

    if (envelope && letter) {
        envelope.addEventListener("click", () => {
            const isOpen = envelope.classList.toggle("open");

            envelope.setAttribute("aria-expanded", String(isOpen));

            letter.hidden = !isOpen;

            if (isOpen) {
                setTimeout(() => {
                    letter.scrollIntoView({
                        behavior: reducedMotion ? "auto" : "smooth",
                        block: "start"
                    });
                }, 450);
            }
        });
    }


    // PHOTO LIGHTBOX

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = lightbox?.querySelector("img");
    const closeLightbox = document.getElementById("close-lightbox");

    const galleryImages = document.querySelectorAll(".gallery-card img");

    if (lightbox && lightboxImage) {
        galleryImages.forEach((image) => {
            image.setAttribute("tabindex", "0");
            image.setAttribute("role", "button");
            image.setAttribute(
                "aria-label",
                "Увеличить фотографию: " + image.alt
            );

            function openPhoto() {
                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;

                if (!lightbox.open) {
                    lightbox.showModal();
                }
            }

            image.addEventListener("click", openPhoto);

            image.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openPhoto();
                }
            });
        });

        closeLightbox?.addEventListener("click", () => {
            lightbox.close();
        });

        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                lightbox.close();
            }
        });
    }

});
