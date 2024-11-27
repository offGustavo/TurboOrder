import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./../styles/Pedidos.css";

function printPedido() {
  console.log("Pedido")
}
const Pedidos = () => {
  return (
  <main className="p-10">
      <header className="display-flex space-between">
        <h1>Cadastro De Pedidos</h1>

        <button onClick={printPedido}>Finalizar</button>
      </header>

      <div>
      </div>
  </main>
  );
};



export default Pedidos;
