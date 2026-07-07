import { showHome, showProfile } from "../router.js";
import { getHistory } from "../services/historyService.js";
import { getState } from "../store.js";
import { calcularTotal } from "../utils/helpers.js";

export function renderStats() {

    return `

<div class="app">

    <main class="main-content">

        <div class="card">

            <h2>📊 Estadísticas</h2>

            <canvas id="typeChart"></canvas>

        </div>

        <div class="card">

            <h2>📈 Evolución</h2>

            <canvas id="pointsChart"></canvas>

        </div>

        <div class="card">

            <h2>📅 Consumo semanal</h2>

            <canvas id="weekChart"></canvas>

        </div>

    </main>

    <nav class="bottom-nav">

        <button
            id="homeButton"
            class="nav-button">

            <span class="material-symbols-rounded">
                home
            </span>

            Inicio

        </button>

        <button
            class="nav-button active">

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

export async function initStats(){

    document
        .getElementById("homeButton")
        .onclick=showHome;

    document
        .getElementById("profileButton")
        .onclick=showProfile;

    await cargarGraficas();

}

async function cargarGraficas(){

    const usuario = getState().currentUser;

    const historial = await getHistory(usuario.uid);

    crearGraficaTipos(historial);

    crearGraficaPuntos(historial);

    crearGraficaSemanas(historial);

}

function crearGraficaTipos(historial){

    let chupitos = 0;
    let cerveza = 0;
    let jarras = 0;
    let copas = 0;

    historial.forEach(h => {

        chupitos += h.chupitos || 0;
        cerveza += h.cervezaVino || 0;
        jarras += h.jarras || 0;
        copas += h.copas || 0;

    });

    new Chart(document.getElementById("typeChart"), {

        type: "bar",

        data: {

            labels: ["🥃", "🍺", "🍻", "🍸"],

            datasets: [{

                label: "Consumisiones",

                data: [chupitos, cerveza, jarras, copas]

            }]

        }

    });

}

function crearGraficaPuntos(historial){

    let total = 0;

    const datos = [];

    historial.forEach(h => {

        total +=
            (h.chupitos || 0) +
            (h.cervezaVino || 0) * 2 +
            (h.jarras || 0) * 2.5 +
            (h.copas || 0) * 5;

        datos.push(total);

    });

    new Chart(document.getElementById("pointsChart"), {

        type: "line",

        data: {

            labels: datos.map((_, i) => i + 1),

            datasets: [{

                label: "Puntos",

                data: datos

            }]

        }

    });

}

function crearGraficaSemanas(historial){

    const semanas = {};

    historial.forEach(h => {

        const fecha = new Date(h.fecha.seconds * 1000);

        const semana = Math.ceil(fecha.getDate() / 7);

        semanas[semana] = (semanas[semana] || 0) + calcularTotal(h);

    });

    new Chart(document.getElementById("weekChart"), {

        type: "bar",

        data: {

            labels: Object.keys(semanas),

            datasets: [{

                label: "Puntos",

                data: Object.values(semanas)

            }]

        }

    });

}