document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    const pricingToggle = document.getElementById("pricing-toggle");
    const prices = document.querySelectorAll(".price");

    if (pricingToggle) {
        pricingToggle.addEventListener("change", (e) => {
            const isYearly = e.target.checked;
            
            prices.forEach(price => {
                if (isYearly) {
                    price.innerHTML = `${price.getAttribute("data-yearly")}<span>/yr</span>`;
                } else {
                    price.innerHTML = `${price.getAttribute("data-monthly")}<span>/mo</span>`;
                }
            });
        });
    }
});
