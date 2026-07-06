import { authState } from "./services/authService.js";
import { getUser } from "./services/userService.js";
import { subscribeUser } from "./services/userService.js";
import { subscribeUsers } from "./services/userService.js";
import { setUsers, setCurrentUser } from "./store.js";

import {
    initRouter,
    showLogin,
    showHome,
    refreshCurrentPage
} from "./router.js";

const app = document.getElementById("app");

initRouter(app);

subscribeUsers((usuarios) => {

    setUsers(usuarios);

    refreshCurrentPage();

});

authState(async (firebaseUser) => {

    if (!firebaseUser) {
        showLogin();
        return;
    }

    try {

        const usuario = await getUser(firebaseUser.uid);

        setCurrentUser(usuario);

        showHome();

        subscribeUser(firebaseUser.uid, (nuevoUsuario) => {
          setCurrentUser(nuevoUsuario);
          refreshCurrentPage();
        });

    } catch (e) {

        console.error(e);

    }

});