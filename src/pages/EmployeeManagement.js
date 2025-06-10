import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditEmployeeModal from "../components/EditEmployeeModal";
import "./../styles/ProductTable.css";

const FormContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8800/funcionarios");
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
      await axios.post("http://localhost:8800/funcionarios", form);
      toast.success("Funcionário criado com sucesso");
      setForm({ username: "", email: "", password: "" });
      fetchEmployees();
    } catch (err) {
      toast.error(err.response?.data?.error || "Erro ao criar funcionário");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este funcionário?")) {
      try {
        await axios.delete(`http://localhost:8800/funcionarios/${id}`);
        toast.success("Funcionário deletado com sucesso");
        fetchEmployees();
      } catch (err) {
        toast.error("Erro ao deletar funcionário");
      }
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
    <div className="product-table">
      <h1 className="title">Gerenciamento de Funcionários</h1>

      <Box component="form" noValidate autoComplete="off" sx={{ marginBottom: 2 }}>
        <FormContainer>
          <TextField
            label="Nome"
            name="username"
            value={form.username}
            onChange={handleChange}
            sx={{ marginRight: 2, width: "30%" }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            sx={{ marginRight: 2, width: "30%" }}
          />
          <TextField
            label="Senha"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            sx={{ marginRight: 2, width: "30%" }}
          />
          <Button variant="contained" color="primary" onClick={handleCreate} startIcon={<FaPlus />}>
            Criar
          </Button>
        </FormContainer>
      </Box>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Configurações</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.fun_id}>
              <td>{emp.fun_nome}</td>
              <td>{emp.fun_email}</td>
              <td>
                <div className="control-box">
                  <button className="edit-btn" onClick={() => openEditModal(emp)}>
                    Editar
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(emp.fun_id)}>
                    Deletar
                  </button>
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
      />
    </div>
  );
};

export default EmployeeManagement;
