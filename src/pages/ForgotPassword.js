import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    axios.post("http://localhost:8800/admin/forgot-password", { email })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Erro ao enviar solicitação");
      });
  };

  return (
    <div className="forgot-password-container">
      <h2>Esqueci minha senha</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Digite seu email cadastrado:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar código de verificação</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ForgotPassword;
