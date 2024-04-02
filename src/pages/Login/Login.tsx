import React, { useEffect, useState } from 'react'
import style from './login.module.css'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase'
import { convertirUsuario } from '../../assets/models/usuario';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const googleProvider = new GoogleAuthProvider();

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authenticated = useSelector((state:any) => state.auth.status === 'authenticated')
    console.log("🚀 ~ Login ~ authenticated:", authenticated)

    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')

    const HandleLogInEmail = async (e: React.UIEvent) => {
        e.preventDefault();
        if (!address || !password) {
            console.log("Dirección de correo electrónico o contraseña faltante");
            return;
        }
        try {
            console.log("Dirección de correo electrónico:", address, "Contraseña:", password);
            const result = await signInWithEmailAndPassword(auth, address, password);
            console.log("Resultado del inicio de sesión:", result);
            TraerInfoUsuario(result?.user?.uid)
        } catch (error:any) {
            console.error("Error al iniciar sesión:", error.message);
            alert(error.message)
        }
    }

    const HandleLogInPopup = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            if (user) {
                return user.uid;
            } else {
                dispatch(logout())
                alert('Error al iniciar sesión con Google');
                return'Error'
            }
          } catch (error) {
            dispatch(logout())
            console.log("🚀 ~ IniciarSesionConGoogle ~ error:", error);
            alert('Error al iniciar sesión con Google');
            return'Error'
          }
    }

    const TraerInfoUsuario = (uid:string) => {
        // ==========================FUNCION TRAER DATOS USUARIO====================================
        fetch(`http://api.nutriscan.com.co:443/api/usuarios/${uid}`)
        .then(respuesta => {
            console.log("🚀 ~ HandleGoogle ~ respuesta:", respuesta)
            return respuesta.json()
        })
        .then(datos => {
            console.log("🚀 ~ HandleGoogle ~ datos:", datos)
            let usuario = convertirUsuario(
                datos.id,
                datos.nombre,
                datos.fechaSuscripcion,
                datos.fechaDeNacimiento,
                datos.altura/100,
                datos.peso,
                datos.telefono,
                datos.correo
                )
            dispatch(login({infoUsuario:usuario}))
            localStorage.setItem('accessToken', auth.currentUser?.accessToken);
            console.log("🚀 ~ TraerInfoUsuario ~ auth.currentUser?.accessToken:", auth.currentUser?.accessToken)
            navigate('/')
            console.log("🚀 ~ HandleGoogle ~ usuario:", usuario)
        });

    }

    const HandleGoogle = async(e: React.UIEvent) => {
        e.preventDefault()
        try{
            var uid = await HandleLogInPopup()
            if (uid === 'Error') {dispatch(logout())} else {TraerInfoUsuario(uid)};
        }catch (error:any){
            console.log("🚀 ~ HandleGoogle ~ error:", error)
            alert(error.message)
        }
    }

    const PruebaToken = (e: React.UIEvent) => {
        e.preventDefault();
        var user = auth.currentUser;
        if (user) {
        user.getIdToken()
            .then(function(idToken) {
            console.log("Token:", idToken);
            // Aquí puedes enviar el token a tu backend vía HTTPS si es necesario
            })
            .catch(function(error) {
            console.error("Error al obtener el token:", error);
            // Manejar el error aquí
            });
        } else {
        console.error("No hay ningún usuario autenticado.");
        // Manejar el caso donde no hay usuario autenticado
        }
    }
    

    return (
        <div className={style.fondoLogin}>
            <h1 className={style.loginTitle}>BIENVENIDO DE NUEVO</h1>
            <form className={style.login} style={{display:'flex',flexDirection:'column'}}>
                <input autoComplete='true' type='email' id='email' placeholder='Correo' value={address} onChange={e => setAddress(e.currentTarget.value)}></input>
                <input autoComplete='true' type='password' id='password' placeholder='Contraseña' value={password} onChange={e => setPassword(e.currentTarget.value)}></input>
                <button onClick={HandleLogInEmail} className={style.button_logIn} style={{marginTop:'19px'}}>
                    Iniciar sesión
                </button>
                <div className='fondoLogin-line'></div>
                <button onClick={PruebaToken} className={style.button_google}>
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