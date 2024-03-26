import { Link } from "react-router-dom";
import "./Inicio.css"
import InicioBG from "./InicioBG";
import { forwardRef } from "react";

const Inicio = forwardRef<HTMLDivElement>(({}, ref) => {

  return (
  <div className="inicioMain" ref={ref}>
    <img src="/Home/Inicio/compra.png" alt="bolsa de compra" className="inicioCompraImg maintainRatio" />
    <div className="inicioColRigth">
      <img src="/Home/Inicio/textLogo.png" alt="" className="inicioLogoImg" />
      <p className="inicioInfo">¿Estás interesado en mejorar tu salud a través de una alimentación más equilibrada?</p>
      <Link className="inicioButton" to="/registro">COMENZAR AHORA</Link>
    </div>
    <InicioBG className="inicioBG"/>
  </div>
  );
});

export default Inicio;
