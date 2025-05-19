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
import axios from "axios";
import { useReactToPrint } from 'react-to-print';
import TicketOrder from "../components/TicketOrder";

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
  const [observacao, setObservacao] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  // const horarioFormatado = selectedTime?.format("HH:mm") || null;
  const ticketRef = useRef();

  const [selectedProducts, setSelectedProducts] = useState({
    Arroz: null,
    Feijão: null,
    Massa: null,
    Carne: null,
    Carne2: null,
    Salada: null,
    Acompanhamento: null
  });

  const [isTwoMeats, setIsTwoMeats] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const debounceTimeout = useRef(null);
  const componentRef = useRef();

  useEffect(() => {
    if (location.state && location.state.client) {
      setClientInfo(location.state.client);
      setPhoneInput(location.state.client.con_telefone || "");
    }
  }, [location.state]);

  useEffect(() => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      const sanitized = phoneInput.replace(/\D/g, '');
      if (sanitized.length >= 8) {
        fetchClientInfo(phoneInput);
      }
    }, 500);
  }, [phoneInput]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const today = new Date().toLocaleDateString('pt-br');
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

  const handleImprimir = () => {
    ticketRef.current?.print();
  };

  const handleProductChange = (tipo, produto) => {
    setSelectedProducts(prev => ({
      ...prev,
      [tipo]: produto,
    }));
  };

  const handleTwoMeatsChange = (event) => {
    setIsTwoMeats(event.target.checked);
    if (!event.target.checked) {
      setSelectedProducts(prev => ({ ...prev, Carne2: null }));
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (ticketData) {
      console.log("Imprimindo ticket:");
      console.log(JSON.stringify(ticketData, null, 2));
      const timer = setTimeout(() => {
        if (componentRef.current) {
          handlePrint();
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [ticketData]);

  const handleSubmitOrder = async () => {
    if (!clientInfo.cli_nome) {
      alert("Por favor, informe um cliente válido.");
      return;
    }

    if (!pagamento) {
      alert("Por favor, informe o tipo de pagamento.");
      return;
    }

    if (isTwoMeats) {
      if (!selectedProducts.Carne || !selectedProducts.Carne2) {
        alert("Por favor, selecione as duas carnes.");
        return;
      }
    }

    const itens = {
      arroz_fk: selectedProducts.Arroz?.pro_id || null,
      feijao_fk: selectedProducts.Feijão?.pro_id || null,
      massa_fk: selectedProducts.Massa?.pro_id || null,
      salada_fk: selectedProducts.Salada?.pro_id || null,
      acompanhamento_fk: selectedProducts.Acompanhamento?.pro_id || null,
      carne01_fk: selectedProducts.Carne?.pro_id || null,
      carne02_fk: isTwoMeats ? (selectedProducts.Carne2?.pro_id || null) : null,
    };

    //TODO: transformart esse valores em variaveis do banco de dados
    const ped_valor = isTwoMeats ? 22.00 : 20.00;

    // TODO: Criar funcionario
    const pedidoData = {
      cliente_fk: clientInfo.cli_id,
      funcionario_fk: 1,
      itens,
      ped_status: "Em Andamento",
      ped_valor,
      ped_data: new Date().toISOString().split('T')[0],
      ped_tipoPagamento: pagamento,
      ped_horarioRetirada: selectedTime?.format("HH:mm") || null,
      ped_observacao: observacao,
      ped_desativado: 0
    };

    try {
      const response = await axios.post("http://localhost:8800/pedidos", pedidoData);
      alert("Pedido cadastrado com sucesso!");
      const pedidoId = response.data.pedidoId;

      const ticketResponse = await axios.get(`http://localhost:8800/pedidos/${pedidoId}/ticket`);
      setTicketData(ticketResponse.data);

    } catch (error) {
      console.error("Erro ao cadastrar pedido:", error);
      console.log(pedidoData);
      alert("Erro ao cadastrar pedido.");
    }


    {/* <button onClick={handleImprimir}>Imprimir</button> */ }
    <TicketOrder ref={ticketRef} pedido={pedidoData} />

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
                "&.Mui-focused fieldset": { color: "#FD1F4A" },
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
                "&.Mui-focused fieldset": { color: "#FD1F4A" },
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
          <DeliverySelect
            formData={clientInfo}
            setFormData={setClientInfo}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
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
                    "&.Mui-focused fieldset": { color: "#FD1F4A" },
                  },
                }}
              />
            </Box>
          ))}

          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={options.filter((opt) => opt.pro_tipo === "Salada")}
              tipoSelecionado="Salada"
              onChange={(produto) => handleProductChange("Salada", produto)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { color: "#FD1F4A" },
                },
              }}
            />
          </Box>

          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={options.filter((opt) => opt.pro_tipo === "Acompanhamento")}
              tipoSelecionado="Acompanhamento"
              onChange={(produto) => handleProductChange("Acompanhamento", produto)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { color: "#FD1F4A" },
                },
              }}
            />
          </Box>

          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={options.filter((opt) => opt.pro_tipo === "Carne")}
              tipoSelecionado="Carne"
              onChange={(produto) => handleProductChange("Carne", produto)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { color: "#FD1F4A" },
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
                    "&.Mui-focused fieldset": { color: "#FD1F4A" },
                  },
                }}
              />
            </Box>
          )}
        </div>
      </section>

      <hr />
      <section>
        <SubText>
          Observações
        </SubText>

        <div style={{ display: "flex", gap: "20px" }}>
          <TextField
            id="ped_observacao"
            label="Observações"
            placeholder="Exemplo: Tirar Cebola, Molho à parte..."
            multiline
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
              "& .MuiInputBase-input": {
                color: "black",
              },
              width: "100%",
            }}
          />
        </div>

      </section>

      <hr />
      <section>
        <SubText>
          Pagamento
        </SubText>

        <div style={{ display: "flex", gap: "20px" }}>
          <TextField
            id="ped_tipoPagamento"
            label="Tipo de Pagamento"
            placeholder="Exemplo: Dinheiro, Cartão de Crédito, Pix..."
            value={pagamento}
            onChange={(e) => setPagamento(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
              "& .MuiInputBase-input": {
                color: "black",
              },
              width: "100%",
            }}
          />
        </div>

      </section>


    </main>
  );
};

export default AddOrder;
