import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TextField } from "@mui/material";
import PopupModal from "../components/PopupModal";

import "../styles/Global.css";
import "../styles/AddClient.css";

// Configuração base do Axios
const api = axios.create({
  baseURL: "http://localhost:8800",
});

const AddClient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emp_razaoSocial: "",
    emp_inscricaoEstado: "",
    emp_cnpj: "",
    con_telefone: "",
    emp_funcionario_telefone: "",
    end_cep: "",
    end_cidade: "",
    end_bairro: "",
    end_rua: "",
    emp_numero: "",
    emp_complemento: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("confirmarCadastroEmpresa");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.emp_razaoSocial.trim() ||
      !formData.emp_cnpj.trim() ||
      !formData.con_telefone.trim() ||
      !formData.emp_funcionario_telefone.trim() ||
      !formData.end_cep.trim() ||
      !formData.end_cidade.trim() ||
      !formData.end_bairro.trim() ||
      !formData.end_rua.trim() ||
      !formData.emp_numero.trim()
    ) {
      toast.warn("Preencha todos os campos obrigatórios, exceto complemento.");
      return;
    }

    setActionType("confirmarCadastroEmpresa");
    setShowModal(true);
  };

  const handleConfirm = async () => {
    const telefone = formData.con_telefone.replace(/[^\d]/g, "");
    const funcionarioTelefone = formData.emp_funcionario_telefone.replace(/[^\d]/g, "");
    const cnpj = formData.emp_cnpj.replace(/[^\d]/g, "");

    const dataToSend = {
      empInfo: {
        emp_razaoSocial: formData.emp_razaoSocial,
        emp_inscricaoEstado: formData.emp_inscricaoEstado || null,
        emp_cnpj: cnpj,
        emp_numero: formData.emp_numero,
        emp_complemento: formData.emp_complemento || null
      },
      address: {
        end_cep: formData.end_cep,
        end_cidade: formData.end_cidade,
        end_bairro: formData.end_bairro,
        end_rua: formData.end_rua
      },
      con_telefone: telefone,
      emp_funcionario_telefone: funcionarioTelefone
    };

    console.log("Dados enviados para cadastro:", dataToSend);

    try {
      const response = await api.post("/empresa", dataToSend);

      if (response.status === 201) {
        toast.success("Empresa cadastrada com sucesso!");
        setFormData({
          emp_razaoSocial: "",
          emp_inscricaoEstado: "",
          emp_cnpj: "",
          con_telefone: "",
          emp_funcionario_telefone: "",
          end_cep: "",
          end_cidade: "",
          end_bairro: "",
          end_rua: "",
          emp_numero: "",
          emp_complemento: ""
        });
        setShowModal(false);
        navigate("/empresas");
      } else {
        toast.error("Erro inesperado ao cadastrar a empresa.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar empresa:", error);

      let errorMessage = "Erro ao cadastrar a empresa.";
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.error || "Dados inválidos.";
        } else if (error.response.data?.error) {
          errorMessage = error.response.data.error;
        }
      }

      toast.error(errorMessage);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formatPhone = (value) => {
    const nums = value.replace(/\D/g, '');
    if (nums.length <= 10) {
      return nums.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return nums.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const formatCNPJ = (value) => {
    const nums = value.replace(/\D/g, '');
    return nums
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    handleChange({
      target: {
        name: e.target.name,
        value: formatted
      }
    });
  };

  const handleCNPJChange = (e) => {
    const formatted = formatCNPJ(e.target.value);
    handleChange({
      target: {
        name: "emp_cnpj",
        value: formatted
      }
    });
  };

  return (
    <div className="container-cliente">
      <div className="header-cliente">
        <h1 className="title-cliente">Cadastro de Empresa</h1>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className="sub-text">Empresa</h2>

            <div className="CliForm">
              <TextField
                id="emp_cnpj"
                label="CNPJ"
                variant="outlined"
                name="emp_cnpj"
                required
                value={formData.emp_cnpj}
                onChange={handleCNPJChange}
                placeholder="99.999.999/9999-99"
                inputProps={{ maxLength: 18 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#FD1F4A" },
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" }
                  },
                  "& .MuiInputBase-input": {
                    color: "black"
                  },
                  width: "30ch"
                }}
              />
            </div>

            <div className="CliForm" sx={{ marginTop: 2 }}>  {/* 16px = 1 unidade do tema */}
              <TextField
                id="emp_razaoSocial"
                label="Razão Social"
                variant="outlined"
                name="emp_razaoSocial"
                value={formData.emp_razaoSocial}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#FD1F4A" },
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" }
                  },
                  "& .MuiInputBase-input": {
                    color: "black"
                  },
                  width: "30ch",
                  marginTop: 1
                }}
              />
            </div>

            {/* <div className="CliForm"> */}
            {/*   <TextField */}
            {/*     id="emp_inscricaoEstado" */}
            {/*     label="Inscrição Estadual" */}
            {/*     variant="outlined" */}
            {/*     name="emp_inscricaoEstado" */}
            {/*     value={formData.emp_inscricaoEstado} */}
            {/*     onChange={handleChange} */}
            {/*     sx={{ */}
            {/*       "& .MuiOutlinedInput-root": { */}
            {/*         "&:hover fieldset": { borderColor: "#FD1F4A" }, */}
            {/*         "&.Mui-focused fieldset": { borderColor: "#FD1F4A" } */}
            {/*       }, */}
            {/*       "& .MuiInputBase-input": { */}
            {/*         color: "black" */}
            {/*       }, */}
            {/*       width: "30ch" */}
            {/*     }} */}
            {/*   /> */}
            {/* </div> */}

            <hr />

            <h2 className="sub-text">Contato</h2>
            <div className="CliForm tel">
              <TextField
                id="con_telefone"
                label="Telefone da Empresa"
                variant="outlined"
                name="con_telefone"
                value={formData.con_telefone}
                onChange={(e) => handlePhoneChange(e)}
                placeholder="(99) 99999-9999"
                inputProps={{ maxLength: 15 }}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#FD1F4A" },
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" }
                  },
                  "& .MuiInputBase-input": {
                    color: "black"
                  },
                  width: "30ch"
                }}
              />
            </div>


            <hr />

            <h2 className="sub-text">Endereço</h2>

            <div className="addressForm">
              <TextField
                label="CEP"
                variant="outlined"
                name="end_cep"
                value={formData.end_cep}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#FD1F4A" },
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" }
                  },
                  "& .MuiInputBase-input": {
                    color: "black"
                  },
                  width: "15ch"
                }}
              />
              <TextField
                label="Cidade"
                variant="outlined"
                name="end_cidade"
                value={formData.end_cidade}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#FD1F4A" },
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" }
                  },
                  "& .MuiInputBase-input": {
                    color: "black"
                  },
                  width: "30ch"
                }}
              />
            </div>

            <div className="addressForm">
              <TextField
                label="Bairro"
                variant="outlined"
                name="end_bairro"
                value={formData.end_bairro}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#FD1F4A" },
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" }
                  },
                  "& .MuiInputBase-input": {
                    color: "black"
                  },
                  width: "30ch"
                }}
              />
              <TextField
                label="Rua"
                variant="outlined"
                name="end_rua"
                value={formData.end_rua}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#FD1F4A" },
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" }
                  },
                  "& .MuiInputBase-input": {
                    color: "black"
                  },
                  width: "40ch"
                }}
              />
            </div>

            <div className="addressForm">
              <TextField
                label="Número"
                variant="outlined"
                name="emp_numero"
                value={formData.emp_numero}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#FD1F4A" },
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" }
                  },
                  "& .MuiInputBase-input": {
                    color: "black"
                  },
                  width: "10ch"
                }}
              />

              <TextField
                label="Complemento"
                variant="outlined"
                name="emp_complemento"
                value={formData.emp_complemento}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#FD1F4A" },
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" }
                  },
                  "& .MuiInputBase-input": {
                    color: "black"
                  },
                  width: "25ch"
                }}
              />
            </div>

            <hr />
            <h2 className="sub-text">Contato Funcionário</h2>
            <div className="CliForm tel">
              <TextField
                id="emp_funcionario_telefone"
                label="Telefone do Funcionário"
                variant="outlined"
                name="emp_funcionario_telefone"
                value={formData.emp_funcionario_telefone}
                onChange={(e) => handlePhoneChange(e)}
                placeholder="(99) 99999-9999"
                inputProps={{ maxLength: 15 }}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#FD1F4A" },
                    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" }
                  },
                  "& .MuiInputBase-input": {
                    color: "black"
                  },
                  width: "30ch"
                }}
              />
            </div>

            <div className="addClient-btn-add">
              <button type="submit" className="btn-add">
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>

      <PopupModal
        showModal={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        actionType={actionType}
      />
    </div>
  );
};

export default AddClient;
