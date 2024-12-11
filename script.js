const slides1 = document.querySelector('.section-stages__sliders');
const slide1 = document.querySelectorAll('.section-stages__slide');
const prevButton1 = document.getElementById('prevBtn');
const nextButton1 = document.getElementById('nextBtn');
const dotContainer = document.querySelector('.section-stages__dots');

let currentIndex1 = 0;
const totalSlides1 = slide1.length;

function updateSlidePosition1() {
    slides1.style.transform = `translateX(${-currentIndex1 * 100}% )`;
    updateDots();
    updateButtons();  // Обновление состояния кнопок
}

function updateDots() {
    const dots = document.querySelectorAll('.section-stages__dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex1);
    });
}

function updateButtons() {
    // Отключаем кнопки, если мы на первом или последнем слайде
    if (currentIndex1 === 0) {
        prevButton1.setAttribute('disabled', true);  // Отключаем кнопку "Prev"
        prevButton1.classList.add('disabled');  // Добавляем класс для серого цвета
    } else {
        prevButton1.removeAttribute('disabled');  // Включаем кнопку "Prev"
        prevButton1.classList.remove('disabled');
    }

    if (currentIndex1 === totalSlides1 - 1) {
        nextButton1.setAttribute('disabled', true);  // Отключаем кнопку "Next"
        nextButton1.classList.add('disabled');  // Добавляем класс для серого цвета
    } else {
        nextButton1.removeAttribute('disabled');  // Включаем кнопку "Next"
        nextButton1.classList.remove('disabled');
    }
}

function createDots() {
    for (let i = 0; i < totalSlides1; i++) {
        const dot = document.createElement('div');
        dot.classList.add('section-stages__dot');
        dot.addEventListener('click', () => {
            currentIndex1 = i;
            updateSlidePosition1();
        });
        dotContainer.appendChild(dot);
    }
    updateDots();  // Установим активную точку с самого начала
}

function goToNextSlide1() {
    if (currentIndex1 < totalSlides1 - 1) {  // Убедимся, что не выходим за границы
        currentIndex1++;
        updateSlidePosition1();
    }
}

function goToPrevSlide1() {
    if (currentIndex1 > 0) {  // Убедимся, что не выходим за границы
        currentIndex1--;
        updateSlidePosition1();
    }
}

// Создание точек слайдера
createDots();

// Обработчики событий для кнопок
nextButton1.addEventListener('click', goToNextSlide1);
prevButton1.addEventListener('click', goToPrevSlide1);

// Инициализация кнопок в самом начале
updateButtons();



// Второй слайдер
const slides2 = document.querySelector('.slider__slides');
const slide2 = document.querySelectorAll('.slider__slide');
const prevButton2 = document.getElementById('prev');
const nextButton2 = document.getElementById('next');
const currentSlideCounter = document.getElementById('current-slide');
const totalSlideCounter = document.getElementById('total-slides');

let currentIndex2 = 0;
const totalSlides2 = slide2.length;
const visibleSlides = 3;

let autoSlideInterval;
const autoSlideDelay = 4000;
const restartDelay = 1000;
let isTransitioning = false;

for (let i = 0; i < visibleSlides; i++) {
    const clone = slide2[i].cloneNode(true);
    slides2.appendChild(clone);
}

function updateSlidePosition2() {
    slides2.style.transform = 'translateX(' + (-currentIndex2 * (397 + 10)) + 'px)';
    updateSlideCounter();  // Обновление счётчика
}

function updateSlideCounter() {
    currentSlideCounter.textContent = currentIndex2 + 0;  // Отображаем текущий слайд (нумерация с 1)
}

function goToNextSlide2() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex2++;
    updateSlidePosition2();

    if (currentIndex2 === totalSlides2) {
        setTimeout(() => {
            slides2.style.transition = 'none';
            currentIndex2 = 0;
            updateSlidePosition2();
            setTimeout(() => {
                slides2.style.transition = 'transform 0.5s ease-in-out';
                isTransitioning = false;
            }, 20);
        }, 500);
    } else {
        setTimeout(() => isTransitioning = false, 500);
    }
}

function goToPrevSlide2() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentIndex2 === 0) {
        slides2.style.transition = 'none';
        currentIndex2 = totalSlides2;
        updateSlidePosition2();
        setTimeout(() => {
            slides2.style.transition = 'transform 0.5s ease-in-out';
            currentIndex2--;
            updateSlidePosition2();
            setTimeout(() => isTransitioning = false, 500);
        }, 20);
    } else {
        currentIndex2--;
        updateSlidePosition2();
        setTimeout(() => isTransitioning = false, 500);
    }
}

function startAutoSlide() {
    autoSlideInterval = setInterval(goToNextSlide2, autoSlideDelay);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    setTimeout(startAutoSlide, restartDelay);
}

nextButton2.addEventListener('click', () => {
    goToNextSlide2();
    stopAutoSlide();
});

prevButton2.addEventListener('click', () => {
    goToPrevSlide2();
    stopAutoSlide();
});

startAutoSlide();
