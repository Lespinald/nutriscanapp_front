import React from 'react'
import styleLogin from '../Login/login.module.css'
import style from './registro.module.css'

const Registro = () => {

  const HandleRegistro = () => {
    
  }

  return (
    <div className={styleLogin.fondoLogin}>
        <h1 className={styleLogin.loginTitle}>BIENVENIDO</h1>
        <form className={style.form_registro} style={{display:'flex',flexDirection:'column'}}>
          <label>Nombre:</label>
          <input autoComplete='true' type='text' id='name' placeholder='Nombre'></input>
          <label>Correo:</label>
          <input autoComplete='true' type='email' id='email' placeholder='Correo'></input>
          <label>Contraseña:</label>
          <input autoComplete='true' type='password' id='password' placeholder='Contraseña'></input>
          <label>Celular:</label>
          <input autoComplete='true' type='tel' id='telefono' placeholder='Celular'></input>
          <label>Fecha de nacimiento:</label>
          <input autoComplete='true' type='date' id='birthday' placeholder='Fecha de nacimiento'></input>
          <label>Altura:</label>
          <input autoComplete='true' type='number' id='altura' placeholder='Altura(m)'></input>
          <label>Peso:</label>
          <input autoComplete='true' type='number' id='pesp' placeholder='Peso(Kg)'></input>
          <button className={styleLogin.button_logIn} onClick={HandleRegistro}>
            Registrarse
          </button>
          <div className={styleLogin.fondoLogin_line}></div>
          <button className={styleLogin.button_google}>
            <img src='\Login\GoogleIcon.png'></img>
            <p>Continuar con Google</p>
          </button>
        </form>
        <a  className={styleLogin.fondoLogin_label} href='/Login'>¿Ya tienes cuenta? Ingresa aquí</a>
    </div>
  )
}

export default Registro
