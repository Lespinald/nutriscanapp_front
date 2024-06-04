import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Sobre tus búsquedas',
    },
  },
};

// Función para generar las últimas 7 fechas en formato 'DD/MM/YYYY'
const generateLast7Dates = () => {
  const dates : string[] = [];
  const currentDate = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    dates.push(date.toLocaleDateString('es-ES'));
  }

  return dates.reverse();
};

const labels = generateLast7Dates();

// Simulando datos de clics en el botón buscar para los últimos 7 días
const generateMockedClicks = () => {
  return labels.map(() => Math.floor(Math.random() * 10));
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Busquedas',
      data: generateMockedClicks(),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export function GraphBusquedas() {
  
  return(
    <>
      <Bar options={options} data={data} />;
      <div style={{ marginTop: '20px', textAlign: 'center', width: "200px", height: "130px", margin: '0 auto' }}>
      </div>
    </>
  );
}