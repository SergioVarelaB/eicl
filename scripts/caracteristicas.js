showMoreBtn = document.getElementById("showMoreBtn");
hiddenContent = document.querySelectorAll('.hidden-content');
divContainer = document.getElementById('cardIcons');
knowMore = document.getElementById("knowMore");
offsetHeight = obtenerAnchoOculto('.hidden-content')
alturaAbierto = `${divContainer.scrollHeight + offsetHeight + 20}px`;
alturaCerrado = `${divContainer.scrollHeight}px`;
divContainer.style.maxHeight = alturaCerrado

showMoreBtn.addEventListener('click', () => {
    console.log(`${divContainer.scrollHeight} + ${offsetHeight} + 20`)

    if (knowMore.textContent == " Conoce más características ") {
        showMoreBtn.style.transform = 'rotate(180deg)';
        knowMore.textContent = "Ver menos"
        divContainer.style.maxHeight = alturaAbierto
        setTimeout(() => {
        // // Muestra el contenido oculto
            toogleHiddeenElements()
        }, 200); // 1000 ms = 1s
        
    } else {
        knowMore.textContent = " Conoce más características "
        showMoreBtn.style.transform = 'rotate(0deg)';
        divContainer.style.maxHeight = alturaCerrado
        setTimeout(() => {
        // // Muestra el contenido oculto
            toogleHiddeenElements()
        }, 200); // 1000 ms = 1s
    }
});

function toogleHiddeenElements(){
    hiddenContent.forEach(elemento => {
        elemento.classList.toggle('visible');
    });
}

function obtenerAnchoOculto(selector) {
    console.log(selector)
  const el = document.querySelector(selector);
  
  // Guardar estilos originales
  const estilosOriginales = {
    position: el.style.position,
    visibility: el.style.visibility,
    display: el.style.display
  };
  // Forzar a que sea medible sin verlo
  el.style.position = 'absolute';
  el.style.visibility = 'hidden';
  el.style.display = 'block';
  const ancho = el.offsetHeight; // aquí ya tiene el valor real
  // Restaurar estilos originales
  el.style.position = estilosOriginales.position;
  el.style.visibility = estilosOriginales.visibility;
  el.style.display = estilosOriginales.display;

  console.log(ancho)
  return ancho;

}



observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } 
  });
});

document.querySelectorAll('.aparecer-dinamico-cards').forEach(el => {
  observer.observe(el);
});