
export interface Usuario {
    uid: string;
    nombre : string;
    fechaSuscripcion : string ;
    fechaDeNacimiento : string;
    altura : number;
    peso : number;
    telefono : string;
    correo : string;
}

export const usuarioVacio = {
    uid: '',
    nombre : '',
    fechaSuscripcion : formatDate(new Date(0)),
    fechaDeNacimiento : formatDate(new Date(0)),
    altura : 0,
    peso : 0,
    telefono : '',
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

export function formatDate(date:Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // El mes es de 0 a 11, por lo que hay que sumar 1 y asegurarse de que tenga dos dígitos
    const day = String(date.getDate()).padStart(2, '0'); // Asegurarse de que el día tenga dos dígitos
    return `${year}-${month}-${day}`;
}