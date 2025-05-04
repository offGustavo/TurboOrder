import React from 'react';
import { FaPen } from "react-icons/fa";
import '../styles/OrderCard.css';

const OrderCard = ({ id, name, details, status, data }) => {
  const statusClass = status.toLowerCase().replace(' ', '-');
  
  return (
    <div className="order-card">
      <div className="order-header">
        <div>
          <span className={`order-id`}>Id: {id}</span>
          <span className={`status-tag ${statusClass}`}>{status}</span>
        </div>
        <span className="order-date">{data}</span>
      </div>
      <p className="customer-name">{name}</p>
      <p className="order-details">{details}</p>
      <hr />
      <button className="edit-btn"><FaPen /> Editar</button>
    </div>
  );
};

export default OrderCard;