import React, { useState } from 'react';
import '../styles/FilterComponent.css';

const FilterComponent = ({ filterState, setFilter, filterItens }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="filter-section">
      {/* Botão Hambúrguer */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* Menu de filtros */}
      <div className={`filter-buttons ${menuOpen ? "open" : ""}`}>
        <span className="filter-label">Filtro</span>
        {
          [null, ...filterItens.map((type) => type.value)].map((type, index) => (
            <button
              key={index}
              className={`filter-btn ${filterState === type ? "active" : ""}`}
              onClick={() => setFilter(type)}
            >
              {type || 'Tudo'}
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default FilterComponent;
