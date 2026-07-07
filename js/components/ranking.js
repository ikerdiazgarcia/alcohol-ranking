import { calcularValor } from "../utils/helpers.js";

export function renderRanking(usuarios, tipo, titulo) {

    const ranking = [...usuarios];

    ranking.sort((a, b) => calcularValor(b, tipo) - calcularValor(a, tipo));

    return `

<div class="card">

    <h2 style="margin-bottom:20px">${titulo}</h2>

    ${ranking.map((usuario, index) => `

        <div class="ranking-row">

            <span class="ranking-user"> 
            
                ${getMedalla(index)}

                <img
                    class="ranking-avatar"
                    src="${usuario.foto}">

                ${usuario.nombre}

            </span>

            <strong>

                ${formatearValor(calcularValor(usuario, tipo), tipo)}

            </strong>

        </div>

    `).join("")}

</div>

`;

}

function getMedalla(posicion){

    switch(posicion){

        case 0: return "🥇";

        case 1: return "🥈";

        case 2: return "🥉";

        default: return `${posicion + 1}.`;

    }

}

function formatearValor(valor, tipo) {

    if (tipo === "general") {
        return `${valor} pts`;
    }

    return valor;

}