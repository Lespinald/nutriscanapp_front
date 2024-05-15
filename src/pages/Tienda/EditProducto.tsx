import React, { useEffect, useState } from 'react'
import InputFoto from '../Personal/InputFoto';
import styleMenuTienda from './MenuTienda.module.css'
import styleMenuPerfil from '../Personal/MenuPerfil.module.css'
import styleFormPerfil from '../Personal/FormPerfil.module.css'
import { Producto, productoVacio, tiendaVacia } from '../../assets/models/tienda';
import { IsMobile } from '../../assets/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { useStorge } from '../../hooks/useStorage';
import { agregarProducto, modificarProducto } from '../../redux/tiendaSlice';
import SelectorArray from '../../assets/Components/SelectorArray';
import { categorias } from '../../assets/categorias';
import Modal from '../../assets/Components/Modal';

interface Props{
  initialProducto:Producto;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  indice:number;
}

const EditProducto = ({initialProducto,indice,setOpen}:Props) => {
    const [currentProducto, setCurrentProducto] = useState(initialProducto)
    const [scan, setScan] = useState(false)
    const [changePhoto, setChangePhoto] = useState(false)
    const [photoPerfil, setPhotoPerfil] = useState(initialProducto.foto)

    const infoTienda = useSelector((state:any) => state.tienda.currentTienda);
    const infoUser = useSelector((state:any) => state.auth.infoUsuario);
    const dispatch = useDispatch();

    const {
      agregarImg,
      obtenerURL
    } = useStorge();

    const HandleInputChange = (fieldName: string,response?: string|string[]) => (e: { target: { value: any } }) => {
      // Si el campo es 'fechaDeNacimiento', convertir el valor a un objeto Date
      const value = response ? response : e.target.value
      setCurrentProducto({ ...currentProducto, [fieldName]: value });
      // setCurrentProducto({ ...currentProducto, ['ID_producto']: '6' });
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

    const HandleSaveImage = async (image:any) => {
      const response = await fetch(image);
      if (!response.ok) {
          throw new Error('Error al descargar la imagen');
      }
      
      // Convierte la respuesta en un blob
      const blob = await response.blob();
      
      // Sube la imagen a Firebase Storage usando la función agregarImg
      try {
        const picture = await agregarImg(infoUser.uid, blob,`fotoProducto${currentProducto.ID_producto}`);
        console.log("🚀 ~ HandleSaveImage ~ infoUser.uid:", infoUser.uid)
        console.log("Imagen subida exitosamente");
        console.log("🚀 ~ HandleSaveImage ~ picture:", picture)
        console.log("🚀 ~ HandleSaveImage ~ image:", image)
        await obtenerURL(`${infoUser.uid}/fotoProducto${currentProducto.ID_producto}.png`).then(
          (response) => {
            setPhotoPerfil(response);
            const handleChange = HandleInputChange('foto',response);
            handleChange({ target: { value: response } });
            console.log("🚀 ~ HandleSaveImage ~ response:", response)
          }
        )
      } catch (error) {
        console.error('Error al subir la imagen a Firebase:', error);
      }
      setChangePhoto(false);
    }

    const HandleGuardarCambios = () => {
      console.log(JSON.stringify({
        ID_producto: 1,
        ID_tienda: infoTienda.ID_tienda,
        nombre: currentProducto.nombre,
        descripcion: currentProducto.descripcion,
        foto: currentProducto.foto,
      }))
      if(!areObjectsEqual(productoVacio,currentProducto)){
        var resp = fetch( areObjectsEqual(productoVacio,initialProducto) ? `https://api.nutriscan.com.co/api/productos` : `https://api.nutriscan.com.co/api/productos/${currentProducto.ID_producto}`, {
          method: areObjectsEqual(productoVacio,initialProducto) ? 'POST': 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ID_producto: currentProducto.ID_producto,
            referencia: currentProducto.ID_producto,
            ID_tienda: infoTienda.ID_tienda,
            nombre: currentProducto.nombre,
            descripcion: currentProducto.descripcion,
            foto: currentProducto.foto,
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
          alert('Modificado Exitosamente')
          if(areObjectsEqual(productoVacio,initialProducto)){
            dispatch(agregarProducto({producto:currentProducto}))
          }else{
            dispatch(modificarProducto({producto:currentProducto,indice:indice}))
          }
        })
        .catch(error => {
          console.error('Error en la solicitud fetch:', error);
          alert('Error actualizar en base de datos')
          // Aquí puedes manejar el error como desees, por ejemplo, mostrar un mensaje al usuario
        });
        return resp
      }
    }

    useEffect(() => {
      HandleInputChange('foto',photoPerfil)
      console.log("🚀 ~ EditProducto ~ photoPerfil:", photoPerfil)
    }, [photoPerfil])
    useEffect(() => {
      console.log("🚀 ~ EditProducto ~ currentProducto:", currentProducto)
    }, [currentProducto])
    
    return (
        <div className={styleMenuPerfil.fondoPerfil} style={{position:'fixed',background:'white',top:'6%'}}>
          <div className={`${styleMenuPerfil.div1} ${styleFormPerfil.firstColumna}`}>
            <div style={{display:'flex',gap:'7svh',alignItems:'center',color:'var(--color-5)',justifyContent:'center',transform:'translateX(-5svh)'}} onClick={() => setOpen((prev) => !prev)}>
              <p className={styleFormPerfil.backButton} onClick={() => {}} >
                <svg xmlns="http://www.w3.org/2000/svg" height="3svh" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="3svh" xmlSpace="preserve" fill='var(--color-5)'>
                  <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
                </svg>
              </p>
              <h1>EDITAR PRODUCTO</h1>
            </div>
            <div className={``} onClick={() => setChangePhoto((prev) => !prev)} >
              <div className={styleMenuTienda.producto}>
                <img src={currentProducto.foto} alt='Foto de producto'></img>
                <div>
                  <p className={styleMenuTienda.name}>{currentProducto.nombre}</p>
                  <p className={styleMenuTienda.desc}>{currentProducto.descripcion}</p>
                </div>
              </div>
              <p className={styleMenuTienda.editarText}>CAMBIAR FOTO  
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2vh" height="2vh" viewBox="0 0 24 24" fill={IsMobile() ? 'white' :'var(--color-5)'} style={{transform:'translateX(10px)'}}>
                  <path d="M14.1 5.9L3 17v4h4L18.1 9.9 14.1 5.9zM15.6 4.4L18 2l4 4-2.4 2.4L15.6 4.4z"></path>
                </svg>
              </p>
            </div>
            <div className={styleMenuTienda.producto} onClick={() => setScan((prev) => !prev)} style={{width:'100%'}}>
              <h1>Si tu producto tiene codigo de barras</h1>
            </div>
          </div>
          <div className={`${styleFormPerfil.formulario} ${styleMenuTienda.formulario}`}>
            <form>
                <div className={styleFormPerfil.campo}>
                  <label htmlFor="nombre">Nombre:</label>
                  <input type="text" id="nombre" name="nombre" onChange={HandleInputChange('nombre')} value={currentProducto?.nombre} placeholder='Ingrese un nombre'/>
                </div>
                <div className={styleFormPerfil.campo}>
                  <label htmlFor="Descripción">Descripción:</label>
                  <textarea rows={4} id="Descripción" name="Descripción" onChange={HandleInputChange('descripcion')} value={currentProducto?.descripcion} placeholder='Ingrese una descipcion'/>
                </div>
                <div className={styleFormPerfil.campo}>
                  <label htmlFor="Categoría">Categoría:</label>
                  <SelectorArray opciones={categorias} current={currentProducto.categorias?? []} setCurrent={HandleInputChange}/>
                </div>
                <button type="button" className={`${styleFormPerfil.button} ${areObjectsEqual(initialProducto,currentProducto) ? styleFormPerfil.desactivado : ''}`}
                onClick={HandleGuardarCambios} style={{alignSelf:'flex-end'}}>{areObjectsEqual(productoVacio,initialProducto)?'Crear Producto':'Guardar Cambios'}</button>
                <button type="button" className={`${styleFormPerfil.button}`} onClick={() => setOpen(false)} style={{alignSelf:'flex-start'}}>CANCELAR</button>
            </form>
        </div>
          {/* 2000900000000 */}
          <InputFoto isOpen={changePhoto} setIsOpen={setChangePhoto} photoPerfil={photoPerfil} setPhotoPerfil={setPhotoPerfil} perfil={false} indice={indice} HandleSaveImage={HandleSaveImage}/>
          <Modal isOpen={scan} setIsOpen={setScan}>
            h
            {/* <input type='text' value={codigoBarras} placeholder='Ingrese el codigo de barras'></input> */}
          </Modal>
        </div>
      )
}

export default EditProducto
