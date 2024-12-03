const backButton = document.getElementById('back-button');
const mainImage = document.getElementById('main-image');
const errorMessage = document.getElementById('error-message');

// Redirección al índice
backButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});

// Obtener el grupo y paso actual de localStorage o inicializar
const today = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
const savedData = JSON.parse(localStorage.getItem('origamiData')) || {};
if (!savedData.date || savedData.date !== today) {
    savedData.date = today;
    savedData.group = ['A', 'B'][Math.floor(Math.random() * 4)]; // Grupo aleatorio
    savedData.step = 1; // Reiniciar al paso 1
    localStorage.setItem('origamiData', JSON.stringify(savedData));
}

const { group, step } = savedData;

// Mostrar la imagen inicial
mainImage.src = `../src/images/origami${group}step${step}.png`;
mainImage.style.display = 'block';

// Cambiar la imagen al hacer clic
mainImage.addEventListener('click', () => {
    savedData.step = (savedData.step % 6) + 1; // Incrementar el paso y reiniciar al llegar a 6
    mainImage.src = `../src/images/origami${group}step${savedData.step}.png`;
    localStorage.setItem('origamiData', JSON.stringify(savedData));
});
const pistaImage = document.getElementById('pista-image');

// Mostrar mensaje de error entre las 4 y las 4:30 pm
const now = new Date();
const isErrorTime = now.getHours() === 16 && now.getMinutes() < 30;

if (isErrorTime) {
    mainImage.style.display = 'none';
    errorMessage.style.display = 'block';
    pistaImage.style.opacity = '0.1'; // Cambiar opacidad a 100%
} else {
    pistaImage.style.opacity = '0'; // Asegurarse de que esté oculta fuera del horario
}

