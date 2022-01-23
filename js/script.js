class Producto {
  constructor(nombre, imagen, precio, stock, id) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.precio = precio;
    this.stock = stock;
    this.id = id;
  }
}

//VARIABLES

const productos = [];
productos.push(
  new Producto("Cartuchera", "imagenes/producto (1).jpg", 450, 3, 1),
  new Producto("Bolso", "imagenes/producto (2).jpeg", 1500, 2, 2),
  new Producto("Portacosmeticos", "imagenes/producto (3).jpg", 720, 4, 3),
  new Producto("Portacosmeticos", "imagenes/producto (4).jpeg", 300, 1, 4),
  new Producto("Cartuchera", "imagenes/producto (5).jpeg", 400, 2, 5),
  new Producto("Portacosmeticos", "imagenes/producto (6).jpg", 1000, 5, 6),
  new Producto("Bolso", "imagenes/producto (7).jpg", 1000, 5, 7),
  new Producto("Portacosmeticos", "imagenes/producto (8).jpg", 1000, 5, 8)
);


const carrito = document.querySelector('#carrito')
const vaciarCarritoBtn = document.querySelector('#vaciarCarrito');
const divCard = document.getElementById("cards");
let productosCarrito = []


// EVENTOS
eventListeners()
function eventListeners(){

  document.addEventListener('DOMContentLoaded', () => {
    productosCarrito = JSON.parse(localStorage.getItem('carrito') || [])
    renderCarrito()
  })
}
/*FUNCIONES */

// DIBUJA LAS CARDS

productos.forEach((producto) =>{
  const colCard = document.createElement("div");
  colCard.className = "col";
  colCard.addEventListener("click", () => mostrarModal(producto));
  divCard.appendChild(colCard);
  colCard.innerHTML = 
  `<div class="card" id="prod-${producto.id}">
      
      <img src="${producto.imagen}" class="card-img-top" alt="producto" data-bs-target="#exampleModal" data-bs-toggle="modal">
      <div class="card-body">
        <h5 class="card-title">${producto.nombre} </h5>
        <p class="card-text" id="stock"> Stock: ${producto.stock} </p>
        <p class="card-text" id="precio">$${producto.precio} </p>
        <button class="btn btn-primary col-12 agregarCarrito">Agregar al Carrito</button>
      </div>
      
    </div>`
    const btnCompra = document.querySelector(`#prod-${producto.id} .agregarCarrito`)
    btnCompra.addEventListener('click',  () => agregarProducto(producto))
    
})


//MUESTRA UN MODAL DE LA CARD ELEGIDA

function mostrarModal(producto){
  const modal = document.getElementById("myModal");
  modal.innerHTML = 
  `<img src="${producto.imagen}" alt="modal" class="img-fluid">
    <div class="p-3 d-flex flex-column">
      <h4 class="p-1 text-center">${producto.nombre} </h4>
      <div class="d-flex justify-content-between ">
          <p class="fs-4">$${producto.precio}</p>
          <p class="fs-4">Stock: ${producto.stock}</p>
      </div>
      <div>
        <p class="fs-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor enim, vitae voluptas officiis magni ducimus culpa molestias</p>
      </div>    
    </div>
  `
  const modalFooter = document.getElementById('myModalFooter');
  modalFooter.innerHTML = 
  ` <button type="button" class="btn btn-primary agregarCarrito">Agregar al carrito</button>
    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cancelar</button>
  `
  const btnModal = document.querySelector('#myModalFooter .agregarCarrito')
  btnModal.addEventListener("click", () => agregarProducto(producto))
}



//AGREGA PRODUCTO AL CARRITO Y MODIFICA LOS BOTONES

function agregarProducto(producto){
  const prodObj = {
    nombre : producto.nombre,
    precio : producto.precio,
    imagen : producto.imagen,
    date : Date.now()
  }
  productosCarrito.push(prodObj) 
  
  renderCarrito();
}


//VACIAR CARRITO

function vaciarCarrito(){
  productosCarrito = [];
  const botones = document.querySelectorAll(".quitarCarrito")
  botones.forEach((boton) =>{
    boton.classList.replace("quitarCarrito", "agregarCarrito")
    boton.classList.replace("btn-danger", "btn-primary")
    boton.innerHTML= "Agregar al Carrito"
  })
  renderCarrito();
}
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);


//RENDERIZA EL CARRITO

function renderCarrito(){
  let total = 0;
  const tBody = document.querySelector("#tbody")

  limpiarHTML(tBody)

  productosCarrito.forEach((producto) => {
    total += producto.precio
    const tRow = document.createElement('tr')
    const tImg = document.createElement('th')
    const imgCarrito = document.createElement('img')
    const tName = document.createElement('th')
    const tPrecio = document.createElement('th')
    const tQuitar = document.createElement('th')
    const enlaceQuitar = document.createElement('a')
    imgCarrito.setAttribute("src",`${producto.imagen}`)
    imgCarrito.setAttribute("width","100px")
    enlaceQuitar.classList.add("btn")
    enlaceQuitar.classList.add("btn-danger")
    enlaceQuitar.setAttribute('onClick', `quitarProducto(${producto.date})`)
    tName.innerHTML = `${producto.nombre}`;
    tPrecio.innerHTML = `${producto.precio}`;
    enlaceQuitar.innerHTML = "X"
    tBody.append(tRow)
    tRow.appendChild(tImg)
    tImg.appendChild(imgCarrito)
    tRow.appendChild(tName)
    tRow.appendChild(tPrecio)
    tRow.appendChild(tQuitar)
    tQuitar.appendChild(enlaceQuitar)
  } )

  const totalRow = document.createElement('tr')
  const tTotal = document.createElement('th')
  const tValor = document.createElement('td')
  tTotal.innerHTML = `<p class="fs-3"> TOTAL </p>` 
  tValor.setAttribute("colspan", "2")
  tValor.classList.add("text-end")
  tValor.innerHTML = `<p class="fs-3"> $${total} </p>` 
  tBody.append(totalRow)
  totalRow.append(tTotal)
  totalRow.append(tValor)

  sincronizarStorage();
}

function limpiarHTML(elemento){
 while (elemento.firstChild) {
   elemento.removeChild(elemento.firstChild)
 }
}


//QUITA PRODUCTOS DEL CARRITO SEGUN ID

function quitarProducto(date){
  console.log(productosCarrito);
  const copiaCarrito = [...productosCarrito]
  productosCarrito = copiaCarrito.filter(prod => date !== prod.date)
  renderCarrito()
 }

 //SINCRONIZA EL STORAGE

  function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(productosCarrito))
  }

