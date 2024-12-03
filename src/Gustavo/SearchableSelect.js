import React, { useState, useEffect, useRef } from "react";
import { Select, MenuItem, InputLabel, FormControl, CircularProgress } from "@mui/material";
import "../styles/SearchableSelect.css";

const SearchableSelect = ({ options, tipoSelecionado }) => {
  const [query, setQuery] = useState(""); // Valor digitado pelo usuário
  const [isOpen, setIsOpen] = useState(false); // Controle da lista aberta/fechada
  const [selectedOption, setSelectedOption] = useState(null); // Opção selecionada1
  const dropdownRef = useRef(null); // Referência para o dropdown
  const inputRef = useRef(null); // Referência para o campo de entrada

  // Filtra as opções com base no tipo selecionado
  const filteredOptions = options
    .filter((option) => option.tipo === tipoSelecionado) // Filtra pelo tipo
    // .filter((option) =>
    //   option.nome.toLowerCase().includes(query.toLowerCase()) // Filtra pelo nome
    // )
    

  // Função para lidar com a mudança no campo de pesquisa
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // Função para selecionar uma opção
  const handleSelect = (event) => {
    const selectedId = event.target.value;
    const option = options.find((opt) => opt.id === selectedId);
    setSelectedOption(option);
    setQuery(option ? option.nome : ""); // Atualiza o campo com o nome da opção
    setIsOpen(false); // Fecha a lista de opções
  };

  // Fecha o dropdown se o clique ocorrer fora do componente
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current && !dropdownRef.current.contains(event.target) &&
      inputRef.current && !inputRef.current.contains(event.target)
    ) {
      setIsOpen(false); // Fecha o dropdown
    }
  };

  // Adiciona e limpa o event listener para cliques fora do componente
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="select-container"
      style={{ position: "relative", width: "300px" }}
    >
      <FormControl fullWidth variant="outlined" style={{ marginBottom: "8px" }}>
        <InputLabel id="select-label">
          Escolha de {tipoSelecionado}
        </InputLabel>

        <Select
          ref={inputRef}
          labelId="select-label"
          id="select"
          value={selectedOption ? selectedOption.id : ""}
          onChange={handleSelect}
          onClick={() => setIsOpen(!isOpen)}
          label={`Escolha de ${tipoSelecionado}`}
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "16px",
          }}
        >
          {/* Adiciona uma opção padrão */}
          <MenuItem value="" disabled>
            Selecione uma opção
          </MenuItem>

          <MenuItem value="0" >
            Nenhuma Escolha
          </MenuItem>

          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.nome} 
              </MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>
              Nenhuma opção encontrada
            </MenuItem>
          )}
          
        </Select>
      </FormControl>

      {selectedOption && (
        <div className="selected-option" style={{ marginTop: "8px", fontStyle: "italic" }}>
          Você selecionou: {selectedOption.nome} ({selectedOption.tipo})
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
