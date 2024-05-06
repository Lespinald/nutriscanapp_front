import style from './MenuTienda.module.css'
import { useState } from "react";
import { useAppLayoutContext } from "../AppLayout"
import { Producto } from '../../assets/models/tienda';
import EditProducto from './EditProducto';

interface ShopInfo{
  name: string;
  banner: string;
  logo: string;
  busqueda: string;
  setBusqueda: React.Dispatch<React.SetStateAction<string>>;
  productos: Producto[];
}

const prods: Producto[] = [
  {
    ID_producto: "1",
    referencia: "Producto",
    foto: "https://firebasestorage.googleapis.com/v0/b/nutriscan-9f5cf.appspot.com/o/TiendaTest%2Fimagen_2024-04-27_221044323.png?alt=media&token=ec5d519f-c9e4-4c73-94b6-38b68746af33",
    titulo:'Titutlo Prueba',
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat"
  }
]

const MenuTienda = () => {
  const {mobile} = useAppLayoutContext();
  const [banner, setBanner] = useState<string>("https://firebasestorage.googleapis.com/v0/b/nutriscan-9f5cf.appspot.com/o/TiendaTest%2Fimagen_2024-04-27_221044323.png?alt=media&token=ec5d519f-c9e4-4c73-94b6-38b68746af33")

  const [busqueda, setBusqueda] = useState<string>("");
  const [productos, setProductos] = useState<Producto[]>(Array(9).fill(prods[0]));

  return (
    <>
    {
      mobile?
      <></>:
      <TiendaDesktop name="tienda" logo="" banner={banner}
        busqueda={busqueda} setBusqueda={setBusqueda}
        productos={productos}
      />
    }
    </>
  );
}




const TiendaDesktop = ({name, banner, logo, busqueda, setBusqueda, productos}:ShopInfo) => {

  const [editProd, setEditProd] = useState<boolean>(false);

  const onProducto = () => {
    setEditProd(prev => !prev);
  }
  
  return (
    <>{
      editProd?
      <EditProducto initialProducto={productos[0]} indice={0}/>
      :
    <div className={style.main}>
      <img src={banner} alt="banner" className={style.bannerDesk}></img>
      <div className={style.logoSection}>
        <div>
          <img src='https://firebasestorage.googleapis.com/v0/b/nutriscan-9f5cf.appspot.com/o/TiendaTest%2Fimagen_2024-04-27_230305436.png?alt=media&token=6fc31812-b323-4ebd-8e72-015ceabc5d0a'
            alt='logo tienda'/>
        </div>
      </div>
      <div className={style.titulo}><a >Tienda</a></div>
      <p className={style.descripcion}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
      eu fugiat 
      </p>

      <input type='text' value={busqueda} placeholder='Buscar producto' className={style.buscador}
        onChange={e => setBusqueda(e.currentTarget.value)}>
      </input>

      <div className={style.presentacion}>
        <>
        {
          productos.map((v, i) => 
            <div className={style.producto} onClick={onProducto} key={i}>
              <img src={v.foto}></img>
              <div>
                <p className={style.name}>{v.referencia}</p>
                <p className={style.desc}>{v.descripcion}</p>
              </div>
            </div>
          )
        }
        </>
      </div>
    </div>
    }
    </>
  );
}

export default MenuTienda
