import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home/Home';
import Scan from './pages/Scan/Scan';
import Login from './pages/Inicio/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Login/>}/>
          <Route path='/Scan' element={<Home/>}/>
          <Route path='/Scan' element={<Scan/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
