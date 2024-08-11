import React, { useEffect, useRef, useState } from 'react'
import style from './InputFoto.module.css'
import { useStorge } from '../../hooks/useStorage';
import { useDispatch, useSelector } from 'react-redux';
import { Usuario } from '../../assets/models/usuario';
import { editPerfil } from '../../redux/authSlice';
import ComponenteAlert, { AlertType } from '../../assets/ComponenteAlert';

interface Props{
  isOpen:Boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  photoPerfil: string;
  setPhotoPerfil: (newPhoto:string) => void;
  perfil:boolean;
  indice?:number;
  HandleSaveImage:(image: any) => Promise<void>;
}

const InputFoto = ({isOpen, setIsOpen, photoPerfil,HandleSaveImage}:Props) => {
  const infoUser:Usuario = useSelector((state:any) => state.auth.infoUsuario)
  const [image, setImage] = useState(photoPerfil);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch()

  const {
    agregarImg,
    obtenerURL
  } = useStorge();

  const HandleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtener el primer archivo seleccionado
    const allowedTypes = ['image/jpeg', 'image/png']; // Tipos MIME permitidos
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB en bytes
  
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        // photoFormatoIncorrecto();
        ComponenteAlert('Formato incorrecto',2,AlertType.WARNING)
        return;
      }
  
      if (file.size > maxSizeInBytes) {
        // photoMuyGrande();
        ComponenteAlert('Tamano muy grande',2,AlertType.WARNING)
        return;
      }
  
      const pictureURL = URL.createObjectURL(file);
      setImage(pictureURL);
    }
  }; 

  useEffect(() => {
    return () =>{
      if(image.startsWith('blob:')){
        URL.revokeObjectURL(image)
      }
    };
  }, [image])

  return (
  <div className={style.background} style={isOpen ? {} : {display:'none'}} onClick={() => setIsOpen((prev) => !prev)}>
    <div className={style.boxInput} onClick={(e) => e.stopPropagation()}>
        
    <input type='file' accept='image/*' style={{position: 'relative',top:'5vh'}} onChange={(event) => HandleChangePhoto(event)} ref={fileInputRef}/>
    <img className={style.photo} alt='Foto Perfil' src={image}></img>
    {image === photoPerfil ?
        <button className={style.buttonChange} onClick={() => fileInputRef?.current?.click()}>CAMBIAR</button>
        :<>
            <button className={style.buttonChange} onClick={() => HandleSaveImage(image)}>GUARDAR CAMBIOS</button>
            <button className={style.buttonChange} onClick={() => setIsOpen(false)}>CANCELAR</button>
        </>
        }
    </div>
  </div>
  )
}

export default InputFoto
