// components/EditCompanyModal.js
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography
} from '@mui/material';

const EditCompanyModal = ({ empresa, open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    emp_razaoSocial: '',
    emp_cnpj: '',
    emp_inscricaoEstado: '',
    emp_numero: '',
    emp_complemento: '',
    con_telefone: '',
    emp_funcionario_telefone: '',
    end_cep: '',
    end_cidade: '',
    end_bairro: '',
    end_rua: ''
  });

  useEffect(() => {
    if (empresa) {
      setFormData({
        emp_razaoSocial: empresa.emp_razaoSocial || '',
        emp_cnpj: empresa.emp_cnpj || '',
        emp_inscricaoEstado: empresa.emp_inscricaoEstado || '',
        emp_numero: empresa.emp_numero || '',
        emp_complemento: empresa.emp_complemento || '',
        con_telefone: empresa.con_telefone || '',
        emp_funcionario_telefone: empresa.emp_funcionario_telefone || '',
        end_cep: empresa.end_cep || '',
        end_cidade: empresa.end_cidade || '',
        end_bairro: empresa.end_bairro || '',
        end_rua: empresa.end_rua || ''
      });
    }
  }, [empresa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica
    if (!formData.emp_razaoSocial || !formData.emp_cnpj || !formData.con_telefone ||
      !formData.emp_funcionario_telefone || !formData.end_cep || !formData.end_cidade ||
      !formData.end_bairro || !formData.end_rua) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    // Organiza os dados para enviar ao backend
    const updatedData = {
      empInfo: {
        emp_razaoSocial: formData.emp_razaoSocial,
        emp_cnpj: formData.emp_cnpj,
        emp_inscricaoEstado: formData.emp_inscricaoEstado,
        emp_numero: formData.emp_numero,
        emp_complemento: formData.emp_complemento
      },
      address: {
        end_cep: formData.end_cep,
        end_cidade: formData.end_cidade,
        end_bairro: formData.end_bairro,
        end_rua: formData.end_rua
      },
      con_telefone: formData.con_telefone,
      emp_funcionario_telefone: formData.emp_funcionario_telefone
    };

    onSave(updatedData);
  };

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

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Editar Empresa</DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={inputFormat}
            margin="normal"
            label="Razão Social*"
            name="emp_razaoSocial"
            value={formData.emp_razaoSocial}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            sx={inputFormat}
            margin="normal"
            label="CNPJ*"
            name="emp_cnpj"
            value={formData.emp_cnpj}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            sx={inputFormat}
            margin="normal"
            label="Inscrição Estadual"
            name="emp_inscricaoEstado"
            value={formData.emp_inscricaoEstado}
            onChange={handleChange}
            fullWidth
          />

          <div style={{ display: 'flex', gap: '16px' }}>
            <TextField
              sx={inputFormat}
              margin="normal"
              label="Telefone da Empresa*"
              name="con_telefone"
              value={formData.con_telefone}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              sx={inputFormat}
              margin="normal"
              label="Telefone do Funcionário*"
              name="emp_funcionario_telefone"
              value={formData.emp_funcionario_telefone}
              onChange={handleChange}
              required
              fullWidth
            />
          </div>

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Endereço</Typography>

          <div style={{ display: 'flex', gap: '16px' }}>
            <TextField
              sx={inputFormat}
              margin="normal"
              label="CEP*"
              name="end_cep"
              value={formData.end_cep}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              sx={inputFormat}
              margin="normal"
              label="Cidade*"
              name="end_cidade"
              value={formData.end_cidade}
              onChange={handleChange}
              required
              fullWidth
            />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <TextField
              sx={inputFormat}
              margin="normal"
              label="Bairro*"
              name="end_bairro"
              value={formData.end_bairro}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              sx={inputFormat}
              margin="normal"
              label="Rua*"
              name="end_rua"
              value={formData.end_rua}
              onChange={handleChange}
              required
              fullWidth
            />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <TextField
              sx={inputFormat}
              margin="normal"
              label="Número"
              name="emp_numero"
              value={formData.emp_numero}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              sx={inputFormat}
              margin="normal"
              label="Complemento"
              name="emp_complemento"
              value={formData.emp_complemento}
              onChange={handleChange}
              fullWidth
            />
          </div>
        </form>
      </DialogContent>

      <DialogActions>
        <button className="btn-cancel" onClick={onClose}>
          Cancelar
        </button>
        <button className="btn-add" onClick={handleSubmit}>
          Salvar Alterações
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCompanyModal;
