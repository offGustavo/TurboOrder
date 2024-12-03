import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./../styles/ProductTable.css";

const ProductTable = () => {
  const [filter, setFilter] = useState("Tudo");
  const [products] = useState([
    { id: "0001", name: "Arroz", type: "Arroz" },
    { id: "0002", name: "Arroz integral", type: "Arroz" },
    { id: "0003", name: "Feijão", type: "Feijão" },
    { id: "0004", name: "Tutu de feijão", type: "Feijão" },
    { id: "0005", name: "Carne de panela", type: "Carne" },
    { id: "0006", name: "Linguiça fina", type: "Carne" },
    { id: "0007", name: "Torresmo", type: "Carne" },
    { id: "0008", name: "Filé de frango à milanesa", type: "Carne" },
    { id: "0009", name: "Bisteca", type: "Carne" },
    { id: "0010", name: "Macarronada", type: "Massa" },
  ]);

  const filteredProducts = filter === "Tudo" ? products : products.filter((p) => p.type === filter);

  return (
    <div className="product-table">
      <div className="filter-section">
        <div className="filter">
          <input type="text" placeholder="Nome do Produto" className="input-filter" />
          <select className="select-filter">
            <option value="">Tipo do Produto</option>
            <option value="Arroz">Arroz</option>
            <option value="Feijão">Feijão</option>
            <option value="Massa">Massa</option>
            <option value="Carne">Carne</option>
          </select>
          <button className="btn-salvar">Salvar</button>
        </div>
        <div className="filter-buttons">
        <span className="filter-label">Filtro</span>
          {["Tudo", "Arroz", "Feijão", "Massa", "Carne"].map((type) => (
            <button
              key={type}
              className={`filter-btn ${filter === type ? "active" : ""}`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome do Produto</th>
            <th>Tipo do Produto</th>
            <th>Configuração</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.type}</td>
              <td>
                <button className="edit-btn">
                  <FaEdit />
                </button>
                <button className="delete-btn">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
