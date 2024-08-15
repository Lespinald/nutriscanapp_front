import style from './MenuTienda.module.css'
import { useEffect, useId, useRef, useState } from "react";
import { useAppLayoutContext } from "../AppLayout"
import { Producto, Tienda, productoVacio, tiendaVacia } from '../../assets/models/tienda';
import EditProducto from './EditProducto';
import { useSelector } from 'react-redux';
import Agregar from '../../assets/Components/Agregar';
import EditTienda from './EditTienda';
import { useParams } from 'react-router-dom';
import { TraerInfoTienda, TraerProductosTienda } from '../../assets/UtilsTienda';
import { useAppSelector } from '../../redux/store';

interface ShopInfo{
  name: string;
  banner: string|null;
  logo: string;
  busqueda: string;
  setBusqueda: React.Dispatch<React.SetStateAction<string>>;
  productos: Producto[]|null;
  tienda: Tienda|null;
  propietario:boolean;
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

type params = {
  idTienda:string;
}

const MenuTienda = () => {
  const {mobile} = useAppLayoutContext();
  const {idTienda} = useParams<params>()
  const uidUser = useAppSelector((state) => state.auth.infoUsuario.uid)
  const reduxTienda = useSelector((state:any) => state.tienda.currentTienda)
  const productosRedux = useSelector((state:any) => state.tienda.productos)
  
  const [tienda, setTienda] = useState<Tienda|null>(null)
  const [productos, setProductos] = useState<Producto[]>([])
  const [busqueda, setBusqueda] = useState<string>("");

  const Consulta = () => {
    TraerInfoTienda(idTienda ?? reduxTienda.ID_tienda).then((resTienda) => {
        console.log("🚀 ~ TraerInfoTienda ~ resTienda:", resTienda)
        setTienda(resTienda)
        if(resTienda?.ID_tienda){
            TraerProductosTienda(resTienda?.ID_tienda).then((resProdcuts) => {
                console.log("🚀 ~ TraerProductosTienda ~ resProdcuts:", resProdcuts)
                if(resProdcuts){
                    setProductos(resProdcuts)
                }else{
                    setProductos([])
                }
            })
        }
    }
    )
  }

  useEffect(() => {
    Consulta()
  }, [])
  
  return (
    <>
      <TiendaDesktop name="tienda" logo="" banner={tienda?.fotos ?? null}
        busqueda={busqueda} setBusqueda={setBusqueda}
        productos={productos}
        tienda={tienda?? null}
        propietario={uidUser === tienda?.uid}
        />
    </>
  );
}

const TiendaDesktop = ({name, banner, logo, busqueda, setBusqueda, productos,tienda,propietario}:ShopInfo) => {

  const infoUser = useSelector((state:any) => state.auth.infoUsuario)
  const [editProd, setEditProd] = useState<boolean>(false);
  const [editTienda, setEditTienda] = useState<boolean>(false);
  const [indice, setIndice] = useState<number>(0);
  const [currentTienda, setCurrentTienda] = useState<Tienda|null>(tienda);
  const [currentProduct, setCurrentProduct] = useState<Producto | undefined>();

  const back = useRef(null);

  const onProducto = (indice:number, element?:Producto) => {
    setCurrentProduct(element)
    setIndice(indice)
    setEditProd((prev) => !prev);
  }
  
  return (
    <>{
      editProd && propietario && currentTienda?
      <EditProducto initialProducto={currentProduct} tienda={currentTienda} setOpen={setEditProd} indice={indice}/>
      :
      editTienda && propietario && currentTienda?
      <EditTienda initialTienda={currentTienda} setOpen={setEditTienda} indice={0}/>
      :
      <div className={style.main} ref={back}>
        <div  className={style.bannerDesk} onClick={() => {setEditTienda(true)}} >
          {propietario && <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24">
            <path d="M14.1 5.9L3 17v4h4L18.1 9.9 14.1 5.9zM15.6 4.4L18 2l4 4-2.4 2.4L15.6 4.4z"></path>
          </svg>}
          <img src={banner ?? ''} alt="Foto de Tienda"></img>
        </div>
        {/* Verifica que la tienda no sea defaulta que implica no tiene tienda */}
        { tienda !== tiendaDefault ? 
            <>
                <div className={style.titulo} onClick={() => {setEditTienda(true)}}><a >{tienda?.nombre ? tienda.nombre : tiendaDefault.nombre}</a></div>
                {tienda?.enlace && <p className={` estiloButton`} style={{width:'80%',margin:'0.5em auto'}}><a href={tienda.enlace}>{tienda?.enlace}</a></p>}
                <p className={style.descripcion}>
                    {tienda?.descripcion ? tienda.descripcion : tiendaDefault.descripcion}
                </p>
                <input type='text' value={busqueda} placeholder='Buscar producto' className={style.buscador} onChange={e => setBusqueda(e.currentTarget.value)}/>
                {productos?.length !== 0 && <Agregar color={'white'} background={'var(--color-5)'} style={{width: '3rem',marginLeft: 'calc(-3rem - 3px - 1.5rem)',alignSelf: 'center',top: '1rem',position: 'relative'}} className={`estiloButton`} onClick={() => onProducto(productos?.length ?? 0)}></Agregar>}
                <div className={style.presentacion}>
                    <>
                    {
                    productos?.map((v, i) => 
                        <div className={style.producto} onClick={() => onProducto(i, v)} key={i}>
                        <img src={v.foto}></img>
                        <div>
                            <p className={style.name}>{v.nombre}</p>
                            <p className={style.desc}>{v.descripcion}</p>
                        </div>
                        </div>
                    )
                    }
                    <p>No hay más productos</p>
                    </>
                </div>
            </>:
            <p>No existe la tienda</p>
        }
    </div>
    }
    </>);
}

export default MenuTienda;
