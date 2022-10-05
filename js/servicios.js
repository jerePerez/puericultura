let productos = [];
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// constructor de productos
class Productos {
    constructor(id, description, price, img) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.img = img;
    }
    sumarIva() {
        return this.price *= 1.21;
    }
}

//agregar productos
productos.push(new Productos(1, "Charla Informativa", 1500, "../assets/img/charla.jpg"));
productos.push(new Productos(2, "Visita a Domicilio", 2500, "../assets/img/visita.jpg"));
productos.push(new Productos(3, "Encuentro Virtual", 2000, "../assets/img/encuentro.jpg"));
productos.push(new Productos(4, "Asistencia Prenatal", 3000, "../assets/img/asistencia.png"));

//crear tarjetas
function crearHtml(arr) {
    let container = document.querySelector('#container');
    container.innerHTML = ""
    for (const item of arr) {
        // item.sumarIva()
        let { img, description, price, id } = item;
        let div = document.createElement("div");
        div.className = "card col-sm-12 col-md-6 col-lg-3 mb-3 row justify-content-evenly text-center";
        div.style = "width: 13rem;"
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

function selecProducto(obj) {
    carrito.push(obj);
    crearHtmlCarrito(carrito)
    contador()
    total()
    if (carrito.length > 0) {
        finBtn.disabled = false;
    }
}

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

function contador() {
    let contador = document.getElementById("contador")
    contador.innerText = carrito.length
}

function total() {
    let total = document.getElementById("total")
    let resultado = carrito.reduce((acc, el) => acc + el.price, 0)
    total.innerText = resultado.toFixed(2)
}

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


function cargaDatos() {
    fetch('../js/data.json')
        .then(res => res.json())
        .then(data => {
            crearHtml(data);
        })

}

function tomarEdad() {
    let edad = document.getElementById("edad").value;
    edad >= 18 ? cargaDatos() : Swal.fire({
        icon: 'error',
        title: 'Menor de edad',
        text: 'No es posible mostrar los Servicios.',
    });
    crearHtmlCarrito(carrito);
}

let edadBtn = document.getElementById("btnEnviar");
let finBtn = document.getElementById("btnFin");

document.getElementById("btnEnviar").addEventListener('click', function (e) {
    edadBtn.disabled = true;
    if (carrito.length > 0) {
        finBtn.disabled = false;
    }
});


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
})