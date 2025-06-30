import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/EditProfile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProfile() {
  const context = useContext(AuthContext);
  const auth = context ? context.auth : null;
  const setAuth = context ? context.setAuth : () => {};

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState(null); // agora foto começa null
  const [preview, setPreview] = useState("");

  useEffect(() => {
    let didCancel = false;

    const getTokenFromCookie = () => {
      const tokenCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
      return tokenCookie ? tokenCookie.split("=")[1] : null;
    };

    const token = getTokenFromCookie();
    if (!token) {
      if (!didCancel) {
        toast.error("Token de autenticação não encontrado.", {
          position: "top-center",
        });
      }
      return;
    }

    axios
      .get("http://localhost:8800/user/me", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => {
        if (!didCancel) {
          if (res.data.Status === "Success") {
            setNome(res.data.nome);
            setEmail(res.data.email);

            const fotoUrl = res.data.foto
              ? res.data.foto.startsWith("http")
                ? res.data.foto
                : `http://localhost:8800/uploads/${res.data.foto}`
              : "";
            setPreview(fotoUrl);
          } else {
            toast.error("Erro ao carregar dados do usuário.", {
              position: "top-center",
            });
          }
        }
      })
      .catch(() => {
        if (!didCancel) {
          toast.error("Erro ao carregar dados do usuário.", {
            position: "top-center",
          });
        }
      });

    return () => {
      didCancel = true;
    };
  }, []);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitInfo = (e) => {
    e.preventDefault();

    if (!nome || !email) {
      toast.error("Preencha todos os campos!", { position: "top-center" });
      return;
    }

    let didCancel = false;

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);

    if (foto) {
      formData.append("foto", foto);
    }

    axios
      .put("http://localhost:8800/user/update-profile", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (!didCancel) {
          if (res.data.Status === "Success") {
            toast.success("Informações atualizadas com sucesso!", {
              position: "top-center",
            });

            setAuth((prev) => {
              if (!prev || typeof prev !== "object") {
                prev = {
                  isAuthenticated: false,
                  role: null,
                  nome: null,
                  foto: null,
                };
              }
              return {
                ...prev,
                nome,
                foto: res.data.foto
                  ? res.data.foto.startsWith("http")
                    ? res.data.foto
                    : `http://localhost:8800/uploads/${res.data.foto}`
                  : prev.foto,
              };
            });

            setFoto(null); // limpa foto nova após salvar
          } else {
            toast.error("Erro ao atualizar informações.", {
              position: "top-center",
            });
          }
        }
      })
      .catch(() => {
        if (!didCancel) {
          toast.error("Erro ao atualizar informações.", {
            position: "top-center",
          });
        }
      });

    return () => {
      didCancel = true;
    };
  };

  return (
    <div className="edit-profile-wrapper">
      <div className="edit-profile-container">
        <div className="left-side">
          {preview ? (
            <img
              className="edit-profile-photo"
              src={preview}
              alt="Foto do perfil"
            />
          ) : (
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                backgroundColor: "#ddd",
                marginBottom: 20,
              }}
            />
          )}

          <label className="custom-file-upload">
            Escolher nova foto
            <input
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div className="right-side">
          <form onSubmit={handleSubmitInfo}>
            <label>Nome:</label>
            <input
              className="input-line"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              required
            />

            <label>Email:</label>
            <input
              className="input-line"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu email"
              required
            />

            <button className="btn-primary" type="submit">
              Salvar informações
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;