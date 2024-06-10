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
import { Historial } from '../../assets/models/historial';

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
      labels: {
        color: 'white' // Color de las etiquetas de la leyenda
      }
    },
    title: {
      display: true,
      text: 'Sobre tus búsquedas',
      color: 'white' // Color del título
    },
  },
  scales: {
    x: {
      ticks: {
        color: 'white',
        maxRotation: 45,
        minRotation: 0
      }
    },
    y: {
      ticks: {
        color: 'white' // Color de las etiquetas del eje Y
      }
    }
  }
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
const CalculatedBusquedas = (historial: Historial[], days: number) => {
  const counts: { [key: string]: number } = {};

  // Obtener la fecha actual
  const today = new Date();

  // Inicializar los contadores para los últimos 'days' días
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    counts[formattedDate] = 0;
  }

  // Contar las consultas por fecha
  historial.forEach(entry => {
    const [year, month, day] = entry.fecha.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    if (counts.hasOwnProperty(formattedDate)) {
      counts[formattedDate]++;
    }
  });

  // Convertir el objeto counts a un array de números en el orden inverso de las fechas más recientes
  const result = Object.keys(counts).reverse().map(date => counts[date]);
  return result;
};


interface Props {
  historial:Historial[];
}

export function GraphBusquedas({historial}:Props) {
  
  const SendData = ( ) => {
    const data = {
      labels,
      datasets: [
        {
          label: 'Busquedas',
          data: CalculatedBusquedas(historial,7),
          backgroundColor: 'rgba(85, 232, 160, 1)',
        },
      ],
    };

    return data
  }


  return(
    <>
      {historial.length !== 0 &&<Bar options={options} data={SendData()} />}
      {historial.length === 0 && <label style={{color:'white'}}>UPS! aún no tienes registros</label>}
    </>
  )
}