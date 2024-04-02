import { forwardRef } from "react";
import style from "./styles/Servicio.module.css"

const Servicio = forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <div className={style.back} ref={ref}>
      <h1>Servicio</h1>
      <table className={style.planes}>
        <h3>FREE</h3>
        <h3>STANDARD</h3>
        <h3>ENTERPRISE</h3>
        <div>
          <h2>$0</h2>
          <p>Get Started</p>
        </div>
        <div>
          <h2>$7000</h2>
          <p>Start Trial</p>
        </div>
        <div>
          <h2>$50000</h2>
          <p>Start Trial</p>
        </div>
        <div>
          <ul>
            <li>Busquedas ilimitadas</li>
            <li>Historial limitado</li>
            <li>Anuncios</li>
            <li>Acceso a tiendas</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Busquedas infinitas</li>
            <li>Historial ilimitado</li>
            <li>Elimina anuncios</li>
            <li>Acceso a tiendas</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Alcance personalizado a clientes</li>
            <li>Patrocinio de emprendimiento</li>
          </ul>
        </div>
      </table>
    </div>
  );
});

export default Servicio;
