import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Producto, Tienda, tiendaVacia } from '../assets/models/tienda';

interface ReduxTienda{
    currentTienda:Tienda | null;
    productos: Producto[];
}

const initialState:ReduxTienda = {
    currentTienda: null,
    productos: [],
} as unknown as ReduxTienda

const tiendaSlice = createSlice({
    name:'tienda',
    initialState,
    reducers:{
        setTienda:(state,action: PayloadAction<{tienda:Tienda}>) =>{
            state.currentTienda = action.payload.tienda;
        },
        agregarProducto: (state, action: PayloadAction<{ producto: Producto }>) => {
            state.productos.push(action.payload.producto);
        },
        modificarProducto: (state, action: PayloadAction<{ producto: Producto, indice:number }>) => {
            const { producto, indice } = action.payload;
            if (indice >= 0 && indice < state.productos.length) {
                state.productos[indice] = producto;
            } else {
                console.error("Índice fuera de rango");
            }
        },
        clean:(state) =>{
            state.currentTienda = null;
            state.productos = [];
        }
    }
});

export const { setTienda, agregarProducto, modificarProducto, clean } = tiendaSlice.actions;
export default tiendaSlice.reducer;