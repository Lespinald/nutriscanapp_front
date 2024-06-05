import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import tiendaSlice from './tiendaSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
    reducer:{
        auth: authSlice,
        tienda: tiendaSlice,
    },
})


export const useAppDispatch: () => typeof store.dispatch=useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;