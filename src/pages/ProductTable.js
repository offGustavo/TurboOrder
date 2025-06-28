import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../styles/ProductTable.css";
import FilterComponent from "../components/FilterComponent";
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

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [proNome, setProNome] = useState("");
  const [proTipo, setProTipo] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [isLoading, setIsLoading] = useState(false);

  const [editProNome, setEditProNome] = useState('');
  const [editProTipo, setEditProTipo] = useState('');
  const [productToEdit, setProductToEdit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const productTypes = [
    { value: "Arroz", label: "Arroz" },
    { value: "Feijão", label: "Feijão" },
    { value: "Massa", label: "Massa" },
    { value: "Carne", label: "Carne" },
    { value: "Acompanhamento", label: "Acompanhamento" },
    { value: "Salada", label: "Salada" },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8800/produtos");
      setProducts(response.data);
    } catch (error) {
      toast.error(`Erro ao buscar produtos: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async () => {
    if (!proNome || !proTipo) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:8800/produtos", {
        pro_nome: proNome,
        pro_tipo: proTipo
      });

      setProducts(prev => [...prev, response.data]);
      setProNome("");
      setProTipo("");
      toast.success("Produto cadastrado com sucesso!");
    } catch (error) {
      const errorMessage = error.response?.data?.error ||
        "Erro ao cadastrar o produto. Verifique se já não existe um produto ativo com este nome e tipo.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async () => {
    if (!editProNome || !editProTipo) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setIsLoading(true);
      await axios.put(
        `http://localhost:8800/produtos/${productToEdit.pro_id}`,
        {
          pro_nome: editProNome,
          pro_tipo: editProTipo
        }
      );

      setProducts(prev => prev.map(product =>
        product.pro_id === productToEdit.pro_id
          ? { ...product, pro_nome: editProNome, pro_tipo: editProTipo }
          : product
      ));

      toast.success("Produto atualizado com sucesso!");
      setIsEditModalOpen(false);
    } catch (error) {
      const errorMessage = error.response?.data?.error ||
        "Erro ao atualizar o produto. Verifique se já não existe um produto ativo com este nome e tipo.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (pro_id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(`http://localhost:8800/produtos/${pro_id}`);

      setProducts(prev => prev.filter(product => product.pro_id !== pro_id));
      toast.success(data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Erro ao excluir o produto");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    setEditProNome(product.pro_nome);
    setEditProTipo(product.pro_tipo);
    setIsEditModalOpen(true);
  };

  const filteredProducts = filter === "Todos"
    ? products
    : products.filter((product) => product.pro_tipo === filter);

  return (
    <div className="product-table">
      <h1 className="title">Cadastro de Produtos</h1>

      <div className="filter-section">
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
            <Button
              className="btn-salvar"
              type="button"
              onClick={handleAddProduct}
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </FormContainer>
        </Box>

        <FilterComponent
          filterState={filter}
          setFilter={setFilter}
          filterItens={productTypes}
          menuOpen={false}
        />
      </div>

      {isLoading && !products.length ? (
        <div className="loading">Carregando produtos...</div>
      ) : (
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
            {filteredProducts.map((product) => (
              <tr key={product.pro_id}>
                <td>{product.pro_id}</td>
                <td>{product.pro_nome}</td>
                <td>{product.pro_tipo}</td>
                <td>
                  <div className="control-box">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(product)}
                      disabled={isLoading}
                    >
                      <FaEdit size={16} className='icon-size' />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product.pro_id)}
                      disabled={isLoading}
                    >
                      <FaTrash size={16} className='icon-size' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <EditProductModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateProduct}
        product={productToEdit}
        editProNome={editProNome}
        setEditProNome={setEditProNome}
        editProTipo={editProTipo}
        setEditProTipo={setEditProTipo}
        productTypes={productTypes}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProductTable;
