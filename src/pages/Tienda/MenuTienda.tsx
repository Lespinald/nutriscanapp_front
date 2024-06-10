import style from './MenuTienda.module.css'
import { useEffect, useRef, useState } from "react";
import { useAppLayoutContext } from "../AppLayout"
import { Producto, Tienda, productoVacio, tiendaVacia } from '../../assets/models/tienda';
import EditProducto from './EditProducto';
import { useSelector } from 'react-redux';
import Agregar from '../../assets/Components/Agregar';
import EditTienda from './EditTienda';

interface ShopInfo{
  name: string;
  banner: string;
  logo: string;
  busqueda: string;
  setBusqueda: React.Dispatch<React.SetStateAction<string>>;
  productos: Producto[];
  tienda: Tienda;
}

const tiendaDefault: Tienda = 
  {
    ID_tienda: 'tienda_prueba',
    nombre : 'Nombre Tienda',
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde quo, quae aliquam delectus, non ab molestiae nam perspiciatis sapiente esse vero ullam ducimus totam, molestias enim qui. A, quidem ullam?',
    fotos: "https://firebasestorage.googleapis.com/v0/b/nutriscan-9f5cf.appspot.com/o/TiendaTest%2Fimagen_2024-04-27_221044323.png?alt=media&token=ec5d519f-c9e4-4c73-94b6-38b68746af33",
    direccion : 'Cll siempreviva 52',
    enlace : 'https://www.google.com/webhp?hl=es&sa=X&ved=0ahUKEwjUn62l5YuGAxU4TTABHX8tAK0QPAgJ',
  } as Tienda

const MenuTienda = () => {
  const {mobile} = useAppLayoutContext();
  const tienda = useSelector((state:any) => state.tienda.currentTienda)
  const productosRedux = useSelector((state:any) => state.tienda.productos)

  const [busqueda, setBusqueda] = useState<string>("");

  return (
    <>
      <TiendaDesktop name="tienda" logo="" banner={tienda? (tienda.fotos?? tiendaDefault.fotos): tiendaDefault.fotos}
        busqueda={busqueda} setBusqueda={setBusqueda}
        productos={productosRedux}
        tienda={tienda ?? tiendaDefault}
        />
    </>
  );
}

const TiendaDesktop = ({name, banner, logo, busqueda, setBusqueda, productos,tienda}:ShopInfo) => {

  const infoUser = useSelector((state:any) => state.auth.infoUsuario)
  const [editProd, setEditProd] = useState<boolean>(false);
  const [editTienda, setEditTienda] = useState<boolean>(false);
  const [indice, setIndice] = useState<number>(0);
  const [currentTienda, setCurrentTienda] = useState<Tienda>(tienda);
  const [currentProduct, setCurrentProduct] = useState<Producto | undefined>();

  const back = useRef(null);

  const onProducto = (indice:number, element?:Producto) => {
    setCurrentProduct(element)
    setIndice(indice)
    setEditProd((prev) => !prev);
  }
  
  return (
    <>{
      editProd ?
      <EditProducto initialProducto={currentProduct} tienda={currentTienda} setOpen={setEditProd} indice={indice}/>
      :
      editTienda ?
      <EditTienda initialTienda={currentTienda} setOpen={setEditTienda} indice={0}/>
      :
      <div className={style.main} ref={back}>
        <div  className={style.bannerDesk} onClick={() => {setEditTienda(true)}} >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24">
            <path d="M14.1 5.9L3 17v4h4L18.1 9.9 14.1 5.9zM15.6 4.4L18 2l4 4-2.4 2.4L15.6 4.4z"></path>
          </svg>
          <img src={banner} alt="banner"></img>
        </div>
        <div className={style.logoSection} onClick={() => {setEditTienda(true)}}>
          <div>
            <img src={infoUser?.foto ? infoUser.foto : tiendaDefault.fotos} alt='logo tienda'/>
          </div>
        </div>
        { tienda !== tiendaDefault ? 
        <>
          <div className={style.titulo} onClick={() => {setEditTienda(true)}}><a >{tienda?.nombre ? tienda.nombre : tiendaDefault.nombre}</a></div>
          <p className={style.descripcion}>
            {tienda?.descripcion ? tienda.descripcion : tiendaDefault.descripcion}
          </p>
          <input type='text' value={busqueda} placeholder='Buscar producto' className={style.buscador} onChange={e => setBusqueda(e.currentTarget.value)}/>
          {productos.length !== 0 && <Agregar color={'white'} background={'var(--color-5)'} style={{width: '3rem',marginLeft: 'calc(-3rem - 3px - 1.5rem)',alignSelf: 'center',top: '1rem',position: 'relative'}} className={`estiloButton`} onClick={() => onProducto(productos.length)}></Agregar>}
          <div className={style.presentacion}>
            <>
            {
              productos.map((v, i) => 
                <div className={style.producto} onClick={() => onProducto(i, v)} key={i}>
                  <img src={v.foto}></img>
                  <div>
                    <p className={style.name}>{v.nombre}</p>
                    <p className={style.desc}>{v.descripcion}</p>
                  </div>
                </div>
              )
            }
            {productos.length === 0 && 
              <div className={style.producto} style={{gridColumn:'2'}} onClick={() => onProducto(0)}>
                <Agregar color='red' background='var(--color-2)' style={{maxWidth:'30%'}}/>
                <div>
                  <p className={style.name}>Agregar un producto</p>
                  <p className={style.desc}>Click Aquí</p>
                </div>
              </div>
            }
            </>
          </div>
        </>:
        <div className={`${style.producto} ${style.alone} estiloButton`} onClick={() => setEditTienda(true)}>
          <Agregar color='red' background='var(--color-2)' style={{maxWidth:'30%'}}/>
          <div>
            <p className={style.name}>Crea tu tienda</p>
            <p className={style.desc}>Click Aquí</p>
          </div>
        </div>}
      </div>
    }
    </>);
}

export default MenuTienda;
