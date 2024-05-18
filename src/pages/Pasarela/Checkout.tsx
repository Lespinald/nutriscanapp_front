import { useState } from 'react'
import style from './Checkout.module.css'
import { useParams } from 'react-router-dom'
import { IsMobile } from '../../assets/Utils'
import Stripe from 'stripe'
import { useSelector } from 'react-redux'


const Checkout = () => {
  const info = useParams().info
  
  const infoUser = useSelector((state:any) => state.auth.infoUsuario)
  const [nombre, setNombre] = useState(infoUser?.nombre??'')
  const [correo, setCorreo] = useState(infoUser?.correo??'')

  const stripe = new Stripe('sk_test_51PANts06rYdnPSbTI5dy2sGkBMm8ipqD35dgnZVhlGrO0EwdMPhLlHsvw0FqP7VdLbw7N1iSjP4XM9KH4NZSGXzE00pLlIHxUM')

  const condicionesTienda = [
    "Incluye recomendaciones basadas en tus preferencias",
    "Seguimiento de nutrición diaría",
    "No pierdes tus registros semanalmente",
    "Información nutricional de calidad"
  ];

    // Obtiene la fecha actual
    const expiraDate = new Date();
    expiraDate.setDate(expiraDate.getDate()+7);

    // Formatea la fecha en formato DD/MM/YYYY
    const formattedDate = expiraDate.toLocaleDateString('es-ES');
    const handleClickPagar = async () => {
      const session = await stripe.checkout.sessions.create({
        success_url: `http://localhost:5173/responseFactura?nombre=${infoUser?.nombre}&id=${infoUser?.uid}`, 
        cancel_url: 'http://localhost:5173',
        line_items: [
          {
            price: 'price_1PAOQS06rYdnPSbTQIx40jAo',
            quantity: 1,
          },
        ],
        mode: 'subscription',
      });
      if (session.url) {
        window.location.href = session.url;
      }
    } 
  return (
    <div className={style.checkoutFondo}>
      <div className={style.box}>
        <label>Nombre completo</label>
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
        <p className={style.a}>{formattedDate}</p>
        <ul className={style.listado}>
            {condicionesTienda.map((condicion,index) => (
                <li key={index}>{condicion}</li>
            ))}
        </ul>
        <div className={style.linea}></div>
        <p className={style.a}>TOTAL</p>
        <p className={style.fill}>$ {info === 'market' ? '50.000' : '7.000'}</p>
        <button className={style.buttonPagar} onClick={handleClickPagar} >Pagar</button>
      </div>
    </div>
  )
}

export default Checkout

