import React, { useEffect, useState } from 'react'
import style from './MenuPerfil.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Usuario } from '../../assets/models/usuario'
import InputFoto from './InputFoto'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { logout } from '../../redux/authSlice'

import { GraphBusquedas } from './GraphBusquedas.jsx';
import { GraphCalorias } from './GraphCalorias.jsx';
import { GraphProgreso } from './GraphProgreso.jsx'
import { nutriscoreImgs } from '../../assets/categorias.js'
import { CalcularIMC, ConsultarOpenFoodFact } from '../../assets/Utils.js'
import { Historial } from '../../assets/models/historial.js'
import { Producto } from '../../assets/models/tienda.js'

const MenuPerfil = () => {
  const [productosHistorial, setProductosHistorial] = useState<Producto[]>([])
  const [showGraph, setShowGraph] = useState(false); // Estado para controlar la visualización de la gráfica de barras
  const [bandera, setBandera] = useState<string>(''); // Estado para almacenar la bandera de qué gráfica mostrar
  const infoUser:Usuario = useSelector((state:any) => state.auth.infoUsuario)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const GetHistorial = async () => {
    try {
      const response = await fetch(`https://api.nutriscan.com.co/api/historialusuario/${infoUser.uid}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("404 not found");
        }
        throw new Error(response.statusText);
      }
  
      const data = await response.json();
      const historials = data.filter((item) => item.comido).map((item) => ({
        ID_dia: item.ID_dia,
        ID_producto: item.producto.referencia,
        calorias: item.calorias,
        comido: item.comido,
        createdAt: item.createdAt,
        fecha: item.fecha,
        uid: item.uid,
        updatedAt: item.updatedAt
      }));
  
      console.log("🚀 ~ consthistorials:Historial[]=res.slice ~ historials:", historials);
      return historials;
    } catch (error) {
      console.error(error);
      return []; // Retornar un array vacío en caso de error
    }
  }

  async function obtenerProductosHistorial(historials:Historial[]) {
    const productosHistorial: Producto[] = [];
  
    const consultas = historials.map((currentHistorial) =>
      ConsultarOpenFoodFact(currentHistorial.ID_producto.toString()).then((res) => {
        if (res) {
          // setProductosHistorial((prev) => [...prev,res])
          productosHistorial.push(res)
        }
      })
    );
  
    await Promise.all(consultas);
    console.log("🚀 ~ obtenerProductosHistorial ~ productosHistorial:", productosHistorial)
    return productosHistorial;
  }

  const fetchHistorial = async () => {
    const historials:Historial[] = await GetHistorial();
    if (historials.length > 0) { // Verificar si hay historiales antes de proceder
      const productos = await obtenerProductosHistorial(historials);
      console.log("🚀 ~ fetchHistorial ~ productos:", productos)
      // setProductosHistorial(productos);
    }
  };

  useEffect(() => {
    // setProductosHistorial([])
    // fetchHistorial();
  })

  const GetEstado = (imc: number) => {
    if(imc < 18.5){
      return 'Bajo'
    }
    if(imc < 24.9){
      return 'Normal'
    }
    if(imc < 29.9){
      return 'Sobrepeso'
    }else{
      return 'Obeso'
    }
  }

  const HandleSignOut = async() => {
    await signOut(auth)
    dispatch(logout())
    navigate('/')
  }

  const handleBusquedaButtonClick = () => {
    // Cambiar el estado para mostrar la gráfica de busquedas
    setShowGraph(true);
    setBandera('busquedas');
  };

  const handleCaloriaButtonClick = () => {
    // Cambiar el estado para mostrar la gráfica de calorias
    setShowGraph(true);
    setBandera('calorias');
  };

  const handleProgresoButtonClick = () => {
    // Cambiar el estado para mostrar la gráfica de calorias
    setShowGraph(true);
    setBandera('progreso');
  };

  return (
    <div className={style.fondoPerfil}>
      <div className={style.div1}>
        <section className={style.photoSection}>
          <div className={style.contain_img} style={{background:`url(${infoUser.foto ? infoUser.foto: auth.currentUser?.photoURL ?? '/Home/Perfil/Foto.png'}) top left / contain no-repeat`}}>
          </div>
          <h1 className={style.welcome}>Bienvenido {infoUser?.nombre}</h1>
        </section>
        <section className={style.infoSection}>
          <p onClick={() => navigate('/app/EditPerfil')}>Más sobre ti   
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24" fill='var(--color-5)' style={{transform:'translateX(10px)'}}>
              <path d="M14.1 5.9L3 17v4h4L18.1 9.9 14.1 5.9zM15.6 4.4L18 2l4 4-2.4 2.4L15.6 4.4z"></path>
            </svg>
          </p>
          <div className={style.contain_info}>
              <p className={style.s}>Correo:</p>
              <input type='text' value={`${infoUser?.correo}`} readOnly></input>
              <p className={style.s}>Celular:</p>
              <input type='text' value={`+57 ${infoUser?.telefono}`} readOnly></input>
              <p className={style.s}>Altura:</p>
              <input type='text' value={`${infoUser?.altura / 100} m`} readOnly></input>
              <p className={style.s}>Peso:</p>
              <input type='text' value={`${infoUser?.peso} Kg`} readOnly></input>
          </div>
          <div className={`${style.rowElements} ${style.margenes}`}>
            <div className={style.contain_preferencias}>
              <p className={style.preferencias}>Preferencias</p>
              <div>
                <img src='/Home/Perfil/muffin.png' alt='Dulce'></img>
                <img src='/Home/Perfil/limon.png' alt='Amargo'></img>
              </div>
            </div>
            <div className={style.containIMC}>
              <img src='/Home/Perfil/target.png' alt='diana'></img>
              <p className={style.s}>IMC: {CalcularIMC(infoUser?.peso, infoUser?.altura).toFixed(1)}</p>
              <p className={style.s}>Estado: {GetEstado(CalcularIMC(infoUser?.peso, infoUser?.altura))}</p>
            </div>
          </div>
          <button className={style.logoutButton} onClick={HandleSignOut}>Cerrar Sesión</button>
        </section>
      </div>
        <section className={style.sectionEstadisticas}>
          <h1 className={style.estadistics}>Estadisticas</h1>
          <div>
          {showGraph ? (
            // Si showGraph es verdadero, mostrar la gráfica correspondiente
            bandera === 'busquedas' ? (
            <GraphBusquedas />
          ) : bandera === 'calorias' ? (
            <GraphCalorias />
          ) : bandera === 'progreso' ? (
            <GraphProgreso />
          ) : null // No se renderiza nada si bandera no es busquedas ni calorias ni progreso
        ) : (
        // Mostrar la imagen del mapa conceptual si showGraph es falso
        <img></img>
          )}
          </div>
          <div className={style.contain_estadistics}>
            <button id="BusquedaButton" onClick={handleBusquedaButtonClick}>
              <img src='/Home/Perfil/Busquedas.png' alt='Sobre tus busquedas'></img>
            </button>
            <button id="CaloriaButton" onClick={handleCaloriaButtonClick}>
              <img src='/Home/Perfil/Consumo.png' alt='Consumo Calorico'></img>
            </button>
            <button id="ProgresoButton" onClick={handleProgresoButtonClick}>
              <img src='/Home/Perfil/Progreso.png' alt='Progreso'></img>
            </button>
          </div>
        </section>
    </div>
  )
}

export default MenuPerfil 
