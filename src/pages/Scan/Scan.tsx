import style from "./Scan.module.css"

import React, { useEffect, useRef, useState } from "react";

const Scan = () => {
  const [capturando, setCapturando] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null)

  const IniciarCaptura = () => {

  }

  useEffect(() => {
    if(capturando){

      navigator.mediaDevices?.getUserMedia({
        audio: false,
        video: {width:720, height:720, facingMode:"environment"}
      })
      .then(mediaStream => {
        if(!videoRef.current) throw new Error("elemento de video no inicializado");

        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => videoRef.current?.play();
      })
      .catch(err => console.error(err));
    }
  }, [capturando])

  return (
    <div className={style.scanMain}>
      
      {capturando?
        <div className={style.videoDisplay}>
          <div></div>
          <video id="captura" ref={videoRef}/>
        </div>:
        <img className={`${style.scanTopImg} maintainRatio`} src="/Scan/logo.png"/>
      }

      <div className="stack" style={{height: "max-content"}}>
        <button className={`${style.scanInput} basicButton`} onClick={() => setCapturando(true)}>CAPTURAR</button>
        {/* <InputFile name="capturar" accept="image/*" styleClass={`${style.scanInput} basicButton`} onChange={enCaptura}>CAPTURAR</InputFile> */}

        <p>
          Estamos preparandonos para analizar tu busqueda
        </p>
        <svg width="41" height="43" viewBox="0 0 41 43" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.7725 3.27398C19.2359 1.57534 21.764 1.57534 23.2275 3.27398L25.1093 5.45834C25.8487 6.31684 26.9117 6.78229 28.009 6.72808L30.8007 6.59016C32.9715 6.48289 34.7594 8.37282 34.658 10.6678L34.5274 13.6191C34.4761 14.7789 34.9164 15.9026 35.7285 16.6845L37.7948 18.6738C39.4017 20.2208 39.4017 22.8934 37.7948 24.4405L35.7285 26.4298C34.9164 27.2115 34.4761 28.3352 34.5274 29.4953L34.658 32.4465C34.7594 34.7413 32.9715 36.6314 30.8007 36.5242L28.009 36.3861C26.9117 36.3319 25.8487 36.7973 25.1093 37.6559L23.2275 39.8402C21.764 41.539 19.2359 41.539 17.7725 39.8402L15.8907 37.6559C15.1511 36.7973 14.0882 36.3319 12.991 36.3861L10.1993 36.5242C8.02835 36.6314 6.24058 34.7413 6.34204 32.4465L6.47251 29.4953C6.52378 28.3352 6.0835 27.2115 5.27141 26.4298L3.20512 24.4405C1.59829 22.8934 1.59829 20.2208 3.20512 18.6738L5.27141 16.6845C6.0835 15.9026 6.52378 14.7789 6.47251 13.6191L6.34204 10.6678C6.24058 8.37282 8.02835 6.48289 10.1993 6.59016L12.991 6.72808C14.0882 6.78229 15.1511 6.31684 15.8907 5.45834L17.7725 3.27398Z" stroke="#54E8AE" strokeOpacity="0.5" strokeWidth="3"/>
          <path d="M14.9664 21.5571L18.6554 25.457L26.0335 17.6573" stroke="#54E8AE" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

    </div>
  );
}

export default Scan;
