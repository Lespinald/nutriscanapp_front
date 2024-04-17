import style from "./Layout.module.css"

import { useEffect, useRef, useState } from "react";

import { Link, Outlet, useOutletContext } from "react-router-dom";
import { IsMobile } from "../assets/Utils";
import { useViewportRezise } from "../assets/hooks";
import ProfileLogo from "../assets/Components/ProfileLogo";

type AppLayoutContext = {
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
      <Link className={style.homeLogo} to="/app/Scan">
          <img className={style.maintainRatio} src="/Layout/logo.png" alt="logo"></img>
      </Link>
      <Link to="/app/Perfil" style={{padding: "0 0.8rem"}}>
        <ProfileLogo style={{stroke: "inherit"}}/>
      </Link>
    </nav>
    <div className={style.outlet} style={{marginTop: `${layoutHeight}px`}}>
      <Outlet context={{size, mobile} satisfies AppLayoutContext} />
    </div>
    </>
  );
}

export function useAppLayoutContext() {
  return useOutletContext<AppLayoutContext>();
}

export default AppLayout;
