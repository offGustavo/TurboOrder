import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TextField } from "@mui/material";
import ClientInfo from "../components/ClientInfo";
import Address from "../components/Address";
import ProgressBar from "../components/ProgressBar";
import PopupModal from "../components/PopupModal";

import "../styles/Global.css";
import "../styles/AddClient.css";

const AddClient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emp_razaoSocial: "",
    emp_inscricaoEstado: "",
    emp_cnpj: "",
    con_telefone: "",
    cli_cep: "",
    cli_cidade: "",
    cli_bairro: "",
    cli_rua: "",
    cli_numero: "",
    cli_complemento: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("confirmarCadastroEmpresa");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.emp_razaoSocial.trim() ||
      !formData.emp_inscricaoEstado.trim() ||
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

    setActionType("confirmarCadastroEmpresa");
    setShowModal(true);
  };

  const handleConfirm = async () => {
    const telefone = formData.con_telefone.replace(/[^\d]/g, "");

    const dataToSend = {
      empInfo: {
        emp_razaoSocial: formData.emp_razaoSocial,
        emp_inscricaoEstado: formData.emp_inscricaoEstado,
        cli_numero: formData.cli_numero,
        cli_complemento: formData.cli_complemento,
        emp_cnpj: formData.emp_cnpj
      },
      address: {
        end_cep: formData.cli_cep,
        end_cidade: formData.cli_cidade,
        end_bairro: formData.cli_bairro,
        end_rua: formData.cli_rua
      },
      con_telefone: telefone
    };

    console.log("Dados enviados para cadastro:");
    console.log(JSON.stringify(dataToSend, null, 2));

    try {
      const checkResponse = await axios.get(
        `http://localhost:8800/clientes/telefone/${telefone}`
      );
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
      const response = await axios.post(
        "http://localhost:8800/empresa",
        dataToSend
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Cliente cadastrado com sucesso!");
        setFormData({
          emp_razaoSocial: "",
          emp_inscricaoEstado: "",
          emp_cnpj: "",
          con_telefone: "",
          cli_cep: "",
          cli_cidade: "",
          cli_bairro: "",
          cli_rua: "",
          cli_numero: "",
          cli_complemento: ""
        });
        setShowModal(false);
      } else {
        console.warn("Resposta inesperada:", response);
        toast.error("Erro inesperado ao cadastrar o cliente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);

      const mensagemErro =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Erro ao cadastrar o cliente.";

      toast.error(mensagemErro);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value ? e.target.value.replace(/\D/g, "") : "";
    handleChange({
      target: {
        name: "con_telefone",
        value: phone
      }
    });
  };

  const handleCNPJChange = (e) => {
    const raw = e.target.value.toUpperCase();
    const clean = raw.replace(/[^A-Z0-9]/g, "");
    handleChange({
      target: {
        name: "emp_cnpj",
        value: clean
      }
    });
  };

  return (
    <div className="container-cliente">
      <div className="header-cliente">
        <h1 className="title-cliente">Cadastro de Empresa</h1>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className="sub-text">Empresa</h2>

            <div className="CliForm">
              <TextField
                id="clientInfo-cnpj"
                label="CNPJ"
                variant="outlined"
                name="emp_cnpj"
                value={formData.emp_cnpj}
                onChange={handleCNPJChange}
                placeholder="99.AAA.999/AAAA-99"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#FD1F4A" },
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" }
                  },
                  "& .MuiInputBase-input": {
                    color: "black"
                  },
                  width: "30ch"
                }}
              />
            </div>

            <div className="CliForm">
              <TextField
                id="emp_razaoSocial"
                label="Razão Social"
                variant="outlined"
                name="emp_razaoSocial"
                value={formData.emp_razaoSocial}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#FD1F4A" },
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" }
                  },
                  "& .MuiInputBase-input": {
                    color: "black"
                  },
                  width: "30ch"
                }}
              />
            </div>

            <div className="CliForm">
              <TextField
                id="emp_inscricaoEstado"
                label="Inscrição Estado"
                variant="outlined"
                name="emp_inscricaoEstado"
                value={formData.emp_inscricaoEstado}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#FD1F4A" },
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" }
                  },
                  "& .MuiInputBase-input": {
                    color: "black"
                  },
                  width: "30ch"
                }}
              />
            </div>

            <hr />

            <h2 className="sub-text">Telefone</h2>
            <div className="CliForm tel">
              <TextField
                id="clientInfo-phone"
                label="Telefone"
                variant="outlined"
                name="con_telefone"
                value={formData.con_telefone}
                onChange={handlePhoneChange}
                placeholder="(99) 99999-9999"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#FD1F4A" },
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" }
                  },
                  "& .MuiInputBase-input": {
                    color: "black"
                  },
                  width: "30ch"
                }}
              />
            </div>

            <hr />
            <h2 className="sub-text">Endereço</h2>
            <Address formData={formData} handleChange={handleChange} />
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
