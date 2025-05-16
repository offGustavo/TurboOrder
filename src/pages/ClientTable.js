import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import PopupModal from "../components/PopupModal";
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "./../styles/ClientTable.css";

const ClientTable = () => {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [actionType, setActionType] = useState("confirmarExclusao");
  const location = useLocation();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:8800/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClients();
  }, [location]);

  const handleDelete = async (clientId) => {
    setSelectedClient(clientId);
    setActionType("confirmarExclusao");
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8800/clientes/${selectedClient}`);
      if (response.status === 200) {
        toast.success("Cliente excluído com sucesso!");
        setClientes(clientes.filter(cliente => cliente.cli_id !== selectedClient));
      } else {
        toast.error("Erro ao excluir cliente.");
      }
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      toast.error("Erro ao excluir cliente.");
    }
    setShowModal(false);
  };

  const formatPhone = (phone) => {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="client-table">
      <div className="infoClient">
        <h1 className="title">Clientes</h1>
        <NavLink
          to="/cadastro-de-cliente"
          className={({ isActive }) => `register-link ${isActive ? "active" : ""}`}
        >
          <button className="RegisterBtn">Cadastrar novo Cliente</button>
        </NavLink>
      </div>

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Cliente</th>
            <th>Sobrenome</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Configurações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.cli_id}>
              <td>{cliente.cli_id}</td>
              <td>{cliente.cli_nome}</td>
              <td>{cliente.cli_sobrenome}</td>
              <td>{formatPhone(cliente.con_telefone)}</td>
              <td>
                {cliente.cli_bairro && cliente.cli_cidade && cliente.cli_complemento && cliente.cli_numero
                  ? `${cliente.cli_bairro}, ${cliente.cli_cidade}, ${cliente.cli_complemento}, ${cliente.cli_numero}`
                  : "Endereço não disponível"}
              </td>
              <td>
                <NavLink to={`/clientes/${cliente.cli_id}/edit`}>
                  <button className="edit-btn">
                    <FaEdit />
                  </button>
                </NavLink>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(cliente.cli_id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PopupModal
        showModal={showModal}
        onClose={handleModalClose}
        onConfirm={confirmDelete}
        actionType={actionType}
      />

      <ToastContainer />
    </div>
  );
};

export default ClientTable;
