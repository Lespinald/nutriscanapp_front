import { useEffect, useRef, useState } from "react";

interface Props{
  name: string;
  getFile?: (file: File | undefined) => void;
  callGetFile?: number;
  isMobile?: boolean;
  styleClass?: string;
}

const InputImagen = ({name, getFile, callGetFile, isMobile, styleClass}: Props) => {
  const [imagen, setImagen] = useState<string>("");

  const inputFiles = useRef<File>();

  const inputCaptura = useRef<HTMLInputElement>(null);
  const inputArchivo = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(inputCaptura.current === e.target){
      if(inputArchivo.current){
        inputArchivo.current.value = ""
      }
    }else{
      if(inputCaptura.current){
        inputCaptura.current.value = ""
      }
    }

    const blob = e.target.files?.item(0);

    if(blob){
      setImagen(URL.createObjectURL(blob));
      inputFiles.current = blob;
    }
  };

  useEffect(() => {
    if(callGetFile && getFile) getFile(inputFiles.current);
  }, [callGetFile])

  return(
    <>
      <div className={styleClass}>
        {imagen &&
        <img src={imagen} alt={name}/>
        }
        {isMobile &&
        <label htmlFor={`${name}Captura`}>
          Captura la imagen con tu camara
          <input ref={inputCaptura} id={`${name}Captura`} name={`${name} captura`} type="file" accept="image/*" capture="environment" hidden onChange={onChange}/>
        </label>
        }
        <label htmlFor={`${name}Escoger`}>
          Escoge el archivo de imagen
          <input ref={inputArchivo} id={`${name}Escoger`} name={`${name} escoger`} type="file" accept="image/*" hidden onChange={onChange}/>
        </label>
      </div>
    </>
  );
}

export  default InputImagen;
