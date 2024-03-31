import React, { useState } from 'react'
import styleLogin from '../Login/login.module.css'
import style from './registro.module.css'
import { Usuario, usuarioVacio } from '../../assets/models/usuario'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

const Registro = () => {
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<Usuario>({
    id : '',
    nombre : '',
    fechaSuscripcion : new Date(0),
    fechaDeNacimiento : new Date(0),
    altura : 0,
    peso : 0,
    telefono : '',
    correo : '',
  })

  const HandleInputChange = (fieldName: string) => (e: { target: { value: any } }) => {
    // Si el campo es 'fechaDeNacimiento', convertir el valor a un objeto Date
    const value = fieldName === 'fechaDeNacimiento' ? new Date(e.target.value) : e.target.value;
    setUser({ ...user, [fieldName]: value });
  };

  function ValidarAltura(altura:number) {
    // Verificar si la altura es un número y mayor que cero
    if (isNaN(altura) || altura <= 0) {
      return false;
    }
    return true;
  }

  function validarCorreo(correo:string) {
    // Expresión regular para validar correo electrónico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
  }

  function ValidarEdad(fechaNacimiento:Date) {
    fechaNacimiento = new Date(fechaNacimiento)

    // Obtener la fecha actual
    const fechaActual = new Date();
    // Calcular el año hace 18 años
    const hace18Anos = fechaActual.getFullYear() - 18;
  
    // Obtener el año de la fecha de nacimiento
    const añoNacimiento = fechaNacimiento.getFullYear();
  
    // Verificar si el año de nacimiento es menor al año actual menos 18
    if (añoNacimiento > hace18Anos) {
      alert('Ingrese una fecha valida debe ser mayor de 18 años.')
      return false;
    }
    if(fechaNacimiento <= new Date(0)){
      alert('Ingrese una fecha.')
      return false;
    }
    return true;
  }
    

  const ConfirmarNoVacio = (dato:Usuario) => {
    console.log("🚀 ~ ConfirmarNoVacio ~ usuarioVacio:", usuarioVacio)
    console.log("🚀 ~ ConfirmarNoVacio ~ dato:", dato)
    if (!validarCorreo(dato.correo)) {
      alert('Ingrese un correo válido');
      return false;
    }
    if(password.length < 6){
      alert('Ingrese una contraseña valida (minimo 6 caracteres)')
      return false
    }
    if(dato.nombre === usuarioVacio.nombre){
      alert('Ingrese un nombre valido')
      return false
    }
    if (!ValidarEdad(dato.fechaDeNacimiento)) {
      return false;
    }
    if(dato.telefono === usuarioVacio.telefono){
      alert('Ingrese un telefono valido')
      return false
    }
    if(dato.peso <= usuarioVacio.peso){
      alert('Ingrese un peso valido')
      return false
    }
    if(!ValidarAltura(dato.altura)) {
      alert('Ingrese una altura válida (en metros y mayor que cero)');
      return false;
    }
    return true
  }
  
  const HandleRegistro = async (e: React.UIEvent) => {
    e.preventDefault()
    if(ConfirmarNoVacio(user)){
      console.log('Empezar registro')
      console.log("🚀 ~ HandleRegistro ~ password:", password)
      console.log("🚀 ~ HandleRegistro ~ user.correo:", user.correo)
      console.log("🚀 ~ HandleRegistro ~ firebaseAuth:", auth)
      const resp = await signInWithEmailAndPassword(auth, user.correo, password)
      console.log("🚀 ~ HandleRegistro ~ resp:", resp)

      // ========EJECUTAR AL VERIFICAR NO DUPLICIDAD===========
      // await fetch(`http://192.168.1.6:3000/api/usuarios`,{
      //   method: 'POST',
      //   headers:{
      //       'Content-Type': 'application/json'
      //   }, body: JSON.stringify({ id: '123456', 
      //   nombre: user.nombre,
      //   fechaSuscripcion : user.fechaSuscripcion,
      //   fechaDeNacimiento : user.fechaDeNacimiento,
      //   altura :  user.altura * 100,
      //   peso :  user.peso,
      //   telefono :  user.telefono,
      //   correo :  user.correo})
      // })
      // .then(respuesta => {
      //   console.log("🚀 ~ HandleRegistro ~ respuesta:", respuesta)
      //   return respuesta.json()
      // })
      // .then(datos => {
      //   console.log("🚀 ~ HandleRegistro ~ datos:", datos)
      // })
    }
  }  

  return (
    <div className={styleLogin.fondoLogin}>
      <h1 className={styleLogin.loginTitle}>BIENVENIDO</h1>
      <form className={style.form_registro} style={{display:'flex',flexDirection:'column'}}>
        <label>Nombre:</label>
        <input autoComplete='true' type='text' id='name' placeholder='Nombre' onChange={HandleInputChange('nombre')}></input>
        <label>Correo:</label>
        <input autoComplete='true' type='email' id='email' placeholder='Correo' onChange={HandleInputChange('correo')}></input>
        <label>Contraseña:</label>
        <input autoComplete='true' type='password' id='password' placeholder='Contraseña' value={password}
        onChange={(e) => setPassword(e.target.value)}></input>
        <label>Celular:</label>
        <input autoComplete='true' type='tel' id='telefono' placeholder='Celular' onChange={HandleInputChange('telefono')}></input>
        <label>Fecha de nacimiento:</label>
        <input autoComplete='true' type='date' id='birthday' placeholder='Fecha de nacimiento' style={{ height: '100%' }} onChange={HandleInputChange('fechaDeNacimiento')}></input>
        <label>Altura:</label>
        <input autoComplete='true' type='number' id='altura' placeholder='Altura(1.70m)' onChange={HandleInputChange('altura')}></input>
        <label>Peso:</label>
        <input autoComplete='true' type='number' id='peso' placeholder='Peso(Kg)' onChange={HandleInputChange('peso')}></input>
        <button className={styleLogin.button_logIn} onClick={HandleRegistro}>
          Registrarse
        </button>
        <div className={styleLogin.fondoLogin_line}></div>
        <button className={styleLogin.button_google}>
          <img src='\Login\GoogleIcon.png' style={{height:'100%'}}></img>
          <p>Continuar con Google</p>
        </button>
      </form>
      <a  className={styleLogin.fondoLogin_label} href='/Login'>¿Ya tienes cuenta? Ingresa aquí</a>
    </div>
  )
}

export default Registro
