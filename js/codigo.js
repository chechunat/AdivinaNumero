// Variables Eventos y html

const btnComprobar = document.querySelector('#comprobar');
const valorNumero = document.querySelector('.numeroElegido');
const btnNuevo = document.querySelector('.nuevoJuego');
const divTabla = document.querySelector('.tabla');

// variables del juego
let numeroAleatorio = 0;
let numeroIntentos = 0;
let numerosJugados =[];
let resultado = []; // inicializamos el resultado para saber si es mayor, menor o el número
let ganador = false;

// Función que crea un número aleatorio entre un mínimo y un máximo ambos incluidos
crearNumero = (min, max) => {   
    return Math.floor(Math.random() * (max - min + 1)) + min
};

// Función que se ejecutará al cargar la página


// crearHtml = () => {

//     const htmlTabla = `
//     <center>
//         <table>
//             <caption>Adivina el número</caption>
//             <thead>
//                 <tr>
//                     <th>Número</th>
//                     <th>Resultado</th>
//                     <th>intento</th>
//                 </tr>
//             </thead>
//             <tbody>
//             ${for (let i = 0; i<numerosJugados.length; i++){
                    
//                 <tr>
//                     <td>
//                         ${numerosJugados[i]}
//                     </td>
//                     <td>
//                         ${resultado}
//                     </td>
//                     <td>
//                         ${numeroIntentos}
//                     </td>
//                 </tr>
//             }
            
//             </tbody>
//         </table>
//     </center>`;

//     const tabla = document.createElement('table');
    
//     tabla.innerHTML = htmlTabla;

//     divTabla.innerHTML = htmlTabla;        
    
// }

crearHtml = () => {

    let htmlTabla = `
    <center>
        <table>
            <caption>Adivina el número</caption>
            <thead>
                <tr>
                    <th>Número</th>
                    <th>Resultado</th>
                    <th>intento</th>
                </tr>
            </thead>
            <tbody>`;
    for (let i = 0; i < numerosJugados.length; i++) {
        htmlTabla += `<tr><td>${numerosJugados[i]}</td>`;
        htmlTabla += `  <td>${resultado[i]}</td>`;
        htmlTabla += `  <td>${i+1}</td>`;
        htmlTabla += "</tr>";
    }
    htmlTabla += "</tbody>";
    htmlTabla += "</table>";
    htmlTabla += "</center>";

    const tabla = document.createElement('table');
    tabla.innerHTML = htmlTabla;
    divTabla.innerHTML = htmlTabla;
}



compararNumero = (num) => {

    if (num == numeroAleatorio) {        
        ganador = true;
        return 'Correcto';
    } else if (num > numeroAleatorio) {        
        
        return 'El número que buscas es más pequeño';
    } else {
        
        return 'El número que buscas es más grande';
    }
    
}

determinarGanador = () =>{
    
    // Aguantamos 100 milisegundos para que de tiempo a cargar el HTML final
    setTimeout(() => {        
        if (ganador){
                alert ('HAS GANADO!!! El número era el ' + numeroAleatorio);    
        } else {
            alert('HAS PERDIDO!!!El número era el ' + numeroAleatorio);
        }
        inicio();        
    }, 100);
    
    
     
}


inicio = () =>{
    numeroAleatorio = crearNumero(1,20); // Creamos el número aleatorio
    numeroIntentos = 0; // inicializamos el numero de intentos
    numerosJugados =[]; // inicializamos el array de numeros jugados
    ganador = false; // inicializamos el ganador
    divTabla.innerHTML = ""; // Borramos la tabla
    valorNumero.value = 1;

}


// Al cargar la página llamará a la funcion inicio
window.onload = inicio();

// Eventos del DOM

// Botón comprobar
btnComprobar.addEventListener('click', () =>{

    numerosJugados.push(valorNumero.value); // Guardamos los números Jugados    
    resultado[numeroIntentos] = compararNumero(valorNumero.value); // Recibiremos un texto que dirá la comparativa    
    numeroIntentos++; // Incrementamos el número de intentos

    crearHtml(numerosJugados);  // Creamos la tabla con los resultados

    if (ganador || numeroIntentos == 6 ){

        determinarGanador();

    }
    
})

// Botón volver a jugar
btnNuevo.addEventListener('click', () => {

    inicio();

})

