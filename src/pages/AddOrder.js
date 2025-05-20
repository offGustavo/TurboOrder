import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import DeliverySelect from "../components/DeliverySelect.js";
import "../styles/AddOrder.css";
import "../styles/Global.css";
import { Box, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';
import InputMask from "react-input-mask";
import ComboBox from "../components/ComboBox.js";
import ProgressBar from "../components/ProgressBar.js";
import axios from "axios";
import { toast } from 'react-toastify';

import {
  Printer,
  Print,
  Text,
  Row,
  Line,
  Br,
  Cut,
  Barcode,
  QRCode,
  Image,
  render,
} from "react-thermal-printer";

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
    cli_numero: "",
    cli_complemento: "",
    end_cep: "",
    end_cidade: "",
    end_bairro: "",
    end_rua: ""
  });
  const [phoneInput, setPhoneInput] = useState("");
  const [loadingClient, setLoadingClient] = useState(false);
  const [clientError, setClientError] = useState(null);
  const [phoneOptions, setPhoneOptions] = useState([]);
  const [observacao, setObservacao] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  // const horarioFormatado = selectedTime?.format("HH:mm") || null;

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
  const debounceTimeout = useRef(null);

  const printerRef = useRef(null);

  const handlePrint = async () => {
    if (!clientInfo.cli_nome) {
      alert("Por favor, informe um cliente válido para imprimir.");
      return;
    }

    const receipt = (
      <Printer type="epson">
        <Text size={{ width: 2, height: 2 }} bold>
          Pedido
        </Text>
        <Br />
        <Line />
        <Text>Cliente: {clientInfo.cli_nome} {clientInfo.cli_sobrenome}</Text>
        <Text>Telefone: {clientInfo.con_telefone}</Text>
        <Text> Endereço: {clientInfo.end_rua},  {clientInfo.cli_numero} {clientInfo.cli_complemento} - {clientInfo.end_bairro}, {clientInfo.end_cidade} - CEP: {clientInfo.end_cep} </Text>
        {/* FIXME: Fix pagamento calculo */}
        <Text>Pagamento: {isTwoMeats ? 22.00 : 20.00}, Tipo: {pagamento}</Text>
        <Text>Observações: {observacao}</Text>
        <Text>Produtos:</Text>
        {Object.entries(selectedProducts).map(([key, product]) =>
          product ? <Text key={key}>- {key}: {product.pro_nome}</Text> : null
        )}
        {selectedTime && (
          <Text>Retirada: {selectedTime.format("HH:mm")}</Text>
        )}
        <Cut />
      </Printer>
    );

    try {
      const data = await render(receipt);
      const port = await window.navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      const writer = port.writable?.getWriter();
      if (writer) {
        await writer.write(data);
        writer.releaseLock();
      }
    } catch (error) {
      alert("Erro ao imprimir o pedido: " + error.message);
      console.error(error);
    }
  };

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
    // Se o telefone for inválido ou muito curto, limpa apenas o nome/sobrenome e mantém o telefone no estado
    if (!phone || phone.length < 8) {
      setClientInfo({
        cli_nome: "",
        cli_sobrenome: "",
        con_telefone: phone || "",
        cli_numero: "",
        cli_complemento: "",
        end_cep: "",
        end_cidade: "",
        end_bairro: "",
        end_rua: ""
      });
      return;
    }

    setLoadingClient(true);
    try {
      const sanitizedPhone = phone.replace(/\D/g, "");
      const response = await axios.get(
        `http://localhost:8800/clientes/telefone/${sanitizedPhone}`
      );

      // Cliente encontrado: preenche todos os campos retornados pelo backend
      setClientInfo(response.data);
      console.log(response.data);
      setClientError(null);
      setPhoneInput(response.data.con_telefone || "");
    } catch (error) {
      // Se o servidor respondeu 404 => cliente não existe
      if (error.response && error.response.status === 404) {
        setClientInfo({
          cli_nome: "",
          cli_sobrenome: "",
          con_telefone: phone || "",
          cli_numero: "",
          cli_complemento: "",
          end_cep: "",
          end_cidade: "",
          end_bairro: "",
          end_rua: ""
        });
        setClientError("Cliente não encontrado");
      } else {
        // Qualquer outro erro de requisição
        setClientError("Erro ao buscar cliente");
      }
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
    if (!clientInfo.cli_nome) {
      toast.error("Por favor, informe um cliente válido.");
      return;
    }

    if (!pagamento) {
      toast.error("Por favor, informe o tipo de pagamento.");
      return;
    }

    if (isTwoMeats) {
      if (!selectedProducts.Carne || !selectedProducts.Carne2) {
        toast.error("Por favor, selecione as duas carnes.");
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
      toast.success("Pedido cadastrado com sucesso!");
      // handlePrint();
      console.log(response.data);

      // → Limpar todos os inputs após criar o pedido
      setClientInfo({
        cli_nome: "",
        cli_sobrenome: "",
        con_telefone: "",
      });
      setPhoneInput("");
      setClientError(null);
      //FIX: não está limpando as escolhas
      setSelectedProducts({
        Arroz: null,
        Feijão: null,
        Massa: null,
        Carne: null,
        Carne2: null,
        Salada: null,
        Acompanhamento: null
      });
      setIsTwoMeats(false);
      setObservacao("");
      setPagamento("");
      setSelectedTime(null);
      setPhoneOptions([]);


    } catch (error) {
      console.error("Erro ao cadastrar pedido:", error);
      toast.error("Erro ao cadastrar pedido.");
    }
    console.log(pedidoData);
  };


  return (
    <main className="p-10 ContainerPedido">
      <header className="display-flex space-between ">
        <TitlePedido>Cadastro De Pedidos</TitlePedido>
        <div className="display-flex">
          <NavLink to="/cadastro-de-cliente">
            <AlreadyRegistered>Cliente não cadastrado</AlreadyRegistered>
          </NavLink>
          {/* <button onClick={handleSubmitOrder} className="btn-add">Finalizar</button> */}
          {/* <Button variant="outlined" color="primary" onClick={handlePrint} sx={{ marginLeft: 2 }}> */}
          {/*   Imprimir Pedido */}
          {/* </Button> */}
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
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
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
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
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
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
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

      <hr />
      <footer>
        <button onClick={handleSubmitOrder} className="btn-add">Finalizar</button>
      </footer>

    </main>
  );
};

export default AddOrder;
