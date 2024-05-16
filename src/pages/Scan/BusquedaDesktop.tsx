import { useNavigate } from "react-router-dom";
import style from "./Scan.module.css"

import React, { useEffect, useRef, useState } from "react";
import { GuardarHistorial, GuardarRegistro, IsMobile } from "../../assets/Utils";
import { Producto } from "../../assets/models/tienda";
import Modal from "../../assets/Components/Modal";
import { nutriscoreImgs } from "../../assets/categorias";
import { useSelector } from "react-redux";

const BusquedaDesktop = () => {
  const [openProducto, setOpenProducto] = useState<boolean>(false);
  const [capturando, setCapturando] = useState<boolean>(false);
  const [busqueda, setBusqueda] = useState<string>('');
  const [nutriscore, setNutriscore] = useState<string>("unknown");
  const [notFound, setNotFound] = useState<boolean>(false);
  const [currentProducto, setCurrentProducto] = useState<Producto>();
  const [productos, setProductos] = useState<Producto[]>([]);

  const [codigo, setCodigo] = useState<string>("");

  const worker = useRef<Worker | null>(null);

  const videoRef = useRef<HTMLVideoElement>(document.createElement("video"));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const oldTime = useRef<number>(0);
  const navigate = useNavigate();

  const infoUser = useSelector((state:any) => state.auth.infoUsuario)

  const HandleSearch = () => {
    if (!(/^\d+$/.test(busqueda))) {
      // Busqueda contains only numeric characters
      console.log("Consulta por nombre.");
      fetch(`https://api.nutriscan.com.co/api/productosnombre/${busqueda}`).
      then(res => {
        if(res.ok){
          setNotFound(false);
          return res.json();
        }
        if(res.status === 404){
          setNotFound(true);
          return Promise.reject("404 not found");
        }
        return Promise.reject(res.statusText);
      }).then(res => {
        console.log("🚀 ~ HandleSearch ~ res:", res);
        const productos: Producto[] = res.map((item: any) => {
          const { ID_producto, referencia, nombre, descripcion, foto, categorias, nutriscore } = item;
          return {
            ID_producto,
            referencia,
            nombre,
            descripcion,
            foto,
            categorias,
            nutriscore
          } as Producto;
        });
        console.log("Productos:", productos);
        
        // Set the productos array to the state
        setProductos(productos);
      }).catch(err => console.error(err));
      return;
    }
	
    if(busqueda){
      setProductos([])
      fetch(`https://world.openfoodfacts.net/api/v2/product/${busqueda}`)
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
      }).then(res => {
        if(res.product){
          console.log("🚀 ~ HandleSearch ~ res:", res)
          let newProduct:Producto = {
            ID_producto: res.product.id,
            referencia: res.product.id,
            nombre: res.product.product_name,
            descripcion: "",
            foto: res.product.image_url,
            categorias: res.product.categories_tags,
            nutriscore: res.product.nutriscore_grade
          }
          setProductos((prev) => [...prev,newProduct])
          GuardarRegistro(newProduct).then((ID) => {
            console.log("🚀 ~ GuardarRegistro Then ~ ID:", ID)
            GuardarHistorial(newProduct,infoUser.uid,res.product.nutriments,ID)
          })
        }
      }).catch(err => console.error(err));
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
        <input placeholder="Ingresa tu busqueda" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter'){HandleSearch()} }}></input>
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
      {productos.map((element) => (
        <div className={style.answerOption} key={element.ID_producto} onClick={() => {setCurrentProducto(element);setOpenProducto(true)}}>
          <img src={element.foto} alt="Foto producto" style={{height:'15svh'}}/>
          <h3 style={{textAlign:'start'}}>{element.nombre}</h3>
        </div>
      ))}
      {productos.length === 0 && <div className={style.answerOption}>
        <h3 style={{textAlign:'start'}}>Resultado de busqueda</h3>
        <p style={{color:'black',margin:'0',textAlign:'start'}}>No se han encontrado coincidencias</p>
      </div>}
      {openProducto && 
        <Modal isOpen={openProducto} setIsOpen={setOpenProducto}>
          <div>
            <img src={currentProducto?.foto} style={{width:'100%'}}></img>
            <h1>{currentProducto?.nombre}</h1>
            <p>{currentProducto?.descripcion}</p>
            <img src={nutriscoreImgs[nutriscore]} alt={`nutriscore grado ${nutriscore}`} style={{width:'100%'}}></img>
          </div>
        </Modal>
      }
    </div>
  );
}

export default BusquedaDesktop;