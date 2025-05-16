import React from 'react';
import { FaPen } from "react-icons/fa";
import '../styles/OrderCard.css';

const OrderCard = ({ id, name, details, status, data, day_order }) => {
  const statusMap = {
    0: "Em andamento",
    1: "Concluído",
    2: "Cancelado"
  };

  // let day_order = 11;

  const statusText = typeof status === 'string' ? status : statusMap[status] || "Desconhecido";
  const statusClass = statusText.toLowerCase().replace(' ', '-');

  return (
    <div className="order-card">
      <div className="order-header">
        <div>
          <span className={`order-id`}>Id: {id}</span>
          <span className={`status-tag ${statusClass}`}>{statusText}</span> {/* Aqui, use statusText */}
        </div>
        <div className='order-date-day'>
          <span className="order-date">{data}</span>
          <div className='order-day-order'><span>{day_order}</span></div>
        </div>
      </div>
      <p className="customer-name">{name}</p>
      <p className="order-details">{details}</p>
      <hr />
      <button className="edit-btn"><FaPen /> Editar</button>
    </div>
  );
};

export default OrderCard;
