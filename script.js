console.log("Скрипт подключен");

const options = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const recipeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const parent = entry.target;
            const items = parent.querySelectorAll(".stagger-item");     
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add("animate");
                }, index * 200); 
            });
            staggerObserver.unobserve(parent);
        }
    });
}, options);

document.querySelectorAll(".stagger-group").forEach(group => {
    staggerObserver.observe(group);
});

const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            animateObserver.unobserve(entry.target);
        }
    });
}, options);

const animateElements = document.querySelectorAll('.animate-on-scroll, .slide-left, .slide-right, .scale-up, .fade-in');
animateElements.forEach(el => {
    animateObserver.observe(el);
});

const scrollIndicator = document.querySelector(".scroll-progress");
let ticking = false;
window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;    
            if (docHeight > 0) {
                const percent = (scrollTop / docHeight) * 100;
                scrollIndicator.style.width = percent + "%";
            }
        });
    }
});

const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        header.style.background = "rgba(10, 10, 10, 0.95)";
    } else {
        header.style.background = "rgba(10, 10, 10, 0.8)";
    }
});

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const id = link.getAttribute("href");
        console.log("Клик по ссылке на", id);
    });
});

const particlesContainer = document.querySelector('.particles');
if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * -100 + "%";
        particlesContainer.appendChild(particle);
    }
}

function countUp(element, target, duration = 2000) {
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        current += step;
        if(current>=target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}
