import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { FaLock, FaUser } from "react-icons/fa";

import "../styles/Register.css";

function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8800/cadastro", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        } else {
          alert("Erro ao cadastrar");
        }
      })
      .catch((err) => alert("Erro de conexão"));
  };

  return (
    <div className="register-body">
    <div className="register-container">
      <div className="toggle-box" style={{ order: 1 }}>
        <div>
          <h1>Olá, Amigo!</h1>
          <p>Cadastre-se para simplificar e otimizar o gerenciamento dos seus produtos!</p>
          <Link to="/login" className="btn-register">
            Já possuí uma conta?
          </Link>
        </div>
      </div>

      <div className="form-box" style={{ order: 2 }}>
        <form onSubmit={handleSubmit}>
          <h1>Cadastrar</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Nome"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
              required
            />
            <FaUser />
          </div>
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
          <button type="submit" className="btn-login">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Register;