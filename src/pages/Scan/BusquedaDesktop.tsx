import { useNavigate } from "react-router-dom";
import style from "./Scan.module.css"

import React, { useEffect, useRef, useState } from "react";
import { IsMobile } from "../../assets/Utils";

const BusquedaDesktop = () => {
  const [openProducto, setOpenProducto] = useState<boolean>(false);
  const [capturando, setCapturando] = useState<boolean>(false);
  const [busqueda, setBusqueda] = useState<string>('');

  const [codigo, setCodigo] = useState<string>("");

  const worker = useRef<Worker | null>(null);

  const videoRef = useRef<HTMLVideoElement>(document.createElement("video"));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const navigate = useNavigate();
  
  const oldTime = useRef<number>(0);

  const InitWorker = () => {
    console.log("init worker");
    worker.current = new Worker("/wasmWorker.js");
    worker.current.onmessage = async ev => {
      if(ev.data != null){
        
        console.log(ev);
        if(ev.data.type === "QR-Code"){
          return;
        }

        worker.current?.terminate();

        setCodigo(`${ev.data.data} ${ev.data.type}`);
        setCapturando(false);
        
      }
    }
  }

  const tick = (time: number) => {
    if(canvasRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA){

      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;

      canvasRef.current.width = width;
      canvasRef.current.height = height;


      if(ctxRef.current){
        const ctx = ctxRef.current;

        ctx.drawImage(videoRef.current,0, 0);

        if(time - oldTime.current > 600){
          oldTime.current = time;

          const imageData = ctx.getImageData(0,0,width, height);

          worker.current?.postMessage({width: imageData.width, height: imageData.height});
          worker.current?.postMessage(imageData, [imageData.data.buffer]);
        }
      }

    }

    requestAnimationFrame(tick);
  }

  useEffect(() => {

    console.log("videoRef:", videoRef.current, "canvasRef:", canvasRef.current);

    if(capturando){

      InitWorker();

      if(canvasRef.current){
        ctxRef.current = canvasRef.current.getContext("2d",{
          willReadFrequently: true
        });
      }

      navigator.mediaDevices?.getUserMedia({
        audio: false,
        video: {
          facingMode:"environment",
          aspectRatio: 1
        }
      })
      .then(mediaStream => {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();

          requestAnimationFrame(tick);
        }
      })
      .catch(err => console.error(err.name, err));
    }else{
      videoRef.current.pause();
      if(videoRef.current.srcObject){
        videoRef.current.srcObject = null;
      }
    }
  }, [capturando]);

  
  return (
    <div className={style.scanMain}>
      <div className={style.barraBuscador}>
        <input placeholder="Ingresa tu busqueda" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}></input>
        <div>
          <img className={`${style.scanTopImg} maintainRatio`} src="\Login\nutriscanLogo.png"/>
          <p>Para escanear alimentos ingresa al navegador desde un dispositivo móvi</p>
        </div>
        <ul>
          <li onClick={() => setBusqueda('aopcion')}>a</li>
          <li onClick={() => setBusqueda('aopcion')}>a</li>
          <li onClick={() => setBusqueda('aopcion')}>a</li>
          <li onClick={() => setBusqueda('aopcion')}>a</li>
        </ul>
      </div>
      <div className={style.answerOption}>
        <h3 style={{textAlign:'start'}}>Resultado de busqueda</h3>
        <p style={{color:'black',margin:'0',textAlign:'start'}}>No se han encontrado coincidencias</p>
      </div>
      {openProducto && <div className={style.modal_back}>
        <div className={style.modal_content}>
        </div>
      </div>}
    </div>
  );
}

export default BusquedaDesktop;