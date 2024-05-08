import React, { useEffect, useState } from 'react'
import { Producto } from '../../assets/models/tienda'
import style from './InicioLoggin.module.css'

interface Limit{
  startIndex: number;
  endIndex: number;
}

const InicioLoggin = () => {
  const [viewMore, setViewMore] = useState(0)
  const [productosPrueba, setProductosPrueba] = useState<Producto[]>([])
  const [limites, setLimites] = useState(false)

  const AumentarIndice = () => {
    setLimites(true)
  }

  const producto = {
    ID_producto:'123456',
    referencia:'none',
    foto:'https://firebasestorage.googleapis.com/v0/b/nutriscan-9f5cf.appspot.com/o/TiendaTest%2Fimagen_2024-04-27_221044323.png?alt=media&token=ec5d519f-c9e4-4c73-94b6-38b68746af33',
    descripcion:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, mollitia aliquam? Incidunt vero repellendus quo eligendi illo, dicta voluptates magnam id impedit quibusdam assumenda earum aperiam. Deserunt laborum nostrum asperiores.',
    titulo:'Prueba 1'
  } as Producto

  useEffect(() => {
    const PRODCUTOSPRUEBA:Producto[] = []
    
    for (let i = 0; i < 20; i++) {
      PRODCUTOSPRUEBA.push({...producto});
    }
    setProductosPrueba(PRODCUTOSPRUEBA)
  }, [])
  
  const GetOpciones = () => {
    return(
      <>
      {productosPrueba.map((product,index) => (
        index === 0 ? 
        <div className={style.wrap_item}>
          <p className={style.textoInicial}><span>ENCUENTRA</span> la alternativa que estabas buscando</p>
          <img style={{width:'40%',aspectRatio:'1 / 1'}} src='/InicioLoggin/fotoOne.png' alt='Primera Imagen'/>
        </div>
        :        
        <div className={style.wrap_item}>
          <img src={product.foto} style={{width:'100%',padding:'0 2%'}}/>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
            <div className={style.imagenContain}>
              <img src={product.foto} style={{width:'100%'}}/>
            </div>
            <p className={style.textoProducto}>
              <span>{product.titulo}</span><br></br>
              {product.descripcion}
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
    </div>
  )
}

export default InicioLoggin
