import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ClientInfo from "../components/ClientInfo";
import Address from "../components/Address";
import PopupModal from "../components/PopupModal";
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "../styles/EditClient.css";

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cli_nome: "",
    cli_sobrenome: "",
    con_telefone: "",
    cli_cep: "",
    cli_cidade: "",
    cli_bairro: "",
    cli_rua: "",
    cli_numero: "",
    cli_complemento: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("confirmarAtualizacao");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get("http://localhost:8800/clientes");
        const client = res.data.find(c => String(c.cli_id) === id);
        if (client) {
          setFormData({
            cli_nome: client.cli_nome || "",
            cli_sobrenome: client.cli_sobrenome || "",
            con_telefone: client.con_telefone || "",
            cli_cep: client.cli_cep || "",
            cli_cidade: client.cli_cidade || "",
            cli_bairro: client.cli_bairro || "",
            cli_rua: client.cli_rua || "",
            cli_numero: client.cli_numero || "",
            cli_complemento: client.cli_complemento || ""
          });
        } else {
          toast.error("Cliente não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        toast.error("Erro ao buscar dados do cliente.");
      }
    };

    fetchClient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleModalOpen = (e) => {
    e.preventDefault();
    setActionType("confirmarAtualizacao");
    setShowModal(true);
  };

  const handleSubmit = async () => {
    const payload = {
      cli_nome: formData.cli_nome,
      cli_sobrenome: formData.cli_sobrenome,
      con_telefone: formData.con_telefone,
      cli_numero: formData.cli_numero,
      cli_complemento: formData.cli_complemento,
      end_cep: formData.cli_cep,
      end_cidade: formData.cli_cidade,
      end_bairro: formData.cli_bairro,
      end_rua: formData.cli_rua
    };

    try {
      await axios.put(`http://localhost:8800/clientes/${id}`, payload);
      toast.success("Cliente atualizado com sucesso!");
      navigate("/clientes");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      toast.error("Erro ao atualizar cliente."); 
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    handleSubmit();
    setShowModal(false);
  };

  return (
    <div className="form-container">
      <h2 className="title-form">Editar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="section-margin">
          <ClientInfo formData={formData} handleChange={handleChange} />
        </div>
        <hr />
        <div className="section-margin">
          <Address formData={formData} handleChange={handleChange} />
        </div>
        <button
          className="btn-add"
          type="button"
          onClick={handleModalOpen} 
        >
          Atualizar Cliente
        </button>
      </form>

      <PopupModal
        showModal={showModal}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        actionType={actionType}
      />

      <ToastContainer />
    </div>
  );
};

export default EditClient;
