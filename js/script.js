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
  new Producto("Cartuchera", "imagenes/producto (1).jpeg", 450, 3, 1),
  new Producto("Bolso", "imagenes/producto (2).jpeg", 1500, 2, 2),
  new Producto("Portacosmeticos", "imagenes/producto (3).jpeg", 720, 4, 3),
  new Producto("Portacosmeticos", "imagenes/producto (4).jpeg", 300, 1, 4),
  new Producto("Cartuchera", "imagenes/producto (5).jpeg", 400, 2, 5),
  new Producto("Portacosmeticos", "imagenes/producto (6).jpeg", 1000, 5, 6),
  new Producto("Bolso", "imagenes/producto (7).jpeg", 1000, 5, 7),
  new Producto("Portacosmeticos", "imagenes/producto (8).jpeg", 1000, 5, 8)
);


const carrito = document.querySelector('#carrito')
const vaciarCarritoBtn = document.querySelector('#vaciarCarrito');
const divCard = document.getElementById("cards");
let productosCarrito = []


// EVENTOS

/*FUNCIONES */

// DIBUJA LAS CARDS

productos.forEach((producto) =>{
  const colCard = document.createElement("div");
  colCard.className = "col";
  colCard.addEventListener("click", () => mostrarModal(producto));
  divCard.appendChild(colCard);
  colCard.innerHTML = 
  `<div class="card" id="prod-${producto.id}" >
      <img src="${producto.imagen} " class="card-img-top" alt="producto" data-bs-target="#exampleModal" data-bs-toggle="modal" >
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
  
  const btnCompra = document.querySelector(`#prod-${producto.id} .agregarCarrito`)
  btnCompra.classList.replace("agregarCarrito","quitarCarrito") 
  btnCompra.classList.replace("btn-primary","btn-danger") 
  btnCompra.innerHTML = "Quitar del carrito"
  btnCompra.addEventListener('click', () => quitarProducto(producto.id))
  productosCarrito.push(producto) 
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
  console.log(botones);
  renderCarrito();
}
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);


//RENDERIZA EL CARRITO

function renderCarrito(){
  let total = 0;
  const tBody = document.querySelector("#tbody")
  tBody.innerHTML= ""
  let htm = ""
  productosCarrito.forEach((producto) => {
    total += producto.precio
    htm += 
    ` <tr>
        <th scope="row">
          <img src="${producto.imagen}" width="100px">
        </th>
        <td>${producto.nombre} </td>
        <td>${producto.precio} </td>
        <td><a href="#" class="btn btn-danger" onClick="quitarProducto(${producto.id})" data-id="${producto.id}"id="quitar">X</a></td>
      </tr>`;

  } )
  htm += `<tr>
  <th scope="row">
    Total
  </th>
 
  <td colspan="2" class="text-end"> $ ${total}</td>
</tr>`
  tBody.innerHTML = htm
 
}

//QUITA PRODUCTOS DEL CARRITO SEGUN ID

function quitarProducto(id){
  
  const copiaCarrito = [...productosCarrito]
  productosCarrito = copiaCarrito.filter(prod => id !== prod.id)
  const btnQuitar = document.querySelector(`#prod-${id} .quitarCarrito`)
  btnQuitar.classList.replace("quitarCarrito","agregarCarrito") 
  btnQuitar.classList.replace("btn-danger","btn-primary") 
  btnQuitar.innerHTML = "Agregar al Carrito"
  const prod = productos.filter(producto => producto.id === id)
  btnQuitar.addEventListener("click", agregarProducto(prod))
  renderCarrito()
 }
