import React, { useEffect } from "react";
import { Box, TextField } from "@mui/material";
import axios from "axios";
import "../styles/Address.css";

const Address = ({ formData, handleChange, setFormData }) => {
  useEffect(() => {
    const cep = formData?.cli_endereco?.cep;
    if (cep && cep.length === 8) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          if (!response.data.erro) {
            setFormData((prev) => ({
              ...prev,
              cli_endereco: {
                ...prev.cli_endereco,
                rua: response.data.logradouro,
                bairro: response.data.bairro,
                cidade: response.data.localidade
              }
            }));
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar o CEP:", error);
        });
    }
  }, [formData?.cli_endereco?.cep, setFormData]);

  if (!formData) return null;

  return (
    <Box sx={{ "& .MuiOutlinedInput-root": { width: "100%" } }}>
      <div className="addressForm">
        <TextField
          label="CEP"
          variant="outlined"
          name="cli_endereco.cep"
          value={formData.cli_endereco?.cep || ""}
          onChange={handleChange}
          sx={{ width: "15ch", ...inputStyle }}
        />
        <TextField
          label="Cidade"
          variant="outlined"
          name="cli_endereco.cidade"
          value={formData.cli_endereco?.cidade || ""}
          onChange={handleChange}
          sx={{ width: "30ch", ...inputStyle }}
        />
      </div>
      <div className="addressForm">
        <TextField
          label="Bairro"
          variant="outlined"
          name="cli_endereco.bairro"
          value={formData.cli_endereco?.bairro || ""}
          onChange={handleChange}
          sx={{ width: "30ch", ...inputStyle }}
        />
        <TextField
          label="Rua"
          variant="outlined"
          name="cli_endereco.rua"
          value={formData.cli_endereco?.rua || ""}
          onChange={handleChange}
          sx={{ width: "40ch", ...inputStyle }}
        />
        <TextField
          label="Número"
          variant="outlined"
          name="cli_numero"
          value={formData.cli_numero || ""}
          onChange={handleChange}
          sx={{ width: "10ch", ...inputStyle }}
        />
      </div>
      <div className="addressForm">
        <TextField
          label="Complemento"
          variant="outlined"
          name="cli_complemento"
          value={formData.cli_complemento || ""}
          onChange={handleChange}
          sx={{ width: "25ch", ...inputStyle }}
        />
      </div>
    </Box>
  );
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": { borderColor: "#FD1F4A" },
    "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
  },
  "& .MuiInputBase-input": {
    color: "black",
  },
};

export default Address;