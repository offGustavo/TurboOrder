import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";
import deliveryImage from "../image/delivery.svg";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    axios
      .post("http://localhost:8800/admin/forgot-password", { email })
      .then((res) => setMessage(res.data.message))
      .catch((err) =>
        setError(err.response?.data?.error || "Erro ao enviar solicitação")
      );
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-password-container">
        <div className="forgot-content">
          <div className="forgot-image">
            <img src={deliveryImage} alt="Delivery" />
            <p className="image-credit">
              <a
                href="https://storyset.com/food"
                target="_blank"
                rel="noopener noreferrer"
              >
                Food illustrations by Storyset
              </a>
            </p>
          </div>

          <div className="forgot-text">
            <h2>Esqueci minha senha</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">
                Digite seu email associado à sua conta:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Enviar</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;