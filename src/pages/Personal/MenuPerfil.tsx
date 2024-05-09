import React, { useEffect, useState } from 'react'
import style from './MenuPerfil.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Usuario } from '../../assets/models/usuario'
import InputFoto from './InputFoto'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { logout } from '../../redux/authSlice'

const MenuPerfil = () => {
  const infoUser:Usuario = useSelector((state:any) => state.auth.infoUsuario)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("user:",infoUser);
    
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

  return (
    <div className={style.fondoPerfil}>
      <div className={style.div1}>
        <section className={style.photoSection}>
          <div className={style.contain_img} style={{background:`url(${infoUser.foto ? infoUser.foto: '/Home/Perfil/Foto.png'}) top left / contain no-repeat`}}>
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
                <img src='/public/Home/Perfil/muffin.png' alt='Dulce'></img>
                <img src='/public/Home/Perfil/limon.png' alt='Amargo'></img>
              </div>
            </div>
            <div className={style.containIMC}>
              <img src='/public/Home/Perfil/target.png' alt='diana'></img>
              <p className={style.s}>IMC: {(infoUser?.peso / (infoUser?.altura^2) * 100).toFixed(1)}</p>
              <p className={style.s}>Estado: {GetEstado(infoUser?.peso / (infoUser?.altura^2) * 100)}</p>
            </div>
          </div>
          <button className={style.logoutButton} onClick={HandleSignOut}>Cerrar Sesión</button>
        </section>
      </div>
        <section className={style.sectionEstadisticas}>
          <h1 className={style.estadistics}>Estadisticas</h1>
          <img src='/public/Home/Perfil/Mapa.png' alt='Mapa conceptual' className={style.mapa}></img>
          <div className={style.contain_estadistics}>
            <img src='/public/Home/Perfil/Busquedas.png' alt='Sobre tus busquedas'></img>
            <img src='/public/Home/Perfil/Consumo.png' alt='Consumo Calorico'></img>
            <img src='/public/Home/Perfil/Progreso.png' alt='Progreso'></img>
          </div>
        </section>
    </div>
  )
}

export default MenuPerfil
