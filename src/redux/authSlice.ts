import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:'auth',
    initialState:{
        status:'not-authenticated',
        uid:null,
        email:null,
        displayName:null,
        errorMessage:null
    },
    reducers:{
        login:(state,{payload}) =>{
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.errorMessage = null;

        },
        logout:(state) =>{
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.errorMessage = null;

        },
        chekingCredentials:(state)=>{
            state.status = 'checking';
        }
    }
});

export const { login, logout, chekingCredentials } = authSlice.actions;
export default authSlice.reducer;