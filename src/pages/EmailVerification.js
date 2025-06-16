import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmailVerification() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    axios.post("http://localhost:8800/admin/verify-email", { email, code })
      .then((res) => {
        setMessage(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Erro ao verificar email");
      });
  };

  return (
    <div className="email-verification-container">
      <h2>Verificação de Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email cadastrado:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Código de Verificação:</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Verificar Email</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default EmailVerification;
