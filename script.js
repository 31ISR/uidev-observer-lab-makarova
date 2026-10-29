console.log("Скрипт подключен");

const options = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const recipeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".stagger-item");
            
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add("animate");
                }, index * 200); 
            });
        }
    });
}, options);

const animateElements = document.querySelectorAll(
    '.animate-on-scroll, .slide-left, .slide-right, .scale-up, .fade-in'
);

const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            animateObserver.unobserve(entry.target);
        }
    });
}, options);

cards.forEach((card) => {
    animateObserver.observe(card);
});

const scrollIndicator = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
        const percent = (scrollTop / docHeight) * 100;
        scrollIndicator.computedStyleMap.width = percent + "%";
    }
});

const headerbgc = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        headerbgc.style.background = "rgba(10,10,10,0.95)";
    } else {
        headerbgc.style.background = "rgba(10,10,10,0.9)"
    }
});

const navLiks = document.querySelectorAll(".toc a");

navLiks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();                 // браузер не прыгает сам
        const id = link.getAttribute("href");   // например, "#chapter-2"
        document.querySelector(id).scrollIntoView({behavior: "smooth", block: "center"});
    });
}); 

for (let i = 0; i < 30; i++) {
    const flake = document.createElement("div");
    flake.classList.add("particles");
    flake.style.left = Math.random() * 100 + "%";
    // ...ещё два случайных свойства
    flake.style.animationDelay = Math.random() * 100 +
}