import React from "react";
import axios from "axios";
import { useNavigate, Link  } from "react-router-dom";
import { FaHome, FaUtensils, FaUsers, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";

import "./../styles/Sidebar.css";
import logo from "../image/logo.png";

const Sidebar = () => {
  const handleDelete = () => {
    axios.get("http://localhost:8800/logout")
    .then(res => {
      window.location.reload(true);
    }).catch(err => console.log(err));
  }

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo Restaurante Da Lucia" className="sidebar-logo" />
      </div>
      <nav>
        <ul>
          <li>
              <Link to="/"><FaHome /> <p className="NavLinkText">Home</p></Link>
          </li>
          <li>
            <Link to="/cardapio"><BiFoodMenu /> <p className="NavLinkText">Cardápio</p></Link>
          </li>
          <li>
            <Link to="/produtos"><FaUtensils /> <p className="NavLinkText">Produtos</p></Link>
          </li>
          <li>
            <Link to="/clientes"><FaUsers /> <p className="NavLinkText">Clientes</p></Link>
          </li>
          <li>
            <Link to="/historico"><FaHistory /> <p className="NavLinkText">Histórico de Pedido</p></Link>
          </li>
          <li>
            <Link to="/" onClick={handleDelete}><FaSignOutAlt /> <p className="NavLinkText">Sair</p></Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
