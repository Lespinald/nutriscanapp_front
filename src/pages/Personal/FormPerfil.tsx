import React, { useState } from 'react'
import InputFoto from './InputFoto'
import styleMenuPerfil from './MenuPerfil.module.css'
import style from './FormPerfil.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { IsMobile } from '../../assets/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { Usuario, formatDate } from '../../assets/models/usuario'
import { editPerfil, login } from '../../redux/authSlice'

const FormPerfil = () => {
  const infoUser:Usuario = useSelector((state:any) => state.auth.infoUsuario)
  const dispatch = useDispatch()

  const [infoPerfil, setInfoPerfil] = useState<Usuario>({...infoUser})
  const [changePhoto, setChangePhoto] = useState(false)
  const [photoPerfil, setPhotoPerfil] = useState('')
  const navigate = useNavigate()

  const HandleInputChange = (fieldName: string) => (e: { target: { value: any } }) => {
    // Si el campo es 'fechaDeNacimiento', convertir el valor a un objeto Date
    if (fieldName === 'fechaDeNacimiento') {
      const dateParts = e.target.value.split(' ')[0].split('-');
      if (dateParts.length === 3) {
        e.target.value = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
      }
    }
    const value = fieldName === 'altura' ? e.target.value * 100 :
      fieldName === 'peso' || fieldName === 'telefono'  ? Number(e.target.value) : e.target.value
    setInfoPerfil({ ...infoPerfil, [fieldName]: value });
    console.log("🚀 ~ HandleInputChange ~ infoPerfil:", infoPerfil)
  };
  
  const areObjectsEqual = (obj1: any, obj2: any): boolean => {
    // Verifica si ambos son objetos
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
      return false;
    }
  
    // Obtiene las claves de ambos objetos
    const keysObj1 = Object.keys(obj1);
    const keysObj2 = Object.keys(obj2);
  
    // Verifica si tienen la misma cantidad de claves
    if (keysObj1.length !== keysObj2.length) {
      return false;
    }
  
    // Verifica si los valores de las claves son iguales
    for (const key of keysObj1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  
    // Si todas las comparaciones pasaron, los objetos son iguales
    return true;
  };

  const HandleGuardarCambios = () => {
    console.log(JSON.stringify({
      ...infoPerfil
    }))
    if(!areObjectsEqual(infoUser,infoPerfil)){
      var resp = fetch(`https://api.nutriscan.com.co/api/usuarios/${infoUser?.uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: infoPerfil.nombre,
          fechaSuscripcion: infoPerfil.fechaSuscripcion,
          fechaDeNacimiento: infoPerfil.fechaDeNacimiento,
          foto: infoPerfil.foto,
          telefono: infoPerfil.telefono,
          altura: infoPerfil.altura,
          peso: infoPerfil.peso
        })
      })
      .then(respuesta => {
        console.log("🚀 ~ HandleRegistro ~ respuesta:", respuesta)
        if (!respuesta.ok) {
          throw new Error('Error en la solicitud');
        }
        return respuesta.json()
      })
      .then(async(datos) => {
        console.log("🚀 ~ HandleRegistro ~ datos:", datos as Usuario)
        await dispatch(editPerfil({infoUsuario: infoPerfil}))
        console.log("🚀 ~ HandleGuardarCambios ~ infoPerfil:", infoPerfil)
        alert('Modificado Exitosamente')
        navigate('/app/Perfil')
      })
      .catch(error => {
        console.error('Error en la solicitud fetch:', error);
        alert('Error actualizar en base de datos')
        // Aquí puedes manejar el error como desees, por ejemplo, mostrar un mensaje al usuario
      });
      return resp
    }
  }

  return (
    <div className={styleMenuPerfil.fondoPerfil}>
      <div className={`${styleMenuPerfil.div1} ${style.firstColumna}`}>
        <div style={{display:'flex',gap:'7svh',alignItems:'center',color:'var(--color-5)',justifyContent:'center',transform:'translateX(-5svh)'}}>
          <p className={style.backButton} onClick={() => navigate('/app/Perfil')} >
            <svg xmlns="http://www.w3.org/2000/svg" height="3svh" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="3svh" xmlSpace="preserve" fill='var(--color-5)'>
              <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
            </svg>
          </p>
          <h1>EDITAR PERFIL</h1>
        </div>
        <div className={`${styleMenuPerfil.contain_img} ${style.contain_img}`} onClick={() => setChangePhoto((prev) => !prev)} style={{background:`url(${infoUser.foto ? infoUser.foto: '/Home/Perfil/Foto.png'}) top left / contain no-repeat`}}>
          <p>CAMBIAR FOTO  
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2vh" height="2vh" viewBox="0 0 24 24" fill={IsMobile() ? 'white' :'var(--color-5)'} style={{transform:'translateX(10px)'}}>
              <path d="M14.1 5.9L3 17v4h4L18.1 9.9 14.1 5.9zM15.6 4.4L18 2l4 4-2.4 2.4L15.6 4.4z"></path>
            </svg>
          </p>
        </div>
      </div>
      <div className={style.formulario}>
        <form>
            <div className={style.campo}>
              <label htmlFor="correo">Correo:</label>
              <input type="email" id="correo" name="correo"  readOnly className={style.correo} value={infoPerfil?.correo}/>
            </div>
            <div className={style.campo}>
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" onChange={HandleInputChange('nombre')} value={infoPerfil?.nombre}/>
            </div>
            <div className={style.campo}>
              <label htmlFor="celular">Celular:</label>
              <input type="number" id="celular" name="celular" onChange={HandleInputChange('telefono')} value={infoPerfil?.telefono}/>
            </div>
            <div className={style.campo}>
              <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
              <input 
                type="date"
                id="fecha_nacimiento"
                name="fechaDeNacimiento"
                onChange={HandleInputChange('fechaDeNacimiento')}
                value={infoPerfil?.fechaDeNacimiento}/>
            </div>
            <div className={style.campo}>
              <label htmlFor="altura">Altura (1.70m):</label>
              <input type="number" id="altura" name="altura" onChange={HandleInputChange('altura')} value={infoPerfil?.altura / 100}/>
            </div>
            <div className={style.campo}>
              <label htmlFor="peso">Peso (kg):</label>
              <input type="number" id="peso" name="peso" onChange={HandleInputChange('peso')} value={infoPerfil?.peso}/>
            </div>
            <button type="button" className={`${style.button} ${areObjectsEqual(infoUser,infoPerfil) ? style.desactivado : ''}`}
            onClick={HandleGuardarCambios}>Guardar Cambios</button>
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
      <InputFoto isOpen={changePhoto} setIsOpen={setChangePhoto} photoPerfil={photoPerfil} setPhotoPerfil={setPhotoPerfil} perfil={true}/>
    </div>
  )
}

export default FormPerfil
