import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";


import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

import "../styles/Login.css";

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8800/login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
          if (token) {
            const decoded = jwtDecode(token);
            axios
              .get("http://localhost:8800/user/me", { withCredentials: true })
              .then((res) => {
                if (res.data.Status === "Success") {
                  setAuth({
                    isAuthenticated: true,
                    role: decoded.role,
                    nome: res.data.nome,
                    foto: res.data.foto,
                  });
                } else {
                  setAuth({
                    isAuthenticated: true,
                    role: decoded.role,
                    nome: null,
                    foto: null,
                  });
                }
                navigate("/");
              })
              .catch(() => {
                setAuth({
                  isAuthenticated: true,
                  role: decoded.role,
                  nome: null,
                  foto: null,
                });
                navigate("/");
              });
          } else {
            setAuth({
              isAuthenticated: true,
              role: null,
            });
            navigate("/");
          }
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => alert("Erro ao logar"));
  };

  return (
    <div className="login-body">
    <div className="login-container">
      <div className="form-box" style={{ order: 1 }}>
        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
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
            <a href="/forgot-password">Esqueceu a senha?</a>
          </div>
          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>
      </div>

      <div className="toggle-box" style={{ order: 2 }}>
        <div>
          <h1>Bem-vindo de Volta!</h1>
          <p>Acesse sua conta para gerenciar seus pedidos com facilidade!</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;