import {
    getSelectedRanking,
    setSelectedRanking
} from "../store.js";

import { refreshCurrentPage } from "../router.js";

const rankings = [
    {
        id: "general",
        icon: "🏆",
        text: "General"
    },
    {
        id: "chupitos",
        icon: "🥃",
        text: "Chupitos"
    },
    {
        id: "cerveza",
        icon: "🍺",
        text: "Cerveza"
    },
    {
        id: "jarras",
        icon: "🍻",
        text: "Jarras"
    },
    {
        id: "copas",
        icon: "🍸",
        text: "Copas"
    }
];

export function renderRankingSelector() {

    const actual = getSelectedRanking();

    return `

<div class="ranking-selector">

${rankings.map(r=>`

<button
    class="ranking-chip ${actual===r.id?"active":""}"
    data-ranking="${r.id}">

    ${r.icon} ${r.text}

</button>

`).join("")}

</div>

`;

}

export function initRankingSelector(){

    document
        .querySelectorAll(".ranking-chip")
        .forEach(btn=>{

            btn.onclick=()=>{

                setSelectedRanking(btn.dataset.ranking);

                refreshCurrentPage();

            };

        });

}