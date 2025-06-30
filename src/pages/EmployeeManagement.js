import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditEmployeeModal from "../components/EditEmployeeModal";
import PopupModal from "../components/PopupModal";
import "./../styles/EmployeeManagement.css";

const FormContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

const getTokenFromCookie = () => {
  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  if (match) return match[2];
  return null;
};

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "user" });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const fetchEmployees = async () => {
    try {
      const token = getTokenFromCookie();
      const res = await axios.get("http://localhost:8800/funcionarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(res.data);
    } catch (err) {
      toast.error("Erro ao buscar funcionários");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (!form.username || !form.email || !form.password) {
      toast.error("Preencha todos os campos para criar um funcionário");
      return;
    }
    if (form.password.length < 8) {
      toast.error("A senha deve ter pelo menos 8 caracteres");
      return;
    }
    try {
      const token = getTokenFromCookie();
      const payload = { ...form };
      await axios.post("http://localhost:8800/funcionarios", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Funcionário criado com sucesso");
      setForm({ username: "", email: "", password: "", role: "user" });
      fetchEmployees();
    } catch (err) {
      toast.error(err.response?.data?.error || "Erro ao criar funcionário");
    }
  };

  const confirmDelete = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!employeeToDelete) return;
    try {
      const token = getTokenFromCookie();
      await axios.delete(`http://localhost:8800/funcionarios/${employeeToDelete.fun_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Funcionário deletado com sucesso");
      fetchEmployees();
    } catch (err) {
      toast.error("Erro ao deletar funcionário");
    } finally {
      setShowDeleteModal(false);
      setEmployeeToDelete(null);
    }
  };

  const openEditModal = (employee) => {
    setEditingEmployee(employee);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingEmployee(null);
    setIsEditModalOpen(false);
  };

  const onEditSave = () => {
    fetchEmployees();
  };

  return (
    <div className="employee-table">
      <h1 className="title">Gerenciamento de Funcionários</h1>

      <Box component="form" noValidate autoComplete="off" sx={{ marginBottom: 2 }}>
        <FormContainer>
          <TextField
            label="Nome"
            name="username"
            value={form.username}
            onChange={handleChange}
            sx={{
              marginRight: 2,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
              width: "30%",
            }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            sx={{
              marginRight: 2,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
              width: "30%",
            }}
          />
          <TextField
            label="Senha"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            sx={{
              marginRight: 2,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
              width: "20%",
            }}
          />
          <TextField
            select
            label="Função"
            name="role"
            value={form.role}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            sx={{
              marginRight: 2,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
              width: "20%",
            }}
          >
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
            {/* FIXME: botão levemente desalinhado */}
          </TextField>
          <button className="btn-salvar btn-add-employee" onClick={handleCreate} >
            <span>
              Criar
            </span>
            <FaPlus />
          </button>
        </FormContainer>
      </Box>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
            <th>Configurações</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.fun_id}>
              <td>{emp.fun_nome}</td>
              <td>{emp.fun_email}</td>
              <td>{emp.fun_role}</td>
              <td>
                <div className="control-box">
                  <FaEdit onClick={() => openEditModal(emp)} size={16} className='icon-size icon-edit' />
                  <FaTrash onClick={() => confirmDelete(emp)} size={16} className='icon-size icon-delete' />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditEmployeeModal
        open={isEditModalOpen}
        onClose={closeEditModal}
        employee={editingEmployee}
        onSave={onEditSave}
        token={getTokenFromCookie()}
      />

      <PopupModal
        showModal={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        actionType="confirmarExclusaoFuncionario"
      />
    </div >
  );
};
export default EmployeeManagement;
