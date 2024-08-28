import { Link} from "react-router-dom";
import style from "./styles/Inicio.module.css"
import { forwardRef } from "react";
import { useHomeLayoutContext } from "../Layout";

const Conocenos = forwardRef<HTMLDivElement>(({}, ref) => {

  const {mobile} = useHomeLayoutContext();

  return (
  <div className={(mobile?`${style.mainMobile} `:"") + style.main} ref={ref}>
    {mobile?
    <>
      <img src="/Home/Inicio/textLogo.png" alt="nutriscan" style={{marginBottom:'-1svh'}}/>
      <p className={style.info} style={{color:'var(--color-6)'}}>
        <strong>NutriScan</strong> se enfoca en promover la información de calidad nutricional proporcionando herramiento como nuestro escaner, 
        buscador en la base de datos apoyados por <strong>Open Food Facts</strong> con quienes coolaboramos, graficas de seguimiento para tu proceso 
        y el <strong>nutriscore</strong> elemento que nos da una calificacin de A-E con codigo de color para mejor entendimiento.
      </p>
      <img src="/Home/Inicio/celular.png" alt="bolsa de compra" className={style.compraImgMobile}/>
    </>:
    <>
      <div className={style.colRigth}>
        <p className={style.info} style={{color:'var(--color-6)'}}>
          <strong>NutriScan</strong> se enfoca en promover la información de calidad nutricional proporcionando herramiento como nuestro escaner,
          buscador en la base de datos apoyados por <strong>Open Food Facts</strong> con quienes coolaboramos, graficas de seguimiento para tu proceso 
          y el <strong>nutriscore</strong> elemento que nos da una calificacin de A-E con codigo de color para mejor entendimiento.
        </p>
      </div>
      <img src="/Home/Inicio/desktop.png" alt="bolsa de compra" className={`${style.compraImg} maintainRatio`} />
    </>
    }
    <Background/>
  </div>
  );
}); export default Conocenos;

const Background = () => {
  return(
    <div className="backgroundFill">
      <svg style={{position: "absolute", top: "0%", left: "0%"}}
       width="150" height="150" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse rx="220" ry="220" fill="var(--color-2)" fillOpacity="0.5"/>
      </svg>
      <svg style={{position: "absolute", top: "40%", left: "40%"}}
       width="250" height="250" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="200" cy="200" rx="200" ry="200" fill="var(--color-1)" fillOpacity="0.5"/>
      </svg>
      <svg style={{position: "absolute", bottom: "0%", right: "0%"}}
       width="110" height="300" viewBox="0 0 170 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="200" cy="140" rx="200" ry="200" fill="var(--color-1)" fillOpacity="0.5"/>
      </svg>
      <svg style={{position: "absolute", bottom: "0%", right: "0%"}}
       width="300" height="110" viewBox="0 0 240 170" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="140" cy="200" rx="200" ry="200" fill="var(--color-2)" fillOpacity="0.5"/>
      </svg>
    </div>
  );
}

