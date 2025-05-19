import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../styles/ProductTable.css";
import FilterComponent from "../components/FilterComponent";
import EditProductModal from "./EditProductModal"; // Importando o modal

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
  const [filter, setFilter] = useState("Tudo");
  const [onEdit, setOnEdit] = useState(null);
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


  useEffect(() => {
    axios
      .get("http://localhost:8800/produtos")
      .then((response) => setProducts(response.data))
      .catch(() => toast.error("Erro ao buscar produtos."));
  }, []);

  const handleSave = () => {
    if (!proNome || !proTipo) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (onEdit) {
      axios
        .put(`http://localhost:8800/produtos/${onEdit.pro_id}`, { pro_nome: proNome, pro_tipo: proTipo })
        .then(() => {
          console.log('Produto atualizado com sucesso!');
          const updatedProducts = products.map((product) =>
            product.pro_id === onEdit.pro_id
              ? { ...product, pro_nome: proNome, pro_tipo: proTipo }
              : product
          );

          setProducts(updatedProducts);
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
        .then((response) => {
          setProducts([...products, response.data]);
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
      .then(({ data }) => {
        const newArray = products.filter((product) => product.pro_id !== pro_id);
        setProducts(newArray);
        toast.success(data);
      })
      .catch(({ response }) => toast.error(response.data));
  };

  const handleEdit = (product) => {
    setProductEdit(product);
    setEditProNome(product.pro_nome);
    setEditProTipo(product.pro_tipo);
    setIsEditModalOpen(true);
  };

  const filteredProducts = filter === "Tudo"
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
            <Button className="btn-salvar" type="button" onClick={handleSave}>
              Salvar
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


      <EditProductModal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setOnEdit(null);
        }}
        onEdit={onProductEdit}
        setProducts={setProducts}
        productTypes={productTypes}
      />

    </div >
  );
};

export default ProductTable;
