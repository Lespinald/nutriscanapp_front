import style from "./styles/Marketing.module.css"
import { forwardRef } from "react";

const Marketing = forwardRef<HTMLDivElement>(({}, ref) => {
  return(
  <div className={style.main} ref={ref}>
      <div className={style.left}>
      <img src="/Home/Marketing/logoColor1.png" alt="logo Nutriscan" className={style.logo}/>
        <p className={style.quote}>
          "¡Bienvenido a nuestra aplicación de nutrición, tu nueva herramienta
          para comenzar un estilo de vida más saludable! estamos
          aquí para ayudarte en cada paso. ¡Prepárate para sentirte mejor que nunca!"
        </p>
      </div>
      <div className={style.right}>
        <p>La Nueva Era de la Nutrición</p>
        <video src="/Home/Marketing/randomMercado.mp4" controls></video>
      </div>
  </div>
  );
});

export default Marketing
