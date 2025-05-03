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


const TitlePedido = styled.h1`
  margin: 0px;
  font-size: 25px;
`;

const SubText = styled.h2`
  margin: 10px 0px 20px 0px;
  font-size: 16px;
`;

const ProductText = styled.h3`
  margin: 10px 0px 20px 0px;
  font-size: 14px;
font-weight: semi-bold;
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
  const [produtosSelecionados, setProdutosSelecionados] = useState({
    Arroz: null,
    Feijão: null,
    Carne: [],
    Massa: null,
    Acompanhamento: null,
    Salada: null,
  });

  function printPedido() {
    console.log("Cliente:", clientInfo);
    console.log("Produtos selecionados:");
    Object.entries(produtosSelecionados).forEach(([tipo, produto]) => {
      if (Array.isArray(produto)) {
        produto.forEach((p, i) =>
          console.log(`${tipo} ${i + 1}:`, p)
        );
      } else {
        console.log(`${tipo}:`, produto);
      }
    });
  }

  const handleProdutoSelecionado = (tipo, produto, index = 0) => {
    setProdutosSelecionados((prev) => {
      if (tipo === "Carne") {
        const novasCarnes = [...(prev.Carne || [])];
        novasCarnes[index] = produto;
        return {
          ...prev,
          Carne: novasCarnes,
        };
      }
      return {
        ...prev,
        [tipo]: produto,
      };
    });
  };

  useEffect(() => {
    fetch('http://localhost:8800/produtos')
      .then((res) => res.json())
      .then((data) => {
        console.log("Produtos recebidos:", data);
        setProdutos(data);
      })
      .catch((err) => console.error('Erro ao carregar produtos:', err));
  }, []);

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
          <DeliverySelect formData={clientInfo} setFormData={setClientInfo} />
        </div>
      </section>

      <hr />
      <section>
        <SubText>Pedido</SubText>
        <div className="grid-2 pedido-section" style={{ padding: '10px' }}>
          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={produtos}
              tipoSelecionado="Arroz"
              onChange={(value) => handleProdutoSelecionado("Arroz", value)}
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
              onChange={(value) => handleProdutoSelecionado("Feijão", value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>

          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={produtos}
              tipoSelecionado="Massa"
              onChange={(value) => handleProdutoSelecionado("Massa", value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>

          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={produtos}
              tipoSelecionado="Carne"
              onChange={(value) => handleProdutoSelecionado("Carne", value, 0)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>

          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={produtos}
              tipoSelecionado="Carne"
              onChange={(value) => handleProdutoSelecionado("Carne", value, 1)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>

          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={produtos}
              tipoSelecionado="Acompanhamento"
              onChange={(value) => handleProdutoSelecionado("Acompanhamento", value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>

          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            {/* <ProductText>Salada</ProductText> */}
            <ComboBox
              options={produtos}
              tipoSelecionado="Salada"
              onChange={(value) => handleProdutoSelecionado("Salada", value)}
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
