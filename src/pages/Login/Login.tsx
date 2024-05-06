import React, { useState } from 'react'
import style from './login.module.css'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { convertirUsuario, toUsuario, usuarioVacio } from '../../assets/models/usuario';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import MenuCarga from '../../assets/MenuCarga/MenuCarga';
import useBaseDatos from '../../storage/useBaseDatos';
import { useStorge } from '../../hooks/useStorage';

const googleProvider = new GoogleAuthProvider();

const Login = () => {

    const { obtenerURL } = useStorge();
    const { recogerDoc } = useBaseDatos();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authenticated = useSelector((state:any) => state.auth.status === 'authenticated')
    console.log("🚀 ~ Login ~ authenticated:", authenticated)

    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')

    const HandleLogInEmail = async (e: React.UIEvent) => {
        e.preventDefault();
        if (!address || !password) {
            console.log("Dirección de correo electrónico o contraseña faltante");
            return;
        }
        try {
            setLoading(true)
            console.log("Dirección de correo electrónico:", address, "Contraseña:", password);
            const result = await signInWithEmailAndPassword(auth, address, password);
            console.log("Resultado del inicio de sesión:", result);
            TraerInfoUsuario(result?.user?.uid)
        } catch (error:any) {
            setLoading(false)
            signOut(auth)
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
        setLoading(true)
        // ==========================FUNCION TRAER DATOS USUARIO====================================
        fetch(`https://api.nutriscan.com.co/api/usuarios/${uid}`)
        .then(respuesta => {
            console.log("🚀 ~ HandleGoogle ~ respuesta:", respuesta)
            if (!respuesta.ok) {
                throw new Error('Error en la solicitud');
            }
            return respuesta.json()
        })
        .then(async datos => {
            console.log("🚀 ~ HandleGoogle ~ datos:", datos)
            let resp = await obtenerURL(`gs://nutriscan-9f5cf.appspot.com/${datos.uid}/fotoPerfil.png`)
            console.log("🚀 ~ TraerInfoUsuario ~ resp:", resp)
            let usuario = convertirUsuario(
                datos.uid,
                datos.nombre,
                datos.fechaSuscripcion,
                datos.fechaDeNacimiento,
                datos.altura,
                datos.peso,
                datos.telefono,
                datos.correo,
            )
            usuario.foto = resp,
            dispatch(login({infoUsuario:usuario}))
            setLoading(false)
            navigate('/app/Perfil')
            console.log("🚀 ~ HandleGoogle ~ usuario:", usuario)
        })
        .catch(error => {
            console.error('Error en la solicitud fetch:', error);
            signOut(auth)
            setLoading(false)
            alert('Error en consulta a base de datos')
            // Aquí puedes manejar el error como desees, por ejemplo, mostrar un mensaje al usuario
        });
    }
    
    const TraerInfoUsuarioFirestore = async (uid:string) => {
        setLoading(true)
        const resp = await recogerDoc('usuarios/'+ uid)
        if(resp !== null){
            dispatch(login({infoUsuario:toUsuario(resp)}))
            setLoading(false)
            navigate('/app/Scan')
        }else{
            setLoading(false)
            alert('Error en consulta a base de datos')
        }
    }

    const HandleGoogle = async(e: React.UIEvent) => {
        e.preventDefault()
        try{
            setLoading(true)
            var uid = await HandleLogInPopup()
            if (uid === 'Error') { signOut(auth); dispatch(logout())} else {TraerInfoUsuario(uid)};
        }catch (error:any){
            console.log("🚀 ~ HandleGoogle ~ error:", error)
            setLoading(false)
            alert(error.message)
        }
    }
    

    return (
        <div className={style.fondoLogin}>
            <MenuCarga isOpen={loading}/>
            <Link className={style.backButton} to={'/Home'}>
                <svg xmlns="http://www.w3.org/2000/svg" height="3svh" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="3svh" xmlSpace="preserve" fill='white'>
                    <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
                </svg>
            </Link>
            <h1 className={style.loginTitle}>BIENVENIDO DE NUEVO</h1>
            <form className={style.login} style={{display:'flex',flexDirection:'column'}}>
                <input autoComplete='true' type='email' id='email' placeholder='Correo' value={address} onChange={e => setAddress(e.currentTarget.value)}></input>
                <input autoComplete='true' type='password' id='password' placeholder='Contraseña' value={password} onChange={e => setPassword(e.currentTarget.value)}></input>
                <button onClick={HandleLogInEmail} className={style.button_logIn} style={{marginTop:'19px'}}>
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
