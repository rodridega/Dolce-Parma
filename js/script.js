class Producto {
  constructor(nombre, imagen, precio, stock, id) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.precio = precio;
    this.stock = stock;
    this.id = id;
  }
  mostrarInfo() {
    alert(`Elegiste ${this.nombre} a un valor de $${this.precio}`);
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
  new Producto("Portacosmeticos", "imagenes/producto (6).jpeg", 1000, 5, 6)
);


const carrito = document.querySelector('#carrito')
const vaciarCarritoBtn = document.querySelector('#vaciarCarrito');
const divCard = document.getElementById("cards");
let productosCarrito = []



/*FUNCIONES */

// DIBUJA LAS CARDS
productos.forEach((producto) =>{
  const colCard = document.createElement("div");
  colCard.className = "col";
  colCard.addEventListener("click", () => mostrarModal(producto));
  divCard.appendChild(colCard);
  colCard.innerHTML = 
  `<div class="card" id="prod-${producto.id}" >
      <img src="${producto.imagen} " class="card-img-top" alt="producto" data-bs-target="#exampleModal" data-bs-toggle="modal">
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

function mostrarModal(producto) {
  const modal = document.getElementById("myModal");
  
  modal.firstElementChild.setAttribute("src",`${producto.imagen}`);
  modal.children[1].children[0].innerHTML = `${producto.nombre} `;
  modal.children[1].children[1].children[0].innerHTML = `${producto.precio} `;
  modal.children[1].children[1].children[1].innerHTML = `${producto.stock} `;
  const btnModal = document.querySelector('.modal-footer .agregarCarrito')
  btnModal.addEventListener("click", () => agregarProducto(producto))

}

//AGREGA PRODUCTO AL CARRITO

function agregarProducto(producto){
  debugger
  const btnCompra = document.querySelector(`#prod-${producto.id} .agregarCarrito`)
  btnCompra.innerHTML = "Quitar del carrito"
  btnCompra.classList ='btn btn-danger col-12'
  productosCarrito.push(producto)
  
  renderCarrito();
}

function vaciarCarrito(){
  productosCarrito = [];
  renderCarrito();
}
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

//LEE DATOS DEL PRODUCTO

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
      </tr>`
  } )
  htm += `<tr>
  <th scope="row">
    Total
  </th>
 
  <td colspan="2" class="text-end"> $ ${total}</td>
</tr>`
  tBody.innerHTML= htm
  
  
}


