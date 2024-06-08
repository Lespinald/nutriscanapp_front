import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { login } from "../redux/authSlice";
import { Usuario, convertirUsuario, formatDate } from "./models/usuario";
import { useDispatch, useSelector } from "react-redux";
import { useStorge } from "../hooks/useStorage";
import { Producto, Tienda } from "./models/tienda";
import { OffData } from "../pages/Tienda/utilTienda";

export function GetViewportWidth(): number{
  return document.documentElement.clientWidth;
}
export function GetViewportHeight(): number{
  return document.documentElement.clientHeight;
}
export function GetAspectRatio(): number{
  return document.documentElement.clientWidth/document.documentElement.clientHeight;
}
export function IsMobile(mobileWidth: number = 760): boolean{
  return (GetViewportWidth() <= mobileWidth || GetAspectRatio() <= (5/8));
}
export function merge (a: any[], b: any[], predicate = (a: any[], b: any[]) => a === b) {
  const c = [...a]; // copy to avoid side effects
  // add all items from B to copy C if they're not already present
  b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
  return c;
}

export async function TraerInfoUsuario(uid: string): Promise<Usuario | null> {

  try {
    const respuesta = await fetch(`https://api.nutriscan.com.co/api/usuarios/${uid}`);
    if (!respuesta.ok) {
      throw new Error('Error en la solicitud');
    }

    const datos = await respuesta.json();
    console.log("🚀 ~ TraerInfoUsuario ~ datos:", datos)
    
    const usuario = datos as Usuario;
    // convertirUsuario(
    //   datos.uid,
    //   datos.nombre,
    //   datos.tipoSuscripcion,
    //   datos.fechaSuscripcion,
    //   datos.fechaDeNacimiento,
    //   datos.altura,
    //   datos.peso,
    //   datos.telefono,
    //   datos.correo,
    // );

    usuario.foto = datos.foto;

    return usuario;
  } catch (error) {
    console.error('Error en la solicitud fetch:', error);
    alert('Error en consulta a base de datos');
    return null;
  }
}
export async function TraerInfoTienda(uid: string): Promise<Tienda | null> {

  try {
    const respuesta = await fetch(`https://api.nutriscan.com.co/api/tiendasusuario/${uid}`);
    if (!respuesta.ok) {
      throw new Error('Error en la solicitud');
    }

    const datos = await respuesta.json();
    console.log("🚀 ~ TraerInfoTienda ~ datos:", datos)
    
    if (datos.length !== 0) {
      const tienda = {
        ID_tienda: datos[0].ID_tienda,
        nombre: datos[0].nombre,
        direccion: datos[0].direccion,
        enlace: datos[0].enlace,
        descripcion: datos[0].descripcion,
        fotos: datos[0].fotos,
      };
      console.log("🚀 ~ TraerInfoTienda ~ tienda:", tienda);
      return tienda;
    } else {
      console.log("🚀 ~ TraerInfoTienda ~ Datos de tienda incompletos:", datos);
      return null;
    }
  } catch (error) {
    console.error('Error en la solicitud fetch:', error);
    alert('Error en consulta a base de datos');
    return null;
  }
}
export async function TraerProductosTienda(idTienda: string): Promise<Producto[] | null> {
  try {
    const respuesta = await fetch(`https://api.nutriscan.com.co/api/productostienda/${idTienda}`);
    if (!respuesta.ok) {
      throw new Error('Error en la solicitud');
    }

    const datos = await respuesta.json();
    console.log("🚀 ~ TraerProductosTienda ~ datos:", datos);

    const productos: Producto[] = [];

    // Assuming datos is an array of product data objects
    datos.forEach((productoData: any) => {
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
    return productos;
  } catch (error) {
    console.error('Error en la solicitud fetch:', error);
    alert('Error en consulta a base de datos');
    return null;
  }
}

export const GuardarRegistro = async (newProduct: Producto) => {
  try {
    const respuesta = await fetch(`https://api.nutriscan.com.co/api/productosreferencia/${newProduct.referencia}`);
    console.log("🚀 ~ GuardarRegistro ~ respuesta:", respuesta)
    if (!respuesta.ok) {
      console.error("No existe este producto");
      let datos:any = await CrearProducto(newProduct);
      console.log("🚀 ~ GuardarRegistro ~ datos:", datos)
      return datos
    }

    const datos = await respuesta.json();
    
    if (datos.length !== 0) {
      console.log("🚀 ~ GuardarRegistro ~ datos:", datos)
      console.log("🚀 ~ GuardarRegistro ~ datos.ID_producto:", datos[0].ID_producto)
      return datos[0].ID_producto;
    } else {
      console.error("No existe este producto");
      let datos:any = await CrearProducto(newProduct);
      console.log("🚀 ~ GuardarRegistro ~ datos:", datos)
      return datos
    }
  } catch (error) {
    console.error('No existe este producto');
    let datos:any = await CrearProducto(newProduct);
    console.log("🚀 ~ GuardarRegistro ~ datos:", datos)
    return datos
  }
}

export async function CrearProducto(newProduct: Producto): Promise<string | null> {
  console.log("🚀 ~ CrearProducto ~ JSON.stringify:", JSON.stringify({
    referencia: newProduct.referencia,
    nombre: newProduct.nombre,
    descripcion: newProduct.descripcion,
    foto: newProduct.foto,
  }))
  try {
    const respuesta = await fetch(`https://api.nutriscan.com.co/api/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        referencia: newProduct.referencia,
        nombre: newProduct.nombre,
        descripcion: newProduct.descripcion,
        foto: newProduct.foto,
      })
    });

    if (!respuesta.ok) {
      throw new Error('Error en la solicitud');
    }

    const datos = await respuesta.json();
    console.log("🚀 ~ CrearProducto ~ datos:", datos);
    
    if (datos && datos.ID_producto) {
      console.log('Producto creado exitosamente');
      return datos.ID_producto;
    } else {
      console.error('El ID del producto no se encontró en los datos devueltos');
      return null;
    }
  } catch (error) {
    console.error('Error en la solicitud fetch:', error);
    return null;
    // Aquí puedes manejar el error como desees, por ejemplo, mostrar un mensaje al usuario
  }
}

export const GuardarHistorial = async (newProduct: Producto, uid: string, nutriments: any, ID: string,comido?:boolean) => {
  console.log("🚀 ~ GuardarHistorial ~ ID:", ID);
  console.log("🚀 ~ GuardarHistorial ~ JSON.stringify:", JSON.stringify({
    uid: uid,
    ID_producto: ID,
    fecha: new Date(),
    comido: comido ?? false,
    calorias: nutriments.energy,
  }));
  try {
    const respuesta = await fetch(`https://api.nutriscan.com.co/api/historiales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: uid,
        ID_producto: ID,
        fecha: new Date(),
        comido: comido ?? false,
        calorias: nutriments.energy,
      })
    });

    if (!respuesta.ok) {
      throw new Error('Error en la solicitud');
    }

    if(comido){
      alert('Agregado a tu historial')
    }
    return respuesta.json();
  } catch (error) {
    console.error('Error en la solicitud fetch:', error);
    // Here you can handle the error as you wish, for example, displaying a message to the user
    return null;
  }
};

