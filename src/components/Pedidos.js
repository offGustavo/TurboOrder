import React, { useState } from "react";
import SearchableSelect from "./SearchableSelect";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/Pedidos.css";
import "../styles/Global.css"

function printPedido() {
  console.log("Pedido")
}
const Pedidos = () => {

  const options = [
    {
      id: 1,
      nome: "Arroz Soltinho",
      tipo: "Arroz"
    },
    {
      id: 2,
      nome: "Arroz Integral",
      tipo: "Arroz"
    },
    {
      id: 3,
      nome: "Arroz Jasmim",
      tipo: "Arroz"
    },
    {
      id: 4,
      nome: "Arroz Negro",
      tipo: "Arroz"
    },
    {
      id: 5,
      nome: "Arroz Vermelho",
      tipo: "Arroz"
    },
    {
      id: 6,
      nome: "Feijão",
      tipo: "Feijão"
    },
    {
      id: 7,
      nome: "Feijoada",
      tipo: "Feijão"
    },
    {
      id: 8,
      nome: "Feijão Tropeiro",
      tipo: "Feijão"
    },
    {
      id: 8,
      nome: "Feijão Tutu",
      tipo: "Feijão"
    },

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
          <input
            type="text"
            placeholder="Nome"
            className="search-input"
          />
          <input
            type="text"
            placeholder="Sobrenome"
            className="search-input"
          />
          <input
            type="text"
            placeholder="Telefone"
            className="search-input"
          />
        </div>
      </section>
      <section>
        <h3>Pedido</h3>
        {/* <div className="grid-2 pedido-section">
          <div>
            <label> Quantidade</label>
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div>
            <label> Arroz</label>
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div>
            <label> Feijão</label>
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div>
            <label> Salada</label>
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div>
            <label> Escolha de Carne 01</label>
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>

          <div>
            <label> Escolha de Carne 02</label>
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </div> */}

        <div>
          <h1>Componente Select com Pesquisa</h1>
          {/* Passando "Arroz" como tipoSelecionado */}
          <SearchableSelect
            options={options}
            label="Escolha um prato"
            tipoSelecionado="Arroz"
          />
        </div>

        <div>
          <h1>Componente Select com Pesquisa</h1>
          {/* Passando "Arroz" como tipoSelecionado */}
          <SearchableSelect
            options={options}
            label="Escolha um prato"
            tipoSelecionado="Feijão"
          />
        </div>

        <div>
          <h1>Componente Select com Pesquisa</h1>
          {/* Passando "Arroz" como tipoSelecionado */}
          <SearchableSelect
            options={options}
            label="Escolha um prato"
            tipoSelecionado="Carne"
          />
        </div>
      </section>
    </main>
  );
};

export default Pedidos;
