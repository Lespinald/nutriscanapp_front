import React, { useState } from 'react'
import './login.css'
import { useDispatch } from 'react-redux'
import { chekingCredentials } from '../../redux/authSlice'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../../firebase'

const Login = () => {

    const dispatch = useDispatch()

    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')

    const HandleLogIn = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        // dispatch(chekingCredentials())
        console.log("🚀 ~ HandleLogIn ~ password:", password)
        console.log("🚀 ~ HandleLogIn ~ address:", address)
        const result = await signInWithEmailAndPassword(firebaseAuth,address,password)
        console.log("🚀 ~ HandleLogIn ~ result:", result)
    }


    return (
        <div>
        <h1>BIENVENIDO DE NUEVO</h1>
        <form>
            <input type='text' placeholder='Correo' value={address} onChange={(e) => setAddress(e.currentTarget.value)}></input>
            <input type='password' placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.currentTarget.value)}></input>
            <label>¿Sin cuenta aún? <a>Ingresa aquí</a></label>
            <button onClick={(e) => HandleLogIn(e)}>Iniciar sesión</button>
        </form>
        <img src='*' alt='Logo'></img>
        <label>NutriScan</label>
        </div>
    )
}

export default Login
