import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home/Home';
import Scan from './pages/Scan/Scan';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import AppLayout from './pages/AppLayout';
import MenuPerfil from './pages/Personal/MenuPerfil';
import Checkout from './pages/Pasarela/Checkout';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path=':section?' element={<Home/>}/>
          <Route path='/pago/:info' element={<Checkout/>}/>
        </Route>
        <Route path='app' element={<AppLayout/>}>
          <Route path='Scan' element={<Scan/>}/>
          <Route path='Perfil' element={<MenuPerfil/>}/>
        </Route>
        <Route path='Registro' element={<Registro/>}/>
        <Route path='Login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
