export interface Historial {
    ID_dia: number | string;
    ID_producto: number | string;
    calorias:number;
    comido:boolean;
    redireccion:boolean;
    createdAt: string;
    fecha:string;
    uid:string;
    updatedAt: string;
}

export const historialTiendaData: Historial[] = [
    {
        ID_dia: 1,
        ID_producto: 501,
        redireccion: true,
        createdAt: "2024-06-06T10:00:00Z",
        fecha: "2024-06-05",
        uid: "user1",
        updatedAt: "2024-06-06T10:00:00Z",
        calorias: 0,
        comido: false
    },
    {
        ID_dia: 2,
        ID_producto: 502,
        redireccion: false,
        createdAt: "2024-06-05T11:00:00Z",
        fecha: "2024-06-05",
        uid: "user2",
        updatedAt: "2024-06-05T11:00:00Z",
        calorias: 0,
        comido: false
    },
    {
        ID_dia: 3,
        ID_producto: 503,
        redireccion: true,
        createdAt: "2024-06-04T12:00:00Z",
        fecha: "2024-06-04",
        uid: "user3",
        updatedAt: "2024-06-04T12:00:00Z",
        calorias: 0,
        comido: false
    },
    {
        ID_dia: 4,
        ID_producto: 504,
        redireccion: false,
        createdAt: "2024-06-03T13:00:00Z",
        fecha: "2024-06-03",
        uid: "user4",
        updatedAt: "2024-06-03T13:00:00Z",
        calorias: 0,
        comido: false
    },
    {
        ID_dia: 5,
        ID_producto: 505,
        redireccion: true,
        createdAt: "2024-06-02T14:00:00Z",
        fecha: "2024-06-02",
        uid: "user5",
        updatedAt: "2024-06-02T14:00:00Z",
        calorias: 0,
        comido: false
    },
    {
        ID_dia: 6,
        ID_producto: 506,
        redireccion: false,
        createdAt: "2024-06-01T15:00:00Z",
        fecha: "2024-06-01",
        uid: "user6",
        updatedAt: "2024-06-01T15:00:00Z",
        calorias: 0,
        comido: false
    },
    {
        ID_dia: 7,
        ID_producto: 507,
        redireccion: true,
        createdAt: "2024-05-31T16:00:00Z",
        fecha: "2024-05-31",
        uid: "user7",
        updatedAt: "2024-05-31T16:00:00Z",
        calorias: 0,
        comido: false
    },
    {
        ID_dia: 8,
        ID_producto: 508,
        redireccion: false,
        createdAt: "2024-05-30T17:00:00Z",
        fecha: "2024-05-30",
        uid: "user8",
        updatedAt: "2024-05-30T17:00:00Z",
        calorias: 0,
        comido: false
    },
    {
        ID_dia: 9,
        ID_producto: 509,
        redireccion: true,
        createdAt: "2024-05-29T18:00:00Z",
        fecha: "2024-05-29",
        uid: "user9",
        updatedAt: "2024-05-29T18:00:00Z",
        calorias: 0,
        comido: false
    },
    {
        ID_dia: 10,
        ID_producto: 510,
        redireccion: false,
        createdAt: "2024-05-28T19:00:00Z",
        fecha: "2024-05-28",
        uid: "user10",
        updatedAt: "2024-05-28T19:00:00Z",
        calorias: 0,
        comido: false
    },
    {
        ID_dia: 10,
        ID_producto: 510,
        redireccion: true,
        createdAt: "2024-05-28T19:00:00Z",
        fecha: "2024-05-28",
        uid: "user10",
        updatedAt: "2024-05-28T19:00:00Z",
        calorias: 0,
        comido: false
    },
    {
        ID_dia: 10,
        ID_producto: 510,
        redireccion: true,
        createdAt: "2024-05-28T19:00:00Z",
        fecha: "2024-05-28",
        uid: "user10",
        updatedAt: "2024-05-28T19:00:00Z",
        calorias: 0,
        comido: false
    }
];
