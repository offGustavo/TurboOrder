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
        <button onClick={changeStatus} className="cardButton" style={{ backgroundColor: getStatusClass(status) }}>
          {status}
        </button>
      </div>
      <p><strong>{name}</strong></p>
      <p>{details}</p>
      <hr />
      <div className="infoOrder">
        <p>{data}</p>
        <NavLink to="/" activeClassName="active">
          <button className="edit-btn" onClick={editarPedido}>
            <FaPen /> Editar
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default OrderCard;
