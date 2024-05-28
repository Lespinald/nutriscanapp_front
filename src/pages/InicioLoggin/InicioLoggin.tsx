import React, { useEffect, useRef, useState } from 'react'
import { Producto } from '../../assets/models/tienda'
import style from './InicioLoggin.module.css'
import styleFormPerfil from "../Personal/FormPerfil.module.css"
import SelectorArray from '../../assets/Components/SelectorArray';
import { nutriscoreImgs } from '../../assets/categorias';
import Modal from '../../assets/Components/Modal';
import { ConsultarOpenFoodFact } from '../../assets/Utils';
import { useSelector } from 'react-redux';

interface Limit{
  startIndex: number;
  endIndex: number;
}

const InicioLoggin = () => {
  const [viewMore, setViewMore] = useState(0)
  const [productos, setProductos] = useState<Producto[]>([])
  const [currentProducto, setCurrentProducto] = useState<Producto>()
  const [limites, setLimites] = useState(false)
  const [openProducto, setOpenProducto] = useState(false)

  const infoUser = useSelector((state:any) => state.auth.infoUsuario)
  const modal = useRef(null)

  const AumentarIndice = () => {
    setLimites(true)
  }

  const producto = {
    ID_producto:'123456',
    referencia:'none',
    foto:'https://firebasestorage.googleapis.com/v0/b/nutriscan-9f5cf.appspot.com/o/TiendaTest%2Fimagen_2024-04-27_221044323.png?alt=media&token=ec5d519f-c9e4-4c73-94b6-38b68746af33',
    descripcion:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, mollitia aliquam? Incidunt vero repellendus quo eligendi illo, dicta voluptates magnam id impedit quibusdam assumenda earum aperiam. Deserunt laborum nostrum asperiores.',
    nombre:'Prueba 1'
  } as Producto

  const HandleClickProduct = async (producto:Producto) => {
    let res = await ConsultarOpenFoodFact(producto.referencia,infoUser.uid)
    if(res){
      setCurrentProducto(res)
    }else{
      setCurrentProducto(producto)
    }
    setOpenProducto(true)
  }

  useEffect(() => {
    ConsultarProductosAleatorios()
  }, [])
  
  const ConsultarProductosAleatorios = () => {
    fetch(`https://api.nutriscan.com.co/api/productosaleatorios/21`)
      .then(res => {
        if(res.ok){
          return res.json();
        }
        if(res.status === 404){
          return Promise.reject("404 not found");
        }
        return Promise.reject(res.statusText);
      }).then(res => {
        const productos: Producto[] = [];

        // Assuming datos is an array of product data objects
        res.forEach((productoData: any) => {
          const producto: Producto = {
            ID_producto: productoData.ID_producto,
            referencia: productoData.referencia,
            nombre: productoData.nombre,
            descripcion: productoData.descripcion,
            foto: productoData.foto,
            categorias: productoData.categorias ?? [],
          };
          productos.push(producto);
        });

        console.log("🚀 ~ TraerProductosTienda ~ productos:", productos);
        setProductos(productos);
      }).catch(err => console.error(err));
  }
  
  const GetOpciones = () => {
    return(
      <>
      {productos.map((product,index) => (
        index === 0 ? 
        <div className={style.wrap_item}>
          <p className={style.textoInicial}><span>ENCUENTRA</span> la alternativa que estabas buscando</p>
          <img style={{width:'40%',aspectRatio:'1 / 1'}} src='/InicioLoggin/fotoOne.png' alt='Primera Imagen'/>
        </div>
        :        
        <div className={style.wrap_item} onClick={() => {HandleClickProduct(product)}}>
          <div style={{width:'100%',display:'flex',justifyContent:'center',background:'var(--color-6)'}}>
            <img src={product.foto} style={{height:'13svh',padding:'0 2%'}}/>
          </div>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',gap:'5%'}}>
            <div className={style.imagenContain}>
              <img src={product.foto} style={{width:'100%',maxHeight:'100%'}}/>
            </div>
            <p className={style.textoProducto}>
              <span>{product.nombre}</span><br></br>
              {product.descripcion !== "" ? product.descripcion : 'From Open Food Facts' }
            </p>
          </div>
        </div>
      ))}
      {!limites && <div className={style.flecha} onClick={AumentarIndice}>
        <img src='/InicioLoggin/flecha.svg'/>
      </div>}
      </>
    )
  }


  return (
    <div className={style.backCirculo}>
      <div className={style.containOpciones} style={limites ? {flexDirection:'row',maxHeight:'none'} : {flexDirection:'row'}}>
        {GetOpciones()}
      </div>
      
      {openProducto && 
        <Modal isOpen={openProducto} setIsOpen={setOpenProducto} ref={modal}>
          <div className={style.answerOption} style={{justifyContent:'flex-start', boxShadow:'none'}}>
            <img src={currentProducto?.foto} style={{height:'15svh'}}></img>
            <div style={{flex:'1'}}>
              <h2 style={{textAlign:'start',alignSelf:'flex-start',width:'100%'}}>
                {currentProducto?.nombre} <br></br>
                <span style={{fontWeight:'400'}}>{currentProducto?.descripcion}</span>
              </h2>
            </div>
            <div className={style.answerOption} style={{boxShadow:'none',padding:'5% 0',justifyContent:'flex-start',alignItems:'flex-start'}}>
              <img src={nutriscoreImgs[currentProducto?.nutriscore ?? 'unknown']} alt={`nutriscore grado ${currentProducto?.nutriscore}`} style={{width:'30%'}}></img>
              <div style={{flex:'1'}}>
                <p className={style.infoExtra}>Nutriscore: <span style={{fontWeight:'600'}}>{currentProducto?.nutriscore ?? 'unknown'}</span></p>
                <p className={style.infoExtra}>Referencia: <span style={{fontWeight:'600'}}>{currentProducto?.referencia}</span></p>
                <div className={styleFormPerfil.campo} style={{gridTemplateColumns:'none'}}>
                  <label htmlFor="Categoría" style={{color:'var(--color-6)',marginRight:'10px',textAlign:'start',fontSize:'3svh',fontWeight:'400'}}> Categoría: </label>
                  <SelectorArray placeholder='No hay categorias' color="var(--color-6)"
                  opciones={currentProducto?.categorias ?? []} current={currentProducto?.categorias ?? []} 
                  setCurrent={function (fieldName: string, response?: string | string[] | undefined): (e: { target: { value: any; }; }) => void {
                    throw new Error("Function not implemented.");
                  } } />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      }
    </div>
  )
}

export default InicioLoggin
