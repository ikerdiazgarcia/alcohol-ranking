import { login } from "../services/authService.js";

export function renderLogin() {

    return `
        <div class="login-container">

            <div class="login-card">

                <h1>🍻 Alcohol Ranking</h1>

                <p>Inicia sesión para continuar</p>

                <input
                    id="email"
                    type="email"
                    placeholder="Correo electrónico">

                <input
                    id="password"
                    type="password"
                    placeholder="Contraseña">

                <button id="loginButton">
                    Iniciar sesión
                </button>

                <p id="loginError"></p>

            </div>

        </div>
    `;
}

export function initLogin() {

    const button = document.getElementById("loginButton");

    button.addEventListener("click", async () => {

        const email = document.getElementById("email").value.trim();

        const password = document.getElementById("password").value;

        const error = document.getElementById("loginError");

        error.textContent = "";

        button.disabled = true;

        button.textContent = "Entrando...";

        try {

            await login(email, password);

        } catch {

            error.textContent = "Correo o contraseña incorrectos.";

        }

        button.disabled = false;

        button.textContent = "Iniciar sesión";

    });

}