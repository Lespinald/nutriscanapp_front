import React, { useState } from 'react'
import './login.css'
// import { useDispatch } from 'react-redux'
// import { chekingCredentials } from '../../redux/authSlice'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../../firebase'

const Login = () => {

    // const dispatch = useDispatch()

    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')

    const HandleLogIn = async (e: React.UIEvent) => {
        e.preventDefault()

        if(!address || !password) return;

        console.log("pages/Inicio/Login.tsx ~ address:", address, "password:", password);

        const result = await signInWithEmailAndPassword(firebaseAuth, address, password);
        console.log("pages/Inicio/Login.tsx ~ result:", result);
    }


    return (
        <div>
        <h1>BIENVENIDO DE NUEVO</h1>
        <form>
            <input type='email' id='email' placeholder='Correo' value={address} onChange={e => setAddress(e.currentTarget.value)}></input>
            <input type='password' id='password' placeholder='Contraseña' value={password} onChange={e => setPassword(e.currentTarget.value)}></input>
            <label>¿Sin cuenta aún? <a>Ingresa aquí</a></label>
            <button onClick={HandleLogIn}>Iniciar sesión</button>
        </form>
        <img src='/WhiteBGLogo.png' alt='Logo'></img>
        <label>NutriScan</label>
        </div>
    )
}

export default Login
