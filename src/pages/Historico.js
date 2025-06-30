import React, { useState, useEffect } from "react";
import OrderCard from "../components/OrderCard";
import { Box, TextField, MenuItem } from "@mui/material";
import "./../styles/Historico.css";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { jwtDecode } from "jwt-decode";
import { InputAdornment, IconButton } from '@mui/material';
import { MdClear } from 'react-icons/md';

const Historico = () => {
  const [customerName, setCustomerName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [valor, setValor] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };
  const token = getCookie("token");
  let funcionario_fk = null;
  if (token) {
    const decoded = jwtDecode(token);
    funcionario_fk = decoded.fun_id || null;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (customerName) params.append("customerName", customerName);
        if (orderDate) params.append("orderDate", orderDate);
        if (orderStatus) params.append("status", orderStatus);
        if (valor) params.append("valor", valor);

        const response = await fetch(`http://localhost:8800/pedidos/filtred?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        });

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
  }, [customerName, orderDate, orderStatus, valor]);

  return (
    <div className="historico-container">
      <h2 className="title">Histórico de Pedidos</h2>
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

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <DatePicker
              label="Data do Pedido"
              value={orderDate ? dayjs(orderDate) : null}
              onChange={(newValue) =>
                setOrderDate(newValue ? newValue.format("YYYY-MM-DD") : null)
              }
              slotProps={{
                textField: {
                  variant: "outlined",
                  sx: {
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#FD1F4A" },
                      "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                    },
                    "& .MuiInputBase-input": {
                      color: "black",
                    },
                    width: "20ch",
                  },
                  InputProps: orderDate
                    ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setOrderDate(null)}
                            edge="end"
                            size="small"
                          >
                            <MdClear />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                    : {},
                },
              }}
            />
          </LocalizationProvider>

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
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Em Andamento">Em andamento</MenuItem>
            <MenuItem value="Concluído">Concluído</MenuItem>
            <MenuItem value="Cancelado">Cancelado</MenuItem>
          </TextField>

          <TextField
            label="Valor"
            variant="outlined"
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
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
              data={dayjs(order.ped_data).format("DD/MM/YYYY")}
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
