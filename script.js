let jugadorActual = 'X';
let tablero = ['', '', '', '', '', '', '', '', ''];

document.addEventListener('DOMContentLoaded', () => {
    const celdas = document.querySelectorAll('.celda');
    celdas.forEach(celda => {
        celda.addEventListener('click', () => {
            const indice = parseInt(celda.dataset.index);
            realizarMovimiento(indice);
        });
    });
});

function realizarMovimiento(indice) {
    if (tablero[indice] === '') {
        tablero[indice] = jugadorActual;
        renderizarTablero();
        if (verificarGanador(jugadorActual)) {
            Swal.fire('¡Ganaste!', `¡El jugador ${jugadorActual} ha ganado!`, 'success');
            reiniciarJuego();
        } else if (verificarEmpate()) {
            Swal.fire('¡Empate!', 'El juego ha terminado en empate.', 'info');
            reiniciarJuego();
        } else {
            jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
        }
    } else {
        Swal.fire('¡Celda ocupada!', 'Por favor, elige otra celda.', 'warning');
    }
}

function verificarGanador(jugador) {
    const condicionesVictoria = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return condicionesVictoria.some((condicion) =>
        condicion.every((indice) => tablero[indice] === jugador)
    );
}

function verificarEmpate() {
    return tablero.every((celda) => celda !== '');
}

function renderizarTablero() {
    const celdas = document.querySelectorAll('.celda');
    celdas.forEach((celda, indice) => {
        celda.textContent = tablero[indice];
    });
}

function reiniciarJuego() {
    jugadorActual = 'X';
    tablero = ['', '', '', '', '', '', '', '', ''];
    renderizarTablero();
}
