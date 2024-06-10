import { forwardRef } from "react";
import style from "./styles/Servicio.module.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Servicio = forwardRef<HTMLDivElement>(({}, ref) => {
  const navigate = useNavigate();
  const authenticated = useSelector((state:any) => state.auth.status === 'authenticated')

  return (
    <div className={style.back} ref={ref}>
      <h1>Servicio</h1>
      <div className={style.planes}>
        <div className={style.plan} onClick={() => { authenticated ? navigate('app/home') : navigate('/Registro')}}>
          <h3>FREE</h3>
          <div>
            <h2>$0</h2>
            <p>Get Started</p>
          </div>
          <ul>
            <li>Busquedas ilimitadas</li>
            <li>Historial limitado</li>
            <li>Anuncios</li>
          </ul>
        </div>
        <div className={style.plan} onClick={() => {navigate('/Registro')}}>
          <h3>PLUS</h3>
          <div>
            <h2>$7.000</h2>
            <p>Start Trial</p>
          </div>
          <ul>
            <li>Busquedas infinitas</li>
            <li>Historial ilimitado</li>
            <li>Elimina anuncios</li>
            <li>Acceso a tiendas</li>
          </ul>
        </div>
        <div className={style.plan} onClick={() => {navigate('/Registro')}}>
          <h3>TIENDA</h3>
          <div>
            <h2>$50.000</h2>
            <p>Start Trial</p>
          </div>
          <ul>
            <li>Alcance personalizado a clientes</li>
            <li>Patrocinio de emprendimiento</li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default Servicio;
