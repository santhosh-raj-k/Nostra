document.addEventListener("DOMContentLoaded", () => {
    setupSideMenu()
    setupContactForm()
})

function setupSideMenu() {
    const menuToggle = document.getElementById("three")
    const sideMenu = document.getElementById("four")
    const sideMenuClose = document.getElementById("five")
    if (!menuToggle || !sideMenu) return

    const openMenu = () => {
        sideMenu.classList.add("is-open")
        menuToggle.setAttribute("aria-expanded", "true")
    }

    const closeMenu = () => {
        sideMenu.classList.remove("is-open")
        menuToggle.setAttribute("aria-expanded", "false")
    }

    menuToggle.addEventListener("click", () => {
        sideMenu.classList.contains("is-open") ? closeMenu() : openMenu()
    })

    sideMenuClose?.addEventListener("click", closeMenu)

    sideMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu)
    })

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMenu()
    })
}

function setupContactForm() {
    const form = document.querySelector(".contact-form")
    if (!form) return

    const status = document.createElement("p")
    status.setAttribute("role", "status")
    status.style.cssText = "font-weight:600;color:#15803d"
    form.appendChild(status)

    form.addEventListener("submit", event => {
        event.preventDefault()

        // Replace this with a real request (fetch to your backend or a form service)
        status.textContent = "Thanks! Your message has been sent."
        form.reset()
    })
}