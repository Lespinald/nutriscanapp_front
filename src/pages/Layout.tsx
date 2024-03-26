import "./Layout.css"

import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <nav className="layoutNav">
      <Link className="homeLogo" to="/">
        <img className="maintainRatio" src="/Layout/logo.png" alt="logo"></img>
      </Link>
      <Link to="/">Inicio</Link>
      <Link to="/equipo">¿Quienes somos?</Link>
      <Link to="/servicios">Servicios</Link>
      <Link className="loginLink" to="/Login">Ingresa</Link>
      <Link className="registerLink" to="/Registro">Registrate</Link>
    </nav>
    <div className="outlet">
      <Outlet/>
    </div>
    </>
  );
}

export default Layout;
