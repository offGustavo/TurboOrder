import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ClientInfo from "../components/ClientInfo";
import Address from "../components/Address";
import "../styles/EditClient.css";

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cli_nome: "",
    cli_sobrenome: "",
    con_telefone: "",
    cli_cep: "",
    cli_cidade: "",
    cli_bairro: "",
    cli_rua: "",
    cli_numero: "",
    cli_complemento: ""
  });

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get("http://localhost:8800/clientes");
        const client = res.data.find(c => String(c.cli_id) === id);
        if (client) {
          setFormData({
            cli_nome: client.cli_nome || "",
            cli_sobrenome: client.cli_sobrenome || "",
            con_telefone: client.con_telefone || "",
            cli_cep: client.end_cep || "",
            cli_cidade: client.end_cidade || "",
            cli_bairro: client.end_bairro || "",
            cli_rua: client.end_rua || "",
            cli_numero: client.cli_numero || "",
            cli_complemento: client.cli_complemento || ""
          });
        } else {
          alert("Cliente não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        alert("Erro ao buscar dados do cliente.");
      }
    };

    fetchClient();
  }, [id]);

  useEffect(() => {
    const fetchAddressByCep = async () => {
      const cep = formData.cli_cep.replace(/\D/g, "");
      if (cep.length === 8) {
        try {
          const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          if (!res.data.erro) {
            setFormData(prev => ({
              ...prev,
              cli_cidade: res.data.localidade,
              cli_bairro: res.data.bairro,
              cli_rua: res.data.logradouro
            }));
          }
        } catch (error) {
          console.error("Erro ao buscar endereço via CEP:", error);
        }
      }
    };

    fetchAddressByCep();
  }, [formData.cli_cep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      cli_nome: formData.cli_nome,
      cli_sobrenome: formData.cli_sobrenome,
      con_telefone: formData.con_telefone,
      cli_numero: formData.cli_numero,
      cli_complemento: formData.cli_complemento,
      end_cep: formData.cli_cep,
      end_cidade: formData.cli_cidade,
      end_bairro: formData.cli_bairro,
      end_rua: formData.cli_rua
    };

    try {
      await axios.put(`http://localhost:8800/clientes/${id}`, payload);
      alert("Cliente atualizado com sucesso!");
      navigate("/clientes");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      alert("Erro ao atualizar cliente.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="title-form">Editar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="section-margin">
          <ClientInfo formData={formData} handleChange={handleChange} />
        </div>
        <hr />
        <div className="section-margin">
          <Address formData={formData} handleChange={handleChange} />
        </div>
        <button className="btn-add" type="submit">Atualizar Cliente</button>
      </form>
    </div>
  );
};

export default EditClient;