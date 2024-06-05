import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../firebase';
import { usuarioVacio } from '../assets/models/usuario';

const authSlice = createSlice({
    name:'auth',
    initialState:{
        status:'not-authenticated',
        infoUsuario:usuarioVacio,
    },
    reducers:{
        login:(state,{payload}) =>{
            state.status = 'authenticated';
            state.infoUsuario = payload.infoUsuario;
        },
        editPerfil:(state,{payload}) =>{
            state.infoUsuario = payload.infoUsuario;
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

export const { login, logout, editPerfil, chekingCredentials } = authSlice.actions;
export default authSlice.reducer;