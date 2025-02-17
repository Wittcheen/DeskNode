window.onpageshow = () => {
    const swaggerUILoaded = setInterval(() => {
        if (document.getElementById("swagger-ui")) {
            clearInterval(swaggerUILoaded);
            setUpScrollToTopButton();
        }
    }, 100);
}

function setUpScrollToTopButton() {
    const button = document.createElement("button");
    button.id = "scroll-to-top-btn";
    button.title = "Back to top";
    button.addEventListener("click", () => {
        scrollToTop();
        button.blur();
    });

    const container = document.createElement("div");
    container.classList.add("scroll-to-top-wrapper");
    container.appendChild(button);
    document.getElementById("swagger-ui").appendChild(container);

    const toggleVisibility = () => {
        button.classList.toggle("showBtn", window.scrollY >= 200);
    };
    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("resize", toggleVisibility);
}

function scrollToTop() {
    function scroll() {
        let y = window.scrollY * 0.9;
        window.scrollTo(0, y);
        if (y > 1) { requestAnimationFrame(scroll); }
    }
    scroll();
}
