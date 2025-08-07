showMoreBtn = document.getElementById("showMoreBtn");
card = document.querySelector('.cardCaracterizticas');
hiddenContent = document.querySelectorAll('.hidden-content');

// Inicialmente, guarda la altura de la tarjeta sin el contenido oculto
//  initialHeight = card.offsetHeight;

showMoreBtn.addEventListener('click', () => {
    console.log("vn dskvndkjndcjk")
    // Muestra el contenido oculto y la tarjeta se expandirá
    hiddenContent.forEach(elemento => {
        elemento.classList.toggle('visible');
    });


    if (hiddenContent[0].classList.contains('visible')){
        showMoreBtn.style.transform = 'rotate(180deg)';
        document.getElementById("knowMore").textContent = "Ver menos"
    }else{
        document.getElementById("knowMore").textContent = "Conoce más características"
        showMoreBtn.style.transform = 'rotate(0deg)';
    }


    // Pequeño delay para que la transición de altura se active
    setTimeout(() => {
        card.style.height = 'auto';
    }, 1);
});