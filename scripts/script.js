function navegar(pagina, botonClicado) {
  // Cargar contenido dinámicamente
  fetch(`./pages/${pagina}.html`)
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar la página");
      return res.text();
    })
    .then(html => {
      document.getElementById("contenido").innerHTML = html;

      // Cargar su script asociado
      const script = document.createElement('script');
      script.src = `./scripts/${pagina}.js`;
      script.type = 'text/javascript'; // o ''
      document.querySelectorAll('script').forEach(script => script.remove());
      document.body.appendChild(script);

      switchBackground(pagina)

      // Quitar clase 'activo' de todos los botones
      document.querySelectorAll("nav ul li a").forEach(btn => btn.classList.remove("activo"));

      // Agregar clase 'activo' al botón actual
      document.getElementById(pagina).classList.add("activo")
      // botonClicado.classList.add("activo");


      if (pagina !== 'inicio') {
        document.querySelector(".navContainer").style.maxWidth = '80vw'
      } else {
        document.querySelector(".navContainer").style.maxWidth = '60vw'
      }
      // Luego mandas scroll arriba
      window.scrollTo(0, 0);
    })
    .catch(error => {
      document.getElementById("contenido").innerHTML = `<p>${error.message}</p>`;
    });
}

// Cargar página por defecto al iniciar
window.addEventListener("DOMContentLoaded", () => {
  const primerBoton = document.querySelector("nav ul li a");
  if (primerBoton) {
    primerBoton.click(); // Simula un clic para cargar inicio y marcarlo como activo
  }
});


function switchBackground(pagina) { 
  switch (pagina) {
    case 'inicio':
      cambiarFondoHeader('assets/Banners/homepage.png', '60vh');
      break;
    case 'galeria':
      cambiarFondoHeader('assets/Banners/gallery.png', '40vh')
      break;
    case 'contacto':
      cambiarFondoHeader('assets/Banners/contact.png', '40vh')
      break;
    case 'caracteristicas':
      cambiarFondoHeader('assets/Banners/characteristics.png', '40vh')
      break;
    case 'ubicacion':
      cambiarFondoHeader('assets/Banners/location.png', '40vh')
      break;
    default:
      break;
  }
}


function cambiarFondoHeader(url, nuevaAltura) {
  const header = document.getElementById('header');
  const visible = header.querySelector('.bg-layer.bg-visible');
  const hidden = header.querySelector('.bg-layer.bg-hidden');

  // Pre-cargar imagen
  const img = new Image();
  img.onload = () => {
    hidden.style.backgroundImage = `url('${url}')`;
    hidden.style.opacity = '1';

    // Cambiar altura al mismo tiempo
    header.style.height = nuevaAltura;

    // Después de la transición de opacidad, intercambiar capas
    setTimeout(() => {
      visible.classList.remove('bg-visible');
      visible.classList.add('bg-hidden');
      hidden.classList.remove('bg-hidden');
      hidden.classList.add('bg-visible');
    }, 800); // Debe coincidir con CSS transition
  };
  img.src = url;
}



