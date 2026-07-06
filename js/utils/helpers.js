import { POINTS } from "./points.js";

export function calcularTotal(usuario) {

    return calcularValor(usuario, "general");

}

export function calcularValor(usuario, tipo) {

    switch (tipo) {

        case "chupitos":
            return usuario.chupitos || 0;

        case "cerveza":
            return usuario.cervezaVino || 0;

        case "jarras":
            return usuario.jarras || 0;

        case "copas":
            return usuario.copas || 0;

        case "general":

        default:

            return (
                (usuario.chupitos || 0) * POINTS.chupitos +
                (usuario.cervezaVino || 0) * POINTS.cervezaVino +
                (usuario.jarras || 0) * POINTS.jarras +
                (usuario.copas || 0) * POINTS.copas
            );

    }

}

export function calcularPuntosPorTipo(cantidad, valor) {
    return cantidad * valor;
}

export function obtenerNombreRanking(tipo) {

    switch (tipo) {

        case "chupitos":
            return "chupitos";

        case "cerveza":
            return "cervezaVino";

        case "jarras":
            return "jarras";

        case "copas":
            return "copas";

        default:
            return "general";

    }

}