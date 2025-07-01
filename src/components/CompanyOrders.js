// components/OrdersPopup.js
import React from 'react';
import '../styles/CompanyOrders.css';

const CompanyOrders = ({ onClose, orders, totalOrders }) => {
  // Função para calcular o valor total de todos os pedidos
  const calculateTotalValue = () => {
    return orders.reduce((total, pedido) => total + (pedido.ite_valor || 0), 0);
  };

  return (
    <div className="orders-popup-overlay">
      <div className="orders-popup-container">
        <div className="orders-popup-header">
          <h2>Pedidos do Mês</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="orders-summary">
          <p><strong>Total de Pedidos:</strong> {totalOrders}</p>
          <p><strong>Valor Total:</strong> R$ {calculateTotalValue().toFixed(2)}</p>
        </div>

        <div className="orders-list-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Cliente</th>
                <th>Funcionário</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((pedido) => (
                <tr key={pedido.ped_id}>
                  <td>{pedido.ped_id}</td>
                  <td>{new Date(pedido.ped_data).toLocaleDateString()}</td>
                  <td>{pedido.cli_nome} {pedido.cli_sobrenome}</td>
                  <td>{pedido.fun_nome}</td>
                  <td>R$ {pedido.ite_valor?.toFixed(2) || '0.00'}</td>
                  <td>{pedido.ped_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="orders-popup-footer">
          <button onClick={onClose} className="close-button">Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default CompanyOrders;
