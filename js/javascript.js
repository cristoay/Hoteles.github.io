//Dia minimo del datepicker
var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth() + 1;
var yyyy = hoy.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}
    
if (mm < 10) {
    mm = '0' + mm;
}
    
var prueba = yyyy + "-" + mm + "-" + dd;
var fechaInput = document.getElementById("fecha");
document.getElementById("buscar").addEventListener("click", buscar);
fechaInput.min = prueba;
fechaInput.value = prueba;
//Selector de noches
var ofertas = [4, 7, 10, 14];
var ocultador = document.getElementById("ocultar");
/**
 * Crea opciones para un selector usa plural o singular
 * @param {*} duracion 
 */
function noches(duracion) {
    var dia = document.createElement("option")
    dia.value = duracion;
    var diaTexto;
    if (duracion == 1) {
        diaTexto = document.createTextNode(duracion + " Noche");
    }
    else {
        diaTexto = document.createTextNode(duracion + " Noches");
    }
    dia.appendChild(diaTexto);
    return dia;
}

var selector = document.getElementById("noches");
var ofertasNoches = document.createElement("optgroup");
ofertasNoches.setAttribute("label", "Noches Populares");
var normalesNoches = document.createElement("optgroup");
normalesNoches.setAttribute("label", "Noches normales");

ofertas.forEach(element => {
    var insertar = noches(element);
    ofertasNoches.appendChild(insertar);
});
for (let i = 1; i < 15; i++) {
    var ins = noches(i);
    normalesNoches.appendChild(ins);
}
selector.appendChild(ofertasNoches);
selector.appendChild(normalesNoches);
//Habitaciones
var textoHabitaciones;
var pHabitaciones = document.getElementById("habhues");
var numHab = 1;
var numHues = 1;
var recibo = [];
//Valor por defecto 1 habitacion con 1 adulto
pHabitaciones.textContent = numHab + " Habitaciones y " + numHues + " Huespedes";
/**
 * Creador de habitaciones con su numeroo
 * @param {int} num Número de la habitación
 */
function crearHabitacion(num) {
    var habitacion = document.createElement("div");
    habitacion.classList = "habitacion";
    var nHab = document.createElement("h4");
    nHab.textContent = num + " Habitación"
    habitacion.appendChild(nHab);
    var adultosLabel = document.createElement("label");
    adultosLabel.textContent = "Adultos";
    var adultosInput = document.createElement("select");
    adultosInput.classList.add("adultos");
    for (let i = 1; i <= 4; i++) {
        var adul = document.createElement("option");
        adul.value = i;
        adul.textContent = i;
        adultosInput.appendChild(adul);
    }
    habitacion.appendChild(adultosLabel);
    habitacion.appendChild(adultosInput);

    var ninosLabel = document.createElement("label");
    ninosLabel.textContent = "Niños";
    var ninosInput = document.createElement("select");
    ninosInput.classList.add("ninios");
    for (let l = 0; l <= 3; l++) {
        var nin = document.createElement("option");
        nin.value = l;
        nin.textContent = l;
        ninosInput.appendChild(nin);
    }
    habitacion.appendChild(ninosLabel);
    habitacion.appendChild(ninosInput);



    var aniosNinos = document.createElement("div");
    habitacion.appendChild(aniosNinos);
    ninosInput.addEventListener("change", function () {
        crear(aniosNinos, ninosInput, num);
    })

    return habitacion;
}
/**
 * Creador de las edades de los niños
 * @param {*} anios Caja donde se encuentran las edades
 * @param {*} caja Selector donde se encuentra el valor de cuantos niños hay en la habitación
 */
function crear(anios, caja) {
    while (anios.firstChild) {
        anios.removeChild(anios.firstChild);
    }
    for (let i = 0; i < caja.value; i++) {
        edad(anios);
    }
}
/**
 * Creador de los selectores de las edades de los niños en cada habitación
 * @param {*} ani 
 */
function edad(ani) {
    var edad = document.createElement("select");
    edad.setAttribute("class", "edad");
    var edadLabel = document.createElement("label");
    edadLabel.textContent = "Edad"
    var edadph = document.createElement("option");
    edadph.setAttribute("value", "");
    for (let x = 0; x <= 12; x++) {
        var anios = document.createElement("option");
        anios.value = x;
        anios.textContent = x;
        edad.appendChild(anios);

    }
    ani.appendChild(edadLabel);
    ani.appendChild(edad);
}
//Se crea la primera habitación
var nueva = crearHabitacion(1);
var numeroHabitaciones = 1;
var habit = document.getElementById("habitaciones");
var aniadir = document.createElement("div");
aniadir.textContent = "Añadir una habitacion";
ocultador.appendChild(aniadir);

