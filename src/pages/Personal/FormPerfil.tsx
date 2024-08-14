import React, { useState } from 'react'
import InputFoto from './InputFoto'
import styleMenuPerfil from './MenuPerfil.module.css'
import style from './FormPerfil.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { areObjectsEqual, IsMobile } from '../../assets/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { Usuario, formatDate } from '../../assets/models/usuario'
import { editPerfil, login } from '../../redux/authSlice'
import { useStorge } from '../../hooks/useStorage'
import { EmailAuthProvider, GoogleAuthProvider, reauthenticateWithCredential, signInWithPopup, updatePassword, validatePassword } from 'firebase/auth'
import { auth } from '../../firebase'
import ComponenteAlert, { AlertType } from '../../assets/ComponenteAlert'

const FormPerfil = () => {
  const infoUser:Usuario = useSelector((state:any) => state.auth.infoUsuario)
  const dispatch = useDispatch()

  const [password, setPassword] = useState({contrasena:'',confirm:''})
  const [infoPerfil, setInfoPerfil] = useState<Usuario>({...infoUser})
  const [changePhoto, setChangePhoto] = useState(false)
  const [photoPerfil, setPhotoPerfil] = useState('')
  const navigate = useNavigate()
  
  const {
    agregarImg,
    obtenerURL
  } = useStorge();

  const HandleInputChange = (fieldName: string) => (e: { target: { value: any } }) => {
    // Si el campo es 'fechaDeNacimiento', convertir el valor a un objeto Date
    if (fieldName === 'fechaDeNacimiento') {
      const dateParts = e.target.value.split(' ')[0].split('-');
      if (dateParts.length === 3) {
        e.target.value = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
      }
    }

    console.log(e.target.value);

    let value: number | undefined = infoPerfil[fieldName];
    if(e.target.value === ""){
      value = undefined;
    }else if(fieldName === 'altura'){
      value = Number((e.target.value * 100).toFixed());
    }else{
      value = Number(e.target.value);
    }

    console.log(value);

    setInfoPerfil({ ...infoPerfil, [fieldName]: value });
  };

  const DatosValidos = (datos: Usuario) => {
    if(!datos.nombre || !datos.telefono || !datos.fechaDeNacimiento || !datos.altura || !datos.peso){
      ComponenteAlert("Datos Incompletos", 2, AlertType.WARNING);
      return false;
    }

    if(areObjectsEqual(datos, infoUser)){
      ComponenteAlert("No se cambio ningun dato", 2, AlertType.WARNING);
      return false;
    }

    return true;
  }

  const HandleGuardarCambios = async (ev :React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    let info = {...infoUser};

    new FormData(ev.currentTarget).forEach((val, key) => {
      let aux = Number(val);
      info[key] = !isNaN(aux) && key !== "telefono"? aux: val;
    })

    if(info.altura) info.altura = info.altura * 100;

    console.log(info);

    if(DatosValidos(info)){

      console.log("To update");

      ComponenteAlert('Actualizando Perfil', 2, AlertType.SUCCESS);

      var respuesta = await fetch(`https://api.nutriscan.com.co/api/usuarios/${infoUser?.uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: info.nombre,
          fechaSuscripcion: info.fechaSuscripcion,
          fechaDeNacimiento: info.fechaDeNacimiento,
          foto: info.foto,
          telefono: info.telefono,
          altura: info.altura,
          peso: info.peso
        })
      })

      if (!respuesta.ok) {
        console.error('Error en la solicitud status:', respuesta.status);
        ComponenteAlert('Error al actualizar los datos', 2, AlertType.ERROR);
      }else{

        dispatch(editPerfil({infoUsuario: info}))
        ComponenteAlert('Modificado Exitosamente', 2, AlertType.SUCCESS);
      }
    }
  }

  
  const HandleSaveImage = async (image) => {
      const response = await fetch(image);
      if (!response.ok) {
          throw new Error('Error al descargar la imagen');
      }
      
      // Convierte la respuesta en un blob
      const blob = await response.blob();
      
      // Sube la imagen a Firebase Storage usando la función agregarImg
      try {
        const picture = await agregarImg(infoUser.uid, blob, 'fotoPerfil');
        console.log("🚀 ~ HandleSaveImage ~ infoUser.uid:", infoUser.uid)
        console.log("Imagen subida exitosamente");
        console.log("🚀 ~ HandleSaveImage ~ picture:", picture)
        console.log("🚀 ~ HandleSaveImage ~ image:", image)
        const resp = await obtenerURL(`${infoUser.uid}/fotoPerfil.png`).then(
          (response) =>{
            let copy = {...infoUser}
            copy.foto = response
            dispatch(editPerfil({infoUsuario:copy}))
            HandleGuardarCambioImagen(copy)
            setPhotoPerfil(response);
          }
        )
      } catch (error) {
        console.error('Error al subir la imagen a Firebase:', error);
      }
      setChangePhoto(false);
  }

  const HandleGuardarCambioImagen = (infoPerfil:Usuario) => {
    console.log(JSON.stringify({
      ...infoPerfil
    }))
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
      console.log("🚀 ~ HandleGuardarCambios ~ infoPerfil:", infoPerfil)
      ComponenteAlert('Guardado Foto Exitosamente',2,AlertType.SUCCESS)
    })
    .catch(error => {
      console.error('Error en la solicitud fetch:', error);
      ComponenteAlert('Error actualizar en base de datos',2,AlertType.ERROR)
      // Aquí puedes manejar el error como desees, por ejemplo, mostrar un mensaje al usuario
    });
    return resp
  }

  const ValidateContrasena = (): boolean => {
    if(!password.contrasena || !password.confirm){
      return false
    }
    if(password.confirm !== password.contrasena){
      return false
    }
    return true
  }

  const HandleContrasena = async () => {
    if (ValidateContrasena()) {
      console.log("🚀 ~ HandleContrasena ~ contrasena:", password.contrasena);
      let resp = await validatePassword(auth, password.contrasena);
      console.log("🚀 ~ HandleContrasena ~ resp:", resp);
  
      if (resp.isValid && auth.currentUser) {
        try {
          // Intenta actualizar la contraseña
          await updatePassword(auth.currentUser, password.contrasena);
          ComponenteAlert('Contraseña actualizada.',2,AlertType.SUCCESS);
        } catch (error:any) {
          if (error.code === 'auth/requires-recent-login') {
            // Si requiere reautenticación, detecta el proveedor
            const providerId = auth.currentUser.providerData[0].providerId;
  
            try {
              if (providerId === 'password') {
                // Si el usuario usa email y contraseña
                const email = auth.currentUser.email ?? infoUser.correo;
                const passwordPrompt = prompt('Por favor, vuelva a ingresar su contraseña para reautenticarse:');
                const credential = EmailAuthProvider.credential(email, passwordPrompt ?? '');
  
                // Reautenticar al usuario con email y contraseña
                await reauthenticateWithCredential(auth.currentUser, credential);
              } else if (providerId === 'google.com') {
                // Si el usuario usa Google
                const provider = new GoogleAuthProvider();
  
                // Reautenticar al usuario con Google
                await signInWithPopup(auth, provider);
              } else {
                throw new Error('Proveedor de autenticación no soportado para la reautenticación.');
              }
  
              // Intentar actualizar la contraseña de nuevo
              await updatePassword(auth.currentUser, password.contrasena);
              ComponenteAlert('Contraseña actualizada.',2,AlertType.SUCCESS);
            } catch (reauthError) {
              ComponenteAlert('Reautenticación fallida. Por favor, intente de nuevo.',2,AlertType.ERROR);
            }
          } else {
            ComponenteAlert('Error al actualizar la contraseña. Por favor, intente de nuevo.',3,AlertType.ERROR);
          }
        }
      } else {
        ComponenteAlert('Largo mínimo de 6 caracteres.',2,AlertType.WARNING);
      }
    }
  };

  return (
    <div className={styleMenuPerfil.fondoPerfil}>
      <div className={`${styleMenuPerfil.div1} ${style.firstColumna}`}>
        <div style={{display:'flex',gap:'7svh',alignItems:'center',color:'var(--color-5)',justifyContent:'center',transform:'translateX(-5svh)'}}>
          <p className={style.backButton} onClick={() => navigate('/app/Perfil')} >
            <svg xmlns="http://www.w3.org/2000/svg" height="3em" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="3em" xmlSpace="preserve" fill='var(--color-5)'>
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
      <div className={style.formulario} style={{overflowY:'auto'}}>
        <div style={{background: 'var(--color-6)',width:'100%',overflowY:'auto'}}>
          <form>
              <div className={style.campo}>
                <label htmlFor="correo">Correo:</label>
                <input type="email" id="correo" name="correo" readOnly className={style.correo} value={infoPerfil?.correo}/>
              </div>
          </form>
          <form onSubmit={HandleGuardarCambios}>
              <div className={style.campo}>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" defaultValue={infoPerfil?.nombre}/>
              </div>
              <div className={style.campo}>
                <label htmlFor="telefono">Telefono celular:</label>
                <input type='tel' id="telefono" name="telefono" defaultValue={infoPerfil?.telefono}/>
              </div>
              <div className={style.campo}>
                <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
                <input type="date" id="fecha_nacimiento" name="fechaDeNacimiento" defaultValue={infoPerfil?.fechaDeNacimiento}/>
              </div>
              <div className={style.campo}>
                <label htmlFor="altura">Altura (1.70m):</label>
                <input type="number" step={0.01} min={0} id="altura" name="altura" defaultValue={(infoPerfil?.altura / 100).toString()}/>
              </div>
              <div className={style.campo}>
                <label htmlFor="peso">Peso (kg):</label>
                <input type="number" id="peso" name="peso" defaultValue={infoPerfil?.peso}/>
              </div>
              <button type="submit" className={style.button} >Guardar Cambios</button>
          </form>
          <form>
            <div className={style.campo}>
              <label htmlFor="nueva_contrasena">Nueva Contraseña:</label>
              <input type="password" id="nueva_contrasena" name="nueva_contrasena" value={password.contrasena} onChange={(e) => setPassword((prev) => ({ ...prev, contrasena: e.target.value }))}/>
            </div>
            <div className={style.campo}>
              <label htmlFor="confirmar_nueva_contrasena">Confirmar Nueva Contraseña:</label>
              <input type="password" id="confirmar_nueva_contrasena" name="confirmar_nueva_contrasena" value={password.confirm} onChange={(e) => setPassword((prev) => ({ ...prev, confirm: e.target.value }))}/>
            </div>
            <button type="button" className={`${style.button} ${ValidateContrasena() ? '':style.desactivado}`} onClick={HandleContrasena}>Cambiar Contraseña</button>
          </form>
        </div>
      </div>
      <InputFoto isOpen={changePhoto} setIsOpen={setChangePhoto} photoPerfil={photoPerfil} setPhotoPerfil={setPhotoPerfil} perfil={true} HandleSaveImage={HandleSaveImage}/>
    </div>
  )
}

export default FormPerfil
