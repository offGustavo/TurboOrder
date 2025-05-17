import React from 'react';
import { FaPen } from "react-icons/fa";
import '../styles/OrderCard.css';

const OrderCard = ({ id, name, details, status, data, day_order }) => {
  const statusText = status || "Desconhecido";
  const statusClass = statusText.toLowerCase().replace(/\s/g, '-');

  const handleStatus = () => {
    console.log(id, name);
  };

  return (
    <div className="order-card">
      <div className="order-header">
        <div>
          <span className={`order-id`}>Id: {id}</span>
          <button className={`status-tag ${statusClass}`} onClick={handleStatus}>
            {statusText}
          </button>
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
