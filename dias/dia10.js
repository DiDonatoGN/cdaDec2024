// Seleccionar elementos
const content = document.getElementById("content");
const gridOverlay = document.createElement("div");
gridOverlay.classList.add("grid-overlay");
content.appendChild(gridOverlay);

// Definir parámetros
const totalDots = 53 * 53; // 53 filas y columnas (ajustar según el tamaño del grid)
const today = new Date().toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD

// Cargar datos de localStorage
let storedData = JSON.parse(localStorage.getItem("dia10-data")) || {};
if (!storedData[today]) {
    storedData[today] = {
        revealedDots: [],
        image: `../src/images/dia10/pos${Math.floor(Math.random() * 3) + 1}.png`,
    };
}

// Establecer imagen
const hiddenImage = document.createElement("img");
hiddenImage.id = "hidden-image";
hiddenImage.src = storedData[today].image;
hiddenImage.alt = "Imagen escondida";
content.appendChild(hiddenImage);

// Crear puntos en la cuadrícula
for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.id = `dot-${i}`;
    gridOverlay.appendChild(dot);

    // Si el punto ya fue revelado, restaurar su estado
    if (storedData[today].revealedDots.includes(i)) {
        dot.classList.add("revealed");
    }

    // Evento de clic para revelar el punto
    dot.addEventListener("click", () => {
        if (!dot.classList.contains("revealed")) {
            dot.classList.add("revealed"); // Cambiar el estilo para revelar
            storedData[today].revealedDots.push(i); // Registrar el punto revelado

            // Si todos los puntos están revelados, ocultar la capa de puntos
            if (storedData[today].revealedDots.length === totalDots) {
                gridOverlay.style.display = "none";
            }

            // Guardar estado en localStorage
            localStorage.setItem("dia10-data", JSON.stringify(storedData));
        }
    });
}
