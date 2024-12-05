import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import DeliverySelect from "../components/DeliverySelect.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/AddOrder.css";
import "../styles/Global.css"
import { Box, TextField } from '@mui/material';
import ComboBox from "../components/ComboBox.js";
import ProgressBar from "../components/ProgressBar.js";
import ClientInfo from "../components/ClientInfo.js";

function printPedido() {
  console.log("Pedido")
}
const addOrder = () => {
  const options = [
    { 'id': 1, 'nome': 'Arroz Soltinho', 'tipo': 'Arroz' },
    { 'id': 2, 'nome': 'Arroz Integral', 'tipo': 'Arroz' },
    { 'id': 3, 'nome': 'Arroz Jasmim', 'tipo': 'Arroz' },
    { 'id': 4, 'nome': 'Arroz Negro', 'tipo': 'Arroz' },
    { 'id': 5, 'nome': 'Arroz Vermelho', 'tipo': 'Arroz' },
    { 'id': 6, 'nome': 'Feijão Preto', 'tipo': 'Feijão' },
    { 'id': 7, 'nome': 'Feijão Carioca', 'tipo': 'Feijão' },
    { 'id': 8, 'nome': 'Feijão Feijoada', 'tipo': 'Feijão' },
    { 'id': 9, 'nome': 'Feijão Tropeiro', 'tipo': 'Feijão' },
    { 'id': 10, 'nome': 'Feijão Tutu', 'tipo': 'Feijão' },
    { 'id': 11, 'nome': 'Massa Espaguete', 'tipo': 'Massa' },
    { 'id': 12, 'nome': 'Massa Talharim', 'tipo': 'Massa' },
    { 'id': 13, 'nome': 'Massa Penne', 'tipo': 'Massa' },
    { 'id': 14, 'nome': 'Massa Ravioli', 'tipo': 'Massa' },
    { 'id': 15, 'nome': 'Massa Fusilli', 'tipo': 'Massa' },
    { 'id': 16, 'nome': 'Salada Caesar', 'tipo': 'Salada' },
    { 'id': 17, 'nome': 'Salada Tropical', 'tipo': 'Salada' },
    { 'id': 18, 'nome': 'Salada Caprese', 'tipo': 'Salada' },
    { 'id': 19, 'nome': 'Salada Verde', 'tipo': 'Salada' },
    { 'id': 20, 'nome': 'Salada De Frutas', 'tipo': 'Salada' },
    { 'id': 21, 'nome': 'Acompanhamento Batata Frita', 'tipo': 'Acompanhamento' },
    { 'id': 22, 'nome': 'Acompanhamento Purê de Batata', 'tipo': 'Acompanhamento' },
    { 'id': 23, 'nome': 'Acompanhamento Farofa', 'tipo': 'Acompanhamento' },
    { 'id': 24, 'nome': 'Acompanhamento Vinagrete', 'tipo': 'Acompanhamento' },
    { 'id': 25, 'nome': 'Acompanhamento Legumes Salteados', 'tipo': 'Acompanhamento' },
    { 'id': 26, 'nome': 'Carne Bife', 'tipo': 'Carne' },
    { 'id': 27, 'nome': 'Carne Frango Grelhado', 'tipo': 'Carne' },
    { 'id': 28, 'nome': 'Carne Costela', 'tipo': 'Carne' },
    { 'id': 29, 'nome': 'Carne Picanha', 'tipo': 'Carne' },
    { 'id': 30, 'nome': 'Carne Carne Moída', 'tipo': 'Carne' }
  ];

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
  return (

    <main className="p-10">
      <ProgressBar />
      <header className="display-flex space-between ">

        <h1>Cadastro De Pedidos</h1>
        <div className="display-flex">

          <NavLink to="/clientes">
            <AlreadyRegistered>Cliente não cadastrado</AlreadyRegistered>
          </NavLink >
          <button onClick={printPedido} className="btn-add">Finalizar</button>
        </div>
      </header>

      {/* que jeito porco de fazer isso */}
      <br />
      <section className="section">
        <h3>Cliente</h3>

        <ClientInfo />
        {/* <div className="grid-2"> */}
        {/*   <div> */}
        {/*     <TextField id="outlined-basic" label="Nome" variant="outlined" /> */}
        {/*   </div> */}
        {/*   <div> */}
        {/*     <TextField id="outlined-basic" label="Sobrenome" variant="outlined" /> */}
        {/*   </div> */}
        {/*   <div> */}
        {/*     <TextField id="outlined-basic" label="Telefone" variant="outlined" placeholder="(99) 99999-9999"/> */}
        {/*   </div> */}
        {/* </div> */}
      </section>
      <hr />
      <section>
        <h3>Entrega</h3>
        <div>
          <DeliverySelect />
        </div>
      </section>

      <hr />
      <section>

        <h3 >Pedido</h3>
        <div className="grid-2 pedido-section" style={{ padding: '10px' }} >

          {/* Passando "Arroz" como tipoSelecionado */}
          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={options}
              tipoSelecionado="Arroz"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>

          {/* Passando "Feijão" como tipoSelecionado */}
          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={options}
              tipoSelecionado="Feijão"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>


          {/* Passando "Massa" como tipoSelecionado */}
          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={options}
              tipoSelecionado="Massa"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>

          {/* Passando "Carne" como tipoSelecionado */}
          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={options}
              tipoSelecionado="Carne"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>

          {/* Passando "Carne 2 2" como tipoSelecionado */}
          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={options}
              tipoSelecionado="Carne"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>


          {/* Passando "Carne 2 2" como tipoSelecionado */}
          <Box sx={{ "& .MuiOutlinedInput-root": { width: "40ch" } }}>
            <ComboBox
              options={options}
              tipoSelecionado="Acompanhamento"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#FD1F4A" },
                  "&.Mui-focused fieldset": { borderColor: "#FD1F4A" },
                },
              }}
            />
          </Box>

        </div>
      </section>
    </main>
  );
};

export default addOrder;
