import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Historial } from '../../assets/models/historial';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function procesarDatos(historial: Historial[]) {
    const agrupados: { [key: string]: { total: number, redireccionados: number } } = {};

    historial.forEach(item => {
        if (!agrupados[item.ID_producto]) {
            agrupados[item.ID_producto] = { total: 0, redireccionados: 0 };
        }
        agrupados[item.ID_producto].total++;
        if (item.redireccion) {
            agrupados[item.ID_producto].redireccionados++;
        }
    });

    return agrupados;
}

interface HistorialTiendaGraficaProps{
    historial: Historial[];
}

const GarphBarVisitas: React.FC<HistorialTiendaGraficaProps>= ({historial}:HistorialTiendaGraficaProps) => {
    const datosProcesados = procesarDatos(historial);
    const labels = Object.keys(datosProcesados);
    const totalData = Object.values(datosProcesados).map(d => d.total);
    const redireccionadosData = Object.values(datosProcesados).map(d => d.redireccionados);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Total',
                data: totalData,
                backgroundColor: 'rgba(170, 244, 128, 0.5)',
                borderColor: 'rgba(85, 232, 160, 1)',
                borderWidth: 1,
            },
            {
                label: 'Redireccionados',
                data: redireccionadosData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }
        ],
    };

    const options = {
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
                text: 'Historial de Tienda por Producto',
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
              },
              beginAtZero: true,
            }
        },
    };

    return (
        <div>
            {historial.length !== 0 && <Bar data={data} options={options} />}
            {historial.length === 0 && <label style={{color:'white'}}>UPS! aún no tienes registros</label>}
        </div>
    );
};

export default GarphBarVisitas;