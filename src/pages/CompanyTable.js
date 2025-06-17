import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import PopupModal from "../components/PopupModal";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./../styles/ClientTable.css";

const CompanyTable = () => {
  const [empresas, setEmpresas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [actionType, setActionType] = useState("confirmarExclusao");
  const location = useLocation();
  const [shouldRefresh, setShouldRefresh] = useState(false); // Novo estado para controle de atualização

  const fetchEmpresas = async () => {
    try {
      const response = await axios.get('http://localhost:8800/empresa');
      setEmpresas(response.data);
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
      toast.error("Erro ao buscar empresas.");
    }
  };

  useEffect(() => {
    fetchEmpresas();
  }, [location, shouldRefresh]); // Adicionado shouldRefresh como dependência

  const handleDelete = async (empresaId) => {
    setSelectedEmpresa(empresaId);
    setActionType("confirmarExclusaoEmpresa");
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8800/empresa/${selectedEmpresa}`,
        { emp_ativo: false }
      );

      if (response.status === 200) {
        toast.success("Empresa desativada com sucesso!");
        // Atualiza a lista de empresas filtrando a desativada
        setEmpresas(empresas.filter(empresa => empresa.emp_id !== selectedEmpresa));
        // Alternativamente, você pode recarregar todas as empresas:
        // setShouldRefresh(prev => !prev); // Força recarregamento dos dados
      } else {
        toast.error("Erro ao desativar empresa.");
      }
    } catch (error) {
      console.error("Erro ao desativar empresa:", error);
      toast.error(`Erro ao desativar empresa: ${error.response?.data?.message || error.message}`);
    }
    setShowModal(false);
  };

  const formatPhone = (phone) => {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const formatAddress = (empresa) => {
    if (!empresa) return "Endereço não disponível";
    const { end_rua, end_bairro, end_cidade, end_cep } = empresa;
    return `${end_rua || ''}, ${end_bairro || ''}, ${end_cidade || ''}, CEP: ${end_cep || ''}`;
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="client-table">
      <div className="infoClient">
        <h1 className="title">Empresas</h1>
        <NavLink
          to="/empresas/cadastro"
          className={({ isActive }) => `register-link ${isActive ? "active" : ""}`}
        >
          <button className="RegisterBtn">Cadastrar nova Empresa</button>
        </NavLink>
      </div>

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Telefone</th>
            <th>Telefone Funcionário</th>
            <th>Endereço</th>
            <th>Configurações</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa) => (
            <tr key={empresa.emp_id}>
              <td>{empresa.emp_id}</td>
              <td>{empresa.emp_razaoSocial}</td>
              <td>{empresa.emp_cnpj}</td>
              <td>{formatPhone(empresa.con_telefone)}</td>
              <td>{formatPhone(empresa.emp_funcionario_telefone)}</td>
              <td>{formatAddress(empresa)}</td>
              <td>
                <div className="control-box">
                  <NavLink to={`/empresas/${empresa.emp_id}/edit`} id='edit-btn'>
                    <FaEdit size={16} />
                  </NavLink>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(empresa.emp_id)}
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PopupModal
        showModal={showModal}
        onClose={handleModalClose}
        onConfirm={confirmDelete}
        actionType={actionType}
      />

      <ToastContainer />
    </div>
  );
};

export default CompanyTable;
