import React, { useEffect, useRef, useState } from 'react'
import style from './InputFoto.module.css'
import { useStorge } from '../../hooks/useStorage';

interface Props{
    isOpen:Boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    photoPerfil: string;
    setPhotoPerfil: (newPhoto:string) => void;
}

const InputFoto = ({isOpen, setIsOpen, photoPerfil, setPhotoPerfil}:Props) => {
    const [image, setImage] = useState(photoPerfil);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        agregarImg
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

    const HandleSaveImage = async () => {
        const response = await fetch(image);
        const blob = await response.blob();
        const picture = await agregarImg("QBbvrXm7eZcjdk2xWfgdk8RNi2X2", blob);
        setPhotoPerfil(image);
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
