import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/Pedidos.css";
import "../styles/Global.css"

function printPedido() {
  console.log("Pedido")
}
const Pedidos = () => {
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
        <div className="grid-2 pedido-section">
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
        </div>
      </section>
    </main>
  );
};

export default Pedidos;
