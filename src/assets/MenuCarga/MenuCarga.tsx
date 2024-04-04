import React from 'react'
import style from './carga.module.css'

interface Props{
  isOpen: boolean;
}


const MenuCarga = ({isOpen}:Props) => {
  return (
    <div className={style.fondo} style={isOpen?{}:{display:'none'}}>
      <div className={style.contain_logo}>
        <img src='\Login\nutriscanLogo.png' alt='Logo' className={style.logo}></img>
      </div>
      <p className={style.cargando}>Cargando</p>
    </div>
  )
}

export default MenuCarga
