import React from 'react'
import Modal from '../../assets/Components/Modal';
import { Dispatch } from '@reduxjs/toolkit';
import style from "./Scan.module.css"
import styleFormPerfil from "../Personal/FormPerfil.module.css"
import { Producto } from '../../assets/models/tienda';
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
  const infoUser = useAppSelector((state) => state.auth.infoUsuario)
  const exepcion = ['imagenFrontalUrl']
  
  return (
    <Modal isOpen={openProducto} setIsOpen={setOpenProducto} ref={modal}>
        <div className={style.answerOption} style={{justifyContent:'flex-start', boxShadow:'none'}}>
        <img src={currentProducto?.foto} style={{height:'15svh'}}></img>
        <div style={{flex:'1'}}>
            <h2 style={{textAlign:'start',alignSelf:'flex-start',width:'100%'}}>
            {currentProducto?.nombre} <br></br>
            <span style={{fontWeight:'400'}}>{currentProducto?.descripcion}</span>
            </h2>
            <button onClick={() => {currentProducto && GuardarHistorial(currentProducto,infoUser?.uid,{energy: informationProduct?.energia},currentProducto?.ID_producto,true)}}
            className={`${style.scanButton} ${style.codigoButton} basicButton`}>Sumar calorias</button>
        </div>
        <div className={style.answerOption} style={{boxShadow:'none',padding:'5% 0',justifyContent:'flex-start',alignItems:'flex-start'}}>
            <img src={nutriscoreImgs[currentProducto?.nutriscore ?? 'unknown']} alt={`nutriscore grado ${currentProducto?.nutriscore}`} style={{width:'30%'}}></img>
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
