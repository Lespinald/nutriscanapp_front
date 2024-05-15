import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { login } from "../redux/authSlice";
import { Usuario, convertirUsuario } from "./models/usuario";
import { useDispatch } from "react-redux";
import { useStorge } from "../hooks/useStorage";
import { Producto, Tienda } from "./models/tienda";

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
export async function TraerInfoUsuario(uid: string): Promise<Usuario | null> {

  try {
    const respuesta = await fetch(`https://api.nutriscan.com.co/api/usuarios/${uid}`);
    if (!respuesta.ok) {
      throw new Error('Error en la solicitud');
    }

    const datos = await respuesta.json();
    console.log("🚀 ~ TraerInfoUsuario ~ datos:", datos)
    
    const usuario = convertirUsuario(
      datos.uid,
      datos.nombre,
      datos.tipoSuscripcion,
      datos.fechaSuscripcion,
      datos.fechaDeNacimiento,
      datos.altura,
      datos.peso,
      datos.telefono,
      datos.correo,
    );

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