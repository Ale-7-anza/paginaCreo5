const eventos = [
    { id: 1, nombre: "Sabroso Dia del Amigo", precio:14000},
    { id: 2, nombre: "Los Kijanos Festival del Poncho", precio:14000},
    { id: 3, nombre: "Ulises Bueno, Catamarca", precio:16000}
]; 


let carrito = [];


//Capturo los clicks
const botonesAgregar = document.querySelectorAll(".agregar-carrito");

botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () =>{
        const id = parseInt(boton.getAttribute("data-id"));
        const evento = eventos.find(e => e.id === id);

        agregarAlCarrito(evento);
    })
})


//agrego al carrito


function agregarAlCarrito (evento){ 
    const existente = carrito.find(item => item.id === evento.id);

    if (existente){
        existente.cantidad += 1;
    }else {
        carrito.push({...evento, cantidad: 1});
    }

    mostrarCarrito();
}

function mostrarCarrito (){
    const lista = document.getElementById("lista-carrito");
    const totalTexto = document.getElementById("total-carrito")

    lista.innerHTML = ""; 

    let total = 0;

    for (let i = 0; i < carrito.length; i++){ 
        const item = carrito[i];
        const li = document.createElement("li");
        li.innerHTML = `
        ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}
    <button class="quitar" data-id="${item.id}">❌</button>
        `;

        lista.appendChild(li);
    
        total += item.precio * item.cantidad;
    }

    totalTexto.textContent = `Total: $${total}`;

    const botonesQuitar = document.querySelectorAll(".quitar");

    botonesQuitar.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = parseInt(boton.getAttribute("data-id"));
            quitarDelCarrito(id);
        });
    });

    function quitarDelCarrito(id) {
        const index = carrito.findIndex (item => item.id === id);

        if (index !== -1) { 
            if (carrito[index].catidad > 1){
                carrito[index].cantidad -= 1;
            }else {
                carrito.splice(index, 1);
            }
        }

        guardarEnLocalStorage ();
        mostrarCarrito();

    }





    function guardarEnLocalStorage(){
        localStorage.setItem("carrito", JSON.stringify(carrito));
    
    }
}


function realizarCompra() {
    if (carrito.length === 0) {
      // Carrito vacío
    Swal.fire({
        title: 'Carrito vacío',
        text: 'No has seleccionado ningún evento para comprar.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        background: '#111',
        color: '#fff',
        confirmButtonColor: '#ff0055'
    })
    } else {  // Confirmación de compra
    Swal.fire({
        title: '¿Confirmás la compra?',
        text: `Estás a punto de comprar ${carrito.length} entradas.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#00cc66',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar',
        background: '#111',
        color: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {           // Compra realizada
        Swal.fire({
            title: '¡Compra realizada!',
            text: 'Tus entradas han sido reservadas con éxito.',
            icon: 'success',
            confirmButtonText: 'Genial',
            background: '#111',
            color: '#fff',
            confirmButtonColor: '#6600ff'
        });

        carrito = [];    // Vacia el carrito después de la compra
        localStorage.removeItem('carrito');
          actualizarVistaCarrito(); // si tenés una función para refrescar la UI
        }
    });
    }
}
