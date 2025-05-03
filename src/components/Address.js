import React from "react";
import { Box, TextField } from "@mui/material";
import "../styles/Address.css";

const Address = ({ formData, handleChange }) => {
  return (
    <div class="addressContainer">
      <Box sx={{ "& .MuiOutlinedInput-root": { width: "100%" } }}>
        <div class="addressForm">
          <TextField
            label="CEP"
            variant="outlined"
            name="cli_cep"
            value={formData.cli_cep || ""}
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
    </div>
  );
};

export default Address;
