let canvas=document.getElementById("areaJuegos");
let ctx=canvas.getContext("2d");

const ALTO_GATO = 90;
const ANCHO_GATO = 70;
const ALTO_COMIDA = 25;
const ANCHO_COMIDA = 50;

let gatoX = 0;
let gatoY = 0;
let camidaX = 0;
let comidaY = 0;
let puntaje = 0;
let tiempo = 10;
let intervalo;

function graficarRectangulo(x, y, ancho, alto, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

function iniciarJuego(){
    gatoX = (canvas.width - ANCHO_GATO) / 2;
    gatoY = (canvas.height - ALTO_GATO) / 2;
    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;
    graficarGato();
    graficarComida();
    intervalo = setInterval(restarTiempo, 1000);
}

function graficarGato(){
    graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "green");
}

function graficarComida(){
   graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "yellow");
}

function limpiarCanva(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moverIzquierda(){
    gatoX = gatoX - 10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverDerecha(){
    gatoX = gatoX + 10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverArriba(){
    gatoY = gatoY - 10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverAbajo(){
    gatoY = gatoY + 10;
    limpiarCanva();
    graficarGato();
    graficarComida()
    detectarColision();
}

function detectarColision() {
    // Colison en el eje X
    const chocaEnX = gatoX < comidaX + ANCHO_COMIDA &&
                     gatoX + ANCHO_GATO > comidaX;
    // Colision en el eje Y
    const chocaEnY = gatoY < comidaY + ALTO_COMIDA &&
                     gatoY + ALTO_GATO > comidaY;

    if (chocaEnX && chocaEnY) {
        puntaje = puntaje + 1;               // gana 1 punto
        let componente=document.getElementById("spanPuntaje");
        componente.textContent=puntaje;
        comidaX = generarAleatorio(0, canvas.width - ANCHO_COMIDA);
        comidaY = generarAleatorio(0, canvas.height - ALTO_COMIDA);
        limpiarCanva();
        graficarGato();
        graficarComida();
        if (puntaje === 6) {
        clearInterval(intervalo);   // detener el conteo
        alert("¡Ganaste! 🎉");
    }
    }
   
    
}

function mostrarEnSpan(idSpan, valor){
    let componente = document.getElementById(idSpan);
    componente.textContent = valor;
}

function restarTiempo() {
    tiempo = tiempo - 1;   // restar 1
    mostrarEnSpan("tiempo", tiempo);  // actualizar en pantalla
     if (tiempo === 0) {
        clearInterval(intervalo);   // detener el conteo
        alert("has perdido el juego  😿");
    }
}

function reiniciarJuego() {
    // Detener el intervalo anterior (si sigue corriendo)
    clearInterval(intervalo);

    // Reiniciar variables
    puntaje = 0;
    tiempo = 10;

    // Reiniciar posiciones del gato al centro y comida a su esquina
    gatoX = (canvas.width - ANCHO_GATO) / 2;
    gatoY = (canvas.height - ALTO_GATO) / 2;
    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;

    // Actualizar la pantalla (puntaje y tiempo)
    mostrarEnSpan("spanPuntaje", puntaje);
    mostrarEnSpan("tiempo", tiempo);

    // Volver a dibujar todo
    limpiarCanva();
    graficarGato();
    graficarComida();

    // Reiniciar el conteo regresivo
    intervalo = setInterval(restarTiempo, 1000);
}

function desaparecerPersonaje (){
    clearInterval(intervalo); // detiene el bucle
    ctx.clearRect(0, 0, canvas.width, canvas.height); // limpia el canvas
    // ya no dibujas al gato, así que desaparece

}


