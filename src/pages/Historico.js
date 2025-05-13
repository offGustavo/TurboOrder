import React, { useState, useEffect } from "react";
import OrderCard from "../components/OrderCard";
import { Box, TextField } from "@mui/material";
import "./../styles/Historico.css";

const Historico = () => {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (customerName) params.append("customerName", customerName);
        if (phone) params.append("phone", phone);
        if (orderId) params.append("id", orderId);
        if (orderDate) params.append("orderDate", orderDate);
        if (orderStatus) params.append("status", orderStatus);
        // if (minValue) params.append("minValue", minValue);
        // if (maxValue) params.append("maxValue", maxValue);

        const response = await fetch(`http://localhost:8800/pedidos?${params.toString()}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar pedidos");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerName, phone, orderId, orderDate, orderStatus, minValue, maxValue]);

  return (
    <div className="historico-container">
      <h2 className="title">Histórico e Pesquisa de Pedidos</h2>
      <div className="filters">
        <Box className="filters" display="flex" flexWrap="wrap" gap={2} mb={3}>
          <TextField
            label="Nome do Cliente"
            variant="outlined"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Digite o nome do cliente"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
              "& .MuiInputBase-input": {
                color: "black",
              },
              width: "25ch",
            }}
          />

          <TextField
            label="Telefone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Digite o telefone"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
              "& .MuiInputBase-input": {
                color: "black",
              },
              width: "20ch",
            }}
          />

          <TextField
            label="Código do Pedido (ID)"
            variant="outlined"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Digite o código do pedido"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
              "& .MuiInputBase-input": {
                color: "black",
              },
              width: "20ch",
            }}
          />

          <TextField
            label="Data do Pedido"
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
              "& .MuiInputBase-input": {
                color: "black",
              },
              width: "20ch",
            }}
          />

          <TextField
            label="Status do Pedido"
            variant="outlined"
            select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
              "& .MuiInputBase-input": {
                color: "black",
              },
              width: "22ch",
            }}
          >
            <option value="">Todos</option>
            <option value="0">Em andamento</option>
            <option value="1">Concluído</option>
            <option value="2">Cancelado</option>
          </TextField>

          <TextField
            label="Valor Mínimo"
            variant="outlined"
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
              "& .MuiInputBase-input": {
                color: "black",
              },
              width: "15ch",
            }}
          />

          <TextField
            label="Valor Máximo"
            variant="outlined"
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
              "& .MuiInputBase-input": {
                color: "black",
              },
              width: "15ch",
            }}
          />
        </Box>
      </div>

      {loading ? (
        <p>Carregando pedidos...</p>
      ) : orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <OrderCard
              key={order.ped_id}
              id={order.ped_id}
              name={`${order.cli_nome} ${order.cli_sobrenome}`}
              details={`Funcionário: ${order.fun_nome} - Tipo Pagamento: ${order.ped_tipoPagamento}`}
              status={order.ped_status}
              data={new Date(order.ped_data).toLocaleDateString()}
            />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>Nenhum pedido encontrado.</p>
      )}
    </div>
  );
};

export default Historico;
