let cambios = {
    chupitos: 0,
    cervezaVino: 0,
    jarras: 0,
    copas: 0
};

export function renderModal() {

    return `

<div id="modal" class="modal hidden">

    <div class="modal-content">

        <h2>Modificar bebidas</h2>

        ${crearFila("🥃 Chupitos", "chupitos")}
        ${crearFila("🍺 Cerveza / Vino", "cervezaVino")}
        ${crearFila("🍻 Jarras", "jarras")}
        ${crearFila("🍸 Copas", "copas")}

        <button id="saveButton">

            Guardar puntuación

        </button>

        <button id="closeModal">

            Cancelar

        </button>

    </div>

</div>

`;

}

function crearFila(texto, id){

    return `

<div class="drink-row">

    <span>${texto}</span>

    <div class="counter">

        <button class="minus" data-id="${id}">−</button>

        <span id="${id}-value">0</span>

        <button class="plus" data-id="${id}">+</button>

    </div>

</div>

`;

}

export function initModal(){

    cambios = {
        chupitos: 0,
        cervezaVino: 0,
        jarras: 0,
        copas: 0
    };

    document
        .querySelectorAll(".plus")
        .forEach(btn=>{

            btn.onclick=()=>{

                cambios[btn.dataset.id]++;

                actualizar();

            };

        });

    document
        .querySelectorAll(".minus")
        .forEach(btn=>{

            btn.onclick=()=>{

                if(cambios[btn.dataset.id]>0){

                    cambios[btn.dataset.id]--;

                }

                actualizar();

            };

        });

    document
        .getElementById("closeModal")
        .onclick=()=>{

            document
                .getElementById("modal")
                .classList.add("hidden");

        };

}

function actualizar(){

    Object.keys(cambios).forEach(key=>{

        document.getElementById(`${key}-value`).textContent=cambios[key];

    });

}

export function getCambios() {
  return { ...cambios };
}