console.log("Скрипт подключен");

const options = {
    threshold: 0.3;        
};

const recipeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        }
    });
}, options);

