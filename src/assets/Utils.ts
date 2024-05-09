import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { login } from "../redux/authSlice";
import { Usuario, convertirUsuario } from "./models/usuario";
import { useDispatch } from "react-redux";
import { useStorge } from "../hooks/useStorage";

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
    
    const usuario = convertirUsuario(
      datos.uid,
      datos.nombre,
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