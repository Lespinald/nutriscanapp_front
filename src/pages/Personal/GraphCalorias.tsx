import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Historial, HistorialTienda } from '../../assets/models/historial';
import { Producto } from '../../assets/models/tienda';
import { ConsultarOpenFoodFact } from '../../assets/Utils';
import { OffData } from '../Tienda/utilTienda';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Azucares', 'Harina', 'Sodio', 'Grasa', 'Vitaminas', 'Minerales'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

interface Props{
  historial:Historial[];
}

export function GraphCalorias({historial}:Props) {
  const [historialRegistro, setHistorialRegistro] = useState<Historial[]>([])
  const [datos, setDatos] = useState<number[]>([])
  
  async function obtenerProductosHistorial(historials:Historial[]) {
    const productosHistorial: Producto[] = [];
    const tempInfoProducts: OffData[] = [];
    
    console.log("🚀 ~ obtenerProductosHistorial ~ currentHistorial:", historials)
    const consultas = historials.map((currentHistorial) => {
      return ConsultarOpenFoodFact(currentHistorial.ID_producto.toString(),currentHistorial.ID_producto.toString()).then((res) => {
        if (res.product) {
          // setProductosHistorial((prev) => [...prev,res])
          if(res.infoProducto){
            tempInfoProducts.push(res.infoProducto)
          }
          productosHistorial.push(res.product)
        }
      })
    })
    
    await Promise.all(consultas);
    console.log("🚀 ~ obtenerProductosHistorial ~ InfoProductos:", tempInfoProducts)
    sumarNutrientes(tempInfoProducts)
    console.log("🚀 ~ obtenerProductosHistorial ~ productosHistorial:", productosHistorial)
    return productosHistorial;
  }
  
  function sumarNutrientes(dataArray: OffData[]) {
    let totalAzucar = 0;
    let totalCarbohidratos = 0;
    let totalSodio = 0;
    let totalGrasas = 0;
    let totalProteina = 0;
    let totalFibra = 0;
    
    dataArray.forEach(data => {
      totalAzucar += Number(data.azucar) || 0;
      totalCarbohidratos += Number(data.carbohidratos) || 0;
      totalSodio += Number(data.sodio) || 0;
      totalGrasas += Number(data.grasas) || 0;
      totalProteina += Number(data.proteina) || 0;
      totalFibra += Number(data.fibra) || 0;
    });
    
    setDatos([totalAzucar, totalCarbohidratos, totalSodio, totalGrasas, totalProteina, totalFibra])
  }
  
  useEffect(() => {
    obtenerProductosHistorial(historialRegistro)
  }, [historialRegistro])
  
  useEffect(() => {
    setHistorialRegistro(historial.filter((element) => element.comido))
  }, [])
  
  return <Pie options={
    {plugins: {
      legend: {
        labels: {
          color: 'white', // Cambia el color de los labels a blanco
        },
      },
    },}
  } data={
    {
      labels: ['Azucares', 'Harina', 'Sodio', 'Grasa', 'Vitaminas', 'Minerales'],
      datasets: [
        {
          label: 'g',
          data: datos,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
  } />;
}

