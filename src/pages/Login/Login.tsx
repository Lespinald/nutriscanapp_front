import React, { useState } from 'react'
import style from './login.module.css'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase'
import { convertirUsuario } from '../../assets/models/usuario';
// import { useDispatch } from 'react-redux';
// import { login, logout } from '../../redux/authSlice';

const googleProvider = new GoogleAuthProvider();

const Login = () => {

    // const dispatch = useDispatch()

    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')

    const HandleLogIn = async (e: React.UIEvent) => {
        e.preventDefault()
        if(!address || !password) return;
        console.log("pages/Inicio/Login.tsx ~ address:", address, "password:", password);
        const result = await signInWithEmailAndPassword(auth, address, password);
        console.log("pages/Inicio/Login.tsx ~ result:", result);
    }

    const HandleGoogle = async(e: React.UIEvent) => {
        e.preventDefault()
        try{
            const result = await signInWithPopup(auth,googleProvider)
            const {displayName,email,uid,photoURL} = result?.user;        
            console.log("🚀 ~ HandleGoogle ~ displayName,email,uid,photoURL:", displayName,email,uid,photoURL)
            const { creationTime } = result?.user?.metadata;
            console.log("🚀 ~ HandleGoogle ~ creationTime:", creationTime)
            // ==========================FUNCION TRAER DATOS USUARIO====================================
            // fetch(`http://192.168.1.6:3000/api/usuarios/${123456}`)
            // .then(respuesta => {
            //     console.log("🚀 ~ HandleGoogle ~ respuesta:", respuesta)
            //     return respuesta.json()
            // })
            // .then(datos => {
            //     console.log("🚀 ~ HandleGoogle ~ datos:", datos)
            //     let usuario = convertirUsuario(
            //         datos.id,
            //         datos.nombre,
            //         datos.fechaSuscripcion,
            //         datos.fechaDeNacimiento,
            //         datos.altura/100,
            //         datos.peso,
            //         datos.telefono,
            //         datos.correo
            //         )
            //     console.log("🚀 ~ HandleGoogle ~ usuario:", usuario)
            // });
        }catch (error){
            console.log("🚀 ~ HandleGoogle ~ error:", error)
        }
    }


    return (
        <div className={style.fondoLogin}>
            <h1 className={style.loginTitle}>BIENVENIDO DE NUEVO</h1>
            <form className={style.login} style={{display:'flex',flexDirection:'column'}}>
                <input autoComplete='true' type='email' id='email' placeholder='Correo' value={address} onChange={e => setAddress(e.currentTarget.value)}></input>
                <input autoComplete='true' type='password' id='password' placeholder='Contraseña' value={password} onChange={e => setPassword(e.currentTarget.value)}></input>
                <button onClick={HandleLogIn} className={style.button_logIn} style={{marginTop:'19px'}}>
                    Iniciar sesión
                </button>
                <div className='fondoLogin-line'></div>
                <button onClick={HandleGoogle} className={style.button_google}>
                    <img src='\Login\GoogleIcon.png'></img>
                    <p>Continuar con Google</p>
                </button>
            </form>
            <a  className={style.fondoLogin_label} href='/Registro'>¿No tienes cuenta? Ingresa aquí</a>
            <img src='\Login\nutriscanLogo.png' alt='Logo' style={{height:'-webkit-fill-available',maxHeight:'150px',aspectRatio:' 1/1.5'}}></img>
        </div>
    )
}

export default Login
