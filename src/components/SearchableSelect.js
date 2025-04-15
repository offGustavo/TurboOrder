import React, { useState, useEffect, useRef } from "react";
import "../styles/SearchableSelect.css";

const SearchableSelect = ({ options, tipoSelecionado }) => {
  const [query, setQuery] = useState(""); // Valor digitado pelo usuário
  const [isOpen, setIsOpen] = useState(false); // Controle da lista aberta/fechada
  const [selectedOption, setSelectedOption] = useState(null); // Opção selecionada
  const dropdownRef = useRef(null); // Referência para o dropdown
  const inputRef = useRef(null); // Referência para o campo de entrada

  // Filtra as opções com base no tipo selecionado
  const filteredOptions = options
    .filter((option) => option.tipo === tipoSelecionado) // Filtra pelo tipo
    .filter((option) =>
      option.nome.toLowerCase().includes(query.toLowerCase()) // Filtra pelo nome
    );

  // Função para lidar com a mudança no campo de pesquisa'
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // Função para selecionar uma opção
  const handleSelect = (option) => {
    setSelectedOption(option);
    setQuery(option.nome); // Atualiza a caixa de pesquisa com o nome da opção selecionada
    setIsOpen(false); // Fecha a lista de opções
  };

  // Função para alternar o estado do dropdown
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
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

      <label>
        Escolha de {tipoSelecionado}
      </label>

      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onClick={handleToggleDropdown}
        // TODO Tornar o placeholder variavel
        placeholder="Pesquisar por nome..."
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      {isOpen && (
        <div
          ref={dropdownRef}
          className="dropdown"
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "150px",
            overflowY: "auto",
            backgroundColor: "white",
            zIndex: 10,
          }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                className="dropdown-item"
                onClick={() => handleSelect(option)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                }}
              >
                {option.nome} - {option.tipo}
              </div>
            ))
          ) : (
            <div style={{ padding: "8px", color: "#aaa" }}>Nenhuma opção encontrada</div>
          )}
        </div>
      )}
      {selectedOption && (
        <div className="selected-option" style={{ marginTop: "8px", fontStyle: "italic" }}>
          Você selecionou: {selectedOption.nome} ({selectedOption.tipo})
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
