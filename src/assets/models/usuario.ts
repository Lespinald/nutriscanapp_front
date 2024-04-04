
export interface Usuario {
    uid: string;
    nombre : string;
    fechaSuscripcion : Date ;
    fechaDeNacimiento : Date;
    altura : number;
    peso : number;
    telefono : string;
    correo : string;
}

export const usuarioVacio = {
    uid: '',
    nombre : '',
    fechaSuscripcion : new Date(0),
    fechaDeNacimiento : new Date(0),
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
