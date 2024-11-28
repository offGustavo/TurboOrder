import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import "./../styles/Header.css";

const createPedido = () => {
console.log("teste")
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
          <button className="add-order-btn" onClick={createPedido}><FaPlus /> Pedido</button>
          <button className="notification-btn">
            <FaBell />
          </button>
          <span className="user-name">Funcionário</span>
          <div className="user-avatar"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
