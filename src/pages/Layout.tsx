import style from "./Layout.module.css"

import { useEffect, 
  // useMemo,
   useRef, useState } from "react";

import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  const layout = useRef<HTMLElement>(null)
  const [layoutHeight, setLayoutHeight] = useState<number>(64);

  let observer = new ResizeObserver((entries) => {
    setLayoutHeight(entries[0].target.clientHeight)
  });

  useEffect(() => {
    if(layout.current) observer.observe(layout.current)
    
    return () => {
      observer.disconnect()
    }
  }, []);

  return (
    <>
    <nav className={style.layoutNav} ref={layout}>
      <DesktopLayout/>
    </nav>
    <div className={style.outlet} style={{marginTop: `${layoutHeight}px`}}>
      <Outlet/>
    </div>
    </>
  );
}

const DesktopLayout = () => {
  return (
    <>
      <Link className={style.homeLogo} to="/">
        <img className={style.maintainRatio} src="/Layout/logo.png" alt="logo"></img>
      </Link>
      <Link to="/">Inicio</Link>
      <Link to="/equipo">¿Quienes somos?</Link>
      <Link to="/servicios">Servicios</Link>
      <Link className={style.loginLink} to="/Login">Ingresa</Link>
      <Link className={style.registerLink} to="/Registro">Registrate</Link>
    </>
  );
}

export default Layout;
