import React, { useEffect, useState } from "react";
import axios from "axios";
import CardGrafico from "../components/CardGrafico.js";
import "../styles/Desempenho.css";

const Desempenho = () => {
  const [daily, setDaily] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8800/receita/daily").then((res) => {
      setDaily(res.data.map((i) => ({ label: i.dia, receita: i.receita })));
    });
    axios.get("http://localhost:8800/receita/weekly").then((res) => {
      setWeekly(
        res.data.map((i) => ({
          label: `Semana ${i.semana}`,
          receita: i.receita,
        }))
      );
    });
    axios.get("http://localhost:8800/receita/monthly").then((res) => {
      setMonthly(
        res.data.map((i) => ({
          label: i.mes,
          receita: i.receita,
        }))
      );
    });
  }, []);

  const calcTotal = (arr) => arr.reduce((sum, i) => sum + i.receita, 0);

  const calcMedia = (arr) => (arr.length > 0 ? calcTotal(arr) / arr.length : 0);

  return (
    <div className="container-desempenho">
      <CardGrafico
        titulo="Receita do Dia"
        total={calcTotal(daily)}
        media={calcMedia(daily)}
        labels={daily.map((d) => d.label)}
        data={daily.map((d) => d.receita)}
        color="#1DAD6F"
        corTexto="#1DAD6F"
        corBotao="#1DAD6F"
      />
      <CardGrafico
        titulo="Receita da Semana"
        total={calcTotal(weekly)}
        media={calcMedia(weekly)}
        labels={weekly.map((d) => d.label)}
        data={weekly.map((d) => d.receita)}
        color="#FF9A0D"
        corTexto="#FF9A0D"
        corBotao="#FF9A0D"
      />
      <CardGrafico
        titulo="Receita do Mês"
        total={calcTotal(monthly)}
        media={calcMedia(monthly)}
        labels={monthly.map((d) => d.label)}
        data={monthly.map((d) => d.receita)}
        color="#FD1F4A"
        corTexto="#FD1F4A"
        corBotao="#FD1F4A"
      />
    </div>
  );
};

export default Desempenho;
