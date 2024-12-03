import React, { useState } from "react";
import DeliverySelect from "../components/DeliverySelect.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/Pedidos.css";
import "../styles/Global.css"
import TextField from '@mui/material/TextField';
import ComboBox from "../components/ComboBox.js";

function printPedido() {
  console.log("Pedido")
}
const addOrder = () => {
  const options = [
    {'id': 1,  'nome': 'Arroz Soltinho', 'tipo': 'Arroz'},
    {'id': 2,  'nome': 'Arroz Integral', 'tipo': 'Arroz'},
    {'id': 3,  'nome': 'Arroz Jasmim', 'tipo': 'Arroz'},
    {'id': 4,  'nome': 'Arroz Negro', 'tipo': 'Arroz'},
    {'id': 5,  'nome': 'Arroz Vermelho', 'tipo': 'Arroz'},
    {'id': 6,  'nome': 'Feijão Preto', 'tipo': 'Feijão'},
    {'id': 7,  'nome': 'Feijão Carioca', 'tipo': 'Feijão'},
    {'id': 8,  'nome': 'Feijão Feijoada', 'tipo': 'Feijão'},
    {'id': 9,  'nome': 'Feijão Tropeiro', 'tipo': 'Feijão'},
    {'id': 10, 'nome': 'Feijão Tutu', 'tipo': 'Feijão'},
    {'id': 11, 'nome': 'Massa Espaguete', 'tipo': 'Massa'},
    {'id': 12, 'nome': 'Massa Talharim', 'tipo': 'Massa'},
    {'id': 13, 'nome': 'Massa Penne', 'tipo': 'Massa'},
    {'id': 14, 'nome': 'Massa Ravioli', 'tipo': 'Massa'},
    {'id': 15, 'nome': 'Massa Fusilli', 'tipo': 'Massa'},
    {'id': 16, 'nome': 'Salada Caesar', 'tipo': 'Salada'},
    {'id': 17, 'nome': 'Salada Tropical', 'tipo': 'Salada'},
    {'id': 18, 'nome': 'Salada Caprese', 'tipo': 'Salada'},
    {'id': 19, 'nome': 'Salada Verde', 'tipo': 'Salada'},
    {'id': 20, 'nome': 'Salada De Frutas', 'tipo': 'Salada'},
    {'id': 21, 'nome': 'Acompanhamento Batata Frita', 'tipo': 'Acompanhamento'},
    {'id': 22, 'nome': 'Acompanhamento Purê de Batata', 'tipo': 'Acompanhamento'},
    {'id': 23, 'nome': 'Acompanhamento Farofa', 'tipo': 'Acompanhamento'},
    {'id': 24, 'nome': 'Acompanhamento Vinagrete', 'tipo': 'Acompanhamento'},
    {'id': 25, 'nome': 'Acompanhamento Legumes Salteados', 'tipo': 'Acompanhamento'},
    {'id': 26, 'nome': 'Carne Bife', 'tipo': 'Carne'},
    {'id': 27, 'nome': 'Carne Frango Grelhado', 'tipo': 'Carne'},
    {'id': 28, 'nome': 'Carne Costela', 'tipo': 'Carne'},
    {'id': 29, 'nome': 'Carne Picanha', 'tipo': 'Carne'},
    {'id': 30, 'nome': 'Carne Carne Moída', 'tipo': 'Carne'}
  ];
  return (
    <main className="p-10">
      <header className="display-flex space-between ">
        <h1>Cadastro De Pedidos</h1>
        <button onClick={printPedido} className="btn-add">Finalizar</button>
      </header>

      <section className="section">
        <h3>Cliente</h3>

        <div className="grid-2">
          <div>
            <TextField id="outlined-basic" label="Nome" variant="outlined" />
          </div>
          <div>
            <TextField id="outlined-basic" label="Sobrenome" variant="outlined" />
          </div>
          <div>
            <TextField id="outlined-basic" label="Telefone" variant="outlined" />
          </div>
        </div>
      </section>
      <section>
        <h3>Entrega</h3>
        <div> 
          <DeliverySelect />
        </div>
      </section>
      <section>
        <h3>Pedido</h3>
        <div className="grid-2 pedido-section">
          <div>
            {/* Passando "Arroz" como tipoSelecionado */}
            <ComboBox
              options={options}
              tipoSelecionado="Arroz"
            />
          </div>

          <div>
            {/* Passando "Feijão" como tipoSelecionado */}
            <ComboBox
              options={options}
              tipoSelecionado="Feijão"
            />
          </div>

          <div>
            {/* Passando "Carne" como tipoSelecionado */}
            <ComboBox
              options={options}
              tipoSelecionado="Massa"
            />
          </div>

          <div>
            {/* Passando "Salada" como tipoSelecionado */}
            <ComboBox
              options={options}
              tipoSelecionado="Salada"
            />
          </div>

          <div>
            {/* Passando "Salada" como tipoSelecionado */}
            <ComboBox
              options={options}
              tipoSelecionado="Carne"
            />
          </div>

          <div>
            {/* Passando "Carne 2" como tipoSelecionado */}
            <ComboBox
              options={options}
              tipoSelecionado="Carne"
            />
          </div>


          <div>
            {/* Passando "Acompanhamento" como tipoSelecionado */}
            <ComboBox 
              options={options}
              tipoSelecionado="Acompanhamento"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default addOrder;