var termina = document.createElement("div");
termina.textContent = "Terminado";
termina.addEventListener("click", terminar);

ocultador.appendChild(termina);
/**
 * Añade habitaciones un maximo de 4
 */
function aniadirHabitacion() {
    var cuantas = document.getElementById("habitaciones").querySelectorAll(".habitacion").length;
    var borrar = document.createElement("div");
    borrar.addEventListener("click", borrarHabitacion);
    borrar.innerHTML = "&#10006";
    if (cuantas < 4) {
        var p = crearHabitacion(cuantas + 1);
        p.classList.add("elihabitacion");
        p.appendChild(borrar);
        habit.appendChild(p);
    }
}
/**
 * Borra la habitacion usando el evento pulsado
 * @param {event} e 
 */
function borrarHabitacion(e) {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode)
    var repintar = document.getElementById("habitaciones").querySelectorAll(".elihabitacion");
    for (let i = 2; i < (repintar.length + 2); i++) {
        var linea = repintar[i - 2];
        linea.firstChild.textContent = i + " Habitación"
    }  
}

/**
 * Guarda los datos de las habitaciones y modifica el texto del las habitaciones y huespedes 
 */
function terminar() {
    var contador = document.getElementById("habitaciones").querySelectorAll(".habitacion");
    numHab = 0;
    numHues = 0;
    recibo = [];
    contador.forEach(element => {
        numHab++;
        var edadninios = [];
        var adultosValue = element.querySelector(".adultos").value;
        var niniosValue = element.querySelector(".ninios").value;
        numHues += parseInt(element.querySelector(".adultos").value);
        numHues += parseInt(element.querySelector(".ninios").value);
        pHabitaciones.textContent = numHab + " Habitaciones y " + numHues + " Huespedes";
        var edades = element.querySelectorAll(".edad");
        if (edades.length > 0) {
            for (let i = 0; i < edades.length; i++) {
                const element = edades[i];
                edadninios.push(element.value);    
            }
        }
        var objeto = new oHabitacion(numHab, adultosValue, niniosValue, edadninios);
        recibo.push(objeto);
    });
    ocultar();
}
document.getElementById("habitaciones").appendChild(nueva);
aniadir.addEventListener("click", aniadirHabitacion);
/**
 * Constructor de habitacion
 * @param {int} id número de la habitacion
 * @param {int} adul cantidad de adultos en la habitación
 * @param {int} menores cantidad de menores en la habitación
 * @param {array} edade edades de los menores en la habitación
 */
function oHabitacion(id, adul, menores, edade) {
    this.id = id;
    this.adul = adul;
    this.menores = menores;
    this.edade = edade;
}
/**
 * Oculta las habitaciones y modifica los eventos
 */
function ocultar() {
    ocultador.style.display = "none";
    contenedorHabitaciones.removeEventListener("click", terminar);
    contenedorHabitaciones.addEventListener("click", mostrar);

}
/**
 * Muestra las habitaciones y modifica los eventos
 */
function mostrar() {
    ocultador.style.display = "block";
    contenedorHabitaciones.removeEventListener("click", mostrar);
    contenedorHabitaciones.addEventListener("click", terminar);
}
window.onload = terminar;
var contenedorHabitaciones = document.getElementById("habhues");
contenedorHabitaciones.addEventListener("click", mostrar);
/**
 * Recoge toda la información del formulario y la muestra por consola
 */
function buscar() {
    var nHotel = document.getElementById("hotel").value;
    var fecha = document.getElementById("fecha").value;
    var noches = document.getElementById("noches").value;
    console.log("Usted se va a quedar en " + nHotel);
    console.log("Su estancia comienza la fecha " + fecha);
    console.log("Se va a quedar un total de " + noches + " noches");
    console.log("Ha solicitado " + recibo.length + " habitaciones");
    recibo.forEach(element => {
        console.log("\tHa solicitado en la " + element.id + " habitación");
        console.log("\tQue se alojaran " + element.adul + " adultos");
        
        if (element.menores > 0) {
            console.log("\tQue se alojaran " + element.menores + " niños");
            var t = element.edade.toString();
            console.log("\t\tDe las siguientes edades " + t+" años");
        }

    });

}
