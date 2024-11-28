import React from "react";
import { FaHome, FaUtensils, FaUsers, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import "./../styles/Sidebar.css";
import logo from "../image/logo.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="" className="sidebar-logo" />
      </div>
      <nav>
        <ul>
          <li className="active">
            <FaHome /> Home
          </li>
          <li>
            <BiFoodMenu /> Cardápio
          </li>
          <li>
            <FaUtensils /> Produtos
          </li>
          <li>
            <FaUsers /> Clientes
          </li>
          <li>
            <FaHistory /> Histórico de Pedidos
          </li>
          <li>
            <FaSignOutAlt /> Sair
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
