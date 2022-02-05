class Producto {
  constructor(nombre, imagen, precio, descripcion, id) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.precio = precio;
    this.descripcion = descripcion;
    this.id = id;
  }
}

//VARIABLES

let productos = [];
let productosCarrito = [];

// EVENTOS
eventListeners();
function eventListeners() {
  $("document").ready(() => {
    productosCarrito = JSON.parse(localStorage.getItem("carrito") || []);
    renderCarrito();
  });
}
$("document").ready(() => {
  $.ajax({
    type: "GET",
    url: "https://fakestoreapi.com/products",
    dataType: "json",
  }).done((data) => {
    productos = data.map(
      (prod) =>
        new Producto(
          prod.title,
          prod.image,
          prod.price,
          prod.description,
          prod.id
        )
    );
    productos.forEach((producto) => {
      $("#cards").append(`
        <div class="col" id="modalCard-${producto.id}">
          <div class="card" id="prod-${producto.id}">
            <img src="${producto.imagen}" class="card-img-top" alt="producto" data-bs-target="#exampleModal" data-bs-toggle="modal">
            <div class="card-body">
              <h5 class="card-title">${producto.nombre} </h5>
            </div>
            <div class="card-footer">
              <p class="card-text" id="precio">$${producto.precio} </p>
              <button class="btn btn-primary col-12 agregarCarrito boton">Agregar al Carrito</button>
            </div>
          </div>
        </div>
        `);
      $(`#prod-${producto.id} .agregarCarrito`).click(() =>{
        animarCarrito()
        agregarProducto(producto);
      });  
      $(`#modalCard-${producto.id}`).click(() => mostrarModal(producto));
    });
  });
});
/*FUNCIONES */

//MUESTRA UN MODAL DE LA CARD ELEGIDA

function mostrarModal(producto) {
  $("#myModal").html(`
  <img src="${producto.imagen}" alt="modal" class="img-fluid">
  <div class="p-3 d-flex flex-column">
    <h4 class="p-1 text-center">${producto.nombre} </h4>
    <div class="d-flex justify-content-between ">
        <p class="fs-4">$${producto.precio}</p>
    </div>
    <div>
      <p class="fs-5">${producto.descripcion}</p>
    </div>    
  </div>
`);
  $("#myModalFooter").html(`
  <button type="button" class="btn btn-primary agregarCarrito boton">Agregar al carrito</button>
  <button type="button" class="btn btn-primary boton" data-bs-dismiss="modal">Cancelar</button>
`);
  $("#myModalFooter .agregarCarrito").click(() => agregarProducto(producto));
}

//AGREGA PRODUCTO AL CARRITO Y MODIFICA LOS BOTONES

function agregarProducto(producto) {
  const prodObj = {
    nombre: producto.nombre,
    precio: producto.precio,
    imagen: producto.imagen,
    date: Date.now(),
  };
  productosCarrito.push(prodObj);

  renderCarrito();
}

//VACIAR CARRITO

function vaciarCarrito() {
  animarCarrito()
  productosCarrito = [];
  renderCarrito();
}
$("#vaciarCarrito").click(vaciarCarrito);

//RENDERIZA EL CARRITO
function renderCarrito() {
  let total = 0;
  const tBody = document.querySelector("#tbody");

  limpiarHTML(tBody);

  productosCarrito.forEach((producto) => {
    total += producto.precio;
    $("#tbody").append(`
    <tr>
      <th><img src="${producto.imagen}" width="100px"></th>
      <th>${producto.nombre}</th>
      <th>$${producto.precio}</th>
      <th><button class="btn btn-danger" onClick="quitarProducto(${producto.date})">X</button></th>
    </tr>
    `);
  });

  $("#tbody").append(`<tr>
       <th><p class="fs-3"> TOTAL </p></th>
       <td colspan="2" class="text-end"><p class="fs-3"> $${total}</p></td>
      </tr>
   `);

  sincronizarStorage();
}

//Limpiar el HTML

function limpiarHTML(elemento) {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

//QUITA PRODUCTOS DEL CARRITO SEGUN ID

function quitarProducto(date) {
  animarCarrito()
  const copiaCarrito = [...productosCarrito];
  productosCarrito = copiaCarrito.filter((prod) => date !== prod.date);

  renderCarrito();
}

//SINCRONIZA EL STORAGE

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(productosCarrito));
}

//ANIMA EL CARRITO AL AGREGAR UN PRODUCTO

function animarCarrito(){
  var div = $(".cart");
  div.animate({opacity: '0.2'}, "fast");
  div.animate({opacity: '1'}, "fast");
  div.animate({opacity: '0.2'}, "fast");
  div.animate({opacity: '1'}, "fast");
}