import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { db } from "../firebase.js";

export async function addHistory(uid, cambios){

    await addDoc(collection(db,"history"),{

        uid,

        fecha: new Date(),

        ...cambios

    });

}

export async function getHistory(uid){

    const consulta = query(

        collection(db,"history"),

        where("uid","==",uid),

        orderBy("fecha","asc")

    );

    const snapshot = await getDocs(consulta);

    const historial = [];

    snapshot.forEach(doc => {

        historial.push(doc.data());

    });

    return historial;

}