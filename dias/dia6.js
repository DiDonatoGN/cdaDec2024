const backButton = document.getElementById('back-button');
const checkButton = document.getElementById('check-button');
const symbols = Array.from(document.querySelectorAll('.symbol'));
const correctCode = ['S4', 'S1', 'S9', 'S8'];
const arrowUp = document.querySelectorAll('.arrow-up');
const arrowDown = document.querySelectorAll('.arrow-down');

let currentSymbols = Array(symbols.length).fill('S1'); // Inicia en S1

// Función para cambiar símbolo al hacer clic en flechas
const changeSymbol = (index, direction) => {
    const current = currentSymbols[index];
    const num = parseInt(current.slice(1));

    let newNum;
    if (direction === 'up') {
        newNum = num === 10 ? 1 : num + 1; // Ciclo hacia arriba
    } else {
        newNum = num === 1 ? 10 : num - 1; // Ciclo hacia abajo
    }

    currentSymbols[index] = `S${newNum}`;
    symbols[index].src = `../src/images/dia6/${currentSymbols[index]}.png`;

    // Mostrar el estado actualizado de currentSymbols en la consola
    console.log('Estado actual de los símbolos:', currentSymbols);
};

// Agregar eventos a las flechas
arrowUp.forEach((arrow, index) => {
    arrow.addEventListener('click', () => changeSymbol(index, 'up'));
});

arrowDown.forEach((arrow, index) => {
    arrow.addEventListener('click', () => changeSymbol(index, 'down'));
});

// Validación del código
checkButton.addEventListener('click', () => {
    console.log('Código ingresado:', currentSymbols);
    if (JSON.stringify(currentSymbols) === JSON.stringify(correctCode)) {
        localStorage.setItem('albumUnlocked', true); // Guardar estado en localStorage
        window.location.href = 'album.html';
    } else {
        alert('Código incorrecto');
    }
});

// Botón de retroceso
backButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});

// --- Lógica para el botón de ayuda y el modal ---
const hintButton = document.getElementById('hint-button');
const hintModal = document.getElementById('hint-modal');
const hintImage = document.getElementById('hint-image');
const hintText = document.getElementById('hint-text');

// Ocultar el modal por defecto al cargar la página
hintModal.style.display = 'none';

// Determinar qué mostrar en el modal según la fecha
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1; // Mes es 0-indexado

let hintToShow = '';
if (month === 12) {
    switch (day) {
        case 6:
            hintToShow = '../src/images/dia6/pistadia6.png';
            break;
        case 7:
            hintToShow = '../src/images/dia6/pistadia7.png';
            break;
        case 8:
            hintToShow = '../src/images/dia6/pistadia8.png';
            break;
        case 9:
            hintToShow = '../src/images/dia6/pistadia9.png';
            break;
        default:
            hintToShow = 'text'; // Texto predeterminado
            break;
    }
} else {
    hintToShow = 'text'; // Si no es diciembre, mostrar texto predeterminado
}

// Configurar el contenido del modal
if (hintToShow === 'text') {
    hintImage.style.display = 'none';
    hintText.style.display = 'block';
    hintText.textContent = 'No hay más pistas por aquí';
} else {
    hintImage.style.display = 'block';
    hintImage.src = hintToShow;
    hintText.style.display = 'none';
}

// Evento para abrir el modal cuando se hace clic en el botón de ayuda
hintButton.addEventListener('click', () => {
    hintModal.style.display = 'flex';  // Mostrar el modal de ayuda
});

// Evento para cerrar el modal al hacer clic fuera del contenido
hintModal.addEventListener('click', (e) => {
    if (e.target === hintModal) {
        hintModal.style.display = 'none';  // Ocultar el modal de ayuda
    }
});
