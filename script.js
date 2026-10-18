document.addEventListener("DOMContentLoaded", () => {
    setupAnnouncement()
    setupSideMenu()
    setupWishlist()
    setupHeroSlider()
})

function setupAnnouncement() {
    const announcement = document.getElementById("one")
    const close = document.getElementById("two")
    if (!announcement || !close) return

    close.addEventListener("click", () => {
        announcement.style.display = "none"
    })
}

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

function setupWishlist() {
    document.querySelectorAll(".wishlist").forEach(icon => {
        icon.addEventListener("click", () => {
            const liked = !icon.classList.contains("fa-solid")

            icon.classList.toggle("fa-solid", liked)
            icon.classList.toggle("fa-regular", !liked)
            icon.style.color = liked ? "rgb(229,57,28)" : "rgb(22,22,22)"
        })
    })
}

function setupHeroSlider() {
    const heroImg = document.getElementById("heroImg")
    const leftArrow = document.getElementById("left")
    const rightArrow = document.getElementById("right")
    if (!heroImg || !leftArrow || !rightArrow) return

    const images = [
        "./img/p26.webp",
        "./img/p17.webp",
        "./img/p27.webp"
    ]
    let index = 0

    const showSlide = newIndex => {
        index = (newIndex + images.length) % images.length
        heroImg.src = images[index]
    }

    rightArrow.addEventListener("click", () => showSlide(index + 1))
    leftArrow.addEventListener("click", () => showSlide(index - 1))
}