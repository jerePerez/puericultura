const nombre = document.getElementById("formGroupExampleInput"),
    email = document.getElementById("exampleInputEmail1"),
    mensaje = document.getElementById("exampleFormControlTextarea1"),
    btn = document.getElementById("btnEnviar");

function guardarContacto() {
    let user = { username: nombre.value, correo: email.value, mensaje: mensaje.value }
    localStorage.setItem("contacto", JSON.stringify(user))
}

function recuperarContacto(datos) {
    if (datos) {
        nombre.value = datos.username;
        email.value = datos.correo;
        mensaje.value = datos.mensaje;
    }

}

recuperarContacto(JSON.parse(localStorage.getItem("contacto")))

btn.addEventListener('click', (e) => {
    e.preventDefault()
    guardarContacto()
});