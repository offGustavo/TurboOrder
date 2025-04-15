import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import DeliverySelect from "../components/DeliverySelect.js";
import "../styles/AddOrder.css";
import "../styles/Global.css";
import { Box, TextField } from '@mui/material';
import ComboBox from "../components/ComboBox.js";
import ProgressBar from "../components/ProgressBar.js";
import ClientInfo from "../components/ClientInfo.js";
import axios from "axios";

function printPedido() {
  console.log("Pedido");
}

const TitlePedido = styled.h1`
  margin: 0px;
  font-size: 25px;
`;

const SubText = styled.h2`
  margin: 10px 0px 20px 0px;
  font-size: 16px;
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

const AddOrder = () => {
  const options = [
    { id: 1, nome: "Arroz Soltinho", tipo: "Arroz" },
    { id: 2, nome: "Arroz Integral", tipo: "Arroz" },
    { id: 3, nome: "Arroz Jasmim", tipo: "Arroz" },
    { id: 4, nome: "Arroz Negro", tipo: "Arroz" },
    { id: 5, nome: "Arroz Vermelho", tipo: "Arroz" },
    { id: 6, nome: "Feijão Preto", tipo: "Feijão" },
    { id: 7, nome: "Feijão Carioca", tipo: "Feijão" },
    { id: 8, nome: "Feijão Feijoada", tipo: "Feijão" },
    { id: 9, nome: "Feijão Tropeiro", tipo: "Feijão" },
    { id: 10, nome: "Feijão Tutu", tipo: "Feijão" },
    { id: 11, nome: "Massa Espaguete", tipo: "Massa" },
    { id: 12, nome: "Massa Talharim", tipo: "Massa" },
    { id: 13, nome: "Massa Penne", tipo: "Massa" },
    { id: 14, nome: "Massa Ravioli", tipo: "Massa" },
    { id: 15, nome: "Massa Fusilli", tipo: "Massa" },
    { id: 16, nome: "Salada Caesar", tipo: "Salada" },
    { id: 17, nome: "Salada Tropical", tipo: "Salada" },
    { id: 18, nome: "Salada Caprese", tipo: "Salada" },
    { id: 19, nome: "Salada Verde", tipo: "Salada" },
    { id: 20, nome: "Salada De Frutas", tipo: "Salada" },
    { id: 21, nome: "Acompanhamento Batata Frita", tipo: "Acompanhamento" },
    { id: 22, nome: "Acompanhamento Purê de Batata", tipo: "Acompanhamento" },
    { id: 23, nome: "Acompanhamento Farofa", tipo: "Acompanhamento" },
    { id: 24, nome: "Acompanhamento Vinagrete", tipo: "Acompanhamento" },
    { id: 25, nome: "Acompanhamento Legumes Salteados", tipo: "Acompanhamento" },
    { id: 26, nome: "Carne Bife", tipo: "Carne" },
    { id: 27, nome: "Carne Frango Grelhado", tipo: "Carne" },
    { id: 28, nome: "Carne Costela", tipo: "Carne" },
    { id: 29, nome: "Carne Picanha", tipo: "Carne" },
    { id: 30, nome: "Carne Carne Moída", tipo: "Carne" }
  ];

  const [clientInfo, setClientInfo] = useState({
    cli_nome: "",
    cli_sobrenome: "",
  });
  const [loadingClient, setLoadingClient] = useState(false);
  const [clientError, setClientError] = useState(null);

  const debounceTimeout = useRef(null);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setClientInfo((prev) => ({
      ...prev,
      con_telefone: value,
    }));
    setClientError(null);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchClientInfo(value);
    }, 500);
  };

  const fetchClientInfo = async (phone) => {
    if (!phone || phone.length < 8) {
      setClientInfo({
        cli_nome: "",
        cli_sobrenome: "",
      });
      return;
    }
    setLoadingClient(true);
    try {
      const response = await axios.get(`http://localhost:8800/clientes/telefone/${phone}`);
      setClientInfo(response.data);
      setClientError(null);
    } catch (error) {
      setClientInfo({
        cli_nome: "",
        cli_sobrenome: "",
      });
      setClientError("Cliente não encontrado");
    } finally {
      setLoadingClient(false);
    }
  };

  return (
    <main className="p-10 ContainerPedido">
      <header className="display-flex space-between ">
        <TitlePedido>Cadastro De Pedidos</TitlePedido>
        <div className="display-flex">
          <NavLink to="/cadastro-de-cliente">
            <AlreadyRegistered>Cliente não cadastrado</AlreadyRegistered>
          </NavLink>
          <button onClick={printPedido} className="btn-add">Finalizar</button>
        </div>
      </header>
      <ProgressBar />

      <br />
      <section className="section">
        <SubText>Cliente</SubText>

        <div style={{ display: "flex", gap: "20px" }}>
          <TextField
            label="Nome"
            variant="outlined"
            value={clientInfo.cli_nome || ""}
            InputProps={{ readOnly: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
              "& .MuiInputBase-input": {
                color: "black",
              },
              width: "30ch",
            }}
          />
          <TextField
            label="Sobrenome"
            variant="outlined"
            value={clientInfo.cli_sobrenome || ""}
            InputProps={{ readOnly: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
              "& .MuiInputBase-input": {
                color: "black",
              },
              width: "30ch",
            }}
          />
        </div>

        <Box sx={{ width: "40ch", margin: "30px 0 10px 0" }}>
          <TextField
            label="Telefone"
            variant="outlined"
            value={clientInfo.con_telefone || ""}
            onChange={handlePhoneChange}
            placeholder="Digite o telefone do cliente"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
              "& .MuiInputBase-input": {
                color: "black",
              },
              width: "30ch",
            }}
          />
        </Box>

        {loadingClient && <p>Carregando informações do cliente...</p>}
        {clientError && <p style={{ color: "red" }}>{clientError}</p>}
      </section>

      <hr />
      <section>
        <SubText>Entrega</SubText>
        <div>
          <DeliverySelect />
        </div>
      </section>

      <hr />
      <section>
        <SubText>Pedido</SubText>
        <div className="grid-2 pedido-section" style={{ padding: '10px' }}>
          {/* Passando "Arroz" como tipoSelecionado */}
          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={options}
              tipoSelecionado="Arroz"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>

          {/* Passando "Feijão" como tipoSelecionado */}
          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={options}
              tipoSelecionado="Feijão"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>

          {/* Passando "Massa" como tipoSelecionado */}
          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={options}
              tipoSelecionado="Massa"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>

          {/* Passando "Carne" como tipoSelecionado */}
          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={options}
              tipoSelecionado="Carne"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>
        </div>
      </section>
    </main>
  );
};


export default AddOrder;