console.log("Скрипт подключен");

const options = {
    threshold: 0.2, 
    rootMargin: "0px 0px -50px 0px" 
};

const animateObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, options);

const staggerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const item = entry.target;
            const parent = item.parentElement;
            const siblings = Array.from(parent.querySelectorAll(".stagger-item"));
            const index = siblings.indexOf(item);
            setTimeout(() => {
                item.classList.add("animate");
            }, index * 300); 
            observer.unobserve(item);
        }
    });
}, options);

const standardElements = document.querySelectorAll(
    '.animate-on-scroll, .slide-left, .slide-right, .scale-up, .fade-in'
);
standardElements.forEach(el => {
    animateObserver.observe(el);
});

const staggerElements = document.querySelectorAll('.stagger-item');
staggerElements.forEach(el => {
    staggerObserver.observe(el);
});

const scrollIndicator = document.querySelector(".scroll-progress");
const header = document.querySelector("header");
let isScrolling = false;

window.addEventListener("scroll", () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            if (scrollIndicator) {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                let percent = 0;
                if (docHeight > 0) {
                    percent = (scrollTop / docHeight) * 100;
                }
                scrollIndicator.style.width = percent + "%";
            }
            if (header) {
                if (window.scrollY > 100) {
                    header.style.background = "rgba(10, 10, 10, 0.95)";
                } else {
                    header.style.background = "rgba(10, 10, 10, 0.8)";
                }
            }

            isScrolling = false;
        });
        isScrolling = true;
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

const particlesContainer = document.querySelector('.particles');
if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        const duration = Math.random() * 10 + 5; 
        const delay = Math.random() * 5; 
        particle.style.animationDuration = duration + "s";
        particle.style.animationDelay = "-" + delay + "s"; 
        particlesContainer.appendChild(particle);
    }
}

function countUp(element, targetValue, duration = 2000) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentVal = Math.floor(progress * targetValue);
        element.textContent = currentVal; 
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = targetValue; 
        }
    };
    window.requestAnimationFrame(step);
}

function parseNumber(str) {
    str = str.trim();
    let multiplier = 1;
    if (str.includes('M')) multiplier = 1000000;
    else if (str.includes('K')) multiplier = 1000;
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num * multiplier;
}

const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const originalText = stat.innerText;
                const targetNum = parseNumber(originalText);
                countUp(stat, targetNum, 2000);
            });
            
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}