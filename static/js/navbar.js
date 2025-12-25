const navbar = document.querySelector(".navbar");
const homeSection = document.querySelector(".home");

window.addEventListener("scroll", () => {
    const homeBottom = homeSection.offsetHeight - navbar.offsetHeight;

    if (window.scrollY > homeBottom) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
