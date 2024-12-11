// Botón de volver
document.getElementById("back-button").addEventListener("click", () => {
    window.location.href = "../index.html";
});

// Lógica del carrusel
const carouselImages = document.querySelector(".carousel-images");
const carouselButtons = document.querySelectorAll(".carousel-buttons button");
let currentIndex = 0;

// Total de imágenes en el carrusel
const totalImages = 4;

// Función para actualizar la posición del carrusel
function updateCarousel(index) {
    const offset = -index * 100;
    carouselImages.style.transform = `translateX(${offset}%)`;
}

// Event Listeners para los botones
carouselButtons[0].addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Desplazamiento circular hacia la izquierda
    updateCarousel(currentIndex);
});

carouselButtons[1].addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalImages; // Desplazamiento circular hacia la derecha
    updateCarousel(currentIndex);
});
