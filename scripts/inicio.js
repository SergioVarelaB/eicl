// Reemplaza estos valores con tus propias credenciales de Contentful
SPACE_ID = "ti2na2n1uido";
ACCESS_TOKEN = "tZc9say8SlyPCJEw4HvNm9A0xIv0uo4OBHePxO5yIck";

// El ID del tipo de contenido que creamos en Contentful (el identificador de API)
CONTENT_TYPE_ID = "infoBodegas";

// URL para hacer la petición a la API de Contentful
API_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE_ID}`;
API_VIDEO = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=videoGalleryHome`;


window.addEventListener('load', function () {
    // close modals on background click
    document.addEventListener('click', event => {
        if (event.target.classList.contains('jw-modal')) {
            closeModal();
        }
    });
});
bodegasInfo = {};

// open modal by id
function openModal(id, id_bodega) {
    document.getElementById(id).classList.add('open');
    document.body.classList.add('jw-modal-open');
    const data = bodegasInfo[id_bodega];
    if (data) {
      document.getElementById("nameBodega").textContent = data.nombre;
      document.getElementById("superficie").textContent = data.superficie + " m2";
      document.getElementById("precio").textContent = data.precio;
      document.getElementById("enganche").textContent = data.enganche;
      document.getElementById("mensualidad").textContent = data.mensualidad;
    }
}


// Función principal para obtener y renderizar las imágenes
async function getBodegasInfo() {
  try {
    response = await fetch(API_URL);
    data = await response.json();

    return data.items[0].fields.bodegas

  } catch (error) {
    console.error("Error al obtener las imágenes de Contentful:", error);
    mainImageElement.alt = "Error al cargar la info.";
  }
}


getBodegasInfo().then(data => {
      bodegasInfo = data;
      return fetch("assets/Bodegas/Bodega.svg")
    })
    .then(res => res.text())
    .then(svg => {
        document.getElementById("contenedor-svg").innerHTML = svg;

        const idsZonas = Object.keys(bodegasInfo).filter(key => bodegasInfo[key].isSell === false);
        const idsZonasRellenar = Object.keys(bodegasInfo).filter(key => bodegasInfo[key].isSell === true)

        idsZonas.forEach((id) => {
            document.getElementById(id).addEventListener("click", () => {
                openModal("modal-1", id);
            });
        });

        idsZonasRellenar.forEach((id) => {
            element = document.getElementById(id)
            element.setAttribute('fill', '#95bd61');
            element.setAttribute('fill-opacity', '1');
        });


    });


// close currently open modal
function closeModal() {
    document.querySelector('.jw-modal.open').classList.remove('open');
    document.body.classList.remove('jw-modal-open');
}


observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      // Cuando el elemento sale de la pantalla, quitamos la clase para poder repetir la animación
      entry.target.classList.remove('visible');
    }
  });
});

document.querySelectorAll('.aparecer-dinamico-cards').forEach(el => {
  observer.observe(el);
});


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

getGalleryVideo();