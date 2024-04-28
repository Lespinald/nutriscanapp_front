import React, { useEffect, useRef, useState } from 'react'
import style from './InputFoto.module.css'
import { useStorge } from '../../hooks/useStorage';
import { useDispatch, useSelector } from 'react-redux';
import { Usuario } from '../../assets/models/usuario';
import { editPerfil } from '../../redux/authSlice';

interface Props{
  isOpen:Boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  photoPerfil: string;
  setPhotoPerfil: (newPhoto:string) => void;
}

const InputFoto = ({isOpen, setIsOpen, photoPerfil, setPhotoPerfil}:Props) => {
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
          alert('Formato incorrecto')
          return;
        }
    
        if (file.size > maxSizeInBytes) {
          // photoMuyGrande();
          alert('Tamano muy grande')
          return;
        }
    
        const pictureURL = URL.createObjectURL(file);
        setImage(pictureURL);
      }
    }; 

    const HandleSaveImage = async () => {const response = await fetch(image);
      if (!response.ok) {
          throw new Error('Error al descargar la imagen');
      }
      
      // Convierte la respuesta en un blob
      const blob = await response.blob();
      
      // Sube la imagen a Firebase Storage usando la función agregarImg
      try {
        const picture = await agregarImg(infoUser.uid, blob);
        console.log("🚀 ~ HandleSaveImage ~ infoUser.uid:", infoUser.uid)
        console.log("Imagen subida exitosamente");
        console.log("🚀 ~ HandleSaveImage ~ picture:", picture)
        console.log("🚀 ~ HandleSaveImage ~ image:", image)
        setPhotoPerfil(image);
        const resp = await obtenerURL(infoUser.uid + '/fotoPerfil.png').then(
          (response) =>{
            let copy = {...infoUser}
            copy.foto = response
            dispatch(editPerfil({infoUsuario:copy}))
          }
        )
      } catch (error) {
        console.error('Error al subir la imagen a Firebase:', error);
      }
      // let copy = {...infoUser}
      // copy.foto = blob
      // dispatch(editPerfil(infoUsuario: copy))
      setIsOpen(false);
    }

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
              <button className={style.buttonChange} onClick={() => HandleSaveImage()}>GUARDAR CAMBIOS</button>
              <button className={style.buttonChange} onClick={() => setIsOpen(false)}>CANCELAR</button>
          </>
          }
      </div>
    </div>
    )
}

export default InputFoto
