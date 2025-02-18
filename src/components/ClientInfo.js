import React from 'react';
import { Box, TextField } from '@mui/material';

const ClientInfo = () => {
  return (
    <div className="CliFrom">
      <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
        <TextField
          id="generic-input"
          label="Nome"
          variant="outlined"
          sx={{
            marginRight: 2,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FD1F4A" },
              "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
          }}
        />
        <TextField
          id="generic-input"
          label="Sobrenome"
          variant="outlined"
          sx={{
            marginRight: 2,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FD1F4A" },
              "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
          }}
        />
      </Box>
      <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
        <TextField
          id="generic-input"
          label="Telefone"
          variant="outlined"
          sx={{
            marginRight: 2,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FD1F4A" },
              "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
          }}
        />
      </Box>
    </div>
  );
};

export default ClientInfo;