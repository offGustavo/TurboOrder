import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function EditProfile() {
  const { auth, setAuth } = useContext(AuthContext);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState("");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    // Carregar dados do usuário via API
    axios
      .get("http://localhost:8800/user/me", { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          setNome(res.data.nome);
          setEmail(res.data.email);
          setFoto(res.data.foto);
          setPreview(res.data.foto);
        } else {
          setError("Erro ao carregar os dados do perfil.");
        }
      })
      .catch(() => {
        setError("Erro ao carregar os dados do perfil.");
      });
  }, []);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);

      // preview da imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!nome || !email) {
      setError("Nome e email são obrigatórios.");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    if (foto && typeof foto !== "string") {
      // só envia a foto se for um arquivo (não string)
      formData.append("foto", foto);
    }

    axios
      .put("http://localhost:8800/user/update-profile", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          setSuccessMsg("Perfil atualizado com sucesso!");
          // Atualiza o contexto auth
          setAuth((prev) => ({
            ...prev,
            nome: nome,
            foto: preview,
          }));
        } else {
          setError("Erro ao atualizar o perfil.");
        }
      })
      .catch(() => {
        setError("Erro ao atualizar o perfil.");
      });
  };

  return (
    <div>
      <h2>Editar Perfil</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Foto do Perfil:</label>
        <input type="file" onChange={handleFotoChange} accept="image/*" />
        {preview && (
          <div>
            <p>Preview</p>
            <img
              src={preview}
              alt="Preview da foto"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </div>
        )}

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default EditProfile;