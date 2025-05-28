import React, { useEffect, useState } from "react";
import axios from "axios";
import Graficos from "../components/Graficos";
import "../styles/Desempenho.css";

interface Pedido {
  id: number;
  produto: string;
  quantidade: number;
  data: string;
}

const Desempenho = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [quantidadeData, setQuantidadeData] = useState<number[]>([]);
  const [pedidosData, setPedidosData] = useState<number[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8800/pedidos")
      .then(response => setPedidos(response.data))
      .catch(error => console.error("Erro ao buscar pedidos:", error));
  }, []);

  useEffect(() => {
    const mapaProdutos = new Map<string, { quantidade: number; pedidos: number }>();

    pedidos.forEach(pedido => {
      const dadosAtuais = mapaProdutos.get(pedido.produto) || { quantidade: 0, pedidos: 0 };
      dadosAtuais.quantidade += pedido.quantidade;
      dadosAtuais.pedidos += 1;
      mapaProdutos.set(pedido.produto, dadosAtuais);
    });

    const labelsTemp = Array.from(mapaProdutos.keys());
    const quantidadeTemp = labelsTemp.map(produto => mapaProdutos.get(produto)!.quantidade);
    const pedidosTemp = labelsTemp.map(produto => mapaProdutos.get(produto)!.pedidos);

    setLabels(labelsTemp);
    setQuantidadeData(quantidadeTemp);
    setPedidosData(pedidosTemp);
  }, [pedidos]);

  return (
    <div>
      <h2 className="abaixar-titulo">Gráfico de Desempenho</h2>
      <Graficos
        labels={labels}
        quantidadeData={quantidadeData}
        pedidosData={pedidosData}
      />
    </div>
  );
};

export default Desempenho;
