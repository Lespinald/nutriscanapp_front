import React, { useEffect, useState } from 'react'
import style from './MenuTienda.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Usuario } from '../../assets/models/usuario'
import InputFoto from './../Personal/InputFoto'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { logout } from '../../redux/authSlice'
import { Producto, Tienda, productoVacio, tiendaVacia } from '../../assets/models/tienda'
import EditProducto from './EditProducto'

const MenuTienda = () => {
  const infoUser:Usuario = useSelector((state:any) => state.auth.infoUsuario)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentTienda, setCurrentTienda] = useState<Tienda>(tiendaVacia)
  const [productos, setProductos] = useState<Producto[]>([])

  const HandleInputChange = (fieldName: string) => (e: { target: { value: any } }) => {
    // Si el campo es 'fechaDeNacimiento', convertir el valor a un objeto Date
    const value = e.target.value
    setCurrentTienda({ ...currentTienda, [fieldName]: value });
  };

  const Consulta = () => {
    // Consultar tienda
    setCurrentTienda(tiendaVacia)
  }

  useEffect(() => {
    Consulta()
  }, [])
  

  return (
    <div className={style.fondoPerfil}>
      <h2>Se tiene que verificar que el usuario ya halla tenido activada suscripcion de tienda.</h2>
      <h1>Nombre Tienda</h1>
      <input value={currentTienda.nombre} onChange={(e) => HandleInputChange('nombre')}></input>
      <p>Direccion de tu Tienda</p>
      <input value={currentTienda.direccion} onChange={(e) => HandleInputChange('direccion')}></input>
      <p>La pagina web de tu tienda</p>
      <input value={currentTienda.enlace} onChange={(e) => HandleInputChange('enlace')}></input>
      <EditProducto initialProducto={productoVacio} indice={0}></EditProducto>
    </div>
  )
}

export default MenuTienda
