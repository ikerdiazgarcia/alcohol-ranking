import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

import { storage } from "../firebase.js";

export async function uploadProfileImage(uid, file){

    const referencia = ref(storage, `profiles/${uid}`);

    await uploadBytes(referencia, file);

    return await getDownloadURL(referencia);

}