import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./../styles/ProductTable.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';



const ProductTable = () => {

  const [selectedType, setSelectedType] = useState("");
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
    { id: "0011", name: 'Arroz Soltinho', type: 'Arroz'},
    { id: "0012", name: 'Arroz Integral', type: 'Arroz'},
    { id: "0013", name: 'Arroz Jasmim', type: 'Arroz'},
    { id: "0014", name: 'Arroz Negro', type: 'Arroz'},
    { id: "0015", name: 'Arroz Vermelho', type: 'Arroz'},
    { id: "0016", name: 'Feijão Preto', type: 'Feijão'},
    { id: "0017", name: 'Feijão Carioca', type: 'Feijão'},
    { id: "0018", name: 'Feijão Feijoada', type: 'Feijão'},
    { id: "0019", name: 'Feijão Tropeiro', type: 'Feijão'},
    { id: "0020", name: 'Feijão Tutu', type: 'Feijão'},
    { id: "0021", name: 'Massa Espaguete', type: 'Massa'},
    { id: "0022", name: 'Massa Talharim', type: 'Massa'},
    { id: "0023", name: 'Massa Penne', type: 'Massa'},
    { id: "0024", name: 'Massa Ravioli', type: 'Massa'},
    { id: "0025", name: 'Massa Fusilli', type: 'Massa'},
    { id: "0026", name: 'Salada Caesar', type: 'Salada'},
    { id: "0027", name: 'Salada Tropical', type: 'Salada'},
    { id: "0028", name: 'Salada Caprese', type: 'Salada'},
    { id: "0029", name: 'Salada Verde', type: 'Salada'},
    { id: "0030", name: 'Salada De Frutas', type: 'Salada'},
    { id: "0031", name: 'Acompanhamento Batata Frita', type: 'Acompanhamento'},
    { id: "0032", name: 'Acompanhamento Purê de Batata', type: 'Acompanhamento'},
    { id: "0033", name: 'Acompanhamento Farofa', type: 'Acompanhamento'},
    { id: "0034", name: 'Acompanhamento Vinagrete', type: 'Acompanhamento'},
    { id: "0035", name: 'Acompanhamento Legumes Salteados', type: 'Acompanhamento'},
    { id: "0036", name: 'Carne Bife', type: 'Carne'},
    { id: "0037", name: 'Carne Frango Grelhado', type: 'Carne'},
    { id: "0038", name: 'Carne Costela', type: 'Carne'},
    { id: "0039", name: 'Carne Picanha', type: 'Carne'},
    { id: "0040", name: 'Carne Carne Moída', type: 'Carne'}
  ]);

  const filteredProducts = filter === "Tudo" ? products : products.filter((p) => p.type === filter);

  const   productTypes = [
    {
      value: 'Arroz',
      label: 'Arroz',
    },
    {
      value: 'Feijão',
      label: 'Feijão',
    },
    {
      value: 'Massa',
      label: 'Massa',
    },
    {
      value: 'Carne',
      label: 'Carne',
    },
    {
      value: 'Acompanhamento',
      label: 'Acompanhamento',
    },
    {
      value: 'Salada',
      label: 'Salada',
    }
  ];

  return (
    <div className="product-table">
      <div className="filter-section">
        <div className="productsType">

          <TextField
            id="outlined-name-flexible"
            label="Nome"
            name
            maxRows={4}
          />

          <TextField
            id="outlined-typeProduct-currency"
            select
            label="Tipo do Produto"
            helperText="Por favor selecione um tipo"
            sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#FD1F4A',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FD1F4A',
              },
            },
          }}
          >
            { productTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}
              sx={{
                color: 'black',
                backgroundColor: selectedType === option.value ? '#f7dfe3' : 'white',
                '&:hover': {
                  backgroundColor: '#FFF0F3',
                  color: '#FD1F4A',
                },
                fontWeight: selectedType === option.value ? 'bold' : 'normal',
              }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <button className="btn-salvar">Salvar</button>
        </div>


        <div className="filter-buttons">
        <span className="filter-label">Filtro</span>
          {["Tudo", "Arroz", "Feijão", "Massa", "Carne", "Acompanhamento", "Salada"].map((type) => (
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
