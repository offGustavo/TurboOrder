import React from "react";
import { NavLink  } from "react-router-dom";
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
          <li>
            <NavLink  to="/">
              <FaHome /> Home
            </NavLink >
          </li>
          <li>
            <NavLink  to="/cardapio">
              <BiFoodMenu /> Cardápio
            </NavLink >
          </li>
          <li>
            <NavLink  to="/produtos">
              <FaUtensils /> Produtos
            </NavLink >
          </li>
          <li>
            <NavLink  to="/clientes">
              <FaUsers /> Clientes
            </NavLink >
          </li>
          <li>
            <NavLink  to="/historico">
              <FaHistory /> Histórico de Pedidos
            </NavLink >
          </li>
          <li>
            <NavLink  to="/sair">
              <FaSignOutAlt /> Sair
            </NavLink >
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;