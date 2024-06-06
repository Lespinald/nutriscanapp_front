import { useState } from "react";
import { HistorialTienda } from "../../assets/models/historial";
import { Pie } from "react-chartjs-2";

interface PropsTienda{
    historial:HistorialTienda[];
  }
  
  export function GraphVisitas({historial}:PropsTienda) {
    const [datos, setDatos] = useState<number[]>([])
  
    function procesarDatos(historial: HistorialTienda[]) {
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
    
  
    const datosProcesados = procesarDatos(historial);
    
    return <Pie options={
      {plugins: {
        legend: {
          labels: {
            color: 'white', // Cambia el color de los labels a blanco
          },
        },
      },}
    } data={
      {labels: Object.keys(datosProcesados),
      datasets: [
          {
              label: 'Total',
              data: Object.values(datosProcesados).map(d => d.total),
              backgroundColor: [
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 206, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                  'rgba(153, 102, 255, 0.8)',
                  'rgba(255, 159, 64, 0.8)',
                  // ... otros colores según sea necesario
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  // ... otros colores según sea necesario
              ],
              borderWidth: 1,
          },
          {
              label: 'Redireccionados',
              data: Object.values(datosProcesados).map(d => d.redireccionados),
              backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  // ... otros colores según sea necesario
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  // ... otros colores según sea necesario
              ],
              borderWidth: 1,
          }
        ]
      }
    }/>;
  }