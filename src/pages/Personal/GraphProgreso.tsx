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
import useLoginSatus from 'react-redux'; // Import the useLoginStatus hook

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
  const isLoggedIn = true; // Use the useLoginStatus hook
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