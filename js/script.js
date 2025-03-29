// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav ul li a");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });
});

// Show alert on button click
document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".btn");

    if (button) {
        button.addEventListener("click", function () {
            alert("Welcome to my portfolio! 🚀");
        });
    }
});
