import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Typography
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const statusOptions = ['Em Andamento', 'Concluído', 'Cancelado'];

const EditOrderDialog = ({ id, open, onClose, onStatusChange }) => {
  const [form, setForm] = useState({
    ped_status: '',
    ped_data: '',
    ped_observacao: '',
    ped_valor: ''
  });

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (open && id) {
      // Buscar todos os pedidos e filtrar o desejado
      axios.get('http://localhost:8800/pedidos')
        .then(res => {
          const pedido = res.data.find(p => p.ped_id === id);
          if (!pedido) {
            toast.error("Pedido não encontrado.");
            return;
          }

          setForm({
            ped_status: pedido.ped_status || '',
            ped_data: pedido.ped_data?.split('T')[0] || '',
            ped_observacao: pedido.ped_observacao || '',
            ped_valor: pedido.ped_valor || ''
          });

          setProduct({
            nome: pedido.ite_nome,
            descricao: pedido.ite_descricao,
            quantidade: pedido.ite_qtd,
            categoria: pedido.ite_categoria
          });
        })
        .catch(err => {
          console.error("Erro ao buscar pedido:", err);
          toast.error("Erro ao carregar o pedido.");
        });

      // Buscar produtos ativos
      axios.get('http://localhost:8800/produtos')
        .then(res => setProducts(res.data))
        .catch(err => {
          console.error("Erro ao buscar produtos:", err);
          toast.error("Erro ao carregar produtos.");
        });
    }
  }, [open, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8800/${id}`, {
        ped_id: id,
        ...form
      });
      toast.success("Pedido atualizado com sucesso!");
      onClose();
      if (onStatusChange) onStatusChange();
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      toast.error("Erro ao atualizar pedido.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Pedido #{id}</DialogTitle>
      <DialogContent dividers>
        <TextField
          margin="normal"
          label="Status"
          name="ped_status"
          select
          fullWidth
          value={form.ped_status}
          onChange={handleChange}
        >
          {statusOptions.map(option => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>

        <TextField
          margin="normal"
          label="Data"
          name="ped_data"
          type="date"
          fullWidth
          value={form.ped_data}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          margin="normal"
          label="Observação"
          name="ped_observacao"
          fullWidth
          multiline
          rows={3}
          value={form.ped_observacao}
          onChange={handleChange}
        />

        <TextField
          margin="normal"
          label="Valor"
          name="ped_valor"
          type="number"
          fullWidth
          value={form.ped_valor}
          onChange={handleChange}
        />

        {product && (
          <div style={{ marginTop: 20 }}>
            <Typography variant="subtitle1">Produto do Pedido</Typography>
            <Typography><strong>Nome:</strong> {product.nome}</Typography>
            <Typography><strong>Descrição:</strong> {product.descricao}</Typography>
            <Typography><strong>Quantidade:</strong> {product.quantidade}</Typography>
            <Typography><strong>Categoria:</strong> {product.categoria}</Typography>
          </div>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOrderDialog;
