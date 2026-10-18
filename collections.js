const GROUP_KEYS = {
    "filters__list--categories": "occasion",
    "filters__list--colors": "color",
    "filters__list--arrivals": "arrivals"
}

document.addEventListener("DOMContentLoaded", () => {
    setupAnnouncement()
    setupSideMenu()
    setupFilters()
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

function getGroupKey(checkbox) {
    const list = checkbox.closest(".filters__list")
    if (!list) return null

    for (const [className, key] of Object.entries(GROUP_KEYS)) {
        if (list.classList.contains(className)) return key
    }
    return null
}

function setupFilters() {
    const checkboxes = document.querySelectorAll(".filters input[type='checkbox']")
    const products = document.querySelectorAll(".products .seven")
    const searchInput = document.querySelector(".search input")

    const applyFilters = () => {
        // Collect checked values per group, e.g. { occasion: ["formals"], color: ["white"] }
        const selected = {}

        checkboxes.forEach(box => {
            if (!box.checked) return
            const key = getGroupKey(box)
            if (!key) return

            selected[key] ??= []
            selected[key].push(box.value)
        })

        const query = searchInput ? searchInput.value.trim().toLowerCase() : ""

        products.forEach(product => {
            // Within a group: any checked option may match.
            // Across groups: every group that has a selection must match.
            const matchesGroups = Object.entries(selected).every(
                ([key, values]) => values.includes(product.dataset[key])
            )

            const name = product.querySelector(".product__name")?.textContent.toLowerCase() ?? ""
            const matchesSearch = name.includes(query)

            product.style.display = matchesGroups && matchesSearch ? "" : "none"
        })
    }

    checkboxes.forEach(box => box.addEventListener("change", applyFilters))
    searchInput?.addEventListener("input", applyFilters)
}