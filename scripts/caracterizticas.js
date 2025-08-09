showMoreBtn = document.getElementById("showMoreBtn");
hiddenContent = document.querySelectorAll('.hidden-content');
divContainer = document.getElementById('cardIcons');
knowMore = document.getElementById("knowMore");


showMoreBtn.addEventListener('click', () => {

    if (knowMore.textContent == " Conoce más características ") {
        showMoreBtn.style.transform = 'rotate(180deg)';
        knowMore.textContent = "Ver menos"
        divContainer.style.maxHeight = '70vh';
        setTimeout(() => {
        // Muestra el contenido oculto
        toogleHiddeenElements()
        }, 170); // 1000 ms = 1s
    } else {
        knowMore.textContent = " Conoce más características "
        showMoreBtn.style.transform = 'rotate(0deg)';
        divContainer.style.maxHeight = '40vh'
        toogleHiddeenElements()
    }
});

function toogleHiddeenElements(){
    hiddenContent.forEach(elemento => {
        elemento.classList.toggle('visible');
    });
}