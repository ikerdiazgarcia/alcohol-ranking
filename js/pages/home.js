import { calcularTotal } from "../utils/helpers.js";
import { showProfile } from "../router.js"; 
import { renderRanking } from "../components/ranking.js";
import { getState } from "../store.js";
import { getSelectedRanking } from "../store.js";
import {
    renderRankingSelector,
    initRankingSelector
} from "../components/rankingSelector.js";
import { showStats } from "../router.js";

export function renderHome(usuario) {

    const total = calcularTotal(usuario);

    const usuarios = getState().users;

    const ranking =getSelectedRanking();

    return `

<div class="app">

    <main class="main-content">

        <div class="card">

            <div class="user-header">

                <img src="${usuario.foto}">

                <div>

                    <h2>${usuario.nombre}</h2>

                    <p>Bienvenido</p>

                </div>

            </div>

            <div class="total-points">

                ⭐ ${total} puntos

            </div>

        </div>

        ${renderRankingSelector()}

        ${renderRanking(
            usuarios,
            ranking,
            obtenerTitulo(ranking)
        )}

    </main>

    <nav class="bottom-nav">

        <button class="nav-button active">

            <span class="material-symbols-rounded">

                home

            </span>

            Inicio

        </button>

        <button
            id="statsButton"
            class="nav-button">

            <span class="material-symbols-rounded">

                bar_chart

            </span>

            Estadísticas

        </button>

        <button
            id="profileButton"
            class="nav-button">

            <span class="material-symbols-rounded">

                person

            </span>

            Perfil

        </button>



    </nav>

</div>

`;

}

export function initHome(){

    document
        .getElementById("profileButton")
        .addEventListener("click", showProfile);

    document
        .getElementById("statsButton")
        .addEventListener("click", showStats);
    
    initRankingSelector();

}

function obtenerTitulo(tipo) {

    switch(tipo){

        case "chupitos":
            return "🥃 Ranking Chupitos";

        case "cerveza":
            return "🍺 Ranking Cerveza / Vino";

        case "jarras":
            return "🍻 Ranking Jarras";

        case "copas":
            return "🍸 Ranking Copas";

        default:
            return "🏆 Ranking General";

    }

}