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

const productos = [];
productos.push(
  new Producto("Cartuchera", "imagenes/producto (1).jpeg", 450, 3),
  new Producto("Bolso", "imagenes/producto (2).jpeg", 1500, 2),
  new Producto("Portacosmeticos", "imagenes/producto (3).jpeg", 720, 4)
);
const prodElegidos = [];
let elije1 = 0;
let elije2 = 0;
let descuento = 0;
let cuota = "";
let superOfer = "";
let oferton = [];
console.log(productos);

/*FUNCIONES */

// Saluda al usuario e inicializa la compra
function saludar() {
  let nombre = prompt("Hola! Como es tu nombre?");
  alert(
    `Buen día ${
      nombre || ""
    }, Bienvenido a Dolce Parma! Estos son nuestros productos!`
  );
  compra();
}

function eleccion(inicioMsj, finMsj) {
  let textoInicio = inicioMsj;
  let textoFin = finMsj;
  for (let i = 0; i < productos.length; i++) {
    const elegido = prodElegidos.find((p) => p.nombre === productos[i].nombre);
    if (elegido) {
      continue;
    } else {
      textoInicio += `${productos[i].nombre}: $${
        productos[i].precio
      }\n`;
    }
  }
  return (textoInicio += textoFin);
}

//Da e elegir los productos al usuario y pregunta por descuentos

function compra() {
  const elije1 = prompt(
    eleccion(
      `Escribe el producto que quieres comprar!\n`,
      "Nada solo quiero mirar / Cualquier tecla"
    )
  );
  switch (elije1.toLowerCase()) {
    case "cartuchera":
      prodElegidos.push(productos[0]);
      productos[0].mostrarInfo();
      break;
    case "portacosmeticos":
      prodElegidos.push(productos[1]);
      productos[1].mostrarInfo();
      break;
    case "bolso":
      prodElegidos.push(productos[2]);
      productos[2].mostrarInfo();
      break;
    default:
      return prompt("No hay problema =D! Para comprar algo apreta F5");
  };

  const elije2 = prompt(
    eleccion(
      `Elije otro producto para aprovechar un INCREIBLE DESCUENTO del 15% en 6 cuotas SIN INTERESES!!!\n`,
      "No quiero nada mas, gracias! / Cualquier tecla"
    )
  );
  
  switch (elije2.toLowerCase()) {
    case "cartuchera":
      prodElegidos.push(productos[0]);
      productos[0].mostrarInfo();
      break;
    case "portacosmeticos":
      prodElegidos.push(productos[1]);
      productos[1].mostrarInfo();
      break;
    case "bolso":
      prodElegidos.push(productos[2]);
      productos[2].mostrarInfo();
      break;
    default:
      return alert(
        `Perfecto, serian $${prodElegidos[0].precio} al contado! Gracias por tu compra!`
      );
  }

  //Pregunta por la superoferta
  superOfer = prompt(
    "Si elegis el ultimo producto, pagarias los 3 con un 40% de descuento! Que estas esperando?!\n Si/No "
  );
  if (superOfer.toLowerCase() === "si") {
    return superOferta();
  } else if (superOfer.toLowerCase() === "no") {
    return rebaja(prodElegidos[0].precio, prodElegidos[1].precio), cuotas();
  }
}

// Aplica un descuento del 15% al comprar 2 productos
function rebaja(x, y) {
  descuento = parseInt((x + y) * 0.85);
  alert(
    `Comprando estos dos productos abonarias $${descuento} aplicando el 15% de descuento!`
  );
  return descuento;
}

//Preguna al usuario si quiere pagar en cuotas
function cuotas() {
  cuota = prompt(
    "Deseas pagarlo con tarjeta en 6 comodas cuotas sin intereses?\n Si/No"
  );
  if (cuota.toLowerCase() === "si") {
    cuota = parseInt(descuento / 6);
    alert(`Perfecto, abonarias 6 cuotas de $${cuota}. Gracias por tu compra!`);
  } else {
    alert(
      `Perfecto, abonarias $${descuento} al contado. Gracias por tu compra!`
    );
  }
}
//Aplica 40% de descuento y suma el valor de los 3 precios.
function superOferta() {
  oferton = productos.map((prod) => prod.precio * 0.6);
  let ofertonTotal = 0;
  for (let i = 0; i < oferton.length; i++) {
    ofertonTotal += oferton[i];
  }
  return alert(
    `FELICITACIONES! Acabas de comprar los 3 productos a tan solo $${ofertonTotal}!!!\n Vuelve cuando quieras! `
  );
}

//Ordena los productos de menor a mayor precio.
productos.sort(function (a, b) {
  if (a.precio > b.precio) {
    return 1;
  }
  if (a.precio < b.precio) {
    return -1;
  }
  return 0;
});

// Dibuja las cards de productos
function dibujarCard(producto) {
  const divCard = document.getElementById("cards");
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
  btnCompra.className = "btn btn-primary col-12";
  bodyDiv.appendChild(btnCompra);
}

for (let i = 0; i < productos.length; i++) {
  dibujarCard(productos[i]);
}

//Funcion para mostrar el modal de la card elejida
function mostrarModal(e) {
  const cardElejida = e.target.parentElement.parentElement;
  const modal = document.getElementById("myModal");

  const infoCard = {
    nombre: cardElejida.querySelector("h5").textContent,
    imagen: cardElejida.querySelector("img").src,
    stock: cardElejida.querySelector("#stock").textContent,
    precio: cardElejida.querySelector("#precio").textContent,
  };

  modal.firstElementChild.setAttribute(
    "src",
    cardElejida.querySelector("img").src
  );
  modal.children[1].children[0].innerHTML =
    cardElejida.querySelector("h5").textContent;
  modal.children[1].children[1].children[0].innerHTML =
    cardElejida.querySelector("#precio").textContent;
  modal.children[1].children[1].children[1].innerHTML =
    cardElejida.querySelector("#stock").textContent;
  console.log(infoCard);
}

window.onload = saludar();
