let productos = fetchAPI();
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//crear tarjetas
function crearHtml(arr) {
    let container = document.querySelector('#container');
    container.innerHTML = ""
    for (const item of arr) {
        // item.sumarIva()
        let { img, description, price, id } = item;
        let div = document.createElement("div");
        div.className = "card col-sm-12 col-md-6 col-lg-3 mb-3 row justify-content-evenly text-center entrada";
        div.style = "width: 11rem;"
        div.innerHTML = `<img class="card-img-top" src="${img}"/>
        <p class = "card-header text-center">${description}</p>
        <p class = "card-title text-center">$${price}</p>
        <button id="comprar-${id}" class="btn btn-primary">Seleccionar</button> `;
        container.append(div);
    }
    botonComprar()
    contador()
    total()
}

//función del botón Seleccionar
function botonComprar() {
    for (const item of productos) {
        document
            .querySelector(`#comprar-${item.id}`)
            .addEventListener("click", () => {
                selecProducto(item);
                Swal.fire(
                    'Producto Seleccionado',
                    'Añadido al carrito',
                    'success'
                )
            })
    }
}

//función al seleccionar un Servicio
function selecProducto(obj) {
    carrito.push(obj);
    crearHtmlCarrito(carrito)
    contador()
    total()
    if (carrito.length > 0) {
        finBtn.disabled = false;
    }
}

//función crear Carrito
function crearHtmlCarrito(arr) {
    let table = document.querySelector('#table');
    table.innerHTML = ""
    for (const item of arr) {
        let { id, description, price } = item
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${id}</td>
        <td>${description}</td>
        <td>$${price}</td>
        <td><button id="eliminar-${id}" class="btn-eliminar btn btn-danger">Eliminar</button></td>`;
        table.append(tr);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    botonEliminar()
}

//función para contar los Servicios seleccionados
function contador() {
    let contador = document.getElementById("contador")
    contador.innerText = carrito.length
}

//función para calcular el precio total de Servicios seleccionados
function total() {
    let total = document.getElementById("total")
    let resultado = carrito.reduce((acc, el) => acc + el.price, 0)
    total.innerText = resultado.toFixed(2)
}

//función del botón Eliminar
function botonEliminar() {
    let btnEliminar = document.querySelectorAll(".btn-eliminar")
    btnEliminar.forEach((el) => {
        el.addEventListener('click', (ev) => {
            let button = ev.target.id
            eliminarProducto(button)
            Swal.fire({
                icon: 'error',
                title: 'Producto eliminado',
                text: 'Se ha quitado del carrito',
            })
        });
    })

}


//función para modificar el carrito
function eliminarProducto(param) {
    let item = carrito.find((el) => `eliminar-${el.id}` === param)
    let index = carrito.indexOf(item)
    carrito.splice(index, 1)
    crearHtmlCarrito(carrito)
    contador()
    total()
    localStorage.setItem('carrito', JSON.stringify(carrito));
    if (carrito.length == 0) {
        finBtn.disabled = true;
    }
}


//función para consumir los Datos desde API local
async function fetchAPI() {
    const URL = '../js/data.json';
    const response = await fetch(URL);
    const data = await response.json();
    productos = data
}

//función para verificar la edad
function tomarEdad() {
    let edad = document.getElementById("edad").value;
    edad >= 18 ? crearHtml(productos) : Swal.fire({
        icon: 'error',
        title: 'Menor de edad',
        text: 'No es posible mostrar los Servicios.',
    });
    crearHtmlCarrito(carrito);
}

//variables de botones 'enviar' y 'finalizar compra'
let edadBtn = document.getElementById("btnEnviar");
let finBtn = document.getElementById("btnFin");

//eventos para desactivar botón 'enviar' y activar 'finalizar compra'
document.getElementById("btnEnviar").addEventListener('click', function (e) {
    edadBtn.disabled = true;
    if (carrito.length > 0) {
        finBtn.disabled = false;
    }
});

//evento para finalizar compra
document.getElementById("btnFin").addEventListener('click', function (e) {
    Swal.fire(
        'Compra Finalizada',
        'Gracias por confiar en nosotros',
        'success'
    )
    carrito.splice(0, carrito.length)
    crearHtmlCarrito(carrito)
    localStorage.clear()
    contador()
    total()
    finBtn.disabled = true;
})