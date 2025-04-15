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
        <img src={logo} alt="Logo Restaurante Da Lucia" className="sidebar-logo" />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink  to="/">
              <FaHome /> <p className="NavLinkText">Home</p>
            </NavLink >
          </li>
          <li>
            <NavLink  to="/cardapio">
              <BiFoodMenu /> <p className="NavLinkText">Cardápio</p>
            </NavLink >
          </li>
          <li>
            <NavLink  to="/produtos">
              <FaUtensils /> <p className="NavLinkText">Produtos</p>
            </NavLink >
          </li>
          <li>
            <NavLink  to="/clientes">
              <FaUsers /> <p className="NavLinkText">Clientes</p>
            </NavLink >
          </li>
          <li>
            <NavLink  to="/historico">
              <FaHistory /> <p className="NavLinkText">Histórico de Pedidos</p>
            </NavLink >
          </li>
          <li>

            {/* TODO modificar isso pra um link/button  */}
            <NavLink  to="/sair">
              <FaSignOutAlt /> <p className="NavLinkText">Sair</p>
            </NavLink >
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
