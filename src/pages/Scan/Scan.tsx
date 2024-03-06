import "./Scan.css"

import React, { useEffect, useRef, useState } from "react";
import { Worker, createWorker } from 'tesseract.js';

import InputFile from "../../assets/Components/InputFile";

const Scan = () => {

  const defaultImg = "/Scan/frecuencia.png";
  const defaultTxt = "Escaneando...";

  const [image, setImage] = useState<string>(defaultImg);
  const [text, setText] = useState<string>("Escaneando...");

  const worker = useRef<Worker | null>(null);



  const ScanImage = async (image: string) => {
    worker.current = await createWorker('spa');

    const { data: { text } } = await worker.current.recognize(image);

    await worker.current.terminate();

    return text;
  }

  const enCaptura = (evento: React.ChangeEvent<HTMLInputElement>) => {

    const files = evento.currentTarget.files;
    if(files && files[0].type){
      if(files[0].type.startsWith("image/")){

        const url = URL.createObjectURL(files[0]);

        setText(defaultTxt);
        ScanImage(url).then(
          txt => setText(txt)
        ).catch(
          err => {
            console.error("on scanning:", err)
            setText(err);
          }
        );

        setImage(url);

      }else{
        console.error("file type not supprted for this input");
      }
    }else{
      console.error("file not found");
    }
  }

  useEffect(()=>{
    return () => {
      if(worker.current) worker.current.terminate()
    }
  })

  return (
    <div className="stack scanMain">
      <img className="scanTopImg maintainRatio" src={image}/>
      <InputFile name="capturar" accept="image/*" styleClass="scanInput basicButton" onChange={enCaptura}>CAPTURAR</InputFile>

      <div className="scanText">
        {(image !== defaultImg)?
        text:
        "captura una tabla para escanear su información"
        }     
      </div>
    </div>
  );
}

export default Scan;
