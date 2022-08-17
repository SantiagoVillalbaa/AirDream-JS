class Carrito {
    constructor(id) {
        this.id = id
        this.productos = []
    }
    obtenerTotal() {
        let total = 0
        for (let i = 0; i < this.productos.length; i++) {
            total = total + this.productos[i].precio
        }
        return total
    }
}

let cardsDiv = document.querySelector("#cards")
let carrito = new Carrito(1)
let crearPaquetes = []
let paquetes = []

function catalogoSincronico(){
    crearPaquetes.forEach((producto) => {
        cardsDiv.innerHTML += renderCard(producto)
        botonCompra()
    })
}

//CARDS PRODUCTOS
function renderCard(producto) {
    let cardPaquetes =`<div class="cards-paquetes">
                        <img src="./img/${producto.imagen}" class="card-img-top img-cards" alt="...">
                        </a>
                        <h3 class="titulo-cards" id="producto${producto.id}">${producto.nombre}</h3>
                        <p class="letra-cards">${producto.descripcion}</p>
                        <p class="card-text precio-cards" id="${producto.id}">Total:$ ${producto.precio}</p>
                        <a href="#" class="btn botonDeCompra agregar-carrito" id="${producto.id}">Agregar al carrito</a>
                    </div>`
return cardPaquetes
}

function vaciarCarrito() {
let carritoDeCompra = document.querySelector("#carrito")
carritoDeCompra.innerHTML = ""
}

function cantidadCarrito(carrito) {
return carrito
}

function sumarCarreta() {
let carreta = cantidadCarrito(carrito.productos.length)
let carritoCompra = document.getElementById("cantidadCarrito")
carritoCompra.innerText = carreta
renovarStorage()
}

// CARDS CARRITO
function renderCardCarrito(producto) {
let cardCarrito = `
                        <td class="m-0"> <img src="./img/${producto.imagen}" class="card-img-top img-carrito" alt="..."><h6 id="producto${producto.id} class="titleDos asd">${producto.nombre}</h6></td>
                        <td class="m-0"><span>$${producto.precio}</span></td>
                        <td><button id="${producto.id}" type="button" class="botonSumar btn btn-success w-100"><i id="${producto.id}" class="fa-solid fa-plus w-100 fs-6"></i></button></td>
                        <td><span class=""><b>${producto.cantidad}</b></span></td>
                        <td><button id="${producto.id}" type="button" class="botonRestar btn btn-secondary w-100"><i id="${producto.id}" class="fa-solid fa-minus w-100 fs-6"></i></button></td>
                        <td><button id="${producto.id}" type="button" class="botonBorrar btn btn-danger w-100"><i id=${producto.id} class="fa-solid fa-trash-can w-100"></i></button></td>`
return cardCarrito
} 

function agregarAlCarrito() {
    let carritoDeCompra = document.querySelector("#carrito")
    let tituloCarrito = document.querySelector("#offcanvas")
        carrito.productos.forEach((producto) => {
        carritoDeCompra.innerHTML += renderCardCarrito(producto)
    })
    tituloCarrito.innerHTML = `<p>Precio Total: $${totales()}</p>`

    let botonSumar = document.querySelectorAll(".botonSumar")
    let arrayDeBotonSumar = Array.from(botonSumar)
        arrayDeBotonSumar.find((boton) => {
        boton.addEventListener("click", (e) => {
            const item = carrito.productos.find((producto) => producto.id == e.target.id)
            const chequearItem = carrito.productos.some((producto) => producto.id == e.target.id)
            chequearItem ? sumar(item) && agregarAlCarrito() : console.log(item)
            vaciarCarrito()
            agregarAlCarrito()
            renovarStorage()
        })
    })

    let botonRestar = document.querySelectorAll(".botonRestar")
    let arrayDeBotonRestar = Array.from(botonRestar)
        arrayDeBotonRestar.find((boton) => {
        boton.addEventListener("click", (e) => {
            const item = carrito.productos.find((producto) => producto.id == e.target.id)
            const chequearItem = carrito.productos.some((producto) => producto.id == e.target.id)
            console.log(item)
                chequearItem ? restar(item) && agregarAlCarrito() : eliminar(item)
                console.log(carrito)
                item.cantidad == 0 ? eliminar(item) : console.log(carrito)
                console.log(item)
            vaciarCarrito()
            agregarAlCarrito()
            sumarCarreta()
            renovarStorage()
        })
    })

    let botonBorrar = document.querySelectorAll(".botonBorrar")
    let arrayDeBotonBorrar = Array.from(botonBorrar)
        arrayDeBotonBorrar.find((boton) => {
        boton.addEventListener("click", (e) => {
            Swal.fire({
            title: '¿Quieres borrar el Paquete del carrito?',
            text: "Es una acción que no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar'
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                'Paquete eliminado!',
                'Tu Paquete se ha eliminado del carrito.',
                'success'
                )
                const item = carrito.productos.find((producto) => producto.id == e.target.id)
                item.cantidad = 0
                eliminar(item)
                vaciarCarrito()
                agregarAlCarrito()
                sumarCarreta()
                renovarStorage()
                }
            })
        })
    })
}

