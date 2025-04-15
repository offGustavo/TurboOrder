import React from "react";
import { Box, TextField } from "@mui/material";
import "../styles/Address.css";

const Address = ({ formData, handleChange }) => {
  if (!formData) {
    return null;
  }
  return (
    <Box sx={{ "& .MuiOutlinedInput-root": { width: "100%" } }}>
      <div className="addressForm">
        <TextField
          label="CEP"
          variant="outlined"
          name="cli_endereco.cep"
          value={formData.cli_endereco?.cep || ""}
          onChange={handleChange}
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
          name="cli_endereco.cidade"
          value={formData.cli_endereco?.cidade || ""}
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
          name="cli_endereco.bairro"
          value={formData.cli_endereco?.bairro || ""}
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
          name="cli_endereco.rua"
          value={formData.cli_endereco?.rua || ""}
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
