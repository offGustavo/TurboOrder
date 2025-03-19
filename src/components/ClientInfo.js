import React from 'react';
import { Box, TextField } from '@mui/material';
import "../styles/ClientInfo.css";

const ClientInfo = () => {
  return (
    <div className="CliForm">
      {/* <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}> */}
        <TextField
          id="clientInfo-name"
          label="Nome"
          variant="outlined"
          sx={{
            // marginRight: 2,
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
          id="clientInfo-surname"
          label="Sobrenome"
          variant="outlined"
          sx={{
            // marginRight: 2,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FD1F4A" },
              "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
          }}
        />
      {/* </Box> */}
      {/* <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}> */}
        <TextField
          id="clientInfo-phone"
          label="Telefone"
          variant="outlined"
          sx={{
            // marginRight: 2,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FD1F4A" },
              "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
          }}
        />
      {/* </Box> */}
    </div>
  );
};

export default ClientInfo;
