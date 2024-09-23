// Selecciona el botón de modo oscuro/claro
const toggleButton = document.getElementById('toggle-dark-mode');

// Función para reiniciar las barras de progreso
function resetProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-progress') || '0%';
        bar.style.transition = 'none'; // Desactivar la transición temporalmente
        bar.style.width = '0%'; // Reiniciar el ancho a 0%
        // Forzar el reflujo para reiniciar la animación
        bar.offsetHeight; // Esto crea un reflujo
        // Reactivar la transición y aplicar el nuevo ancho
        requestAnimationFrame(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width; // Aplicar el ancho definido
        });
    });
}

// Función para manejar el cambio de modo
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Cambia el texto del botón dependiendo del modo activo
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Modo Claro';
    } else {
        toggleButton.textContent = 'Modo Oscuro';
    }
    
    // Reinicia las barras de progreso para que se animen nuevamente
    resetProgressBars();
}

// Añade un evento al botón para alternar entre modos
toggleButton.addEventListener('click', toggleDarkMode);

// Configura el Intersection Observer para animar las barras de progreso
document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observerOptions = {
        root: null, // Observar desde el viewport
        rootMargin: '0px',
        threshold: 0.1 // Porcentaje de visibilidad requerido para activar el callback
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-progress') || '100%';
                bar.style.width = width;
                
                // Dejar de observar una vez que se ha animado
                observer.unobserve(bar);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Añadir las barras de progreso al observer
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-img');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('src');
            showLightbox(src);
        });
    });

    function showLightbox(src) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${src}" alt="Lightbox Image">
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        document.body.appendChild(lightbox);

        const closeButton = lightbox.querySelector('.lightbox-close');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });

        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("modal");
    var modalImg = document.getElementById("modal-img");
    var closeBtn = document.getElementsByClassName("close")[0];
    var images = document.querySelectorAll(".gallery-item img");

    // Asegúrate de que el modal y el botón de cerrar estén ocultos al cargar la página
    modal.style.display = "none";
    closeBtn.style.display = "none";

    images.forEach(function (img) {
        img.addEventListener('click', function () {
            modal.style.display = "flex"; // Mostrar el modal al hacer clic en una imagen
            modalImg.src = this.src; // Asignar la imagen clicada al modal
            closeBtn.style.display = "block"; // Mostrar el botón de cerrar
        });
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = "none"; // Cerrar el modal al hacer clic en la "x"
        closeBtn.style.display = "none"; // Ocultar el botón de cerrar
    });

    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Cerrar el modal al hacer clic fuera de la imagen
            closeBtn.style.display = "none"; // Ocultar el botón de cerrar
        }
    });
});

/* Validar contacto email */
document.getElementById('contact-form').addEventListener('submit', function(event) {
    // Evita que el formulario se envíe si hay errores
    event.preventDefault();

    // Obtiene los valores del formulario
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Obtiene el elemento para mostrar mensajes de error
    const feedback = document.getElementById('form-feedback');

    // Limpia el mensaje de error previo
    feedback.textContent = '';

    // Validación básica
    if (name === '') {
        feedback.textContent += 'Por favor, ingresa tu nombre.\n';
    }
    if (email === '') {
        feedback.textContent += 'Por favor, ingresa tu correo electrónico.\n';
    } else if (!validateEmail(email)) {
        feedback.textContent += 'Por favor, ingresa un correo electrónico válido.\n';
    }
    if (message === '') {
        feedback.textContent += 'Por favor, ingresa un mensaje.\n';
    }

    // Si no hay errores, puedes proceder a enviar el formulario
    if (feedback.textContent === '') {
        // Aquí puedes añadir la lógica para enviar el formulario, como enviar datos a un servidor.
        feedback.textContent = 'Formulario enviado correctamente.';
        feedback.style.color = 'green';

        // Limpia los campos del formulario
        document.getElementById('contact-form').reset();
    }
});

function validateEmail(email) {
    // Expresión regular para validar el correo electrónico
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.querySelector('.highlightText');
    const text = "Estudiante Ing. en Sistemas Computacionales / Lic. Recursos Humanos";
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            textElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect, 100); // Velocidad de escritura (ajusta en ms)
        } else {
            textElement.style.borderRight = 'none'; // Eliminar el cursor al finalizar
        }
    }

    function restartTypeEffect() {
        textElement.textContent = ''; // Comenzar con el texto vacío
        index = 0;
        typeEffect(); // Reiniciar el efecto de escritura
    }

    // Iniciar el efecto de escritura al cargar la página
    typeEffect();

    // Añadir evento para reiniciar el efecto de escritura cuando cambie el modo
    document.getElementById('toggle-dark-mode').addEventListener('click', restartTypeEffect);
});