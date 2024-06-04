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
  Colors,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

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
      color: 'white',
      position: 'top' as const,
      labels: {
        color: 'white', 
      },
    },
    title: {
      display: true,
      color:'white',
      text: 'Tu progreso',
    },
  },
  scales: {
    x: {
      ticks: {
        color: 'white', // Cambia el color de los labels del eje X a blanco
      },
    },
    y: {
      ticks: {
        color: 'white', // Cambia el color de los labels del eje Y a blanco
      },
    },
  },
};

const generateWeekDaysArray = () => {
  const daysArray: string[] = [];
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
  const isLoggedIn = useSelector((state:any) => state.auth.status === "authenticated") ; // Use the useLoginStatus hook
  const [dataPoints, setDataPoints] = useState<number[]>(Array(7).fill(0));

  useEffect(() => {
    // Update the dataPoints array when the user logs in or out
    const todayIndex = new Date().getDay();
    const newDataPoints = [...dataPoints];
    if (isLoggedIn) {
      newDataPoints[todayIndex] = (newDataPoints[todayIndex] || 0) + 1;
    } else {
      newDataPoints[todayIndex] = (newDataPoints[todayIndex] || 0) - 1;
    }
    setDataPoints(newDataPoints);
  }, [isLoggedIn]);

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