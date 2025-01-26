import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Address = ({ formData, handleChange }) => {
  return (
    <Box sx={{ "& .MuiOutlinedInput-root": { width: "30ch" } }}>
      <TextField
        label="Endereço"
        variant="outlined"
        sx={{ margin: "10px 0px" }}
      />
      <TextField
        label="Cidade"
        variant="outlined"
        sx={{ margin: "10px 0px" }}
      />
      <TextField
        label="Bairro"
        variant="outlined"
        sx={{ margin: "10px 0px" }}
      />
      <TextField
        label="Rua"
        variant="outlined"
        sx={{ margin: "10px 0px" }}
      />
      <TextField
        label="Número"
        variant="outlined"
        sx={{ margin: "10px 0px" }}
      />
      <TextField
        label="Complemento"
        variant="outlined"
        sx={{ margin: "10px 0px" }}
      />
    </Box>
  );
};

export default Address;