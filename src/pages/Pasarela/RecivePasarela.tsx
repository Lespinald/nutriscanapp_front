import style from './Receive.module.css'


import Logo from './Logo'
import { IsMobile, TraerInfoUsuario } from '../../assets/Utils'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { formatDate } from '../../assets/models/usuario'

const RecivePasarela = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const [nombre, setNombre] = useState(searchParams.get('nombre'))
  const [selectedSubscription, setSelectedSubscription] = useState(searchParams.get('selectedSubscription'))
  const [id, setID] = useState(searchParams.get('id'))
  
  const infoUser = useSelector((state:any) => state.auth.infoUsuario)
  console.log("🚀 ~ RecivePasarela ~ id:", id)

  const condicionesTienda = [
    "Incluye recomendaciones basadas en tus preferencias",
    "Seguimiento de nutrición diaría",
    "No pierdes tus registros semanalmente",
    "Información nutricional de calidad"
  ];

  // Obtiene la fecha actual
  const currentDate = new Date();

  // Formatea la fecha en formato DD/MM/YYYY
  const formattedDate = currentDate.toLocaleDateString('es-ES');

  useEffect(() => {
    if(id){
      const fechaActual = new Date();
      const fechaMas30Dias = formatDate(new Date(fechaActual.getTime() + (30 * 24 * 60 * 60 * 1000)))
      console.log(JSON.stringify({
        tipoSuscripcion: 'tienda',
        fechaSuscripcion: fechaMas30Dias,
      }))
      fetch(`https://api.nutriscan.com.co/api/usuarios/cambiasuscripcion/${id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tipoSuscripcion: 'tienda',
          fechaSuscripcion: fechaMas30Dias,
        })
      }).then((respuesta) => {
        console.log("🚀 ~ useEffect ~ respuesta:", respuesta)

        if (!respuesta.ok) {
          throw new Error('Error en la solicitud');
        }
    
        const datos = respuesta.json();
        console.log("🚀 ~ useEffect ~ datos:", datos)  
      })
      
  }}, [])
  
  const getTipoLabel = (valor) => {
    if (valor === '7000') {
      return 'Premiun'
    } else if (valor === '50000') {
      return 'Tienda'
    } else {
      return 'Error'
    }
  };

  return (
    <div className={style.page}>
      <div className={style.contain}>
        <Logo color='var(--color-5)'>Bienvenido NutriScan</Logo>
        {!IsMobile() && <>
          <p>Tu plan incluye:</p>
          <ul className={style.listado}>
            {condicionesTienda.map((condicion,index) => (
                <li key={index}>{condicion}</li>
            ))}
          </ul>
          <button className={style.button} onClick={() => navigate(getTipoLabel(selectedSubscription) === 'Tienda' ?'/app/Tienda':'/app/Perfil')}>PROBAR FUNCIONES</button>
        </>}
      </div>
      <div className={style.factura}>
        <h1 style={{textAlign:'center',fontSize:'4svh'}}>RESUMEN</h1>
        <div style={{textWrap: 'nowrap',overflow: 'hidden'}}>----------------------------------------------------------</div>
        <div className={style.campo}>
            <label>NOMBRE</label>
            <label>{nombre}</label>
        </div>
        <div className={style.campo}>
            <label>FECHA</label>
            <label>{formattedDate}</label>
        </div>
        <div className={style.campo}>
            <label>ESTADO</label>
            <label>aprovada</label>
        </div>
        <div className={style.campo}>
            <label>VALOR</label>
            <label>{selectedSubscription}</label>
        </div>
        <div className={style.campo}>
          <label>TIPO</label>
          <label>{getTipoLabel(selectedSubscription)}</label>
        </div>
        {IsMobile() && <button className={style.button} onClick={() => navigate(getTipoLabel(selectedSubscription) === 'Tienda' ?'/app/Tienda':'/app/Perfil')}>PROBAR FUNCIONES</button>}
      </div>
    </div>
  )
}

export default RecivePasarela
