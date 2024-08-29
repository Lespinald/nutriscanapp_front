import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
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
import InicioLoggin from './pages/InicioLoggin/InicioLoggin';
import NotFound from './pages/404/NotFound';
import { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BusquedaDesktop from './pages/Scan/BusquedaDesktop';
import { TraerInfoTienda, TraerInfoUsuario, TraerProductosTienda, onUserLoad, ActualizarRacha } from './assets/Utils';
import { login } from './redux/authSlice';
import { setProductos, setTienda } from './redux/tiendaSlice';
import MenuCarga from './assets/MenuCarga/MenuCarga';
import DialogCarga from './assets/MenuCarga/DialogCarga';
import { useAppSelector } from './redux/store';
import TerminosYCondiciones from './pages/Registro/TerminosYCondiciones';
import FAQ from './pages/Home/FAQ';
import FootPage from './pages/Home/FootPage';
import ManualDeUsuario from './pages/Home/ManualDeUsuario';
import Contactanos from './pages/Home/Contactanos';
import VerUnaTienda from './pages/Tienda/VerUnaTienda';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Aquí usamos useNavigate
  const [loading, setLoading] = useState(true)
  const autenticado = useAppSelector((state) => state.auth.status === 'authenticated')

  useLayoutEffect(() => {
      onUserLoad(
        user => {
          GetInfoUser(user.uid)
            .then(() => setLoading(false));
        },
        () => setLoading(false)
      );
  }, []);
  
  const GetInfoUser = async(uid:string) => {
    let resp = await TraerInfoUsuario(uid);
    if(resp){
      resp = ActualizarRacha(resp);
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
  }
  
  const RedirecLoggeoAutomatico = (ruta:string) => {
    // Redirigir al usuario a la página de inicio de sesión usando navigate
    navigate(ruta, { replace: true });
  }

  return (
    <>
      <MenuCarga isOpen={loading}/>
      {!loading &&
      <Routes>
        <Route element={autenticado?<AppLayout/>:<Layout/>}>
          <Route path=':section?' element={<>
            <Home/>
            {autenticado && <FootPage/>}
          </>}/>
          <Route path='/Contactanos' element={<>
            <Contactanos/>
            {autenticado && <FootPage/>}
          </>}/>
          <Route path='/FAQ' element={<>
            <FAQ/>
            {autenticado && <FootPage/>}
          </>}/>
          <Route path='/Manual' element={<>
            <ManualDeUsuario/>
            {autenticado && <FootPage/>}
          </>}/>
          <Route path='/pago/:info' element={<>
            <Checkout/>
            {autenticado && <FootPage/>}
          </>}/>
          <Route path='/responseFactura' element={<>
            <RecivePasarela/>
            <FootPage/>
          </>}/>
          <Route path='/ComprarTienda' element={<>
            <ComprarTienda/>
            {autenticado && <FootPage/>}
          </>}/>
          <Route path='Tienda/:idTienda?' element={<>
            <VerUnaTienda/>
            {autenticado && <FootPage/>}
          </>}/>
        </Route>
        
        <Route element={<LayoutWithFooter />}>
          <Route path='terminos_y_condiciones' element={<TerminosYCondiciones />} />
          <Route path='Registro' element={<Registro />} />
          <Route path='Login' element={<Login />} />
          <Route path='Cargando' element={<DialogCarga isOpen={true} color='--color-5' />} />
        </Route>
    
        <Route path="Home" element={<Navigate to="/" replace/>} />

        <Route path='app' element={<AppLayout/>}>
          <Route path='Home' element={
            <>
              <InicioLoggin/>
              <FootPage/>
            </>}/>
          <Route path='Pago/:info' element={
            <>
              <Checkout/>
              <FootPage/>
            </>}/>
          <Route path='Scan' element={
            <>
              <Scan/>
              <FootPage/>
            </>}/>
          <Route path='Busqueda/:idProduct?' element={
            <>
              <BusquedaDesktop/>
              <FootPage/>
            </>}/>
          <Route path='Perfil' element={
            <>
              <MenuPerfil/>
              <FootPage/>
            </>}/>
          <Route path='EditPerfil' element={
            <>
              <FormPerfil/>
              <FootPage/>
            </>}/>
          <Route path='Tienda' element={
            <>
              <MenuTienda/>
              <FootPage/>
            </>}/>
          <Route path='VerTienda/:idTienda?' element={
            <>
              <VerUnaTienda/>
              <FootPage/>
            </>}/>
          <Route path='ComprarTienda' element={
            <>
              <ComprarTienda/>
              <FootPage/>
            </>}/>
        </Route>
        
        <Route path="*" element={<NotFound/>}/>
      </Routes>  
      }
    </>
  );
}

const LayoutWithFooter: React.FC = () => {
  return (
    <>
      <Outlet /> {/* Aquí se renderizarán las rutas anidadas */}
      <FootPage /> {/* Footer común para todas las rutas */}
    </>
  );
};

export default App
