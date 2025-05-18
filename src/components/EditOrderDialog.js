import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Typography
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import "../styles/Global.css";

const statusOptions = ['Em Andamento', 'Concluído', 'Cancelado'];

const tipoPorField = {
  arroz_fk: "Arroz",
  feijao_fk: "Feijão",
  massa_fk: "Massa",
  salada_fk: "Salada",
  acompanhamento_fk: "Acompanhamento",
  carne01_fk: "Carne",
  carne02_fk: "Carne"
};

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

    cliente_fk: '',
    funcionario_fk: '',

    itens: {
      arroz_fk: '',
      feijao_fk: '',
      massa_fk: '',
      carne01_fk: '',
      carne02_fk: '',
      salada_fk: '',
      acompanhamento_fk: ''
    },
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

          const itens = {
            arroz_fk: pedido.arroz_fk || '',
            feijao_fk: pedido.feijao_fk || '',
            massa_fk: pedido.massa_fk || '',
            salada_fk: pedido.salada_fk || '',
            acompanhamento_fk: pedido.acompanhamento_fk || '',
            carne01_fk: pedido.carne01_fk || '',
            carne02_fk: pedido.carne02_fk || '',
          };
          // Preencher form com os dados do pedido
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

            cliente_fk: pedido.cliente_fk || '',
            funcionario_fk: pedido.funcionario_fk || '',

            itens
          });
        })
        .catch(err => {
          toast.error("Erro ao carregar pedido.");
          console.error(err);
        });
    }
  }, [open, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "ped_valor" ? Number(value) : value,
    }));
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

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle>Editar Pedido #{id}</DialogTitle>
      <DialogContent dividers>
        <TextField
          margin="normal"
          label="Estado do Pedido"
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
          select
          fullWidth
          value={form.ped_valor}
          onChange={handleChange}
        >
          <MenuItem value={20}>R$ 20,00</MenuItem>
          <MenuItem value={22}>R$ 22,00</MenuItem>
        </TextField>

        <TextField
          margin="normal"
          label="Tipo de Pagamento"
          name="ped_tipoPagamento"
          fullWidth
          value={form.ped_tipoPagamento}
          onChange={handleChange}
        />

        <TextField
          margin="normal"
          label="Observação"
          name="ped_observacao"
          fullWidth
          value={form.ped_observacao}
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
          onClick={() => { toast.warning("As informações do cliente devem ser alteradas na página de clientes") }}
        />

        <TextField
          disabled
          margin="normal"
          label="Cliente - Sobrenome"
          name="cli_sobrenome"
          fullWidth
          value={form.cli_sobrenome}
          InputProps={{ readOnly: true }}
          onClick={() => { toast.warning("As informações do cliente devem ser alteradas na página de clientes") }}
        />

        {Object.keys(tipoPorField).map((field) => {
          // Oculta carne02_fk se o valor do pedido for diferente de 22
          if (field === 'carne02_fk' && Number(form.ped_valor) !== 22) return null;
          const tipo = tipoPorField[field];
          const produtosFiltrados = products.filter(
            (p) => p.pro_tipo?.toLowerCase() === tipo.toLowerCase()
          );
          return (
            <TextField
              key={field}
              margin="normal"
              label={tipo.toUpperCase()}
              name={field}
              select
              fullWidth
              value={form.itens?.[field] || ''}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  itens: {
                    ...prev.itens,
                    [field]: e.target.value
                  }
                }))
              }
            >
              <MenuItem value="">-- Nenhum --</MenuItem>
              {produtosFiltrados.map((product) => (
                <MenuItem key={product.pro_id} value={product.pro_id}>
                  {product.pro_nome}
                </MenuItem>
              ))}
            </TextField>
          );
        })}

      </DialogContent>

      <DialogActions>
        <button onClick={onClose} className="btn-cancel">Cancelar</button>
        <button onClick={handleSubmit} className="btn-add">Salvar</button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOrderDialog;
