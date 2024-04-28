import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import tiendaSlice from './tiendaSlice'

export const store = configureStore({
    reducer:{
        auth: authSlice,
        tienda: tiendaSlice,
    },
})