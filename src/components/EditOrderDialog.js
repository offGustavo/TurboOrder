import React, { useEffect, useState, useRef } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import "../styles/Global.css";
import "../styles/EditOrderDialog.css";

import {
  Printer,
  Print,
  Text,
  Row,
  Line,
  Br,
  Cut,
  Barcode,
  QRCode,
  Image,
  render,
} from "react-thermal-printer";

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
  const [clientInfo, setClientInfo] = useState({
    cli_nome: "",
    cli_sobrenome: "",
    con_telefone: "",
    cli_numero: "",
    cli_complemento: "",
    end_cep: "",
    end_cidade: "",
    end_bairro: "",
    end_rua: ""
  });

  const [form, setForm] = useState({
    ped_status: '',
    ped_data: '',
    ped_horarioRetirada: '',
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

  const inputFormat = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": { borderColor: "#FD1F4A" },
      "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
    },
    "& .MuiInputBase-input": {
      color: "black",
    },
    width: "100%",
  };

  const [products, setProducts] = useState([]);
  const printerRef = useRef(null);

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

      axios.get(`http://localhost:8800/pedidos/id/${id}`)
        .then(res => {
          const pedido = res.data;
          if (!pedido) {
            toast.error("Pedido não encontrado.");
            return;
          }

          // Buscar informações do cliente
          axios.get(`http://localhost:8800/clientes/${pedido.cliente_fk}`)
            .then(clienteRes => {
              const cliente = clienteRes.data;
              setClientInfo({
                cli_nome: cliente.cli_nome,
                cli_sobrenome: cliente.cli_sobrenome,
                con_telefone: cliente.contato?.con_telefone || '',
                cli_numero: cliente.endereco?.cli_numero || '',
                cli_complemento: cliente.endereco?.cli_complemento || '',
                end_cep: cliente.endereco?.end_cep || '',
                end_cidade: cliente.endereco?.end_cidade || '',
                end_bairro: cliente.endereco?.end_bairro || '',
                end_rua: cliente.endereco?.end_rua || ''
              });
            })
            .catch(err => {
              console.error("Erro ao buscar informações do cliente:", err);
            });

          const itens = {
            arroz_fk: pedido.arroz_fk || '',
            feijao_fk: pedido.feijao_fk || '',
            massa_fk: pedido.massa_fk || '',
            salada_fk: pedido.salada_fk || '',
            acompanhamento_fk: pedido.acompanhamento_fk || '',
            carne01_fk: pedido.carne01_fk || '',
            carne02_fk: pedido.carne02_fk || '',
          };

          setForm({
            ped_status: pedido.ped_status || '',
            ped_data: pedido.ped_data?.split('T')[0] || '',
            ped_horarioRetirada: pedido.ped_horarioRetirada || '',
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

  const handlePrint = async () => {
    const receipt = (
      <Printer type="epson" width={42}>
        <Text size={{ width: 2, height: 2 }} bold>
          Pedido #{id}
        </Text>
        <Br />
        <Line />
        <Text>Cliente: {form.cli_nome} {form.cli_sobrenome}</Text>
        <Text>Telefone: {clientInfo.con_telefone}</Text>
        <Text>Endereço: {clientInfo.end_rua}, {clientInfo.cli_numero} {clientInfo.cli_complemento}</Text>
        <Text>Bairro: {clientInfo.end_bairro}, {clientInfo.end_cidade} - CEP: {clientInfo.end_cep}</Text>
        <Text>Valor: R$ {form.ped_valor?.toFixed(2)}, Tipo: {form.ped_tipoPagamento}</Text>
        <Text>Observações: {form.ped_observacao}</Text>
        <Text>Itens do Pedido:</Text>
        {Object.entries(form.itens).map(([key, productId]) => {
          if (!productId) return null;
          const product = products.find(p => p.pro_id === productId);
          return product ? <Text key={key}>- {tipoPorField[key]}: {product.pro_nome}</Text> : null;
        })}
        {form.ped_horarioRetirada && (
          <Text>Retirada: {form.ped_horarioRetirada}</Text>
        )}
        <Cut />
      </Printer>
    );

    try {
      const data = await render(receipt);
      const port = await window.navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      const writer = port.writable?.getWriter();
      if (writer) {
        await writer.write(data);
        writer.releaseLock();
      }
    } catch (error) {
      alert("Erro ao imprimir o pedido: " + error.message);
      console.error(error);
    }
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
          sx={inputFormat}
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
          sx={inputFormat}
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

        {form.ped_horarioRetirada && (
          <TextField
            sx={inputFormat}
            margin="normal"
            label="Horário de Retirada"
            name="ped_horarioRetirada"
            type="time"
            fullWidth
            value={form.ped_horarioRetirada}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        )}

        <TextField
          sx={inputFormat}
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
          sx={inputFormat}
          margin="normal"
          label="Tipo de Pagamento"
          name="ped_tipoPagamento"
          fullWidth
          value={form.ped_tipoPagamento}
          onChange={handleChange}
        />

        <TextField
          sx={inputFormat}
          margin="normal"
          label="Observação"
          name="ped_observacao"
          fullWidth
          value={form.ped_observacao}
          onChange={handleChange}
        />

        <TextField
          sx={inputFormat}
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
          sx={inputFormat}
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
          if (field === 'carne02_fk' && Number(form.ped_valor) !== 22) return null;
          const tipo = tipoPorField[field];
          const produtosFiltrados = products.filter(
            (p) => p.pro_tipo?.toLowerCase() === tipo.toLowerCase()
          );
          return (
            <TextField
              sx={inputFormat}
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
        <button onClick={handlePrint} className="btn-print">Imprimir</button>
        <button onClick={onClose} className="btn-cancel">Cancelar</button>
        <button onClick={handleSubmit} className="btn-add">Salvar</button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOrderDialog;
