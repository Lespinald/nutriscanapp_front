import { createSlice } from '@reduxjs/toolkit';

const tiendaSlice = createSlice({
    name:'auth',
    initialState:{
        currentTienda:null,
        productos:[],
    },
    reducers:{
        setTienda:(state,{payload}) =>{
            state.currentTienda = payload.tienda;
        },
        agregarProducto:(state,{payload}) =>{
            state.productos = payload.productos;
        },
        clean:(state) =>{
            state.currentTienda = null
            state.productos = []
        }
    }
});

export const { setTienda, agregarProducto, clean } = tiendaSlice.actions;
export default tiendaSlice.reducer;