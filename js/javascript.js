//Dia minimo del datepicker
var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth() + 1;
var yyyy = hoy.getFullYear();
var prueba = yyyy + "-" + mm + "-" + dd;
var fechaInput = document.getElementById("fecha");
fechaInput.min = prueba;
fechaInput.value = prueba;
//Selector de noches
var ofertas = [4, 7, 10, 14];

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
console.log(pHabitaciones);
var numHab=1;
var numHues=1;
//Valor por defecto 1 habitacion con 1 adulto
pHabitaciones.textContent = numHab + " Habitaciones y " + numHues + " Huespedes";

function crearHabitacion(num) {
    var habitacion = document.createElement("div");
    habitacion.classList = "habitacion";
    var nHab = document.createElement("h4");
    nHab.textContent = num + " Habitación"
    habitacion.appendChild(nHab);
    var adultosLabel = document.createElement("label");
    adultosLabel.textContent = "Adultos";
    var adultosInput = document.createElement("select");
    //quitamos el numero del id de adultos
    adultosInput.setAttribute("id", "adultos");
    adultosLabel.setAttribute("for", "adultos" + num);
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
    ninosInput.setAttribute("id", "ninos" + num);
    ninosLabel.setAttribute("for", "ninos" + num);
    for (let l = 0; l <= 3; l++) {
        var nin = document.createElement("option");
        nin.value = l;
        nin.textContent = l;
        ninosInput.appendChild(nin);
    }
    habitacion.appendChild(ninosLabel);
    habitacion.appendChild(ninosInput);

    
    
    var aniosNinos = document.createElement("div");
    aniosNinos.setAttribute("id", "aniosninos" + num);
    habitacion.appendChild(aniosNinos);
    ninosInput.addEventListener("change", function () {
        crear(aniosNinos, ninosInput, num);
    })

    return habitacion;
}

function crear(anios, caja, numero) {
    while (anios.firstChild) {
        anios.removeChild(anios.firstChild);
    }
    for (let i = 0; i < caja.value; i++) {
        edad(anios, numero);
    }
}
function edad(ani, nume) {
    var edad = document.createElement("select");
    edad.setAttribute("class" , "edad"+nume);
    var edadLabel = document.createElement("label");
    edadLabel.textContent = "Edad"
    var edadph = document.createElement("option");
    edadph.setAttribute("value", "");
    for (let x = 0; x < 12; x++) {
        var anios = document.createElement("option");
        anios.value = x;
        anios.textContent = x;
        edad.appendChild(anios);

    }
    ani.appendChild(edadLabel);
    ani.appendChild(edad);
}
var nueva = crearHabitacion(1);
var numeroHabitaciones = 1;
var habit = document.getElementById("habitaciones");
var aniadir = document.createElement("div");
aniadir.textContent = "Añadir una habitacion";
habit.appendChild(aniadir);

var termina = document.createElement("div");
termina.textContent="Terminado";
termina.addEventListener("click",terminar);
habit.appendChild(termina);

function aniadirHabitacion() {
    var cuantas = document.getElementById("habitaciones").querySelectorAll(".habitacion").length;
    var borrar = document.createElement("div");
    borrar.addEventListener("click", borrarHabitacion);
    borrar.textContent = "borrar habitacion";
    console.log(cuantas);
    if (cuantas < 4) {
        var p = crearHabitacion(cuantas + 1);
        p.classList.add("elihabitacion");
        p.appendChild(borrar);
        habit.appendChild(p);
    }
}
function borrarHabitacion(e) {
    var cuantas = document.getElementById("habitaciones").querySelectorAll(".habitacion").length;
    var elinarhabita = document.getElementById("habitaciones").querySelectorAll(".elihabitacion");
    e.target.parentNode.parentNode.removeChild(e.target.parentNode)
    var repintar =document.getElementById("habitaciones").querySelectorAll(".elihabitacion");
    console.log(repintar);
    for (let i = 2; i < (repintar.length+2); i++) {
        var linea =repintar[i-2];
        console.log(linea);
        linea.firstChild.textContent=i+"se ha cambiado Habitación"
    }
    // elinarhabita.forEach(element => {
    //     document.getElementById("habitaciones").removeChild(element);
    // });
    // for (let i = 1; i < cuantas-1; i++) {
    //     aniadirHabitacion()
    // }
}
function terminar() {
    var contador = document.getElementById("habitaciones").querySelectorAll(".habitacion");
    //console.log(contador);
    numHab=0;
    numHues=0;
    recibo = [];
    console.log("---------");
    console.log(contador);
    contador.forEach(element => {
        console.log(element);
        console.log(element.querySelector("#adultos").value);
        //Cmbiar las id de los select para sacar los values tener cuidado que hay que cambiar todo lo relacionado con ids
    });
    // for (let i = 0; i < contador.length; i++) {
    //     numHab++;
    //     var edad=[];
    //     var adultosValue = document.querySelector("#adultos"+(i+1)).value;
    //     var ninosValue= document.querySelector("#ninos"+(i+1)).value;
    //     //console.log(test);
    //     //console.log(document.querySelector("#adultos"+(i+1)).value);
    //     numHues+=parseInt(adultosValue);
    //     numHues+=parseInt(ninosValue);
    //     pHabitaciones.textContent = numHab + " Habitaciones y " + numHues + " Huespedes";
    //     var edades = document.getElementsByClassName("edad"+(i+1));
    //     for (let j = 0; j < edades.length; j++) {
    //         edad.push(edades[j].value);
    //     }
    //     // edades.forEach(element => {
    //     //     edad.push(element.value);
    //     // });
    //     console.log(edad);
        
    //     var objeto = new oHabitacion((i+1),adultosValue,ninosValue,edad);
    //     recibo.push(objeto);
    // }
    // console.log(recibo);
    // console.log(numHab);
    // console.log(numHues);
    // contador.forEach(element => {
    //     console.log(element);
    //     element.getElementById()
    // });
}
document.getElementById("habitaciones").appendChild(nueva);
document.getElementById("habitaciones").appendChild(aniadir);
aniadir.addEventListener("click", aniadirHabitacion);
console.log(nueva);

function oHabitacion(id,adul,menores,edade){
    this.id = id;
    this.adul = adul;
    this.menores = menores;
    this.edade = edade;
}

var recibo = [];