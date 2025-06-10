import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUtensils, FaUsers, FaHistory, FaSignOutAlt, FaBuilding, FaUserTie } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";

import "./../styles/Sidebar.css";
import logo from "../image/logo.png";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8800/logout", { withCredentials: true });
      setAuth({ isAuthenticated: false, role: null });
      navigate("/login");
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo Restaurante Da Lucia" className="sidebar-logo" />
      </div>
      <nav>
        <ul>
          <li>
            <a href="/"><FaHome /> <p className="NavLinkText">Home</p></a>
          </li >
          <li>
            <a href="/cardapio"><BiFoodMenu /> <p className="NavLinkText">Cardápio</p></a>
          </li>
          <li>
            <a href="/produtos"><FaUtensils /> <p className="NavLinkText">Produtos</p></a>
          </li>
          <li>
            <a href="/clientes"><FaUsers /> <p className="NavLinkText">Clientes</p></a>
          </li>

          {auth.role === "admin" && (
            <>
              <li>
                <a href="/historico"><FaHistory /> <p className="NavLinkText">Histórico de Pedido</p></a>
              </li>
              <li>
                <a href="/funcionarios"><FaUserTie /> <p className="NavLinkText">Funcionários</p></a>
              </li>
              { /*aqui sera o link para colocar os gráficos */}
              <li>
                <NavLink to="/desempenho">
                  <IoIosStats /> <p className="NavLinkText">Desempenho</p>
                </NavLink >
              </li>
              <li>
                <NavLink to="/empresas">
                  <FaBuilding /> <p className="NavLinkText">Empresas</p>
                </NavLink >
              </li>
            </>
          )}

          <li>
            <a className="logout-button" onClick={handleLogout}><FaSignOutAlt /> <p className="NavLinkText">Sair</p></a>
          </li>
        </ul >
      </nav >
    </div >
  );
};

export default Sidebar;
