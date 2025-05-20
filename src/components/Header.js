import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import "../styles/Header.css";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = (text) => {
    navigate("/", { state: { searchTerm: text } });

    const searchEvent = new CustomEvent("search", { detail: text });
    window.dispatchEvent(searchEvent);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="search-bar">
          <FaSearch className="search-icon" onClick={() => handleSearch(searchText)} />
          <input
            type="text"
            placeholder="Buscar por nome do cliente..."
            value={searchText}
            onChange={(e) => {
              const newValue = e.target.value;
              setSearchText(newValue);
              handleSearch(newValue);
            }}
            className="search-input"
          />
        </div>

        <div className="user-actions">
          <NavLink to="/cadastro-de-cliente" className="add-order-btn">
            <span className="btn-pedido">Pedido</span>
            <FaPlus className="btn-plus" />
          </NavLink>
          <span className="user-name">Funcionário</span>
          <div className="user-avatar"></div>
        </div>
      </div>

      <NavLink className="floating-btn" to="/cadastro-de-cliente">
        <FaPlus />
      </NavLink>
    </header>
  );
};

export default Header;
