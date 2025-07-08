//                          Formulario de Artistas 

const formulario = document.getElementById("formulario-artista");
const mensajeExito = document.getElementById("mensaje-exito");

formulario.addEventListener("submit", function (e) {
e.preventDefault();

const inputs = formulario.querySelectorAll(".input-artistas");
let datos = {};
let error = false;

inputs.forEach(input => {
    const valor = input.value.trim();
    const campo = input.getAttribute("data-formulario");

    if (!valor) {
alert(`Por favor completá el campo "${campo}"`);
    error = true;
    } else {
    datos[campo] = valor;
    }
});

if (error) return;

localStorage.setItem("formularioArtista", JSON.stringify(datos));

alert("¡Datos guardados correctamente!");
formulario.reset();

const mensaje = `Hola! Soy ${datos.Nombre}, mi correo es ${datos.mail}, mi número es ${datos.numero} y quiero preguntar: ${datos.texto}`;

  const telefono = "5493827668399"; // Reemplazá esto por tu número real sin espacios

const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

mensajeExito.classList.add("mostrar"); // MOSTRAR ANIMACIÓN


setTimeout(() => {    // Esperar 1 segundo y luego redirigir
    mensajeExito.classList.remove("mostrar");
    window.open(url, "_blank");
}, 1000);

formulario.reset();



});
