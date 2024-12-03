import styled from "styled-components";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import ProgressBar from "./../components/ProgressBar.js";

const ContainerCliente = styled.div`
  background-color: #ffffff;
  color: #000000;
  font-family: "poppins", serif;
  font-size: 18px;
  width: 100%;
  height: 100%;
  padding: 0px;
`;

const HeaderCliente = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const ActionsCliente = styled.div``;

const TitleCliente = styled.h1`
  margin: 0px;
  font-size: 18px;
`;

const Registerbtn = styled.button`
  height: auto;
  color: #000000;
  font-weight: bold;
  padding: 10px;
  background-color: #ffbd0d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #e4aa0a;
  }
`;

const AlreadyRegistered = styled.button`
  height: auto;
  margin: 0 15px;
  color: #fd1f4a;
  font-weight: bold;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #fd1f4a;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #fd1f4a;
    color: #ffffff;
  }
`;

const FormConteiner = styled.div`
  margin-top: 100px;
  width: 100%;
`;

const SubText = styled.h2`
  margin: 40px 0px 20px 0px;
  font-size: 16px;
`;

const Form = styled.div`
    display: flex;
`;

const addCliente = () => {
  return (
    <ContainerCliente>
      <HeaderCliente>
        <TitleCliente>Cadastro de Cliente</TitleCliente>
        <ActionsCliente>
          <AlreadyRegistered>Cliente já cadastrado</AlreadyRegistered>
          <Registerbtn>Cadastrar</Registerbtn>
        </ActionsCliente>
      </HeaderCliente>
      <ProgressBar />
      <FormConteiner>
        <div>
          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <TextField
              id="outlined-basic"
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
            <TextField
              id="outlined-basic"
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
              id="outlined-basic"
              label="Telefone"
              variant="outlined"
              sx={{
                marginRight: 2,
                margin: "30px 0px",
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>
          <hr />

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
          <hr />

          <SubText>Empresa</SubText>
          <Box sx={{ "& .MuiOutlinedInput-root": { width: "30ch" } }}>
            <TextField
              id="outlined-basic"
              label="CNPJ"
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
      </FormConteiner>
    </ContainerCliente>
  );
};

export default addCliente;
