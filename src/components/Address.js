import React, { useEffect } from "react";
import { Box, TextField } from "@mui/material";
import axios from "axios";
import "../styles/Address.css";

const Address = ({ formData, handleChange, setFormData }) => {
  const { cli_cep } = formData;

 useEffect(() => {
  const fetchAddress = async () => {
    if (!cli_cep) return; // Se estiver vazio, não faz nada

    const cep = cli_cep.replace(/\D/g, "");
      if (cep.length === 8) {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          if (!response.data.erro) {
            setFormData((prevData) => ({
              ...prevData,
              cli_rua: response.data.logradouro || "",
              cli_bairro: response.data.bairro || "",
              cli_cidade: response.data.localidade || "",
            }));
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
        }
      }
    };

    fetchAddress();
  }, [cli_cep, setFormData]);

  const handleCepChange = (e) => {
    const cep = e.target.value.replace(/\D/g, "").slice(0, 8);
    const formattedCep = cep.length > 5 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep;

    setFormData((prevData) => ({
      ...prevData,
      cli_cep: formattedCep,
    }));
  };

  return (
    <Box sx={{ "& .MuiOutlinedInput-root": { width: "100%" } }}>
      <div className="addressForm">
        <TextField
          label="CEP"
          variant="outlined"
          name="cli_cep"
          value={formData.cli_cep || ""}
          onChange={handleCepChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FD1F4A" },
              "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
            width: "15ch",
          }}
        />
        <TextField
          label="Cidade"
          variant="outlined"
          name="cli_cidade"
          value={formData.cli_cidade || ""}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FD1F4A" },
              "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
            width: "30ch",
          }}
        />
      </div>
      <div className="addressForm">
        <TextField
          label="Bairro"
          variant="outlined"
          name="cli_bairro"
          value={formData.cli_bairro || ""}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FD1F4A" },
              "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
            width: "30ch",
          }}
        />
        <TextField
          label="Rua"
          variant="outlined"
          name="cli_rua"
          value={formData.cli_rua || ""}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FD1F4A" },
              "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
            width: "40ch",
          }}
        />
        <TextField
          label="Número"
          variant="outlined"
          name="cli_numero"
          value={formData.cli_numero || ""}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FD1F4A" },
              "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
            width: "10ch",
          }}
        />
      </div>
      <div className="addressForm">
        <TextField
          label="Complemento"
          variant="outlined"
          name="cli_complemento"
          value={formData.cli_complemento || ""}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FD1F4A" },
              "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
            width: "25ch",
          }}
        />
      </div>
    </Box>
  );
};

export default Address;
