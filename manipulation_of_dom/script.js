document.addEventListener('DOMContentLoaded', () => {
  // Cambiar color de fondo
  const changeColorBtn = document.getElementById('changeColorBtn');
  changeColorBtn.addEventListener('click', () => {
    const colors = ['#f4a261', '#e76f51', '#2a9d8f', '#264653', '#e9c46a'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
  });

  // Validación de lista dinámica
  const addItemBtn = document.getElementById('addItemBtn');
  const itemInput = document.getElementById('itemInput');
  const itemList = document.getElementById('itemList');
  const listError = document.getElementById('listError');

  addItemBtn.addEventListener('click', () => {
    const newItemText = itemInput.value.trim();
    if (newItemText === '') {
      listError.textContent = 'Por favor, introduce un elemento válido.';
    } else {
      listError.textContent = ''; // Limpiar mensaje de error
      const li = document.createElement('li');
      li.textContent = newItemText;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.addEventListener('click', () => {
        itemList.removeChild(li);
      });

      li.appendChild(deleteBtn);
      itemList.appendChild(li);
      itemInput.value = ''; // Limpiar campo de entrada
    }
  });

  // Contador
  let counter = 0;
  const counterValue = document.getElementById('counterValue');
  const incrementBtn = document.getElementById('incrementBtn');
  const decrementBtn = document.getElementById('decrementBtn');
  const counterError = document.getElementById('counterError');

  incrementBtn.addEventListener('click', () => {
    counter++;
    counterError.textContent = ''; // Limpiar mensaje de error
    counterValue.textContent = counter;
  });

  decrementBtn.addEventListener('click', () => {
    if (counter > 0) {
      counter--;
      counterValue.textContent = counter;
      counterError.textContent = ''; // Limpiar mensaje de error
    } else {
      counterError.textContent = 'El contador no puede ser menor a 0.';
    }
  });

  // Galería de imágenes con transiciones suaves
  const galleryImage = document.getElementById('galleryImage');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
  let currentIndex = 0;

  const updateImage = () => {
    galleryImage.style.opacity = 0; // Ocultar imagen
    setTimeout(() => {
      galleryImage.src = images[currentIndex];
      galleryImage.style.opacity = 1; // Mostrar imagen
    }, 500); // Esperar la transición antes de cambiar la imagen
  };

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  });

  // Modificar contenido y estilo
  const textElement = document.getElementById('textElement');
  const textInput = document.getElementById('textInput');
  const changeTextBtn = document.getElementById('changeTextBtn');
  const changeStyleBtn = document.getElementById('changeStyleBtn');

  changeTextBtn.addEventListener('click', () => {
    const newText = textInput.value;
    if (newText !== '') {
      textElement.textContent = newText;
    }
  });

  changeStyleBtn.addEventListener('click', () => {
    textElement.style.backgroundColor = "#f4a261";
    textElement.style.color = "#ffffff";
    textElement.style.fontSize = "20px";
    textElement.style.padding = "20px";
  });

  // Insertar y eliminar elementos dinámicos
  const newItemInput = document.getElementById('newItemInput');
  const dynamicList = document.getElementById('dynamicList');
  const addItemDynamicBtn = document.getElementById('addItemDynamicBtn');
  const removeLastDynamicBtn = document.getElementById('removeLastDynamicBtn');

  addItemDynamicBtn.addEventListener('click', () => {
    const newItem = newItemInput.value;
    if (newItem !== '') {
      const li = document.createElement('li');
      li.textContent = newItem;
      dynamicList.appendChild(li);
      newItemInput.value = '';
    }
  });

  removeLastDynamicBtn.addEventListener('click', () => {
    const lastItem = dynamicList.lastElementChild;
    if (lastItem) {
      dynamicList.removeChild(lastItem);
    }
  });

  // Escuchar eventos
  const eventInput = document.getElementById('eventInput');
  const eventOutput = document.getElementById('eventOutput');

  eventInput.addEventListener('input', () => {
    eventOutput.textContent = eventInput.value;
  });
});

