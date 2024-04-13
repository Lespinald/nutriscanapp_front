import React, { useState } from 'react'
import style from './MenuPerfil.module.css'
import { useSelector } from 'react-redux'
import { Usuario } from '../../assets/models/usuario'
import InputFoto from './InputFoto'

const MenuPerfil = () => {
  const infoUser:Usuario = useSelector((state:any) => state.auth.infoUsuario)
  const [changePhoto, setChangePhoto] = useState(false)
  const [photoPerfil, setPhotoPerfil] = useState('')

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

  return (
    <div className={style.fondoPerfil}>
      <section>
        <div className={style.contain_img} onClick={() => setChangePhoto((prev) => !prev)}>
          {/* <img src='*' alt='foto perfil'></img> */}
        </div>
        <h1 className={style.welcome}>Bienvenido {infoUser.nombre}</h1>
        <h3>Tel: {infoUser.telefono}</h3>
        <h3>{infoUser.correo}</h3>
      </section>
      <section>
        <h2 className={style.preferencias}>Preferencias de anuncios</h2>
        <div className={style.contain_preferencias}>
            <img src='/public/Home/Perfil/muffin.png' alt='Dulce'></img>
            <img src='/public/Home/Perfil/limon.png' alt='Amargo'></img>
        </div>
        <div className={style.contain_info}>
            <p className={style.s}>Mas sobre ti</p>
            <p className={style.s}>Altura: {infoUser.altura / 100} m</p>
            <p className={style.s}>Peso: {infoUser.peso} Kg</p>
            <p className={style.s}>IMC: {(infoUser.peso / (infoUser.altura^2) * 100).toFixed(1)}</p>
            <p className={style.s}>Estado: {GetEstado(infoUser.peso / (infoUser.altura^2) * 100)}</p>
        </div>
      </section>
      <section>
        <h1 className={style.estadistics}>Estadisticas</h1>
        <div className={style.contain_estadistics}>
            <img src='/public/Home/Perfil/Busquedas.png' alt='Sobre tus busquedas'></img>
            <img src='/public/Home/Perfil/Consumo.png' alt='Consumo Calorico'></img>
            <img src='/public/Home/Perfil/Progreso.png' alt='Progreso'></img>
        </div>
      </section>
      <section>
        <h1 className={style.avanzado}>Avanzado</h1>
        <div className={style.contain_avanzado}>
            <img src='/public/Home/Perfil/Busquedas.png' alt='Sobre tus busquedas'></img>
            <img src='/public/Home/Perfil/Consumo.png' alt='Consumo Calorico'></img>
            <img src='/public/Home/Perfil/Progreso.png' alt='Progreso'></img>
        </div>

      </section>
      <InputFoto isOpen={changePhoto} setIsOpen={setChangePhoto} photoPerfil={photoPerfil} setPhotoPerfil={setPhotoPerfil}/>
    </div>
  )
}

export default MenuPerfil
