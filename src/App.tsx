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

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/:section?' element={<Home/>}/>
          <Route path='/Scan' element={<Scan/>}/>
        </Route>
        <Route path='/Registro' element={<Registro/>}/>
        <Route path='/Login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
