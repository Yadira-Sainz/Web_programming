let currentPage = 1; // Mantiene la página actual para la paginación
const resultsPerPage = 5; // Cantidad de resultados por página
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultList = document.getElementById('resultList');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const errorDiv = document.getElementById('error');
const ajaxBtn = document.getElementById('ajaxBtn');
const fetchBtn = document.getElementById('fetchBtn');

// Reemplaza 'YOUR_API_KEY' con tu clave de API de OMDb
const apiKey = '70f8c89f';

// Función para manejar la búsqueda de películas
async function fetchSearchResults(query, page = 1) {
    try {
        // Deshabilitar el botón de búsqueda y mostrar el mensaje de carga
        const searchButton = searchForm.querySelector('button[type="submit"]');
        searchButton.disabled = true;
        const loadingMessage = document.createElement('div');
        loadingMessage.id = 'loading';
        loadingMessage.textContent = 'Cargando...';
        document.body.appendChild(loadingMessage);

        // Hacer la solicitud a la API
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&page=${page}&apikey=${apiKey}`);

        // Verificar si la respuesta es correcta (status 200-299)
        if (!response.ok) {
            throw new Error(`Error de la API: ${response.status}`);
        }

        const results = await response.json();

        // Si no hay resultados y estamos en la primera página, mostrar error
        if (results.Response === "False" && page === 1) {
            showError('No se encontraron resultados.');
            loadMoreBtn.classList.add('hidden'); // Ocultar el botón "Cargar más"
        } else {
            displayResults(results.Search); // Mostrar resultados
            if (results.Search.length < resultsPerPage) {
                loadMoreBtn.classList.add('hidden'); // Ocultar el botón "Cargar más" si no hay más
            } else {
                loadMoreBtn.classList.remove('hidden'); // Mostrar el botón "Cargar más" si hay más resultados
            }
        }
    } catch (error) {
        showError(`Hubo un problema al realizar la solicitud: ${error.message}`);
    } finally {
        // Habilitar el botón de búsqueda y eliminar el mensaje de carga
        const searchButton = searchForm.querySelector('button[type="submit"]');
        searchButton.disabled = false;
        const loadingMessage = document.getElementById('loading');
        if (loadingMessage) loadingMessage.remove();
    }
}

// Evento para el envío del formulario de búsqueda
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const query = searchInput.value.trim();

    if (!query) {
        showError('Introduce un término de búsqueda.');
        return;
    }

    clearError();
    resultList.innerHTML = ''; // Limpiar resultados anteriores
    currentPage = 1; // Reiniciar la página actual
    fetchSearchResults(query); // Realizar la búsqueda
});

// Función para mostrar resultados en el DOM
function displayResults(movies) {
    if (movies) {
        movies.forEach(movie => {
            const li = document.createElement('li');
            li.textContent = movie.Title; // Usar el título de la película
            resultList.appendChild(li);
        });
    }
}

// Evento para el botón de "Cargar más"
loadMoreBtn.addEventListener('click', async () => {
    currentPage++;
    const query = searchInput.value.trim();
    await fetchSearchResults(query, currentPage);
});

// Función para mostrar errores en la página
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Función para limpiar mensajes de error
function clearError() {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
}

// Función para obtener datos con AJAX
function getDataWithAJAX() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?s=batman&apikey=${apiKey}`, true);

    xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
            const results = JSON.parse(this.responseText);
            resultList.innerHTML = ''; // Limpiar la lista
            if (results.Response === "True") {
                results.Search.slice(0, 4).forEach(movie => { // Limitar a 5 resultados
                    const li = document.createElement('li');
                    li.textContent = movie.Title; // Usar el título de la película
                    resultList.appendChild(li);
                });
            } else {
                showError('No se encontraron resultados.');
            }
        } else {
            showError('Error al obtener los datos con AJAX.');
        }
    };

    xhr.onerror = function () {
        showError('Error de conexión al intentar obtener datos con AJAX.');
    };

    xhr.send();
}

// Función para obtener datos con Fetch API
async function getDataWithFetch() {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=batman&apikey=${apiKey}`);
        if (!response.ok) {
            throw new Error('Error al obtener los datos con Fetch API.');
        }
        const results = await response.json();
        resultList.innerHTML = ''; // Limpiar la lista
        if (results.Response === "True") {
            results.Search.slice(0, 8).forEach(movie => { // Limitar a 5 resultados
                const li = document.createElement('li');
                li.textContent = movie.Title; // Usar el título de la película
                resultList.appendChild(li);
            });
        } else {
            showError('No se encontraron resultados.');
        }
    } catch (error) {
        showError(`Error de conexión con Fetch API: ${error.message}`);
    }
}

// Escuchar clic en el botón de "Obtener Datos con AJAX"
ajaxBtn.addEventListener('click', getDataWithAJAX);

// Escuchar clic en el botón de "Obtener Datos con Fetch API"
fetchBtn.addEventListener('click', getDataWithFetch);

// Implementar desplazamiento infinito
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const query = searchInput.value.trim();
        if (query) {
            currentPage++;
            fetchSearchResults(query, currentPage);
        }
    }
});

