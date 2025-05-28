import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface GraficosProps {
  labels: string[];
  quantidadeData: number[];
  pedidosData: number[];
}

const Graficos: React.FC<GraficosProps> = ({ labels, quantidadeData, pedidosData }) => {
  const quantidadeChartData = {
    labels,
    datasets: [
      {
        label: 'Quantidade Total',
        data: quantidadeData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pedidosChartData = {
    labels,
    datasets: [
      {
        label: 'Número de Pedidos',
        data: pedidosData,
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
    },
  };

  return (
    <div>
      <div style={{ marginBottom: '50px' }}>
        <Bar data={quantidadeChartData} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: 'Quantidade Total' } } }} />
      </div>

      <div>
        <Bar data={pedidosChartData} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: 'Número de Pedidos' } } }} />
      </div>
    </div>
  );
};

export default Graficos;
