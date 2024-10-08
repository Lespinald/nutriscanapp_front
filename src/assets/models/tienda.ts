
export interface Tienda {
    ID_tienda: string;
    nombre : string;
    fechaSuscripcion? : string ;
    direccion : string;
    enlace : string;
    fotos? : string;
    uid? : string;
    descripcion? : string;
}
export interface MiniTienda {
    ID_tienda : string;
    nombre : string;
    enlace : string;
    fotos? : string;
}

export interface Producto {
    ID_producto: string;
    ID_tienda?: string|null;
    referencia: string;
    nombre: string;
    descripcion: string;
    foto:string;
    categorias:string[];
    nutriscore?:string;
    tiendas?:MiniTienda[];
}

export const tiendaVacia = {
    ID_tienda: '',
    nombre : '',
    fechaSuscripcion : formatDate(new Date(0)),
    direccion : '',
    enlace : '',
    descripcion : '',
    fotos : '',
} as Tienda;

export const productoVacio = {
    ID_producto: '',
    ID_tienda: '',
    nombre: '',
    referencia: '',
    descripcion: '',
    foto:'',
    categorias:[],
} as Producto;


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