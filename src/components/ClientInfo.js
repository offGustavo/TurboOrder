import React from 'react';
import { Box, TextField } from '@mui/material';
import "../styles/ClientInfo.css";

const UserForm = () => {
  return (
    <div  className='CliFrom'>

      <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
        <TextField
          id="first-name"
          label="Nome"
          variant="outlined"
          sx={{
            marginRight: 2,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FD1F4A" },
              "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
            },
          }}
        />
      </Box>

      <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
        <TextField
          id="last-name"
          label="Sobrenome"
          variant="outlined"
          sx={{
            marginRight: 2,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FD1F4A" },
              "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
            },
          }}
        />
      </Box>

      <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
        <TextField
          id="phone-number"
          label="Telefone"
          variant="outlined"
          placeholder="(99)99999-9999"
          sx={{
            marginRight: 2,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FD1F4A" },
              "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
            },
          }}
        />
      </Box>

    </div>
  );
};

export default UserForm;
