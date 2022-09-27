let productos = [];
let carrito = [];

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
        item.sumarIva()
        let div = document.createElement("div");
        div.className = "card col-sm-12 col-md-6 col-lg-3 mb-3 row justify-content-evenly text-center";
        div.style = "width: 14rem;"
        div.innerHTML = `<img class="card-img-top" src="${item.img}"/>
        <p class = "card-header text-center">${item.description}</p>
        <p class = "card-title text-center">$${item.price}</p>
        <button id="comprar-${item.id}" class="btn btn-primary">Seleccionar</button> `;
        container.append(div);
    }
    botonComprar()
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
}

function crearHtmlCarrito(arr) {
    let table = document.querySelector('#table');
    table.innerHTML = ""
    for (const item of arr) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${item.id}</td>
        <td>${item.description}</td>
        <td>$${item.price}</td>
        <td><button id="eliminar-${item.id}" class="btn-eliminar btn btn-danger">Eliminar</button></td>`;
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
}


const seleccionados = JSON.parse(localStorage.getItem("carrito"))
if (seleccionados) {
    carrito = seleccionados;
}

function tomarEdad() {
    let edad = document.getElementById("edad").value;
    edad >= 18 ? crearHtml(productos) : alert("Usted es menor de edad");
    crearHtmlCarrito(carrito);
}