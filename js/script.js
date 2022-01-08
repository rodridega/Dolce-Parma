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

const arrayProductos = [];
const producto1 = new Producto("Cartuchera", 450, 3);
const producto2 = new Producto("Bolso", 1500, 2);
const producto3 = new Producto("Portacosmeticos", 720, 4);
arrayProductos.push(new Producto("Cartuchera", 450, 3),new Producto("Bolso", 1500, 2),new Producto("Portacosmeticos", 720, 4));
let nada = "Nada, solo quiero mirar";
let elije1 = 0;
let elije2 = 0;
let descuento = 0;
let cuota = "";
let superOfer = ""
let oferton = [];


/*FUNCIONES */ 

// Saluda al usuario e inicializa la compra
function saludar() {
  let nombre = prompt("Hola! Como es tu nombre?");
  alert(
    `Buen dia ${
      nombre || ""
    }, Bienvenido a Dolce Parma! Estos son nuestros productos!`
  );
  compra();
}

//Da e elegir los productos al usuario y pregunta por descuentos 

function compra() {
  let elije1 = prompt(
    `Elije el numero del producto que vas a comprar!\n ${producto1.nombre}: $${producto1.precio} / Presiona 1\n ${producto2.nombre}: $${producto2.precio} / Presiona 2\n ${producto3.nombre}: $${producto3.precio} / Presiona 3\n ${nada} / Presiona cualquier tecla\n`
  );
  if (elije1 == 1) {
    elije1 = producto1.precio;
    producto1.mostrarInfo();
    elije2 = prompt(
      `Elije otro producto para aprovechar un INCREIBLE DESCUENTO del 15% en 6 cuotas SIN INTERESES!!!\n ${producto2.nombre}: $${producto2.precio} / Presiona 2\n ${producto3.nombre}: $${producto3.precio} / Presiona 3\n No quiero mas nada / Presiona cualquier tecla\n`
    );
  } else if (elije1 == 2) {
    elije1 = producto2.precio;
    producto2.mostrarInfo();
    elije2 = prompt(
      `Elije otro producto para aprovechar un INCREIBLE DESCUENTO del 15% en 6 cuotas SIN INTERESES!!!\n ${producto1.nombre}: $${producto1.precio} / Presiona 1\n ${producto3.nombre}: $${producto3.precio} / Presiona 3\n No quiero mas nada / Presiona cualquier tecla\n`
    );
  } else if (elije1 == 3) {
    elije1 = producto3.precio;
    producto2.mostrarInfo();
    elije2 = prompt(
      `Elije otro producto para aprovechar un INCREIBLE DESCUENTO del 15% en 6 cuotas SIN INTERESES!!!\n ${producto1.nombre}: $${producto1.precio} / Presiona 1\n ${producto2.nombre}: $${producto2.precio} / Presiona 3\n No quiero mas nada / Presiona cualquier tecla\n`
    );
  } else {
    return alert("No hay problema =D! Para comprar algo apreta F5");
  }
  
  if (elije2 == 1) {
    elije2 = producto1.precio;
    producto1.mostrarInfo();
  } else if (elije2 == 2) {
    elije2 = producto2.precio;
    producto2.mostrarInfo();    
  } else if (elije2 == 3) {
    elije2 = producto3.precio;
    producto3.mostrarInfo();
  } else {
    return alert(
      `Perfecto, serian $${elije1} al contado! Gracias por tu compra!`
    )
  }

  //Pregunta por la superoferta
  superOfer = prompt("Si elegis el ultimo producto, pagarias los 3 con un 40% de descuento! Que estas esperando?!\n Si/No ");
  if (superOfer.toLowerCase() === "si" ) {
    return superOferta()
  } else if(superOfer.toLowerCase() === "no") {
    return rebaja(elije1, elije2),cuotas(); 
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
function superOferta(){
  oferton = arrayProductos.map(prod => prod.precio * 0.6)
  let ofertonTotal = 0;
  for (let i = 0; i < oferton.length; i++) {
       ofertonTotal += oferton[i];
  }
  return alert(`FELICITACIONES! Acabas de comprar los 3 productos a tan solo $${ofertonTotal}!!!\n Vuelve cuando quieras! `)
}

window.onload = saludar();