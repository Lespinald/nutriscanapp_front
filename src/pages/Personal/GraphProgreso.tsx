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

const labels = generateWeekDaysArray();

export function GraphProgreso() {
  const [timeSpent, setTimeSpent] = useState(0);
  const [dataPoints, setDataPoints] = useState<number[]>(Array(7).fill(0));

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

  useEffect(() => {
    // Actualizar el valor del día actual en los dataPoints
    setDataPoints(prevDataPoints => {
      const newDataPoints = [...prevDataPoints];
      newDataPoints[newDataPoints.length - 1] = timeSpent;
      return newDataPoints;
    });
  }, [timeSpent]);

  const data = {
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

  return (
    <>
      <Line options={options} data={data} />
      <div style={{ marginTop: '20px', textAlign: 'center', width: "200px", height: "130px", margin: '0 auto' }}>
      </div>
    </>
  );
}