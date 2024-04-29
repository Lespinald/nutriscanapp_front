import style from "./styles/Marketing.module.css"
import { forwardRef } from "react";

const Marketing = forwardRef<HTMLDivElement>(({}, ref) => {
  return(
  <div className={style.main} ref={ref}>
      <div className={style.left}>
        <img src="/Home/Marketing/logoColor1.png" alt="logo Nutriscan" className={style.logo}/>
        <p className={style.quote}>
          "¡Bienvenido a nuestra aplicación de nutrición, tu compañero
          de viaje hacia un estilo de vida más saludable! Con nuestra
          aplicación, descubrirás cómo hacer elecciones alimenticias inteligentes
          que nutrirán tu cuerpo y potenciarán tu bienestar. Desde consejos de 
          expertos hasta recetas deliciosas y planes de comidas personalizados, estamos
          aquí para ayudarte en cada paso del camino hacia una vida más equilibrada 
          y vibrante. ¡Prepárate para sentirte mejor que nunca!"
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
