class Producto {
  constructor(nombre, imagen, precio, stock) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.precio = precio;
    this.stock = stock;
  }
  mostrarInfo() {
    alert(`Elegiste ${this.nombre} a un valor de $${this.precio}`);
  }
}

//VARIABLES

const productos = [];
productos.push(
  new Producto("Cartuchera", "imagenes/producto (1).jpeg", 450, 3),
  new Producto("Bolso", "imagenes/producto (2).jpeg", 1500, 2),
  new Producto("Portacosmeticos", "imagenes/producto (3).jpeg", 720, 4)
);
const prodElegidos = [];


const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#listaCarrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciarCarrito');
const divCard = document.getElementById("cards");
let productosCarrito = []



/*FUNCIONES */



// DIBUJA LAS CARDS

function dibujarCard(producto) {
  const colCard = document.createElement("div");
  colCard.className = "col";
  colCard.setAttribute("data-bs-target", "#exampleModal");
  colCard.setAttribute("data-bs-toggle", "modal");
  colCard.addEventListener("click", mostrarModal);
  divCard.appendChild(colCard);
  const divCard2 = document.createElement("div");
  divCard2.className = "card";
  colCard.appendChild(divCard2);
  const cardImg = document.createElement("img");
  cardImg.setAttribute("src", producto.imagen);
  cardImg.setAttribute("alt", "producto");
  divCard2.appendChild(cardImg);
  const bodyDiv = document.createElement("div");
  bodyDiv.className = "card-body";
  divCard2.appendChild(bodyDiv);
  const cardTitle = document.createElement("h5");
  cardTitle.innerText = producto.nombre;
  bodyDiv.appendChild(cardTitle);
  const stock = document.createElement("p");
  stock.innerText = `Stock: ${producto.stock}`;
  stock.setAttribute("id", "stock");
  bodyDiv.appendChild(stock);
  const cardPrecio = document.createElement("p");
  cardPrecio.innerText = `$ ${producto.precio}`;
  cardPrecio.setAttribute("id", "precio");
  bodyDiv.appendChild(cardPrecio);
  const btnCompra = document.createElement("button");
  btnCompra.innerText = "Agregar al Carrito";
  btnCompra.className = "btn btn-primary col-12 agregarCarrito";
  btnCompra.addEventListener('click', agregarProducto)
  bodyDiv.appendChild(btnCompra);
}

for (let i = 0; i < productos.length; i++) {
  dibujarCard(productos[i]);
}

//MUESTRA UN MODAL DE LA CARD ELEGIDA

function mostrarModal(e) {
  const cardElejida = e.target.parentElement.parentElement;
  const modal = document.getElementById("myModal");
  const compraModal = document.getElementById("agregarCarrito");
  


  modal.firstElementChild.setAttribute("src", cardElejida.querySelector("img").src);
  modal.children[1].children[0].innerHTML = cardElejida.querySelector("h5").textContent;
  modal.children[1].children[1].children[0].innerHTML = cardElejida.querySelector("#precio").textContent;
  modal.children[1].children[1].children[1].innerHTML = cardElejida.querySelector("#stock").textContent;

  

  
}


//Agrega producto
function agregarProducto(e){
    e.stopPropagation
if (e.target.classList.contains('agregarCarrito')) {
    const prodSeleccionado = e.target.parentElement.parentElement;
  leerProd(prodSeleccionado)
  }
}

//LEE DATOS DEL PRODUCTO
function leerProd(producto){

  const infoCard = {
    nombre: producto.querySelector("h5").textContent,
    imagen: producto.querySelector("img").src,
    stock: producto.querySelector("#stock").textContent,
    precio: producto.querySelector("#precio").textContent,
  }
  productosCarrito = [infoCard,...productosCarrito ]
  dibujarCarrito(infoCard)
}

// DIBUJAR EN EL CARRITO
function dibujarCarrito(prod){
  const tRow = document.createElement('tr')
  const tRowImg = document.createElement('th');
  const tRowName = document.createElement('th');
  const tRowPrecio = document.createElement('th');
  const img = document.createElement('img')
  contenedorCarrito.appendChild(tRow)
  tRow.appendChild(tRowImg)
  tRow.appendChild(tRowName)
  tRow.appendChild(tRowPrecio)
  tRowImg.appendChild(img);
  img.setAttribute('src', prod.imagen)
  img.setAttribute('width', '100px')
  tRowName.innerHTML = prod.nombre
  tRowPrecio.innerHTML = prod.precio
}