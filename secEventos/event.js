const eventos = [
    { id: 1, nombre: "Sabroso Dia del Amigo", precio:14000, ubicacion: {lat: -29.4131,lng: -66.8509},spotify:""},
    { id: 2, nombre: "Los Kijanos Festival del Poncho", precio:14000, ubicacion: {lat: -29.4131,lng: -66.8509},spotify:""},
    { id: 3, nombre: "Ulises Bueno, Catamarca", precio:16000, ubicacion: {lat: -29.4131,lng: -66.8509},spotify:""}
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
    const emailComprador = document.getElementById('emailComprador').value.trim();

    if (carrito.length === 0) {
    Swal.fire({
        title: 'Carrito vacío',
        text: 'No has seleccionado ningún evento para comprar.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        background: '#111',
        color: '#fff',
        confirmButtonColor: '#ff0055'
    });
    } else if (!emailComprador) {
    Swal.fire({
        title: 'Falta el correo electrónico',
        text: 'Por favor ingresá tu correo antes de continuar.',
        icon: 'warning',
        confirmButtonText: 'Ok',
        background: '#111',
        color: '#fff',
        confirmButtonColor: '#ffaa00'
    });
    } else {
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
        if (result.isConfirmed) {
          // Aquí podés enviar el email con EmailJS también
        enviarEmailCompra(emailComprador, carrito);

        Swal.fire({
            title: '¡Compra realizada!',
            text: 'Tus entradas han sido reservadas con éxito.',
            icon: 'success',
            confirmButtonText: 'Genial',
            background: '#111',
            color: '#fff',
            confirmButtonColor: '#6600ff'
        });

        carrito = [];
        localStorage.removeItem('carrito');
        actualizarVistaCarrito();
          document.getElementById('emailComprador').value = ''; // Limpiar el campo
        }
    });
    }
}

function enviarEmailCompra(email, carrito) {
    const eventosComprados = carrito.map((item, index) => `${index + 1}. ${item.nombre} - ${item.fecha}`).join('\n');

    const templateParams = {
    user_email: email,
    mensaje: `Se realizó una compra con los siguientes eventos:\n${eventosComprados}`
    };

    emailjs.send('8PtHYk_TKj8b2lX5t', 'template_5cqtn7i', templateParams)
    .then(() => {
        console.log('Email enviado correctamente');
    }, (error) => {
        console.error('Error al enviar email:', error);
    });
}

