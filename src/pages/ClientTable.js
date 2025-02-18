import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./../styles/ClientTable.css";


const ClientTable = () => {
  const clientes = [
    { cli_id: 1, cli_nome: "João Silva", cli_tipo: "Fidelidade" },
    { cli_id: 2, cli_nome: "Maria Oliveira", cli_tipo: "Regular" },
    { cli_id: 3, cli_nome: "Carlos Santos", cli_tipo: "VIP" },
  ];

  return (
    <div className="client-table">
      <div className="infoClient">
        <h1 className="title">Clientes</h1>
        <NavLink
          to="/cadastro-de-cliente"
          className={({ isActive }) =>
            `register-link ${isActive ? "active" : ""}`
          }
        >
          <button className="RegisterBtn">Cadastrar novo Cliente</button>
        </NavLink>
      </div>

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome do Cliente</th>
            <th>Tipo de Cliente</th>
            <th>Configurações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.cli_id}>
              <td>{cliente.cli_id}</td>
              <td>{cliente.cli_nome}</td>
              <td>{cliente.cli_tipo}</td>
              <td>
                <button className="edit-btn">
                  <FaEdit />
                </button>
                <button className="delete-btn">
                  <FaTrash />
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