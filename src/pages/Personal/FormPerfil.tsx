import React, { useState } from 'react'
import InputFoto from './InputFoto'
import styleMenuPerfil from './MenuPerfil.module.css'
import style from './FormPerfil.module.css'
import { Link, useNavigate } from 'react-router-dom'

const FormPerfil = () => {
  const [changePhoto, setChangePhoto] = useState(false)
  const [photoPerfil, setPhotoPerfil] = useState('')
  const navigate = useNavigate()

  return (
    <div className={styleMenuPerfil.fondoPerfil}>
      <div className={`${styleMenuPerfil.div1} ${style.firstColumna}`}>
        <div style={{display:'flex',gap:'7svh',alignItems:'center',color:'var(--color-5)'}}>
            <p className={style.backButton} onClick={() => navigate('/app/Perfil')} >
                <svg xmlns="http://www.w3.org/2000/svg" height="3svh" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="3svh" xmlSpace="preserve" fill='var(--color-5)'>
                    <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
                </svg>
            </p>
            <h1>EDITAR PERFIL</h1>
        </div>
        <div className={`${styleMenuPerfil.contain_img} ${style.contain_img}`} onClick={() => setChangePhoto((prev) => !prev)}>
          <p>CAMBIAR FOTO  
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2vh" height="2vh" viewBox="0 0 24 24" fill='var(--color-5)' style={{transform:'translateX(10px)'}}>
              <path d="M14.1 5.9L3 17v4h4L18.1 9.9 14.1 5.9zM15.6 4.4L18 2l4 4-2.4 2.4L15.6 4.4z"></path>
            </svg>
          </p>
        </div>
      </div>
      <div className={style.formulario}>
        <form>
            <div className={style.campo}>
                <label htmlFor="correo">Correo:</label>
                <input type="email" id="correo" name="correo" readOnly className={style.correo}/>
            </div>
            <div className={style.campo}>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" />
            </div>
            <div className={style.campo}>
                <label htmlFor="celular">Celular:</label>
                <input type="tel" id="celular" name="celular" />
            </div>
            <div className={style.campo}>
                <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
                <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" />
            </div>
            <div className={style.campo}>
                <label htmlFor="altura">Altura (cm):</label>
                <input type="number" id="altura" name="altura"/>
            </div>
            <div className={style.campo}>
                <label htmlFor="peso">Peso (kg):</label>
                <input type="number" id="peso" name="peso"/>
            </div>
            <button type="button" className={`${style.button} ${true ? style.desactivado : ''}`}>Guardar Cambios</button>
            <div className={style.campo}>
                <label htmlFor="nueva_contrasena">Nueva Contraseña:</label>
                <input type="password" id="nueva_contrasena" name="nueva_contrasena"/>
            </div>
            <div className={style.campo}>
                <label htmlFor="confirmar_nueva_contrasena">Confirmar Nueva Contraseña:</label>
                <input type="password" id="confirmar_nueva_contrasena" name="confirmar_nueva_contrasena"/>
            </div>
            <button type="button" className={`${style.button} ${true ? style.desactivado : ''}`}>Cambiar Contraseña</button>
        </form>
    </div>
      <InputFoto isOpen={changePhoto} setIsOpen={setChangePhoto} photoPerfil={photoPerfil} setPhotoPerfil={setPhotoPerfil}/>
    </div>
  )
}

export default FormPerfil
