export interface Historial {
    ID_dia: number | string;
    ID_producto: number | string;
    calorias:number;
    comido:boolean;
    createdAt: string;
    fecha:string;
    uid:string;
    updatedAt: string;
}

export interface HistorialTienda {
    ID: number | string;
    ID_tienda: number | string;
    ID_producto: number | string;
    redireccion:boolean;
    createdAt: string;
    fecha:string;
    uid:string;
    updatedAt: string;
}