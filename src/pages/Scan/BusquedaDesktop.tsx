import { useNavigate, useParams } from "react-router-dom";
import style from "./Scan.module.css"
import styleFormPerfil from "../Personal/FormPerfil.module.css"

import React, { useEffect, useRef, useState } from "react";
import { ConsultarOpenFoodFact, GuardarRegistro, IsMobile, TraerEnlacesDeProducto } from "../../assets/Utils";
import { Producto } from "../../assets/models/tienda";
import Modal from "../../assets/Components/Modal";
import { nutriscoreImgs } from "../../assets/categorias";
import { useSelector } from "react-redux";
import SelectorArray from "../../assets/Components/SelectorArray";
import { Historial } from "../../assets/models/historial";
import { current } from "@reduxjs/toolkit";
import { OffData } from "../Tienda/utilTienda";
import InfoProductos from "./InfoProductos";

type Param = {
  idProduct?:string;
}

const BusquedaDesktop = () => {
  const {idProduct} = useParams<Param>();
  const [openProducto, setOpenProducto] = useState<boolean>(false);
  const [capturando, setCapturando] = useState<boolean>(false);
  const [busqueda, setBusqueda] = useState<string>(idProduct ?? '');
  const [lastBusqueda, setLastBusqueda] = useState<string>('');
  const [nutriscore, setNutriscore] = useState<string>("unknown");
  const [currentProductoInformation, setCurrentProductoInformation] = useState<OffData>();
  const [currentProducto, setCurrentProducto] = useState<Producto>();
  const [historial, setHistorial] = useState<Historial[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);

  const [codigo, setCodigo] = useState<string>("");

  const worker = useRef<Worker | null>(null);
  const modal = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(document.createElement("video"));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const oldTime = useRef<number>(0);
  const navigate = useNavigate();

  const infoUser = useSelector((state:any) => state.auth.infoUsuario)

  const HandleClickProduct = async (producto:Producto) => {
    let {product, infoProducto: offData} = await ConsultarOpenFoodFact(producto.ID_producto,producto.referencia,infoUser.uid)
    let enlaces = await TraerEnlacesDeProducto(producto.referencia)
    if(product){
      let copy = {...product}
      copy.tiendas = enlaces
      setCurrentProductoInformation(offData)
      setCurrentProducto(copy)
      console.log("🚀 ~ HandleClickProduct ~ copy:", copy)
    }else{
      let copy = {...producto}
      copy.tiendas = enlaces
      setCurrentProducto(copy)
    }
    setOpenProducto(true)
  }

  const HandleSearch = (busquedaNueva?: string) => {

    if(!busquedaNueva) busquedaNueva = busqueda;

    if(busqueda === lastBusqueda) return;

    setLastBusqueda(busqueda);

    if (!(/^\d+$/.test(busquedaNueva))) {
      // Busqueda contains only numeric characters
      console.log("Consulta por nombre.");
      fetch(`https://api.nutriscan.com.co/api/productosnombre/${busquedaNueva}`).
      then(res => {
        if(res.ok){
          return res.json();
        }
        if(res.status === 404){
          return Promise.reject("404 not found");
        }
        return Promise.reject(res.statusText);
      }).then(res => {
        console.log("🚀 ~ HandleSearch ~ res:", res);
        const productos: Producto[] = res.map((item: any) => {
          const { ID_producto, ID_tienda, referencia, nombre, descripcion, foto, categorias, nutriscore } = item;
          return {
            ID_producto,
            ID_tienda,
            referencia,
            nombre,
            descripcion,
            foto,
            categorias,
            nutriscore
          } as Producto;
        });
        console.log("Productos:", productos);
        setProductos(productos);
      }).catch(err => console.error(err));
      return;
    }
	
    if(busquedaNueva){
      BarrilConsultarOpenFood(busquedaNueva)
    }
  }

  const BarrilConsultarOpenFood = async (referencia:string)=> {
    setProductos([])
    let {product, infoProducto} = await ConsultarOpenFoodFact(referencia,referencia,infoUser.uid)
    if(product){
      setCurrentProductoInformation(infoProducto)   
      setProductos([product])   
    }
  }

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
    ConsultarHistorial()
  }, [])
  useEffect(() => {
    console.log("🚀 ~ BusquedaDesktop ~ currentProducto:", currentProducto)
  }, [currentProducto])
  
  const ConsultarHistorial = () => {
    fetch(`https://api.nutriscan.com.co/api/historialusuario/${infoUser.uid}`)
      .then(res => {
        if(res.ok){
          return res.json();
        }
        if(res.status === 404){
          return Promise.reject("404 not found");
        }
        return Promise.reject(res.statusText);
      }).then(res => {
        const historials: Historial[] = [];
        const referenciaSet = new Set();
  
        res.slice(-5).forEach((item: any) => {
          const { ID_dia, producto, calorias, comido,redireccion, createdAt, fecha, uid, updatedAt } = item;
          const referencia = producto.nombre; // Cambia producto.nombre por el atributo correcto que contiene la referencia
  
          // Verificar si la referencia ya existe en el conjunto
          if (!referenciaSet.has(referencia)) {
            historials.push({
              ID_dia,
              ID_producto: referencia,
              calorias,
              comido,
              redireccion,
              createdAt,
              fecha,
              uid,
              updatedAt
            });
  
            // Agregar la referencia al conjunto
            referenciaSet.add(referencia);
          }
        });
  
        console.log("🚀 ~ consthistorials:Historial[]=res.slice ~ historials:", historials);
        setHistorial(historials);
      }).catch(err => console.error(err));
  }

  return (
    <div className={style.scanMain}>
      <div className={style.barraBuscador}>
        <input placeholder="Ingresa tu busqueda" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} onBlur={e => HandleSearch()} onKeyDown={(e) => {if(e.key === 'Enter'){HandleSearch()} }}></input>
        <div>
          <img className={`${style.scanTopImg} maintainRatio`} src="\Login\nutriscanLogo.png"/>
          <p>Para escanear alimentos ingresa al navegador desde un dispositivo móvil</p>
        </div>
        <ul>
          {historial.map((h) => (
            <li key={h.ID_producto} onClick={() => {setBusqueda(h.ID_producto.toString()); HandleSearch(h.ID_producto.toString())}}>{h.ID_producto}</li>
          ))}
        </ul>
      </div>
      {productos.map((element) => (
        <div className={style.answerOption} key={element.ID_producto} onClick={() => {HandleClickProduct(element)}}>
          <img src={element.foto} alt="Foto producto" style={{height:'15svh'}}/>
          <h2 style={{textAlign:'start',alignSelf:'flex-start'}}>
            {element.nombre} <br></br>
            <span style={{fontWeight:'400'}}>{element.descripcion}</span>
          </h2>
        </div>
      ))}
      {productos.length === 0 && <div className={style.answerOption}>
        <h3 style={{textAlign:'start'}}>Resultado de busqueda</h3>
        <p style={{color:'black',margin:'0',textAlign:'start'}}>No se han encontrado coincidencias</p>
      </div>}
      {openProducto && 
        <InfoProductos openProducto={openProducto} setOpenProducto={setOpenProducto} modal={modal}
        currentProducto={currentProducto} informationProduct={currentProductoInformation}/>
      }
    </div>
  );
}

export default BusquedaDesktop;