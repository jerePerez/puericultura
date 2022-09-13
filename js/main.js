class Persona {
    constructor(nombre, apellido, edad) {
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.edad = edad;
    }
}

const personas = [];

function registracion() {
    do {
        personas.push(new Persona(prompt("Ingrese su nombre"), prompt("Ingrese su apellido"), parseInt(prompt("Ingrese su edad"))));
        let pregunta = prompt("Quieres registrar otra persona \n 1-Si \n 2-No").toUpperCase();
        if (pregunta == "NO" || pregunta == 2) {
            break;
        }
    } while (true);
}

registracion();
console.log(personas);

function mostrarOpciones() {
    let opcion;
    do {
        opcion = parseInt(prompt("¿Qué desea realizar?: \n1)Pedir Turno\n2)Pedir Presupuesto\n3)Hablar con un representante "))
    } while (opcion != 1 && opcion != 2 && opcion != 3)
    switch (opcion) {
        case 1:
            return "pedir turno";
        case 2:
            return "pedir presupuesto";
        case 3:
            return "comunicarse con un representante";
    }

}

function validarOpcion(opcion) {
    if (opcion === "pedir turno") {
        return 12345;
    }
    else if (opcion === "pedir presupuesto") {
        return 54321;
    } else if (opcion === "comunicarse con un representante") {
        return 55555;
    }
}

function informar(servicio, telefono) {
    alert("Para " + servicio + ", llame al: " + telefono + "\n¡Gracias por utilizar nuestro servicio!");
}


let nombreServicio = mostrarOpciones();
let numeroTelefono = validarOpcion(nombreServicio);
informar(nombreServicio, numeroTelefono);

function buscando() {
    let seleccion;
    do {
        seleccion = parseInt(prompt("Desea buscar un registro? \n1)Si\n2)No"))
    } while (seleccion != 1 && seleccion != 2)
    switch (seleccion) {
        case 1:
            return "SI";
        case 2:
            return "NO";
    }

}

function validarBusqueda(seleccion) {
    if (seleccion === "SI") {
        let nombreB = (prompt("Ingrese el nombre a buscar: ").toUpperCase());
        const buscar = personas.find((el) => el.nombre === nombreB);
        console.log(buscar);
    } else if (seleccion === "NO") {
        alert("Gracias por utilizar nuestro servicio.")
    }
}

let busqueda = buscando();
validarBusqueda(busqueda);

const ul = document.getElementById('lista');

for (const nombre of personas) {
    let li = document.createElement('li');
    li.innerText = nombre;
    ul.append(li);
}