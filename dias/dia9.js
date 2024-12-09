// Botón de volver
document.getElementById("back-button").addEventListener("click", () => {
    window.location.href = "../index.html";
});

// Variables para controlar las imágenes, títulos y enlaces
const imagePaths = [
    "../src/images/dia9/rec1.jpg",
    "../src/images/dia9/rec2.jpg",
    "../src/images/dia9/rec3.jpg",
    "../src/images/dia9/rec4.jpg",
    "../src/images/dia9/rec5.jpg",
    "../src/images/dia9/rec6.jpg"
];

const titles = [
    "Luca",
    "Piratas del Caribe",
    "Un gran dinosaurio",
    "Moon Knight",
    "El pajaro loco",
    "Inseparables"
];

const links = [
    "https://www.disneyplus.com/es-es/movies/luca/7K1HyQ6Hl16P",
    "https://www.disneyplus.com/es-419/play/2d6036d7-f3b4-42c3-b1d3-cd5dd79bf307",
    "https://www.disneyplus.com/es-419/browse/entity-00cf5fd3-e005-4e42-a50e-989b7c78003f",
    "https://www.disneyplus.com/es-419/browse/entity-330062c7-20c5-45e1-b6c5-e1e096055d75",
    "https://www.netflix.com/watch/81215996?trackId=14170045&tctx=18%2C3%2C4047363d-930d-4788-b581-83cd89db68ac-185579914%2CNES_32C1134BCD25F8ECCA02A35C12DBF7-7DA6E02492B0D5-651968EC8F_p_1733751801785%2CNES_32C1134BCD25F8ECCA02A35C12DBF7_p_1733751801785%2C%2C%2C%2C%2CVideo%3A81215996%2C",
    "https://www.netflix.com/watch/81622755?trackId=255824129&tctx=0%2C0%2C5195674a-4969-4829-a41c-be417ecaca01-186148890%2C5195674a-4969-4829-a41c-be417ecaca01-186148890%7C2%2Cunknown%2C%2C%2C%2C%2CVideo%3A81622755%2C"
];

let currentIndex = 0;

// Elementos DOM
const mainImage = document.getElementById("main-image");
const titleElement = document.getElementById("image-title");
const actionButton = document.getElementById("action-button");
const leftArrow = document.getElementById("arrow-left");
const rightArrow = document.getElementById("arrow-right");

// Función para actualizar la imagen, el título y el enlace
function updateContent(index) {
    mainImage.src = imagePaths[index];
    titleElement.textContent = titles[index];
    actionButton.onclick = () => {
        window.location.href = links[index];
    };
}

// Inicializar contenido
updateContent(currentIndex);

// Cambiar imagen al hacer clic en las flechas
leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
    updateContent(currentIndex);
});

rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % imagePaths.length;
    updateContent(currentIndex);
});
