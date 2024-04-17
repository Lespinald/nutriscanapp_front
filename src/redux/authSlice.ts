import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:'auth',
    initialState:{
        status:'not-authenticated',
        infoUsuario:null,
    },
    reducers:{
        login:(state,{payload}) =>{
            state.status = 'authenticated';
            state.infoUsuario = payload.infoUsuario;

        },
        logout:(state) =>{
            state.status = 'not-authenticated';
            state.infoUsuario = null;
            localStorage.removeItem('accessToken'); 
        },
        chekingCredentials:(state)=>{
            state.status = 'checking';
        }
    }
});

export const { login, logout, chekingCredentials } = authSlice.actions;
export default authSlice.reducer;