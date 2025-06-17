// components/EditCompanyModal.js
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import "../styles/EditCompanyModal.css"

const EditCompanyModal = ({ empresa, onClose, onSave }) => {
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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Editar Empresa</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Razão Social*</label>
            <input
              type="text"
              name="emp_razaoSocial"
              value={formData.emp_razaoSocial}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>CNPJ*</label>
            <input
              type="text"
              name="emp_cnpj"
              value={formData.emp_cnpj}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Inscrição Estadual</label>
            <input
              type="text"
              name="emp_inscricaoEstado"
              value={formData.emp_inscricaoEstado}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Telefone da Empresa*</label>
              <input
                type="text"
                name="con_telefone"
                value={formData.con_telefone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Telefone do Funcionário*</label>
              <input
                type="text"
                name="emp_funcionario_telefone"
                value={formData.emp_funcionario_telefone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <h3>Endereço</h3>

          <div className="form-row">
            <div className="form-group">
              <label>CEP*</label>
              <input
                type="text"
                name="end_cep"
                value={formData.end_cep}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Cidade*</label>
              <input
                type="text"
                name="end_cidade"
                value={formData.end_cidade}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Bairro*</label>
              <input
                type="text"
                name="end_bairro"
                value={formData.end_bairro}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Rua*</label>
              <input
                type="text"
                name="end_rua"
                value={formData.end_rua}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Número</label>
              <input
                type="text"
                name="emp_numero"
                value={formData.emp_numero}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Complemento</label>
              <input
                type="text"
                name="emp_complemento"
                value={formData.emp_complemento}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="save-btn">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyModal;
