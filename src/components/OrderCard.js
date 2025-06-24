import React, { useState } from 'react';
import axios from 'axios';
import { FaPen } from "react-icons/fa";
import '../styles/OrderCard.css';
import { toast } from 'react-toastify';
import EditOrderDialog from './EditOrderDialog';
import { useLocation } from 'react-router';

import { jwtDecode } from "jwt-decode";

const statusOptions = ['Em Andamento', 'Concluído', 'Cancelado'];

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};
const token = getCookie("token");
let funcionario_fk = null;
if (token) {
  const decoded = jwtDecode(token);
  funcionario_fk = decoded.fun_id || null;
}


const OrderCard = ({
  id, name, details, status, data, day_order, products, onStatusChange, updatedAt
}) => {

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };
  const token = getCookie("token");
  let funcionario_fk = null;
  if (token) {
    const decoded = jwtDecode(token);
    funcionario_fk = decoded.fun_id || null;
  }
  const location = useLocation();
  const [currentStatus, setCurrentStatus] = useState(status || 'Desconhecido');
  const [editOpen, setEditOpen] = useState(false);

  const statusClass = currentStatus.toLowerCase().replace(/\s/g, '-');

  const handleStatus = async () => {
    const currentIndex = statusOptions.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusOptions.length;
    const nextStatus = statusOptions[nextIndex];

    const isReactivating = (currentStatus === 'Concluído' || currentStatus === 'Cancelado') && nextStatus === 'Em Andamento';
    const isConcludedChange = currentStatus === 'Concluído' && nextStatus !== 'Concluído';

    if ((isReactivating || isConcludedChange) && updatedAt) {
      const lastUpdate = new Date(updatedAt);
      const now = new Date();
      const diffMs = now - lastUpdate;
      const diffMinutes = diffMs / (1000 * 60);

      if (diffMinutes > 5) {
        toast.error('Não é possível alterar o status após 5 minutos da conclusão/cancelamento.');
        return;
      }
    }

    try {
      await axios.put(`http://localhost:8800/pedidos/${id}/status`, {
        status: nextStatus,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        },
      );
      setCurrentStatus(nextStatus);
      toast.success(`Status atualizado para: ${nextStatus}`);
      if (onStatusChange) onStatusChange();
    } catch (error) {
      const msg = error.response?.data?.error || 'Erro ao atualizar o status do pedido.';
      toast.error(msg);
      console.error(`Erro ao atualizar o pedido ${id}:`, error);
    }
  };

  return (
    <div>
      <div className="order-card">
        <div className="order-header">
          <div>
            <span className="order-id">Id: #{id}</span>
            <button className={`status-tag ${statusClass}`} onClick={handleStatus}>
              {currentStatus}
            </button>
          </div>
          <div className='order-date-day'>
            <span className="order-date">{data}</span>
            {location.pathname !== '/historico' && (
              <div className='order-day-order'><span>{day_order}</span></div>
            )}
          </div>
        </div>
        <p className="customer-name">{name}</p>
        {details && details.trim() !== '' && (
          <p className="order-details">Observações: {details}</p>
        )}
        <p className="order-details">{products}</p>
        <hr />
        <button className="edit-btn" onClick={() => setEditOpen(true)}>
          <FaPen /> Editar
        </button>
      </div>

      <EditOrderDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        id={id}
        onStatusChange={onStatusChange}
      />
    </div>
  );
};

export default OrderCard;
