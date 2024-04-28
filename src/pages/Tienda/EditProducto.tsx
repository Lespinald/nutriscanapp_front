import React, { useState } from 'react'
import InputFoto from '../Personal/InputFoto';
import styleMenuTienda from './MenuTienda.module.css'
import styleMenuPerfil from '../Personal/MenuPerfil.module.css'
import styleFormPerfil from '../Personal/FormPerfil.module.css'
import { Producto, productoVacio } from '../../assets/models/tienda';
import { IsMobile } from '../../assets/Utils';

interface Props{
    initialProducto:Producto;
    indice:number;
}

const EditProducto = ({initialProducto,indice}:Props) => {
    const [currentProducto, setCurrentProducto] = useState(initialProducto)
    const [changePhoto, setChangePhoto] = useState(false)
    const [photoPerfil, setPhotoPerfil] = useState(initialProducto.foto)


    const HandleInputChange = (fieldName: string) => (e: { target: { value: any } }) => {
        // Si el campo es 'fechaDeNacimiento', convertir el valor a un objeto Date
        const value = e.target.value
        setCurrentProducto({ ...currentProducto, [fieldName]: value });
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

    }

    return (
        <div className={styleMenuPerfil.fondoPerfil} style={{position:'fixed',background:'white',top:'6%'}}>
          <div className={`${styleMenuPerfil.div1} ${styleFormPerfil.firstColumna}`}>
            <div style={{display:'flex',gap:'7svh',alignItems:'center',color:'var(--color-5)',justifyContent:'center',transform:'translateX(-5svh)'}}>
              <p className={styleFormPerfil.backButton} onClick={() => {}} >
                <svg xmlns="http://www.w3.org/2000/svg" height="3svh" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="3svh" xmlSpace="preserve" fill='var(--color-5)'>
                  <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
                </svg>
              </p>
              <h1>EDITAR PRODUCTO</h1>
            </div>
            <div className={`${styleMenuPerfil.contain_img} ${styleFormPerfil.contain_img} ${styleMenuTienda.contain_img}`} onClick={() => setChangePhoto((prev) => !prev)} style={{background:`url(${photoPerfil ? photoPerfil: '/defaultTiendaImage.png'}) center left / cover no-repeat`,borderRadius:'100%'}}>
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
                  <input type="text" id="nombre" name="nombre" onChange={HandleInputChange('ID_producto')} value={currentProducto?.ID_producto}/>
                </div>
                <div className={styleFormPerfil.campo}>
                  <label htmlFor="Descripción">Descripción:</label>
                  <input type="text" id="Descripción" name="Descripción" onChange={HandleInputChange('descripcion')} value={currentProducto?.descripcion}/>
                </div>
                <div className={styleFormPerfil.campo}>
                  <label htmlFor="Categoría">Categoría:</label>
                  <input type="text" id="Categoría" name="Categoría" onChange={HandleInputChange('categorias')} value={currentProducto?.referencia}/>
                </div>
                <button type="button" className={`${styleFormPerfil.button} ${areObjectsEqual(initialProducto,currentProducto) ? styleFormPerfil.desactivado : ''}`}
                onClick={HandleGuardarCambios}>{areObjectsEqual(productoVacio,initialProducto)?'Crear Producto':'Guardar Cambios'}</button>
            </form>
        </div>
          <InputFoto isOpen={changePhoto} setIsOpen={setChangePhoto} photoPerfil={photoPerfil} setPhotoPerfil={setPhotoPerfil} perfil={false} indice={indice}/>
        </div>
      )
}

export default EditProducto
