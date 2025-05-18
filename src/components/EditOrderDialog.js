import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Typography
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import "../styles/Global.css"

const statusOptions = ['Em Andamento', 'Concluído', 'Cancelado'];

const EditOrderDialog = ({ id, open, onClose, onStatusChange }) => {
  const [form, setForm] = useState({
    ped_status: '',
    ped_data: '',
    ped_observacao: '',
    ped_valor: '',
    ped_tipoPagamento: '',
    ped_ordem_dia: '',
    cli_nome: '',
    cli_sobrenome: '',
    fun_nome: '',

    // FK dos produtos no pedido (ajuste conforme nomes no backend)
    arroz_fk: '',
    feijao_fk: '',
    massa_fk: '',
    carne01_fk: '',
    carne02_fk: '',
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (open && id) {
      // Buscar produtos
      axios.get('http://localhost:8800/produtos')
        .then(prodRes => {
          setProducts(prodRes.data);
        })
        .catch(err => {
          toast.error("Erro ao carregar produtos.");
          console.error(err);
        });

      // Buscar pedido
      axios.get('http://localhost:8800/pedidos')
        .then(res => {
          const pedido = res.data.find(p => p.ped_id === id);
          if (!pedido) {
            toast.error("Pedido não encontrado.");
            return;
          }

          // Popular o formulário com os dados do pedido
          setForm({
            ped_status: pedido.ped_status || '',
            ped_data: pedido.ped_data?.split('T')[0] || '',
            ped_observacao: pedido.ped_observacao || '',
            ped_valor: pedido.ped_valor || '',
            ped_tipoPagamento: pedido.ped_tipoPagamento || '',
            ped_ordem_dia: pedido.ped_ordem_dia || '',
            cli_nome: pedido.cli_nome || '',
            cli_sobrenome: pedido.cli_sobrenome || '',
            fun_nome: pedido.fun_nome || '',

            arroz_fk: pedido.arroz_fk || '',
            feijao_fk: pedido.feijao_fk || '',
            massa_fk: pedido.massa_fk || '',
            carne01_fk: pedido.carne01_fk || '',
            carne02_fk: pedido.carne02_fk || '',
          });
        })
        .catch(err => {
          toast.error("Erro ao carregar pedido.");
          console.error(err);
        });
    }
  }, [open, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8800/pedidos/${id}`, form);
      toast.success("Pedido atualizado com sucesso!");
      onClose();
      if (onStatusChange) onStatusChange();
    } catch (error) {
      toast.error("Erro ao atualizar pedido.");
      console.error(error);
    }
  };

  // Função para pegar o nome do produto pelo id
  const getProductName = (id) => {
    const product = products.find(p => p.pro_id === id);
    return product ? product.pro_nome : '';
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
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
          disabled
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
          label="Valor"
          name="ped_valor"
          type="number"
          fullWidth
          value={form.ped_valor}
          onChange={handleChange}
        />

        <TextField
          margin="normal"
          label="Tipo de Pagamento"
          name="ped_tipoPagamento"
          fullWidth
          value={form.ped_tipoPagamento}
          onChange={handleChange}
        />

        <TextField
          disabled
          margin="normal"
          label="Cliente - Nome"
          name="cli_nome"
          fullWidth
          value={form.cli_nome}
          InputProps={{ readOnly: true }}
          onClick={() => { toast.warning("As informações do cliente devem ser alteradas na página de clietes") }}
        />

        <TextField
          disabled
          margin="normal"
          label="Cliente - Sobrenome"
          name="cli_sobrenome"
          fullWidth
          value={form.cli_sobrenome}
          InputProps={{ readOnly: true }}
          onClick={() => { toast.warning("As informações do cliente devem ser alteradas na página de clietes") }}
        />

        <TextField
          disabled
          margin="normal"
          label="Funcionário Responsável"
          name="fun_nome"
          fullWidth
          value={form.fun_nome}
          InputProps={{ readOnly: true }}
        />

        {/* Selects para os produtos, usando FK e nome do produto */}
        {['arroz_fk', 'feijao_fk', 'massa_fk', 'acompanhamento_fk', 'salada_fk', 'carne01_fk', 'carne02_fk'].map((field) => (
          <TextField
            key={field}
            margin="normal"
            label={field.replace('_fk', '').toUpperCase()}
            name={field}
            select
            fullWidth
            value={form[field]}
            onChange={handleChange}
          >
            <MenuItem value="">-- Nenhum --</MenuItem>
            {products.map(product => (
              <MenuItem key={product.pro_id} value={product.pro_id}>
                {product.pro_nome}
              </MenuItem>
            ))}
          </TextField>
        ))}

      </DialogContent>

      <DialogActions>
        <button onClick={onClose} className="btn-cancel">Cancelar</button>
        <button onClick={handleSubmit} className="btn-add">Salvar</button>
      </DialogActions>
    </Dialog >
  );
};

export default EditOrderDialog;
