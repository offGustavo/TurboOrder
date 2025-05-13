import React, { useState, useEffect } from "react";
import OrderCard from "../components/OrderCard";
//import "./../styles/Historico.css";

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
        if (minValue) params.append("minValue", minValue);
        if (maxValue) params.append("maxValue", maxValue);

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
      <h2>Histórico e Pesquisa de Pedidos</h2>
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="customerName">Nome do Cliente:</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Digite o nome do cliente"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="phone">Telefone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Digite o telefone"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="orderId">Código do Pedido (ID):</label>
          <input
            type="text"
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Digite o código do pedido"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="orderDate">Data do Pedido:</label>
          <input
            type="date"
            id="orderDate"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="orderStatus">Estado do Pedido:</label>
          <select
            id="orderStatus"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="minValue">Valor Mínimo:</label>
          <input
            type="number"
            id="minValue"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            placeholder="Valor mínimo"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="maxValue">Valor Máximo:</label>
          <input
            type="number"
            id="maxValue"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            placeholder="Valor máximo"
          />
        </div>
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