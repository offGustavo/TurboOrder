import React, { useState, useEffect } from 'react';
import OrderCard from './../components/OrderCard';
import './../styles/Dashboard.css';
import styled from 'styled-components';
import { FaDollarSign, FaMoneyBillTransfer } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterComponent from '../components/FilterComponent.js';
import axios from 'axios';
// import FilterComponent from '../components/FilterComponent';

const DolarGreen = styled(FaDollarSign)`
  font-size: 1.59rem;
  background-color: #098A52;
  color: #ffffff;
  border-radius: 50%;
  padding: 10px;
`;

const DolarRed = styled(FaDollarSign)`
  font-size: 1.59rem;
  background-color: #B50A2B;
  color: #ffffff;
  border-radius: 50%;
  padding: 10px;
`;

const Statistic = styled.p`
  color: #000000;
  font-size: 1rem;
  font-weight: bold;
  padding: 0px;
  margin: 0px;
`;

const AmountGreen = styled.p`
  color: #098A52;
  font-size: 1rem;
  font-weight: bold;
  padding: 0px;
  margin: 0px;
`;

const AmountRed = styled.p`
  color: #B50A2B;
  font-size: 1rem;
  font-weight: bold;
  padding: 0px;
  margin: 0px;
`;

const TransferGreen = styled(FaMoneyBillTransfer)`
  font-size: 2.19rem;
  color: #1DAD6F;
`;

const TransferRed = styled(FaMoneyBillTransfer)`
  font-size: 2.19rem;
  color: #FD1F4A;
`;

const productTypes = [
  { value: "Em andamento", label: "Em andamento" },
  { value: "Concluído", label: "Concluído" },
  { value: "Cancelado", label: "Cancelado" },
];

const Dashboard = () => {
  const [filter, setFilter] = useState('Tudo');
  const [orders, setOrders] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [dailyAverage, setDailyAverage] = useState(0);
  const [monthlyAverage, setMonthlyAverage] = useState(0);

  useEffect(() => {
    const fetchOrdersAndProducts = async () => {
      try {
        const [ordersResponse, productsResponse] = await Promise.all([
          axios.get('http://localhost:8800/pedidos'),
          axios.get('http://localhost:8800/produtos')
        ]);

        const productsMap = productsResponse.data.reduce((acc, product) => {
          acc[product.pro_id] = product.pro_nome;
          return acc;
        }, {});

        const today = new Date();
        const isSameDay = (date1, date2) =>
          date1.getDate() === date2.getDate() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getFullYear() === date2.getFullYear();

        const ordersData = ordersResponse.data;

        const filteredOrdersData = ordersData.filter(order => {
          const orderDate = new Date(order.ped_data);
          return isSameDay(orderDate, today) && order.ped_status === "Em Andamento";
        });

        const mappedOrders = filteredOrdersData.map(order => {
          const productNames = [];

          if (order.arroz_fk) productNames.push(productsMap[order.arroz_fk]);
          if (order.feijao_fk) productNames.push(productsMap[order.feijao_fk]);
          if (order.massa_fk) productNames.push(productsMap[order.massa_fk]);
          if (order.carne01_fk) productNames.push(productsMap[order.carne01_fk]);
          if (order.carne02_fk) productNames.push(productsMap[order.carne02_fk]);

          const productsText = productNames.join(', ');

          return {
            id: order.ped_id,
            name: `${order.cli_nome} ${order.cli_sobrenome}`,
            details: productsText,
            status: order.ped_status,
            data: new Date(order.ped_data).toLocaleDateString('pt-BR'),
            valor: order.ped_valor,
            day_order: order.ped_ordem_dia
          };
        });

        setOrders(mappedOrders);

        //FIXME: Modificar forma que está puxando do mês
        // Calcular faturamento e média do dia com os pedidos filtrados
        const dailySum = filteredOrdersData.reduce((sum, order) => sum + parseFloat(order.ped_valor), 0);
        const dailyCount = filteredOrdersData.length;
        setDailyRevenue(dailySum);
        setDailyAverage(dailyCount > 0 ? dailySum / dailyCount : 0);

        // Como os pedidos do mês completo não são mais usados, zeramos
        setMonthlyRevenue(0);
        setMonthlyAverage(0);

      } catch (error) {
        console.error("Erro ao buscar pedidos e produtos:", error);
        toast.error("Erro ao buscar dados do dashboard.");
      }
    };

    fetchOrdersAndProducts();
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter === 'Tudo') return true;
    return order.status === filter;
  });

  return (
    <main className="dashboard">
      <div className="revenue-section">
        <div className="header-card card-green">
          <div className="revenue-header revenue-green">
            <DolarGreen />
            <div className="revenue-info">
              <h3>Faturamento de Hoje</h3>
              <p>R$ {dailyRevenue.toFixed(2)}</p>
            </div>
          </div>
          <div className="revenue-transfer">
            <div className="vertical-divider"></div>
            <TransferGreen />
            <div className="transfer-details">
              <Statistic>Média Estatística</Statistic>
              <AmountGreen>R$ {dailyAverage.toFixed(2)}</AmountGreen>
            </div>
          </div>
        </div>

        <div className="header-card card-red">
          <div className="revenue-header revenue-red">
            <DolarRed />
            <div className="revenue-info">
              <h3>Faturamento deste Mês</h3>
              <p>R$ {monthlyRevenue.toFixed(2)}</p>
            </div>
          </div>
          <div className="revenue-transfer">
            <div className="vertical-divider"></div>
            <TransferRed />
            <div className="transfer-details">
              <Statistic>Média Estatística do mês</Statistic>
              <AmountRed>R$ {monthlyAverage.toFixed(2)}</AmountRed>
            </div>
          </div>
        </div>
      </div>

      <section className="orders">
        <h2>Pedidos</h2>

        <FilterComponent
          filterState={filter}
          setFilter={setFilter}
          filterItens={productTypes}
        />

        <div className="order-cards">
          {filteredOrders.map(order => (
            <OrderCard key={order.id} {...order} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
