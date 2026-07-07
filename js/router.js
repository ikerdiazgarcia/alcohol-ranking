import { renderLogin, initLogin } from "./pages/login.js";
import { renderHome, initHome } from "./pages/home.js";
import { renderProfile, initProfile } from "./pages/profile.js";
import { getState } from "./store.js";
import { renderStats, initStats } from "./pages/stats.js";

let app = null;
let currentPage = "login";

export function initRouter(appContainer) {
    app = appContainer;
}

export function showLogin() {
    currentPage = "login";
    app.innerHTML = renderLogin();
    initLogin();
}

export function showHome() {
    currentPage = "home";
    app.innerHTML = renderHome(getState().currentUser);
    initHome();
}

export function showProfile() {
    currentPage = "profile";
    app.innerHTML = renderProfile(getState().currentUser);
    initProfile();
}

export function refreshCurrentPage() {

    switch (currentPage) {

        case "home":
            showHome();
            break;

        case "profile":
            showProfile();
            break;

        case "stats":
            showStats();
            break;

        default:
            break;
    }

}

export function showStats() {

    currentPage = "stats";

    app.innerHTML = renderStats(getState().currentUser);

    initStats();

}