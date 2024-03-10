import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home/Home';
import Scan from './pages/Scan/Scan';
import Login from './pages/Login/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Scan' element={<Scan/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
