import { Link} from "react-router-dom";
import style from "./styles/Inicio.module.css"
import { forwardRef } from "react";
import { useHomeLayoutContext } from "../Layout";

const Inicio = forwardRef<HTMLDivElement>(({}, ref) => {

  const {mobile} = useHomeLayoutContext();

  return (
  <div className={(mobile?`${style.mainMobile} `:"") + style.main} ref={ref}>
    {mobile?
    <>
      <img src="/Home/Inicio/textLogo.png" alt="nutriscan"/>
      <p className={style.info}>
        ¿Estás interesado en mejorar tu salud a través de una alimentación
        más equilibrada?
      </p>
      <img src="/Home/Inicio/compra.png" alt="bolsa de compra" className={style.compraImgMobile}/>
      <Link className={`${style.buttonMobile} ${style.button}`} to="/registro">COMENZAR AHORA</Link>
    </>:
    <>
      <img src="/Home/Inicio/compra.png" alt="bolsa de compra" className={`${style.compraImg} maintainRatio`} />
      <div className={style.colRigth}>
        <img src="/Home/Inicio/textLogo.png" alt="nutriscan"/>
        <p className={style.info}>
          ¿Estás interesado en mejorar tu salud a través de una alimentación
          más equilibrada?"
        </p>
        <br></br>
        <p>¡Te damos la bienvenida a NutriScan!
        </p>
        <Link className={style.button} to="/registro">COMENZAR AHORA</Link>
      </div>
    </>
    }
    <Background/>
  </div>
  );
}); export default Inicio;

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

