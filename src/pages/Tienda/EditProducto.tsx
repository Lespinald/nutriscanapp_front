import React, { useEffect, useRef, useState } from 'react'
import style from './EditProducto.module.css'
import styleMenuTienda from './MenuTienda.module.css'
import styleMenuPerfil from '../Personal/MenuPerfil.module.css'
import styleFormPerfil from '../Personal/FormPerfil.module.css'
import { Producto, Tienda } from '../../assets/models/tienda';
import { IsMobile, merge } from '../../assets/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { useStorge } from '../../hooks/useStorage';
import { agregarProducto, modificarProducto } from '../../redux/tiendaSlice';
import { SimpleSelectorArray } from '../../assets/Components/SelectorArray';
import { categorias } from '../../assets/categorias';
import { useAppLayoutContext } from '../AppLayout';
import InputImagen from '../../assets/Components/InputImagen';
import InputCodigoBarras, { barcodeState } from './InputCodigoBarras';
import DialogCarga from '../../assets/MenuCarga/DialogCarga'
import { DatosForm, OffData } from './utilTienda'

interface Props {
  initialProducto?: Producto;
  tienda: Tienda;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  indice: number;
}

const EditProducto = ({ initialProducto, tienda, indice, setOpen }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);

  const [currentProducto, setCurrentProducto] = useState(initialProducto);
  const [offData, setOffData] = useState<OffData>();

  const [opcionesCategorias, setOpcionesCategorias] = useState<string[]>(categorias);
  const [selectCategorias, setSelectCategorias] = useState<string[]>([]);
  const [codigoBarras, setCodigoBarras] = useState<barcodeState>("");
  const imagenForm = useRef<File>()

  const infoTienda = useSelector((state: any) => state.tienda.currentTienda);
  const infoUser = useSelector((state: any) => state.auth.infoUsuario);
  const dispatch = useDispatch();

  const { mobile } = useAppLayoutContext();

  const {
    agregarImg,
    obtenerURL
  } = useStorge();

  const setImagen = (file: File) => {
    imagenForm.current = file;
  }

  const validateForm = (datos: DatosForm) => {
    if ((datos.imagenFrontal || offData?.imagenFrontalUrl) &&
      Object.keys(datos).every(k => !!datos[k]) &&
      (codigoBarras || currentProducto?.referencia.startsWith("20009"))) {
      return true;
    }

    return false;
  }

  const addProductOff = async (barcode: string, datos: DatosForm) => {
    const formdata = new FormData();
    formdata.append("user_id", "jurodriguezch");
    formdata.append("password", "OpenFoodFactsNutriScan");
    formdata.append("code", barcode);
    formdata.append("product_name", datos.nombre);
    formdata.append("categories", datos.categorias.join(", "))
    formdata.append("lang", "es");
    formdata.append("quantity", `${datos.cantidad.toString()} ${datos.unidadCantidad}`);
    formdata.append("nutrition_data_per", "100g");
    formdata.append("nutriment_energy", datos.energia.toString());
    formdata.append("nutriment_energy_unit", datos.unidadEnergia)

    formdata.append("nutriment_fiber", datos.fibra.toString());
    formdata.append("nutriment_fiber_unit", datos.unidadFibra);
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
   
    const requestOptions = {
      method: "POST",
      body: formdata
    };

    try {
      
      const res = await fetch("https://co.openfoodfacts.net/cgi/product_jqm2.pl", requestOptions);
      const info = await res.text();
      
      
      if (datos.imagenFrontal){
        const formdata = new FormData();
        formdata.append("code", barcode);
        formdata.append("imagefield", "front_es");
        formdata.append("offimg", datos.imagenFrontal);

        const requestOptions = {
          method: "POST",
          body: formdata
        };

        const res = await fetch("https://api.nutriscan.com.co/api/uploadoffimg", requestOptions);
        console.log(await res.json());
      }
      console.log(info);
      return res.ok;
    } catch (err) {
      console.error("falla al crear producto en OFF", err);
      return false;
    }
  }

  const getNewNoBarcodeCode = async () => {
    const res = await fetch("https://api.nutriscan.com.co/api/productossincodigo");
    const data = await res.json();
    console.log(data);
    const barcodes = (data as any[]).map((v, i) => BigInt((v.referencia as string)));


    let last = 2000900000000n;

    barcodes.forEach(v => {
      if (v > last) last = v;
    })

    return last.toString();
  }

  const GuardarProducto = async (datos: DatosForm) => {

    if (!codigoBarras && !(currentProducto?.referencia.startsWith("20009"))) {
      throw new Error("fallo al guardar producto: No se especifico un codigo de barras o la ausencia del mismo")
    }

    let codigoTemp: string;

    if (codigoBarras === "noBarcode") {
      if (currentProducto?.referencia.startsWith("20009")) {
        codigoTemp = currentProducto.referencia;
      } else {
        codigoTemp = await getNewNoBarcodeCode();
      }
    } else {
      codigoTemp = codigoBarras;
    }

    const ok = await addProductOff(codigoTemp, datos);
    // const ok = true;
    if (ok) {
      let resOffData = {product:{image_url: offData?.imagenFrontalUrl}};
      if(datos.imagenFrontal){
        const OFFRes = await fetch(`https://world.openfoodfacts.net/api/v2/product/${codigoTemp}?fields=image_url`);
        resOffData = await OFFRes.json();
        console.log(resOffData);
      }

      let url: string, method: string;
      if (currentProducto) {
        url = `https://api.nutriscan.com.co/api/productos/${currentProducto.ID_producto}`;
        method = "PUT";
      } else {
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
            foto: resOffData.product.image_url
          })
        }
      );

      console.log(prodRes);

      if (!prodRes.ok) {
        throw new Error("fallo al guardar producto: " + (await prodRes.json()).message);
      }


      if (currentProducto) {
        const nuevoProducto: Producto = await prodRes.json();
        setCurrentProducto(nuevoProducto);
        dispatch(modificarProducto({ producto: nuevoProducto, indice: indice }))
        alert("Modificación exitosa");
      } else {
        const nuevoProducto: Producto = await prodRes.json();
        setCurrentProducto(nuevoProducto);
        dispatch(agregarProducto({ producto: nuevoProducto }))
        alert("Creación exitosa");
      }

    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    let auxiliar: any = {};

    formData.forEach((v, k) => {
      if (auxiliar[k]) {
        if (typeof auxiliar[k] === 'string') {
          auxiliar[k] = [auxiliar[k], v] as string[];
        } else {
          auxiliar[k].push(v);
        }
      } else {
        auxiliar[k] = v;
      }
    })

    auxiliar.categorias = (typeof auxiliar.categorias === 'string') ? [auxiliar.categorias] : auxiliar.categorias

    let datos: DatosForm = auxiliar;

    if (imagenForm.current) {
      datos.imagenFrontal = imagenForm.current;
    }

    console.log(datos, auxiliar);

    if (validateForm(datos)) {
      GuardarProducto(datos).finally(
        () => setLoading(false)
      )
    } else {
      alert("campos incompletos");
      setLoading(false);
    }
  }

  const getProductOff = async (codigo: string) => {
    const res = await fetch(`https://world.openfoodfacts.net/api/v2/product/${codigo}?fields=nutriments,product_quantity,product_quantity_unit,image_url,categories`)
    if(res.ok){
      const data = await res.json();

      console.log(data);
      
      setOffData(OffData(data));

      const {categories}:{categories:string} = data.product;

      const nuevasSelectCategorias = categories.split(",").map(s => s.trim());
      setSelectCategorias(nuevasSelectCategorias);
      
      const nuevasCategorias = merge(opcionesCategorias, nuevasSelectCategorias);
      setOpcionesCategorias(nuevasCategorias);
    }
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
    
    if(currentProducto){
      getProductOff(currentProducto.referencia)
        .then(() => {
          setLoading(false);

        });
    }
    
  }, [currentProducto])

  return (
    <>
    <DialogCarga isOpen={loading} color='--color-1'/>
    <div className={`${styleMenuPerfil.fondoPerfil} ${style.page}`} style={{ position: 'fixed', background: 'white', top: '6%' }}>
      <div className={`${styleMenuPerfil.div1} ${styleFormPerfil.firstColumna}`} style={{zIndex:'1',alignItems:'center'}}>
        <div style={{ display: 'flex', gap: '7svh', alignItems: 'center', color: 'var(--color-5)', justifyContent: 'center', transform: 'translateX(-5svh)' }} onClick={() => setOpen((prev) => !prev)}>
          <p className={styleFormPerfil.backButton} onClick={() => { }} >
            <svg xmlns="http://www.w3.org/2000/svg" height="3svh" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="3svh" xmlSpace="preserve" fill='var(--color-5)'>
              <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 " />
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
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2vh" height="2vh" viewBox="0 0 24 24" fill={IsMobile() ? 'white' : 'var(--color-5)'} style={{ transform: 'translateX(10px)' }}>
              <path d="M14.1 5.9L3 17v4h4L18.1 9.9 14.1 5.9zM15.6 4.4L18 2l4 4-2.4 2.4L15.6 4.4z"></path>
            </svg>
          </p>
        </div>
        <InputCodigoBarras buttonClass={styleFormPerfil.button} codigo={currentProducto?.referencia} setCodigo={setCodigoBarras} />
      </div>
      <div className={`${styleFormPerfil.formulario} ${style.formulario}`}>
        <form className={style.infoForm} onSubmit={onSubmit}>
          <div className={styleFormPerfil.campo}>
            <label htmlFor='nombre'>Nombre:</label>
            <input name='nombre' id='nombre' type='text' placeholder='Ingrese el nombre' defaultValue={currentProducto?.nombre}></input>
          </div>
          <div className={styleFormPerfil.campo}>
            <label htmlFor='descripcion'>Descripción:</label>
            <textarea rows={3} id="descripcion" name="descripcion" placeholder='Ingrese una descipcion' defaultValue={currentProducto?.descripcion} />
          </div>
          <div className={styleFormPerfil.campo}>
            <label htmlFor="categorias">Categoría:</label>
            <SimpleSelectorArray opciones={opcionesCategorias} current={selectCategorias} setCurrent={setSelectCategorias} />
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
            <InputImagen name='imagenFrontal' isMobile={mobile} defaultSrc={currentProducto?.foto} styleClass={style.inputImagen} setFile={setImagen} />
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
                <td><input name='cantidad' id='cantidad' type='number' step="any"
                  defaultValue={offData?.cantidad}></input></td>
                <td>
                  <select name='unidadCantidad' id='unidadCantidad' key={offData?"loaded":"unloaded"} defaultValue={offData?.unidadCantidad}>
                    <option value={"g"}>g</option>
                    <option value={"ml"}>ml</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor='energia'>Energia / Calorias</label></td>
                <td><input name='energia' id='energia' type='number' step="any" defaultValue={offData?.energia}></input></td>
                <td>
                  <select name='unidadEnergia' id='unidadEnergia' key={offData?"loaded":"unloaded"} defaultValue={offData?.unidadEnergia}>
                    <option value={"kcal"}>Kcal</option>
                    <option value={"kj"}>Kjoules</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor='grasas'>Grasa total</label></td>
                <td><input name='grasas' id='grasas' type='number' step="any" defaultValue={offData?.grasas}></input></td>
                <td>
                  <select name='unidadGrasas' id='unidadGrasas' key={offData?"loaded":"unloaded"} defaultValue={offData?.unidadGrasas}>
                    <option value={"g"}>g</option>
                    <option value={"mg"}>mg</option>
                    <option value={"μg"}>mcg / μg</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor='grasaSaturada'>Grasa Saturada</label></td>
                <td><input name='grasaSaturada' id='grasaSaturada' type='number' step="any" defaultValue={offData?.grasaSaturada}></input></td>
                <td>
                  <select name='unidadGrasaSaturada' id='unidadGrasaSaturada' key={offData?"loaded":"unloaded"} defaultValue={offData?.unidadGrasaSaturada}>
                    <option value={"g"}>g</option>
                    <option value={"mg"}>mg</option>
                    <option value={"μg"}>mcg / μg</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor='carbohidratos'>Carbohidratos totales</label></td>
                <td><input name='carbohidratos' id='carbohidratos' type='number' step="any" defaultValue={offData?.carbohidratos}></input></td>
                <td>
                  <select name='unidadCarbohidratos' id='unidadCarbohidratos' key={offData?"loaded":"unloaded"} defaultValue={offData?.unidadCarbohidratos}>
                    <option value={"g"}>g</option>
                    <option value={"mg"}>mg</option>
                    <option value={"μg"}>mcg / μg</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor='fibra'>Fibra dietaria</label></td>
                <td><input name='fibra' id='fibra' type='number' step="any" defaultValue={offData?.fibra}></input></td>
                <td>
                  <select name='unidadFibra' id='unidadFibra' key={offData?"loaded":"unloaded"} defaultValue={offData?.unidadFibra}>
                    <option value={"g"}>g</option>
                    <option value={"mg"}>mg</option>
                    <option value={"μg"}>mcg / μg</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor='azucar'>Azúcares totales</label></td>
                <td><input name='azucar' id='azucar' type='number' step="any" defaultValue={offData?.azucar}></input></td>
                <td>
                  <select name='unidadAzucar' id='unidadAzucar' key={offData?"loaded":"unloaded"} defaultValue={offData?.unidadAzucar}>
                    <option value={"g"}>g</option>
                    <option value={"mg"}>mg</option>
                    <option value={"μg"}>mcg / μg</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor='proteina'>Proteína</label></td>
                <td><input name='proteina' id='proteina' type='number' step="any" defaultValue={offData?.proteina}></input></td>
                <td>
                  <select name='unidadProteina' id='unidadProteina' key={offData?"loaded":"unloaded"} defaultValue={offData?.unidadProteina}>
                    <option value={"g"}>g</option>
                    <option value={"mg"}>mg</option>
                    <option value={"μg"}>mcg / μg</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor='sodio'>Sodio</label></td>
                <td><input name='sodio' id='sodio' type='number' step="any" defaultValue={offData?.sodio}></input></td>
                <td>
                  <select name='unidadSodio' id='unidadSodio' key={offData?"loaded":"unloaded"} defaultValue={offData?.unidadSodio ?? "mg"}>
                    <option value={"g"}>g</option>
                    <option value={"mg"}>mg</option>
                    <option value={"μg"}>mcg / μg</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className={`${styleFormPerfil.button}`} style={{ alignSelf: 'flex-end' }}>
            Guardar Cambios
          </button>
          <button type="button" className={`${styleFormPerfil.button}`} onClick={() => setOpen(false)} style={{ alignSelf: 'flex-start' }}>CANCELAR</button>
        </form>
      </div>
      {/* 2000900000000 */}
    </div>
    </>
  )
}

export default EditProducto
