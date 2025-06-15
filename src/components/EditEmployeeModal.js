import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const EditEmployeeModal = ({ open, onClose, employee, onSave }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  useEffect(() => {
    if (employee) {
      setUsername(employee.fun_nome || "");
      setEmail(employee.fun_email || "");
      setRole(employee.fun_role || "user");
      setPassword("");
    }
  }, [employee]);

  const handleSave = async () => {
    if (!username || !email) {
      toast.error("Nome e email são obrigatórios");
      return;
    }
    if (password && password.length < 8) {
      toast.error("Senha deve ter pelo menos 8 caracteres");
      return;
    }
    try {
      const payload = { username, email, role };
      if (password) {
        payload.password = password;
      }
      await axios.put(`http://localhost:8800/funcionarios/${employee.fun_id}`, payload);
      toast.success("Funcionário atualizado com sucesso");
      onSave();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || "Erro ao atualizar funcionário");
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-employee-modal" >
      <Box sx={style}>
        <h2 id="edit-employee-modal">Editar Funcionário</h2>
        <TextField
          fullWidth
          label="Nome"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          select
          label="Função"
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </TextField>
        <TextField
          fullWidth
          label="Nova Senha (deixe em branco para manter)"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Salvar
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose} sx={{ ml: 1 }}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditEmployeeModal;