function eliminar(item){
    const indice = carrito.productos.indexOf(item)
    carrito.productos.splice(indice, 1)
}

function botonCompra(){
    let botones = document.querySelectorAll(".botonDeCompra")
    let arrayDeBotones = Array.from(botones)
    arrayDeBotones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const productoSeleccionado = crearPaquetes.find((producto) => producto.id == e.target.id)
            const chequeo = carrito.productos.find((producto) => producto.id == e.target.id)
            const chequeoDeCarrito = carrito.productos.some((producto) => producto.id == e.target.id)
            chequeoDeCarrito ? sumar(chequeo) : carrito.productos.push(productoSeleccionado) && sumar(productoSeleccionado);
            Toastify({
                text: "Tu Paquete fue agregado al carrito",
                duration: 1500,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                        background: "#2fb4cc",
                        color: "black",
                },
                onClick: function(){} 
            }).showToast()
        vaciarCarrito()
        agregarAlCarrito()
        sumarCarreta()
        })
    })
    renovarStorage()
}

function sumar(productoSeleccionado) {
    productoSeleccionado.cantidad += 1
    return
}

function restar(productoSeleccionado) {
    productoSeleccionado.cantidad -= 1
    console.log("tienes " + productoSeleccionado.cantidad)
    return
}

function totales() {
    let precioTotal = 0
        carrito.productos.forEach((producto) => {
        const total = producto.precio * producto.cantidad
            precioTotal += total
    })
    return precioTotal
}


function listaActualizada(storage2) {
    storage2.forEach((producto) => {
        paquetes.push(producto)
    })
}

function renovarStorage() {
    localStorage.removeItem("carrito")
    localStorage.removeItem("catalogo")
    localStorage.setItem("carrito", JSON.stringify(carrito))
    localStorage.setItem("catalogo", JSON.stringify(carrito.productos))
}

const storage = JSON.parse(localStorage.getItem("carrito"))
const storage2 = JSON.parse(localStorage.getItem("catalogo"))

window.addEventListener("DOMContentLoaded", (e) => {
    storage == null ? renovarStorage() : storage.productos.forEach((producto) => {carrito.productos.push(producto)})
    agregarAlCarrito(carrito)
    sumarCarreta()
    obtenerJason()
})

function cargarData(data){
    data.forEach((prod) => {
        crearPaquetes.push(prod)
    })
}

function cargarListado(data){
    data.forEach((prod) => {
        paquetes.push(prod)
    })
}

async function obtenerJason() {
    try{
        const res = await fetch("json/productos.json")
        const data = await res.json()
        const cantidades = carrito.productos.length == 0 ? true : false
        cantidades ? cargarListado(data) : listaActualizada(storage2)
        cargarData(data)
        renovarStorage()
    }catch(error){
        console.log(error)
    }
    catalogoSincronico()
}