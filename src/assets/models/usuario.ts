
export interface Usuario {
    uid: string;
    nombre : string;
    fechaSuscripcion : string ;
    fechaDeNacimiento : string;
    altura : number;
    peso : number;
    telefono : number;
    correo : string;
    foto : string;
}

export const usuarioVacio = {
    uid: '',
    nombre : '',
    fechaSuscripcion : formatDate(new Date(0)),
    fechaDeNacimiento : formatDate(new Date(0)),
    altura : 50,
    peso : 15,
    telefono : 0,
    correo : '',
} as Usuario;

export const convertirUsuario = (id:string,nombre:string,fechaSuscripcion:Date, fechaDeNacimiento:Date,altura:number, peso:number, telefono:string, correo:string) => {
    return {
        id: id,
        nombre: nombre,
        fechaSuscripcion: fechaSuscripcion,
        fechaDeNacimiento: fechaDeNacimiento,
        altura: altura,
        peso: peso,
        telefono: telefono,
        correo: correo,
    } as unknown as Usuario
}

export function formatDate(date: Date) {
    if (date.getTime() === 0) {
        // Si la fecha es el "epoch", devuelve una fecha a partir del año 2025
        return "2025-01-01 00:00:00";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}