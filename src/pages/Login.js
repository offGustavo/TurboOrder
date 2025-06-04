import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

import "../styles/Login.css";

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8800/login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => alert("Erro ao logar"));
  };

  return (
    <div className="container">
      <div className="form-box" style={{ order: 1 }}>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
            />
            <MdEmail />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Senha"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              required
            />
            <FaLock />
          </div>
          <div className="forgot-link">
            <a href="#">Esqueceu a senha?</a>
          </div>
          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>
      </div>

      <div className="toggle-box" style={{ order: 2 }}>
        <div>
          <h1>Bem-vindo de volta!</h1>
          <p>Não tem conta? Crie agora</p>
          <Link to="/cadastro" className="btn-register">
            Cadastrar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;