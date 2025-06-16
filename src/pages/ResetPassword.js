import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResetPassword() {
  const query = useQuery();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const emailParam = query.get("email") || "";
    const codeParam = query.get("code") || "";
    setEmail(emailParam);
    setCode(codeParam);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (novaSenha !== confirmarSenha) {
      setError("As senhas não coincidem");
      return;
    }

    axios.post("http://localhost:8800/admin/reset-password", {
      email,
      code,
      novaSenha,
      confirmarSenha,
    })
      .then((res) => {
        setMessage(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Erro ao redefinir senha");
      });
  };

  return (
    <div className="reset-password-container">
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} readOnly />
        </div>
        <div>
          <label>Código de Verificação:</label>
          <input type="text" value={code} readOnly />
        </div>
        <div>
          <label>Nova Senha:</label>
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirmar Nova Senha:</label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Redefinir Senha</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ResetPassword;
