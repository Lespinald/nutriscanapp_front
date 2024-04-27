import React, { useEffect } from 'react'
import { Navigate, Routes, Route, useNavigate } from 'react-router-dom'
import AppLayout from './pages/AppLayout'
import Scan from './pages/Scan/Scan'
import MenuPerfil from './pages/Personal/MenuPerfil'
import FormPerfil from './pages/Personal/FormPerfil'
import MenuTienda from './pages/Tienda/MenuTienda'
import { useSelector } from 'react-redux'

const RoutasPrivadas = () => {
    const authenticated = useSelector((state:any) => state.auth.status === 'authenticated')
    const infoUsuario = useSelector((state:any) => state.auth.infoUsuario)
    const navigate = useNavigate()

    useEffect(() => {
        console.log("🚀 ~ useEffect ~ authenticated:", authenticated)
      if(!authenticated || infoUsuario === null){
        console.log("🚀 ~ useEffect ~ authenticated:", authenticated)
        navigate('/')
      }
    }, [])
    

  return (
    <>
        <Routes>
            <Route path='Scan' element={<Scan/>}/>
            <Route path='Perfil' element={<MenuPerfil/>}/>
            <Route path='EditPerfil' element={<FormPerfil/>}/>
            <Route path='Tienda' element={<MenuTienda/>}/>
        </Routes>
    </>
  )
}

export default RoutasPrivadas
