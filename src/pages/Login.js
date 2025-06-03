import React from "react";
import { Link } from "react-router-dom";

function Login() {
    return (
    <div>
        <h2>Login</h2>
        <form>
        <label>
            E-mail:<br />
            <input type="email" name="email" required />
        </label><br /><br />

        <label>
            Senha:<br />
            <input type="password" name="senha" required />
        </label><br /><br />

        <button type="submit">Entrar</button>
        <Link to="/cadastro">Cadastrar</Link>
        </form>
    </div>
    );
}

export default Login;


