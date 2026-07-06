import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { auth } from "../firebase.js";

export async function login(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
    return await signOut(auth);
}

export function authState(callback) {
    onAuthStateChanged(auth, callback);
}