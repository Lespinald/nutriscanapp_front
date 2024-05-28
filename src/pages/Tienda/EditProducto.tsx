import React, { useEffect, useRef, useState } from 'react'
import style from './EditProducto.module.css'
import styleMenuTienda from './MenuTienda.module.css'
import styleMenuPerfil from '../Personal/MenuPerfil.module.css'
import styleFormPerfil from '../Personal/FormPerfil.module.css'
import { Producto, Tienda, productoVacio, tiendaVacia } from '../../assets/models/tienda';
import { IsMobile } from '../../assets/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { useStorge } from '../../hooks/useStorage';
import { agregarProducto, modificarProducto } from '../../redux/tiendaSlice';
import SelectorArray, { SimpleSelectorArray } from '../../assets/Components/SelectorArray';
import { categorias } from '../../assets/categorias';
import Modal from '../../assets/Components/Modal';
import { useAppLayoutContext } from '../AppLayout';
import InputImagen from '../../assets/Components/InputImagen';
import InputCodigoBarras, { barcodeState } from './InputCodigoBarras';

interface Props{
  initialProducto?:Producto;
  tienda: Tienda;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  indice:number;
}

interface DatosForm{
  nombre: string;
  descripcion: string;
  categorias: string[];
  imagenFrontal?: File;
  cantidad: number;
  unidadCantidad: string;
  imagenNutricional?: File;
  energia: number;
  unidadEnergia:string;
  grasas: number;
  unidadGrasas:string;
  grasaSaturada: number;
  unidadGrasaSaturada: string;
  carbohidratos: number;
  unidadCarbohidratos: string;
  azucar: number;
  unidadAzucar: string;
  fibra: number;
  unidadFibra: string;
  proteina: number;
  unidadProteina: string;
  sodio: number;
  unidadSodio: string;
}

