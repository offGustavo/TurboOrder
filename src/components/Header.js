import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import "../styles/Header.css";
import { NavLink } from "react-router-dom";

const createPedido = () => {
  console.log("teste");
};

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="search-input"
          />
        </div>

        <div className="user-actions">
          <NavLink
            to="/pedidos"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button className="add-order-btn" onClick={createPedido}>
              <FaPlus /> Pedido
            </button>
          </NavLink>
          <span className="user-name">Funcionário</span>
          <div className="user-avatar"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
