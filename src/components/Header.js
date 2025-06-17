import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaBell, FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import "../styles/Header.css";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    navigate(`/?search=${encodeURIComponent(searchValue)}`);
  };

  const fotoUrl = auth.foto && !auth.foto.startsWith("http")
    ? `http://localhost:8800/uploads/${auth.foto}`
    : auth.foto;

  return (
    <header className="header">
      <div className="header-content">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="search-input"
            onChange={handleSearchChange}
          />
        </div>

        <div className="user-actions">
          <NavLink to="/cadastro-de-cliente" className={"add-order-btn"}>
            <span className="btn-pedido">Pedido</span>
            <FaPlus className="btn-plus" />
          </NavLink>

          <span className="user-name">{auth.nome || "Funcionário"}</span>

          <NavLink to="/perfil">
            {fotoUrl ? (
              <img src={fotoUrl} alt="Avatar" className="user-avatar" />
            ) : (
              <div className="user-avatar default-avatar" />
            )}
          </NavLink>
        </div>
      </div>

      <NavLink className="floating-btn" to="/cadastro-de-cliente">
        <FaPlus />
      </NavLink>
    </header>
  );
};

export default Header;
