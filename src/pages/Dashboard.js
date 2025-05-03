import React, { useState } from 'react';
import OrderCard from './../components/OrderCard';
import './../styles/Dashboard.css';
import styled from 'styled-components';
import { FaDollarSign, FaMoneyBillTransfer } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterComponent from '../components/FilterComponent';

const DolarGreen = styled(FaDollarSign)`
  font-size: 60px;
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

const orders = [
  { id: '#0023', name: 'Ana Silva', details: 'Frango grelhado, arroz integral, brócolis e salada de cenoura.', status: 'Em andamento', data: '15-03-2024' },
  { id: '#0022', name: 'João Oliveira', details: 'Arroz com carreteiro, salada de repolho e feijão tropeiro.', status: 'Em andamento', data: '15-03-2024' },
  { id: '#0020', name: 'Carlos Santos', details: 'Estrogonofe de carne, arroz e batata palha.', status: 'Concluído', data: '15-03-2024' },
  { id: '#0019', name: 'Julia Almeida', details: 'Costela assada, purê de mandioquinha e salada de rúcula.', status: 'Cancelado', data: '15-03-2024' },
  { id: '#0079', name: 'Julia Almeida', details: 'Costela assada, purê de mandioquinha e salada de rúcula.', status: 'Cancelado', data: '15-03-2024' },
];

const productTypes = [
  { value: "Em andamento", label: "Em andamento" },
  { value: "Concluído", label: "Concluído" },
  { value: "Cancelado", label: "Cancelado" },
];

const Dashboard = () => {
  const [filter, setFilter] = useState('Tudo');

  const filteredOrders = orders.filter(order => {
    if (filter === 'Tudo') return true;
    return order.status === filter;
  });

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="dashboard">
      <div className="revenue-section">
        <div className="header-card card-green">
          <div className="revenue-header revenue-green">
            <DolarGreen />
            <div className="revenue-info">
              {/* TODO: Modificar de faturamento para receita */}
              <h3>Faturamento de Hoje</h3>
              <p>R$ 460,00</p>
            </div>
          </div>

          <div className="revenue-transfer">
            <div className="vertical-divider"></div>
            <TransferGreen />

            <div className="transfer-details">
              <Statistic>Média Estatística</Statistic>
              <AmountGreen>R$ 21,90</AmountGreen>
            </div>
          </div>
        </div>

        <div className="header-card card-red">
          <div className="revenue-header revenue-red">
            <DolarRed />
            <div className="revenue-info">
              <h3>Faturamento deste Mês</h3>
              <p>R$ 6.900,00</p>
            </div>
          </div>

          <div className="revenue-transfer">
            <div className="vertical-divider"></div>
            <TransferRed />

            <div className="transfer-details">
              <Statistic>Média Estatística do mês</Statistic>
              <AmountRed>R$ 130,00</AmountRed>
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
