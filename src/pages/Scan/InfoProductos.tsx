import React from 'react'
import Modal from '../../assets/Components/Modal';
import { Dispatch } from '@reduxjs/toolkit';
import style from "./Scan.module.css"
import styleFormPerfil from "../Personal/FormPerfil.module.css"
import { MiniTienda, Producto } from '../../assets/models/tienda';
import { GuardarHistorial } from '../../assets/Utils';
import { nutriscoreImgs } from '../../assets/categorias';
import SelectorArray from '../../assets/Components/SelectorArray';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../redux/store';
import { OffData } from '../Tienda/utilTienda';

interface Props{
    openProducto:boolean;
    setOpenProducto: (e:boolean) => void;
    modal: React.RefObject<HTMLDivElement>;
    currentProducto:Producto | undefined;
    informationProduct: OffData | undefined;
}

const InfoProductos = ({openProducto,setOpenProducto,modal,currentProducto,informationProduct}:Props) => {
  console.log("🚀 ~ InfoProductos ~ informationProduct:", informationProduct)
  console.log("🚀 ~ InfoProductos ~ currentProducto:", currentProducto)
  const infoUser = useAppSelector((state) => state.auth.infoUsuario)
  const exepcion = ['imagenFrontalUrl']

  const HandleRegistroRedireccion = async (miniTienda:MiniTienda) => {
    console.log("🚀 ~ HandleRegistroRedireccion ~ currentProducto:", currentProducto)
    if(currentProducto){
        let id_product = currentProducto?.ID_producto
        if(currentProducto?.ID_tienda !== miniTienda.ID_tienda){
            console.log("🚀 ~ HandleRegistroRedireccion ~ miniTienda:", miniTienda)
            console.log("🚀 ~ HandleRegistroRedireccion ~ currentProducto true:", currentProducto)
            // Realiza la petición para obtener el ID_producto
            try {
                const res = await fetch(`https://api.nutriscan.com.co/api/productosReferenciaTienda/${currentProducto.referencia}/${miniTienda.ID_tienda}`);

                if (!res.ok) {
                    if (res.status === 404) {
                      console.log("🚀 ~ ConsultarOpenFoodFact ~ 404 not found");
                    }
                    console.log("🚀 ~ ConsultarOpenFoodFact ~ Error:", res.statusText);
                  }
              
                  const data = await res.json();
                  let array:string[] = []
                  data.map((element) => {
                    array.push(element)
                  })
                  id_product =  array[0]
            } catch (error) {
                console.error("Error obteniendo ID_producto:", error);
            }
            console.log("🚀 ~ HandleRegistroRedireccion ~ id_product:", id_product)
        }
        GuardarHistorial(infoUser?.uid,{energy: informationProduct?.energia},id_product,false,true)
    }
  }
  
  return (
    <Modal isOpen={openProducto} setIsOpen={setOpenProducto} ref={modal}>
        <div className={style.answerOption} style={{justifyContent:'flex-start', boxShadow:'none'}}>
        <img src={currentProducto?.foto} style={{height:'15svh'}}></img>
        <div style={{flex:'1'}}>
            <h2 style={{textAlign:'start',alignSelf:'flex-start',width:'100%'}}>
            {currentProducto?.nombre} <br></br>
            <span style={{fontWeight:'400'}}>{currentProducto?.descripcion}</span>
            </h2>
            <button onClick={() => {currentProducto && GuardarHistorial(infoUser?.uid,{energy: informationProduct?.energia},currentProducto?.ID_producto,true)}}
            className={`${style.scanButton} ${style.codigoButton} basicButton`}>Sumar calorias</button>
        </div>
        <div className={style.answerOption} style={{boxShadow:'none',padding:'5% 0',justifyContent:'flex-start',alignItems:'flex-start'}}>
            <div style={{width:'30%'}}>
                <img src={nutriscoreImgs[currentProducto?.nutriscore ?? 'unknown']} alt={`nutriscore grado ${currentProducto?.nutriscore}`} style={{width:'100%'}}></img>
                {currentProducto?.tiendas?.length !== 0 && <label>Lo puedes encontrar en:</label>}
                <div style={{display:"flex",flexDirection:'column',gap:'10px',margin:'10px 0 '}}>
                    {currentProducto?.tiendas?.map((minitienda,_index) => (
                        <>
                            <div style={{height:'4svh',display:'flex',justifyContent:'flex-start',alignItems:'center'}}
                            className='estiloButton' onClick={() => {HandleRegistroRedireccion(minitienda)}}>
                                <img src={minitienda.fotos} style={{height:'100%'}}></img>
                                <p key={_index} style={{fontSize:'3svh'}}
                                    >{minitienda.nombre}</p>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            <div style={{flex:'1'}}>
                <p className={style.infoExtra}>Nutriscore: <span style={{fontWeight:'600'}}>{currentProducto?.nutriscore ?? 'unknown'}</span></p>
                <p className={style.infoExtra}>Referencia: <span style={{fontWeight:'600'}}>{currentProducto?.referencia}</span></p>
                {informationProduct && Object.keys(informationProduct).map((atributo,index,array) => (
                    !exepcion.includes(atributo) && !atributo.startsWith('unidad') &&
                    <p className={style.infoExtra}> {atributo} <span style={{fontWeight:'600'}}>{informationProduct[atributo]} {' '} 
                    {array[index + 1] && informationProduct[array[index + 1]]}</span></p>
                ))}
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
  )
}

export default InfoProductos
