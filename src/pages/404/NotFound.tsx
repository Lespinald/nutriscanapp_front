import React from 'react'
import style from './404.module.css'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={style.backCirculo}>
      <h1 style={{fontSize:'700%',lineHeight:'97%'}}>404</h1>
      <h2>UPS!</h2>
      <h2 style={{fontWeight:'600',lineHeight:'260%',color:'var(--color-3)'}}>La pagina que buscar no existe</h2>
      <button className={style.button} onClick={() => {navigate('..')}}>REGRESAR</button>
    </div>
  )
}

export default NotFound
