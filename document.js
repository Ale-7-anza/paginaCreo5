const artistas = [
    {nombre: "Los Sacheros", url: "SubPaginasHome/sacheros.html"},
    {nombre: "Los Kijanos", url: "SubPaginasHome/kijanos.html"},
    {nombre: "Ivan Ruiz", url: "SubPaginasHome/ivan.html"}
]; 


const input = document.getElementById("buscador");
const resultados = document.querySelector(".resultado-artistas");

input.addEventListener("input", ()=> {
    const filtro = input.value.toLowerCase();
    resultados.innerHTML= "";

    const filtrados = artistas.filter (artistas => artistas.nombre.toLowerCase().includes(filtro)); 


    filtrados.forEach(artista => {
        const li = document.createElement("li");
        li.textContent = artista.nombre;
        li.style.cursor = "pointer";
        li.addEventListener("click", () => {
          window.location.href = artista.url; // Redirecciona
        });
        resultados.appendChild(li)});


        if (filtrados.length === 0 && filtro.length > 0) {
            resultados.innerHTML = "<li>No se encontró ningún artista.</li>"}

    });



    //boton de "ver mas" en carrusel de artistas


    const botones = document.querySelectorAll(".boton-revivimomento");
    const transicion = document.getElementById("transicion");

    botones.forEach(boton => {
        boton.addEventListener("click", function () {
            const tarjeta = this.closest(".card-artista");
            const nombre = tarjeta.dataset.artista;

            transicion.classList.add("activa");   //Activo la transicion 

        setTimeout(() => {     //Aplico el tiempo de demora antes de redirigir 
                window.location.href = `SubPaginasHome/${nombre}.html`;
            }, 700);
    });
});