const EditProducto = ({initialProducto,tienda,indice,setOpen}:Props) => {
    const [currentProducto, setCurrentProducto] = useState(initialProducto);

    const [selectCategorias, setSelectCategorias] = useState<string[]>([]);

    const [codigoBarras, setCodigoBarras] = useState<barcodeState>("");

    const imagenForm = useRef<File>()

    const infoTienda = useSelector((state:any) => state.tienda.currentTienda);
    const infoUser = useSelector((state:any) => state.auth.infoUsuario);
    const dispatch = useDispatch();

    const {mobile} = useAppLayoutContext();

    const {
      agregarImg,
      obtenerURL
    } = useStorge();

    const setImagen = (file: File) => {
      imagenForm.current = file;
    }

    const validateForm = (datos: DatosForm) => {
      if(datos.imagenFrontal &&
        Object.keys(datos).every(k => !!datos[k]) &&
        (codigoBarras || currentProducto?.referencia.startsWith("20009"))){
        return true;
      }

      return false;
    }

    const addProductOFF = async (barcode: string, datos: DatosForm) => {
      const formdata = new FormData();
      formdata.append("user_id", "jurodriguezch");
      formdata.append("password", "OpenFoodFactsNutriScan");
      formdata.append("code", barcode);
      datos.categorias.forEach(v => formdata.append("add_categories", v));
      formdata.append("lang", "es");
      formdata.append("product_quantity", datos.cantidad.toString());
      formdata.append("product_quantity_unit", datos.unidadCantidad);
      formdata.append("nutrition_data_per", "100g");
      formdata.append("nutriment_enegry", datos.energia.toString());
      formdata.append("nutriment_enegry_unit", datos.unidadEnergia)

      formdata.append("nutriment_fat", datos.grasas.toString());
      formdata.append("nutriment_fat_unit", datos.unidadGrasas);
      formdata.append("nutriment_saturated-fat", datos.grasaSaturada.toString());
      formdata.append("nutriment_saturated-fat_unit", datos.unidadGrasaSaturada);
      formdata.append("nutriment_carbohydrates", datos.carbohidratos.toString());
      formdata.append("nutriment_carbohydrates_unit", datos.unidadCarbohidratos);
      formdata.append("nutriment_sugars", datos.azucar.toString());
      formdata.append("nutriment_sugars_unit", datos.unidadAzucar);
      formdata.append("nutriment_sodium", datos.sodio.toString());
      formdata.append("nutriment_sodium_unit", datos.unidadSodio);
      formdata.append("nutriment_proteins", datos.proteina.toString());
      formdata.append("nutriment_proteins_unit", datos.unidadProteina);
      if(datos.imagenFrontal) formdata.append("imgupload_front_es", datos.imagenFrontal);
      const requestOptions = {
        method: "POST",
        body: formdata
      };
      try{
        const res = await fetch("https://co.openfoodfacts.net/cgi/product_jqm2.pl", requestOptions);
        const info = await res.text();
        console.log(info);
        return res.ok;
      }catch(err){
        console.error("falla al crear producto en OFF", err);
        return false;
      }
    }

    const GuardarProducto = async(datos: DatosForm) => {
      
      if(!codigoBarras && !(currentProducto?.referencia.startsWith("20009"))){
        throw new Error("fallo al guardar producto: No se especifico un codigo de barras o la ausencia del mismo")
      }

      let codigoTemp: string;
      
      if(codigoBarras === "noBarcode"){
        if(currentProducto?.referencia.startsWith("20009")){
          codigoTemp = currentProducto.referencia;
        }else{
          const res = await fetch("https://api.nutriscan.com.co/api/productossincodigo");
          const data = await res.json();
          console.log(data);
          const barcodes = (data as any[]).map((v,i) => BigInt((v.referencia as string)));
    
    
          let last = 2000900000000n;
    
          barcodes.forEach(v => {
            if(v > last) last = v;
          })
    
          codigoTemp = last.toString();
        }
      }else{
        codigoTemp = codigoBarras;
      }

      const ok = await addProductOFF(codigoTemp, datos);
      // const ok = true;
      if(ok){
        const OFFRes = await fetch(`https://world.openfoodfacts.net/api/v2/product/${codigoTemp}?fields=image_url`);
        const OFFData = await OFFRes.json();
        console.log(OFFData);
        
        let url: string, method: string;
        if(currentProducto){
          url = `https://api.nutriscan.com.co/api/productos/${currentProducto.ID_producto}`;
          method = "PUT";
        }else{
          url = "https://api.nutriscan.com.co/api/productos";
          method = "POST";
        }

        console.log(url, method);

        const prodRes = await fetch(url,
          {
            method: method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              referencia: codigoTemp,
              ID_tienda: tienda.ID_tienda,
              nombre: datos.nombre,
              descripcion: datos.descripcion,
              foto: OFFData.product.image_url
            })
          }
        );

        console.log(prodRes);

        if(!prodRes.ok){
          throw new Error("fallo al guardar producto: "+ (await prodRes.json()).message);
        }

        
        if(currentProducto){
          const nuevoProducto: Producto = await prodRes.json();
          setCurrentProducto(nuevoProducto);
          dispatch(modificarProducto({producto: nuevoProducto, indice: indice}))
          alert("Modificación exitosa");
        }else{
          const nuevoProducto: Producto = await prodRes.json();
          setCurrentProducto(nuevoProducto);
          dispatch(agregarProducto({producto: nuevoProducto}))
          alert("Creación exitosa");
        }

      }
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget);

      let auxiliar: any = {};

      formData.forEach((v,k) => {
        if(auxiliar[k]){
          if(typeof auxiliar[k] === 'string'){
            auxiliar[k] = [auxiliar[k], v] as string[];
          }else{
            auxiliar[k].push(v);
          }
        }else{
          auxiliar[k] = v;
        }
      })

      auxiliar.categorias = (typeof auxiliar.categorias === 'string')? [auxiliar.categorias]: auxiliar.categorias
      
      let datos: DatosForm = auxiliar;

      if(imagenForm.current){
        datos.imagenFrontal = imagenForm.current;
      }

      console.log(datos, auxiliar);

      if(validateForm(datos)){
        GuardarProducto(datos);
      }else{
        alert("campos incompletos");
      }
    }



    // const HandleInputChange = (fieldName: string,response?: string|string[]) => (e: { target: { value: any } }) => {
    //   // Si el campo es 'fechaDeNacimiento', convertir el valor a un objeto Date
    //   const value = response ? response : e.target.value
    //   setCurrentProducto({ ...currentProducto, [fieldName]: value });
    //   // setCurrentProducto({ ...currentProducto, ['ID_producto']: '6' });
    // };

    // const HandleSaveImage = async (image:any) => {
    //   const response = await fetch(image);
    //   if (!response.ok) {
    //       throw new Error('Error al descargar la imagen');
    //   }
      
    //   // Convierte la respuesta en un blob
    //   const blob = await response.blob();
      
    //   // Sube la imagen a Firebase Storage usando la función agregarImg
    //   try {
    //     const picture = await agregarImg(infoUser.uid, blob,`fotoProducto${currentProducto.ID_producto}`);
    //     console.log("🚀 ~ HandleSaveImage ~ infoUser.uid:", infoUser.uid)
    //     console.log("Imagen subida exitosamente");
    //     console.log("🚀 ~ HandleSaveImage ~ picture:", picture)
    //     console.log("🚀 ~ HandleSaveImage ~ image:", image)
    //     await obtenerURL(`${infoUser.uid}/fotoProducto${currentProducto.ID_producto}.png`).then(
    //       (response) => {
    //         // setPhotoPerfil(response);
    //         const handleChange = HandleInputChange('foto',response);
    //         handleChange({ target: { value: response } });
    //         console.log("🚀 ~ HandleSaveImage ~ response:", response)
    //       }
    //     )
    //   } catch (error) {
    //     console.error('Error al subir la imagen a Firebase:', error);
    //   }
    //   setChangePhoto(false);
    // }

    // const HandleGuardarCambios = () => {
    //   console.log(JSON.stringify({
    //     ID_producto: 1,
    //     ID_tienda: infoTienda.ID_tienda,
    //     nombre: currentProducto.nombre,
    //     descripcion: currentProducto.descripcion,
    //     foto: currentProducto.foto,
    //   }))
    //   if(!areObjectsEqual(productoVacio,currentProducto)){
    //     var resp = fetch( areObjectsEqual(productoVacio,initialProducto) ? `https://api.nutriscan.com.co/api/productos` : `https://api.nutriscan.com.co/api/productos/${currentProducto.ID_producto}`, {
    //       method: areObjectsEqual(productoVacio,initialProducto) ? 'POST': 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         ID_producto: currentProducto.ID_producto,
    //         referencia: currentProducto.ID_producto,
    //         ID_tienda: infoTienda.ID_tienda,
    //         nombre: currentProducto.nombre,
    //         descripcion: currentProducto.descripcion,
    //         foto: currentProducto.foto,
    //       })
    //     })
    //     .then(respuesta => {
    //       console.log("🚀 ~ HandleRegistro ~ respuesta:", respuesta)
    //       if (!respuesta.ok) {
    //         throw new Error('Error en la solicitud');
    //       }
    //       return respuesta.json()
    //     })
    //     .then(async(datos) => {
    //       alert('Modificado Exitosamente')
    //       if(areObjectsEqual(productoVacio,initialProducto)){
    //         dispatch(agregarProducto({producto:currentProducto}))
    //       }else{
    //         dispatch(modificarProducto({producto:currentProducto,indice:indice}))
    //       }
    //     })
    //     .catch(error => {
    //       console.error('Error en la solicitud fetch:', error);
    //       alert('Error actualizar en base de datos')
    //       // Aquí puedes manejar el error como desees, por ejemplo, mostrar un mensaje al usuario
    //     });
    //     return resp
    //   }
    // }

    
    return (
        <div className={`${styleMenuPerfil.fondoPerfil} ${style.page}`} style={{position:'fixed',background:'white',top:'6%'}}>
          <div className={`${styleMenuPerfil.div1} ${styleFormPerfil.firstColumna}`}>
            <div style={{display:'flex',gap:'7svh',alignItems:'center',color:'var(--color-5)',justifyContent:'center',transform:'translateX(-5svh)'}} onClick={() => setOpen((prev) => !prev)}>
              <p className={styleFormPerfil.backButton} onClick={() => {}} >
                <svg xmlns="http://www.w3.org/2000/svg" height="3svh" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="3svh" xmlSpace="preserve" fill='var(--color-5)'>
                  <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
                </svg>
              </p>
              <h1>EDITAR PRODUCTO</h1>
            </div>
            <div className={``}>
              <div className={styleMenuTienda.producto}>
                <img src={currentProducto?.foto} alt='Foto de producto'></img>
                <div>
                  <p className={styleMenuTienda.name}>{currentProducto?.nombre}</p>
                  <p className={styleMenuTienda.desc}>{currentProducto?.descripcion}</p>
                </div>
              </div>
              <p className={styleMenuTienda.editarText}>CAMBIAR FOTO  
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2vh" height="2vh" viewBox="0 0 24 24" fill={IsMobile() ? 'white' :'var(--color-5)'} style={{transform:'translateX(10px)'}}>
                  <path d="M14.1 5.9L3 17v4h4L18.1 9.9 14.1 5.9zM15.6 4.4L18 2l4 4-2.4 2.4L15.6 4.4z"></path>
                </svg>
              </p>
            </div>
            <InputCodigoBarras buttonClass={styleFormPerfil.button} codigo={currentProducto?.referencia} setCodigo={setCodigoBarras}/>
          </div>
          <div className={`${styleFormPerfil.formulario} ${style.formulario}`}>
            <form className={style.infoForm} onSubmit={onSubmit}>
              <div className={styleFormPerfil.campo}>
                <label htmlFor='nombre'>Nombre:</label>
                <input name='nombre' id='nombre' type='text' placeholder='Ingrese el nombre' defaultValue={currentProducto?.nombre}></input>
              </div>
              <div className={styleFormPerfil.campo}>
                <label htmlFor='descripcion'>Descripción:</label>
                <textarea rows={3} id="descripcion" name="descripcion" placeholder='Ingrese una descipcion' defaultValue={currentProducto?.descripcion}/>
              </div>
              <div className={styleFormPerfil.campo}>
                <label htmlFor="categorias">Categoría:</label>
                <SimpleSelectorArray opciones={categorias} current={selectCategorias} setCurrent={setSelectCategorias}/>
                <select name="categorias" id='categorias' multiple hidden>
                  {
                    selectCategorias.map((v, i) => 
                      <option value={v} key={i} selected>{v}</option>
                    )
                  }
                </select>
              </div>
              <div className={styleFormPerfil.campo}>
                <label>Imagen Frontal:</label>
                <InputImagen name='imagenFrontal' isMobile={mobile} styleClass={style.inputImagen} setFile={setImagen}/> 
              </div>
              <table className={style.infoTable}>
                <thead>  
                  <tr>
                    <th>Información</th>
                    <th>cantidad (en 100 g o ml)</th>
                    <th>Información</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><label htmlFor='cantidad'>Peso/cantidad del producto</label></td>
                    <td><input name='cantidad' id='cantidad' type='number' step="any"></input></td>
                    <td>
                      <select name='unidadCantidad' id='unidadCantidad'>
                        <option value={"g"}>g</option>
                        <option value={"ml"}>ml</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor='energia'>Energia / Calorias</label></td>
                    <td><input name='energia' id='energia' type='number' step="any"></input></td>
                    <td>
                      <select name='unidadEnergia' id='unidadEnergia'>
                        <option value={"kcal"}>Kcal</option>
                        <option value={"kj"}>Kjoules</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor='grasaSaturada'>Grasa total</label></td>
                    <td><input name='grasaSaturada' id='grasaSaturada' type='number' step="any"></input></td>
                    <td>
                      <select name='unidadGrasaSaturada' id='unidadGrasaSaturada'>
                        <option value={"g"}>g</option>
                        <option value={"mg"}>mg</option>
                        <option value={"μg"}>mcg / μg</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor='grasas'>Grasa Saturada</label></td>
                    <td><input name='grasas' id='grasas' type='number' step="any"></input></td>
                    <td>
                      <select name='unidadGrasas' id='unidadGrasas'>
                        <option value={"g"}>g</option>
                        <option value={"mg"}>mg</option>
                        <option value={"μg"}>mcg / μg</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor='carbohidratos'>Carbohidratos totales</label></td>
                    <td><input name='carbohidratos' id='carbohidratos' type='number' step="any"></input></td>
                    <td>
                      <select name='unidadCarbohidratos' id='unidadCarbohidratos'>
                        <option value={"g"}>g</option>
                        <option value={"mg"}>mg</option>
                        <option value={"μg"}>mcg / μg</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor='fibra'>Fibra dietaria</label></td>
                    <td><input name='fibra' id='fibra' type='number' step="any"></input></td>
                    <td>
                      <select name='unidadFibra' id='unidadFibra'>
                        <option value={"g"}>g</option>
                        <option value={"mg"}>mg</option>
                        <option value={"μg"}>mcg / μg</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor='azucar'>Azúcares totales</label></td>
                    <td><input name='azucar' id='azucar' type='number' step="any"></input></td>
                    <td>
                      <select name='unidadAzucar' id='unidadAzucar'>
                        <option value={"g"}>g</option>
                        <option value={"mg"}>mg</option>
                        <option value={"μg"}>mcg / μg</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor='proteina'>Proteína</label></td>
                    <td><input name='proteina' id='proteina' type='number' step="any"></input></td>
                    <td>
                      <select name='unidadProteina' id='unidadProteina'>
                        <option value={"g"}>g</option>
                        <option value={"mg"}>mg</option>
                        <option value={"μg"}>mcg / μg</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor='sodio'>Sodio</label></td>
                    <td><input name='sodio' id='sodio' type='number' step="any"></input></td>
                    <td>
                      <select name='unidadSodio' id='unidadSodio'>
                        <option value={"mg"}>mg</option>
                        <option value={"g"}>g</option>
                        <option value={"μg"}>mcg / μg</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
                      {/* <select name='unidadEnergia' id='unidadEnergia'>
                        <option value={"g"}>g</option>
                        <option value={"mg"}>mg</option>
                        <option value={"μg"}>μg</option>
                        <option value={"cl"}>cl</option>
                        <option value={"ml"}>ml</option>
                        <option value={"dv"}>dv</option>
                        <option value={"% vol"}>% de alcohol</option>
                      </select> */}
                {/* <div className={styleFormPerfil.campo}>
                  <label htmlFor="nombre">Nombre:</label>
                  <input type="text" id="nombre" name="nombre" onChange={HandleInputChange('nombre')} value={currentProducto?.nombre} placeholder='Ingrese un nombre'/>
                </div> */}
                {/* <button type="button" className={`${styleFormPerfil.button} ${areObjectsEqual(initialProducto,currentProducto) ? styleFormPerfil.desactivado : ''}`}
                onClick={HandleGuardarCambios} style={{alignSelf:'flex-end'}}>{areObjectsEqual(productoVacio,initialProducto)?'Crear Producto':'Guardar Cambios'}</button> */}
                <button type="submit" className={`${styleFormPerfil.button}`} style={{alignSelf:'flex-end'}}>
                  Guardar Cambios
                </button>
                <button type="button" className={`${styleFormPerfil.button}`} onClick={() => setOpen(false)} style={{alignSelf:'flex-start'}}>CANCELAR</button>
            </form>
        </div>
          {/* 2000900000000 */}
        </div>
      )
}

export default EditProducto
