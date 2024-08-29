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
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { pushBusqueda } from "../../redux/authSlice";
import MenuCarga from "../../assets/MenuCarga/MenuCarga";
import DialogCarga from "../../assets/MenuCarga/DialogCarga";
import { TiposCorreo } from "../Home/Contactanos";

type Param = {
  idProduct?:string;
}

const BusquedaDesktop = () => {
  const historialBusquedas = useAppSelector((state) => state.auth.historialBusquedas)
  const dispatch = useAppDispatch()

  const {idProduct} = useParams<Param>();
  const [loading, setLoading] = useState<boolean>(false);
  const [openProducto, setOpenProducto] = useState<boolean>(false);
  const [capturando, setCapturando] = useState<boolean>(false);
  const [busqueda, setBusqueda] = useState<string>(idProduct ?? '');
  const [lastBusqueda, setLastBusqueda] = useState<string[]>(historialBusquedas);
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
    setLoading(true)
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
    setLoading(false)
  }

  const HandleSearch = (busquedaNueva?: string) => {

    if(!busquedaNueva) busquedaNueva = busqueda;

    if(busqueda === lastBusqueda[lastBusqueda.length-1]) return;

    AddBusqueda(busqueda);

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

  const AddBusqueda = (newBusqueda: string) => {
    setLastBusqueda((prevState) => {
        // Verifica si el nuevo elemento ya existe en el array
        if (prevState.includes(newBusqueda)) {
          return prevState; // Si ya existe, no lo agrega
        }

        const updatedBusqueda = [...prevState, newBusqueda];

        // Si la longitud supera los 10 elementos, elimina el primer elemento
        if (updatedBusqueda.length > 10) {
          updatedBusqueda.shift();
        }

        dispatch(pushBusqueda(newBusqueda))
        return updatedBusqueda;
    });
};
  

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
              cantidad:1,
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
      <DialogCarga isOpen={loading} color='--color-5'/>
      <div className={style.barraBuscador}>
  <input 
    placeholder="Ingresa el nombre o código de barras"
    value={busqueda}
    onChange={(e) => setBusqueda(e.target.value)}
    onBlur={e => HandleSearch()}
    onKeyDown={(e) => {if(e.key === 'Enter'){HandleSearch()} }}
    style={{ marginBottom: '10px' }} // Adjust space here
  />
  <br />
  <p style={{ width: '100%', textAlign: 'start', fontSize: '0.7em', marginTop: '10px' }}>
    *Oprime <strong style={{ fontWeight: '900', textTransform: 'uppercase' }}>enter</strong> para buscar
  </p>
</div>
      <div className={style.barraBuscador}>
        <div>
          <img className={`${style.scanTopImg} maintainRatio`} src="\Login\nutriscanLogo.png"/>
          <br></br>
          <p>Para escanear ingresa desde un dispositivo móvil</p>
        </div>
        <ul>
          Historial de búsquedas
          {lastBusqueda
            .slice(-5) // Obtiene los últimos 5 elementos del array
            .reverse() // Invierte el orden de los elementos
            .map((h, _i) => (
              <li key={_i} onClick={() => { setBusqueda(h); HandleSearch(h); }}>{h}</li>
            ))}
        </ul>
      </div>
      {productos.map((element) => (
        <div className={style.answerOption} key={element.ID_producto} onClick={() => {HandleClickProduct(element)}}>
          <img src={element.foto} alt="Foto producto" style={{height:'15svh'}}/>
          <h2 style={{textAlign:'start',alignSelf:'flex-start'}}>
            {element.nombre} <br></br>
            <span style={{fontWeight:'400'}}>{element.descripcion !== "" ? element.descripcion : 'De Open Food Facts' }</span>
          </h2>
        </div>
      ))}
      {productos.length === 0 && <div className={style.answerOption}>
        {busqueda ? <>
          <h3 style={{width:'100%',textAlign:'start'}}>Resultado de busqueda</h3>
          <p style={{width:'100%',color:'black',margin:'0',textAlign:'start'}}>No se han encontrado coincidencias</p>
          <button className="estiloButton" onClick={() => {navigate(`/Contactanos?mensaje=${encodeURIComponent(`Realice la busqueda y no encontre el producto "${busqueda}"`)}&tipo=${encodeURIComponent(TiposCorreo.sugerencia)}`)}}>Ayudanos reportandolo</button>
        </>: 
        <>
          <h3 style={{textAlign:'start'}}>Comienza realizando una busqueda</h3>
        </>}
      </div>}
      {openProducto && 
        <InfoProductos openProducto={openProducto} setOpenProducto={setOpenProducto} modal={modal}
        currentProducto={currentProducto} informationProduct={currentProductoInformation}/>
      }
    </div>
  );
}

export default BusquedaDesktop;