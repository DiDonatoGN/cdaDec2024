// Variables
const backButton = document.getElementById('back-button');
const colorPicker = document.getElementById('color-picker');
const confirmButton = document.getElementById('confirm-button');
const countdownContainer = document.getElementById('countdown-container');
const countdownText = document.getElementById('countdown');
const hojas = document.getElementById('hojas');

// Fechas importantes
const today = new Date();
const currentDate = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
const milestones = {
    "2024-12-08": { next: "2024-12-15", task: "Elegir color de hojas" },
    "2024-12-15": { next: "2024-12-18", task: "Añadir guirnaldas" },
    "2024-12-18": { next: "2024-12-22", task: "Añadir esferas" },
    "2024-12-22": { next: "2024-12-24", task: "Añadir luces" },
    "2024-12-24": { next: null, task: "Colocar estrella" },
    "2024-12-25": { next: null, task: "Abrir regalos" },
};

// Estado inicial
const savedState = JSON.parse(localStorage.getItem('treeState')) || {};
if (savedState.hojasColor) hojas.style.filter = `hue-rotate(${savedState.hojasColor}deg)`;

// Mostrar el selector de color si no está confirmado
if (!savedState[currentDate]) {
    document.getElementById('color-picker-container').style.display = 'block';
}

// Evento para confirmar el color
confirmButton.addEventListener('click', () => {
    const colorValue = parseInt(colorPicker.value.substring(1), 16) % 360; // Extrae hue
    hojas.style.filter = `hue-rotate(${colorValue}deg)`;

    savedState[currentDate] = { hojasColor: colorValue };
    localStorage.setItem('treeState', JSON.stringify(savedState));

    // Oculta el selector y muestra el contador
    document.getElementById('color-picker-container').style.display = 'none';
    startCountdown();
});

// Iniciar el contador
const startCountdown = () => {
    const nextDate = milestones[currentDate]?.next;
    if (nextDate) {
        countdownContainer.style.display = 'block';
        const nextDateObj = new Date(nextDate);
        const updateCountdown = () => {
            const diff = nextDateObj - new Date();
            if (diff <= 0) {
                countdownText.textContent = "¡Es hora de decorar más!";
                clearInterval(interval);
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                countdownText.textContent = `Vuelve en ${days} días, ${hours} horas y ${minutes} minutos para seguir decorando.`;
            }
        };
        const interval = setInterval(updateCountdown, 1000);
        updateCountdown();
    }
};

// Botón de volver
backButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});
