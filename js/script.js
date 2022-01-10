class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }
  mostrarInfo() {
    alert(`Elegiste ${this.nombre} a un valor de $${this.precio}`);
  }
}

const productos = [];
productos.push(
  new Producto("Cartuchera", 450, 3),
  new Producto("Bolso", 1500, 2),
  new Producto("Portacosmeticos", 720, 4)
);
const prodElegidos = [];
let elije1 = 0;
let elije2 = 0;
let descuento = 0;
let cuota = "";
let superOfer = "";
let oferton = [];

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

function eleccion(inicioMsj, finMsj){
  let textoInicio = inicioMsj;
  let textoFin = finMsj
  for (let i = 0; i < productos.length; i++) {
    const elegido = prodElegidos.find(p => p.nombre === productos[i].nombre)
    if (elegido) {
        continue
    }else {
      textoInicio += `${productos[i].nombre}: $${productos[i].precio} / Presiona ${i + 1}\n`
    }
  }
  return textoInicio += textoFin;
}

//Da e elegir los productos al usuario y pregunta por descuentos

function compra() {
  let elije1 = prompt(eleccion(`Elije el numero del producto que vas a comprar!\n`, "Nada solo quiero mirar / Cualquier tecla"));
  if (elije1 > 0) {
    const elegido = productos[elije1 - 1]
    prodElegidos.push(elegido);
    elegido.mostrarInfo();
    elije2 = prompt(eleccion(`Elije otro producto para aprovechar un INCREIBLE DESCUENTO del 15% en 6 cuotas SIN INTERESES!!!\n`, "No quiero nada mas, gracias! / Cualquier tecla")) 
  } else {
    return alert("No hay problema =D! Para comprar algo apreta F5");
  } 

if (elije2 > 0) {
  const elegido = productos[elije2 - 1];
  prodElegidos.push(elegido);
  elegido.mostrarInfo(); 
} else {
  return alert(`Perfecto, serian $${prodElegidos[0].precio} al contado! Gracias por tu compra!`);
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

window.onload = saludar();
