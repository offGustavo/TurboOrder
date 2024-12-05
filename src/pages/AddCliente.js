import styled from "styled-components";
import { NavLink } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ClientInfo from "../components/ClientInfo.js";
import Address from "../components/Address.js";
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

          <NavLink to="/pedidos">
            <AlreadyRegistered>Cliente já cadastrado</AlreadyRegistered>
          </NavLink >
          <Registerbtn>Cadastrar</Registerbtn>
        </ActionsCliente>
      </HeaderCliente>
      <ProgressBar />
      <FormConteiner>
        <Form>
          <div>
            <SubText>Cliente</SubText>
            <ClientInfo />
            <hr />

            <div>
              <Address />
            </div>
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
        </Form>
      </FormConteiner>
    </ContainerCliente>
  );
};

export default addCliente;
