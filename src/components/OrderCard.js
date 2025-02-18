import React from 'react';
import './../styles/OrderCard.css';
import { NavLink } from "react-router-dom";
import { FaPen } from "react-icons/fa6";

const OrderCard = ({ id, name, details, status, data }) => {
  const getStatusClass = (status) => {
    if (status === 'Em andamento') return '#FFBD0D';
    if (status === 'Concluído') return '#24DF8E';
    if (status === 'Cancelado') return '#FD1F4A';
    return '';
  };

  const createPedido = () => {
    console.log("Pedido criado");
  };

  return (
    <div className="order-card">
      <div className="orderDetails">
        <p className="idCard">Id: <strong>{id}</strong></p>
        <p style={{ backgroundColor: getStatusClass(status), padding: '5px 15px', borderRadius: '30px', fontWeight: 'bold', fontSize: '12px' }}>
          {status}
        </p>
      </div>
      <p><strong>{name}</strong></p>
      <p>{details}</p>
      <hr />
      <div className="infoOrder">
        <p>{data}</p>
        <NavLink to="/" activeClassName="active">
          <button className="edit-btn" onClick={createPedido}>
            <FaPen /> Editar
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default OrderCard;