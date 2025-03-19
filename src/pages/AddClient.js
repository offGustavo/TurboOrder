import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import ClientInfo from "../components/ClientInfo";
import Address from "../components/Address";
import ProgressBar from "../components/ProgressBar";
import "../styles/Global.css";
import "../styles/AddClient.css";

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
p
`;

const ActionsCliente = styled.div``;

const TitleCliente = styled.h1`
  margin: 0px;
  font-size: 18px;
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
`;

const AddClient = () => {
  return (
    <ContainerCliente>
      <HeaderCliente>
        <TitleCliente>Cadastro de Cliente</TitleCliente>
        <ActionsCliente>
          <NavLink to="/cadastro-de-cliente/pedidos">
            <AlreadyRegistered>Cliente já cadastrado</AlreadyRegistered>
          </NavLink>
        </ActionsCliente>
      </HeaderCliente>
      <ProgressBar />
      <FormConteiner>
        <form>
          <Form>
              <SubText>Cliente</SubText>
              <ClientInfo />
              <hr />
              <SubText>Endereço</SubText>
              <Address />
              {/* <hr /> */}
              {/* <SubText>Empresa</SubText> */}
              {/* <Box sx={{ "& .MuiOutlinedInput-root": { width: "30ch" } }}> */}
              {/*   <TextField */}
              {/*     label="CNPJ" */}
              {/*     variant="outlined" */}
              {/*     sx={{ margin: "10px 0px 30px 0px" }} */}
              {/*   /> */}
              {/* </Box> */}
            <div className="addClient-btn-add">
              <button type="button" className="btn-add">Cadastrar</button>
            </div>
          </Form>
        </form>
      </FormConteiner>
    </ContainerCliente>
  );
};

export default AddClient;
