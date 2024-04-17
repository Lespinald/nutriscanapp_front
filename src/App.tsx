import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home/Home';
import Scan from './pages/Scan/Scan';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth } from './firebase';
import { signInWithCustomToken } from 'firebase/auth';
import AppLayout from './pages/AppLayout';
import MenuPerfil from './pages/Personal/MenuPerfil';
import Checkout from './pages/Pasarela/Checkout';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/:section?' element={<Home/>}/>
          <Route path='/pago/:info' element={<Checkout/>}/>
        </Route>
        <Route path='/app' element={<AppLayout/>}>
          <Route path='/app/Scan' element={<Scan/>}/>
          <Route path='/app/Perfil' element={<MenuPerfil/>}/>
        </Route>
        <Route path='/Registro' element={<Registro/>}/>
        <Route path='/Login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
