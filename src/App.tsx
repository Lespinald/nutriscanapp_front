import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home/Home';
import Scan from './pages/Scan/Scan';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import AppLayout from './pages/AppLayout';
import MenuPerfil from './pages/Personal/MenuPerfil';
import Checkout from './pages/Pasarela/Checkout';
import FormPerfil from './pages/Personal/FormPerfil';
import RecivePasarela from './pages/Pasarela/RecivePasarela';
import MenuTienda from './pages/Tienda/MenuTienda';
import ComprarTienda from './pages/CompraTienda/ComprarTienda';
import Inicio from './pages/Home/Inicio';
import InicioLoggin from './pages/InicioLoggin/InicioLoggin';
import NotFound from './pages/404/NotFound';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import BusquedaDesktop from './pages/Scan/BusquedaDesktop';
import { TraerInfoTienda, TraerInfoUsuario, TraerProductosTienda } from './assets/Utils';
import { login } from './redux/authSlice';
import { Usuario } from './assets/models/usuario';
import { setProductos, setTienda } from './redux/tiendaSlice';
import MenuCarga from './assets/MenuCarga/MenuCarga';

function App() {
  const dispatch = useDispatch(); // Aquí usamos useNavigate
  const navigate = useNavigate(); // Aquí usamos useNavigate
  const [loading, setLoading] = useState(false)
  const authenticated = useSelector((state:any) => state.auth.status === 'authenticated')

  useEffect(() => {
    if (auth.currentUser) {
      // Indicar que se debe redirigir al usuario
      GetInfoUser(auth.currentUser.uid)
    }
    
  }, []);
  
  const GetInfoUser = async(uid:string) => {
    setLoading(true)
    let resp = await TraerInfoUsuario(uid);
    if(resp){
      dispatch(login({infoUsuario:resp}));
    }
    let resps = await TraerInfoTienda(uid);
    if(resps){
      console.log("🚀 ~ GetInfoUser ~ resps:", resps);
      dispatch(setTienda({tienda:resps}));
      let products = await TraerProductosTienda(resps?.ID_tienda);
      if(products){
        console.log("🚀 ~ GetInfoUser ~ resps:", products);
        dispatch(setProductos({productos:products}));
      }
    }
    setLoading(false)
  }
  
  const RedirecLoggeoAutomatico = (ruta:string) => {
    // Redirigir al usuario a la página de inicio de sesión usando navigate
    navigate(ruta, { replace: true });
  }

  return (
    <>
      <MenuCarga isOpen={loading}/>
      <Routes>
        <Route element={authenticated?<AppLayout/>:<Layout/>}>
          <Route path=':section?' element={<Home/>}/>
          <Route path='/pago/:info' element={<Checkout/>}/>
          <Route path='/responseFactura' element={<RecivePasarela/>}/>
          <Route path='/ComprarTienda' element={<ComprarTienda/>}/>
        </Route>
        <Route path='Registro' element={<Registro/>}/>
        <Route path='Login' element={<Login/>}/>
        <Route path='Cargando' element={<MenuCarga isOpen={true}/>}/>
        

        <Route path="Home" element={<Navigate to="/" replace/>} />

        <Route path='app' element={<AppLayout/>}>
          <Route path='Home' element={<InicioLoggin/>}/>
          <Route path='Pago/:info' element={<Checkout/>}/>
          <Route path='Scan' element={<Scan/>}/>
          <Route path='Busqueda' element={<BusquedaDesktop/>}/>
          <Route path='Perfil' element={<MenuPerfil/>}/>
          <Route path='EditPerfil' element={<FormPerfil/>}/>
          <Route path='Tienda' element={<MenuTienda/>}/>
          <Route path='ComprarTienda' element={<ComprarTienda/>}/>
        </Route>

        <Route path="*" element={<NotFound/>}/>
      </Routes>  
    </>
  );
}

export default App
