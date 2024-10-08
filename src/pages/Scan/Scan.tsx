import { useNavigate } from "react-router-dom";
import style from "./Scan.module.css"

import React, { useEffect, useRef, useState } from "react";
import { GuardarHistorial, GuardarRegistro, IsMobile } from "../../assets/Utils";
import { nutriscoreImgs } from "../../assets/categorias";
import { Producto } from "../../assets/models/tienda";
import { useSelector } from "react-redux";
import { OffData } from "../Tienda/utilTienda";
import InfoProductos from "./InfoProductos";
import { TiposCorreo } from "../Home/Contactanos";
import DialogCarga from "../../assets/MenuCarga/DialogCarga";

const Scan = () => {

  const [capturando, setCapturando] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [codigo, setCodigo] = useState<string>("");
  const [currentProducto, setCurrentProducto] = useState<{producto:Producto,information: OffData|undefined}>();
  const [nutriscore, setNutriscore] = useState<string>("unknown");
  const [notFound, setNotFound] = useState<boolean>(false);
  const [viewProdcut, setViewProduct] = useState<boolean>(false);

  const modal = useRef<HTMLDivElement>(null);
  const worker = useRef<Worker | null>(null);

  const videoRef = useRef<HTMLVideoElement>(document.createElement("video"));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const navigate = useNavigate();
  
  const infoUser = useSelector((state:any) => state.auth.infoUsuario)
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

    if(!IsMobile()){
      navigate('/app/Busqueda')
    }

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

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ codigo:", codigo)
    if(codigo){
      setLoading(true)
      fetch(`https://world.openfoodfacts.net/api/v2/product/${codigo.split(" ")[0]}`)/*${codigo.split(" ")[0]} */
      .then(res => {
        if(res.ok){
          setNotFound(false);
          return res.json();
        }
        if(res.status === 404){
          setNotFound(true);
          return Promise.reject("404 not found");
        }
        return Promise.reject(res.statusText);
      }).then(async res => {
        if(res.product){
          console.log(res);
          let infoProductos = OffData(res); 
          let newProduct:Producto = {
            ID_producto: res.product.id,
            referencia: res.product.id,
            nombre: res.product.product_name,
            descripcion: "",
            foto: res.product.image_url,
            categorias: res.product.categories_tags,
            nutriscore: res.product.nutriscore_grade
          }
          setCurrentProducto({producto:newProduct, information:infoProductos})
          console.log({producto:newProduct, information:infoProductos})
          GuardarRegistro(newProduct).then((ID) => {
            console.log("🚀 ~ GuardarRegistro Then ~ ID:", ID)
          })
        }
        if(res.product && res.product.nutriscore_grade){
          setNutriscore(res.product.nutriscore_grade);
        }else{
          setNutriscore("unknown");
        }
        setLoading(false)
        setViewProduct(true)
      }).catch(err => console.error(err));
      setLoading(false)
    }
  }, [codigo])
  
  return (
    <div className={style.scanMain} style={{background:'white',alignItems:'center'}}>
      <DialogCarga isOpen={loading} color='--color-5'/>

      {capturando?
        <div className={style.videoDisplay}>
          <div></div>
          <canvas id="captura" className="maintainRatio" ref={canvasRef}/>
        </div>:
        <>
        {!codigo &&
          <img className={`${style.scanTopImg} maintainRatio`} src="/Scan/logo.png"/>
        }
        </>
      }

      <div className="stack" style={{height: "max-content"}}>

        <h1>
          {codigo.split(" ")[0]}
        </h1>
        <div className={style.scanButtons} style={codigo? {display: "flex"}:{}}>
          {capturando?
            <button className={`${style.scanButton} ${style.scanInput} basicButton`} onClick={() => setCapturando(false)}>
              PARAR
            </button>:
            <button className={`${style.scanButton} ${style.scanInput} basicButton`} onClick={() => setCapturando(true)}>
              CAPTURAR
            </button>
          }
          <button className={`${style.scanButton} ${style.codigoButton} basicButton`} onClick={() => navigate('/app/Busqueda')}>
            Buscar por código
          </button>
        </div>

        {codigo?
        <>
        {notFound?
        <>
          <p className={style.textoVerde}>No tenemos datos de este producto aun</p>
          <button onClick={() => {navigate(`/Contactanos?mensaje=${encodeURIComponent(`No encontre el producto con codigo "${codigo}" \n`)}&tipo=${encodeURIComponent(TiposCorreo.sugerencia)}`)}}>Ayudanos reportandolo</button>
        </>
        :
          <InfoProductos openProducto={viewProdcut} setOpenProducto={setViewProduct} modal={modal} currentProducto={currentProducto?.producto} informationProduct={currentProducto?.information} />
        }
        </>:
        <>
          <p>
            Estamos preparandonos para analizar tu busqueda
          </p>
          <svg width="41" height="43" viewBox="0 0 41 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.7725 3.27398C19.2359 1.57534 21.764 1.57534 23.2275 3.27398L25.1093 5.45834C25.8487 6.31684 26.9117 6.78229 28.009 6.72808L30.8007 6.59016C32.9715 6.48289 34.7594 8.37282 34.658 10.6678L34.5274 13.6191C34.4761 14.7789 34.9164 15.9026 35.7285 16.6845L37.7948 18.6738C39.4017 20.2208 39.4017 22.8934 37.7948 24.4405L35.7285 26.4298C34.9164 27.2115 34.4761 28.3352 34.5274 29.4953L34.658 32.4465C34.7594 34.7413 32.9715 36.6314 30.8007 36.5242L28.009 36.3861C26.9117 36.3319 25.8487 36.7973 25.1093 37.6559L23.2275 39.8402C21.764 41.539 19.2359 41.539 17.7725 39.8402L15.8907 37.6559C15.1511 36.7973 14.0882 36.3319 12.991 36.3861L10.1993 36.5242C8.02835 36.6314 6.24058 34.7413 6.34204 32.4465L6.47251 29.4953C6.52378 28.3352 6.0835 27.2115 5.27141 26.4298L3.20512 24.4405C1.59829 22.8934 1.59829 20.2208 3.20512 18.6738L5.27141 16.6845C6.0835 15.9026 6.52378 14.7789 6.47251 13.6191L6.34204 10.6678C6.24058 8.37282 8.02835 6.48289 10.1993 6.59016L12.991 6.72808C14.0882 6.78229 15.1511 6.31684 15.8907 5.45834L17.7725 3.27398Z" stroke="#54E8AE" strokeOpacity="0.5" strokeWidth="3"/>
            <path d="M14.9664 21.5571L18.6554 25.457L26.0335 17.6573" stroke="#54E8AE" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </>
        }

      </div>
    </div>
  );
}

export default Scan;