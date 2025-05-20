import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import "../styles/Header.css";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState('');

  const handleSearch = () => {
    if (searchText.trim() === "") return;

    // Navega para a home
    navigate("/", { state: { searchTerm: searchText } });

    // Dispara evento personalizado
    const searchEvent = new CustomEvent("search", { detail: searchText });
    window.dispatchEvent(searchEvent);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="search-bar">
          <FaSearch className="search-icon" onClick={handleSearch} />
          {/* Barra de busca por nome */}
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Buscar por nome do cliente..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="search-input"
            />
          </div>
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