export function onUserLoad(accept:(user:User)=>void = user=>{},reject:()=>void = ()=>{},complete:()=>void = ()=>{}){
  const unsuscribe = onAuthStateChanged(auth, user => {
    if(user){
      accept(user);
    }else{
      reject();
    }
    complete();
    unsuscribe();
  })
}


export const GetTipoSuscripcion = (infoUsuario:Usuario):string => {

  if(infoUsuario?.tipoSuscripcion === 'gratis'){
    return 'FREE'
  }else{
    let fecha1 = new Date(infoUsuario?.fechaSuscripcion)
    let fecha2 = new Date()
    if(fecha1.getTime() > fecha2.getTime()){
      return infoUsuario?.tipoSuscripcion 
    }
    return 'FREE'
  }
}

export async function ConsultarOpenFoodFact(ID_producto:string,referencia: string, uid?: string): Promise<{ product: Producto | null; infoProducto: OffData | undefined }> {
  try {
    const res = await fetch(`https://world.openfoodfacts.net/api/v2/product/${referencia}`);
    
    if (!res.ok) {
      if (res.status === 404) {
        console.log("🚀 ~ ConsultarOpenFoodFact ~ 404 not found");
        return { product: null, infoProducto: undefined };
      }
      console.log("🚀 ~ ConsultarOpenFoodFact ~ Error:", res.statusText);
      throw new Error(res.statusText);
    }

    const data = await res.json();

    if (!data.product) {
      console.log("🚀 ~ ConsultarOpenFoodFact ~ Product not found");
      return { product: null, infoProducto: undefined };
    }

    console.log("🚀 ~ HandleSearch ~ data:", data);

    let newProduct: Producto = {
      ID_producto: ID_producto,
      referencia: data.product.id,
      nombre: data.product.product_name ?? data.product.product_name_es,
      descripcion: "",
      foto: data.product.image_url,
      categorias: (data.product.categories as string).split(",").map(s => s.trim()),
      nutriscore: data.product.nutriscore_grade
    };
    console.log("🚀 ~ ConsultarOpenFoodFact ~ newProduct:", newProduct)

    let productoInformation = OffData(data)

    if(uid){
      GuardarRegistro(newProduct).then((ID) => {
        console.log("🚀 ~ GuardarRegistro Then ~ ID:", ID)
        GuardarHistorial(newProduct,uid,data.product.nutriments,ID)
        newProduct.ID_producto = ID;
        return { product: newProduct, offData: productoInformation };
      })
    }

    return { product: newProduct, infoProducto: productoInformation };

  } catch (err) {
    console.error("🚀 ~ ConsultarOpenFoodFact ~ Error:", err);
    return { product: null, infoProducto: undefined };
  }
}

