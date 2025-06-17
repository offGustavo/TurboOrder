import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/Desempenho.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const formatDateLabel = (label, titulo) => {
  if (titulo.includes("Mês")) {
    // If label is a number or string representing month number, convert to month name
    const monthIndex = parseInt(label, 10) - 1;
    if (!isNaN(monthIndex) && monthIndex >= 0 && monthIndex < 12) {
      return monthNames[monthIndex];
    }
    // If label is already a month name or other string, return as is
    return label;
  } else {
    const date = new Date(label);
    if (!isNaN(date)) {
      // Return DD/MM/YYYY
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return label;
  }
};

const CardGrafico = ({
  titulo,
  total,
  media,
  labels,
  data,
  color,
  corTexto,
  corBotao,
}) => {
  const [filterDate, setFilterDate] = useState("");

  const filteredLabels = filterDate
    ? labels.filter((label) => {
        const labelDate = new Date(label).toISOString().split("T")[0];
        return labelDate === filterDate;
      })
    : labels;

  const filteredData = filterDate
    ? data.filter((_, idx) => {
        const labelDate = new Date(labels[idx]).toISOString().split("T")[0];
        return labelDate === filterDate;
      })
    : data;

  const displayLabels = filteredLabels.map((label) =>
    formatDateLabel(label, titulo)
  );

  const chartData = {
    labels: displayLabels,
    datasets: [
      {
        label: "Receita",
        data: filteredData,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 10 },
        },
      },
      title: {
        display: true,
        text: titulo,
        font: {
          size: 14,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `R$ ${context.raw.toFixed(2).replace(".", ",")}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 10 },
        },
        grid: {
          lineWidth: 0.5,
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      y: {
        ticks: {
          font: { size: 10 },
        },
        grid: {
          lineWidth: 0.5,
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
  };

  return (
    <div className="box-desempenho">
      <div className="left-info">
        <h3>{titulo}</h3>
        <h1 className="total" style={{ color: corTexto }}>
          R$ {total.toFixed(2).replace(".", ",")}
        </h1>
        <p className="descricao">Resumo da receita do {titulo.split(" ")[2]}</p>
        <h3 className="media">R$ {media.toFixed(2).replace(".", ",")}</h3>
        <p className="descricao">Média da receita de {titulo.split(" ")[2]}</p>
        <div className="filtro">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <button style={{ backgroundColor: corBotao }} onClick={() => {}}>
            Filtrar
          </button>
        </div>
      </div>
      <div style={{ width: "100%", paddingLeft: "2rem" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default CardGrafico;
