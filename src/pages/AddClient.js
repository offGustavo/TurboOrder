import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import ClientInfo from "../components/ClientInfo";
import Address from "../components/Address";
import ProgressBar from "../components/ProgressBar";
import "../styles/Global.css";
import "../styles/AddClient.css";

const ContainerCliente = styled.div`
  background-color: #ffffff;
  color: #000000;
  font-family: "poppins", serif;
  font-size: 18px;
  width: 100%;
  height: 100%;
  padding: 0px;
`;

const HeaderCliente = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const ActionsCliente = styled.div``;

const TitleCliente = styled.h1`
  margin: 0px;
  font-size: 25px;
`;

const AlreadyRegistered = styled.button`
  height: auto;
  margin: 0 15px;
  color: #fd1f4a;
  font-weight: bold;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #fd1f4a;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #fd1f4a;
    color: #ffffff;
  }
`;

const FormConteiner = styled.div`
  margin-top: 100px;
  width: 100%;
`;

const SubText = styled.h2`
  margin: 40px 0px 20px 0px;
  font-size: 16px;
`;

const Form = styled.div``;

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
      alert("Por favor, preencha todos os campos obrigatórios, exceto complemento.");
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

    console.log("Dados enviados:", dataToSend);

    try {
      const response = await axios.post("http://localhost:8800/clientes", dataToSend);

      if (response.status === 200 || response.status === 201) {
        alert("Cliente cadastrado com sucesso!");
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
        navigate("/addOrder");
      } else {
        console.warn("Resposta inesperada:", response);
        alert("Erro inesperado ao cadastrar o cliente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);

      const mensagemErro =
        error?.response?.data?.message || 
        error?.response?.data ||
        error?.message ||
        "Erro ao cadastrar o cliente.";

      alert(mensagemErro);
    }
  };


  return (
    <ContainerCliente>
      <HeaderCliente>
        <TitleCliente>Cadastro de Cliente</TitleCliente>
        <ActionsCliente>
          <NavLink to="/cadastro-de-cliente/pedidos">
            <AlreadyRegistered>Cliente já cadastrado</AlreadyRegistered>
          </NavLink>
        </ActionsCliente>
      </HeaderCliente>
      <ProgressBar />
      <FormConteiner>
        <form onSubmit={handleSubmit}>
          <Form>
            <SubText>Cliente</SubText>
            <ClientInfo
              formData={formData}
              handleChange={handleChange}
            />
            <hr />
            <SubText>Endereço</SubText>
            <Address
              formData={formData}
              handleChange={handleChange}
            />
            <div className="addClient-btn-add">
              <button type="submit" className="btn-add">
                Cadastrar
              </button>
            </div>
          </Form>
        </form>
      </FormConteiner>
    </ContainerCliente>
  );
};

export default AddClient;
