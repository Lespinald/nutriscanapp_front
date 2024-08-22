import React, { useState } from 'react'
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
import { formatearTexto, OffData } from '../Tienda/utilTienda';
import { useNavigate } from 'react-router-dom';

interface Props{
    openProducto:boolean;
    setOpenProducto: (e:boolean) => void;
    modal: React.RefObject<HTMLDivElement>;
    currentProducto:any;
    informationProduct: OffData | undefined;
}

const InfoProductos = ({openProducto,setOpenProducto,modal,currentProducto,informationProduct}:Props) => {
  const infoUser = useAppSelector((state) => state.auth.infoUsuario)
  const navigate = useNavigate()
  const exepcion = ['imagenFrontalUrl']

  const [infoOpen, setInfoOpen] = useState(false);

  console.log("🚀 ~ HandleRegistroRedireccion ~ currentProducto:", currentProducto)
  const HandleRegistroRedireccion = async (miniTienda:MiniTienda) => {
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
        navigate(`/app/VerTienda/${miniTienda.ID_tienda}`)
        GuardarHistorial(infoUser?.uid,{energy: informationProduct?.energia},id_product,false,true)
    }
  }
  
  return (
    <Modal isOpen={openProducto} setIsOpen={setOpenProducto} ref={modal} contentStyle={infoOpen?{overflow: "hidden"}:{}}>
        <div style={{
            position: 'absolute',
            right: "2%",
            cursor: "pointer",
            padding: "3px 6px"
        }} title='Mas información' onClick={() => setInfoOpen(prev => !prev)}>{infoOpen?"❌":"❔"}</div>

        {
            infoOpen?
            <div style={{textAlign: 'left', overflowY: "auto", maxHeight: "75.5svh", marginRight: "2rem"}}>
                <h3 style={{marginBottom: "0.5rem"}}>
                    Nutriscore
                </h3>
                <div style={{fontWeight: "500", marginBottom: "2rem"}}>
                    <p style={{marginBottom: "0.3rem"}}>
                        Sistema de etiquetado frontal de alimentos que permite a los consumidores valorar fácil y rápidamente su calidad nutricional.
                    </p>
                </div>

                <h3 style={{marginBottom: "0.5rem"}}>
                    Carbohidratos
                </h3>
                <div style={{fontWeight: "500", marginBottom: "2rem"}}>
                    <p style={{fontWeight: "500", marginBottom: "0.3rem"}}>
                        Los carbohidratos son moléculas de azúcar. Junto con las proteínas y las grasas, los carbohidratos son uno de los tres nutrientes principales que se encuentran en alimentos y bebidas.
                    </p>
                    <p style={{fontWeight: "500", marginBottom: "0.3rem"}}>
                    Su cuerpo descompone los carbohidratos en glucosa. La glucosa, o azúcar en la sangre, es la principal fuente de energía para las células, tejidos y órganos del cuerpo.
                    La glucosa puede usarse inmediatamente o almacenarse en el hígado y los músculos para su uso posterior.
                    </p>
                </div>

                <h3 style={{marginBottom: "0.5rem"}}>
                    Grasa (total)
                </h3>
                <div style={{fontWeight: "500", marginBottom: "2rem"}}>
                    <p style={{marginBottom: "0.3rem"}}>
                        Sumatoria de grasa saturada, grasa monoinsaturada, grasa poliinsaturada e incluye las grasas trans. 
                    </p>
                </div>

                <h3 style={{marginBottom: "0.5rem"}}>
                    Grasas saturadas
                </h3>
                <div style={{fontWeight: "500", marginBottom: "2rem"}}>
                    <p style={{marginBottom: "0.3rem"}}>
                        La grasa saturada es un tipo de grasa alimenticia. Es una de las grasas dañinas, junto con las grasas trans. Estas grasas son frecuentemente sólidas a temperatura ambiente.
                        Alimentos como la mantequilla, el aceite de palma y de coco, el queso y la carne roja tienen grandes cantidades de grasas saturadas.
                    </p>
                </div>

                <h3 style={{marginBottom: "0.5rem"}}>
                    Azucares
                </h3>
                <div style={{fontWeight: "500", marginBottom: "2rem"}}>
                    <p style={{marginBottom: "0.3rem"}}>
                        Son los diferentes tipos de azucares, como los son por ejemplo la sacarosa o azúcar de mesa y la fructosa.
                    </p>
                </div>

                <h3 style={{marginBottom: "0.5rem"}}>
                    Proteinas
                </h3>
                <div style={{fontWeight: "500", marginBottom: "2rem"}}>
                    <p style={{marginBottom: "0.3rem"}}>
                        Las proteínas son los pilares fundamentales de la vida. Cada célula del cuerpo humano las contiene.
                        La estructura básica de la proteína es una cadena de aminoácidos.
                    </p>
                    <p style={{marginBottom: "0.3rem"}}>
                        Es necesario consumir proteínas en la dieta para ayudarle al cuerpo a reparar células y producir células nuevas.
                        La proteína también es importante para el crecimiento y el desarrollo de niños, adolescentes y mujeres embarazadas.
                    </p>
                </div>

                <h3 style={{marginBottom: "0.5rem"}}>
                    Sodio
                </h3>
                <div style={{fontWeight: "500", marginBottom: "2rem"}}>
                    <p style={{marginBottom: "0.3rem"}}>
                    La sal de mesa está hecha de dos minerales, sodio y cloruro.
                    El cuerpo necesita una determinada cantidad de sodio para funcionar adecuadamente, pues ayuda en la función de los nervios y los músculos.
                    El sodio también ayuda a mantener un equilibrio adecuado de los líquidos.
                    Los riñones controlan la cantidad de sodio presente en el cuerpo; si tiene demasiado y los riñones no pueden eliminarlo, se acumula en la sangre.
                    Eso puede causar presión arterial alta. A su vez, la presión alta puede ocasionar otros problemas de salud.
                    </p>
                </div>

                <h3 style={{marginBottom: "0.5rem"}}>
                    Fibra
                </h3>
                <div style={{fontWeight: "500", marginBottom: "2rem"}}>
                    <p style={{marginBottom: "0.3rem"}}>
                    La fibra es una sustancia en las plantas. La fibra dietética es el tipo que se come. Es un tipo de carbohidrato.
                    También puede verla listada en la etiqueta de los alimentos como fibra soluble o fibra insoluble. Ambos tipos ofrecen importantes beneficios a la salud.
                    </p>
                </div>

                <h3 style={{marginBottom: "0.5rem"}}>
                    Energia / Calorías
                </h3>
                <div style={{fontWeight: "500", marginBottom: "2rem"}}>
                    <p style={{marginBottom: "0.3rem"}}>
                        Es la energía química que los animales (incluidos los humanos) derivan de los alimentos, Los organismos obtienen energía de los alimentos principalmente a partir de carbohidratos, grasas y proteínas.
                    </p>
                </div>
            </div>:
            <div className={style.answerOption} style={{justifyContent:'flex-start', boxShadow:'none'}}>
                <img src={currentProducto?.foto} style={{height:'15svh',maxWidth:'100%'}}></img>
                <div style={{flex:'1'}}>
                    <h2 style={{textAlign:'start',alignSelf:'flex-start',width:'100%'}}>
                    {currentProducto?.nombre} <br></br>
                    <strong style={{fontWeight:'700'}}>{currentProducto?.referencia}</strong>
                    <br></br>
                    <span style={{fontWeight:'400'}}>{currentProducto?.descripcion}</span>
                    </h2>
                    <div style={{display:'flex',gap:'1em',margin:'1%'}}>
                        <input style={{width:'20%'}} className={`${style.buttonSelector} ${style.scanButton}  basicButton`} type='number' value={1}></input>
                        <button style={{flex:'1'}} onClick={() => {currentProducto && GuardarHistorial(infoUser?.uid,{energy: informationProduct?.energia},currentProducto?.ID_producto,true)}}
                        className={`${style.scanButton} ${style.codigoButton} basicButton`}>Sumar calorias</button>
                    </div>
                    <p className={style.letraChica}> *Datos por 1 unidad <strong>100g(ml)</strong> del producto</p>
                </div>
                <div className={style.answerOption} style={{boxShadow:'none',padding:'5% 0',justifyContent:'flex-start',alignItems:'flex-start'}}>
                    <div style={{width:'30%',minWidth:'14em'}}>
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
                        {informationProduct && Object.keys(informationProduct).map((atributo,index,array) => (
                            !exepcion.includes(atributo) && !atributo.startsWith('unidad') && !isNaN(informationProduct[atributo]) &&
                            <p className={style.infoExtra}> {formatearTexto(atributo)} : <span style={{fontWeight:'600'}}>{Number(informationProduct[atributo]).toFixed(2)} {' '} 
                            {array[index + 1] && informationProduct[array[index + 1]]}</span></p>
                        ))}
                    </div>
                    {informationProduct?.nivelesAltos.length > 0 && <div className={styleFormPerfil.campo} style={{gridTemplateColumns:'none',width:'100%'}}>
                        <label htmlFor="Categoría" style={{color:'red',marginRight:'10px',textAlign:'start',fontSize:'3svh',fontWeight:'700'}}> Cuidado Niveles altos 📛: </label>
                        <div className='contain_busquedas'>
                            {informationProduct?.nivelesAltos.map((n) => (
                                <p key={n} className='opcionesSelector estiloButton'>{n}</p>
                            ))}
                        </div>
                    </div>}
                    <div className={styleFormPerfil.campo} style={{gridTemplateColumns:'none',width:'100%'}}>
                        <label htmlFor="Categoría" style={{color:'var(--color-6)',marginRight:'10px',textAlign:'start',fontSize:'3svh',fontWeight:'400'}}> Categorías: </label>
                        <SelectorArray placeholder='No hay categorias' color="var(--color-6)"
                        opciones={currentProducto?.categorias ?? []} current={currentProducto?.categorias ?? []} 
                        setCurrent={function (fieldName: string, response?: string | string[] | undefined): (e: { target: { value: any; }; }) => void {
                        throw new Error("Function not implemented.");
                        } } />
                    </div>
                </div>
            </div>
        }
    </Modal>
  )
}

export default InfoProductos
