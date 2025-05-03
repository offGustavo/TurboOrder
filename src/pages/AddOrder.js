import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import DeliverySelect from "../components/DeliverySelect.js";
import "../styles/AddOrder.css";
import "../styles/Global.css";
import { Box, TextField } from '@mui/material';
import InputMask from "react-input-mask";
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
  const location = useLocation();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8800/produtos')
      .then((res) => res.json())
      .then((data) => {
        console.log("Produtos recebidos:", data);
        setProdutos(data);
      })
      .catch((err) => console.error('Erro ao carregar produtos:', err));
  }, []);

  // const options = [
  //   { id: 1, nome: "Arroz Soltinho", tipo: "Arroz" },
  //   { id: 2, nome: "Arroz Integral", tipo: "Arroz" },
  //   { id: 3, nome: "Arroz Jasmim", tipo: "Arroz" },
  //   { id: 4, nome: "Arroz Negro", tipo: "Arroz" },
  //   { id: 5, nome: "Arroz Vermelho", tipo: "Arroz" },
  //   { id: 6, nome: "Feijão Preto", tipo: "Feijão" },
  //   { id: 7, nome: "Feijão Carioca", tipo: "Feijão" },
  //   { id: 8, nome: "Feijão Feijoada", tipo: "Feijão" },
  //   { id: 9, nome: "Feijão Tropeiro", tipo: "Feijão" },
  //   { id: 10, nome: "Feijão Tutu", tipo: "Feijão" },
  //   { id: 11, nome: "Massa Espaguete", tipo: "Massa" },
  //   { id: 12, nome: "Massa Talharim", tipo: "Massa" },
  //   { id: 13, nome: "Massa Penne", tipo: "Massa" },
  //   { id: 14, nome: "Massa Ravioli", tipo: "Massa" },
  //   { id: 15, nome: "Massa Fusilli", tipo: "Massa" },
  //   { id: 16, nome: "Salada Caesar", tipo: "Salada" },
  //   { id: 17, nome: "Salada Tropical", tipo: "Salada" },
  //   { id: 18, nome: "Salada Caprese", tipo: "Salada" },
  //   { id: 19, nome: "Salada Verde", tipo: "Salada" },
  //   { id: 20, nome: "Salada De Frutas", tipo: "Salada" },
  //   { id: 21, nome: "Acompanhamento Batata Frita", tipo: "Acompanhamento" },
  //   { id: 22, nome: "Acompanhamento Purê de Batata", tipo: "Acompanhamento" },
  //   { id: 23, nome: "Acompanhamento Farofa", tipo: "Acompanhamento" },
  //   { id: 24, nome: "Acompanhamento Vinagrete", tipo: "Acompanhamento" },
  //   { id: 25, nome: "Acompanhamento Legumes Salteados", tipo: "Acompanhamento" },
  //   { id: 26, nome: "Carne Bife", tipo: "Carne" },
  //   { id: 27, nome: "Carne Frango Grelhado", tipo: "Carne" },
  //   { id: 28, nome: "Carne Costela", tipo: "Carne" },
  //   { id: 29, nome: "Carne Picanha", tipo: "Carne" },
  //   { id: 30, nome: "Carne Carne Moída", tipo: "Carne" }
  // ];

  const [clientInfo, setClientInfo] = useState({
    cli_nome: "",
    cli_sobrenome: "",
    con_telefone: "",
  });
  const [phoneInput, setPhoneInput] = useState("");
  const [loadingClient, setLoadingClient] = useState(false);
  const [clientError, setClientError] = useState(null);
  const [phoneOptions, setPhoneOptions] = useState([]);

  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (location.state && location.state.client) {
      setClientInfo(location.state.client);
      setPhoneInput(location.state.client.con_telefone || "");
    }
  }, [location.state]);

  useEffect(() => {
    const sanitizedPhone = phoneInput.replace(/\D/g, '');
    if (sanitizedPhone.length >= 8) {
      fetchClientInfo(phoneInput);
    }
  }, [phoneInput]);



  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setPhoneInput(value);
    setClientError(null);
  };

  const fetchPhoneSuggestions = async (partialPhone) => {
    try {
      const response = await axios.get(`http://localhost:8800/clientes/telefone-sugestoes/${partialPhone}`);
      setPhoneOptions(response.data);
    } catch (error) {
      setPhoneOptions([]);
    }
  };

  const fetchClientInfo = async (phone) => {
    if (!phone || phone.length < 8) {
      setClientInfo({
        cli_nome: "",
        cli_sobrenome: "",
        con_telefone: phone || "",
      });
      return;
    }
    setLoadingClient(true);
    try {
      // Sanitize phone by removing non-digit characters before sending in URL
      const sanitizedPhone = phone.replace(/\D/g, '');
      const response = await axios.get(`http://localhost:8800/clientes/telefone/${sanitizedPhone}`);
      setClientInfo(response.data);
      setClientError(null);
      setPhoneInput(response.data.con_telefone || "");
    } catch (error) {
      setClientInfo({
        cli_nome: "",
        cli_sobrenome: "",
        con_telefone: phone || "",
      });
      setClientError("Cliente não encontrado");
      setPhoneInput(phone || "");
    } finally {
      setLoadingClient(false);
    }
  };

  const handlePhoneSelect = (event, value) => {
    if (value && value !== phoneInput) {
      setPhoneInput(value);
      fetchClientInfo(value);
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


        <Box sx={{ width: "40ch", margin: "30px 0 10px 0" }}>
          <InputMask
            mask="(99) 99999-9999"
            value={phoneInput}
            onChange={handlePhoneChange}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                label="Telefone"
                variant="outlined"
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
            )}
          </InputMask>
        </Box>
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
              options={produtos}
              tipoSelecionado="Arroz"
              onChange={(value) => console.log("Selecionado:", value)}
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
              options={produtos}
              tipoSelecionado="Feijão"
              onChange={(value) => console.log("Selecionado:", value)}
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
              options={produtos}
              tipoSelecionado="Carne"
              onChange={(value) => console.log("Selecionado:", value)}
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
              options={produtos}
              tipoSelecionado="Carne"
              onChange={(value) => console.log("Selecionado:", value)}
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
