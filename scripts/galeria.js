// Reemplaza estos valores con tus propias credenciales de Contentful
SPACE_ID = "ti2na2n1uido";
ACCESS_TOKEN = "tZc9say8SlyPCJEw4HvNm9A0xIv0uo4OBHePxO5yIck";

// El ID del tipo de contenido que creamos en Contentful (el identificador de API)
CONTENT_TYPE_ID = "imagenGaleria";

// URL para hacer la petición a la API de Contentful
API_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE_ID}`;
API_LASTUPDATE = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=lastUpdate`;
API_VIDEO = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=videoGallery`;


// Elementos del DOM
mainImageElement = document.getElementById("main-image");
thumbnailsContainer = document.getElementById("thumbnails-gallery");
prevBtn = document.getElementById("prev-btn");
nextBtn = document.getElementById("next-btn");

galleryImages = []; // Array para guardar las imágenes de Contentful
currentIndex = 0; // Índice de la imagen que se está mostrando

// Función para mostrar la imagen principal y resaltar la miniatura activa
function showImage(index) {
  if (galleryImages.length === 0) return;

  currentIndex = index;
  currentImage = galleryImages[currentIndex];

  // Asigna la URL de la imagen principal. Contentful la optimiza automáticamente.
  mainImageElement.src = "https:" + currentImage.url;
  mainImageElement.alt = currentImage.title;

  // Remueve la clase 'active' de todas las miniaturas
  allThumbnails = document.querySelectorAll(".thumbnail");
  allThumbnails.forEach(thumb => thumb.classList.remove("active"));

  // Añade la clase 'active' a la miniatura actual
  activeThumbnail = allThumbnails[currentIndex];
  if (activeThumbnail) {
    activeThumbnail.classList.add("active");
    // Asegura que la miniatura activa esté visible en el scroll
    activeThumbnail.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }
}

// Función para ir a la imagen siguiente
function nextImage() {
  nextIndex = (currentIndex + 1) % galleryImages.length;
  showImage(nextIndex);
}

// Función para ir a la imagen anterior
function prevImage() {
  prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(prevIndex);
}

// Event listeners para los botones de navegación
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);


// Función principal para obtener y renderizar las imágenes
async function getGalleryImages() {
  try {
    response = await fetch(API_URL);
    data = await response.json();

    items = data.items;
    assets = data.includes.Asset;

    // Mapeamos los datos de Contentful a nuestro array 'galleryImages'
    galleryImages = items.map(item => {
      imageAssetId = item.fields.imagen.sys.id;
      imageAsset = assets.find(asset => asset.sys.id === imageAssetId);

      return {
        title: item.fields.tituloDeLaImagen,
        // URL base de la imagen. La optimización la haremos en el HTML/CSS
        url: imageAsset.fields.file.url
      };
    });

    // Si hay imágenes, las renderizamos
    if (galleryImages.length > 0) {
      renderThumbnails();
      showImage(0); // Muestra la primera imagen al cargar
    } else {
      mainImageElement.src = "";
      mainImageElement.alt = "No hay imágenes disponibles.";
    }

  } catch (error) {
    console.error("Error al obtener las imágenes de Contentful:", error);
    mainImageElement.alt = "Error al cargar la galería.";
  }
}

async function getGalleryVideo() {
  try {
    response = await fetch(API_VIDEO);
    data = await response.json();

    publicID = data.items[0].fields.publicId;
    // assets = data.includes.fields;
    console.log(publicID)
    url = `https://player.cloudinary.com/embed/?cloud_name=ecil&public_id=${publicID}&profile=cld-default`
    document.getElementById("video-gallery").src = url

  } catch (error) {
    console.error("Error al obtener el video de Contentful:", error);
    mainImageElement.alt = "Error al cargar la galería.";
  }
}

// Función para renderizar las miniaturas
function renderThumbnails() {
  thumbnailsContainer.innerHTML = ""; // Limpia el contenedor de miniaturas
  galleryImages.forEach((image, index) => {
    imgElement = document.createElement("img");
    imgElement.classList.add("thumbnail");
    // Contentful permite optimizar las imágenes desde la URL
    // Aquí usamos ?w=100&h=100 para hacer la miniatura de 100x100
    imgElement.src = "https:" + image.url + "?w=100&h=100&fit=thumb";
    imgElement.alt = image.title;
    imgElement.dataset.index = index; // Guardamos el índice en un atributo de datos

    // Añadimos el evento 'click' para cambiar la imagen principal
    imgElement.addEventListener("click", (e) => {
      selectedIndex = parseInt(e.target.dataset.index);
      showImage(selectedIndex);
    });

    thumbnailsContainer.appendChild(imgElement);
  });
}

async function getLastUpdate() {
  try {
    response = await fetch(API_LASTUPDATE);
    data = await response.json();
    document.getElementById("lastUpdate").innerHTML = `<span style="color: #8DD140; font-weight: bold;">Actualización avance de construcción:</span> ${data.items[0].fields.lastUpdate}`
    return data.items[0].fields.lastUpdate
  } catch (error) {
    console.log(error) 
  }
}

getLastUpdate()

// Inicia el proceso al cargar la página
getGalleryImages();

getGalleryVideo();