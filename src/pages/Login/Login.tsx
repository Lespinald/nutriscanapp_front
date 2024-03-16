import React, { useState } from 'react'
import './login.css'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { firebaseAuth } from '../../firebase'

const googleProvider = new GoogleAuthProvider();

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

    const HandleGoogle = async(e: React.UIEvent) => {
        e.preventDefault()
        try{
            const result = await signInWithPopup(firebaseAuth,googleProvider)
            const {displayName,email,uid,photoURL} = result?.user;        
            console.log("🚀 ~ HandleGoogle ~ displayName,email,uid,photoURL:", displayName,email,uid,photoURL)
            const { creationTime } = result?.user?.metadata;
            console.log("🚀 ~ HandleGoogle ~ creationTime:", creationTime)
        }catch (error){
            console.log("🚀 ~ HandleGoogle ~ error:", error)
        }
    }


    return (
        <div className='fondoLogin'>
            <h1 className='loginTitle'>BIENVENIDO</h1>
            <form style={{display:'flex',flexDirection:'column'}}>
                <input autoComplete='true' type='email' id='email' placeholder='Correo' value={address} onChange={e => setAddress(e.currentTarget.value)}></input>
                <input autoComplete='true' type='password' id='password' placeholder='Contraseña' value={password} onChange={e => setPassword(e.currentTarget.value)}></input>
                <button onClick={HandleLogIn} className='button_logIn'>
                    Iniciar sesión
                </button>
                <div className='fondoLogin-line'></div>
                <button onClick={HandleGoogle} className='button_google'>
                    <img src='\Login\GoogleIcon.png'></img>
                    <p>Continuar con Google</p>
                </button>
            </form>
            <a  className='fondoLogin_label' href='/registro'>¿No tienes cuenta? Ingresa aquí</a>
            <img src='\Login\nutriscanLogo.png' alt='Logo' style={{height:'24svh',maxHeight:'200px',aspectRatio:' 1.3/1'}}></img>
        </div>
    )
}

export default Login
