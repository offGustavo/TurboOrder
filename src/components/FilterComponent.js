import React, { useState } from 'react';
import '../styles/FilterComponent.css';
import { FaBars } from "react-icons/fa";
import { useLocation } from 'react-router';

const FilterComponent = ({ filterState, setFilter, filterItens, orders = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const allTypes = ['Todos', ...filterItens.map((type) => type.value)];

  const getCount = (type) => {
    if (type === 'Todos') return orders.length;
    return orders.filter(order => order.status === type).length;
  };

  return (
    <div className="filter-section">
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars size={24} />
      </button>

      <div className={`filter-buttons ${menuOpen ? "open" : ""}`}>
        <span className="filter-label">Filtro</span>
        {allTypes.map((type, index) => (
          <button
            key={index}
            className={`filter-btn ${filterState === type ? "active" : ""}`}
            onClick={() => setFilter(type)}
          >
            <span className='filter-btn-text'>
              {type}
            </span>
            {location.pathname !== '/produtos' && (
              <span className="filter-badge">{getCount(type)}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
;