export function CalcularIMC(peso:number, altura:number){
  return peso/(altura/100)**2;
}

export function areObjectsEqual(obj1: any, obj2: any): boolean {
  // Verifica si ambos son objetos
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
      return false;
  }
  
  // Obtiene las claves de ambos objetos
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);
  
  // Verifica si tienen la misma cantidad de claves
  if (keysObj1.length !== keysObj2.length) {
      return false;
  }
  
  // Verifica si los valores de las claves son iguales
  for (const key of keysObj1) {
      if (obj1[key] !== obj2[key]) {
      return false;
      }
  }
  
  return true;
}

/** compares two dates and returns the number of days between the two, 0 if they are the same day, positive if the first parameter is before the second, negative otherwise*/
export function CompareDatesByDay(date1: Date, date2:Date){
  const MILLISINADAY = 86400000;

  const interalDate1 = new Date(date1);
  const interalDate2 = new Date(date2);

  interalDate1.setHours(0,0,0,0);
  interalDate2.setHours(0,0,0,0);

  const difference = interalDate2.getTime() - interalDate1.getTime();

  return difference / MILLISINADAY;
}

export function ActualizarRacha(usuario: Usuario){
  let nuevoUsuario: Usuario = {...usuario};

  let nuevaRacha = 1;
  const fechaHoy= new Date();

  if(nuevoUsuario.ultimoLogueo){
    const fechaLogueo = new Date(nuevoUsuario.ultimoLogueo);
    const diffDias = CompareDatesByDay(fechaHoy, fechaLogueo);

    
    console.log("diffDias:", diffDias, "fechaLogueo:", fechaLogueo, "fechaHoy", fechaHoy);
    if(diffDias === 0){
      nuevaRacha = nuevoUsuario.racha;
    }else if(diffDias === -1){
      nuevaRacha = nuevoUsuario.racha + 1;
    }
  }

  let nuevaFechaLogueo = fechaHoy.toISOString();

  console.log("nuevaRacha:", nuevaRacha, "nuevaFechaLogueo:", nuevaFechaLogueo);

  fetch(`https://api.nutriscan.com.co/api/usuarios/${nuevoUsuario.uid}`,
    {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({racha: nuevaRacha, ultimoLogueo: nuevaFechaLogueo})
    })
    .then(res => res.json())
    .then(user => console.log(user))
    .catch(err => console.error(err));

  nuevoUsuario.racha = nuevaRacha;
  nuevoUsuario.ultimoLogueo = nuevaFechaLogueo;

  return nuevoUsuario;
}


