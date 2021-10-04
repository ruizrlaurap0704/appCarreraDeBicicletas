const lectorEscritor = require("./lecturaEscritura");

let Bicicletas = lectorEscritor.leerJson("bicicletas");

/* A. Crear un objeto literal que represente la aplicación. */
let carrera = {
// /* B. Agregar una propiedad llamada bicicletas en la que asignarás las bicicletas obtenidas a partir del método leer del objeto requerido como módulo */
    arrayBicicletas: Bicicletas,
/* C. Agregar una propiedad llamada bicicletasPorTanda que contenga el valor 4. Este valor representará la cantidad máxima de bicicletas por tanda*/
    bicicletasPorTanda: 3,
/* D. Agregar un método listarBicicletas que reciba como parámetro un array de ciclistas e imprima por consola la siguiente información.
PD: Este método deberá ser utilizado en la ejecución de los demás métodos que retornan un array de ciclistas.
Resultado esperado al ejecutar el método: un mensaje por consola por cada ciclista con el siguiente formato: 
Ciclista: ______, marca: ______,  rodado: ______, peso: _____ kg, largo: _____ cm, estado: ______. */
    listarBicicletas:
    array => array.forEach(bicicleta=>console.log(`Ciclitas: ${bicicleta.ciclista}, marca:${bicicleta.marca}, rodado:${bicicleta.rodado}, peso:${bicicleta.peso} Kg, Largo: ${bicicleta.largo} cm, estado: ${bicicleta.dopaje}.`)),    
/*E. Agregar un método ciclistasHabilitados que devuelva una lista donde los ciclistas tengan un dopaje negativo.
◦ Este método no recibirá ningún parámetro.
◦ Este método devolverá un array con los ciclistas que estén habilitados para correr.*/
    ciclistasHabilitados: () => 
    {
    return carrera.arrayBicicletas.filter(bicicleta=>bicicleta.dopaje === false)
    },    
/*F. Agregar un método buscarPorId que permita buscar un ciclista en función de su id.
◦ Este método recibirá por parámetro un number que represente el id a buscar
◦ En caso de encontrar un ciclista con el id buscado, devolverá el objeto literal que lo representa.
◦ En caso contrario devolverá undefined */
    buscarPorId: id => 
    {return carrera.arrayBicicletas.find(bicicleta=>bicicleta.id==id)},
/*G. Agregar un método filtrarPorPeso que permita filtrar los ciclistas habilitados, siempre y cuando su peso sea menor o igual al enviado como argumento.
◦ Este método recibirá por parámetro un number que represente el peso a buscar.
◦ Este método devolverá un array con todos los ciclistas que cumplan con la condición mencionada.
◦ En caso de no encontrar ningún ciclista, devolverá un array vacío.
◦ Este método debe usar ciclistasHabilitados para buscar incluir solamente aquellos autos que estén habilitados.*/
    filtrarPorPeso:
    peso => {return carrera.ciclistasHabilitados().filter(bicicleta => bicicleta.peso <= peso)},
/*H. Agregar un método ordenarPorRodado que ordene todas las bicicletas de menor a mayor según su rodado.
◦ Este método devolverá un array con todos las bicicletas ordenadas por rodado.
Recordemos que Javascript tiene un método para hacer justamente lo que necesitamos.*/
    ordenarPorRodado: () => 
    {return carrera.arrayBicicletas.sort((bici1,bici2)=> bici1.rodado-bici2.rodado)},
/*I. Agregar un método largoPromedio que permita saber el largo promedio de todas las bicicletas.
◦ Este método no recibirá ningún parámetro.
◦ Este método devolverá un mensaje indicando la información solicitada.*/
    largoPromedio: () => {
        let largoTotal = carrera.arrayBicicletas.reduce((acumulador,bicicleta)=> acumulador += bicicleta.largo,0);
        return `El largo promedio es: ${(largoTotal/carrera.arrayBicicletas.length).toFixed(2)}`
    },
/*J. Agregar un método aumentarPeso, el cual deberá aumentar el peso de una bicicleta y guardar los cambios en la base de datos.
◦ El método recibirá por parámetro un número indicando la cantidad a aumentar (en kg) y un id, y debe reutilizar el método buscarPorId.
◦ en caso de encontrar una bicicleta con dicho id deberá:
    i. Aumentar su peso (sumar la cantidad indicada a la existente)
    ii. Guardar los datos en el archivo JSON.*/
    aumentarPeso: (kg,id) => {
        let bicicletaUbicada = carrera.buscarPorId(id)
        if (bicicletaUbicada) {
            bicicletaUbicada.peso += kg
            lectorEscritor.escribirJson('bicicletas',carrera.arrayBicicletas)
        }
        return bicicletaUbicada;
},
/*K. Agregar un método generarTanda que retorna un array de ciclistas, que cumplan con las siguientes condiciones:
◦ El ciclista esté habilitado
◦ El rodado sea menor o igual al valor enviado como argumento
◦ El peso sea mayor o igual al valor enviado como argumento
◦ La cantidad devuelta sea como máximo la expresada en la propiedad bicicletasPorTanda.
Para este método vamos a dejar que vos determines los parámetros que debería recibir.
Te recomendamos que pienses qué métodos de los que ya programaste podés reutilizar en este paso . */
    generarTanda: (rodado,peso) => {
        let habilitados = carrera.ciclistasHabilitados()
        let condicion1 = habilitados.filter(bicicleta => bicicleta.rodado <= rodado)
        let condicion2 = condicion1.filter(bicicleta=> bicicleta.peso >= peso)
        if (condicion2.length > carrera.bicicletasPorTanda){
            let condicion3 = condicion2.slice(0,carrera.bicicletasPorTanda)
            return condicion3;
        } else {
            return condicion2;
        }
    },
/*L. Agregar un método que permita calcularPodio, el mismo deberá calcular al ganador y los siguientes dos puestos en función de su puntaje.
◦ El método recibirá como parámetro un array de ciclistas. Los mismos deberán ser generados con generarTanda.
◦ El método ordenará por puntaje los ciclistas recibidos.
◦ El método imprimirá por consola los tres primeros puestos.
Resultado esperado al ejecutar el método: un mensaje por consola por cada bici con el siguiente formato: 
El ganador es: ______, con un puntaje de ______.
El segundo puesto es para ______, con un puntaje de ______.
El tercer puesto es para ______, con un puntaje de ______.
Ejemplo: */
    calcularPodio: array => {
        array.sort((bici1,bici2)=> bici2.puntaje - bici1.puntaje)
        console.log(`El ganador es: ${array[0].ciclista}, con un puntaje de ${array[0].puntaje}`)
        console.log(`El ganador es: ${array[1].ciclista}, con un puntaje de ${array[1].puntaje}`)
        console.log(`El ganador es: ${array[2].ciclista}, con un puntaje de ${array[2].puntaje}`)
    }
} //Final de la carrera.

