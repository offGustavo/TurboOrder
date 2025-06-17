import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ClientInfo from "../components/ClientInfo";
import Address from "../components/Address";
import ProgressBar from "../components/ProgressBar";
import PopupModal from "../components/PopupModal";

import "../styles/Global.css";
import "../styles/AddClient.css";

const AddClient = () => {
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
  const [actionType, setActionType] = useState("confirmarCadastro");

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;
    if (name === "cli_cep") {
      newValue = value.replace(/[^\d-]/g, "").slice(0, 9);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue
    }));
  };

  const validateCep = (cep) => {
    const cleanedCep = cep.replace(/\D/g, "");
    return /^\d{8}$/.test(cleanedCep);
  };

  const checkCepExists = async (cep) => {
    try {
      const cleanCep = cep.replace(/\D/g, "");
      const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
      return !response.data.erro;
    } catch (error) {
      console.error("Erro ao consultar o CEP:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.cli_nome.trim() ||
      !formData.cli_sobrenome.trim() ||
      !formData.con_telefone.trim() ||
      !formData.cli_numero.trim() ||
      !formData.cli_cep.trim() ||
      !formData.cli_cidade.trim() ||
      !formData.cli_bairro.trim() ||
      !formData.cli_rua.trim()
    ) {
      toast.warn("Preencha todos os campos obrigatórios, exceto complemento.");
      return;
    }

    if (!validateCep(formData.cli_cep)) {
      toast.error("CEP inválido. Use apenas 8 dígitos numéricos.");
      return;
    }

    const cepValido = await checkCepExists(formData.cli_cep);
    if (!cepValido) {
      toast.error("CEP não encontrado. Verifique se digitou corretamente.");
      return;
    }

    setActionType("confirmarCadastro");
    setShowModal(true);
  };

const handleConfirm = async () => {
  console.log("Confirmando cadastro...");
  const telefone = formData.con_telefone.replace(/[^\d]/g, "");

const dataToSend = {
  clientInfo: {
    cli_nome: formData.cli_nome,
    cli_sobrenome: formData.cli_sobrenome,
    cli_numero: formData.cli_numero,
    cli_complemento: formData.cli_complemento,
  },
  address: {
    end_cep: formData.cli_cep,
    end_cidade: formData.cli_cidade,
    end_bairro: formData.cli_bairro,
    end_rua: formData.cli_rua,
  },
  con_telefone: telefone,
  empresa_fk: null, // 👉 ou um ID se quiser vincular
};


  try {
    const checkResponse = await axios.get(`http://localhost:8800/clientes/telefone/${telefone}`);
    if (checkResponse.data) {
      toast.error("Este cliente já está cadastrado com este número de telefone.");
      return;
    }
  } catch (error) {
    if (error.response && error.response.status !== 404) {
      console.error("Erro ao verificar cliente existente:", error);
      toast.error("Erro ao verificar se o cliente já está cadastrado.");
      return;
    }
  }

  try {
    const response = await axios.post("http://localhost:8800/clientes", dataToSend);

    if (response.status === 200 || response.status === 201) {
      toast.success("Cliente cadastrado com sucesso!");
      setFormData({
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
      setShowModal(false);
      navigate("/cadastro-de-cliente/pedidos");
    } else {
      toast.error("Erro inesperado ao cadastrar o cliente.");
    }
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    if (error.response) {
      console.log("Resposta do servidor:", error.response.data);
    } else {
      console.log("Erro genérico:", error.message);
    }
    toast.error("Erro ao cadastrar cliente. Verifique o console para mais detalhes.");
  }
};

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container-cliente">
      <div className="header-cliente">
        <h1 className="title-cliente">Cadastro de Cliente</h1>
        <div className="actions-cliente">
          <button className="already-registered" onClick={() => navigate("/cadastro-de-cliente/pedidos")}>
            Cliente já cadastrado
          </button>
        </div>
      </div>
      <ProgressBar />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className="sub-text">Cliente</h2>
            <ClientInfo formData={formData} handleChange={handleChange} />
            <hr />
            <h2 className="sub-text">Endereço</h2>
            <Address
              formData={formData}
              handleChange={handleChange}
              setFormData={setFormData} // ✅ Adicionado para preenchimento via CEP
            />
            <div className="addClient-btn-add">
              <button type="submit" className="btn-add">
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>

      <PopupModal
        showModal={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        actionType={actionType}
      />
    </div>
  );
};

export default AddClient;
