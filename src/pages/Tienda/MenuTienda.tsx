import React, { useState } from 'react'
import style from './MenuTienda.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Usuario } from '../../assets/models/usuario'
import InputFoto from './../Personal/InputFoto'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { logout } from '../../redux/authSlice'

const MenuTienda = () => {
  const infoUser:Usuario = useSelector((state:any) => state.auth.infoUsuario)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const prueba = []

  const Consulta = () => {
    // Consultar tienda
  }

  return (
    <div className={style.fondoPerfil}>
      <h2>Se tiene que verificar que el usuario ya halla tenido activada suscripcion de tienda.</h2>
      <h1>Nombre Tienda</h1>
      <p>Descrip de Tienda Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam, obcaecati non libero accusamus distinctio illum vero recusandae laudantium harum odit? Nobis reprehenderit molestias optio laborum blanditiis quibusdam beatae sequi excepturi?</p>
      {}
    </div>
  )
}

export default MenuTienda
