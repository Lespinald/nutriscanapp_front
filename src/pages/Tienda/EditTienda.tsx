import React, { useState } from 'react'
import InputFoto from '../Personal/InputFoto';
import styleMenuTienda from './MenuTienda.module.css'
import styleMenuPerfil from '../Personal/MenuPerfil.module.css'
import styleFormPerfil from '../Personal/FormPerfil.module.css'
import { Tienda, tiendaVacia } from '../../assets/models/tienda';
import { areObjectsEqual, IsMobile } from '../../assets/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { setTienda } from '../../redux/tiendaSlice';
import { useStorge } from '../../hooks/useStorage';
import ComponenteAlert, { AlertType } from '../../assets/ComponenteAlert';
import { tiendaDefault } from './MenuTienda';

interface Props{
  initialTienda:Tienda;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  indice:number;
}

const EditTienda = ({initialTienda: initialProducto,indice,setOpen}:Props) => {
  const [currentTienda, setCurrentProducto] = useState(initialProducto);
  const [changePhoto, setChangePhoto] = useState(false);
  const [photoPerfil, setPhotoPerfil] = useState(initialProducto.fotos ?? '');

  const infoUser = useSelector((state:any) => state.auth.infoUsuario);
  const dispatch = useDispatch();

  const {
    agregarImg,
    obtenerURL
  } = useStorge();

  const HandleInputChange = (fieldName: string, response?: string) => (e: { target: { value: any } }) => {
    // Si el campo es 'fechaDeNacimiento', convertir el valor a un objeto Date
    const value = response ? response : e.target.value
    setCurrentProducto({ ...currentTienda, [fieldName]: value });
  };

    const HandleSaveImage = async (image:any) => {
      const response = await fetch(image);
      if (!response.ok) {
          throw new Error('Error al descargar la imagen');
      }
      
      // Convierte la respuesta en un blob
      const blob = await response.blob();
      
      // Sube la imagen a Firebase Storage usando la función agregarImg
      try {
        const picture = await agregarImg(infoUser.uid, blob,'fotoTienda');
        console.log("🚀 ~ HandleSaveImage ~ infoUser.uid:", infoUser.uid)
        console.log("Imagen subida exitosamente");
        console.log("🚀 ~ HandleSaveImage ~ picture:", picture)
        console.log("🚀 ~ HandleSaveImage ~ image:", image)
        await obtenerURL(`${infoUser.uid}/fotoTienda.png`).then(
          (response) => {
            console.log("🚀 ~ HandleSaveImage ~ response:", response)
            const handleChange = HandleInputChange('fotos',response);
            handleChange({ target: { value: response } });
            setPhotoPerfil(response);
          }
        )
      } catch (error) {
        console.error('Error al subir la imagen a Firebase:', error);
      }
      setChangePhoto(false);
    }

    const HandleCrearTienda = () => {
      console.log({
        uid: infoUser?.uid,
        nombre: currentTienda.nombre,
        fechaSuscripcion: currentTienda.fechaSuscripcion,
        direccion: currentTienda.direccion,
        enlace: currentTienda.enlace,
      })
      if(!areObjectsEqual(tiendaVacia,currentTienda)){
        var resp = fetch(`https://api.nutriscan.com.co/api/tiendas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uid: infoUser?.uid,
            nombre: currentTienda.nombre,
            fechaSuscripcion: infoUser.fechaSuscripcion,
            direccion: currentTienda.direccion,
            enlace: currentTienda.enlace,
            descripcion: currentTienda.descripcion,
            fotos: currentTienda.fotos,
          })
        })
        .then(respuesta => {
          console.log("🚀 ~ HandleRegistro ~ respuesta:", respuesta)
          if (!respuesta.ok) {
            throw respuesta.json();
          }
          return respuesta.json()
        })
        .then(async(datos) => {
          console.log("🚀 ~ .then ~ datos:", datos)
          let copy = {...currentTienda}
          copy.ID_tienda = datos.ID_tienda
          ComponenteAlert('Tu tienda se creo con éxito.',2,AlertType.SUCCESS)
          dispatch(setTienda({tienda:copy}))
        })
        .catch(error => {
          error.then(res => {
            console.error('Error en la solicitud fetch:', res);
            ComponenteAlert('Error actualizar en base de datos',2,AlertType.ERROR)
          })
          // Aquí puedes manejar el error como desees, por ejemplo, mostrar un mensaje al usuario
        });
        return resp
      }
    }

    const HandleChangeTienda = () => {
      console.log("change",JSON.stringify({
        nombre: currentTienda.nombre,
        direccion: currentTienda.direccion,
        enlace: currentTienda.enlace,
        descripcion: currentTienda.descripcion,
        fotos: currentTienda.fotos,
      }))
      console.log("🚀 ~ HandleChangeTienda ~ currentTienda:", currentTienda)
      if(!areObjectsEqual(tiendaVacia,currentTienda)){
        var resp = fetch(`https://api.nutriscan.com.co/api/tiendas/${currentTienda?.ID_tienda ?? ''}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: currentTienda.nombre,
            direccion: currentTienda.direccion,
            enlace: currentTienda.enlace,
            descripcion: currentTienda.descripcion,
            fotos: currentTienda.fotos,
          })
        })
        .then(respuesta => {
          console.log("🚀 ~ HandleRegistro ~ respuesta:", respuesta)
          if (!respuesta.ok) {
            throw respuesta.json();
          }
          return respuesta.json()
        })
        .then(async(datos) => {
          ComponenteAlert('Se ha actualizado la informacion de tu tienda',2,AlertType.SUCCESS)
          dispatch(setTienda({tienda:currentTienda}))
        })
        .catch(error => {
          error.then(res => {
            console.error('Error en la solicitud fetch:', res);
            ComponenteAlert('Error actualizar en base de datos',2,AlertType.ERROR)
          })
          // Aquí puedes manejar el error como desees, por ejemplo, mostrar un mensaje al usuario
        });
        return resp
      }
    }

    const Validate = () => {
      if(!currentTienda.nombre) {ComponenteAlert("Un nombre es primordial para una tienda.",1.5,AlertType.WARNING);return false}
      if(!currentTienda.descripcion) {ComponenteAlert("Recuerda poner una breve descripcion para que conozcan tu tienda.",1.5,AlertType.WARNING);return false}
      if(!currentTienda.direccion) {ComponenteAlert("Recuerda poner una direccion para tus clientes.",1.5,AlertType.WARNING);return false}
      if(!currentTienda.enlace) {ComponenteAlert("Recuerda poner un enlace para que vayan a tu sitio web.",1.5,AlertType.WARNING);return false}
      if(!currentTienda.fotos) {ComponenteAlert("Una foto de tu logo hará mas llamativa tu tienda.",1.5,AlertType.WARNING);return false}
      return true
    }

    const BundleRequest = () => {
      if(Validate()){
        if(areObjectsEqual(tiendaDefault,initialProducto)){
          HandleCrearTienda()
        }else{
          HandleChangeTienda()
        }
      }
    }

    return (
        <div className={styleMenuPerfil.fondoPerfil} style={{position:'fixed',background:'white',top:'6%'}}>
          <div className={`${styleMenuPerfil.div1} ${styleFormPerfil.firstColumna}`}>
            <div style={{display:'flex',gap:'7svh',alignItems:'center',color:'var(--color-5)',justifyContent:'center',transform:'translateX(-5svh)'}} onClick={() => setOpen((prev) => !prev)}>
              <p className={styleFormPerfil.backButton} onClick={() => {}} >
                <svg xmlns="http://www.w3.org/2000/svg" height="3svh" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="3svh" xmlSpace="preserve" fill='var(--color-5)'>
                  <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
                </svg>
              </p>
              <h1>EDITAR TIENDA</h1>
            </div>
            <div className={`${styleMenuPerfil.contain_img} ${styleFormPerfil.contain_img} ${styleMenuTienda.contain_img}`} onClick={() => setChangePhoto((prev) => !prev)} style={{background:`url(${photoPerfil ? photoPerfil: '/defaultTiendaImage.png'}) center left / contain no-repeat`,borderRadius:'15px'}}>
              <p>CAMBIAR FOTO  
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2vh" height="2vh" viewBox="0 0 24 24" fill={IsMobile() ? 'white' :'var(--color-5)'} style={{transform:'translateX(10px)'}}>
                  <path d="M14.1 5.9L3 17v4h4L18.1 9.9 14.1 5.9zM15.6 4.4L18 2l4 4-2.4 2.4L15.6 4.4z"></path>
                </svg>
              </p>
            </div>
          </div>
          <div className={`${styleFormPerfil.formulario} ${styleMenuTienda.formulario}`}>
            <form>
                <div className={styleFormPerfil.campo}>
                  <label htmlFor="nombre">Nombre:</label>
                  <input type="text" id="nombre" name="nombre" onChange={HandleInputChange('nombre')} value={currentTienda?.nombre}/>
                </div>
                <div className={styleFormPerfil.campo}>
                  <label htmlFor="Descripción">Descripción:</label>
                  <textarea rows={4} id="Descripción" name="Descripción" onChange={HandleInputChange('descripcion')} value={currentTienda?.descripcion}/>
                </div>
                <div className={styleFormPerfil.campo}>
                  <label htmlFor="Categoría">Enlace:</label>
                  <input type="text" id="Categoría" name="Categoría" onChange={HandleInputChange('enlace')} value={currentTienda?.enlace}/>
                </div>
                <div className={styleFormPerfil.campo}>
                  <label htmlFor="Direccion">Enlace:</label>
                  <input type="text" id="Categoría" name="Categoría" onChange={HandleInputChange('direccion')} value={currentTienda?.direccion}/>
                </div>
                <button type="button" className={`${styleFormPerfil.button} ${areObjectsEqual(initialProducto,currentTienda) ? styleFormPerfil.desactivado : ''}`}
                onClick={BundleRequest}>{areObjectsEqual(tiendaVacia,initialProducto)?'Crear Tienda':'Guardar Cambios'}</button>
                <button type="button" className={`${styleFormPerfil.button}`} onClick={() => setOpen(false)}>CANCELAR</button>
            </form>
        </div>
          <InputFoto isOpen={changePhoto} setIsOpen={setChangePhoto} photoPerfil={currentTienda.fotos ?? ''} setPhotoPerfil={setPhotoPerfil} perfil={false} indice={indice} HandleSaveImage={HandleSaveImage}/>
        </div>
      )
}

export default EditTienda
