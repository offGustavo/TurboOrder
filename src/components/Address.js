import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "../styles/Address.css";

const Address = ({ formData, handleChange }) => {
  return (
    <Box sx={{ "& .MuiOutlinedInput-root": { width: "100%" } }}>
    {/* <Box sx={{ "& .MuiOutlinedInput-root": { width: "30ch" } }}> */}

      <div className="addressFrom">
      <TextField
        label="Endereço"
        variant="outlined"
        // sx={{ margin: "10px 0px" }}
      />
      <TextField
        label="Cidade"
        variant="outlined"
        // sx={{ margin: "10px 0px" }}
      />
      <TextField
        label="Bairro"
        variant="outlined"
        // sx={{ margin: "10px 0px" }}
      />
      <TextField
        label="Rua"
        variant="outlined"
        // sx={{ margin: "10px 0px" }}
      />
      <TextField
        label="Número"
        variant="outlined"
        // sx={{ margin: "10px 0px" }}
      />
      <TextField
        label="Complemento"
        variant="outlined"
        // sx={{ margin: "10px 0px" }}
      />
      </div>
    </Box>
  );
};
export default Address;
