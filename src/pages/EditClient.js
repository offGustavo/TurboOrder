import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ClientInfo from "../components/ClientInfo";
import Address from "../components/Address";
import "../styles/EditClient.css"

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cli_nome: "",
    cli_sobrenome: "",
    con_telefone: "",
    cli_numero: "",
    cli_complemento: "",
    cli_endereco: {
      cep: "",
      cidade: "",
      bairro: "",
      rua: ""
    }
  });

  useEffect(() => {
    const fetchClient = async () => {
      try {
        console.log("Fetching all clients to find client with id:", id);
        const res = await axios.get(`http://localhost:8800/clientes`);
        console.log("Response data:", res.data);
        const clientData = res.data.find(client => String(client.cli_id) === id);
        if (clientData) {
          console.log("Client data found:", clientData);
          setFormData({
            ...clientData,
            cli_numero: clientData.cli_numero || "",
            cli_complemento: clientData.cli_complemento || "",
            cli_endereco: {
              cep: clientData.end_cep || "",
              cidade: clientData.end_cidade || "",
              bairro: clientData.end_bairro || "",
              rua: clientData.end_rua || ""
            }
          });
          console.log("Form data set:", {
            ...clientData,
            cli_numero: clientData.cli_numero || "",
            cli_complemento: clientData.cli_complemento || "",
            cli_endereco: {
              cep: clientData.cli_cep || "",
              cidade: clientData.cli_cidade || "",
              bairro: clientData.cli_bairro || "",
              rua: clientData.cli_endereco || ""
            }
          });
        } else {
          alert("Nenhum dado encontrado para o cliente.");
        }
      } catch (err) {
        console.error("Erro ao buscar cliente:", err);
        alert("Erro ao carregar dados do cliente.");
      }
    };

    fetchClient();
  }, [id]);

  useEffect(() => {
    const fetchAddressByCep = async () => {
      const cep = formData.cli_endereco.cep.replace(/\D/g, ""); // remove tudo que não for número
      if (cep.length === 8) {
        try {
          const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          if (!res.data.erro) {
            setFormData(prev => ({
              ...prev,
              cli_endereco: {
                ...prev.cli_endereco,
                cidade: res.data.localidade,
                bairro: res.data.bairro,
                rua: res.data.logradouro
              }
            }));
          }
        } catch (err) {
          console.error("Erro ao buscar endereço pelo CEP:", err);
        }
      }
    };

    fetchAddressByCep();
  }, [formData.cli_endereco.cep]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parentKey]: {
          ...prevData[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        cli_nome: formData.cli_nome,
        cli_sobrenome: formData.cli_sobrenome,
        con_telefone: formData.con_telefone,
        cli_numero: formData.cli_numero,
        cli_complemento: formData.cli_complemento,
        end_cep: formData.cli_endereco.cep,
        end_cidade: formData.cli_endereco.cidade,
        end_bairro: formData.cli_endereco.bairro,
        end_rua: formData.cli_endereco.rua,
      };
      await axios.put(`http://localhost:8800/clientes/${id}`, payload);
      alert("Cliente atualizado com sucesso!");
      navigate("/clientes");
    } catch (err) {
      console.error("Erro ao atualizar cliente:", err);
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
