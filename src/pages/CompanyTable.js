import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import PopupModal from "../components/PopupModal";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./../styles/ClientTable.css";
import "../styles/CompanyTable.css";
import EditCompanyModal from "../components/EditCompanyModal";
import CompanyOrders from "../components/CompanyOrders.js"; // Novo componente que vamos criar

const CompanyTable = () => {
  const [empresas, setEmpresas] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false); // Novo estado para o modal de pedidos
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [actionType, setActionType] = useState("confirmarExclusao");
  const [editingEmpresa, setEditingEmpresa] = useState(null);
  const [ordersData, setOrdersData] = useState({ pedidos: [], totalPedidos: 0 }); // Estado para armazenar os dados dos pedidos
  const location = useLocation();
  const [shouldRefresh, setShouldRefresh] = useState(false);

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
  }, [location, shouldRefresh]);

  const handleDelete = async (empresaId) => {
    setSelectedEmpresa(empresaId);
    setActionType("confirmarExclusaoEmpresa");
    setShowDeleteModal(true);
  };

  const handleListOrders = async (empresa) => {
    if (!empresa.emp_funcionario_telefone) {
      toast.error("Esta empresa não tem telefone de funcionário cadastrado.");
      return;
    }

    try {
      // Remove todos os caracteres não numéricos e pega apenas os últimos 10 dígitos
      const telefone = empresa.emp_funcionario_telefone.replace(/\D/g, '').slice(-10);
      console.log('Buscando pedidos para telefone:', telefone);

      const response = await axios.get(`http://localhost:8800/empresa/${telefone}/pedidos`, {
        validateStatus: function(status) {
          return status < 500; // Resolve apenas se o código de status for menor que 500
        }
      });

      console.log('Resposta da API:', response); // Log completo da resposta

      if (response.status === 404) {
        toast.info("Nenhum pedido encontrado para este telefone no mês atual.");
        return;
      }

      if (response.status !== 200) {
        throw new Error(`Erro ${response.status}: ${response.data?.message || response.statusText}`);
      }

      if (!response.data?.pedidos) {
        throw new Error("Dados de pedidos não encontrados na resposta");
      }

      console.log('Dados dos pedidos recebidos:', response.data);

      setOrdersData({
        pedidos: Array.isArray(response.data.pedidos) ? response.data.pedidos : [],
        totalPedidos: response.data.totalPedidos || 0
      });
      setShowOrdersModal(true);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      toast.error(error.response?.data?.error || error.message || "Erro ao buscar pedidos da empresa.");
    }
  };

  const handleEdit = async (empresa) => {
    try {
      // Busca os dados completos da empresa
      const response = await axios.get(`http://localhost:8800/empresa/${empresa.emp_id}`);
      setEditingEmpresa(response.data);
      setShowEditModal(true);
    } catch (error) {
      console.error("Erro ao buscar dados da empresa:", error);
      toast.error("Erro ao carregar dados para edição.");
    }
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8800/empresa/${selectedEmpresa}`,
        { emp_ativo: false }
      );

      if (response.status === 200) {
        toast.success("Empresa desativada com sucesso!");
        setEmpresas(empresas.filter(empresa => empresa.emp_id !== selectedEmpresa));
      } else {
        toast.error("Erro ao desativar empresa.");
      }
    } catch (error) {
      console.error("Erro ao desativar empresa:", error);
      toast.error(`Erro ao desativar empresa: ${error.response?.data?.message || error.message}`);
    }
    setShowDeleteModal(false);
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:8800/empresa/${editingEmpresa.emp_id}`,
        updatedData
      );

      if (response.status === 200) {
        toast.success("Empresa atualizada com sucesso!");
        setShouldRefresh(prev => !prev);
        setShowEditModal(false);
      } else {
        toast.error("Erro ao atualizar empresa.");
      }
    } catch (error) {
      console.error("Erro ao atualizar empresa:", error);
      toast.error(`Erro ao atualizar empresa: ${error.response?.data?.message || error.message}`);
    }
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
    setShowDeleteModal(false);
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
                  <button
                    className='edit-btn'
                    id='edit-btn'
                    onClick={() => handleEdit(empresa)}
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(empresa.emp_id)}
                  >
                    <FaTrash size={16} />
                  </button>
                  <button
                    className="orders-btn"
                    onClick={() => handleListOrders(empresa)}
                  >
                    Pedidos
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de pedidos */}
      {
        showOrdersModal && (
          <CompanyOrders
            onClose={() => setShowOrdersModal(false)}
            orders={ordersData.pedidos}
            totalOrders={ordersData.totalPedidos}
          />
        )
      }

      <PopupModal
        showModal={showDeleteModal}
        onClose={handleModalClose}
        onConfirm={confirmDelete}
        actionType={actionType}
      />

      {
        showEditModal && editingEmpresa && (
          <EditCompanyModal
            empresa={editingEmpresa}
            open={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSave={handleSaveEdit}
          />
        )
      }

      <ToastContainer />
    </div >
  );
};

export default CompanyTable;