//Ejecución de consignas.
//D
console.log("**********Punto D**********")
carrera.listarBicicletas(Bicicletas);
console.log("************ **************")
//E
console.log("**********Punto E**********")
let habilitados = carrera.ciclistasHabilitados()
carrera.listarBicicletas(habilitados);
console.log("************ **************")
//F
console.log("**********Punto F**********")
let encontradoPorID = carrera.buscarPorId(2)
carrera.listarBicicletas([encontradoPorID]);
console.log("************ **************")
//G NO
console.log("**********Punto G**********")
let encontradoPorPeso = carrera.filtrarPorPeso(1)
if (encontradoPorPeso == "") {
    let vacio = []
    console.log(vacio)
} else {
    carrera.listarBicicletas(encontradoPorPeso);
}
console.log("************ **************")
//H
console.log("**********Punto H**********")
let ordenado = carrera.ordenarPorRodado();
carrera.listarBicicletas(ordenado);
console.log("************ **************")
//I
console.log("**********Punto I**********")
let promedioLargo = carrera.largoPromedio();
console.log(promedioLargo);
console.log("************ **************")
//J
console.log("**********Punto J**********")
let masPeso = carrera.aumentarPeso(5,1);
if (masPeso == ''){
    console.log('No se encontró el ID')
} else {
    carrera.listarBicicletas([masPeso]);
}
console.log("************ **************")
//K
console.log("**********Punto K**********")
let nuevaTanda = carrera.generarTanda (24,7);
carrera.listarBicicletas(nuevaTanda);
console.log("************ **************")
//L 
console.log("**********Punto L**********")
carrera.calcularPodio(carrera.generarTanda(25,7));
console.log("************ **************")