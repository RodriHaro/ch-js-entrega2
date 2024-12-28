const productos = [
    { id: 1, nombre: "Anteojos de Sol Polarizados", precio: 190000, tipo: "Sol", imagen: "img/sol-polarizado.png" },
    { id: 2, nombre: "Armazon Premium Gris", precio: 140000, tipo: "Armazon", imagen: "img/armazon-gris.png" },
    { id: 3, nombre: "Anteojos de Sol Lente Gris", precio: 195000, tipo: "Sol", imagen: "img/sol-lente-gris.png" },
    { id: 4, nombre: "Armazon Negro Mate", precio: 160000, tipo: "Armazon", imagen: "img/armazon-negro-mate.png" },
    { id: 5, nombre: "Anteojos de Sol Lente Azul", precio: 196000, tipo: "Sol", imagen: "img/sol-lente-azul.png" },
    { id: 6, nombre: "Armazon Negro Brillo", precio: 170000, tipo: "Armazon", imagen: "img/armazon-negro-rojo.png" },
];


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productosContainer = document.getElementById("productos");
const popupCarrito = document.getElementById("popupCarrito");
const listaCarrito = document.getElementById("listaCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const totalCarrito = document.getElementById("total");
const abrirCarrito = document.getElementById("abrirCarrito");
const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
const cerrarCarritoBtn = document.getElementById("cerrarCarrito");
const mensajeCompra = document.getElementById("mensajeCompra");

// Agregar productos al HTML
function renderProductos() {
    productosContainer.innerHTML = "";
    productos.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button data-id="${producto.id}">Agregar al Carrito</button>
        `;
        productosContainer.appendChild(productoDiv);
    });

    const botones = productosContainer.querySelectorAll("button");
    botones.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(e) {
    const productoId = parseInt(e.target.dataset.id);
    const producto = productos.find(p => p.id === productoId);
    carrito.push(producto);
    actualizarCarrito();
    guardarCarritoEnStorage();
}

// Actualizar carrito
function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    carrito.forEach((producto, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio}
            <button data-index="${index}">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
    });

    const botonesEliminar = listaCarrito.querySelectorAll("button");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });

    contadorCarrito.textContent = carrito.length;
    totalCarrito.textContent = `Total: $${carrito.reduce((acc, prod) => acc + prod.precio, 0)}`;
}

// Eliminar producto del carrito
function eliminarDelCarrito(e) {
    const index = parseInt(e.target.dataset.index);
    carrito.splice(index, 1);
    actualizarCarrito();
    guardarCarritoEnStorage();
}

// Guardar carrito en localStorage
function guardarCarritoEnStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    guardarCarritoEnStorage();
}

function mostrarCarrito() {
    popupCarrito.classList.remove("oculto");
    document.body.classList.add("popup-abierto");
}

function cerrarCarrito() {
    popupCarrito.classList.add("oculto");
    document.body.classList.remove("popup-abierto");
}

// Comprar
document.getElementById("comprar").addEventListener("click", () => {
    listaCarrito.innerHTML = ""; 
    mensajeCompra.classList.remove("oculto"); 
    setTimeout(() => {
        vaciarCarrito(); 
        mensajeCompra.classList.add("oculto"); 
        carritoPopup.classList.add("oculto"); 
        actualizarCarrito(); 
    }, 2000);
});

abrirCarrito.addEventListener("click", mostrarCarrito);
cerrarCarritoBtn.addEventListener("click", cerrarCarrito);
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

renderProductos();
actualizarCarrito();