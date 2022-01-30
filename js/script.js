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


const divCard = document.getElementById("cards");
let productosCarrito = []


// EVENTOS
eventListeners()
function eventListeners(){
  $('document').ready(() =>{
    productosCarrito = JSON.parse(localStorage.getItem('carrito') || [])
    renderCarrito()
  })
  
}
/*FUNCIONES */

// DIBUJA LAS CARDS

productos.forEach((producto) =>{
  $('#cards').append(`
  <div class="col" id="modalCard-${producto.id}">
    <div class="card" id="prod-${producto.id}">
      <img src="${producto.imagen}" class="card-img-top" alt="producto" data-bs-target="#exampleModal" data-bs-toggle="modal">
      <div class="card-body">
        <h5 class="card-title">${producto.nombre} </h5>
        <p class="card-text" id="stock"> Stock: ${producto.stock} </p>
        <p class="card-text" id="precio">$${producto.precio} </p>
        <button class="btn btn-primary col-12 agregarCarrito">Agregar al Carrito</button>
      </div>
    </div>
  </div>
  `)
  $(`#prod-${producto.id} .agregarCarrito`).click(() => agregarProducto(producto))
  $(`#modalCard-${producto.id}`).click(() => mostrarModal(producto))
})



//MUESTRA UN MODAL DE LA CARD ELEGIDA

function mostrarModal(producto){
  $("#myModal").html(`
  <img src="${producto.imagen}" alt="modal" class="img-fluid">
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
`)
  $('#myModalFooter').html(`
  <button type="button" class="btn btn-primary agregarCarrito">Agregar al carrito</button>
  <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cancelar</button>
`)
  $('#myModalFooter .agregarCarrito').click(() => agregarProducto(producto))
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
  renderCarrito();
}
$('#vaciarCarrito').click(vaciarCarrito)


//RENDERIZA EL CARRITO
function renderCarrito(){
  let total = 0;
  const tBody = document.querySelector("#tbody")

  limpiarHTML(tBody)

  productosCarrito.forEach((producto) => {
    total += producto.precio
    $('#tbody').append(`
    <tr>
      <th><img src="${producto.imagen}" width="100px"></th>
      <th>${producto.nombre}</th>
      <th>${producto.precio}</th>
      <th><a href="#" class="btn btn-danger" onClick="quitarProducto(${producto.date})">X</a></th>
    </tr>
    `)
  } )

  $('#tbody').append(`<tr>
       <th><p class="fs-3"> TOTAL </p></th>
       <td colspan="2" class="text-end"><p class="fs-3"> $${total}</p></td>
      </tr>
   `)
  
  sincronizarStorage();
}

//Limpiar el HTML

function limpiarHTML(elemento){
 while (elemento.firstChild) {
   elemento.removeChild(elemento.firstChild)
 }
}

//QUITA PRODUCTOS DEL CARRITO SEGUN ID

function quitarProducto(date){
  const copiaCarrito = [...productosCarrito]
  productosCarrito = copiaCarrito.filter(prod => date !== prod.date)

  renderCarrito()
 }

 //SINCRONIZA EL STORAGE

  function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(productosCarrito))
  }

