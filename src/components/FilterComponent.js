import React, { useState } from 'react';
import '../styles/FilterComponent.css';
import { FaBars } from "react-icons/fa";

const FilterComponent = ({ filterState, setFilter, filterItens }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="filter-section">
      {/* Botão Hambúrguer */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars size={24} />
      </button>

      {/* Menu de filtros */}
      <div className={`filter-buttons ${menuOpen ? "open" : ""}`}>
        <span className="filter-label">Filtro</span>
        {
          ['Tudo', ...filterItens.map((type) => type.value)].map((type, index) => (
            <button
              key={index}
              className={`filter-btn ${filterState === type ? "active" : ""}`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default FilterComponent;
