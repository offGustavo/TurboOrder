import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    foto: null,
    fotoUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/me", { withCredentials: true })
      .then((res) => {
        setFormData({
          nome: res.data.fun_nome,
          email: res.data.fun_email,
          foto: null,
          fotoUrl: res.data.fun_foto_url || "",
        });
        setLoading(false);
      })
      .catch(() => {
        setMessage("Erro ao carregar os dados do perfil.");
        setLoading(false);
      });
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        foto: file,
        fotoUrl: URL.createObjectURL(file),
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("nome", formData.nome);
    data.append("email", formData.email);
    if (formData.foto) data.append("foto", formData.foto);

    axios
      .put("http://localhost:8800/api/me", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setMessage("Perfil atualizado com sucesso!");
        // Atualiza nome/email no contexto auth se quiser
        setAuth((prev) => ({
          ...prev,
          username: formData.nome,
          email: formData.email,
        }));
      })
      .catch(() => {
        setMessage("Erro ao atualizar o perfil.");
      });
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="edit-profile">
      <h2>Editar Perfil</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Foto do Perfil:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {formData.fotoUrl && (
            <div style={{ marginTop: 10 }}>
              <img
                src={formData.fotoUrl}
                alt="Preview"
                style={{ width: 120, height: 120, objectFit: "cover", borderRadius: "50%" }}
              />
            </div>
          )}
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditProfile;