import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight, FaBars, FaSearch } from "react-icons/fa";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ProductTable.css";
import EditProductModal from "./EditProductModal";

const FormContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: ${props => props.active ? '#FD1F4A' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
  cursor: pointer;
  border-radius: 4px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .hamburger {
    background: none;
    border: none;
    cursor: pointer;
    display: none;
    padding: 5px;
  }

  .filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    transition: all 0.3s ease;

    &.open {
      display: flex;
    }
  }

  .filter-label {
    font-weight: bold;
    margin-right: 10px;
    align-self: center;
  }

  .filter-btn {
    padding: 8px 16px;
    border: 1px solid #ddd;
    background-color: white;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
      background-color: #f5f5f5;
    }

    &.active {
      background-color: #FD1F4A;
      color: white;
      border-color: #FD1F4A;
    }
  }

  .filter-badge {
    background-color: #f5f5f5;
    color: #333;
    border-radius: 10px;
    padding: 2px 6px;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    .hamburger {
      display: block;
    }

    .filter-buttons {
      display: none;
      flex-direction: column;
      width: 100%;

      &.open {
        display: flex;
      }
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  position: relative;
  margin-top: 10px;

  input {
    width: 100%;
    padding: 10px 15px 10px 35px;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 16px;

    &:focus {
      outline: none;
      border-color: #FD1F4A;
    }
  }

  .search-icon {
    position: absolute;
    left: 10px;
    color: #777;
  }
`;

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [proNome, setProNome] = useState("");
  const [proTipo, setProTipo] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [onEdit, setOnEdit] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados de paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const productTypes = [
    { value: "Arroz", label: "Arroz" },
    { value: "Feijão", label: "Feijão" },
    { value: "Massa", label: "Massa" },
    { value: "Carne", label: "Carne" },
    { value: "Acompanhamento", label: "Acompanhamento" },
    { value: "Salada", label: "Salada" },
  ];

  const [editProNome, setEditProNome] = useState('');
  const [editProTipo, setEditProTipo] = useState('');
  const [onProductEdit, setProductEdit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, filter]);

  const fetchProducts = () => {
    axios
      .get(`http://localhost:8800/produtos/paginador?page=${currentPage}&filter=${filter === "Todos" ? "" : filter}`)
      .then((response) => {
        console.log("Resposta da API:", response.data);
        setAllProducts(response.data.data);
        setProducts(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
        toast.error("Erro ao buscar produtos.");
      });
  };

  const applyFilter = (type) => {
    setFilter(type);
    setMenuOpen(false);
    setCurrentPage(1);

    if (type === "Todos") {
      setProducts(allProducts);
    } else {
      setProducts(allProducts.filter((product) => product.pro_tipo === type));
    }
  };

  //FIXME: Modificar a forma que a pesquisa é feita
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(setTimeout(() => {
      if (term === "") {
        fetchProducts();
      } else {
        axios
          .get(`http://localhost:8800/produtos/search?term=${term}`)
          .then((response) => {
            setProducts(response.data);
            setTotalPages(1);
            setTotalItems(response.data.length);
            setCurrentPage(1);
          })
          .catch((error) => {
            console.error("Erro na pesquisa:", error);
            toast.error("Erro ao buscar produtos.");
          });
      }
    }, 200));
  };

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  const handleSave = () => {
    if (!proNome || !proTipo) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (onEdit) {
      axios
        .put(`http://localhost:8800/produtos/${onEdit.pro_id}`, { pro_nome: proNome, pro_tipo: proTipo })
        .then(() => {
          fetchProducts();
          setProNome("");
          setProTipo("");
          setOnEdit(null);
          toast.success("Produto atualizado com sucesso!");
          setIsEditModalOpen(false);
        })
        .catch(() => toast.error("Erro ao atualizar o produto."));
    } else {
      axios
        .post("http://localhost:8800/produtos", { pro_nome: proNome, pro_tipo: proTipo })
        .then(() => {
          fetchProducts();
          setProNome("");
          setProTipo("");
          toast.success("Produto salvo com sucesso!");
        })
        .catch(() => toast.error("Erro ao salvar o produto."));
    }
  };

  const handleDelete = async (pro_id) => {
    await axios
      .delete(`http://localhost:8800/produtos/${pro_id}`)
      .then(() => {
        fetchProducts();
        toast.success("Produto excluído com sucesso!");
      })
      .catch(({ response }) => toast.error(response.data));
  };

  const handleEdit = (product) => {
    setProductEdit(product);
    setEditProNome(product.pro_nome);
    setEditProTipo(product.pro_tipo);
    setIsEditModalOpen(true);
  };

  const filteredProducts = filter === "Todos"
    ? products
    : products.filter((product) => product.pro_tipo === filter);

  const searchedProducts = searchTerm === ""
    ? filteredProducts
    : filteredProducts.filter(product =>
      product.pro_nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationButton
          key={i}
          active={i === currentPage}
          onClick={() => goToPage(i)}
        >
          {i}
        </PaginationButton>
      );
    }

    return pages;
  };

  const allTypes = ['Todos', ...productTypes.map((type) => type.value)];

  return (
    <div className="product-table">
      <h1 className="title">Cadastro de Produtos</h1>

      <Box component="form" noValidate autoComplete="off" sx={{ marginBottom: 2 }}>
        <FormContainer>
          <TextField
            label="Nome do Produto"
            value={proNome}
            onChange={(e) => setProNome(e.target.value)}
            sx={{
              marginRight: 2,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
            }}
          />
          <TextField
            select
            label="Tipo do Produto"
            value={proTipo}
            onChange={(e) => setProTipo(e.target.value)}
            helperText="Por favor selecione um tipo"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
            }}
          >
            {productTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button className="btn-salvar" type="button" onClick={handleSave}>
            Salvar
          </Button>
        </FormContainer>
      </Box>


      <div className="header-search-filter">
        <FilterSection>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars size={24} />
          </button>

          <div className={`filter-buttons ${menuOpen ? "open" : ""}`}>
            <span className="filter-label">Filtro</span>
            {allTypes.map((type, index) => (
              <button
                key={index}
                className={`filter-btn ${filter === type ? "active" : ""}`}
                onClick={() => applyFilter(type)}
              >
                <span>
                  {type}
                </span>
              </button>
            ))}

          </div>
        </FilterSection>

        <SearchContainer>
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Pesquisar por nome do produto..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => handleSearch('')}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#999',
                fontSize: '30px',
                marginRight: '10px'
              }}
            >
              ×
            </button>
          )}
        </SearchContainer>
      </div>

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome do Produto</th>
            <th>Tipo do Produto</th>
            <th>Configurações</th>
          </tr>
        </thead>
        <tbody>
          {searchedProducts.map((product) => (
            <tr key={product.pro_id}>
              <td>{product.pro_id}</td>
              <td>{product.pro_nome}</td>
              <td>{product.pro_tipo}</td>
              <td>
                <div className="control-box">
                  <button className="edit-btn">
                    <FaEdit onClick={() => handleEdit(product)} size={16} className='icon-size' />
                  </button>
                  <button className="delete-btn">
                    <FaTrash onClick={() => handleDelete(product.pro_id)} size={16} className='icon-size' />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationContainer>
        <PaginationButton onClick={goToFirstPage} disabled={currentPage === 1}>
          <FaAngleDoubleLeft />
        </PaginationButton>
        <PaginationButton onClick={goToPreviousPage} disabled={currentPage === 1}>
          <FaAngleLeft />
        </PaginationButton>

        {renderPageNumbers()}

        <PaginationButton onClick={goToNextPage} disabled={currentPage === totalPages}>
          <FaAngleRight />
        </PaginationButton>
        <PaginationButton onClick={goToLastPage} disabled={currentPage === totalPages}>
          <FaAngleDoubleRight />
        </PaginationButton>
      </PaginationContainer>

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        Página {currentPage} de {totalPages} | Total de itens: {totalItems}
      </div>

      <EditProductModal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setOnEdit(null);
        }}
        onEdit={onProductEdit}
        setProducts={fetchProducts}
        productTypes={productTypes}
      />
    </div>
  );
};

export default ProductTable;
