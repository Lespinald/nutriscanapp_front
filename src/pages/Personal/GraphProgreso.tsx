import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
      text: 'Tu progreso',
    },
  },
};

// Función para generar los días de la semana
const generateWeekDaysArray = () => {
  const daysArray : string[] = [];
  const currentDate = new Date();
  const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    daysArray.push(weekDays[date.getDay()]);
  }

  return daysArray.reverse();
};

// Simulando datos de horas de permanencia en los últimos 7 días
const getMockedHoursSpent = () => {
  return [3, 5, 2, 4, 6, 1, 7]; // Aquí puedes reemplazar con datos reales
};

const labels = generateWeekDaysArray();
const dataPoints = getMockedHoursSpent();

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Rancha',
      data: dataPoints,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function GraphProgreso() {
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const updateSpentTime = () => {
      const currentTime = Date.now();
      const timeDiff = (currentTime - startTime) / 1000 / 60 / 60; // convertir ms a horas
      setTimeSpent(timeDiff);
    };

    const intervalId = setInterval(updateSpentTime, 1000); // actualizar cada segundo

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Line options={options} data={data} />
      <div style={{ marginTop: '20px', textAlign: 'center', width: "200px", height: "130px", margin: '0 auto' }}>
      </div>
    </>
  );
}