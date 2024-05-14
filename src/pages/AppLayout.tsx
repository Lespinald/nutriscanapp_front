import style from "./Layout.module.css"

import { CSSProperties, useEffect, useRef, useState } from "react";

import { Link, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { IsMobile } from "../assets/Utils";
import { useViewportRezise } from "../assets/hooks";
import ProfileLogo from "../assets/Components/ProfileLogo";
import { useSelector } from "react-redux";
import TiendaLogo from "../assets/Components/TiendaLogo";
import MenuLogo from "../assets/Components/MenuLogo";

type AppLayoutContext = {
  size: {width: number, height: number};
  mobile: boolean;
}

const AppLayout = () => {
  
  const authenticated = useSelector((state:any) => state.auth.status === 'authenticated')
  const infoUsuario = useSelector((state:any) => state.auth.infoUsuario)
  const navigate = useNavigate()

  const layout = useRef<HTMLElement>(null)
  const [layoutHeight, setLayoutHeight] = useState<number>(64);
  const [mobile, setMobile] = useState<boolean>(IsMobile());

  const size = useViewportRezise();

  let observer = new ResizeObserver((entries) => {
    setLayoutHeight(entries[0].target.clientHeight)
  });

  const GetTipoSuscripcion = ():string => {
    if(infoUsuario?.tipoSuscripcion === 'gratis'){
      return 'FREE'
    }else{
      if(infoUsuario?.fechaSuscripcion < new Date()){
        return infoUsuario?.tipoSuscripcion 
      }
      return 'FREE'
    }
  }

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ authenticated:", authenticated)
    if(!authenticated || infoUsuario === null){
      console.log("🚀 ~ useEffect ~ authenticated:", authenticated)
      navigate('/')
    }

    if(layout.current) observer.observe(layout.current)
    
    return () => {
      observer.disconnect()
    }
  }, []);

  useEffect(() => setMobile(IsMobile()), [size]);

  return (
    <>
    <nav className={style.layoutNav} style={{paddingRight:'0'}} ref={layout}>
      <Link className={style.homeLogo} to="/app/Scan" style={mobile ? {margin:'0'} : {}}>
          <img className={style.maintainRatio} src="/Layout/logo.png" alt="logo"></img>
      </Link>
      { mobile?
        <MobileLayout tipoSuscripcion={GetTipoSuscripcion()}/>:
        <DesktopLayout tipoSuscripcion={GetTipoSuscripcion()}/>
      }
    </nav>
    <div className={style.outlet} style={{marginTop: `${layoutHeight}px`}}>
      <Outlet context={{size, mobile} satisfies AppLayoutContext} />
    </div>
    </>
  );
}

interface Props{
  tipoSuscripcion:string;
}

const DesktopLayout = ({tipoSuscripcion}:Props) => {
  const authenticated = useSelector((state:any) => state.auth.status === 'authenticated')

  return (
    <>
      <Link to="/app/Home" style={{padding: "0 0.8rem"}}>
        Inicio
      </Link>
      <Link to="/app/Scan" style={{padding: "0 0.8rem"}}>
        Buscar Producto
      </Link>
      <Link to="/app/Perfil" style={{padding: "0 0.8rem"}}>
        <ProfileLogo style={{stroke: "inherit"}}/>
      </Link>
      <Link to={tipoSuscripcion !== 'tienda' ? "/app/Tienda" : "/app/ComprarTienda"} className={`${style.registerLink} ${style.miTienda}`}>
        <TiendaLogo height="auto" width="3svh"></TiendaLogo>
        <p style={{width:'max-content'}}>Mi Tienda</p>
      </Link>
    </>
  );
}

const MobileLayout = ({tipoSuscripcion}:Props) => {
  const [generalMenu, setGeneralMenu] = useState<boolean>(false);
  const infoUsuario = useSelector((state:any) => state.auth.infoUsuario)

  const generalAnchorRef = useRef<HTMLAnchorElement>(null);
  const navigate = useNavigate()

  const GetStylePerfil = (): CSSProperties => {
    if(generalMenu){
      return {display: "none"};
    }
    return {};
  }
  const GetStyleTienda = (): CSSProperties => {
    if(generalMenu){
      return {display: "none"};
    }
    return {background:'var(--color-1)',height:'100%',padding:'2%',borderRadius:'0'};
  }

  const GetStyleGeneral = (): CSSProperties => {
    if(generalMenu){
      return {alignItems:'center'}
    }
    return {marginRight:'auto'}
  }

  const ToggleGeneral = () => {
    setGeneralMenu(prev => !prev);
  }

  useEffect(() => {
    if(generalMenu) generalAnchorRef.current?.focus()
  }, [generalMenu]);

  return (
    <>
      <button style={GetStyleGeneral()}
        onClick={ToggleGeneral}>
        <MenuLogo style={{stroke: "inherit"}}/>
      </button>
      <button style={GetStylePerfil()} onClick={() => navigate('/app/Perfil')}>
        <ProfileLogo style={{stroke: "inherit"}}/>
      </button>
      <button style={GetStyleTienda()} className={style.registerLink} onClick={() => navigate(tipoSuscripcion === 'tienda' ? "/app/Tienda" : "/app/ComprarTienda")}>
        <TiendaLogo height="40" width="40"/>
      </button>
      <div className={`${generalMenu? style.openGeneral: ""} ${style.menu}`}
        onMouseLeave={ToggleGeneral}>
        <Link ref={generalAnchorRef} to="/app/Home">Inicio</Link>
        <Link to="/app/Scan">Buscar Producto</Link>
        <Link to="/app/Perfil">Ver Perfil</Link>
        <Link to={tipoSuscripcion !== 'tienda' ? "/app/Tienda" : "/app/ComprarTienda"}>Ver Mi Tienda</Link>
      </div>
    </>
  );
}

export function useAppLayoutContext() {
  return useOutletContext<AppLayoutContext>();
}

export default AppLayout;
