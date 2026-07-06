import {
    doc,
    getDoc,
    onSnapshot,
    collection,
    query,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { db } from "../firebase.js";

export async function getUser(uid) {

    const referencia = doc(db, "users", uid);

    const documento = await getDoc(referencia);

    if (!documento.exists()) {
        throw new Error("Usuario no encontrado.");
    }

    return {
        uid,
        ...documento.data()
    };
}

export function subscribeUser(uid, callback) {

    const referencia = doc(db, "users", uid);

    return onSnapshot(referencia, (documento) => {

        callback({
            uid,
            ...documento.data()
        });

    });

}

export function subscribeUsers(callback) {

    const consulta = query(collection(db, "users"));

    return onSnapshot(consulta, (snapshot) => {

        const usuarios = [];

        snapshot.forEach((doc) => {

            usuarios.push({
                uid: doc.id,
                ...doc.data()
            });

        });

        callback(usuarios);

    });

}

export async function updateUser(uid, cambios) {

    const referencia = doc(db, "users", uid);

    await updateDoc(referencia, cambios);

}