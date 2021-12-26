let producto1 = 450 ;
let producto2 = 1500;
let producto3 = 720;
let nada = "Nada, solo quiero mirar";
let elije1 = 0;
let elije2 = 0;
let descuento = 0;
let cuota = "";

function saludar(){
    let nombre = prompt("Hola! Como es tu nombre?")
    alert(`Buen dia ${nombre || ""}, Bienvenido a Dolce Parma! Estos son nuestros productos!`);
    compra();
}

function compra(){ 
    let elije1 = prompt(`Elije el numero del producto que vas a comprar!\n Cartuchera: $${producto1} / Presiona 1\n Bolso: $${producto2} / Presiona 2\n Portacosmeticos: $${producto3} / Presiona 3\n ${nada} / Presiona cualquier tecla\n`);
    if(elije1 == 1){
        elije1 = producto1;
        alert(`Exelente acabas de elegir Cartuchera!`);
        elije2 = prompt(`Elije otro producto para aprovechar un INCREIBLE DESCUENTO del 15% en 6 cuotas SIN INTERESES!!!\n Bolso: $${producto2} / Presiona 2\n Portacosmeticos: $${producto3} / Presiona 3\n No quiero mas nada / Presiona cualquier tecla\n` )
    } else if(elije1 == 2){
        elije1 = producto2;
        alert(`Exelente acabas de elegir Bolso`);
        elije2 = prompt(`Elije otro producto para aprovechar un INCREIBLE DESCUENTO del 15% en 6 cuotas SIN INTERESES!!!\n Cartuchera: $${producto1} / Presiona 1\n Portacosmeticos: $${producto3} / Presiona 3\n No quiero mas nada / Presiona cualquier tecla\n`)
    } else if(elije1 == 3){
        elije1 = producto3;
        alert(`Exelente acabas de elegir Portacosmeticos`);
        elije2 = prompt(`Elije otro producto para aprovechar un INCREIBLE DESCUENTO del 15% en 6 cuotas SIN INTERESES!!!\n Cartuchera: $${producto1} / Presiona 1\n Bolso: $${producto2} / Presiona 3\n No quiero mas nada / Presiona cualquier tecla\n`)
    } else {
        return alert("No hay problema =D! Para comprar algo apreta F5");
    }
    if(elije2 == 1){
        elije2 = producto1;
        alert(`Exelente acabas de elegir Cartuchera!`);
        rebaja(elije1, elije2);
        cuotas();
        
    } else if(elije2 == 2){
        elije2 = producto2;
        alert(`Exelente acabas de elegir Bolso!`);
        rebaja(elije1, elije2);
        cuotas();
        
    } else if(elije2 == 3){
        elije2 = producto3;
        alert(`Exelente acabas de elegir Portacostemeticos!`);
        rebaja(elije1, elije2);
        cuotas();
    } else {
        return alert(`Perfecto, serian $${elije1} al contado! Gracias por tu compra!`)
    }
}
function rebaja(x, y){
    descuento = parseInt((x + y) * 0.85);
    alert(`Comprando estos dos productos abonarias $${descuento} aplicando el descuento!`);
    return descuento;
}

function cuotas(){
    cuota = prompt("Deseas pagarlo con tarjeta en 6 comodas cuotas sin intereses?\n Si/No");
    if(cuota.toLowerCase() == "si"){
        cuota = parseInt(descuento / 6);
        alert(`Perfecto, abonarias 6 cuotas de $${cuota}. Gracias por tu compra!`);
    } else {
        alert(`Perfecto, abonarias $${descuento} al contado. Gracias por tu compra!`);
    }
}

window.onload = saludar();



