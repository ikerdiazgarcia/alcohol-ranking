import { logout } from "../services/authService.js";
import { showHome } from "../router.js";
import { POINTS } from "../utils/points.js";
import { updateUser } from "../services/userService.js";
import { getState } from "../store.js";
import {
    calcularTotal,
    calcularPuntosPorTipo
} from "../utils/helpers.js";
import {
  renderModal,
  initModal,
  getCambios
} from "../components/modal.js";
import { showToast } from "../utils/toast.js";
import { addHistory } from "../services/historyService.js";
import { showStats } from "../router.js";

export function renderProfile(usuario) {

    const total = calcularTotal(usuario);

    return `

<div class="app">

    <main class="main-content">

        <div class="card">

            <div class="user-header">

                <img src="${usuario.foto}">

                <div>

                    <h2>${usuario.nombre}</h2>

                    <p>${total} puntos</p>

                </div>

            </div>

        </div>

        <div class="card">

            <h2>Bebidas</h2>

            <div class="ranking-row">

                <span>🥃 Chupitos</span>

                <strong>

                    ${usuario.chupitos}

                    (${calcularPuntosPorTipo(usuario.chupitos, POINTS.chupitos)} pts)

                </strong>

            </div>

            <div class="ranking-row">

                <span>🍺 Cerveza / Vino</span>

                <strong>

                    ${usuario.cervezaVino}

                    (${calcularPuntosPorTipo(usuario.cervezaVino, POINTS.cervezaVino)} pts)

                </strong>

            </div>

            <div class="ranking-row">

                <span>🍻 Jarras</span>

                <strong>

                    ${usuario.jarras}

                    (${calcularPuntosPorTipo(usuario.jarras, POINTS.jarras)} pts)

                </strong>

            </div>

            <div class="ranking-row">

                <span>🍸 Copas</span>

                <strong>

                    ${usuario.copas}

                    (${calcularPuntosPorTipo(usuario.copas, POINTS.copas)} pts)

                </strong>

            </div>

        </div>

        <div class="card">

            <button id="logoutButton">

                Cerrar sesión

            </button>

        </div>

    </main>

    <button id="addButton" class="fab">
      <span class="material-symbols-rounded">
      add
      </span>

    </button>

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
            id="statsButton"
            class="nav-button">

            <span class="material-symbols-rounded">

                bar_chart

            </span>

            Estadísticas

        </button>

        <button class="nav-button active">

            <span class="material-symbols-rounded">

                person

            </span>

            Perfil

        </button>

    </nav>

    ${renderModal()}

</div>

`;

}

export function initProfile() {

    document
        .getElementById("logoutButton")
        .addEventListener("click", () => {

          if (confirm("¿Cerrar sesión?")) {
            logout();
          }

        });

    document
        .getElementById("homeButton")
        .addEventListener("click", showHome);

    document
        .getElementById("statsButton")
        .addEventListener("click", showStats);
 

    document
        .getElementById("addButton")
        .addEventListener("click", () => {

            document
                .getElementById("modal")
                .outerHTML = renderModal();

            initModal();

            document
                .getElementById("modal")
                .classList.remove("hidden");

            document
                .getElementById("saveButton")
                .addEventListener("click", guardarCambios);

    });

    document
    .getElementById("saveButton")
    .addEventListener("click", guardarCambios);

}

async function guardarCambios() {

    const usuario = getState().currentUser;

    const boton = document.getElementById("saveButton");

    const cambios = getCambios();

    if (
        cambios.chupitos === 0 &&
        cambios.cervezaVino === 0 &&
        cambios.jarras === 0 &&
        cambios.copas === 0
    ){
        return;
    }

    boton.disabled = true;
    boton.textContent = "Guardando...";

    await updateUser(usuario.uid, {

        chupitos: usuario.chupitos + cambios.chupitos,

        cervezaVino: usuario.cervezaVino + cambios.cervezaVino,

        jarras: usuario.jarras + cambios.jarras,

        copas: usuario.copas + cambios.copas

    });

    await addHistory(usuario.uid, cambios);

    showToast("Puntuación actualizada");

    document
        .getElementById("modal")
        .classList.add("hidden");

}