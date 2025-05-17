import React from 'react';
import './../styles/OrderCard.css';
import { NavLink } from "react-router-dom";
import { FaPen } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderCard = ({ id, name, details, status, data }) => {
  const getStatusClass = (status) => {
    if (status === 'Em andamento') return '#FFBD0D';
    if (status === 'Concluído') return '#24DF8E';
    if (status === 'Cancelado') return '#FD1F4A';
    return '';
  };

  const editarPedido = () => {
    console.log("Editandm Pedido");
  };

  const changeStatus = () => {
    console.log("changeStatus")
    toast.success("Produto atualizado com sucesso!");
  };

  return (
    <div className="order-card">
      <div className="orderDetails">
        <p className="idCard">Id: <strong>{id}</strong></p>
        <button onClick={changeStatus} style={{ backgroundColor: getStatusClass(status), padding: '5px 15px', borderRadius: '30px', fontWeight: 'bold', fontSize: '12px' }}>
          {status}
        </button>
      </div>
      <p className="customer-name">{name}</p>
      <p className="order-details">{details}</p>
      <hr />
      <button className="edit-btn"><FaPen /> Editar</button>
    </div>
  );
};

export default OrderCard;