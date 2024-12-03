import React from 'react';
import styled from 'styled-components';
import { Box, TextField } from '@mui/material';

// Estilos com styled-components
const SubText = styled.h2`
  margin: 40px 0px 20px 0px;
  font-size: 16px;
`;

const Form = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const AddressForm = () => {
  return (
    <div>
      <SubText>Endereço</SubText>

      <Form>
        <Box sx={{ "& .MuiOutlinedInput-root": { width: "20ch" } }}>
          <TextField
            id="outlined-basic"
            label="CEP"
            variant="outlined"
            sx={{
              marginRight: 2,
              margin: "10px 0px 30px 0px",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
            }}
          />
        </Box>

        <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
          <TextField
            id="outlined-basic"
            label="Cidade"
            variant="outlined"
            sx={{
              marginRight: 2,
              margin: "10px 0px 30px 15px",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
            }}
          />
        </Box>
      </Form>

      <Form>
        <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
          <TextField
            id="outlined-basic"
            label="Bairro"
            variant="outlined"
            sx={{
              marginRight: 2,
              margin: "10px 0px 30px 0px",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
            }}
          />
        </Box>

        <Box sx={{ "& .MuiOutlinedInput-root": { width: "50ch" } }}>
          <TextField
            id="outlined-basic"
            label="Rua"
            variant="outlined"
            sx={{
              marginRight: 2,
              margin: "10px 0px 30px 15px",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
            }}
          />
        </Box>

        <Box sx={{ "& .MuiOutlinedInput-root": { width: "20ch" } }}>
          <TextField
            id="outlined-basic"
            label="Número"
            variant="outlined"
            sx={{
              marginRight: 2,
              margin: "10px 0px 30px 15px",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#FD1F4A" },
                "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
              },
            }}
          />
        </Box>
      </Form>

      <Box sx={{ "& .MuiOutlinedInput-root": { width: "30ch" } }}>
        <TextField
          id="outlined-basic"
          label="Complemento"
          variant="outlined"
          sx={{
            marginRight: 2,
            margin: "10px 0px 30px 0px",
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

export default AddressForm;
