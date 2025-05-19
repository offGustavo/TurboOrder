import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/Global.css';
import '../styles/EditProductModal.css';

export default function EditProductModal({
  open,
  onClose,
  onEdit,
  setProducts,
  productTypes
}) {
  const [localNome, setLocalNome] = React.useState('');
  const [localTipo, setLocalTipo] = React.useState('');

  React.useEffect(() => {
    if (onEdit) {
      setLocalNome(onEdit.pro_nome || '');
      setLocalTipo(onEdit.pro_tipo || '');
    }
  }, [onEdit]);

  const handleEdit = () => {
    if (!localNome || !localTipo) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    const updatedProduct = {
      pro_id: onEdit.pro_id,
      pro_nome: localNome,
      pro_tipo: localTipo
    };

    axios
      .put(`http://localhost:8800/produtos/${updatedProduct.pro_id}`, updatedProduct)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.pro_id === updatedProduct.pro_id ? updatedProduct : product
          )
        );
        toast.success("Produto atualizado com sucesso!");
        handleClose();
      })
      .catch(() => toast.error("Erro ao atualizar o produto."));
  };

  const handleClose = () => {
    setLocalNome('');
    setLocalTipo('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Produto</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 2, mt: 1 }} >
          <div className='modal-box'>
            <TextField
              fullWidth
              label="Nome do Produto"
              value={localNome}
              onChange={(e) => setLocalNome(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
            <TextField
              fullWidth
              select
              label="Tipo do Produto"
              value={localTipo}
              onChange={(e) => setLocalTipo(e.target.value)}
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
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <button onClick={handleClose} className="btn-cancel">
          Fechar
        </button>
        <button onClick={handleEdit} className="btn-add">
          Salvar
        </button>
      </DialogActions>
    </Dialog>
  );
}
