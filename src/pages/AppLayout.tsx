import style from "./Layout.module.css"

import { CSSProperties, useEffect, 
  // useMemo,
   useRef, useState } from "react";

import { Link, Outlet, useOutletContext } from "react-router-dom";
import { IsMobile } from "../assets/Utils";
import { useViewportRezise } from "../assets/hooks";
import ProfileLogo from "../assets/Components/ProfileLogo";
import MenuLogo from "../assets/Components/MenuLogo";
import { useSelector } from "react-redux";

type HomeLayoutContext = {
  size: {width: number, height: number};
  mobile: boolean;
}

const AppLayout = () => {
  const layout = useRef<HTMLElement>(null)
  const [layoutHeight, setLayoutHeight] = useState<number>(64);
  const [mobile, setMobile] = useState<boolean>(IsMobile());

  const size = useViewportRezise();

  let observer = new ResizeObserver((entries) => {
    setLayoutHeight(entries[0].target.clientHeight)
  });

  useEffect(() => {
    if(layout.current) observer.observe(layout.current)
    
    return () => {
      observer.disconnect()
    }
  }, []);

  useEffect(() => setMobile(IsMobile()), [size]);

  return (
    <>
    <nav className={style.layoutNav} ref={layout}>
      <Link className={style.homeLogo} to="/">
          <img className={style.maintainRatio} src="/Layout/logo.png" alt="logo"></img>
      </Link>
      <MobileLayout/>
    </nav>
    <div className={style.outlet} style={{marginTop: `${layoutHeight}px`}}>
      <Outlet context={{size, mobile} satisfies HomeLayoutContext} />
    </div>
    </>
  );
}

export function useHomeLayoutContext() {
  return useOutletContext<HomeLayoutContext>();
}

const DesktopLayout = () => {
  
  const authentication = useSelector((state:any) => state.auth.status !== 'not-authenticated')
  return (
    <>
      <Link to="/">Inicio</Link>
      <Link to="/equipo">¿Quienes somos?</Link>
      <Link to="/objetivos">Mision &&nbsp;Vision</Link>
      <Link to="/servicios">Servicios</Link>
      <Link className={style.loginLink} to="/Login">Ingresa</Link>
      <Link className={style.registerLink} to="/Registro">Registrate</Link>  
    </>
  );
}

const MobileLayout = () => {

  const authentication = useSelector((state:any) => state.auth.status !== 'not-authenticated')

  const [profileMenu, setProfileMenu] = useState<boolean>(false);
  const [generalMenu, setGeneralMenu] = useState<boolean>(false);

  const profileAnchorRef = useRef<HTMLAnchorElement>(null);
  const generalAnchorRef = useRef<HTMLAnchorElement>(null);

  const profileDivRef = useRef<HTMLDivElement>(null);


  const GetStyleProfile = (): CSSProperties => {
    if(generalMenu){
      return {display: "none"};
    }else if(profileMenu){
      return {margin: "0.5rem 0.4rem auto"}
    }
    return {};
  }
  const GetStyleGeneral = (): CSSProperties => {
    if(profileMenu){
      return {display: "none"};
    }else if(generalMenu){
      return {margin: "0.9rem 0.4rem auto"}
    }
    return {}
  }

  const ToggleProfile = () => {
    setProfileMenu(prev => !prev);
  }
  const ToggleGeneral = () => {
    setGeneralMenu(prev => !prev);
  }

  useEffect(() => {
    if(profileMenu) profileAnchorRef.current?.focus()
  }, [profileMenu]);
  useEffect(() => {
    if(generalMenu) generalAnchorRef.current?.focus()
  }, [generalMenu]);

  return (
    <>
      <button style={GetStyleProfile()}
        onClick={ToggleProfile}>
        <ProfileLogo style={{stroke: "inherit"}}/>
      </button>
      <div className={`${generalMenu? style.openGeneral: ""} ${style.menu}`}
        onMouseLeave={ToggleGeneral}>

        <Link ref={generalAnchorRef} to="/">Inicio</Link>
        <Link to="/equipo">¿Quienes somos?</Link>
        <Link to="/objetivos">Mision &&nbsp;Vision</Link>
        <Link to="/servicios">Servicios</Link>
      </div>
      <div ref={profileDivRef} className={`${profileMenu? style.openProfile: ""} ${style.menu}`}
        onMouseLeave={ToggleProfile}>

        <Link ref={profileAnchorRef} to="/Login">Ingresa</Link>
        <Link to="/Registro">Registrate</Link>
        { authentication && <Link to="Perfil">Ver Perfil</Link>}
      </div>
    </>
  );
}

export default AppLayout;
