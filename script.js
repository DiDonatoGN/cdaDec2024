document.addEventListener("DOMContentLoaded", () => {
    const calendarDaysContainer = document.getElementById("calendar-days");
    const overlay = document.getElementById("overlay");
    const countdownMessage = document.getElementById("countdownMessage");
    const accessedDaysList = document.getElementById("accessed-days-list");
    const currentDate = new Date();
    const year = 2024;
    const month = 11; // Noviembre (mes 10 para pruebas)

    // Funciones para manejar Local Storage
    function getAccessedDays() {
        const storedDays = localStorage.getItem("accessedDays");
        return storedDays ? JSON.parse(storedDays) : [];
    }

    function setAccessedDays(days) {
        localStorage.setItem("accessedDays", JSON.stringify(days));
    }

    const accessedDays = getAccessedDays();

    function updateAccessedDaysList() {
        accessedDaysList.innerHTML = "";
        if (accessedDays.length === 0) {
            const listItem = document.createElement("li");
            listItem.textContent = "Aún no has accedido a ningún día.";
            accessedDaysList.appendChild(listItem);
        } else {
            accessedDays.forEach(day => {
                const listItem = document.createElement("li");
                listItem.textContent = `Día ${day}`;
                accessedDaysList.appendChild(listItem);
            });
        }
    }

    updateAccessedDaysList();

    for (let day = 1; day <= 31; day++) {
        const dayElement = document.createElement("div");
        const dayDate = new Date(year, month, day);

        dayElement.classList.add("day");

        if (dayDate < currentDate) {
            // Días desbloqueados
            if (accessedDays.includes(day)) {
                dayElement.textContent = day; // Mostrar el número
                dayElement.classList.add("unlocked", "clicked");
            } else {
                dayElement.classList.add("unlocked"); // Imagen por defecto
            }

            dayElement.onclick = () => {
                dayElement.classList.add("clicked");
                dayElement.textContent = day; // Cambiar a número

                if (!accessedDays.includes(day)) {
                    accessedDays.push(day);
                    setAccessedDays(accessedDays);
                    updateAccessedDaysList();
                }

                // Redirigir a la página del día
                window.location.href = `./dias/dia${day}.html`;
            };
        } else if (dayDate.toDateString() === currentDate.toDateString()) {
            dayElement.textContent = day;
            dayElement.classList.add("unlocked");
            dayElement.onclick = () => {
                accessedDays.push(day);
                setAccessedDays(accessedDays);
                updateAccessedDaysList();

                // Redirigir a la página del día
                window.location.href = `./dias/dia${day}.html`;
            };
        } else if (dayDate > currentDate) {
            if (!document.querySelector(".countdown")) {
                dayElement.classList.add("countdown");
                const countdown = setInterval(() => {
                    const now = new Date();
                    const diff = dayDate - now;

                    if (diff <= 0) {
                        clearInterval(countdown);
                        dayElement.textContent = day;
                        dayElement.classList.remove("countdown");
                        dayElement.classList.add("unlocked");
                        dayElement.onclick = () => {
                            accessedDays.push(day);
                            setAccessedDays(accessedDays);
                            updateAccessedDaysList();

                            // Redirigir a la página del día
                            window.location.href = `dia${day}.html`;
                        };
                    } else {
                        const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
                        const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
                        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
                        dayElement.textContent = `${hours}:${minutes}:${seconds}`;
                    }
                }, 1000);
            } else {
                dayElement.textContent = day;
                dayElement.classList.add("locked");
                dayElement.onclick = () => {
                    const diff = dayDate - new Date();
                    const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hoursLeft = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
                    const minutesLeft = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
                    const secondsLeft = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
                    const dayText = daysLeft > 1 ? `${daysLeft} días` : daysLeft === 1 ? "1 día" : "";
                    const timeLeft = `${dayText} ${hoursLeft}:${minutesLeft}:${secondsLeft}`;
                    showModal(`Aún faltan ${timeLeft} para desbloquearlo`);
                };
            }
        }

        calendarDaysContainer.appendChild(dayElement);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const albumUnlocked = localStorage.getItem('albumUnlocked');

    if (albumUnlocked) {
        // Crear el botón para el álbum
        const albumButton = document.createElement('button');
        albumButton.id = 'album-button';
        albumButton.title = 'Ir al álbum';
        albumButton.innerHTML = '<img src="./src/icons/album.svg" alt="Álbum" />';
        
        albumButton.addEventListener('click', () => {
            window.location.href = './dias/album.html'; // Redirigir al álbum
        });

        // Agregar el botón al cuerpo del índice
        document.body.appendChild(albumButton);
    }
});
