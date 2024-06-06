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
import { CalcularIMC, ConsultarOpenFoodFact, GetTipoSuscripcion } from '../../assets/Utils.js'
import { Historial } from '../../assets/models/historial.js'
import { Producto } from '../../assets/models/tienda.js'
import HistorialGrafica, { HistorialTiendaGrafica } from './HistorialGrafica.jsx'
import TiendaLogo from '../../assets/Components/TiendaLogo.jsx'
import ProfileLogo from '../../assets/Components/ProfileLogo.jsx'

const MenuPerfil = () => {
  const [showGraph, setShowGraph] = useState(false); // Estado para controlar la visualización de la gráfica de barras
  const [bandera, setBandera] = useState<string>(''); // Estado para almacenar la bandera de qué gráfica mostrar
  const [historial, setHistorial] = useState<Historial[]>([]); 
  const [verTienda, setVerTienda] = useState<boolean>(false); 
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
      const historials = data.map((item) => ({
        ID_dia: item?.ID_dia,
        ID_producto: item.producto?.referencia,
        calorias: item?.calorias,
        comido: item?.comido,
        createdAt: item?.createdAt,
        fecha: item?.fecha,
        uid: item?.uid,
        updatedAt: item?.updatedAt
      }));
  
      console.log("🚀 ~ consthistorials:Historial[]=res.slice ~ historials:", historials);
      return historials;
    } catch (error) {
      console.error(error);
      return []; // Retornar un array vacío en caso de error
    }
  }

  const fetchHistorial = async () => {
    const historials:Historial[] = await GetHistorial();
    console.log("🚀 ~ fetchHistorial ~ historials:", historials)
    setHistorial(historials)
  };

  useEffect(() => {
    fetchHistorial();
  },[])

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
        <section className={style.photoSection} style={GetTipoSuscripcion(infoUser) === 'FREE'?{background:'#44A9F2'}:GetTipoSuscripcion(infoUser) === 'tienda'?{background:'var(--color-4)'}:{background:'var(--color-5)'}}>
          <div className={style.contain_img} style={{background:`url(${infoUser.foto ? infoUser.foto: auth.currentUser?.photoURL ?? '/Home/Perfil/Foto.png'}) top left / contain no-repeat`}}>
          </div>
          <h1 className={style.welcome}>Bienvenido {infoUser?.nombre} {GetTipoSuscripcion(infoUser) === 'FREE'?<></>:<div className={style.plus}>PLUS</div>}</h1>
        </section>
        <section className={style.infoSection}>
          <p className='estiloButton' style={{color:'var(--color-6)'}} onClick={() => navigate('/app/EditPerfil')}>Más sobre ti   
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24" fill='var(--color-6)' style={{transform:'translateX(10px)'}}>
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
          <button className={`${style.logoutButton} estiloButton`} onClick={HandleSignOut}>Cerrar Sesión</button>
        </section>
      </div>
      <section className={style.sectionEstadisticas}>
        {verTienda ? 
          <div className={`${style.buttonTiendaEstadisticas} estiloButton`} onClick={() => setVerTienda((prev) => !prev)}>
            VER MIS ESTADISTICAS
            <ProfileLogo color='var(--color-1)'/>
          </div>
          :
          <div className={`${style.buttonTiendaEstadisticas} estiloButton`} onClick={() => setVerTienda((prev) => !prev)}>
            VER ESTADISTICAS MI TIENDA
            <TiendaLogo width={'5svh'} height={'5svh'} color='var(--color-1)'/>
          </div>}
        <h1 className={style.estadistics}>Estadisticas</h1>
        { verTienda? 
        <>
          <div>
            {showGraph ? (
              // Si showGraph es verdadero, mostrar la gráfica correspondiente
                bandera === 'busquedas' ? (
                <GraphBusquedas historial={historial}/>
              ) : bandera === 'progreso' ? (
                <HistorialTiendaGrafica historial={[]} />
              ) : null // No se renderiza nada si bandera no es busquedas ni calorias ni progreso
            ) : (
              // Mostrar la imagen del mapa conceptual si showGraph es falso
              <HistorialTiendaGrafica historial={[]} />
            )}
          </div>
          <div className={style.contain_estadistics} style={{gridTemplateColumns:'1fr 1fr'}}>
            <button id="ProgresoButton" onClick={handleProgresoButtonClick}>
              Historial
            </button>
            <button id="BusquedaButton" onClick={handleBusquedaButtonClick}>
              Sobre Productos
            </button>
          </div>
        </>
        :<>
          <div>
            {showGraph ? (
              // Si showGraph es verdadero, mostrar la gráfica correspondiente
                bandera === 'busquedas' ? (
                <GraphBusquedas historial={historial}/>
              ) : bandera === 'calorias' ? (
                <GraphCalorias historial={historial}/>
              ) : bandera === 'progreso' ? (
                <HistorialGrafica historial={historial} />
              ) : null // No se renderiza nada si bandera no es busquedas ni calorias ni progreso
            ) : (
              // Mostrar la imagen del mapa conceptual si showGraph es falso
              <HistorialGrafica historial={historial} />
            )}
          </div>
          <div className={style.contain_estadistics}>
            <button id="BusquedaButton" onClick={handleBusquedaButtonClick}>
              Sobre tus busquedas
            </button>
            <button id="CaloriaButton" onClick={handleCaloriaButtonClick}>
              Consumo Calorico
            </button>
            <button id="ProgresoButton" onClick={handleProgresoButtonClick}>
              Historial
            </button>
          </div>
        </>}
      </section>
    </div>
  )
}

export default MenuPerfil 
