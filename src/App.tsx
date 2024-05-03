import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import PublicidadTienda from './pages/Publicidad/PublicidadTienda';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<Layout/>}>
          <Route path=':section?' element={<Home/>}/>
          <Route path='/pago/:info' element={<Checkout/>}/>
          {/* <Route path='/responseFactura' element={<RecivePasarela/>}/> */}
          <Route path='/responseFactura' element={<PublicidadTienda/>}/>
        </Route>
        <Route path='Registro' element={<Registro/>}/>
        <Route path='Login' element={<Login/>}/>
        

        <Route path="Home" element={<Navigate to="/" replace/>} />

        <Route path='app' element={<AppLayout/>}>
          <Route path='Scan' element={<Scan/>}/>
          <Route path='Perfil' element={<MenuPerfil/>}/>
          <Route path='EditPerfil' element={<FormPerfil/>}/>
          <Route path='Tienda' element={<MenuTienda/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
