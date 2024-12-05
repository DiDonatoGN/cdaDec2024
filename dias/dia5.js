const backButton = document.getElementById('back-button');
const spinButton = document.getElementById('spin-button');
const coinCountElement = document.getElementById('coin-count');
const slots = document.querySelectorAll('.slot');

const images = [
    '../src/images/tragaperras/R1.png',
    '../src/images/tragaperras/R2.png',
    '../src/images/tragaperras/R3.png',
    '../src/images/tragaperras/R4.png',
    '../src/images/tragaperras/R5.png',
    '../src/images/tragaperras/R6.png',
    '../src/images/tragaperras/R7.png',
];
const pista1 = '../src/images/tragaperras/Pista1.png';
const pista2 = '../src/images/tragaperras/Pista2.png';
const prize = '../src/images/tragaperras/prize.png';

let coins = localStorage.getItem('coins') ? parseInt(localStorage.getItem('coins')) : 3;
let attempts = 0;
let prizeShown = localStorage.getItem('prizeShown') === 'true';

// Actualiza el contador de monedas
coinCountElement.textContent = coins;

// Si ya se mostró el premio, lo muestra al entrar
if (prizeShown) {
    showPrize();
    spinButton.disabled = true; // Deshabilita el botón de jugar
}

// Redirección al índice
backButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});

// Lógica de juego
spinButton.addEventListener('click', () => {
    if (coins <= 0) {
        alert('¡Te quedaste sin monedas!');
        return;
    }

    coins--;
    localStorage.setItem('coins', coins);
    coinCountElement.textContent = coins;
    attempts++;

    spinButton.disabled = true; // Desactiva el botón mientras dura la animación
    animateSlots(() => {
        if (attempts === 1) {
            setRandomSlots(false); // Primera tirada: No pueden ser iguales
        } else if (attempts === 2) {
            setFixedSlots(); // Segunda tirada: Pista1, Pista2 y aleatorio
        } else if (attempts === 3) {
            setWinningSlots(); // Tercera tirada: Gana el juego
            setTimeout(() => {
                showPrize();
                localStorage.setItem('prizeShown', 'true');
            }, 1000);
        }
        spinButton.disabled = false; // Reactiva el botón después de la animación
    });
});

// Animación de los slots
function animateSlots(callback) {
    const animationDuration = 2000; // Duración de la animación en milisegundos
    const interval = 100; // Intervalo entre imágenes

    let elapsedTime = 0;

    const animation = setInterval(() => {
        slots.forEach(slot => {
            const randomImage = images[Math.floor(Math.random() * images.length)];
            slot.src = randomImage;
        });
        elapsedTime += interval;

        if (elapsedTime >= animationDuration) {
            clearInterval(animation);
            callback();
        }
    }, interval);
}

// Configuración de slots aleatorios
function setRandomSlots(allowThreeSame) {
    let randomImages;
    do {
        randomImages = Array.from({ length: 3 }, () => images[Math.floor(Math.random() * images.length)]);
    } while (!allowThreeSame && randomImages[0] === randomImages[1] && randomImages[1] === randomImages[2]);

    slots.forEach((slot, index) => {
        slot.src = randomImages[index];
    });
}

// Configuración de slots fijos (Pista1, Pista2 y aleatorio)
function setFixedSlots() {
    slots[0].src = pista1;
    slots[1].src = pista2;
    slots[2].src = images[Math.floor(Math.random() * images.length)];
}

// Configuración de slots ganadores
function setWinningSlots() {
    const winningImage = images[Math.floor(Math.random() * images.length)];
    slots.forEach(slot => slot.src = winningImage);
}

// Mostrar premio con animación
function showPrize() {
    let prizeImage = document.getElementById('prize');
    if (!prizeImage) {
        prizeImage = document.createElement('img');
        prizeImage.id = 'prize';
        prizeImage.src = prize;
        prizeImage.alt = 'Premio';
        document.body.appendChild(prizeImage);
    }

    // Agrega la clase para la transición inicial
    prizeImage.classList.add('show');

    // Agrega la sacudida después de 0.5 segundos
    setTimeout(() => {
        prizeImage.classList.add('shake');
    }, 500);
}
