import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ClientInfo from "../components/ClientInfo";
import Address from "../components/Address";
import ProgressBar from "../components/ProgressBar";

import "../styles/Global.css";
import "../styles/AddClient.css";

const AddClient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cli_nome: "",
    cli_sobrenome: "",
    con_telefone: "",
    cli_numero: "",
    cli_complemento: "",
    cli_endereco: {
      cep: "",
      cidade: "",
      bairro: "",
      rua: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("cli_endereco.")) {
      const enderecoKey = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        cli_endereco: {
          ...prevData.cli_endereco,
          [enderecoKey]: value
        }
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.cli_nome ||
      !formData.cli_sobrenome ||
      !formData.con_telefone ||
      !formData.cli_numero ||
      !formData.cli_endereco.cep ||
      !formData.cli_endereco.cidade ||
      !formData.cli_endereco.bairro ||
      !formData.cli_endereco.rua
    ) {
      toast.warn("Preencha todos os campos obrigatórios, exceto complemento.");
      return;
    }

    const telefone = formData.con_telefone.replace(/[^\d]/g, "");

    const dataToSend = {
      clientInfo: {
        cli_nome: formData.cli_nome,
        cli_sobrenome: formData.cli_sobrenome,
        cli_numero: formData.cli_numero,
        cli_complemento: formData.cli_complemento,
      },
      address: {
        end_cep: formData.cli_endereco.cep,
        end_cidade: formData.cli_endereco.cidade,
        end_bairro: formData.cli_endereco.bairro,
        end_rua: formData.cli_endereco.rua,
      },
      con_telefone: telefone,
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
          cli_numero: "",
          cli_complemento: "",
          cli_endereco: {
            cep: "",
            cidade: "",
            bairro: "",
            rua: ""
          }
        });
        navigate("/cadastro-de-cliente/pedidos");
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

  return (
    <div className="container-cliente">
      <div className="header-cliente">
        <h1 className="title-cliente">Cadastro de Cliente</h1>
        <div className="actions-cliente">
          <NavLink to="/cadastro-de-cliente/pedidos">
            <button className="already-registered">Cliente já cadastrado</button>
          </NavLink>
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
            <Address formData={formData} handleChange={handleChange} />
            <div className="addClient-btn-add">
              <NavLink
                to="/cadastro-de-cliente/pedidos"
                className="btn-add"
                onClick={handleSubmit}
              >
                Cadastrar
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClient;