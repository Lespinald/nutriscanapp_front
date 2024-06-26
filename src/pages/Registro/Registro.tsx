import React, { useState } from 'react'
import styleLogin from '../Login/login.module.css'
import style from './registro.module.css'
import { Usuario, formatDate, usuarioVacio } from '../../assets/models/usuario'
import { GoogleAuthProvider, createUserWithEmailAndPassword, deleteUser, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase'
import { useDispatch } from 'react-redux'
import { login, logout } from '../../redux/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import MenuCarga from '../../assets/MenuCarga/MenuCarga'
import useBaseDatos from '../../storage/useBaseDatos'

const googleProvider = new GoogleAuthProvider();

const Registro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { crearDoc }= useBaseDatos()

  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<Usuario>({...usuarioVacio})

  const HandleInputChange = (fieldName: string) => (e: { target: { value: any } }) => {
    // Si el campo es 'fechaDeNacimiento', convertir el valor a un objeto Date
    const value = fieldName === 'fechaDeNacimiento' ? formatDate(new Date(e.target.value)) : fieldName === 'altura' ? e.target.value * 100 : e.target.value
    setUser({ ...user, [fieldName]: value });
  };

  function validarCorreo(correo:string) {
    // Expresión regular para validar correo electrónico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
  }

  function ValidarEdad(fechaNacimientoString:string) {
    // Convertir la cadena de fecha de nacimiento a un objeto de fecha
    const fechaNacimiento = new Date(fechaNacimientoString);

    // Verificar si la conversión fue exitosa
    if (isNaN(fechaNacimiento.getTime())) {
        alert('Ingrese una fecha de nacimiento válida.');
        return false;
    }

    // Obtener la fecha actual
    const fechaActual = new Date();
    // Calcular el año hace 18 años
    const hace18Anos = fechaActual.getFullYear() - 18;
  
    // Obtener el año de la fecha de nacimiento
    const añoNacimiento = fechaNacimiento.getFullYear();
  
    // Verificar si el año de nacimiento es menor al año actual menos 18
    if (añoNacimiento > hace18Anos) {
        alert('Ingrese una fecha de nacimiento válida, debe ser mayor de 18 años.');
        return false;
    }

    return true;
  }

  const ConfirmarNoVacioCorreo = (dato:Usuario) => {
    if (!validarCorreo(dato.correo)) {
      alert('Ingrese un correo válido');
      return false;
    }
    if(password.length < 6){
      alert('Ingrese una contraseña valida (minimo 6 caracteres)')
      return false
    }
    return true
  }

  const ConfirmarNoVacio = (dato:Usuario) => {
    console.log("🚀 ~ ConfirmarNoVacio ~ usuarioVacio:", usuarioVacio)
    console.log("🚀 ~ ConfirmarNoVacio ~ dato:", dato)
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
    return true
  }

  const CrearUsuario = async ():Promise<string> => {
    try {
      const resp = await createUserWithEmailAndPassword(auth, user.correo, password);
      return resp?.user?.uid;
    } catch (error:any) {
      console.log("🚀 ~ HandleRegistro ~ error:", error.code);
      setLoading(false)
      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        alert('El correo electrónico ya está en uso');
        return 'Error'
      } else if (error.message === 'Firebase: Error (auth/weak-password)') {
        alert('La contraseña es demasiado débil');
        return 'Error'
      } else {
        alert('Error al crear el usuario');
        return 'Error'
      }
    }
  }

  const CrearUsuarioGoogle = async ():Promise<string> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (user) {
          return user.uid;
      } else {
          dispatch(logout())
          alert('Error al iniciar sesión con Google');
          return'Error'
      }
    } catch (error) {
      dispatch(logout())
      console.log("🚀 ~ IniciarSesionConGoogle ~ error:", error);
      alert('Error al iniciar sesión con Google');
      return'Error'
    }
  }

  const CrearUsuarioBD = (uid:string) => {
    setLoading(true)
    const fechaActual = new Date();
    console.log("🚀 ~ CrearUsuarioBD ~ uid:", uid)
    // ========EJECUTAR AL VERIFICAR NO DUPLICIDAD===========
    var resp = fetch(`https://api.nutriscan.com.co/api/usuarios`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      }, body: JSON.stringify(
        { 
          uid: uid, 
          nombre: user.nombre,
          tipoSuscripcion: 'PRUEBA',
          fechaSuscripcion : formatDate(new Date(fechaActual.getTime() + (30 * 24 * 60 * 60 * 1000))),
          fechaDeNacimiento : user.fechaDeNacimiento,
          altura :  user.altura,
          peso :  user.peso,
          telefono :  user.telefono,
          correo :  user.correo,
          ultimoLogueo: fechaActual.toISOString(),
          racha: 1
        })
      })
      .then(respuesta => {
        console.log("🚀 ~ HandleRegistro ~ respuesta:", respuesta)
        if (!respuesta.ok) {
          throw new Error('Error en la solicitud');
        }
        setLoading(false)
        return respuesta.json()
      })
      .then(datos => {
        console.log("🚀 ~ HandleRegistro ~ datos:", datos as Usuario)
        dispatch(login({infoUsuario:datos}))
        setLoading(false)
        navigate('/app/Scan')
      })
      .catch(error => {
        if (auth.currentUser !== null && auth.currentUser !== undefined) {
          deleteUser(auth.currentUser);
        }
        setLoading(false)
      console.error('Error en la solicitud fetch:', error);
      alert('Error actualizar en base de datos')
      // Aquí puedes manejar el error como desees, por ejemplo, mostrar un mensaje al usuario
    });
    return resp
  }

  const CrearUsuarioFirebase = async (uid:string) => {
    setLoading(true)
    await crearDoc('usuarios/'+uid,{ 
      uid: uid, 
      nombre: user.nombre,
      fechaSuscripcion : user.fechaSuscripcion,
      fechaDeNacimiento : user.fechaDeNacimiento,
      altura :  user.altura,
      peso :  user.peso,
      telefono :  user.telefono,
      correo :  user.correo} as Usuario).then(
        () => {
          dispatch(login({infoUsuario:{ 
            uid: uid, 
            nombre: user.nombre,
            fechaSuscripcion : user.fechaSuscripcion,
            fechaDeNacimiento : user.fechaDeNacimiento,
            altura :  user.altura,
            peso :  user.peso,
            telefono :  user.telefono,
            correo :  user.correo} as Usuario}))
            setLoading(false)
            navigate('/app/Inicio')
          }
      ).catch((error: any) =>
        {
          setLoading(false)
          alert(error.message)
        }
    )
  }
  
  const HandleRegistro = async (e: React.UIEvent) => {
    e.preventDefault()
    setLoading(true)
    console.log("🚀 ~ HandleRegistro ~ ConfirmarNoVacio(user):", ConfirmarNoVacio(user))
    console.log("🚀 ~ HandleRegistro ~ ConfirmarNoVacioCorreo(user):", ConfirmarNoVacioCorreo(user))
    if(ConfirmarNoVacio(user) && ConfirmarNoVacioCorreo(user)){
      console.log('Empezar registro')
      var uid = await CrearUsuario()
      if (uid === 'Error') {
        if (auth.currentUser !== null && auth.currentUser !== undefined) {
          deleteUser(auth.currentUser);
        }
        setLoading(false)
        return dispatch(logout())
      } else {
        CrearUsuarioBD(uid)
      };
    }
    setLoading(false)
  }  
  
  const HandleRegistroGoogle = async (e: React.UIEvent) => {
    e.preventDefault()
    setLoading(true)
    if(ConfirmarNoVacio(user)){
      var uid = await CrearUsuarioGoogle()
      if (uid === 'Error') {
        if (auth.currentUser !== null && auth.currentUser !== undefined) {
          deleteUser(auth.currentUser);
        }
        setLoading(false)
        return dispatch(logout())
      } else {
        CrearUsuarioBD(uid)
      };
    }
    setLoading(false)
  }

  return (
    <div className={styleLogin.fondoLogin}>
      <MenuCarga isOpen={loading}/>
      <Link className={styleLogin.backButton} to={'/Home'}>
        <svg xmlns="http://www.w3.org/2000/svg" height="3svh" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="3svh" xmlSpace="preserve" fill='white'>
            <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
        </svg>
      </Link>
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
        <input autoComplete='true' type='number' id='telefono' placeholder='Celular' onChange={HandleInputChange('telefono')}></input>
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
        <button className={styleLogin.button_google} onClick={HandleRegistroGoogle}>
          <img src='\Login\GoogleIcon.png' style={{height:'100%'}}></img>
          <p>Continuar con Google</p>
        </button>
      </form>
      <a  className={styleLogin.fondoLogin_label} href='/Login'>¿Ya tienes cuenta? Ingresa aquí</a>
    </div>
  )
}

export default Registro
