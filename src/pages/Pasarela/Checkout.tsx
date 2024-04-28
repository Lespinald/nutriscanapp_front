import { useState } from 'react'
import style from './Checkout.module.css'
import { useParams } from 'react-router-dom'
import { IsMobile } from '../../assets/Utils'

const Checkout = () => {
  const info = useParams().info
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')


  const condicionesTienda = [
    "Incluye recomendaciones basadas en tus preferencias",
    "Seguimiento de nutrición diaría",
    "No pierdes tus registros semanalmente",
    "Información nutricional de calidad"
  ];

  return (
    <div className={style.checkoutFondo}>
      <div className={style.box}>
        <label>Nombre</label>
        <input 
        type='text' 
        placeholder='Ingrese su nombre' 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)}></input>
        <label>Correo</label>
        <input 
        type='text' 
        placeholder='Ingrese su correo' 
        value={correo} onChange={(e) => setCorreo(e.target.value)}></input>
        <video 
        className={style.video} 
        src="video.mp4" 
        poster="/src/assets/PosterVideo.png" 
        preload="metadata" controls></video>
      </div>
      <div className={style.recibo}>
        <h1 className={style.titulo} style={IsMobile() ? {} : {display:'none'}}>LISTO PARA SUSCRIBIRTE</h1>
        <p className={style.a} style={IsMobile() ? {display:'none'} : {}}>Nombre:</p>
        <p className={style.a} style={IsMobile() ? {display:'none'} : {}}>{nombre}</p>
        <p className={style.a}>Suscripción:</p>
        <p className={style.a}>NUTRISCAN {info === 'market' ? 'TIENDA' : 'PLUS'}</p>
        <p className={style.a}>HASTA:</p>
        <p className={style.a}>20-04-2024</p>
        <ul className={style.listado}>
            {condicionesTienda.map((condicion,index) => (
                <li key={index}>{condicion}</li>
            ))}
        </ul>
        <div className={style.linea}></div>
        <p className={style.a}>TOTAL</p>
        <p className={style.fill}>$ {info === 'market' ? '50.000' : '7.000'}</p>
        <a href='https://buy.stripe.com/test_eVabKM2zkboP5VedQR'>
        <button className={style.buttonPagar}>Pagar</button>
        </a>
      </div>
    </div>
  )
}

export default Checkout
