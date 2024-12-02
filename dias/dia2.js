// Elementos
const draggable = document.getElementById('draggable');
const screens = {
  top: document.getElementById('top-screen'),
  left: document.getElementById('left-screen'),
  right: document.getElementById('right-screen'),
  bottom: document.getElementById('bottom-screen')
};
const images = [
  { id: 'rayo', element: document.getElementById('rayo') },
  { id: 'dos', element: document.getElementById('dos') },
  { id: 'playlist', element: document.getElementById('playlist') }
];
const backButton = document.getElementById('back-button');

// Función para generar una posición aleatoria dentro del área visible
function getRandomPosition() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const x = Math.random() * (viewportWidth - 80); // Restamos el ancho de las imágenes
  const y = Math.random() * (viewportHeight - 80); // Restamos el alto de las imágenes
  return { x, y };
}

// Colocar las imágenes en posiciones aleatorias
images.forEach(image => {
  const position = getRandomPosition();
  image.element.style.left = `${position.x}px`;
  image.element.style.top = `${position.y}px`;
});

// Actualizar la posición de las pantallas
function updateScreens(x, y, width, height) {
  screens.top.style.width = `${window.innerWidth}px`;
  screens.top.style.height = `${y}px`;

  screens.left.style.width = `${x}px`;
  screens.left.style.height = `${height}px`;
  screens.left.style.top = `${y}px`;

  screens.right.style.width = `${window.innerWidth - (x + width)}px`;
  screens.right.style.height = `${height}px`;
  screens.right.style.top = `${y}px`;
  screens.right.style.left = `${x + width}px`;

  screens.bottom.style.width = `${window.innerWidth}px`;
  screens.bottom.style.height = `${window.innerHeight - (y + height)}px`;
  screens.bottom.style.top = `${y + height}px`;
}

// Centrar la lupa al cargar la página
function centerDraggable() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const x = (viewportWidth - draggable.offsetWidth) / 2;
  const y = (viewportHeight - draggable.offsetHeight) / 2;

  draggable.style.left = `${x}px`;
  draggable.style.top = `${y}px`;

  updateScreens(x, y, draggable.offsetWidth, draggable.offsetHeight);
}

// Botón para regresar a la página de inicio
backButton.addEventListener('click', () => {
  window.location.href = '../index.html';
});

// Hacer la imagen "Lupa" arrastrable
draggable.addEventListener('mousedown', (e) => {
  let shiftX = e.clientX - draggable.getBoundingClientRect().left;
  let shiftY = e.clientY - draggable.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    const x = pageX - shiftX;
    const y = pageY - shiftY;
    draggable.style.left = `${x}px`;
    draggable.style.top = `${y}px`;

    const width = draggable.offsetWidth;
    const height = draggable.offsetHeight;

    updateScreens(x, y, width, height);

    // Detectar colisiones con las otras imágenes
    images.forEach(({ element }) => {
      const draggableRect = draggable.getBoundingClientRect();
      const imageRect = element.getBoundingClientRect();

      if (
        draggableRect.left < imageRect.right &&
        draggableRect.right > imageRect.left &&
        draggableRect.top < imageRect.bottom &&
        draggableRect.bottom > imageRect.top
      ) {
        element.style.opacity = 1; // Hacer visible la imagen
      } else {
        element.style.opacity = 0; // Ocultar la imagen
      }
    });
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  draggable.onmouseup = () => {
    document.removeEventListener('mousemove', onMouseMove);
    draggable.onmouseup = null;
  };
});

// Configurar la posición inicial de las pantallas y centrar la lupa al cargar
window.onload = centerDraggable;

draggable.ondragstart = () => false;
