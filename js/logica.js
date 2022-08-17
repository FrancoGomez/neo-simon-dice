const $comenzar = document.querySelector("#comenzar");
const $alerta = document.querySelector("#alerta");
const $contador = document.querySelector("#contador");
const $tablero = document.querySelector("#tablero");
let secuenciaMaquina = [];
let contadorClicksPorRonda = 0;

$comenzar.onclick = () => comenzarJuego();

const comenzarJuego = () => {
    reiniciarEstado();
    manejarRonda();
};

const reiniciarEstado = () => {
    actualizarEstadoAlerta('Presiona "Comenzar" para jugar');
    actualizarContador(secuenciaMaquina.length);
    reiniciarSecuenciaMaquina();
    deshabilitarInputJugador();
};

const manejarRonda = () => {
    const DELAY_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;
    contadorClicksPorRonda = 0;

    secuenciaMaquina.push(obtenerCuadroRandom());

    reiniciarAlerta();
    actualizarEstadoAlerta("Turno de la maquina");
    actualizarContador(secuenciaMaquina.length);
    mostrarSecuenciaMaquina();

    setTimeout(() => {
        habilitarInputJugador();
    }, DELAY_TURNO_JUGADOR);
};

const actualizarEstadoAlerta = (estado) => {
    $alerta.textContent = estado;
};

const actualizarContador = (numero) => {
    $contador.textContent = numero;
};

const reiniciarSecuenciaMaquina = () => {
    secuenciaMaquina = [];
};

const deshabilitarInputJugador = () => {
    $tablero.onclick = () => {};
};

const obtenerCuadroRandom = () => {
    const $cuadros = document.querySelectorAll(".cuadro");
    const indice = Math.floor(Math.random() * $cuadros.length);
    return $cuadros[indice];
};

const mostrarSecuenciaMaquina = () => {
    for (let index = 0; index < secuenciaMaquina.length; index++) {
        setTimeout(() => {
            resaltarCuadro(secuenciaMaquina[index]);
        }, index * 1000);
    }
};

const resaltarCuadro = ($cuadro) => {
    $cuadro.style.opacity = "1";
    setTimeout(() => {
        $cuadro.style.opacity = "0.5";
    }, 500);
};

const habilitarInputJugador = () => {
    actualizarEstadoAlerta("Tu turno");
    $tablero.onclick = (e) => {
        const $cuadro = e.target;
        manejarClick($cuadro);
    };
};

const manejarClick = ($cuadro) => {
    resaltarCuadro($cuadro);
    compararClickConSecuencia($cuadro);
    contadorClicksPorRonda++;
};

const compararClickConSecuencia = ($cuadro) => {
    if ($cuadro !== secuenciaMaquina[contadorClicksPorRonda]) {
        actualizarEstadoAlerta(
            'Cuadrado incorrecto, para volver a jugar presiona "Comenzar"'
        );

        alertaFinDelJuego();
        deshabilitarInputJugador();
    } else if (contadorClicksPorRonda + 1 === secuenciaMaquina.length) {
        deshabilitarInputJugador();
        setTimeout(() => {
            manejarRonda();
        }, 1000);
    }
};

const reiniciarAlerta = () => {
    $alerta.classList.remove("alert-danger");
    $alerta.classList.add("alert-primary");
};

const alertaFinDelJuego = () => {
    $alerta.classList.remove("alert-primary");
    $alerta.classList.add("alert-danger");
};
