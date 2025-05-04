import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import DeliverySelect from "../components/DeliverySelect.js";
import "../styles/AddOrder.css";
import "../styles/Global.css";
import { Box, TextField, FormControlLabel, Checkbox } from '@mui/material';
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

  const [options, setOptions] = useState([]);
  const [clientInfo, setClientInfo] = useState({
    cli_nome: "",
    cli_sobrenome: "",
    con_telefone: "",
  });
  const [phoneInput, setPhoneInput] = useState("");
  const [loadingClient, setLoadingClient] = useState(false);
  const [clientError, setClientError] = useState(null);
  const [phoneOptions, setPhoneOptions] = useState([]);

  // State to hold selected products by category
  const [selectedProducts, setSelectedProducts] = useState({
    Arroz: null,
    Feijão: null,
    Massa: null,
    Carne: null,
    Carne2: null,
  });

  // State to track if user wants two meats
  const [isTwoMeats, setIsTwoMeats] = useState(false);

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

  useEffect(() => {
    // Fetch products for today's menu from backend
    const fetchProducts = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await axios.get(`http://localhost:8800/cardapio?data=${today}`);
        setOptions(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos do cardápio:", error);
      }
    };
    fetchProducts();
  }, []);

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

  // Handle product selection change
  const handleProductChange = (tipo, produto) => {
    console.log("Produto selecionado para", tipo, ":", produto);
    setSelectedProducts(prev => ({
      ...prev,
      [tipo]: produto,
    }));
  };

  // Handle checkbox change for two meats
  const handleTwoMeatsChange = (event) => {
    setIsTwoMeats(event.target.checked);
    if (!event.target.checked) {
      // Clear second meat selection if unchecked
      setSelectedProducts(prev => ({ ...prev, Carne2: null }));
    }
  };

  // Submit order to backend
  const handleSubmitOrder = async () => {
    console.log("SelectedProducts at submit:", selectedProducts);
    if (!clientInfo.cli_nome) {
      alert("Por favor, informe um cliente válido.");
      return;
    }

    // Validate meat selection based on isTwoMeats
    if (isTwoMeats) {
      if (!selectedProducts.Carne || !selectedProducts.Carne2) {
        alert("Por favor, selecione as duas carnes.");
        return;
      }
    } else {
      if (!selectedProducts.Carne) {
        alert("Por favor, selecione uma carne.");
        return;
      }
    }

    // Map selected products to the expected backend keys
    const itens = {
      arroz_fk: selectedProducts.Arroz ? selectedProducts.Arroz.pro_id : null,
      feijao_fk: selectedProducts.Feijão ? selectedProducts.Feijão.pro_id : null,
      massa_fk: selectedProducts.Massa ? selectedProducts.Massa.pro_id : null,
      salada_fk: null, // Add if needed
      acompanhamento_fk: null, // Add if needed
      carne01_fk: selectedProducts.Carne ? selectedProducts.Carne.pro_id : null,
      carne02_fk: isTwoMeats && selectedProducts.Carne2 ? selectedProducts.Carne2.pro_id : null,
    };

    // Set order value based on meat quantity
    const ped_valor = isTwoMeats ? 22.00 : 20.00;

    const pedidoData = {
      cliente_fk: clientInfo.cli_id,
      funcionario_fk: 1, // Hardcoded for now, adjust as needed
      itens,
      ped_status: 1, // Status inicial, e.g., 1 = em andamento
      ped_valor,
      ped_data: new Date().toISOString().split('T')[0],
      ped_tipoPagamento: "Dinheiro", // Adjust as needed
    };

    try {
      const response = await axios.post("http://localhost:8800/pedidos", pedidoData);
      alert("Pedido cadastrado com sucesso!");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao cadastrar pedido:", error);
      alert("Erro ao cadastrar pedido.");
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
          <button onClick={handleSubmitOrder} className="btn-add">Finalizar</button>
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
        <FormControlLabel
          control={<Checkbox checked={isTwoMeats} onChange={handleTwoMeatsChange} />}
          label="Deseja duas carnes?"
        />
        <div className="grid-2 pedido-section" style={{ padding: '10px' }}>
          {["Arroz", "Feijão", "Massa"].map((tipo) => (
            <Box key={tipo} sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
              <ComboBox
                options={options.filter((opt) => opt.pro_tipo === tipo)}
                tipoSelecionado={tipo}
                onChange={(produto) => handleProductChange(tipo, produto)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#FD1F4A" },
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                  },
                }}
              />
            </Box>
          ))}
          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={options.filter((opt) => opt.pro_tipo === "Carne")}
              tipoSelecionado="Carne"
              onChange={(produto) => handleProductChange("Carne", produto)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>
          {isTwoMeats && (
            <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
              <ComboBox
                options={options.filter((opt) => opt.pro_tipo === "Carne")}
                tipoSelecionado="Carne"
                onChange={(produto) => handleProductChange("Carne2", produto)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#FD1F4A" },
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                  },
                }}
              />
            </Box>
          )}
        </div>
      </section>
    </main>
  );
};

export default AddOrder;
