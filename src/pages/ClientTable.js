import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import "./../styles/ClientTable.css";


const ClientTable = () => {
  const [clientes, setClientes] = useState([]);
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
    try {
      const response = await axios.delete(`http://localhost:8800/clientes/${clientId}`);
      if (response.status === 200) {
        alert("Cliente excluído com sucesso!");
        setClientes(clientes.filter(cliente => cliente.cli_id !== clientId));
      } else {
        alert("Erro ao excluir cliente.");
      }
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      alert("Erro ao excluir cliente.");
    }
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
            <th>Nome do Cliente</th>
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
                <button className="delete-btn">
                  <FaTrash onClick={() => handleDelete(cliente.cli_id)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
