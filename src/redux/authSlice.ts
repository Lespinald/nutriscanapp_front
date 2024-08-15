import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../firebase';
import { Usuario, usuarioVacio } from '../assets/models/usuario';

interface ReduxAuth{
    status:string;
    infoUsuario:Usuario;
    historialBusquedas:string[];
}

const authSlice = createSlice({
    name:'auth',
    initialState:{
        status:'not-authenticated',
        infoUsuario:usuarioVacio,
        historialBusquedas:[],
    },
    reducers:{
        login:(state,{payload}) =>{
            state.status = 'authenticated';
            state.infoUsuario = payload.infoUsuario;
        },
        editPerfil:(state,{payload}) =>{
            state.infoUsuario = payload.infoUsuario;
        },
        pushBusqueda: (state: ReduxAuth, action: { payload: string }) => {
            if (state.historialBusquedas.includes(action.payload)) {
                return  // Si ya existe, no lo agrega
            }
            state.historialBusquedas.push(action.payload);
        
            // Verifica si el tamaño supera los 10 elementos
            if (state.historialBusquedas.length > 10) {
                state.historialBusquedas.shift(); // Elimina el primer elemento
            }
             
        },
        logout:(state) =>{
            state.status = 'not-authenticated';
            state.infoUsuario = usuarioVacio;
            localStorage.removeItem('accessToken');    
        },
        chekingCredentials:(state)=>{
            state.status = 'checking';
        }
    }
});

export const { login, logout, editPerfil, chekingCredentials, pushBusqueda } = authSlice.actions;
export default authSlice.reducer;